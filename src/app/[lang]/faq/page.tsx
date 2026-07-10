"use client"

import { Container } from "@/components/ui/container"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const faqs = [
    {
        category: "Bahan & Produk",
        questions: [
            {
                q: "Apa itu linen dan apa yang membuatnya istimewa?",
                a: "Linen adalah serat alami yang berasal dari tanaman rami. Ini adalah salah satu kain tertua di dunia — terkenal karena sifatnya yang sejuk, awet, dan ramah lingkungan. Berbeda dari kain sintetis, linen semakin lembut setiap kali dicuci dan sepenuhnya dapat terurai secara alami."
            },
            {
                q: "Apakah linen Anda benar-benar 100% murni?",
                a: "Ya. Semua busana Julia Owers dibuat dari 100% linen Eropa murni. Kami tidak mencampurnya dengan poliester atau serat sintetis apa pun. Yang Anda lihat adalah apa yang Anda dapat — linen asli, tanpa kompromi."
            },
            {
                q: "Mengapa linen mudah kusut?",
                a: "Kerutan alami linen adalah ciri khasnya — tanda bahwa ini kain yang nyata dan hidup. Pandanglah sebagai karakter, bukan cacat. Tampilan yang sedikit kasual itu justru yang membuat linen terasa elegan tanpa perlu usaha. Jika Anda ingin tampil lebih rapi, setrika atau uap saat masih sedikit lembap."
            },
            {
                q: "Berapa lama busana linen bisa bertahan?",
                a: "Dengan perawatan yang baik, busana Julia Owers dirancang untuk bertahan lebih dari lima tahun pemakaian rutin. Banyak pelanggan kami menceritakan busana mereka masih terlihat indah setelah bertahun-tahun. Linen memang semakin baik seiring waktu."
            }
        ]
    },
    {
        category: "Ukuran & Potongan",
        questions: [
            {
                q: "Bagaimana ukuran busana Julia Owers?",
                a: "Busana kami memiliki potongan yang sedikit longgar — dirancang untuk kenyamanan dan kebebasan bergerak. Jika Anda berada di antara dua ukuran, kami biasanya menyarankan memilih ukuran lebih kecil untuk tampilan yang lebih pas, atau tetap pada ukuran asli untuk siluet longgar yang memang dimaksudkan."
            },
            {
                q: "Bisa minta bantuan soal ukuran?",
                a: "Tentu! Kunjungi kami di Heritage Bandung atau Heritage Bintaro untuk sesi pengukuran langsung. Tim kami senang membantu Anda menemukan ukuran yang tepat. Anda juga bisa DM kami di Instagram @juliaowers dengan ukuran tubuh Anda."
            }
        ]
    },
    {
        category: "Pemesanan & Pengiriman",
        questions: [
            {
                q: "Apakah pengiriman ke seluruh Indonesia?",
                a: "Ya! Kami mengirimkan ke seluruh penjuru Indonesia. Pesanan biasanya diproses dalam 1–2 hari kerja dan tiba dalam 3–7 hari kerja tergantung lokasi Anda."
            },
            {
                q: "Ada gratis ongkir?",
                a: "Ada! Kami memberikan gratis ongkir untuk pembelian di atas Rp 500.000. Untuk pembelian di bawah nominal tersebut, biaya pengiriman standar berlaku."
            },
            {
                q: "Bisa ambil pesanan langsung di toko?",
                a: "Bisa! Anda dapat memilih opsi ambil di toko saat checkout — baik di Heritage Bandung maupun Heritage Bintaro. Kami akan memberi tahu Anda begitu pesanan siap diambil."
            }
        ]
    },
    {
        category: "Pengembalian & Penukaran",
        questions: [
            {
                q: "Bagaimana kebijakan pengembalian barang?",
                a: "Kami menerima pengembalian dalam 14 hari sejak barang diterima, dengan syarat busana belum dipakai, belum dicuci, dan label masih terpasang. Produk yang dibeli dengan harga diskon bersifat final. Hubungi kami untuk memulai proses pengembalian."
            },
            {
                q: "Bisa tukar ukuran?",
                a: "Bisa! Penukaran pertama gratis. Cukup hubungi kami atau kunjungi langsung Heritage Bandung atau Heritage Bintaro untuk memproses penukaran Anda."
            }
        ]
    },
    {
        category: "Keberlanjutan",
        questions: [
            {
                q: "Seberapa serius Julia Owers soal keberlanjutan?",
                a: "Kami benar-benar berkomitmen — bukan sekadar jargon. Linen kami menggunakan 60% lebih sedikit air dibanding kapas. Semua produksi berlangsung dalam radius 50 km dari Bandung (mengurangi emisi transportasi hingga 90%), dan kami tidak menggunakan plastik sama sekali dalam kemasan. Kami selalu mencari cara untuk lebih baik lagi."
            },
            {
                q: "Apakah kemasan Anda ramah lingkungan?",
                a: "Ya! Kami menggunakan kertas kraft daur ulang, amplop biodegradable, dan tali katun alami. Tidak ada plastik yang menyentuh pesanan Anda. Bahkan kartu ucapan terima kasih kami pun dicetak di atas kertas daur ulang."
            }
        ]
    }
]

export default function FAQPage() {
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (id: string) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    return (
        <main className="pt-8 pb-24">
            <section className="bg-linen py-16 md:py-24 mb-12">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                            Pertanyaan yang Sering Diajukan
                        </h1>
                        <p className="text-charcoal/60 text-lg">
                            Semua yang perlu Anda ketahui tentang Julia Owers dan busana linen kami.
                        </p>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((category, catIndex) => (
                        <div
                            key={category.category}
                            className="mb-12"
                        >
                            <h2 className="font-serif text-2xl text-charcoal mb-6">
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((item, qIndex) => {
                                    const id = `${catIndex}-${qIndex}`
                                    const isOpen = openItems.includes(id)
                                    return (
                                        <div
                                            key={id}
                                            className="border border-gray-100 rounded-sm overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleItem(id)}
                                                className="w-full flex items-center justify-between p-5 text-left hover:bg-linen/30 transition-colors"
                                            >
                                                <span className="font-medium text-charcoal pr-4">{item.q}</span>
                                                <ChevronDown className={`w-5 h-5 text-earth flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isOpen && (
                                                <div className="px-5 pb-5 text-charcoal/70 leading-relaxed">
                                                    {item.a}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 p-8 bg-linen rounded-sm max-w-xl mx-auto">
                    <p className="text-charcoal/70 mb-4">Masih ada yang ingin ditanyakan?</p>
                    <Link href="/contact" className="text-earth hover:underline font-medium">
                        Hubungi tim kami →
                    </Link>
                </div>
            </Container>
        </main>
    )
}
