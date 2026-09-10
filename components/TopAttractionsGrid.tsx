import Link from "next/link";
import SafeImage from "./SafeImage";
import { getMuseums } from "@/lib/museums";

export default async function TopAttractionsGrid() {
  const allMuseums = await getMuseums();

  const TOP_SIGHTS = [
    {
      title: "Duomo Cathedral",
      subtitle: "Iconic symbol of Florence",
      location: "Florence",
      image: "https://images.unsplash.com/photo-1541370976299-4d20eb3460f6?q=80&w=600&auto=format&fit=crop",
      href: "/duomo-florence-tickets",
    },
    {
      title: "Ponte Vecchio",
      subtitle: "Historic bridge with shops",
      location: "Florence",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
      href: "/ponte-vecchio-florence",
    },
    {
      title: "Palazzo Vecchio",
      subtitle: "Medieval town hall",
      location: "Florence",
      image: "https://images.unsplash.com/photo-1543429776-0683050964eb?q=80&w=600&auto=format&fit=crop",
      href: "/palazzo-vecchio-florence",
    },
    {
      title: "Giotto's Campanile",
      subtitle: "Stunning bell tower",
      location: "Florence",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop",
      href: "/duomo-florence-tickets",
    },
    {
      title: "Boboli Gardens",
      subtitle: "Renaissance garden",
      location: "Florence",
      image: "https://images.unsplash.com/photo-1583207884956-f6d0f1a9b1c5?q=80&w=600&auto=format&fit=crop",
      href: "/boboli-gardens-florence",
    },
  ];

  return (
    <section id="more-attractions" className="bg-[#F8F8F7] py-14 sm:py-18 lg:py-20 border-t border-gray-150">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B6A4A] sm:text-xs">
              TOP ATTRACTIONS
            </p>
            <h2 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-[#143E38] sm:text-3xl lg:text-[2.2rem]">
              More Must-See Places in Florence
            </h2>
          </div>
          <Link
            href="/#attractions"
            className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#143E38] transition-colors hover:text-[#7B6A4A] whitespace-nowrap"
          >
            <span>Explore All</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 5 Landscape Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {TOP_SIGHTS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col justify-between p-3.5">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#143E38]">
                    <svg className="h-3.5 w-3.5 text-[#C28C47]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>{item.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center gap-1 text-[10px] text-gray-400">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{item.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
