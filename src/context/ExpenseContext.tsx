import React, { createContext, useContext, useEffect, useState } from "react";
import type { Expense, ExpenseContextType } from "../types/types";

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  const updateLocalStorage = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  };

  const addExpense = (e: Expense) => {
    updateLocalStorage([...expenses, e]);
  };

  const editExpense = (index: number, updated: Expense) => {
    const newList = [...expenses];
    newList[index] = updated;
    updateLocalStorage(newList);
  };

  const deleteExpense = (index: number) => {
    const newList = expenses.filter((_, i) => i !== index);
    updateLocalStorage(newList);
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context)
    throw new Error("useExpenses must be used inside ExpenseProvider");
  return context;
};
