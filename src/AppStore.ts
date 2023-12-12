import { create } from "zustand";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

type Store = {
  token: any;
  exp: any;
  setToken: (newToken: any) => void;
  setExp: (newExp: any) => void;
};

export const AppStore = create<Store>((set) => ({
  token: null,
  exp: null,
  setToken: (newToken) => set({ token: newToken }),
  setExp: (newExp) => set({ exp: newExp }),
}));

export const refreshToken = async () => {
  try {
    const response = await axios.get(
      "${import.meta.env.VITE_BE_URL}/user/token"
    );
    const decode = jwtDecode(response.data);
    console.log(response);
    console.log(decode);
  } catch (error) {
    const navigate = useNavigate();
    navigate("/");
  }
};

export const useBearStore = create((set: any) => ({
  bears: 0,
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
