import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuUpload, LuXCircle } from "react-icons/lu";
import { privateApi } from "@/shared/axios/axios";
import Popup from "@/components/user/Popup";
import { QfindEvents } from "@/service/events/events.service";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";

const DashboardEO = () => {
  const navigate = useNavigate();
  const [acara, setAcara] = useState("");
  const [description, setDescription] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);
  const [eventUpdate, setEventUpdate] = useState(false);
  const [idEvent, setIdEvent] = useState("");

  const { data: event } = QfindEvents();

  const handleOpenUpdate = (id: string) => {
    setIdEvent(id);
    setEventUpdate(true);
  };
  const handleCloseUpdate = () => {
    setEventUpdate(false);
  };

  // const handleAddEvents = async () => {
  //   const formData = new FormData();
  // formData.append("nama_acara", acara);
  // formData.append("description", description);

  // const dateObject = new Date(tanggal);
  // const day = dateObject.getDate();
  // const month = dateObject.getMonth() + 1;
  // const year = dateObject.getFullYear();

  // const formattedDate = `${day}/${month}/${year}`;
  // formData.append(
  //   "tanggal_acara",
  //   formattedDate === "NaN/NaN/NaN" ? "" : formattedDate,
  // );
  // formData.append("lokasi", lokasi);

  // await privateApi
  //   .post(`/event`, formData)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error.response.data, "sd");
  //   });
  // };

  const handleAddEvents = (value: any) => {
    console.log(value);
    console.log(file);
  };

  // const handleUpdateEvents = async () => {
  //   console.log(acara, description, tanggal, lokasi, file);
  //   const formData = new FormData();

  //   formData.append("nama_acara", acara);
  //   formData.append("description", description);

  //   const dateObject = new Date(tanggal);

  //   const day = dateObject.getDate();
  //   const month = dateObject.getMonth() + 1;
  //   const year = dateObject.getFullYear();

  //   const formattedDate = `${day}/${month}/${year}`;
  //   formData.append(
  //     "tanggal_acara",
  //     formattedDate === "NaN/NaN/NaN" ? "" : formattedDate,
  //   );
  //   formData.append("lokasi", lokasi);

  //   file.forEach((fileItem) => formData.append("image", fileItem));

  //   await privateApi
  //     .put(`/event/update/${idEvent}`, formData)
  //     .then(() => {
  //       setAcara("");
  //       setDescription("");
  //       setLokasi("");
  //       setTanggal("");
  //       setFile([]);
  //       handleCloseUpdate();
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileList = e.target.files;
  //   if (fileList) {
  //     const fileArray = Array.from(fileList) as File[];

  //     if (fileArray.length > 1) {
  //       fileArray.forEach((item) => {
  //         setFile((prevFiles) => [...prevFiles, item]);
  //       });
  //     } else {
  //       setFile(fileArray);
  //     }
  //   }
  // };
  const [form] = Form.useForm();
  const { Item } = Form;
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleFile = (info: any) => {
    setFile(info?.file);
  };

  return (
    <div className="w-full">
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-6">
          <h1 className="text-2xl font-bold">Event</h1>
        </div>
        <div className="col-span-6 flex justify-end">
          <div className="btnSignin w-32 cursor-pointer rounded-full bg-secondColors px-3 py-2 text-sm shadow-lg hover:border-secondColors hover:bg-mainColors lg:w-44 lg:px-8 lg:py-3">
            <button
              onClick={() => setOpen(true)}
              className="text-[14px] font-semibold text-white"
            >
              Tambah Event
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-12">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg ">
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
                      new Date(element.tanggal_acara).setUTCHours(
                        0,
                        0,
                        0,
                        0,
                      ) === new Date().setUTCHours(0, 0, 0, 0) ? (
                        <>
                          <td className="px-6 py-4">tanggal masih aktif</td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">tanggal sudah lewat</td>
                        </>
                      )}

                      <td className="flex gap-4 px-6 py-4 text-center">
                        {new Date(element.tanggal_acara).setUTCHours(
                          0,
                          0,
                          0,
                          0,
                        ) > new Date().setUTCHours(0, 0, 0, 0) ||
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
      {open && (
        <Modal
          footer={false}
          width={768}
          title="Tambahkan Event"
          open={open}
          onCancel={() => setOpen(false)}
        >
          <Form form={form} layout="vertical" onFinish={handleAddEvents}>
            <Item name="acara" label="Nama Acara">
              <Input />
            </Item>
            <Item name="deskripsi" label="Deskripsi">
              <Input />
            </Item>
            <Item name="dateStart" label="Tanggal Acara">
              <DatePicker />
            </Item>
            <Item name="kota" label="Nama Acara">
              <Select
                showSearch
                placeholder="Pilih Kota"
                optionFilterProp="children"
                filterOption={filterOption}
                options={[
                  {
                    value: "jember",
                    label: "Jember",
                  },
                ]}
              />
            </Item>
            <Item name="file">
              <label className="block text-sm font-semibold text-black">
                Nama Acara
              </label>
              <Upload
                onChange={handleFile}
                accept=".png,.jpg,.jpeg"
                maxCount={1}
              >
                <Button icon={<LuUpload />}>Upload</Button>
              </Upload>
            </Item>
            <div className="flex justify-end gap-2 py-2">
              <button
                type="submit"
                onClick={() => setOpen(false)}
                className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black focus:outline-none focus:ring-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" rounded-full bg-mainColors px-10 py-2 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4"
              >
                Create
              </button>
            </div>
          </Form>
        </Modal>
      )}
      {/* {open && (
        <Popup onConfirm={handleClose}>
          <div className="relative max-h-full w-full max-w-md">
            <div className="relative rounded-lg bg-white shadow">
              <button
                type="button"
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
      )} */}
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
    </div>
  );
};

export default DashboardEO;
