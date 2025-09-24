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
      <div className="relative  scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
        {/* Scroll Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-purple-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="relative flex  overflow-x-auto scroll-smooth py-3 gap-2 sm:gap-3 scrollbar-thin px-10 scrollbar-thumb-purple-300 scrollbar-track-purple-100"
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
                  "focus:outline-none focus:ring-3 focus:ring-purple-300 focus:ring-opacity-50",
                  "transform hover:scale-105 active:scale-95",
                  isActive
                    ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                    : "bg-white text-purple-700 border-purple-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-800",
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
