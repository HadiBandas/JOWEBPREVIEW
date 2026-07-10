import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Tag } from "lucide-react"
import { articles, getArticleBySlug } from "@/lib/articles"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Props = {
    params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
    const langs = ["id", "en"]
    return langs.flatMap((lang) =>
        articles.map((article) => ({
            lang,
            slug: article.slug,
        }))
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params
    const article = getArticleBySlug(slug)
    if (!article) return { title: "Artikel Tidak Ditemukan | Julia Owers" }

    const isEn = lang === "en"
    const seo = isEn ? article.seoEn : article.seo

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        openGraph: {
            title: seo.title,
            description: seo.description,
            images: [{ url: article.image, width: 1200, height: 630, alt: isEn ? article.titleEn : article.title }],
            type: "article",
            publishedTime: article.dateEn,
            siteName: "Julia Owers",
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.description,
            images: [article.image],
        },
        alternates: {
            canonical: `https://juliaowers.com/${lang}/journal/${slug}`,
            languages: {
                "id": `https://juliaowers.com/id/journal/${slug}`,
                "en": `https://juliaowers.com/en/journal/${slug}`,
            }
        }
    }
}

// Simple markdown-to-HTML renderer for our content format
function renderContent(content: string): string {
    return content
        .trim()
        // H2 headers
        .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl md:text-3xl text-charcoal mt-12 mb-4 leading-snug">$1</h2>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-charcoal font-semibold">$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`(.+?)`/g, '<code class="bg-linen px-1 rounded text-sm">$1</code>')
        // Tables
        .replace(/(?:^\|.+\|$\n?)+/gm, (match) => {
            const rows = match.trim().split('\n')
            let html = '<div class="overflow-x-auto my-8"><table class="w-full border border-gray-200 rounded-sm">'
            
            rows.forEach((row, i) => {
                if (row.includes('---')) return
                const cells = row.replace(/^\||\|$/g, '').split('|').map(c => c.trim())
                const cellTag = i === 0 ? 'th' : 'td'
                html += `<tr>${cells.map(c => `<${cellTag}>${c}</${cellTag}>`).join('')}</tr>`
            })
            
            html += '</table></div>'
            return html
        })
        // Links [text](/url)
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-earth underline underline-offset-4 hover:text-charcoal transition-colors">$1</a>')
        // Horizontal rule
        .replace(/^---$/gm, '<hr class="border-gray-100 my-12" />')
        // List items
        .replace(/^- (.+)$/gm, '<li class="text-charcoal/70 leading-relaxed mb-2 flex gap-2"><span class="text-earth mt-1 shrink-0">•</span><span>$1</span></li>')
        .replace(/(<li[^>]*>[\s\S]*?<\/li>\s*)+/g, (match) => `<ul class="my-6 space-y-1">${match}</ul>`)
        // Paragraphs (non-empty lines not already wrapped)
        .split('\n\n')
        .map(block => {
            const trimmed = block.trim()
            if (!trimmed) return ''
            if (trimmed.startsWith('<')) return trimmed
            return `<p class="text-charcoal/70 leading-relaxed mb-6 text-[1.05rem]">${trimmed.replace(/\n/g, ' ')}</p>`
        })
        .join('\n')
}

export default async function ArticlePage({ params }: Props) {
    const { lang, slug } = await params
    const article = getArticleBySlug(slug)

    if (!article) notFound()

    const isEn = lang === "en"
    const title = isEn ? article.titleEn : article.title
    const category = isEn ? article.categoryEn : article.category
    const date = isEn ? article.dateEn : article.date
    const excerpt = isEn ? article.excerptEn : article.excerpt
    const content = isEn ? article.contentEn : article.content

    // Get 2 other articles for "Baca Juga"
    const related = articles.filter(a => a.slug !== slug).slice(0, 2)

    return (
        <main className="pt-24 pb-24">
            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[65vh] w-full bg-gray-200 mb-0">
                <Image
                    src={article.image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-charcoal/40" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <Container>
                        <span className="inline-block text-white/70 text-xs uppercase tracking-widest mb-3 font-medium">
                            {category}
                        </span>
                        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl">
                            {title}
                        </h1>
                    </Container>
                </div>
            </div>

            {/* Article Meta Bar */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-30">
                <Container>
                    <div className="flex items-center justify-between py-4">
                        <Link
                            href={`/${lang}/journal`}
                            className="flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/50 hover:text-earth transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            {isEn ? "Back to Journal" : "Kembali ke Jurnal"}
                        </Link>
                        <div className="flex items-center gap-6 text-xs text-charcoal/40 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <Tag className="w-3 h-3" />
                                {category}
                            </span>
                            <span className="hidden md:flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                {article.readTime}
                            </span>
                            <span className="hidden md:block">{date}</span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Article Body */}
            <Container>
                <div className="max-w-2xl mx-auto py-16">
                    {/* Excerpt / Lead */}
                    <p className="font-serif text-xl md:text-2xl text-charcoal/80 leading-relaxed mb-12 italic border-l-2 border-earth pl-6">
                        {excerpt}
                    </p>

                    {/* Main Content */}
                    <article
                        className="prose-custom"
                        dangerouslySetInnerHTML={{ __html: renderContent(content) }}
                    />
                </div>
            </Container>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Related Articles */}
            <section className="py-20 bg-linen-light/30">
                <Container>
                    <h2 className="font-serif text-2xl text-charcoal mb-10">
                        {isEn ? "Read Next" : "Baca Juga"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {related.map((rel) => (
                            <Link
                                href={`/${lang}/journal/${rel.slug}`}
                                key={rel.slug}
                                className="group flex gap-6 items-start"
                            >
                                <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-200">
                                    <Image
                                        src={rel.image}
                                        alt={isEn ? rel.titleEn : rel.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <span className="text-xs uppercase tracking-widest text-charcoal/40 mb-2 block">
                                        {isEn ? rel.categoryEn : rel.category}
                                    </span>
                                    <h3 className="font-serif text-lg text-charcoal group-hover:text-earth transition-colors leading-snug">
                                        {isEn ? rel.titleEn : rel.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-16 bg-charcoal text-white text-center">
                <Container>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Julia Owers</p>
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">
                        {isEn ? "Wear the story." : "Kenakan ceritanya."}
                    </h2>
                    <Link
                        href={`/${lang}/shop`}
                        className="inline-block border border-white px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors"
                    >
                        {isEn ? "Shop the Collection" : "Jelajahi Koleksi"}
                    </Link>
                </Container>
            </section>
        </main>
    )
}
