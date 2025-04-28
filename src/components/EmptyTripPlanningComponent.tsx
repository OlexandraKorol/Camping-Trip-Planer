import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { CreateTripButton } from "./CustomButtons";

interface IEmptyTripPlanningPage {
  onCreateTrip: () => void;
}

export const EmptyTripPlanningComponent: React.FC<IEmptyTripPlanningPage> = ({ onCreateTrip }) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-start p-4">
      <Title variant="inherit">
        Tap here to create your first trip!
      </Title>
      <CreateTripButton onCreateTrip={onCreateTrip} />
    </div>
  );
};

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: "start",
}));