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

const ADMIN_PASSWORD = "juliaowers2026"
const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Outerwear"]
const SUB_CATEGORIES = ["TRD", "KULOT", "BLW S/S", "BLW L/S", "ROD", "JKT", "VES", "KRG"]
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]
const COLOR_PRESETS = [
    "Ivory", "Oatmeal", "Cream", "White", "Black", "Navy", "Sage Green",
    "Dusty Blue", "Terracotta", "Olive", "Sand", "Charcoal", "Light Blue", "Blush", "Chocolate"
]
const PRESET_IMAGES = [
    "/images/product-1.png",
    "/images/product-2.png",
    "/images/product-3.png",
    "/images/product-4.png",
]

const blankProduct = (): Omit<Product, "id"> => ({
    name: "", slug: "", price: 0, currency: "IDR",
    category: "Tops", subCategory: "BLW S/S",
    image: "/images/product-1.png", hoverImage: "/images/product-1.png",
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
            <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                <div style={{ width: "100%", maxWidth: "380px" }}>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }}>
                            <Package size={26} color="rgba(255,255,255,0.5)" />
                        </div>
                        <h1 style={{ fontFamily: "serif", fontSize: "28px", color: "#fff", marginBottom: "6px" }}>Julia Owers</h1>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Admin — CMS Produk</p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>
                        <form onSubmit={handleLogin}>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Password</label>
                            <input
                                type="password" value={password}
                                onChange={e => { setPassword(e.target.value); setAuthError("") }}
                                placeholder="••••••••••••"
                                autoFocus
                                style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#fff", outline: "none", boxSizing: "border-box", marginBottom: authError ? "8px" : "16px" }}
                            />
                            {authError && (
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#f87171", fontSize: "12px", marginBottom: "16px" }}>
                                    <AlertCircle size={13} /> {authError}
                                </div>
                            )}
                            <button type="submit" style={{ width: "100%", height: "48px", background: "#fff", color: "#111", borderRadius: "10px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", letterSpacing: "0.05em" }}>
                                Masuk ke Dashboard
                            </button>
                        </form>
                        <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                            <Link href="/id" style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>← Kembali ke Website</Link>
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
        <div style={{ display: "flex", minHeight: "100vh", background: "#0d0d14" }}>

            {/* SIDEBAR */}
            <aside style={{ width: "240px", minWidth: "240px", background: "#111118", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
                <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontFamily: "serif", fontSize: "20px", color: "#fff", marginBottom: "2px" }}>Julia Owers</p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Admin Panel</p>
                </div>
                <nav style={{ flex: 1, padding: "12px" }}>
                    {[
                        { href: "/admin", icon: <ShoppingBag size={15} />, label: "Manajemen Pesanan", active: false },
                    ].map(item => (
                        <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "2px" }}>
                            {item.icon} {item.label}
                        </Link>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "#fff", background: "rgba(255,255,255,0.08)", fontWeight: 600, marginBottom: "2px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}><Package size={15} /> CMS Produk</span>
                        <span style={{ fontSize: "11px", padding: "2px 6px", borderRadius: "20px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{products.length}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "rgba(255,255,255,0.2)", cursor: "not-allowed", marginBottom: "2px" }}>
                        <Settings size={15} /> Pengaturan
                    </div>
                </nav>
                <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <Link href="/id" target="_blank" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", marginBottom: "2px" }}>
                        <Home size={15} /> Lihat Website
                    </Link>
                    <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "rgba(255,100,100,0.6)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <LogOut size={15} /> Keluar
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>

                {/* Header */}
                <header style={{ background: "rgba(17,17,24,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
                    <div>
                        <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>CMS Produk</h1>
                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Kelola semua produk Julia Owers · <strong style={{ color: "rgba(255,255,255,0.5)" }}>{products.length} produk aktif</strong></p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {deletedIds.length > 0 && (
                            <button onClick={resetToDefault} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", color: "#fbbf24", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", cursor: "pointer" }}>
                                <RotateCcw size={12} /> Reset Default
                            </button>
                        )}
                        <button
                            onClick={() => { setEditingProduct(null); setIsCreating(true); setView("form") }}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "#111", background: "#fff", border: "none", cursor: "pointer" }}>
                            <Plus size={15} /> Produk Baru
                        </button>
                    </div>
                </header>

                <div style={{ padding: "28px 32px", flex: 1 }}>

                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
                        {[
                            { label: "Total Produk", value: products.length, color: "#60a5fa" },
                            { label: "Kategori Aktif", value: CATEGORIES.length, color: "#34d399" },
                            { label: "Disembunyikan", value: deletedIds.length, color: "#fbbf24" },
                            { label: "Produk Baru", value: 0, color: "#a78bfa" },
                        ].map(s => (
                            <div key={s.label} style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                                <p style={{ fontSize: "32px", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Toolbar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                        <div style={{ position: "relative", flex: 1, minWidth: "200px", maxWidth: "320px" }}>
                            <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)", pointerEvents: "none" }} />
                            <input
                                type="text" placeholder="Cari nama produk..."
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                style={{ width: "100%", paddingLeft: "36px", paddingRight: "16px", paddingTop: "10px", paddingBottom: "10px", background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "13px", color: "#fff", outline: "none", boxSizing: "border-box" }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "4px", background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "4px" }}>
                            {["all", ...CATEGORIES].map(cat => (
                                <button key={cat} onClick={() => setFilterCategory(cat)}
                                    style={{ padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, border: "none", cursor: "pointer", background: filterCategory === cat ? "#fff" : "transparent", color: filterCategory === cat ? "#111" : "rgba(255,255,255,0.35)", transition: "all 0.15s" }}>
                                    {cat === "all" ? "Semua" : cat}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: "flex", background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "4px" }}>
                            {([{ m: "grid", icon: <Grid size={14} /> }, { m: "list", icon: <List size={14} /> }] as const).map(({ m, icon }) => (
                                <button key={m} onClick={() => setViewMode(m as "grid" | "list")}
                                    style={{ padding: "6px 10px", borderRadius: "6px", border: "none", cursor: "pointer", background: viewMode === m ? "#fff" : "transparent", color: viewMode === m ? "#111" : "rgba(255,255,255,0.35)", display: "flex" }}>
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hidden products warning */}
                    {deletedIds.length > 0 && (
                        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#fbbf24" }}>
                            <AlertCircle size={14} /> {deletedIds.length} produk sedang disembunyikan dari website. Hover kartu untuk memulihkan.
                        </div>
                    )}

                    {/* GRID VIEW */}
                    {viewMode === "grid" ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                            {/* Add card */}
                            <motion.button
                                onClick={() => { setEditingProduct(null); setIsCreating(true); setView("form") }}
                                whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
                                style={{ border: "2px dashed rgba(255,255,255,0.08)", borderRadius: "12px", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", padding: "32px 16px", minHeight: "280px", cursor: "pointer" }}>
                                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Plus size={20} color="rgba(255,255,255,0.3)" />
                                </div>
                                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Tambah Produk</span>
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
                        <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden" }}>
                            {/* Header row */}
                            <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 120px 140px 100px 80px", gap: "12px", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                <div>Foto</div><div>Nama Produk</div><div>Kategori</div><div>Ukuran</div><div style={{ textAlign: "right" }}>Harga</div><div style={{ textAlign: "center" }}>Aksi</div>
                            </div>
                            {filteredProducts.map(product => (
                                <div key={product.id} style={{ display: "grid", gridTemplateColumns: "56px 1fr 120px 140px 100px 80px", gap: "12px", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
                                    <div style={{ position: "relative", width: "44px", height: "56px", borderRadius: "6px", overflow: "hidden", background: "#1a1a24" }}>
                                        <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.slug}</p>
                                    </div>
                                    <div><span style={{ fontSize: "11px", padding: "3px 10px", background: "rgba(255,255,255,0.06)", borderRadius: "20px", color: "rgba(255,255,255,0.45)" }}>{product.category}</span></div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{product.sizes.join(", ")}</div>
                                    <div style={{ textAlign: "right", fontSize: "13px", fontWeight: 700, color: "#fff" }}>Rp {(product.price / 1000).toFixed(0)}k</div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                        <button onClick={() => { setEditingProduct(product); setIsCreating(false); setView("form") }}
                                            style={{ padding: "6px", borderRadius: "6px", border: "none", background: "transparent", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
                                            <Edit2 size={14} />
                                        </button>
                                        <button onClick={() => setDeleteConfirm(product.id)}
                                            style={{ padding: "6px", borderRadius: "6px", border: "none", background: "transparent", color: "rgba(255,100,100,0.4)", cursor: "pointer" }}>
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
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backdropFilter: "blur(8px)" }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "100%" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Trash2 size={18} color="#ef4444" />
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "15px", marginBottom: "2px" }}>Sembunyikan Produk?</h3>
                                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>Produk tidak akan tampil di website</p>
                                </div>
                            </div>
                            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "24px", lineHeight: "1.6" }}>
                                Produk ini akan disembunyikan dari website. Anda bisa memulihkannya kapan saja.
                            </p>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button onClick={() => setDeleteConfirm(null)}
                                    style={{ flex: 1, height: "42px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(255,255,255,0.5)", fontSize: "13px", cursor: "pointer" }}>
                                    Batal
                                </button>
                                <button onClick={() => { deleteProduct(deleteConfirm); setDeleteConfirm(null) }}
                                    style={{ flex: 1, height: "42px", background: "#ef4444", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
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
            style={{ background: "#111118", border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s", cursor: "pointer" }}>
            {/* Image */}
            <div style={{ position: "relative", aspectRatio: "3/4", background: "#1a1a24", overflow: "hidden" }}>
                <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s" }} />
                {/* Category badge */}
                <span style={{ position: "absolute", top: "10px", left: "10px", padding: "3px 10px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "20px" }}>
                    {product.category}
                </span>
                {/* Overlay actions */}
                <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.45)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", opacity: hovered ? 1 : 0, transition: "all 0.2s" }}>
                    <button onClick={onEdit}
                        style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                        <Edit2 size={16} color="#111" />
                    </button>
                    <button onClick={onDelete}
                        style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ef4444", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                        <Trash2 size={16} color="#fff" />
                    </button>
                </div>
            </div>
            {/* Info */}
            <div style={{ padding: "14px" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "10px" }}>{product.slug}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {product.sizes.slice(0, 3).map(s => (
                            <span key={s} style={{ fontSize: "10px", padding: "2px 6px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", borderRadius: "4px" }}>{s}</span>
                        ))}
                        {product.sizes.length > 3 && <span style={{ fontSize: "10px", padding: "2px 6px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", borderRadius: "4px" }}>+{product.sizes.length - 3}</span>}
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>Rp {(product.price / 1000).toFixed(0)}k</p>
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

    const inp: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#fff", outline: "none", boxSizing: "border-box" }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#0d0d14" }}>
            {/* Sidebar */}
            <aside style={{ width: "240px", minWidth: "240px", background: "#111118", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
                <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontFamily: "serif", fontSize: "20px", color: "#fff", marginBottom: "2px" }}>Julia Owers</p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Admin Panel</p>
                </div>
                <nav style={{ flex: 1, padding: "12px" }}>
                    <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "2px" }}>
                        <ShoppingBag size={15} /> Manajemen Pesanan
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "#fff", background: "rgba(255,255,255,0.08)", fontWeight: 600 }}>
                        <Package size={15} /> CMS Produk
                    </div>
                </nav>
                <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button onClick={onCancel} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <ArrowLeft size={15} /> Kembali ke Daftar
                    </button>
                </div>
            </aside>

            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <header style={{ background: "rgba(17,17,24,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
                    <div>
                        <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>
                            {isCreating ? "✨ Tambah Produk Baru" : `✏️ Edit: ${product?.name}`}
                        </h1>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>/id/shop/{form.slug || "slug-belum-diisi"}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={onCancel} style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", background: "transparent", fontSize: "13px", cursor: "pointer" }}>Batal</button>
                        <motion.button onClick={handleSubmit}
                            animate={{ background: savedFeedback ? "#059669" : "#ffffff" }}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 700, color: "#111", cursor: "pointer" }}>
                            <Save size={14} /> {savedFeedback ? "✓ Tersimpan!" : "Simpan Produk"}
                        </motion.button>
                    </div>
                </header>

                <div style={{ padding: "28px 32px", flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "28px", maxWidth: "1100px" }}>

                        {/* LEFT FORM */}
                        <div>
                            {/* Tabs */}
                            <div style={{ display: "flex", gap: "4px", background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "4px", marginBottom: "20px", width: "fit-content" }}>
                                {TABS.map(tab => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, border: "none", cursor: "pointer", background: activeTab === tab.id ? "#fff" : "transparent", color: activeTab === tab.id ? "#111" : "rgba(255,255,255,0.35)", transition: "all 0.15s" }}>
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* TAB: Info Dasar */}
                            {activeTab === "basic" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>Informasi Produk</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                            <div>
                                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Nama Produk *</label>
                                                <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Cth: The Minimalist Midi Dress" style={inp} />
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Slug URL * <span style={{ textTransform: "none", fontWeight: 400, color: "rgba(255,255,255,0.2)" }}>— otomatis dari nama</span></label>
                                                <div style={{ display: "flex", gap: "8px" }}>
                                                    <input value={form.slug} onChange={e => { setAutoSlug(false); update("slug", e.target.value) }} placeholder="minimalist-midi-dress" style={{ ...inp, flex: 1, fontFamily: "monospace", fontSize: "12px" }} />
                                                    <button type="button" onClick={() => { setAutoSlug(true); update("slug", slugify(form.name)) }}
                                                        style={{ padding: "10px 12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(255,255,255,0.35)", cursor: "pointer", display: "flex" }}>
                                                        <RefreshCw size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                                <div>
                                                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Harga (Rp) *</label>
                                                    <input type="number" value={form.price || ""} onChange={e => update("price", Number(e.target.value))} placeholder="262000" style={inp} />
                                                </div>
                                                <div>
                                                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Sub-Kategori</label>
                                                    <select value={form.subCategory} onChange={e => update("subCategory", e.target.value)} style={{ ...inp, background: "#1a1a24" }}>
                                                        {SUB_CATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Kategori *</label>
                                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                    {CATEGORIES.map(cat => (
                                                        <button key={cat} type="button" onClick={() => update("category", cat)}
                                                            style={{ padding: "8px 16px", borderRadius: "8px", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: form.category === cat ? 700 : 400, background: form.category === cat ? "#fff" : "rgba(255,255,255,0.06)", color: form.category === cat ? "#111" : "rgba(255,255,255,0.4)", transition: "all 0.15s" }}>
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Deskripsi</label>
                                                <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={4} placeholder="Deskripsi singkat yang menarik..." style={{ ...inp, resize: "none" }} />
                                            </div>
                                            <div>
                                                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Material</label>
                                                <input value={form.material} onChange={e => update("material", e.target.value)} placeholder="100% Pure European Linen" style={inp} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Foto */}
                                    <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                                            <ImageIcon size={12} /> Foto Produk
                                        </p>
                                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", marginBottom: "16px" }}>Pilih foto bawaan atau upload dari komputer</p>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "14px" }}>
                                            {PRESET_IMAGES.map(img => (
                                                <button key={img} type="button" onClick={() => { update("image", img); update("hoverImage", img) }}
                                                    style={{ position: "relative", aspectRatio: "3/4", borderRadius: "8px", border: `2px solid ${form.image === img ? "#fff" : "rgba(255,255,255,0.08)"}`, overflow: "hidden", cursor: "pointer", padding: 0, background: "#1a1a24" }}>
                                                    <Image src={img} alt="preset" fill style={{ objectFit: "cover" }} />
                                                    {form.image === img && (
                                                        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <Check size={12} color="#111" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{ display: "none" }} />
                                        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}
                                            style={{ width: "100%", padding: "12px", border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "8px", background: "transparent", color: "rgba(255,255,255,0.35)", fontSize: "13px", cursor: isUploading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxSizing: "border-box" }}>
                                            {isUploading ? <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> : <Upload size={15} />}
                                            {isUploading ? "Mengupload..." : "Upload Foto Kustom dari Komputer"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* TAB: Detail */}
                            {activeTab === "detail" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {[
                                        { field: "care" as const, label: "Cara Perawatan", icon: <Star size={12} />, placeholder: "Cth: Machine wash cold" },
                                        { field: "features" as const, label: "Fitur Produk", icon: <Tag size={12} />, placeholder: "Cth: Hidden side pockets" },
                                        { field: "sustainability" as const, label: "Sustainability", icon: <Leaf size={12} />, placeholder: "Cth: Made locally in Bandung" },
                                    ].map(({ field, label, icon, placeholder }) => (
                                        <div key={field} style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px" }}>
                                            <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                                                {icon} {label}
                                            </p>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                {(form[field] as string[]).map((item, idx) => (
                                                    <div key={idx} style={{ display: "flex", gap: "8px" }}>
                                                        <input value={item} onChange={e => { const arr = [...(form[field] as string[])]; arr[idx] = e.target.value; update(field, arr) }} placeholder={placeholder} style={{ ...inp, flex: 1 }} />
                                                        <button type="button" onClick={() => update(field, (form[field] as string[]).filter((_, i) => i !== idx))}
                                                            style={{ padding: "8px", borderRadius: "6px", border: "none", background: "transparent", color: "rgba(255,100,100,0.4)", cursor: "pointer" }}>
                                                            <X size={15} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => update(field, [...(form[field] as string[]), ""])}
                                                    style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", padding: "4px 0", marginTop: "4px" }}>
                                                    <Plus size={13} /> Tambah {label}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* TAB: Variants */}
                            {activeTab === "variants" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                                            <Layers size={12} /> Ukuran Tersedia
                                        </p>
                                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                                            {SIZE_OPTIONS.map(size => {
                                                const active = form.sizes.includes(size)
                                                return (
                                                    <button key={size} type="button" onClick={() => update("sizes", active ? form.sizes.filter(s => s !== size) : [...form.sizes, size])}
                                                        style={{ minWidth: "48px", height: "44px", padding: "0 12px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", background: active ? "#fff" : "rgba(255,255,255,0.06)", color: active ? "#111" : "rgba(255,255,255,0.35)", transition: "all 0.15s" }}>
                                                        {size}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>Dipilih: <strong style={{ color: "rgba(255,255,255,0.45)" }}>{form.sizes.join(", ") || "—"}</strong></p>
                                    </div>
                                    <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px" }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Pilihan Warna</p>
                                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                                            {COLOR_PRESETS.map(color => {
                                                const active = form.colors.includes(color)
                                                return (
                                                    <button key={color} type="button" onClick={() => update("colors", active ? form.colors.filter(c => c !== color) : [...form.colors, color])}
                                                        style={{ padding: "7px 14px", borderRadius: "8px", border: "none", fontSize: "12px", fontWeight: 500, cursor: "pointer", background: active ? "#fff" : "rgba(255,255,255,0.06)", color: active ? "#111" : "rgba(255,255,255,0.35)", transition: "all 0.15s" }}>
                                                        {color}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>Dipilih: <strong style={{ color: "rgba(255,255,255,0.45)" }}>{form.colors.join(", ") || "—"}</strong></p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: LIVE PREVIEW */}
                        <div style={{ position: "sticky", top: "88px", height: "fit-content" }}>
                            <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>👁 Live Preview</p>

                            {/* Card preview */}
                            <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
                                <div style={{ position: "relative", aspectRatio: "3/4", background: "#1a1a24" }}>
                                    <Image src={form.image || "/images/product-1.png"} alt="preview" fill style={{ objectFit: "cover" }} />
                                    <span style={{ position: "absolute", top: "10px", left: "10px", padding: "3px 10px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "20px" }}>
                                        {form.category}
                                    </span>
                                </div>
                                <div style={{ padding: "14px" }}>
                                    <p style={{ fontFamily: "serif", fontSize: "15px", color: form.name ? "#fff" : "rgba(255,255,255,0.2)", marginBottom: "6px" }}>{form.name || "Nama Produk"}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{form.subCategory}</p>
                                        <p style={{ fontSize: "14px", fontWeight: 800, color: form.price > 0 ? "#fff" : "rgba(255,255,255,0.2)" }}>
                                            {form.price > 0 ? `Rp ${form.price.toLocaleString("id-ID")}` : "Rp —"}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "10px" }}>
                                        {form.sizes.map(s => <span key={s} style={{ fontSize: "10px", padding: "2px 6px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", borderRadius: "4px" }}>{s}</span>)}
                                    </div>
                                </div>
                            </div>

                            {/* URL */}
                            <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px", marginBottom: "12px" }}>
                                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>URL Produk</p>
                                <p style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)", wordBreak: "break-all" }}>
                                    /id/shop/<span style={{ color: "rgba(255,255,255,0.65)" }}>{form.slug || "..."}</span>
                                </p>
                            </div>

                            {/* Validation */}
                            <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px" }}>
                                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Status Validasi</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {validation.map(v => (
                                        <div key={v.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: v.ok ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                {v.ok ? <Check size={10} color="#34d399" /> : <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "block" }} />}
                                            </div>
                                            <span style={{ fontSize: "12px", color: v.ok ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}>{v.label}</span>
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
