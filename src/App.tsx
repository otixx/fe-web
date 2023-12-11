import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailTiket from "./pages/user/Dashboard/DetailTicket";
import Login from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import DetailPayment from "./pages/user/payment/DetailPayment";
import UserLayout from "./pages/user/UserLayout";
import Index from "./pages/user/Dashboard/Index";
import Profile from "./pages/user/Profile/Profile";
import Error from "./pages/error/Error";
import DetailEvents from "./pages/user/profileeo/DetailEvents";
import Riwayat from "./pages/user/profileeo/Riwayat";
import RiwayatTiket from "./pages/user/profileeo/RiwayatTiket";
import { Toaster } from "react-hot-toast";
import RegisterEO from "./pages/user/profileeo/RegisterEO";
import DashboardEO from "./pages/user/profileeo/DashboardEO";
import ProfileEo from "./pages/user/profileeo/ProfileEo";
import LayoutEO from "./pages/user/profileeo/Layout";
import LayoutAuth from "./pages/auth/Layout";
import History from "./pages/user/Profile/History";
import Detailhistory from "./pages/user/Profile/DetailHistory";
import QRCodeScannerPage from "./pages/user/profileeo/Scan";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="*" element={<Error />} />
          {/* auth layout  */}
          <Route path="/auth/" element={<LayoutAuth />}>
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </Route>

          {/* Root layout  */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Index />} />
            <Route path="/profile" element={<Profile />} />

            {/* EO Layout  */}
            <Route path="/profile/" element={<LayoutEO />}>
              <Route path="user" element={<Profile />} />
              <Route path="eo" element={<ProfileEo />} />
              <Route path="eo/register" element={<RegisterEO />} />
              <Route path="eo/events" element={<DashboardEO />} />
              <Route path="eo/events/:id" element={<DetailEvents />} />
              <Route path="eo/riwayat" element={<Riwayat />} />
            </Route>
            <Route path="/history" element={<History />} />
            <Route path="/detailhistory" element={<Detailhistory />} />
            <Route path="/detail/payment" element={<DetailPayment />} />
            <Route path="scan" element={<QRCodeScannerPage />} />

            <Route
              path="/profile/eo/riwayat/tiket/:id"
              element={<RiwayatTiket />}
            />
            <Route path="/detail/:id" element={<DetailTiket />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
