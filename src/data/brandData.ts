export type PageId = "home" | "services" | "transformations" | "contact";

export const BRAND = {
  name: "Utah Garage Clean",
  shortMark: "UGC",
  handle: "@utahgarageclean",
  instagramUrl: "https://www.instagram.com/utahgarageclean/",
  location: "South Jordan, Utah",
  serviceArea: "Salt Lake County, Utah",
  dmKeyword: "GARAGE",
  officialBioLines: [
    "Garage Cleaning & Organization",
    "South Jordan, UT | Serving Salt Lake County",
    "Free quote — DM 'GARAGE'",
  ],
  logoSvg: "/assets/images/utah-garage-clean/brand/ugc-logo-emblem.svg",
  logoOriginal150: "/assets/images/utah-garage-clean/brand/logo-profile-150.jpg",
} as const;

export const VISUAL_ASSETS = {
  heroPanorama: {
    src: "/src/assets/images/hero_garage_panorama_1795249963646.jpg",
    alt: "Clean sunlit residential garage interior in Utah with clear concrete floor and organized perimeter storage",
    caption:
      "Illustrative clean residential garage environment — view verified client projects on @utahgarageclean",
  },
  cleaningFloor: {
    src: "/src/assets/images/garage_cleaning_floor_1795249963681.jpg",
    alt: "Freshly swept and clean bare concrete garage floor with bright natural daylight",
    caption:
      "Illustrative clean concrete garage floor — view verified cleanout work on @utahgarageclean",
  },
  organizationShelving: {
    src: "/src/assets/images/garage_organization_shelving_1795249963453.jpg",
    alt: "Organized residential garage storage wall with lidded bins, shelving, and cleanly hung bicycles",
    caption:
      "Illustrative organized garage storage layout — view actual client setups on @utahgarageclean",
  },
  spaceAfterCalm: {
    src: "/src/assets/images/garage_space_after_calm_1795249964256.jpg",
    alt: "Open two-bay residential garage with clear floor space and organized wall storage",
    caption:
      "Illustrative organized two-bay garage space — real homeowner transformations shared on Instagram",
  },
  toolsDetail: {
    src: "/src/assets/images/garage_tools_detail_1795249964101.jpg",
    alt: "Neatly arranged garage tools, brooms, and labeled bins on sturdy wooden shelving",
    caption:
      "Illustrative tool and bin arrangement — authentic project updates posted on @utahgarageclean",
  },
} as const;

export const TRANSFORMATION_STAGES = [
  {
    id: "clear",
    index: "01",
    label: "Clearing & Floor Reset",
    headline: "Reclaim the floor before organizing a single bin.",
    summary:
      "Every garage reset starts by clearing stacked clutter out of walkways and parking bays, sweeping away accumulated dust and grit, and giving the concrete floor a clean baseline.",
    focusPoints: [
      "Full floor clearing across active parking and walkway zones",
      "Dust, cobweb, and dry debris removal along corners and walls",
      "Clear visibility of what you actually own and use",
    ],
    image: VISUAL_ASSETS.cleaningFloor,
  },
  {
    id: "zone",
    index: "02",
    label: "Sorting & Practical Zoning",
    headline: "Group what stays by how often your household reaches for it.",
    summary:
      "Instead of piling everything back against the wall, items are sorted into sensible household categories—daily gear near the door, seasonal equipment tucked higher or deeper.",
    focusPoints: [
      "Category grouping for tools, sports gear, and seasonal totes",
      "Intentional placement along existing shelves and wall space",
      "Unobstructed pathways from house entry to driveway",
    ],
    image: VISUAL_ASSETS.toolsDetail,
  },
  {
    id: "restore",
    index: "03",
    label: "Everyday Space Restored",
    headline: "Walk in, park comfortably, and find what you need in seconds.",
    summary:
      "The finished result is a bright, functional residential garage across South Jordan and Salt Lake County where both cars and everyday gear have room to coexist cleanly.",
    focusPoints: [
      "Usable parking footprint returned to your household",
      "Consistent bin and shelving alignment for visual calm",
      "Simple maintenance habits that keep clutter from creeping back",
    ],
    image: VISUAL_ASSETS.organizationShelving,
  },
] as const;
