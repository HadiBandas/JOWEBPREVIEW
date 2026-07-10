// Collection data — semua koleksi editorial Julia Owers
export interface Collection {
    slug: string
    title: string
    titleEn: string
    subtitle: string
    subtitleEn: string
    tagline: string
    taglineEn: string
    description: string
    descriptionEn: string
    heroImage: string
    heroImage2: string
    featuredImages: string[]
    productIds: string[] // referensi ke lib/data.ts
    accentColor: string // bg color for editorial accent strip
    season: string
    seasonEn: string
    year: string
}

export const collections: Collection[] = [
    {
        slug: "summer-essentials",
        title: "Summer Essentials",
        titleEn: "Summer Essentials",
        subtitle: "Koleksi Terkurasi · Musim Panas",
        subtitleEn: "Curated Edit · Summer",
        tagline: "Bergerak bebas. Bernapas lega. Tampil nyata.",
        taglineEn: "Move freely. Breathe easy. Look effortless.",
        description: "Koleksi ini lahir dari percakapan tentang panas — bagaimana tubuh kita menginginkan ketenangan di tengah teriknya siang. Setiap helai dipilih dengan satu pertimbangan utama: udara harus mengalir. Dibuat dari linen European murni 100%, potongan-potongan ini menemani Anda dari pagi bersantai hingga sore golden-hour, tanpa membuat Anda menyesal memilihnya.",
        descriptionEn: "This collection was born from a conversation about heat — how our bodies crave stillness in the middle of a blazing afternoon. Each piece was chosen with one guiding principle: air must flow. Made from 100% pure European linen, these silhouettes carry you from slow mornings to golden-hour afternoons, without a single regret.",
        heroImage: "/images/collections/Collection 1.jpg",
        heroImage2: "/images/collections/Collection 2.jpg",
        featuredImages: [
            "/images/products/1.jpg",
            "/images/products/2.jpg",
            "/images/products/3.jpg",
            "/images/products/4.jpg",
            "/images/collections/Collection 5.jpg",
        ],
        productIds: ["1", "2", "3", "4", "5", "6"],
        accentColor: "#f5f0e8",
        season: "Panas",
        seasonEn: "Summer",
        year: "2025",
    },
    {
        slug: "koleksi-babak-baru",
        title: "Babak Baru",
        titleEn: "A New Chapter",
        subtitle: "Edisi Spesial · Peluncuran",
        subtitleEn: "Special Edition · Launch",
        tagline: "Dimulai dari kain yang hidup.",
        taglineEn: "It begins with fabric that breathes.",
        description: "Babak Baru adalah pernyataan keberanian: bahwa busana yang berkelanjutan tidak perlu berkompromi soal keindahan. Koleksi ini menandai babak baru Julia Owers — di mana setiap jahitan punya cerita, setiap warna punya alasan, dan setiap potongan merayakan tubuh yang bergerak.",
        descriptionEn: "A New Chapter is a statement of courage: that sustainable fashion doesn't need to compromise on beauty. This collection marks a new chapter for Julia Owers — where every stitch tells a story, every color has a reason, and every silhouette celebrates a body in motion.",
        heroImage: "/images/real_assets/2.Belanja/Babak Baru/1.jpg",
        heroImage2: "/images/real_assets/2.Belanja/Babak Baru/2.jpg",
        featuredImages: [
            "/images/real_assets/2.Belanja/Babak Baru/1.jpg",
            "/images/real_assets/2.Belanja/Babak Baru/2.jpg",
            "/images/real_assets/2.Belanja/Babak Baru/3.jpg",
            "/images/collections/Collection 4.jpg",
            "/images/products/5.jpg",
        ],
        productIds: ["3", "4", "5", "6", "7", "8"],
        accentColor: "#f0ede8",
        season: "Peluncuran",
        seasonEn: "Launch",
        year: "2026",
    },
]

export function getCollection(slug: string): Collection | undefined {
    return collections.find((c) => c.slug === slug)
}
