import { useState } from "react";
import { LuInstagram, LuMail, LuUser } from "react-icons/lu";
// import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { useProfile } from "@/service/user/user.service";

const ProfileEo = () => {
  const [open, setOpen] = useState(false);
  const profile = useProfile((state) => state?.profile);
  const { Item } = Form;
  return (
    <div className="w-full">
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-6">
          <h1 className="text-2xl font-bold">Profile EO</h1>
        </div>
        <div className="col-span-6 flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="btnSignin my-2 flex w-40 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondColors px-3 py-3 text-[14px] text-sm font-semibold text-white shadow-lg transition duration-500 hover:border-secondColors hover:bg-mainColors lg:w-48 lg:px-8 lg:py-3"
          >
            <LuUser />
            Edit Profie EO
          </button>
        </div>
      </div>
      {open && (
        <Modal
          footer={false}
          width={768}
          title="Edit Profile EO"
          open={open}
          onCancel={() => setOpen(false)}
        >
          <Form
            name="basic"
            layout="vertical"
            fields={[
              {
                name: "name",
                value: profile?.eo?.nama_eo,
              },
              {
                name: "instagram",
                value: profile?.eo?.instagram,
              },
            ]}
          >
            <Item name="name" label="Nama EO">
              <Input size="large" />
            </Item>
            <Item name="instagram" label="Nama Instagram">
              <Input addonBefore="@" size="large" />
            </Item>

            <div className="flex justify-end gap-2 py-2">
              <button
                onClick={() => setOpen(false)}
                className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black focus:outline-none focus:ring-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex w-32 items-center justify-center rounded-full bg-mainColors py-2 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4"
              >
                "Update"
                {/* {loading ? <LoadingOutlined /> : "Update"} */}
              </button>
            </div>
          </Form>
        </Modal>
      )}
      <div className="mt-5 grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 justify-center space-y-4 lg:col-span-3">
          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Username
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuUser />
                <h1>{profile?.eo?.nama_eo}</h1>
              </div>
            </div>
          </div>
          <div className="relative">
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
          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Instagram
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuInstagram />
                <h1>
                  {profile?.eo?.instagram
                    ? profile?.eo?.instagram
                    : "Instagram Belum di Masukkan"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEo;
