import SafeImage from "./SafeImage";
import type { OtherAttraction } from "@/lib/museums";

// Fully admin-authored — replaces the old auto-resolved "Nearby
// Attractions" feature (which pulled real places from OpenStreetMap by
// coordinates). Every card here — name, category, photo, and where it
// links — is typed in by an admin on this museum's own edit page (see
// MuseumForm.tsx's "Other Attractions" section) and read straight off the
// museum record, exactly like Highlights or any other admin-editable list.
// No live API call, no resolution step, no "last checked" state.
export default function OtherAttractionsSection({
  attractions,
  heading,
}: {
  attractions: OtherAttraction[];
  heading?: string;
}) {
  // Nothing added by the admin yet — stay hidden rather than showing an
  // empty section.
  if (!attractions || attractions.length === 0) return null;

  const sectionHeading = heading || "Other Top Attractions in Florence";

  return (
    <section className="border-t border-gray-100 bg-[#FBFBFA] py-16 sm:py-20">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2EC] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#184E3A]">
            🏛️ Explore More
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#182220] sm:text-4xl">
            {sectionHeading}
          </h2>
        </div>

        {/* Attractions Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((attraction, idx) => (
            <a
              key={idx}
              href={attraction.href || "#"}
              target="_blank"
              rel="noopener nofollow sponsored"
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#184E3A]/30 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <SafeImage
                  src={attraction.image}
                  alt={attraction.imageAlt || attraction.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {attraction.category && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#184E3A] shadow-sm backdrop-blur-sm">
                    {attraction.category}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-serif text-xl font-bold text-[#182220] transition-colors group-hover:text-[#184E3A]">
                  {attraction.name}
                </h3>

                <div className="mt-auto pt-6">
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#184E3A] py-2.5 px-5 text-sm font-semibold text-white shadow-sm transition-all group-hover:bg-[#123b2c] group-hover:shadow-md">
                    <span>Explore and Book Now</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
