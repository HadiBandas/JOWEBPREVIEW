"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plug, Save, RefreshCw, AlertCircle, Check } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

const ADMIN_PASSWORD = "juliaowers2026"

interface Integrations {
    ga4Id: string
    metaPixelId: string
    tiktokPixelId: string
    gtmId: string
    searchConsoleCode: string
    enableGA4: boolean
    enableMeta: boolean
    enableTiktok: boolean
    enableGTM: boolean
}

const DEFAULT_CONFIG: Integrations = {
    ga4Id: "",
    metaPixelId: "",
    tiktokPixelId: "",
    gtmId: "",
    searchConsoleCode: "",
    enableGA4: false,
    enableMeta: false,
    enableTiktok: false,
    enableGTM: false,
}

export default function IntegrationsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")
    
    const [config, setConfig] = useState<Integrations>(DEFAULT_CONFIG)
    const [isSaving, setIsSaving] = useState(false)
    const [savedFeedback, setSavedFeedback] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem("jo_admin_auth") === "true") {
            setIsAuthenticated(true)
            // Load from localStorage
            const saved = localStorage.getItem("jo_integrations")
            if (saved) {
                try {
                    setConfig(JSON.parse(saved))
                } catch (e) {
                    console.error("Failed to parse config", e)
                }
            }
        }
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

    const updateConfig = (field: keyof Integrations, value: string | boolean) => {
        setConfig(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        setIsSaving(true)
        // Simulate API delay
        setTimeout(() => {
            localStorage.setItem("jo_integrations", JSON.stringify(config))
            setIsSaving(false)
            setSavedFeedback(true)
            
            // Dispatch custom event to notify layout.tsx
            window.dispatchEvent(new Event("jo_integrations_updated"))
            
            setTimeout(() => setSavedFeedback(false), 2000)
        }, 600)
    }

    // ── LOGIN ──
    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: "100vh", background: "#fcfcfc", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                <div style={{ width: "100%", maxWidth: "380px" }}>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "16px", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                            <Plug size={26} color="#1a1a1a" />
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
                                style={{ width: "100%", background: "#fafafa", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", marginBottom: authError ? "8px" : "16px", transition: "border 0.2s" }} 
                                onFocus={e => e.target.style.borderColor = "#1a1a1a"}
                                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                            {authError && <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ef4444", fontSize: "12px", marginBottom: "16px" }}><AlertCircle size={13} /> {authError}</p>}
                            <button type="submit" style={{ width: "100%", height: "48px", background: "#1a1a1a", color: "#fff", borderRadius: "10px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#333"} onMouseOut={e => e.currentTarget.style.background = "#1a1a1a"}>Masuk ke Dashboard</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const inpStyle: React.CSSProperties = {
        width: "100%", background: "#fafafa", 
        border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", 
        padding: "10px 14px", fontSize: "13px", color: "#1a1a1a", 
        outline: "none", boxSizing: "border-box", fontFamily: "monospace",
        transition: "border 0.2s"
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#faf9f8" }}>
            <AdminSidebar onLogout={handleLogout} />

            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <header style={{ background: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
                    <div>
                        <h1 style={{ fontFamily: "serif", fontSize: "24px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>Integrasi Marketing</h1>
                        <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>
                            Kelola Google Analytics, Meta Pixel, TikTok Pixel & SEO
                        </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <motion.button onClick={handleSave} disabled={isSaving}
                            animate={{ background: savedFeedback ? "#10b981" : "#1a1a1a" }}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, color: "#fff", cursor: isSaving ? "not-allowed" : "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                            {isSaving ? <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> : savedFeedback ? <Check size={14} /> : <Save size={14} />}
                            {isSaving ? "Menyimpan..." : savedFeedback ? "✓ Tersimpan!" : "Simpan Konfigurasi"}
                        </motion.button>
                    </div>
                </header>

                <div style={{ padding: "32px", flex: 1, maxWidth: "1200px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
                        
                        {/* Google Analytics 4 */}
                        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                                <div>
                                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>Google Analytics 4</h3>
                                    <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Track traffic & user behavior</p>
                                </div>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                    <span style={{ fontSize: "12px", fontWeight: 500, color: config.enableGA4 ? "#059669" : "rgba(0,0,0,0.4)" }}>{config.enableGA4 ? "Aktif" : "Nonaktif"}</span>
                                    <div style={{ width: "40px", height: "24px", background: config.enableGA4 ? "#10b981" : "#e5e7eb", borderRadius: "12px", position: "relative", transition: "all 0.2s", border: "1px solid rgba(0,0,0,0.05)" }}>
                                        <div style={{ width: "18px", height: "18px", background: "#fff", borderRadius: "50%", position: "absolute", top: "2px", left: config.enableGA4 ? "19px" : "3px", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
                                    </div>
                                    <input type="checkbox" checked={config.enableGA4} onChange={e => updateConfig("enableGA4", e.target.checked)} style={{ display: "none" }} />
                                </label>
                            </div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Measurement ID</label>
                            <input value={config.ga4Id} onChange={e => updateConfig("ga4Id", e.target.value)} placeholder="G-XXXXXXXXXX" style={inpStyle} onFocus={e => e.target.style.borderColor = "#1a1a1a"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                            <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", marginTop: "8px" }}>Format: G- diikuti huruf & angka</p>
                        </div>

                        {/* Meta Pixel */}
                        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                                <div>
                                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>Meta (Facebook) Pixel</h3>
                                    <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Track konversi FB/IG Ads</p>
                                </div>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                    <span style={{ fontSize: "12px", fontWeight: 500, color: config.enableMeta ? "#059669" : "rgba(0,0,0,0.4)" }}>{config.enableMeta ? "Aktif" : "Nonaktif"}</span>
                                    <div style={{ width: "40px", height: "24px", background: config.enableMeta ? "#10b981" : "#e5e7eb", borderRadius: "12px", position: "relative", transition: "all 0.2s", border: "1px solid rgba(0,0,0,0.05)" }}>
                                        <div style={{ width: "18px", height: "18px", background: "#fff", borderRadius: "50%", position: "absolute", top: "2px", left: config.enableMeta ? "19px" : "3px", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
                                    </div>
                                    <input type="checkbox" checked={config.enableMeta} onChange={e => updateConfig("enableMeta", e.target.checked)} style={{ display: "none" }} />
                                </label>
                            </div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Pixel ID</label>
                            <input value={config.metaPixelId} onChange={e => updateConfig("metaPixelId", e.target.value)} placeholder="123456789012345" style={inpStyle} onFocus={e => e.target.style.borderColor = "#1a1a1a"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                            <div style={{ marginTop: "16px", padding: "12px", background: "#fafafa", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.04)" }}>
                                <p style={{ fontSize: "12px", fontWeight: 500, color: "#1a1a1a" }}>Events yang otomatis ditrack:</p>
                                <ul style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)", paddingLeft: "16px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <li>ViewContent (Lihat Produk)</li>
                                    <li>AddToCart (Tambah ke Keranjang)</li>
                                    <li>Purchase (Selesai Pembayaran)</li>
                                </ul>
                            </div>
                        </div>

                        {/* TikTok Pixel */}
                        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                                <div>
                                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>TikTok Pixel</h3>
                                    <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Track konversi TikTok Ads</p>
                                </div>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                    <span style={{ fontSize: "12px", fontWeight: 500, color: config.enableTiktok ? "#059669" : "rgba(0,0,0,0.4)" }}>{config.enableTiktok ? "Aktif" : "Nonaktif"}</span>
                                    <div style={{ width: "40px", height: "24px", background: config.enableTiktok ? "#10b981" : "#e5e7eb", borderRadius: "12px", position: "relative", transition: "all 0.2s", border: "1px solid rgba(0,0,0,0.05)" }}>
                                        <div style={{ width: "18px", height: "18px", background: "#fff", borderRadius: "50%", position: "absolute", top: "2px", left: config.enableTiktok ? "19px" : "3px", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
                                    </div>
                                    <input type="checkbox" checked={config.enableTiktok} onChange={e => updateConfig("enableTiktok", e.target.checked)} style={{ display: "none" }} />
                                </label>
                            </div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Pixel ID</label>
                            <input value={config.tiktokPixelId} onChange={e => updateConfig("tiktokPixelId", e.target.value)} placeholder="CAXXXXXXXXXXXXXXX" style={inpStyle} onFocus={e => e.target.style.borderColor = "#1a1a1a"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                        </div>

                        {/* Google Tag Manager */}
                        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                                <div>
                                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>Google Tag Manager</h3>
                                    <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Untuk integrasi advanced script</p>
                                </div>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                    <span style={{ fontSize: "12px", fontWeight: 500, color: config.enableGTM ? "#059669" : "rgba(0,0,0,0.4)" }}>{config.enableGTM ? "Aktif" : "Nonaktif"}</span>
                                    <div style={{ width: "40px", height: "24px", background: config.enableGTM ? "#10b981" : "#e5e7eb", borderRadius: "12px", position: "relative", transition: "all 0.2s", border: "1px solid rgba(0,0,0,0.05)" }}>
                                        <div style={{ width: "18px", height: "18px", background: "#fff", borderRadius: "50%", position: "absolute", top: "2px", left: config.enableGTM ? "19px" : "3px", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
                                    </div>
                                    <input type="checkbox" checked={config.enableGTM} onChange={e => updateConfig("enableGTM", e.target.checked)} style={{ display: "none" }} />
                                </label>
                            </div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Container ID</label>
                            <input value={config.gtmId} onChange={e => updateConfig("gtmId", e.target.value)} placeholder="GTM-XXXXXX" style={inpStyle} onFocus={e => e.target.style.borderColor = "#1a1a1a"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                        </div>

                        {/* Google Search Console */}
                        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "28px", gridColumn: "1 / -1", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>Google Search Console Verification</h3>
                            <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", marginBottom: "20px" }}>Untuk verifikasi kepemilikan website di Google</p>
                            
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>HTML Tag Verification Code</label>
                            <input value={config.searchConsoleCode} onChange={e => updateConfig("searchConsoleCode", e.target.value)} placeholder="<meta name='google-site-verification' content='...' />" style={{ ...inpStyle, fontFamily: "monospace" }} onFocus={e => e.target.style.borderColor = "#1a1a1a"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                            <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", marginTop: "8px" }}>Copy paste meta tag lengkap dari Google Search Console di sini.</p>
                        </div>
                        
                    </div>
                    
                    <div style={{ marginTop: "32px", padding: "20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#166534", marginBottom: "8px" }}>ℹ️ Catatan Implementasi:</h4>
                        <p style={{ fontSize: "13px", color: "#15803d", lineHeight: "1.6" }}>
                            Data integrasi saat ini disimpan menggunakan <strong>localStorage</strong> untuk keperluan demonstrasi (mock). 
                            Script tracking analytics secara dinamis di-inject ke website melalui <code>layout.tsx</code> saat halaman dimuat. 
                            <br/><br/>
                            Untuk environment production sungguhan, Tim IT harus menyimpan variabel ini di database server / environment variables agar lebih aman dan persistent.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
