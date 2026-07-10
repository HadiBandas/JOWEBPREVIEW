"use client"

import { useProducts } from "@/hooks/use-products"
import { ProductCard } from "@/components/shop/product-card"
import { ShoppingBag } from "lucide-react"

interface CategoryProductGridProps {
    dataCategory: string
    isEn: boolean
}

export function CategoryProductGrid({ dataCategory, isEn }: CategoryProductGridProps) {
    const { products } = useProducts()
    const categoryProducts = products.filter(p => p.category === dataCategory)

    if (categoryProducts.length === 0) {
        return (
            <div className="py-24 text-center border border-dashed border-gray-200">
                <ShoppingBag size={40} className="mx-auto mb-3 text-gray-200" />
                <p className="text-charcoal/50">
                    {isEn ? "No products found in this category yet." : "Belum ada produk di kategori ini."}
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
            {categoryProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    )
}
