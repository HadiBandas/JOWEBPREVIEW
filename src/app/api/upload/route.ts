import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Bersihkan nama file agar aman
        const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uniqueFilename = `${Date.now()}-${filename}`;

        // Pastikan folder public/uploads ada
        const uploadDir = join(process.cwd(), "public", "uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Abaikan jika folder sudah ada
        }

        // Simpan file ke public/uploads/
        const path = join(uploadDir, uniqueFilename);
        await writeFile(path, buffer);

        // Kembalikan URL publik untuk gambar
        const imageUrl = `/uploads/${uniqueFilename}`;

        return NextResponse.json({ success: true, url: imageUrl });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, error: "Failed to upload file" }, { status: 500 });
    }
}
