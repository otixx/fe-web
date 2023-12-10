import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
const UserLayout = () => {
  const location = useLocation();
  const isProfileRoute = location.pathname === "/profile";
  const landing = location.pathname === "/";
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !landing) {
      navigate("/signin");
    }
  });
  return (
    <>
      <Navbar />
      <Outlet />
      {!isProfileRoute && <Footer />}
    </>
  );
};

export default UserLayout;
