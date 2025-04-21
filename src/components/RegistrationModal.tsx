import { Box, Modal, Typography } from "@mui/material"

interface IRegistrationModal {
  isOpen: boolean
  handleClose: () => void
}

export const RegistrationModal: React.FC<IRegistrationModal> = ({ isOpen, handleClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: 400, height: 300, backgroundColor: 'white', padding: 4, borderRadius: 2, margin: 'auto', marginTop: '20vh' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  )
}