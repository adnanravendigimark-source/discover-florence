import Link from "next/link";
import { getHomepageContent } from "@/lib/homepage";

export default async function WhyVisitFlorence() {
  const content = await getHomepageContent();
  const highlights = content.sections?.highlights;

  const eyebrow = highlights?.eyebrow || "WHY VISIT FLORENCE";
  const heading = highlights?.heading || "A City of Art, History & Culture";
  const subheading =
    highlights?.subheading ||
    "Florence is more than a destination — it's an experience. From world-famous museums to stunning architecture, every corner tells a story.";

  const FEATURES = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A12.04 12.04 0 0012 9c-2.486 0-4.814.757-6.75 2.05V21h13.5z" />
        </svg>
      ),
      title: "World-Class Museums",
      body: "Home to the greatest art collections in the world.",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a9 9 0 00-9 9c0 3.87 5 11 9 11s9-7.13 9-11a9 9 0 00-9-9zm0 5a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ),
      title: "Iconic Landmarks",
      body: "Marvel at the Duomo, Ponte Vecchio and more.",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      title: "Rich History",
      body: "Walk through centuries of Renaissance heritage.",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.31a1.125 1.125 0 00-1.006 0L3.622 5.748A1.125 1.125 0 003 6.754v11.928c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
      title: "Easy Travel",
      body: "Perfectly walkable and well connected.",
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-22 border-t border-gray-150">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Story Copy & Button */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B6A4A] sm:text-xs">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#143E38] sm:text-4xl lg:text-[2.6rem] leading-[1.15]">
              {heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#55605E] sm:text-base">
              {subheading}
            </p>
            <div className="mt-7">
              <Link
                href="/#attractions"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#143E38] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0c2925] hover:shadow-lg"
              >
                <span>Plan Your Visit</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Feature Items (2x2 on sm/md, 4 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-5">
              {FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-start p-4 rounded-xl transition-colors hover:bg-gray-50/80"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF3EF] text-[#143E38] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143E38]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#55605E] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
