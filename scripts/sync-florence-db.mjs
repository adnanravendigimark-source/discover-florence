import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const dataDir = path.join(process.cwd(), "data");

function readJsonFile(name) {
  const filePath = path.join(dataDir, name);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function syncHomepage() {
  console.log("Updating homepage row in DB for Discover Florence...");
  const heroFeatures = [
    { title: "Skip The Line", subtitle: "Save time, enjoy more" },
    { title: "Verified Tickets", subtitle: "100% authentic" },
    { title: "Best Price Guarantee", subtitle: "No hidden fees" },
    { title: "Instant Confirmation", subtitle: "Get tickets in minutes" },
    { title: "24/7 Support", subtitle: "We're here to help" },
  ];

  const sections = {
    grid: {
      eyebrow: "POPULAR ATTRACTIONS",
      heading: "Explore the Best of Florence",
      subheading: "From Renaissance masterpieces to breathtaking architecture, explore Florence's best monuments and plan your visit with ease.",
    },
    highlights: {
      eyebrow: "WHY VISIT FLORENCE",
      heading: "A City of Art, History & Culture",
      subheading: "Florence is more than a destination — it's an experience. From world-famous museums to stunning architecture, every corner tells a story.",
      polaroidImage1: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=800&auto=format&fit=crop",
      polaroidImage1Alt: "Uffizi Gallery corridor",
      polaroidImage2: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
      polaroidImage2Alt: "Michelangelo David sculpture",
      polaroidCaption: "Renaissance Florence",
      cards: [
        { icon: "🏛️", title: "World-Class Museums", body: "Home to the greatest art collections in the world." },
        { icon: "🏰", title: "Iconic Landmarks", body: "Marvel at the Duomo, Ponte Vecchio and more." },
        { icon: "🎨", title: "Rich History", body: "Walk through centuries of Renaissance heritage." },
        { icon: "🧭", title: "Easy Travel", body: "Perfectly walkable and well connected." },
      ],
    },
    blogTeaser: {
      eyebrow: "TRAVEL GUIDES",
      heading: "Popular Articles & Florence Guides",
      subheading: "Tips and travel insights to help you plan the best visit to Florence.",
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
          answer: "<p>We are an independent travel guide and affiliate partner working with authorized ticket platforms (including GetYourGuide and Tiqets) to help you compare verified skip-the-line passes, guided tours, and authentic attraction tickets.</p>",
        },
        {
          question: "Do I need to book Duomo Dome and Uffizi tickets in advance?",
          answer: "<p>Yes, booking in advance is strongly recommended. Brunelleschi's Dome climb and the Uffizi Gallery have strict timed-entry quotas and sell out weeks in advance.</p>",
        },
      ],
    },
    ctaBanner: {
      heading: "Plan Your Florence Adventure",
      subtext: "Get skip-the-line access to the Duomo, Uffizi, and Accademia with instant confirmation.",
      buttonText: "Explore Articles →",
      buttonHref: "/blog",
    },
    notFound: {
      heading: "This page seems to have wandered off.",
      body: "The page you are looking for does not exist. Explore our featured Florence attractions below.",
      primaryButtonText: "Browse Florence Attractions →",
      primaryButtonHref: "/#museums",
      secondaryButtonText: "Read Travel Guides",
      secondaryButtonHref: "/blog",
    },
  };

  const header = {
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
    ctaHref: "/#museums",
  };

  const footer = {
    tagline: "<strong>Discover Florence | Duomo Florence</strong> — Your independent guide to Florence's most iconic attractions, world-class Renaissance museums, skip-the-line tickets, and expert guided tours.",
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
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact Us", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ],
      },
    ],
    addressHeading: "Discover Florence",
    addressLine1: "Independent Florence museum & attraction ticketing guide",
    addressLine2: "Piazza del Duomo & Centro Storico, Florence, Italy",
    copyrightText: "Discover Florence. All rights reserved.",
  };

  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      hero_features, hero_cta_primary_text, hero_cta_primary_href,
      sections_json, header_json, footer_json,
      meta_title, meta_description, focus_keyword, canonical_url,
      og_title, og_description, og_image
    ) VALUES (
      1,
      'THE ART, HISTORY & BEAUTY OF FLORENCE',
      'Things to Do in Florence',
      '<p>Explore Florence''s most famous museums, historic landmarks, and unforgettable experiences. Find the best attractions and plan your visit with confidence.</p>',
      '/images/hero-florence-duomo.jpg',
      'Duomo Florence Santa Maria del Fiore Cathedral at golden sunset',
      ${JSON.stringify(heroFeatures)}::jsonb,
      'Explore Tickets',
      '#museums',
      ${JSON.stringify(sections)}::jsonb,
      ${JSON.stringify(header)}::jsonb,
      ${JSON.stringify(footer)}::jsonb,
      'Discover Florence | Duomo Florence Tickets & City Guide',
      'Discover Florence | Duomo Florence — Book verified skip-the-line tickets for the Duomo Dome climb, Uffizi Gallery, and Accademia Michelangelo David.',
      'Discover Florence | Duomo Florence',
      '',
      'Discover Florence | Duomo Florence Tickets & City Guide',
      'Discover Florence | Duomo Florence — Book verified skip-the-line tickets for the Duomo Dome climb, Uffizi Gallery, and Accademia Michelangelo David.',
      'https://images.unsplash.com/photo-1541370976299-4d20eb3460f6?q=80&w=1600&auto=format&fit=crop'
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
      sections_json = EXCLUDED.sections_json,
      header_json = EXCLUDED.header_json,
      footer_json = EXCLUDED.footer_json,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      focus_keyword = EXCLUDED.focus_keyword,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
  console.log("Homepage row updated successfully.");
}

