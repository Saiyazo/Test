import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyerHome from "./pages/BuyerHome";
import SellerDashboard from "./pages/SellerDashboard";
import SellerProfile from "./pages/SellerProfile";
import MyListings from "./pages/MyListings";
import AdminManage from "./pages/AdminManage";
import PropertyDetail from "./pages/PropertyDetail";

import ProtectedRoute from "./routes/ProtectedRoute";
import AppFooter from "./components/AppFooter";
import AppNavbar from "./components/AppNavbar";

// ⭐ เพิ่มจากคนที่สอง
import StepHeader from "./layouts/StepHeader";
import AdsStep from "./layouts/Adstep";

import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import StepFour from "./pages/StepFour";

import AdsOne from "./pages/AdsOne";
import AdsTwo from "./pages/AdsTwo";
import AdsThree from "./pages/AdsThree";
import AdsFour from "./pages/AdsFour";
import AdsFive from "./pages/AdsFive";

function AppWrapper() {
  const location = useLocation();

  // หน้าไหนที่ซ่อน Navbar / Header / Footer
  const hideLayoutRoutes = ["/", "/register"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  // ⭐ state สำหรับ flow "ลงประกาศ" (Step1–4)
  const [activeStep, setActiveStep] = useState(0);

  // ⭐ state สำหรับ flow "ลงโฆษณา" (Ads1–5)
  const [adStep, setAdStep] = useState(0);
  const [adsData, setAdsData] = useState({});
  const [price, setPrice] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null); // ตอนนี้ยังไม่ใช้ แต่เผื่อขยายต่อ
  const [startDate, setStartDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(7);

  return (
    <>
      {!shouldHideLayout && (
        <>
          <AppNavbar />

          {/* ⭐ Header ขั้นตอน "ลงประกาศ" */}
          {activeStep >= 1 && activeStep <= 4 && (
            <StepHeader activeStep={activeStep} />
          )}

          {/* ⭐ Header ขั้นตอน "ลงโฆษณา" */}
          {adStep >= 1 && adStep <= 5 && <AdsStep StepAd={adStep} />}
        </>
      )}

      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Buyer */}
        <Route
          path="/buyer/home"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerHome />
            </ProtectedRoute>
          }
        />

        {/* Seller */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/listings"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <MyListings />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminManage />
            </ProtectedRoute>
          }
        />

        {/* Property detail (ใครก็เข้าได้) */}
        <Route path="/property/:id" element={<PropertyDetail />} />

        {/* ⭐ Flow ลงประกาศ (เฉพาะ Seller) */}
        <Route
          path="/step-one"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <StepOne setActiveStep={setActiveStep} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/step-two"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <StepTwo setActiveStep={setActiveStep} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/step-three"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <StepThree setActiveStep={setActiveStep} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/step-four"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <StepFour setActiveStep={setActiveStep} />
            </ProtectedRoute>
          }
        />

        {/* ⭐ Flow ลงโฆษณา (เฉพาะ Seller) */}
        <Route
          path="/ads-one"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AdsOne
                setAdStep={setAdStep}
                setPrice={setPrice}
                setSelectedSlot={setSelectedSlot}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ads-two"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AdsTwo
                setAdStep={setAdStep}
                AdsData={adsData}
                setAdsData={setAdsData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ads-three"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AdsThree setAdStep={setAdStep} AdsData={adsData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ads-four"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AdsFour
                setAdStep={setAdStep}
                price={price}
                selectedDuration={selectedDuration}
                startDate={startDate}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ads-five"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AdsFive
                setAdStep={setAdStep}
                price={price}
                selectedDuration={selectedDuration}
                startDate={startDate}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!shouldHideLayout && <AppFooter />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
