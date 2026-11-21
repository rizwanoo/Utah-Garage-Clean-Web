import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BRAND, PageId } from "../data/brandData";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      );
      setIsScrolled(y > 36);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
        setIsMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleLinkClick = (page: PageId, sectionId?: string) => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
    onNavigate(page, sectionId);
  };

  const openDropdown = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 160);
  };

  const textToneClass = isScrolled ? "text-[#193747]" : "text-white";
  const ctaToneClass = isScrolled ? "ugc-cta--dark" : "ugc-cta--light";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#F8F8F3]/95 backdrop-blur-md border-b border-[#193747]/12 py-2.5"
          : "bg-gradient-to-b from-[#0B1726]/72 via-[#0B1726]/30 to-transparent py-3 sm:py-4"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 sm:gap-6 px-4 sm:px-8 lg:px-12">
        {/* Zone 1: Prominent Original Brand Logo + Single-Line Title */}
        <button
          type="button"
          onClick={() => handleLinkClick("home")}
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5 bg-transparent border-0 p-0 text-left focus-visible:outline-2 focus-visible:outline-[#159A98] focus-visible:outline-offset-4 cursor-pointer"
          aria-label="Utah Garage Clean Home"
        >
          <img
            src={BRAND.logoSvg}
            alt="Utah Garage Clean Official UGC Logo"
            className="h-11 w-11 sm:h-13 sm:w-13 lg:h-16 lg:w-16 shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span
            className={`font-[var(--font-heading)] text-[clamp(0.875rem,3.4vw,1.2rem)] lg:text-xl font-extrabold tracking-tight truncate transition-colors duration-200 ${textToneClass}`}
          >
            UTAH GARAGE CLEAN
          </span>
        </button>

        {/* Zone 2: Desktop Horizontal Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-9 shrink-0"
        >
          <button
            type="button"
            onClick={() => handleLinkClick("home")}
            aria-current={currentPage === "home" ? "page" : undefined}
            className={`ugc-nav-link ${textToneClass} ${
              currentPage === "home" ? "is-active" : ""
            }`}
          >
            Home
          </button>

          {/* Services Dropdown with seamless hover bridge */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleCloseDropdown}
          >
            <button
              type="button"
              onClick={() => handleLinkClick("services")}
              onFocus={openDropdown}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              aria-current={currentPage === "services" ? "page" : undefined}
              className={`ugc-nav-link ${textToneClass} ${
                currentPage === "services" ? "is-active" : ""
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isServicesOpen && (
              <div
                className="absolute left-0 top-full pt-3 z-50 min-w-[240px]"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleCloseDropdown}
              >
                <div className="bg-[#F8F8F3] border-t-2 border-[#159A98] shadow-[0_18px_40px_rgba(11,23,38,0.16)] py-3 px-5 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleLinkClick("services", "garage-cleaning")}
                    className="w-full text-left py-2.5 text-sm font-semibold text-[#193747] hover:text-[#159A98] transition-colors bg-transparent border-0 cursor-pointer whitespace-nowrap"
                  >
                    01. Garage Cleaning
                  </button>
                  <div className="h-[1px] w-full bg-[#193747]/10" />
                  <button
                    type="button"
                    onClick={() =>
                      handleLinkClick("services", "garage-organization")
                    }
                    className="w-full text-left py-2.5 text-sm font-semibold text-[#193747] hover:text-[#159A98] transition-colors bg-transparent border-0 cursor-pointer whitespace-nowrap"
                  >
                    02. Garage Organization
                  </button>
                  <div className="h-[1px] w-full bg-[#193747]/10" />
                  <button
                    type="button"
                    onClick={() => handleLinkClick("services")}
                    className="w-full text-left py-2.5 text-xs font-bold uppercase tracking-wider text-[#159A98] hover:text-[#193747] transition-colors bg-transparent border-0 cursor-pointer whitespace-nowrap"
                  >
                    All Services →
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              handleLinkClick("transformations", "transformations-gallery")
            }
            aria-current={currentPage === "transformations" ? "page" : undefined}
            className={`ugc-nav-link ${textToneClass} ${
              currentPage === "transformations" ? "is-active" : ""
            }`}
          >
            Transformations
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick("transformations", "about-us")}
            className={`ugc-nav-link ${textToneClass}`}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            aria-current={currentPage === "contact" ? "page" : undefined}
            className={`ugc-nav-link ${textToneClass} ${
              currentPage === "contact" ? "is-active" : ""
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Desktop Primary CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            className={`hidden lg:inline-flex ugc-cta ${ctaToneClass}`}
          >
            <span>FREE QUOTE</span>
            <span className="ugc-cta-arrow" aria-hidden="true">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center bg-transparent border-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#159A98] ${textToneClass}`}
          >
            {isMobileOpen ? (
              <X className="h-7 w-7" aria-hidden="true" />
            ) : (
              <Menu className="h-7 w-7" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Full-Screen Clean Editorial Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-0 z-50 flex flex-col bg-[#193747] text-white overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/15">
            <button
              type="button"
              onClick={() => handleLinkClick("home")}
              className="flex items-center gap-3 bg-transparent border-0 p-0 cursor-pointer"
            >
              <img
                src={BRAND.logoSvg}
                alt="Utah Garage Clean Official UGC Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="font-[var(--font-heading)] text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                UTAH GARAGE CLEAN
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center bg-transparent border-0 text-white cursor-pointer"
            >
              <X className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-between px-6 py-8"
          >
            <div className="flex flex-col divide-y divide-white/12">
              <button
                type="button"
                onClick={() => handleLinkClick("home")}
                className="w-full py-4 text-left font-[var(--font-heading)] text-2xl font-bold text-white hover:text-[#B8D957] bg-transparent border-0 cursor-pointer"
              >
                Home
              </button>

              <div className="py-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleLinkClick("services")}
                    className="py-2 text-left font-[var(--font-heading)] text-2xl font-bold text-white hover:text-[#B8D957] bg-transparent border-0 cursor-pointer"
                  >
                    Services
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setIsMobileServicesOpen((prev) => !prev)
                    }
                    aria-expanded={isMobileServicesOpen}
                    aria-label="Toggle Services submenu"
                    className="inline-flex h-11 w-11 items-center justify-center bg-transparent border-0 text-white/80 cursor-pointer"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                {isMobileServicesOpen && (
                  <div className="mt-1 mb-3 flex flex-col gap-2 pl-5">
                    <button
                      type="button"
                      onClick={() =>
                        handleLinkClick("services", "garage-cleaning")
                      }
                      className="py-2 text-left text-base font-medium text-[#EEF1EF] hover:text-[#B8D957] bg-transparent border-0 cursor-pointer"
                    >
                      01. Garage Cleaning
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleLinkClick("services", "garage-organization")
                      }
                      className="py-2 text-left text-base font-medium text-[#EEF1EF] hover:text-[#B8D957] bg-transparent border-0 cursor-pointer"
                    >
                      02. Garage Organization
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleLinkClick("transformations", "transformations-gallery")
                }
                className="w-full py-4 text-left font-[var(--font-heading)] text-2xl font-bold text-white hover:text-[#B8D957] bg-transparent border-0 cursor-pointer"
              >
                Transformations
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("transformations", "about-us")}
                className="w-full py-4 text-left font-[var(--font-heading)] text-2xl font-bold text-white hover:text-[#B8D957] bg-transparent border-0 cursor-pointer"
              >
                About Us
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("contact")}
                className="w-full py-4 text-left font-[var(--font-heading)] text-2xl font-bold text-white hover:text-[#B8D957] bg-transparent border-0 cursor-pointer"
              >
                Contact
              </button>
            </div>

            <div className="pt-8 border-t border-white/15 flex flex-col gap-4">
              <p className="text-sm text-[#EEF1EF]/80">
                South Jordan, Utah · Serving Salt Lake County
              </p>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="ugc-cta ugc-cta--lime self-start"
              >
                <span>DM &ldquo;GARAGE&rdquo; FOR FREE QUOTE</span>
                <span className="ugc-cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
