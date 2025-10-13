export type Expense = {
  title: string;
  amount: number;
  date: string;
  category: string;
};

export type ExpenseStats = {
  total: number | null;
  mostSpentCategory: string | null;
  recentCount: number | null;
  expenses: Expense[];
};

export type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (e: Expense) => void;
  editExpense: (index: number, updated: Expense) => void;
  deleteExpense: (index: number) => void;
};
