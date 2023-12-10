import Sidebar from "../../../components/common/Sidebar/Sidebar";
// import dataEvent from "../../../api/dummy.json";
import Popup from "../../../components/Popup";
import { useState, useEffect } from "react";
import { LuXCircle } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const DetailEvents = () => {
  interface Tiket {
    id: string;
    nama_kegiatan: string;
    tags: string;
    tanggal_preorder: string;
    tanggal_expired: string;
    harga: string;
  }
  const [open, setOpen] = useState(false);
  const [kegiatan, setKegiatan] = useState("");
  const [harga, setHarga] = useState("");
  const [tags, setTags] = useState("");
  const [preorder, setPreorder] = useState("");
  const [expired, setExpired] = useState("");
  const [file, setFile] = useState<File[]>([]);
  const [tiket, setTiket] = useState<Tiket[]>([]);
  const idEvent = useParams().id;

  const getToken: any = Cookies.get("token");
  const token = JSON.parse(getToken);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE_URL}/tiket/event/${idEvent}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTiket(response.data.data);
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

  const handleAddTiket = async () => {
    const formData = new FormData();

    // Append additional fields
    formData.append("nama_kegiatan", kegiatan);
    formData.append("harga", harga);
    formData.append("tags", tags);

    function formatTanggal(tanggal: any) {
      const dateObject = new Date(tanggal);

      // Dapatkan tanggal, bulan, dan tahun dari objek Date
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1; // Ingat: bulan dimulai dari 0
      const year = dateObject.getFullYear();

      // Format tanggal, bulan, dan tahun sesuai dengan "DD/MM/YYYY"
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }

    formData.append(
      "tanggal_preorder",
      formatTanggal(preorder) === "NaN/NaN/NaN" ? "" : formatTanggal(preorder)
    );
    formData.append(
      "tanggal_expired",
      formatTanggal(expired) === "NaN/NaN/NaN" ? "" : formatTanggal(expired)
    );

    // Append multiple files
    file.forEach((fileItem) => formData.append("image", fileItem));
    // await axios
    //   .post(
    //     `${import.meta.env.VITE_BE_URL}/tiket/${idEvent}`,
    //     {
    //       nama_kegiatan: kegiatan,
    //       harga: harga,
    //       tags: tags,
    //       tanggal_preorder: preorder,
    //       tanggal_expired: expired,
    //       image: file,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(formData);
  };

  // const handleUpdateTiket = async () => {
  //     await axios.put(`${import.meta.env.VITE_URL}tiket/${id}`, {
  //         nama_kegiatan: kegiatan,
  //         harga: harga,
  //         tags: tags,
  //         tanggal_preorder: preorder,
  //         tanggal_expired: expired,
  //         image: file
  //     }, {
  //         headers: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     }).then((response) => {
  //         console.log(response)
  //     }).catch((error) => {
  //         console.log(error)
  //     })
  // }
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="py-4 px-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Event / Tiket</h1>
          <div className="btnSignin bg-secondColors hover:bg-mainColors hover:border-secondColors cursor-pointer rounded-full py-3 px-8">
            <button
              onClick={() => handleOpen()}
              className="text-white font-semibold text-[14px]"
            >
              Tambah Tiket
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
                      Tambahkan Tiket
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Nama Tiket
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setKegiatan(e.target.value)}
                          className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          harga
                        </label>
                        <input
                          type="number"
                          min="10000"
                          step="100"
                          required
                          onChange={(e) => setHarga(e.target.value)}
                          className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Tags
                        </label>
                        <select
                          value={tags}
                          className="border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                          onChange={(e) => setTags(e.target.value)}
                        >
                          <option selected value="">
                            {" "}
                            Pilih Tags
                          </option>
                          <option value={`Music`}> Music</option>
                          <option value={`Cosplay`}> Cosplayer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Tanggal Preorder
                        </label>
                        <input
                          type="date"
                          onChange={(e) => setPreorder(e.target.value)}
                          className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Tanggal Expired
                        </label>
                        <input
                          type="date"
                          onChange={(e) => setExpired(e.target.value)}
                          className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Gambar Tiket
                        </label>
                        <input
                          type="file"
                          accept="image/*"
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
                          onClick={() => handleAddTiket()}
                          className=" text-white bg-mainColors focus:ring-4 focus:outline-none font-semibold rounded-full text-sm px-10 py-2 text-center"
                        >
                          Submit
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
                List Tiket
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Data anda disini
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Tiket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tgl Preorder
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tgl Exp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiket.map((element, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {element?.nama_kegiatan}
                    </th>
                    <td className="px-6 py-4">{element?.harga}</td>
                    <td className="px-6 py-4">{element?.tags}</td>
                    <td className="px-6 py-4">{`${new Date(
                      element?.tanggal_preorder
                    ).getDate()} ${new Date(
                      element?.tanggal_preorder
                    ).toLocaleString("default", { month: "long" })} ${new Date(
                      element?.tanggal_preorder
                    ).getFullYear()}`}</td>
                    <td className="px-6 py-4">{`${new Date(
                      element?.tanggal_expired
                    ).getDate()} ${new Date(
                      element?.tanggal_expired
                    ).toLocaleString("default", { month: "long" })} ${new Date(
                      element?.tanggal_expired
                    ).getFullYear()}`}</td>
                    <td className="flex gap-4 text-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </a>
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

export default DetailEvents;
