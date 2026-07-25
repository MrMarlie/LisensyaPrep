import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AutoAds from "@/components/AutoAds";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  // Plain string (not a `{ default, template }` object) on purpose: it is the
  // fallback title for pages that set none, and — unlike a template — it does NOT
  // append the brand to child titles. Every page already brands its own title (via
  // buildMetadata's `absolute` output or an explicit `| LisensyaPrep` suffix), so a
  // template would double it: "… | LisensyaPrep | LisensyaPrep".
  title: "LisensyaPrep — Free PRC Board Exam Reviewer Philippines 2026",
  description:
    "Free gamified PRC licensure exam reviewer for Filipino professionals. Battle bosses, earn PRZ pieces, and crush the board exam.",
  metadataBase: new URL("https://lisensyaprep.com"),
  openGraph: {
    siteName: "LisensyaPrep",
    locale: "en_PH",
    type: "website",
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "LisensyaPrep" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og-default.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://lisensyaprep.com/#website",
      "url": "https://lisensyaprep.com",
      "name": "LisensyaPrep",
      "description": "Free gamified PRC board exam reviewer for Filipino professionals.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://lisensyaprep.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://lisensyaprep.com/#organization",
      "name": "LisensyaPrep",
      "url": "https://lisensyaprep.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lisensyaprep.com/assets/logo.png",
      },
      "sameAs": [],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          data-grow-initializer=""
          dangerouslySetInnerHTML={{__html:`!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTowNTRkN2Q0Ny0yMGVkLTRmOTYtOWY4MS04MDMzNzJlZjQyNTQ=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`}}
        />
      </head>
      <body className={`${inter.className} bg-[#080d1b] text-white antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CP2WTTWKQH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CP2WTTWKQH');
          `}
        </Script>
        <AutoAds />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
