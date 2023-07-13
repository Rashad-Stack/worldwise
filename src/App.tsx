import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "@/pages/Product";
import Pricing from "@/pages/Pricing";
import Page404 from "@/pages/Page404";
import AppLayout from "@/pages/AppLayout";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import CountryList from "./components/CountryList";
import City from "@/components/City";

import CityList from "./components/CityList";
import Form from "./components/Form";
import CitiesProvider from "./contexts/CitiesContext";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate to="cities" replace={true} />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
