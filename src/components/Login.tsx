import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import bg from "../img.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const DUMMY_EMAIL = "sarthak@gmail.com";
  const DUMMY_PASSWORD = "sarthak123";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   setTimeout(() => {
  //     setLoading(false);

  //     if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
  //       setSnackOpen(true);
  //       localStorage.setItem("isLoggedIn", "true");

  //       setTimeout(() => {
  //         navigate("/dashboard");
  //       }, 1000);
  //     } else {
  //       alert("Invalid credentials!");
  //     }
  //   }, 1000);
  // };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const matchedUser = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (matchedUser) {
        setSnackOpen(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        window.dispatchEvent(new Event("currentUserChange"));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        alert("Invalid credentials!");
      }
    }, 1000);
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
        position: "relative",
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
        mt={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography component="h1" variant="h5" mb={2} fontWeight={600}>
          🔐 Expense Tracker Login
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
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
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, backgroundColor: "#263238" }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackOpen(false)}>
          Login successful 🎉
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
