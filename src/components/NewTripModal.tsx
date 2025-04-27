import { styled } from "@mui/material/styles";
import { Modal, Box, Button, Checkbox, FormControlLabel, Typography, Card, CardContent } from "@mui/material";
import { TripData } from "../types/trips";
import { CustomTextField } from "./CustomTextField";
import { Link } from "react-router-dom";

interface INewTripModal {
  isOpen: boolean;
  handleClose: () => void;
  formData: TripData
  setShowModal: (value: boolean) => void
  handleSubmit: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errors: { [key: string]: string }
}

export const NewTripModal: React.FC<INewTripModal> = ({ isOpen, handleClose, formData, setShowModal, handleSubmit, onChange, errors }) => {
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
      <StyledModalBox>
        <Typography gutterBottom sx={{ mb: 1.5 }} variant="h5">
          Trip Creation
        </Typography>

        <Card variant="elevation" sx={{ padding: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.5 }} variant="subtitle1">
              Overview
            </Typography>

            <ModalContentBox>
              <Column>
                <CustomTextField
                  name="tripName"
                  value={formData.tripName}
                  onChange={onChange}
                  placeholder="Trip name"
                  required
                  error={!!errors.tripName}
                  helperText={errors.tripName}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <CustomTextField
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={onChange}
                    placeholder="Start date"
                    required
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                  />
                  <CustomTextField
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={onChange}
                    placeholder="End date"
                    required
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                  />
                </Box>
                <CustomTextField
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  placeholder="Location"
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Column>

              <Column>
                <Link to={`/weather`}>
                  <Button type="button" variant="outlined">
                    Check the weather
                  </Button>
                </Link>
                <CustomTextField
                  name="notes"
                  value={formData.notes}
                  onChange={onChange}
                  placeholder="Notes"
                  multiline
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="campsiteBooked"
                      checked={formData.campsiteBooked}
                      onChange={(e) =>
                        onChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        } as unknown as React.ChangeEvent<HTMLInputElement>)
                      }
                    />
                  }
                  label={"Camping booked?"}
                />
              </Column>
            </ModalContentBox>
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
              helperText="Add activities separated with commas"
            />
          </CardContent>
        </Card>

        <ButtonGroup>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
          <Button onClick={() => setShowModal(false)} variant="outlined">
            Cancel
          </Button>
        </ButtonGroup>
      </StyledModalBox>
    </Modal>
  );
};

const StyledModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  maxHeight: "90vh",
  overflowY: "auto",
}));

const ModalContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
}));

const Column = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));
