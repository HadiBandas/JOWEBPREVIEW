"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Check } from "lucide-react"
import { useParams } from "next/navigation"
import { useCartStore } from "@/store/cart-store"
import { useState } from "react"

interface ProductCardProps {
    id: string
    name: string
    price: number
    image: string
    category: string
    slug: string
    colors: string[]
    sizes: string[]
}

export function ProductCard({ id, name, price, image, category, slug, sizes }: ProductCardProps) {
    const params = useParams()
    const lang = (params?.lang as string) || 'id'
    const { addItem } = useCartStore()
    const [added, setAdded] = useState(false)

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        // Quick add dengan ukuran pertama yang tersedia
        const defaultSize = sizes[0] ?? "One Size"

        addItem({
            productId: id,
            name,
            slug,
            size: defaultSize,
            price,
            quantity: 1,
            image,
            category,
        })

        // Feedback visual — ikon centang sebentar
        setAdded(true)
        setTimeout(() => setAdded(false), 1500)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white"
        >
            <Link href={`/${lang}/shop/${slug}`}>
                <div className="aspect-[3/4] overflow-hidden relative bg-gray-100 mb-4">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />

                    {/* Quick Add Button — hover on desktop, always visible on mobile */}
                    <motion.button
                        onClick={handleQuickAdd}
                        aria-label={`Tambah ${name} ke keranjang`}
                        whileTap={{ scale: 0.95 }}
                        className={`
                            absolute bottom-4 left-0 right-0 mx-4
                            h-10 flex items-center justify-center gap-2
                            text-xs font-medium uppercase tracking-widest
                            transition-all duration-300 z-10
                            opacity-100 translate-y-0
                            md:opacity-0 md:translate-y-3
                            md:group-hover:opacity-100 md:group-hover:translate-y-0
                            ${added
                                ? "bg-emerald-600 text-white"
                                : "bg-white text-charcoal hover:bg-charcoal hover:text-white"
                            }
                        `}
                    >
                        {added ? (
                            <>
                                <Check size={14} />
                                Ditambahkan
                            </>
                        ) : (
                            <>
                                <ShoppingBag size={14} />
                                Tambah
                            </>
                        )}
                    </motion.button>
                </div>

                <div className="space-y-1 px-1">
                    <h3 className="font-serif text-base md:text-lg text-charcoal leading-tight group-hover:text-earth transition-colors">
                        {name}
                    </h3>
                    <div className="flex justify-between items-baseline">
                        <p className="text-xs text-charcoal/50 uppercase tracking-wider">{category}</p>
                        <span className="text-sm font-medium text-charcoal">
                            Rp {price.toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
