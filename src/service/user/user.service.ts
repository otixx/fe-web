import { IProfile } from "@/interface/profile.interface";
import { privateApi } from "@/shared/axios/axios";
import { create } from "zustand";

export interface IProfileState {
  profile: IProfile;
  getProfile: () => Promise<void>;
}
export const useProfile = create<IProfileState>((set) => ({
  profile: {} as IProfile,
  getProfile: async () => {
    try {
      const response = await privateApi.get(`/profile`);
      set({ profile: response.data });
    } catch (error: any) {
      set({ profile: error.response });
    }
  },
}));
