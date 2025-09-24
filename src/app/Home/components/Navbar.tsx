"use client";
import React, { useState, useRef, useEffect, FC } from "react";
import Link from "next/link";

function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const goingDown = currentY > lastYRef.current;
        const delta = Math.abs(currentY - lastYRef.current);
        if (delta > 6) {
          setHidden(goingDown && currentY > 48);
          lastYRef.current = currentY;
        }
        tickingRef.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

const navLinks = [
  { href: "#find", label: "Find a Place" },
  { href: "#host", label: "Host Your Space" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#contact", label: "Get in Touch" },
];

const Navbar: FC = () => {
  const hidden = useHideOnScroll();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        "fixed top-0 inset-x-0 z-50 transform-gpu will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
        (hidden ? "-translate-y-full" : "translate-y-0")
      }
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 shadow-lg border border-black/10">
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-gray-900 drop-shadow-sm">
                WhattaPlace
              </span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-base font-medium rounded-full border border-transparent hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Mobile Navigation */}
            <div className="xl:hidden">
              <button
                aria-label="Toggle menu"
                aria-expanded={open}
                className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                onClick={() => setOpen((v) => !v)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-7 w-7 text-blue-600"
                >
                  {open ? (
                    <>
                      <path d="M18 6L6 18" strokeLinecap="round" />
                      <path d="M6 6L18 18" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      <path d="M3 6h18" strokeLinecap="round" />
                      <path d="M3 12h18" strokeLinecap="round" />
                      <path d="M3 18h18" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile dropdown */}
          <div className="xl:hidden px-4 pb-4">
            <div
              aria-hidden={!open}
              className={
                "mt-2 rounded-xl border border-neutral-200 bg-white/95 shadow-lg divide-y divide-neutral-200 overflow-hidden transition-all duration-300 ease-out transform-gpu " +
                (open
                  ? "opacity-100 max-h-96 scale-100"
                  : "opacity-0 max-h-0 scale-[0.98] pointer-events-none")
              }
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
