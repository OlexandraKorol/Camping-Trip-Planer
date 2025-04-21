import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Divider, FormControl } from '@mui/material';
import { CustomTextField } from '../components/CustomTextField';
import { GoogleIcon } from '../components/CustomGoogleIcon';

import { useAuth } from '../context/AuthContext';
import { doGoogleSignInWithGoogle, doSignInWithEmailAndPassword } from '../services/auth';
import { RegistrationModal } from '../components/RegistrationModal';

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { setIsUserLoggedIn } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      setErrorMessage("Please fill in all fields.");
      return;
    }
    try {
      await doSignInWithEmailAndPassword(email, password);
      setIsUserLoggedIn(true);
    } catch (error) {
      setError(true);
      setErrorMessage("Failed to sign in. Please check your credentials.");
    }
  };

  const onGoogleSignIn = async () => {
    try {
      if (!isSignedIn) {
        setIsSignedIn(true);
        await doGoogleSignInWithGoogle();
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Failed to sign in with Google.");
    }
  };


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
              <Box
                component="form"
                onSubmit={onSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <FormControl>
                  <CustomTextField
                    error={error}
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    value={email}
                    errorMessage={errorMessage}
                  />
                </FormControl>
                <FormControl>
                  <CustomTextField
                    error={error}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    value={password}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Log in
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={onGoogleSignIn}
                  startIcon={<GoogleIcon />}
                  sx={{ mt: 2, mb: 2 }}
                >
                  Log in with Google
                </Button>
              </Box>
              <Divider>or</Divider>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Button
                  fullWidth
                  variant="text"
                  onClick={handleOpenModal}
                >
                  Create an account
                </Button>
                <RegistrationModal
                  isOpen={isModalOpen}
                  handleClose={handleCloseModal} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};