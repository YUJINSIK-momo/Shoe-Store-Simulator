export type PaymentMethod = "card" | "kakao" | "naver" | "toss" | "stripe"

export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled"

export interface Payment {
  id: string
  orderId: string
  method: PaymentMethod
  amount: number
  status: PaymentStatus
  paymentKey?: string
  createdAt: string
}
