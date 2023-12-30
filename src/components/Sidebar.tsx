import { useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuHome,
  LuUser,
  LuUsers,
} from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const location = useLocation();
  const sideLink = [
    {
      id: 1,
      to: "/profile/eo/events",
      subUrl: "/profile/eo/events/:id",
      url: <LuHome />,
      name: "Events",
    },
    {
      id: 2,
      to: "/profile/eo/riwayat",
      subUrl: "",
      url: <LuUsers />,
      name: "Riwayat Pembeli",
    },
    {
      id: 3,
      to: "/profile/usereo",
      subUrl: "",
      url: <LuUser />,
      name: "Edit Profile EO",
    },
  ];

  return (
    <div
      className={`relative h-screen  py-5 transition-all duration-500 ${
        expand ? "w-56" : "w-16"
      }`}
    >
      <div className="space-y-4 bg-white pt-10">
        {sideLink.map((element, index) => {
          return (
            <div key={index}>
              <div className="space-y-2 font-medium">
                <Link to={element.to}>
                  <div
                    className={`flex cursor-pointer items-center px-4 py-2 text-black hover:bg-[#03034F] hover:text-white ${
                      location.pathname.includes(element.to) ||
                      (element.subUrl &&
                        location.pathname.includes(element.subUrl))
                        ? "bg-[#03034F] text-white"
                        : ""
                    }`}
                  >
                    <span>{element.url}</span>
                    <h1 className=" px-4 text-sm font-semibold md:block lg:block">
                      {expand && element.name}
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => setExpand(!expand)}
          className="absolute -right-5 -top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-mainColors text-white transition duration-200 hover:bg-secondColors"
        >
          {expand ? <LuArrowLeft /> : <LuArrowRight />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
