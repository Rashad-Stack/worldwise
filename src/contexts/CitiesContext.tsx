import React, { createContext, useEffect, useState } from "react";

import type { City } from "@/types";

type Props = {
  children: React.ReactNode;
};

type CitiesType = {
  cities: City[];
  isLoading: boolean;
  getCity(id: number): void;
  current: City | undefined;
};

const BASE_URL = "http://localhost:9000";

export const CitiesContext = createContext<CitiesType>({
  cities: [],
  isLoading: false,
  getCity: () => ({}),
  current: undefined,
});

export default function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [current, setCountry] = useState<City | undefined>(undefined);

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was ana error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: number) {
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCountry(data);
    } catch {
      alert("There was ana error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, getCity, current, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}