import { create } from "zustand"
import { ShoePart, PartsConfig, Material } from "../types/shoe"

const DEFAULT_PARTS_CONFIG: PartsConfig = {
  outsole: { color: "#FFFFFF", material: "rubber" },
  upper: { color: "#000000", material: "leather" },
  insole: { color: "#FFFFFF" },
  laces: { color: "#FFFFFF" },
  logo: { color: "#000000" },
}

interface CustomizeState {
  selectedShoeId: string | null
  selectedPart: ShoePart | null
  partsConfig: PartsConfig
  setSelectedShoe: (shoeId: string) => void
  setSelectedPart: (part: ShoePart | null) => void
  updatePartColor: (part: ShoePart, color: string) => void
  updatePartMaterial: (part: ShoePart, material: Material) => void
  loadConfig: (config: PartsConfig) => void
  resetConfig: () => void
}

export const useCustomizeStore = create<CustomizeState>((set) => ({
  selectedShoeId: null,
  selectedPart: null,
  partsConfig: DEFAULT_PARTS_CONFIG,
  setSelectedShoe: (shoeId) => set({ selectedShoeId: shoeId }),
  setSelectedPart: (part) => set({ selectedPart: part }),
  updatePartColor: (part, color) =>
    set((state) => ({
      partsConfig: {
        ...state.partsConfig,
        [part]: { ...state.partsConfig[part], color },
      },
    })),
  updatePartMaterial: (part, material) =>
    set((state) => ({
      partsConfig: {
        ...state.partsConfig,
        [part]: { ...state.partsConfig[part], material },
      },
    })),
  loadConfig: (config) => set({ partsConfig: config, selectedPart: null }),
  resetConfig: () =>
    set({ partsConfig: DEFAULT_PARTS_CONFIG, selectedPart: null }),
}))
