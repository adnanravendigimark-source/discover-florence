"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearchWidget() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = query.toLowerCase().trim();
    if (q.includes("duomo") || q.includes("dome") || q.includes("cathedral") || q.includes("brunelleschi")) {
      router.push("/duomo-florence-tickets");
    } else if (q.includes("uffizi") || q.includes("botticelli") || q.includes("venus")) {
      router.push("/uffizi-gallery-tickets");
    } else if (q.includes("accademia") || q.includes("david") || q.includes("michelangelo")) {
      router.push("/accademia-gallery-tickets");
    } else if (q.includes("ponte") || q.includes("bridge") || q.includes("vecchio")) {
      router.push("/ponte-vecchio-florence");
    } else if (q.includes("palazzo") || q.includes("arnolfo")) {
      router.push("/palazzo-vecchio-florence");
    } else if (q.includes("boboli") || q.includes("garden") || q.includes("pitti")) {
      router.push("/boboli-gardens-florence");
    } else {
      router.push("/#attractions");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-6 sm:mt-8 w-full rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
    >
      <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
        {/* Destination / Attraction Input */}
        <div className="flex flex-1 items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBF3EF] text-[#143E38]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <div className="flex-1">
            <label htmlFor="search-input" className="block text-[11px] font-bold uppercase tracking-wider text-[#143E38]">
              What are you looking for?
            </label>
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Duomo, Uffizi, Accademia..."
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1A2221] placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Date Selector */}
        <div className="relative flex flex-1 items-center gap-3 px-3 py-2 border-b md:border-b-0 border-gray-100">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBF3EF] text-[#143E38]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <div className="flex-1">
            <label htmlFor="date-input" className="block text-[11px] font-bold uppercase tracking-wider text-[#143E38]">
              Select Date
            </label>
            <input
              id="date-input"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1A2221] placeholder-gray-400 focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#143E38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0c2925] hover:shadow-lg shrink-0"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
