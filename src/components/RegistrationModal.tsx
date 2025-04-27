import { styled } from "@mui/material/styles";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useState } from "react";
import { CustomTextField } from "./CustomTextField";
import { GoogleIcon } from "./CustomGoogleIcon";
import { doCreateUserWithEmailAndPassword, doGoogleSignInWithGoogle } from "../services/auth";

interface IRegistrationModal {
  isOpen: boolean;
  handleClose: () => void;
}

export const RegistrationModal: React.FC<IRegistrationModal> = ({ isOpen, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    await doCreateUserWithEmailAndPassword(email, password);
    alert("Account created successfully!");
    handleClose();
  };

  const handleGoogleSignUp = async () => {
    await doGoogleSignInWithGoogle();
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModalBox>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Create an Account
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <CustomTextField
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            placeholder={"Enter your email"}
          />
          <CustomTextField
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <CustomTextField
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
            sx={{ mt: 2, mb: 2 }}
          >
            Register
          </Button>

        </Box>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </Button>

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ textAlign: "center", mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </StyledModalBox>
    </Modal>
  );
};

const StyledModalBox = styled(Box)(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: "auto",
  marginTop: "20vh",
  boxShadow: theme.shadows[24],
}));
