import { Container } from "@/components/ui/container"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/shop/product-card"
import { CategoryProductGrid } from "@/components/shop/category-product-grid"
import { getDictionary } from "@/lib/dictionary"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ lang: string; category: string }>
}

const validCategories = ["tops", "bottoms", "dresses", "outerwear"]

// Map our URL slugs to the data categories
const categoryMap: Record<string, string> = {
    "tops": "Tops",
    "bottoms": "Bottoms",
    "dresses": "Dresses",
    "outerwear": "Outerwear"
}

export async function generateStaticParams() {
    const langs = ["id", "en"]
    return langs.flatMap((lang) =>
        validCategories.map((category) => ({
            lang,
            category,
        }))
    )
}

export default async function CategoryPage(props: Props) {
    const params = await props.params;
    const { lang, category } = params;
    
    if (!validCategories.includes(category)) {
        notFound();
    }

    const dictionary = await getDictionary(lang);
    const isEn = lang === "en";

    const dataCategory = categoryMap[category];
    const categoryProducts = products.filter(p => p.category === dataCategory);

    // Get unique subcategories for the filter sidebar
    const subCategories = Array.from(new Set(categoryProducts.map(p => p.subCategory)));

    const categoryTitles: Record<string, { id: string, en: string }> = {
        "tops": { id: "Atasan", en: "Tops" },
        "bottoms": { id: "Bawahan", en: "Bottoms" },
        "dresses": { id: "Terusan", en: "Dresses" },
        "outerwear": { id: "Luaran", en: "Outerwear" }
    }

    const title = isEn ? categoryTitles[category].en : categoryTitles[category].id;

    return (
        <main className="pt-32 pb-24 min-h-screen bg-white">
            <Container>
                {/* Header */}
                <div className="mb-12 border-b border-gray-200 pb-6 flex items-baseline justify-between">
                    <div>
                        <Link href={`/${lang}/shop`} className="text-xs uppercase tracking-widest text-charcoal/50 hover:text-earth mb-4 inline-block">
                            {isEn ? "← Back to Shop" : "← Kembali ke Shop"}
                        </Link>
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal">
                            {title}
                        </h1>
                    </div>
                    <span className="text-sm text-charcoal/50">
                        {categoryProducts.length} {isEn ? "Pieces" : "Produk"}
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Filter Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-24">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal mb-6">
                                {isEn ? "Filter by Type" : "Filter Jenis"}
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <button className="text-sm text-earth font-medium">
                                        {isEn ? "All " : "Semua "}{title}
                                    </button>
                                </li>
                                {subCategories.map(sub => (
                                    <li key={sub}>
                                        <button className="text-sm text-charcoal/60 hover:text-charcoal transition-colors text-left">
                                            {sub} <span className="opacity-50 text-xs ml-1">({categoryProducts.filter(p => p.subCategory === sub).length})</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal mb-6">
                                    {isEn ? "Filter by Size" : "Filter Ukuran"}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["XS", "S", "M", "L", "XL"].map(size => (
                                        <button key={size} className="w-10 h-10 border border-gray-200 text-xs flex items-center justify-center hover:border-charcoal hover:bg-charcoal hover:text-white transition-colors">
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Product Grid — membaca dari CMS store (client component) */}
                    <CategoryProductGrid
                        dataCategory={dataCategory}
                        isEn={isEn}
                    />
                    </div>
                </div>
            </Container>
        </main>
    )
}
