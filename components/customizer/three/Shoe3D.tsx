import { useRef, type RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { PartsConfig } from "../../../types/shoe"

export interface ShoeRotation {
  y: number
  auto: boolean
}

interface Shoe3DProps {
  partsConfig: PartsConfig
  rotationRef: RefObject<ShoeRotation>
}

// 원시 도형으로 조립한 플레이스홀더 신발. 부위별 머티리얼 색을 partsConfig로 칠한다.
// (추후 진짜 GLB 모델로 교체 — phase-05 C)
export default function Shoe3D({ partsConfig, rotationRef }: Shoe3DProps) {
  const group = useRef<Group>(null)

  useFrame(() => {
    if (!group.current) return
    if (rotationRef.current.auto) rotationRef.current.y += 0.006
    group.current.rotation.y = rotationRef.current.y
  })

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} />

      <group ref={group} rotation={[0.12, 0.6, 0]}>
        {/* 밑창 (outsole) */}
        <mesh position={[0, -0.55, 0]} castShadow>
          <boxGeometry args={[2.7, 0.35, 1.15]} />
          <meshStandardMaterial color={partsConfig.outsole.color} roughness={0.7} />
        </mesh>

        {/* 갑피 본체 (upper) */}
        <mesh position={[-0.1, -0.05, 0]}>
          <boxGeometry args={[2.2, 0.85, 1.0]} />
          <meshStandardMaterial color={partsConfig.upper.color} roughness={0.55} />
        </mesh>

        {/* 앞코 (upper) */}
        <mesh position={[1.05, -0.22, 0]}>
          <sphereGeometry args={[0.52, 28, 28]} />
          <meshStandardMaterial color={partsConfig.upper.color} roughness={0.55} />
        </mesh>

        {/* 발목/안창 입구 (insole) */}
        <mesh position={[-1.0, 0.28, 0]}>
          <boxGeometry args={[0.55, 0.55, 0.95]} />
          <meshStandardMaterial color={partsConfig.insole.color} roughness={0.6} />
        </mesh>

        {/* 신발끈 영역 (laces) */}
        <mesh position={[0.15, 0.45, 0]}>
          <boxGeometry args={[1.0, 0.14, 0.82]} />
          <meshStandardMaterial color={partsConfig.laces.color} roughness={0.5} />
        </mesh>

        {/* 로고 (양 측면) */}
        <mesh position={[0.2, -0.05, 0.52]}>
          <boxGeometry args={[0.75, 0.2, 0.05]} />
          <meshStandardMaterial color={partsConfig.logo.color} roughness={0.4} />
        </mesh>
        <mesh position={[0.2, -0.05, -0.52]}>
          <boxGeometry args={[0.75, 0.2, 0.05]} />
          <meshStandardMaterial color={partsConfig.logo.color} roughness={0.4} />
        </mesh>
      </group>
    </>
  )
}
