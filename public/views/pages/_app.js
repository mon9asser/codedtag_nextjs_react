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
  
  const [adsbygoogleLoaded, setAdsbygoogleLoaded] = useState(false);

  /*
  google_analytics: {
        enabled: {
            type: Boolean,
            trim: true,
            default: false
        },
        field: {
            type: String,
            trim: true,
            default: ""
        },
    },
    google_ads: {
        enabled: {
            type: Boolean,
            trim: true,
            default: false
        },
        field: {
            type: String,
            trim: true,
            default: ""
        },
    },
  */
  
  var settings = (pageProps.upcoming == undefined || pageProps == undefined) ? null: pageProps.upcoming.settings; 
 
  if( settings != null )
  console.log(settings.google_ads.enabled);


  useEffect(() => {
    if (adsbygoogleLoaded && settings && settings.google_ads.enabled) {
      // Ensure this only runs once after ads have been rendered and the AdSense script has loaded
      const adSlots = document.getElementsByClassName('adsbygoogle');

      for (var i = 0; i < adSlots.length; i++) {
        const adSlot = adSlots[i];
        if (!adSlot.hasAttribute('data-adsbygoogle-status')) {
          // Initialize only if not already done
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      }

      // Optional: Log the number of ad slots found
      console.log("Number of ad slots initialized: " + adSlots.length);
    }
  }, [adsbygoogleLoaded, settings]); 

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

        
        { 
          ( settings != null && settings.google_ads.enabled ) && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_ads.field}`}
              strategy="lazyOnload"
              crossOrigin="anonymous"
              onLoad={() => {
                // Mark the AdSense script as loaded
                setAdsbygoogleLoaded(true);
              }}  
            />
          )  
        } 

        

        <Head>
            <link rel="manifest" href="/icons/manifest.json" />
            <meta name="theme-color" content="#000000" />
            <link rel="icon" href="/icons/favicon.ico" />
            <link rel="apple-touch-icon" href="/icons/logo192.png" /> 
        </Head>
    </div>
  );
}

 