async function syncMuseums() {
  console.log("Syncing Florence attractions into DB...");
  const museums = readJsonFile("museums.json");
  if (!museums) return;

  for (let i = 0; i < museums.length; i++) {
    const m = museums[i];
    await sql`
      INSERT INTO museums (
        id, slug, name, city, country, currency_symbol, lat, lng, sort_order, featured,
        card_image, card_image_alt, card_tagline,
        hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
        highlights_eyebrow, highlights_heading, highlights_subheading, highlights,
        about_heading, about_body, tours_eyebrow, tours_heading, tours_subheading,
        practical_hours_heading, practical_hours, practical_hours_note,
        practical_address_heading, practical_address, practical_getting_there,
        practical_best_time_heading, practical_best_time_body,
        price_eyebrow, price_heading, price_subheading, price_note,
        faq_eyebrow, faq_heading,
        cta_heading, cta_subtext, cta_button_text, nearby_heading_override,
        rating, reviews_count,
        meta_title, meta_description, focus_keyword, canonical_url,
        no_index, no_follow, og_title, og_description, og_image
      ) VALUES (
        ${m.id}, ${m.slug}, ${m.name}, ${m.city || ""}, ${m.country || ""}, ${m.currencySymbol || "€"},
        ${Number(m.lat) || 0}, ${Number(m.lng) || 0}, ${m.sortOrder ?? i}, ${!!m.featured},
        ${m.cardImage || ""}, ${m.cardImageAlt || ""}, ${m.cardTagline || ""},
        ${m.heroBadge || ""}, ${m.heroHeading || m.name}, ${m.heroSubheading || ""}, ${m.heroImage || ""}, ${m.heroImageAlt || ""},
        ${m.highlightsEyebrow || ""}, ${m.highlightsHeading || ""}, ${m.highlightsSubheading || ""}, ${JSON.stringify(m.highlights || [])}::jsonb,
        ${m.aboutHeading || ""}, ${m.aboutBody || ""}, ${m.toursEyebrow || ""}, ${m.toursHeading || ""}, ${m.toursSubheading || ""},
        ${m.practicalHoursHeading || ""}, ${JSON.stringify(m.practicalHours || [])}::jsonb, ${m.practicalHoursNote || ""},
        ${m.practicalAddressHeading || ""}, ${m.practicalAddress || ""}, ${m.practicalGettingThere || ""},
        ${m.practicalBestTimeHeading || ""}, ${m.practicalBestTimeBody || ""},
        ${m.priceEyebrow || ""}, ${m.priceHeading || ""}, ${m.priceSubheading || ""}, ${m.priceNote || ""},
        ${m.faqEyebrow || ""}, ${m.faqHeading || ""},
        ${m.ctaHeading || ""}, ${m.ctaSubtext || ""}, ${m.ctaButtonText || ""}, ${m.nearbyHeadingOverride || ""},
        ${m.rating ?? 4.7}, ${m.reviewsCount || "10.2k"},
        ${m.metaTitle || m.name}, ${m.metaDescription || ""}, ${m.focusKeyword || "Discover Florence | Duomo Florence"}, ${m.canonicalUrl || ""},
        ${!!m.noIndex}, ${!!m.noFollow}, ${m.ogTitle || ""}, ${m.ogDescription || ""}, ${m.ogImage || ""}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        name = EXCLUDED.name,
        city = EXCLUDED.city,
        country = EXCLUDED.country,
        currency_symbol = EXCLUDED.currency_symbol,
        lat = EXCLUDED.lat,
        lng = EXCLUDED.lng,
        sort_order = EXCLUDED.sort_order,
        featured = EXCLUDED.featured,
        card_image = EXCLUDED.card_image,
        card_image_alt = EXCLUDED.card_image_alt,
        card_tagline = EXCLUDED.card_tagline,
        hero_badge = EXCLUDED.hero_badge,
        hero_heading = EXCLUDED.hero_heading,
        hero_subheading = EXCLUDED.hero_subheading,
        hero_image = EXCLUDED.hero_image,
        hero_image_alt = EXCLUDED.hero_image_alt,
        highlights_eyebrow = EXCLUDED.highlights_eyebrow,
        highlights_heading = EXCLUDED.highlights_heading,
        highlights_subheading = EXCLUDED.highlights_subheading,
        highlights = EXCLUDED.highlights,
        about_heading = EXCLUDED.about_heading,
        about_body = EXCLUDED.about_body,
        tours_eyebrow = EXCLUDED.tours_eyebrow,
        tours_heading = EXCLUDED.tours_heading,
        tours_subheading = EXCLUDED.tours_subheading,
        practical_hours_heading = EXCLUDED.practical_hours_heading,
        practical_hours = EXCLUDED.practical_hours,
        practical_hours_note = EXCLUDED.practical_hours_note,
        practical_address_heading = EXCLUDED.practical_address_heading,
        practical_address = EXCLUDED.practical_address,
        practical_getting_there = EXCLUDED.practical_getting_there,
        practical_best_time_heading = EXCLUDED.practical_best_time_heading,
        practical_best_time_body = EXCLUDED.practical_best_time_body,
        price_eyebrow = EXCLUDED.price_eyebrow,
        price_heading = EXCLUDED.price_heading,
        price_subheading = EXCLUDED.price_subheading,
        price_note = EXCLUDED.price_note,
        faq_eyebrow = EXCLUDED.faq_eyebrow,
        faq_heading = EXCLUDED.faq_heading,
        cta_heading = EXCLUDED.cta_heading,
        cta_subtext = EXCLUDED.cta_subtext,
        cta_button_text = EXCLUDED.cta_button_text,
        nearby_heading_override = EXCLUDED.nearby_heading_override,
        rating = EXCLUDED.rating,
        reviews_count = EXCLUDED.reviews_count,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        focus_keyword = EXCLUDED.focus_keyword,
        canonical_url = EXCLUDED.canonical_url,
        no_index = EXCLUDED.no_index,
        no_follow = EXCLUDED.no_follow,
        og_title = EXCLUDED.og_title,
        og_description = EXCLUDED.og_description,
        og_image = EXCLUDED.og_image
    `;
  }
  console.log(`Synced ${museums.length} museums.`);
}

