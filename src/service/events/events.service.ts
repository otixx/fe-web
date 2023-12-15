import { IEvent } from "@/interface/event.interface";
import { privateApi } from "@/shared/axios/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const QfindEvents = () => {
  const fether = () => privateApi.get(`/event`);
  return useQuery({
    queryKey: ["events"],
    queryFn: fether,
    select: (res): IEvent[] => {
      return res?.data?.data;
    },
  });
};

export const createEventsMutation = () => {
  const fetcher = async () => {
    const response = await privateApi.post(`/event`, {
      nama_acara: "geo kuntul",
      description: "ebebebebebe",
      tanggal_acara: "31/12/2001",
      lokasi: "jakarta",
      gambar: [],
    });
    console.log(response);
  };
  return useMutation({
    mutationFn: fetcher,
    onError: (error) => {
      return error;
    },
    onSuccess: (res) => {
      return res;
    },
  });
};
