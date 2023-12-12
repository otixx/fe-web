import { useState, useEffect } from "react";
import { LuXCircle } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "@/components/user/Popup";
import { privateApi } from "@/shared/axios/axios";

const DetailEvents = () => {
  interface Tiket {
    id: string;
    nama_kegiatan: string;
    tags: string;
    tanggal_preorder: string;
    tanggal_expired: string;
    harga: string;
  }
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [kegiatan, setKegiatan] = useState("");
  const [harga, setHarga] = useState("");
  const [tags, setTags] = useState("");
  const [preorder, setPreorder] = useState("");
  const [expired, setExpired] = useState("");
  const [file, setFile] = useState<File[]>([]);
  const [tiket, setTiket] = useState<Tiket[]>([]);
  const idEvent = useParams().id;
  // Check Device  -------------------------------------------------------
  let userAgent = navigator.userAgent;

  // Mengekstrak informasi tambahan dari User Agent String
  let isMobile = /Mobi/.test(userAgent);
  let isTablet = /Tablet|iPad/.test(userAgent);
  let isDesktop = !isMobile && !isTablet;
  // Check Device End -------------------------------------------------------

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await privateApi.get(
          `${import.meta.env.VITE_BE_URL}/tiket/event/${idEvent}`,
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
      formatTanggal(preorder) === "NaN/NaN/NaN" ? "" : formatTanggal(preorder),
    );
    formData.append(
      "tanggal_expired",
      formatTanggal(expired) === "NaN/NaN/NaN" ? "" : formatTanggal(expired),
    );

    // Append multiple files
    file.forEach((fileItem) => formData.append("image", fileItem));
    console.log(kegiatan);
    console.log(harga);
    console.log(tags);
    console.log(preorder);
    console.log(expired);
    console.log(file);
    await privateApi
      .post(`/tiket/${idEvent}`, {
        nama_kegiatan: kegiatan,
        harga: harga,
        tags: tags,
        tanggal_preorder: preorder,
        tanggal_expired: expired,
        image: file,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className="flex w-full flex-row">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Event / Tiket</h1>
          <div className="flex">
            <div className="mr-5 cursor-pointer rounded-full bg-secondColors px-8 py-3 hover:border-secondColors hover:bg-mainColors">
              <button
                onClick={() => handleOpen()}
                className="text-[14px] font-semibold text-white"
              >
                Tambah Tiket
              </button>
            </div>
            {isDesktop === true ? null : (
              <div className="cursor-pointer rounded-full bg-secondColors px-8 py-3 hover:border-secondColors hover:bg-mainColors">
                <button
                  onClick={() => navigate("/scan")}
                  className="text-[14px] font-semibold text-white"
                >
                  Scan
                </button>
              </div>
            )}
          </div>

          {open && (
            <Popup onConfirm={handleClose}>
              <div className="relative max-h-full w-full max-w-md">
                <div className="relative rounded-lg bg-white shadow">
                  <button
                    type="button"
                    onClick={() => handleClose()}
                    className="absolute right-2.5 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-black hover:bg-gray-200"
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
                          className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
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
                          className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Tags
                        </label>
                        <select
                          value={tags}
                          className="block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
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
                          className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black">
                          Tanggal Expired
                        </label>
                        <input
                          type="date"
                          onChange={(e) => setExpired(e.target.value)}
                          className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
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
                          className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                        />
                      </div>
                      <div className="flex justify-end gap-2 py-2">
                        <button
                          type="submit"
                          onClick={() => handleClose()}
                          className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black focus:outline-none focus:ring-4"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddTiket()}
                          className=" rounded-full bg-mainColors px-10 py-2 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4"
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
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                List Tiket
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Data anda disini
                </p>
              </caption>
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {element?.nama_kegiatan}
                    </th>
                    <td className="px-6 py-4">{element?.harga}</td>
                    <td className="px-6 py-4">{element?.tags}</td>
                    <td className="px-6 py-4">{`${new Date(
                      element?.tanggal_preorder,
                    ).getDate()} ${new Date(
                      element?.tanggal_preorder,
                    ).toLocaleString("default", { month: "long" })} ${new Date(
                      element?.tanggal_preorder,
                    ).getFullYear()}`}</td>
                    <td className="px-6 py-4">{`${new Date(
                      element?.tanggal_expired,
                    ).getDate()} ${new Date(
                      element?.tanggal_expired,
                    ).toLocaleString("default", { month: "long" })} ${new Date(
                      element?.tanggal_expired,
                    ).getFullYear()}`}</td>
                    <td className="flex gap-4 px-6 py-4 text-center">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
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
