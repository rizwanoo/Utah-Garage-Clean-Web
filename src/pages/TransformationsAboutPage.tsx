import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BRAND,
  PageId,
  TRANSFORMATION_STAGES,
  VISUAL_ASSETS,
} from "../data/brandData";
import { EditorialImage } from "../components/EditorialImage";

interface TransformationsAboutPageProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
}

export const TransformationsAboutPage: React.FC<
  TransformationsAboutPageProps
> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stage = TRANSFORMATION_STAGES[activeStageIndex];

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".trans-hero-item", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.utils.toArray<HTMLElement>(".trans-reveal").forEach((el) => {
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
          1. FULL-BLEED TRANSFORMATIONS HERO (BEHIND TRANSPARENT NAVBAR)
         ========================================================= */}
      <section
        id="transformations-gallery"
        className="relative min-h-[72vh] w-full overflow-hidden flex items-end bg-[#193747]"
      >
        <div className="absolute inset-0">
          <img
            src={VISUAL_ASSETS.spaceAfterCalm.src}
            alt={VISUAL_ASSETS.spaceAfterCalm.alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(15deg, rgba(11,23,38,0.85) 0%, rgba(11,23,38,0.45) 55%, rgba(11,23,38,0.18) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-36 pb-16 lg:pb-20">
          <p className="trans-hero-item text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#B8D957]">
            Real Results &amp; Brand Story · {BRAND.handle}
          </p>
          <h1 className="trans-hero-item mt-3 max-w-3xl font-[var(--font-heading)] text-[clamp(2.25rem,4.6vw,4rem)] font-extrabold leading-[1.06] text-white">
            Garage Transformations &amp; About Us
          </h1>
          <p className="trans-hero-item mt-5 max-w-2xl text-base sm:text-lg text-[#EEF1EF]/90">
            Every garage reset begins with honest work, practical organization,
            and zero judgment. Browse our verified before-and-after posts
            directly on Instagram or explore how we approach a full space reset.
          </p>
          <p className="trans-hero-item mt-6 text-xs text-[#EEF1EF]/70">
            {VISUAL_ASSETS.spaceAfterCalm.caption}
          </p>
        </div>
      </section>

      {/* =========================================================
          2. REAL CLIENT TRANSFORMATIONS LIVE ON INSTAGRAM (WARM IVORY)
         ========================================================= */}
      <section className="bg-[#F8F8F3] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="trans-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                Authentic Before &amp; After Archive
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-[1.12] text-[#193747]">
                Unfiltered before-and-after projects live on {BRAND.handle}.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#414B50]">
                We never fabricate before-and-after comparisons or pair two
                unrelated garages together. Utah Garage Clean shares genuine
                client transformations, project reels, and behind-the-scenes
                cleanups across Salt Lake County directly on our official
                Instagram feed.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#414B50]">
                Open our Instagram profile to browse real homeowner projects,
                see how we organize everyday tools and storage, and message{" "}
                <strong className="font-bold text-[#193747]">GARAGE</strong>{" "}
                whenever you&rsquo;re ready for your own free quote.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ugc-cta ugc-cta--dark text-base"
                >
                  <span>OPEN @UTAHGARAGECLEAN ON INSTAGRAM</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
              <div className="sm:col-span-7">
                <EditorialImage
                  src={VISUAL_ASSETS.heroPanorama.src}
                  alt={VISUAL_ASSETS.heroPanorama.alt}
                  caption="Illustrative clean garage interior"
                  aspectClass="aspect-[4/3]"
                />
              </div>
              <div className="sm:col-span-5">
                <EditorialImage
                  src={VISUAL_ASSETS.toolsDetail.src}
                  alt={VISUAL_ASSETS.toolsDetail.alt}
                  caption="Illustrative tool wall layout"
                  aspectClass="aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. INTERACTIVE 3-STAGE GARAGE RESET EXPLORER (SOFT CONCRETE)
         ========================================================= */}
      <section className="bg-[#EEF1EF] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="trans-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 ugc-hairline-bottom">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                Anatomy of a Reset
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.85rem,3.2vw,2.65rem)] font-bold text-[#193747]">
                How cleaning and organization work together step by step.
              </h2>
            </div>

            {/* Borderless interactive stage selector */}
            <div
              role="tablist"
              aria-label="Garage transformation stages"
              className="flex flex-wrap items-center gap-6 sm:gap-8"
            >
              {TRANSFORMATION_STAGES.map((item, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`relative min-h-[44px] py-2 bg-transparent border-0 text-sm sm:text-base font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-[#193747]"
                        : "text-[#414B50]/70 hover:text-[#159A98]"
                    }`}
                  >
                    <span>
                      {item.index}. {item.label}
                    </span>
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[#159A98] transition-transform duration-200 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <EditorialImage
                src={stage.image.src}
                alt={stage.image.alt}
                caption={stage.image.caption}
                aspectClass="aspect-[16/10]"
              />
            </div>

            <div className="lg:col-span-5">
              <p className="font-[var(--font-heading)] text-4xl font-extrabold text-[#159A98]">
                {stage.index}
              </p>
              <h3 className="mt-3 font-[var(--font-heading)] text-2xl sm:text-3xl font-bold leading-snug text-[#193747]">
                {stage.headline}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#414B50]">
                {stage.summary}
              </p>

              <ul className="mt-6 space-y-3 text-sm sm:text-base text-[#28363D] list-none p-0 m-0">
                {stage.focusPoints.map((pt) => (
                  <li key={pt} className="pt-3 ugc-hairline-top">
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="ugc-cta ugc-cta--dark"
                >
                  <span>START YOUR GARAGE RESET</span>
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
          4. ABOUT UTAH GARAGE CLEAN (DEEP NAVY + LARGE OFFICIAL LOGO)
         ========================================================= */}
      <section
        id="about-us"
        className="bg-[#193747] text-white py-20 lg:py-28 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="trans-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col items-start">
              <img
                src={BRAND.logoSvg}
                alt="Utah Garage Clean Official UGC Emblem"
                className="h-36 w-36 sm:h-44 sm:w-44 object-contain"
              />
              <div className="mt-8 pt-6 ugc-hairline-light-top w-full space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8D957]">
                  Official Identity
                </p>
                <p className="font-[var(--font-heading)] text-2xl font-bold text-white">
                  Utah Garage Clean
                </p>
                <p className="text-sm text-[#EEF1EF]/80">
                  South Jordan, Utah · Serving Salt Lake County
                </p>
                <p className="text-sm text-[#EEF1EF]/80">
                  Instagram: {BRAND.handle}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8D957]">
                About Utah Garage Clean
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold leading-tight text-white">
                Local garage cleaning and organization built around honest
                work and clear results.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#EEF1EF]/88">
                Based in South Jordan, Utah, Utah Garage Clean focuses on two
                essential things homeowners actually need: thorough garage
                cleaning and practical garage organization across Salt Lake
                County.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#EEF1EF]/80">
                Most homeowners put off tackling the garage because the mess
                feels too big to start alone. Instead of overcomplicating the
                process with endless forms or high-pressure sales, we keep
                everything personal and direct—message us{" "}
                <strong className="font-bold text-white">GARAGE</strong> on
                Instagram, show us your space, and get a straightforward free
                quote.
              </p>

              <div className="mt-10 pt-8 ugc-hairline-light-top flex flex-wrap items-center gap-x-10 gap-y-4">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ugc-cta ugc-cta--lime"
                >
                  <span>DM &ldquo;GARAGE&rdquo; FOR A FREE QUOTE</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="ugc-cta ugc-cta--light"
                >
                  <span>CONTACT PAGE &amp; QUOTE BRIEF</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
