import { LuInstagram } from "react-icons/lu";
import logo from "/logo.png";
const Footer = () => {
  return (
    <>
      <footer className="bg-secondColors">
        <div className="container mx-auto px-4 py-10">
          <img src={logo} className="w-40" />
          <div className="flex flex-col justify-center gap-11 md:flex-row">
            <div className="mb-4 w-full md:mb-0 md:w-1/2 lg:w-1/4">
              <h4 className="mb-2 text-lg font-semibold">Informasi Kontak</h4>
              <p className="text-gray-400">Email: otatixx@gmail.com</p>
              <p className="text-gray-400">
                Alamat: Jl. Basuki Rahmat Taman Gading
              </p>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/2 lg:w-1/4">
              <h4 className="mb-2 text-lg font-semibold">Navigasi</h4>
              <ul>
                <li>
                  <a className="text-gray-400">Kebijakan Privasi</a>
                </li>
                <li>
                  <a className="text-gray-400">Syarat dan Ketentuan</a>
                </li>
              </ul>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/2 lg:w-1/4">
              <p className="text-lg font-semibold">Ikuti kami di:</p>
              <a
                href="https://www.instagram.com/otixx.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400"
              >
                <LuInstagram />
                Instagram
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-semibold text-gray-300">
              &copy; 2023 OtakuTixx.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
