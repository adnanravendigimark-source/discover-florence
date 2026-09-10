import { getHomepageContent, type HeroFeature } from "@/lib/homepage";

const DEFAULT_BADGES: { icon: JSX.Element; title: string; subtitle: string }[] = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Skip The Line",
    subtitle: "Save time, enjoy more",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
    title: "Verified Tickets",
    subtitle: "100% authentic",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Best Price Guarantee",
    subtitle: "No hidden fees",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Instant Confirmation",
    subtitle: "Get tickets in minutes",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "24/7 Support",
    subtitle: "We're here to help",
  },
];

export default async function TrustBadges() {
  const content = await getHomepageContent();
  const features = content.heroFeatures?.length ? content.heroFeatures : [];

  const displayBadges = features.length >= 4
    ? features.map((f, i) => ({
        icon: DEFAULT_BADGES[i % DEFAULT_BADGES.length].icon,
        title: f.title,
        subtitle: f.subtitle,
      }))
    : DEFAULT_BADGES;

  return (
    <section className="border-y border-gray-150 bg-white py-6 sm:py-8">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
          {displayBadges.map((badge, idx) => (
            <div
              key={badge.title + idx}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50/80"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF3EF] text-[#143E38]">
                {badge.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold leading-snug text-[#1A2221]">
                  {badge.title}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
