import { Container } from "@/components/ui/container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function SustainabilityPage() {
    return (
        <main className="pt-24 pb-24">
            {/* Editorial Header */}
            <div className="bg-linen-light pt-20 pb-12 mb-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-earth mb-4">
                                Masa Depan yang Lebih Baik
                            </span>
                            <h1 className="font-serif text-5xl md:text-7xl text-charcoal leading-none">
                                Etis <br />Sejak Awal
                            </h1>
                        </div>
                        <p className="text-charcoal/60 text-lg leading-relaxed max-w-md pb-2">
                            Kami tidak sekadar membuat pakaian. Kami membuat pilihan — di setiap helai benang, setiap kancing, dan setiap kemasan yang kami gunakan.
                        </p>
                    </div>
                </Container>
            </div>

            {/* Commitments Grid */}
            <section className="mb-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
                        {[
                            { title: "Bahan Alami", desc: "100% linen Eropa dan benang Tencel yang dapat terurai secara alami." },
                            { title: "Tanpa Plastik", desc: "Kemasan dari pati singkong dan kertas daur ulang — tidak ada plastik yang menyentuh pesanan Anda." },
                            { title: "Produksi Terbatas", desc: "Dibuat dalam jumlah kecil untuk menghindari penumpukan stok dan pemborosan." },
                            { title: "Upah yang Adil", desc: "Setiap penjahit di Bandung kami mendapat upah yang layak dan kondisi kerja yang baik." },
                            { title: "Dekat dari Sumbernya", desc: "Sekitar 80% rantai pasok kami berada dalam radius 50 km dari studio kami." },
                            { title: "Program Perbaikan", desc: "Perbaikan gratis seumur hidup busana Anda. Karena pakaian yang baik layak dijaga." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-12 hover:bg-linen-light transition-colors group">
                                <span className="block text-earth font-serif text-xl mb-4">0{i + 1}</span>
                                <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:underline decoration-earth underline-offset-4 decoration-1">{item.title}</h3>
                                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* The Linen Story - Split */}
            <section className="mb-24">
                <Container>
                    <div className="bg-charcoal text-white grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-12 lg:p-24 flex flex-col justify-center">
                            <h2 className="font-serif text-4xl mb-6">Mengapa Linen?</h2>
                            <div className="space-y-6 text-white/70 leading-relaxed">
                                <p>
                                    Linen adalah salah satu kain paling ramah lingkungan di dunia. Ia berasal dari tanaman rami yang tumbuh tanpa irigasi buatan dan hampir tanpa pestisida.
                                </p>
                                <p>
                                    Lebih dari sekadar ramah lingkungan, linen juga sangat tahan lama. Makin sering dicuci, makin lembut rasanya. Dengan perawatan yang baik, ia bisa bertahan puluhan tahun. Secara alami, linen bersifat antibakteri, tahan ngengat, dan sepenuhnya dapat terurai.
                                </p>
                            </div>
                            <div className="mt-12">
                                <Link href="/shop" className="inline-flex items-center gap-2 border-b border-white pb-1 hover:text-earth hover:border-earth transition-colors">
                                    Lihat Koleksi Linen <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative min-h-[400px] lg:min-h-auto bg-gray-800">
                            <Image src="/images/product-1.png" alt="Tanaman Rami" fill className="object-cover opacity-80" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ Minimal */}
            <section className="pb-24">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="font-serif text-3xl text-charcoal text-center mb-12">Yang Sering Ditanyakan</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Dari mana linen Anda berasal?</AccordionTrigger>
                                <AccordionContent>
                                    Kami mendapatkan serat rami dari pertanian bersertifikat di Normandy, Prancis — salah satu penghasil linen terbaik di dunia. Serat kemudian ditenun di pabrik bertenaga surya sebelum tiba di tangan kami.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Apakah kemasan Anda bebas plastik?</AccordionTrigger>
                                <AccordionContent>
                                    Ya, sepenuhnya. Kami menggunakan kantong singkong (yang larut dalam air panas) dan amplop dari kertas daur ulang. Bahkan stiker kami berbahan dasar kedelai.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Apakah Anda menggunakan pewarna kimia?</AccordionTrigger>
                                <AccordionContent>
                                    Kami menggunakan pewarna berdampak rendah bersertifikat OEKO-TEX, bebas bahan kimia berbahaya dan logam berat — aman untuk kulit Anda dan tidak mencemari sumber air.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </Container>
            </section>
        </main>
    )
}
