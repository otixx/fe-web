import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { useDevice } from "@/service/device/device.service";
import { jwtDecode } from "jwt-decode";
import { useProfile } from "@/service/user/user.service";

const UserLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isProfileRoute = location.pathname === "/profile";
  const landing = location.pathname === "/";
  const detail = useMatch("/detail/:id");
  const scannerPath = useMatch("/scan/:id");
  const pathname = location.pathname;
  const getDevice = useDevice((state) => state?.getDevice);
  const getProfile = useProfile((state) => state?.getProfile);
  const token = Cookies.get("token");

  const sessionExp = () => {
    const tokenParse = jwtDecode(token ? token : "");
    const currentTime = Date.now() / 1000;

    if (tokenParse.exp && tokenParse?.exp < currentTime) {
      Cookies.remove("token");
      toast.error("Sesi Anda Telah Berakhir");
      navigate("/auth/signin");
    }
  };

  const protectRoute = () => {
    if (!token && !landing && !detail) {
      navigate("/auth/signin");
    }
  };

  useEffect(() => {
    const asyncComponentLoad = async () => {
      if (token) {
        sessionExp();
        await getProfile();
      }
      await Promise.all([componentLoad(), protectRoute(), getDevice()]);
      setLoading(false);
    };

    asyncComponentLoad();
  }, [token, landing, pathname]);

  const componentLoad = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="max-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!scannerPath && <Navbar />}
          <div className="flex-1">
            <Outlet />
          </div>
          {!isProfileRoute && <Footer />}
        </div>
      )}
    </div>
  );
};

export default UserLayout;
