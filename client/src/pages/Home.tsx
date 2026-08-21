/* Human Circuit design: contemporary African editorialism + Swiss service design. People-first proof, visible systems, asymmetrical layouts, signal-line motifs. */
import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Headphones, Menu, MoveRight, PhoneCall, ShieldCheck, Sparkles, X } from "lucide-react";

const services = [
  { id: "cx", label: "Customer experience", title: "Conversations that sound like your brand.", body: "From first hello to final resolution, our people bring the empathy, consistency, and operational discipline your customers remember.", points: ["Inbound and outbound support", "Multichannel customer care", "Quality monitoring and coaching"], color: "green" },
  { id: "sales", label: "Sales enablement", title: "Turn every interaction into momentum.", body: "Give your commercial teams more capacity with people and playbooks built to move qualified conversations forward without losing the human thread.", points: ["Lead qualification and follow-up", "Appointment setting", "Campaign and retention support"], color: "blue" },
  { id: "backoffice", label: "Back office", title: "Make the work behind the work flow.", body: "We take on the repeatable, essential tasks that keep your operation moving—accurately, securely, and with visibility at every handoff.", points: ["Data capture and administration", "Order and claims processing", "Reporting and workflow support"], color: "yellow" },
];

const capabilities = ["Customer care", "Sales support", "Back-office operations", "Quality & compliance", "Workforce management", "Reporting & insights"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState("cx");
  const [agents, setAgents] = useState(8);
  const [hours, setHours] = useState(160);
  const [showCalculator, setShowCalculator] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = services.find((item) => item.id === activeService) ?? services[0];
  const estimate = useMemo(() => Math.round(agents * hours * 0.28), [agents, hours]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => goTo("top")} aria-label="SA-BPO home">
          <img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" />
        </button>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <button onClick={() => goTo("about")}>About us</button>
          <button onClick={() => goTo("services")}>Capabilities</button>
          <button onClick={() => goTo("approach")}>The circuit</button>
          <button onClick={() => goTo("contact")}>Contact</button>
          <button className="nav-calculator" onClick={() => setShowCalculator(true)}>BPO calculator <ArrowDownRight size={15} /></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-color-field" />
        <div className="hero-rail hero-rail--top"><span /><span /><span /><span /><span /></div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> People-powered operations</p>
          <h1>Our people<br /><em>speak for</em><br />your brand.</h1>
          <p className="hero-lede">The conversations behind your growth, delivered with local fluency and enterprise discipline.</p>
          <div className="hero-actions">
            <button className="button button--signal" onClick={() => goTo("contact")}>Start a conversation <ArrowRight size={17} /></button>
            <button className="text-button" onClick={() => goTo("services")}>Explore our work <MoveRight size={17} /></button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
          <img src="/manus-storage/sabpo-hero-team_ffe3234b.png" alt="SA-BPO customer experience team" />
          <div className="hero-stamp"><span>SA</span><b>01</b><small>Human<br />signal</small></div>
        </div>
        <div className="hero-foot"><span>Built for the way brands move now</span><span>Scroll to explore <ArrowDownRight size={15} /></span></div>
      </section>

      <div className="signal-ticker" aria-label="SA-BPO capabilities">
        <div className="ticker-track">{[...capabilities, ...capabilities].map((item, i) => <span key={`${item}-${i}`}><i />{item}</span>)}</div>
      </div>

      <section id="about" className="intro-section section-pad">
        <div className="intro-index">01 <span>Who we are</span></div>
        <div className="intro-content">
          <p className="eyebrow eyebrow--dark">The human advantage</p>
          <h2>When people feel heard, <span>brands go further.</span></h2>
          <p className="intro-body">SA-BPO is a South African business process outsourcing partner for brands that want every customer moment to carry their standards. We bring together capable people, clear process, and insight that makes the next conversation better than the last.</p>
          <div className="intro-stats"><div><strong>24/7</strong><span>Ready when your customers are</span></div><div><strong>1:1</strong><span>Human attention at every touchpoint</span></div><div><strong>SA</strong><span>Local fluency, global ambition</span></div></div>
        </div>
        <div className="intro-aside"><div className="aside-line" /><p>“The best operations feel invisible to the customer—and unmistakable to the brand.”</p><span>Our point of view</span></div>
      </section>

      <section id="services" className="services-section section-pad">
        <div className="section-heading"><div className="intro-index">02 <span>What we do</span></div><div><p className="eyebrow">Capability, connected</p><h2>One team for the moments<br /><em>that matter.</em></h2></div><p className="heading-note">Choose the conversation you want to improve.</p></div>
        <div className="services-layout">
          <div className="service-list">{services.map((service, index) => <button key={service.id} className={`service-tab service-tab--${service.color} ${activeService === service.id ? "is-active" : ""}`} onClick={() => setActiveService(service.id)}><span className="service-number">0{index + 1}</span><span>{service.label}</span><ArrowRight size={20} /></button>)}</div>
          <div className={`service-feature service-feature--${active.color}`}><div className="feature-topline"><span>SA-BPO / {active.label}</span><span>Active capability</span></div><div className="feature-copy"><h3>{active.title}</h3><p>{active.body}</p><ul>{active.points.map(point => <li key={point}><Check size={16} />{point}</li>)}</ul><button className="text-button text-button--dark" onClick={() => goTo("contact")}>Talk through your needs <ArrowRight size={17} /></button></div><div className="feature-visual"><img src="/manus-storage/sabpo-operations_50372ac6.png" alt="SA-BPO operations specialist" /><span className="feature-badge"><Headphones size={18} /> Human-led</span></div></div>
        </div>
      </section>

      <section id="approach" className="approach-section">
        <div className="approach-visual"><img src="/manus-storage/sabpo-south-africa-network_6d22fb2c.png" alt="People and process working together" /><div className="visual-label">03 <span>How we work</span></div></div>
        <div className="approach-copy"><p className="eyebrow">A better handoff</p><h2>People first.<br /><span>Process clear.</span></h2><p>Outsourcing should give your brand more room to grow, not another black box to manage. Our model keeps the work visible, the feedback loop short, and the people doing the work connected to the outcome.</p><div className="approach-steps"><div><b>01</b><span>Listen deeply</span><small>We learn the customer, the context, and the standard.</small></div><div><b>02</b><span>Build the signal</span><small>We shape the playbook, team, and measures together.</small></div><div><b>03</b><span>Keep improving</span><small>We use insight to make every cycle more useful.</small></div></div><button className="button button--light" onClick={() => setShowCalculator(true)}>See what it could look like <ArrowRight size={17} /></button></div>
      </section>

      <section className="calculator-band"><div><p className="eyebrow">A clearer starting point</p><h2>Know the shape of<br /><em>your next move.</em></h2></div><div className="model-signal"><span><i />Volume</span><b>→</b><span><i />People</span><b>→</b><span><i />Outcome</span></div><div className="calculator-copy"><p>Use our simple BPO calculator to explore an indicative operating model. No hard sell, just a better first conversation.</p><button className="button button--yellow" onClick={() => setShowCalculator(true)}>Map the work with us <ArrowDownRight size={17} /></button></div></section>

      <section id="contact" className="contact-section section-pad"><div className="contact-index">04 <span>Start here</span></div><div className="contact-main"><p className="eyebrow">Let’s make the next conversation count</p><h2>Tell us what<br /><span>needs to move.</span></h2><p>Whether you are scaling support, streamlining operations, or looking for a partner who understands the detail, we are ready to listen.</p><a className="contact-email" href="mailto:hello@sa-bpo.com">hello@sa-bpo.com <ArrowUpRight size={21} /></a></div><div className="contact-card"><div><PhoneCall size={20} /><span>Prefer a call?</span></div><strong>+27 (0) 10 500 0000</strong><small>Mon–Fri / 08:00–17:00 SAST</small><button className="text-button text-button--dark" onClick={() => setShowCalculator(true)}>Map the work with us <ArrowRight size={16} /></button></div></section>

      <footer className="site-footer"><div className="footer-brand"><img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-links"><div><span>Explore</span><button onClick={() => goTo("about")}>About us</button><button onClick={() => goTo("services")}>Capabilities</button><button onClick={() => goTo("approach")}>The circuit</button></div><div><span>Connect</span><a href="mailto:hello@sa-bpo.com">Email us</a><a href="#contact">Contact</a><a href="#top">Back to top</a></div></div><div className="footer-bottom"><span>© 2026 SA-BPO. All rights reserved.</span><span>South Africa / Global conversations</span></div></footer>

      {showCalculator && <div className="modal-backdrop" onClick={() => setShowCalculator(false)}><div className="calculator-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowCalculator(false)} aria-label="Close calculator"><X /></button><div className="modal-kicker"><Sparkles size={16} /> Indicative BPO calculator</div><h2>Shape the first<br /><em>conversation.</em></h2><p>Adjust the inputs to see an indicative monthly operating signal. We will make the real model specific to your business.</p><label>Customer experience specialists <output>{agents}</output><input type="range" min="2" max="40" value={agents} onChange={e => setAgents(Number(e.target.value))} /></label><label>Hours per specialist / month <output>{hours}</output><input type="range" min="80" max="220" step="10" value={hours} onChange={e => setHours(Number(e.target.value))} /></label><div className="estimate"><span>Indicative monthly hours</span><strong>{(agents * hours).toLocaleString()}</strong><small>Estimated planning signal: <b>R{estimate.toLocaleString()}</b> / month</small></div><button className="button button--signal button--full" onClick={() => { setShowCalculator(false); goTo("contact"); }}>Use this as a starting point <ArrowRight size={17} /></button></div></div>}
    </main>
  );
}
