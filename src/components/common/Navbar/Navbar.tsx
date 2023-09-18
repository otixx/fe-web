import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { LuXCircle } from 'react-icons/lu';
import { fetchProfile } from '../../../feature/Profile/ProfileSlice';

const Navbar = () => {
    const [click, setClick] = useState(false)
    const token = Cookies.get('token')
    const navigate = useNavigate()
    const profileData = useSelector((state: any) => state.reducer.profile.data)
    const dispatch = useDispatch()

    const handleOut = () => {
        Cookies.remove('token')
        navigate('/signin')
    }
    useEffect(() => {
        dispatch(fetchProfile())
    }, [])

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
                                                <div onClick={() => { navigate('/profile'); setClick(false) }} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">Profile</div>
                                            </li>
                                            {
                                                profileData.status_eo === true ? (
                                                    <li>
                                                        <div onClick={() => { navigate('/profile/eo/events'); setClick(false) }} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">Profile EO</div>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <div onClick={() => { navigate('/profile/eo/register'); setClick(false) }} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">Register EO</div>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                        <div className="py-1">
                                            <div onClick={() => { handleOut(); setClick(false) }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-semibold">Sign out</div>
                                        </div>
                                    </div>
                                ) : null}

                            </>
                        ) : (
                            <>
                                <div onClick={() => navigate('/signup')}>
                                    <div className="btnSignup hidden cursor-pointer lg:block border-2 text-[14px] border-secondColors hover:border-mainColors hover:bg-secondColors rounded-full py-3 px-8">
                                        <button className='text-white font-semibold'>
                                            Daftar
                                        </button>
                                    </div>
                                </div>
                                <div onClick={() => navigate('/signin')}>
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