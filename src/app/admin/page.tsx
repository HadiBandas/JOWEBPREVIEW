"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Package, CheckCircle, Clock, Truck,
    Download, RefreshCw,
    X, Search, TrendingUp, ShoppingBag, Eye, LogOut, Package2, Settings
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────
// KONFIGURASI ADMIN
// Ganti password ini dengan environment variable di server
// process.env.ADMIN_PASSWORD
// ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "juliaowers2026"

// ─────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────
type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "done" | "cancelled"

interface OrderItem {
    name: string
    size: string
    quantity: number
    price: number
}

interface Order {
    id: string
    customerName: string
    customerPhone: string
    customerEmail?: string
    address: string
    city: string
    province: string
    postalCode: string
    courier: string
    notes?: string
    items: OrderItem[]
    subtotal: number
    shippingCost: number
    total: number
    status: OrderStatus
    trackingNumber?: string
    createdAt: string
    updatedAt: string
}

// ─────────────────────────────────────────────────────────────────
// STATUS CONFIG
// ─────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    pending:    { label: "Menunggu",  color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",  icon: <Clock size={12} /> },
    confirmed:  { label: "Dikonfirmasi", color: "text-blue-700", bg: "bg-blue-50 border-blue-200",   icon: <CheckCircle size={12} /> },
    processing: { label: "Diproses",  color: "text-purple-700", bg: "bg-purple-50 border-purple-200", icon: <Package size={12} /> },
    shipped:    { label: "Dikirim",   color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: <Truck size={12} /> },
    done:       { label: "Selesai",   color: "text-gray-600",   bg: "bg-gray-50 border-gray-200",    icon: <CheckCircle size={12} /> },
    cancelled:  { label: "Dibatal",   color: "text-red-700",    bg: "bg-red-50 border-red-200",      icon: <X size={12} /> },
}

const STATUS_FLOW: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "done"]

