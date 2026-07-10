# 🔧 Panduan Setup Payment Gateway — Tim IT Julia Owers

**Dokumen ini untuk Tim IT** yang akan mengintegrasikan payment gateway ke website Julia Owers.
Semua "slot" sudah disiapkan di kode. Tim IT hanya perlu mengisi bagian yang bertanda `TODO`.

---

## 1. Lokasi File yang Perlu Diubah Tim IT

| File | Yang Perlu Diubah |
|---|---|
| `src/app/[lang]/checkout/page.tsx` | Fungsi `handleSubmit` — ganti WA dengan Midtrans |
| `src/app/api/orders/route.ts` | Koneksi database & WhatsApp notifikasi |
| `src/app/admin/page.tsx` | Fungsi `updateOrderStatus` — koneksi ke database |
| `.env.example` → `.env.local` | Isi semua API keys |

---

## 2. Setup Midtrans (Payment Gateway)

### Langkah 1: Daftar Akun Midtrans
1. Buka **https://midtrans.com** → Daftar Business Account
2. Lengkapi verifikasi dokumen bisnis (NPWP, rekening bank, KTP)
3. Setelah approved, masuk ke **Dashboard Midtrans → Settings → Access Keys**
4. Salin **Server Key** dan **Client Key**

### Langkah 2: Set Environment Variables
```bash
# Di .env.local
MIDTRANS_SERVER_KEY=Mid-server-XXXXXX       # dari dashboard
MIDTRANS_CLIENT_KEY=Mid-client-XXXXXX       # dari dashboard
MIDTRANS_IS_PRODUCTION=false                # false dulu untuk testing
```

### Langkah 3: Install Midtrans Library
```bash
cd julia-owers-app
npm install midtrans-client
```

### Langkah 4: Buat API Route untuk Create Transaction
Buat file: `src/app/api/payment/create/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import midtransClient from "midtrans-client"

const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.MIDTRANS_CLIENT_KEY!,
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { customer, items, totals, orderId } = body

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: totals.total,
        },
        customer_details: {
            first_name: customer.name,
            phone: customer.phone,
            email: customer.email || "",
        },
        item_details: items.map((item: any) => ({
            id: item.productId,
            price: item.price,
            quantity: item.quantity,
            name: `${item.name} (${item.size})`,
        })),
        shipping_address: {
            address: customer.address,
            city: customer.city,
        },
    }

    try {
        const transaction = await snap.createTransaction(parameter)
        return NextResponse.json({ token: transaction.token })
    } catch (error) {
        return NextResponse.json({ error: "Gagal membuat transaksi" }, { status: 500 })
    }
}
```

### Langkah 5: Buat Webhook untuk Konfirmasi Pembayaran
Buat file: `src/app/api/payment/webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
    const body = await request.json()
    
    // Verifikasi signature dari Midtrans
    const signatureKey = crypto
        .createHash("sha512")
        .update(`${body.order_id}${body.status_code}${body.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
        .digest("hex")
    
    if (signatureKey !== body.signature_key) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }
    
    // Update status order di database
    if (body.transaction_status === "settlement" || body.transaction_status === "capture") {
        // TODO: db.query("UPDATE orders SET status='paid', paid_at=NOW() WHERE id=?", [body.order_id])
        
        // Kirim notifikasi WhatsApp ke buyer
        // TODO: sendWhatsApp(customerPhone, `Pembayaran #${body.order_id} berhasil!`)
        
        // Kirim notifikasi ke admin
        // TODO: sendWhatsApp(process.env.WA_BUSINESS_NUMBER, `Order baru lunas: #${body.order_id}`)
    }
    
    return NextResponse.json({ status: "ok" })
}
```

### Langkah 6: Update Checkout Page (Ganti WA dengan Midtrans)
Di `src/app/[lang]/checkout/page.tsx`, **ganti fungsi `handleSubmit`**:

```typescript
// GANTI ini:
const handleSubmit = async () => {
    // ... kode WA yang ada sekarang
}

