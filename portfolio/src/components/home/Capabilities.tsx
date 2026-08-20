import { SectionLabel } from "@/components/ui/SectionLabel";

const capabilities = ["Creative Development", "AI Systems", "Web Engineering", "Three.js", "Automation", "Digital Strategy", "Interactive Design"];
export function Capabilities() { return <section className="section capabilities"><SectionLabel number="03">Capabilities</SectionLabel><div style={{ marginTop: "4rem" }}>{capabilities.map((capability, index) => <div className="capability" key={capability}><span className="eyebrow">0{index + 1}</span><span>{capability}</span><span className="capability-arrow">→</span></div>)}</div></section>; }
