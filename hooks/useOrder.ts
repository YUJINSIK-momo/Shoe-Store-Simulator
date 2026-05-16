import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createOrder, getOrder, getOrders } from "../api/orders"

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })

export const useOrder = (id: string) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  })

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}
