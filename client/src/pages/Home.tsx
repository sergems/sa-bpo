/* Human Circuit compact edition: a concise people + process + outcome journey with content revealed through deliberate interaction. */
/* Human Circuit page: people-first editorial navigation with clear, practical routes. */
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
    title: <>Values that <span>matter.</span></>,
    description: "We build a service culture around the people doing the work—because that is where every customer experience begins.",
    cards: [
      { title: "Rewards", copy: "Working in a rewarding environment is key to success. At SA-BPO, we recognise and reward our employees for all variants of success, including performance improvements and initiative.", tone: "red", icon: Trophy },
      { title: "Compassion", copy: "Genuine human qualities start from within. We bring compassion to the forefront of all we do, always delivering with honesty and empathy so that every customer experience is enhanced.", tone: "green", icon: HeartHandshake },
      { title: "Recognition", copy: "We recognise and value every SA-BPO member and encourage a culture of equality as our dedicated advisors and support team collaborate to achieve all-round success.", tone: "yellow", icon: BadgeCheck },
      { title: "Care", copy: "A caring environment creates a culture that reflects on both customer and employee experiences. We encourage every SA-BPO employee to lead with care in day-to-day interactions.", tone: "blue", icon: CircleDotDashed },
    ],
  },
  performance: {
    eyebrow: "The operating advantage",
    title: <>Results you can <span>trust.</span></>,
    description: "Experience, productivity, motivation, and environment are built into the SA-BPO operating model.",
    cards: [
      { title: "Experience", copy: "SA-BPO is led by a highly experienced management team, including pioneers of the BPO industry in South Africa. Their combined experience helps create a destination that delivers both customer and employee excellence.", tone: "red", icon: BadgeCheck },
      { title: "Productivity", copy: "We have created a unique and fitting environment for all employees, allowing them to deliver and exceed in their best working environments, backed by world-class infrastructure and robust fail-safes.", tone: "green", icon: CircleDotDashed },
      { title: "Motivation", copy: "Using our decades of experience, we have created a fair and rewarding performance environment that focuses on customer experience and recognises success through rewarding remuneration packages.", tone: "yellow", icon: Trophy },
      { title: "Environment", copy: "A modern, spacious working environment caters for professional focus and personal wellness—an operational home our employees are proud to call their own in the heart of Durban North.", tone: "blue", icon: UsersRound },
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

const ourHomeExperience = {
  story: {
    title: <>Our <em>Home.</em></>,
    copy: "Making a break from the norm we decided to set up our BPO centre in the heart of Durban North. Just under 10 minutes from the busy Umhlanga and Gateway hubs and less than 25km from King Shaka International Airport, located in the heart of all things Durban. SA-BPO breaking the traditions of the norm to create a better environment for one and all.",
    visual: "/manus-storage/sabpo-our-home-reception_e2dafeb7.png",
    alt: "SA-BPO reception team welcoming visitors at the Durban North workplace",
    label: "Welcome to SA-BPO",
  },
  benefits: {
    title: <>The Benefits of<br /><em>SA-BPO’s Home.</em></>,
    points: ["Spacious modern working environment", "State of the art network solutions and redundancy", "Daily Grind - In House fresh coffee stations", "Daily Fix - On-site snack stations", "Relaxation zones and break-out rooms", "Luxurious Amenities", "Wellness Zone"],
    visual: "/manus-storage/sabpo-our-home-operations_7ae1f553.png",
    alt: "SA-BPO specialists at work in the Durban North contact centre",
    label: "A live operating environment",
  },
};

const locationContent = {
  durban: {
    tab: "Durban North",
    title: <>Durban<br /><em>North.</em></>,
    text: "Durban North is known for being the heart and soul of Durban with its Identity being forged over many decades. The benefits are here for all to see and experience. An affluent, family orientated coastal suburb with a strong sense of community pride. It functions as a well established residential and commercial hub to all of Durban, close to major beaches and nature reserves. A destination our Employees get to call home.",
    points: ["Major transport access", "Community culture", "Cost-effective employee amenities"],
    visual: "/manus-storage/sabpo-south-africa-network_6d22fb2c.png",
    alt: "South African collaboration and operations",
  },
  home: {
    tab: "Our home",
    title: <>The Benefits of our<br /><em>BPO in Durban North</em></>,
    text: "",
    points: ["Community culture embraced by all at SA BPO.", "Excellent location for all major transport networks.", "Cost effective retail solutions for our employees.", "Away from the Central Hubs of the Industry allowing for a more creative approach to the BPO space for both ourselves and our employees.", "Sun, Sea, Sand and all the trappings of a prime destination but at community driven costs and prices."],
    visual: "/manus-storage/sabpo-operations_50372ac6.png",
    alt: "SA-BPO workplace and operations specialist",
  },
};

const heroSlides = [
  {
    id: "people",
    eyebrow: "People-powered operations",
    title: <>Our people<br /><em>speak for</em><br />your brand.</>,
    copy: "The conversations behind your growth, delivered with local fluency, global standards, and enterprise discipline.",
    primary: "Map your BPO model",
    primaryTarget: "calculator",
    secondary: "Explore SA-BPO",
    secondaryTarget: "about",
    trust: ["Secure & resilient", "QA-led service", "UK / US / AUS aligned"],
    visual: "/manus-storage/sabpo-hero-people-contact-centre_d4a7d59d.png",
    alt: "SA-BPO customer service team working together in a modern contact centre",
    tone: "people",
  },
  {
    id: "capability",
    eyebrow: "Connected capability",
    title: <>Every customer <em>moment,</em><br />working as one.</>,
    copy: "Bring customer care, engagement, and critical back-office operations into one dependable delivery model.",
    primary: "Explore capabilities",
    primaryTarget: "services",
    secondary: "Build a BPO model",
    secondaryTarget: "calculator",
    trust: ["Voice, email & chat", "KPI-led delivery", "Quality assurance"],
    visual: "/manus-storage/sabpo-hero-operations-collaboration_c67eb921.png",
    alt: "SA-BPO operations specialists collaborating in a modern delivery hub",
    tone: "capability",
  },
  {
    id: "global",
    eyebrow: "South Africa / global delivery",
    title: <>Local insight.<br /><em>Global</em><br />expectation.</>,
    copy: "A Durban North operation designed for the standards, resilience, and human connection your customers expect.",
    primary: "Why SA-BPO",
    primaryTarget: "confidence",
    secondary: "See our location",
    secondaryTarget: "location",
    trust: ["24/7 service ready", "Global office standards", "Human-led delivery"],
    visual: "/manus-storage/sabpo-hero-global-delivery_7c01e769.png",
    alt: "SA-BPO client services team collaborating in a Durban delivery office",
    tone: "global",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cultureMode, setCultureMode] = useState<CultureMode>(() => new URLSearchParams(window.location.search).get("culture") === "performance" ? "performance" : "values");
  const [activeValueIndex, setActiveValueIndex] = useState(() => {
    const selected = Number(new URLSearchParams(window.location.search).get("pillar"));
    return Number.isInteger(selected) && selected >= 0 && selected <= 3 ? selected : 0;
  });
  const [activeService, setActiveService] = useState("cx");
  const [activeProof, setActiveProof] = useState(0);
  const [activeHomeTile, setActiveHomeTile] = useState<"story" | "benefits">(() => new URLSearchParams(window.location.search).get("homeView") === "benefits" ? "benefits" : "story");
  const [locationMode, setLocationMode] = useState<LocationMode>(() => new URLSearchParams(window.location.search).get("location") === "home" ? "home" : "durban");
  const [showCalculator, setShowCalculator] = useState(() => new URLSearchParams(window.location.search).get("calculator") === "open");
  const [showStatementDetails, setShowStatementDetails] = useState(() => new URLSearchParams(window.location.search).get("statement") === "details");
  const [agents, setAgents] = useState(8);
  const [hours, setHours] = useState(160);
  const [scrolled, setScrolled] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(() => {
    const requestedSlide = new URLSearchParams(window.location.search).get("hero");
    const index = heroSlides.findIndex((slide) => slide.id === requestedSlide);
    return index >= 0 ? index : 0;
  });
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (heroPaused || reducedMotion) return;
    const sliderTimer = window.setInterval(() => setActiveHeroSlide((slide) => (slide + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(sliderTimer);
  }, [heroPaused]);

  const activeCulture = cultureContent[cultureMode];
  const activeValue = activeCulture.cards[activeValueIndex] ?? activeCulture.cards[0];
  const ActiveValueIcon = activeValue.icon;
  const selectedService = services.find((service) => service.id === activeService) ?? services[0];
  const selectedLocation = locationContent[locationMode];
  const activeHero = heroSlides[activeHeroSlide];
  const coverageHours = useMemo(() => agents * hours, [agents, hours]);
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const changeHeroSlide = (direction: 1 | -1) => {
    setActiveHeroSlide((slide) => (slide + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <main className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => goTo("top")} aria-label="SA-BPO home"><img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" /></button>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <button onClick={() => goTo("about")}>About SA-BPO</button>
          <button onClick={() => goTo("services")}>Capabilities</button>
          <button onClick={() => goTo("confidence")}>Why SA-BPO</button>
          <a className="nav-join" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer">Join Our Team <ArrowUpRight size={14} /></a>
          <button className="nav-calculator" onClick={() => setShowCalculator(true)}>BPO calculator <ArrowDownRight size={15} /></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className={`hero-section hero-section--${activeHero.tone}`} role="region" aria-roledescription="carousel" aria-label="SA-BPO introduction">
        <div className="hero-rail"><span /><span /><span /><span /><span /></div><div className={`hero-field hero-field--${activeHero.tone}`} />
        <div key={activeHero.id} className="hero-copy"><p className="eyebrow"><i /> {activeHero.eyebrow}</p><h1>{activeHero.title}</h1><p>{activeHero.copy}</p><div className="hero-actions"><button className="button button--green" onClick={() => goTo(activeHero.primaryTarget)}>{activeHero.primary} <ArrowRight size={17} /></button><button className="text-button" onClick={() => goTo(activeHero.secondaryTarget)}>{activeHero.secondary} <ArrowDownRight size={16} /></button></div><div className="hero-trust" aria-label="Client trust and operational standards"><span className="trust-caption">Trusted delivery</span>{activeHero.trust.map((item, index) => <span key={item}>{index === 0 ? <ShieldCheck size={14} /> : index === 1 ? <BadgeCheck size={14} /> : <CircleDotDashed size={14} />}{item}</span>)}</div></div>
        <div key={`${activeHero.id}-visual`} className="hero-image"><div className="hero-orbit hero-orbit--a" /><div className="hero-orbit hero-orbit--b" /><img src={activeHero.visual} alt={activeHero.alt} /><div className="hero-badge"><span>0{activeHeroSlide + 1}</span><b>Human signal</b></div></div>
        <div className="hero-slider-controls" aria-label="Hero slide controls"><button className="hero-arrow hero-arrow--previous" onClick={() => changeHeroSlide(-1)} aria-label="Previous slide"><ArrowRight size={16} /></button><div className="hero-pagination">{heroSlides.map((slide, index) => <button key={slide.id} className={activeHeroSlide === index ? "is-active" : ""} onClick={() => setActiveHeroSlide(index)} aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`} aria-current={activeHeroSlide === index ? "true" : undefined}><span /></button>)}</div><button className="hero-pause" onClick={() => setHeroPaused(!heroPaused)} aria-label={heroPaused ? "Resume slider" : "Pause slider"}>{heroPaused ? "Play" : "Pause"}</button><button className="hero-arrow" onClick={() => changeHeroSlide(1)} aria-label="Next slide"><ArrowRight size={16} /></button></div>
      </section>

      <section id="about" className="culture-section section-pad">
        <div className="culture-orbit culture-orbit--one" /><div className="culture-orbit culture-orbit--two" />
        <div className="culture-intro"><div className="index-label">01 <span>About SA-BPO</span></div><div><p className="eyebrow">The operating culture</p><h2>{activeCulture.title}</h2></div><p>{activeCulture.description}</p></div>
        <div className="culture-mode" role="tablist" aria-label="SA-BPO culture content"><button className={cultureMode === "values" ? "is-active" : ""} onClick={() => { setCultureMode("values"); setActiveValueIndex(0); }} role="tab" aria-selected={cultureMode === "values"}><span>01</span> Our values</button><button className={cultureMode === "performance" ? "is-active" : ""} onClick={() => { setCultureMode("performance"); setActiveValueIndex(0); }} role="tab" aria-selected={cultureMode === "performance"}><span>02</span> Performance</button></div>
        <div className="value-console"><div className="value-selector" role="tablist" aria-label="Select a SA-BPO value">{activeCulture.cards.map((item, index) => { const Icon = item.icon; return <button key={item.title} className={`value-select value-select--${item.tone} ${activeValueIndex === index ? "is-active" : ""}`} onClick={() => setActiveValueIndex(index)} role="tab" aria-selected={activeValueIndex === index}><span className="value-number">0{index + 1}</span><span className="value-select-name">{item.title}</span><Icon size={18} /><ArrowRight size={16} /></button>; })}</div><article key={`${cultureMode}-${activeValue.title}`} className={`value-display value-display--${activeValue.tone}`}><div className="value-display-top"><span>SA-BPO / {cultureMode === "values" ? "Core value" : "Performance pillar"}</span><span>0{activeValueIndex + 1} / 04</span></div><div className="value-display-copy"><div className="value-display-icon"><ActiveValueIcon size={34} /></div><h3>{activeValue.title}</h3><p>{activeValue.copy}</p></div><button className="value-details" onClick={() => setShowStatementDetails(true)}>View details <ArrowUpRight size={14} /></button><button className="value-next" onClick={() => setActiveValueIndex((activeValueIndex + 1) % activeCulture.cards.length)}>Next pillar <ArrowRight size={15} /></button><div className="value-display-path"><i /><span /><i /><span /><i /></div><div className="value-display-word">{activeValue.title}</div></article></div>
        <div className="culture-promise"><span className="promise-dot" /><p><strong>People → Process → Outcome.</strong> Every SA-BPO value is designed to improve the experience behind your brand.</p><button onClick={() => goTo("services")}>See capability in action <ArrowRight size={16} /></button></div>
      </section>

      <section id="services" className="services-section section-pad">
        <div className="section-top section-top--compact"><div className="index-label">02 <span>Capabilities</span></div><div><p className="eyebrow eyebrow--green">Connected capability</p><h2>One team for the moments<br /><span>that move business.</span></h2></div></div>
        <div className="service-explorer"><div className="service-tabs" role="tablist" aria-label="SA-BPO capabilities">{services.map((service, index) => <button key={service.id} className={`service-tab ${activeService === service.id ? "is-active" : ""}`} onClick={() => setActiveService(service.id)} role="tab" aria-selected={activeService === service.id}><span>0{index + 1}</span><strong>{service.nav}</strong><ChevronRight size={18} /></button>)}</div><article key={selectedService.id} className={`service-stage service-stage--${selectedService.tone}`}><div className="stage-copy"><span className="stage-label">Live capability / {selectedService.nav}</span><h3>{selectedService.title}</h3><p>{selectedService.copy}</p><ul>{selectedService.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="text-button text-button--dark" onClick={() => goTo("contact")}>Map this work with us <ArrowRight size={16} /></button></div><div className="stage-image"><img src="/manus-storage/sabpo-operations_50372ac6.png" alt="SA-BPO operations specialist" /><span><Headphones size={16} /> Human-led delivery</span></div></article></div>
      </section>

      <section id="confidence" className="confidence-section section-pad">
        <div className="section-top section-top--on-dark"><div className="index-label">03 <span>Why SA-BPO</span></div><div><p className="eyebrow">Partner with confidence</p><h2>Proof you can<br /><em>explore.</em></h2></div><p className="section-description">Select a standard to see how it supports the people, process, and outcome behind your operation.</p></div>
        <div className="proof-explorer"><div className="proof-list">{proofPoints.map((proof, index) => <button key={proof.label} className={activeProof === index ? "is-active" : ""} onClick={() => setActiveProof(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{proof.label}</strong><ArrowRight size={16} /></button>)}</div><article key={activeProof} className="proof-panel"><div className="proof-metric">{proofPoints[activeProof].metric}</div><ShieldCheck size={27} /><h3>{proofPoints[activeProof].label}</h3><p>{proofPoints[activeProof].detail}</p><div className="proof-path"><i /><span /><i /><span /><i /></div></article></div>
        <div className="confidence-footer"><span>UK / US / AUS office standards</span><span>KPI-led delivery</span><span>Quality assurance</span></div>
      </section>

      <section id="location" className="location-section">
        <div className="location-media"><img src={selectedLocation.visual} alt={selectedLocation.alt} /><div className="media-node"><MapPin size={16} /><span>Durban North</span></div></div><div key={locationMode} className={`location-content location-content--${locationMode}`}><div className="location-toggle"><button className={locationMode === "durban" ? "is-active" : ""} onClick={() => setLocationMode("durban")}>Durban North</button><button className={locationMode === "home" ? "is-active" : ""} onClick={() => setLocationMode("home")}>Our home</button></div><p className="eyebrow">Our location</p><h2>{selectedLocation.title}</h2>{selectedLocation.text ? <p>{selectedLocation.text}</p> : null}<ul>{selectedLocation.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="text-button" onClick={() => goTo("contact")}>Talk to the local team <ArrowRight size={16} /></button></div>
      </section>

      <section id="calculator" className="calculator-section"><div className="calculator-heading"><p className="eyebrow">A practical starting point</p><h2>Map the work.<br /><em>See the signal.</em></h2></div><div className="calculator-path"><span><b>01</b> Volume</span><i>→</i><span><b>02</b> People</span><i>→</i><span><b>03</b> Outcome</span></div><div className="calculator-action"><p>Shape an indicative operating model from the work, people, and coverage you need.</p><button className="button button--yellow" onClick={() => setShowCalculator(true)}>Open BPO calculator <ArrowDownRight size={17} /></button></div></section>

      <section id="our-home" className="our-home-section">
        <div className="our-home-heading"><div className="index-label">04 <span>Inside SA-BPO</span></div><p className="eyebrow eyebrow--green">A home for better work</p><div className="our-home-switch" role="tablist" aria-label="Explore the SA-BPO home"><button className={activeHomeTile === "story" ? "is-active" : ""} onClick={() => setActiveHomeTile("story")} role="tab" aria-selected={activeHomeTile === "story"}><span>01</span> Our home</button><button className={activeHomeTile === "benefits" ? "is-active" : ""} onClick={() => setActiveHomeTile("benefits")} role="tab" aria-selected={activeHomeTile === "benefits"}><span>02</span> Benefits</button></div></div>
        <div className={`our-home-mosaic our-home-mosaic--${activeHomeTile}`}>
          <article className="our-home-story"><p className="our-home-kicker">Durban North / SA-BPO</p><h2>{ourHomeExperience.story.title}</h2><p>{ourHomeExperience.story.copy}</p><button className="our-home-tile-action" onClick={() => setActiveHomeTile("benefits")}>See the benefits <ArrowRight size={16} /></button></article>
          <button className="our-home-media our-home-media--reception" onClick={() => setActiveHomeTile("story")} aria-label="Show Our Home story"><img src={ourHomeExperience.story.visual} alt={ourHomeExperience.story.alt} /><span><HeartHandshake size={16} /> {ourHomeExperience.story.label}</span></button>
          <button className="our-home-media our-home-media--operations" onClick={() => setActiveHomeTile("benefits")} aria-label="Show Our Home benefits"><img src={ourHomeExperience.benefits.visual} alt={ourHomeExperience.benefits.alt} /><span><Headphones size={16} /> {ourHomeExperience.benefits.label}</span></button>
          <article className="our-home-benefits"><p className="our-home-kicker">Built around people</p><h3>{ourHomeExperience.benefits.title}</h3><ul>{ourHomeExperience.benefits.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="our-home-tile-action" onClick={() => setActiveHomeTile("story")}>Read our story <ArrowRight size={16} /></button></article>
        </div>
      </section>

      <section id="contact" className="contact-section section-pad"><div className="index-label">04 <span>Start here</span></div><div><p className="eyebrow eyebrow--dark">Let’s make the next conversation count</p><h2>Tell us what<br /><span>needs to move.</span></h2><p>Whether you are scaling support, simplifying operations, or looking for a people-first partner, we are ready to listen.</p><a href="mailto:hello@sa-bpo.com">hello@sa-bpo.com <ArrowUpRight size={20} /></a></div><aside><Sparkles size={19} /><strong>Start with a clearer model.</strong><p>Use the BPO calculator to frame the conversation around your operation.</p><button className="text-button text-button--dark" onClick={() => setShowCalculator(true)}>Build a first view <ArrowRight size={16} /></button></aside></section>

      <footer className="site-footer"><div><img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-nav"><button onClick={() => goTo("about")}>About SA-BPO</button><button onClick={() => goTo("services")}>Capabilities</button><button onClick={() => goTo("confidence")}>Why SA-BPO</button><button onClick={() => goTo("top")}>Back to top</button></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>

      {showCalculator && <div className="modal-backdrop" onClick={() => setShowCalculator(false)}><div className="calculator-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCalculator(false)} aria-label="Close calculator"><X /></button><div className="calculator-modal-body"><p className="modal-kicker"><Sparkles size={15} /> BPO calculator</p><h2 className="calculator-modal-title">Shape the first<br /><em>conversation.</em></h2><p>Use the inputs to create a simple coverage signal. A full operating model is always tailored with you.</p><label>Specialists <output>{agents}</output><input type="range" min="2" max="40" value={agents} onChange={(event) => setAgents(Number(event.target.value))} /></label><label>Hours per specialist / month <output>{hours}</output><input type="range" min="80" max="220" step="10" value={hours} onChange={(event) => setHours(Number(event.target.value))} /></label><div className="coverage-output"><span>Indicative specialist hours</span><strong>{coverageHours.toLocaleString()}</strong><small>Coverage signal across voice, email, and chat.</small></div></div><div className="calculator-modal-action"><button className="button button--green button--full" onClick={() => { setShowCalculator(false); goTo("contact"); }}>Use this as a starting point <ArrowRight size={16} /></button></div></div></div>}
      {showStatementDetails && <div className="modal-backdrop" onClick={() => setShowStatementDetails(false)}><article className={`statement-dialog statement-dialog--${activeValue.tone}`} onClick={(event) => event.stopPropagation()}><button className="modal-close statement-close" onClick={() => setShowStatementDetails(false)} aria-label="Close statement details"><X /></button><p className="statement-kicker">SA-BPO / {cultureMode === "values" ? "Core value" : "Performance pillar"}</p><div className="statement-icon"><ActiveValueIcon size={30} /></div><h2>{activeValue.title}</h2><p>{activeValue.copy}</p><div className="statement-context"><span>Why it matters</span><p>{activeCulture.description}</p></div><button className="statement-dismiss" onClick={() => setShowStatementDetails(false)}>Close details <X size={15} /></button></article></div>}
    </main>
  );
}
