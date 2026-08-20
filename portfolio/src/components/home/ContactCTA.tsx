import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactCTA() { return <section className="section contact-cta"><SectionLabel number="05">Start a conversation</SectionLabel><div className="cta-row"><h2 className="display-medium">Have something <span className="serif">worth</span> building?</h2><MagneticButton href="/contact" className="circle-cta">Let&apos;s talk ↗</MagneticButton></div></section>; }
