"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Package, Plug, Settings, Home, LogOut } from "lucide-react"

const NAV = [
    { href: "/admin", icon: <ShoppingBag size={15} />, label: "Manajemen Pesanan", exact: true },
    { href: "/admin/products", icon: <Package size={15} />, label: "CMS Produk", exact: false },
    { href: "/admin/integrations", icon: <Plug size={15} />, label: "Integrasi Marketing", exact: false },
]

interface AdminSidebarProps {
    onLogout?: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
    const pathname = usePathname()

    const isActive = (href: string, exact: boolean) =>
        exact ? pathname === href : pathname.startsWith(href)

    return (
        <aside style={{
            width: "240px", minWidth: "240px",
            background: "#ffffff", borderRight: "1px solid rgba(0,0,0,0.06)",
            display: "flex", flexDirection: "column",
            position: "sticky", top: 0, height: "100vh", overflow: "auto",
            boxShadow: "1px 0 10px rgba(0,0,0,0.02)"
        }}>
            {/* Brand */}
            <div style={{ padding: "28px 24px", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                <p style={{ fontFamily: "serif", fontSize: "22px", color: "#1a1a1a", marginBottom: "2px" }}>Julia Owers</p>
                <p style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: "16px 12px" }}>
                {NAV.map(item => {
                    const active = isActive(item.href, item.exact)
                    return (
                        <Link key={item.href} href={item.href} style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "12px 14px", borderRadius: "6px",
                            fontSize: "13px", textDecoration: "none", marginBottom: "4px",
                            fontWeight: active ? 600 : 400,
                            background: active ? "rgba(0,0,0,0.03)" : "transparent",
                            color: active ? "#1a1a1a" : "rgba(0,0,0,0.5)",
                            transition: "all 0.15s"
                        }}>
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                })}
                <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 14px", borderRadius: "6px", fontSize: "13px",
                    color: "rgba(0,0,0,0.3)", cursor: "not-allowed", marginBottom: "4px"
                }} title="Segera hadir">
                    <Settings size={15} /> Pengaturan
                </div>
            </nav>

            {/* Bottom */}
            <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                <Link href="/id" target="_blank" style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 14px", borderRadius: "6px", fontSize: "13px",
                    color: "rgba(0,0,0,0.5)", textDecoration: "none", marginBottom: "4px",
                    fontWeight: 500
                }}>
                    <Home size={15} /> Lihat Website
                </Link>
                {onLogout && (
                    <button onClick={onLogout} style={{
                        width: "100%", display: "flex", alignItems: "center", gap: "10px",
                        padding: "12px 14px", borderRadius: "6px", fontSize: "13px",
                        color: "#ef4444", background: "none",
                        border: "none", cursor: "pointer", textAlign: "left",
                        fontWeight: 500
                    }}>
                        <LogOut size={15} /> Keluar
                    </button>
                )}
            </div>
        </aside>
    )
}
