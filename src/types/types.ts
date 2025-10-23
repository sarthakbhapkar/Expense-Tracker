export type Expense = {
  id: string;
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

export type PieData  = {
  name: string;
  value: number;
[key: string]: string | number; 
}
