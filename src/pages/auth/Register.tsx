import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form, Input } from "antd";
import { publicAPi } from "@/shared/axios/axios";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { IRegisterProps } from "@/interface/register.interface";

export const Register = () => {
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: IRegisterProps) => {
    try {
      await publicAPi.post(`/user/register`, {
        username: e?.username,
        email: e?.email,
        password: e?.password,
        confpassword: e?.confirmPassword,
      });
      toast.success("Berhasil Register Akun");
      setTimeout(() => {
        navigate("/auth/signin");
      }, 1000);
    } catch (error: any) {
      setStatus(false);
      setMsg(error.response.data.message);
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
    <div className="w-full justify-start p-4 shadow-lg lg:w-2/5">
      {msg ? <Alert showIcon message={`${msg}`} type="warning" /> : null}
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        autoComplete="off"
      >
        <div className="flex justify-center p-2">
          <h1 className="text-[21px] font-bold text-mainColors">
            Buat akunmu sekarang
          </h1>
        </div>
        <div className="flex justify-center gap-2 p-2">
          <div className="text-[14px] text-[#666666]">sudah punya akun ?</div>
          <Link to="/auth/signin">
            <div className="cursor-pointer text-[14px] font-bold text-mainColors">
              Masuk
            </div>
          </Link>
        </div>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Masukkan Username" },
            {
              min: 5,
              message: "Username min 5 char",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Masukkan Email" },
            {
              type: "email",
              message: "Harap masukkan email yang benar",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Kata Sandi"
          name="password"
          rules={[
            { required: true, message: "Masukkan Kata Sandi" },
            {
              min: 8,
              pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                "Kata sandi min 8 char dan kombinasi huruf, angka kapital,angka dan tanda baca",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Konfirmasi Kata Sandi"
          name="confirmPassword"
          rules={[{ required: true, message: "Masukkan Ulang Kata Sandi" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <button
          type="submit"
          disabled={status}
          className={`w-full rounded-lg bg-secondColors py-2 text-center text-[14px] font-medium text-white hover:bg-hoverMainColors lg:w-full`}
        >
          {" "}
          {status ? <LoadingOutlined spin /> : "Register"}
        </button>
      </Form>
    </div>
  );
};
