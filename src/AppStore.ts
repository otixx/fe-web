import { create } from 'zustand';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

type Store = {
  token: any;
  user: any;
  setToken: (newToken: string) => void;
  setExp: (userData: any) => void;
  fetchData: (state: Store) => Promise<void>;
};
export const AppStore = create((set) => ({
  token: null,
  exp: null,
  setToken: (newToken: any) => set({ token: newToken }),
  setExp: (newExp: any) => set({ exp: newExp }),
}));

export const refreshToken = async () => {
  try {

    const response = await axios.get('http://localhost:5000/user/token');
    const decode = jwtDecode(response.data);
    console.log(response)
    console.log(decode)
  } catch (error) {
    const navigate = useNavigate()
    navigate('/');
  }
};



export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
