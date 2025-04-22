import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { RegistrationModal } from "../components/RegistrationModal";
import { useAuth } from "../context/AuthContext";
import { doGoogleSignInWithGoogle, doSignInWithEmailAndPassword } from "../services/auth";
import { LoginForm } from "../components/LoginForm";

export const AuthPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ hasError: false, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setIsUserLoggedIn, isUserLoggedIn } = useAuth();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      setError({ hasError: false, message: "" });
    },
    []
  );

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    console.log("Login data:", formData);

    console.log({isUserLoggedIn});

    if (!email || !password) {
      setError({ hasError: true, message: "Please fill in all fields." });
      return;
    }
    try {
      await doSignInWithEmailAndPassword(email, password);      
      setIsUserLoggedIn(true);
    } catch (error) {
      setError({ hasError: true, message: "Failed to sign in. Please check your credentials." });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doGoogleSignInWithGoogle();
      setIsUserLoggedIn(true);
    } catch (error) {
      setError({ hasError: true, message: "Failed to sign in with Google." });
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography gutterBottom sx={{ fontSize: 50, mb: 1.5 }} variant="h4">
            Hey There!
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ color: "text.secondary", fontSize: 25, mb: 1.5 }}
          >
            Let's create a wonderful trip together!
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card variant="outlined" sx={{ width: "100%", maxWidth: 400 }}>
            <CardContent>
              <LoginForm
                formData={formData}
                error={error}
                onInputChange={handleInputChange}
                onLogin={handleLogin}
                onGoogleSignIn={handleGoogleSignIn}
              />
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Typography onClick={handleOpenModal} style={{ cursor: "pointer", textAlign: 'center' }} variant="body2">
                  Don't have an account? Sign up
                </Typography>
                <RegistrationModal isOpen={isModalOpen} handleClose={handleCloseModal} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

