"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Clock, Truck, Download, RefreshCw,
    Search, TrendingUp, ShoppingBag, Eye, AlertCircle,
    ChevronRight, CheckCircle
} from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

const ADMIN_PASSWORD = "juliaowers2026"

type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "done" | "cancelled"

interface OrderItem { name: string; size: string; quantity: number; price: number }
interface Order {
    id: string; customerName: string; customerPhone: string; customerEmail?: string
    address: string; city: string; province: string; postalCode: string
    courier: string; notes?: string; items: OrderItem[]
    subtotal: number; shippingCost: number; total: number
    status: OrderStatus; trackingNumber?: string; createdAt: string; updatedAt: string
}

const STATUS_CFG: Record<OrderStatus, { label: string; color: string; bg: string; dot: string; border: string }> = {
    pending:    { label: "Menunggu",     color: "#b45309", bg: "#fef3c7", border: "#fde68a", dot: "#d97706" },
    confirmed:  { label: "Dikonfirmasi", color: "#1d4ed8", bg: "#dbeafe", border: "#bfdbfe", dot: "#3b82f6" },
    processing: { label: "Diproses",     color: "#6d28d9", bg: "#ede9fe", border: "#ddd6fe", dot: "#8b5cf6" },
    shipped:    { label: "Dikirim",      color: "#047857", bg: "#d1fae5", border: "#a7f3d0", dot: "#10b981" },
    done:       { label: "Selesai",      color: "#374151", bg: "#f3f4f6", border: "#e5e7eb", dot: "#6b7280" },
    cancelled:  { label: "Dibatalkan",   color: "#b91c1c", bg: "#fee2e2", border: "#fecaca", dot: "#ef4444" },
}
const STATUS_FLOW: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "done"]

const MOCK_ORDERS: Order[] = [
    {
        id: "JO-20260710-001", customerName: "Sarah Dewi Kusuma",
        customerPhone: "08123456789", customerEmail: "sarah@email.com",
        address: "Jl. Sudirman No. 12, RT 03/05", city: "Jakarta Selatan",
        province: "DKI Jakarta", postalCode: "12190", courier: "JNE Reguler", notes: "",
        items: [{ name: "The Minimalist Midi Dress", size: "M", quantity: 1, price: 262000 }],
        subtotal: 262000, shippingCost: 0, total: 262000,
        status: "pending", createdAt: "2026-07-10T07:30:00Z", updatedAt: "2026-07-10T07:30:00Z",
    },
    {
        id: "JO-20260710-002", customerName: "Rina Kartika",
        customerPhone: "08234567890", address: "Jl. Raya Bogor No. 45",
        city: "Bogor", province: "Jawa Barat", postalCode: "16161", courier: "J&T Reguler",
        items: [
            { name: "Relaxed Wide Leg Trousers", size: "L", quantity: 1, price: 198000 },
            { name: "Oversized Breeze Blouse", size: "One Size", quantity: 1, price: 168000 },
        ],
        subtotal: 366000, shippingCost: 0, total: 366000,
        status: "confirmed", createdAt: "2026-07-10T06:15:00Z", updatedAt: "2026-07-10T08:00:00Z",
    },
    {
        id: "JO-20260709-015", customerName: "Amanda Lestari",
        customerPhone: "08345678901", address: "Jl. Gatot Subroto Blok C No. 8",
        city: "Bandung", province: "Jawa Barat", postalCode: "40262", courier: "JNE YES (Express)",
        items: [{ name: "Terracotta Wrap Dress", size: "S", quantity: 1, price: 285000 }],
        subtotal: 285000, shippingCost: 35000, total: 320000,
        status: "shipped", trackingNumber: "JNE0012345678",
        createdAt: "2026-07-09T14:20:00Z", updatedAt: "2026-07-10T09:00:00Z",
    },
    {
        id: "JO-20260708-009", customerName: "Jessica Wulandari",
        customerPhone: "08456789012", address: "Perum Citraland Blok K5 No. 2",
        city: "Surabaya", province: "Jawa Timur", postalCode: "60218", courier: "JNE Reguler",
        items: [{ name: "Classic Linen Shirt", size: "M", quantity: 2, price: 178000 }],
        subtotal: 356000, shippingCost: 0, total: 356000,
        status: "done", trackingNumber: "JNE0009876543",
        createdAt: "2026-07-08T10:00:00Z", updatedAt: "2026-07-10T07:00:00Z",
    },
    {
        id: "JO-20260707-004", customerName: "Dina Pratiwi",
        customerPhone: "08567890123", address: "Komplek Villa Mas No. 7",
        city: "Tangerang", province: "Banten", postalCode: "15111", courier: "SiCepat Reguler",
        items: [{ name: "Flowy Midi Skirt", size: "S", quantity: 1, price: 225000 }],
        subtotal: 225000, shippingCost: 18000, total: 243000,
        status: "cancelled", createdAt: "2026-07-07T09:00:00Z", updatedAt: "2026-07-07T14:00:00Z",
    },
]

