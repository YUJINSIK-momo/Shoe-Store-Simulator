import { ShoeModel } from "../types/shoe"

// 신발 카탈로그(shoes 테이블) 도입 전 임시 기본값.
// 우선 1켤레 10만원 고정으로 장바구니 플로우를 검증한다.
export const DEFAULT_BASE_PRICE = 100000
export const DEFAULT_SIZE = 270

export const DEFAULT_SHOE: ShoeModel = {
  id: "custom-default",
  name: "커스텀 신발",
  basePrice: DEFAULT_BASE_PRICE,
  modelUrl: "",
  createdAt: "",
}
