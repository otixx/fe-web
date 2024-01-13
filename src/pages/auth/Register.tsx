import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form, Input, Modal } from "antd";
import { publicAPi } from "@/shared/axios/axios";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { IRegisterProps } from "@/utils/interface/register.interface";

export const Register = () => {
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as IRegisterProps);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await publicAPi.post(`/user/register`, {
        username: data?.username,
        email: data?.email,
        password: data?.password,
        confpassword: data?.confirmPassword,
      });
      toast.success("Berhasil Register Akun");
      setLoading(false);
      setOpen(false);
      setTimeout(() => {
        navigate("/auth/signin");
      }, 1000);
    } catch (error: any) {
      setOpen(false);
      setStatus(false);
      setLoading(false);
      setMsg(error.response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  }, [msg]);

  return (
    <>
      <div className="w-full justify-start p-4 shadow-lg lg:w-2/5">
        {msg ? <Alert showIcon message={`${msg}`} type="warning" /> : null}
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={(e: IRegisterProps) => setData(e)}
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
                message: "• Kata sandi harus memiliki setidaknya 8 karakter",
              },
              {
                pattern: /^(?=.*[A-Z])/,
                message:
                  "• Kata sandi harus mengandung setidaknya satu huruf kapital",
              },
              {
                pattern: /^(?=.*[a-zA-Z\d!@#$%^&*])/,
                message:
                  "• Kata sandi harus mengandung kombinasi huruf, angka, dan tanda baca",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="Konfirmasi Kata Sandi"
            name="confirmPassword"
            rules={[
              { required: true, message: "Masukkan Ulang Kata Sandi" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Kata sandi harus sama"));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <button
            onClick={() => setOpen(true)}
            disabled={status}
            className={`w-full rounded-lg bg-secondColors py-2 text-center text-[14px] font-medium text-white shadow-lg hover:bg-hoverMainColors lg:w-full`}
          >
            {" "}
            {status ? <LoadingOutlined spin /> : "Register"}
          </button>
        </Form>
      </div>
      <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
        <div className="flex flex-col justify-center space-y-5">
          <div className="text-center">
            <h1 className="text-lg font-semibold">Konfirmasi Register</h1>
          </div>
          <div className="text-center text-sm">
            Harap masukkan email yang valid jika terjadi lupa password.
          </div>
          <div className="flex justify-center gap-2 py-2">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black transition duration-500 hover:border-mainColors hover:bg-mainColors hover:text-white focus:outline-none focus:ring-4"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleRegister}
              className="flex w-32 items-center justify-center rounded-full bg-mainColors py-2 text-center text-sm font-semibold text-white transition duration-500 hover:bg-secondColors focus:outline-none focus:ring-4"
            >
              {loading ? <LoadingOutlined /> : "Register"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
