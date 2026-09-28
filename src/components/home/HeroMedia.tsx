"use client";

import { useEffect, useState } from "react";

export function HeroMedia() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  if (reduced) {
    return (
      <img
        src="/media/home-hero.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      src="/media/home-hero.mp4"
      poster="/media/home-hero.jpg"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className="h-full w-full object-cover"
    />
  );
}
