'use client'
import Script from 'next/script'

export default function Analytics() {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-3E8C09YD12"
                strategy="afterInteractive"
            />

            <Script id="ga-init" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3E8C09YD12');
        `}
            </Script>

            <Script id="clarity" strategy="afterInteractive">
                {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "c2136u1t6f");
        `}
            </Script>
        </>
    )
}