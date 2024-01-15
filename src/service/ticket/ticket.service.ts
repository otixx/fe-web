import {
  IFindTicketProps,
  ITicketDetail,
  ITiketHistory,
  Ticket,
} from "@/utils/interface/ticket.interface";
import { privateApi } from "@/shared/axios/axios";
import { useQuery } from "@tanstack/react-query";

export interface ISearchParams {
  url?: string;
  key?: string;
}
export const QfindTicketbyId = ({ id }: IFindTicketProps) => {
  const fetcher = () => privateApi.get(`/tiket/${id}`);
  return useQuery({
    queryKey: ["ticketId"],
    queryFn: fetcher,
    select(res): ITicketDetail {
      return res?.data?.data;
    },
  });
};

export const QfindTicket = async ({ url, key }: ISearchParams) => {
  try {
    const res = await privateApi.get(`/tiket${url}`, {
      params: {
        keyword: key,
      },
    });
    if (res?.data) {
      return res?.data;
    }
  } catch (error) {
    return error;
  }
};

export const QfindTicketbyEvent = (id: number) => {
  const fetcher = () => privateApi.get(`/tiket/event/${id}`);
  return useQuery({
    queryKey: ["ticketbyevent"],
    queryFn: fetcher,
    select(res): Ticket {
      return res?.data?.data;
    },
  });
};

export const QfindHistoryTiket = () => {
  const fetcher = () => privateApi.get(`/tiket/eo`);
  return useQuery({
    queryKey: ["tiketEO"],
    queryFn: fetcher,
    select(res): ITiketHistory[] {
      return res?.data?.data;
    },
  });
};

export const QHistoryTicketId = (id: string | undefined) => {
  const fetcher = () => privateApi.get(`/transaction/tiket/${id}`);
  return useQuery({
    queryKey: ["historyticketid"],
    queryFn: fetcher,
    select(res) {
      return res?.data?.data;
    },
  });
};
