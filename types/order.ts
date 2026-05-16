import { CustomDesign, ShoeModel } from "./shoe"

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "manufacturing"
  | "shipping"
  | "delivered"

export interface ShippingAddress {
  name: string
  phone: string
  address: string
  detailAddress: string
  zipCode: string
}

export interface Order {
  id: string
  userId: string
  designId: string
  status: OrderStatus
  totalPrice: number
  shippingAddress: ShippingAddress
  createdAt: string
}

export interface CartItem {
  design: CustomDesign
  shoe: ShoeModel
  size: number
  quantity: number
}
