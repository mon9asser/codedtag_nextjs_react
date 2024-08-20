import { Poppins } from 'next/font/google';
import "@/app/globals.css"; // Import your global styles
import Head from 'next/head';
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={poppins.className}>
        <Component {...pageProps} />
        <Head>
            <link rel="manifest" href="/icons/manifest.json" />
            <meta name="theme-color" content="#000000" />
            <link rel="icon" href="/icons/favicon.ico" />
            <link rel="apple-touch-icon" href="/icons/logo192.png" />
        </Head>
    </div>
  );
}
