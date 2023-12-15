import { Form, Input } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { publicAPi } from "@/shared/axios/axios";

const ResetPasswordForm = () => {
  const { username } = useParams();
  const [status, setStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus(true);
    try {
      await publicAPi.put(
        `http://localhost:5000/user/reset-password/${username}`,
        { password, confPassword: confirmPassword },
      );
      setStatus(true);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      setStatus(true);
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
              { required: true, message: "tidak boleh kosong" },
              {
                min: 8,
                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  "Kata sandi min 8 char dan kombinasi huruf, angka kapital,angka dan tanda baca",
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
