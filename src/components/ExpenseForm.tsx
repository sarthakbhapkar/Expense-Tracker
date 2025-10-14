import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useExpenses } from "../context/ExpenseContext";
import type { Expense } from "../types/types";
import Navbar from "./NavBar";

const categories = ["Food", "Travel", "Bills", "Entertainment", "Other"];

const ExpenseForm = () => {
  const { index } = useParams<{ index?: string }>();
  const navigate = useNavigate();
  const { expenses, updateLocalStorage } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const isEdit = index !== undefined;

  useEffect(() => {
    if (isEdit) {
      const idx = parseInt(index!);
      const expense = expenses[idx];
      if (expense) {
        setTitle(expense.title);
        setAmount(expense.amount);
        setDate(expense.date);
        setCategory(expense.category);
      }
    }
  }, [index, expenses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense: Expense = {
      title,
      amount: Number(amount),
      date,
      category,
    };

    if (isEdit) {
      editExpense(parseInt(index!), newExpense);
    } else {
      addExpense(newExpense);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/all-expenses");
    }, 1000);
  };
  
    const addExpense = (e: Expense) => {
      updateLocalStorage([...expenses, e]);
    };
  
    const editExpense = (index: number, updated: Expense) => {
      const newList = [...expenses];
      newList[index] = updated;
      updateLocalStorage(newList);
    };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 8,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isEdit ? "✏️ Edit Expense" : "➕ Add Expense"}
        </Typography>

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Expense {isEdit ? "updated" : "added"} successfully.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }}
            required
          />

          <TextField
            select
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            fullWidth
          >
            {isEdit ? "Save Changes" : "Save Expense"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ExpenseForm;
