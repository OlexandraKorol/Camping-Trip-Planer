import { styled } from "@mui/material/styles";
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
      <StyledModalBox>
        <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: "center" }}>
          Sorry, we don't have an account for you yet <SentimentDissatisfiedIcon color="primary" />
        </Typography>

        <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
          It looks like you don't have an account. Let's create one to get started!
        </Typography>

        <ButtonGroup>
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
        </ButtonGroup>
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

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));