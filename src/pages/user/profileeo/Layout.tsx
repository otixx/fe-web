import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { useProfile } from "@/service/user/user.service";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const LayoutEO = () => {
  const registerPath = useLocation();
  const isProfileRoute = location.pathname === "/profile";
  const profile = useProfile((state) => state?.profile);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    protectRouteEO();
  }, []);

  const protectRouteEO = () => {
    if (token && !profile?.status_eo) {
      // aktifkan jika sudah banyak EO
      // navigate("/profile/eo/register");
      navigate("/");
    } else if (
      token &&
      profile?.status_eo &&
      registerPath?.pathname === "/profile/eo/register"
    ) {
      navigate("/");
    }
  };
  return (
    <>
      <div className="flex flex-row">
        {registerPath?.pathname !== "/profile/eo/register" &&
          registerPath?.pathname !== "/profile" && <Sidebar />}
        <Outlet />
      </div>
      {isProfileRoute && <Footer />}
    </>
  );
};

export default LayoutEO;
