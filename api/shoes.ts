import apiClient from "./client"
import { ShoeModel, CustomDesign, PartsConfig } from "../types/shoe"

export const getShoeModels = async (): Promise<ShoeModel[]> => {
  const { data } = await apiClient.get<ShoeModel[]>("/shoes")
  return data
}

export const getShoeModel = async (id: string): Promise<ShoeModel> => {
  const { data } = await apiClient.get<ShoeModel>(`/shoes/${id}`)
  return data
}

export const saveCustomDesign = async (params: {
  shoeId: string
  partsConfig: PartsConfig
  thumbnailUrl?: string
}): Promise<CustomDesign> => {
  const { data } = await apiClient.post<CustomDesign>("/designs", params)
  return data
}

export const getCustomDesigns = async (): Promise<CustomDesign[]> => {
  const { data } = await apiClient.get<CustomDesign[]>("/designs")
  return data
}
