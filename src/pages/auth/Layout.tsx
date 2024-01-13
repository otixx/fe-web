import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useProfile } from "@/service/user/user.service";
import authImg from "../../../public/auth.svg";
const LayoutAuth = () => {
  const profile: any = useProfile((state) => state?.profile);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.status !== 403 && token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="flex h-screen items-center justify-center gap-4">
          <div className="hidden w-2/5 p-5 lg:block">
            <img src={authImg} className="object-cover" alt="" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
