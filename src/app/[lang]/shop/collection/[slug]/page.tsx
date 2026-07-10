import { notFound } from "next/navigation"
import { getCollection, collections } from "@/lib/collections"
import CollectionPageClient from "./client"

export async function generateStaticParams() {
    const langs = ["id", "en"]
    return langs.flatMap((lang) =>
        collections.map((c) => ({ lang, slug: c.slug }))
    )
}

export default async function CollectionPage(
    props: { params: Promise<{ lang: string; slug: string }> }
) {
    const { lang, slug } = await props.params
    const collection = getCollection(slug)

    if (!collection) notFound()

    const isEn = lang === "en"

    return (
        <CollectionPageClient
            collection={collection}
            lang={lang}
            isEn={isEn}
        />
    )
}
