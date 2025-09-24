"use client";
import React from "react";
import Image from "next/image";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export type Space = {
  id: string;
  title: string;
  subtitle: string;
  pricePerHour: number;
  rating: number;
  reviewCount?: number;
  features: string[];
  image: string;
};

type Props = {
  space: Space;
  onCardClick?: (spaceId: string) => void;
  onFavoriteClick?: (spaceId: string) => void;
  isFavorite?: boolean;
  className?: string;
};

const SpaceCard: React.FC<Props> = ({
  space,
  onCardClick,
  onFavoriteClick,
  isFavorite = false,
  className = "",
}) => {
  const router = useRouter();
  const handleClick = () => {
    window.open(`/details/${space.id}`, "_blank", "noopener,noreferrer");
    onCardClick?.(space.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.(space.id);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onCardClick?.(space.id);
    }
  };

  const imageSrc = space?.image || "";

  return (
    <article
      className={`
        group 
        rounded-3xl 
        overflow-hidden 
        bg-gradient-to-br from-white via-lavender-50 to-lavender-100 
        shadow-lg 
        hover:shadow-2xl 
        transition-all duration-500 ease-out
        cursor-pointer 
        border border-lavender-200
        hover:border-lavender-300
        transform
        hover:-translate-y-2
        active:scale-95
        focus:outline-none focus:ring-4 focus:ring-lavender-300 focus:ring-opacity-50
        ${className} 
        ${onCardClick ? "hover:scale-105" : ""}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role={onCardClick ? "button" : "article"}
      aria-label={`View details for ${space.title}`}
    >
      {/* Image Section with Overlay Effects */}
      <div className="aspect-[4/3] bg-lavender-100 relative w-full overflow-hidden rounded-b-3xl">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={space?.title}
            fill
            className="object-cover w-full h-full transition-all duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk8npX0HyfSPZ7+vmfEaB6X2UFP4J9QWSH6PZ9X/2Q=="
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-200" />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-1 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-current animate-pulse-slow" />
          <span className="text-sm font-bold text-gray-900">{space.rating.toFixed(1)}</span>
        </div>

        {/* Favorite Button */}
        {onFavoriteClick && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-all duration-300 hover:scale-125 active:scale-95 focus:outline-none focus:ring-2 focus:ring-lavender-500"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartIcon className="w-5 h-5 text-red-500 fill-current animate-bounce-in" />
            ) : (
              <HeartOutlineIcon className="w-5 h-5 text-gray-600 group-hover:text-red-400 transition-colors duration-300" />
            )}
          </button>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-lavender-600/90 backdrop-blur-md text-white rounded-full px-3 py-2 transform group-hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-bold">₹{space.pricePerHour.toLocaleString()}</span>
          <span className="text-xs opacity-90">/hour</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3 transform group-hover:translate-y-1 transition-transform duration-300">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-lavender-700 transition-colors duration-300">
          {space.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {space.subtitle}
        </p>

        {/* Features */}
        {space.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {space.features.slice(0, 3).map((feature, index) => (
              <span
                key={feature}
                className="text-xs rounded-full border border-lavender-200 px-3 py-1.5 text-lavender-700 bg-lavender-50 font-medium transform group-hover:translate-y-0.5 transition-all duration-300 delay-75"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {feature}
              </span>
            ))}
            {space.features.length > 3 && (
              <span className="text-xs rounded-full border border-lavender-200 px-3 py-1.5 text-lavender-600 bg-lavender-50 font-medium transform group-hover:translate-y-0.5 transition-all duration-300">
                +{space.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* View Details CTA */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-200">
          <span className="inline-flex items-center text-sm font-medium text-lavender-600">
            View details
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-lavender-300 transition-all duration-500 pointer-events-none" />
    </article>
  );
};

export default SpaceCard;
