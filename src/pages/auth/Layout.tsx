import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const LayoutAuth = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="flex h-screen items-center justify-center gap-4">
          <div className="hidden w-2/5 p-5 lg:block">
            <img
              src="https://www.loket.com/web/assets/img/auth/icon-login.svg"
              className="object-cover"
              alt=""
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
