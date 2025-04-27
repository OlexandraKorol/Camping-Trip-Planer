import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { TripData } from "../types/trips";

export const useTrips = () => {
  const [trips, setTrips] = useState<(TripData & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  const tripsCollection = collection(db, "trips");

  const fetchTrips = async () => {
    setLoading(true);
    const snapshot = await getDocs(tripsCollection);
    const tripsData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as (TripData & { id: string })[];
    setTrips(tripsData);
    setLoading(false);
  };


  const editTrip = async (id: string, updatedTrip: TripData) => {
    const tripDoc = doc(db, "trips", id);
    await updateDoc(tripDoc, updatedTrip as Partial<TripData>);
  
 
    setTrips((prevTrips) =>
      prevTrips.map((trip) => (trip.id === id ? { ...trip, ...updatedTrip } : trip))
    );
  };

  const deleteTrip = async (id: string) => {
    const tripDoc = doc(db, "trips", id);
    await deleteDoc(tripDoc);
    fetchTrips();
  };

  const addTrip = async (trip: TripData) => {
    const newDocRef = doc(tripsCollection); 
    await setDoc(newDocRef, { ...trip, tripId: newDocRef.id });
    // await addDoc(tripsCollection, trip); Double check heeded
    fetchTrips();
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return {
    trips,
    loading,
    addTrip,
    editTrip,
    deleteTrip
  };
};
