import { Modal, Box, Button, Checkbox, FormControlLabel, Typography, Card, CardContent, Fab } from "@mui/material";
import { TripData } from "../types/trips";
import { CustomTextField } from "./CustomTextField";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

interface INewTripModal {
  isOpen: boolean;
  handleClose: () => void;
  formData: TripData
  setShowModal: (value: boolean) => void
  handleSubmit: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const NewTripModal: React.FC<INewTripModal> = ({ isOpen, handleClose, formData, setShowModal, handleSubmit, onChange }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography gutterBottom sx={{ mb: 1.5 }} variant="h5">
          Trip Creation
        </Typography>

        <Card variant="elevation" sx={{ padding: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.5 }} variant="subtitle1">
              Overwiew
            </Typography>


            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <CustomTextField
                  name="tripName"
                  value={formData.tripName}
                  onChange={onChange}
                  placeholder={"Trip name"}
                  required={true}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <CustomTextField
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={onChange}
                    placeholder={"Start date"}
                    required={true}
                  />
                  <CustomTextField
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={onChange}
                    placeholder={"End date"}
                    required={true}
                  />
                </Box>
                <CustomTextField
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={onChange}
                  required={false}
                />
              </Box>

              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <Link to={`/weather`}>
                  <Button type="button" variant="outlined">
                    Chech the weather
                  </Button>
                </Link>
                <CustomTextField
                  name="notes"
                  value={formData.notes}
                  onChange={onChange}
                  placeholder="Notes"
                  required={false}
                  multiline
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="campsiteBooked"
                      checked={formData.campsiteBooked}
                      onChange={onChange}
                    />
                  }
                  label={"Camping booked?"}
                />
              </Box>
            </Box>


          </CardContent>
        </Card>
        <Card variant="elevation" sx={{ padding: 2, borderRadius: 2, mt: 2 }}>
          <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.5 }} variant="subtitle1">
            Activities
          </Typography>
          <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>

            <CustomTextField
              name="activities"
              value={formData.activities.join(", ")}
              onChange={onChange}
              placeholder="Add activity"
              required={false}
            />

            <Fab color="primary" aria-label="add" sx={{ width: 40, height: 40 }}>
              <AddIcon />
            </Fab>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2, mt: 2 }}>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
          <Button onClick={() => setShowModal(false)} variant="outlined">Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};


