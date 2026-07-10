"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"

// Minimalist animated text component
export function BrandIntro({ dict }: { dict: Record<string, string> }) {
    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated Headline Line by Line */}
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-8">
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="block"
                            >
                                {dict.title1}
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                                className="block italic text-earth"
                            >
                                {dict.title2}
                            </motion.span>
                        </span>
                    </h2>

                    {/* Minimal Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-lg md:text-xl text-charcoal/60 leading-relaxed max-w-2xl mx-auto"
                    >
                        {dict.subtitle}
                    </motion.p>
                </div>
            </Container>
        </section>
    )
}
