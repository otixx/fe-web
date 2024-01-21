import { IHistoryTicketDetail } from "@/utils/interface/history.interface";
import { privateApi } from "@/shared/axios/axios";
import { IHistoryProps } from "@/utils/types/history.type";
import { useQuery } from "@tanstack/react-query";

export const QfindHistory = () => {
  const fetcher = () => privateApi.get(`/transaction/user`);
  return useQuery({
    queryKey: ["historyUser"],
    queryFn: fetcher,
    select(res): IHistoryTicketDetail {
      return res?.data?.data;
    },
  });
};

export const QfindHistoryDetail = ({ id }: IHistoryProps) => {
  const fetcher = () => privateApi.get(`/transaction/detail/${id}`);
  return useQuery({
    queryKey: ["ticketId"],
    queryFn: fetcher,
    select(res): IHistoryTicketDetail {
      return res?.data?.data;
    },
  });
};
