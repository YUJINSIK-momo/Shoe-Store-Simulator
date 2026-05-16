import apiClient from "./client"
import { Order, ShippingAddress } from "../types/order"

export const createOrder = async (params: {
  designId: string
  size: number
  quantity: number
  shippingAddress: ShippingAddress
}): Promise<Order> => {
  const { data } = await apiClient.post<Order>("/orders", params)
  return data
}

export const getOrder = async (id: string): Promise<Order> => {
  const { data } = await apiClient.get<Order>(`/orders/${id}`)
  return data
}

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await apiClient.get<Order[]>("/orders")
  return data
}
