// cache() was removed from the exports below — see the note in
// lib/museums.ts for why: these functions are also called from Route
// Handlers, where cache()'s per-request memoization is not reliable and
// caused stale reads after admin writes.
import { sql } from "./db";

/* ------------------------------------------------------------------ */
/* Discover Florence | Duomo Florence Content Model                   */
/* ------------------------------------------------------------------ */

export interface HeroFeature {
  title: string;
  subtitle: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface HighlightCard {
  icon: string;
  title: string;
  body: string;
}

export interface HighlightsSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  cards: HighlightCard[];
  polaroidImage1: string;
  polaroidImage1Alt: string;
  polaroidImage2: string;
  polaroidImage2Alt: string;
  polaroidCaption: string;
}

export interface GridSection {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface BlogTeaserSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  viewAllText: string;
  readArticleText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: FaqItem[];
}

export interface CtaBannerSection {
  heading: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
}

export interface NotFoundSection {
  heading: string;
  body: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export interface HomepageSections {
  grid: GridSection;
  highlights: HighlightsSection;
  blogTeaser: BlogTeaserSection;
  faq: FaqSection;
  ctaBanner: CtaBannerSection;
  notFound: NotFoundSection;
}

export interface HeaderContent {
  logoImage: string;
  logoAlt: string;
  bookNowText: string;
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  addressHeading: string;
  addressLine1: string;
  addressLine2: string;
  copyrightText: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  dark: string;
}

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroFeatures: HeroFeature[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  sections: HomepageSections;
  header: HeaderContent;
  footer: FooterContent;
  theme: ThemeColors;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export const DEFAULT_HEADER: HeaderContent = {
  logoImage: "",
  logoAlt: "DUOMO FLORENCE",
  bookNowText: "Explore Tickets",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Duomo Florence Tickets", href: "/duomo-florence-tickets" },
    { label: "Uffizi Gallery Tickets", href: "/uffizi-gallery-tickets" },
    { label: "Accademia Gallery Tickets", href: "/accademia-gallery-tickets" },
    { label: "Blog", href: "/blog" },
  ],
  ctaText: "Explore Tickets",
  ctaHref: "/#attractions",
};

export const DEFAULT_FOOTER: FooterContent = {
  tagline:
    "<strong>Discover Florence</strong> — Your independent guide to Florence's most iconic attractions, world-class Renaissance museums, skip-the-line tickets, and expert guided tours.",
  columns: [
    {
      title: "Top Attractions",
      links: [
        { label: "Duomo Florence Tickets", href: "/duomo-florence-tickets" },
        { label: "Uffizi Gallery Tickets", href: "/uffizi-gallery-tickets" },
        { label: "Accademia Gallery Tickets", href: "/accademia-gallery-tickets" },
        { label: "Ponte Vecchio", href: "/ponte-vecchio-florence" },
        { label: "Palazzo Vecchio", href: "/palazzo-vecchio-florence" },
        { label: "Boboli Gardens", href: "/boboli-gardens-florence" },
      ],
    },
    {
      title: "Florence Guides",
      links: [
        { label: "Best Time to Visit Florence", href: "/blog/best-time-to-visit-florence" },
        { label: "Uffizi Gallery Guide", href: "/blog/uffizi-gallery-what-to-see-and-how-to-plan-your-visit" },
        { label: "Visiting Accademia Gallery", href: "/blog/visiting-the-accademia-gallery-tips-for-a-great-experience" },
        { label: "1 Day in Florence Itinerary", href: "/blog/1-day-in-florence-the-perfect-itinerary" },
      ],
    },
    {
      title: "Company & Legal",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ],
  addressHeading: "Discover Florence",
  addressLine1: "Independent Florence travel & museum ticketing guide",
  addressLine2: "Piazza del Duomo & Centro Storico, Florence, Italy",
  copyrightText:
    "Discover Florence. All rights reserved. Not affiliated with the official Opera di Santa Maria del Fiore or State Museums.",
};

export const DEFAULT_THEME: ThemeColors = {
  primary: "#143E38",   // Deep Emerald
  secondary: "#C28C47", // Renaissance Gold/Bronze
  dark: "#1A2221",      // Charcoal Slate
};

export const DEFAULT_HERO_FEATURES: HeroFeature[] = [
  { title: "Skip The Line", subtitle: "Save time, enjoy more" },
  { title: "Verified Tickets", subtitle: "100% authentic" },
  { title: "Best Price Guarantee", subtitle: "No hidden fees" },
  { title: "Instant Confirmation", subtitle: "Get tickets in minutes" },
  { title: "24/7 Support", subtitle: "We're here to help" },
];

export const DEFAULT_SECTIONS: HomepageSections = {
  grid: {
    eyebrow: "EXPLORE FLORENCE",
    heading: "Things to Do in Florence",
    subheading: "From Renaissance masterpieces to breathtaking architecture, discover the must-see experiences in Florence.",
  },
  highlights: {
    eyebrow: "WHY VISIT FLORENCE",
    heading: "A City of Art, History & Culture",
    subheading: "Florence is more than a destination — it's an experience. From world-famous museums to stunning architecture, every corner tells a story.",
    cards: [
      { icon: "🏛️", title: "World-Class Museums", body: "Home to the greatest art collections in the world." },
      { icon: "🏰", title: "Iconic Landmarks", body: "Marvel at the Duomo, Ponte Vecchio and more." },
      { icon: "🎨", title: "Rich History", body: "Walk through centuries of Renaissance heritage." },
      { icon: "🧭", title: "Easy Travel", body: "Perfectly walkable and well connected." },
    ],
    polaroidImage1: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=800&auto=format&fit=crop",
    polaroidImage1Alt: "Uffizi Gallery corridor",
    polaroidImage2: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    polaroidImage2Alt: "Michelangelo David sculpture",
    polaroidCaption: "Renaissance masterpieces in Florence",
  },
  blogTeaser: {
    eyebrow: "LATEST FROM OUR BLOG",
    heading: "Travel Tips & Florence Guides",
    subheading: "Expert tips, itineraries, and visitor guides to help you make the most of your trip to Florence.",
    viewAllText: "View All Articles",
    readArticleText: "Read More",
  },
  faq: {
    eyebrow: "GOT QUESTIONS?",
    heading: "Frequently Asked Questions",
    subheading: "Everything you need to know about visiting Florence and booking tickets.",
    items: [
      {
        question: "Is Discover Florence an official ticket vendor?",
        answer:
          "<p>We are an independent travel guide and affiliate partner working with authorized ticket platforms (including GetYourGuide and Tiqets) to help you compare verified skip-the-line passes, guided tours, and authentic attraction tickets.</p>",
      },
      {
        question: "Do I need to book Duomo Dome and Uffizi tickets in advance?",
        answer:
          "<p>Yes, booking in advance is strongly recommended. Brunelleschi's Dome climb and the Uffizi Gallery both have strict timed-entry quotas and frequently sell out weeks in advance, especially from April through October.</p>",
      },
      {
        question: "What is the cancellation policy on tickets?",
        answer:
          "<p>Most tickets and guided tours booked through our partner links offer free cancellation up to 24 hours before your scheduled time slot. Check the cancellation policy on the specific booking page before confirming.</p>",
      },
      {
        question: "Are mobile tickets accepted at Florence attractions?",
        answer:
          "<p>Yes. All major Florence sights, including the Duomo complex, Uffizi Gallery, and Accademia, accept digital tickets scanned directly from your smartphone.</p>",
      },
    ],
  },
  ctaBanner: {
    heading: "Plan Your Florence Adventure",
    subtext: "Get skip-the-line access to the Duomo, Uffizi, and Accademia with instant confirmation.",
    buttonText: "Explore All Florence Tickets →",
    buttonHref: "/#attractions",
  },
  notFound: {
    heading: "This page seems to have wandered off the gallery floor.",
    body: "The page you are looking for does not exist or may have been moved. Explore our featured Florence attractions below.",
    primaryButtonText: "Explore Florence Attractions →",
    primaryButtonHref: "/#attractions",
    secondaryButtonText: "Read Travel Guides",
    secondaryButtonHref: "/blog",
  },
};

const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroBadge: "THE ART, HISTORY & BEAUTY OF FLORENCE",
  heroHeading: "Things to Do in Florence",
  heroSubheading:
    "<p>Explore iconic landmarks, world-class art and unforgettable experiences in the heart of Tuscany. Plan your perfect visit to Florence with our expert guides and easy ticket options.</p>",
  heroImage: "/images/hero-florence-duomo.jpg",
  heroImageAlt: "Florence Duomo Santa Maria del Fiore at golden sunset",
  heroFeatures: DEFAULT_HERO_FEATURES,
  heroCtaPrimaryText: "Explore Tickets",
  heroCtaPrimaryHref: "#attractions",
  sections: DEFAULT_SECTIONS,
  header: DEFAULT_HEADER,
  footer: DEFAULT_FOOTER,
  theme: DEFAULT_THEME,
  metaTitle: "Discover Florence | Duomo Tickets & Florence City Guide",
  metaDescription:
    "Discover Florence — Book verified skip-the-line tickets for the Duomo Dome climb, Uffizi Gallery, and Accademia Michelangelo's David.",
  focusKeyword: "Discover Florence",
  noIndex: false,
  noFollow: false,
  canonicalUrl: "",
  ogTitle: "Discover Florence | Duomo Tickets & Florence City Guide",
  ogDescription:
    "Discover Florence — Book verified skip-the-line tickets for the Duomo Dome climb, Uffizi Gallery, and Accademia Michelangelo's David.",
  ogImage: "https://images.unsplash.com/photo-1541370976299-4d20eb3460f6?q=80&w=1600&auto=format&fit=crop",
};

function parseArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function parseJsonWithDefault<T extends object>(value: unknown, fallback: T): T {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = null;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
  return { ...fallback, ...(parsed as Partial<T>) };
}

function rowToHomepage(row: any): HomepageContent {
  const sectionsRaw = parseJsonWithDefault<HomepageSections>(row.sections_json, DEFAULT_SECTIONS);
  return {
    heroBadge: row.hero_badge || DEFAULT_HOMEPAGE_CONTENT.heroBadge,
    heroHeading: row.hero_heading || DEFAULT_HOMEPAGE_CONTENT.heroHeading,
    heroSubheading: row.hero_subheading || DEFAULT_HOMEPAGE_CONTENT.heroSubheading,
    heroImage: row.hero_image || DEFAULT_HOMEPAGE_CONTENT.heroImage,
    heroImageAlt: row.hero_image_alt || DEFAULT_HOMEPAGE_CONTENT.heroImageAlt,
    heroFeatures: (() => {
      const f = parseArray<HeroFeature>(row.hero_features);
      return f.length ? f : DEFAULT_HERO_FEATURES;
    })(),
    heroCtaPrimaryText: row.hero_cta_primary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryText,
    heroCtaPrimaryHref: row.hero_cta_primary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryHref,
    sections: {
      grid: { ...DEFAULT_SECTIONS.grid, ...sectionsRaw.grid },
      highlights: { ...DEFAULT_SECTIONS.highlights, ...sectionsRaw.highlights },
      blogTeaser: { ...DEFAULT_SECTIONS.blogTeaser, ...sectionsRaw.blogTeaser },
      faq: { ...DEFAULT_SECTIONS.faq, ...sectionsRaw.faq },
      ctaBanner: { ...DEFAULT_SECTIONS.ctaBanner, ...sectionsRaw.ctaBanner },
      notFound: { ...DEFAULT_SECTIONS.notFound, ...sectionsRaw.notFound },
    },
    header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
    footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
    theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    metaTitle: row.meta_title || DEFAULT_HOMEPAGE_CONTENT.metaTitle,
    metaDescription: row.meta_description || DEFAULT_HOMEPAGE_CONTENT.metaDescription,
    focusKeyword: row.focus_keyword || DEFAULT_HOMEPAGE_CONTENT.focusKeyword,
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || DEFAULT_HOMEPAGE_CONTENT.ogTitle,
    ogDescription: row.og_description || DEFAULT_HOMEPAGE_CONTENT.ogDescription,
    ogImage: row.og_image || DEFAULT_HOMEPAGE_CONTENT.ogImage,
  };
}

async function getHomepageContentImpl(): Promise<HomepageContent> {
  try {
    const rows = await sql`SELECT * FROM homepage WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToHomepage(rows[0]) : DEFAULT_HOMEPAGE_CONTENT;
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}
export const getHomepageContent = getHomepageContentImpl;

async function getSiteChromeImpl(): Promise<{ header: HeaderContent; footer: FooterContent; theme: ThemeColors }> {
  try {
    const rows = await sql`SELECT header_json, footer_json, theme_json FROM homepage WHERE id = 1 LIMIT 1`;
    if (!rows.length) return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
    const row = rows[0] as any;
    return {
      header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
      footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
      theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    };
  } catch {
    return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
  }
}
export const getSiteChrome = getSiteChromeImpl;

export async function saveHomepageCopy(data: {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroFeatures: HeroFeature[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      hero_features, hero_cta_primary_text, hero_cta_primary_href,
      meta_title, meta_description, focus_keyword,
      canonical_url, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt},
      ${JSON.stringify(data.heroFeatures || [])}::jsonb,
      ${data.heroCtaPrimaryText || ""}, ${data.heroCtaPrimaryHref || ""},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.focusKeyword || ""},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      hero_features = EXCLUDED.hero_features,
      hero_cta_primary_text = EXCLUDED.hero_cta_primary_text,
      hero_cta_primary_href = EXCLUDED.hero_cta_primary_href,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      focus_keyword = EXCLUDED.focus_keyword,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

export async function setHomepageIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO homepage (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveHomepageSections(sections: HomepageSections): Promise<void> {
  await sql`
    INSERT INTO homepage (id, sections_json)
    VALUES (1, ${JSON.stringify(sections)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET sections_json = EXCLUDED.sections_json
  `;
}

export async function saveSiteHeader(header: HeaderContent): Promise<void> {
  // Rebuild a clean HeaderContent object rather than spreading whatever the
  // client sent as-is — scrubs stray legacy keys (buttonText, buttonHref,
  // searchPlaceholder, etc., from the old scripts/sync-content.mjs seed)
  // off the record on every save, so they can never again shadow ctaText /
  // ctaHref for an admin editing the Navbar section.
  const clean: HeaderContent = {
    logoImage: header.logoImage || "",
    logoAlt: header.logoAlt || "",
    bookNowText: header.bookNowText || "",
    navLinks: header.navLinks || [],
    ctaText: header.ctaText || "",
    ctaHref: header.ctaHref || "",
  };
  await sql`
    INSERT INTO homepage (id, header_json)
    VALUES (1, ${JSON.stringify(clean)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET header_json = EXCLUDED.header_json
  `;
}

export async function saveSiteFooter(footer: FooterContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, footer_json)
    VALUES (1, ${JSON.stringify(footer)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET footer_json = EXCLUDED.footer_json
  `;
}

export async function saveSiteTheme(theme: ThemeColors): Promise<void> {
  await sql`
    INSERT INTO homepage (id, theme_json)
    VALUES (1, ${JSON.stringify(theme)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET theme_json = EXCLUDED.theme_json
  `;
}
