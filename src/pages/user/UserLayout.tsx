import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useProfile } from "@/service/user/user.service";
import toast from "react-hot-toast";
const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isProfileRoute = location.pathname === "/profile";
  const landing = location.pathname === "/";
  const token = Cookies.get("token");

  const profile: any = useProfile((state) => state?.profile);
  const getProfile = useProfile((state) => state?.getProfile);

  useEffect(() => {
    if (!token && !landing) {
      navigate("/auth/signin");
    }
    getProfile();
  }, [token, landing]);

  if (profile?.status === 403 && profile?.data === "Forbidden") {
    Cookies.remove("token");
    toast.error("Sesi Anda Telah Berakhir");
    navigate("/auth/signin");
  }
  return (
    <div className=" max-h-screen">
      <Navbar />
      <Outlet />
      {!isProfileRoute && <Footer />}
    </div>
  );
};

export default UserLayout;
