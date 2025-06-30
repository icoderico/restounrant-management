import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  userData: any | null;
  setUserData: (user: any) => void;
  clearUserData: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (user) => set({ userData: user }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
