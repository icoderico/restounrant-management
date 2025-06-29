import { create } from "zustand";

interface UserState {
  userData: any | null;
  setUserData: (user: any) => void;
  clearUserData: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (user) => set({ userData: user }),
  clearUserData: () => set({ userData: null }),
}));

export default useUserStore;
