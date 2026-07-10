"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
    Plus, Edit2, Trash2, Search, Package, Eye, EyeOff,
    ArrowLeft, Save, X, Upload, AlertCircle, ChevronDown,
    RefreshCw, RotateCcw, ImageIcon, Tag, DollarSign,
    Layers, Info, Star, Leaf, Grid, List
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

// ─── BLANK PRODUCT TEMPLATE ───────────────────────────────
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

// ─── HELPER ────────────────────────────────────────────────
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

    // ── Auth ──────────────────────────────────────────────
    useEffect(() => {
        const auth = sessionStorage.getItem("jo_admin_auth")
        if (auth === "true") setIsAuthenticated(true)
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("jo_admin_auth", "true")
            setIsAuthenticated(true)
        } else setAuthError("Password salah.")
    }

    // ── Filter & Search ───────────────────────────────────
    const filteredProducts = products.filter(p => {
        const matchCat = filterCategory === "all" || p.category === filterCategory
        const q = searchQuery.toLowerCase()
        const matchSearch = !q || p.name.toLowerCase().includes(q) || p.slug.includes(q)
        return matchCat && matchSearch
    })

    const handleNewProduct = () => {
        setEditingProduct(null)
        setIsCreating(true)
        setView("form")
    }

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product)
        setIsCreating(false)
        setView("form")
    }

    const handleSaveProduct = (data: Product) => {
        if (isCreating) {
            addProduct(data)
        } else {
            updateProduct(data.id, data)
        }
        setSavedFeedback(true)
        setTimeout(() => {
            setSavedFeedback(false)
            setView("list")
        }, 1200)
    }

    const handleDeleteProduct = (id: string) => {
        deleteProduct(id)
        setDeleteConfirm(null)
    }

    // ─────────────────────────────────────────────────────
    // LOGIN PAGE
    // ─────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-sm p-8">
                    <div className="text-center mb-8">
                        <h1 className="font-serif text-2xl text-gray-900 mb-1">Julia Owers</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Admin — CMS Produk</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="password" value={password}
                            onChange={e => { setPassword(e.target.value); setAuthError("") }}
                            placeholder="Password admin"
                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-900"
                            autoFocus />
                        {authError && <p className="text-xs text-red-500">{authError}</p>}
                        <button type="submit" className="w-full h-12 bg-gray-900 text-white font-medium uppercase tracking-widest text-sm">
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // ─────────────────────────────────────────────────────
    // FORM VIEW
    // ─────────────────────────────────────────────────────
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

    // ─────────────────────────────────────────────────────
    // LIST VIEW
    // ─────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-xl text-gray-900">CMS Produk</h1>
                        <p className="text-xs text-gray-400">{products.length} produk total</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {deletedIds.length > 0 && (
                        <button onClick={resetToDefault}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-400 border border-red-200 hover:bg-red-50 transition-colors">
                            <RotateCcw size={12} />
                            Reset ke Default
                        </button>
                    )}
                    <button
                        onClick={handleNewProduct}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                        <Plus size={16} />
                        Produk Baru
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Cari nama atau slug produk..."
                            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gray-400" />
                    </div>
                    <div className="flex gap-2">
                        {/* Category filter */}
                        <div className="flex gap-1 flex-wrap">
                            {["all", ...CATEGORIES].map(cat => (
                                <button key={cat} onClick={() => setFilterCategory(cat)}
                                    className={`px-3 py-2 text-xs font-medium uppercase tracking-wider border transition-colors ${filterCategory === cat
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                                    {cat === "all" ? "Semua" : cat}
                                </button>
                            ))}
                        </div>
                        {/* View mode toggle */}
                        <div className="flex border border-gray-200">
                            <button onClick={() => setViewMode("grid")}
                                className={`p-2 ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-700"}`}>
                                <Grid size={16} />
                            </button>
                            <button onClick={() => setViewMode("list")}
                                className={`p-2 ${viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-700"}`}>
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notification bar for deleted */}
                {deletedIds.length > 0 && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-xs text-amber-700 flex items-center gap-2">
                        <AlertCircle size={14} />
                        {deletedIds.length} produk disembunyikan. Klik ikon mata untuk memulihkan.
                    </div>
                )}

                {/* GRID VIEW */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* Add new card */}
                        <motion.button
                            onClick={handleNewProduct}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="border-2 border-dashed border-gray-200 hover:border-gray-400 flex flex-col items-center justify-center gap-3 p-8 min-h-[280px] transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <Plus size={24} className="text-gray-400" />
                            </div>
                            <span className="text-sm text-gray-400 font-medium">Tambah Produk Baru</span>
                        </motion.button>

                        {filteredProducts.map(product => (
                            <ProductGridCard
                                key={product.id}
                                product={product}
                                onEdit={() => handleEditProduct(product)}
                                onDelete={() => setDeleteConfirm(product.id)}
                            />
                        ))}

                        {/* Deleted products (greyed out) */}
                        {deletedIds.map(id => {
                            const p = products.find(pr => pr.id === id)
                            if (!p) return null
                            return (
                                <div key={id} className="relative opacity-40 border border-dashed border-gray-300">
                                    <div className="absolute inset-0 bg-gray-100/50 z-10 flex items-center justify-center">
                                        <button onClick={() => restoreProduct(id)}
                                            className="bg-white border border-gray-300 px-3 py-1.5 text-xs font-medium flex items-center gap-1 hover:bg-gray-50">
                                            <Eye size={12} /> Pulihkan
                                        </button>
                                    </div>
                                    <Image src={p.image} alt={p.name} width={200} height={260}
                                        className="w-full aspect-[3/4] object-cover" />
                                    <div className="p-3">
                                        <p className="text-sm font-medium truncate line-through">{p.name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    /* LIST VIEW */
                    <div className="bg-white border border-gray-100">
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-gray-500">
                            <div className="col-span-1">Foto</div>
                            <div className="col-span-4">Nama</div>
                            <div className="col-span-2">Kategori</div>
                            <div className="col-span-2">Ukuran</div>
                            <div className="col-span-2 text-right">Harga</div>
                            <div className="col-span-1 text-center">Aksi</div>
                        </div>
                        {filteredProducts.map(product => (
                            <div key={product.id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <div className="col-span-1">
                                    <div className="relative w-10 h-12 bg-gray-100">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                    <p className="text-xs text-gray-400 font-mono">{product.slug}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600">{product.category}</span>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-gray-500">{product.sizes.join(", ")}</p>
                                </div>
                                <div className="col-span-2 text-right">
                                    <p className="text-sm font-semibold text-gray-900">Rp {product.price.toLocaleString("id-ID")}</p>
                                </div>
                                <div className="col-span-1 flex items-center justify-center gap-1">
                                    <button onClick={() => handleEditProduct(product)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 size={14} /></button>
                                    <button onClick={() => setDeleteConfirm(product.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete confirm modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="bg-white p-6 max-w-sm w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                    <Trash2 size={18} className="text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Sembunyikan Produk?</h3>
                                    <p className="text-xs text-gray-500">Produk tidak akan tampil di website</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-6">
                                Produk ini akan disembunyikan dari website. Anda bisa memulihkannya kapan saja.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 h-10 border border-gray-200 text-sm text-gray-600 hover:border-gray-400">
                                    Batal
                                </button>
                                <button onClick={() => handleDeleteProduct(deleteConfirm)}
                                    className="flex-1 h-10 bg-red-500 text-white text-sm font-medium hover:bg-red-600">
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
        <motion.div layout className="bg-white group relative border border-gray-100 hover:border-gray-300 transition-colors overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button onClick={onEdit}
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                        <Edit2 size={15} className="text-gray-700" />
                    </button>
                    <button onClick={onDelete}
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={15} className="text-red-500" />
                    </button>
                </div>
            </div>
            {/* Info */}
            <div className="p-3">
                <p className="font-medium text-sm text-gray-900 leading-tight line-clamp-1">{product.name}</p>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{product.category} · {product.sizes.join("/")} </span>
                    <span className="text-sm font-semibold text-gray-900">Rp {(product.price / 1000).toFixed(0)}k</span>
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
        return {
            id: `prod-${Date.now()}`,
            ...blankProduct()
        }
    })
    const [activeTab, setActiveTab] = useState<"basic" | "detail" | "variants">("basic")
    const [autoSlug, setAutoSlug] = useState(isCreating)

    const update = (field: keyof Product, value: unknown) => {
        setForm(prev => {
            const next = { ...prev, [field]: value }
            if (field === "name" && autoSlug) {
                next.slug = slugify(value as string)
            }
            return next
        })
    }

    const updateArrayItem = (field: "care" | "features" | "sustainability", idx: number, value: string) => {
        const arr = [...(form[field] as string[])]
        arr[idx] = value
        update(field, arr)
    }

    const addArrayItem = (field: "care" | "features" | "sustainability") => {
        update(field, [...(form[field] as string[]), ""])
    }

    const removeArrayItem = (field: "care" | "features" | "sustainability", idx: number) => {
        const arr = (form[field] as string[]).filter((_, i) => i !== idx)
        update(field, arr)
    }

    const toggleSize = (size: string) => {
        const sizes = form.sizes.includes(size)
            ? form.sizes.filter(s => s !== size)
            : [...form.sizes, size]
        update("sizes", sizes)
    }

    const toggleColor = (color: string) => {
        const colors = form.colors.includes(color)
            ? form.colors.filter(c => c !== color)
            : [...form.colors, color]
        update("colors", colors)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.slug || form.price <= 0) {
            alert("Nama, slug, dan harga wajib diisi.")
            return
        }
        onSave(form)
    }

    const TABS = [
        { id: "basic", label: "Info Dasar", icon: <Tag size={14} /> },
        { id: "detail", label: "Detail & Perawatan", icon: <Info size={14} /> },
        { id: "variants", label: "Ukuran & Warna", icon: <Layers size={14} /> },
    ] as const

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="font-serif text-xl text-gray-900">
                            {isCreating ? "Tambah Produk Baru" : `Edit: ${product?.name}`}
                        </h1>
                        <p className="text-xs text-gray-400 font-mono">{form.slug || "slug-belum-diisi"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onCancel}
                        className="px-4 py-2 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition-colors">
                        Batal
                    </button>
                    <motion.button
                        onClick={handleSubmit}
                        animate={savedFeedback ? { backgroundColor: "#059669" } : { backgroundColor: "#111827" }}
                        className="flex items-center gap-2 px-5 py-2 text-white text-sm font-medium transition-colors"
                    >
                        <Save size={15} />
                        {savedFeedback ? "Tersimpan!" : "Simpan Produk"}
                    </motion.button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ── Left: Tabs & Form ── */}
                    <div className="lg:col-span-8">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-6">
                            {TABS.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab.id
                                        ? "border-gray-900 text-gray-900"
                                        : "border-transparent text-gray-400 hover:text-gray-700"}`}>
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* ── TAB 1: Info Dasar ── */}
                        {activeTab === "basic" && (
                            <div className="space-y-5">
                                <div className="bg-white p-6 space-y-5">
                                    <Field label="Nama Produk *">
                                        <input value={form.name} onChange={e => update("name", e.target.value)}
                                            placeholder="Cth: The Minimalist Midi Dress"
                                            className={inputCls} />
                                    </Field>

                                    <Field label="Slug URL *" hint="Otomatis dari nama — bisa diedit manual">
                                        <div className="flex gap-2">
                                            <input value={form.slug} onChange={e => { setAutoSlug(false); update("slug", e.target.value) }}
                                                placeholder="minimalist-midi-dress-ivory"
                                                className={`${inputCls} flex-1 font-mono text-sm`} />
                                            <button onClick={() => { setAutoSlug(true); update("slug", slugify(form.name)) }}
                                                className="px-3 py-2 border border-gray-200 text-xs text-gray-500 hover:border-gray-400 transition-colors whitespace-nowrap">
                                                <RefreshCw size={12} />
                                            </button>
                                        </div>
                                    </Field>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Harga (Rp) *">
                                            <input type="number" value={form.price || ""} onChange={e => update("price", Number(e.target.value))}
                                                placeholder="262000"
                                                className={inputCls} />
                                        </Field>
                                        <Field label="Kode Sub-Kategori">
                                            <select value={form.subCategory} onChange={e => update("subCategory", e.target.value)} className={selectCls}>
                                                {SUB_CATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </Field>
                                    </div>

                                    <Field label="Kategori *">
                                        <div className="flex gap-2">
                                            {CATEGORIES.map(cat => (
                                                <button key={cat} type="button"
                                                    onClick={() => update("category", cat)}
                                                    className={`px-4 py-2 text-sm border transition-colors ${form.category === cat
                                                        ? "bg-gray-900 text-white border-gray-900"
                                                        : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </Field>

                                    <Field label="Deskripsi Produk">
                                        <textarea value={form.description} onChange={e => update("description", e.target.value)}
                                            rows={4} placeholder="Deskripsi singkat produk yang menarik..."
                                            className={`${inputCls} resize-none`} />
                                    </Field>

                                    <Field label="Material">
                                        <input value={form.material} onChange={e => update("material", e.target.value)}
                                            placeholder="100% Pure European Linen (200 GSM)"
                                            className={inputCls} />
                                    </Field>
                                </div>

                                {/* Image */}
                                <div className="bg-white p-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                                        <ImageIcon size={15} />
                                        Foto Produk
                                    </h3>
                                    <div className="grid grid-cols-4 gap-3 mb-4">
                                        {["/images/product-1.png", "/images/product-2.png", "/images/product-3.png", "/images/product-4.png"].map(img => (
                                            <button key={img} type="button" onClick={() => { update("image", img); update("hoverImage", img) }}
                                                className={`relative aspect-[3/4] border-2 overflow-hidden transition-colors ${form.image === img ? "border-gray-900" : "border-transparent hover:border-gray-400"}`}>
                                                <Image src={img} alt="product" fill className="object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                        <Upload size={11} />
                                        Upload foto kustom: fitur ini memerlukan koneksi ke server (tersedia setelah setup database oleh tim IT)
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── TAB 2: Detail ── */}
                        {activeTab === "detail" && (
                            <div className="space-y-5">
                                {[
                                    { field: "care" as const, label: "Cara Perawatan", icon: <Star size={14} />, placeholder: "Cth: Machine wash cold" },
                                    { field: "features" as const, label: "Fitur Produk", icon: <Tag size={14} />, placeholder: "Cth: Hidden side pockets" },
                                    { field: "sustainability" as const, label: "Sustainability", icon: <Leaf size={14} />, placeholder: "Cth: Made locally in Bandung" },
                                ].map(({ field, label, icon, placeholder }) => (
                                    <div key={field} className="bg-white p-6">
                                        <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                                            {icon}
                                            {label}
                                        </h3>
                                        <div className="space-y-2">
                                            {(form[field] as string[]).map((item, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <input value={item}
                                                        onChange={e => updateArrayItem(field, idx, e.target.value)}
                                                        placeholder={placeholder}
                                                        className={`${inputCls} flex-1`} />
                                                    <button type="button" onClick={() => removeArrayItem(field, idx)}
                                                        className="p-2 text-gray-300 hover:text-red-400 transition-colors">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addArrayItem(field)}
                                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors mt-1">
                                                <Plus size={12} />
                                                Tambah {label}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── TAB 3: Variants ── */}
                        {activeTab === "variants" && (
                            <div className="space-y-5">
                                {/* Sizes */}
                                <div className="bg-white p-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                                        <Layers size={14} />
                                        Ukuran Tersedia
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {SIZE_OPTIONS.map(size => (
                                            <button key={size} type="button" onClick={() => toggleSize(size)}
                                                className={`min-w-[48px] h-10 px-3 border text-sm font-medium transition-colors ${form.sizes.includes(size)
                                                    ? "bg-gray-900 text-white border-gray-900"
                                                    : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3">
                                        Dipilih: <strong>{form.sizes.join(", ") || "—"}</strong>
                                    </p>
                                </div>

                                {/* Colors */}
                                <div className="bg-white p-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4">Pilihan Warna</h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {COLOR_PRESETS.map(color => (
                                            <button key={color} type="button" onClick={() => toggleColor(color)}
                                                className={`px-3 py-1.5 text-xs border transition-colors ${form.colors.includes(color)
                                                    ? "bg-gray-900 text-white border-gray-900"
                                                    : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Dipilih: <strong>{form.colors.join(", ") || "—"}</strong>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Right: Preview ── */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">Preview</p>
                            <div className="bg-white border border-gray-100 overflow-hidden">
                                <div className="relative aspect-[3/4] bg-gray-100">
                                    <Image src={form.image || "/images/product-1.png"} alt={form.name || "Preview"} fill className="object-cover" />
                                </div>
                                <div className="p-4 space-y-1">
                                    <p className="font-serif text-base text-gray-900 leading-tight">
                                        {form.name || <span className="text-gray-300">Nama Produk</span>}
                                    </p>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">{form.category}</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {form.price > 0 ? `Rp ${form.price.toLocaleString("id-ID")}` : "Rp —"}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-1 pt-2">
                                        {form.sizes.map(s => (
                                            <span key={s} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* URL Preview */}
                            <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-500 font-mono break-all">
                                /id/shop/{form.slug || "..."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── HELPERS ───────────────────────────────────────────────
const inputCls = "w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
const selectCls = "w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900 transition-colors appearance-none bg-white"

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs font-medium uppercase tracking-widest text-gray-500 mb-2">
                {label}
                {hint && <span className="ml-2 normal-case font-normal text-gray-400">— {hint}</span>}
            </label>
            {children}
        </div>
    )
}
