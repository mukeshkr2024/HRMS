import { apiClient } from "@/api/api-client";
import { create, SetState } from "zustand";

type IEmployee = {
  _id: string
  firstName: string;
};

type AuthState = {
  employee: IEmployee | null;
  loading: boolean;
  setEmployee: (employee: IEmployee) => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set: SetState<AuthState>) => ({
  employee: null,
  loading: true,
  setEmployee: (employee: IEmployee) => set({ employee }),
  setLoading: (loading: boolean) => set({ loading }),
  checkAuth: async () => {
    try {
      const { data } = await apiClient.get("/auth/validate-session");

      if (data?.employee) {
        set({ employee: data.employee, loading: false });
      } else {
        set({ employee: null, loading: false });
      }
    } catch (error) {
      console.error("Error in authentication", error);
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
      set({ employee: null });
    } catch (error) {
      console.error("Error in logout", error);
    }
  },
}));
