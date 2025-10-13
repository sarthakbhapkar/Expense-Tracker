import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<ExpenseForm />} />
        <Route path="/edit-expense/:index" element={<ExpenseForm />} />
        <Route path="/all-expenses" element={<ExpenseList />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
