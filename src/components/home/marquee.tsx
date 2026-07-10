"use client"
import { motion } from "framer-motion"
import { Sun, Star, Sparkles, Leaf } from "lucide-react"

const icons = [Leaf, Star, Sun, Sparkles, Leaf, Star]

export function Marquee({ dict }: { dict: string[] }) {
    const items = dict.map((text, i) => ({ text, icon: icons[i % icons.length] }))

    return (
        <div className="bg-charcoal text-white py-6 overflow-hidden flex relative z-20">
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {[...items, ...items, ...items, ...items].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-sm md:text-base font-medium tracking-widest uppercase">
                        <span>{item.text}</span>
                        <item.icon className="w-4 h-4 text-earth" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
