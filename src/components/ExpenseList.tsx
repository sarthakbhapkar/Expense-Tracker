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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import type { Expense } from "../types/types";
import { useExpenses } from "../context/ExpenseContext";

const ExpenseList = () => {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { expenses, deleteExpense } = useExpenses();
  const navigate = useNavigate();

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
                    <TableCell>{expense.category}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/edit-expense/${index}`)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deleteExpense(index)}
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
      </Box>
    </Box>
  );
};

export default ExpenseList;
