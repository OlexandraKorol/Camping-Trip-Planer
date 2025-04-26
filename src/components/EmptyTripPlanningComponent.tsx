import { Box, Typography } from "@mui/material"
import { CreateTripButton } from "./CustomButtons";

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

      <CreateTripButton onCreateTrip={onCreateTrip} />
    </Box>
  )
}