// ─────────────────────────────────────────────────────────────────
// MOCK DATA — Tim IT ganti ini dengan fetch dari database server
//
// Contoh cara fetch dari server:
// const res = await fetch('/api/admin/orders', {
//   headers: { 'Authorization': `Bearer ${token}` }
// })
// const orders = await res.json()
// ─────────────────────────────────────────────────────────────────
const MOCK_ORDERS: Order[] = [
    {
        id: "JO-20260710-001",
        customerName: "Sarah Dewi Kusuma",
        customerPhone: "08123456789",
        customerEmail: "sarah@email.com",
        address: "Jl. Sudirman No. 12, RT 03/05",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        postalCode: "12190",
        courier: "JNE Reguler",
        notes: "",
        items: [{ name: "The Minimalist Midi Dress", size: "M", quantity: 1, price: 262000 }],
        subtotal: 262000, shippingCost: 0, total: 262000,
        status: "pending",
        createdAt: "2026-07-10T07:30:00Z",
        updatedAt: "2026-07-10T07:30:00Z",
    },
    {
        id: "JO-20260710-002",
        customerName: "Rina Kartika",
        customerPhone: "08234567890",
        address: "Jl. Raya Bogor No. 45",
        city: "Bogor",
        province: "Jawa Barat",
        postalCode: "16161",
        courier: "J&T Reguler",
        items: [
            { name: "Relaxed Wide Leg Trousers", size: "L", quantity: 1, price: 198000 },
            { name: "Oversized Breeze Blouse", size: "One Size", quantity: 1, price: 168000 },
        ],
        subtotal: 366000, shippingCost: 0, total: 366000,
        status: "confirmed",
        createdAt: "2026-07-10T06:15:00Z",
        updatedAt: "2026-07-10T08:00:00Z",
    },
    {
        id: "JO-20260709-015",
        customerName: "Amanda Lestari",
        customerPhone: "08345678901",
        address: "Jl. Gatot Subroto Blok C No. 8",
        city: "Bandung",
        province: "Jawa Barat",
        postalCode: "40262",
        courier: "JNE YES (Express)",
        items: [{ name: "Terracotta Wrap Dress", size: "S", quantity: 1, price: 285000 }],
        subtotal: 285000, shippingCost: 35000, total: 320000,
        status: "shipped",
        trackingNumber: "JNE0012345678",
        createdAt: "2026-07-09T14:20:00Z",
        updatedAt: "2026-07-10T09:00:00Z",
    },
    {
        id: "JO-20260708-009",
        customerName: "Jessica Wulandari",
        customerPhone: "08456789012",
        address: "Perum Citraland Blok K5 No. 2",
        city: "Surabaya",
        province: "Jawa Timur",
        postalCode: "60218",
        courier: "JNE Reguler",
        items: [{ name: "Classic Linen Shirt", size: "M", quantity: 2, price: 178000 }],
        subtotal: 356000, shippingCost: 0, total: 356000,
        status: "done",
        trackingNumber: "JNE0009876543",
        createdAt: "2026-07-08T10:00:00Z",
        updatedAt: "2026-07-10T07:00:00Z",
    },
]

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
    const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
    const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({})
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Cek session login
    useEffect(() => {
        const auth = sessionStorage.getItem("jo_admin_auth")
        if (auth === "true") setIsAuthenticated(true)
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("jo_admin_auth", "true")
            setIsAuthenticated(true)
        } else {
            setAuthError("Password salah. Coba lagi.")
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("jo_admin_auth")
        setIsAuthenticated(false)
    }

    // ──────────────────────────────────────────────────────────────
    // UPDATE STATUS ORDER
    // TODO Tim IT: Ganti dengan API call ke server database
    // PUT /api/admin/orders/:id { status, trackingNumber }
    // ──────────────────────────────────────────────────────────────
    const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus, trackingNumber?: string) => {
        setOrders(prev => prev.map(o =>
            o.id === orderId
                ? { ...o, status: newStatus, trackingNumber: trackingNumber ?? o.trackingNumber, updatedAt: new Date().toISOString() }
                : o
        ))
    }, [])

    // ──────────────────────────────────────────────────────────────
    // REFRESH DATA
    // TODO Tim IT: Fetch ulang dari server database
    // ──────────────────────────────────────────────────────────────
    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => setIsRefreshing(false), 800)
        // TODO: fetch('/api/admin/orders').then(r => r.json()).then(setOrders)
    }

    // ──────────────────────────────────────────────────────────────
    // EXPORT CSV
    // ──────────────────────────────────────────────────────────────
    const exportCSV = () => {
        const header = ["ID", "Tanggal", "Nama", "HP", "Kota", "Produk", "Total", "Status", "No Resi"]
        const rows = orders.map(o => [
            o.id,
            new Date(o.createdAt).toLocaleDateString("id-ID"),
            o.customerName,
            o.customerPhone,
            `${o.city}, ${o.province}`,
            o.items.map(i => `${i.name} (${i.size}) x${i.quantity}`).join(" | "),
            o.total,
            STATUS_CONFIG[o.status].label,
            o.trackingNumber ?? "-"
        ])
        const csv = [header, ...rows].map(r => r.join(",")).join("\n")
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `julia-owers-orders-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    // Filter & search
    const filteredOrders = orders.filter(o => {
        const matchStatus = filterStatus === "all" || o.status === filterStatus
        const q = searchQuery.toLowerCase()
        const matchSearch = !q || o.id.toLowerCase().includes(q) ||
            o.customerName.toLowerCase().includes(q) ||
            o.customerPhone.includes(q) ||
            o.city.toLowerCase().includes(q)
        return matchStatus && matchSearch
    })

    // Stats
    const stats = {
        todayRevenue: orders
            .filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString() && o.status !== "cancelled")
            .reduce((sum, o) => sum + o.total, 0),
        totalOrders: orders.length,
        pendingCount: orders.filter(o => o.status === "pending").length,
        shippedCount: orders.filter(o => o.status === "shipped").length,
    }

    // ─── LOGIN PAGE ───
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white w-full max-w-sm p-8"
                >
                    <div className="text-center mb-8">
                        <h1 className="font-serif text-2xl text-gray-900 mb-1">Julia Owers</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Admin Dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium uppercase tracking-widest text-gray-500 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setAuthError("") }}
                                placeholder="Masukkan password admin"
                                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-900"
                                autoFocus
                            />
                            {authError && (
                                <p className="mt-2 text-xs text-red-500">{authError}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 bg-gray-900 text-white font-medium uppercase tracking-widest text-sm hover:bg-gray-700 transition-colors"
                        >
                            Masuk
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    // ─── DASHBOARD ───
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div>
                    <h1 className="font-serif text-xl text-gray-900">Julia Owers</h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Admin Dashboard</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        className={`p-2 text-gray-400 hover:text-gray-700 transition-colors ${isRefreshing ? "animate-spin" : ""}`}
                        title="Refresh data"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition-colors"
                    >
                        <Download size={14} />
                        Export CSV
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <LogOut size={14} />
                        Keluar
                    </button>
                </div>
            </div>

            {/* CMS Navigation Tabs */}
            <div className="bg-white border-b border-gray-100 px-6">
                <div className="flex gap-1 max-w-7xl mx-auto">
                    <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-gray-900 text-gray-900 -mb-px">
                        <ShoppingBag size={15} />
                        Pesanan
                    </button>
                    <Link href="/admin/products"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors -mb-px">
                        <Package2 size={15} />
                        CMS Produk
                    </Link>
                    <span className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 cursor-not-allowed" title="Segera hadir">
                        <Settings size={15} />
                        Pengaturan
                    </span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Revenue Hari Ini", value: `Rp ${stats.todayRevenue.toLocaleString("id-ID")}`, icon: <TrendingUp size={18} className="text-emerald-500" /> },
                        { label: "Total Order", value: stats.totalOrders, icon: <ShoppingBag size={18} className="text-blue-500" /> },
                        { label: "Menunggu Konfirmasi", value: stats.pendingCount, icon: <Clock size={18} className="text-amber-500" /> },
                        { label: "Sedang Dikirim", value: stats.shippedCount, icon: <Truck size={18} className="text-purple-500" /> },
                    ].map(stat => (
                        <div key={stat.label} className="bg-white p-5 border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
                                {stat.icon}
                            </div>
                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filter & Search */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari nama, nomor HP, ID order, kota..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2 flex-wrap">
                        {(["all", ...STATUS_FLOW, "cancelled"] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-2 text-xs font-medium uppercase tracking-wider border transition-colors ${filterStatus === status
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                                    }`}
                            >
                                {status === "all" ? `Semua (${orders.length})` : STATUS_CONFIG[status].label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white border border-gray-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <div className="col-span-3">ID & Tanggal</div>
                        <div className="col-span-3">Pembeli</div>
                        <div className="col-span-3">Produk</div>
                        <div className="col-span-1 text-right">Total</div>
                        <div className="col-span-2 text-center">Aksi</div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <ShoppingBag size={40} className="mx-auto mb-3 opacity-30" />
                            <p>Tidak ada order ditemukan</p>
                        </div>
                    ) : (
                        <div>
                            {filteredOrders.map(order => {
                                const status = STATUS_CONFIG[order.status]
                                const isExpanded = expandedOrder === order.id
                                const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]

                                return (
                                    <div key={order.id} className="border-b border-gray-50 last:border-0">
                                        {/* Row */}
                                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors">
                                            {/* ID & Date */}
                                            <div className="col-span-3">
                                                <p className="font-mono text-xs font-semibold text-gray-900">{order.id}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {new Date(order.createdAt).toLocaleString("id-ID", {
                                                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                                                    })}
                                                </p>
                                                <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 text-[10px] font-medium border rounded-full ${status.bg} ${status.color}`}>
                                                    {status.icon}
                                                    {status.label}
                                                </span>
                                            </div>

                                            {/* Pembeli */}
                                            <div className="col-span-3">
                                                <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                                <p className="text-xs text-gray-400">{order.customerPhone}</p>
                                                <p className="text-xs text-gray-400">{order.city}, {order.province}</p>
                                            </div>

                                            {/* Produk */}
                                            <div className="col-span-3">
                                                {order.items.slice(0, 2).map((item, i) => (
                                                    <p key={i} className="text-xs text-gray-600 leading-relaxed">
                                                        {item.name} ({item.size}) ×{item.quantity}
                                                    </p>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <p className="text-xs text-gray-400">+{order.items.length - 2} produk lain</p>
                                                )}
                                            </div>

                                            {/* Total */}
                                            <div className="col-span-1 text-right">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Rp {(order.total / 1000).toFixed(0)}k
                                                </p>
                                            </div>

                                            {/* Aksi */}
                                            <div className="col-span-2 flex items-center justify-end gap-2">
                                                {/* Tombol Next Status */}
                                                {nextStatus && order.status !== "cancelled" && (
                                                    <button
                                                        onClick={() => {
                                                            if (nextStatus === "shipped" && !trackingInputs[order.id]) {
                                                                setExpandedOrder(order.id === expandedOrder ? null : order.id)
                                                                return
                                                            }
                                                            updateOrderStatus(order.id, nextStatus, trackingInputs[order.id])
                                                        }}
                                                        className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-gray-700 transition-colors whitespace-nowrap"
                                                    >
                                                        {STATUS_CONFIG[nextStatus].label}
                                                    </button>
                                                )}

                                                {/* Detail Toggle */}
                                                <button
                                                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                                    className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                                                    title="Detail"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded Detail */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
                                                >
                                                    <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        {/* Detail Pesanan */}
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Detail Produk</h4>
                                                            <div className="space-y-2">
                                                                {order.items.map((item, i) => (
                                                                    <div key={i} className="flex justify-between text-sm">
                                                                        <span className="text-gray-600">{item.name} ({item.size}) ×{item.quantity}</span>
                                                                        <span className="font-medium text-gray-900">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                                                                    </div>
                                                                ))}
                                                                <div className="border-t border-gray-200 pt-2 space-y-1">
                                                                    <div className="flex justify-between text-xs text-gray-500">
                                                                        <span>Subtotal</span><span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-xs text-gray-500">
                                                                        <span>Ongkir ({order.courier})</span>
                                                                        <span>{order.shippingCost === 0 ? "Gratis" : `Rp ${order.shippingCost.toLocaleString("id-ID")}`}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-sm font-bold text-gray-900">
                                                                        <span>Total</span><span>Rp {order.total.toLocaleString("id-ID")}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Alamat */}
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Alamat Pengiriman</h4>
                                                            <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                                            <p className="text-sm text-gray-600">{order.address}</p>
                                                            <p className="text-sm text-gray-600">{order.city}, {order.province} {order.postalCode}</p>
                                                            <p className="text-sm text-gray-600 mt-1">{order.customerPhone}</p>
                                                            {order.notes && (
                                                                <p className="text-xs text-gray-400 italic mt-2">📝 {order.notes}</p>
                                                            )}
                                                        </div>

                                                        {/* Aksi Detail */}
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Update Status</h4>

                                                            {/* Input No Resi (untuk shipped) */}
                                                            {(order.status === "processing" || order.status === "shipped") && (
                                                                <div className="mb-3">
                                                                    <label className="block text-xs text-gray-500 mb-1">Nomor Resi</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Cth: JNE0012345678"
                                                                        value={trackingInputs[order.id] ?? order.trackingNumber ?? ""}
                                                                        onChange={e => setTrackingInputs(prev => ({
                                                                            ...prev, [order.id]: e.target.value
                                                                        }))}
                                                                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                                                                    />
                                                                </div>
                                                            )}

                                                            {/* Status Buttons */}
                                                            <div className="space-y-2">
                                                                {STATUS_FLOW.filter(s => s !== order.status).map(status => (
                                                                    <button
                                                                        key={status}
                                                                        onClick={() => updateOrderStatus(order.id, status, trackingInputs[order.id])}
                                                                        className={`w-full py-2 text-xs font-medium uppercase tracking-wider border transition-colors flex items-center justify-center gap-1
                                                                            ${status === nextStatus
                                                                                ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-700"
                                                                                : "border-gray-200 text-gray-500 hover:border-gray-400"
                                                                            }`}
                                                                    >
                                                                        {STATUS_CONFIG[status].icon}
                                                                        {STATUS_CONFIG[status].label}
                                                                    </button>
                                                                ))}
                                                                {order.status !== "cancelled" && (
                                                                    <button
                                                                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                                                                        className="w-full py-2 text-xs font-medium uppercase tracking-wider border border-red-200 text-red-400 hover:border-red-500 hover:text-red-600 transition-colors"
                                                                    >
                                                                        Batalkan Order
                                                                    </button>
                                                                )}
                                                            </div>

                                                            {/* WhatsApp Hubungi Pembeli */}
                                                            <a
                                                                href={`https://wa.me/${order.customerPhone.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(order.customerName)}%2C%20kami%20dari%20Julia%20Owers...`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="mt-3 w-full py-2 text-xs font-medium uppercase tracking-wider border border-green-200 text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center gap-1"
                                                            >
                                                                💬 Hubungi via WA
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
                    )}
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 mt-8">
                    Data sementara menggunakan mock data. Tim IT — hubungkan ke API server untuk data real.
                </p>
            </div>
        </div>
    )
}
