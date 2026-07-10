import { NextRequest, NextResponse } from "next/server"

// ═══════════════════════════════════════════════════════════════════
// API ROUTES — ORDERS
// Path: /api/orders
//
// FILE INI ADALAH STUB KOSONG untuk Tim IT
//
// Tim IT perlu:
// 1. Pilih database (MySQL / PostgreSQL / MongoDB sesuai server)
// 2. Install driver: npm install mysql2 / pg / mongoose
// 3. Ganti TODO sections di bawah dengan koneksi database asli
// 4. Set environment variables di server (lihat .env.example)
//
// Struktur endpoint:
//   GET    /api/orders          → ambil semua order (admin)
//   POST   /api/orders          → buat order baru (checkout)
//   GET    /api/orders/:id      → detail satu order
//   PATCH  /api/orders/:id      → update status + resi (admin)
// ═══════════════════════════════════════════════════════════════════

// ──────────────────────────────────────────
// TODO TIM IT: Import dan setup koneksi DB
// Contoh untuk MySQL:
// import mysql from 'mysql2/promise'
// const db = mysql.createPool({ host, user, password, database })
//
// Contoh untuk PostgreSQL:
// import { Pool } from 'pg'
// const db = new Pool({ connectionString: process.env.DATABASE_URL })
//
// Contoh untuk MongoDB:
// import mongoose from 'mongoose'
// await mongoose.connect(process.env.MONGODB_URI)
// ──────────────────────────────────────────

// ─── GET /api/orders ─── (untuk admin dashboard)
export async function GET(request: NextRequest) {
    // Verifikasi admin token / session
    const adminToken = request.headers.get("x-admin-token")
    if (adminToken !== process.env.ADMIN_SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        // TODO TIM IT: Ganti dengan query ke database
        // Contoh MySQL:
        // const [rows] = await db.query(`
        //   SELECT o.*, GROUP_CONCAT(oi.name) as items
        //   FROM orders o
        //   LEFT JOIN order_items oi ON o.id = oi.order_id
        //   GROUP BY o.id
        //   ORDER BY o.created_at DESC
        // `)
        // return NextResponse.json(rows)

        // Sementara return mock data
        return NextResponse.json({
            success: true,
            message: "TODO: Hubungkan ke database server",
            orders: []
        })
    } catch (error) {
        console.error("Error fetching orders:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

// ─── POST /api/orders ─── (buat order baru dari checkout)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validasi data yang masuk
        const { customer, shipping, items, totals } = body

        if (!customer?.name || !customer?.phone || !shipping?.address) {
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 })
        }

        // Generate order ID
        const orderId = `JO-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Date.now().toString().slice(-4)}`

        // TODO TIM IT: Simpan ke database
        // Contoh MySQL:
        // await db.query(`
        //   INSERT INTO orders (id, customer_name, customer_phone, customer_email,
        //     address_detail, city, province, postal_code, courier, shipping_cost,
        //     subtotal, total, status, created_at)
        //   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
        // `, [orderId, customer.name, customer.phone, customer.email,
        //     shipping.address, shipping.city, shipping.province, shipping.postalCode,
        //     shipping.courier, totals.shippingCost, totals.subtotal, totals.total])
        //
        // for (const item of items) {
        //   await db.query(`
        //     INSERT INTO order_items (order_id, product_id, product_name, size, quantity, price)
        //     VALUES (?, ?, ?, ?, ?, ?)
        //   `, [orderId, item.productId, item.name, item.size, item.quantity, item.price])
        // }

        // TODO TIM IT: Kirim notifikasi WhatsApp otomatis
        // Setelah order tersimpan, panggil Fonnte API:
        // await fetch('https://api.fonnte.com/send', {
        //   method: 'POST',
        //   headers: { 'Authorization': process.env.FONNTE_TOKEN },
        //   body: JSON.stringify({
        //     target: process.env.WA_BUSINESS_NUMBER,
        //     message: `🛍️ Order baru #${orderId} dari ${customer.name}...`
        //   })
        // })

        return NextResponse.json({
            success: true,
            orderId,
            message: "Order diterima"
        })

    } catch (error) {
        console.error("Error creating order:", error)
        return NextResponse.json({ error: "Gagal membuat order" }, { status: 500 })
    }
}
