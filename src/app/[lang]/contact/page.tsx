"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { getDictionary } from "@/lib/dictionary"

import enDict from "@/dictionaries/en.json"
import idDict from "@/dictionaries/id.json"
import { useParams } from "next/navigation"

export default function ContactPage() {
    const params = useParams()
    const lang = (params?.lang as string) || 'id'
    const dict = lang === 'en' ? enDict.contact : idDict.contact

    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
    }

    return (
        <main className="pt-8 pb-24">
            <section className="bg-linen py-16 md:py-24 mb-12">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                            {dict.title}
                        </h1>
                        <p className="text-charcoal/60 text-lg">
                            {dict.subtitle}
                        </p>
                    </motion.div>
                </Container>
            </section>

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-2xl text-charcoal mb-6">{dict.sendMessage}</h2>

                        {!formSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {dict.name}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-earth"
                                            placeholder={dict.namePlaceholder}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {dict.email}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-earth"
                                            placeholder={dict.emailPlaceholder}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">
                                        {dict.subject}
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-earth bg-white"
                                    >
                                        {dict.subjects.map((sub, i) => (
                                            <option key={i}>{sub}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">
                                        {dict.message}
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-earth resize-none"
                                        placeholder={dict.messagePlaceholder}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-charcoal hover:bg-charcoal/90 rounded-sm h-12 px-8"
                                >
                                    {dict.sendBtn}
                                </Button>
                            </form>
                        ) : (
                            <div className="bg-green-50 p-8 rounded-sm text-center">
                                <div className="text-4xl mb-4">✓</div>
                                <h3 className="font-serif text-xl text-charcoal mb-2">{dict.sentTitle}</h3>
                                <p className="text-charcoal/60">
                                    {dict.sentDesc}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-2xl text-charcoal mb-6">{dict.otherWays}</h2>

                        <div className="space-y-6 mb-10">
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 p-4 bg-green-50 rounded-sm hover:bg-green-100 transition-colors"
                            >
                                <MessageCircle className="w-6 h-6 text-green-600" />
                                <div>
                                    <p className="font-medium text-charcoal">{dict.fastest}</p>
                                    <p className="text-sm text-charcoal/60">+62 812-3456-7890</p>
                                    <p className="text-xs text-charcoal/40 mt-1">{dict.reply1h}</p>
                                </div>
                            </a>

                            <a
                                href="https://instagram.com/juliaowers"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 p-4 bg-pink-50 rounded-sm hover:bg-pink-100 transition-colors"
                            >
                                <Instagram className="w-6 h-6 text-pink-600" />
                                <div>
                                    <p className="font-medium text-charcoal">{dict.igDm}</p>
                                    <p className="text-sm text-charcoal/60">@juliaowers</p>
                                    <p className="text-xs text-charcoal/40 mt-1">{dict.reply2h}</p>
                                </div>
                            </a>

                            <div className="flex items-start gap-4 p-4 bg-linen/50 rounded-sm">
                                <Mail className="w-6 h-6 text-earth" />
                                <div>
                                    <p className="font-medium text-charcoal">{dict.emailMethod}</p>
                                    <p className="text-sm text-charcoal/60">hello@juliaowers.com</p>
                                    <p className="text-xs text-charcoal/40 mt-1">{dict.reply24h}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="font-medium text-charcoal mb-4">{dict.visitStores}</h3>
                            <div className="space-y-4">
                                <Link href="/stores" className="flex items-start gap-4 p-4 bg-linen/30 rounded-sm hover:bg-linen/50 transition-colors">
                                    <MapPin className="w-5 h-5 text-earth flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-charcoal">Heritage Bandung</p>
                                        <p className="text-sm text-charcoal/60">Jl. L.L.RE Martadinata No.63-65</p>
                                    </div>
                                </Link>
                                <Link href="/stores" className="flex items-start gap-4 p-4 bg-linen/30 rounded-sm hover:bg-linen/50 transition-colors">
                                    <MapPin className="w-5 h-5 text-earth flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-charcoal">Heritage Bintaro</p>
                                        <p className="text-sm text-charcoal/60">Bintaro Jaya, South Tangerang</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-sm text-charcoal/50">
                                <Clock className="w-4 h-4" />
                                <span>{dict.openDaily}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </main>
    )
}
