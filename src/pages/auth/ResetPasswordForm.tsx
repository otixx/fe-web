import { Form, Input } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { publicAPi } from "@/shared/axios/axios";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const { username } = useParams();
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setStatus(true);
    try {
      const res = await publicAPi.put(`user/reset-password/${username}`, {
        password: e?.password,
        confPassword: e?.repeatPassword,
      });
      toast.success(res?.data?.message);
      setStatus(false);
      navigate("/auth/signin");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setStatus(false);
    }
  };

  const { Item } = Form;
  return (
    <div className="container mx-auto flex h-screen items-center justify-center px-4">
      <div className="w-full justify-start rounded-lg p-4 shadow-lg lg:w-2/5">
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <div className="flex justify-center p-2">
            <h1 className="text-[21px] font-bold text-mainColors">
              Verifikasi Lupa Kata Sandi
            </h1>
          </div>

          <Item
            label="Kata Sandi Baru"
            name="password"
            rules={[
              { required: true, message: "Masukkan Kata Sandi Baru" },
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
                pattern: /^(?=.*[!@#$%^&*])/,
                message:
                  "• Kata sandi harus mengandung setidaknya satu tanda baca",
              },
              {
                pattern: /^(?=.*[a-zA-Z\d!@#$%^&*])/,
                message:
                  "• Kata sandi harus mengandung kombinasi huruf, angka, dan tanda baca",
              },
            ]}
          >
            <Input size="large" />
          </Item>

          <Item
            name="repeatPassword"
            rules={[{ required: true, message: "tidak boleh kosong" }]}
            label="Ulangi Kata Sandi Baru"
          >
            <Input size="large" />
          </Item>

          <button
            type="submit"
            className=" w-full rounded-lg bg-secondColors px-5 py-3 text-center text-[14px] font-medium text-white transition duration-700 hover:bg-hoverMainColors lg:w-full"
          >
            {" "}
            {status ? <LoadingOutlined spin /> : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
