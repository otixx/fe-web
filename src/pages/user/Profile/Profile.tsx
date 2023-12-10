import { LuMail, LuMapPin, LuPhone, LuTarget, LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IProfile } from "@/interface/profile/profile.interface";
import { privateApi } from "@/shared/axios/axios";
import { Drawer, Form, Input } from "antd";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [profile, setProfile] = useState<IProfile>();
  const { Item } = Form;
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await privateApi.get(`/profile`);
        setProfile(response.data);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getProfile();
  }, []);

  const updateProfile = async (values) => {
    // await privateApi
    //   .put(`/profile`, {
    //     name: username,
    //     email: email,
    //     nohp: phone,
    //     alamat: alamat,
    //   })
    //   .then(() => {
    //     toast.success("Berhasil Update Profile");
    //     setOpen(false);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //   });
    console.log(values);
  };
  return (
    <div className="p-4">
      <div className="container mx-auto">
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
            onClose={() => setOpen(false)}
            open={open}
          >
            <Form name="basic" onFinish={updateProfile} autoComplete="off">
              <div className="space-y-4">
                <Form.Item
                  name="username"
                  className="block text-sm font-semibold text-black"
                >
                  Username
                  <Input
                  // onChange={(e) => setUsername(e.target.value)}
                  // className=" block w-full rounded-sm border border-gray-300 p-2.5 text-sm  text-black hover:border-black focus:border-mainColors"
                  />
                </Form.Item>
                <div>
                  <Item
                    name="email"
                    className="block text-sm font-semibold text-black"
                  >
                    Email
                  </Item>
                  <input
                    type="text"
                    name="email"
                    // onChange={(e) => setEmail(e.target.value)}
                    className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="text"
                    // onChange={(e) => setPhone(e.target.value)}
                    className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black">
                    Alamat
                  </label>
                  <textarea
                    // onChange={(e) => setAlamat(e.target.value)}
                    className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 py-2">
                <button
                  type="submit"
                  onClick={() => setOpen(false)}
                  className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black transition duration-700 hover:bg-secondColors hover:text-white focus:outline-none focus:ring-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" rounded-full bg-mainColors px-10 py-2 text-center text-sm font-semibold text-white transition duration-700 hover:bg-secondColors focus:outline-none focus:ring-4"
                >
                  Update
                </button>
              </div>
            </Form>
          </Drawer>
        )}
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="col-span-4 lg:col-span-1">
            <div className="flex justify-center lg:justify-start">
              <img
                src={
                  "https://instasize.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmunkee%2Fimage%2Fupload%2Fw_1000%2Cc_fill%2Car_1%3A1%2Cg_auto%2Cr_max%2Fv1681855894%2Finstasize-website%2Flearn%2Fblonde-woman-selfie-instagram-influencer.webp&w=640&q=75"
                }
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
                  <h1>{profile?.name}</h1>
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
                  <h1>{profile?.email}</h1>
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
                  <h1>{profile?.noHp}</h1>
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
                  <h1>{profile?.alamat}</h1>
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
                    profile?.status_eo === true
                      ? "Akun anda adalah EO"
                      : "Belum Menjadi EO"
                  }`}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
