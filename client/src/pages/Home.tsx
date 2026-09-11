/* Human Circuit compact edition: a concise people + process + outcome journey with content revealed through deliberate interaction. */
/* Human Circuit page: people-first editorial navigation with clear, practical routes. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  CircleDotDashed,
  Headphones,
  Headset,
  HeartHandshake,
  LockKeyhole,
  Menu,
  MonitorCheck,
  PhoneCall,
  Presentation,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
  X,
} from "lucide-react";

type CultureMode = "values" | "performance";
type LocationMode = "durban" | "home";
type ServiceFocus = "outbound-sales" | "inbound-customer-service";
type AdvisorTier = "tier-1" | "tier-2";

// Provisional USD monthly rates per full-time advisor at a 160-hour baseline. Replace with approved commercial rates.
const provisionalMonthlyRates: Record<ServiceFocus, Record<AdvisorTier, number>> = {
  "outbound-sales": { "tier-1": 1450, "tier-2": 1850 },
  "inbound-customer-service": { "tier-1": 1250, "tier-2": 1650 },
};

const formatEstimatedUsd = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(value);

const cultureContent = {
  values: {
    eyebrow: "SA-BPO fundamentals",
    title: <>Values that <span>matter.</span></>,
    description: <>We build a service culture around the people doing the work because it is where every customer experience begins.</>,
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
    description: <>Experience, productivity, motivation, and environment are built into the SA-BPO operating model.</>,
    cards: [
      { title: "Experience", copy: "SA-BPO is led by a highly experienced management team, including pioneers of the BPO industry in South Africa. Their combined experience helps create a destination that delivers both customer and employee excellence.", tone: "red", icon: BadgeCheck },
      { title: "Productivity", copy: "We have created a unique and fitting environment for all employees, allowing them to deliver and exceed in their best working environments, backed by world-class infrastructure and robust fail-safes.", tone: "green", icon: CircleDotDashed },
      { title: "Motivation", copy: "Using our decades of experience, we have created a fair and rewarding performance environment that focuses on customer experience and recognises success through rewarding remuneration packages.", tone: "yellow", icon: Trophy },
      { title: "Environment", copy: "A modern, spacious working environment caters for professional focus and personal wellness—an operational home our employees are proud to call their own in the heart of Durban North.", tone: "blue", icon: UsersRound },
    ],
  },
};

const proofPoints = [
  { label: "24/7 service via: Voice / Email / Chat", detail: "Always-on channel readiness keeps customer conversations moving across voice, email, and chat.", icon: PhoneCall, tone: "green" },
  { label: "KPI driven service", detail: "Visible measures connect service delivery, coaching, and business outcomes.", icon: ChartNoAxesCombined, tone: "blue" },
  { label: "Outstanding customer support & delivery", detail: "Dedicated support teams protect every customer moment with practical operational discipline.", icon: Headset, tone: "red" },
  { label: "UK / US / AUS in-house office standards", detail: "Our working environment is designed around the office and service expectations of UK, US, and AUS partners.", icon: MonitorCheck, tone: "yellow" },
  { label: "Most combined experience in SA", detail: "Experienced leadership and specialist teams bring a deep understanding of South African BPO delivery.", icon: UsersRound, tone: "green" },
  { label: "Security & resilience", detail: "Resilient systems, clear controls, and reliable operating practices provide confidence when service matters most.", icon: LockKeyhole, tone: "blue" },
  { label: "Face-to-face consultations", detail: "Direct working sessions create clarity, maintain momentum, and keep the operation closely aligned with your team.", icon: Presentation, tone: "red" },
  { label: "A rewarding & progressive culture", detail: "A people-first environment recognises performance and supports the growth behind sustained delivery.", icon: Award, tone: "yellow" },
  { label: "Onboarding excellence", detail: "Structured implementation turns a new partnership into a focused, well-prepared operating team.", icon: BriefcaseBusiness, tone: "green" },
  { label: "Quality assurance", detail: "Clear checks, feedback, and coaching protect the experience your customers receive.", icon: ShieldCheck, tone: "blue" },
];

const ourHomeSliderSlides = [
  {
    id: "welcome",
    visual: "/assets/sabpo-slider1.jpg",
    alt: "SA-BPO welcome reception with the company team and brand display",
    label: "Welcome to SA-BPO",
  },
  {
    id: "refresh",
    visual: "/assets/sabpo-slider2.jpg",
    alt: "SA-BPO refreshment station with a modern lounge setting",
    label: "A considered workplace",
  },
  {
    id: "amenities",
    visual: "/assets/sabpo-slider3.jpg",
    alt: "SA-BPO facilities with private lockers and modern amenities",
    label: "Built for better work",
  },
  {
    id: "coffee",
    visual: "/assets/sabpo-slider4.jpg",
    alt: "Two SA-BPO colleagues sharing coffee beside the workplace coffee station",
    label: "A workplace with character",
  },
] as const;

const ourHomeExperience = {
  story: {
    title: <>Our <em>Home.</em></>,
    copy: "Making a break from the norm we decided to set up our BPO centre in the heart of Durban North. Just under 10 minutes from the busy Umhlanga and Gateway hubs and less than 25km from King Shaka International Airport, located in the heart of all things Durban. SA-BPO breaking the traditions of the norm to create a better environment for one and all.",
    visual: "/assets/sabpo-our-home-welcome.jpg",
    alt: "SA-BPO reception team welcoming visitors at the Durban North workplace",
    label: "Welcome to SA-BPO",
  },
  benefits: {
    title: <>The Benefits of<br /><em>SA-BPO’s Home.</em></>,
    points: ["Spacious modern working environment", "State of the art network solutions and redundancy", "Daily Grind - In House fresh coffee stations", "Sweet shelf", "Snack n Chat relaxation and break out zones", "Luxurious Amenities", "Construction Site", "Our in-house wellness zone", "Wellness Zone"],
    visual: "/assets/sabpo-our-home-contact-centre.jpg",
    alt: "SA-BPO customer service specialists working in the contact centre",
    label: "A live operating environment",
  },
};

const locationContent = {
  durban: {
    tab: "Durban North",
    title: <>Durban<br /><em>North.</em></>,
    text: "Durban North is known for being the heart and soul of Durban with its Identity being forged over many decades. The benefits are here for all to see and experience. An affluent, family orientated coastal suburb with a strong sense of community pride. It functions as a well established residential and commercial hub to all of Durban, close to major beaches and nature reserves. A destination our Employees get to call home.",
    points: ["Major transport access", "Community culture", "Cost-effective employee amenities"],
    visual: "/assets/moses-mabhida-stadium-durban.jpg",
    alt: "Moses Mabhida Stadium in Durban at dusk",
  },
  home: {
    tab: "Our home",
    title: <>The Benefits of our<br /><em>BPO in Durban North</em></>,
    text: "",
    points: ["Community culture embraced by all at SA BPO.", "Excellent location for all major transport networks.", "Cost effective retail solutions for our employees.", "Away from the Central Hubs of the Industry allowing for a more creative approach to the BPO space for both ourselves and our employees.", "Sun, Sea, Sand and all the trappings of a prime destination but at community driven costs and prices."],
    visual: "/assets/sabpo-our-home-work.jpg",
    alt: "SA-BPO workplace specialist working at a desk in the Durban North office",
  },
};

const locationSliderSlides = [
  {
    id: "home-img",
    visual: "/assets/moses-mabhida-stadium-durban.jpg",
    alt: "Moses Mabhida Stadium in Durban at dusk",
  },
  {
    id: "our-home",
    visual: "/assets/sabpo-operations.png",
    alt: "SA-BPO workplace and operations specialist",
  },
  {
    id: "home-image2",
    visual: "/assets/home-image2.jpg",
    alt: "Lighthouse and palm trees along the Durban North coastline",
  },
] as const;

const heroSlides = [
  {
    id: "people",
    eyebrow: "People-powered operations",
    title: <>Our people <em>speak for</em> your brand.</>,
    copy: "The conversations behind your growth, delivered with local fluency, global standards, and enterprise discipline.",
    primary: "Map your BPO model",
    primaryTarget: "calculator",
    secondary: "Explore SA-BPO",
    secondaryTarget: "about",
    trust: ["Secure & resilient", "QA-led service", "UK / US / AUS aligned"],
    visual: "/assets/sabpo-hero-team-lounge.jpg",
    alt: "SA-BPO customer service team working together in a modern contact centre",
    tone: "people",
  },
  {
    id: "culture",
    eyebrow: "Service culture / people first",
    title: <>Service culture. <em>People first.</em></>,
    copy: "When our people feel supported, your customers feel the difference—in every conversation, every day.",
    primary: "Meet SA-BPO",
    primaryTarget: "about",
    secondary: "See the proof",
    secondaryTarget: "confidence",
    trust: ["People-first culture", "Supported teams", "Better conversations"],
    visual: "/assets/sabpo-home-banner2.jpg",
    alt: "SA-BPO customer service advisor working at a workstation in the contact centre",
    tone: "people",
  },
  {
    id: "in-the-moment",
    eyebrow: "In the moment / in your corner",
    title: <>Every conversation <em>counts.</em></>,
    copy: "Thoughtful advisors, clear collaboration, and the confidence to make every customer moment matter.",
    primary: "Map your BPO model",
    primaryTarget: "calculator",
    secondary: "Meet the team",
    secondaryTarget: "about",
    trust: ["Human-led service", "Coached for quality", "Ready to scale"],
    visual: "/assets/sabpo-slider-home3.jpg",
    alt: "SA-BPO customer service colleagues working together in a contact centre",
    tone: "people",
  },
  {
    id: "better-work",
    eyebrow: "Better work / better outcomes",
    title: <>Built for <em>brighter</em> work.</>,
    copy: "A positive operating environment gives people the space to think clearly, work confidently, and deliver brilliantly.",
    primary: "Explore SA-BPO",
    primaryTarget: "about",
    secondary: "See the proof",
    secondaryTarget: "confidence",
    trust: ["People-first culture", "Practical support", "Consistent delivery"],
    visual: "/assets/sabpo-slider-home4.jpg",
    alt: "Smiling SA-BPO customer service advisor at work with colleagues in the background",
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
  const [activeHomeSlide, setActiveHomeSlide] = useState(0);
  const [activeLocationSlide, setActiveLocationSlide] = useState(0);
  const [locationMode, setLocationMode] = useState<LocationMode>(() => new URLSearchParams(window.location.search).get("location") === "home" ? "home" : "durban");
  const [showCalculator, setShowCalculator] = useState(() => new URLSearchParams(window.location.search).get("calculator") === "open");
  const [showStatementDetails, setShowStatementDetails] = useState(() => new URLSearchParams(window.location.search).get("statement") === "details");
  const [trialAdvisors, setTrialAdvisors] = useState(2);
  const [bauAdvisors, setBauAdvisors] = useState(8);
  const [hours, setHours] = useState(160);
  const [serviceFocus, setServiceFocus] = useState<ServiceFocus[]>([]);
  const [advisorTiers, setAdvisorTiers] = useState<AdvisorTier[]>([]);
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

    // A one-shot timer restarts whenever the slide changes, so manual navigation
    // always receives a complete viewing interval rather than inheriting an
    // almost-finished autoplay interval.
    const sliderTimer = window.setTimeout(() => {
      setActiveHeroSlide((slide) => (slide + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearTimeout(sliderTimer);
  }, [activeHeroSlide, heroPaused]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const sliderTimer = window.setTimeout(() => {
      setActiveHomeSlide((slide) => (slide + 1) % ourHomeSliderSlides.length);
    }, 5600);

    return () => window.clearTimeout(sliderTimer);
  }, [activeHomeSlide]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const sliderTimer = window.setTimeout(() => {
      setActiveLocationSlide((slide) => (slide + 1) % locationSliderSlides.length);
    }, 5600);

    return () => window.clearTimeout(sliderTimer);
  }, [activeLocationSlide]);

  const activeCulture = cultureContent[cultureMode];
  const activeValue = activeCulture.cards[activeValueIndex] ?? activeCulture.cards[0];
  const ActiveValueIcon = activeValue.icon;
  const selectedLocation = locationContent[locationMode];
  const activeHero = heroSlides[activeHeroSlide];
  const ActiveProofIcon = proofPoints[activeProof].icon;
  const trialCoverageHours = useMemo(() => trialAdvisors * hours, [trialAdvisors, hours]);
  const bauCoverageHours = useMemo(() => bauAdvisors * hours, [bauAdvisors, hours]);
  const provisionalRatePerAdvisor = useMemo(() => {
    const selectedRates = serviceFocus.flatMap((service) => advisorTiers.map((tier) => provisionalMonthlyRates[service][tier]));
    if (!selectedRates.length) return 0;
    return Math.round(selectedRates.reduce((total, rate) => total + rate, 0) / selectedRates.length);
  }, [serviceFocus, advisorTiers]);
  const trialMonthlyEstimate = useMemo(() => Math.round(trialAdvisors * provisionalRatePerAdvisor * (hours / 160)), [trialAdvisors, hours, provisionalRatePerAdvisor]);
  const bauMonthlyEstimate = useMemo(() => Math.round(bauAdvisors * provisionalRatePerAdvisor * (hours / 160)), [bauAdvisors, hours, provisionalRatePerAdvisor]);
  const hasPricingSelection = serviceFocus.length > 0 && advisorTiers.length > 0;
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const toggleServiceFocus = (service: ServiceFocus) => {
    setServiceFocus((selected) => selected.includes(service) ? selected.filter((item) => item !== service) : [...selected, service]);
  };
  const toggleAdvisorTier = (tier: AdvisorTier) => {
    setAdvisorTiers((selected) => selected.includes(tier) ? selected.filter((item) => item !== tier) : [...selected, tier]);
  };
  const changeHeroSlide = (direction: 1 | -1) => {
    setActiveHeroSlide((slide) => (slide + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <main className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => goTo("top")} aria-label="SA-BPO home"><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /></button>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <button onClick={() => goTo("about")}>About SA-BPO</button>
          <button onClick={() => goTo("confidence")}>Why SA-BPO</button>
          <a className="nav-join" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer">Join Our Team <ArrowUpRight size={14} /></a>
          <button className="nav-calculator" onClick={() => setShowCalculator(true)}>BPO calculator <ArrowDownRight size={15} /></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className={`hero-section hero-section--${activeHero.tone} ${heroPaused ? "is-paused" : ""}`} role="region" aria-roledescription="carousel" aria-label="SA-BPO introduction">
        <div className="hero-rail"><span /><span /><span /><span /><span /></div>
        <div className="hero-slides">
          {heroSlides.map((slide, index) => {
            const isActive = activeHeroSlide === index;
            return (
              <article key={slide.id} className={`hero-slide hero-slide--${slide.id} ${isActive ? "is-active" : ""}`} aria-hidden={!isActive}>
                <div className="hero-slide__copy-wrap">
                  <p className="eyebrow"><i /> {slide.eyebrow}</p>
                  <div className="hero-copy">
                    <h1>{slide.title}</h1>
                    <p>{slide.copy}</p>
                  </div>
                  <div className="hero-actions">
                    <button className="button button--green" tabIndex={isActive ? 0 : -1} onClick={() => goTo(slide.primaryTarget)}>{slide.primary} <ArrowRight size={17} /></button>
                    <button className="text-button" tabIndex={isActive ? 0 : -1} onClick={() => goTo(slide.secondaryTarget)}>{slide.secondary} <ArrowDownRight size={16} /></button>
                  </div>
                  <div className="hero-trust" aria-label="Client trust and operational standards"><span className="trust-caption">Trusted delivery</span>{slide.trust.map((item, trustIndex) => <span key={item}>{trustIndex === 0 ? <ShieldCheck size={14} /> : trustIndex === 1 ? <BadgeCheck size={14} /> : <CircleDotDashed size={14} />}{item}</span>)}</div>
                </div>
                <div className="hero-slide__media">
                  <img src={slide.visual} alt={isActive ? slide.alt : ""} />
                  <div className="hero-slide__number"><span>0{index + 1}</span><b>SA-BPO / Human signal</b></div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="hero-slider-controls" aria-label="Hero slide controls">
          <div className="hero-slider-status" aria-live="polite"><span>0{activeHeroSlide + 1} / 0{heroSlides.length}</span><b>{activeHero.eyebrow}</b></div>
          <div className="hero-slider-actions">
            <button className="hero-arrow hero-arrow--previous" onClick={() => changeHeroSlide(-1)} aria-label="Previous slide"><ArrowRight size={16} /></button>
            <div className="hero-pagination">{heroSlides.map((slide, index) => <button key={slide.id} className={activeHeroSlide === index ? "is-active" : ""} onClick={() => setActiveHeroSlide(index)} aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`} aria-current={activeHeroSlide === index ? "true" : undefined}><span /></button>)}</div>
            <button className="hero-pause" onClick={() => setHeroPaused(!heroPaused)} aria-label={heroPaused ? "Resume slider" : "Pause slider"}>{heroPaused ? "Play" : "Pause"}</button>
            <button className="hero-arrow" onClick={() => changeHeroSlide(1)} aria-label="Next slide"><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section id="about" className="culture-section section-pad">
        <div className="culture-orbit culture-orbit--one" /><div className="culture-orbit culture-orbit--two" />
        <div className="culture-intro"><div className="index-label"><span>About SA-BPO</span></div><div><p className="eyebrow">The operating culture</p><h2>{activeCulture.title}</h2></div><p className="culture-intro-description">{activeCulture.description}</p></div>
        <div className="culture-mode" role="tablist" aria-label="SA-BPO culture content"><button className={cultureMode === "values" ? "is-active" : ""} onClick={() => { setCultureMode("values"); setActiveValueIndex(0); }} onMouseEnter={() => { setCultureMode("values"); setActiveValueIndex(0); }} onFocus={() => { setCultureMode("values"); setActiveValueIndex(0); }} role="tab" aria-selected={cultureMode === "values"}><span>01</span> Our values</button><button className={cultureMode === "performance" ? "is-active" : ""} onClick={() => { setCultureMode("performance"); setActiveValueIndex(0); }} onMouseEnter={() => { setCultureMode("performance"); setActiveValueIndex(0); }} onFocus={() => { setCultureMode("performance"); setActiveValueIndex(0); }} role="tab" aria-selected={cultureMode === "performance"}><span>02</span> Performance</button></div>
        <div className="value-console"><div className="value-selector" role="tablist" aria-label="Select a SA-BPO value">{activeCulture.cards.map((item, index) => { const Icon = item.icon; return <button key={item.title} className={`value-select value-select--${item.tone} ${activeValueIndex === index ? "is-active" : ""}`} onClick={() => setActiveValueIndex(index)} onMouseEnter={() => setActiveValueIndex(index)} onFocus={() => setActiveValueIndex(index)} role="tab" aria-selected={activeValueIndex === index}><span className="value-number">0{index + 1}</span><span className="value-select-name">{item.title}</span><Icon size={18} /><ArrowRight size={16} /></button>; })}</div><article key={`${cultureMode}-${activeValue.title}`} className={`value-display value-display--${activeValue.tone}`}><div className="value-display-top"><span>SA-BPO / {cultureMode === "values" ? "Core value" : "Performance pillar"}</span><span>0{activeValueIndex + 1} / 04</span></div><div className="value-display-copy"><div className="value-display-icon"><ActiveValueIcon size={34} /></div><h3>{activeValue.title}</h3><p>{activeValue.copy}</p></div><button className="value-details" onClick={() => setShowStatementDetails(true)}>View details <ArrowUpRight size={14} /></button><button className="value-next" onClick={() => setActiveValueIndex((activeValueIndex + 1) % activeCulture.cards.length)}>Next pillar <ArrowRight size={15} /></button><div className="value-display-path"><i /><span /><i /><span /><i /></div><div className="value-display-word">{activeValue.title}</div></article></div>
        <div className="culture-promise"><span className="promise-dot" /><p><strong>People → Process → Outcome.</strong><span className="culture-promise-detail">Every SA-BPO value is designed to improve the experience behind your brand.</span></p><button onClick={() => goTo("confidence")}>See the proof <ArrowRight size={16} /></button></div>
      </section>

      <section id="confidence" className="confidence-section section-pad">
        <div className="section-top section-top--on-dark"><div className="index-label"><span>Why SA-BPO</span></div><div><p className="eyebrow">Partner with confidence</p><h2>Standards you can<br /><em>see in action.</em></h2></div><p className="section-description">Explore the ten operating standards that shape a confident, people-led partnership.</p></div>
        <div className="confidence-icons" role="region" aria-label="SA-BPO service standards">
          <div className="confidence-icon-grid" role="tablist" aria-label="Select a SA-BPO service standard">
            {proofPoints.map((proof, index) => {
              const Icon = proof.icon;
              const isActive = activeProof === index;
              return <button key={proof.label} className={`confidence-icon-card confidence-icon-card--${proof.tone} ${isActive ? "is-active" : ""}`} onClick={() => setActiveProof(index)} onFocus={() => setActiveProof(index)} role="tab" aria-selected={isActive} aria-controls="confidence-standard-detail"><span className="confidence-icon-card__icon"><Icon aria-hidden="true" strokeWidth={1.75} /></span><strong>{proof.label}</strong></button>;
            })}
          </div>
          <article id="confidence-standard-detail" key={activeProof} className={`confidence-standard-detail confidence-standard-detail--${proofPoints[activeProof].tone}`} aria-live="polite"><div className="confidence-standard-detail__icon"><ActiveProofIcon aria-hidden="true" strokeWidth={1.7} /></div><div><span>Selected operating standard</span><h3>{proofPoints[activeProof].label}</h3><p>{proofPoints[activeProof].detail}</p></div><button className="confidence-standard-detail__next" onClick={() => setActiveProof((activeProof + 1) % proofPoints.length)}>Next standard <ArrowRight size={16} /></button></article>
        </div>
      </section>

      <section id="location" className="location-section">
        <div className="location-media" role={locationMode === "durban" ? "region" : undefined} aria-roledescription={locationMode === "durban" ? "carousel" : undefined} aria-label={locationMode === "durban" ? "Durban North location images" : "SA-BPO workplace image"}>{locationMode === "durban" ? <div className="location-slider">{locationSliderSlides.map((slide, index) => <img key={slide.id} className={activeLocationSlide === index ? "is-active" : ""} src={slide.visual} alt={activeLocationSlide === index ? slide.alt : ""} aria-hidden={activeLocationSlide !== index} />)}</div> : <img src={selectedLocation.visual} alt={selectedLocation.alt} />}</div><div key={locationMode} className={`location-content location-content--${locationMode}`}><div className="location-toggle"><button className={locationMode === "durban" ? "is-active" : ""} onClick={() => setLocationMode("durban")}>Durban North</button><button className={locationMode === "home" ? "is-active" : ""} onClick={() => setLocationMode("home")}>Our home</button></div><p className="eyebrow">Our location</p><h2>{selectedLocation.title}</h2>{selectedLocation.text ? <p>{selectedLocation.text}</p> : null}<ul>{selectedLocation.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="text-button" onClick={() => goTo("contact")}>Talk to the local team <ArrowRight size={16} /></button></div>
      </section>

      <section id="our-home" className="our-home-section">
        <div className="our-home-heading"><div className="index-label"><span>Inside SA-BPO</span></div><p className="eyebrow eyebrow--green">A home for better work</p><div className="our-home-switch" role="tablist" aria-label="Explore the SA-BPO home"><button className={activeHomeTile === "story" ? "is-active" : ""} onClick={() => setActiveHomeTile("story")} role="tab" aria-selected={activeHomeTile === "story"}><span>01</span> Our home</button><button className={activeHomeTile === "benefits" ? "is-active" : ""} onClick={() => setActiveHomeTile("benefits")} role="tab" aria-selected={activeHomeTile === "benefits"}><span>02</span> Benefits</button></div></div>
        <div className={`our-home-mosaic our-home-mosaic--${activeHomeTile}`}>
          <article className="our-home-story"><p className="our-home-kicker">Durban North / SA-BPO</p><h2>{ourHomeExperience.story.title}</h2><p>{ourHomeExperience.story.copy}</p><button className="our-home-tile-action" onClick={() => setActiveHomeTile("benefits")}>See the benefits <ArrowRight size={16} /></button></article>
          <div className="our-home-media our-home-media--reception" aria-label="SA-BPO workplace image slider" role="region" aria-roledescription="carousel">
            <div className="our-home-slider">
              {ourHomeSliderSlides.map((slide, index) => <img key={slide.id} className={activeHomeSlide === index ? "is-active" : ""} src={slide.visual} alt={activeHomeSlide === index ? slide.alt : ""} aria-hidden={activeHomeSlide !== index} />)}
            </div>
          </div>
          <button className="our-home-media our-home-media--operations" onClick={() => setActiveHomeTile("benefits")} aria-label="Show Our Home benefits"><img src={ourHomeExperience.benefits.visual} alt={ourHomeExperience.benefits.alt} /><span><Headphones size={16} /> {ourHomeExperience.benefits.label}</span></button>
          <article className="our-home-benefits"><p className="our-home-kicker">Built around people</p><h3>{ourHomeExperience.benefits.title}</h3><ul>{ourHomeExperience.benefits.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button className="our-home-tile-action" onClick={() => setActiveHomeTile("story")}>Read our story <ArrowRight size={16} /></button></article>
        </div>
      </section>

      <section id="contact" className="contact-section section-pad"><div className="contact-section__label index-label"><span>Start here</span></div><div className="contact-section__grid"><div className="contact-section__main"><p className="eyebrow eyebrow--dark">Let’s make the next conversation count</p><h2>Tell us what<br /><span>needs to move.</span></h2><p className="contact-section__copy">Whether you are scaling support, simplifying operations, or looking for a people-first partner, we are ready to listen. Tell us what needs to move, and we will shape a clearer operating conversation around the people and outcomes that matter to your brand.</p><a className="contact-section__email" href="mailto:hello@sa-bpo.com">hello@sa-bpo.com <ArrowUpRight size={20} /></a></div><aside className="contact-section__action"><div className="contact-section__action-icon"><Sparkles size={22} /></div><div><p className="contact-section__action-kicker">BPO calculator</p><strong>Start with a clearer model.</strong><p>Use the BPO calculator to frame the conversation around your operation, then turn your first view into a focused next step.</p></div><button className="contact-section__action-button" onClick={() => setShowCalculator(true)}>Build a first view <ArrowRight size={17} /></button></aside></div></section>

      <footer className="site-footer"><div><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><button onClick={() => goTo("about")}>About SA-BPO</button><button onClick={() => goTo("confidence")}>Why SA-BPO</button><a href="/privacy-policy">Privacy Policy</a><button onClick={() => goTo("top")}>Back to top</button></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>

      {showCalculator && <div className="modal-backdrop" onClick={() => setShowCalculator(false)}><div className="calculator-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCalculator(false)} aria-label="Close calculator"><X /></button><div className="calculator-modal-body"><p className="modal-kicker"><Sparkles size={15} /> BPO calculator</p><h2 className="calculator-modal-title">Shape the first<br /><em>conversation.</em></h2><p>Use the inputs to create a simple coverage signal. A full operating model is always tailored with you.</p><fieldset className="calculator-fieldset"><legend>Service focus</legend><div className="calculator-checklist"><label className="calculator-check"><input type="checkbox" name="service-focus" value="outbound-sales" checked={serviceFocus.includes("outbound-sales")} onChange={() => toggleServiceFocus("outbound-sales")} /><span className="calculator-check__control" aria-hidden="true" /><span><strong>Outbound Sales</strong></span></label><label className="calculator-check"><input type="checkbox" name="service-focus" value="inbound-customer-service" checked={serviceFocus.includes("inbound-customer-service")} onChange={() => toggleServiceFocus("inbound-customer-service")} /><span className="calculator-check__control" aria-hidden="true" /><span><strong>Inbound CS</strong></span></label></div></fieldset><fieldset className="calculator-fieldset"><legend>Advisor tier</legend><div className="calculator-checklist"><label className="calculator-check"><input type="checkbox" name="advisor-tier" value="tier-1" checked={advisorTiers.includes("tier-1")} onChange={() => toggleAdvisorTier("tier-1")} /><span className="calculator-check__control" aria-hidden="true" /><span><strong>Tier 1 Advisor</strong><small>Basic, volume-based work.</small></span></label><label className="calculator-check"><input type="checkbox" name="advisor-tier" value="tier-2" checked={advisorTiers.includes("tier-2")} onChange={() => toggleAdvisorTier("tier-2")} /><span className="calculator-check__control" aria-hidden="true" /><span><strong>Tier 2 Advisor</strong><small>Complex complaints, cancellations, billing, and similar work.</small></span></label></div></fieldset><label>Number of advisors required for trial <output>{trialAdvisors}</output><input type="range" min="1" max="40" value={trialAdvisors} onChange={(event) => setTrialAdvisors(Number(event.target.value))} /></label><label>Number of advisors required for BAU <output>{bauAdvisors}</output><input type="range" min="1" max="40" value={bauAdvisors} onChange={(event) => setBauAdvisors(Number(event.target.value))} /></label><label>Hours per advisor / month <output>{hours}</output><input type="range" min="80" max="220" step="10" value={hours} onChange={(event) => setHours(Number(event.target.value))} /></label><div className="phase-output-grid"><div className="coverage-output"><span>Trial coverage hours</span><strong>{trialCoverageHours.toLocaleString()}</strong><small>Indicative monthly capacity for the trial team.</small></div><div className="coverage-output"><span>BAU coverage hours</span><strong>{bauCoverageHours.toLocaleString()}</strong><small>Indicative monthly capacity for the BAU team.</small></div></div><div className="pricing-output" aria-live="polite"><span>Provisional monthly phase estimates</span>{hasPricingSelection ? <div className="pricing-phase-grid"><div><b>Trial</b><strong>{formatEstimatedUsd(trialMonthlyEstimate)}</strong><small>{trialAdvisors} advisor{trialAdvisors === 1 ? "" : "s"} at the selected provisional rate.</small></div><div><b>BAU</b><strong>{formatEstimatedUsd(bauMonthlyEstimate)}</strong><small>{bauAdvisors} advisor{bauAdvisors === 1 ? "" : "s"} at the selected provisional rate.</small></div></div> : <><strong>—</strong><small>Select at least one service focus and one advisor tier to reveal phase estimates.</small></>}<p>{hasPricingSelection ? `${formatEstimatedUsd(provisionalRatePerAdvisor)} per advisor / month at a 160-hour baseline. Trial and BAU are shown as separate phases and should only be combined if their teams overlap.` : "Provisional USD estimate only. Commercial rates will be confirmed with your operating model."}</p></div><section className="calculator-inclusions" aria-labelledby="calculator-inclusions-title"><div className="calculator-inclusions__heading"><ShieldCheck size={17} aria-hidden="true" /><div><p id="calculator-inclusions-title">Provisional pricing includes</p><span>The provisional estimate includes the people, technology, and operational resilience below.</span></div></div><ul><li>Advisor salary, including competitive Durban rates and commissions</li><li>Dedicated Team Leader — automatically provisioned</li><li>Operations Manager — automatically provisioned</li><li>IT infrastructure and software</li><li>Dell systems</li><li>Microsoft</li><li>Telephony platform</li><li>Reporting suites, including Power BI</li><li>World-class facility and connectivity</li><li>Three links routed across Africa, designed to support 99.9% uptime</li><li>All Tier 1 carriers</li><li>Back-up power and water</li></ul></section></div><div className="calculator-modal-action"><button className="button button--green button--full" onClick={() => { setShowCalculator(false); goTo("contact"); }}>Use this as a starting point <ArrowRight size={16} /></button></div></div></div>}
      {showStatementDetails && <div className="modal-backdrop" onClick={() => setShowStatementDetails(false)}><article className={`statement-dialog statement-dialog--${activeValue.tone}`} onClick={(event) => event.stopPropagation()}><button className="modal-close statement-close" onClick={() => setShowStatementDetails(false)} aria-label="Close statement details"><X /></button><p className="statement-kicker">SA-BPO / {cultureMode === "values" ? "Core value" : "Performance pillar"}</p><div className="statement-icon"><ActiveValueIcon size={30} /></div><h2>{activeValue.title}</h2><p>{activeValue.copy}</p><div className="statement-context"><span>Why it matters</span><p>{activeCulture.description}</p></div><button className="statement-dismiss" onClick={() => setShowStatementDetails(false)}>Close details <X size={15} /></button></article></div>}
    </main>
  );
}
