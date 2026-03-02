import { create } from "zustand";
import type { PayStoreProp } from "../Types";
import { api } from "../lib/api";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)

export const PayStore = create<PayStoreProp>((set, get) => ({
  isLoading: false,
  error: null,

  createOrder: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/create-order",{ courseId});
      set({ isLoading: true, error: null });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Payment Failed",
      });
    }
  },
  
  handlePayment: async() => {
    const res = await api.post("/create-order", {course});
  }
}));
