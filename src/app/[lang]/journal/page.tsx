import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { articles } from "@/lib/articles"
import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params
    const isEn = lang === "en"
    return {
        title: isEn
            ? "Journal — Stories on Style, Sustainability & Life | Julia Owers"
            : "Jurnal — Cerita tentang Gaya, Keberlanjutan & Kehidupan | Julia Owers",
        description: isEn
            ? "Read stories about slow fashion, linen care guides, and life in Bandung from the Julia Owers team."
            : "Baca cerita tentang slow fashion, panduan perawatan linen, dan kehidupan di Bandung dari tim Julia Owers.",
        keywords: isEn
            ? ["julia owers journal", "slow fashion blog", "linen care", "bandung lifestyle", "sustainable fashion stories"]
            : ["jurnal Julia Owers", "blog slow fashion", "perawatan linen", "gaya hidup Bandung", "cerita fashion berkelanjutan"],
        openGraph: {
            title: isEn ? "Journal | Julia Owers" : "Jurnal | Julia Owers",
            description: isEn
                ? "Stories on style, sustainability, and life from the Julia Owers team in Bandung."
                : "Cerita tentang gaya, keberlanjutan, dan kehidupan dari tim Julia Owers di Bandung.",
            images: [{ url: "/images/hero.png", width: 1200, height: 630 }],
        }
    }
}

export default async function JournalPage({ params }: Props) {
    const { lang } = await params
    const isEn = lang === "en"

    const featured = articles[0]
    const rest = articles.slice(1)

    return (
        <main className="pt-24 pb-24">
            {/* Header */}
            <div className="pt-12 pb-20 text-center border-b border-gray-100">
                <Container>
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">
                        {isEn ? "Journal" : "Jurnal"}
                    </h1>
                    <p className="text-charcoal/60 uppercase tracking-widest text-sm">
                        {isEn
                            ? "Stories on Style, Sustainability, and Life"
                            : "Cerita tentang Gaya, Keberlanjutan, dan Kehidupan"}
                    </p>
                </Container>
            </div>

            {/* Featured Article - Magazine Layout */}
            <section className="py-16 md:py-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-auto lg:h-[600px] w-full bg-gray-100 overflow-hidden group">
                            <Image
                                src={featured.image}
                                alt={isEn ? featured.titleEn : featured.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                        <div className="lg:col-span-4">
                            <span className="text-earth text-xs font-bold uppercase tracking-widest mb-4 block">
                                {isEn ? "Editor's Pick" : "Pilihan Editor"}
                            </span>
                            <h2 className="font-serif text-4xl text-charcoal mb-6 leading-tight">
                                {isEn ? featured.titleEn : featured.title}
                            </h2>
                            <p className="text-charcoal/60 leading-relaxed mb-8">
                                {isEn ? featured.excerptEn : featured.excerpt}
                            </p>
                            <Link
                                href={`/${lang}/journal/${featured.slug}`}
                                className="inline-flex items-center gap-2 border border-charcoal px-6 py-3 text-sm font-medium hover:bg-charcoal hover:text-white transition-all"
                            >
                                {isEn ? "Read Article" : "Baca Artikel"} <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Recent Articles Grid */}
            <section className="bg-linen-light/30 py-24">
                <Container>
                    <h3 className="font-serif text-3xl text-charcoal mb-12">
                        {isEn ? "Latest Stories" : "Tulisan Terbaru"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {rest.map((article) => (
                            <Link href={`/${lang}/journal/${article.slug}`} key={article.slug} className="group block">
                                <div className="aspect-[3/2] overflow-hidden bg-gray-200 mb-6 relative">
                                    <Image
                                        src={article.image}
                                        alt={isEn ? article.titleEn : article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="max-w-lg">
                                    <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-charcoal/40 mb-3">
                                        <span>{isEn ? article.categoryEn : article.category}</span>
                                        <span>•</span>
                                        <span>{isEn ? article.dateEn : article.date}</span>
                                    </div>
                                    <h4 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-earth transition-colors">
                                        {isEn ? article.titleEn : article.title}
                                    </h4>
                                    <p className="text-charcoal/60 leading-relaxed">
                                        {isEn ? article.excerptEn : article.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    )
}
