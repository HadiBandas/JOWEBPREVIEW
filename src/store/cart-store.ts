import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    productId: string
    name: string
    slug: string
    size: string
    price: number
    quantity: number
    image: string
    category: string
}

interface CartStore {
    items: CartItem[]
    isOpen: boolean

    // Actions
    openCart: () => void
    closeCart: () => void
    toggleCart: () => void

    addItem: (item: CartItem) => void
    removeItem: (productId: string, size: string) => void
    updateQuantity: (productId: string, size: string, quantity: number) => void
    clearCart: () => void

    // Computed (as functions to work with persist)
    getTotal: () => number
    getItemCount: () => number
    getItem: (productId: string, size: string) => CartItem | undefined
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            addItem: (newItem) => {
                set((state) => {
                    const existing = state.items.find(
                        (i) => i.productId === newItem.productId && i.size === newItem.size
                    )

                    if (existing) {
                        // Tambah quantity kalau produk & ukuran sama
                        return {
                            items: state.items.map((i) =>
                                i.productId === newItem.productId && i.size === newItem.size
                                    ? { ...i, quantity: i.quantity + newItem.quantity }
                                    : i
                            ),
                            isOpen: true, // buka drawer otomatis
                        }
                    }

                    // Tambah item baru
                    return {
                        items: [...state.items, newItem],
                        isOpen: true, // buka drawer otomatis
                    }
                })
            },

            removeItem: (productId, size) => {
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.productId === productId && i.size === size)
                    ),
                }))
            },

            updateQuantity: (productId, size, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId, size)
                    return
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.productId === productId && i.size === size
                            ? { ...i, quantity }
                            : i
                    ),
                }))
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            },

            getItemCount: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0)
            },

            getItem: (productId, size) => {
                return get().items.find((i) => i.productId === productId && i.size === size)
            },
        }),
        {
            name: 'julia-owers-cart', // key di localStorage
            partialize: (state) => ({ items: state.items }), // hanya simpan items, bukan isOpen
        }
    )
)
