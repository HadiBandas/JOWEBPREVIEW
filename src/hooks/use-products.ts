/**
 * useProducts — Hook universal untuk membaca produk
 *
 * Prioritas:
 * 1. Jika ada perubahan dari CMS admin (store) → pakai itu
 * 2. Fallback ke data.ts (hardcoded default)
 *
 * Cara pakai di komponen mana saja:
 *   const { products, getProduct } = useProducts()
 */

"use client"

import { useProductStore } from "@/store/product-store"
import { Product } from "@/lib/types"

export function useProducts() {
    const { getAllProducts, getProduct } = useProductStore()
    const products = getAllProducts()

    return { products, getProduct }
}

/**
 * useProduct — Ambil satu produk berdasarkan slug
 */
export function useProduct(slug: string): Product | undefined {
    const { products } = useProducts()
    return products.find(p => p.slug === slug)
}
