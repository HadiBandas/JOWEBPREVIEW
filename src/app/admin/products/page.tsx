"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
    Plus, Edit2, Trash2, Search, Package, Eye,
    ArrowLeft, Save, X, Upload, AlertCircle,
    RefreshCw, ImageIcon, Tag,
    Layers, Info, Star, Leaf, Grid, List, Loader2,
    ShoppingBag, Settings, LogOut, RotateCcw, Home
} from "lucide-react"
import { useProductStore } from "@/store/product-store"
import { Product } from "@/lib/types"

// ─── CONSTANTS ───────────────────────────────────────────
const ADMIN_PASSWORD = "juliaowers2026"
const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Outerwear"]
const SUB_CATEGORIES = ["TRD", "KULOT", "BLW S/S", "BLW L/S", "ROD", "JKT", "VES", "KRG"]
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]
const COLOR_PRESETS = [
    "Ivory", "Oatmeal", "Cream", "White", "Black", "Navy", "Sage Green",
    "Dusty Blue", "Terracotta", "Olive", "Sand", "Charcoal", "Light Blue",
    "Blush", "Chocolate"
]

const blankProduct = (): Omit<Product, "id"> => ({
    name: "",
    slug: "",
    price: 0,
    currency: "IDR",
    category: "Tops",
    subCategory: "BLW S/S",
    image: "/images/product-1.png",
    hoverImage: "/images/product-1.png",
    description: "",
    material: "100% Pure European Linen",
    care: ["Machine wash cold", "Air dry recommended"],
    features: [""],
    sustainability: ["Made locally in Bandung"],
    sizes: ["S", "M", "L"],
    colors: ["Ivory"],
})

function slugify(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
}

