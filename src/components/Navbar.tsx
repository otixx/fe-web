import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LuKey, LuLogOut, LuUser, LuUserCog } from "react-icons/lu";
import { Avatar, Dropdown } from "antd";
import { useProfile } from "@/service/user/user.service";
import { ItemType } from "@/interface/navbar.interface";
const Navbar = () => {
  const navigate = useNavigate();
  const profile: any = useProfile((state) => state?.profile);
  const isEO = profile?.status_eo;
  const styleMenuItems = `flex cursor-pointer items-center gap-2`;

  const handleOut = () => {
    Cookies.remove("token");
    navigate("/auth/signin");
  };

  const items: ItemType[] = [
    {
      key: "1",
      label: (
        <div className={styleMenuItems}>
          <LuUser /> Profile
        </div>
      ),
      onClick: () => navigate("/profile"),
    },
    ...(isEO
      ? [
          {
            key: "2",
            label: (
              <div className={styleMenuItems}>
                <LuUserCog /> Profile EO
              </div>
            ),
            onClick: () => navigate("/profile/eo/events"),
          },
        ]
      : [
          {
            key: "3",
            label: (
              <div className={styleMenuItems}>
                <LuKey /> Register EO
              </div>
            ),
            onClick: () => navigate("/profile/eo/register"),
          },
        ]),
    {
      key: "4",
      label: (
        <div className={styleMenuItems}>
          <LuLogOut /> History
        </div>
      ),
      onClick: () => navigate("/history"),
    },
    {
      key: "5",
      label: (
        <div className={styleMenuItems}>
          <LuLogOut /> Sign Out
        </div>
      ),
      onClick: () => handleOut(),
    },
  ];

  return (
    <>
      <header className="bg-mainColors shadow-lg shadow-slate-300">
        <nav className="mx-auto flex items-center justify-between p-4 lg:px-6">
          <div className="flex">
            <div onClick={() => navigate("/")}>
              <div className="-m-1.5 cursor-pointer p-1.5 text-[18px] font-bold text-white">
                Otakutixx
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {profile && profile?.status == 403 ? (
              <>
                <div onClick={() => navigate("/auth/signup")}>
                  <div className="btnSignup hidden cursor-pointer rounded-full border-2 border-secondColors px-8 py-3 text-[14px] transition duration-700 hover:border-mainColors hover:bg-secondColors lg:block">
                    <button className="font-semibold text-white">Daftar</button>
                  </div>
                </div>
                <div onClick={() => navigate("/auth/signin")}>
                  <div className="btnSignin cursor-pointer rounded-full border-2 border-mainColors bg-secondColors px-8 py-3 transition duration-700 hover:border-2 hover:border-secondColors hover:bg-mainColors">
                    <button className="text-[14px] font-semibold text-white">
                      Masuk
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <div className="flex cursor-pointer items-center gap-2 font-semibold text-white">
                    <Avatar
                      size={35}
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy`}
                    />
                    Hi,
                    <span className="font-medium"> {profile?.name}</span>
                  </div>
                </Dropdown>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
