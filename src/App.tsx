import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailTiket from './pages/user/Dashboard/DetailTicket';
import Login from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import DetailPayment from './pages/user/payment/DetailPayment';
import UserLayout from './layout/UserLayout';
import Index from './pages/user/Dashboard/Index';
import Profile from './pages/user/Profile/Profile';
import Error from './pages/error/Error';
import ProfileEo from './pages/user/profileeo/ProfileEo';
import DetailEvents from './pages/user/profileeo/DetailEvents';
import Riwayat from './pages/user/profileeo/Riwayat';
import RiwayatTiket from './pages/user/profileeo/RiwayatTiket';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/detail/payment" element={<DetailPayment />} />
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Index />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/eo/events' element={<ProfileEo />} />
            <Route path='/profile/eo/events/:id' element={<DetailEvents />} />
            <Route path='/profile/eo/riwayat' element={<Riwayat />} />
            <Route path='/profile/eo/riwayat/tiket/:id' element={<RiwayatTiket />} />
            <Route path="/detail/:id" element={<DetailTiket />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
