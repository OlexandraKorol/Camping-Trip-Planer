import { Button } from "@mui/material"
import React from "react";
import AddIcon from '@mui/icons-material/Add';


interface CreateTripButtonProps {
  onCreateTrip: () => void;
}

export const CreateTripButton: React.FC<CreateTripButtonProps> = ({ onCreateTrip }) => {
  return (
    <Button
      onClick={onCreateTrip}
      variant="outlined"
      color="primary"
      startIcon={<AddIcon />}
      sx={{ mt: 2, mb: 2 }} >
      Create trip
    </Button>
  )
}