import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Form, Input, Select, Spin } from "antd";
import { toast } from "react-hot-toast";
import { privateApi } from "@/shared/axios/axios";

const RegisterEO = () => {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { Item } = Form;

  const handleLogin = async (value: any) => {
    setStatus(true);
    try {
      await privateApi.post(`/eo/register`, {
        instagram: "@" + value?.instagram,
        namaeo: "EO" + value?.nama,
        kota: value?.lokasi,
      });
      setStatus(false);
      toast.success("EO Berhasil! Dibuat");
      navigate("/profile/eo/events");
    } catch (error: any) {
      if (error?.response?.status == 404) {
        setMsg(error?.response?.data.message);
        setStatus(false);
      } else {
        setMsg(error?.response?.data.message);
        setStatus(false);
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

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
            <Form onFinish={handleLogin}>
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
              <Item name="instagram">
                <Input
                  addonBefore="@"
                  placeholder="Masukkan Username Instagram anda"
                  size="large"
                />
              </Item>
              <Item name="nama">
                <Input
                  addonBefore="EO"
                  placeholder="Masukkan Nama EO anda"
                  size="large"
                />
              </Item>
              <Item
                rules={[{ required: true, message: "Lokasi Event Wajib" }]}
                name="lokasi"
              >
                <Select
                  size="large"
                  showSearch
                  placeholder="Pilih Kota"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={[
                    {
                      value: "jember",
                      label: "Jember",
                    },
                  ]}
                />
              </Item>
              <button
                type="submit"
                className="rounded-lg bg-secondColors px-5 py-3 text-center text-[14px] font-medium text-white transition duration-500 hover:bg-hoverMainColors sm:w-auto lg:w-full"
              >
                {" "}
                {status ? <Spin indicator={antIcon} /> : "Register"}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEO;
