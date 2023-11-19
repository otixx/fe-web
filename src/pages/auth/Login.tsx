import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const token = Cookies.get("token");
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      axios
        .post("https://api.otixx.online/user/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          Cookies.set("token", JSON.stringify(response.data.token));
          setStatus(false);
          toast.success("Login Berhasil!");
          if (token === undefined) {
            navigate(-1);
          } else {
            navigate("/");
          }
        })
        .catch((error: any) => {
          if (error.response.status == 404) {
            setMsg(error.response.data.message);
            setStatus(false);
          } else {
            setStatus(false);
            setMsg(error.response.data.message);
          }
        });
    }, 1000);
    setStatus(true);
  };

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  }, [msg]);

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="flex h-screen items-center justify-center gap-4">
          <div className="p-5 hidden lg:block w-2/5">
            <img
              src="https://www.loket.com/web/assets/img/auth/icon-login.svg"
              className="object-cover"
              alt=""
            />
          </div>
          <div className="p-4 shadow-lg w-full lg:w-2/5 justify-start">
            {msg ? <Alert showIcon message={`${msg}`} type="warning" /> : null}
            <form onSubmit={handleLogin}>
              <div className="flex justify-center p-2">
                <h1 className="font-bold text-[21px] text-mainColors">
                  Masuk ke akunmu
                </h1>
              </div>
              <div className="flex gap-2 justify-center p-2">
                <div className="text-[#666666] text-[14px]">
                  Tidak punya akun ?
                </div>
                <Link to="/signup">
                  <div className="text-[14px] cursor-pointer font-bold text-mainColors">
                    Daftar
                  </div>
                </Link>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-[14px] font-medium text-[#666666]">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between  gap-4 items-center">
                  <label className="block mb-2 text-[14px] font-medium text-[#666666] ">
                    Kata Sandi
                  </label>
                  <Link to={"/forgot-password"}>
                    <label className="block cursor-pointer text-[14px] font-medium hover:text-hoverMainColors text-secondColors ">
                      Lupa Kata Sandi ?
                    </label>
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-mainColors text-[14px] rounded-lg  block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white  bg-secondColors hover:bg-hoverMainColors font-medium rounded-lg text-[14px] lg:w-full sm:w-auto px-5 py-3 text-center"
              >
                {" "}
                {status ? <Spin indicator={antIcon} /> : "Masuk"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