// DENGAN ini:
const handleSubmit = async () => {
    if (!validate()) return
    setIsSubmitting(true)
    
    try {
        // 1. Simpan order ke database dulu
        const orderRes = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer: form,
                items,
                shipping: SHIPPING_OPTIONS.find(s => s.id === selectedShipping),
                totals: { subtotal, shippingCost, total }
            })
        })
        const { orderId } = await orderRes.json()
        
        // 2. Buat transaksi Midtrans → dapat token
        const payRes = await fetch("/api/payment/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customer: form, items, totals: { total }, orderId })
        })
        const { token } = await payRes.json()
        
        // 3. Buka Midtrans Snap popup
        window.snap.pay(token, {
            onSuccess: () => {
                clearCart()
                router.push(`/${lang}/order/success?id=${orderId}`)
            },
            onPending: () => {
                router.push(`/${lang}/order/pending?id=${orderId}`)
            },
            onError: () => {
                alert("Pembayaran gagal. Silakan coba lagi.")
                setIsSubmitting(false)
            },
        })
    } catch (error) {
        console.error(error)
        alert("Terjadi kesalahan. Silakan coba lagi.")
        setIsSubmitting(false)
    }
}
```

### Langkah 7: Tambahkan Midtrans Script di Layout
Di `src/app/[lang]/layout.tsx`, tambahkan di dalam `<head>`:

```tsx
<Script
    src={`https://app${process.env.MIDTRANS_IS_PRODUCTION === 'true' ? '' : '.sandbox'}.midtrans.com/snap/snap.js`}
    data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
    strategy="lazyOnload"
/>
```

### Langkah 8: Set Webhook URL di Dashboard Midtrans
- Masuk Dashboard Midtrans → Settings → Configuration
- Set **Payment Notification URL**: `https://juliaowers.com/api/payment/webhook`
- Setelah go-live, ganti sandbox URL dengan production URL

---

## 3. Setup WhatsApp Notifikasi Otomatis (via Fonnte)

### Langkah 1: Daftar di Fonnte
1. Buka **https://fonnte.com**
2. Daftar akun → Hubungkan nomor WhatsApp Business
3. Dapatkan **API Token**

### Langkah 2: Buat Helper Function
Buat file: `src/lib/whatsapp.ts`

```typescript
export async function sendWhatsApp(to: string, message: string) {
    const response = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
            "Authorization": process.env.FONNTE_TOKEN!,
        },
        body: new URLSearchParams({
            target: to,
            message: message,
        })
    })
    return response.json()
}
```

### Langkah 3: Gunakan di Webhook
```typescript
import { sendWhatsApp } from "@/lib/whatsapp"

// Saat payment berhasil:
await sendWhatsApp(customerPhone, 
    `✅ Pembayaran lunas!\n\nPesanan #${orderId} sedang kami proses.\nEstimasi pengiriman 1-3 hari kerja.\n\nTerima kasih sudah belanja di Julia Owers! 🙏`
)

await sendWhatsApp(process.env.WA_BUSINESS_NUMBER!,
    `🛍️ ORDER BARU LUNAS!\n\nID: ${orderId}\nNama: ${customerName}\nTotal: Rp ${total.toLocaleString("id-ID")}\n\nBuka admin: https://juliaowers.com/admin`
)
```

---

## 4. Setup Database (Server Sendiri)

Jalankan file `DATABASE_SCHEMA.sql` di database server:

```bash
# MySQL / MariaDB
mysql -u root -p julia_owers_db < DATABASE_SCHEMA.sql

# PostgreSQL (perlu adaptasi syntax)
psql -U postgres -d julia_owers_db -f DATABASE_SCHEMA.sql
```

Lalu update `src/app/api/orders/route.ts` dengan koneksi database yang sesuai.

---

## 5. Testing Midtrans (Sandbox)

Nomor kartu test Midtrans:
| Kartu | Nomor | CVV | Expiry |
|---|---|---|---|
| Visa (success) | 4811 1111 1111 1114 | 123 | 01/25 |
| Mastercard (success) | 5211 1111 1111 1117 | 123 | 01/25 |
| GoPay simulator | Buka Simulator di Dashboard Midtrans | | |

---

## 6. Checklist Go-Live

- [ ] Dokumen bisnis Midtrans diverifikasi
- [ ] Ganti `MIDTRANS_IS_PRODUCTION=false` → `true`
- [ ] Ganti semua `sandbox` URL ke production URL
- [ ] Set Webhook URL production di Dashboard Midtrans
- [ ] Ganti nomor WA placeholder `6281234567890` di checkout page
- [ ] Test 1 transaksi nyata sebelum announce ke publik

---

*Dokumen ini dibuat: 10 Juli 2026 | Untuk: Tim IT Julia Owers*
