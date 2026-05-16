import { useQuery } from "@tanstack/react-query"
import { getShoeModels, getShoeModel } from "../api/shoes"

export const useShoeModels = () =>
  useQuery({
    queryKey: ["shoes"],
    queryFn: getShoeModels,
  })

export const useShoeModel = (id: string) =>
  useQuery({
    queryKey: ["shoes", id],
    queryFn: () => getShoeModel(id),
    enabled: !!id,
  })
