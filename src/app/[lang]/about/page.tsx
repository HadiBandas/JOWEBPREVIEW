import { Container } from "@/components/ui/container"
import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"

export default async function AboutPage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const dictionary = await getDictionary(params.lang);
    const dict = dictionary.about;
    return (
        <main className="pt-24 pb-24">
            {/* Hero Section */}
            <section className="mb-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="font-serif text-5xl md:text-7xl text-charcoal leading-[1.1] mb-8">
                                {dict.title1} <br />
                                <span className="italic text-earth">{dict.title2}</span>
                            </h1>
                            <div className="w-24 h-px bg-charcoal mb-8" />
                            <p className="text-lg text-charcoal/70 leading-relaxed font-serif">
                                {dict.p1}
                            </p>
                        </div>
                        <div className="relative aspect-[4/5]">
                            <Image src="/images/about.jpg" alt="Julia Owers Atelier" fill className="object-cover" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Collage Brand Story */}
            <section className="bg-linen-light py-24 overflow-hidden">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5 relative h-[600px] hidden lg:block">
                            <div className="absolute left-0 top-0 w-3/4 h-3/4">
                                <Image src="/images/collections/Collection 4.jpg" alt="Detail" fill className="object-cover" />
                            </div>
                            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 border-8 border-linen-light z-10">
                                <Image src="/images/collections/Collection 5.jpg" alt="Texture" fill className="object-cover" />
                            </div>
                        </div>

                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <h2 className="font-serif text-4xl text-charcoal mb-8">{dict.rooted}</h2>
                            <div className="prose prose-lg text-charcoal/70">
                                <p>{dict.p2}</p>
                                <p>{dict.p3}</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Editorial Stores List */}
            <section className="py-24 bg-charcoal text-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/20">
                        <div className="p-12 text-center md:text-left hover:bg-white/5 transition-colors">
                            <h3 className="font-serif text-3xl mb-4">Heritage Bandung</h3>
                            <p className="text-white/60 mb-8">Jl. L.L.RE Martadinata No.63-65</p>
                            <a href={`/${params.lang}/stores`} className="text-xs uppercase tracking-widest border-b border-white pb-1">{dict.viewLocation}</a>
                        </div>
                        <div className="p-12 text-center md:text-left hover:bg-white/5 transition-colors">
                            <h3 className="font-serif text-3xl mb-4">Heritage Bintaro</h3>
                            <p className="text-white/60 mb-8">Bintaro Jaya, South Tangerang</p>
                            <a href={`/${params.lang}/stores`} className="text-xs uppercase tracking-widest border-b border-white pb-1">{dict.viewLocation}</a>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
