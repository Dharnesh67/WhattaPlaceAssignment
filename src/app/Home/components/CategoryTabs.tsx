"use client";
import React, { FC, useRef, useEffect } from "react";

export type SpaceCategory =
  | "All Spaces"
  | "Photoshoot"
  | "Video Shoot"
  | "Workshops"
  | "Podcast"
  | "Dance shoot"
  | "Film Shoot"
  | "Events"
  | "Exhibitions";

type Props = {
  categories: SpaceCategory[];
  active: SpaceCategory;
  onChange: (category: SpaceCategory) => void;
};

const CategoryTabs: FC<Props> = ({ categories, active, onChange }) => {
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const tab = activeTabRef.current;
      const container = containerRef.current;
      const tabRect = tab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [active]);

  return (
    <nav
      className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 mb-4"
      aria-label="Category Tabs"
    >
      {/* Tabs Container */}
      <div className="relative scrollbar-thin scrollbar-thumb-[#142ea7]/40 scrollbar-track-[#142ea7]/10">
        {/* Scroll Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="relative flex overflow-x-auto scroll-smooth py-3 gap-2 sm:gap-3 scrollbar-thin px-10 scrollbar-thumb-[#142ea7]/40 scrollbar-track-[#142ea7]/10"
          tabIndex={0}
          role="tablist"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                ref={isActive ? activeTabRef : null}
                onClick={() => onChange(cat)}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={[
                  "cursor-pointer flex-shrink-0 whitespace-nowrap rounded-full border-2 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300",
                  "focus:outline-none focus:ring-3 focus:ring-[#142ea7] focus:ring-opacity-50",
                  "transform hover:scale-105 active:scale-95",
                  isActive
                    ? "bg-[#142ea7] text-white border-[#142ea7] shadow-lg shadow-[#142ea7]/20"
                    : "bg-white text-[#142ea7] border-[#142ea7]/20 hover:bg-[#142ea7]/10 hover:border-[#142ea7]/40 hover:text-[#142ea7]",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CategoryTabs;
