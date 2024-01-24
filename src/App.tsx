import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import DetailPayment from "./pages/user/payment/DetailPayment";
import UserLayout from "./pages/user/UserLayout";
import Error from "./pages/error/Error";
import DetailEvents from "./pages/eo/dashboard/DetailEvents";
import Riwayat from "./pages/eo/profile/Riwayat";
import RiwayatTiket from "./pages/eo/profile/RiwayatTiket";
import { Toaster } from "react-hot-toast";
import RegisterEO from "./pages/eo/auth/RegisterEO";
import DashboardEO from "./pages/eo/dashboard/DashboardEO";
import ProfileEo from "./pages/eo/profile/ProfileEo";
import LayoutEO from "./pages/eo/Layout";
import LayoutAuth from "./pages/auth/Layout";
import QRCodeScannerPage from "./pages/eo/profile/Scan";
import ResetPasswordForm from "./pages/auth/ResetPasswordForm";
import ResetPassword from "./pages/auth/ResetPassword";
import Index from "./pages/user/dashboard/Index";
import Profile from "./pages/user/profile/Profile";
import Detailhistory from "./pages/user/profile/DetailHistory";
import History from "./pages/user/profile/History";
import DetailTiket from "./pages/user/dashboard/DetailTicket";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route
            path="/reset-password/:username"
            element={<ResetPasswordForm />}
          />
          {/* auth layout  */}
          <Route path="/auth/" element={<LayoutAuth />}>
            <Route path="signin" element={<Login />} />
            <Route path="forgot-password" element={<ResetPassword />} />
            <Route path="signup" element={<Register />} />
          </Route>

          {/* Root layout  */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Index />} />
            <Route path="/detail/:id" element={<DetailTiket />} />

            {/* EO Layout  */}
            <Route path="/profile/" element={<LayoutEO />}>
              <Route path="" element={<Profile />} />
              <Route path="usereo" element={<ProfileEo />} />
              <Route path="eo/events" element={<DashboardEO />} />
              <Route path="eo/events/:id" element={<DetailEvents />} />
              <Route path="eo/riwayat" element={<Riwayat />} />
              <Route path="eo/riwayat/tiket/:id" element={<RiwayatTiket />} />
              <Route path="eo/register" element={<RegisterEO />} />
            </Route>

            <Route path="/scan/:id" element={<QRCodeScannerPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:id" element={<Detailhistory />} />
            <Route path="/detail/payment/:id" element={<DetailPayment />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
