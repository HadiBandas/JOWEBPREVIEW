"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export function VisitStores({ dict }: { dict: Record<string, string> }) {
    const params = useParams()
    const lang = (params?.lang as string) || 'id'

    return (
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end md:items-center pb-12 md:pb-0">
            {/* Full width immersive image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/stores/Bandung.jpg"
                    alt="Our Store Interior"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                />
                {/* Stronger gradient on mobile for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/20 md:bg-gradient-to-r md:from-charcoal/90 md:via-charcoal/40 md:to-transparent" />
            </div>

            <div className="relative z-10 w-full px-5 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl text-white"
                >
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-6 text-white/70">
                        {dict.subtitle}
                    </p>
                    <h2 className="font-serif text-4xl md:text-7xl mb-6 md:mb-8 leading-none">
                        {dict.title1}<br />{dict.title2}
                    </h2>
                    <div className="space-y-4 md:space-y-6 border-l border-white/20 pl-5 md:pl-8">
                        <div>
                            <h3 className="text-xl md:text-2xl font-serif mb-1">Heritage Bandung</h3>
                            <p className="text-white/60 font-sans text-sm">Jl. L.L.RE Martadinata No.63-65</p>
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-serif mb-1">Heritage Bintaro</h3>
                            <p className="text-white/60 font-sans text-sm">Bintaro Jaya, South Tangerang</p>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-12">
                        <Link
                            href={`/${lang}/stores`}
                            className="group inline-flex items-center gap-4 text-sm uppercase tracking-widest hover:text-earth transition-colors"
                        >
                            {dict.cta} <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
