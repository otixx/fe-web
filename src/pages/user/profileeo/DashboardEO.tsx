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
  const [file, setFile] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const [eventUpdate, setEventUpdate] = useState(false);
  const [event, setEvent] = useState<Event[]>([]);
  const [idEvent, setIdEvent] = useState("");

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE_URL}/event`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  const handleOpenUpdate = (id: string) => {
    setIdEvent(id);
    setEventUpdate(true);
  };
  const handleCloseUpdate = () => {
    setEventUpdate(false);
  };
  const handleAddEvents = async () => {
    console.log(acara, description, tanggal, lokasi, file);

    const formData = new FormData();

    // Append additional fields
    formData.append("nama_acara", acara);
    formData.append("description", description);

    const dateObject = new Date(tanggal);

    // Dapatkan tanggal, bulan, dan tahun dari objek Date
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Ingat: bulan dimulai dari 0
    const year = dateObject.getFullYear();

    // Format tanggal, bulan, dan tahun sesuai dengan "DD/MM/YYYY"
    const formattedDate = `${day}/${month}/${year}`;
    formData.append(
      "tanggal_acara",
      formattedDate === "NaN/NaN/NaN" ? "" : formattedDate
    );
    formData.append("lokasi", lokasi);

    // Append multiple files
    file.forEach((fileItem) => formData.append("image", fileItem));

    await axios
      .post(`${import.meta.env.VITE_BE_URL}/event`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleUpdateEvents = async () => {
    console.log(acara, description, tanggal, lokasi, file);
    const formData = new FormData();

    // Append additional fields
    formData.append("nama_acara", acara);
    formData.append("description", description);

    const dateObject = new Date(tanggal);

    // Dapatkan tanggal, bulan, dan tahun dari objek Date
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Ingat: bulan dimulai dari 0
    const year = dateObject.getFullYear();

    // Format tanggal, bulan, dan tahun sesuai dengan "DD/MM/YYYY"
    const formattedDate = `${day}/${month}/${year}`;
    formData.append(
      "tanggal_acara",
      formattedDate === "NaN/NaN/NaN" ? "" : formattedDate
    );
    formData.append("lokasi", lokasi);

    // Append multiple files
    file.forEach((fileItem) => formData.append("image", fileItem));

    await axios
      .put(`${import.meta.env.VITE_BE_URL}/event/update/${idEvent}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcara("");
        setDescription("");
        setLokasi("");
        setTanggal("");
        setFile([]);
        handleCloseUpdate();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList) as File[];

      if (fileArray.length > 1) {
        fileArray.forEach((item) => {
          setFile((prevFiles) => [...prevFiles, item]);
        });
      } else {
        setFile(fileArray);
      }
    }
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
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Nama Acara
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setAcara(e.target.value)}
                        className=" border border-gray-300 text-black text-sm rounded-sm  block w-full h-10 p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Dekripsi
                      </label>
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className=" border border-gray-300 text-black text-sm rounded-sm  block w-full h-20 p-2.5"
                      />
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
                          Lokasi
                        </option>
                        <option value={`Jember`}> Jember</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Tanggal Acara
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
                        id="imageUpload"
                        name="imageUpload"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
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
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        )}
        {eventUpdate && (
          <Popup onConfirm={handleCloseUpdate}>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  onClick={() => handleCloseUpdate()}
                  className="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 rounded-full text-black w-8 h-8 inline-flex justify-center items-center"
                  data-modal-hide="authentication-modal"
                >
                  <LuXCircle />
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-2xl font-semibold text-black">
                    Update Events
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Nama Acara
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setAcara(e.target.value)}
                        className=" border border-gray-300 text-black text-sm rounded-sm  block w-full h-10 p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Dekripsi
                      </label>
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className=" border border-gray-300 text-black text-sm rounded-sm  block w-full h-20 p-2.5"
                      />
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
                          Lokasi
                        </option>
                        <option value={`Jember`}> Jember</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black">
                        Tanggal Acara
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
                        id="imageUpload"
                        name="imageUpload"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                      />
                    </div>
                    <div className="flex gap-2 py-2 justify-end">
                      <button
                        type="submit"
                        onClick={() => handleCloseUpdate()}
                        className=" text-black border border-mainColors focus:ring-4 focus:outline-none font-semibold rounded-full text-sm px-10 py-2 text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateEvents()}
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
                        <td className="px-6 py-4">tanggal sudah lewat</td>
                      </>
                    )}

                    <td className="flex gap-4 text-center px-6 py-4">
                      {element.tanggal_acara > new Date().toISOString() ? (
                        <>
                          <div
                            onClick={() => handleOpenUpdate(element.id)}
                            className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              navigate(`/profile/eo/events/${element.id}`)
                            }
                            className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline "
                          >
                            View
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{ pointerEvents: "none" }}
                            className="font-medium cursor-pointer text-gray-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </div>
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
