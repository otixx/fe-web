import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuCalendarPlus, LuUpload } from "react-icons/lu";
import { QfindEvents } from "@/service/events/events.service";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  TimePicker,
  Upload,
} from "antd";
import {
  ICreateEventsProps,
  IDataEvent,
} from "@/utils/interface/event.interface";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  FormatDayjs,
  FormatDayjsInput,
  FormatTime,
} from "@/shared/dayjs/format";
import { privateApi } from "@/shared/axios/axios";
import toast from "react-hot-toast";
import SkeletonTable from "@/components/SkeletonTable";

const DashboardEO = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEvent, setIdEvent] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<any>([]);
  const [valueEdit, setValueEdit] = useState({} as IDataEvent);

  const { Item } = Form;
  const event = QfindEvents(page);
  const handleOpenUpdate = (value: IDataEvent) => {
    setIdEvent(value.id);
    setOpenEdit(true);
    setValueEdit(value);
  };

  const handleAddEvents = async (value: ICreateEventsProps) => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("nama_acara", value?.nama_acara);
      formData.append("description", value?.description);
      formData.append(
        "tanggal_acara",
        dayjs(value?.tanggal_acara).format(FormatDayjsInput),
      );
      formData.append(
        "waktu_acara",
        dayjs(value?.waktu_event).format(FormatTime),
      );
      formData.append("lokasi", value?.lokasi);
      file.forEach((file: any) => {
        formData.append("image", file.originFileObj);
      });

      try {
        const response = await privateApi.post(`/event/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(response?.data?.message);
        setLoading(false);
        setOpen(false);
        window.location.reload();
        setFile([]);
      } catch (error: any) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
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
    formData.append(
      "waktu_acara",
      dayjs(value?.waktu_event).format(FormatTime),
    );
    formData.append("lokasi", value?.lokasi);
    file.forEach((file: any) => {
      formData.append("image", file.originFileObj);
    });
    try {
      const res = await privateApi.put(`/event/update/${idEvent}`, formData);
      setOpenEdit(false);
      event.refetch();
      window.location.reload();
      setFile([]);
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
    const isLt2M = info.fileList.every(
      (file: any) => file.size / 1024 / 1024 < 1,
    );
    if (!isLt2M) {
      toast.error("Size gambar tidak boleh lebih dari 1 MB");
    } else {
      setFile([...info.fileList]);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await privateApi.delete(`/event/delete`, {
        data: {
          id: id,
        },
      });
      toast.success(res?.data?.message);
      window.location.reload();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="w-full">
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-6">
          <h1 className="text-2xl font-bold">Event</h1>
        </div>
        <div className="col-span-6 flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="btnSignin my-2 flex w-40 cursor-pointer items-center justify-center gap-2 rounded-full bg-mainColors px-3 py-3 text-[14px] text-sm font-semibold text-white shadow-lg transition duration-500 hover:border-secondColors hover:bg-mainColors lg:w-48 lg:px-8 lg:py-3"
          >
            <LuCalendarPlus />
            Tambah Event
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-left text-sm text-gray-500">
              <caption className="bg-white px-5 text-left text-lg font-semibold text-gray-900 ">
                List Event
                <p className="mt-1 text-sm font-normal text-gray-500">
                  Lihat Semua Data anda disini
                </p>
              </caption>
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Acara
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Waktu Event
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
                  event?.data?.data?.length > 0 ? (
                    event?.data?.data?.map((element, index) => {
                      const tanggalAcara = dayjs(element.tanggal_acara);
                      const hariIni = dayjs();

                      const belumMulai = tanggalAcara.isAfter(hariIni, "day");
                      const dahMulai = tanggalAcara.isSame(hariIni, "day");
                      const dahAbis = tanggalAcara.isBefore(hariIni, "day");

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
                          <td
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {dayjs(element?.tanggal_acara).format(FormatDayjs)}
                          </td>
                          <td className="px-6 py-4">{element?.lokasi}</td>
                          <td className="px-6 py-4">
                            {belumMulai
                              ? `Event Belum Mulai`
                              : dahMulai
                                ? `Event Sedang Berlangsung`
                                : dahAbis
                                  ? `Event Sudah Habis`
                                  : `Status Tidak Diketahui`}
                          </td>
                          <td className="flex items-center gap-4 px-6 py-4 text-center">
                            <button
                              disabled={dahAbis}
                              onClick={() =>
                                navigate(`/profile/eo/events/${element.id}`)
                              }
                              className={`h-10 w-14 rounded-md font-semibold  ${
                                dahAbis || dahMulai
                                  ? `border-2  bg-slate-100 text-slate-300`
                                  : `bg-secondColors text-white shadow-sm hover:bg-mainColors`
                              }`}
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleOpenUpdate(element)}
                              disabled={dahMulai || dahAbis}
                              className={`h-10 w-14 rounded-md font-semibold  ${
                                dahAbis || dahMulai
                                  ? `border-2  bg-slate-100 text-slate-300`
                                  : `bg-[#1f2937] text-white shadow-sm hover:bg-[#141b24]`
                              }`}
                            >
                              Edit
                            </button>
                            <Popconfirm
                              disabled={dahMulai || dahAbis}
                              title="Hapus Event"
                              description="Apakah anda yakin ingin menghapus event ini ?"
                              onConfirm={() => handleDelete(element?.id)}
                              okText="Ya"
                              okType="default"
                              showCancel={false}
                            >
                              <button
                                className={`flex h-10 w-14 items-center justify-center rounded-md font-semibold  ${
                                  dahAbis || dahMulai
                                    ? `border-2  bg-slate-100 text-slate-300`
                                    : `bg-red-600 text-white shadow-sm
                                     hover:bg-red-900`
                                }`}
                              >
                                Delete
                              </button>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="py-4" colSpan={5}>
                        <Empty />
                      </td>
                    </tr>
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
      <div className="flex w-full items-center justify-center ">
        <div className="p-5">
          <Pagination
            current={page}
            style={{ borderColor: "red" }}
            total={event?.data?.jumlah}
            pageSize={10}
            onChange={(page) => setPage(page)}
          />
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
              <Input size="large" placeholder="Nama Acara" disabled={loading} />
            </Item>
            <Item
              rules={[
                { required: true, message: "Deskripsi Event Wajib Diisi" },
              ]}
              name="description"
              label="Deskripsi"
            >
              <Input.TextArea
                placeholder="Deskripsi Event"
                disabled={loading}
              />
            </Item>
            <Item
              rules={[{ required: true, message: "Tanggal Event Wajib" }]}
              name="tanggal_acara"
              label="Tanggal Acara"
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                showToday={false}
                disabled={loading}
                disabledDate={(current) =>
                  current && dayjs(current).isBefore(dayjs(), "day")
                }
              />
            </Item>
            <Item
              rules={[{ required: true, message: "Waktu Acara Wajib" }]}
              name="waktu_event"
              label="Waktu Acara"
            >
              <TimePicker
                style={{ width: "100%" }}
                size="large"
                showNow={false}
                placeholder="Pilih Waktu Acara"
                format={FormatTime}
                disabled={loading}
              />
            </Item>
            <Item
              rules={[{ required: true, message: "Lokasi Acara Wajib" }]}
              name="lokasi"
              label="Pilih Lokasi Acara"
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
              label="Upload Gambar Rundown"
              name="file"
            >
              <Upload
                onChange={handleFile}
                accept=".png,.jpg,.jpeg"
                multiple={true}
              >
                <Button icon={<LuUpload />}>Upload</Button>
              </Upload>
            </Item>
            <div className="flex justify-center gap-2 py-2 md:justify-end lg:justify-end xl:justify-end">
              <button
                onClick={() => {
                  setOpen(false), setLoading(false);
                }}
                className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black transition duration-500 hover:border-mainColors hover:bg-mainColors hover:text-white focus:outline-none focus:ring-4"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="flex w-32 items-center justify-center rounded-full bg-mainColors py-2 text-center text-sm font-semibold text-white transition duration-500 hover:bg-secondColors focus:outline-none focus:ring-4"
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
              <Input.TextArea disabled={loading} />
            </Item>
            <Item name="tanggal_acara" label="Tanggal Acara">
              <DatePicker
                style={{ width: "100%" }}
                format={FormatDayjsInput}
                size="large"
                showNow={false}
                disabled={loading}
                disabledDate={(current) =>
                  current && dayjs(current).isBefore(dayjs(), "day")
                }
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
                onChange={handleFile}
                accept=".png,.jpg,.jpeg"
                multiple={true}
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
