import Sidebar from "../../../components/common/Sidebar/Sidebar";
import dataEvent from "../../../api/dummy.json";
import Popup from "../../../components/Popup";
import { useState } from "react";
import { LuXCircle } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";

const DetailEvents = () => {
  const [open, setOpen] = useState(false);
  const [kegiatan, setKegiatan] = useState("");
  const [harga, setHarga] = useState("");
  const [tags, setTags] = useState("");
  const [preorder, setPreorder] = useState("");
  const [expired, setExpired] = useState("");
  const [file, setFile] = useState("");

  const getToken: any = Cookies.get("token");
  const token = JSON.parse(getToken);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const id = 12;
  const handleAddTiket = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL}tiket/${id}`,
        {
          nama_kegiatan: kegiatan,
          harga: harga,
          tags: tags,
          tanggal_preorder: preorder,
          tanggal_expired: expired,
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
        console.log(error);
      });
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
                      <div className="flex gap-3">
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
                            type="text"
                            onChange={(e) => setHarga(e.target.value)}
                            className=" border border-gray-300 text-black text-sm rounded-sm  block w-full p-2.5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Lokasi
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
                {dataEvent.map((element, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {element?.name}
                    </th>
                    <td className="px-6 py-4">{element?.harga}</td>
                    <td className="px-6 py-4">{element?.tags}</td>
                    <td className="px-6 py-4">{element?.tgl_pre}</td>
                    <td className="px-6 py-4">{element?.tgl_exp}</td>
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
