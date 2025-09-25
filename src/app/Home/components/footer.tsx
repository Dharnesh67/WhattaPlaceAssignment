import React from "react";

const Footer = () => {
  return (
    <footer className="w-full my-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[32px] bg-gradient-to-br from-[#1a37c7] to-[#0f2596] text-white p-6 sm:p-10 shadow-xl ring-1 ring-white/10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <div className="space-y-6">
              <div className="text-3xl sm:text-4xl font-semibold leading-none">whattaplace</div>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                  📸
                </span>
                <span>Instagram</span>
              </div>
              <a
                href="mailto:knock@whattaplace.com"
                className="block text-lg sm:text-xl underline-offset-4 hover:underline"
              >
                knock@whattaplace.com
              </a>
              <div className="flex items-center gap-3 pt-1">
                <a href="#instagram" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">📸</a>
                <a href="#twitter" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">✕</a>
                <a href="#linkedin" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">in</a>
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 md:items-end">
              <nav className="grid gap-3 text-base">
                <a href="#find" className="hover:underline underline-offset-4">
                  Find a Space
                </a>
                <a href="#host" className="hover:underline underline-offset-4">
                  Host a Place
                </a>
                <a href="#how" className="hover:underline underline-offset-4">
                  How it Works
                </a>
              </nav>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-white text-[#142ea7] px-5 py-2 font-medium transition-all hover:bg-white/90 hover:shadow"
              >
                Get in Touch
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#142ea7] bg-white text-[#142ea7] transition-transform group-hover:translate-x-0.5 group-hover:rotate-3">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-white/20" />

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
              <a href="#terms" className="hover:underline underline-offset-4">
                Terms & Conditions
              </a>
              <a href="#refund" className="hover:underline underline-offset-4">
                Cancellation & Refund Policy
              </a>
              <a href="#privacy" className="hover:underline underline-offset-4">
                Privacy Policy
              </a>
              <a href="#cookies" className="hover:underline underline-offset-4">
                Cookies
              </a>
              <a href="#conduct" className="hover:underline underline-offset-4">
                Code of Conduct
              </a>
            </div>
            <div className="text-sm opacity-80">© 2025 Plenusvita - All Rights Reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
