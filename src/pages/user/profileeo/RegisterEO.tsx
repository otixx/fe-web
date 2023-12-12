import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Spin } from "antd";
import { toast } from "react-hot-toast";
import { privateApi } from "@/shared/axios/axios";

const RegisterEO = () => {
  const [instagram, setInstagram] = useState("");
  const [namaeo, setNamaeo] = useState("");
  const [kota, setKota] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      privateApi
        .post(`/eo/register`, {
          instagram: instagram,
          namaeo: namaeo,
          kota: kota,
        })
        .then((response) => {
          console.log(response.data.token);
          setStatus(false);
          toast.success("EO Berhasil! Dibuat");
          navigate("/profile/eo/events");
        })
        .catch((error: any) => {
          if (error.response.status == 404) {
            setMsg(error.response.data.message);
            setStatus(false);
          } else {
            setMsg(error.response.data.message);
            setStatus(false);
          }
          console.log(error.response);
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
          <div className="w-full justify-start p-4 shadow-lg lg:w-2/5">
            {msg ? <Alert showIcon message={`${msg}`} type="warning" /> : null}
            <form onSubmit={handleLogin}>
              <div className="flex justify-center p-2">
                <h1 className="text-[21px] font-bold text-mainColors">
                  Gaweo EO Cok
                </h1>
              </div>
              <div className="flex justify-center p-2">
                <div className="text-[14px] text-[#666666]">
                  Nama EO yang unik, selalu terlihat menarik
                </div>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="username"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  placeholder="masukkan username instagram"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="username"
                  value={namaeo}
                  onChange={(e) => setNamaeo(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  placeholder="masukkan nama EO"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="username"
                  value={kota}
                  onChange={(e) => setKota(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  placeholder="masukkan kota"
                  required
                />
              </div>
              <button
                type="submit"
                className="rounded-lg  bg-secondColors px-5 py-3 text-center text-[14px] font-medium text-white hover:bg-hoverMainColors sm:w-auto lg:w-full"
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

export default RegisterEO;
