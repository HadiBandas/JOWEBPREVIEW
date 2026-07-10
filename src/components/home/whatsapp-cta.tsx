"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { MessageCircle, Send } from "lucide-react"

export function WhatsAppCTA({ dict }: { dict: Record<string, string> }) {
    const waMessage = encodeURIComponent(dict.waMessage || "Halo Julia Owers! Saya tertarik dengan koleksi linen Anda. Boleh saya tahu lebih lanjut?")
    const waLink = `https://wa.me/6281234567890?text=${waMessage}`

    return (
        <section className="py-16 md:py-20 bg-charcoal overflow-hidden relative">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 border border-white rounded-full translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 left-1/2 w-48 h-48 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

            <Container>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    {/* Left Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center md:text-left"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-earth mb-3">{dict.subtitle}</p>
                        <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-3">
                            {dict.title1}<br />
                            <span className="italic font-light text-white/70">{dict.title2}</span>
                        </h2>
                        <p className="text-white/50 text-sm leading-relaxed max-w-md">
                            {dict.desc}
                        </p>
                    </motion.div>

                    {/* Right CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-shrink-0"
                    >
                        {/* WhatsApp CTA */}
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#1eb855] transition-all duration-300 rounded-sm"
                        >
                            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {dict.ctaWa}
                        </a>

                        {/* Instagram CTA */}
                        <a
                            href="https://instagram.com/juliaowers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:border-earth hover:text-earth transition-all duration-300 rounded-sm"
                        >
                            <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {dict.ctaIg}
                        </a>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
