"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function PageLoader() {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false)
    const isFirstMount = useState(true)

    useEffect(() => {
        // Only show loader on subsequent navigations, not the initial load
        if (isFirstMount[0]) {
            // @ts-ignore
            isFirstMount[0] = false
            return
        }
        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 0) // Immediate — just a single-frame flash for UX feedback
        return () => clearTimeout(timer)
    }, [pathname])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="page-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-white flex items-center justify-center flex-col"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-40 h-20 md:w-56 md:h-24"
                    >
                        <Image
                            src="/images/jo-logo.png"
                            alt="Julia Owers Loading"
                            fill
                            className="object-contain" // Default to black logo on white bg
                            priority
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
