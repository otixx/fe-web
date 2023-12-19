import { LuMail, LuMapPin, LuPhone, LuTarget, LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { privateApi } from "@/shared/axios/axios";
import { Button, Drawer, Form, Input } from "antd";
import { useProfile } from "@/service/user/user.service";
import { IProfile } from "@/interface/profile.interface";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const profile: IProfile = useProfile((state) => state?.profile);
  const getProfile = useProfile((state) => state?.getProfile);
  const { Item } = Form;

  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = (values: IProfile) => {
    privateApi
      .put(`/profile`, {
        name: values?.name,
        email: values?.email,
        nohp: values?.nohp,
        alamat: values?.alamat,
      })
      .then(() => {
        toast.success("Berhasil Update Profile");
        setOpen(false);
        getProfile();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="grid grid-cols-12 p-4">
        <div className="col-span-6">
          <h1 className="text-[18px] font-bold">Profile</h1>
        </div>
        <div className="col-span-6 flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="w-full rounded-full bg-secondColors px-5 py-2.5 text-center text-sm font-semibold text-white transition duration-700 hover:bg-mainColors sm:w-auto"
          >
            Update Profile
          </button>
        </div>
      </div>
      {open && (
        <Drawer
          title="Update Profile"
          placement="right"
          width={window.innerWidth < 768 ? "100%" : "30%"}
          onClose={() => setOpen(false)}
          open={open}
        >
          <Form
            fields={[
              {
                name: "username",
                value: profile?.name,
              },
              {
                name: "email",
                value: profile?.email,
              },
              {
                name: "phone",
                value: profile?.nohp,
              },
              {
                name: "alamat",
                value: profile?.alamat,
              },
            ]}
            onFinish={updateProfile}
            layout="vertical"
          >
            <Item
              label="name"
              name="username"
              className="block text-sm font-semibold text-black"
            >
              <Input className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black" />
            </Item>
            <Item
              label="Email"
              name="email"
              className="block text-sm font-semibold text-black"
            >
              <Input className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black" />
            </Item>
            <Item
              label="noHp"
              name="phone"
              className="block text-sm font-semibold text-black"
            >
              <Input className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black" />
            </Item>
            <Item
              label="Alamat"
              name="alamat"
              className="block text-sm font-semibold text-black"
            >
              <Input className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black" />
            </Item>

            <Item>
              <div className="flex items-center justify-center gap-2 py-2">
                <Button
                  onClick={() => setOpen(false)}
                  className=" rounded-full border border-mainColors px-10 text-center text-sm font-semibold text-black transition duration-700 hover:bg-secondColors hover:text-white focus:outline-none focus:ring-4"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className=" rounded-full bg-mainColors px-10 text-center text-sm font-semibold text-white transition duration-700 hover:bg-secondColors focus:outline-none focus:ring-4"
                >
                  Submit
                </Button>
              </div>
            </Item>
          </Form>
        </Drawer>
      )}
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-4 lg:col-span-1">
          <div className="flex justify-center lg:justify-start">
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy`}
              className="h-40 w-40 items-center rounded-full object-cover ring ring-mainColors"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-4 justify-center lg:col-span-3">
          <div className="relative mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Username
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuUser />
                <h1>
                  {profile?.name ? profile?.name : "Username anda tidak valid"}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuMail />
                <h1>
                  {profile?.email ? profile?.email : "Email anda Tidak Valid"}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              No Hp
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuPhone />
                <h1>
                  {profile?.nohp ? profile?.nohp : "No Hp Belum Dimasukkan"}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Alamat
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuMapPin />
                <h1>
                  {profile?.alamat
                    ? profile?.alamat
                    : "Alamat Belum Dimasukkan"}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Status EO
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuTarget />
                <h1>{`${
                  profile?.status_eo
                    ? "Akun anda adalah EO"
                    : "Belum Menjadi EO"
                }`}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
