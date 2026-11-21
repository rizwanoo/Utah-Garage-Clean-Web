import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { BRAND, VISUAL_ASSETS } from "../data/brandData";

export const ContactPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [locationArea, setLocationArea] = useState("");
  const [garageType, setGarageType] = useState("2-Car Attached");
  const [garageSize, setGarageSize] = useState("Standard 2-Bay");
  const [serviceNeed, setServiceNeed] = useState(
    "Both Cleaning & Organization"
  );
  const [optionalContact, setOptionalContact] = useState("");
  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState<string | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-hero-item", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handlePrepareDm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError("Please enter your name so we can personalize your GARAGE quote message.");
      return;
    }

    const briefLines = [
      "GARAGE",
      "",
      `Name: ${fullName.trim()}`,
      locationArea.trim()
        ? `Location (Salt Lake County): ${locationArea.trim()}`
        : "Location: Salt Lake County, UT",
      `Garage Type / Size: ${garageType} · ${garageSize}`,
      `Service Needed: ${serviceNeed}`,
      optionalContact.trim()
        ? `Optional Contact: ${optionalContact.trim()}`
        : null,
      description.trim() ? `Project Notes: ${description.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(briefLines);
      }
      setCopiedBrief(briefLines);
    } catch {
      setCopiedBrief(briefLines);
    }
  };

  return (
    <div ref={pageRef}>
      {/* =========================================================
          1. CONTACT HEADER (EXTENDS BEHIND TRANSPARENT NAVBAR)
         ========================================================= */}
      <section className="relative min-h-[64vh] w-full overflow-hidden flex items-end bg-[#193747]">
        <div className="absolute inset-0">
          <img
            src={VISUAL_ASSETS.heroPanorama.src}
            alt={VISUAL_ASSETS.heroPanorama.alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(15deg, rgba(11,23,38,0.88) 0%, rgba(11,23,38,0.52) 55%, rgba(11,23,38,0.2) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-36 pb-16 lg:pb-20">
          <p className="contact-hero-item text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#B8D957]">
            South Jordan, Utah · Serving Salt Lake County
          </p>
          <h1 className="contact-hero-item mt-3 max-w-3xl font-[var(--font-heading)] text-[clamp(2.25rem,4.6vw,4rem)] font-extrabold leading-[1.06] text-white">
            Free Garage Cleaning Quote
          </h1>
          <p className="contact-hero-item mt-5 max-w-2xl text-base sm:text-lg text-[#EEF1EF]/90">
            Send us the message{" "}
            <strong className="font-bold text-white">GARAGE</strong> on
            Instagram to request your free quote from Utah Garage Clean.
          </p>
        </div>
      </section>

      {/* =========================================================
          2. PRIMARY CONTACT METHOD: INSTAGRAM DM "GARAGE" (WARM IVORY)
         ========================================================= */}
      <section className="bg-[#F8F8F3] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="contact-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                Primary Contact Method
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.9rem,3.4vw,2.9rem)] font-bold leading-[1.1] text-[#193747]">
                Send us the message &ldquo;GARAGE&rdquo; on Instagram to request
                your free quote.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[#414B50] max-w-xl">
                Our official Instagram Direct Messages ({BRAND.handle}) are the
                fastest and confirmed way to reach Utah Garage Clean. Include a
                couple of quick photos of your garage if you have them handy.
              </p>

              <div className="mt-8">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ugc-cta ugc-cta--dark text-lg"
                >
                  <span>GET YOUR FREE GARAGE QUOTE</span>
                  <span className="ugc-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 pt-2 lg:pt-0 space-y-6">
              <div className="pb-5 ugc-hairline-bottom">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#159A98]">
                  Business Name
                </p>
                <p className="mt-1 font-[var(--font-heading)] text-xl font-bold text-[#193747]">
                  Utah Garage Clean
                </p>
              </div>

              <div className="pb-5 ugc-hairline-bottom">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#159A98]">
                  Official Instagram
                </p>
                <p className="mt-1 text-base font-semibold text-[#193747]">
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[#159A98] underline-offset-4 hover:text-[#159A98]"
                  >
                    {BRAND.handle}
                  </a>{" "}
                  · DM &ldquo;GARAGE&rdquo;
                </p>
              </div>

              <div className="pb-5 ugc-hairline-bottom">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#159A98]">
                  Location &amp; Service Area
                </p>
                <p className="mt-1 text-base font-semibold text-[#193747]">
                  SOUTH JORDAN, UTAH
                </p>
                <p className="text-sm text-[#414B50]">
                  SERVING SALT LAKE COUNTY
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#159A98]">
                  Confirmed Services
                </p>
                <p className="mt-1 text-base font-medium text-[#193747]">
                  Garage Cleaning &amp; Garage Organization
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. INSTAGRAM DM QUOTE BRIEF BUILDER (SOFT CONCRETE)
         ========================================================= */}
      <section className="bg-[#EEF1EF] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="contact-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                Prepare Your DM Note
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.85rem,3vw,2.5rem)] font-bold leading-tight text-[#193747]">
                Build your &ldquo;GARAGE&rdquo; quote message in 30 seconds.
              </h2>
              <p className="mt-4 text-base text-[#414B50]">
                Because Utah Garage Clean handles quotes directly via Instagram
                DM rather than a separate email inbox, this tool formats your
                garage details into a clean ready-to-paste{" "}
                <strong>GARAGE</strong> message and copies it to your clipboard.
              </p>
              <p className="mt-3 text-sm text-[#414B50]">
                Fill in what applies—only your name is required, and you can
                attach photos once you open Instagram.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handlePrepareDm} noValidate className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#193747]"
                    >
                      Full Name *
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="ugc-input mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project-location"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#193747]"
                    >
                      Project Location (Salt Lake County)
                    </label>
                    <input
                      id="project-location"
                      type="text"
                      value={locationArea}
                      onChange={(e) => setLocationArea(e.target.value)}
                      placeholder="e.g. South Jordan / Salt Lake County"
                      className="ugc-input mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="garage-type"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#193747]"
                    >
                      Type of Garage
                    </label>
                    <select
                      id="garage-type"
                      value={garageType}
                      onChange={(e) => setGarageType(e.target.value)}
                      className="ugc-input mt-1"
                    >
                      <option value="Attached Residential Garage">
                        Attached Residential Garage
                      </option>
                      <option value="Detached Garage">Detached Garage</option>
                      <option value="Tandem Garage">Tandem Garage</option>
                      <option value="Workshop / Storage Garage">
                        Workshop / Storage Garage
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="garage-size"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#193747]"
                    >
                      Approximate Garage Size
                    </label>
                    <select
                      id="garage-size"
                      value={garageSize}
                      onChange={(e) => setGarageSize(e.target.value)}
                      className="ugc-input mt-1"
                    >
                      <option value="1-Car Bay">1-Car Bay</option>
                      <option value="Standard 2-Bay">Standard 2-Bay</option>
                      <option value="3-Car+ Bay">3-Car+ Bay</option>
                      <option value="Unsure / Custom">Unsure / Custom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="service-need"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#193747]"
                    >
                      Cleaning or Organization Requirements
                    </label>
                    <select
                      id="service-need"
                      value={serviceNeed}
                      onChange={(e) => setServiceNeed(e.target.value)}
                      className="ugc-input mt-1"
                    >
                      <option value="Both Cleaning & Organization">
                        Both Cleaning &amp; Organization
                      </option>
                      <option value="Garage Cleaning">Garage Cleaning</option>
                      <option value="Garage Organization">
                        Garage Organization
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="optional-contact"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#193747]"
                    >
                      Optional Email or Phone (to include in DM)
                    </label>
                    <input
                      id="optional-contact"
                      type="text"
                      value={optionalContact}
                      onChange={(e) => setOptionalContact(e.target.value)}
                      placeholder="Optional — only if you want it in your DM"
                      className="ugc-input mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-description"
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#193747]"
                  >
                    Project Description (Optional)
                  </label>
                  <textarea
                    id="project-description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what needs cleaning or organizing (boxes, shelving, tools, floor space)..."
                    className="ugc-input mt-1 resize-y"
                  />
                </div>

                {formError && (
                  <p className="text-sm font-semibold text-[#B42318]" role="alert">
                    {formError}
                  </p>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-x-10 gap-y-4">
                  <button type="submit" className="ugc-cta ugc-cta--dark">
                    <span>COPY &ldquo;GARAGE&rdquo; QUOTE BRIEF</span>
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
                    <span>OPEN @UTAHGARAGECLEAN DIRECTLY</span>
                    <span className="ugc-cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </form>

              {copiedBrief && (
                <div
                  className="mt-10 pt-8 ugc-hairline-top"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2 text-[#159A98] font-semibold text-sm">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>
                      Quote brief prepared &amp; copied to your clipboard.
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#414B50]">
                    This form does not send emails automatically. Paste the
                    message below into your Instagram DM to{" "}
                    <strong>{BRAND.handle}</strong> (and attach photos if you
                    like):
                  </p>
                  <pre className="mt-4 whitespace-pre-wrap break-words max-w-full overflow-x-auto font-[var(--font-body)] text-sm text-[#193747] py-4 ugc-hairline-top ugc-hairline-bottom">
                    {copiedBrief}
                  </pre>
                  <div className="mt-5">
                    <a
                      href={BRAND.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ugc-cta ugc-cta--dark"
                    >
                      <span>PASTE IN INSTAGRAM DM NOW</span>
                      <span className="ugc-cta-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. SALT LAKE COUNTY SERVICE AREA ILLUSTRATION (FRESH WHITE)
         ========================================================= */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="contact-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159A98]">
                Service Coverage
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#193747]">
                South Jordan, Utah · Serving Salt Lake County
              </h2>
              <p className="mt-4 text-base text-[#414B50]">
                Utah Garage Clean operates out of South Jordan and serves
                residential garages across Salt Lake County, Utah. Because
                visits are scheduled by appointment, no public walk-in storefront
                address is listed.
              </p>
            </div>

            <div className="lg:col-span-7">
              {/* Clean architectural service-area illustration (not a street-address pin) */}
              <div className="bg-[#F8F8F3] p-6 sm:p-10">
                <svg
                  viewBox="0 0 720 320"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Service area illustration showing Salt Lake County, Utah anchored around South Jordan"
                >
                  {/* Wasatch Front subtle topographic horizon */}
                  <path
                    d="M0,250 L95,195 L180,220 L285,135 L380,185 L495,95 L610,165 L720,120 L720,320 L0,320 Z"
                    fill="#E8F2EC"
                  />
                  <path
                    d="M0,265 L140,230 L260,245 L390,195 L530,225 L660,180 L720,198 L720,320 L0,320 Z"
                    fill="#EEF1EF"
                  />
                  {/* Salt Lake County broad valley coverage ellipse */}
                  <ellipse
                    cx="360"
                    cy="170"
                    rx="235"
                    ry="92"
                    fill="none"
                    stroke="#159A98"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  <ellipse
                    cx="360"
                    cy="170"
                    rx="140"
                    ry="56"
                    fill="rgba(21,154,152,0.08)"
                  />
                  {/* South Jordan regional anchor */}
                  <circle cx="340" cy="182" r="8" fill="#F56600" />
                  <circle
                    cx="340"
                    cy="182"
                    r="18"
                    fill="none"
                    stroke="#F56600"
                    strokeWidth="1.5"
                    opacity="0.55"
                  />
                  <text
                    x="360"
                    y="128"
                    textAnchor="middle"
                    fontFamily="Manrope, sans-serif"
                    fontWeight="700"
                    fontSize="14"
                    fill="#193747"
                    letterSpacing="2"
                  >
                    SALT LAKE COUNTY SERVICE AREA
                  </text>
                  <text
                    x="362"
                    y="187"
                    fontFamily="Manrope, sans-serif"
                    fontWeight="800"
                    fontSize="18"
                    fill="#193747"
                  >
                    South Jordan, UT
                  </text>
                  <text
                    x="360"
                    y="286"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                    fontWeight="500"
                    fontSize="12"
                    fill="#414B50"
                  >
                    General Salt Lake County service-area illustration — not a street address
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
