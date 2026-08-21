/* Human Circuit / updated SA-BPO specification: people-first operational storytelling, Signal Green dominance, connected proof points, and Durban North context. */
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

const values = [
  {
    title: "Rewards",
    icon: Trophy,
    copy: "A rewarding environment helps people do their best work. We recognise performance improvements and the initiative behind them.",
    tone: "red",
  },
  {
    title: "Compassion",
    icon: HeartHandshake,
    copy: "Human qualities are where customer experience begins. We lead with honesty, empathy, and care in every interaction.",
    tone: "green",
  },
  {
    title: "Recognition",
    icon: BadgeCheck,
    copy: "We recognise and value every SA-BPO member, building a culture of equality and shared success.",
    tone: "yellow",
  },
  {
    title: "Care",
    icon: CircleDotDashed,
    copy: "A caring environment creates better experiences for customers and employees alike. It is a true SA-BPO quality.",
    tone: "blue",
  },
];

const performance = [
  {
    title: "Experience",
    copy: "Our management team brings decades of BPO experience in South Africa, helping create a destination for customer and employee excellence.",
    tone: "red",
  },
  {
    title: "Productivity",
    copy: "A fitting environment, robust infrastructure, and clear ways of working help people deliver and excel.",
    tone: "green",
  },
  {
    title: "Motivation",
    copy: "We have created a fair, rewarding performance environment where customer experience remains at the forefront.",
    tone: "yellow",
  },
  {
    title: "Environment",
    copy: "Our modern workplace supports professional focus and personal wellness in the heart of Durban North.",
    tone: "blue",
  },
];

const proof = [
  "24/7 service via voice, email & chat",
  "KPI-driven service",
  "Outstanding customer support & delivery",
  "UK / US / AUS in-house office standards",
  "Combined BPO experience in SA",
  "Security & resilience",
  "Face-to-face consultations",
  "A rewarding, progressive culture",
  "Onboarding excellence",
  "Quality assurance",
];

