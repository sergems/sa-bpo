import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Facebook,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import BrandLockupContent from "@/components/BrandLockupContent";
import { setPageMetadata } from "@/lib/seo";

type AboutPrinciple = { title: string; description: string };
type AboutSection = {
  id: string;
  title: string;
  kicker: string;
  paragraphs: string[];
  image: string;
  alt: string;
  stat?: { value: string; label: string };
  principles?: AboutPrinciple[];
};

const aboutPrinciples: AboutPrinciple[] = [
  { title: "Experience", description: "Industry knowledge and operational experience." },
  { title: "Innovation", description: "New ideas, technology and approaches to BPO operations." },
  { title: "Customer-Centric", description: "Solutions designed around our clients and their customers." },
  { title: "Continuous Improvement", description: "Constantly evolving our processes, people and service delivery." },
];

const aboutSections: AboutSection[] = [
  {
    id: "customer-experience",
    title: "SA-BPO offers a world-class customer experience.",
    kicker: "Who we are",
    paragraphs: [
      "SA-BPO is a South African outsourcing company that partners with global businesses to deliver world-class customer experiences across the omnichannel space.",
      "Every customer interaction is supported by people who care about getting the details right.",
    ],
    image: "/assets/sabpo-our-home-welcome.jpg",
    alt: "People gathered at the SA-BPO reception",
  },
  {
    id: "client-requirements",
    title: "Supports client requirements, efficiencies, and scalability.",
    kicker: "Built around your goals",
    paragraphs: [
      "We help our partners streamline efficiencies, support scalability and achieve sustainable growth within their respective markets.",
      "Through our talented team of specialists, innovative technology, compliant environment and customer-centric approach, we provide solutions designed around the specific needs of your business and your customers.",
      "We are proud to be one of South Africa's youngest BPO operators, collectively bringing decades of experience, know-how and innovation to the outsourcing industry.",
    ],
    image: "/assets/sabpo-hero-team-lounge.jpg",
    alt: "SA-BPO team members collaborating in a lounge",
    stat: { value: "20+", label: "Years of international BPO experience" },
  },
  {
    id: "fresh-innovation",
    title: "Bringing a fresh and innovative experience to the BPO industry.",
    kicker: "What we stand for",
    paragraphs: [
      "With a management and support team rich in experience and knowledge, we have prided ourselves on becoming a disruptor within the BPO space; bringing innovation, change and continuous improvement to all aspects of day-to-day BPO operations.",
    ],
    image: "/assets/sabpo-hero-workplace-collaboration.jpg",
    alt: "SA-BPO colleagues collaborating on customer experience operations",
    principles: aboutPrinciples,
  },
  {
    id: "destination",
    title: "Striving to become the destination for one and all.",
    kicker: "More than a workplace",
    paragraphs: [
      "Industry-leading salaries and benefits make SA-BPO a destination for all. Our location allows our people to be part of an established community at the heart of Durban, while the premises we selected and converted gives our employees a place they get to call home.",
    ],
    image: "/assets/sabpo-our-home-work.jpg",
    alt: "SA-BPO specialist working in the office",
  },
  {
    id: "environment",
    title: "Creating an environment people want to call home.",
    kicker: "Proudly South African. Globally connected.",
    paragraphs: [
      "This is reflected in the location we have carefully selected, the environment we have created and the solutions we present to you, our valued client.",
      "South African talent, connected to the world through every customer conversation.",
    ],
    image: "/assets/sabpo-hero-global-delivery.png",
    alt: "SA-BPO team collaborating with a Durban city view",
  },
];

export default function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedAboutSection, setExpandedAboutSection] = useState<string | null>(null);

  useEffect(() => {
    setPageMetadata({
      title: "About SA-BPO | South African BPO & Global Outsourcing",
      description: "Discover SA-BPO, a South African outsourcing company delivering world-class customer experiences through experienced people, innovative technology and customer-centric BPO solutions.",
    });
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="about-page about-redesign about-premium">
      <header className={`site-header site-header--scrolled about-site-header ${menuOpen ? "is-menu-open" : ""}`}>
        <a className="brand-lockup" href="/" onClick={closeMenu} aria-label="SA-BPO home">
          <BrandLockupContent />
        </a>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <a href="/about-us" onClick={closeMenu}>About SA-BPO</a>
          <a href="/contact-us" onClick={closeMenu}>Contact Us</a>
          <a className="nav-join" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer" onClick={closeMenu}>Join Our Team <ArrowUpRight size={14} /></a>
          <a className="nav-calculator" href="/#calculator" onClick={closeMenu}>BPO calculator <ArrowDownRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="about-premium-hero about-premium-hero--animated" aria-label="SA-BPO animated statement">
        <h1><span>South African people.</span><span>Global service.</span><span>Exceptional results.</span></h1>
      </section>

      <section className="about-premium-accordion" aria-label="About SA-BPO">
        <div className="about-premium-accordion__heading">
          <p className="about-premium-kicker">What we stand for</p>
          <h2>Five ways we <em>make a difference.</em></h2>
          <p>Choose a principle to explore how our people, operations and workplace bring it to life.</p>
        </div>
        <div className="about-premium-accordion__list">
          {aboutSections.map((section, index) => {
            const isExpanded = expandedAboutSection === section.id;
            const triggerId = `about-trigger-${section.id}`;
            const panelId = `about-panel-${section.id}`;
            return (
              <article key={section.id} className={`about-premium-accordion__item ${isExpanded ? "is-open" : ""}`}>
                <h3 className="about-premium-accordion__title">
                  <button id={triggerId} className="about-premium-accordion__trigger" type="button" aria-expanded={isExpanded} aria-controls={panelId} onClick={() => setExpandedAboutSection(isExpanded ? null : section.id)}>
                    <span className="about-premium-accordion__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="about-premium-accordion__label">{section.title}</span>
                    <ChevronDown className="about-premium-accordion__chevron" size={22} aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} className="about-premium-accordion__panel" role="region" aria-labelledby={triggerId} hidden={!isExpanded}>
                  <div className="about-premium-accordion__panel-inner">
                    <div className="about-premium-accordion__copy">
                      <p className="about-premium-kicker">{section.kicker}</p>
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      {section.stat && <div className="about-premium-accordion__stat"><strong>{section.stat.value}</strong><span>{section.stat.label}</span></div>}
                      {section.principles && <div className="about-premium-accordion__principles">{section.principles.map((principle) => <div key={principle.title}><strong>{principle.title}</strong><p>{principle.description}</p></div>)}</div>}
                    </div>
                    <figure className="about-premium-accordion__image"><img src={section.image} alt={section.alt} /></figure>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="site-footer about-site-footer"><div><a className="site-footer-brand" href="/" aria-label="SA-BPO home"><BrandLockupContent /></a><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><a href="/#about">Explore SA-BPO</a><a href="/#confidence">Why SA-BPO</a><a href="/about-us">About SA-BPO</a><a href="/contact-us">Contact Us</a><a href="/privacy-policy">Privacy Policy</a><a className="footer-social-link" href="https://www.facebook.com/profile.php?id=61591312408781" target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook" title="Facebook"><Facebook size={16} aria-hidden="true" /></a><a className="footer-social-link" href="https://www.linkedin.com/company/sa-bpo/" target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn" title="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a className="footer-top-link" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} aria-hidden="true" /></a></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>
    </main>
  );
}
