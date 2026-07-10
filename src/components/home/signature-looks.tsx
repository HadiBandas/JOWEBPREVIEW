"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export function SignatureLooks({ dict }: { dict: Record<string, string> }) {
    const params = useParams()
    const lang = (params?.lang as string) || 'id'

    const looks = [
        { src: "/images/collections/Collection 4.jpg", alt: "Look 1" },
        { src: "/images/collections/Collection 5.jpg", alt: "Look 2" },
        { src: "/images/banner-quote.jpg", alt: "Look 3" },
    ]

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-10 md:mb-16">
                    {/* Text Heading */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-4 md:mb-6">
                                {dict.title1} <br />
                                <span className="bg-linen px-2">{dict.title2}</span>
                            </h2>
                            <p className="text-charcoal/60 leading-relaxed max-w-md text-sm md:text-base">
                                {dict.subtitle}
                            </p>
                        </motion.div>
                    </div>

                    {/* Floating Image 1 — Desktop Only */}
                    <div className="hidden lg:block lg:col-span-7 relative h-[300px]">
                        <motion.div
                            initial={{ opacity: 0, rotate: -3, x: 50 }}
                            whileInView={{ opacity: 1, rotate: 6, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="absolute right-0 top-0 w-48 aspect-[3/4] shadow-xl z-10"
                        >
                            <Image src="/images/collections/Collection 2.jpg" alt="Signature Look 1" fill className="object-cover p-2 bg-white" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, rotate: 5, y: 50 }}
                            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute right-32 top-12 w-48 aspect-[3/4] shadow-xl z-0"
                        >
                            <Image src="/images/collections/Collection 3.jpg" alt="Signature Look 2" fill className="object-cover p-2 bg-white" />
                        </motion.div>
                    </div>
                </div>

                {/* Mobile: Horizontal Scroll Carousel */}
                <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-none">
                    {looks.map((look, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative flex-shrink-0 w-[72vw] aspect-[3/4] rounded-sm overflow-hidden snap-start"
                        >
                            <Image src={look.src} alt={look.alt} fill className="object-cover" />
                        </motion.div>
                    ))}
                </div>

                {/* Desktop: 3-Column Grid */}
                <div className="hidden md:grid grid-cols-3 gap-8 h-[600px]">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative h-full mt-12 rounded-sm overflow-hidden"
                    >
                        <Image src="/images/collections/Collection 4.jpg" alt="Look 3" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative h-[90%] rounded-sm overflow-hidden"
                    >
                        <Image src="/images/collections/Collection 5.jpg" alt="Look 4" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative h-full mt-24 rounded-sm overflow-hidden"
                    >
                        <Image src="/images/banner-quote.jpg" alt="Look 5" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                </div>

                <div className="text-center mt-10 md:mt-16">
                    <Link
                        href={`/${lang}/shop`}
                        className="inline-block bg-charcoal text-white px-8 md:px-10 py-4 text-sm font-medium tracking-wide hover:bg-earth transition-colors rounded-sm"
                    >
                        {dict.cta}
                    </Link>
                </div>
            </Container>
        </section>
    )
}
