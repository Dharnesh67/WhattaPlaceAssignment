"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryTabs, { SpaceCategory } from "./components/CategoryTabs";
import SpaceGrid from "./components/SpaceGrid";
import FiltersBar, { type Filters } from "./components/FiltersBar";
import type { Space } from "./components/SpaceCard";

import { useState, useEffect, useMemo } from "react";

type DataFile = {
  categories: SpaceCategory[];
  locations: string[];
  activities: string[];
  spaces: (Space & { categories: SpaceCategory[]; location: string; activities: string[] })[];
};

const Page = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [categories, setCategories] = useState<SpaceCategory[]>([]);
  const [spaces, setSpaces] = useState<
    (Space & { categories: SpaceCategory[]; location: string; activities: string[] })[]
  >([]);
  const [active, setActive] = useState<SpaceCategory>("All Spaces");
  const [locations, setLocations] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [priceBounds, setPriceBounds] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const [filters, setFilters] = useState<Filters>({
    location: "All Areas",
    activity: "All Activities",
    priceMin: 0,
    priceMax: 0,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/spaces.json", { cache: "no-store" });
        const json: DataFile = await res.json();
        setCategories(json.categories);
        setSpaces(json.spaces);
        setLocations(json.locations ?? ["All Areas"]);
        setActivities(json.activities ?? ["All Activities"]);
        // derive price bounds
        const prices = (json.spaces ?? []).map((s) => s.pricePerHour);
        const min = prices.length ? Math.min(...prices) : 0;
        const max = prices.length ? Math.max(...prices) : 0;
        setPriceBounds({ min, max });
        setFilters({
          location: "All Areas",
          activity: "All Activities",
          priceMin: min,
          priceMax: max,
        });
      } catch (e) {
        // Fallback if fetch fails
        setCategories([
          "All Spaces",
          "Photoshoot",
          "Video Shoot",
          "Workshops",
          "Podcast",
          "Dance shoot",
          "Film Shoot",
          "Events",
          "Exhibitions",
        ]);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const byCategory =
      active === "All Spaces" ? spaces : spaces.filter((s) => s.categories.includes(active));
    return byCategory.filter((s) => {
      const withinPrice = s.pricePerHour >= filters.priceMin && s.pricePerHour <= filters.priceMax;
      const matchesLocation =
        filters.location === "All Areas" ? true : s.location === filters.location;
      const matchesActivity =
        filters.activity === "All Activities" ? true : s.activities.includes(filters.activity);
      return withinPrice && matchesLocation && matchesActivity;
    });
  }, [active, spaces, filters]);

  useEffect(() => {
    const base = "WhattaPlace";
    const title = active === "All Spaces" ? `${base} – All Spaces` : `${active} | ${base}`;
    document.title = title;
    const desc =
      active === "All Spaces"
        ? "Enjoy, browse & book the most unique locations for shoots, events and more."
        : `Browse curated ${active} locations to match your creative narrative.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [active]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen w-full flex flex-col items-stretch">
        <div className="h-16" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-stretch">
      <Navbar />
      <div className="h-16" />
      <Hero active={active} />
      <CategoryTabs
        categories={
          categories.length
            ? categories
            : ([
                "All Spaces",
                "Photoshoot",
                "Video Shoot",
                "Workshops",
                "Podcast",
                "Dance shoot",
                "Film Shoot",
                "Events",
                "Exhibitions",
              ] as SpaceCategory[])
        }
        active={active}
        onChange={setActive}
      />
      <FiltersBar
        locations={locations.length ? locations : ["All Areas"]}
        activities={activities.length ? activities : ["All Activities"]}
        minPrice={priceBounds.min}
        maxPrice={priceBounds.max}
        value={filters}
        onChange={setFilters}
      />
      <SpaceGrid spaces={filtered} />
    </div>
  );
};

export default Page;
