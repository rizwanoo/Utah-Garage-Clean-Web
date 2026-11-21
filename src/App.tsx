import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageId } from "./data/brandData";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { TransformationsAboutPage } from "./pages/TransformationsAboutPage";
import { ContactPage } from "./pages/ContactPage";

gsap.registerPlugin(ScrollTrigger);

const PAGE_FROM_SLUG: Record<string, PageId> = {
  "": "home",
  "/": "home",
  home: "home",
  services: "services",
  transformations: "transformations",
  about: "transformations",
  contact: "contact",
};

const HASH_FROM_PAGE: Record<PageId, string> = {
  home: "#home",
  services: "#services",
  transformations: "#transformations",
  contact: "#contact",
};

function getInitialPage(): PageId {
  const hashSlug = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  if (hashSlug && PAGE_FROM_SLUG[hashSlug]) {
    return PAGE_FROM_SLUG[hashSlug];
  }
  const pathSlug = window.location.pathname
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
  return PAGE_FROM_SLUG[pathSlug] ?? "home";
}

function getCurrentScrollTop(): number {
  return Math.max(
    window.scrollY || 0,
    window.pageYOffset || 0,
    document.scrollingElement?.scrollTop || 0,
    document.documentElement.scrollTop || 0,
    document.body.scrollTop || 0
  );
}

function scrollToTopSmoothly() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } catch {
    window.scrollTo(0, 0);
  }
  if (
    document.scrollingElement &&
    typeof document.scrollingElement.scrollTo === "function"
  ) {
    try {
      document.scrollingElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch {
      document.scrollingElement.scrollTop = 0;
    }
  }
}

function forceScrollTopImmediate() {
  window.scrollTo(0, 0);
  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = 0;
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [navNonce, setNavNonce] = useState(0);
  const pendingSectionRef = useRef<string | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleHashOrPop = () => {
      pendingSectionRef.current = null;
      setCurrentPage(getInitialPage());
      setNavNonce((n) => n + 1);
    };
    window.addEventListener("popstate", handleHashOrPop);
    window.addEventListener("hashchange", handleHashOrPop);
    return () => {
      window.removeEventListener("popstate", handleHashOrPop);
      window.removeEventListener("hashchange", handleHashOrPop);
    };
  }, []);

  useLayoutEffect(() => {
    const sectionId = pendingSectionRef.current;
    pendingSectionRef.current = null;

    let rafId = 0;
    let settleTimer = 0;

    rafId = window.requestAnimationFrame(() => {
      if (sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          scrollToTopSmoothly();
        }
        settleTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 550);
      } else {
        scrollToTopSmoothly();
        // Guarantee scroll reaches top regardless of previous scroll depth or page height change
        settleTimer = window.setTimeout(() => {
          if (getCurrentScrollTop() > 2) {
            forceScrollTopImmediate();
          }
          ScrollTrigger.refresh();
        }, 520);
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleTimer);
    };
  }, [currentPage, navNonce]);

  const handleNavigate = (page: PageId, sectionId?: string) => {
    pendingSectionRef.current = sectionId ?? null;

    const targetHash = HASH_FROM_PAGE[page];
    if (window.location.hash !== targetHash) {
      window.history.pushState({ page }, "", targetHash);
    }

    // Trigger smooth scroll immediately inside the user gesture when navigating to top of a page
    if (!sectionId) {
      scrollToTopSmoothly();
    }

    setCurrentPage(page);
    setNavNonce((n) => n + 1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8F8F3] text-[#28363D] overflow-x-clip">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1 w-full">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "services" && (
          <ServicesPage onNavigate={handleNavigate} />
        )}
        {currentPage === "transformations" && (
          <TransformationsAboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === "contact" && <ContactPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
