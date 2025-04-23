import { Box, Typography, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

interface IEmptyTripPlanningPage {
  onCreateTrip: () => void;
}

export const EmptyTripPlanningComponent: React.FC<IEmptyTripPlanningPage> = ({ onCreateTrip }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 4,
      }}
    >
      <Typography variant="inherit" component="h2" sx={{ mb: 2, color: "text.secondary", textAlign: "start" }}>
        Tap here to create your first trip!
      </Typography>

      <Button
        onClick={onCreateTrip}
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mt: 2, mb: 2 }} >
        Create trip
      </Button>
    </Box>
  )
}
