"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProductCard } from "@/components/shop/product-card"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { useState } from "react"
import { Star, ShoppingBag, MessageCircle, Check } from "lucide-react"
import { SizeGuideModal } from "@/components/shop/size-guide-modal"
import { useCartStore } from "@/store/cart-store"
import { useProduct, useProducts } from "@/hooks/use-products"

export default function ProductPage() {
    const params = useParams()
    const slug = params?.slug as string
    const product = useProduct(slug)           // ← dari CMS store (bukan hardcode)
    const { products } = useProducts()         // ← untuk similar products
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [addedToCart, setAddedToCart] = useState(false)
    const { addItem, openCart } = useCartStore()
    const lang = (params?.lang as string) || 'id'

    if (!product) {
        return notFound()
    }

    const reviews = 42 // Mock review count

    const similarProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)

    return (
        <main className="pt-24 pb-24">
            <Container>
                {/* Breadcrumb Minimal */}
                <div className="text-xs uppercase tracking-widest text-charcoal/40 mb-8 pt-4">
                    Shop / {product.category} / <span className="text-charcoal">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left: Gallery (Editorial Grid) */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="relative aspect-[3/4] bg-gray-100 w-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Mock extra images grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative aspect-[3/4] bg-gray-100">
                                <Image src="/images/collections/Collection 4.jpg" alt="Detail 1" fill className="object-cover" />
                            </div>
                            <div className="relative aspect-[3/4] bg-gray-100">
                                <Image src="/images/collections/Collection 5.jpg" alt="Detail 2" fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Detail (Sticky) */}
                    <div className="lg:col-span-5 h-fit sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">{product.name}</h1>

                            <div className="flex justify-between items-center mb-6">
                                <p className="text-xl font-medium text-charcoal">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </p>
                                <div className="flex items-center gap-1">
                                    <div className="flex text-earth">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <span className="text-xs text-charcoal/40 underline">({reviews} Reviews)</span>
                                </div>
                            </div>

                            <p className="text-charcoal/70 leading-relaxed mb-8">
                                Crafted from our signature European flax linen. Breathable, durable, and softens with every wash. Designed for a relaxed fit that moves with you.
                            </p>

                            {/* Options */}
                            <div className="space-y-6 mb-8">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold uppercase tracking-widest text-charcoal/40">Size</span>
                                        <SizeGuideModal />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 flex items-center justify-center border transition-all text-sm ${selectedSize === size
                                                    ? "border-charcoal bg-charcoal text-white"
                                                    : "border-gray-200 hover:border-charcoal text-charcoal"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {/* PRIMARY: Add to Cart */}
                                    <button
                                        onClick={() => {
                                            if (!selectedSize) {
                                                alert("Pilih ukuran terlebih dahulu.")
                                                return
                                            }
                                            addItem({
                                                productId: product.id,
                                                name: product.name,
                                                slug: product.slug,
                                                size: selectedSize,
                                                price: product.price,
                                                quantity: 1,
                                                image: product.image,
                                                category: product.category,
                                            })
                                            setAddedToCart(true)
                                            setTimeout(() => setAddedToCart(false), 2000)
                                        }}
                                        className={`w-full h-14 font-medium uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                            addedToCart
                                                ? "bg-emerald-600 text-white"
                                                : "bg-charcoal text-white hover:bg-earth"
                                        }`}
                                    >
                                        {addedToCart ? (
                                            <><Check size={18} /> Ditambahkan ke Keranjang</>
                                        ) : (
                                            <><ShoppingBag size={18} /> Masukkan Keranjang</>
                                        )}
                                    </button>

                                    {/* SECONDARY: WhatsApp (untuk yang lebih suka personal) */}
                                    <button
                                        onClick={() => {
                                            if (!selectedSize) {
                                                alert("Pilih ukuran terlebih dahulu.")
                                                return
                                            }
                                            const message = `Halo Julia Owers, saya tertarik dengan *${product.name}*, Size *${selectedSize}*. Apakah masih available?`
                                            const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
                                            window.open(url, '_blank')
                                        }}
                                        className="w-full h-12 border border-charcoal/20 text-charcoal/70 font-medium text-sm uppercase tracking-wider hover:border-charcoal hover:text-charcoal transition-colors flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle size={16} />
                                        Tanya via WhatsApp
                                    </button>
                                </div>
                            </div>

                            {/* Info Accordion */}
                            <div className="border-t border-gray-100 pt-2">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="details">
                                        <AccordionTrigger>Fabric & Care</AccordionTrigger>
                                        <AccordionContent>
                                            100% European Flax Linen.<br />
                                            Machine wash cold, gentle cycle. Air dry or tumble dry low.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="shipping">
                                        <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                                        <AccordionContent>
                                            Free shipping on orders over Rp 500.000.<br />
                                            Returns accepted within 14 days of delivery.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="fit">
                                        <AccordionTrigger>Size & Fit</AccordionTrigger>
                                        <AccordionContent>
                                            Model is 175cm wearing size S.<br />
                                            True to size. For a more relaxed look, size up.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="pt-32">
                    <h3 className="font-serif text-3xl text-charcoal mb-12 text-center">You May Also Like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {similarProducts.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </div>
            </Container>
        </main>
    )
}
