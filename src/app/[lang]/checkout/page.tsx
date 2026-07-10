"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/store/cart-store"
import { Container } from "@/components/ui/container"
import { ArrowLeft, ChevronDown, Truck, Shield, MessageCircle } from "lucide-react"
import { useParams } from "next/navigation"

// ─────────────────────────────────────────────
// Konfigurasi Ongkir — Tim IT bisa ganti ini
// dengan kalkulasi ongkir dari API Raja Ongkir
// ─────────────────────────────────────────────
const SHIPPING_OPTIONS = [
    { id: "jne_reg", label: "JNE Reguler", desc: "Estimasi 3–5 hari kerja", cost: 0 },
    { id: "jne_yes", label: "JNE YES (Express)", desc: "Estimasi 1–2 hari kerja", cost: 35000 },
    { id: "jnt_reg", label: "J&T Reguler", desc: "Estimasi 2–4 hari kerja", cost: 0 },
]
const FREE_SHIPPING_THRESHOLD = 500000

// ─────────────────────────────────────────────
// Daftar Provinsi Indonesia (simplified)
// ─────────────────────────────────────────────
const PROVINCES = [
    "Aceh", "Bali", "Banten", "Bengkulu", "DI Yogyakarta", "DKI Jakarta",
    "Gorontalo", "Jambi", "Jawa Barat", "Jawa Tengah", "Jawa Timur",
    "Kalimantan Barat", "Kalimantan Selatan", "Kalimantan Tengah",
    "Kalimantan Timur", "Kalimantan Utara", "Kepulauan Bangka Belitung",
    "Kepulauan Riau", "Lampung", "Maluku", "Maluku Utara", "Nusa Tenggara Barat",
    "Nusa Tenggara Timur", "Papua", "Papua Barat", "Riau", "Sulawesi Barat",
    "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara", "Sulawesi Utara",
    "Sumatera Barat", "Sumatera Selatan", "Sumatera Utara",
]

interface FormData {
    name: string
    phone: string
    email: string
    address: string
    city: string
    province: string
    postalCode: string
    notes: string
}

