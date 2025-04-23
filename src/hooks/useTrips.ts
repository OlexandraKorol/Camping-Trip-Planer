import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { TripData } from "../types/trips";

export const useTrips = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const tripsRef = collection(db, "users", user.uid, "trips");
    const querySnapshot = await getDocs(tripsRef);
    const data = querySnapshot.docs.map(doc => ({
      ...doc.data() as TripData,
      id: doc.id,
    }));

    setTrips(data);
    setLoading(false);
  };

  const addTrip = async (tripData: any) => {
    const user = auth.currentUser;
    const tripsRef = collection(db, "users", user!.uid, "trips");
    await addDoc(tripsRef, tripData);
    fetchTrips();
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return { trips, loading, addTrip };
};
