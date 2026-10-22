// Script to seed the "Best Time to Visit Duomo Florence: Seasons, Crowds & Dome Climb Tips" article.
// Safe to re-run: Uses ON CONFLICT (slug) DO UPDATE to prevent duplicate rows.
// Also synchronizes data/posts.json with all active posts in the database.

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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const article = {
  slug: "best-time-to-visit-the-duomo-florence",
  title: "Best Time to Visit Duomo Florence: Seasons, Crowds & Dome Climb Tips",
  metaTitle: "Best Time to Visit Duomo Florence (2026 Guide: Avoid Crowds)",
  metaDescription: "Discover the best time to visit Duomo Florence. Learn when to climb Brunelleschi's Dome, avoid midday tour crowds, and plan your Florence Cathedral visit.",
  category: "Museum Guides",
  excerpt: "From early morning Dome climbs to mild spring months, here is when to visit Florence Cathedral to skip the crushing queues and beat the Tuscan heat.",
  quickAnswer: "The best time to visit the Duomo Florence is during the shoulder months of April to May and September to October, booking the earliest 8:15 AM timeslot for the Brunelleschi Dome climb. You will avoid summer heat, long security queues, and crowded stairwells.",
  readTime: "5 min read",
  date: "2026-10-22",
  updatedAt: "2026-10-22",
  image: "https://7uod7ta1jna1azg6.public.blob.vercel-storage.com/uploads/1792646735379-duomo-florence-best-time-cover-6HNK2LI70rn7qdLGiao3anJaQc7MS5.jpg",
  imageAlt: "Florence Cathedral Santa Maria del Fiore and Brunelleschi Dome at sunrise in Piazza del Duomo",
  author: "Discover Florence Editorial Team",
  recommendedTourId: "duomo-brunelleschi-pass",
  recommendedTourAfterBlock: 1,
  focusKeyword: "best time to visit Duomo Florence",
  ctaHeading: "Ready to visit Florence Cathedral?",
  ctaBody: "Compare Brunelleschi Pass tickets, Dome climb reservations, and guided cathedral tours.",
  ctaButtonText: "View Duomo Florence Tickets",
  ctaButtonHref: "/duomo-florence-tickets",
  content: `<p>Standing proudly in the historic heart of Tuscany, the Cathedral of Santa Maria del Fiore is an architectural marvel. Knowing the <strong>best time to visit Duomo Florence</strong> is essential for avoiding exhausting queues, navigating the strenuous 463-step Dome climb, and enjoying uninterrupted views across Florence’s terracotta rooftops.</p>

<h2>Best Months and Seasons to Visit the Duomo Complex</h2>
<p>Florence experiences a continental Mediterranean climate characterized by sweltering summers and crisp, damp winters. Because exploring the cathedral, climbing Brunelleschi’s Dome, and scaling Giotto’s Campanile require extensive physical exertion, seasonal weather dramatically shapes your visit.</p>

<h3>The Spring & Autumn Sweet Spot (April–May & September–October)</h3>
<p>Late spring and early autumn are widely regarded as the ideal periods to visit. Daytime temperatures typically hover between 18°C and 24°C (64°F to 75°F), providing comfortable conditions for climbing narrow masonry stairwells. The soft Tuscan light illuminates the green, pink, and white marble facade beautifully, and crowd densities are noticeably more manageable than midsummer.</p>

<h3>Summer Crowds & Heat (July–August)</h3>
<p>Summer brings intense heat, with afternoon temperatures routinely surpassing 35°C (95°F). The interior of Brunelleschi’s Dome has no air conditioning, making midday climbs stifling. If traveling during July or August, booking the earliest morning timeslot is critical to avoid heat exhaustion and long security lines in Piazza del Duomo.</p>

<h3>Winter Solitude (November–February)</h3>
<p>Excluding Christmas and New Year’s, winter offers the thinnest crowd levels of the year. While temperatures are cooler (8°C to 12°C) and days are shorter, you can admire the cathedral interior and Museo dell’Opera del Duomo without being hurried by tour groups.</p>

<figure>
  <img src="https://7uod7ta1jna1azg6.public.blob.vercel-storage.com/uploads/1792646738188-duomo-brunelleschi-dome-interior-fresco-aTUjZUbBf1dPmSuzWKALUADiJuwBGQ.jpg" alt="Interior view of Brunelleschi Dome showing Giorgio Vasari Last Judgment fresco in Florence Cathedral" />
  <figcaption>Early morning climbs provide natural illumination to admire Giorgio Vasari’s Last Judgment fresco up close.</figcaption>
</figure>

<h2>Best Time of Day: Morning Rope-Drop vs. Late Afternoon</h2>
<p>Timing your daily entry makes a tremendous difference. Tour groups arriving from Rome and cruise passengers from Livorno flood Piazza del Duomo between 10:30 AM and 2:30 PM.</p>

<h3>Early Morning for the Dome Climb (8:15 AM–9:00 AM)</h3>
<p>Reserve the earliest 8:15 AM or 8:45 AM slot for the Brunelleschi Dome climb. You will ascend the tight corridors between the inner and outer shells before crowds build, enjoy peaceful views over the city, and examine Giorgio Vasari’s <em>Last Judgment</em> frescoes in serene morning light.</p>

<h3>Late Afternoon for the Cathedral Floor (After 3:30 PM)</h3>
<p>General cathedral admission opens at 10:15 AM, creating long queues across the piazza. Joining the line after 3:30 PM usually cuts wait times in half as organized excursions depart.</p>

<h2>Best Days of the Week to Visit</h2>
<p>Tuesdays, Wednesdays, and Thursdays are consistently quieter than weekends. Note that the cathedral has restricted visitor hours on Sundays due to religious services, making Mondays and Saturdays especially crowded.</p>

<h2>Essential Tips for Planning Your Duomo Visit</h2>
<ul>
  <li><strong>Book timed-entry passes weeks ahead:</strong> Access to Brunelleschi’s Dome requires a mandatory reserved timeslot that routinely sells out.</li>
  <li><strong>Dress appropriately:</strong> As an active Catholic cathedral, shoulders and knees must be covered to pass security.</li>
  <li><strong>Wear supportive footwear:</strong> The historic stone steps are steep, worn smooth, and uneven throughout the climb.</li>
  <li><strong>Explore the Opera del Duomo Museum:</strong> Often overlooked, this museum houses Ghiberti’s original bronze Baptistery doors and Michelangelo’s Florence Pietà.</li>
</ul>

<p>By reserving early for an 8:15 AM slot on a midweek spring morning, you will experience the <strong>best time to visit Duomo Florence</strong> with comfortable temperatures, short lines, and magnificent panoramic views.</p>`
};

