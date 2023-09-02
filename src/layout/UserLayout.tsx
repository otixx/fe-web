import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar/Navbar"
import Footer from "../components/common/Footer/Footer";
const UserLayout = () => {
    const location = useLocation();
    const isProfileRoute = location.pathname === '/profile';
    return (
        <>
            <Navbar />
            <Outlet />
            {!isProfileRoute && <Footer />}
        </>
    )
}

export default UserLayout