"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ChevronDown } from "lucide-react"
import { useParams } from "next/navigation"

// Mobile accordion for footer link groups
function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-t border-white/10 lg:border-0">
            <button
                className="w-full flex items-center justify-between py-4 lg:py-0 lg:cursor-default"
                onClick={() => setOpen(!open)}
            >
                <h4 className="font-serif text-lg text-white/90">{title}</h4>
                <ChevronDown
                    size={18}
                    className={`text-white/40 transition-transform duration-300 lg:hidden ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div className={`overflow-hidden transition-all duration-300 lg:!max-h-none lg:!opacity-100 ${open ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"} lg:max-h-full lg:opacity-100 lg:mb-6`}>
                {children}
            </div>
        </div>
    )
}

export function Footer({ dict }: { dict?: Record<string, string> }) {
    const year = new Date().getFullYear()
    const params = useParams()
    const lang = (params?.lang as string) || 'id'

    // Fallbacks just in case the dictionary isn't passed (e.g. some page not using layout correctly)
    const brand = dict?.brand || "Conscious linen fashion for the modern woman. Timeless, breathable, and ethically crafted in Bandung."
    const explore = dict?.explore || "Explore"
    const company = dict?.company || "Company"
    const visitUs = dict?.visitUs || "Visit Us"
    const customerCare = dict?.customerCare || "Customer Care"
    const rights = dict?.rights || "Julia Owers. All Rights Reserved."

    return (
        <footer className="bg-charcoal text-white pt-12 md:pt-20 pb-8 md:pb-12 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-5 md:px-12">

                {/* Top: Brand + Social */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 mb-2 lg:mb-0 border-b border-white/10 lg:border-0">
                    <Link href={`/${lang}`} className="relative block w-36 h-12 transition-opacity hover:opacity-80 flex-shrink-0">
                        <Image
                            src="/images/jo-logo.png"
                            alt="Julia Owers"
                            fill
                            className="object-contain invert"
                        />
                    </Link>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs hidden lg:block">
                        {brand}
                    </p>
                    <div className="flex gap-3">
                        {/* Social Icons Placeholder */}
                        <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition-colors flex items-center justify-center">
                            <svg className="w-4 h-4 fill-white/70" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </div>
                        <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition-colors flex items-center justify-center">
                            <svg className="w-4 h-4 fill-white/70" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/></svg>
                        </div>
                        <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition-colors flex items-center justify-center">
                            <svg className="w-4 h-4 fill-white/70" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Brand tagline mobile */}
                <p className="text-white/40 text-sm leading-relaxed mb-6 lg:hidden">
                    {brand}
                </p>

                {/* Grid Links */}
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mb-8 md:mb-20">

                    {/* Spacer on desktop to offset brand column */}
                    <div className="hidden lg:block" />

                    {/* Explore */}
                    <FooterAccordion title={explore}>
                        <ul className="space-y-3 text-sm text-white/50">
                            <li><Link href={`/${lang}/shop`} className="hover:text-white transition-colors block py-0.5">New Arrivals</Link></li>
                            <li><Link href={`/${lang}/shop`} className="hover:text-white transition-colors block py-0.5">Best Sellers</Link></li>
                            <li><Link href={`/${lang}/shop?category=Dresses`} className="hover:text-white transition-colors block py-0.5">Dresses</Link></li>
                            <li><Link href={`/${lang}/shop?category=Tops`} className="hover:text-white transition-colors block py-0.5">Tops & Blouses</Link></li>
                            <li><Link href={`/${lang}/shop?category=Bottoms`} className="hover:text-white transition-colors block py-0.5">Trousers & Skirts</Link></li>
                            <li><Link href={`/${lang}/journal`} className="hover:text-white transition-colors block py-0.5">The Journal</Link></li>
                        </ul>
                    </FooterAccordion>

                    {/* Company */}
                    <FooterAccordion title={company}>
                        <ul className="space-y-3 text-sm text-white/50">
                            <li><Link href={`/${lang}/about`} className="hover:text-white transition-colors block py-0.5">Our Story</Link></li>
                            <li><Link href={`/${lang}/sustainability`} className="hover:text-white transition-colors block py-0.5">Sustainability</Link></li>
                            <li><Link href={`/${lang}/stores`} className="hover:text-white transition-colors block py-0.5">Visit Stores</Link></li>
                            <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors block py-0.5">Contact Us</Link></li>
                            <li><Link href={`/${lang}/faq`} className="hover:text-white transition-colors block py-0.5">FAQ</Link></li>
                        </ul>
                    </FooterAccordion>

                    {/* Visit Us */}
                    <FooterAccordion title={visitUs}>
                        <div className="space-y-4 text-sm text-white/50">
                            <div className="flex gap-3 items-start">
                                <MapPin className="w-4 h-4 mt-1 text-white/30 flex-shrink-0" />
                                <div>
                                    <p className="text-white mb-1">Heritage Bandung</p>
                                    <p>Jl. L.L.RE Martadinata 63-65</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <MapPin className="w-4 h-4 mt-1 text-white/30 flex-shrink-0" />
                                <div>
                                    <p className="text-white mb-1">Heritage Bintaro</p>
                                    <p>Bintaro Jaya, South Tangerang</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/10 mt-4">
                                <p className="mb-2 text-white/70">{customerCare}</p>
                                <p className="text-white hover:text-earth cursor-pointer transition-colors">+62 812-3456-7890</p>
                                <p className="text-white hover:text-earth cursor-pointer transition-colors">hello@juliaowers.com</p>
                            </div>
                        </div>
                    </FooterAccordion>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6 text-xs text-white/30 uppercase tracking-widest gap-3">
                    <p>&copy; {year} {rights}</p>
                    <div className="flex gap-6">
                        <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href={`/${lang}/terms`} className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
