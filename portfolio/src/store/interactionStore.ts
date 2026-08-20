import { create } from "zustand";

type CursorMode = "default" | "link" | "view";
type InteractionState = {
  cursorMode: CursorMode; cursorLabel: string; menuOpen: boolean;
  setCursor: (mode: CursorMode, label?: string) => void; setMenuOpen: (open: boolean) => void;
};

export const useInteractionStore = create<InteractionState>((set) => ({
  cursorMode: "default", cursorLabel: "", menuOpen: false,
  setCursor: (cursorMode, cursorLabel = "") => set({ cursorMode, cursorLabel }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));
