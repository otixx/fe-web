import { useState } from 'react'
import Sidebar from '../../../components/common/Sidebar/Sidebar';
import Popup from '../../../components/Popup';
import { LuMail, LuPhone, LuUser, LuXCircle } from 'react-icons/lu';
import axios from 'axios';
import Cookies from 'js-cookie';
const ProfileEo = () => {
    const [open, setOpen] = useState(false)
    const [instagram, setInstagram] = useState('')
    const [kota, setKota] = useState('')
    const [name, setName] = useState('')
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false)
    }
    const getDataEO = () => {
        axios.get(`${import.meta.env.VITE_URL}/profile/eo`)
    }
    const getToken: any = Cookies.get('token')
    const updateEO = () => {
        console.log(instagram)
        const token = JSON.parse(getToken)
        axios.put(`${import.meta.env.VITE_URL}eo/update`, {
            instagram: instagram,
            namaeo: name,
            kota: kota
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="py-4 px-4 w-full">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">
                        Profile EO
                    </h1>
                    <div className="btnSignin bg-secondColors hover:bg-mainColors hover:border-secondColors cursor-pointer rounded-full py-3 px-8">
                        <button onClick={() => handleOpen()} className='text-white font-semibold text-[14px]'>
                            Edit Profile EO
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
                                                className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black">
                                                Nama Instagram
                                            </label>
                                            <input
                                                type="text"
                                                onChange={((e) => setInstagram(e.target.value))}
                                                className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black">
                                                Kota
                                            </label>
                                            <input
                                                type="text"
                                                onChange={((e) => setKota(e.target.value))}
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
                                                onClick={() => updateEO()}
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
                <div className="grid grid-cols-12 mt-5 gap-4 p-4">
                    <div className="justify-center col-span-12 lg:col-span-3">
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-semibold text-gray-900">Username</label>
                            <div className="relative">
                                <div className="flex gap-4 items-center p-2 pointer-events-none">
                                    <LuUser />
                                    {/* <h1>{profile.name}</h1> */}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-semibold text-gray-900">Email</label>
                            <div className="relative">
                                <div className="flex gap-4 items-center p-2 pointer-events-none">
                                    <LuMail />
                                    {/* <h1>{profile.email}</h1> */}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block mb-2 text-sm font-semibold text-gray-900">No Hp</label>
                            <div className="relative">
                                <div className="flex gap-4 items-center p-2 pointer-events-none">
                                    <LuPhone />
                                    {/* <h1>{profile.nohp}</h1> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEo