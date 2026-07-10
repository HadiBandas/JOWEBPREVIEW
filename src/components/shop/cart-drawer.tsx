"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { useParams } from "next/navigation"

export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
    const params = useParams()
    const lang = (params?.lang as string) || 'id'
    const drawerRef = useRef<HTMLDivElement>(null)

    const total = getTotal()
    const itemCount = getItemCount()
    const freeShippingThreshold = 500000
    const remainingForFreeShipping = freeShippingThreshold - total

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
                closeCart()
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClick)
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.removeEventListener("mousedown", handleClick)
            document.body.style.overflow = ""
        }
    }, [isOpen, closeCart])

    // Close on ESC
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeCart()
        }
        document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [closeCart])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-charcoal/40 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} className="text-charcoal" />
                                <h2 className="font-serif text-lg text-charcoal">
                                    Keranjang
                                    {itemCount > 0 && (
                                        <span className="ml-2 text-sm font-normal text-charcoal/50">({itemCount})</span>
                                    )}
                                </h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-gray-50 transition-colors rounded-full"
                                aria-label="Tutup keranjang"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Free shipping progress */}
                        {total > 0 && (
                            <div className="px-6 py-3 bg-linen-light/50 border-b border-gray-100">
                                {remainingForFreeShipping > 0 ? (
                                    <div>
                                        <p className="text-xs text-charcoal/60 mb-2">
                                            Tambah <span className="font-semibold text-earth">Rp {remainingForFreeShipping.toLocaleString("id-ID")}</span> lagi untuk gratis ongkir
                                        </p>
                                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-earth rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                                        ✓ Selamat! Kamu mendapat gratis ongkir
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                        <ShoppingBag size={28} className="text-gray-300" />
                                    </div>
                                    <div>
                                        <p className="font-serif text-xl text-charcoal mb-1">Keranjang kosong</p>
                                        <p className="text-sm text-charcoal/50">Tambahkan produk untuk mulai belanja</p>
                                    </div>
                                    <button
                                        onClick={closeCart}
                                        className="mt-2 text-sm font-medium text-earth underline underline-offset-4"
                                    >
                                        Jelajahi Koleksi →
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.productId}-${item.size}`}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex gap-4 px-6 py-4 border-b border-gray-50 last:border-0"
                                        >
                                            {/* Product Image */}
                                            <Link
                                                href={`/${lang}/shop/${item.slug}`}
                                                onClick={closeCart}
                                                className="relative w-20 h-24 flex-shrink-0 bg-gray-100 overflow-hidden"
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </Link>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/${lang}/shop/${item.slug}`}
                                                    onClick={closeCart}
                                                    className="font-serif text-sm text-charcoal leading-tight hover:text-earth transition-colors line-clamp-2 block mb-1"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-3">
                                                    Ukuran: {item.size}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    {/* Qty Controls */}
                                                    <div className="flex items-center border border-gray-200">
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                            aria-label="Kurang"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                            aria-label="Tambah"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>

                                                    {/* Price + Remove */}
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-medium text-charcoal">
                                                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                                        </span>
                                                        <button
                                                            onClick={() => removeItem(item.productId, item.size)}
                                                            className="p-1 text-gray-300 hover:text-rust transition-colors"
                                                            aria-label="Hapus"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer — Checkout */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 px-6 py-6 space-y-4 bg-white">
                                {/* Subtotal */}
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-charcoal/60">Subtotal</span>
                                    <span className="font-serif text-xl text-charcoal">
                                        Rp {total.toLocaleString("id-ID")}
                                    </span>
                                </div>
                                <p className="text-xs text-charcoal/40">
                                    Ongkir dihitung saat checkout
                                </p>

                                {/* Checkout Button */}
                                <Link
                                    href={`/${lang}/checkout`}
                                    onClick={closeCart}
                                    className="flex items-center justify-center gap-2 w-full h-14 bg-charcoal text-white font-medium uppercase tracking-widest text-sm hover:bg-earth transition-colors"
                                >
                                    Checkout
                                    <ArrowRight size={16} />
                                </Link>

                                {/* Continue shopping */}
                                <button
                                    onClick={closeCart}
                                    className="w-full text-center text-xs text-charcoal/40 hover:text-charcoal transition-colors underline underline-offset-4"
                                >
                                    Lanjut belanja
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
