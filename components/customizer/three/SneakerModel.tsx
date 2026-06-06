import { useLayoutEffect, useMemo, useRef, type RefObject } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Asset } from "expo-asset"
import * as THREE from "three"
import { PartsConfig } from "../../../types/shoe"
import type { ShoeRotation } from "./Shoe3D"

// 'Sneakers' by Poly by Google (CC-BY) — OBJ→GLB 변환본. 부위가 노드로 분리돼 있어
// 노드 이름으로 부위별 색을 칠한다. (밑창은 본체에 포함돼 별도 색 없음)
// 주의: drei의 useGLTF는 import.meta를 써서 Expo 웹 번들을 깨뜨림 → three GLTFLoader 직접 사용.
const MODEL_URI = Asset.fromModule(
  require("../../../assets/models/sneakers.glb"),
).uri

interface SneakerModelProps {
  partsConfig: PartsConfig
  rotationRef: RefObject<ShoeRotation>
}

function colorForName(name: string, p: PartsConfig): string {
  const n = name.toLowerCase()
  if (n.includes("laces")) return p.laces.color
  if (n.includes("tongue")) return p.insole.color
  if (n.includes("rivet")) return p.logo.color
  return p.upper.color // converse 본체 등 나머지
}

export default function SneakerModel({ partsConfig, rotationRef }: SneakerModelProps) {
  const gltf = useLoader(GLTFLoader, MODEL_URI)
  const group = useRef<THREE.Group>(null)

  // 공유 캐시 오염 방지 위해 복제 + 중앙정렬/스케일 정규화
  const model = useMemo(() => {
    const root = gltf.scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    root.position.set(-center.x, -center.y, -center.z)
    const wrap = new THREE.Group()
    wrap.add(root)
    wrap.scale.setScalar(3.4 / maxDim)
    return wrap
  }, [gltf])

  // 부위 이름 기준으로 새 머티리얼 색 적용
  useLayoutEffect(() => {
    model.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.isMesh) {
        const name = mesh.name || mesh.parent?.name || ""
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorForName(name, partsConfig)),
          roughness: 0.72,
          metalness: 0.05,
        })
      }
    })
  }, [model, partsConfig])

  useFrame(() => {
    if (!group.current) return
    if (rotationRef.current.auto) rotationRef.current.y += 0.006
    group.current.rotation.y = rotationRef.current.y
  })

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-4, 3, -3]} intensity={0.45} />
      <group ref={group} rotation={[0.1, 0.6, 0]}>
        <primitive object={model} />
      </group>
    </>
  )
}
