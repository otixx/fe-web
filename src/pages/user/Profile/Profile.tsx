import {
  LuMail,
  LuMapPin,
  LuPhone,
  LuTarget,
  LuUser,
  LuXCircle,
} from "react-icons/lu";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";

interface Profile {
  name: string;
  email: string;
  noHp: string;
  alamat: string;
  status_eo: boolean;
}

const Profile = () => {
  const getToken: any = Cookies.get("token");
  const token = JSON.parse(getToken);
  // const profileData = useSelector((state: any) => state.reducer.profile.data);
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    noHp: "",
    alamat: "",
    status_eo: false,
  });
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  });
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getProfile();
  }, []);

  const updateProfile = async () => {
    await axios
      .put(
        `${import.meta.env.VITE_URL}profile`,
        {
          name: username,
          email: email,
          nohp: phone,
          alamat: alamat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Berhasil Update Profile");
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 p-4">
          <div className="col-span-6">
            <h1 className="font-bold text-[18px]">Profile</h1>
          </div>
          <div className="col-span-6 flex justify-end">
            <button
              onClick={() => handleOpen()}
              className="text-white bg-secondColors font-semibold rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Update Profile
            </button>
          </div>
        </div>
        {open && (
          <Popup onConfirm={handleClose}>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  onClick={() => handleClose()}
                  className="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 rounded-full text-black w-8 h-8 inline-flex justify-center items-center"
                  data-modal-hide="authentication-modal"
                >
                  <LuXCircle />
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-2xl font-semibold text-black">
                    Edit Profile
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                          className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="text"
                        onChange={(e) => setPhone(e.target.value)}
                        className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Alamat
                      </label>
                      <textarea
                        onChange={(e) => setAlamat(e.target.value)}
                        className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                      />
                    </div>
                    <div className="flex gap-2 py-2 justify-end">
                      <button
                        type="submit"
                        onClick={() => handleClose()}
                        className=" text-black border border-mainColors focus:ring-4 focus:outline-none font-semibold rounded-full text-sm px-10 py-2 text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => updateProfile()}
                        className=" text-white bg-mainColors focus:ring-4 focus:outline-none font-semibold rounded-full text-sm px-10 py-2 text-center"
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
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="col-span-4 lg:col-span-1">
            <div className="flex justify-center lg:justify-start">
              <img
                src={
                  "https://instasize.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmunkee%2Fimage%2Fupload%2Fw_1000%2Cc_fill%2Car_1%3A1%2Cg_auto%2Cr_max%2Fv1681855894%2Finstasize-website%2Flearn%2Fblonde-woman-selfie-instagram-influencer.webp&w=640&q=75"
                }
                className="w-40 h-40 object-cover items-center ring-mainColors ring rounded-full"
                alt=""
              />
            </div>
          </div>
          <div className="justify-center col-span-4 lg:col-span-3">
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Username
              </label>
              <div className="relative">
                <div className="flex gap-4 items-center p-2 pointer-events-none">
                  <LuUser />
                  <h1>{profile.name}</h1>
                </div>
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Email
              </label>
              <div className="relative">
                <div className="flex gap-4 items-center p-2 pointer-events-none">
                  <LuMail />
                  <h1>{profile.email}</h1>
                </div>
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                No Hp
              </label>
              <div className="relative">
                <div className="flex gap-4 items-center p-2 pointer-events-none">
                  <LuPhone />
                  <h1>{profile.noHp}</h1>
                </div>
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Alamat
              </label>
              <div className="relative">
                <div className="flex gap-4 items-center p-2 pointer-events-none">
                  <LuMapPin />
                  <h1>{profile.alamat}</h1>
                </div>
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Status EO
              </label>
              <div className="relative">
                <div className="flex gap-4 items-center p-2 pointer-events-none">
                  <LuTarget />
                  <h1>{`${
                    profile.status_eo === true
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
