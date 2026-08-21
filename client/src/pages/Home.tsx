/* Human Circuit compact edition: a concise people + process + outcome journey with content revealed through deliberate interaction. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleDotDashed,
  Headphones,
  HeartHandshake,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
  X,
} from "lucide-react";

type CultureMode = "values" | "performance";
type LocationMode = "durban" | "home";

const cultureContent = {
  values: {
    eyebrow: "SA-BPO fundamentals",
    title: <>Values that make the<br /><span>work matter.</span></>,
    description: "We build a service culture around the people doing the work—because that is where every customer experience begins.",
    cards: [
      { title: "Rewards", copy: "We recognise performance improvements and the initiative behind them.", tone: "yellow", icon: Trophy },
      { title: "Compassion", copy: "We lead every interaction with honesty, empathy, and care.", tone: "green", icon: HeartHandshake },
      { title: "Recognition", copy: "We value every SA-BPO member and the culture of shared success.", tone: "red", icon: BadgeCheck },
      { title: "Care", copy: "A caring environment strengthens customer and employee experiences.", tone: "blue", icon: CircleDotDashed },
    ],
  },
  performance: {
    eyebrow: "The operating advantage",
    title: <>Performance you can see.<br /><span>Results you can trust.</span></>,
    description: "Experience, productivity, motivation, and environment are built into the SA-BPO operating model.",
    cards: [
      { title: "Experience", copy: "Decades of BPO insight from a management team shaped in South Africa.", tone: "red", icon: BadgeCheck },
      { title: "Productivity", copy: "Robust infrastructure and clear ways of working help people excel.", tone: "green", icon: CircleDotDashed },
      { title: "Motivation", copy: "A fair, rewarding performance environment keeps customer experience in focus.", tone: "yellow", icon: Trophy },
      { title: "Environment", copy: "A modern workplace supports professional focus and personal wellness.", tone: "blue", icon: UsersRound },
    ],
  },
};

const services = [
  { id: "cx", nav: "Customer experience", title: "Conversations that sound like your brand.", copy: "Multi-channel customer care delivered by people who understand the context, the customer, and the standard.", points: ["Inbound and outbound support", "Voice, email, and chat", "Quality monitoring and coaching"], tone: "green" },
  { id: "sales", nav: "Customer engagement", title: "Make every good conversation go further.", copy: "Give commercial teams more time and qualified momentum with follow-up that remains personal and purposeful.", points: ["Lead qualification", "Appointment setting", "Retention support"], tone: "blue" },
  { id: "backoffice", nav: "Technical & back office", title: "Make the work behind the work flow.", copy: "Accurate operational support that gives your team capacity to focus on its highest-value work.", points: ["Data and administration", "Order and claims processing", "Reporting support"], tone: "yellow" },
];

const proofPoints = [
  { label: "24/7 service", detail: "Voice, email, and chat service readiness for the customer moments that cannot wait.", metric: "24/7" },
  { label: "KPI-led delivery", detail: "A visible performance signal that keeps delivery, coaching, and outcomes connected.", metric: "KPI" },
  { label: "Secure & resilient", detail: "A systems-led operating environment built for stability, continuity, and confidence.", metric: "SLA" },
  { label: "Global standards", detail: "Office and service standards aligned to UK, US, and AUS environments.", metric: "UK/US/AUS" },
  { label: "Quality assurance", detail: "Clear checks and conversations that protect the experience your customers receive.", metric: "QA" },
];

const locationContent = {
  durban: {
    tab: "Durban North",
    title: <>Durban<br /><em>North.</em></>,
    text: "A connected coastal hub with community energy, excellent access, and the space for people to do their best work.",
    points: ["Major transport access", "Community culture", "Cost-effective employee amenities"],
    visual: "/manus-storage/sabpo-south-africa-network_6d22fb2c.png",
    alt: "South African collaboration and operations",
  },
  home: {
    tab: "Our home",
    title: <>A better place<br /><em>to do the work.</em></>,
    text: "Our purpose-built centre in Durban North brings people, infrastructure, and workplace wellbeing into one dependable operating environment.",
    points: ["Modern workspace & network resilience", "Coffee, snack, and break-out spaces", "Wellness zone and people-first amenities"],
    visual: "/manus-storage/sabpo-operations_50372ac6.png",
    alt: "SA-BPO workplace and operations specialist",
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cultureMode, setCultureMode] = useState<CultureMode>("values");
  const [activeService, setActiveService] = useState("cx");
  const [activeProof, setActiveProof] = useState(0);
  const [locationMode, setLocationMode] = useState<LocationMode>("durban");
  const [showCalculator, setShowCalculator] = useState(() => new URLSearchParams(window.location.search).get("calculator") === "open");
  const [agents, setAgents] = useState(8);
  const [hours, setHours] = useState(160);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeCulture = cultureContent[cultureMode];
  const selectedService = services.find((service) => service.id === activeService) ?? services[0];
  const selectedLocation = locationContent[locationMode];
  const coverageHours = useMemo(() => agents * hours, [agents, hours]);
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => goTo("top")} aria-label="SA-BPO home"><img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" /></button>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <button onClick={() => goTo("about")}>About SA-BPO</button>
          <button onClick={() => goTo("services")}>Capabilities</button>
          <button onClick={() => goTo("confidence")}>Why SA-BPO</button>
          <button className="nav-calculator" onClick={() => setShowCalculator(true)}>BPO calculator <ArrowDownRight size={15} /></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-rail"><span /><span /><span /><span /><span /></div><div className="hero-field" />
        <div className="hero-copy"><p className="eyebrow"><i /> People-powered operations</p><h1>Our people<br /><em>speak for</em><br />your brand.</h1><p>The conversations behind your growth, delivered with local fluency, global standards, and enterprise discipline.</p><div className="hero-actions"><button className="button button--green" onClick={() => goTo("calculator")}>Map your BPO model <ArrowRight size={17} /></button><button className="text-button" onClick={() => goTo("about")}>Explore SA-BPO <ArrowDownRight size={16} /></button></div><div className="hero-trust" aria-label="Client trust and operational standards"><span className="trust-caption">Trusted delivery</span><span><ShieldCheck size={14} /> Secure & resilient</span><span><BadgeCheck size={14} /> QA-led service</span><span><CircleDotDashed size={14} /> UK / US / AUS aligned</span></div></div>
        <div className="hero-image"><div className="hero-orbit hero-orbit--a" /><div className="hero-orbit hero-orbit--b" /><img src="/manus-storage/sabpo-professional-team-placeholder_316baddb.png" alt="Professional SA-BPO team placeholder" /><div className="hero-badge"><span>01</span><b>Human signal</b></div></div>
        <div className="hero-footer"><span>Durban North / South Africa</span><span>People + process + outcome</span></div>
      </section>

      <section id="about" className="culture-section section-pad">
        <div className="section-top"><div className="index-label">01 <span>About SA-BPO</span></div><div><p className="eyebrow eyebrow--green">The operating culture</p><h2>{activeCulture.title}</h2></div><p className="section-description">{activeCulture.description}</p></div>
        <div className="mode-switch" role="tablist" aria-label="SA-BPO culture content"><button className={cultureMode === "values" ? "is-active" : ""} onClick={() => setCultureMode("values")} role="tab" aria-selected={cultureMode === "values"}>Our values</button><button className={cultureMode === "performance" ? "is-active" : ""} onClick={() => setCultureMode("performance")} role="tab" aria-selected={cultureMode === "performance"}>Performance</button><div className="mode-line"><i /><span /><i /></div></div>
        <div className="culture-cards">{activeCulture.cards.map((item, index) => { const Icon = item.icon; return <article key={item.title} className={`culture-card culture-card--${item.tone}`}><div><span>0{index + 1}</span><Icon size={22} /></div><h3>{item.title}</h3><p>{item.copy}</p></article>; })}</div>
        <div className="operating-circuit" aria-label="SA-BPO operating network"><span><b>People</b><small>Values in action</small></span><i>→</i><span><b>Process</b><small>Visible delivery</small></span><i>→</i><span><b>Outcome</b><small>Customer confidence</small></span></div>
        <div className="compact-strip"><strong>Why <span>SA-BPO</span></strong><p>We partner with clients to manage, deliver, and excel in key business functions—productively, efficiently, and effectively.</p></div>
      </section>

      <section id="services" className="services-section section-pad">
        <div className="section-top section-top--compact"><div className="index-label">02 <span>Capabilities</span></div><div><p className="eyebrow eyebrow--green">Connected capability</p><h2>One team for the moments<br /><span>that move business.</span></h2></div></div>
        <div className="service-explorer"><div className="service-tabs" role="tablist" aria-label="SA-BPO capabilities">{services.map((service, index) => <button key={service.id} className={`service-tab ${activeService === service.id ? "is-active" : ""}`} onClick={() => setActiveService(service.id)} role="tab" aria-selected={activeService === service.id}><span>0{index + 1}</span><strong>{service.nav}</strong><ChevronRight size={18} /></button>)}</div><article className={`service-stage service-stage--${selectedService.tone}`}><div className="stage-copy"><span className="stage-label">Live capability / {selectedService.nav}</span><h3>{selectedService.title}</h3><p>{selectedService.copy}</p><ul>{selectedService.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="text-button text-button--dark" onClick={() => goTo("contact")}>Map this work with us <ArrowRight size={16} /></button></div><div className="stage-image"><img src="/manus-storage/sabpo-operations_50372ac6.png" alt="SA-BPO operations specialist" /><span><Headphones size={16} /> Human-led delivery</span></div></article></div>
      </section>

      <section id="confidence" className="confidence-section section-pad">
        <div className="section-top section-top--on-dark"><div className="index-label">03 <span>Why SA-BPO</span></div><div><p className="eyebrow">Partner with confidence</p><h2>Proof you can<br /><em>explore.</em></h2></div><p className="section-description">Select a standard to see how it supports the people, process, and outcome behind your operation.</p></div>
        <div className="proof-explorer"><div className="proof-list">{proofPoints.map((proof, index) => <button key={proof.label} className={activeProof === index ? "is-active" : ""} onClick={() => setActiveProof(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{proof.label}</strong><ArrowRight size={16} /></button>)}</div><article className="proof-panel"><div className="proof-metric">{proofPoints[activeProof].metric}</div><ShieldCheck size={27} /><h3>{proofPoints[activeProof].label}</h3><p>{proofPoints[activeProof].detail}</p><div className="proof-path"><i /><span /><i /><span /><i /></div></article></div>
        <div className="confidence-footer"><span>UK / US / AUS office standards</span><span>KPI-led delivery</span><span>Quality assurance</span></div>
      </section>

      <section id="location" className="location-section">
        <div className="location-media"><img src={selectedLocation.visual} alt={selectedLocation.alt} /><div className="media-node"><MapPin size={16} /><span>Durban North</span></div></div><div className="location-content"><div className="location-toggle"><button className={locationMode === "durban" ? "is-active" : ""} onClick={() => setLocationMode("durban")}>Durban North</button><button className={locationMode === "home" ? "is-active" : ""} onClick={() => setLocationMode("home")}>Our home</button></div><p className="eyebrow">Our location</p><h2>{selectedLocation.title}</h2><p>{selectedLocation.text}</p><ul>{selectedLocation.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="text-button" onClick={() => goTo("contact")}>Talk to the local team <ArrowRight size={16} /></button></div>
      </section>

      <section id="calculator" className="calculator-section"><div className="calculator-heading"><p className="eyebrow">A practical starting point</p><h2>Map the work.<br /><em>See the signal.</em></h2></div><div className="calculator-path"><span><b>01</b> Volume</span><i>→</i><span><b>02</b> People</span><i>→</i><span><b>03</b> Outcome</span></div><div className="calculator-action"><p>Shape an indicative operating model from the work, people, and coverage you need.</p><button className="button button--yellow" onClick={() => setShowCalculator(true)}>Open BPO calculator <ArrowDownRight size={17} /></button></div></section>

      <section id="contact" className="contact-section section-pad"><div className="index-label">04 <span>Start here</span></div><div><p className="eyebrow eyebrow--dark">Let’s make the next conversation count</p><h2>Tell us what<br /><span>needs to move.</span></h2><p>Whether you are scaling support, simplifying operations, or looking for a people-first partner, we are ready to listen.</p><a href="mailto:hello@sa-bpo.com">hello@sa-bpo.com <ArrowUpRight size={20} /></a></div><aside><Sparkles size={19} /><strong>Start with a clearer model.</strong><p>Use the BPO calculator to frame the conversation around your operation.</p><button className="text-button text-button--dark" onClick={() => setShowCalculator(true)}>Build a first view <ArrowRight size={16} /></button></aside></section>

      <footer className="site-footer"><div><img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-nav"><button onClick={() => goTo("about")}>About SA-BPO</button><button onClick={() => goTo("services")}>Capabilities</button><button onClick={() => goTo("confidence")}>Why SA-BPO</button><button onClick={() => goTo("top")}>Back to top</button></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>

      {showCalculator && <div className="modal-backdrop" onClick={() => setShowCalculator(false)}><div className="calculator-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCalculator(false)} aria-label="Close calculator"><X /></button><div className="calculator-modal-body"><p className="modal-kicker"><Sparkles size={15} /> BPO calculator</p><h2>Shape the first<br /><em>conversation.</em></h2><p>Use the inputs to create a simple coverage signal. A full operating model is always tailored with you.</p><label>Specialists <output>{agents}</output><input type="range" min="2" max="40" value={agents} onChange={(event) => setAgents(Number(event.target.value))} /></label><label>Hours per specialist / month <output>{hours}</output><input type="range" min="80" max="220" step="10" value={hours} onChange={(event) => setHours(Number(event.target.value))} /></label><div className="coverage-output"><span>Indicative specialist hours</span><strong>{coverageHours.toLocaleString()}</strong><small>Coverage signal across voice, email, and chat.</small></div></div><div className="calculator-modal-action"><button className="button button--green button--full" onClick={() => { setShowCalculator(false); goTo("contact"); }}>Use this as a starting point <ArrowRight size={16} /></button></div></div></div>}
    </main>
  );
}
