import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import { useProfile } from "@/service/user/user.service";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
const UserLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isProfileRoute = location.pathname === "/profile";
  const landing = location.pathname === "/";
  const detail = useMatch("/detail/:id");
  const token = Cookies.get("token");
  const pathname = location.pathname;
  const profile: any = useProfile((state) => state?.profile);
  const getProfile = useProfile((state) => state?.getProfile);
  const componentLoad = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };
  useEffect(() => {
    componentLoad();
    protectRoute();
    getProfile();
  }, [token, landing, pathname]);

  const protectRoute = () => {
    if (!token && !landing && !detail) {
      navigate("/auth/signin");
    }

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
  };

  return (
    <div className=" max-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Outlet />
          {!isProfileRoute && <Footer />}
        </>
      )}
    </div>
  );
};

export default UserLayout;
