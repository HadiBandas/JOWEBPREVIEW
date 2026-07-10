import { Hero } from "@/components/home/hero"
import { Marquee } from "@/components/home/marquee"
import { SignatureLooks } from "@/components/home/signature-looks"
import { FeaturedCollection } from "@/components/home/featured-collection"
import { Testimonials } from "@/components/home/testimonials"
import { VisitStores } from "@/components/home/visit-stores"
import { BrandIntro } from "@/components/home/brand-intro"
import { WhatsAppCTA } from "@/components/home/whatsapp-cta"
import { getDictionary } from "@/lib/dictionary"

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <Hero dict={dictionary.home.hero} />
      <Marquee dict={dictionary.home.marquee} />
      <FeaturedCollection dict={dictionary.home.featured} />
      <BrandIntro dict={dictionary.home.brandIntro} />
      <SignatureLooks dict={dictionary.home.signature} />
      <Testimonials dict={dictionary.home.testimonials} />
      <WhatsAppCTA dict={dictionary.home.whatsapp} />
      <VisitStores dict={dictionary.home.stores} />
    </>
  )
}
