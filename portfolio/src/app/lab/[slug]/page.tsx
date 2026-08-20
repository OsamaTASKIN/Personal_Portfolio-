import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiments, getExperiment } from "@/data/experiments";
import { LabExperience } from "@/components/three/LabExperience";
import { wrapIndex } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return experiments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const experiment = getExperiment((await params).slug);
  return experiment ? { title: `${experiment.title} — Lab`, description: experiment.description } : {};
}

export default async function ExperimentPage({ params }: Props) {
  const experiment = getExperiment((await params).slug);
  if (!experiment) notFound();
  const index = experiments.findIndex((item) => item.slug === experiment.slug);
  const next = experiments[wrapIndex(index + 1, experiments.length)];

  return <main className="experiment-page">
    <header className="experiment-page-nav eyebrow">
      <Link href="/lab">← Lab index</Link>
      <span>{experiment.number} / 020</span>
      <span>{experiment.status}</span>
    </header>
    <div className="experiment-page-title">
      <p className="eyebrow">{experiment.field}</p>
      <h1>{experiment.title}</h1>
      <p>{experiment.description}</p>
    </div>
    <LabExperience experiment={experiment} />
    <footer className="experiment-page-footer">
      <div><p className="eyebrow">Interaction</p><p>{experiment.interaction}</p></div>
      <Link href={`/lab/${next.slug}`}><span className="eyebrow">Next experiment / {next.number}</span><strong>{next.title} →</strong></Link>
    </footer>
  </main>;
}
