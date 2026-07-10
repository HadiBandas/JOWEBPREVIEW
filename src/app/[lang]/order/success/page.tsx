"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, MessageCircle, ShoppingBag, Home, Package } from "lucide-react"
import { Container } from "@/components/ui/container"
import { useParams } from "next/navigation"

interface OrderData {
    id: string
    items: Array<{
        name: string
        size: string
        quantity: number
        price: number
    }>
    form: {
        name: string
        phone: string
        city: string
        province: string
    }
    shipping: {
        label: string
    }
    subtotal: number
    shippingCost: number
    total: number
    createdAt: string
}

export default function OrderSuccessPage() {
    const params = useParams()
    const lang = (params?.lang as string) || 'id'
    const [order, setOrder] = useState<OrderData | null>(null)

    useEffect(() => {
        // Ambil data order terakhir dari localStorage
        const saved = localStorage.getItem("jo_last_order")
        if (saved) {
            try {
                setOrder(JSON.parse(saved))
            } catch {
                // ignore
            }
        }
    }, [])

    return (
        <main className="min-h-screen bg-linen-light/30 pt-24 pb-16 flex items-center">
            <Container>
                <div className="max-w-lg mx-auto text-center">

                    {/* Animasi Centang */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.1 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
                        </div>
                    </motion.div>

                    {/* Judul */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
                            Pesanan Dikirim!
                        </h1>
                        <p className="text-charcoal/60 leading-relaxed mb-2">
                            Pesan WhatsApp kamu sudah terbuka. Silakan kirim pesan tersebut dan
                            tim kami akan segera merespons untuk konfirmasi pesanan dan pembayaran.
                        </p>
                        {order && (
                            <p className="text-xs text-charcoal/40 uppercase tracking-widest">
                                Ref: {order.id}
                            </p>
                        )}
                    </motion.div>

                    {/* Order Summary Card */}
                    {order && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 bg-white p-6 text-left space-y-4"
                        >
                            <h2 className="font-serif text-lg text-charcoal border-b border-gray-100 pb-3">
                                Ringkasan Pesanan
                            </h2>

                            {/* Items */}
                            <div className="space-y-2">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span className="text-charcoal/70">
                                            {item.name} ({item.size}) × {item.quantity}
                                        </span>
                                        <span className="text-charcoal font-medium">
                                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="border-t border-gray-100 pt-3 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-charcoal/60">Subtotal</span>
                                    <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-charcoal/60">Ongkir ({order.shipping.label})</span>
                                    <span className={order.shippingCost === 0 ? "text-emerald-600" : ""}>
                                        {order.shippingCost === 0 ? "Gratis" : `Rp ${order.shippingCost.toLocaleString("id-ID")}`}
                                    </span>
                                </div>
                                <div className="flex justify-between font-medium pt-2 border-t border-gray-100">
                                    <span className="text-charcoal">Total</span>
                                    <span className="font-serif text-lg text-charcoal">
                                        Rp {order.total.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>

                            {/* Shipping info */}
                            <div className="bg-linen-light/50 p-3 text-xs text-charcoal/60 flex items-start gap-2">
                                <Package size={14} className="mt-0.5 flex-shrink-0" />
                                <p>
                                    Pesanan akan dikirim ke: <strong className="text-charcoal">{order.form.city}, {order.form.province}</strong>
                                    {" "}a.n. <strong className="text-charcoal">{order.form.name}</strong>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 bg-white p-6 text-left"
                    >
                        <h3 className="font-serif text-base text-charcoal mb-4">Langkah Selanjutnya</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    step: "1",
                                    title: "Kirim pesan WhatsApp",
                                    desc: "Pastikan kamu mengirim pesan yang sudah terbuka di WhatsApp."
                                },
                                {
                                    step: "2",
                                    title: "Konfirmasi & pembayaran",
                                    desc: "Tim kami akan membalas dalam 1–2 jam dengan info pembayaran."
                                },
                                {
                                    step: "3",
                                    title: "Pesanan diproses & dikirim",
                                    desc: "Setelah pembayaran dikonfirmasi, pesanan langsung diproses."
                                },
                            ].map((s) => (
                                <div key={s.step} className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {s.step}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-charcoal">{s.title}</p>
                                        <p className="text-xs text-charcoal/50">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex flex-col sm:flex-row gap-3"
                    >
                        <Link
                            href={`https://wa.me/6281234567890`}
                            target="_blank"
                            className="flex-1 h-12 bg-[#25D366] text-white font-medium text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={16} />
                            Buka WhatsApp
                        </Link>
                        <Link
                            href={`/${lang}/shop`}
                            className="flex-1 h-12 border border-charcoal/20 text-charcoal font-medium text-sm uppercase tracking-widest hover:border-charcoal transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={16} />
                            Belanja Lagi
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-4"
                    >
                        <Link
                            href={`/${lang}`}
                            className="text-xs text-charcoal/40 hover:text-charcoal transition-colors flex items-center justify-center gap-1"
                        >
                            <Home size={12} />
                            Kembali ke Beranda
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </main>
    )
}
