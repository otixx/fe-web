import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { publicAPi } from "@/shared/axios/axios";

const ResetPassword = () => {
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    publicAPi
      .post(`/user/forgot-password`, {
        email: e?.email,
      })
      .then((response) => {
        setStatus(false);
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigate("/auth/signin");
        }, 1000);
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
            Lupa Kata Sandi
          </h1>
        </div>
        <div className="flex justify-center gap-2 p-2">
          <div className="text-center text-[14px] text-[#666666]">
            masukkan email kamu untuk verifikasi lebih lanjut, dan link akan
            dikirimkan ke email kamu
          </div>
        </div>
        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: "Masukkan Email" },
            {
              type: "email",
              message: "Masukkan Email yang valid",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <button
          type="submit"
          className=" w-full rounded-lg bg-secondColors px-5 py-3 text-center text-[14px] font-medium text-white transition duration-700 hover:bg-hoverMainColors lg:w-full"
        >
          {" "}
          {status ? <LoadingOutlined spin /> : "Submit"}
        </button>
      </Form>
    </div>
  );
};

export default ResetPassword;
