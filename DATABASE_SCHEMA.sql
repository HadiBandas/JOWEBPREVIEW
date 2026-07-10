-- ═══════════════════════════════════════════════════════════════
-- DATABASE SCHEMA — Julia Owers E-Commerce
-- 
-- Compatible dengan: MySQL 8+ / MariaDB 10.5+ / PostgreSQL 14+
-- 
-- CARA PAKAI:
-- 1. Buat database baru: CREATE DATABASE julia_owers_db;
-- 2. Jalankan file ini: mysql -u root -p julia_owers_db < DATABASE_SCHEMA.sql
-- 3. Set credentials di .env.local
-- ═══════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────
-- TABEL: orders
-- Menyimpan setiap transaksi pemesanan
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
    id                   VARCHAR(30)  PRIMARY KEY,   -- Format: JO-20260710-0001
    
    -- Info Pembeli
    customer_name        VARCHAR(150) NOT NULL,
    customer_phone       VARCHAR(20)  NOT NULL,
    customer_email       VARCHAR(150) NULL,
    
    -- Alamat Pengiriman
    address_detail       TEXT         NOT NULL,
    city                 VARCHAR(100) NOT NULL,
    province             VARCHAR(100) NOT NULL,
    postal_code          VARCHAR(10)  NOT NULL,
    
    -- Pengiriman
    courier              VARCHAR(50)  NOT NULL,       -- JNE_REG, JNE_YES, JNT_REG
    shipping_cost        INT          NOT NULL DEFAULT 0,
    tracking_number      VARCHAR(50)  NULL,           -- Diisi saat paket dikirim
    
    -- Catatan
    notes                TEXT         NULL,
    
    -- Keuangan
    subtotal             INT          NOT NULL,       -- dalam Rupiah
    total                INT          NOT NULL,       -- subtotal + shipping_cost
    
    -- Status Pesanan
    -- pending      = Pesanan masuk, belum dikonfirmasi
    -- confirmed    = Admin sudah konfirmasi
    -- processing   = Sedang dikemas
    -- shipped      = Sudah dikirim
    -- done         = Pesanan selesai
    -- cancelled    = Dibatalkan
    status               ENUM('pending', 'confirmed', 'processing', 'shipped', 'done', 'cancelled')
                         NOT NULL DEFAULT 'pending',
    
    -- ────────────────────────────────────────────
    -- PAYMENT GATEWAY (kosongkan dulu, tim IT isi
    -- setelah Midtrans disetup)
    -- ────────────────────────────────────────────
    payment_method       VARCHAR(50)  NULL,           -- GOPAY, BANK_TRANSFER, dll
    payment_status       ENUM('unpaid', 'paid', 'failed', 'refunded')
                         NOT NULL DEFAULT 'unpaid',
    midtrans_order_id    VARCHAR(100) NULL UNIQUE,    -- ID dari Midtrans
    midtrans_tx_id       VARCHAR(100) NULL,           -- Transaction ID dari Midtrans
    paid_at              DATETIME     NULL,           -- Waktu pembayaran berhasil
    -- ────────────────────────────────────────────
    
    -- Timestamps
    created_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ───────────────────────────────────────────────
-- TABEL: order_items
-- Detail produk dalam setiap order
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
    id                   INT          AUTO_INCREMENT PRIMARY KEY,
    order_id             VARCHAR(30)  NOT NULL,
    
    product_id           VARCHAR(20)  NOT NULL,      -- ID dari data.ts
    product_name         VARCHAR(200) NOT NULL,
    product_slug         VARCHAR(200) NOT NULL,
    size                 VARCHAR(20)  NOT NULL,
    quantity             INT          NOT NULL DEFAULT 1,
    unit_price           INT          NOT NULL,      -- Harga satuan saat order
    subtotal             INT          NOT NULL,      -- unit_price × quantity
    product_image        VARCHAR(300) NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id)
);

-- ───────────────────────────────────────────────
-- TABEL: products (Opsional)
-- Jika ingin kelola produk dari database
-- (Saat ini produk hardcoded di src/lib/data.ts)
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    id                   VARCHAR(20)  PRIMARY KEY,
    name                 VARCHAR(200) NOT NULL,
    slug                 VARCHAR(200) NOT NULL UNIQUE,
    price                INT          NOT NULL,
    currency             VARCHAR(5)   NOT NULL DEFAULT 'IDR',
    category             VARCHAR(50)  NULL,
    sub_category         VARCHAR(50)  NULL,
    description          TEXT         NULL,
    material             VARCHAR(200) NULL,
    image_main           VARCHAR(300) NULL,
    image_hover          VARCHAR(300) NULL,
    is_active            TINYINT(1)   NOT NULL DEFAULT 1,
    stock_total          INT          NOT NULL DEFAULT 0,
    created_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ───────────────────────────────────────────────
-- TABEL: product_variants
-- Stok per ukuran
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_variants (
    id                   INT          AUTO_INCREMENT PRIMARY KEY,
    product_id           VARCHAR(20)  NOT NULL,
    size                 VARCHAR(20)  NOT NULL,
    stock                INT          NOT NULL DEFAULT 0,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_size (product_id, size)
);

-- ───────────────────────────────────────────────
-- INDEX untuk performa query dashboard admin
-- ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created     ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_phone       ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_payment     ON orders(payment_status);

-- ───────────────────────────────────────────────
-- VIEWS berguna untuk admin dashboard
-- ───────────────────────────────────────────────

-- View: Ringkasan order dengan total item
CREATE OR REPLACE VIEW v_order_summary AS
SELECT
    o.*,
    COUNT(oi.id)        AS item_count,
    GROUP_CONCAT(
        CONCAT(oi.product_name, ' (', oi.size, ') ×', oi.quantity)
        SEPARATOR ' | '
    ) AS items_summary
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id
ORDER BY o.created_at DESC;

-- ───────────────────────────────────────────────
-- QUERY BERGUNA untuk admin dashboard
-- (Copy-paste untuk keperluan laporan)
-- ───────────────────────────────────────────────

-- Revenue hari ini:
-- SELECT SUM(total) as revenue_hari_ini, COUNT(*) as jumlah_order
-- FROM orders WHERE DATE(created_at) = CURDATE() AND status != 'cancelled';

-- Revenue bulan ini:
-- SELECT SUM(total) as revenue_bulan_ini FROM orders
-- WHERE MONTH(created_at) = MONTH(NOW()) AND status != 'cancelled';

-- Produk paling laris:
-- SELECT product_name, SUM(quantity) as total_terjual, SUM(subtotal) as revenue
-- FROM order_items oi JOIN orders o ON oi.order_id = o.id
-- WHERE o.status != 'cancelled'
-- GROUP BY product_name ORDER BY total_terjual DESC LIMIT 10;

-- Order pending (perlu ditindak):
-- SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at ASC;