const services = [
  { id: "cx", label: "Customer experience", short: "Customer care", title: "Conversations that sound like your brand.", copy: "Multi-channel customer care delivered by people who understand the context, the customer, and the standard.", points: ["Inbound and outbound support", "Voice, email, and chat", "Quality monitoring and coaching"], tone: "green" },
  { id: "sales", label: "Sales enablement", short: "Customer engagement", title: "Make every good conversation go further.", copy: "Give commercial teams more time and qualified momentum with follow-up that remains personal and purposeful.", points: ["Lead qualification and follow-up", "Appointment setting", "Retention support"], tone: "blue" },
  { id: "backoffice", label: "Back-office operations", short: "Technical & back-office", title: "Make the work behind the work flow.", copy: "Accurate operational support that gives your team the capacity to focus on its highest-value work.", points: ["Data capture and administration", "Order and claims processing", "Reporting support"], tone: "yellow" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState("cx");
  const [agents, setAgents] = useState(8);
  const [hours, setHours] = useState(160);
  const [showCalculator, setShowCalculator] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = services.find((service) => service.id === activeService) ?? services[0];
  const planningSignal = useMemo(() => Math.round(agents * hours * 0.28), [agents, hours]);
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
          <button onClick={() => goTo("values")}>Our values</button>
          <button onClick={() => goTo("services")}>Capabilities</button>
          <button onClick={() => goTo("confidence")}>Why SA-BPO</button>
          <button onClick={() => goTo("durban-north")}>Durban North</button>
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
          <p className="hero-lede">The conversations behind your growth, delivered with local fluency, global standards, and enterprise discipline.</p>
          <div className="hero-actions">
            <button className="button button--signal" onClick={() => goTo("contact")}>Start a conversation <ArrowRight size={17} /></button>
            <button className="text-button" onClick={() => goTo("values")}>Meet the SA-BPO difference <ArrowDownRight size={17} /></button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
          <img src="/manus-storage/sabpo-hero-team_ffe3234b.png" alt="SA-BPO customer experience team" />
          <div className="hero-stamp"><span>SA</span><b>01</b><small>Human<br />signal</small></div>
        </div>
        <div className="hero-foot"><span>Durban North / South Africa</span><span>Explore the human circuit <ArrowDownRight size={15} /></span></div>
      </section>

      <div className="signal-ticker" aria-label="SA-BPO capabilities"><div className="ticker-track">{["Customer care", "Technical support", "Back-office operations", "Customer engagement", "KPI management", "Quality assurance", "Customer care", "Technical support", "Back-office operations", "Customer engagement", "KPI management", "Quality assurance"].map((item, index) => <span key={`${item}-${index}`}><i />{item}</span>)}</div></div>

      <section id="values" className="values-section section-pad">
        <div className="network-rail network-rail--paper" aria-hidden="true"><i /><span /><i /><span /><i /></div>
        <div className="section-intro"><div className="index-label">01 <span>Our company values</span></div><div><p className="eyebrow eyebrow--dark">SA-BPO fundamentals</p><h2>Values that make the<br /><span>work matter.</span></h2></div><p>We build a service culture around the people doing the work—because that is where every customer experience begins.</p></div>
        <div className="values-grid">{values.map((item, index) => { const Icon = item.icon; return <article className={`value-card value-card--${item.tone}`} key={item.title}><div className="card-index">0{index + 1}</div><div className="value-icon"><Icon size={23} /></div><h3>{item.title}</h3><p>{item.copy}</p><div className="card-circuit"><i /><span /><i /></div></article>; })}</div>
        <div className="why-strip"><strong>Why <span>SA-BPO</span></strong><p>We partner with our clients to manage, deliver, and excel in key business functions, enabling teams to work productively, efficiently, and effectively.</p></div>
      </section>

      <section id="services" className="services-section section-pad">
        <div className="network-rail network-rail--green" aria-hidden="true"><i /><span /><i /><span /><i /></div>
        <div className="section-intro section-intro--services"><div className="index-label">02 <span>What we do</span></div><div><p className="eyebrow eyebrow--dark">Connected capability</p><h2>One team for the moments<br /><span>that move your business.</span></h2></div><p>Our tailored outsourcing solutions support technical, back-office, customer-care, and customer-support needs across varied communication platforms.</p></div>
        <div className="services-layout">
          <div className="service-list">{services.map((service, index) => <button key={service.id} className={`service-tab service-tab--${service.tone} ${activeService === service.id ? "is-active" : ""}`} onClick={() => setActiveService(service.id)}><span>0{index + 1}</span><strong>{service.label}</strong><ChevronRight size={19} /></button>)}</div>
          <article className={`service-feature service-feature--${active.tone}`}>
            <div className="feature-topline"><span>SA-BPO / {active.short}</span><span>Capability live</span></div>
            <div className="feature-copy"><h3>{active.title}</h3><p>{active.copy}</p><ul>{active.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="text-button text-button--dark" onClick={() => goTo("contact")}>Map this work with us <ArrowRight size={16} /></button></div>
            <div className="feature-visual"><img src="/manus-storage/sabpo-operations_50372ac6.png" alt="SA-BPO operations specialist" /><span className="feature-badge"><Headphones size={16} /> Human-led delivery</span></div>
          </article>
        </div>
      </section>

      <section className="performance-section section-pad">
        <div className="network-rail network-rail--blue" aria-hidden="true"><i /><span /><i /><span /><i /></div>
        <div className="performance-heading"><p className="eyebrow eyebrow--dark">The operating advantage</p><h2>Performance you can see.<br /><span>Results you can trust.</span></h2><p>Experience, productivity, motivation, and environment are not abstract ideals. They are built into the way SA-BPO works.</p></div>
        <div className="performance-list">{performance.map((item, index) => <article className={`performance-row performance-row--${item.tone}`} key={item.title}><div><span>0{index + 1}</span><h3>{item.title}</h3></div><p>{item.copy}</p><div className="row-mark"><span /><i /></div></article>)}</div>
        <div className="why-strip why-strip--blue"><strong>Why <span>SA-BPO</span></strong><p>We deliver tailored outsourcing solutions across technical, back-office, customer-care, and customer-support channels.</p></div>
      </section>

      <section id="confidence" className="confidence-section section-pad">
        <div className="confidence-intro"><div className="index-label">03 <span>Partner with confidence</span></div><div><p className="eyebrow">Visible operational standards</p><h2>Clarity at every<br /><em>customer moment.</em></h2></div><p>We pair high-touch service with systems that keep expectations clear, quality visible, and delivery resilient.</p></div>
        <div className="proof-grid">{proof.map((item, index) => <article className="proof-item" key={item}><div className="proof-number">{String(index + 1).padStart(2, "0")}</div><ShieldCheck size={23} /><p>{item}</p><i className="proof-node" /></article>)}</div>
        <div className="confidence-bottom"><div><p>At SA-BPO, we keep the model simple and effective: clients, customers, and the people doing the work stay at the forefront of every decision.</p><div className="standard-rail"><span><b>24/7</b> Service-ready</span><span><b>KPI</b> Visible performance</span><span><b>SLA</b> Quality-aligned</span></div></div><button className="button button--light" onClick={() => setShowCalculator(true)}>Build an indicative model <ArrowRight size={17} /></button></div>
      </section>

      <section id="durban-north" className="location-section">
        <div className="location-image"><img src="/manus-storage/sabpo-south-africa-network_6d22fb2c.png" alt="South African operations and collaboration" /><div className="image-circuit"><i /><span /><i /></div></div>
        <div className="location-copy"><p className="eyebrow">Our location</p><h2>Durban<br /><em>North.</em></h2><p>Durban North is known as the heart and soul of Durban—a place with a strong sense of community, excellent access, and the energy of a coastal city.</p><p>It is an exceptional place for people to do their best work and for SA-BPO to build a customer-experience centre that is connected to its community.</p><div className="location-tag"><MapPin size={17} /><span>Durban North, KwaZulu-Natal</span></div></div>
        <div className="location-benefits"><h3>The benefits of our BPO in Durban North</h3><ul><li>Community culture embraced by SA-BPO</li><li>Excellent location for major transport networks</li><li>Cost-effective retail solutions for employees</li><li>Space, sun, sea, and a people-first environment</li><li>Creative, community-driven energy for teams</li></ul></div>
      </section>

      <section className="home-section section-pad">
        <div className="home-content"><div className="index-label">04 <span>Our home</span></div><div><p className="eyebrow eyebrow--dark">A purpose-built centre</p><h2>A better place<br /><span>to do the work.</span></h2><p>Our BPO centre is located in the heart of Durban North, close to Umhlanga and Gateway, and within easy reach of King Shaka International Airport. We have created a better environment for people—and better conditions for service.</p></div></div>
        <div className="home-visual"><img src="/manus-storage/sabpo-operations_50372ac6.png" alt="SA-BPO workplace and operations" /><div className="office-label"><UsersRound size={18} /><span>People at the centre</span></div></div>
        <div className="home-benefits"><h3>The benefits of SA-BPO’s home</h3><div className="amenities">{["Spacious modern working environment", "State-of-the-art network solutions and redundancy", "Daily in-house fresh coffee stations", "Daily fix-on-site snack stations", "Relaxation zones and break-out rooms", "Luxurious amenities and wellness zone"].map((item) => <div key={item}><Check size={15} /><span>{item}</span></div>)}</div><p>Our operation adheres to global standards and best practice, aligning with UK, USA, and AUS office environments while offering 24/7 turnkey solutions.</p></div>
      </section>

      <section className="calculator-band"><div><p className="eyebrow">A clearer starting point</p><h2>Know the shape of<br /><em>your next move.</em></h2></div><div className="calculator-tool-preview" aria-label="Operating model assumptions"><div><span>01</span><strong>Volume</strong><small>Conversations</small></div><b>→</b><div><span>02</span><strong>People</strong><small>Specialists</small></div><b>→</b><div><span>03</span><strong>Outcome</strong><small>Operating signal</small></div></div><div className="calculator-copy"><p>Shape a focused operating model from volume, people, and expected outcomes—then make the assumptions specific to your business.</p><button className="button button--yellow" onClick={() => setShowCalculator(true)}>Open BPO calculator <ArrowDownRight size={17} /></button></div></section>

      <section id="contact" className="contact-section section-pad"><div className="index-label">05 <span>Start here</span></div><div className="contact-main"><p className="eyebrow">Let’s make the next conversation count</p><h2>Tell us what<br /><span>needs to move.</span></h2><p>Whether you are scaling support, streamlining operations, or looking for a people-first partner, we are ready to listen.</p><a className="contact-email" href="mailto:hello@sa-bpo.com">hello@sa-bpo.com <ArrowUpRight size={21} /></a></div><div className="contact-card"><Sparkles size={20} /><strong>Start with a clearer model.</strong><p>Use the calculator to shape your first conversation with SA-BPO.</p><button className="text-button text-button--dark" onClick={() => setShowCalculator(true)}>Open BPO calculator <ArrowRight size={16} /></button></div></section>

      <footer className="site-footer"><div className="footer-brand"><img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-links"><div><span>Explore</span><button onClick={() => goTo("values")}>Our values</button><button onClick={() => goTo("services")}>Capabilities</button><button onClick={() => goTo("confidence")}>Why SA-BPO</button></div><div><span>Connect</span><button onClick={() => goTo("durban-north")}>Durban North</button><a href="mailto:hello@sa-bpo.com">Email us</a><button onClick={() => goTo("top")}>Back to top</button></div></div><div className="footer-bottom"><span>© 2026 SA-BPO. All rights reserved.</span><span>South Africa / Global conversations</span></div></footer>

      {showCalculator && <div className="modal-backdrop" onClick={() => setShowCalculator(false)}><div className="calculator-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCalculator(false)} aria-label="Close calculator"><X /></button><div className="modal-kicker"><Sparkles size={16} /> Indicative BPO calculator</div><h2>Shape the first<br /><em>conversation.</em></h2><p>Adjust the inputs to see an indicative monthly operating signal. We will make the real model specific to your business.</p><label>Customer-experience specialists <output>{agents}</output><input type="range" min="2" max="40" value={agents} onChange={(event) => setAgents(Number(event.target.value))} /></label><label>Hours per specialist / month <output>{hours}</output><input type="range" min="80" max="220" step="10" value={hours} onChange={(event) => setHours(Number(event.target.value))} /></label><div className="estimate"><span>Indicative monthly hours</span><strong>{(agents * hours).toLocaleString()}</strong><small>Estimated planning signal: <b>R{planningSignal.toLocaleString()}</b> / month</small></div><button className="button button--signal button--full" onClick={() => { setShowCalculator(false); goTo("contact"); }}>Use this as a starting point <ArrowRight size={17} /></button></div></div>}
    </main>
  );
}
