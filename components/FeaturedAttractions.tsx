import Link from "next/link";
import SafeImage from "./SafeImage";
import { getMuseums, type Museum } from "@/lib/museums";

interface FeaturedAttractionsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

export default async function FeaturedAttractions({
  eyebrow = "EXPLORE FLORENCE",
  heading = "Things to Do in Florence",
  subheading = "From Renaissance masterpieces to breathtaking architecture, discover the must-see experiences in Florence.",
}: FeaturedAttractionsProps) {
  const allMuseums = await getMuseums();

  // Top 3 featured attractions: Duomo Florence, Uffizi Gallery, Accademia Gallery
  const featured = allMuseums.slice(0, 3);

  return (
    <section id="attractions" className="bg-white py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B6A4A] sm:text-xs">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#143E38] sm:text-4xl lg:text-[2.6rem]">
              {heading}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#55605E] sm:text-base">
              {subheading}
            </p>
          </div>
          <Link
            href="#more-attractions"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#143E38] transition-colors hover:text-[#7B6A4A] whitespace-nowrap"
          >
            <span>View All Attractions</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 3 Main Attraction Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {featured.map((museum, index) => (
            <div
              key={museum.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-150 bg-[#FCFCFB] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Card Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                <SafeImage
                  src={museum.cardImage || museum.heroImage}
                  alt={museum.cardImageAlt || museum.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Most Popular Badge on first card */}
                {index === 0 && (
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#143E38] shadow-md backdrop-blur-md">
                    Most Popular
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143E38] group-hover:text-[#7B6A4A] transition-colors">
                    {museum.name === "Duomo Florence"
                      ? "Duomo Florence Tickets"
                      : museum.name === "Uffizi Gallery"
                        ? "Uffizi Gallery Tickets"
                        : museum.name === "Accademia Gallery"
                          ? "Accademia Gallery Tickets"
                          : `${museum.name} Tickets`}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#55605E] line-clamp-3">
                    {museum.cardTagline || museum.heroSubheading.replace(/<[^>]+>/g, "").trim()}
                  </p>
                </div>

                {/* View Tickets link button */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href={`/${museum.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#143E38] transition-colors hover:text-[#7B6A4A]"
                  >
                    <span>View Tickets</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
