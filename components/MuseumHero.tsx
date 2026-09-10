import Link from "next/link";
import SafeImage from "./SafeImage";
import StarRating from "./StarRating";
import Breadcrumbs from "./Breadcrumbs";
import { ShieldCheckIcon } from "./icons";
import type { Museum } from "@/lib/museums";
import type { BreadcrumbItem } from "@/lib/seo";

export default function MuseumHero({
  museum,
  breadcrumbItems,
}: {
  museum: Museum;
  breadcrumbItems?: BreadcrumbItem[];
}) {
  const badge = museum.heroBadge || `${museum.name.toUpperCase()} TICKETS`;
  const heading = museum.heroHeading || `${museum.name} Tickets & Tour`;
  const rating = museum.rating ?? 0;

  return (
    <section className="relative min-h-[440px] w-full overflow-hidden bg-[#1F2429] sm:min-h-[500px] lg:min-h-[560px]">
      {/* Full-bleed photo */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={museum.heroImage}
          alt={museum.heroImageAlt || museum.name}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        {/* Readability scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
      </div>

      {/* Breadcrumb inside the hero photo */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <div className="absolute inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6">
          <Breadcrumbs items={breadcrumbItems} theme="onImage" />
        </div>
      )}

      <div className="relative z-10 flex min-h-[440px] flex-col items-center justify-end px-4 pb-10 pt-28 text-center sm:min-h-[500px] sm:pb-14 sm:pt-32 lg:min-h-[560px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">{badge}</p>

        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
          {heading}
        </h1>

        <div className="mt-3.5 h-[2.5px] w-12 rounded-full bg-[#9E2B25]" />

        {museum.heroSubheading && (
          <div
            className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: museum.heroSubheading }}
          />
        )}

        {/* Trust row: rating & verified partner badge */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
          {rating > 0 && (
            <StarRating rating={rating} reviewCount={museum.reviewsCount} theme="dark" size="sm" showValue />
          )}
          {rating > 0 && (
            <span className="hidden h-3.5 w-px bg-white/30 sm:inline-block" aria-hidden="true" />
          )}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white sm:text-sm">
            <ShieldCheckIcon className="h-4 w-4 text-white" />
            <span>Verified Partner</span>
          </div>
        </div>

        <Link
          href="#tickets"
          className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#184E3A] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#123b2c] hover:shadow-lg"
        >
          <span>View Tickets & Tours</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
