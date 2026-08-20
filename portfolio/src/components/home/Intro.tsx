import { SplitText } from "@/components/typography/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Intro() { return <section className="section intro"><div className="intro-grid"><SectionLabel number="01">Position</SectionLabel><SplitText className="editorial-copy" lines={["I design and build", "digital systems that sit", "between engineering,", "art direction and", "emerging technology."]} /></div></section>; }
