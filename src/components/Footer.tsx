import { LuInstagram } from "react-icons/lu";
import logo from "/logo.png";
const Footer = () => {
  return (
    <>
      <footer className="bg-secondColors">
        <div className="container mx-auto px-4 py-10">
          <img src={logo} className="h-10 w-40" />
          <div className="flex flex-col justify-center gap-11 md:flex-row">
            <div className="mb-4 w-full md:mb-0 md:w-1/2 lg:w-1/4">
              <h4 className="mb-2 text-lg font-semibold">Informasi Kontak</h4>
              <p>Email: otatixx@gmail.com</p>
              <p>Alamat: Jl. Basuki Rahmat Taman Gading</p>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/2 lg:w-1/4">
              <h4 className="mb-2 text-lg font-semibold">Navigasi</h4>
              <ul>
                <li>
                  <a href="#" className="text-blue-500">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500">
                    Syarat dan Ketentuan
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/2 lg:w-1/4">
              <h4 className="mb-2 text-lg font-semibold">Sosial Media</h4>
              <p>Ikuti kami di:</p>
              <a
                href="https://www.instagram.com/otixx.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <LuInstagram />
              </a>
              {/* <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Twitter
              </a> */}
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/2 lg:w-1/4">
              <h4 className="mb-2 text-lg font-semibold">Tentang Kami</h4>
              <p>Deskripsi singkat tentang perusahaan atau proyek.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">&copy; 2023 OtakuTixx.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
