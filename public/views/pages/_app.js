import { Poppins } from 'next/font/google';
import "@/app/globals.css"; // Import your global styles
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }) {
   
  
  var settings = (pageProps.upcoming == undefined || pageProps == undefined) ? null: pageProps.upcoming.settings; 
  
  return (
    <div className={poppins.className}>
        <Component {...pageProps} />
        

        {
          // Google Analytics 
          (settings != null && settings.google_analytics.enabled) && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics.field}`}
                strategy="afterInteractive"
                crossOrigin="anonymous" 
              />

              <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${settings.google_analytics.field}');
                  `,
                }}
              />
            </>
          )
        }
        
        <Head>
            <link rel="manifest" href="/icons/manifest.json" />
            <meta name="theme-color" content="#000000" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icons/favicon.ico" />
            <link rel="apple-touch-icon" href="/icons/logo192.png" /> 
        
            { 
              ( settings != null && settings.google_ads.enabled ) && (
                <script
                  async
                  id="adsbygoogle-script-tag"
                  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_ads.field}`}
                  crossOrigin="anonymous" 
                />
              )  
            }

        </Head>
    </div>
  );
}

 