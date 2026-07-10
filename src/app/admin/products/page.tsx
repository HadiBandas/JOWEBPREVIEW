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
    ShoppingBag, Settings, LogOut, RotateCcw, Home, Check
} from "lucide-react"
import { useProductStore } from "@/store/product-store"
import { Product } from "@/lib/types"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

const ADMIN_PASSWORD = "juliaowers2026"
const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Outerwear"]
const SUB_CATEGORIES = ["TRD", "KULOT", "BLW S/S", "BLW L/S", "ROD", "JKT", "VES", "KRG"]
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]
const COLOR_PRESETS = [
    "Ivory", "Oatmeal", "Cream", "White", "Black", "Navy", "Sage Green",
    "Dusty Blue", "Terracotta", "Olive", "Sand", "Charcoal", "Light Blue", "Blush", "Chocolate"
]
const PRESET_IMAGES = [
    "/images/products/1.jpg",
    "/images/products/2.jpg",
    "/images/products/3.jpg",
    "/images/products/4.jpg",
]

const blankProduct = (): Omit<Product, "id"> => ({
    name: "", slug: "", price: 0, currency: "IDR",
    category: "Tops", subCategory: "BLW S/S",
    image: "/images/products/1.jpg", hoverImage: "/images/products/1.jpg",
    description: "", material: "100% Pure European Linen",
    care: ["Machine wash cold"], features: [""], sustainability: ["Made locally in Bandung"],
    sizes: ["S", "M", "L"], colors: ["Ivory"],
})

function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
}

