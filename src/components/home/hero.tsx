"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Star } from "lucide-react"
import { Container } from "@/components/ui/container"
import { useRef } from "react"
import { useParams } from "next/navigation"

export function Hero({ dict }: { dict: Record<string, string> }) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })
    const params = useParams()
    const lang = (params?.lang as string) || 'id'

    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
    return (
        <section ref={containerRef} className="pt-24 pb-10 md:pt-40 md:pb-24 bg-white overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Left Column: Content */}
                    <div className="lg:col-span-4 flex flex-col justify-center z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="font-serif text-4xl md:text-6xl text-charcoal leading-[1.1] mb-4 md:mb-6">
                                {dict.title1} <br />
                                <span className="italic font-light">{dict.title2}</span>
                            </h1>
                            <p className="text-charcoal/60 text-base md:text-lg mb-6 md:mb-8 max-w-sm leading-relaxed">
                                {dict.subtitle}
                            </p>

                            <Link
                                href={`/${lang}/shop`}
                                className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-6 py-3 text-xs md:text-sm font-medium hover:bg-charcoal hover:text-white transition-all duration-300 group"
                            >
                                {dict.cta}
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>

                            <div className="mt-12 flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                                            <Image src={`/images/collections/Collection ${i}.jpg`} alt="User" fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-earth">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <p className="text-sm font-semibold text-charcoal mt-1">{dict.customers}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Center Column: Main Image */}
                    <div className="lg:col-span-5 relative min-h-[500px] lg:min-h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="absolute inset-0 bg-[#f0f0f0] overflow-hidden"
                        >
                            <motion.div style={{ y: yParallax }} className="relative w-full h-[120%] -top-[10%]">
                                <Image
                                    src="/images/hero.jpg"
                                    alt="Linen Dress"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column: Detail Image & Stats */}
                    <div className="lg:col-span-3 flex flex-col gap-8 mt-12 lg:mt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative aspect-[3/4] bg-[#f0f0f0] overflow-hidden"
                        >
                            <motion.div style={{ y: yParallaxSlow }} className="relative w-full h-[120%] -top-[10%]">
                                <Image
                                    src="/images/collections/Collection 1.jpg"
                                    alt="Linen Detail"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-3 animate-spin-slow z-10">
                                <div className="w-12 h-12 flex items-center justify-center border border-charcoal/20 rounded-full">
                                    <span className="text-[10px] uppercase font-medium text-center leading-tight whitespace-pre-line">{dict.newDrop}</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex justify-between border-t border-charcoal/10 pt-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <span className="block font-serif text-3xl text-charcoal">50+</span>
                                <span className="text-xs text-charcoal/50 uppercase tracking-wider">{dict.collections}</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                            >
                                <span className="block font-serif text-3xl text-charcoal">100%</span>
                                <span className="text-xs text-charcoal/50 uppercase tracking-wider">{dict.pureLinen}</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
