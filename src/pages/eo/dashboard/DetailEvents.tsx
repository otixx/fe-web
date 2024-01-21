import { useState } from "react";
import { LuScan, LuTicket } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { privateApi } from "@/shared/axios/axios";
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
} from "antd";
import {
  FormatDayjs,
  FormatDayjsInput,
  FormatDetailTicket,
  FormatTime,
} from "@/shared/dayjs/format";
import { LoadingOutlined } from "@ant-design/icons";
import { QfindTicketbyEvent } from "@/service/ticket/ticket.service";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { TDetailTicketProps } from "@/utils/types/ticket.types";

const DetailEvents = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [detailData, setDetailData] = useState({} as TDetailTicketProps);

  const idEvent: any = useParams().id;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>();

  // Check Device
  let userAgent = navigator.userAgent;
  let isMobile = /Mobi/.test(userAgent);
  let isTablet = /Tablet|iPad/.test(userAgent);
  let isDesktop = !isMobile && !isTablet;

  const { data: tiket } = QfindTicketbyEvent(idEvent);
  const { Item } = Form;

  const handleOpenUpdate = (element: TDetailTicketProps) => {
    setOpenEdit(true);
    setDetailData(element);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList) as File[];
      setFile(fileArray[0]);
    }
  };

  const handleAddTiket = async (value: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("nama_kegiatan", value?.nama_kegiatan);
    formData.append("harga", value?.harga);
    formData.append("tags", value?.tags);
    formData.append("quantity", value?.quantity);
    formData.append(
      "tanggal_preorder",
      value?.tanggal_preorder.format(FormatDayjsInput),
    );
    formData.append(
      "tanggal_expired",
      value?.tanggal_expired.format(FormatDayjsInput),
    );
    formData.append("image", file);
    try {
      const res = await privateApi.post(`/tiket/${idEvent}`, formData);
      toast.success(res?.data?.message);
      setLoading(false);
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleUpdateTiket = async (value: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("nama_kegiatan", value?.nama_acara);
    formData.append("harga", value?.harga);
    formData.append("tags", value?.tags);
    formData.append("quantity", value?.quantity);
    formData.append(
      "tanggal_preorder",
      dayjs(value?.tanggal_pre).format(FormatDayjsInput) +
        dayjs().hour(0o0).minute(0o0).second(0o0).format(FormatTime),
    );
    formData.append(
      "tanggal_expired",
      dayjs(value?.tanggal_exp).format(FormatDayjsInput) +
        dayjs().hour(0o0).minute(0o0).second(0o0).format(FormatTime),
    );
    formData.append("file", file);
    try {
      const res = await privateApi.put(`/tiket/${detailData?.id}`, formData);
      toast.success(res?.data?.message);
      setLoading(false);
      setOpenEdit(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleDelete = async (id: string) => {
    try {
      const res = await privateApi.delete(`/tiket/delete/${id}`);
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
            className="btnSignin my-2 flex w-40 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondColors px-3 py-3 text-[14px] text-sm font-semibold text-white shadow-lg transition duration-500 hover:border-secondColors hover:bg-mainColors lg:w-48 lg:px-8 lg:py-3"
          >
            <LuTicket />
            Tambah Tiket
          </button>
        </div>
      </div>
      <div className="flex justify-end px-2">
        {isDesktop === true ? null : (
          <div className="col-span-6 flex justify-end">
            <button
              onClick={() => navigate(`/scan/${idEvent}`)}
              className="btnSignin my-2 flex w-40 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondColors px-3 py-3 text-[14px] text-sm font-semibold text-white shadow-lg transition duration-500 hover:border-secondColors hover:bg-mainColors lg:w-48 lg:px-8 lg:py-3"
            >
              <LuScan />
              Scan
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-12">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                List Tiket
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Tiket Event disini
                </p>
              </caption>

              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Tiket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Pre Order
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Expired
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {tiket && tiket?.data && tiket?.data?.length > 0 ? (
                  tiket?.data.map((element, index: number) => {
                    const hariIni = dayjs().format(FormatDetailTicket);
                    const dahmulai = hariIni >= element?.event?.tanggal_acara;
                    return (
                      <tr
                        className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={index}
                      >
                        <td
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {element?.nama_kegiatan}
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(Number(element?.harga))}
                        </td>
                        <td className="px-6 py-4">{element?.tags}</td>
                        <td className="px-6 py-4">
                          {dayjs(element?.tanggal_preorder).format(FormatDayjs)}
                        </td>
                        <td className="px-6 py-4">
                          {dayjs(element?.tanggal_expired).format(FormatDayjs)}
                        </td>
                        <td className="flex items-center gap-4 px-6 py-4 text-center">
                          <Button
                            disabled={dahmulai}
                            onClick={() => handleOpenUpdate(element)}
                            type="default"
                          >
                            Edit
                          </Button>
                          <Popconfirm
                            disabled={dahmulai}
                            title="Hapus Tiket"
                            description="Apakah anda yakin ingin menghapus Tiket ini ?"
                            onConfirm={() => handleDelete(element?.id)}
                            okText="Ya"
                            okType="default"
                            showCancel={false}
                          >
                            <Button disabled={dahmulai} type="primary" danger>
                              Delete
                            </Button>
                          </Popconfirm>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="py-4" colSpan={6}>
                      <Empty />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {tiket && tiket?.data?.length > 0 && (
        <div className="flex w-full items-center justify-center ">
          <div className="p-5">
            <Pagination
              current={page}
              total={tiket?.jumlah}
              pageSize={10}
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>
      )}

      {open && (
        <Modal
          footer={false}
          width={768}
          title="Tambahkan Tiket"
          open={open}
          onCancel={() => setOpen(false)}
        >
          <Form name="basic" layout="vertical" onFinish={handleAddTiket}>
            <Item
              rules={[{ required: true, message: "Nama Tiket Wajib Diisi" }]}
              name="nama_kegiatan"
              label="Nama Tiket"
            >
              <Input size="large" disabled={loading} />
            </Item>
            <Item
              rules={[
                { required: true, message: "Harga Wajib Diisi" },
                () => ({
                  validator(_, value) {
                    if (!isNaN(value) && value >= 10000) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Minimal Harga Tiket Rp. 10.000,00");
                  },
                }),
              ]}
              name="harga"
              label="Harga"
            >
              <Input
                step={500}
                size="large"
                type="number"
                min={10000}
                disabled={loading}
              />
            </Item>
            <Item
              rules={[{ required: true, message: "Quantity Wajib Diisi" }]}
              name="quantity"
              label="Quantity"
            >
              <Input size="large" type="number" min={1} disabled={loading} />
            </Item>
            <Item
              rules={[{ required: true, message: "Lokasi Event Wajib" }]}
              name="tags"
              label="Tags"
            >
              <Select
                size="large"
                disabled={loading}
                showSearch
                placeholder="Pilih Tags"
                optionFilterProp="children"
                filterOption={filterOption}
                options={[
                  {
                    value: "music",
                    label: "Music",
                  },
                  {
                    value: "stand",
                    label: "Stand",
                  },
                  {
                    value: "visitor",
                    label: "Visitor",
                  },
                  {
                    value: "coswalk",
                    label: "Coswalk",
                  },
                  {
                    value: "coscomp",
                    label: "Coscomp",
                  },
                ]}
              />
            </Item>
            <Item
              rules={[{ required: true, message: "Tanggal Pre Order Wajib" }]}
              name="tanggal_preorder"
              label="Tanggal Pre Order"
            >
              <DatePicker
                placement="topRight"
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
            <Item
              rules={[
                { required: true, message: "Tanggal Expired Tiket Wajib" },
              ]}
              name="tanggal_expired"
              label="Tanggal Expired"
            >
              <DatePicker
                format={FormatDayjsInput}
                className="testingyo"
                showNow={false}
                size="large"
                style={{ width: "100%" }}
                disabled={loading}
                disabledDate={(current) =>
                  current && dayjs(current).isBefore(dayjs(), "day")
                }
              />
            </Item>
            <Item
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
            </Item>
            <div className="flex justify-end gap-2 py-2">
              <button
                onClick={() => setOpen(false)}
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
                value: detailData?.nama_kegiatan,
              },
              {
                name: "harga",
                value: detailData?.harga,
              },
              {
                name: "tags",
                value: detailData?.tags,
              },
              {
                name: "quantity",
                value: detailData?.quantity,
              },
              {
                name: "tanggal_pre",
                value: dayjs(detailData?.tanggal_preorder),
              },
              {
                name: "tanggal_exp",
                value: dayjs(detailData?.tanggal_expired),
              },
            ]}
            name="basic"
            layout="vertical"
            onFinish={handleUpdateTiket}
          >
            <Item name="nama_acara" label="Nama Acara">
              <Input size="large" disabled={loading} />
            </Item>
            <Item name="harga" label="Harga">
              <Input
                type="number"
                step={1000}
                size="large"
                disabled={loading}
              />
            </Item>
            <Item name="quantity" label="Qty">
              <Input type="number" size="large" disabled={loading} />
            </Item>

            <Item name="tags" label="Nama Acara">
              <Select
                size="large"
                disabled={loading}
                showSearch
                placeholder="Pilih Kota"
                optionFilterProp="children"
                filterOption={filterOption}
                options={[
                  {
                    value: "music",
                    label: "Music",
                  },
                  {
                    value: "cosplay",
                    label: "Cosplay",
                  },
                ]}
              />
            </Item>
            <Item name="tanggal_pre" label="Tanggal Pre Order">
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
            <Item name="tanggal_exp" label="Tanggal Expired">
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
            <div className="flex justify-end gap-2 py-2">
              <button
                onClick={() => setOpenEdit(false)}
                className="bg-red flex w-32 items-center justify-center rounded-full border-2 border-mainColors bg-white py-2 text-center text-sm font-semibold text-mainColors transition duration-500 hover:border-secondColors hover:bg-secondColors hover:text-white focus:outline-none focus:ring-4"
              >
                Cancel
              </button>
              <button
                type="submit"
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

export default DetailEvents;
