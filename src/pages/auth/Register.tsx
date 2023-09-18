import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'antd'
export const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_URL}user/register`, {
        username: username,
        email: email,
        password: password,
        confpassword: confirmPassword
      })
      navigate('/signin')
    }
    catch (error: any) {
      setMsg(error.response.data.message);
    }
  }
  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg('');
      }, 2000);

    }
  }, [msg]);
  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="flex h-screen items-center justify-center gap-4">
          <div className="p-5 hidden lg:block w-2/5">
            <img src="https://www.loket.com/web/assets/img/auth/icon-login.svg" alt="" />
          </div>
          <div className="p-4 shadow-lg w-full lg:w-2/5 justify-start">
            {
              msg ? <Alert
                showIcon
                message={`${msg}`}
                type="warning"
              /> : null
            }
            <form onSubmit={handleRegister}>
              <div className='flex justify-center p-2'>
                <h1 className='font-bold text-[21px] text-mainColors'>Buat akunmu sekarang</h1>
              </div>
              <div className="flex gap-2 justify-center p-2">
                <div className="text-[#666666] text-[14px]">sudah punya akun ?</div>
                <Link to="/signin">
                  <div className="text-[14px] cursor-pointer font-bold text-mainColors">Masuk</div>
                </Link>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-[14px] font-medium text-[#666666]">Username</label>
                <input type="text" id="username" value={username} onChange={((e) => setUsername(e.target.value))} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-[14px] font-medium text-[#666666]">Email</label>
                <input type="email" id="email" value={email} onChange={((e) => setEmail(e.target.value))} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" required />
              </div>
              <div className="mb-6">
                <div className="flex justify-between  gap-4 items-center">
                  <label className="block mb-2 text-[14px] font-medium text-[#666666] ">Kata Sandi</label>
                </div>
                <input type="password" id="password" value={password} onChange={((e) => setPassword(e.target.value))} className="bg-gray-50 border border-gray-300 text-mainColors text-[14px] rounded-lg  block w-full p-2.5" required />
              </div>
              <div className="mb-6">
                <div className="flex justify-between  gap-4 items-center">
                  <label className="block mb-2 text-[14px] font-medium text-[#666666] ">Konfirmasi Kata Sandi</label>
                </div>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={((e) => setConfirmPassword(e.target.value))} className="bg-gray-50 border border-gray-300 text-mainColors text-[14px] rounded-lg  block w-full p-2.5" required />
              </div>
              <button type="submit" className="text-white bg-secondColors hover:bg-hoverMainColors font-medium rounded-lg text-[14px] lg:w-full sm:w-auto px-5 py-2.5 text-center">Daftar</button>
              <div className='py-4 text-[12px] text-[#666666] '>
                Dengan mendaftar, saya menyetujui syarat & ketentuan serta kebijakan privasi
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
