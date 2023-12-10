import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Alert, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { publicAPi } from "@/shared/axios/axios";

const Login = () => {
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    publicAPi
      .post(`/user/login`, {
        username: e?.username,
        password: e?.password,
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
    <div className="w-full justify-start rounded-lg p-4 shadow-lg lg:w-2/5">
      {msg ? <Alert showIcon message={`${msg}`} type="warning" /> : null}
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <div className="flex justify-center p-2">
          <h1 className="text-[21px] font-bold text-mainColors">
            Masuk ke akunmu
          </h1>
        </div>
        <div className="flex justify-center gap-2 p-2">
          <div className="text-[14px] text-[#666666]">Tidak punya akun ?</div>
          <Link to="/auth/signup">
            <div className="cursor-pointer text-[14px] font-bold text-mainColors">
              Daftar
            </div>
          </Link>
        </div>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Masukkan Username" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Masukkan Password" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <button
          type="submit"
          className=" w-full rounded-lg bg-secondColors px-5 py-3 text-center text-[14px] font-medium text-white transition duration-700 hover:bg-hoverMainColors lg:w-full"
        >
          {" "}
          {status ? <LoadingOutlined spin /> : "Masuk"}
        </button>
      </Form>
    </div>
  );
};

export default Login;
