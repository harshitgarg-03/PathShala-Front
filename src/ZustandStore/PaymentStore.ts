import { create } from "zustand";
import type { PayStoreProp } from "../Types";
import { api } from "../lib/api";

export const PayStore = create<PayStoreProp>((set, get) => ({
  isLoading: false,
  error: null,

  createOrder: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/create-order", { courseId });
      set({ isLoading: true, error: null });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Payment Failed",
      });
    }
  },

  handlePayment: async (course) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/create-order", { course });
      window.location.href = res.data.url;
      set({ isLoading: true, error: null,  });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Payment Failed",
      });
    }
  },

  verifyPaymentWebhook : async() => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/verifyPayment");
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Payment Failed",
      });
    }
  }
}));
