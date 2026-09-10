import Link from "next/link";
import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";
import { getMuseums } from "@/lib/museums";

// Full-bleed panoramic hero — same structural pattern as the pena-palace /
// amsterdam-boat-tours reference sites: one edge-to-edge photo with a
// readability gradient baked in, sitting directly behind the transparent
// StickyHeader (see Header.tsx). Every piece of copy here still comes from
// the same admin fields as before (Homepage -> Hero): heroBadge, heroHeading,
// heroSubheading, heroImage/heroImageAlt, heroCtaPrimaryText/Href, and the
// heroFeatures trust strip — this only changes the visual layout, not what's
// editable.
//
// Layout note: the text block and the floating museum badge are both
// `absolute inset-0`-anchored layers, not flex children relying on a nested
// `h-full` percentage height inside a `flex-1` sibling. That combination
// (flex-grow on a parent + height:100% on a grandchild) is a classic
// flexbox trap — the flex-grow consumes all the free space before
// `justify-center` ever gets a chance to distribute it, so the text ends up
// pinned to the top instead of vertically centered. Anchoring each layer
// directly to the section's own edges with `inset-0` sidesteps that
// entirely and centers reliably at every viewport size.
// One shared checkmark icon for every trust-strip item. The admin's
// "Feature strip" field (Homepage -> Hero) only stores title + subtitle per
// item (see HeroFeature in lib/homepage.ts) — there's no per-item icon to
// pick from, so a single consistent icon is used for all of them rather
// than inventing icon choices the admin can never actually control.
function TrustFeatureIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

export default async function Hero() {
  const [content, museums] = await Promise.all([getHomepageContent(), getMuseums()]);

  const heroImage = content.heroImage || "/images/hero-florence-duomo.jpg";
  const heroBadge = content.heroBadge || "THE ART, HISTORY & BEAUTY OF FLORENCE";
  const heroHeading = content.heroHeading || "Things to Do in Florence";
  const heroSubheading =
    content.heroSubheading?.replace(/<[^>]+>/g, "").trim() ||
    "Explore Florence's most famous museums, historic landmarks, and unforgettable experiences. Find the best attractions and plan your visit with confidence.";
  // These were previously hardcoded to "Explore Florence" / "#museums",
  // completely ignoring the admin's "Primary button text"/"Primary button
  // link" fields (Homepage -> Hero) — fixed to actually read them.
  const ctaText = content.heroCtaPrimaryText || "Explore Florence";
  const ctaHref = content.heroCtaPrimaryHref || "#museums";

  const spotlightMuseum = museums.find((m) => m.featured) || museums[0];

  // Was previously a hardcoded array of 4 fixed title/subtitle pairs,
  // completely ignoring the admin's "Feature strip" repeatable list
  // (Homepage -> Hero) — fixed to read content.heroFeatures, falling back
  // to the same 4 defaults only when the admin hasn't set any.
  const trustFeatures =
    content.heroFeatures && content.heroFeatures.length > 0
      ? content.heroFeatures
      : [
          { title: "Best Florence Attractions", subtitle: "Top-rated experiences" },
          { title: "Skip-the-Line Tickets", subtitle: "Save time, enjoy more" },
          { title: "Expert Travel Guides", subtitle: "Local knowledge" },
          { title: "Easy Booking", subtitle: "Secure & flexible" },
        ];

  return (
    <section className="relative h-[100svh] max-h-[760px] min-h-[520px] w-full overflow-hidden bg-white">
      {/* Full-bleed panoramic background photo */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={heroImage}
          alt={content.heroImageAlt || "Florence Duomo Santa Maria del Fiore Cathedral panoramic aerial view at sunset"}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-[70%_center] lg:object-right"
        />
        {/* Localized white gradient overlay covering all text content cleanly */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-b from-white/95 via-white/85 to-transparent sm:w-[58%] sm:bg-gradient-to-r sm:from-white sm:from-40% sm:via-white/95 sm:via-70% sm:via-white/50 sm:via-88% sm:to-transparent lg:w-[54%]" />
      </div>

      {/* Text content container — height matches the section (100svh,
          capped) rather than each breakpoint having its own fixed min-h, so
          the whole hero (heading through trust strip) always fits in one
          viewport with no scrolling, on both short laptop screens and tall
          desktop monitors. */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1380px] flex-col justify-center px-5 py-6 sm:px-8 lg:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow with leading dash */}
          <div className="flex items-center gap-2.5">
            <span className="h-[1.5px] w-7 bg-[#A07A48]" />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#A07A48] sm:text-[11.5px]">
              {heroBadge}
            </p>
          </div>

          {/* H1 Heading — was hardcoded to "Things to Do in / Florence"
              regardless of what the admin set as the Hero headline; now
              reads content.heroHeading (wraps naturally instead of forcing
              a manual line break, since a custom admin value won't
              necessarily split the same way as the default). Sized down one
              notch from before (and spacing tightened throughout below) so
              the full hero — heading, subheading, CTAs, and trust strip —
              fits inside one viewport with no scrolling. */}
          <h1 className="mt-3 font-serif text-[32px] font-bold tracking-tight text-[#143E38] sm:text-[42px] md:text-[48px] lg:text-[52px] lg:leading-[1.12]">
            {heroHeading}
          </h1>

          {/* Subheading */}
          <p className="mt-3.5 max-w-lg text-[13px] leading-relaxed text-[#4B5563] sm:text-[14.5px]">
            {heroSubheading}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#184E3A] px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123b2c] hover:shadow-lg"
            >
              <span>{ctaText}</span>
              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1F2937] transition-colors hover:text-[#184E3A]"
            >
              <span>Read Our Guides</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* 4 Feature Trust Points with Icons & Dividers */}
          <div className="mt-7 flex flex-wrap items-center gap-y-3 text-xs font-semibold text-[#1F2937]">
            {trustFeatures.map((f, i) => (
              <div key={f.title} className="flex items-center">
                <div className="flex items-start gap-2.5 pr-4 sm:pr-6">
                  <span className="mt-0.5 shrink-0 text-[#184E3A]">
                    <TrustFeatureIcon />
                  </span>
                  <div>
                    <p className="text-[11.5px] sm:text-[12px] font-bold text-[#1F2937] leading-tight">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-[10px] font-normal text-[#6B7280]">
                      {f.subtitle}
                    </p>
                  </div>
                </div>
                {i < trustFeatures.length - 1 && (
                  <span className="hidden h-7 w-px bg-gray-300/80 mr-4 sm:mr-6 lg:inline-block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
