import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
      <div className="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-2xl font-bold text-mainColors">
                Maaf, sepertinya Anda tersesat.
              </h1>
              <p className="my-2 text-mainColors">
                Halaman yang Anda cari tidak ditemukan dan Silakan periksa
                kembali URL atau kunjungi halaman utama kami.
              </p>
              <button
                onClick={() => navigate("/")}
                className="md my-2 rounded border bg-mainColors px-8 py-4 text-center font-semibold text-white hover:bg-secondColors focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 sm:w-full lg:w-auto"
              >
                Kembali Ke Beranda
              </button>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default Error;
