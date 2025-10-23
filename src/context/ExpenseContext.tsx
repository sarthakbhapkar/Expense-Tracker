// import React, { createContext, useContext, useEffect, useState } from "react";
// import type { Expense, ExpenseContextType } from "../types/types";

// const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [currentUser] = useState<{ id: string; name: string; email: string } | null>(
//     JSON.parse(localStorage.getItem("currentUser") || "null")
//   );

//   const [expenses, setExpenses] = useState<Expense[]>(() => {
//     if (currentUser) {
//       const stored = localStorage.getItem(`expenses_${currentUser.id}`);
//       return stored ? JSON.parse(stored) : [];
//     }
//     return [];
//   });

//   const updateLocalStorage = (newExpenses: Expense[]) => {
//     if (!currentUser) return;
//     setExpenses(newExpenses);
//     localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(newExpenses));
//   };

//   return (
//     <ExpenseContext.Provider
//       value={{ expenses, updateLocalStorage }}
//     >
//       {children}
//     </ExpenseContext.Provider>
//   );
// };

// export const useExpenses = () => {
//   const context = useContext(ExpenseContext);
//   if (!context)
//     throw new Error("useExpenses must be used inside ExpenseProvider");
//   return context;
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Expense, ExpenseContextType } from "../types/types";

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`expenses_${currentUser.id}`);
      setExpenses(stored ? JSON.parse(stored) : []);
    } else {
      setExpenses([]);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
      setCurrentUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("currentUserChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("currentUserChange", handleStorageChange);
    };
  }, []);

  const updateLocalStorage = (newExpenses: Expense[]) => {
    if (!currentUser) return;
    setExpenses(newExpenses);
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(newExpenses));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, updateLocalStorage }}>
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
