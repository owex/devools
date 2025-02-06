import type { Metadata } from "next";
import Script from "next/script";
import { Lato } from "next/font/google";

import Header from "@/resources/blocks/Header";
import Footer from "@/resources/blocks/Footer";
import BuyMeACoffee from "@/resources/components/BuyMeACoffee";

import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300"], display: "swap" });

export const metadata: Metadata = {
  title: {
    template: "%s | Devools",
    absolute: "Devools",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://devools.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const env = process.env.NODE_ENV;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID; // Must be prefixed with NEXT_PUBLIC_ for client-side use

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {siteUrl !== "https://devools.com" && <meta name="robots" content="noindex,nofollow" />}
      </head>
      <body className={`${lato.className} bg-white dark:bg-gray-900 text-black dark:text-gray-100`}>
        {env !== "development" && gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}

        <div className="flex flex-col min-h-screen">
          <Header />
          <BuyMeACoffee />
          {children}
          <Footer />
        </div>

        {/* GTM Script (Inside <body>) */}
        {env !== "development" && gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}</Script>
        )}

        {/* Google Ads */}
        <>
          <Script
            async
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></Script>
          <Script id="code-adsbygoogle">
            {`(adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-3529443987032959",
              enable_page_level_ads: true
            });`}
          </Script>
          <Script
            async
            src="https://fundingchoicesmessages.google.com/i/pub-3529443987032959?ers=1"
            nonce="nx6y64C06khQ9i0TRktWUA"
          ></Script>
          <Script id="googlefcPresent" nonce="nx6y64C06khQ9i0TRktWUA">{`(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`}</Script>
        </>
      </body>
    </html>
  );
}
