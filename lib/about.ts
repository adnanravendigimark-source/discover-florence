import { sql } from "./db";

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const DEFAULT_ABOUT: AboutPageContent = {
  heroEyebrow: "About Us",
  heroHeading: "Your Independent Guide to Discovering Florence & Duomo Tickets",
  heroSubheading:
    "We help travelers experience the Renaissance splendour of Florence with verified skip-the-line tickets, Brunelleschi Dome climbs, and guided museum tours.",
  heroImage: "https://images.unsplash.com/photo-1541370976299-4d20eb3460f6?q=80&w=1600&auto=format&fit=crop",
  heroImageAlt: "Panoramic view of Florence Duomo and Tuscan hills",
  content: `<h2>Why We Created Discover Florence</h2>
<p>Florence is the cradle of the Italian Renaissance, home to a concentration of artistic genius unmatched anywhere on earth. From Brunelleschi's revolutionary dome to Michelangelo's David and Botticelli's Birth of Venus, visiting Florence is a transformative experience.</p>
<p>However, securing entry tickets to monuments like the Duomo Dome climb and the Uffizi Gallery can be challenging, with tickets often selling out weeks in advance. Discover Florence was created to provide travelers with comprehensive, transparent guides, practical visitor tips, and verified skip-the-line ticketing options.</p>
<h2>What We Offer</h2>
<ul>
<li><strong>Guaranteed Skip-The-Line Access</strong> — Compare authentic passes and skip-the-line tickets from verified, authorized providers.</li>
<li><strong>Expert Local Guides</strong> — Discover curated tours led by licensed Florentine art historians and master storytellers.</li>
<li><strong>Comprehensive Practical Guides</strong> — Opening hours, dress codes, best times to visit, and step-by-step itineraries to maximize your stay.</li>
<li><strong>Affiliate Transparency</strong> — We partner with reputable ticketing providers (like GetYourGuide and Tiqets) and may earn a small commission at no additional cost to you.</li>
</ul>
<p>Have questions about planning your Florence adventure? <a href="/contact">Reach out to our editorial team</a>.</p>`,
  metaTitle: "About Us | Discover Florence",
  metaDescription:
    "Learn about Discover Florence: our mission, curation standards, and independent guide to Duomo tickets, Uffizi Gallery, and Florence attractions.",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogTitle: "About Us | Discover Florence",
  ogDescription:
    "Learn about Discover Florence: our mission, curation standards, and independent guide to Duomo tickets, Uffizi Gallery, and Florence attractions.",
  ogImage: "https://images.unsplash.com/photo-1541370976299-4d20eb3460f6?q=80&w=1600&auto=format&fit=crop",
};

interface LegacyReason {
  title?: string;
  body?: string;
}

function parseLegacyReasons(value: unknown): LegacyReason[] {
  if (Array.isArray(value)) return value;
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

// Older deploys of this page stored structured fields (intro paragraphs, a
// reasons grid, a disclosure block, etc.) instead of one flowing content
// field. If a row still has that shape and hasn't been resaved through the
// new single rich-text editor yet, stitch it into the same flowing HTML the
// new page expects, instead of silently dropping real admin-authored copy.
function synthesizeLegacyContent(row: any): string {
  const parts: string[] = [];
  const asHtml = (v: unknown) => {
    const s = typeof v === "string" ? v.trim() : "";
    if (!s) return "";
    return /<[a-z][\s\S]*>/i.test(s) ? s : `<p>${s}</p>`;
  };

  if (row.intro_heading) parts.push(`<h2>${row.intro_heading}</h2>`);
  parts.push(asHtml(row.intro_paragraph_1));
  parts.push(asHtml(row.intro_paragraph_2));

  if (row.reasons_heading) parts.push(`<h2>${row.reasons_heading}</h2>`);
  parts.push(asHtml(row.reasons_subheading));
  const reasons = parseLegacyReasons(row.reasons);
  if (reasons.length) {
    const items = reasons
      .filter((r) => r.title || r.body)
      .map((r) => `<li>${r.title ? `<strong>${r.title}</strong>` : ""}${r.title && r.body ? " — " : ""}${r.body || ""}</li>`)
      .join("");
    if (items) parts.push(`<ul>${items}</ul>`);
  }

  if (row.disclosure_heading) parts.push(`<h2>${row.disclosure_heading}</h2>`);
  parts.push(asHtml(row.disclosure_body));
  parts.push(asHtml(row.contact_prompt_html));

  return parts.filter(Boolean).join("\n");
}

function rowToAbout(row: any): AboutPageContent {
  const content = (typeof row.content === "string" && row.content.trim()) || synthesizeLegacyContent(row) || DEFAULT_ABOUT.content;
  return {
    heroEyebrow: row.hero_eyebrow || DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading || DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading || DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image || DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt || DEFAULT_ABOUT.heroImageAlt,
    content,
    metaTitle: row.meta_title || DEFAULT_ABOUT.metaTitle,
    metaDescription: row.meta_description || DEFAULT_ABOUT.metaDescription,
    canonicalUrl: row.canonical_url || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    ogTitle: row.og_title || DEFAULT_ABOUT.ogTitle,
    ogDescription: row.og_description || DEFAULT_ABOUT.ogDescription,
    ogImage: row.og_image || DEFAULT_ABOUT.ogImage,
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  try {
    const rows = await sql`SELECT * FROM about_page WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToAbout(rows[0]) : DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function saveAboutPage(data: AboutPageContent): Promise<void> {
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      content, meta_title, meta_description, canonical_url,
      no_index, no_follow, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow}, ${data.heroHeading}, ${data.heroSubheading},
      ${data.heroImage}, ${data.heroImageAlt}, ${data.content || ""},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.canonicalUrl || ""},
      ${!!data.noIndex}, ${!!data.noFollow},
      ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      content = EXCLUDED.content,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      canonical_url = EXCLUDED.canonical_url,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

export async function setAboutIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO about_page (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}
