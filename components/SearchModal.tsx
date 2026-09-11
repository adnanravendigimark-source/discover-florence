"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchResult {
  title: string;
  subtitle: string;
  href: string;
  category: string;
}

const SEARCH_ITEMS: SearchResult[] = [
  {
    title: "Duomo Florence Tickets",
    subtitle: "Brunelleschi's Dome climb, Bell Tower, Baptistery & Museum",
    href: "/duomo-florence-tickets",
    category: "Attraction",
  },
  {
    title: "Uffizi Gallery Tickets",
    subtitle: "Botticelli, Michelangelo, Leonardo da Vinci & Renaissance art",
    href: "/uffizi-gallery-tickets",
    category: "Attraction",
  },
  {
    title: "Accademia Gallery Tickets",
    subtitle: "Michelangelo's original David statue & Hall of Prisoners",
    href: "/accademia-gallery-tickets",
    category: "Attraction",
  },
  {
    title: "Ponte Vecchio",
    subtitle: "Historic medieval stone bridge, goldsmiths & Vasari Corridor",
    href: "/ponte-vecchio-florence",
    category: "Attraction",
  },
  {
    title: "Palazzo Vecchio",
    subtitle: "Medieval town hall fortress & 95m Arnolfo Tower climb",
    href: "/palazzo-vecchio-florence",
    category: "Attraction",
  },
  {
    title: "Boboli Gardens",
    subtitle: "Grand Renaissance open-air museum behind Pitti Palace",
    href: "/boboli-gardens-florence",
    category: "Attraction",
  },
  {
    title: "Best Time to Visit Florence",
    subtitle: "Weather, crowds, seasons, and insider planning tips",
    href: "/blog/best-time-to-visit-florence",
    category: "Guide",
  },
  {
    title: "Uffizi Gallery: What to See and How to Plan Your Visit",
    subtitle: "Top 10 Renaissance masterpieces and practical guide",
    href: "/blog/uffizi-gallery-what-to-see-and-how-to-plan-your-visit",
    category: "Guide",
  },
  {
    title: "Visiting the Accademia Gallery: Tips for a Great Experience",
    subtitle: "How to see Michelangelo's David with zero hassle",
    href: "/blog/visiting-the-accademia-gallery-tips-for-a-great-experience",
    category: "Guide",
  },
  {
    title: "1 Day in Florence: The Perfect Itinerary",
    subtitle: "Step-by-step route for 24 hours in Florence",
    href: "/blog/1-day-in-florence-the-perfect-itinerary",
    category: "Guide",
  },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    )
    : SEARCH_ITEMS.slice(0, 6);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#2A302F] transition-colors hover:bg-gray-100 hover:text-[#143E38]"
        aria-label="Search Florence attractions and guides"
      >
        <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 sm:pt-28">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
            {/* Search Input */}
            <div className="flex items-center border-b border-gray-100 px-4 py-3.5">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Florence (e.g. Duomo, Uffizi, David, passes)..."
                className="w-full bg-transparent px-3 text-sm text-[#1A2221] placeholder-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                ESC
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item) => (
                    <Link
                      key={item.href + item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors hover:bg-[#F3F7F5] group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#1A2221] group-hover:text-[#143E38]">
                            {item.title}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">{item.subtitle}</p>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-[#143E38]">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-[11px] text-gray-400 flex justify-between">
              <span>Quick access to Duomo, Uffizi, Accademia & Guides</span>
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
