"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { Menu, ShoppingBag, X, Search, User, Globe } from "lucide-react"
import { Container } from "@/components/ui/container"
import { useCartStore } from "@/store/cart-store"
import { CartDrawer } from "@/components/shop/cart-drawer"

// Announcement Bar Component
function AnnouncementBar({ text }: { text: string }) {
    return (
        <div className="bg-charcoal text-white text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase py-2.5 text-center relative z-50">
            {text}
        </div>
    )
}

export function Header({ dictionary }: { dictionary: Record<string, string> }) {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { toggleCart, getItemCount } = useCartStore()
    const cartCount = getItemCount()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Hide header on scroll down, show on scroll up
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        // Solid background after scrolling past hero
        setIsScrolled(latest > 50);
    });

    const pathname = usePathname()
    const params = useParams()
    const lang = (params?.lang as string) || 'id'
    
    // Helper to switch language
    const switchLanguage = (newLang: string) => {
        if (!pathname) return '/'
        const segments = pathname.split('/')
        if (segments[1] === 'en' || segments[1] === 'id') {
            segments[1] = newLang
            return segments.join('/')
        }
        return `/${newLang}${pathname}`
    }

    const navLinks = [
        { name: dictionary.shop, href: "/shop" },
        { name: dictionary.about, href: "/about" },
        { name: dictionary.sustainability, href: "/sustainability" },
        { name: dictionary.stores, href: "/stores" },
        { name: dictionary.journal, href: "/journal" },
    ]

    return (
        <>
            <AnnouncementBar text={dictionary.announcement} />
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`sticky top-0 inset-x-0 z-40 transition-all duration-300 ${isScrolled || menuOpen
                    ? "bg-white text-charcoal shadow-sm border-b border-gray-100 py-3"
                    : "bg-white text-charcoal py-5 lg:bg-transparent" // Mobile always white, Desktop transparent at top
                    }`}
            >
                <Container>
                    <nav className="flex items-center justify-between">

                        {/* Desktop: Left Links | Mobile: Menu Button */}
                        <div className="flex-1 flex items-center justify-start">
                            <div className="hidden lg:flex gap-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={`/${lang}${link.href}`}
                                        className="text-xs font-medium uppercase tracking-widest hover:text-earth transition-colors relative group"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-earth transition-all group-hover:w-full" />
                                    </Link>
                                ))}
                            </div>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="lg:hidden p-2 -ml-2 hover:opacity-70 transition-opacity"
                            >
                                {menuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Center: Brand Logo */}
                        <Link
                            href={`/${lang}`}
                            className="relative w-32 h-10 md:w-48 md:h-14 transition-opacity hover:opacity-80 flex items-center justify-center"
                        >
                            <Image
                                src="/images/jo-logo.png"
                                alt="Julia Owers"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>

                        {/* Right: Icons & Language Switcher */}
                        <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
                            {/* Language Switcher */}
                            <div className="hidden md:flex items-center gap-2 text-xs font-medium uppercase tracking-widest border-r border-charcoal/20 pr-4">
                                <Globe size={16} className="opacity-50" />
                                <Link href={switchLanguage('id')} className={`hover:text-earth transition-colors ${lang === 'id' ? 'text-earth' : 'opacity-50'}`}>ID</Link>
                                <span className="opacity-30">|</span>
                                <Link href={switchLanguage('en')} className={`hover:text-earth transition-colors ${lang === 'en' ? 'text-earth' : 'opacity-50'}`}>EN</Link>
                            </div>

                            <button className="p-2 hover:opacity-70 transition-opacity">
                                <Search size={20} />
                            </button>
                            <button className="hidden md:block p-2 hover:opacity-70 transition-opacity">
                                <User size={20} />
                            </button>
                            <button
                                onClick={toggleCart}
                                className="p-2 -mr-2 hover:opacity-70 transition-opacity relative"
                                aria-label={`Keranjang (${cartCount} item)`}
                            >
                                <ShoppingBag size={20} />
                                {cartCount > 0 && (
                                    <motion.span
                                        key={cartCount}
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-earth text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white"
                                    >
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </motion.span>
                                )}
                            </button>
                        </div>
                    </nav>
                </Container>

                {/* Mobile Fullscreen Menu */}
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full left-0 w-full h-[calc(100vh-60px)] bg-white z-40 flex flex-col pt-12 px-6 border-t border-gray-100 lg:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={`/${lang}${link.href}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-serif text-3xl text-charcoal hover:text-earth transition-colors border-b border-gray-50 pb-4"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href={`/${lang}/contact`}
                                onClick={() => setMenuOpen(false)}
                                className="font-serif text-3xl text-charcoal hover:text-earth transition-colors border-b border-gray-50 pb-4"
                            >
                                {dictionary.contact}
                            </Link>
                        </div>
                        <div className="mt-auto mb-12 space-y-6 text-sm text-charcoal/60">
                            {/* Mobile Language Switcher */}
                            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest pt-4 border-t border-gray-100">
                                <Globe size={16} />
                                <Link href={switchLanguage('id')} className={`py-2 ${lang === 'id' ? 'text-earth font-bold' : ''}`}>Indonesia</Link>
                                <span>/</span>
                                <Link href={switchLanguage('en')} className={`py-2 ${lang === 'en' ? 'text-earth font-bold' : ''}`}>English</Link>
                            </div>
                            {/* Social & Store links */}
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                <a href="https://instagram.com/juliaowers" target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-charcoal/60 hover:text-earth transition-colors">Instagram @juliaowers</a>
                                <a href="https://shopee.co.id/juliaowersofficial" target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-charcoal/60 hover:text-earth transition-colors">Shopee Official Store</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.header>
            {/* Cart Drawer — rendered at header level so it's always available */}
            <CartDrawer />
        </>
    )
}
