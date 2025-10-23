import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../img.jpg";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const isEmailExist = existingUsers.some(
      (user: any) => user.email === email
    );

    if (isEmailExist) {
      setSnackMsg("Email already registered!");
      setSnackSeverity("error");
      setSnackOpen(true);
      return;
    }

    const newUser = { id: crypto.randomUUID(), name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSnackMsg("Registration successful 🎉");
    setSnackSeverity("success");
    setSnackOpen(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.85)",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: 400,
          maxWidth: "90%",
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography component="h1" variant="h5" mb={2} fontWeight={600}>
          📝 Create Your Account
        </Typography>

        <Box component="form" onSubmit={handleRegister} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#263238" }}
          >
            Register
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </Typography>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackSeverity}>{snackMsg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterUser;