// ─── MAIN COMPONENT ────────────────────────────────────────
export default function AdminProductsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")
    const [view, setView] = useState<"list" | "form">("list")
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterCategory, setFilterCategory] = useState<string>("all")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [savedFeedback, setSavedFeedback] = useState(false)

    const { getAllProducts, deleteProduct, restoreProduct, deletedIds, resetToDefault, addProduct, updateProduct } = useProductStore()
    const products = getAllProducts()

    useEffect(() => {
        const auth = sessionStorage.getItem("jo_admin_auth")
        if (auth === "true") setIsAuthenticated(true)
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("jo_admin_auth", "true")
            setIsAuthenticated(true)
        } else setAuthError("Password salah. Coba lagi.")
    }

    const handleLogout = () => {
        sessionStorage.removeItem("jo_admin_auth")
        setIsAuthenticated(false)
    }

    const filteredProducts = products.filter(p => {
        const matchCat = filterCategory === "all" || p.category === filterCategory
        const q = searchQuery.toLowerCase()
        const matchSearch = !q || p.name.toLowerCase().includes(q) || p.slug.includes(q)
        return matchCat && matchSearch
    })

    const handleSaveProduct = (data: Product) => {
        if (isCreating) addProduct(data)
        else updateProduct(data.id, data)
        setSavedFeedback(true)
        setTimeout(() => { setSavedFeedback(false); setView("list") }, 1200)
    }

    // ─── LOGIN PAGE ─────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
                <div className="w-full max-w-sm">
                    {/* Logo area */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                            <Package size={28} className="text-white/60" />
                        </div>
                        <h1 className="font-serif text-3xl text-white mb-1">Julia Owers</h1>
                        <p className="text-xs text-white/40 uppercase tracking-[0.25em]">Admin — CMS Produk</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); setAuthError("") }}
                                    placeholder="••••••••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                                    autoFocus
                                />
                                {authError && (
                                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                                        <AlertCircle size={12} /> {authError}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full h-12 bg-white text-gray-900 font-semibold text-sm rounded-lg hover:bg-white/90 transition-colors"
                            >
                                Masuk ke Dashboard
                            </button>
                        </form>
                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <Link href="/id" className="text-xs text-white/30 hover:text-white/50 transition-colors">
                                ← Kembali ke Website
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ─── FORM VIEW ──────────────────────────────────────────
    if (view === "form") {
        return (
            <ProductFormView
                product={editingProduct}
                isCreating={isCreating}
                onSave={handleSaveProduct}
                onCancel={() => setView("list")}
                savedFeedback={savedFeedback}
            />
        )
    }

    // ─── DASHBOARD LAYOUT ───────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-950 flex">

            {/* ── SIDEBAR ── */}
            <aside className="w-64 bg-gray-900 border-r border-white/5 flex flex-col fixed h-full z-20">
                {/* Brand */}
                <div className="px-6 py-6 border-b border-white/5">
                    <p className="font-serif text-xl text-white">Julia Owers</p>
                    <p className="text-xs text-white/30 mt-0.5 uppercase tracking-widest">Admin Panel</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <Link href="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                        <ShoppingBag size={16} />
                        Manajemen Pesanan
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white bg-white/10 font-medium">
                        <Package size={16} />
                        CMS Produk
                        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/60">
                            {products.length}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/20 cursor-not-allowed" title="Segera hadir">
                        <Settings size={16} />
                        Pengaturan
                    </div>
                </nav>

                {/* Bottom */}
                <div className="px-3 py-4 border-t border-white/5 space-y-1">
                    <Link href="/id" target="_blank"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <Home size={16} />
                        Lihat Website
                    </Link>
                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                        <LogOut size={16} />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="ml-64 flex-1 flex flex-col min-h-screen">

                {/* Top Bar */}
                <header className="bg-gray-900/80 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-lg font-semibold text-white">CMS Produk</h1>
                        <p className="text-xs text-white/30 mt-0.5">
                            Kelola semua produk Julia Owers · {products.length} produk aktif
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {deletedIds.length > 0 && (
                            <button onClick={resetToDefault}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors">
                                <RotateCcw size={12} />
                                Reset Default
                            </button>
                        )}
                        <button
                            onClick={() => { setEditingProduct(null); setIsCreating(true); setView("form") }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors">
                            <Plus size={16} />
                            Produk Baru
                        </button>
                    </div>
                </header>

                <div className="p-8 flex-1">

                    {/* Stats strip */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Total Produk", value: products.length, color: "text-blue-400" },
                            { label: "Kategori Aktif", value: CATEGORIES.length, color: "text-emerald-400" },
                            { label: "Disembunyikan", value: deletedIds.length, color: "text-amber-400" },
                            { label: "Produk Baru (Hari ini)", value: 0, color: "text-purple-400" },
                        ].map(stat => (
                            <div key={stat.label} className="bg-gray-900 border border-white/5 rounded-xl p-4">
                                <p className="text-xs text-white/30 mb-2">{stat.label}</p>
                                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                placeholder="Cari nama atau slug produk..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                            />
                        </div>

                        {/* Category tabs */}
                        <div className="flex gap-1 bg-gray-900 border border-white/10 rounded-lg p-1">
                            {["all", ...CATEGORIES].map(cat => (
                                <button key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filterCategory === cat
                                        ? "bg-white text-gray-900"
                                        : "text-white/40 hover:text-white"}`}>
                                    {cat === "all" ? "Semua" : cat}
                                </button>
                            ))}
                        </div>

                        {/* View toggle */}
                        <div className="flex bg-gray-900 border border-white/10 rounded-lg p-1">
                            <button onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white text-gray-900" : "text-white/40 hover:text-white"}`}>
                                <Grid size={15} />
                            </button>
                            <button onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white text-gray-900" : "text-white/40 hover:text-white"}`}>
                                <List size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Alert: hidden products */}
                    {deletedIds.length > 0 && (
                        <div className="mb-4 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-400 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {deletedIds.length} produk sedang disembunyikan dari website. Klik ikon 👁 pada kartu untuk memulihkan.
                        </div>
                    )}

                    {/* ── GRID VIEW ── */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {/* Add new card */}
                            <motion.button
                                onClick={() => { setEditingProduct(null); setIsCreating(true); setView("form") }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="border-2 border-dashed border-white/10 hover:border-white/30 rounded-xl flex flex-col items-center justify-center gap-3 p-8 min-h-[280px] transition-colors group">
                                <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                                    <Plus size={22} className="text-white/40" />
                                </div>
                                <span className="text-sm text-white/30 group-hover:text-white/60 font-medium transition-colors">
                                    Tambah Produk
                                </span>
                            </motion.button>

                            {filteredProducts.map(product => (
                                <ProductGridCard
                                    key={product.id}
                                    product={product}
                                    onEdit={() => { setEditingProduct(product); setIsCreating(false); setView("form") }}
                                    onDelete={() => setDeleteConfirm(product.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        /* ── LIST VIEW ── */
                        <div className="bg-gray-900 border border-white/5 rounded-xl overflow-hidden">
                            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/5 text-xs font-medium uppercase tracking-wider text-white/30">
                                <div className="col-span-1">Foto</div>
                                <div className="col-span-4">Nama Produk</div>
                                <div className="col-span-2">Kategori</div>
                                <div className="col-span-2">Ukuran</div>
                                <div className="col-span-2 text-right">Harga</div>
                                <div className="col-span-1 text-center">Aksi</div>
                            </div>
                            {filteredProducts.map(product => (
                                <div key={product.id}
                                    className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center border-b border-white/5 hover:bg-white/2.5 transition-colors last:border-0">
                                    <div className="col-span-1">
                                        <div className="relative w-10 h-12 rounded-md overflow-hidden bg-gray-800">
                                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <p className="text-sm font-medium text-white truncate">{product.name}</p>
                                        <p className="text-xs text-white/30 font-mono">{product.slug}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs px-2.5 py-1 bg-white/5 text-white/50 rounded-full">{product.category}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-white/40">{product.sizes.join(", ")}</p>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <p className="text-sm font-semibold text-white">Rp {product.price.toLocaleString("id-ID")}</p>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center gap-1">
                                        <button onClick={() => { setEditingProduct(product); setIsCreating(false); setView("form") }}
                                            className="p-1.5 text-white/30 hover:text-blue-400 rounded-md hover:bg-blue-500/10 transition-colors">
                                            <Edit2 size={14} />
                                        </button>
                                        <button onClick={() => setDeleteConfirm(product.id)}
                                            className="p-1.5 text-white/30 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Delete confirm modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <Trash2 size={18} className="text-red-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Sembunyikan Produk?</h3>
                                    <p className="text-xs text-white/40">Produk tidak akan tampil di website</p>
                                </div>
                            </div>
                            <p className="text-sm text-white/50 mb-6">
                                Produk ini akan disembunyikan dari website. Anda bisa memulihkannya kapan saja dari dashboard.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 h-10 bg-white/5 border border-white/10 text-sm text-white/60 rounded-lg hover:bg-white/10 transition-colors">
                                    Batal
                                </button>
                                <button onClick={() => { deleteProduct(deleteConfirm); setDeleteConfirm(null) }}
                                    className="flex-1 h-10 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors">
                                    Sembunyikan
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── GRID CARD ─────────────────────────────────────────────
function ProductGridCard({ product, onEdit, onDelete }: {
    product: Product
    onEdit: () => void
    onDelete: () => void
}) {
    return (
        <motion.div layout className="bg-gray-900 border border-white/5 hover:border-white/15 rounded-xl group relative overflow-hidden transition-colors">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button onClick={onEdit}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                        <Edit2 size={16} className="text-gray-800" />
                    </button>
                    <button onClick={onDelete}
                        className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                        <Trash2 size={16} className="text-white" />
                    </button>
                </div>
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-wider rounded-full">
                    {product.category}
                </span>
            </div>
            <div className="p-4">
                <p className="font-medium text-sm text-white leading-tight line-clamp-1">{product.name}</p>
                <p className="text-xs text-white/30 font-mono mt-0.5 truncate">{product.slug}</p>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1">
                        {product.sizes.slice(0, 3).map(s => (
                            <span key={s} className="text-[10px] px-1.5 py-0.5 bg-white/5 text-white/40 rounded">{s}</span>
                        ))}
                        {product.sizes.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-white/5 text-white/30 rounded">+{product.sizes.length - 3}</span>
                        )}
                    </div>
                    <p className="text-sm font-bold text-white">Rp {(product.price / 1000).toFixed(0)}k</p>
                </div>
            </div>
        </motion.div>
    )
}

// ─── PRODUCT FORM ──────────────────────────────────────────
function ProductFormView({ product, isCreating, onSave, onCancel, savedFeedback }: {
    product: Product | null
    isCreating: boolean
    onSave: (data: Product) => void
    onCancel: () => void
    savedFeedback: boolean
}) {
    const [form, setForm] = useState<Product>(() => {
        if (product) return { ...product }
        return { id: `prod-${Date.now()}`, ...blankProduct() }
    })
    const [activeTab, setActiveTab] = useState<"basic" | "detail" | "variants">("basic")
    const [autoSlug, setAutoSlug] = useState(isCreating)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)
        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData })
            const data = await res.json()
            if (data.success) { update("image", data.url); update("hoverImage", data.url) }
            else alert("Gagal mengupload gambar")
        } catch { alert("Terjadi kesalahan saat upload") }
        finally {
            setIsUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""
        }
    }

    const update = (field: keyof Product, value: unknown) => {
        setForm(prev => {
            const next = { ...prev, [field]: value }
            if (field === "name" && autoSlug) next.slug = slugify(value as string)
            return next
        })
    }

    const updateArrayItem = (field: "care" | "features" | "sustainability", idx: number, value: string) => {
        const arr = [...(form[field] as string[])]
        arr[idx] = value
        update(field, arr)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.slug || form.price <= 0) { alert("Nama, slug, dan harga wajib diisi."); return }
        onSave(form)
    }

    const TABS = [
        { id: "basic" as const, label: "Info Dasar", icon: <Tag size={14} /> },
        { id: "detail" as const, label: "Detail & Perawatan", icon: <Info size={14} /> },
        { id: "variants" as const, label: "Ukuran & Warna", icon: <Layers size={14} /> },
    ]

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar (simpel) */}
            <aside className="w-64 bg-gray-900 border-r border-white/5 flex flex-col fixed h-full z-20">
                <div className="px-6 py-6 border-b border-white/5">
                    <p className="font-serif text-xl text-white">Julia Owers</p>
                    <p className="text-xs text-white/30 mt-0.5 uppercase tracking-widest">Admin Panel</p>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                        <ShoppingBag size={16} /> Manajemen Pesanan
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white bg-white/10 font-medium">
                        <Package size={16} /> CMS Produk
                    </div>
                </nav>
                <div className="px-3 py-4 border-t border-white/5">
                    <button onClick={onCancel} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <ArrowLeft size={16} /> Kembali ke Daftar
                    </button>
                </div>
            </aside>

            <main className="ml-64 flex-1 flex flex-col">
                {/* Top bar */}
                <header className="bg-gray-900/80 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-lg font-semibold text-white">
                            {isCreating ? "✨ Tambah Produk Baru" : `✏️ Edit: ${product?.name}`}
                        </h1>
                        <p className="text-xs text-white/30 font-mono mt-0.5">/id/shop/{form.slug || "slug-belum-diisi"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={onCancel}
                            className="px-4 py-2 border border-white/10 text-sm text-white/50 rounded-lg hover:border-white/30 hover:text-white transition-colors">
                            Batal
                        </button>
                        <motion.button
                            onClick={handleSubmit}
                            animate={savedFeedback ? { backgroundColor: "#059669" } : { backgroundColor: "#ffffff" }}
                            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg text-gray-900 transition-colors">
                            <Save size={15} />
                            {savedFeedback ? "✓ Tersimpan!" : "Simpan Produk"}
                        </motion.button>
                    </div>
                </header>

                <div className="p-8">
                    <div className="grid grid-cols-12 gap-8 max-w-6xl">

                        {/* Left: Form */}
                        <div className="col-span-8">
                            {/* Tabs */}
                            <div className="flex gap-1 bg-gray-900 border border-white/5 rounded-xl p-1 mb-6 w-fit">
                                {TABS.map(tab => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                                            ? "bg-white text-gray-900"
                                            : "text-white/40 hover:text-white"}`}>
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* TAB 1: Info Dasar */}
                            {activeTab === "basic" && (
                                <div className="space-y-4">
                                    <div className="bg-gray-900 border border-white/5 rounded-xl p-6 space-y-5">
                                        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Informasi Produk</h3>

                                        <FormField label="Nama Produk *">
                                            <input value={form.name} onChange={e => update("name", e.target.value)}
                                                placeholder="Cth: The Minimalist Midi Dress"
                                                className={inputCls} />
                                        </FormField>

                                        <FormField label="Slug URL *" hint="otomatis dari nama — bisa diedit manual">
                                            <div className="flex gap-2">
                                                <input value={form.slug}
                                                    onChange={e => { setAutoSlug(false); update("slug", e.target.value) }}
                                                    placeholder="minimalist-midi-dress"
                                                    className={`${inputCls} flex-1 font-mono text-xs`} />
                                                <button type="button"
                                                    onClick={() => { setAutoSlug(true); update("slug", slugify(form.name)) }}
                                                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white hover:border-white/20 transition-colors">
                                                    <RefreshCw size={13} />
                                                </button>
                                            </div>
                                        </FormField>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField label="Harga (Rp) *">
                                                <input type="number" value={form.price || ""}
                                                    onChange={e => update("price", Number(e.target.value))}
                                                    placeholder="262000" className={inputCls} />
                                            </FormField>
                                            <FormField label="Sub-Kategori">
                                                <select value={form.subCategory}
                                                    onChange={e => update("subCategory", e.target.value)}
                                                    className={selectCls}>
                                                    {SUB_CATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </FormField>
                                        </div>

                                        <FormField label="Kategori *">
                                            <div className="flex gap-2 flex-wrap">
                                                {CATEGORIES.map(cat => (
                                                    <button key={cat} type="button" onClick={() => update("category", cat)}
                                                        className={`px-4 py-2 text-sm rounded-lg border transition-colors ${form.category === cat
                                                            ? "bg-white text-gray-900 border-white font-medium"
                                                            : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"}`}>
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </FormField>

                                        <FormField label="Deskripsi Produk">
                                            <textarea value={form.description}
                                                onChange={e => update("description", e.target.value)}
                                                rows={4} placeholder="Deskripsi singkat produk yang menarik..."
                                                className={`${inputCls} resize-none`} />
                                        </FormField>

                                        <FormField label="Material">
                                            <input value={form.material}
                                                onChange={e => update("material", e.target.value)}
                                                placeholder="100% Pure European Linen (200 GSM)"
                                                className={inputCls} />
                                        </FormField>
                                    </div>

                                    {/* Foto Produk */}
                                    <div className="bg-gray-900 border border-white/5 rounded-xl p-6">
                                        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <ImageIcon size={14} /> Foto Produk
                                        </h3>
                                        <p className="text-xs text-white/30 mb-4">Pilih foto bawaan atau upload foto baru dari komputer Anda</p>
                                        <div className="grid grid-cols-4 gap-3 mb-4">
                                            {["/images/product-1.png", "/images/product-2.png", "/images/product-3.png", "/images/product-4.png"].map(img => (
                                                <button key={img} type="button"
                                                    onClick={() => { update("image", img); update("hoverImage", img) }}
                                                    className={`relative aspect-[3/4] rounded-lg border-2 overflow-hidden transition-all ${form.image === img
                                                        ? "border-white ring-2 ring-white/20"
                                                        : "border-white/10 hover:border-white/30"}`}>
                                                    <Image src={img} alt="product" fill className="object-cover" />
                                                    {form.image === img && (
                                                        <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                    <path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Upload custom */}
                                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                                        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}
                                            className="w-full py-3 border-2 border-dashed border-white/10 rounded-lg text-sm text-white/40 hover:border-white/30 hover:text-white/70 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                            {isUploading ? "Mengupload foto..." : "Upload Foto Kustom dari Komputer"}
                                        </button>

                                        {/* Show uploaded image if it's not a preset */}
                                        {form.image && !form.image.startsWith("/images/product-") && (
                                            <div className="mt-3 flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                                <div className="relative w-10 h-12 rounded overflow-hidden shrink-0">
                                                    <Image src={form.image} alt="uploaded" fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-emerald-400 font-medium">✓ Foto kustom aktif</p>
                                                    <p className="text-[10px] text-emerald-400/60 font-mono truncate max-w-[200px]">{form.image}</p>
                                                </div>
                                                <button type="button" onClick={() => update("image", "/images/product-1.png")}
                                                    className="ml-auto text-white/30 hover:text-white/60">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: Detail */}
                            {activeTab === "detail" && (
                                <div className="space-y-4">
                                    {[
                                        { field: "care" as const, label: "Cara Perawatan", icon: <Star size={14} />, placeholder: "Cth: Machine wash cold" },
                                        { field: "features" as const, label: "Fitur Produk", icon: <Tag size={14} />, placeholder: "Cth: Hidden side pockets" },
                                        { field: "sustainability" as const, label: "Sustainability", icon: <Leaf size={14} />, placeholder: "Cth: Made locally in Bandung" },
                                    ].map(({ field, label, icon, placeholder }) => (
                                        <div key={field} className="bg-gray-900 border border-white/5 rounded-xl p-6">
                                            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                {icon} {label}
                                            </h3>
                                            <div className="space-y-2">
                                                {(form[field] as string[]).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input value={item}
                                                            onChange={e => updateArrayItem(field, idx, e.target.value)}
                                                            placeholder={placeholder}
                                                            className={`${inputCls} flex-1`} />
                                                        <button type="button"
                                                            onClick={() => {
                                                                const arr = (form[field] as string[]).filter((_, i) => i !== idx)
                                                                update(field, arr)
                                                            }}
                                                            className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button"
                                                    onClick={() => update(field, [...(form[field] as string[]), ""])}
                                                    className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors mt-1">
                                                    <Plus size={12} /> Tambah {label}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* TAB 3: Variants */}
                            {activeTab === "variants" && (
                                <div className="space-y-4">
                                    <div className="bg-gray-900 border border-white/5 rounded-xl p-6">
                                        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Layers size={14} /> Ukuran Tersedia
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {SIZE_OPTIONS.map(size => (
                                                <button key={size} type="button"
                                                    onClick={() => {
                                                        const sizes = form.sizes.includes(size)
                                                            ? form.sizes.filter(s => s !== size)
                                                            : [...form.sizes, size]
                                                        update("sizes", sizes)
                                                    }}
                                                    className={`min-w-[52px] h-11 px-3 rounded-lg border text-sm font-medium transition-colors ${form.sizes.includes(size)
                                                        ? "bg-white text-gray-900 border-white"
                                                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"}`}>
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-white/30">
                                            Dipilih: <strong className="text-white/50">{form.sizes.join(", ") || "—"}</strong>
                                        </p>
                                    </div>

                                    <div className="bg-gray-900 border border-white/5 rounded-xl p-6">
                                        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Pilihan Warna</h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {COLOR_PRESETS.map(color => (
                                                <button key={color} type="button"
                                                    onClick={() => {
                                                        const colors = form.colors.includes(color)
                                                            ? form.colors.filter(c => c !== color)
                                                            : [...form.colors, color]
                                                        update("colors", colors)
                                                    }}
                                                    className={`px-3 py-2 text-xs rounded-lg border transition-colors ${form.colors.includes(color)
                                                        ? "bg-white text-gray-900 border-white font-medium"
                                                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"}`}>
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-white/30">
                                            Dipilih: <strong className="text-white/50">{form.colors.join(", ") || "—"}</strong>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Live Preview */}
                        <div className="col-span-4">
                            <div className="sticky top-28">
                                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">👁 Live Preview</p>

                                {/* Card preview */}
                                <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden mb-4">
                                    <div className="relative aspect-[3/4] bg-gray-800">
                                        <Image src={form.image || "/images/product-1.png"} alt="preview" fill className="object-cover" />
                                        <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-wider rounded-full">
                                            {form.category}
                                        </span>
                                    </div>
                                    <div className="p-4 space-y-1">
                                        <p className="font-serif text-base text-white leading-tight">
                                            {form.name || <span className="text-white/20">Nama Produk</span>}
                                        </p>
                                        <div className="flex justify-between items-baseline">
                                            <p className="text-xs text-white/30 uppercase tracking-wider">{form.subCategory}</p>
                                            <p className="text-sm font-bold text-white">
                                                {form.price > 0 ? `Rp ${form.price.toLocaleString("id-ID")}` : "Rp —"}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-1 pt-2">
                                            {form.sizes.map(s => (
                                                <span key={s} className="text-[10px] px-1.5 py-0.5 bg-white/5 text-white/30 rounded">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* URL */}
                                <div className="p-3 bg-gray-900 border border-white/5 rounded-lg">
                                    <p className="text-[10px] text-white/30 mb-1 uppercase tracking-wider">URL Produk</p>
                                    <p className="text-xs text-white/50 font-mono break-all">
                                        localhost:3000/id/shop/<span className="text-white/70">{form.slug || "..."}</span>
                                    </p>
                                </div>

                                {/* Validation status */}
                                <div className="mt-3 p-3 bg-gray-900 border border-white/5 rounded-lg space-y-1.5">
                                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Status Validasi</p>
                                    {[
                                        { label: "Nama produk", ok: form.name.length > 0 },
                                        { label: "Slug URL", ok: form.slug.length > 0 },
                                        { label: "Harga diisi", ok: form.price > 0 },
                                        { label: "Ukuran dipilih", ok: form.sizes.length > 0 },
                                        { label: "Foto tersedia", ok: !!form.image },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-center gap-2">
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${item.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/20"}`}>
                                                {item.ok ? "✓" : "○"}
                                            </span>
                                            <span className={`text-xs ${item.ok ? "text-white/50" : "text-white/20"}`}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

// ─── HELPERS ───────────────────────────────────────────────
const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
const selectCls = "w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                {label}
                {hint && <span className="ml-2 normal-case font-normal text-white/20">— {hint}</span>}
            </label>
            {children}
        </div>
    )
}
