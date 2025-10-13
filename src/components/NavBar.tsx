import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 600, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Expense Tracker
        </Typography>
        <Box display="flex" gap={2}>
          <Button color="inherit" onClick={() => navigate("/add-expense")}>
            Add Expense
          </Button>
          <Button color="inherit" onClick={() => navigate("/all-expenses")}>
            Show All Expenses
          </Button>
          <Button color="error" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
