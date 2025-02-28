import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TripsContext = createContext();

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/trips?keywords=${searchTerm}`
        );
        setTrips(result.data.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, [searchTerm]);

  return (
    <TripsContext.Provider value={{ trips, searchTerm, setSearchTerm }}>
      {children}
    </TripsContext.Provider>
  );
}
