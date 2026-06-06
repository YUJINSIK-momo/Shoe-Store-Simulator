import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { listDesigns, createDesign, deleteDesign } from "../api/designs"
import { useAuthStore } from "../store/authStore"

export const useDesigns = () => {
  const user = useAuthStore((s) => s.user)
  return useQuery({
    queryKey: ["designs", user?.id],
    queryFn: listDesigns,
    enabled: !!user,
  })
}

export const useCreateDesign = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDesign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] })
    },
  })
}

export const useDeleteDesign = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteDesign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] })
    },
  })
}
