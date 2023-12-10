import { LuHome, LuUser, LuUsers } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
    const location = useLocation();
    const sideLink = [{
        id: 1,
        to: "/profile/eo/events",
        url: <LuHome />,
        name: "Events"
    }, {
        id: 2,
        to: "/profile/eo/riwayat",
        url: <LuUsers />,
        name: "Riwayat Pembeli"
    }
        , {
        id: 3,
        to: "/profile/eo",
        url: <LuUser />,
        name: "Edit Profile EO"
    }
    ]
    return (
        <div className='h-screen py-5'>
            <div className="space-y-4 bg-white">
                {
                    sideLink.map((element, index) => {
                        return (
                            <div key={index}>
                                <div className="space-y-2 font-medium">
                                    <Link to={element.to}>
                                        <div
                                            className={`cursor-pointer flex items-center py-2 px-4 text-black hover:bg-[#03034F] hover:text-white ${location.pathname === element.to ? "bg-[#03034F] text-white" : ""
                                                }`}
                                        >
                                            <span>{element.url}</span>
                                            <h1 className="px-4 hidden md:block lg:block font-semibold text-sm">{element.name}</h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar