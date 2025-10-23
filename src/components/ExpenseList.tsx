import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import type { Expense } from "../types/types";
import { useExpenses } from "../context/ExpenseContext";

const categoryColors: Record<string, string> = {
  Food: "#0088FE",
  Travel: "#00C49F",
  Bills: "#FFBB28",
  Entertainment: "#FF8042",
  Other: "#A28EF9",
};

const ExpenseList = () => {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { expenses, updateLocalStorage } = useExpenses();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

  useEffect(() => {
    setFilteredExpenses(
      selectedCategory
        ? expenses.filter((e) => e.category === selectedCategory)
        : expenses
    );

    const uniqueCategories = Array.from(
      new Set(expenses.map((e) => e.category))
    );
    setCategoryOptions(uniqueCategories);
  }, [expenses, selectedCategory]);

  const handleCategoryChange = (event: FormEvent, value: string | null) => {
    setSelectedCategory(value);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete !== null) {
      const newList = expenses.filter((_, i) => i !== expenseToDelete);
      updateLocalStorage(newList);
    }
    setOpenDialog(false);
    setExpenseToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setExpenseToDelete(null);
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            All Expenses
          </Typography>

          <Autocomplete
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categoryOptions}
            renderInput={(params) => (
              <TextField {...params} label="Filter by Category" />
            )}
            sx={{ minWidth: 200 }}
          />
        </Box>

        {expenses.length === 0 ? (
          <Typography>No expenses found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>₹{expense.amount}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          backgroundColor:
                            categoryColors[expense.category] || "#ccc",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          display: "inline-block",
                          textTransform: "capitalize",
                          alignItems:"center"
                        }}
                      >
                        {expense.category}
                      </span>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/edit-expense/${index}`)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setExpenseToDelete(index);
                          setOpenDialog(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Button
          sx={{ mt: 3 }}
          variant="outlined"
          onClick={() => navigate("/add-expense")}
        >
          ➕ Add New Expense
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleCancelDelete}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Are you sure you want to delete this expense?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ExpenseList;
