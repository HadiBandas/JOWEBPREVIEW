import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { ArrowUpRight } from "lucide-react"

export default async function ShopIndexPage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang);
    const isEn = lang === "en";

    const categories = [
        {
            id: "tops",
            title: isEn ? "Tops" : "Atasan",
            subtitle: isEn ? "Blouses & Shirts" : "Kemeja & Blus",
            image: "/images/collections/Collection 1.jpg", // Dummy mapping
        },
        {
            id: "bottoms",
            title: isEn ? "Bottoms" : "Bawahan",
            subtitle: isEn ? "Trousers & Skirts" : "Celana & Rok",
            image: "/images/collections/Collection 2.jpg",
        },
        {
            id: "dresses",
            title: isEn ? "Dresses" : "Terusan",
            subtitle: isEn ? "Dresses & Jumpsuits" : "Gaun & Jumpsuit",
            image: "/images/collections/Collection 3.jpg",
        },
        {
            id: "outerwear",
            title: isEn ? "Outerwear" : "Luaran",
            subtitle: isEn ? "Blazers & Cardigans" : "Blazer & Kardigan",
            image: "/images/collections/Collection 4.jpg",
        }
    ];

    return (
        <main className="pt-24 pb-0 bg-white">
            {/* HERO SECTION */}
            <div className="relative h-[60vh] w-full bg-gray-100 flex items-center justify-center mb-20">
                <Image
                    src="/images/hero.jpg"
                    alt="Shop Collection"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 bg-charcoal/20" />
                <div className="relative z-10 text-center text-white px-6 mt-16">
                    <h1 className="font-serif text-5xl md:text-7xl mb-4 drop-shadow-md">
                        {dictionary.shop.title}
                    </h1>
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em] opacity-90 drop-shadow-sm">
                        {isEn ? "Curated 100% Linen Essentials" : "Esensial Linen 100% Terkurasi"}
                    </p>
                </div>
            </div>

            <Container>
                {/* MACRO CATEGORIES GRID */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                            {isEn ? "Explore by Category" : "Eksplorasi per Kategori"}
                        </h2>
                        <p className="text-charcoal/60">
                            {isEn ? "Find your perfect linen piece." : "Temukan potongan linen sempurna Anda."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                        {categories.map((cat) => (
                            <Link
                                href={`/${lang}/shop/c/${cat.id}`}
                                key={cat.id}
                                className="group relative h-[400px] lg:h-[500px] overflow-hidden bg-gray-100 flex items-end p-8"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                
                                <div className="relative z-10 w-full flex items-end justify-between text-white">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
                                            {cat.subtitle}
                                        </p>
                                        <h3 className="font-serif text-3xl md:text-4xl">
                                            {cat.title}
                                        </h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-charcoal transition-colors">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </Container>

            {/* CURATED COLLECTION (EDITORIAL) */}
            <section className="py-24 bg-linen-light/50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <span className="text-earth text-xs font-bold uppercase tracking-widest mb-4 block">
                                {isEn ? "Curated Edit" : "Koleksi Terkurasi"}
                            </span>
                            <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-6 leading-tight">
                                {isEn ? "The Summer Essentials" : "Koleksi Musim Panas"}
                            </h2>
                            <p className="text-charcoal/70 leading-relaxed mb-8 text-lg">
                                {isEn 
                                    ? "Breathable, lightweight, and effortlessly chic. Discover our handpicked selection of pieces designed for the warmest days." 
                                    : "Nyaman, ringan, dan elegan. Temukan pilihan potongan linen yang dirancang khusus untuk hari-hari tercerah."}
                            </p>
                            <Link
                                href={`/${lang}/shop/collection/summer-essentials`}
                                className="inline-flex items-center gap-2 border-b border-charcoal pb-1 text-sm font-medium hover:text-earth hover:border-earth transition-colors"
                            >
                                {isEn ? "View Collection" : "Lihat Koleksi"} <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4">
                            <div className="relative aspect-[3/4] bg-gray-200 mt-12">
                                <Image src="/images/collections/Collection 2.jpg" alt="Summer 1" fill className="object-cover" />
                            </div>
                            <div className="relative aspect-[3/4] bg-gray-200 mb-12">
                                <Image src="/images/collections/Collection 3.jpg" alt="Summer 2" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
