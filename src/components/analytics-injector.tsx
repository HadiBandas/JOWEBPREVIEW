"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"

interface Integrations {
    ga4Id: string
    metaPixelId: string
    tiktokPixelId: string
    gtmId: string
    searchConsoleCode: string
    enableGA4: boolean
    enableMeta: boolean
    enableTiktok: boolean
    enableGTM: boolean
}

export function AnalyticsInjector() {
    const [config, setConfig] = useState<Integrations | null>(null)
    const pathname = usePathname()

    const loadConfig = () => {
        try {
            const saved = localStorage.getItem("jo_integrations")
            if (saved) {
                setConfig(JSON.parse(saved))
            }
        } catch (e) {
            console.error("Failed to load integrations config", e)
        }
    }

    useEffect(() => {
        // Load on mount
        loadConfig()

        // Listen to custom event from admin panel
        window.addEventListener("jo_integrations_updated", loadConfig)
        return () => window.removeEventListener("jo_integrations_updated", loadConfig)
    }, [])

    useEffect(() => {
        // Simulate pageview event on route change if GA4 is enabled
        if (config?.enableGA4 && config.ga4Id && typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("config", config.ga4Id, {
                page_path: pathname,
            })
        }
        
        // Simulate Meta Pixel pageview
        if (config?.enableMeta && config.metaPixelId && typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "PageView")
        }
    }, [pathname, config])

    if (!config) return null

    return (
        <>
            {/* Google Search Console */}
            {config.searchConsoleCode && (
                <div dangerouslySetInnerHTML={{ __html: config.searchConsoleCode }} />
            )}

            {/* Google Analytics 4 */}
            {config.enableGA4 && config.ga4Id && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`} strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${config.ga4Id}');
                        `}
                    </Script>
                </>
            )}

            {/* Google Tag Manager */}
            {config.enableGTM && config.gtmId && (
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${config.gtmId}');
                    `}
                </Script>
            )}

            {/* Meta Pixel */}
            {config.enableMeta && config.metaPixelId && (
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${config.metaPixelId}');
                        fbq('track', 'PageView');
                    `}
                </Script>
            )}

            {/* TikTok Pixel */}
            {config.enableTiktok && config.tiktokPixelId && (
                <Script id="tiktok-pixel" strategy="afterInteractive">
                    {`
                        !function (w, d, t) {
                        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                        ttq.load('${config.tiktokPixelId}');
                        ttq.page();
                        }(window, document, 'ttq');
                    `}
                </Script>
            )}
        </>
    )
}
