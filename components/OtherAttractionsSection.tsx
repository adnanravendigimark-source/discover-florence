import Link from "next/link";
import SafeImage from "./SafeImage";
import StarRating from "./StarRating";
import { getMuseums, type Museum } from "@/lib/museums";

export default async function OtherAttractionsSection({
  currentMuseumId,
  headingOverride,
}: {
  currentMuseumId: string;
  headingOverride?: string;
}) {
  const allMuseums = await getMuseums();
  const otherMuseums = allMuseums.filter((m) => m.id !== currentMuseumId);

  if (!otherMuseums.length) return null;

  const heading = headingOverride || "Other Top Attractions in Florence";

  return (
    <section className="border-t border-gray-100 bg-[#FBFBFA] py-16 sm:py-20">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2EC] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#184E3A]">
            🏛️ Explore More of Florence
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#182220] sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#55605E] sm:text-base">
            Discover iconic Renaissance museums, historic palaces, and monumental landmarks across Florence.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherMuseums.map((attraction) => {
            const rating = attraction.rating ?? 4.8;

            return (
              <div
                key={attraction.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#184E3A]/30 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <SafeImage
                    src={attraction.cardImage || attraction.heroImage}
                    alt={attraction.cardImageAlt || attraction.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Rating Badge */}
                  {rating > 0 && (
                    <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-2.5 py-1 backdrop-blur-sm">
                      <StarRating rating={rating} reviewCount={attraction.reviewsCount} size="sm" theme="dark" showValue />
                    </div>
                  )}

                  {/* Location Pin */}
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#184E3A] shadow-sm backdrop-blur-sm">
                    📍 {attraction.city || "Florence"}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-xl font-bold text-[#182220] transition-colors group-hover:text-[#184E3A]">
                    <Link href={`/${attraction.slug}`} className="hover:underline">
                      {attraction.name}
                    </Link>
                  </h3>

                  <p className="mt-2.5 line-clamp-2 text-sm text-[#55605E]">
                    {attraction.cardTagline || attraction.metaDescription}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/${attraction.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#184E3A] py-2.5 px-5 text-sm font-semibold text-white shadow-sm transition-all group-hover:bg-[#123b2c] group-hover:shadow-md"
                    >
                      <span>Explore Tickets</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
