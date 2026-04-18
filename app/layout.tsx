import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "LisensyaPrep — Free PRC Board Exam Reviewer Philippines 2026",
    template: "%s | LisensyaPrep",
  },
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
      <body className={`${inter.className} bg-[#080d1b] text-white antialiased`}>
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
