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
export default async function Hero() {
  const [content, museums] = await Promise.all([getHomepageContent(), getMuseums()]);

  const heroImage =
    content.heroImage?.includes("louvre") || !content.heroImage || content.heroImage === "/images/hero-duomo.jpg"
      ? "/images/hero-florence-duomo.jpg"
      : content.heroImage;
  const heroBadge = content.heroBadge || "THE ART, HISTORY & BEAUTY OF FLORENCE";
  const heroHeading = content.heroHeading || "Things to Do in Florence";
  const heroSubheading =
    content.heroSubheading?.replace(/<[^>]+>/g, "").trim() ||
    "Explore Florence's most famous museums, historic landmarks, and unforgettable experiences. Find the best attractions and plan your visit with confidence.";
  const ctaText = "Explore Florence";
  const ctaHref = "#museums";

  const spotlightMuseum = museums.find((m) => m.featured) || museums[0];

  const trustFeatures = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
        </svg>
      ),
      title: "Best Florence Attractions",
      subtitle: "Top-rated experiences",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Skip-the-Line Tickets",
      subtitle: "Save time, enjoy more",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Expert Travel Guides",
      subtitle: "Local knowledge",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
        </svg>
      ),
      title: "Easy Booking",
      subtitle: "Secure & flexible",
    },
  ];

  return (
    <section className="relative min-h-[640px] w-full overflow-hidden bg-white sm:min-h-[680px] lg:min-h-[760px]">
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
        {/* Crisp soft left-to-right white gradient overlay matching reference design */}
        <div className="absolute inset-0 bg-gradient-to-b from-white from-25% via-white/95 via-65% to-white/30 sm:bg-gradient-to-r sm:from-white sm:from-28% sm:via-white/95 sm:via-48% sm:via-white/50 sm:via-62% sm:to-transparent" />
      </div>

      {/* Text content container */}
      <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-[1380px] flex-col justify-center px-5 py-24 sm:min-h-[680px] sm:px-8 sm:py-28 lg:min-h-[760px] lg:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow with leading dash */}
          <div className="flex items-center gap-2.5">
            <span className="h-[1.5px] w-7 bg-[#A07A48]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A07A48] sm:text-[12px]">
              {heroBadge}
            </p>
          </div>

          {/* H1 Heading (2-line serif title) */}
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-[#143E38] sm:text-5xl md:text-[56px] lg:text-[62px] lg:leading-[1.1]">
            Things to Do in<br />Florence
          </h1>

          {/* Subheading */}
          <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-[#4B5563] sm:text-[16px]">
            {heroSubheading}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#184E3A] px-7 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123b2c] hover:shadow-lg"
            >
              <span>{ctaText}</span>
              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1F2937] transition-colors hover:text-[#184E3A]"
            >
              <span>Read Our Guides</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* 4 Feature Trust Points with Icons & Dividers */}
          <div className="mt-12 flex flex-wrap items-center gap-y-4 text-xs font-semibold text-[#1F2937]">
            {trustFeatures.map((f, i) => (
              <div key={f.title} className="flex items-center">
                <div className="flex items-start gap-3 pr-4 sm:pr-6">
                  <span className="mt-0.5 shrink-0 text-[#184E3A]">
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-[12.5px] sm:text-[13px] font-bold text-[#1F2937] leading-tight">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-[11px] font-normal text-[#6B7280]">
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

      {/* Floating Spotlight Card at Bottom Right */}
      {spotlightMuseum && (
        <Link
          href={`/${spotlightMuseum.slug}`}
          className="group absolute bottom-5 right-4 z-20 flex items-center gap-3.5 rounded-2xl border border-white/90 bg-white/95 px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F3ED] text-[#184E3A]">
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <div>
            <p className="text-[13px] font-bold leading-tight text-[#1F2937] transition-colors group-hover:text-[#184E3A]">
              Duomo di Firenze
            </p>
            <p className="text-[11px] font-medium text-gray-500">
              Florence, Italy
            </p>
          </div>
          <span className="ml-1 text-sm font-bold text-gray-400 transition-colors group-hover:text-[#184E3A]">
            ›
          </span>
        </Link>
      )}
    </section>
  );
}
