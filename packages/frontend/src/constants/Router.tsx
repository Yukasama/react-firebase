import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./Loading";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));
const Profile = lazy(() => import("../pages/user/Profile"));
const Settings = lazy(() => import("../pages/user/Settings"));
const Stock = lazy(() => import("../pages/stocks/Symbol"));
const StockControl = lazy(() => import("../pages/admin/StockControl"));
const NotFound = lazy(() => import("./NotFound"));

export default () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/forgot-password" element={<ForgotPassword />} />
        <Route path="/account/verify-email" element={<VerifyEmail />} />
        <Route
          path="/account/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stock-control"
          element={
            <ProtectedRoute>
              <StockControl />
            </ProtectedRoute>
          }
        />
        <Route path="/stocks/:symbol" element={<Stock />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