/* ─────────── MAIN PAGE ─────────── */
export default function AdminProductsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")
    const [view, setView] = useState<"list" | "form">("list")
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [savedFeedback, setSavedFeedback] = useState(false)

    const { getAllProducts, deleteProduct, restoreProduct, deletedIds, resetToDefault, addProduct, updateProduct } = useProductStore()
    const products = getAllProducts()

    useEffect(() => {
        if (sessionStorage.getItem("jo_admin_auth") === "true") setIsAuthenticated(true)
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
        return matchCat && (!q || p.name.toLowerCase().includes(q) || p.slug.includes(q))
    })

    const handleSaveProduct = (data: Product) => {
        isCreating ? addProduct(data) : updateProduct(data.id, data)
        setSavedFeedback(true)
        setTimeout(() => { setSavedFeedback(false); setView("list") }, 1200)
    }

    /* ── LOGIN ── */
    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: "100vh", background: "#fcfcfc", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                <div style={{ width: "100%", maxWidth: "380px" }}>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "16px", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                            <Package size={26} color="#1a1a1a" />
                        </div>
                        <h1 style={{ fontFamily: "serif", fontSize: "28px", color: "#1a1a1a", marginBottom: "6px" }}>Julia Owers</h1>
                        <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Admin — CMS Produk</p>
                    </div>
                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "16px", padding: "32px", boxShadow: "0 8px 30px rgba(0,0,0,0.02)" }}>
                        <form onSubmit={handleLogin}>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Password</label>
                            <input
                                type="password" value={password}
                                onChange={e => { setPassword(e.target.value); setAuthError("") }}
                                placeholder="••••••••••••"
                                autoFocus
                                style={{ width: "100%", background: "#fafafa", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", marginBottom: authError ? "8px" : "16px", transition: "border 0.2s" }}
                                onFocus={e => e.target.style.borderColor = "#1a1a1a"}
                                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
                            />
                            {authError && (
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ef4444", fontSize: "12px", marginBottom: "16px" }}>
                                    <AlertCircle size={13} /> {authError}
                                </div>
                            )}
                            <button type="submit" style={{ width: "100%", height: "48px", background: "#1a1a1a", color: "#fff", borderRadius: "10px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", letterSpacing: "0.05em", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#333"} onMouseOut={e => e.currentTarget.style.background = "#1a1a1a"}>
                                Masuk ke Dashboard
                            </button>
                        </form>
                        <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
                            <Link href="/id" style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>← Kembali ke Website</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /* ── FORM VIEW ── */
    if (view === "form") {
        return (
            <ProductFormView
                product={editingProduct} isCreating={isCreating}
                onSave={handleSaveProduct} onCancel={() => setView("list")}
                savedFeedback={savedFeedback}
            />
        )
    }

    /* ── DASHBOARD ── */
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#faf9f8" }}>

            <AdminSidebar onLogout={handleLogout} />

            {/* MAIN */}
            <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>

                {/* Header */}
                <header style={{ background: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
                    <div>
                        <h1 style={{ fontFamily: "serif", fontSize: "24px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>CMS Produk</h1>
                        <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Kelola semua produk Julia Owers · <strong style={{ color: "#1a1a1a", fontWeight: 600 }}>{products.length} produk aktif</strong></p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {deletedIds.length > 0 && (
                            <button onClick={resetToDefault} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", color: "#d97706", background: "#fef3c7", border: "1px solid #fde68a", cursor: "pointer" }}>
                                <RotateCcw size={12} /> Reset Default
                            </button>
                        )}
                        <button
                            onClick={() => { setEditingProduct(null); setIsCreating(true); setView("form") }}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#fff", background: "#1a1a1a", border: "none", cursor: "pointer", transition: "background 0.2s" }}
                            onMouseOver={e => e.currentTarget.style.background = "#333"} onMouseOut={e => e.currentTarget.style.background = "#1a1a1a"}>
                            <Plus size={15} /> Produk Baru
                        </button>
                    </div>
                </header>

                <div style={{ padding: "28px 32px", flex: 1 }}>

                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
                        {[
                            { label: "Total Produk", value: products.length, color: "#3b82f6" },
                            { label: "Kategori Aktif", value: CATEGORIES.length, color: "#10b981" },
                            { label: "Disembunyikan", value: deletedIds.length, color: "#d97706" },
                            { label: "Produk Baru", value: 0, color: "#8b5cf6" },
                        ].map(s => (
                            <div key={s.label} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                                <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.4)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                                <p style={{ fontSize: "32px", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Toolbar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                        <div style={{ position: "relative", flex: 1, minWidth: "200px", maxWidth: "320px" }}>
                            <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)", pointerEvents: "none" }} />
                            <input
                                type="text" placeholder="Cari nama produk..."
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                style={{ width: "100%", paddingLeft: "36px", paddingRight: "16px", paddingTop: "10px", paddingBottom: "10px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", fontSize: "13px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "4px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "4px", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                            {["all", ...CATEGORIES].map(cat => (
                                <button key={cat} onClick={() => setFilterCategory(cat)}
                                    style={{ padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: filterCategory === cat ? 600 : 500, border: "none", cursor: "pointer", background: filterCategory === cat ? "#1a1a1a" : "transparent", color: filterCategory === cat ? "#fff" : "rgba(0,0,0,0.5)", transition: "all 0.15s" }}>
                                    {cat === "all" ? "Semua" : cat}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: "flex", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "4px", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                            {([{ m: "grid", icon: <Grid size={14} /> }, { m: "list", icon: <List size={14} /> }] as const).map(({ m, icon }) => (
                                <button key={m} onClick={() => setViewMode(m as "grid" | "list")}
                                    style={{ padding: "6px 10px", borderRadius: "6px", border: "none", cursor: "pointer", background: viewMode === m ? "#1a1a1a" : "transparent", color: viewMode === m ? "#fff" : "rgba(0,0,0,0.5)", display: "flex", transition: "all 0.15s" }}>
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hidden products warning */}
                    {deletedIds.length > 0 && (
                        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#fef3c7", border: "1px solid #fde68a", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#d97706", fontWeight: 500 }}>
                            <AlertCircle size={14} /> {deletedIds.length} produk sedang disembunyikan dari website. Hover kartu untuk memulihkan.
                        </div>
                    )}

                    {/* GRID VIEW */}
                    {viewMode === "grid" ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                            {/* Add card */}
                            <motion.button
                                onClick={() => { setEditingProduct(null); setIsCreating(true); setView("form") }}
                                whileHover={{ borderColor: "rgba(0,0,0,0.2)" }}
                                style={{ border: "2px dashed rgba(0,0,0,0.1)", borderRadius: "12px", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", padding: "32px 16px", minHeight: "280px", cursor: "pointer", transition: "background 0.2s" }}
                                onMouseOver={e => e.currentTarget.style.background = "rgba(0,0,0,0.02)"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                                    <Plus size={20} color="#1a1a1a" />
                                </div>
                                <span style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)", fontWeight: 500 }}>Tambah Produk</span>
                            </motion.button>

                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id} product={product}
                                    onEdit={() => { setEditingProduct(product); setIsCreating(false); setView("form") }}
                                    onDelete={() => setDeleteConfirm(product.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        /* LIST VIEW */
                        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                            {/* Header row */}
                            <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 120px 140px 100px 80px", gap: "12px", padding: "12px 20px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#fafafa", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                <div>Foto</div><div>Nama Produk</div><div>Kategori</div><div>Ukuran</div><div style={{ textAlign: "right" }}>Harga</div><div style={{ textAlign: "center" }}>Aksi</div>
                            </div>
                            {filteredProducts.map(product => (
                                <div key={product.id} style={{ display: "grid", gridTemplateColumns: "56px 1fr 120px 140px 100px 80px", gap: "12px", padding: "12px 20px", borderBottom: "1px solid rgba(0,0,0,0.04)", alignItems: "center" }}>
                                    <div style={{ position: "relative", width: "44px", height: "56px", borderRadius: "6px", overflow: "hidden", background: "#f5f5f5" }}>
                                        <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                                        <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.slug}</p>
                                    </div>
                                    <div><span style={{ fontSize: "11px", padding: "3px 10px", background: "rgba(0,0,0,0.04)", borderRadius: "20px", color: "rgba(0,0,0,0.6)", fontWeight: 500 }}>{product.category}</span></div>
                                    <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>{product.sizes.join(", ")}</div>
                                    <div style={{ textAlign: "right", fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>Rp {(product.price / 1000).toFixed(0)}k</div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                        <button onClick={() => { setEditingProduct(product); setIsCreating(false); setView("form") }}
                                            style={{ padding: "6px", borderRadius: "6px", border: "none", background: "transparent", color: "rgba(0,0,0,0.5)", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#1a1a1a"} onMouseOut={e => e.currentTarget.style.color = "rgba(0,0,0,0.5)"}>
                                            <Edit2 size={14} />
                                        </button>
                                        <button onClick={() => setDeleteConfirm(product.id)}
                                            style={{ padding: "6px", borderRadius: "6px", border: "none", background: "transparent", color: "#ef4444", cursor: "pointer", opacity: 0.6, transition: "opacity 0.2s" }} onMouseOver={e => e.currentTarget.style.opacity = "1"} onMouseOut={e => e.currentTarget.style.opacity = "0.6"}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* DELETE MODAL */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backdropFilter: "blur(4px)" }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "100%", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Trash2 size={18} color="#ef4444" />
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 700, color: "#1a1a1a", fontSize: "16px", marginBottom: "2px" }}>Sembunyikan Produk?</h3>
                                    <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Produk tidak akan tampil di website</p>
                                </div>
                            </div>
                            <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.6)", marginBottom: "24px", lineHeight: "1.6" }}>
                                Produk ini akan disembunyikan dari website. Anda bisa memulihkannya kapan saja.
                            </p>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button onClick={() => setDeleteConfirm(null)}
                                    style={{ flex: 1, height: "42px", background: "#f5f5f5", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "8px", color: "#1a1a1a", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
                                    Batal
                                </button>
                                <button onClick={() => { deleteProduct(deleteConfirm); setDeleteConfirm(null) }}
                                    style={{ flex: 1, height: "42px", background: "#ef4444", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
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

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, onEdit, onDelete }: { product: Product; onEdit: () => void; onDelete: () => void }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ background: "#fff", border: `1px solid ${hovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.06)"}`, borderRadius: "12px", overflow: "hidden", transition: "all 0.2s", cursor: "pointer", boxShadow: hovered ? "0 10px 30px rgba(0,0,0,0.05)" : "0 4px 15px rgba(0,0,0,0.02)" }}>
            {/* Image */}
            <div style={{ position: "relative", aspectRatio: "3/4", background: "#f5f5f5", overflow: "hidden" }}>
                <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover", transform: hovered ? "scale(1.03)" : "scale(1)", transition: "transform 0.5s ease-out" }} />
                {/* Category badge */}
                <span style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 10px", background: "rgba(255,255,255,0.9)", color: "#1a1a1a", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                    {product.category}
                </span>
                {/* Overlay actions */}
                <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(255,255,255,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", opacity: hovered ? 1 : 0, transition: "all 0.2s", backdropFilter: hovered ? "blur(2px)" : "none" }}>
                    <button onClick={onEdit}
                        style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                        <Edit2 size={16} color="#1a1a1a" />
                    </button>
                    <button onClick={onDelete}
                        style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#ef4444", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(239,68,68,0.3)", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                        <Trash2 size={16} color="#fff" />
                    </button>
                </div>
            </div>
            {/* Info */}
            <div style={{ padding: "16px" }}>
                <p style={{ fontFamily: "serif", fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "12px" }}>{product.slug}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {product.sizes.slice(0, 3).map(s => (
                            <span key={s} style={{ fontSize: "10px", padding: "3px 6px", background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.6)", borderRadius: "4px", fontWeight: 500 }}>{s}</span>
                        ))}
                        {product.sizes.length > 3 && <span style={{ fontSize: "10px", padding: "3px 6px", background: "transparent", color: "rgba(0,0,0,0.4)", borderRadius: "4px" }}>+{product.sizes.length - 3}</span>}
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>Rp {(product.price / 1000).toFixed(0)}k</p>
                </div>
            </div>
        </div>
    )
}

/* ─── PRODUCT FORM ─── */
function ProductFormView({ product, isCreating, onSave, onCancel, savedFeedback }: {
    product: Product | null; isCreating: boolean
    onSave: (data: Product) => void; onCancel: () => void; savedFeedback: boolean
}) {
    const [form, setForm] = useState<Product>(() =>
        product ? { ...product } : { id: `prod-${Date.now()}`, ...blankProduct() }
    )
    const [activeTab, setActiveTab] = useState<"basic" | "detail" | "variants">("basic")
    const [autoSlug, setAutoSlug] = useState(isCreating)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return
        setIsUploading(true)
        const fd = new FormData(); fd.append("file", file)
        try {
            const res = await fetch("/api/upload", { method: "POST", body: fd })
            const data = await res.json()
            if (data.success) { update("image", data.url); update("hoverImage", data.url) }
            else alert("Gagal upload gambar")
        } catch { alert("Error saat upload") }
        finally { setIsUploading(false); if (fileInputRef.current) fileInputRef.current.value = "" }
    }

    const update = (field: keyof Product, value: unknown) => {
        setForm(prev => {
            const next = { ...prev, [field]: value }
            if (field === "name" && autoSlug) next.slug = slugify(value as string)
            return next
        })
    }

    const handleSubmit = () => {
        if (!form.name || !form.slug || form.price <= 0) { alert("Nama, slug, dan harga wajib diisi."); return }
        onSave(form)
    }

    const validation = [
        { label: "Nama produk", ok: form.name.length > 0 },
        { label: "Slug URL", ok: form.slug.length > 0 },
        { label: "Harga diisi", ok: form.price > 0 },
        { label: "Ukuran dipilih", ok: form.sizes.length > 0 },
        { label: "Foto tersedia", ok: !!form.image },
    ]

    const TABS = [
        { id: "basic" as const, label: "Info Dasar", icon: <Tag size={13} /> },
        { id: "detail" as const, label: "Detail & Perawatan", icon: <Info size={13} /> },
        { id: "variants" as const, label: "Ukuran & Warna", icon: <Layers size={13} /> },
    ]

    const inp: React.CSSProperties = { width: "100%", background: "#fafafa", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", padding: "12px 14px", fontSize: "14px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#faf9f8" }}>
            {/* Sidebar */}
            <AdminSidebar />

            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <header style={{ background: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
                    <div>
                        <h1 style={{ fontFamily: "serif", fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>
                            {isCreating ? "✨ Tambah Produk Baru" : `✏️ Edit: ${product?.name}`}
                        </h1>
                        <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontFamily: "monospace" }}>/id/shop/{form.slug || "slug-belum-diisi"}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={onCancel} style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", color: "rgba(0,0,0,0.6)", background: "#fff", fontSize: "13px", fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>Batal</button>
                        <motion.button onClick={handleSubmit}
                            animate={{ background: savedFeedback ? "#10b981" : "#1a1a1a" }}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, color: "#fff", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                            <Save size={14} /> {savedFeedback ? "✓ Tersimpan!" : "Simpan Produk"}
                        </motion.button>
                    </div>
                </header>

                <div style={{ padding: "28px 32px", flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", maxWidth: "1200px" }}>

                        {/* LEFT FORM */}
                        <div>
                            {/* Tabs */}
                            <div style={{ display: "flex", gap: "4px", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "10px", padding: "4px", marginBottom: "24px", width: "fit-content", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                                {TABS.map(tab => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: activeTab === tab.id ? 600 : 500, border: "none", cursor: "pointer", background: activeTab === tab.id ? "#1a1a1a" : "transparent", color: activeTab === tab.id ? "#fff" : "rgba(0,0,0,0.5)", transition: "all 0.15s" }}>
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* TAB: Info Dasar */}
                            {activeTab === "basic" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>Informasi Produk</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                            <div>
                                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: "8px" }}>Nama Produk <span style={{ color: "#ef4444" }}>*</span></label>
                                                <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Cth: The Minimalist Midi Dress" style={inp} />
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: "8px" }}>Slug URL <span style={{ color: "#ef4444" }}>*</span> <span style={{ fontWeight: 400, color: "rgba(0,0,0,0.4)", fontSize: "11px" }}>— otomatis dari nama</span></label>
                                                <div style={{ display: "flex", gap: "8px" }}>
                                                    <input value={form.slug} onChange={e => { setAutoSlug(false); update("slug", e.target.value) }} placeholder="minimalist-midi-dress" style={{ ...inp, flex: 1, fontFamily: "monospace", fontSize: "13px", background: "#f9f9f9" }} />
                                                    <button type="button" onClick={() => { setAutoSlug(true); update("slug", slugify(form.name)) }}
                                                        style={{ padding: "12px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", color: "rgba(0,0,0,0.6)", cursor: "pointer", display: "flex", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                                                        <RefreshCw size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                <div>
                                                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: "8px" }}>Harga (Rp) <span style={{ color: "#ef4444" }}>*</span></label>
                                                    <input type="number" value={form.price || ""} onChange={e => update("price", Number(e.target.value))} placeholder="262000" style={inp} />
                                                </div>
                                                <div>
                                                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: "8px" }}>Sub-Kategori</label>
                                                    <select value={form.subCategory} onChange={e => update("subCategory", e.target.value)} style={{ ...inp, background: "#fff" }}>
                                                        {SUB_CATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: "8px" }}>Kategori <span style={{ color: "#ef4444" }}>*</span></label>
                                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                    {CATEGORIES.map(cat => (
                                                        <button key={cat} type="button" onClick={() => update("category", cat)}
                                                            style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid", borderColor: form.category === cat ? "#1a1a1a" : "rgba(0,0,0,0.1)", fontSize: "13px", cursor: "pointer", fontWeight: form.category === cat ? 600 : 500, background: form.category === cat ? "#1a1a1a" : "#fff", color: form.category === cat ? "#fff" : "rgba(0,0,0,0.6)", transition: "all 0.15s" }}>
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: "8px" }}>Deskripsi</label>
                                                <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={4} placeholder="Deskripsi singkat yang menarik..." style={{ ...inp, resize: "none", lineHeight: "1.5" }} />
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: "8px" }}>Material</label>
                                                <input value={form.material} onChange={e => update("material", e.target.value)} placeholder="100% Pure European Linen" style={inp} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Foto */}
                                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                                            <ImageIcon size={14} /> Foto Produk
                                        </p>
                                        <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)", marginBottom: "20px" }}>Pilih foto bawaan atau upload dari komputer</p>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
                                            {PRESET_IMAGES.map(img => (
                                                <button key={img} type="button" onClick={() => { update("image", img); update("hoverImage", img) }}
                                                    style={{ position: "relative", aspectRatio: "3/4", borderRadius: "8px", border: `2px solid ${form.image === img ? "#1a1a1a" : "rgba(0,0,0,0.08)"}`, overflow: "hidden", cursor: "pointer", padding: 0, background: "#f5f5f5" }}>
                                                    <Image src={img} alt="preset" fill style={{ objectFit: "cover" }} />
                                                    {form.image === img && (
                                                        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
                                                                <Check size={14} color="#fff" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{ display: "none" }} />
                                        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}
                                            style={{ width: "100%", padding: "14px", border: "1px dashed rgba(0,0,0,0.2)", borderRadius: "8px", background: "#fafafa", color: "rgba(0,0,0,0.6)", fontSize: "14px", fontWeight: 500, cursor: isUploading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxSizing: "border-box", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#f0f0f0"} onMouseOut={e => e.currentTarget.style.background = "#fafafa"}>
                                            {isUploading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Upload size={16} />}
                                            {isUploading ? "Mengupload..." : "Upload Foto Kustom dari Komputer"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* TAB: Detail */}
                            {activeTab === "detail" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    {[
                                        { field: "care" as const, label: "Cara Perawatan", icon: <Star size={14} />, placeholder: "Cth: Machine wash cold" },
                                        { field: "features" as const, label: "Fitur Produk", icon: <Tag size={14} />, placeholder: "Cth: Hidden side pockets" },
                                        { field: "sustainability" as const, label: "Sustainability", icon: <Leaf size={14} />, placeholder: "Cth: Made locally in Bandung" },
                                    ].map(({ field, label, icon, placeholder }) => (
                                        <div key={field} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                                            <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px" }}>
                                                {icon} {label}
                                            </p>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                                {(form[field] as string[]).map((item, idx) => (
                                                    <div key={idx} style={{ display: "flex", gap: "8px" }}>
                                                        <input value={item} onChange={e => { const arr = [...(form[field] as string[])]; arr[idx] = e.target.value; update(field, arr) }} placeholder={placeholder} style={{ ...inp, flex: 1 }} />
                                                        <button type="button" onClick={() => update(field, (form[field] as string[]).filter((_, i) => i !== idx))}
                                                            style={{ padding: "10px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.08)", background: "#fff", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => update(field, [...(form[field] as string[]), ""])}
                                                    style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 500, color: "#1a1a1a", background: "#fafafa", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", width: "fit-content", marginTop: "4px" }}>
                                                    <Plus size={14} /> Tambah {label}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* TAB: Variants */}
                            {activeTab === "variants" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px" }}>
                                            <Layers size={14} /> Ukuran Tersedia
                                        </p>
                                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                                            {SIZE_OPTIONS.map(size => {
                                                const active = form.sizes.includes(size)
                                                return (
                                                    <button key={size} type="button" onClick={() => update("sizes", active ? form.sizes.filter(s => s !== size) : [...form.sizes, size])}
                                                        style={{ minWidth: "48px", height: "44px", padding: "0 14px", borderRadius: "8px", border: `1px solid ${active ? "#1a1a1a" : "rgba(0,0,0,0.1)"}`, fontSize: "13px", fontWeight: 600, cursor: "pointer", background: active ? "#1a1a1a" : "#fff", color: active ? "#fff" : "rgba(0,0,0,0.6)", transition: "all 0.15s", boxShadow: active ? "0 4px 10px rgba(0,0,0,0.1)" : "none" }}>
                                                        {size}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>Dipilih: <strong style={{ color: "#1a1a1a" }}>{form.sizes.join(", ") || "—"}</strong></p>
                                    </div>
                                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>Pilihan Warna</p>
                                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                                            {COLOR_PRESETS.map(color => {
                                                const active = form.colors.includes(color)
                                                return (
                                                    <button key={color} type="button" onClick={() => update("colors", active ? form.colors.filter(c => c !== color) : [...form.colors, color])}
                                                        style={{ padding: "8px 16px", borderRadius: "20px", border: `1px solid ${active ? "#1a1a1a" : "rgba(0,0,0,0.1)"}`, fontSize: "13px", fontWeight: 500, cursor: "pointer", background: active ? "#1a1a1a" : "#fff", color: active ? "#fff" : "rgba(0,0,0,0.6)", transition: "all 0.15s" }}>
                                                        {color}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>Dipilih: <strong style={{ color: "#1a1a1a" }}>{form.colors.join(", ") || "—"}</strong></p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: LIVE PREVIEW */}
                        <div style={{ position: "sticky", top: "100px", height: "fit-content" }}>
                            <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>👁 Live Preview</p>

                            {/* Card preview */}
                            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", overflow: "hidden", marginBottom: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                                <div style={{ position: "relative", aspectRatio: "3/4", background: "#f5f5f5" }}>
                                    <Image src={form.image || "/images/products/1.jpg"} alt="preview" fill style={{ objectFit: "cover" }} />
                                    <span style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 10px", background: "rgba(255,255,255,0.9)", color: "#1a1a1a", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "20px" }}>
                                        {form.category}
                                    </span>
                                </div>
                                <div style={{ padding: "16px" }}>
                                    <p style={{ fontFamily: "serif", fontSize: "16px", color: form.name ? "#1a1a1a" : "rgba(0,0,0,0.3)", marginBottom: "6px" }}>{form.name || "Nama Produk"}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                        <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{form.subCategory}</p>
                                        <p style={{ fontSize: "15px", fontWeight: 700, color: form.price > 0 ? "#1a1a1a" : "rgba(0,0,0,0.3)" }}>
                                            {form.price > 0 ? `Rp ${form.price.toLocaleString("id-ID")}` : "Rp —"}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "12px" }}>
                                        {form.sizes.map(s => <span key={s} style={{ fontSize: "11px", padding: "4px 8px", background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.6)", borderRadius: "4px", fontWeight: 500 }}>{s}</span>)}
                                    </div>
                                </div>
                            </div>

                            {/* URL */}
                            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "10px", padding: "16px", marginBottom: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                                <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>URL Produk</p>
                                <p style={{ fontSize: "12px", fontFamily: "monospace", color: "rgba(0,0,0,0.6)", wordBreak: "break-all" }}>
                                    /id/shop/<span style={{ color: "#1a1a1a", fontWeight: 600 }}>{form.slug || "..."}</span>
                                </p>
                            </div>

                            {/* Validation */}
                            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "10px", padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                                <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", fontWeight: 600 }}>Status Validasi</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    {validation.map(v => (
                                        <div key={v.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: v.ok ? "#d1fae5" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                {v.ok ? <Check size={12} color="#059669" /> : <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "block" }} />}
                                            </div>
                                            <span style={{ fontSize: "13px", color: v.ok ? "#1a1a1a" : "rgba(0,0,0,0.4)", fontWeight: v.ok ? 500 : 400 }}>{v.label}</span>
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
