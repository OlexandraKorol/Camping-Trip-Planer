import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { CreateTripButton } from "./CustomButtons";

interface IEmptyTripPlanningPage {
  onCreateTrip: () => void;
}

export const EmptyTripPlanningComponent: React.FC<IEmptyTripPlanningPage> = ({ onCreateTrip }) => {
  return (
    <Container>
      <Title variant="inherit">
        Tap here to create your first trip!
      </Title>
      <CreateTripButton onCreateTrip={onCreateTrip} />
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: "start",
}));