export default function AdminOrdersPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
    const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
    const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({})
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem("jo_admin_auth") === "true") setIsAuthenticated(true)
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("jo_admin_auth", "true")
            setIsAuthenticated(true)
        } else setAuthError("Password salah.")
    }

    const handleLogout = () => {
        sessionStorage.removeItem("jo_admin_auth")
        setIsAuthenticated(false)
    }

    const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus, trackingNumber?: string) => {
        setOrders(prev => prev.map(o =>
            o.id === orderId
                ? { ...o, status: newStatus, trackingNumber: trackingNumber ?? o.trackingNumber, updatedAt: new Date().toISOString() }
                : o
        ))
    }, [])

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => setIsRefreshing(false), 800)
    }

    const exportCSV = () => {
        const header = ["ID", "Tanggal", "Nama", "HP", "Kota", "Produk", "Total", "Status", "No Resi"]
        const rows = orders.map(o => [
            o.id, new Date(o.createdAt).toLocaleDateString("id-ID"),
            o.customerName, o.customerPhone, `${o.city}, ${o.province}`,
            o.items.map(i => `${i.name} (${i.size}) x${i.quantity}`).join(" | "),
            o.total, STATUS_CFG[o.status].label, o.trackingNumber ?? "-"
        ])
        const csv = [header, ...rows].map(r => r.join(",")).join("\n")
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `jo-orders-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    const filteredOrders = orders.filter(o => {
        const matchStatus = filterStatus === "all" || o.status === filterStatus
        const q = searchQuery.toLowerCase()
        return matchStatus && (!q || o.id.toLowerCase().includes(q) ||
            o.customerName.toLowerCase().includes(q) || o.customerPhone.includes(q) ||
            o.city.toLowerCase().includes(q))
    })

    const stats = {
        todayRevenue: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString() && o.status !== "cancelled").reduce((s, o) => s + o.total, 0),
        total: orders.length,
        pending: orders.filter(o => o.status === "pending").length,
        shipped: orders.filter(o => o.status === "shipped").length,
    }

    // ── LOGIN ──
    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: "100vh", background: "#fcfcfc", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                <div style={{ width: "100%", maxWidth: "380px" }}>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "16px", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                            <ShoppingBag size={26} color="#1a1a1a" />
                        </div>
                        <h1 style={{ fontFamily: "serif", fontSize: "28px", color: "#1a1a1a", marginBottom: "6px" }}>Julia Owers</h1>
                        <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Admin Dashboard</p>
                    </div>
                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "16px", padding: "32px", boxShadow: "0 8px 30px rgba(0,0,0,0.02)" }}>
                        <form onSubmit={handleLogin}>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Password</label>
                            <input type="password" value={password}
                                onChange={e => { setPassword(e.target.value); setAuthError("") }}
                                placeholder="••••••••••••" autoFocus
                                style={{ width: "100%", background: "#fafafa", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", marginBottom: authError ? "8px" : "20px", transition: "border 0.2s" }} 
                                onFocus={e => e.target.style.borderColor = "#1a1a1a"}
                                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
                            />
                            {authError && <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ef4444", fontSize: "12px", marginBottom: "16px" }}><AlertCircle size={13} /> {authError}</p>}
                            <button type="submit" style={{ width: "100%", height: "48px", background: "#1a1a1a", color: "#fff", borderRadius: "10px", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#333"} onMouseOut={e => e.currentTarget.style.background = "#1a1a1a"}>Masuk ke Dashboard</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    // ── DASHBOARD ──
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#faf9f8" }}>
            <AdminSidebar onLogout={handleLogout} />

            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <header style={{ background: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
                    <div>
                        <h1 style={{ fontFamily: "serif", fontSize: "24px", color: "#1a1a1a", marginBottom: "4px" }}>Manajemen Pesanan</h1>
                        <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>
                            Kelola semua pesanan masuk · <strong style={{ color: "#1a1a1a", fontWeight: 600 }}>{orders.length} total order</strong>
                        </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button onClick={handleRefresh} title="Refresh"
                            style={{ padding: "10px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.08)", background: "#fff", color: "rgba(0,0,0,0.6)", cursor: "pointer", display: "flex", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                            <RefreshCw size={16} style={{ animation: isRefreshing ? "spin 0.8s linear infinite" : "none" }} />
                        </button>
                        <button onClick={exportCSV}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.08)", background: "#fff", color: "#1a1a1a", fontSize: "13px", fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                            <Download size={14} /> Export CSV
                        </button>
                    </div>
                </header>

                <div style={{ padding: "32px", flex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>

                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
                        {[
                            { label: "Revenue Hari Ini", value: `Rp ${stats.todayRevenue.toLocaleString("id-ID")}`, color: "#10b981", icon: <TrendingUp size={18} color="#10b981" /> },
                            { label: "Total Order", value: stats.total, color: "#3b82f6", icon: <ShoppingBag size={18} color="#3b82f6" /> },
                            { label: "Menunggu Konfirmasi", value: stats.pending, color: "#d97706", icon: <Clock size={18} color="#d97706" /> },
                            { label: "Sedang Dikirim", value: stats.shipped, color: "#8b5cf6", icon: <Truck size={18} color="#8b5cf6" /> },
                        ].map(s => (
                            <div key={s.label} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                                    <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                                    <div style={{ padding: "8px", background: `${s.color}15`, borderRadius: "8px" }}>
                                        {s.icon}
                                    </div>
                                </div>
                                <p style={{ fontFamily: typeof s.value === "string" ? "sans-serif" : "sans-serif", fontSize: typeof s.value === "string" ? "20px" : "32px", fontWeight: 700, color: "#1a1a1a", lineHeight: 1 }}>{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filter toolbar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
                        <div style={{ position: "relative", flex: 1, minWidth: "250px", maxWidth: "350px" }}>
                            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)", pointerEvents: "none" }} />
                            <input type="text" placeholder="Cari pesanan..."
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                style={{ width: "100%", paddingLeft: "40px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", fontSize: "14px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }} />
                        </div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {(["all", ...STATUS_FLOW, "cancelled"] as const).map(status => {
                                const active = filterStatus === status
                                const cfg = status !== "all" ? STATUS_CFG[status] : null
                                return (
                                    <button key={status} onClick={() => setFilterStatus(status)}
                                        style={{ padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: active ? 600 : 500, border: `1px solid ${active ? (cfg ? cfg.border : "#1a1a1a") : "rgba(0,0,0,0.06)"}`, cursor: "pointer", background: active ? (cfg ? cfg.bg : "#1a1a1a") : "#fff", color: active ? (cfg ? cfg.color : "#fff") : "rgba(0,0,0,0.6)", transition: "all 0.15s", boxShadow: active ? "none" : "0 2px 5px rgba(0,0,0,0.02)" }}>
                                        {status === "all" ? `Semua (${orders.length})` : STATUS_CFG[status].label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Orders list */}
                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                        {/* Header row */}
                        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr 120px 160px", gap: "16px", padding: "16px 24px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#fafafa", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            <div>ID & Tanggal</div>
                            <div>Pembeli</div>
                            <div>Produk</div>
                            <div style={{ textAlign: "right" }}>Total</div>
                            <div style={{ textAlign: "center" }}>Aksi</div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "80px 24px", color: "rgba(0,0,0,0.4)" }}>
                                <ShoppingBag size={48} style={{ margin: "0 auto 16px", opacity: 0.2 }} />
                                <p style={{ fontSize: "15px" }}>Tidak ada order ditemukan</p>
                            </div>
                        ) : filteredOrders.map(order => {
                            const cfg = STATUS_CFG[order.status]
                            const isExpanded = expandedOrder === order.id
                            const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]

                            return (
                                <div key={order.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                                    {/* Main row */}
                                    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr 120px 160px", gap: "16px", padding: "20px 24px", alignItems: "center", background: isExpanded ? "#fafafa" : "#fff", transition: "background 0.2s" }}>
                                        {/* ID & Date */}
                                        <div>
                                            <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", fontFamily: "monospace", marginBottom: "4px" }}>{order.id}</p>
                                            <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", marginBottom: "8px" }}>
                                                {new Date(order.createdAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
                                                {cfg.label}
                                            </span>
                                        </div>

                                        {/* Pembeli */}
                                        <div>
                                            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>{order.customerName}</p>
                                            <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.6)", marginBottom: "2px" }}>{order.customerPhone}</p>
                                            <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)" }}>{order.city}, {order.province}</p>
                                        </div>

                                        {/* Produk */}
                                        <div>
                                            {order.items.slice(0, 2).map((item, i) => (
                                                <p key={i} style={{ fontSize: "13px", color: "rgba(0,0,0,0.7)", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {item.name} <span style={{ color: "rgba(0,0,0,0.4)" }}>({item.size}) ×{item.quantity}</span>
                                                </p>
                                            ))}
                                            {order.items.length > 2 && <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)", marginTop: "4px" }}>+{order.items.length - 2} produk lain</p>}
                                        </div>

                                        {/* Total */}
                                        <div style={{ textAlign: "right" }}>
                                            <p style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>Rp {(order.total / 1000).toFixed(0)}k</p>
                                            {order.shippingCost > 0 && <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", marginTop: "2px" }}>+ ongkir</p>}
                                        </div>

                                        {/* Aksi */}
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                            {nextStatus && order.status !== "cancelled" && (
                                                <button onClick={() => {
                                                    if (nextStatus === "shipped" && !trackingInputs[order.id]) {
                                                        setExpandedOrder(isExpanded ? null : order.id)
                                                        return
                                                    }
                                                    updateOrderStatus(order.id, nextStatus, trackingInputs[order.id])
                                                }}
                                                    style={{ padding: "8px 14px", borderRadius: "8px", border: "none", fontSize: "12px", fontWeight: 600, color: "#fff", background: "#1a1a1a", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                                                    onMouseOver={e => e.currentTarget.style.background = "#333"} onMouseOut={e => e.currentTarget.style.background = "#1a1a1a"}>
                                                    → {STATUS_CFG[nextStatus].label}
                                                </button>
                                            )}
                                            <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                                style={{ padding: "8px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", background: isExpanded ? "#1a1a1a" : "#fff", color: isExpanded ? "#fff" : "rgba(0,0,0,0.6)", cursor: "pointer", display: "flex", transition: "all 0.2s" }}>
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded detail */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                                                style={{ overflow: "hidden", borderTop: "1px solid rgba(0,0,0,0.06)", background: "#fafafa" }}>
                                                <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px" }}>

                                                    {/* Detail produk */}
                                                    <div>
                                                        <h4 style={{ fontFamily: "serif", fontSize: "16px", color: "#1a1a1a", marginBottom: "16px" }}>Detail Produk</h4>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                                            {order.items.map((item, i) => (
                                                                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px dashed rgba(0,0,0,0.08)", paddingBottom: "8px" }}>
                                                                    <span style={{ color: "rgba(0,0,0,0.7)" }}>{item.name} <span style={{ color: "rgba(0,0,0,0.4)" }}>({item.size}) ×{item.quantity}</span></span>
                                                                    <span style={{ color: "#1a1a1a", fontWeight: 600 }}>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                                                                </div>
                                                            ))}
                                                            <div style={{ paddingTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "rgba(0,0,0,0.6)" }}>
                                                                    <span>Subtotal</span><span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
                                                                </div>
                                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "rgba(0,0,0,0.6)" }}>
                                                                    <span>Ongkir ({order.courier})</span>
                                                                    <span>{order.shippingCost === 0 ? "Gratis" : `Rp ${order.shippingCost.toLocaleString("id-ID")}`}</span>
                                                                </div>
                                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 700, color: "#1a1a1a", marginTop: "8px", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "12px" }}>
                                                                    <span>TOTAL</span><span>Rp {order.total.toLocaleString("id-ID")}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Alamat */}
                                                    <div>
                                                        <h4 style={{ fontFamily: "serif", fontSize: "16px", color: "#1a1a1a", marginBottom: "16px" }}>Pengiriman</h4>
                                                        <p style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1a", marginBottom: "6px" }}>{order.customerName}</p>
                                                        <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)", lineHeight: "1.6" }}>{order.address}</p>
                                                        <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>{order.city}, {order.province} {order.postalCode}</p>
                                                        <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)", marginTop: "6px" }}>{order.customerPhone}</p>
                                                        {order.trackingNumber && (
                                                            <div style={{ marginTop: "16px", padding: "12px 16px", background: "#d1fae5", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
                                                                <p style={{ fontSize: "11px", color: "#047857", marginBottom: "4px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>No. Resi</p>
                                                                <p style={{ fontSize: "15px", fontWeight: 700, color: "#065f46", fontFamily: "monospace" }}>{order.trackingNumber}</p>
                                                            </div>
                                                        )}
                                                        {order.notes && <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)", fontStyle: "italic", marginTop: "12px", padding: "10px", background: "rgba(0,0,0,0.03)", borderRadius: "8px" }}>📝 "{order.notes}"</p>}
                                                    </div>

                                                    {/* Update status */}
                                                    <div>
                                                        <h4 style={{ fontFamily: "serif", fontSize: "16px", color: "#1a1a1a", marginBottom: "16px" }}>Tindakan</h4>

                                                        {(order.status === "processing" || order.status === "confirmed") && (
                                                            <div style={{ marginBottom: "16px" }}>
                                                                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "rgba(0,0,0,0.6)", marginBottom: "8px" }}>Masukkan Resi Pengiriman</label>
                                                                <input type="text" placeholder="Cth: JNE0012345678"
                                                                    value={trackingInputs[order.id] ?? order.trackingNumber ?? ""}
                                                                    onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                                                                    style={{ width: "100%", background: "#fff", border: "1px solid rgba(0,0,0,0.15)", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", color: "#1a1a1a", outline: "none", boxSizing: "border-box" }} />
                                                            </div>
                                                        )}

                                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                            {STATUS_FLOW.filter(s => s !== order.status).map(status => {
                                                                const isNext = status === nextStatus;
                                                                return (
                                                                    <button key={status} onClick={() => updateOrderStatus(order.id, status, trackingInputs[order.id])}
                                                                        style={{ padding: "12px 16px", borderRadius: "8px", border: `1px solid ${isNext ? STATUS_CFG[status].border : "rgba(0,0,0,0.08)"}`, fontSize: "13px", fontWeight: isNext ? 600 : 500, cursor: "pointer", background: isNext ? STATUS_CFG[status].bg : "#fff", color: isNext ? STATUS_CFG[status].color : "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}
                                                                        onMouseOver={e => !isNext && (e.currentTarget.style.background = "#f3f4f6")} onMouseOut={e => !isNext && (e.currentTarget.style.background = "#fff")}>
                                                                        {isNext ? <CheckCircle size={16} /> : <ChevronRight size={14} />}
                                                                        Tandai {STATUS_CFG[status].label}
                                                                    </button>
                                                                )
                                                            })}
                                                            {order.status !== "cancelled" && (
                                                                <button onClick={() => updateOrderStatus(order.id, "cancelled")}
                                                                    style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #fca5a5", fontSize: "13px", fontWeight: 500, cursor: "pointer", background: "#fff", color: "#ef4444", marginTop: "4px" }}>
                                                                    Batalkan Pesanan
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* WA button */}
                                                        <a href={`https://wa.me/${order.customerPhone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(order.customerName)}%2C%20kami%20dari%20Julia%20Owers%20ingin%20mengkonfirmasi%20pesanan%20Anda%20(${order.id}).`}
                                                            target="_blank" rel="noopener noreferrer"
                                                            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", padding: "12px", borderRadius: "8px", border: "1px solid #86efac", color: "#059669", fontSize: "13px", fontWeight: 600, textDecoration: "none", background: "#dcfce7", transition: "background 0.2s" }}
                                                            onMouseOver={e => e.currentTarget.style.background = "#bbf7d0"} onMouseOut={e => e.currentTarget.style.background = "#dcfce7"}>
                                                            💬 Hubungi via WhatsApp
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>

                    <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(0,0,0,0.3)", marginTop: "32px", fontFamily: "serif" }}>
                        Julia Owers Admin Panel · Fashion Linen
                    </p>
                </div>
            </main>
        </div>
    )
}
