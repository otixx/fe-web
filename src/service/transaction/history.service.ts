import { dataTransaction } from "@/interface/profile/history.interface";
import { privateApi } from "@/shared/axios/axios";
import { create } from "zustand";

export interface IHistoryState {
  history: dataTransaction[];
  getHistory: () => Promise<dataTransaction[]>;
}
export const useHistory = create<IHistoryState>((set) => ({
  history:[],
  getHistory: async () => {
    try {
      const response = await privateApi.get<dataTransaction[]>(`/transaction/user`);
      set({ history: response.data });
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      return [];
    }
  },
}));