"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { useParams } from "next/navigation"
import { ProductCard } from "@/components/shop/product-card"
import { useProducts } from "@/hooks/use-products"

export function FeaturedCollection({ dict }: { dict: Record<string, string> }) {
    const params = useParams()
    const lang = (params?.lang as string) || 'id'
    const { products } = useProducts()   // ← dari CMS store, bukan hardcode
    return (
        <section className="py-24 bg-linen-light/50">
            <Container>
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">{dict.title}</h2>
                        <p className="text-charcoal/50">{dict.subtitle}</p>
                    </div>
                    <Link href={`/${lang}/shop`} className="hidden md:flex items-center gap-2 px-6 py-2 border border-charcoal/20 hover:bg-charcoal hover:text-white transition-all text-sm font-medium bg-white">
                        {dict.cta} <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                slug={product.slug}
                                colors={product.colors}
                                sizes={product.sizes}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href={`/${lang}/shop`} className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal/20 text-sm font-medium bg-white">
                        {dict.cta} <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </Container>
        </section>
    )
}
