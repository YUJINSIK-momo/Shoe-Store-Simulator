import { create } from "zustand"
import { CartItem } from "../types/order"

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (designId: string) => void
  updateQuantity: (designId: string, quantity: number) => void
  clearCart: () => void
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find(
        (i) => i.design.id === item.design.id && i.size === item.size
      )
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.design.id === item.design.id && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, item] }
    }),
  removeItem: (designId) =>
    set((state) => ({
      items: state.items.filter((i) => i.design.id !== designId),
    })),
  updateQuantity: (designId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.design.id === designId ? { ...i, quantity } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.shoe.basePrice * item.quantity,
      0
    ),
}))
