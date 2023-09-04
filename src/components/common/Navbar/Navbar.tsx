import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import { LuXCircle } from 'react-icons/lu';

const Navbar = () => {
    const [click, setClick] = useState(false)
    const token = Cookies.get('token')
    const navigate = useNavigate()
    const location = useLocation()
    const handleOut = () => {
        axios.delete(`https://api.otixx.online/user/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            navigate('/')
            console.log(response)
        }).catch((error) => {
            console.log("error", error.response)
        })
    }
    return (
        <>
            <header className='bg-mainColors'>
                <nav className='flex p-4 mx-auto lg:px-6 justify-between items-center'>
                    <div className="flex">
                        <div onClick={() => navigate('/')}>
                            <div className="font-bold -m-1.5 p-1.5 text-white cursor-pointer text-[18px]">
                                Otakutixx
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block lg:block">
                        {location.pathname !== "/profile" && !location.pathname.startsWith("/profile/eo") && (
                            <form>
                                <label htmlFor="default-search" className=" mb-2 text-sm font-medium text-white sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute text-white text-[20px] inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="text" className="w-full block py-3.5 px-60 pl-10 text-[14px] text-black border border-gray-300 rounded-full bg-gray-50 focus:outline-none" placeholder="Search Events..." />
                                    <button type="submit" className="text-white absolute text-[14px] right-2 bottom-1.5 bg-secondColors hover:bg-mainColors font-medium rounded-full text-sm px-4 py-2">Search</button>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className='flex gap-4'>
                        {token ? (
                            <>
                                <div onClick={() => setClick(true)} className="btnSignup cursor-pointer items-center text-[14px] bg-secondColors rounded-full h-10 w-10">
                                </div>
                                {click ? (
                                    <div className="absolute right-10 z-10 top-[70px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                            <div className='flex justify-end'>
                                                <div className='cursor-pointer' onClick={() => setClick(false)}>
                                                <LuXCircle size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                            <li>
                                                <div onClick={()=> {navigate('/profile'); setClick(false)}} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">Profile</div>
                                            </li>
                                            <li>
                                                <div onClick={()=> {navigate('/profile/eo/events'); setClick(false)}} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">Profile EO</div>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <div onClick={()=> {handleOut(); setClick(false)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-semibold">Sign out</div>
                                        </div>
                                    </div>
                                ) : null}

                            </>
                        ) : (
                            <>
                                <div onClick={()=> navigate('/signup')}>
                                    <div className="btnSignup hidden cursor-pointer lg:block border-2 text-[14px] border-secondColors hover:border-mainColors hover:bg-secondColors rounded-full py-3 px-8">
                                        <button className='text-white font-semibold'>
                                            Daftar
                                        </button>
                                    </div>
                                </div>
                                <div onClick={()=> navigate('/signin')}>
                                    <div className="btnSignin bg-secondColors hover:bg-mainColors hover:border-secondColors cursor-pointer rounded-full py-3 px-8">
                                        <button className='text-white font-semibold text-[14px]'>
                                            Masuk
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </>

    )
}

export default Navbar