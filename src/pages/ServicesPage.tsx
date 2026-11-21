import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, PageId, VISUAL_ASSETS } from "../data/brandData";
import { EditorialImage } from "../components/EditorialImage";

interface ServicesPageProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".services-hero-item", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.utils.toArray<HTMLElement>(".service-reveal").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* =========================================================
          SERVICES HERO (EXTENDS BEHIND TRANSPARENT NAVBAR)
         ========================================================= */}
      <section className="relative min-h-[70vh] w-full overflow-hidden flex items-end bg-[#193747]">
        <div className="absolute inset-0">
          <img
            src={VISUAL_ASSETS.cleaningFloor.src}
            alt={VISUAL_ASSETS.cleaningFloor.alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(15deg, rgba(11,23,38,0.84) 0%, rgba(11,23,38,0.46) 55%, rgba(11,23,38,0.18) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-36 pb-16 lg:pb-20">
          <p className="services-hero-item text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#B8D957]">
            Verified Services · South Jordan &amp; Salt Lake County
          </p>
          <h1 className="services-hero-item mt-3 max-w-3xl font-[var(--font-heading)] text-[clamp(2.25rem,4.6vw,4rem)] font-extrabold leading-[1.06] text-white">
            Garage Cleaning &amp; Organization Services
          </h1>
          <p className="services-hero-item mt-5 max-w-2xl text-base sm:text-lg text-[#EEF1EF]/90">
            Two focused, hands-on services designed to restore clean concrete
            surfaces, clear out built-up clutter, and organize everyday items
            for Salt Lake County homeowners.
          </p>
          <p className="services-hero-item mt-6 text-xs text-[#EEF1EF]/70">
            {VISUAL_ASSETS.cleaningFloor.caption}
          </p>
        </div>
      </section>

      {/* =========================================================
          01. GARAGE CLEANING (FRESH WHITE)
         ========================================================= */}
      <section id="garage-cleaning" className="bg-white py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="service-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#159A98]">
                Service 01
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(2rem,3.4vw,2.85rem)] font-bold leading-tight text-[#193747]">
                Garage Cleaning
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#414B50]">
                Garages collect everything tracked in from Utah driveways and
                seasons—dust, leaves, cobwebs, and forgotten piles that shrink
                your usable parking footprint. Our garage cleaning service
                focuses on restoring a genuinely clean interior from the floor
                up.
              </p>

              <div className="mt-8 pt-6 ugc-hairline-top space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#193747]">
                  What This Covers
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-[#414B50] list-none p-0 m-0">
                  <li className="pb-3 ugc-hairline-bottom">
                    Sweeping and clearing accumulated dust, grit, and dry debris
                    across garage floors
                  </li>
                  <li className="pb-3 ugc-hairline-bottom">
                    Cleaning corners, perimeter ledges, and interior edges
                    around doors and walls
                  </li>
                  <li className="pb-3 ugc-hairline-bottom">
                    Resetting active walkways and vehicle bays for clean daily
                    entry
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="ugc-cta ugc-cta--dark"
                >
                  <span>GET YOUR FREE GARAGE QUOTE</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ugc-cta ugc-cta--teal text-sm"
                >
                  <span>DM &ldquo;GARAGE&rdquo; ON INSTAGRAM</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              <EditorialImage
                src={VISUAL_ASSETS.spaceAfterCalm.src}
                alt={VISUAL_ASSETS.spaceAfterCalm.alt}
                caption={VISUAL_ASSETS.spaceAfterCalm.caption}
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. GARAGE ORGANIZATION (PALE MINT)
         ========================================================= */}
      <section
        id="garage-organization"
        className="bg-[#E8F2EC] py-20 lg:py-28 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="service-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-12 gap-8 items-end">
              <div className="sm:col-span-8">
                <EditorialImage
                  src={VISUAL_ASSETS.organizationShelving.src}
                  alt={VISUAL_ASSETS.organizationShelving.alt}
                  caption={VISUAL_ASSETS.organizationShelving.caption}
                  aspectClass="aspect-[4/3]"
                />
              </div>
              <div className="sm:col-span-4">
                <EditorialImage
                  src={VISUAL_ASSETS.toolsDetail.src}
                  alt={VISUAL_ASSETS.toolsDetail.alt}
                  caption="Illustrative tool arrangement"
                  aspectClass="aspect-[3/4]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#159A98]">
                Service 02
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(2rem,3.4vw,2.85rem)] font-bold leading-tight text-[#193747]">
                Garage Organization
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#414B50]">
                Cleaning alone doesn&rsquo;t stick if everything gets pushed
                back into the same corners. Our garage organization service
                brings clear structure to your tools, bins, and seasonal gear
                using functional zones built around how your household moves
                through the space.
              </p>

              <div className="mt-8 pt-6 ugc-hairline-top space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#193747]">
                  What This Covers
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-[#414B50] list-none p-0 m-0">
                  <li className="pb-3 ugc-hairline-bottom">
                    Sorting household, sports, yard, and seasonal items into
                    clear functional categories
                  </li>
                  <li className="pb-3 ugc-hairline-bottom">
                    Arranging storage totes, bins, and everyday equipment cleanly
                    on your shelving and wall spaces
                  </li>
                  <li className="pb-3 ugc-hairline-bottom">
                    Keeping high-traffic floor areas clear so vehicles and daily
                    gear fit comfortably
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="ugc-cta ugc-cta--dark"
                >
                  <span>GET YOUR FREE GARAGE QUOTE</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          03. HOW WE WORK (SOFT CONCRETE — BORDERLESS SEQUENCE)
         ========================================================= */}
      <section className="bg-[#EEF1EF] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="service-reveal max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
              How It Works
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.85rem,3.2vw,2.65rem)] font-bold text-[#193747]">
              Straightforward process from your first DM to a finished garage.
            </h2>
          </div>

          <div className="service-reveal mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-10 ugc-hairline-top">
            <div>
              <p className="font-[var(--font-heading)] text-3xl font-extrabold text-[#159A98]">
                01
              </p>
              <h3 className="mt-3 font-[var(--font-heading)] text-lg font-bold text-[#193747]">
                DM &ldquo;GARAGE&rdquo;
              </h3>
              <p className="mt-2 text-sm text-[#414B50]">
                Message {BRAND.handle} on Instagram with the keyword GARAGE and
                tell us whether you need cleaning, organization, or both.
              </p>
            </div>

            <div>
              <p className="font-[var(--font-heading)] text-3xl font-extrabold text-[#159A98]">
                02
              </p>
              <h3 className="mt-3 font-[var(--font-heading)] text-lg font-bold text-[#193747]">
                Share Your Space
              </h3>
              <p className="mt-2 text-sm text-[#414B50]">
                Send a couple of quick garage photos and your general Salt Lake
                County location so we can give you an accurate free quote.
              </p>
            </div>

            <div>
              <p className="font-[var(--font-heading)] text-3xl font-extrabold text-[#159A98]">
                03
              </p>
              <h3 className="mt-3 font-[var(--font-heading)] text-lg font-bold text-[#193747]">
                Clean &amp; Organize
              </h3>
              <p className="mt-2 text-sm text-[#414B50]">
                We clear the workspace, clean the interior, sort belongings into
                logical zones, and arrange your storage cleanly.
              </p>
            </div>

            <div>
              <p className="font-[var(--font-heading)] text-3xl font-extrabold text-[#159A98]">
                04
              </p>
              <h3 className="mt-3 font-[var(--font-heading)] text-lg font-bold text-[#193747]">
                Enjoy the Space
              </h3>
              <p className="mt-2 text-sm text-[#414B50]">
                Step back into a bright, functional garage with open concrete
                and organized gear ready for daily life.
              </p>
            </div>
          </div>

          <div className="service-reveal mt-14 pt-10 ugc-hairline-top flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="m-0 text-base font-medium text-[#193747]">
              Serving homeowners in South Jordan and across Salt Lake County,
              Utah.
            </p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ugc-cta ugc-cta--dark"
            >
              <span>REQUEST A FREE QUOTE VIA INSTAGRAM</span>
              <span className="ugc-cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
