import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, PageId, VISUAL_ASSETS } from "../data/brandData";
import { EditorialImage } from "../components/EditorialImage";

interface HomePageProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.to(".hero-parallax-img", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        gsap.from(block, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: block,
            start: "top 84%",
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
          1. CINEMATIC FULL-BLEED HERO (EXTENDS BEHIND NAVBAR)
         ========================================================= */}
      <section className="hero-section relative min-h-[92vh] w-full overflow-hidden flex items-end bg-[#193747]">
        <div className="absolute inset-0">
          <img
            src={VISUAL_ASSETS.heroPanorama.src}
            alt={VISUAL_ASSETS.heroPanorama.alt}
            referrerPolicy="no-referrer"
            className="hero-parallax-img h-[112%] w-full object-cover object-center"
          />
          {/* Subtle local bottom-left editorial contrast scrim — keeps garage bright & visible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(15deg, rgba(11,23,38,0.82) 0%, rgba(11,23,38,0.42) 45%, rgba(11,23,38,0.08) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-36 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-3xl">
            <p className="hero-stagger text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#B8D957] mb-4">
              South Jordan, Utah · Serving Salt Lake County
            </p>
            <h1 className="hero-stagger font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold leading-[1.04] tracking-tight text-white">
              A Clean Garage.
              <br />A Better Space.
            </h1>
            <p className="hero-stagger mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#EEF1EF]/92">
              Professional garage cleaning and organization serving South Jordan
              and Salt Lake County, Utah. Get your free quote and give your
              garage a fresh start.
            </p>

            <div className="hero-stagger mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                className="ugc-cta ugc-cta--lime text-base"
              >
                <span>GET YOUR FREE QUOTE</span>
                <span className="ugc-cta-arrow" aria-hidden="true">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onNavigate("transformations", "transformations-gallery")
                }
                className="ugc-cta ugc-cta--light text-base"
              >
                <span>SEE THE TRANSFORMATIONS</span>
                <span className="ugc-cta-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>

            <p className="hero-stagger mt-8 text-xs text-[#EEF1EF]/70">
              {VISUAL_ASSETS.heroPanorama.caption}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. EDITORIAL INTRODUCTION (WARM IVORY)
         ========================================================= */}
      <section className="bg-[#F8F8F3] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="reveal-block grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                Utah Garage Clean · {BRAND.handle}
              </p>
              <h2 className="mt-4 font-[var(--font-heading)] text-[clamp(1.85rem,3.4vw,3rem)] font-bold leading-[1.12] text-[#193747]">
                Clean garages. Better organization. More usable space for daily
                life.
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#414B50] max-w-xl">
                When a garage fills up with boxes, yard gear, and accumulated
                dust, the largest entryway in your home stops working for you.
                Utah Garage Clean helps South Jordan and Salt Lake County
                homeowners clear the clutter and restore functional order.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onNavigate("services")}
                  className="ugc-cta ugc-cta--dark"
                >
                  <span>EXPLORE OUR SERVICES</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <div className="py-8 ugc-hairline-top ugc-hairline-bottom">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-[#193747]">
                    01. Garage Cleaning
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#159A98]">
                    Floor &amp; Space Reset
                  </span>
                </div>
                <p className="mt-3 text-base text-[#414B50]">
                  Thorough hands-on cleaning that clears out dust, cobwebs, and
                  floor debris so your garage interior feels bright, swept, and
                  ready for everyday use.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate("services", "garage-cleaning")}
                    className="ugc-cta ugc-cta--teal text-sm"
                  >
                    <span>GARAGE CLEANING DETAILS</span>
                    <span className="ugc-cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </div>

              <div className="py-8 ugc-hairline-bottom">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-[#193747]">
                    02. Garage Organization
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#159A98]">
                    Practical Zoning
                  </span>
                </div>
                <p className="mt-3 text-base text-[#414B50]">
                  Thoughtful sorting and arrangement of tools, seasonal storage,
                  and household equipment across your shelving and floor layout
                  for straightforward access.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate("services", "garage-organization")}
                    className="ugc-cta ugc-cta--teal text-sm"
                  >
                    <span>GARAGE ORGANIZATION DETAILS</span>
                    <span className="ugc-cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. SPLIT-SCREEN SERVICE SHOWCASE (SOFT CONCRETE & PALE MINT)
         ========================================================= */}
      <section className="bg-[#EEF1EF] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-24 lg:space-y-32">
          {/* Split A: Cleaning */}
          <div className="reveal-block grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <EditorialImage
                src={VISUAL_ASSETS.cleaningFloor.src}
                alt={VISUAL_ASSETS.cleaningFloor.alt}
                caption={VISUAL_ASSETS.cleaningFloor.caption}
                aspectClass="aspect-[16/10]"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                A Fresh Start
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#193747]">
                From cluttered corners to clear, walkable concrete.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#414B50]">
                Whether winter grit, yard clippings, or years of stacked boxes
                have taken over your bays, we help bring your garage floor and
                surfaces back to a clean, orderly baseline.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => onNavigate("services", "garage-cleaning")}
                  className="ugc-cta ugc-cta--dark"
                >
                  <span>DISCOVER A CLEANER GARAGE</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Split B: Organization (Reversed) */}
          <div className="reveal-block grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                More Usable Space
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#193747]">
                Every tool, tote, and bike arranged where it makes sense.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#414B50]">
                Good garage organization is practical, not precious. We group
                your belongings by daily use and arrange shelving and storage
                zones so your family can actually park and find what they need.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => onNavigate("services", "garage-organization")}
                  className="ugc-cta ugc-cta--dark"
                >
                  <span>EXPLORE GARAGE ORGANIZATION</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <EditorialImage
                src={VISUAL_ASSETS.organizationShelving.src}
                alt={VISUAL_ASSETS.organizationShelving.alt}
                caption={VISUAL_ASSETS.organizationShelving.caption}
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. AUTHENTIC INSTAGRAM TRANSFORMATIONS ANCHOR (DEEP NAVY)
         ========================================================= */}
      <section className="bg-[#193747] text-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="reveal-block grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-5 mb-8">
                <img
                  src={BRAND.logoSvg}
                  alt="Utah Garage Clean Official UGC Logo"
                  className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 object-contain"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8D957]">
                    Official Instagram Feed
                  </p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl font-bold text-white">
                    {BRAND.handle}
                  </p>
                </div>
              </div>

              <h2 className="font-[var(--font-heading)] text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.1] text-white">
                See genuine before-and-after garage transformations on our
                Instagram.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#EEF1EF]/85 max-w-xl">
                Our real residential cleanouts, before-and-after reels, and
                completed garage organization projects are shared directly on{" "}
                <strong className="font-semibold text-white">
                  {BRAND.handle}
                </strong>{" "}
                so Salt Lake County homeowners can browse authentic, unedited
                results before messaging us.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ugc-cta ugc-cta--lime"
                >
                  <span>VIEW REAL WORK ON INSTAGRAM</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate("transformations", "transformations-gallery")
                  }
                  className="ugc-cta ugc-cta--light"
                >
                  <span>TRANSFORMATIONS &amp; ABOUT US</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EditorialImage
                src={VISUAL_ASSETS.spaceAfterCalm.src}
                alt={VISUAL_ASSETS.spaceAfterCalm.alt}
                caption={VISUAL_ASSETS.spaceAfterCalm.caption}
                aspectClass="aspect-[4/3]"
                darkCaption
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. SOUTH JORDAN & SALT LAKE COUNTY — DM "GARAGE" CTA BAND
         ========================================================= */}
      <section className="bg-[#E8F2EC] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="reveal-block max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
              South Jordan, Utah · Serving Salt Lake County
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.1] text-[#193747]">
              Request your free garage cleaning quote in one direct message.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#414B50] max-w-2xl">
              Skip complicated booking portals. Send us the message{" "}
              <strong className="font-bold text-[#193747]">GARAGE</strong> on
              Instagram to start a conversation about your space and receive a
              free quote.
            </p>
          </div>

          <div className="reveal-block mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 ugc-hairline-top">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#159A98]">
                Step 01
              </p>
              <h3 className="mt-2 font-[var(--font-heading)] text-xl font-bold text-[#193747]">
                Open {BRAND.handle}
              </h3>
              <p className="mt-2 text-sm text-[#414B50]">
                Head directly to Utah Garage Clean&rsquo;s official Instagram
                profile from any button on this site.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#159A98]">
                Step 02
              </p>
              <h3 className="mt-2 font-[var(--font-heading)] text-xl font-bold text-[#193747]">
                DM &ldquo;GARAGE&rdquo;
              </h3>
              <p className="mt-2 text-sm text-[#414B50]">
                Send us the message <strong>GARAGE</strong> along with a brief
                note or quick photos of your garage.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#159A98]">
                Step 03
              </p>
              <h3 className="mt-2 font-[var(--font-heading)] text-xl font-bold text-[#193747]">
                Get Your Free Quote
              </h3>
              <p className="mt-2 text-sm text-[#414B50]">
                We review your cleaning or organization needs across Salt Lake
                County and reply directly.
              </p>
            </div>
          </div>

          <div className="reveal-block mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ugc-cta ugc-cta--dark text-base"
            >
              <span>MESSAGE US &ldquo;GARAGE&rdquo; ON INSTAGRAM</span>
              <span className="ugc-cta-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="ugc-cta ugc-cta--teal text-base"
            >
              <span>PREPARE YOUR QUOTE BRIEF</span>
              <span className="ugc-cta-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
