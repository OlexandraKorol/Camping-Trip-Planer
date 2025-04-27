export interface TripData {
  tripId?: string;
  id: string;
  tripName: string;
  startDate: string;
  endDate: string;
  location: string;
  activities: string[];
  notes: string;
  campsiteBooked: boolean;
}
