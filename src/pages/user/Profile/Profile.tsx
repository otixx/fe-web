import mailIcon from '../../../assets/mail.svg'
import phoneIcon from '../../../assets/phone.svg'
import addressIcon from '../../../assets/address.svg'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import axios from '../../../api/axios'
import { useNavigate } from 'react-router-dom';

interface Profile {
    name: string;
    email: string;
    noHp: string;
    alamat: string;
    status_eo: boolean;
}

const Profile = () => {
    const token = Cookies.get('token')
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        noHp: '',
        alamat: '',
        status_eo: false,
    });
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [alamat, setAlamat] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/signin")
        }
    })

    const getProfile = async () => {
        await axios.get(`${import.meta.env.VITE_URL}profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setProfile(response.data)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }
    useEffect(() => {
        getProfile();
    }, []);
    const updateProfile = async () => {
        await axios.put(`${import.meta.env.VITE_URL}profile/update`, {
            name: username,
            email: email,
            nohp: phone,
            alamat: alamat,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setProfile(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <div className="p-4">
            <div className="container mx-auto">
                <div className='grid grid-cols-4 p-4'>
                    <h1 className="font-bold text-[18px]">
                        Profile
                    </h1>

                </div>
                <div className="grid grid-cols-4 gap-4 p-4">
                    <div className="col-span-4 lg:col-span-1">
                        <div className="flex justify-center lg:justify-start">
                            <img className="w-40 h-40 object-cover items-center ring-mainColors ring p-2 rounded-full" alt="" />
                        </div>
                    </div>
                    <div className="justify-center col-span-4 lg:col-span-3">
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <img className='w-4 h-4 text-gray-500' src={mailIcon} alt="" />
                                </div>
                                <input type="text" id="username" onChange={((e) => setUsername(e.target.value))} defaultValue={profile.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5" />
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <img className='w-4 h-4 text-gray-500 ' src={mailIcon} alt="" />
                                </div>
                                <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5" />
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <img className='w-4 h-4 text-gray-500 ' src={phoneIcon} alt="" />
                                </div>
                                <input type="text" id="noHp" onChange={(e) => setPhone(e.target.value)} value={phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5" />
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <img className='w-4 h-4 text-gray-500 ' src={addressIcon} alt="" />
                                </div>
                                <input type="text" id="address" onChange={(e) => setAlamat(e.target.value)} value={alamat} placeholder={profile.alamat ? profile.alamat : "Alamat Belum Diisi"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5" />
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Status Event Organizer</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <img className='w-4 h-4 text-gray-500 ' src={addressIcon} alt="" />
                                </div>
                                <input type="text" id="address" value={profile.status_eo ? 'EO' : "Bukan EO"} className="bg-gray-50 border pointer-events-none border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5" />
                            </div>
                        </div>
                        <button onClick={() => updateProfile()} className="text-white bg-secondColors font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile