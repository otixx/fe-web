import { LuHome, LuUser, LuUsers } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
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
    <div className="h-screen py-5">
      <div className="space-y-4 bg-white">
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
                    <h1 className="hidden px-4 text-sm font-semibold md:block lg:block">
                      {element.name}
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
