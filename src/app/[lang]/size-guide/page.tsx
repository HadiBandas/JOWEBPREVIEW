import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const sizeChart = {
    tops: {
        headers: ["Ukuran", "Lingkar Dada (cm)", "Lingkar Pinggang (cm)", "Panjang (cm)"],
        rows: [
            ["XS", "86–90", "66–70", "62"],
            ["S", "90–94", "70–74", "64"],
            ["M", "94–98", "74–78", "66"],
            ["L", "98–104", "78–84", "68"],
            ["XL", "104–110", "84–90", "70"],
        ]
    },
    dresses: {
        headers: ["Ukuran", "Lingkar Dada (cm)", "Lingkar Pinggang (cm)", "Lingkar Pinggul (cm)", "Panjang (cm)"],
        rows: [
            ["XS", "86–90", "66–70", "92–96", "110"],
            ["S", "90–94", "70–74", "96–100", "112"],
            ["M", "94–98", "74–78", "100–104", "114"],
            ["L", "98–104", "78–84", "104–110", "116"],
            ["XL", "104–110", "84–90", "110–116", "118"],
        ]
    },
    bottoms: {
        headers: ["Ukuran", "Lingkar Pinggang (cm)", "Lingkar Pinggul (cm)", "Panjang (cm)"],
        rows: [
            ["S", "66–70", "92–96", "100"],
            ["M", "70–74", "96–100", "102"],
            ["L", "74–80", "100–106", "104"],
            ["XL", "80–86", "106–112", "106"],
        ]
    }
}

export default function SizeGuidePage() {
    return (
        <main className="pt-8 pb-24">
            <section className="bg-linen py-16 md:py-24 mb-12">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                            Panduan Ukuran
                        </h1>
                        <p className="text-charcoal/60 text-lg">
                            Temukan ukuran yang tepat untuk Anda. Busana kami memiliki potongan yang sedikit longgar — dirancang untuk kenyamanan dan kebebasan bergerak.
                        </p>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* How to Measure */}
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal mb-6">Cara Mengukur</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-linen/50 rounded-sm">
                                <h3 className="font-medium text-charcoal mb-2">Lingkar Dada</h3>
                                <p className="text-sm text-charcoal/60">Ukur pada bagian dada yang paling penuh, dengan pita ukur sejajar lantai.</p>
                            </div>
                            <div className="p-6 bg-linen/50 rounded-sm">
                                <h3 className="font-medium text-charcoal mb-2">Lingkar Pinggang</h3>
                                <p className="text-sm text-charcoal/60">Ukur pada bagian pinggang alami Anda — titik yang paling sempit di badan.</p>
                            </div>
                            <div className="p-6 bg-linen/50 rounded-sm">
                                <h3 className="font-medium text-charcoal mb-2">Lingkar Pinggul</h3>
                                <p className="text-sm text-charcoal/60">Ukur pada bagian pinggul yang paling penuh, sekitar 20 cm di bawah pinggang.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tops */}
                    <div className="mb-12">
                        <h2 className="font-serif text-2xl text-charcoal mb-6">Atasan & Blus</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-charcoal text-white">
                                        {sizeChart.tops.headers.map((h) => (
                                            <th key={h} className="px-4 py-3 text-left text-sm font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizeChart.tops.rows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-linen/30" : "bg-white"}>
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-4 py-3 text-sm text-charcoal/70">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Dresses */}
                    <div className="mb-12">
                        <h2 className="font-serif text-2xl text-charcoal mb-6">Gaun</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-charcoal text-white">
                                        {sizeChart.dresses.headers.map((h) => (
                                            <th key={h} className="px-4 py-3 text-left text-sm font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizeChart.dresses.rows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-linen/30" : "bg-white"}>
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-4 py-3 text-sm text-charcoal/70">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bottoms */}
                    <div className="mb-12">
                        <h2 className="font-serif text-2xl text-charcoal mb-6">Celana & Rok</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-charcoal text-white">
                                        {sizeChart.bottoms.headers.map((h) => (
                                            <th key={h} className="px-4 py-3 text-left text-sm font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizeChart.bottoms.rows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-linen/30" : "bg-white"}>
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-4 py-3 text-sm text-charcoal/70">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Fit Tips */}
                    <div className="bg-earth/10 p-8 rounded-sm">
                        <h2 className="font-serif text-2xl text-charcoal mb-4">Tips Memilih Ukuran</h2>
                        <ul className="space-y-3 text-charcoal/70">
                            <li>• Busana kami dirancang dengan potongan yang sedikit longgar dan nyaman</li>
                            <li>• Jika berada di antara dua ukuran, pilih yang lebih kecil untuk tampilan lebih pas</li>
                            <li>• Linen memiliki kelenturan alami dan akan mengikuti bentuk tubuh Anda seiring waktu</li>
                            <li>• Untuk hasil terbaik, kami menyarankan untuk mencoba langsung di Heritage Bandung atau Heritage Bintaro</li>
                        </ul>
                        <div className="mt-6">
                            <Button asChild className="bg-charcoal hover:bg-charcoal/90 rounded-sm">
                                <Link href="/stores">Kunjungi Toko</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}
