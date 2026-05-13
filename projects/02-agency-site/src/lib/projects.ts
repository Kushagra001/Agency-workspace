export type WorkProject = {
  slug: string;
  index: string;
  name: string;
  description: string;
  tags: string[];
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "flow",
    index: "01",
    name: "Flow",
    description: "AI productivity SaaS landing page",
    tags: ["Next.js", "GSAP", "Make.com"],
  },
  {
    slug: "arca",
    index: "02",
    name: "Arca",
    description: "Agency website with horizontal scroll",
    tags: ["Next.js", "SplitText", "Sanity"],
  },
  {
    slug: "medica",
    index: "03",
    name: "Medica",
    description: "Local clinic booking system",
    tags: ["Next.js", "Airtable", "Twilio"],
  },
  {
    slug: "kern",
    index: "04",
    name: "Kern",
    description: "D2C apparel brand store",
    tags: ["Next.js", "Shopify", "ScrollTrigger"],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  clientType: string;
  year: string;
  services: string[];
  liveUrl: string;
  tagline: string;
  overview: string;
  brief: string[];
  solution: string[];
  resultStats: Array<{ value: string; label: string }>;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "flow",
    title: "Flow",
    clientType: "SaaS",
    year: "2026",
    services: ["Web Design", "Development", "Automation"],
    liveUrl: "https://flow.example.com",
    tagline: "Think less. Build more.",
    overview:
      "Flow is an AI-first productivity platform for founders drowning in fragmented inputs. We designed and built a conversion-focused launch experience that turns complexity into clear, confident action.",
    brief: [
      "The client needed a premium digital identity that avoided generic AI startup patterns while still communicating technical confidence.",
      "The primary business goal was waitlist conversion with clear value framing across hero, social proof, and process storytelling.",
    ],
    solution: [
      "We built an editorial landing architecture with intentional pacing, bold type hierarchy, and motion used as functional wayfinding.",
      "Under the hood we integrated form automation to route leads into operations tooling, reducing manual handoff and improving response speed.",
    ],
    resultStats: [
      { value: "200+", label: "qualified leads / month" },
      { value: "+40%", label: "landing page conversion lift" },
      { value: "1.9s", label: "median interactive load" },
    ],
  },
  {
    slug: "arca",
    title: "Arca",
    clientType: "Agency",
    year: "2026",
    services: ["Brand Site", "Development", "CMS"],
    liveUrl: "https://arca.example.com",
    tagline: "We build what others cannot.",
    overview:
      "Arca's own site is a proof-of-craft platform designed to attract selective client engagements and communicate capability at first scroll.",
    brief: [
      "The challenge was to create a monochrome identity-led experience that feels premium without decorative noise.",
      "The site had to demonstrate advanced interaction quality while staying fast, readable, and conversion-aware.",
    ],
    solution: [
      "We built a high-contrast typographic system with a horizontal work narrative and stateful interaction details.",
      "The information architecture balances brand authority with practical decision-making paths for prospective clients.",
    ],
    resultStats: [
      { value: "3.1x", label: "long-form scroll depth" },
      { value: "+58%", label: "qualified inquiry rate" },
      { value: "92", label: "desktop lighthouse score" },
    ],
  },
  {
    slug: "medica",
    title: "Medica",
    clientType: "Healthcare",
    year: "2025",
    services: ["Booking UX", "Automation", "Integration"],
    liveUrl: "https://medica.example.com",
    tagline: "Booking rebuilt for speed.",
    overview:
      "Medica required a fast, low-friction booking workflow for a multi-location clinic network with legacy operational tooling.",
    brief: [
      "Patients were dropping out during booking due to confusing multi-step forms and weak mobile ergonomics.",
      "The clinic team needed centralized scheduling data without changing their internal staffing tools.",
    ],
    solution: [
      "We restructured booking into a guided, mobile-first flow with progressive disclosure and clear error recovery.",
      "Automated handoffs synced appointment events with Airtable and Twilio reminders for operational consistency.",
    ],
    resultStats: [
      { value: "-46%", label: "form drop-off" },
      { value: "+33%", label: "completed appointments" },
      { value: "<2m", label: "average booking time" },
    ],
  },
  {
    slug: "kern",
    title: "Kern",
    clientType: "D2C",
    year: "2025",
    services: ["Storefront", "Performance", "CRO"],
    liveUrl: "https://kern.example.com",
    tagline: "Commerce with sharper intent.",
    overview:
      "Kern is a fashion-led commerce build focused on product storytelling, faster product discovery, and conversion momentum.",
    brief: [
      "The previous storefront looked polished but underperformed due to slow interactions and shallow category navigation.",
      "The team needed a scalable merchandising system they could run without engineering bottlenecks.",
    ],
    solution: [
      "We redesigned collection architecture, optimized interactions, and rebuilt product pages for clearer hierarchy and faster add-to-cart pathways.",
      "A lightweight CMS layer now supports campaign drops and editorial updates without deployment dependencies.",
    ],
    resultStats: [
      { value: "+27%", label: "average order value" },
      { value: "+41%", label: "add-to-cart rate" },
      { value: "1.7s", label: "median page render" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((project) => project.slug === slug);
}
