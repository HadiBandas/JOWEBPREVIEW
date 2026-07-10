"use client"
import { X, Ruler } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function SizeGuideModal() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-charcoal/60 hover:text-earth transition-colors"
            >
                <Ruler size={14} /> Size Guide
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-sm shadow-xl relative"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-12">
                                <h2 className="font-serif text-3xl text-charcoal mb-2">Size Guide</h2>
                                <p className="text-charcoal/60 mb-8">All measurements are in centimeters.</p>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="font-serif text-xl mb-4">Tops & Dresses</h3>
                                        <div className="w-full overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-linen-light text-charcoal font-medium uppercase tracking-wider">
                                                    <tr>
                                                        <th className="px-4 py-3">Size</th>
                                                        <th className="px-4 py-3">Bust</th>
                                                        <th className="px-4 py-3">Waist</th>
                                                        <th className="px-4 py-3">Hips</th>
                                                        <th className="px-4 py-3">Length</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    <tr>
                                                        <td className="px-4 py-3 font-medium">XS</td>
                                                        <td className="px-4 py-3">80-84</td>
                                                        <td className="px-4 py-3">62-66</td>
                                                        <td className="px-4 py-3">88-92</td>
                                                        <td className="px-4 py-3">110</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 font-medium">S</td>
                                                        <td className="px-4 py-3">84-88</td>
                                                        <td className="px-4 py-3">66-70</td>
                                                        <td className="px-4 py-3">92-96</td>
                                                        <td className="px-4 py-3">112</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 font-medium">M</td>
                                                        <td className="px-4 py-3">88-92</td>
                                                        <td className="px-4 py-3">70-74</td>
                                                        <td className="px-4 py-3">96-100</td>
                                                        <td className="px-4 py-3">114</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 font-medium">L</td>
                                                        <td className="px-4 py-3">92-98</td>
                                                        <td className="px-4 py-3">74-80</td>
                                                        <td className="px-4 py-3">100-106</td>
                                                        <td className="px-4 py-3">116</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-linen-light/30 p-6 rounded-sm">
                                        <h4 className="font-serif text-lg mb-2">How to Measure</h4>
                                        <ul className="text-sm text-charcoal/70 space-y-2 list-disc pl-4">
                                            <li><strong>Bust:</strong> Measure around the fullest part of your chest.</li>
                                            <li><strong>Waist:</strong> Measure around your natural waistline (narrowest part).</li>
                                            <li><strong>Hips:</strong> Measure around the fullest part of your hips/seat.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
