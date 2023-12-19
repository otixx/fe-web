import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuCalendarPlus, LuUpload } from "react-icons/lu";
import { QfindEvents } from "@/service/events/events.service";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Upload,
} from "antd";
import { ICreateEventsProps, IEvent } from "@/interface/event.interface";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { FormatDayjs, FormatDayjsInput } from "@/shared/dayjs/format";
import { privateApi } from "@/shared/axios/axios";
import toast from "react-hot-toast";
import SkeletonTable from "@/components/SkeletonTable";

const DashboardEO = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEvent, setIdEvent] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<any>([]);
  const [valueEdit, setValueEdit] = useState({} as IEvent);

  const { Item } = Form;
  const event = QfindEvents();

  const handleOpenUpdate = (value: IEvent) => {
    setIdEvent(value?.id);
    setOpenEdit(true);
    setValueEdit(value);
  };

  const handleAddEvents = async (value: ICreateEventsProps) => {
    setLoading(true);
    if (file.size) {
      console.log(dayjs(value?.tanggal_acara).format(FormatDayjsInput));
      const formData = new FormData();
      formData.append("nama_acara", value?.nama_acara);
      formData.append("description", value?.description);
      formData.append(
        "tanggal_acara",
        dayjs(value?.tanggal_acara).format(FormatDayjsInput),
      );
      formData.append("lokasi", value?.lokasi);
      formData.append("file", file);

      try {
        const response = await privateApi.post(`/event`, formData);
        toast.success(response?.data?.message);
        setLoading(false);
        setOpen(false);
      } catch (error: any) {
        setLoading(false);
        toast.error(error);
      }
    } else {
      toast.error("Harap ganti gambar terlebih dahulu");
      setLoading(false);
    }
  };

  const handleUpdateEvents = async (value: ICreateEventsProps) => {
    const formData = new FormData();
    formData.append("nama_acara", value?.nama_acara);
    formData.append("description", value?.description);
    formData.append(
      "tanggal_acara",
      dayjs(value?.tanggal_acara).format(FormatDayjsInput),
    );
    formData.append("lokasi", value?.lokasi);
    formData.append("file", file);
    try {
      const res = await privateApi.put(`/event/update/${idEvent}`, formData);
      setOpenEdit(false);
      event.refetch();
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleFile = (info: any) => {
    const isLt2M = info?.file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      toast.error("Size gambar tidak boleh lebih dari 1 MB");
    } else {
      setFile(info?.file);
    }
  };

  // const handleImageChange = (e: any) => {
  //   const fileList: any = e.target.files;
  //   if (fileList?.length > 0) {
  //     const fileArray = Array.from(fileList) as File[];
  //     const isFileSizeValid = fileArray.every(
  //       (file) => file.size <= 1024 * 1024,
  //     );
  //     if (isFileSizeValid) {
  //       setFile(fileArray);
  //     } else {
  //       toast.error("Size gambar tidak boleh lebih dari 1 MB");
  //     }
  //   } else {
  //     setFile(fileList);
  //   }
  // };
  return (
    <div className="w-full">
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-6">
          <h1 className="text-2xl font-bold">Event</h1>
        </div>
        <div className="col-span-6 flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="btnSignin my-2 flex w-32 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondColors px-3 text-[14px] text-sm font-semibold text-white shadow-lg transition duration-500 hover:border-secondColors hover:bg-mainColors lg:w-48 lg:px-8 lg:py-3"
          >
            <LuCalendarPlus />
            Tambah Event
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12">
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
                {event?.isFetched && event?.data ? (
                  event?.data?.length > 0 ? (
                    event?.data.map((element, index) => {
                      const dateEvent =
                        dayjs(element.tanggal_acara).format(FormatDayjs) >
                          dayjs().format(FormatDayjs) ||
                        dayjs(element.tanggal_acara).format(FormatDayjs) ==
                          dayjs().format(FormatDayjs);
                      return (
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
                          <td className="px-6 py-4">
                            {dateEvent
                              ? `tanggal masih aktif`
                              : `Event Sudah Selesai`}
                          </td>
                          <td className="flex items-center gap-4 px-6 py-4 text-center">
                            <Button
                              onClick={() =>
                                navigate(`/profile/eo/events/${element.id}`)
                              }
                              type="primary"
                              style={{ backgroundColor: "#0049cc" }}
                            >
                              View
                            </Button>
                            <Button
                              onClick={() => handleOpenUpdate(element)}
                              disabled={!dateEvent}
                              type="default"
                            >
                              Edit
                            </Button>
                            <Popconfirm
                              title="Hapus Event"
                              description="Apakah anda yakin ingin menghapus event ini ?"
                              onConfirm={() => toast.success("succes")}
                              onCancel={() => toast.error("failed")}
                              okText="Ya"
                              okType="default"
                              showCancel={false}
                            >
                              <Button type="primary" danger>
                                Delete
                              </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>Tidak ada data</tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <SkeletonTable />
                    </td>
                  </tr>
                )}
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
          onCancel={() => {
            setOpen(false), setLoading(false);
          }}
        >
          <Form name="basic" layout="vertical" onFinish={handleAddEvents}>
            <Item
              rules={[{ required: true, message: "Nama Event Wajib Diisi" }]}
              name="nama_acara"
              label="Nama Acara"
            >
              <Input size="large" disabled={loading} />
            </Item>
            <Item
              rules={[
                { required: true, message: "Deskripsi Event Wajib Diisi" },
              ]}
              name="description"
              label="Deskripsi"
            >
              <Input size="large" disabled={loading} />
            </Item>
            <Item
              rules={[{ required: true, message: "Tanggal Event Wajib" }]}
              name="tanggal_acara"
              label="Tanggal Acara"
            >
              <DatePicker showTime size="large" disabled={loading} />
            </Item>
            <Item
              rules={[{ required: true, message: "Lokasi Event Wajib" }]}
              name="lokasi"
              label="Nama Acara"
            >
              <Select
                size="large"
                disabled={loading}
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
            <Item
              rules={[{ required: true, message: "Lokasi Event Wajib" }]}
              label="Upload Gambar Event"
              name="file"
            >
              <Upload
                onChange={handleFile}
                accept=".png,.jpg,.jpeg"
                maxCount={1}
              >
                <Button icon={<LuUpload />}>Upload</Button>
              </Upload>
            </Item>
            {/* <Item
              rules={[
                { required: true, message: "Tanggal Expired Tiket Wajib" },
              ]}
              label="Gambar Tiket"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
              />
            </Item> */}
            <div className="flex justify-end gap-2 py-2">
              <button
                onClick={() => {
                  setOpen(false), setLoading(false);
                }}
                className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black focus:outline-none focus:ring-4"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="flex w-32 items-center justify-center rounded-full bg-mainColors py-2 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4"
              >
                {loading ? <LoadingOutlined /> : "Create"}
              </button>
            </div>
          </Form>
        </Modal>
      )}

      {openEdit && (
        <Modal
          footer={false}
          width={768}
          title="Edit Event"
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
        >
          <Form
            fields={[
              {
                name: "nama_acara",
                value: valueEdit?.nama_acara,
              },
              {
                name: "description",
                value: valueEdit?.description,
              },
              {
                name: "lokasi",
                value: valueEdit?.lokasi,
              },
              {
                name: "tanggal_acara",
                value: dayjs(valueEdit?.tanggal_acara),
              },
            ]}
            name="basic"
            layout="vertical"
            onFinish={handleUpdateEvents}
          >
            <Item name="nama_acara" label="Nama Acara">
              <Input size="large" disabled={loading} />
            </Item>
            <Item name="description" label="Deskripsi">
              <Input size="large" disabled={loading} />
            </Item>
            <Item name="tanggal_acara" label="Tanggal Acara">
              <DatePicker
                format={FormatDayjsInput}
                size="large"
                disabled={loading}
              />
            </Item>
            <Item name="lokasi" label="Nama Acara">
              <Select
                size="large"
                disabled={loading}
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
            <Item label="Upload Gambar Event" name="file">
              <Upload
                fileList={[
                  {
                    uid: "1",
                    name: "file.png",
                  },
                ]}
                onChange={handleFile}
                accept=".png,.jpg,.jpeg"
                maxCount={1}
              >
                <Button icon={<LuUpload />}>Upload</Button>
              </Upload>
            </Item>
            <div className="flex justify-end gap-2 py-2">
              <button
                onClick={() => setOpenEdit(false)}
                className="bg-red flex w-32 items-center justify-center rounded-full border-2 border-mainColors bg-white py-2 text-center text-sm font-semibold text-mainColors transition duration-500 hover:border-secondColors hover:bg-secondColors hover:text-white focus:outline-none focus:ring-4"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="bg-red flex w-32 items-center justify-center rounded-full bg-mainColors py-2 text-center text-sm font-semibold text-white transition duration-500 hover:bg-secondColors focus:outline-none focus:ring-4"
              >
                {loading ? <LoadingOutlined /> : "Update"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default DashboardEO;
