import { TripData } from "../types/trips";

export const validateNewTripForm = (
  formData: TripData,
  setErrors: (
    value: React.SetStateAction<{
      [key: string]: string;
    }>
  ) => void
) => {
  const newErrors: { [key: string]: string } = {};

  if (!formData.tripName || formData.tripName.length < 3) {
    newErrors.tripName = "Trip name must be at least 3 characters long.";
  }

  if (!formData.startDate) {
    newErrors.startDate = "Start date is required.";
  }

  if (!formData.endDate) {
    newErrors.endDate = "End date is required.";
  }

  if (
    formData.startDate &&
    formData.endDate &&
    formData.startDate > formData.endDate
  ) {
    newErrors.endDate = "End date must be after start date.";
  }

  if (!formData.location || formData.location.length < 3) {
    newErrors.location = "Location must be at least 3 characters long.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
