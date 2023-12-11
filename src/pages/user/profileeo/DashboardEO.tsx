import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuXCircle } from "react-icons/lu";
import { privateApi } from "@/shared/axios/axios";
import Popup from "@/components/user/Popup";
import { QfindEvents } from "@/service/events/events.service";

const DashboardEO = () => {
  const navigate = useNavigate();
  const [acara, setAcara] = useState("");
  const [description, setDescription] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [file, setFile] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const [eventUpdate, setEventUpdate] = useState(false);
  const [idEvent, setIdEvent] = useState("");

  const { data: event } = QfindEvents();

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
    const formData = new FormData();
    formData.append("nama_acara", acara);
    formData.append("description", description);

    const dateObject = new Date(tanggal);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    formData.append(
      "tanggal_acara",
      formattedDate === "NaN/NaN/NaN" ? "" : formattedDate,
    );
    formData.append("lokasi", lokasi);

    file.forEach((fileItem) => formData.append("image", fileItem));

    await privateApi
      .post(`/event`, formData)
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((error) => {
        console.log(error.response.data, "sd");
      });
  };

  const handleUpdateEvents = async () => {
    console.log(acara, description, tanggal, lokasi, file);
    const formData = new FormData();

    formData.append("nama_acara", acara);
    formData.append("description", description);

    const dateObject = new Date(tanggal);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    formData.append(
      "tanggal_acara",
      formattedDate === "NaN/NaN/NaN" ? "" : formattedDate,
    );
    formData.append("lokasi", lokasi);

    file.forEach((fileItem) => formData.append("image", fileItem));

    await privateApi
      .put(`/event/update/${idEvent}`, formData)
      .then(() => {
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
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Event</h1>
        <div className="btnSignin cursor-pointer rounded-full bg-secondColors px-8 py-3 hover:border-secondColors hover:bg-mainColors">
          <button
            onClick={() => handleOpen()}
            className="text-[14px] font-semibold text-white"
          >
            Tambah Event
          </button>
        </div>
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
                      className=" block h-10 w-full rounded-sm border  border-gray-300 p-2.5 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black">
                      Dekripsi
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      className=" block h-20 w-full rounded-sm border  border-gray-300 p-2.5 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black">
                      Lokasi
                    </label>
                    <select
                      value={lokasi}
                      className="block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                      onChange={(e) => setLokasi(e.target.value)}
                    >
                      <option selected value={""}>
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
                      className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
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
                      onClick={() => handleAddEvents()}
                      className=" rounded-full bg-mainColors px-10 py-2 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4"
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
          <div className="relative max-h-full w-full max-w-md">
            <div className="relative rounded-lg bg-white shadow">
              <button
                type="button"
                onClick={() => handleCloseUpdate()}
                className="absolute right-2.5 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-black hover:bg-gray-200"
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
                      className=" block h-10 w-full rounded-sm border  border-gray-300 p-2.5 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black">
                      Dekripsi
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      className=" block h-20 w-full rounded-sm border  border-gray-300 p-2.5 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black">
                      Lokasi
                    </label>
                    <select
                      value={lokasi}
                      className="block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
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
                      className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
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
                      className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                    />
                  </div>
                  <div className="flex justify-end gap-2 py-2">
                    <button
                      type="submit"
                      onClick={() => handleCloseUpdate()}
                      className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black focus:outline-none focus:ring-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateEvents()}
                      className=" rounded-full bg-mainColors px-10 py-2 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4"
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
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
              List Event
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Lihat Semua Data anda disini
              </p>
            </caption>
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
              {event &&
                event.map((element: any, index: number) => (
                  <tr
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {element?.nama_acara}
                    </td>
                    <td className="px-6 py-4">{element?.lokasi}</td>

                    {new Date(element.tanggal_acara).setUTCHours(0, 0, 0, 0) >
                      new Date().setUTCHours(0, 0, 0, 0) ||
                    new Date(element.tanggal_acara).setUTCHours(0, 0, 0, 0) ===
                      new Date().setUTCHours(0, 0, 0, 0) ? (
                      <>
                        <td className="px-6 py-4">tanggal masih aktif</td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">tanggal sudah lewat</td>
                      </>
                    )}

                    <td className="flex gap-4 px-6 py-4 text-center">
                      {new Date(element.tanggal_acara).setUTCHours(0, 0, 0, 0) >
                        new Date().setUTCHours(0, 0, 0, 0) ||
                      new Date(element.tanggal_acara).setUTCHours(
                        0,
                        0,
                        0,
                        0,
                      ) === new Date().setUTCHours(0, 0, 0, 0) ? (
                        <>
                          <div
                            onClick={() => handleOpenUpdate(element.id)}
                            className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                          >
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              navigate(`/profile/eo/events/${element.id}`)
                            }
                            className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500 "
                          >
                            View
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{ pointerEvents: "none" }}
                            className="cursor-pointer font-medium text-gray-600 hover:underline dark:text-blue-500"
                          >
                            Edit
                          </div>
                          <div
                            style={{ pointerEvents: "none" }}
                            className="cursor-pointer font-medium text-gray-600 hover:underline dark:text-blue-500 "
                          >
                            View
                          </div>
                        </>
                      )}

                      <div className="cursor-pointer font-medium text-red-600 hover:underline dark:text-blue-500">
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
  );
};

export default DashboardEO;
