import './globals.css';
import './prism.css';

import React from 'react';
import Script from 'next/script';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import Header from '@/blocks/Header';
import Footer from '@/blocks/Footer';

const Layout = ({ children }) => {
  const { site_url = '' } = publicRuntimeConfig;

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {site_url !== 'https://devools.com' && (
          <meta name="robots" content="noindex,nofollow" />
        )}
      </head>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-gray-100">
        <div className="flex flex-col min-h-screen justify-between">
          <Header />
          site_url: {site_url}
          {children}
          <Footer />
        </div>

        <>
          <Script
            async
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></Script>
          <Script>
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
          <Script nonce="nx6y64C06khQ9i0TRktWUA">{`(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`}</Script>
        </>
      </body>
    </html>
  );
};

export default Layout;
