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
  updateLocalStorage: (newExpenses: Expense[]) => void;
};
