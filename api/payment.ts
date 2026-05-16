import apiClient from "./client"
import { Payment } from "../types/payment"

export const createTossPayment = async (params: {
  orderId: string
  amount: number
}): Promise<{ paymentKey: string; orderId: string; amount: number }> => {
  const { data } = await apiClient.post("/payments/toss/create", params)
  return data
}

export const confirmTossPayment = async (params: {
  paymentKey: string
  orderId: string
  amount: number
}): Promise<Payment> => {
  const { data } = await apiClient.post<Payment>("/payments/toss/confirm", params)
  return data
}

export const createStripePaymentIntent = async (params: {
  orderId: string
  amount: number
}): Promise<{ clientSecret: string }> => {
  const { data } = await apiClient.post("/payments/stripe/intent", params)
  return data
}
