import { useState } from "react";
import { LuMail, LuPhone, LuUser, LuXCircle } from "react-icons/lu";
import { privateApi } from "@/shared/axios/axios";
import Popup from "@/components/Popup";

const ProfileEo = () => {
  const [open, setOpen] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [kota, setKota] = useState("");
  const [name, setName] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const updateEO = () => {
    privateApi
      .put(`/eo/update`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile EO</h1>
        <div className="btnSignin w-32 cursor-pointer rounded-full bg-secondColors px-3 py-2 text-sm shadow-lg hover:border-secondColors hover:bg-mainColors lg:w-44 lg:px-8 lg:py-3">
          <button
            onClick={() => handleOpen()}
            className="text-[14px] font-semibold text-white"
          >
            Edit Profile EO
          </button>
        </div>
      </div>
      {open && (
        <Popup onConfirm={handleClose}>
          <div className="relative max-h-full w-full max-w-md">
            <div className="relative rounded-lg bg-white shadow">
              <button
                type="button"
                onClick={() => handleClose()}
                className="absolute right-2.5 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-black hover:bg-gray-200"
                data-modal-hide="authentication-modal"
              >
                <LuXCircle />
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-2xl font-semibold text-black">
                  Edit Profile EO
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-black">
                      Nama EO
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black">
                      Nama Instagram
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setInstagram(e.target.value)}
                      className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black">
                      Kota
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setKota(e.target.value)}
                      className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                    />
                  </div>
                  <div className="flex justify-end gap-2 py-2">
                    <button
                      type="submit"
                      onClick={() => handleClose()}
                      className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black focus:outline-none focus:ring-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => updateEO()}
                      className=" rounded-full bg-mainColors px-10 py-2 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
      <div className="mt-5 grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 justify-center lg:col-span-3">
          <div className="relative mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Username
            </label>
            <div className="relative">
              <div className="pointer-events-none flex items-center gap-4 p-2">
                <LuUser />
                {/* <h1>{profile.name}</h1> */}
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
                {/* <h1>{profile.email}</h1> */}
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
                {/* <h1>{profile.nohp}</h1> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEo;
