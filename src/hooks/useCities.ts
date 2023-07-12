import { CitiesContext } from "@/contexts/CitiesContext";
import { useContext } from "react";
export function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("useCities must be used within CitiesProvider");

  return context;
}
