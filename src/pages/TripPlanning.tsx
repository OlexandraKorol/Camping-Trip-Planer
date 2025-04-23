import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTrips } from "../hooks/useTrips";
import { TripData } from "../types/trips";
import { NewTripModal } from "../components/NewTripModal";
import { TripCard } from "../components/TripCard";
import { EmptyTripPlanningComponent } from "../components/EmptyTripPlanningComponent";

const emptyTrip: TripData = {
  tripName: "",
  startDate: "",
  endDate: "",
  location: "",
  activities: [],
  notes: "",
  campsiteBooked: false,
  id: "",
};

export const TripPlanning = () => {
  const { trips, addTrip } = useTrips();
  const [showModal, setShowModal] = useState(false); // Початкове значення false
  const [formData, setFormData] = useState<TripData>(emptyTrip);


  const handleSubmit = async () => {
    await addTrip(formData);
    setFormData(emptyTrip);
    setShowModal(false);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit trip with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete trip with id: ${id}`);
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        padding: 20,
        flexDirection: "column",
      }}
    >
      {trips.length ? (
        <>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            My Trips
          </Typography>
          <Box>
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onEdit={() => handleEdit(trip.id)}
                onDelete={() => handleDelete(trip.id)}
              />
            ))}
          </Box>
        </>
      ) : (
        <EmptyTripPlanningComponent onCreateTrip={() => setShowModal(true)} />
      )}

      <NewTripModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        formData={formData}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};