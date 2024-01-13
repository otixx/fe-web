import {
  IDataTransaction,
  IHistoryTicketDetail,
} from "@/utils/interface/history.interface";
import { privateApi } from "@/shared/axios/axios";
import { IHistoryProps, IHistoryState } from "@/utils/types/history.type";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

export const useHistory = create<IHistoryState>((set) => ({
  history: [],
  getHistory: async () => {
    try {
      const response =
        await privateApi.get<IDataTransaction>(`/transaction/user`);
      set({ history: response?.data?.data });
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  },
}));

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
