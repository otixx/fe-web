import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Alert, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { createLogin } from "@/service/auth/auth.service";
import { Helmet } from "react-helmet";

const Login = () => {
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const loginval = createLogin();

  const handleLogin = async (e: any) => {
    setStatus(true);
    try {
      const res = await loginval.mutateAsync({
        username: e?.username,
        password: e?.password,
      });
      Cookies.set("token", JSON.stringify(res?.data?.data));
      setStatus(false);
      toast.success("Login Berhasil!");
      navigate("/");
    } catch (error: any) {
      setStatus(false);
      if (error?.response?.status === 400) {
        setMsg(error?.response?.data?.message);
        setStatus(false);
      } else {
        setMsg(error?.response?.data?.message);
      }
    }
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
      <Helmet>
        <meta charSet="utf-8" name="login" />
        <title>Otakutixx - Login</title>
      </Helmet>
      {msg ? <Alert showIcon message={`${msg}`} type="warning" /> : null}
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 15 }}
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
          <div className="text-sm text-[#666666]">Tidak punya akun ?</div>
          <Link to="/auth/signup">
            <div className="cursor-pointer text-[14px] font-bold text-mainColors">
              Daftar
            </div>
          </Link>
        </div>
        <Form.Item
          label="Email atau username"
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
          className="w-full rounded-lg bg-secondColors px-5 py-3 text-center text-[14px] font-medium text-white shadow-lg transition duration-700 hover:bg-hoverMainColors lg:w-full"
        >
          {" "}
          {status ? <LoadingOutlined spin /> : "Masuk"}
        </button>
      </Form>
      <div className="flex justify-center pt-4">
        <h1
          onClick={() => navigate("/auth/forgot-password")}
          className="cursor-pointer text-sm text-secondColors"
        >
          Lupa Password ?
        </h1>
      </div>
    </div>
  );
};

export default Login;
