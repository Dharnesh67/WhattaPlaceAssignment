"use client";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { StarIcon, MapPinIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import data from "../../../../public/data/spaces.json";
import Link from "next/link";

const DetailsPage: React.FC = () => {
  const params = useParams() as { slug?: string | string[] };
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Next.js catch-all routes ([[...slug]]) provide slug as string[] or undefined
  let slug: string | undefined;
  if (Array.isArray(params?.slug)) {
    slug = params.slug[params.slug.length - 1];
  } else if (typeof params?.slug === "string") {
    slug = params.slug;
  } else {
    slug = undefined;
  }

  const space =
    slug && Array.isArray((data as any).spaces)
      ? (data as any).spaces.find((s: any) => s.id === slug)
      : undefined;

  // Derive gallery from available data (no hardcoded fallbacks)
  const gallery: string[] = useMemo(() => {
    if (!space) return [];
    const possibleGallery = (space as any).gallery as string[] | undefined;
    if (Array.isArray(possibleGallery) && possibleGallery.length > 0) return possibleGallery;
    return space.image ? [space.image] : [];
  }, [space]);

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-red-600 font-semibold text-lg mb-4">Invalid space id.</div>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-lavender-600 text-white rounded-lg shadow hover:bg-lavender-700 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-gray-600 text-lg mb-4">Space not found.</div>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-lavender-600 text-white rounded-lg shadow hover:bg-lavender-700 transition-colors"
          >
            Browse Spaces
          </a>
        </div>
      </div>
    );
  }

  // No hardcoded details: use only what's present in the JSON for this space

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking logic here
    console.log({ selectedDate, startTime, endTime, name, email, phone });
  };

  return (
    <main className="min-h-screen bg-white">
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-lavender-600 text-black rounded-lg shadow hover:bg-lavender-700 transition-colors"
      >
        Return to Home
      </Link>
      {/* Header Section */}
      <div className="bg-gradient-to-br from-lavender-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden">
                  {gallery.length > 0 && (
                    <Image
                      src={gallery[0]}
                      alt={space.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  )}
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
                </div>
                {gallery.slice(1).map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={`${space.title} ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{space.title}</h1>
                  <p className="text-gray-600 text-sm leading-relaxed">{space.subtitle}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-lavender-700">
                      ₹{space.pricePerHour.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500">/hour</span>
                    </span>
                    <div className="flex items-center gap-1 bg-lavender-100 px-3 py-1 rounded-full">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-lavender-800">{space.rating}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{space.reviewCount} reviews</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <MapPinIcon className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-semibold text-gray-900">{space.location}</div>
                      <div className="text-xs text-gray-500">location</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <StarIcon className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                      <div className="text-sm font-semibold text-gray-900">{space.rating}</div>
                      <div className="text-xs text-gray-500">rating</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="w-5 h-5 text-gray-600 mx-auto mb-1">🏷️</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {space.categories?.length ?? 0}
                      </div>
                      <div className="text-xs text-gray-500">categories</div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                        required
                      >
                        <option value="">Select hour</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={`${i + 9}:00`}>
                            {i + 9}:00 AM
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      required
                    >
                      <option value="">Select hour</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={`${i + 10}:00`}>
                          {i + 10}:00 AM
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-lavender-600 to-lavender-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Request Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title and Summary */}
            <div className="p-6 bg-gray-50 rounded-2xl mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">About this space</h2>
              <p className="text-gray-700 leading-relaxed">{space.subtitle}</p>
            </div>

            {/* Space Details */}
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-lavender-50 rounded-xl p-4">
                  <MapPinIcon className="w-6 h-6 text-lavender-600 mb-2" />
                  <div className="font-semibold text-gray-900">Location</div>
                  <div className="text-sm text-gray-600">{space.location}</div>
                </div>
                <div className="bg-lavender-50 rounded-xl p-4">
                  <div className="w-6 h-6 text-lavender-600 mb-2">🎯</div>
                  <div className="font-semibold text-gray-900">Activities</div>
                  <div className="text-sm text-gray-600">{space.activities?.join(", ")}</div>
                </div>
                <div className="bg-lavender-50 rounded-xl p-4">
                  <div className="w-6 h-6 text-lavender-600 mb-2">💸</div>
                  <div className="font-semibold text-gray-900">Price / hour</div>
                  <div className="text-sm text-gray-600">
                    ₹{space.pricePerHour.toLocaleString()}
                  </div>
                </div>
              </div>

              {Array.isArray(space.features) && space.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    What Makes It Special
                  </h3>
                  <ul className="space-y-3">
                    {space.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-lavender-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Activities */}
            {Array.isArray(space.activities) && space.activities.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Activities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {space.activities.map((activity: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-lavender-100 rounded-lg flex items-center justify-center">
                        <span className="text-lavender-600 text-sm">✓</span>
                      </div>
                      <span className="font-medium text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Categories */}
              {Array.isArray(space.categories) && space.categories.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {space.categories.map((category: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-lavender-100 text-lavender-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Info */}
              <div className="bg-lavender-50 rounded-2xl p-6">
                <h3 className="font-semibold text-lavender-900 mb-3">Safety & Guidelines</h3>
                <ul className="space-y-2 text-sm text-lavender-700">
                  <li>• No smoking in the premises</li>
                  <li>• Pets allowed with prior permission</li>
                  <li>• Security deposit required</li>
                  <li>• Professional conduct expected</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
