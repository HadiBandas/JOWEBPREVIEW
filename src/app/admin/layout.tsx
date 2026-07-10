import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin — Julia Owers",
    robots: "noindex, nofollow", // Jangan diindex search engine
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id">
            <body className="bg-gray-50 antialiased">
                {children}
            </body>
        </html>
    )
}
