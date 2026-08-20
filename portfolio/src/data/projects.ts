import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "pipora", number: "01", title: "Pipora", year: "2026", category: "Product / CRM / Operations",
    description: "A platform for marketing and sales, bringing every team resource and performance metric into one place.",
    role: "Product Design & Full-Stack Development", services: ["Product Strategy", "UX/UI Design", "Platform Development"],
    thumbnail: "/images/projects/pipora/workspace.png", heroImage: "/images/projects/pipora/workspace.png",
    gallery: [
      "/images/projects/pipora/workspace.png",
      "/images/projects/pipora/marketing-transition.png",
      "/images/projects/pipora/marketing-dashboard.png",
      "/images/projects/pipora/sales-transition.png",
      "/images/projects/pipora/sales-dashboard.png",
      "/images/projects/pipora/sold-items.png",
    ],
    featured: true,
    challenge: "Management needed one reliable system where sales and marketing could work together, handle leads, share resources and understand performance without jumping between disconnected tools.",
    approach: "I designed Pipora around two focused workspaces connected by a shared operational layer. Sales can manage leads, follow-ups, products and revenue, while marketing can coordinate roadmaps, tasks, calendars, updates and team activity—all within one consistent interface.",
    outcome: "Pipora gives management a clear view of activity and results while giving both teams the tools and context they need to move work forward. Shared data replaces fragmented reporting, making ownership, progress and performance easier to see.",
    palette: "#ff5a1f",
  },
  {
    slug: "mobility-commerce", number: "02", title: "Mobility Commerce Platform", year: "2026", category: "Web / Ecommerce / Systems",
    description: "A digital flagship that turns an intricate mobility catalogue into a fluid, human buying experience.",
    role: "Creative Direction & Lead Development", services: ["Strategy", "Interaction Design", "Creative Development"],
    thumbnail: "/images/projects/mobility.webp", heroImage: "/images/projects/mobility.webp", gallery: ["/images/projects/mobility.webp", "/images/projects/mobility-detail.webp"], featured: true,
    challenge: "Make a technically dense commerce ecosystem feel immediate without flattening the depth that expert buyers need.",
    approach: "We built the experience around progressive disclosure, a kinetic comparison system and a composable product model shared across every touchpoint.",
    outcome: "A clearer path from exploration to purchase, with an expressive visual system that scales across markets and product categories.", palette: "#d9ff43",
  },
  {
    slug: "ai-lead-intelligence", number: "03", title: "AI Lead Intelligence", year: "2026", category: "AI / CRM / Automation",
    description: "An intelligence layer that turns fragmented commercial signals into timely, explainable action.",
    role: "Product Strategy & Systems Design", services: ["AI Systems", "Product Design", "Engineering"],
    thumbnail: "/images/projects/intelligence.webp", heroImage: "/images/projects/intelligence.webp", gallery: ["/images/projects/intelligence.webp", "/images/projects/intelligence-detail.webp"], featured: true,
    challenge: "Sales teams were surrounded by data but lacked a trustworthy view of what mattered now—and why.",
    approach: "We designed an evidence-first AI workflow where every recommendation exposes its sources, confidence and next best action.",
    outcome: "A calm operational interface that makes machine intelligence legible and gives teams back their attention.", palette: "#ff5c35",
  },
  {
    slug: "digital-mobility", number: "04", title: "Digital Mobility Experience", year: "2026", category: "Creative Development",
    description: "A cinematic launch platform where movement, material and interface tell one continuous story.",
    role: "Creative Developer", services: ["WebGL", "Motion System", "Frontend"],
    thumbnail: "/images/projects/digital-mobility.webp", heroImage: "/images/projects/digital-mobility.webp", gallery: ["/images/projects/digital-mobility.webp", "/images/projects/digital-mobility-detail.webp"], featured: true,
    challenge: "Translate the sensation of a physical object into a fast, inclusive web experience across a wide device range.",
    approach: "A restrained WebGL layer, art-directed type and scroll-linked transitions create depth while preserving a semantic content core.",
    outcome: "A launch experience with the atmosphere of film and the clarity of a well-made product interface.", palette: "#82a9ff",
  },
  {
    slug: "learning-platform", number: "05", title: "Learning Platform", year: "2026", category: "Product / Education",
    description: "A generous learning environment designed around momentum, curiosity and visible progress.",
    role: "Design Engineering Lead", services: ["Product Design", "Design System", "Development"],
    thumbnail: "/images/projects/learning.webp", heroImage: "/images/projects/learning.webp", gallery: ["/images/projects/learning.webp", "/images/projects/learning-detail.webp"], featured: true,
    challenge: "Replace a maze of disconnected course tools with a coherent space students would want to return to.",
    approach: "We made the curriculum navigable as a living map and developed a tactile component language for focus, reflection and feedback.",
    outcome: "A flexible platform that makes ambitious learning feel approachable without becoming visually juvenile.", palette: "#f4c7ff",
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
