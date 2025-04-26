import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { RegistrationModal } from "../components/RegistrationModal";
import { LoginForm } from "../components/LoginForm";
import { NoAccountModal } from "../components/NoAccountModal";
import { useAuthPage } from "../hooks/useAuthPage";

export const AuthPage = () => {
  const {
    formData,
    error,
    isRegistrationModalOpen,
    isAccountNotFoundModalOpen,
    handleInputChange,
    handleLogin,
    handleGoogleSignIn,
    handleOpenModal,
    handleCloseModal,
    setAccountNotFoundModalOpen,
  } = useAuthPage();

  return (
    <div className="container flex min-h-screen min-w-full justify-center items-center">
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
                  <Typography
                    onClick={handleOpenModal}
                    style={{ cursor: "pointer", textAlign: 'center' }}
                    variant="caption" color="primary">
                    Sign up
                  </Typography>
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

