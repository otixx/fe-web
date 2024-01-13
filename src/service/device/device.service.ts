import { IDeviceCheck } from "@/utils/types/device.type";
import { create } from "zustand";

export const useDevice = create<IDeviceCheck>((set) => ({
  device: "",
  getDevice: async () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent,
      )
    ) {
      set({ device: "mobile" });
    } else {
      set({ device: "dekstop" });
    }
  },
}));
