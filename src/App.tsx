import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "@/pages/Product";
import Pricing from "@/pages/Pricing";
import Page404 from "@/pages/Page404";
import AppLayout from "@/pages/AppLayout";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import CountryList from "./components/CountryList";
import City from "@/components/City";

import type { City as CityType } from "@/types";
import CityList from "./components/CityList";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";

export default function App(): JSX.Element {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="cities" replace={true} />} />
          <Route
            path="cities"
            element={<CityList cities={cities} loading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} loading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
