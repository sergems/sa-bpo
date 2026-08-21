/* Human Circuit compact edition: a concise people + process + outcome journey with content revealed through deliberate interaction. */
/* Human Circuit page: people-first editorial navigation with clear, practical routes. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
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
    description: <><span>We build a service culture around the</span><span>people doing the work because it is</span><span>where every customer experience</span><span>begins.</span></>,
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
    description: <><span>Experience, productivity,</span><span>motivation, and environment</span><span>are built into the SA-BPO</span><span>operating model.</span></>,
    cards: [
      { title: "Experience", copy: "SA-BPO is led by a highly experienced management team, including pioneers of the BPO industry in South Africa. Their combined experience helps create a destination that delivers both customer and employee excellence.", tone: "red", icon: BadgeCheck },
      { title: "Productivity", copy: "We have created a unique and fitting environment for all employees, allowing them to deliver and exceed in their best working environments, backed by world-class infrastructure and robust fail-safes.", tone: "green", icon: CircleDotDashed },
      { title: "Motivation", copy: "Using our decades of experience, we have created a fair and rewarding performance environment that focuses on customer experience and recognises success through rewarding remuneration packages.", tone: "yellow", icon: Trophy },
      { title: "Environment", copy: "A modern, spacious working environment caters for professional focus and personal wellness—an operational home our employees are proud to call their own in the heart of Durban North.", tone: "blue", icon: UsersRound },
    ],
  },
};

const proofPoints = [
  { label: "24/7 service via Voice / Email / Chat", mobileLabel: "24/7 Voice / Email / Chat", detail: "Always-on channel readiness for customer conversations across voice, email, and chat.", metric: "24/7", icon: Headphones },
  { label: "KPI driven service", detail: "Visible measures keep service delivery, coaching, and business outcomes connected.", metric: "KPI", icon: CircleDotDashed },
  { label: "Outstanding customer support & delivery", mobileLabel: "Outstanding Customer Support", detail: "Human support teams work to protect every customer moment with practical operational discipline.", metric: "CX", icon: HeartHandshake },
  { label: "UK / US / AUS in-house office standards", mobileLabel: "UK / US / AUS Standards", detail: "Our operational environment is designed around the office and service expectations of UK, US, and AUS partners.", metric: "UK/US/AUS", icon: MapPin },
  { label: "Most combined experience in SA", mobileLabel: "Most Combined Experience", detail: "Experienced leadership and specialist teams bring a deep combined understanding of South African BPO delivery.", metric: "SA", icon: UsersRound },
  { label: "Security & resilience", detail: "Resilient systems, clear controls, and reliable operating practices provide confidence when service matters most.", metric: "SECURE", icon: ShieldCheck },
  { label: "Face-to-face consultations", detail: "Direct working sessions create clarity, maintain momentum, and keep the operation closely aligned with your team.", metric: "F2F", icon: UsersRound },
  { label: "A rewarding & progressive culture", mobileLabel: "Rewarding and Progressive", detail: "A people-first environment recognises performance and supports the growth behind sustained delivery.", metric: "CULTURE", icon: Trophy },
  { label: "Onboarding excellence", detail: "Structured implementation turns a new partnership into a focused, well-prepared operating team.", metric: "ONBOARD", icon: Sparkles },
  { label: "Quality assurance", detail: "Clear checks, feedback, and coaching protect the experience your customers receive.", metric: "QA", icon: BadgeCheck },
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
    visual: "/manus-storage/moses-mabhida-stadium-durban_0a607aba.jpg",
    alt: "Moses Mabhida Stadium in Durban at dusk",
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
    id: "culture",
    eyebrow: "Service culture / people first",
    title: <>Service culture.<br /><em>People</em> first.</>,
    copy: "When our people feel supported, your customers feel the difference—in every conversation, every day.",
    primary: "Meet SA-BPO",
    primaryTarget: "about",
    secondary: "See the proof",
    secondaryTarget: "confidence",
    trust: ["People-first culture", "Supported teams", "Better conversations"],
    visual: "/manus-storage/sabpo-hero-global-delivery_7c01e769.png",
    alt: "SA-BPO customer service team collaborating in a people-led operating environment",
    tone: "people",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cultureMode, setCultureMode] = useState<CultureMode>(() => new URLSearchParams(window.location.search).get("culture") === "performance" ? "performance" : "values");
  const [activeValueIndex, setActiveValueIndex] = useState(() => {
    const selected = Number(new URLSearchParams(window.location.search).get("pillar"));
    return Number.isInteger(selected) && selected >= 0 && selected <= 3 ? selected : 0;
  });
  const [activeProof, setActiveProof] = useState(() => {
    const requested = Number(new URLSearchParams(window.location.search).get("proof"));
    return Number.isInteger(requested) && requested >= 0 && requested < proofPoints.length ? requested : 0;
  });
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
  const selectedLocation = locationContent[locationMode];
  const activeHero = heroSlides[activeHeroSlide];
  const ActiveProofIcon = proofPoints[activeProof].icon;
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
        <div className="culture-intro"><div className="index-label">01 <span>About SA-BPO</span></div><div><p className="eyebrow">The operating culture</p><h2>{activeCulture.title}</h2></div><p className="culture-intro-description">{activeCulture.description}</p></div>
        <div className="culture-mode" role="tablist" aria-label="SA-BPO culture content"><button className={cultureMode === "values" ? "is-active" : ""} onClick={() => { setCultureMode("values"); setActiveValueIndex(0); }} onMouseEnter={() => { setCultureMode("values"); setActiveValueIndex(0); }} onFocus={() => { setCultureMode("values"); setActiveValueIndex(0); }} role="tab" aria-selected={cultureMode === "values"}><span>01</span> Our values</button><button className={cultureMode === "performance" ? "is-active" : ""} onClick={() => { setCultureMode("performance"); setActiveValueIndex(0); }} onMouseEnter={() => { setCultureMode("performance"); setActiveValueIndex(0); }} onFocus={() => { setCultureMode("performance"); setActiveValueIndex(0); }} role="tab" aria-selected={cultureMode === "performance"}><span>02</span> Performance</button></div>
        <div className="value-console"><div className="value-selector" role="tablist" aria-label="Select a SA-BPO value">{activeCulture.cards.map((item, index) => { const Icon = item.icon; return <button key={item.title} className={`value-select value-select--${item.tone} ${activeValueIndex === index ? "is-active" : ""}`} onClick={() => setActiveValueIndex(index)} onMouseEnter={() => setActiveValueIndex(index)} onFocus={() => setActiveValueIndex(index)} role="tab" aria-selected={activeValueIndex === index}><span className="value-number">0{index + 1}</span><span className="value-select-name">{item.title}</span><Icon size={18} /><ArrowRight size={16} /></button>; })}</div><article key={`${cultureMode}-${activeValue.title}`} className={`value-display value-display--${activeValue.tone}`}><div className="value-display-top"><span>SA-BPO / {cultureMode === "values" ? "Core value" : "Performance pillar"}</span><span>0{activeValueIndex + 1} / 04</span></div><div className="value-display-copy"><div className="value-display-icon"><ActiveValueIcon size={34} /></div><h3>{activeValue.title}</h3><p>{activeValue.copy}</p></div><button className="value-details" onClick={() => setShowStatementDetails(true)}>View details <ArrowUpRight size={14} /></button><button className="value-next" onClick={() => setActiveValueIndex((activeValueIndex + 1) % activeCulture.cards.length)}>Next pillar <ArrowRight size={15} /></button><div className="value-display-path"><i /><span /><i /><span /><i /></div><div className="value-display-word">{activeValue.title}</div></article></div>
        <div className="culture-promise"><span className="promise-dot" /><p><strong>People → Process → Outcome.</strong> Every SA-BPO value is designed to improve the experience behind your brand.</p><button onClick={() => goTo("confidence")}>See the proof <ArrowRight size={16} /></button></div>
      </section>

      <section id="confidence" className="confidence-section section-pad">
        <div className="section-top section-top--on-dark"><div className="index-label">02 <span>Why SA-BPO</span></div><div><p className="eyebrow">Partner with confidence</p><h2>Proof you can<br /><em>explore.</em></h2></div><p className="section-description">Select a standard to see how it supports the people, process, and outcome behind your operation.</p></div>
        <div className="proof-explorer"><div className="proof-list">{proofPoints.map((proof, index) => <button key={proof.label} className={activeProof === index ? "is-active" : ""} onClick={() => setActiveProof(index)} data-mobile-label={proof.mobileLabel ?? proof.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{proof.label}</strong><ArrowRight size={16} /></button>)}</div><article key={activeProof} className="proof-panel"><div className="proof-metric">{proofPoints[activeProof].metric}</div><ActiveProofIcon size={27} /><h3>{proofPoints[activeProof].label}</h3><p>{proofPoints[activeProof].detail}</p><div className="proof-path"><i /><span /><i /><span /><i /></div></article></div>
        <div className="confidence-footer"><span>24/7 Voice / Email / Chat</span><span>KPI driven service</span><span>UK / US / AUS office standards</span></div>
      </section>

      <section id="location" className="location-section">
        <div className="location-media"><img src={selectedLocation.visual} alt={selectedLocation.alt} /><div className="media-node"><MapPin size={16} /><span>Durban North</span></div></div><div key={locationMode} className={`location-content location-content--${locationMode}`}><div className="location-toggle"><button className={locationMode === "durban" ? "is-active" : ""} onClick={() => setLocationMode("durban")}>Durban North</button><button className={locationMode === "home" ? "is-active" : ""} onClick={() => setLocationMode("home")}>Our home</button></div><p className="eyebrow">Our location</p><h2>{selectedLocation.title}</h2>{selectedLocation.text ? <p>{selectedLocation.text}</p> : null}<ul>{selectedLocation.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="text-button" onClick={() => goTo("contact")}>Talk to the local team <ArrowRight size={16} /></button></div>
      </section>

      <section id="our-home" className="our-home-section">
        <div className="our-home-heading"><div className="index-label">03 <span>Inside SA-BPO</span></div><p className="eyebrow eyebrow--green">A home for better work</p><div className="our-home-switch" role="tablist" aria-label="Explore the SA-BPO home"><button className={activeHomeTile === "story" ? "is-active" : ""} onClick={() => setActiveHomeTile("story")} role="tab" aria-selected={activeHomeTile === "story"}><span>01</span> Our home</button><button className={activeHomeTile === "benefits" ? "is-active" : ""} onClick={() => setActiveHomeTile("benefits")} role="tab" aria-selected={activeHomeTile === "benefits"}><span>02</span> Benefits</button></div></div>
        <div className={`our-home-mosaic our-home-mosaic--${activeHomeTile}`}>
          <article className="our-home-story"><p className="our-home-kicker">Durban North / SA-BPO</p><h2>{ourHomeExperience.story.title}</h2><p>{ourHomeExperience.story.copy}</p><button className="our-home-tile-action" onClick={() => setActiveHomeTile("benefits")}>See the benefits <ArrowRight size={16} /></button></article>
          <button className="our-home-media our-home-media--reception" onClick={() => setActiveHomeTile("story")} aria-label="Show Our Home story"><img src={ourHomeExperience.story.visual} alt={ourHomeExperience.story.alt} /><span><HeartHandshake size={16} /> {ourHomeExperience.story.label}</span></button>
          <button className="our-home-media our-home-media--operations" onClick={() => setActiveHomeTile("benefits")} aria-label="Show Our Home benefits"><img src={ourHomeExperience.benefits.visual} alt={ourHomeExperience.benefits.alt} /><span><Headphones size={16} /> {ourHomeExperience.benefits.label}</span></button>
          <article className="our-home-benefits"><p className="our-home-kicker">Built around people</p><h3>{ourHomeExperience.benefits.title}</h3><ul>{ourHomeExperience.benefits.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="our-home-tile-action" onClick={() => setActiveHomeTile("story")}>Read our story <ArrowRight size={16} /></button></article>
        </div>
      </section>

      <section id="contact" className="contact-section section-pad"><div className="index-label">04 <span>Start here</span></div><div><p className="eyebrow eyebrow--dark">Let’s make the next conversation count</p><h2>Tell us what<br /><span>needs to move.</span></h2><p>Whether you are scaling support, simplifying operations, or looking for a people-first partner, we are ready to listen.</p><a href="mailto:hello@sa-bpo.com">hello@sa-bpo.com <ArrowUpRight size={20} /></a></div><aside><Sparkles size={19} /><strong>Start with a clearer model.</strong><p>Use the BPO calculator to frame the conversation around your operation.</p><button className="text-button text-button--dark" onClick={() => setShowCalculator(true)}>Build a first view <ArrowRight size={16} /></button></aside></section>

      <footer className="site-footer"><div><img src="/manus-storage/sabpo-logo-original_3f02dc80.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><button onClick={() => goTo("about")}>About SA-BPO</button><button onClick={() => goTo("confidence")}>Why SA-BPO</button><a href="/privacy-policy">Privacy Policy</a><button onClick={() => goTo("top")}>Back to top</button></div><img className="footer-bpo-graphic" src="/manus-storage/bpo-graphic-icons_e057ee9e.svg" alt="SA-BPO BPO service capability graphic" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>

      {showCalculator && <div className="modal-backdrop" onClick={() => setShowCalculator(false)}><div className="calculator-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCalculator(false)} aria-label="Close calculator"><X /></button><div className="calculator-modal-body"><p className="modal-kicker"><Sparkles size={15} /> BPO calculator</p><h2 className="calculator-modal-title">Shape the first<br /><em>conversation.</em></h2><p>Use the inputs to create a simple coverage signal. A full operating model is always tailored with you.</p><label>Specialists <output>{agents}</output><input type="range" min="2" max="40" value={agents} onChange={(event) => setAgents(Number(event.target.value))} /></label><label>Hours per specialist / month <output>{hours}</output><input type="range" min="80" max="220" step="10" value={hours} onChange={(event) => setHours(Number(event.target.value))} /></label><div className="coverage-output"><span>Indicative specialist hours</span><strong>{coverageHours.toLocaleString()}</strong><small>Coverage signal across voice, email, and chat.</small></div></div><div className="calculator-modal-action"><button className="button button--green button--full" onClick={() => { setShowCalculator(false); goTo("contact"); }}>Use this as a starting point <ArrowRight size={16} /></button></div></div></div>}
      {showStatementDetails && <div className="modal-backdrop" onClick={() => setShowStatementDetails(false)}><article className={`statement-dialog statement-dialog--${activeValue.tone}`} onClick={(event) => event.stopPropagation()}><button className="modal-close statement-close" onClick={() => setShowStatementDetails(false)} aria-label="Close statement details"><X /></button><p className="statement-kicker">SA-BPO / {cultureMode === "values" ? "Core value" : "Performance pillar"}</p><div className="statement-icon"><ActiveValueIcon size={30} /></div><h2>{activeValue.title}</h2><p>{activeValue.copy}</p><div className="statement-context"><span>Why it matters</span><p>{activeCulture.description}</p></div><button className="statement-dismiss" onClick={() => setShowStatementDetails(false)}>Close details <X size={15} /></button></article></div>}
    </main>
  );
}
