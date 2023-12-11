import Footer from "@/components/common/Footer";
import Sidebar from "@/components/common/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const LayoutEO = () => {
  const registerPath = useLocation();
  const isProfileRoute = location.pathname === "/profile";

  return (
    <>
      <div className="flex flex-row">
        {registerPath?.pathname !== "/profile/eo/register" &&
          registerPath?.pathname !== "/profile/user" && <Sidebar />}
        <Outlet />
      </div>
      {isProfileRoute && <Footer />}
    </>
  );
};

export default LayoutEO;
