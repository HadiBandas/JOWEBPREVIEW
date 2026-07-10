/**
 * Product Store — CMS State Management
 *
 * Strategi hybrid:
 * - Data awal dari data.ts (hardcoded)
 * - Perubahan dari admin (tambah/edit/hapus) disimpan di localStorage
 * - Gabungan keduanya dipakai di seluruh website
 *
 * TODO Tim IT: Ganti localStorage dengan fetch ke API database server
 * GET  /api/cms/products       → ambil semua produk
 * POST /api/cms/products       → tambah produk baru
 * PUT  /api/cms/products/:id   → edit produk
 * DELETE /api/cms/products/:id → hapus produk
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/lib/types'
import { products as defaultProducts } from '@/lib/data'

interface ProductStore {
    // Produk override dari admin (tambah/edit)
    overrides: Product[]
    // ID produk yang sudah dihapus dari admin
    deletedIds: string[]

    // Actions
    addProduct: (product: Product) => void
    updateProduct: (id: string, updates: Partial<Product>) => void
    deleteProduct: (id: string) => void
    restoreProduct: (id: string) => void
    resetToDefault: () => void

    // Computed
    getAllProducts: () => Product[]
    getProduct: (id: string) => Product | undefined
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            overrides: [],
            deletedIds: [],

            // Tambah produk baru (dari admin CMS)
            addProduct: (product) => {
                set((state) => ({
                    overrides: [...state.overrides, product]
                }))
            },

            // Edit produk — jika produk default, simpan ke overrides; jika sudah override, update
            updateProduct: (id, updates) => {
                set((state) => {
                    const existingOverride = state.overrides.find(p => p.id === id)
                    if (existingOverride) {
                        // Update existing override
                        return {
                            overrides: state.overrides.map(p =>
                                p.id === id ? { ...p, ...updates } : p
                            )
                        }
                    } else {
                        // Copy dari default lalu merge dengan updates
                        const defaultProduct = defaultProducts.find(p => p.id === id)
                        if (defaultProduct) {
                            return {
                                overrides: [...state.overrides, { ...defaultProduct, ...updates }]
                            }
                        }
                        return state
                    }
                })
            },

            // Hapus produk (soft delete — tandai deleted, tidak remove dari list default)
            deleteProduct: (id) => {
                set((state) => ({
                    deletedIds: [...state.deletedIds, id],
                    overrides: state.overrides.filter(p => p.id !== id)
                }))
            },

            // Pulihkan produk yang dihapus
            restoreProduct: (id) => {
                set((state) => ({
                    deletedIds: state.deletedIds.filter(dId => dId !== id)
                }))
            },

            // Reset semua ke data default (hapus semua perubahan admin)
            resetToDefault: () => {
                set({ overrides: [], deletedIds: [] })
            },

            // Ambil semua produk (default + override, filter yang deleted)
            getAllProducts: () => {
                const { overrides, deletedIds } = get()
                // Mulai dari default
                const baseProducts = defaultProducts.filter(p => !deletedIds.includes(p.id))
                // Replace dengan override jika ada
                const mergedDefaults = baseProducts.map(p => {
                    const override = overrides.find(o => o.id === p.id)
                    return override ?? p
                })
                // Tambahkan produk baru yang bukan dari default
                const defaultIds = new Set(defaultProducts.map(p => p.id))
                const newProducts = overrides.filter(o => !defaultIds.has(o.id))
                return [...mergedDefaults, ...newProducts]
            },

            // Ambil satu produk by ID
            getProduct: (id) => {
                const { overrides, deletedIds } = get()
                if (deletedIds.includes(id)) return undefined
                const override = overrides.find(p => p.id === id)
                if (override) return override
                return defaultProducts.find(p => p.id === id)
            },
        }),
        {
            name: 'julia-owers-products-cms',
        }
    )
)
