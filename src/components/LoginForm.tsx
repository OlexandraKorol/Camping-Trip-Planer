import { Box, Button, Divider, FormControl, Typography } from "@mui/material";
import { GoogleIcon } from "./CustomGoogleIcon";
import { CustomTextField } from "./CustomTextField";

interface LoginFormProps {
  formData: { email: string; password: string };
  error: { hasError: boolean; message: string };
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formData, error, onInputChange, onLogin, onGoogleSignIn }) => {
  return (
    <Box
      component="form"
      onSubmit={onLogin}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormControl>
        <CustomTextField
          error={error.hasError}
          name="email"
          placeholder="Enter your email"
          onChange={onInputChange}
          required={true}
          value={formData.email}
          errorMessage={error.message}
        />
      </FormControl>
      <FormControl>
        <CustomTextField
          error={error.hasError}
          name="password"
          placeholder="Password"
          onChange={onInputChange}
          required={true}
          value={formData.password}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
        Sign In
      </Button>
      <Divider>or</Divider>
      <Button
        fullWidth
        variant="outlined"
        onClick={onGoogleSignIn}
        startIcon={<GoogleIcon />}
        sx={{ mt: 2, mb: 2 }}
      >
        Sign In with Google
      </Button>
      {error.hasError && (
        <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
};