import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import HeaderNav from "./HeaderNav";
import StickyHeader from "./StickyHeader";
import { getHomepageContent } from "@/lib/homepage";

export default async function Header() {
  const content = await getHomepageContent();
  const header = content.header || {};
  const ctaText = (header as any).buttonText || header.ctaText || header.bookNowText || "Explore Museums";
  const ctaHref = (header as any).buttonHref || header.ctaHref || "/#museums";

  // Every header nav link — including the museum ticket links and Contact,
  // if you add it — is a plain entry in header.navLinks, edited in
  // Homepage admin -> Navbar. Whatever's saved there is exactly what shows
  // here, in that order, with no hidden exclusions.
  const navLinks = header.navLinks || [];

  return (
    <StickyHeader>
      <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:gap-6">
        <div className="shrink-0">
          <Logo
            logoImage={header.logoImage}
            logoAlt={header.logoAlt || "Discover Florence"}
          />
        </div>

        <HeaderNav links={navLinks} />

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link
            href="/#museums"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#2A302F] transition-colors hover:bg-black/5 hover:text-[#184E3A]"
            aria-label="Search attractions"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </Link>
          <Link
            href={ctaHref}
            className="hidden items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#184E3A] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#123b2c] hover:shadow-md sm:inline-flex sm:text-sm"
          >
            <span>{ctaText}</span>
            <span>→</span>
          </Link>
          <MobileNav links={navLinks} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </StickyHeader>
  );
}
