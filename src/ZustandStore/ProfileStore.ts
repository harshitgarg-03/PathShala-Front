import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProfileProp } from "../Types";

export const UseProfile = create<ProfileProp>()(
  persist((set) => ({
    isEducator: false,

  }), {
    name: "Profile-Store",
  }),
);
