import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import { TripData } from "../types/trips";

interface TripCardProps {
  trip: TripData;
  onEdit: () => void;
  onDelete: () => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onEdit, onDelete }) => {
  return (
    <div
      className="container">

      <Card
        sx={{
          maxWidth: '100%',
          // margin: "auto",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          my: 2,

        }}
      >
        <CardContent>

          <Typography variant="h5" component="div" sx={{ mb: 2, }}>
            {trip.tripName || "Unnamed Trip"}
          </Typography>


          <Typography variant="body1" color="text.secondary" gutterBottom>
            Location: {trip.location || "Not specified"}
          </Typography>


          <Typography variant="body2" color="text.secondary">
            Dates: {trip.startDate || "N/A"} - {trip.endDate || "N/A"}
          </Typography>


          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Activities: {trip.activities.length > 0 ? trip.activities.join(", ") : "None"}
          </Typography>


          {trip.notes && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Notes: {trip.notes}
            </Typography>
          )}


          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Campsite Booked: {trip.campsiteBooked ? "Yes" : "No"}
          </Typography>
        </CardContent>


        <CardActions>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Button size="small" color="primary" onClick={onEdit}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={onDelete}>
              Delete
            </Button>
          </Box>
        </CardActions>
      </Card>
    </div>
  );
};



