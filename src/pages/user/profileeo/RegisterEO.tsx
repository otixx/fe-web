import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Spin } from 'antd';
import { toast } from "react-hot-toast";

const RegisterEO = () => {
    const [instagram, setInstagram] = useState('');
    const [namaeo, setNamaeo] = useState('')
    const [kota, setKota] = useState('')
    const [msg, setMsg] = useState('')
    const [status, setStatus] = useState(false)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const getToken: any = Cookies.get('token')
    const token = JSON.parse(getToken)
    const navigate = useNavigate()
    const handleLogin = async (e: any) => {
        e.preventDefault()
        setTimeout(() => {
            axios.post(`${import.meta.env.VITE_URL}eo/register`, {
                instagram: instagram,
                namaeo: namaeo,
                kota: kota
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data.token)
                setStatus(false)
                toast.success('EO Berhasil! Dibuat')
                navigate('/profile/eo/events')
            })
                .catch((error: any) => {
                    if (error.response.status == 404) {
                        setMsg(error.response.data.message)
                        setStatus(false)
                    } else {
                        setMsg(error.response.data.message)
                        setStatus(false)
                    }
                    console.log(error.response)
                })
        }, 1000);
        setStatus(true)
    };

    useEffect(() => {
        if (msg) {
            setTimeout(() => {
                setMsg('');
            }, 2000);
        }
    }, [msg]);
    return (
        <div>
            <div className="container mx-auto">
                <div className="p-4">
                    <div className="flex h-screen items-center justify-center gap-4">
                        <div className="p-5 hidden lg:block w-2/5">
                            <img src="https://www.loket.com/web/assets/img/auth/icon-login.svg" className='object-cover' alt="" />
                        </div>
                        <div className="p-4 shadow-lg w-full lg:w-2/5 justify-start">
                            {
                                msg ?
                                    <Alert
                                        showIcon
                                        message={`${msg}`}
                                        type="warning"
                                    /> : null
                            }
                            <form onSubmit={handleLogin}>
                                <div className='flex justify-center p-2'>
                                    <h1 className='font-bold text-[21px] text-mainColors'>Gaweo EO Cok</h1>
                                </div>
                                <div className="flex justify-center p-2">
                                    <div className="text-[#666666] text-[14px]">Nama EO yang unik, selalu terlihat menarik</div>
                                </div>
                                <div className="mb-6">
                                    <input type="text" id="username" value={instagram} onChange={((e) => setInstagram(e.target.value))} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="masukkan username instagram" required />
                                </div>
                                <div className="mb-6">
                                    <input type="text" id="username" value={namaeo} onChange={((e) => setNamaeo(e.target.value))} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="masukkan nama EO" required />
                                </div>
                                <div className="mb-6">
                                    <input type="text" id="username" value={kota} onChange={((e) => setKota(e.target.value))} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="masukkan kota" required />
                                </div>
                                <button type="submit" className="text-white  bg-secondColors hover:bg-hoverMainColors font-medium rounded-lg text-[14px] lg:w-full sm:w-auto px-5 py-3 text-center"> {status ? <Spin indicator={antIcon} /> : "Masuk"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default RegisterEO