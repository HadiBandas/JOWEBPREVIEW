@echo off
title Julia Owers CMS Server
echo ===================================================
echo   Menjalankan Server CMS Julia Owers...
echo ===================================================
echo.

:: Pindah ke folder script ini berada
cd /d "%~dp0"

:: Jalankan server Next.js di window CMD baru agar terminal ini tidak stuck
start "Node Server - Julia Owers" cmd /c "npm run dev"

echo Server sedang dijalankan (membuka port 3000)...
echo Menunggu 8 detik sebelum membuka browser...
timeout /t 8 /nobreak >nul

:: Buka browser ke halaman CMS
echo Membuka halaman CMS Produk...
start http://localhost:3000/admin/products

echo.
echo Selesai! Anda bisa menutup jendela hitam ini.
echo (Biarkan jendela Node Server tetap terbuka selama Anda mengelola CMS)
timeout /t 5 >nul
