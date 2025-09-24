import React, { FC } from "react";

const fadeInVariants = [
  "animate-fade-in-up",
  "animate-fade-in-up delay-100",
  "animate-fade-in-up delay-200",
];

const SUBTITLES: Record<string, string> = {
  Photoshoot: "Unique space for fashion • Lifestyle • Editorial • Product • Portraits and more",
  "Video Shoot": "Cinematic backdrops for Ads • Reels • Music Videos • Shorts • Brand Films",
  Workshops: "Host creative workshops • Meetups • Masterclasses • Community sessions",
  Podcast:
    "Unique space for Podcast episodes • Interview series • Talk shows • Storytelling sessions • Conversations • Poetry Recitals and more",
  "Dance shoot": "Spacious floors • Mirrors • Ambient lighting • Great acoustics for dance",
  "Film Shoot": "Versatile sets • Natural light • Heritage homes • Industrial textures",
  Events: "Book for Pop-ups • Launches • Screenings • Intimate gatherings • Exhibits",
  Exhibitions: "Curate art shows • Photo exhibits • Installations • Creative showcases",
};

const Hero: FC<{ active: string }> = ({ active }) => {
  const isAll = active === "All Spaces";
  const subtitle =
    SUBTITLES[active] ||
    "Enjoy, browse & book handpicked locations to match your creative narrative.";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
      <div className="flex flex-col gap-5 items-center text-center">
        {!isAll && (
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-black animate-fade-in-up">
            {active}
          </h1>
        )}
        {isAll && (
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-black via-neutral-800 to-neutral-600 bg-clip-text text-transparent drop-shadow animate-fade-in-up"
            style={{ animationDelay: "120ms" }}
          >
            All Spaces
          </h1>
        )}
        <p
          className="text-neutral-600 text-base sm:text-lg max-w-3xl mt-1 animate-fade-in-up"
          style={{ animationDelay: "220ms" }}
        >
          {isAll ? <>Enjoy, browse & book the most unique locations</> : subtitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;
