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
  const { trips, addTrip, editTrip, deleteTrip } = useTrips();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<TripData>(emptyTrip);


  const handleSubmit = async () => {
    await addTrip(formData);
    setFormData(emptyTrip);
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "activities") {
      const activitiesArray = value.split(",").map((activity) => activity.trim());
      setFormData((prev) => ({
        ...prev,
        [name]: activitiesArray,
      }));
    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEdit = (id: string) => {
    setShowModal(true);
    editTrip(id, formData)
  };

  const handleDelete = (id: string) => {
    deleteTrip(id);
  };

  return (
    <div className="container flex flex-col p-5" >
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
        onChange={handleInputChange}
      />
    </div>
  );
};