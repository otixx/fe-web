import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import { useProfile } from "@/service/user/user.service";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { useDevice } from "@/service/device/device.service";

const UserLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isProfileRoute = location.pathname === "/profile";
  const landing = location.pathname === "/";
  const detail = useMatch("/detail/:id");
  const scannerPath = useMatch("/scan/:id");
  const token = Cookies.get("token");
  const pathname = location.pathname;
  const profile: any = useProfile((state) => state?.profile);
  const getProfile = useProfile((state) => state?.getProfile);
  const getDevice = useDevice((state) => state?.getDevice);

  const protectRoute = () => {
    if (!token && !landing && !detail) {
      navigate("/auth/signin");
    } else {
      if (
        profile?.status === 403 &&
        profile?.data === "Forbidden" &&
        !landing &&
        !detail
      ) {
        Cookies.remove("token");
        toast.error("Sesi Anda Telah Berakhir");
        navigate("/auth/signin");
      }
    }
  };
  useEffect(() => {
    const asyncComponentLoad = async () => {
      await Promise.all([
        componentLoad(),
        getProfile(),
        protectRoute(),
        getDevice(),
      ]);
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
