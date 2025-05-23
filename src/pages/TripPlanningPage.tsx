import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTrips } from "../hooks/useTrips";
import { TripData } from "../types/trips";
import { NewTripModal } from "../components/NewTripModal";
import { TripCard } from "../components/TripCard";
import { EmptyTripPlanningComponent } from "../components/EmptyTripPlanningComponent";
import { CreateTripButton } from "../components/CustomButtons";
import { validateNewTripForm } from "../services/utils";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => validateNewTripForm(formData, setErrors);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (formData.id) {
      await editTrip(formData.id, formData);
    } else {
      await addTrip(formData);
    }
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

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleEdit = (id: string) => {
    const tripToEdit = trips.find((trip) => trip.id === id);
    if (tripToEdit) {
      setFormData(tripToEdit);
      setShowModal(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteTrip(id);
  };

  return (
    <div className="container flex flex-col p-5">
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
          <CreateTripButton onCreateTrip={() => setShowModal(true)} />
        </>
      ) : (
        <EmptyTripPlanningComponent onCreateTrip={() => setShowModal(true)} />
      )}

      <NewTripModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
          setFormData(emptyTrip);
        }}
        formData={formData}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
        onChange={handleInputChange}
        errors={errors}
      />
    </div>
  );
};