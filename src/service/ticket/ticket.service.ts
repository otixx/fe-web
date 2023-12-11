import {
  IFindTicketProps,
  ITicketDetail,
} from "@/interface/ticket/ticket.interface";
import { privateApi } from "@/shared/axios/axios";
import { useQuery } from "@tanstack/react-query";

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

export const QfindTicket = () => {
  const fetcher = () => privateApi.get(`/tiket`);
  return useQuery({
    queryKey: ["ticket"],
    queryFn: fetcher,
    select(res) {
      return res?.data?.data;
    },
  });
};
