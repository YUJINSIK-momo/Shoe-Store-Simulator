import { useMemo, useRef, type RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { PartsConfig } from "../../../types/shoe"

export interface ShoeRotation {
  y: number
  auto: boolean
}

interface Shoe3DProps {
  partsConfig: PartsConfig
  rotationRef: RefObject<ShoeRotation>
}

const WIDTH = 0.95
const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: WIDTH,
  bevelEnabled: true,
  bevelThickness: 0.06,
  bevelSize: 0.06,
  bevelSegments: 3,
  curveSegments: 24,
}

// 측면 실루엣을 2D Shape으로 그려 폭 방향으로 압출 → 곡면 신발 형태.
// 부위별로 메쉬/머티리얼이 분리돼 색을 개별 적용한다. (저폴리 스타일)
function useShoeShapes() {
  return useMemo(() => {
    const sole = new THREE.Shape()
    sole.moveTo(-1.5, 0.0)
    sole.lineTo(1.45, 0.02)
    sole.quadraticCurveTo(1.82, 0.06, 1.72, 0.3)
    sole.lineTo(1.5, 0.33)
    sole.lineTo(-1.3, 0.27)
    sole.quadraticCurveTo(-1.64, 0.2, -1.5, 0.0)

    const upper = new THREE.Shape()
    upper.moveTo(-1.3, 0.29)
    upper.lineTo(1.5, 0.35)
    upper.lineTo(1.46, 0.62)
    upper.quadraticCurveTo(1.0, 1.02, 0.25, 1.04)
    upper.lineTo(-0.1, 1.1)
    upper.quadraticCurveTo(-0.45, 1.14, -0.68, 1.0)
    upper.lineTo(-0.95, 1.22)
    upper.quadraticCurveTo(-1.5, 1.16, -1.42, 0.64)
    upper.lineTo(-1.3, 0.29)

    return { sole, upper }
  }, [])
}

export default function Shoe3D({ partsConfig, rotationRef }: Shoe3DProps) {
  const group = useRef<THREE.Group>(null)
  const { sole, upper } = useShoeShapes()

  useFrame(() => {
    if (!group.current) return
    if (rotationRef.current.auto) rotationRef.current.y += 0.006
    group.current.rotation.y = rotationRef.current.y
  })

  const c = {
    upper: partsConfig.upper.color,
    outsole: partsConfig.outsole.color,
    laces: partsConfig.laces.color,
    insole: partsConfig.insole.color,
    logo: partsConfig.logo.color,
  }

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} />
      <directionalLight position={[-4, 3, -3]} intensity={0.45} />

      <group ref={group} rotation={[0.1, 0.6, 0]}>
        {/* 신발 중심을 그룹 원점에 맞춰 제자리 회전 */}
        <group position={[-0.08, -0.6, -WIDTH / 2]}>
          {/* 밑창 (outsole) */}
          <mesh>
            <extrudeGeometry args={[sole, EXTRUDE]} />
            <meshStandardMaterial color={c.outsole} roughness={0.78} />
          </mesh>

          {/* 갑피 (upper) */}
          <mesh position={[0, 0, 0.015]}>
            <extrudeGeometry args={[upper, EXTRUDE]} />
            <meshStandardMaterial color={c.upper} roughness={0.62} />
          </mesh>

          {/* 발목/안창 입구 (insole) */}
          <mesh position={[-0.86, 1.12, WIDTH / 2]} rotation={[0, 0, 0.18]}>
            <boxGeometry args={[0.36, 0.13, WIDTH * 0.86]} />
            <meshStandardMaterial color={c.insole} roughness={0.6} />
          </mesh>

          {/* 신발끈 (laces) */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0.32 - i * 0.26, 1.02 - i * 0.03, WIDTH / 2]}>
              <boxGeometry args={[0.15, 0.06, WIDTH * 0.72]} />
              <meshStandardMaterial color={c.laces} roughness={0.5} />
            </mesh>
          ))}

          {/* 로고 (양 측면) */}
          <mesh position={[0.25, 0.58, WIDTH + 0.05]}>
            <boxGeometry args={[0.72, 0.18, 0.04]} />
            <meshStandardMaterial color={c.logo} roughness={0.4} />
          </mesh>
          <mesh position={[0.25, 0.58, -0.05]}>
            <boxGeometry args={[0.72, 0.18, 0.04]} />
            <meshStandardMaterial color={c.logo} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </>
  )
}
