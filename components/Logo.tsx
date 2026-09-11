import Link from "next/link";
import Image from "next/image";

export default function Logo({
  logoImage = "",
  logoAlt = "DUOMO FLORENCE",
  theme = "light",
  className = "",
}: {
  logoImage?: string;
  logoAlt?: string;
  theme?: "light" | "dark";
  className?: string;
}) {
  const isDark = theme === "dark";
  const customSrc = logoImage?.trim();

  return (
    <Link href="/" className={`inline-flex items-center gap-3 shrink-0 ${className}`} aria-label="Discover Florence - Duomo Florence Home">
      {customSrc ? (
        <span className="relative block h-10 w-44 sm:h-12 sm:w-52 shrink-0 transition-opacity hover:opacity-90">
          <Image
            src={customSrc}
            alt={logoAlt}
            fill
            sizes="(max-width: 640px) 176px, 208px"
            className={`object-contain object-left ${isDark ? "brightness-0 invert" : ""}`}
            priority
          />
        </span>
      ) : (
        <div className="flex items-center gap-2.5 group">
          {/* Florence Cathedral Brunelleschi's Dome Icon */}
          <div className={`flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${isDark ? "text-[#E5B573]" : "text-[#184E3A]"}`}>
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9"
              viewBox="0 0 48 48"
              fill="currentColor"
            >
              {/* Lantern cross top */}
              <rect x="23" y="2" width="2" height="6" rx="0.5" />
              <rect x="20.5" y="4" width="7" height="1.8" rx="0.4" />
              {/* Lantern ball & cupola */}
              <circle cx="24" cy="9" r="2.5" />
              <path d="M21 11.5 H27 L28 15 H20 Z" />
              {/* Dome ribbed profile */}
              <path d="M24 15 C19 16 13 22 10 32 H38 C35 22 29 16 24 15 Z" fillOpacity="0.95" />
              {/* Rib highlights */}
              <path d="M24 15 C24 21 24 27 24 32" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
              <path d="M24 15 C20 19 17 25 15 32" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
              <path d="M24 15 C28 19 31 25 33 32" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
              {/* Drum with oculi windows */}
              <rect x="9" y="32" width="30" height="6" rx="0.5" fillOpacity="0.95" />
              <circle cx="14" cy="35" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="19" cy="35" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="24" cy="35" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="29" cy="35" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="34" cy="35" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
              {/* Cathedral base */}
              <rect x="6" y="38" width="36" height="3" rx="0.4" />
            </svg>
          </div>

          {/* Duomo Florence Typography */}
          <div className="flex flex-col leading-none">
            <span
              className={`font-serif text-[15px] sm:text-[17px] font-bold tracking-[0.14em] uppercase ${isDark ? "text-white" : "text-[#143E38]"
                }`}
            >
              DUOMO
            </span>
            <span
              className={`font-serif text-[11px] sm:text-[12.5px] font-medium tracking-[0.24em] uppercase mt-0.5 ${isDark ? "text-[#E5B573]" : "text-[#A07A48]"
                }`}
            >
              FLORENCE
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
