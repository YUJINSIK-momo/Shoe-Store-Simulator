export type ShoePart = "outsole" | "upper" | "insole" | "laces" | "logo"

export type Material = "leather" | "suede" | "mesh" | "canvas" | "rubber"

export interface PartConfig {
  color: string
  material?: Material
}

export type PartsConfig = Record<ShoePart, PartConfig>

export interface ShoeModel {
  id: string
  name: string
  basePrice: number
  modelUrl: string
  createdAt: string
}

export interface CustomDesign {
  id: string
  userId: string
  shoeId: string
  partsConfig: PartsConfig
  thumbnailUrl?: string
  createdAt: string
}
