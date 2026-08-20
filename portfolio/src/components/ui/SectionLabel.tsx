export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) { return <p className="eyebrow">({number}) &nbsp; {children}</p>; }
