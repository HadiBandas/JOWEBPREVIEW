import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google"; // Using Google Fonts for simplicity/reliability
import Link from "next/link";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import PageLoader from "@/components/ui/page-loader";
import { getDictionary } from "@/lib/dictionary";
import { CartProvider } from "@/components/shop/cart-provider";
import { AnalyticsInjector } from "@/components/analytics-injector";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juliaowers.com"),
  title: "Julia Owers | Timeless Linen. Thoughtful Living.",
  description: "Brand fashion linen lokal Indonesia. 100% European linen, handcrafted di Bandung. Desain minimalis timeless untuk wanita modern yang menghargai kenyamanan dan kualitas.",
  keywords: ["linen dress", "fashion linen indonesia", "baju linen bandung", "sustainable fashion", "julia owers", "linen wanita"],
  openGraph: {
    title: "Julia Owers | Timeless Linen. Thoughtful Living.",
    description: "Brand fashion linen lokal Indonesia. 100% European linen, handcrafted di Bandung. Desain minimalis timeless untuk wanita modern.",
    url: "https://juliaowers.com",
    siteName: "Julia Owers",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Julia Owers — Timeless Linen Fashion",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julia Owers | Timeless Linen. Thoughtful Living.",
    description: "Brand fashion linen lokal Indonesia. 100% European linen, handcrafted di Bandung.",
    images: ["/images/hero.png"],
  },
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang || 'en'} className={`${inter.variable} ${lora.variable}`}>
      <body className="antialiased selection:bg-earth selection:text-white" suppressHydrationWarning>
        <AnalyticsInjector />
        <CartProvider>
          <PageLoader />
          <Header dictionary={dictionary.header} />
          <main className="min-h-screen">
            {props.children}
          </main>
          <Footer dict={dictionary.footer} />
        </CartProvider>
      </body>
    </html>
  );
}
