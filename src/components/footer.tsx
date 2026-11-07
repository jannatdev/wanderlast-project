import { ArrowUpRight } from "lucide-react";

import { Input } from "@/components/ui/input";

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"];
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="font-serif text-5xl font-semibold md:text-6xl">
          Wanderlast
        </p>
        <p className="mt-3 text-sm text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <h3 className="text-[13px] font-semibold tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="mt-3 max-w-xs text-sm text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-4 max-w-xs">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter email"
                className="h-11 rounded-md border-neutral-700 bg-neutral-800 pr-11 text-sm text-white placeholder:text-neutral-500 focus-visible:border-neutral-500 focus-visible:ring-neutral-500/40"
              />
              <button
                type="button"
                aria-label="Subscribe to newsletter"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-white"
              >
                <ArrowUpRight size={18} aria-hidden />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:7869011828"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  786 901 1828
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 pt-6">
          <p className="text-xs text-neutral-500">
            © 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-neutral-400">
            <a
              href="#"
              aria-label="X (Twitter)"
              className="transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="size-4"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="size-4"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.02h4.56V24H.22V8.02zM8.34 8.02h4.37v2.18h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-7.21c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V24H8.34V8.02z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="size-4"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
