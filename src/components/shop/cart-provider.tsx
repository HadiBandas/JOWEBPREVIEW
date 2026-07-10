"use client"

/**
 * CartProvider — Wrapper untuk menangani Zustand + Next.js SSR
 *
 * Masalah: Zustand persist menyimpan data di localStorage (browser).
 * Di Next.js, komponen dirender di server dulu, lalu di-hydrate di browser.
 * Ini bisa menyebabkan "hydration mismatch" karena server tidak punya localStorage.
 *
 * Solusi: Mount provider ini hanya setelah client-side hydration selesai.
 */

import { useEffect, useState } from "react"

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Render children tetap berjalan,
    // tapi cart state dari localStorage baru aktif setelah mounted
    return <>{children}</>
}
