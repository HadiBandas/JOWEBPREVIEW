"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowLeft, ArrowUpRight, ShoppingBag } from "lucide-react"
import { Collection } from "@/lib/collections"
import { useProductStore } from "@/store/product-store"
import { useCartStore } from "@/store/cart-store"

interface CollectionPageClientProps {
    collection: Collection
    lang: string
    isEn: boolean
}

export default function CollectionPageClient({ collection, lang, isEn }: CollectionPageClientProps) {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const title = isEn ? collection.titleEn : collection.title
    const subtitle = isEn ? collection.subtitleEn : collection.subtitle
    const tagline = isEn ? collection.taglineEn : collection.tagline
    const description = isEn ? collection.descriptionEn : collection.description
    const season = isEn ? collection.seasonEn : collection.season

    // Get products from store (live data)
    const storeProducts = useProductStore((s) => s.getAllProducts)()
    const addToCart = useCartStore((s) => s.addItem)

    const collectionProducts = storeProducts.filter((p) =>
        collection.productIds.includes(p.id)
    )

    const [addedId, setAddedId] = useState<string | null>(null)
    const handleAddToCart = (productId: string) => {
        const p = collectionProducts.find((p) => p.id === productId)
        if (!p) return
        addToCart({
            productId: p.id,
            name: p.name,
            slug: p.slug,
            size: p.sizes[0],
            price: p.price,
            quantity: 1,
            image: p.image,
            category: p.category,
        })
        setAddedId(productId)
        setTimeout(() => setAddedId(null), 1500)
    }

    return (
        <main className="bg-white overflow-x-hidden">

            {/* ── CINEMATIC HERO ── */}
            <div ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
                <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <Image
                        src={collection.heroImage}
                        alt={title}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </motion.div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />

                {/* Back nav */}
                <Link
                    href={`/${lang}/shop`}
                    className="absolute top-28 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white text-xs uppercase tracking-widest transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {isEn ? "Back to Shop" : "Kembali ke Toko"}
                </Link>

                {/* Hero text */}
                <motion.div
                    style={{ opacity: opacityFade }}
                    className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center text-white px-6 z-10"
                >
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-5 font-medium">
                        {subtitle} · {season} {collection.year}
                    </p>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[110px] leading-none mb-6 drop-shadow-2xl">
                        {title}
                    </h1>
                    <p className="text-base md:text-lg text-white/70 max-w-md italic tracking-wide">
                        &ldquo;{tagline}&rdquo;
                    </p>
                    <div className="mt-10 w-px h-16 bg-white/30 mx-auto" />
                </motion.div>
            </div>

            {/* ── EDITORIAL STATEMENT ── */}
            <section style={{ backgroundColor: collection.accentColor }} className="py-28 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-charcoal/50 block mb-8 font-medium">
                        {isEn ? "The Story" : "Cerita"}
                    </span>
                    <p className="font-serif text-2xl md:text-3xl leading-relaxed text-charcoal/90">
                        {description}
                    </p>
                    <div className="mt-16 flex items-center justify-center gap-8 text-xs uppercase tracking-widest text-charcoal/40">
                        <span>{collection.year}</span>
                        <span className="w-12 h-px bg-charcoal/20" />
                        <span>{season}</span>
                        <span className="w-12 h-px bg-charcoal/20" />
                        <span>Julia Owers</span>
                    </div>
                </div>
            </section>

            {/* ── STAGGERED EDITORIAL IMAGES ── */}
            <section className="py-0 overflow-hidden bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-h-[700px]">
                    {collection.featuredImages.slice(0, 3).map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            className={`relative overflow-hidden ${i === 1 ? "md:-mt-12" : ""}`}
                            style={{ height: i === 1 ? "550px" : "460px" }}
                        >
                            <Image
                                src={img}
                                alt={`${title} ${i + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── PRODUCT GRID ── */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-xs uppercase tracking-[0.3em] text-charcoal/50 block mb-4 font-medium">
                            {isEn ? "The Edit" : "Pilihan Koleksi"}
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                            {isEn ? "Shop the Collection" : "Belanja Koleksi Ini"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
                        {collectionProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group"
                            >
                                <Link href={`/${lang}/shop/${product.slug}`}>
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-5">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Quick add overlay */}
                                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                                            <button
                                                onClick={(e) => { e.preventDefault(); handleAddToCart(product.id) }}
                                                className="w-full py-3 text-xs uppercase tracking-widest font-semibold bg-charcoal text-white hover:bg-earth transition-colors duration-300 flex items-center justify-center gap-2"
                                            >
                                                {addedId === product.id
                                                    ? (isEn ? "✓ Added!" : "✓ Ditambahkan!")
                                                    : <><ShoppingBag className="w-3.5 h-3.5" /> {isEn ? "Quick Add" : "Tambah Cepat"}</>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-1.5 font-medium">
                                        {product.subCategory}
                                    </p>
                                    <Link href={`/${lang}/shop/${product.slug}`}>
                                        <h3 className="font-serif text-lg text-charcoal mb-2 hover:text-earth transition-colors leading-snug">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        <p className="text-charcoal/80 font-medium tracking-wide">
                                            Rp {product.price.toLocaleString("id-ID")}
                                        </p>
                                        <div className="flex gap-1">
                                            {product.sizes.slice(0, 3).map(s => (
                                                <span key={s} className="text-[9px] px-1.5 py-0.5 border border-charcoal/15 text-charcoal/40 tracking-wider">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FULLBLEED CLOSING EDITORIAL IMAGE ── */}
            <section className="relative h-[70vh] overflow-hidden">
                <Image
                    src={collection.heroImage2}
                    alt={`${title} — closing`}
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-charcoal/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6">{isEn ? "Continue Exploring" : "Lanjut Menjelajah"}</p>
                    <h2 className="font-serif text-4xl md:text-6xl mb-8 drop-shadow">
                        {isEn ? "Discover More" : "Temukan Lebih Banyak"}
                    </h2>
                    <Link
                        href={`/${lang}/shop`}
                        className="inline-flex items-center gap-3 border border-white/50 hover:border-white text-white text-xs uppercase tracking-[0.2em] py-4 px-8 hover:bg-white hover:text-charcoal transition-all duration-400 group"
                    >
                        {isEn ? "All Collections" : "Semua Koleksi"}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>
            </section>

        </main>
    )
}
