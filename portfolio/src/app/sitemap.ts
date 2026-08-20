import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { experiments } from "@/data/experiments";
import { siteConfig } from "@/lib/constants";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const routes = ["", "/work", "/about", "/lab", "/contact"].map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : .8 })); return [...routes, ...projects.map((project) => ({ url: `${siteConfig.url}/work/${project.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: .7 })), ...experiments.map((experiment) => ({ url: `${siteConfig.url}/lab/${experiment.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .65 }))]; }
