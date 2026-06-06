import { supabase } from "./supabase"
import { CustomDesign, PartsConfig } from "../types/shoe"

interface DesignRow {
  id: string
  user_id: string
  shoe_id: string | null
  parts_config: PartsConfig
  thumbnail_url: string | null
  created_at: string
}

const toDesign = (r: DesignRow): CustomDesign => ({
  id: r.id,
  userId: r.user_id,
  shoeId: r.shoe_id ?? undefined,
  partsConfig: r.parts_config,
  thumbnailUrl: r.thumbnail_url ?? undefined,
  createdAt: r.created_at,
})

export const listDesigns = async (): Promise<CustomDesign[]> => {
  const { data, error } = await supabase
    .from("custom_designs")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data as DesignRow[]).map(toDesign)
}

export const createDesign = async (params: {
  partsConfig: PartsConfig
  shoeId?: string | null
}): Promise<CustomDesign> => {
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id
  if (!userId) throw new Error("로그인이 필요합니다")

  const { data, error } = await supabase
    .from("custom_designs")
    .insert({
      user_id: userId,
      shoe_id: params.shoeId ?? null,
      parts_config: params.partsConfig,
    })
    .select()
    .single()
  if (error) throw error
  return toDesign(data as DesignRow)
}

export const deleteDesign = async (id: string): Promise<void> => {
  const { error } = await supabase.from("custom_designs").delete().eq("id", id)
  if (error) throw error
}
