"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Star, ArrowRight, Quote } from "lucide-react"
import Link from "next/link"

// Expanded with 4 testimonials using initials avatars (no fake product photos)
const reviews = [
    {
        name: "Sari W.",
        role: "Verified Buyer · Jakarta",
        initial: "S",
        color: "bg-earth",
        quote: "Kualitasnya luar biasa! Linennya benar-benar 100% premium, adem banget dipakai sehari-hari. Sudah pakai 2 tahun dan masih bagus.",
        rating: 5
    },
    {
        name: "Amanda L.",
        role: "Fashion Editor · Bandung",
        initial: "A",
        color: "bg-sage",
        quote: "Defined by timeless craftsmanship. Julia Owers has become my go-to for sustainable daily wear. The quality is simply unmatched.",
        rating: 5
    },
    {
        name: "Dewi R.",
        role: "Verified Buyer · Surabaya",
        initial: "D",
        color: "bg-charcoal",
        quote: "Akhirnya nemu brand linen lokal yang beneran bagus! Potongannya pas, bahannya breathable, dan harganya masih sangat reasonable.",
        rating: 5
    },
    {
        name: "Rina H.",
        role: "Verified Buyer · Medan",
        initial: "R",
        color: "bg-earth/70",
        quote: "I love knowing exactly where my clothes come from. The Bandung atelier story is so inspiring — and the pieces are absolutely gorgeous.",
        rating: 5
    }
]

export function Testimonials({ dict }: { dict: Record<string, string> }) {
    return (
        <section className="py-16 md:py-24 bg-[#F9F8F6]">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
                    <div className="max-w-xl mb-4 md:mb-0">
                        <p className="text-xs uppercase tracking-[0.3em] text-earth mb-3">{dict.subtitle}</p>
                        <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-3">{dict.title1} <br />{dict.title2}</h2>
                        <p className="text-charcoal/60 text-sm md:text-base">{dict.desc}</p>
                    </div>
                    <Link href="/reviews" className="hidden md:flex items-center gap-2 text-sm font-medium border-b border-charcoal pb-1 hover:text-earth hover:border-earth transition-colors flex-shrink-0">
                        {dict.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* 2×2 grid on desktop, single column on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 md:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 text-earth mb-4">
                                {[...Array(review.rating)].map((_, r) => (
                                    <Star key={r} className="w-3.5 h-3.5 fill-current" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-charcoal/80 italic text-base leading-relaxed mb-6">
                                &ldquo;{review.quote}&rdquo;
                            </p>

                            {/* Reviewer — Initial Avatar */}
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${review.color}`}>
                                    <span className="text-white font-serif text-lg font-medium">{review.initial}</span>
                                </div>
                                <div>
                                    <h4 className="font-serif text-charcoal text-sm font-medium">{review.name}</h4>
                                    <p className="text-[11px] text-charcoal/50 uppercase tracking-wider">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 text-center md:hidden">
                    <Link href="/reviews" className="inline-flex items-center gap-2 text-sm font-medium border-b border-charcoal pb-1 hover:text-earth hover:border-earth transition-colors">
                        {dict.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </Container>
        </section>
    )
}
