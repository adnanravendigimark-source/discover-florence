import type { Metadata } from "next";
import Script from "next/script";
import { Roboto, Roboto_Slab, Outfit, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { SITE_URL, FOCUS_KEYWORD } from "@/lib/site";
import { resolveRobots } from "@/lib/seo";
import { getSiteChrome } from "@/lib/homepage";
import { hexToRgbTriplet } from "@/lib/color";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-slab",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1541370976299-4d20eb3460f6?q=80&w=1200&auto=format&fit=crop";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Discover Florence | Duomo Florence",
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero-duomo.jpg`,
  description:
    "Your independent guide to Duomo Florence tickets, Brunelleschi Dome climbs, Uffizi Gallery, and top Renaissance attractions in Florence.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Discover Florence | Duomo Florence",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/#attractions`,
    "query-input": "required name=search_term_string"
  }
};

export function generateMetadata(): Metadata {
  const robots = resolveRobots(false);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Discover Florence | Duomo Florence Tickets & City Guide",
      template: "%s | Discover Florence",
    },
    description:
      "Discover Florence | Duomo Florence — Book verified skip-the-line tickets for the Duomo Dome climb, Uffizi Gallery, and Accademia Michelangelo's David.",
    keywords: [
      FOCUS_KEYWORD,
      "Duomo Florence",
      "Duomo Florence Tickets",
      "Brunelleschi Dome Climb",
      "Uffizi Gallery Tickets",
      "Accademia Gallery David",
      "Florence City Pass",
      "Things to do in Florence",
    ],
    alternates: {
      canonical: "/",
    },
    robots,
    openGraph: {
      title: "Discover Florence | Duomo Florence Tickets & City Guide",
      description:
        "Discover Florence | Duomo Florence — Book verified skip-the-line tickets for the Duomo Dome climb, Uffizi Gallery, and Accademia Michelangelo's David.",
      type: "website",
      url: SITE_URL,
      siteName: "Discover Florence",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Discover Florence - Duomo Florence Tickets",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Discover Florence | Duomo Florence Tickets & City Guide",
      description:
        "Discover Florence | Duomo Florence — Book verified skip-the-line tickets for the Duomo Dome climb, Uffizi Gallery, and Accademia Michelangelo's David.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function buildThemeStyle(theme: { primary: string; secondary: string; dark: string }) {
  const vars: [string, string | null][] = [
    ["--color-canal-primary", hexToRgbTriplet(theme.primary || "#143E38")],
    ["--color-canal-blue", hexToRgbTriplet(theme.secondary || "#C28C47")],
    ["--color-canal-ink", hexToRgbTriplet(theme.dark || "#1A2221")],
  ];
  const declarations = vars
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}:${value};`)
    .join("");
  return declarations ? `:root{${declarations}}` : "";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = await getSiteChrome();
  const themeStyle = buildThemeStyle(theme);

  return (
    <html lang="en" className={`${roboto.variable} ${robotoSlab.variable} ${playfair.variable} ${outfit.variable} ${plusJakartaSans.variable}`}>
      {GA_MEASUREMENT_ID && (
        <head>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        </head>
      )}
      <body className="font-sans bg-[#FFFFFF] text-[#4A5553] antialiased selection:bg-[#143E38] selection:text-white">
        {themeStyle && <style dangerouslySetInnerHTML={{ __html: themeStyle }} />}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
