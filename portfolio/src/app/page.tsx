import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Capabilities } from "@/components/home/Capabilities";
import { LabPreview } from "@/components/home/LabPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() { return <main className="page-shell"><Hero /><Intro /><SelectedWork /><Capabilities /><LabPreview /><ContactCTA /><Footer /></main>; }
