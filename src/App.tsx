import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";
import AuthProvider from "./contexts/AuthContext";
import CitiesProvider from "./contexts/CitiesContext";

import { Suspense, lazy } from "react";
import CountryList from "./components/CountryList";
import City from "@/components/City";
import CityList from "./components/CityList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "@/pages/Homepage";
// import Product from "@/pages/Product";
// import Pricing from "@/pages/Pricing";
// import Page404 from "@/pages/Page404";
// import Login from "@/pages/Login";
// import AppLayout from "@/pages/AppLayout";

const Homepage = lazy(() => import("@/pages/Homepage"));
const Product = lazy(() => import("@/pages/Product"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Page404 = lazy(() => import("@/pages/Page404"));
const Login = lazy(() => import("@/pages/Login"));
const AppLayout = lazy(() => import("@/pages/AppLayout"));

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
                <Route
                  index
                  element={<Navigate to="cities" replace={true} />}
                />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