async function seed() {
  console.log("Seeding article into posts table...");

  await sql`
    INSERT INTO posts (
      slug, title, meta_title, meta_description, category, excerpt,
      quick_answer, read_time, date, updated_at, image, image_alt, author,
      recommended_tour_id, recommended_tour_after_block, content, sort_order,
      cta_heading, cta_body, cta_button_text, cta_button_href, focus_keyword,
      no_index, no_follow, canonical_url, og_title, og_description, og_image
    ) VALUES (
      ${article.slug}, ${article.title}, ${article.metaTitle}, ${article.metaDescription}, ${article.category},
      ${article.excerpt}, ${article.quickAnswer}, ${article.readTime}, ${article.date}, ${article.updatedAt},
      ${article.image}, ${article.imageAlt}, ${article.author},
      ${article.recommendedTourId}, ${article.recommendedTourAfterBlock},
      ${JSON.stringify(article.content)}::jsonb, 0,
      ${article.ctaHeading}, ${article.ctaBody}, ${article.ctaButtonText}, ${article.ctaButtonHref},
      ${article.focusKeyword}, false, false, '', '', '', ''
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
      recommended_tour_after_block = EXCLUDED.recommended_tour_after_block,
      content = EXCLUDED.content,
      cta_heading = EXCLUDED.cta_heading,
      cta_body = EXCLUDED.cta_body,
      cta_button_text = EXCLUDED.cta_button_text,
      cta_button_href = EXCLUDED.cta_button_href,
      focus_keyword = EXCLUDED.focus_keyword,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow;
  `;

  console.log("Article upserted successfully.");

  // Fetch all posts from DB and synchronize data/posts.json
  const allRows = await sql`SELECT * FROM posts ORDER BY date DESC, sort_order ASC;`;
  console.log(`Retrieved ${allRows.length} posts from database.`);

  const mapped = allRows.map((row) => ({
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    category: row.category,
    excerpt: row.excerpt,
    quickAnswer: row.quick_answer,
    readTime: row.read_time,
    date: row.date ? new Date(row.date).toISOString().slice(0, 10) : "",
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString().slice(0, 10) : "",
    image: row.image,
    imageAlt: row.image_alt,
    author: row.author,
    recommendedTourId: row.recommended_tour_id || "",
    recommendedTourAfterBlock: row.recommended_tour_after_block === null ? undefined : Number(row.recommended_tour_after_block),
    content: typeof row.content === "string" ? row.content : row.content,
    ctaHeading: row.cta_heading || "Ready to book?",
    ctaBody: row.cta_body || "Compare tour prices and tickets on the homepage.",
    ctaButtonText: row.cta_button_text || "See Price Comparison",
    ctaButtonHref: row.cta_button_href || "/#prices",
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || ""
  }));

  const postsJsonPath = path.join(process.cwd(), "data", "posts.json");
  fs.writeFileSync(postsJsonPath, JSON.stringify(mapped, null, 2) + "\n", "utf-8");
  console.log(`Updated ${postsJsonPath} with ${mapped.length} posts.`);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
