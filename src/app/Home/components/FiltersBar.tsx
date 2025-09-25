"use client";
import React, { FC } from "react";

export type Filters = {
  location: string;
  activity: string;
  priceMin: number;
  priceMax: number;
};

type Props = {
  locations: string[];
  activities: string[];
  minPrice: number;
  maxPrice: number;
  value: Filters;
  onChange: (next: Filters) => void;
};

const FiltersBar: FC<Props> = ({
  locations,
  activities,
  minPrice,
  maxPrice,
  value,
  onChange,
}) => {
  const update = (partial: Partial<Filters>) => onChange({ ...value, ...partial });

  // Compute default values for clearing filters
  const defaultLocation = locations[0] || "All Areas";
  const defaultActivity = activities[0] || "All Activities";
  const handleClear = () => {
    onChange({
      location: defaultLocation,
      activity: defaultActivity,
      priceMin: minPrice,
      priceMax: maxPrice,
    });
  };

  return (
    <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2 mb-2">
      <div className="w-full bg-white/70 backdrop-blur rounded-2xl border border-purple-200 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location */}
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#142ea7]">Location</span>
              <select
                className="rounded-xl border-2 border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={value.location}
                onChange={(e) => update({ location: e.target.value })}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>
            {/* Price Min */}
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#142ea7]">Min price (₹/hr)</span>
              <input
                type="number"
                min={minPrice}
                max={value.priceMax}
                className="rounded-xl border-2 border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={value.priceMin}
                onChange={(e) => {
                  const next = Math.max(minPrice, Math.min(Number(e.target.value || 0), value.priceMax));
                  update({ priceMin: next });
                }}
              />
            </label>

            {/* Price Max */}
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#142ea7]">Max price (₹/hr)</span>
              <input
                type="number"
                min={value.priceMin}
                max={maxPrice}
                className="rounded-xl border-2 border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={value.priceMax}
                onChange={(e) => {
                  const next = Math.min(maxPrice, Math.max(Number(e.target.value || 0), value.priceMin));
                  update({ priceMax: next });
                }}
              />
            </label>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-purple-100 text-[#142ea7] font-semibold border border-purple-200 hover:bg-purple-200 transition"
              onClick={handleClear}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiltersBar;
