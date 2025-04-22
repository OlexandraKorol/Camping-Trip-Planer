import { Box, Modal, Typography, Button } from "@mui/material";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
interface INoAccountModal {
  isOpen: boolean;
  handleClose: () => void;
  handleOpenRegistration: () => void;
}

export const NoAccountModal: React.FC<INoAccountModal> = ({ isOpen, handleClose, handleOpenRegistration }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          margin: "auto",
          marginTop: "20vh",
          boxShadow: 24,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: "center" }}>
          Sorry, we don't have a account for you yet <SentimentDissatisfiedIcon color="primary" />
        </Typography>

        <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
          It looks like you don't have an account. Let's create one to get started!
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
              handleOpenRegistration();
            }}
          >
            Create an Account
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};