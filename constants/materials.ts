import { Material } from "../types/shoe"

export interface MaterialOption {
  id: Material
  name: string
  description: string
}

export const MATERIALS: MaterialOption[] = [
  { id: "leather", name: "가죽", description: "고급스럽고 내구성이 좋은 천연 가죽" },
  { id: "suede", name: "스웨이드", description: "부드럽고 벨벳 같은 질감" },
  { id: "mesh", name: "메쉬", description: "통기성이 뛰어난 가벼운 소재" },
  { id: "canvas", name: "캔버스", description: "캐주얼하고 클래식한 면 소재" },
  { id: "rubber", name: "러버", description: "미끄럼 방지 고무 소재 (밑창 전용)" },
]
