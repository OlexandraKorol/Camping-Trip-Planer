import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { RegistrationModal } from "../components/RegistrationModal";
import { useAuth } from "../context/AuthContext";
import { doGoogleSignInWithGoogle, doSignInWithEmailAndPassword } from "../services/auth";
import { LoginForm } from "../components/LoginForm";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { NoAccountModal } from "../components/NoAccountModal";

export const AuthPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ hasError: false, message: "" });
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isAccountNotFoundModalOpen, setAccountNotFoundModalOpen] = useState(false);

  const { setIsUserLoggedIn } = useAuth();

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

    if (!email || !password) {
      setError({ hasError: true, message: "Please fill in all fields." });
      return;
    }
    try {

      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {

        setError({ hasError: true, message: "User not registered. Please sign up." });
        setAccountNotFoundModalOpen(true); 
        return;
      }
      await doSignInWithEmailAndPassword(email, password);
      setIsUserLoggedIn(true);
    } catch (error: any) {
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

  const handleOpenModal = () => setIsRegistrationModalOpen(true);
  const handleCloseModal = () => setIsRegistrationModalOpen(false);

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
          alignItems: "stretch",
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
            alignItems: { xs: "center", md: "flex-start" },
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
                <Typography style={{ textAlign: 'center' }} variant="caption">
                  Don't have an account?{" "}
                   <Typography onClick={handleOpenModal} style={{ cursor: "pointer", textAlign: 'center' }} variant="caption" color="primary">Sign up</Typography>
                </Typography>
                <RegistrationModal isOpen={isRegistrationModalOpen} handleClose={handleCloseModal} />
                <NoAccountModal isOpen={isAccountNotFoundModalOpen} handleClose={() => setAccountNotFoundModalOpen(false)} handleOpenRegistration={handleOpenModal} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

