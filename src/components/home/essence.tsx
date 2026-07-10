"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"

// Minimalist list of pillars
const pillars = [
    { title: "Pure Linen", desc: "100% European Flax" },
    { title: "Timeless", desc: "Beyond Seasons" },
    { title: "Conscious", desc: "Ethical Production" },
    { title: "Local", desc: "Made in Bandung" }
]

export function BrandEssence() {
    return (
        <section className="border-t border-gray-100 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
                {pillars.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group p-8 md:py-12 md:px-6 text-center hover:bg-linen-light transition-colors duration-500 cursor-default"
                    >
                        <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-2 group-hover:text-earth transition-colors">
                            {item.title}
                        </h3>
                        <p className="font-sans text-xs md:text-sm tracking-widest text-charcoal/40 uppercase">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
