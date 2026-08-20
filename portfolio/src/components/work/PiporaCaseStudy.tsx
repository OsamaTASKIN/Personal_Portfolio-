import Image from "next/image";
import type { Project } from "@/types/project";

const workspaces = [
  {
    label: "Growth workspace",
    title: "Marketing",
    description: "A focused home for campaign planning, roadmaps, calendars, task ownership and team updates.",
    image: "/images/projects/pipora/marketing-transition.png",
  },
  {
    label: "Revenue workspace",
    title: "Sales",
    description: "A commercial command center for leads, follow-ups, products, rentals, revenue and conversion performance.",
    image: "/images/projects/pipora/sales-transition.png",
  },
];

const outcomes = [
  "One shared source of truth for management and both teams",
  "Clear ownership across leads, tasks and follow-ups",
  "Live visibility into revenue, conversion and lead sources",
  "Less time spent collecting updates across disconnected tools",
];

function BrowserFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`pipora-browser ${className}`}>
      <div className="pipora-browser-bar" aria-hidden="true">
        <span /><span /><span />
        <i>pipora / workspace</i>
      </div>
      <div className="pipora-browser-screen">
        <Image src={src} alt={alt} fill sizes="(max-width: 800px) 94vw, 84vw" />
      </div>
    </figure>
  );
}

export function PiporaCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <header className="pipora-hero">
        <div className="case-container">
          <div className="pipora-hero-top eyebrow"><span>Case study / {project.number}</span><span>{project.year}</span></div>
          <div className="pipora-hero-grid">
            <div>
              <p className="pipora-kicker">Sales × Marketing × Management</p>
              <h1>Pipora</h1>
            </div>
            <p className="pipora-lede">{project.description}</p>
          </div>
          <div className="pipora-facts">
            <p><span>Role</span>{project.role}</p>
            <p><span>Focus</span>{project.services.join(" / ")}</p>
            <p><span>Platform</span>Responsive web application</p>
          </div>
        </div>
      </header>

      <section className="pipora-cover" aria-label="Pipora workspace selection">
        <div className="case-container">
          <BrowserFrame src={project.heroImage} alt="Pipora workspace selection screen for sales and marketing" />
          <p className="case-caption"><span>01</span>A clear entry point into two focused workspaces built on one shared system.</p>
        </div>
      </section>

      <section className="case-section case-overview">
        <div className="case-container case-two-col">
          <div>
            <p className="eyebrow">The brief</p>
            <h2>One place to see the work—and move it forward.</h2>
          </div>
          <div className="case-copy">
            <p>Sales and marketing were contributing to the same commercial goals, but their daily work lived across separate tools, conversations and reports.</p>
            <p>Pipora was designed as the operational layer between the teams: focused enough for each discipline, connected enough for management to understand the whole picture.</p>
          </div>
        </div>
        <div className="case-container pipora-principles" aria-label="Pipora product principles">
          <p><span>01</span><strong>Two</strong> focused workspaces</p>
          <p><span>02</span><strong>One</strong> shared source of truth</p>
          <p><span>03</span><strong>Live</strong> operational visibility</p>
          <p><span>04</span><strong>Clear</strong> team ownership</p>
        </div>
      </section>

      <section className="case-visual-break">
        <div className="case-container">
          <div className="case-generated-visual">
            <Image src="/images/projects/pipora/unified-system.png" alt="Abstract visualization of sales and marketing systems converging into one operational hub" fill sizes="(max-width: 800px) 94vw, 88vw" />
          </div>
          <p className="case-caption case-caption-light"><span>02</span>A shared operational core connects specialist tools without forcing both teams into the same workflow.</p>
        </div>
      </section>

      <section className="case-section case-problem">
        <div className="case-container case-two-col">
          <div>
            <p className="eyebrow">The problem</p>
            <h2>Fragmented tools made progress difficult to see.</h2>
          </div>
          <div className="case-copy case-copy-large">
            <p>{project.challenge}</p>
            <div className="case-pullquote">The real challenge was not a lack of data. It was a lack of shared context.</div>
          </div>
        </div>
      </section>

      <section className="case-section pipora-workspaces">
        <div className="case-container">
          <div className="case-section-head">
            <p className="eyebrow">The solution / 01</p>
            <h2>Separate spaces.<br />Shared direction.</h2>
            <p>{project.approach}</p>
          </div>
          <div className="workspace-grid">
            {workspaces.map((workspace) => (
              <article className="workspace-card" key={workspace.title}>
                <div className="workspace-image"><Image src={workspace.image} alt={`${workspace.title} workspace transition screen`} fill sizes="(max-width: 800px) 94vw, 42vw" /></div>
                <p className="eyebrow">{workspace.label}</p>
                <h3>{workspace.title}</h3>
                <p>{workspace.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section pipora-feature pipora-feature-marketing">
        <div className="case-container">
          <div className="feature-copy">
            <p className="eyebrow">The solution / 02</p>
            <h2>Marketing has a system for momentum.</h2>
            <p>Roadmaps, priority tasks, notes, calendars and team updates sit together, giving every initiative an owner, a place and a visible next step.</p>
          </div>
          <BrowserFrame src="/images/projects/pipora/marketing-dashboard.png" alt="Pipora marketing tools dashboard" />
          <p className="case-caption"><span>03</span>The marketing workspace organizes planning and delivery without losing team-level visibility.</p>
        </div>
      </section>

      <section className="case-section pipora-feature pipora-feature-sales">
        <div className="case-container">
          <div className="feature-copy">
            <p className="eyebrow">The solution / 03</p>
            <h2>Sales turns activity into a live commercial picture.</h2>
            <p>Leads, revenue, conversion, sources and follow-ups are brought into one dashboard so the team can act while management sees performance in context.</p>
          </div>
          <BrowserFrame src="/images/projects/pipora/sales-dashboard.png" alt="Pipora sales dashboard with lead and revenue analytics" />
          <p className="case-caption case-caption-light"><span>04</span>Performance data is connected directly to the work producing it.</p>
        </div>
      </section>

      <section className="case-section pipora-outcome">
        <div className="case-container">
          <div className="case-two-col outcome-intro">
            <div>
              <p className="eyebrow">The outcome</p>
              <h2>Operational clarity, from lead to result.</h2>
            </div>
            <p className="case-outcome-copy">{project.outcome}</p>
          </div>
          <div className="outcome-layout">
            <BrowserFrame src="/images/projects/pipora/sold-items.png" alt="Pipora sold items view showing product and salesperson performance" />
            <div className="outcome-list">
              {outcomes.map((outcome, index) => <p key={outcome}><span>0{index + 1}</span>{outcome}</p>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
