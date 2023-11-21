import Sidebar from "../../../components/common/Sidebar/Sidebar";
// import dataEvent from "../../../api/dummy.json";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Popup from "../../../components/Popup";
import { LuXCircle } from "react-icons/lu";
import axios from "axios";
const DashboardEO = () => {
  interface Event {
    id: string;
    description: string;
    img_rundown: string;
    lokasi: string;
    nama_acara: string; // atau sesuaikan dengan struktur objek yang sebenarnya
    tanggal_acara: string;
  }
  const navigate = useNavigate();
  const getToken: any = Cookies.get("token");
  const token = JSON.parse(getToken);
  const [acara, setAcara] = useState("");
  const [description, setDescription] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<Event[]>([]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/event`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setEvent(response.data.data);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getEvent();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEvents = async () => {
    console.log(acara, description, tanggal, lokasi, file);
    await axios
      .post(
        `${import.meta.env.VITE_URL}event`,
        {
          nama_acara: acara,
          description: description,
          tanggal_acara: tanggal,
          lokasi: lokasi,
          image: file,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="py-4 px-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Event</h1>
          <div className="btnSignin bg-secondColors hover:bg-mainColors hover:border-secondColors cursor-pointer rounded-full py-3 px-8">
            <button
              onClick={() => handleOpen()}
              className="text-white font-semibold text-[14px]"
            >
              Tambah Event
            </button>
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
                      Tambahkan Events
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div>
                          <label className="block text-sm font-semibold text-black">
                            Nama Acara
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setAcara(e.target.value)}
                            className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-black">
                            Dekripsi
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Lokasi
                        </label>
                        <select
                          value={lokasi}
                          className="border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                          onChange={(e) => setLokasi(e.target.value)}
                        >
                          <option selected value="">
                            {" "}
                            Pilih Kota
                          </option>
                          <option value={`Jember`}> Jember</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Alamat
                        </label>
                        <input
                          type="date"
                          onChange={(e) => setTanggal(e.target.value)}
                          className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Gambar Event
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.value)}
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
                          onClick={() => handleAddEvents()}
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
        </div>
        <div className="py-4">
          <div className=" bg-red-200 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                List Event
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Data anda disini
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Acara
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lokasi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {event.map((element, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {element?.nama_acara}
                    </td>
                    <td className="px-6 py-4">{element?.lokasi}</td>
                    {element.tanggal_acara > new Date().toISOString() ? (
                      <>
                        <td className="px-6 py-4">tanggal masih aktif</td>
                      </>
                    ) : (
                      <>
                        <>
                          <td className="px-6 py-4">tanggal sudah lewat</td>
                        </>
                      </>
                    )}

                    <td className="flex gap-4 text-center px-6 py-4">
                      {element.tanggal_acara > new Date().toISOString() ? (
                        <>
                          <div
                            onClick={() => navigate("/profile/eo/events/12")}
                            className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline "
                          >
                            View
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{ pointerEvents: "none" }}
                            className="font-medium cursor-pointer text-gray-600 dark:text-blue-500 hover:underline "
                          >
                            View
                          </div>
                        </>
                      )}

                      <div className="font-medium cursor-pointer text-red-600 dark:text-blue-500 hover:underline">
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEO;
