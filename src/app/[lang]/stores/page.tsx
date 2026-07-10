import { Container } from "@/components/ui/container"
import Link from "next/link"
import Image from "next/image"

export default function StoresPage() {
    return (
        <main className="pt-24 pb-0">
            <div className="bg-linen-light py-24">
                <Container className="text-center">
                    <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">Toko Kami</h1>
                    <p className="text-charcoal/60 max-w-xl mx-auto text-lg">
                        Rasakan langsung tekstur linennya, coba potongannya, dan temui tim kami. Beberapa hal memang lebih baik dialami sendiri.
                    </p>
                </Container>
            </div>

            {/* Store 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                <div className="relative h-[50vh] lg:h-auto bg-gray-200">
                    <Image src="/images/stores/Bandung.jpg" alt="Heritage Bandung" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-12 lg:p-24 bg-white">
                    <span className="text-xs font-bold uppercase tracking-widest text-earth mb-4">Toko Utama</span>
                    <h2 className="font-serif text-4xl text-charcoal mb-6">Heritage Bandung</h2>
                    <p className="text-charcoal/60 text-lg mb-8 leading-relaxed max-w-md">
                        Rumah asal Julia Owers. Sebuah ruang yang tenang dan lega, dirancang untuk dieksplorasi — bukan sekadar berbelanja.
                    </p>
                    <div className="space-y-4 text-charcoal mb-12">
                        <p>Jl. L.L.RE Martadinata No.63-65<br />Bandung, Jawa Barat</p>
                        <p>Buka setiap hari: 09.00 – 21.00</p>
                    </div>
                    <div>
                        <a
                            href="https://www.google.com/maps/place/Heritage+Factory+Outlet+Bandung/@-6.8929597,107.608603,14.25z/data=!4m6!3m5!1s0x2e68e7a9315b2d1b:0xb8676a4d9785064b!8m2!3d-6.9056141!4d107.6171392!16s%2Fg%2F11fmc4tvbd?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-charcoal px-8 py-3 text-sm font-medium hover:bg-charcoal hover:text-white transition-all"
                        >
                            Lihat Peta
                        </a>
                    </div>
                </div>
            </div>

            {/* Store 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                <div className="flex flex-col justify-center p-12 lg:p-24 bg-charcoal text-white order-2 lg:order-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Gerai Kedua</span>
                    <h2 className="font-serif text-4xl mb-6">Heritage Bintaro</h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-md">
                        Semangat Bandung kini hadir di Tangerang Selatan. Terletak di dalam kawasan Heritage Bintaro Junction yang ramai dan hidup.
                    </p>
                    <div className="space-y-4 text-white/80 mb-12">
                        <p>Heritage Bintaro Junction<br />Bintaro Jaya, Tangerang Selatan</p>
                        <p>Buka setiap hari: 10.00 – 22.00</p>
                    </div>
                    <div>
                        <a
                            href="https://maps.app.goo.gl/CwJXpTxELeucXBDNA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-charcoal transition-all"
                        >
                            Lihat Peta
                        </a>
                    </div>
                </div>
                <div className="relative h-[50vh] lg:h-auto bg-gray-300 order-1 lg:order-2">
                    <Image src="/images/stores/Bintaro.jpg" alt="Heritage Bintaro" fill className="object-cover" />
                </div>
            </div>
        </main>
    )
}