export default function CheckoutPage() {
    const router = useRouter()
    const params = useParams()
    const lang = (params?.lang as string) || 'id'
    const { items, getTotal, clearCart } = useCartStore()

    const [form, setForm] = useState<FormData>({
        name: "", phone: "", email: "",
        address: "", city: "", province: "", postalCode: "",
        notes: "",
    })
    const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0].id)
    const [errors, setErrors] = useState<Partial<FormData>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState<"form" | "review">("form")

    const subtotal = getTotal()
    const shippingOption = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)!
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingOption.cost
    const total = subtotal + shippingCost

    // Redirect kalau cart kosong
    useEffect(() => {
        if (items.length === 0) {
            router.push(`/${lang}/shop`)
        }
    }, [items, lang, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {}
        if (!form.name.trim()) newErrors.name = "Nama wajib diisi"
        if (!form.phone.trim()) newErrors.phone = "Nomor HP wajib diisi"
        else if (!/^(\+62|62|0)[0-9]{8,12}$/.test(form.phone.replace(/\s/g, "")))
            newErrors.phone = "Format nomor HP tidak valid"
        if (!form.address.trim()) newErrors.address = "Alamat wajib diisi"
        if (!form.city.trim()) newErrors.city = "Kota wajib diisi"
        if (!form.province) newErrors.province = "Provinsi wajib dipilih"
        if (!form.postalCode.trim()) newErrors.postalCode = "Kode pos wajib diisi"
        else if (!/^\d{5}$/.test(form.postalCode))
            newErrors.postalCode = "Kode pos harus 5 digit"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // ─────────────────────────────────────────────────────────────────
    // SUBMIT ORDER — Saat ini via WhatsApp
    //
    // TODO untuk Tim IT:
    // Ganti bagian ini dengan API call ke endpoint payment gateway
    // Contoh: POST /api/payment/create → dapat Midtrans Snap token
    // Lalu munculkan popup Midtrans
    // ─────────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (!validate()) return
        setIsSubmitting(true)

        // Format pesan WhatsApp yang rapi & informatif
        const itemsList = items.map(item =>
            `• ${item.name} (${item.size}) × ${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`
        ).join("\n")

        const shippingInfo = `${shippingOption.label}${shippingCost === 0 ? " (GRATIS)" : ` = Rp ${shippingCost.toLocaleString("id-ID")}`}`

        const message = [
            `🛍️ *PESANAN BARU — Julia Owers*`,
            ``,
            `*Informasi Pemesan:*`,
            `Nama: ${form.name}`,
            `HP: ${form.phone}`,
            form.email ? `Email: ${form.email}` : null,
            ``,
            `*Alamat Pengiriman:*`,
            `${form.address}`,
            `${form.city}, ${form.province} ${form.postalCode}`,
            form.notes ? `Catatan: ${form.notes}` : null,
            ``,
            `*Detail Pesanan:*`,
            itemsList,
            ``,
            `Subtotal: Rp ${subtotal.toLocaleString("id-ID")}`,
            `Pengiriman (${shippingInfo})`,
            `*Total: Rp ${total.toLocaleString("id-ID")}*`,
            ``,
            `Mohon konfirmasi ketersediaan & informasi pembayaran. Terima kasih! 🙏`,
        ].filter(Boolean).join("\n")

        const waNumber = "6281234567890" // TODO: Ganti dengan nomor WA bisnis resmi
        const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`

        // Simpan data order ke localStorage untuk halaman sukses
        const orderData = {
            id: `JO-${Date.now()}`,
            items: [...items],
            form: { ...form },
            shipping: shippingOption,
            shippingCost,
            subtotal,
            total,
            createdAt: new Date().toISOString(),
        }
        localStorage.setItem("jo_last_order", JSON.stringify(orderData))

        // Buka WhatsApp
        window.open(url, "_blank")

        // Reset cart & redirect ke halaman sukses
        clearCart()
        router.push(`/${lang}/order/success`)
    }

    if (items.length === 0) return null

    return (
        <main className="min-h-screen bg-linen-light/30 pt-24 pb-16">
            <Container>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-charcoal/40 uppercase tracking-widest mb-8">
                    <Link href={`/${lang}/shop`} className="hover:text-charcoal transition-colors flex items-center gap-1">
                        <ArrowLeft size={14} />
                        Belanja
                    </Link>
                    <span>/</span>
                    <span className="text-charcoal">Checkout</span>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-10">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* ─── KIRI: Form ─── */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Section: Info Pembeli */}
                        <section className="bg-white p-6 md:p-8">
                            <h2 className="font-serif text-xl text-charcoal mb-6 pb-4 border-b border-gray-100">
                                Informasi Pemesan
                            </h2>
                            <div className="space-y-4">
                                <FormField label="Nama Lengkap *" error={errors.name}>
                                    <input name="name" value={form.name} onChange={handleChange}
                                        placeholder="Nama sesuai identitas"
                                        className={inputClass(errors.name)} />
                                </FormField>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField label="Nomor HP (WhatsApp) *" error={errors.phone}>
                                        <input name="phone" value={form.phone} onChange={handleChange}
                                            placeholder="08xxxxxxxxxx"
                                            className={inputClass(errors.phone)} />
                                    </FormField>
                                    <FormField label="Email (opsional)" error={errors.email}>
                                        <input name="email" type="email" value={form.email} onChange={handleChange}
                                            placeholder="email@contoh.com"
                                            className={inputClass(errors.email)} />
                                    </FormField>
                                </div>
                            </div>
                        </section>

                        {/* Section: Alamat */}
                        <section className="bg-white p-6 md:p-8">
                            <h2 className="font-serif text-xl text-charcoal mb-6 pb-4 border-b border-gray-100">
                                Alamat Pengiriman
                            </h2>
                            <div className="space-y-4">
                                <FormField label="Alamat Lengkap *" error={errors.address}>
                                    <textarea name="address" value={form.address} onChange={handleChange}
                                        placeholder="Nama jalan, nomor, RT/RW, kelurahan, kecamatan"
                                        rows={3}
                                        className={`${inputClass(errors.address)} resize-none`} />
                                </FormField>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField label="Kota / Kabupaten *" error={errors.city}>
                                        <input name="city" value={form.city} onChange={handleChange}
                                            placeholder="Cth: Bandung"
                                            className={inputClass(errors.city)} />
                                    </FormField>
                                    <FormField label="Kode Pos *" error={errors.postalCode}>
                                        <input name="postalCode" value={form.postalCode} onChange={handleChange}
                                            placeholder="40xxx"
                                            maxLength={5}
                                            className={inputClass(errors.postalCode)} />
                                    </FormField>
                                </div>

                                <FormField label="Provinsi *" error={errors.province}>
                                    <div className="relative">
                                        <select name="province" value={form.province} onChange={handleChange}
                                            className={`${inputClass(errors.province)} appearance-none pr-10`}>
                                            <option value="">Pilih Provinsi</option>
                                            {PROVINCES.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />
                                    </div>
                                </FormField>

                                <FormField label="Catatan (opsional)">
                                    <textarea name="notes" value={form.notes} onChange={handleChange}
                                        placeholder="Cth: Taruh di depan pintu, hubungi sebelum antar, dll."
                                        rows={2}
                                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-charcoal transition-colors resize-none" />
                                </FormField>
                            </div>
                        </section>

                        {/* Section: Kurir */}
                        <section className="bg-white p-6 md:p-8">
                            <h2 className="font-serif text-xl text-charcoal mb-6 pb-4 border-b border-gray-100">
                                Metode Pengiriman
                            </h2>
                            <div className="space-y-3">
                                {SHIPPING_OPTIONS.map(option => {
                                    const isFree = subtotal >= FREE_SHIPPING_THRESHOLD && option.cost > 0
                                    const displayCost = isFree || option.cost === 0 ? "Gratis" : `Rp ${option.cost.toLocaleString("id-ID")}`
                                    const isSelected = selectedShipping === option.id

                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setSelectedShipping(option.id)}
                                            className={`w-full flex items-center justify-between p-4 border-2 transition-all text-left ${isSelected
                                                ? "border-charcoal bg-charcoal/5"
                                                : "border-gray-200 hover:border-charcoal/40"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-charcoal" : "border-gray-300"}`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-charcoal" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-charcoal">{option.label}</p>
                                                    <p className="text-xs text-charcoal/50">{option.desc}</p>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-medium ${option.cost === 0 || isFree ? "text-emerald-600" : "text-charcoal"}`}>
                                                {displayCost}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>

                            {subtotal >= FREE_SHIPPING_THRESHOLD && (
                                <p className="mt-3 text-xs text-emerald-600 flex items-center gap-1">
                                    <Truck size={12} />
                                    Gratis ongkir untuk semua kurir karena pembelian di atas Rp 500.000
                                </p>
                            )}
                        </section>

                    </div>

                    {/* ─── KANAN: Order Summary (Sticky) ─── */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32 space-y-4">
                            <div className="bg-white p-6 md:p-8">
                                <h2 className="font-serif text-xl text-charcoal mb-6 pb-4 border-b border-gray-100">
                                    Ringkasan Pesanan
                                </h2>

                                {/* Item list */}
                                <div className="space-y-4 mb-6">
                                    {items.map(item => (
                                        <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                                            <div className="relative w-14 h-16 flex-shrink-0 bg-gray-100">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-serif text-sm text-charcoal leading-tight">{item.name}</p>
                                                <p className="text-xs text-charcoal/40 mt-0.5">Ukuran: {item.size}</p>
                                                <p className="text-sm font-medium text-charcoal mt-1">
                                                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal/60">Subtotal</span>
                                        <span className="text-charcoal">Rp {subtotal.toLocaleString("id-ID")}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal/60">Ongkir ({shippingOption.label})</span>
                                        <span className={shippingCost === 0 ? "text-emerald-600 font-medium" : "text-charcoal"}>
                                            {shippingCost === 0 ? "Gratis" : `Rp ${shippingCost.toLocaleString("id-ID")}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-100">
                                        <span className="font-medium text-charcoal">Total</span>
                                        <span className="font-serif text-xl text-charcoal">
                                            Rp {total.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* ──────────────────────────────────────────────────
                                TOMBOL PESAN — Saat ini via WhatsApp
                                
                                TODO TIM IT: Ganti dengan Midtrans Snap
                                1. Panggil POST /api/payment/create
                                2. Dapat snap_token
                                3. window.snap.pay(snap_token, {...})
                            ────────────────────────────────────────────────── */}
                            <motion.button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                whileTap={{ scale: 0.98 }}
                                className="w-full h-14 bg-charcoal text-white font-medium uppercase tracking-widest hover:bg-earth transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                <MessageCircle size={18} />
                                {isSubmitting ? "Membuka WhatsApp..." : "Pesan via WhatsApp"}
                            </motion.button>

                            {/* Trust badges */}
                            <div className="flex items-center justify-center gap-6 text-xs text-charcoal/40 pt-2">
                                <div className="flex items-center gap-1">
                                    <Shield size={12} />
                                    <span>100% aman</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Truck size={12} />
                                    <span>Pengiriman terpercaya</span>
                                </div>
                            </div>

                            <p className="text-center text-xs text-charcoal/30 leading-relaxed">
                                Dengan memesan, kamu menyetujui{" "}
                                <Link href={`/${lang}/terms`} className="underline hover:text-charcoal">
                                    Syarat & Ketentuan
                                </Link>{" "}kami.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}

// ─── Helper Components ───

function FormField({ label, error, children }: {
    label: string
    error?: string
    children: React.ReactNode
}) {
    return (
        <div>
            <label className="block text-xs font-medium uppercase tracking-widest text-charcoal/60 mb-2">
                {label}
            </label>
            {children}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1.5 text-xs text-red-500"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

function inputClass(error?: string) {
    return `w-full border ${error ? "border-red-400 bg-red-50" : "border-gray-200"} px-4 py-3 text-sm focus:outline-none focus:border-charcoal transition-colors`
}
