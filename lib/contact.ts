import { sql } from "./db";

export interface ContactReason {
  icon: string;
  title: string;
  body: string;
}

export interface ContactPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  email: string;
  emailLabel: string;
  emailNote: string;
  reasonsHeading: string;
  reasons: ContactReason[];
  footerNote: string;
  ctaHeading: string;
  ctaButtonLabel: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const DEFAULT_CONTACT: ContactPageContent = {
  heroEyebrow: "Contact Us",
  heroHeading: "Get in Touch with Our Florence Travel Team",
  heroSubheading:
    "Questions about booking Duomo Florence tickets, Brunelleschi Dome climbs, Uffizi Gallery passes, or partnership inquiries? Reach out to our team directly.",
  email: "adnanravendigimark@gmail.com",
  emailLabel: "Email Us Directly",
  emailNote: "We typically respond within 1–2 business days.",
  reasonsHeading: "How We Can Help",
  reasons: [
    { icon: "HeadsetIcon", title: "Ticket & Tour Advice", body: "Need help choosing between Brunelleschi Pass, Giotto Pass, or guided Dome climbs? Ask our Florence specialists." },
    { icon: "BriefcaseIcon", title: "Partnerships & Operators", body: "Licensed Florentine tour operators, museums, and travel publishers — reach out regarding listings and collaborations." },
    { icon: "MailIcon", title: "General Inquiries", body: "Feedback, visitor tips, accessibility questions, or editorial suggestions for our Florence guides." },
  ],
  footerNote:
    "Already booked? Please refer to your confirmation voucher from the ticketing partner to contact your tour provider directly for real-time meeting point directions or schedule changes.",
  ctaHeading: "Ready to explore Florence?",
  ctaButtonLabel: "Compare Florence Tickets & Tours",
  metaTitle: "Contact Us | Discover Florence | Duomo Florence",
  metaDescription:
    "Questions about Duomo tickets, Brunelleschi Dome climb, Uffizi Gallery, or planning your Florence visit? Contact Discover Florence.",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogTitle: "Contact Us | Discover Florence | Duomo Florence",
  ogDescription:
    "Questions about Duomo tickets, Brunelleschi Dome climb, Uffizi Gallery, or planning your Florence visit? Contact Discover Florence.",
  ogImage: "https://images.unsplash.com/photo-1541370976299-4d20eb3460f6?q=80&w=1600&auto=format&fit=crop",
};

function parseReasons(value: unknown): ContactReason[] {
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

function rowToContact(row: any): ContactPageContent {
  return {
    heroEyebrow: row.hero_eyebrow || DEFAULT_CONTACT.heroEyebrow,
    heroHeading: row.hero_heading || DEFAULT_CONTACT.heroHeading,
    heroSubheading: row.hero_subheading || DEFAULT_CONTACT.heroSubheading,
    email: row.email || DEFAULT_CONTACT.email,
    emailLabel: row.email_label || DEFAULT_CONTACT.emailLabel,
    emailNote: row.email_note || DEFAULT_CONTACT.emailNote,
    reasonsHeading: row.reasons_heading || DEFAULT_CONTACT.reasonsHeading,
    reasons: parseReasons(row.reasons).length ? parseReasons(row.reasons) : DEFAULT_CONTACT.reasons,
    footerNote: row.footer_note || DEFAULT_CONTACT.footerNote,
    ctaHeading: row.cta_heading || DEFAULT_CONTACT.ctaHeading,
    ctaButtonLabel: row.cta_button_label || DEFAULT_CONTACT.ctaButtonLabel,
    metaTitle: row.meta_title || DEFAULT_CONTACT.metaTitle,
    metaDescription: row.meta_description || DEFAULT_CONTACT.metaDescription,
    canonicalUrl: row.canonical_url || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getContactPage(): Promise<ContactPageContent> {
  try {
    const rows = await sql`SELECT * FROM contact_page WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToContact(rows[0]) : DEFAULT_CONTACT;
  } catch {
    return DEFAULT_CONTACT;
  }
}
export const getContactContent = getContactPage;

export async function saveContactPage(data: Partial<ContactPageContent>): Promise<void> {
  await sql`
    INSERT INTO contact_page (
      id, hero_eyebrow, hero_heading, hero_subheading, email, email_label, email_note,
      reasons_heading, reasons, footer_note, cta_heading, cta_button_label,
      meta_title, meta_description, canonical_url, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow || DEFAULT_CONTACT.heroEyebrow}, ${data.heroHeading || DEFAULT_CONTACT.heroHeading},
      ${data.heroSubheading || DEFAULT_CONTACT.heroSubheading}, ${data.email || DEFAULT_CONTACT.email},
      ${data.emailLabel || DEFAULT_CONTACT.emailLabel}, ${data.emailNote || DEFAULT_CONTACT.emailNote},
      ${data.reasonsHeading || DEFAULT_CONTACT.reasonsHeading},
      ${JSON.stringify(data.reasons || DEFAULT_CONTACT.reasons)}::jsonb,
      ${data.footerNote || DEFAULT_CONTACT.footerNote}, ${data.ctaHeading || DEFAULT_CONTACT.ctaHeading},
      ${data.ctaButtonLabel || DEFAULT_CONTACT.ctaButtonLabel},
      ${data.metaTitle || DEFAULT_CONTACT.metaTitle}, ${data.metaDescription || DEFAULT_CONTACT.metaDescription},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      email = EXCLUDED.email,
      email_label = EXCLUDED.email_label,
      email_note = EXCLUDED.email_note,
      reasons_heading = EXCLUDED.reasons_heading,
      reasons = EXCLUDED.reasons,
      footer_note = EXCLUDED.footer_note,
      cta_heading = EXCLUDED.cta_heading,
      cta_button_label = EXCLUDED.cta_button_label,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}
export const saveContactContent = saveContactPage;

export async function setContactIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO contact_page (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}
