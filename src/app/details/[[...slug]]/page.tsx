"use client";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { StarIcon, MapPinIcon, HeartIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bgPosition, setBgPosition] = useState<string>("center");

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
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition duration-200 ease-out hover:-translate-y-0.5 cursor-pointer"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-gray-600 text-lg mb-4">Space not found.</div>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition duration-200 ease-out hover:-translate-y-0.5 cursor-pointer"
          >
            Browse Spaces
          </Link>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking logic here
    console.log({ selectedDate, startTime, endTime, name, email, phone });
  };

  const calculateTotal = () => {
    if (!startTime || !endTime) return 0;
    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);
    const hours = Math.max(1, end - start);
    return hours * space.pricePerHour;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200 ease-out hover:-translate-y-0.5 font-medium cursor-pointer"
          >
            ← Back to Spaces
          </Link>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Background Position Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { key: "top", label: "Top" },
                    { key: "center", label: "Center" },
                    { key: "bottom", label: "Bottom" },
                    { key: "left", label: "Left" },
                    { key: "right", label: "Right" },
                  ].map((pos) => (
                    <button
                      key={pos.key}
                      type="button"
                      onClick={() => setBgPosition(pos.key)}
                      className={`px-3 py-1 rounded-md border text-sm transition duration-200 ease-out cursor-pointer ${
                        bgPosition === pos.key
                          ? "border-gray-900 text-gray-900"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
                {/* Main Image */}
                <div
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 bg-fixed"
                  style={{
                    backgroundImage: gallery.length > 0 ? `url(${gallery[activeImageIndex]})` : undefined,
                    backgroundSize: bgPosition === "cover" ? "cover" : bgPosition === "contain" ? "contain" : "cover",
                    backgroundPosition: bgPosition,
                    backgroundRepeat: "no-repeat",
                    transition: "background-position 300ms ease, background-size 300ms ease",
                    willChange: "background-position, background-size",
                  }}
                  aria-label={space.title}
                  role="img"
                >
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition duration-200 ease-out hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                {gallery.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative aspect-square rounded-xl overflow-hidden border border-gray-200 transition duration-200 ease-out cursor-pointer ${
                          activeImageIndex === index
                            ? "ring-1 ring-gray-900/10"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${space.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 25vw, 16.5vw"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                      {space.title}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-800">{space.rating}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{space.reviewCount} reviews</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">{space.location}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-semibold text-gray-900">
                      ₹{space.pricePerHour.toLocaleString()}
                      <span className="text-base font-normal text-gray-500">/hour</span>
                    </span>
                    {calculateTotal() > 0 && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Total</div>
                        <div className="text-xl font-bold text-gray-900">
                          ₹{calculateTotal().toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Time
                      </label>
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200"
                        required
                      >
                        <option value="">Select time</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={`${i + 9}:00`}>
                            {i + 9}:00 AM
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Time
                    </label>
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200"
                      required
                    >
                      <option value="">Select time</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={`${i + 10}:00`}>
                          {i + 10}:00 AM
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact Information */}
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-black transition duration-200 ease-out hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    Request to Book
                  </button>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4" />
                    <span>Usually responds within 2 hours</span>
                  </div>
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
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this space</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{space.subtitle}</p>
            </section>

            {/* Highlights */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <MapPinIcon className="w-8 h-8 text-gray-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Prime Location</h3>
                <p className="text-gray-600 text-sm">{space.location}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-8 h-8 text-gray-600 mb-3">🎯</div>
                <h3 className="font-bold text-gray-900 mb-2">Perfect For</h3>
                <p className="text-gray-600 text-sm">
                  {space.activities?.join(", ") || "Various activities"}
                </p>
              </div>
            </section>

            {/* Features */}
            {Array.isArray(space.features) && space.features.length > 0 && (
              <section className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes It Special</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {space.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Activities */}
            {Array.isArray(space.activities) && space.activities.length > 0 && (
              <section className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Activities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {space.activities.map((activity: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 font-bold">✓</span>
                      </div>
                      <span className="font-medium text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            {Array.isArray(space.categories) && space.categories.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {space.categories.map((category: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Safety & Guidelines</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">No smoking in the premises</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Pets allowed with prior permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Security deposit required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Professional conduct expected</span>
                </li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our team is here to assist you with any questions.
              </p>
              <button className="w-full px-4 py-2 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition duration-200 ease-out hover:-translate-y-0.5 active:scale-95 font-medium cursor-pointer">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
