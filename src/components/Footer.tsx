import React from "react";
import { BRAND, PageId } from "../data/brandData";

interface FooterProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#193747] text-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        {/* Top Row: Large Official Logo + Primary Instagram DM Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 ugc-hairline-light-bottom items-start">
          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <img
              src={BRAND.logoSvg}
              alt="Utah Garage Clean Official UGC Logo"
              className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 object-contain"
            />
            <div>
              <p className="font-[var(--font-heading)] text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Utah Garage Clean
              </p>
              <p className="mt-2 text-base text-[#EEF1EF]/80 max-w-md">
                Garage Cleaning &amp; Organization based in South Jordan, Utah,
                serving homeowners across Salt Lake County.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:text-right flex flex-col lg:items-end justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#B8D957]">
              Free Quote via Instagram Direct Message
            </p>
            <h2 className="mt-2 font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white max-w-lg lg:text-right">
              Ready for a clean, usable garage? Send us &ldquo;GARAGE&rdquo; on
              Instagram.
            </h2>
            <div className="mt-5">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ugc-cta ugc-cta--lime text-base"
              >
                <span>GET YOUR FREE GARAGE QUOTE</span>
                <span className="ugc-cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Row: Editorial Columns without boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5B9BB5]">
              Confirmed Services
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#EEF1EF]/85 list-none p-0 m-0">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services", "garage-cleaning")}
                  className="bg-transparent border-0 p-0 text-left text-[#EEF1EF]/85 hover:text-[#B8D957] transition-colors cursor-pointer"
                >
                  Garage Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services", "garage-organization")}
                  className="bg-transparent border-0 p-0 text-left text-[#EEF1EF]/85 hover:text-[#B8D957] transition-colors cursor-pointer"
                >
                  Garage Organization
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5B9BB5]">
              Explore Pages
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#EEF1EF]/85 list-none p-0 m-0">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("home")}
                  className="bg-transparent border-0 p-0 text-left text-[#EEF1EF]/85 hover:text-[#B8D957] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services")}
                  className="bg-transparent border-0 p-0 text-left text-[#EEF1EF]/85 hover:text-[#B8D957] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("transformations")}
                  className="bg-transparent border-0 p-0 text-left text-[#EEF1EF]/85 hover:text-[#B8D957] transition-colors cursor-pointer"
                >
                  Transformations &amp; About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="bg-transparent border-0 p-0 text-left text-[#EEF1EF]/85 hover:text-[#B8D957] transition-colors cursor-pointer"
                >
                  Contact &amp; Free Quote
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5B9BB5]">
              Location &amp; Official Contact
            </p>
            <div className="mt-4 space-y-2 text-sm text-[#EEF1EF]/85">
              <p className="m-0 font-semibold text-white">
                South Jordan, Utah
              </p>
              <p className="m-0">Serving Salt Lake County, Utah</p>
              <p className="m-0 pt-2">
                Official Instagram:{" "}
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#B8D957] underline decoration-[#B8D957]/40 underline-offset-4 hover:text-white"
                >
                  {BRAND.handle}
                </a>
              </p>
              <p className="m-0 text-xs text-[#EEF1EF]/65">
                DM &ldquo;GARAGE&rdquo; on Instagram for your free quote.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Quiet Copyright Bar */}
        <div className="pt-8 ugc-hairline-light-top flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#EEF1EF]/65">
          <p className="m-0">
            &copy; {new Date().getFullYear()} Utah Garage Clean · South Jordan,
            Utah
          </p>
          <p className="m-0">
            Garage Cleaning &amp; Organization · Salt Lake County
          </p>
        </div>
      </div>
    </footer>
  );
};
