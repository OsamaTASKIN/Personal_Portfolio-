import Link from "next/link";

export default function NotFound() {
  return <main className="page-hero"><p className="eyebrow">404 / Experiment escaped</p><h1 className="display-medium">Nothing is stable in here.</h1><Link href="/lab">Return to the Lab →</Link></main>;
}
