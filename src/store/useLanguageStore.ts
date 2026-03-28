import { create } from "zustand"

interface LanguageState {
  lang: "en" | "zh"
  setLang: (lang: "en" | "zh") => void
  toggle: () => void
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
  toggle: () => set((state) => ({ lang: state.lang === "en" ? "zh" : "en" })),
}))
