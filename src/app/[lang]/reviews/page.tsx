import { Container } from "@/components/ui/container"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const reviews = [
    {
        id: 1,
        name: "Sarah J.",
        location: "Jakarta",
        rating: 5,
        image: "/images/products/1.jpg",
        text: "Kualitas linennya benar-benar tak tertandingi. Gaun ini sudah saya cuci belasan kali dan rasanya makin lembut. Ini bukan sekadar baju — ini teman lama."
    },
    {
        id: 2,
        name: "Michelle T.",
        location: "Bali",
        rating: 5,
        image: "/images/products/2.jpg",
        text: "Akhirnya ada brand yang paham iklim tropis! Sejuk, elegan, dan setiap kali saya pakai selalu ada yang bertanya ini baju dari mana."
    },
    {
        id: 3,
        name: "Amanda L.",
        location: "Singapura",
        rating: 5,
        image: "/images/hero.png",
        text: "Potongannya pas banget untuk postur saya yang mungil. Panduan ukuran mereka akurat. Pengiriman ke Singapura juga lebih cepat dari perkiraan."
    },
    {
        id: 4,
        name: "Rina S.",
        location: "Bandung",
        rating: 5,
        image: "/images/products/3.jpg",
        text: "Bangga banget ada brand lokal Bandung sekelas ini. Detail jahitannya rapi banget, kerasa premiumnya. Sudah beli tiga kali dan selalu puas."
    },
    {
        id: 5,
        name: "Jessica W.",
        location: "Surabaya",
        rating: 4,
        image: "/images/products/4.jpg",
        text: "Suka banget sama pilihan warna earth tone-nya. Beli set terracotta dan hasilnya persis seperti foto. Pasti akan beli lagi."
    },
    {
        id: 6,
        name: "Dewi P.",
        location: "Jakarta",
        rating: 5,
        image: null,
        text: "Tim customer service-nya sangat membantu waktu saya mau tukar ukuran. Prosesnya mudah dan cepat. Sangat direkomendasikan."
    }
]

export default function ReviewsPage() {
    return (
        <main className="pt-24 pb-24">
            <div className="bg-linen-light py-20 text-center mb-16 px-6">
                <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">
                    Kata Mereka
                </h1>
                <p className="text-charcoal/60 max-w-2xl mx-auto text-lg leading-relaxed">
                    Cerita nyata dari perempuan yang memakai Julia Owers — pengalaman sehari-hari, bukan naskah iklan.
                </p>
            </div>

            <Container>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-100 pb-16 mb-16 text-center">
                    <div>
                        <span className="block text-4xl font-serif text-charcoal mb-2">4.9/5</span>
                        <span className="text-xs uppercase tracking-widest text-charcoal/50">Rata-rata Penilaian</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-serif text-charcoal mb-2">1.200+</span>
                        <span className="text-xs uppercase tracking-widest text-charcoal/50">Pelanggan Puas</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-serif text-charcoal mb-2">98%</span>
                        <span className="text-xs uppercase tracking-widest text-charcoal/50">Akan Merekomendasikan</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-serif text-charcoal mb-2">24/7</span>
                        <span className="text-xs uppercase tracking-widest text-charcoal/50">Layanan Pelanggan</span>
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="break-inside-avoid bg-white border border-gray-100 p-8 hover:shadow-lg transition-shadow"
                        >
                            {review.image && (
                                <div className="mb-6 relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                    <Image src={review.image} alt={review.name} fill className="object-cover" />
                                </div>
                            )}

                            <div className="flex text-earth mb-4">
                                {[...Array(review.rating)].map((_, r) => (
                                    <Star key={r} size={14} className="fill-current" />
                                ))}
                            </div>

                            <Quote className="text-charcoal/10 w-8 h-8 mb-4 transform rotate-180" />

                            <p className="text-charcoal/80 text-lg italic leading-relaxed mb-6 font-serif">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                                <div>
                                    <h4 className="font-bold text-sm text-charcoal uppercase tracking-wider">{review.name}</h4>
                                    <span className="text-xs text-charcoal/40">{review.location}</span>
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    Pembeli Terverifikasi
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-24 text-center bg-charcoal text-white py-16 px-6">
                    <h2 className="font-serif text-3xl mb-4">Sudah pernah berbelanja di sini?</h2>
                    <p className="text-white/60 mb-8 max-w-md mx-auto">
                        Kami ingin mendengar cerita Anda. Tag kami di Instagram @juliaowers atau kirim ulasan untuk mendapatkan diskon 10% untuk pembelian berikutnya.
                    </p>
                    <button className="border border-white px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors">
                        Tulis Ulasan
                    </button>
                </div>
            </Container>
        </main>
    )
}
