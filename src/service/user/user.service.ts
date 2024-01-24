import { IProfile } from "@/utils/interface/profile.interface";
import { privateApi } from "@/shared/axios/axios";
import { create } from "zustand";
import { TProfileEOProps } from "@/utils/types/profile.types";

export interface IProfileState {
  profile: IProfile;
  getProfile: () => Promise<void>;
}
export const useProfile = create<IProfileState>((set) => ({
  profile: {} as IProfile,
  getProfile: async () => {
    try {
      const response = await privateApi.get(`/profile`);
      set({ profile: response?.data?.data });
    } catch (error: any) {
      set({ profile: error?.response });
    }
  },
}));

export const updateProfileEO = async (dataEO: TProfileEOProps) => {
  try {
    const res = privateApi.put("/eo/update", dataEO);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (value: IProfile) => {
  try {
    const res = privateApi.put("/profile/update", value);
    return res;
  } catch (error) {
    return error;
  }
};