async function syncPosts() {
  console.log("Syncing Florence blog posts into DB...");
  const posts = readJsonFile("posts.json");
  if (!posts) return;

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const date = p.date || new Date().toISOString().slice(0, 10);
    await sql`
      INSERT INTO posts (
        slug, title, meta_title, meta_description, category, excerpt,
        quick_answer, read_time, date, updated_at, image, image_alt, author,
        recommended_tour_id, recommended_tour_after_block, content, sort_order,
        cta_heading, cta_body, cta_button_text, cta_button_href, focus_keyword,
        no_index, no_follow, canonical_url, og_title, og_description, og_image
      ) VALUES (
        ${p.slug}, ${p.title}, ${p.metaTitle || p.title}, ${p.metaDescription || p.excerpt || ""},
        ${p.category || "Travel Guide"}, ${p.excerpt || ""}, ${p.quickAnswer || ""},
        ${p.readTime || "5 min read"}, ${date}, ${p.updatedAt || date}, ${p.image || ""}, ${p.imageAlt || ""},
        ${p.author || "Discover Florence Editorial Team"},
        ${p.recommendedTourId || ""}, ${p.recommendedTourAfterBlock ?? null},
        ${JSON.stringify(p.content || "")}::jsonb, ${i},
        ${p.ctaHeading || ""}, ${p.ctaBody || ""}, ${p.ctaButtonText || ""}, ${p.ctaButtonHref || ""},
        ${p.focusKeyword || "Discover Florence | Duomo Florence"}, ${!!p.noIndex}, ${!!p.noFollow}, ${p.canonicalUrl || ""},
        ${p.ogTitle || ""}, ${p.ogDescription || ""}, ${p.ogImage || ""}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        category = EXCLUDED.category,
        excerpt = EXCLUDED.excerpt,
        quick_answer = EXCLUDED.quick_answer,
        read_time = EXCLUDED.read_time,
        date = EXCLUDED.date,
        updated_at = EXCLUDED.updated_at,
        image = EXCLUDED.image,
        image_alt = EXCLUDED.image_alt,
        author = EXCLUDED.author,
        recommended_tour_id = EXCLUDED.recommended_tour_id,
        content = EXCLUDED.content,
        sort_order = EXCLUDED.sort_order,
        cta_heading = EXCLUDED.cta_heading,
        cta_body = EXCLUDED.cta_body,
        cta_button_text = EXCLUDED.cta_button_text,
        cta_button_href = EXCLUDED.cta_button_href,
        focus_keyword = EXCLUDED.focus_keyword,
        og_title = EXCLUDED.og_title,
        og_description = EXCLUDED.og_description,
        og_image = EXCLUDED.og_image
    `;
  }
  console.log(`Synced ${posts.length} posts.`);
}

async function main() {
  await syncHomepage();
  await syncMuseums();
  await syncPosts();
  console.log("\nDiscover Florence DB sync complete!");
}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
