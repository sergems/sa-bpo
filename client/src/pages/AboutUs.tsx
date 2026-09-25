import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Linkedin,
  Menu,
  X,
} from "lucide-react";

const principles = [
  ["Experience", "Industry knowledge and operational experience."],
  ["Innovation", "New ideas, technology and approaches to BPO operations."],
  ["Customer-Centric", "Solutions designed around our clients and their customers."],
  ["Continuous Improvement", "Constantly evolving our processes, people and service delivery."],
];

export default function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePrinciple, setActivePrinciple] = useState(0);

  useEffect(() => {
    document.title = "About SA-BPO | South African BPO & Global Outsourcing";
    const description =
      "Discover SA-BPO, a South African outsourcing company delivering world-class customer experiences through experienced people, innovative technology and customer-centric BPO solutions.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const active = principles[activePrinciple];

  return (
    <main id="top" className="about-page about-redesign about-premium">
      <header className={`site-header site-header--scrolled about-site-header ${menuOpen ? "is-menu-open" : ""}`}>
        <a className="brand-lockup" href="/" onClick={closeMenu} aria-label="SA-BPO home">
          <img src="/assets/sabpo-logo-original.png" alt="SA-BPO" />
        </a>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <a href="/about-us" onClick={closeMenu}>About SA-BPO</a>
          <a href="/#confidence" onClick={closeMenu}>Why SA-BPO</a>
          <a className="nav-join" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer" onClick={closeMenu}>Join Our Team <ArrowUpRight size={14} /></a>
          <a className="nav-calculator" href="/#calculator" onClick={closeMenu}>BPO calculator <ArrowDownRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="about-premium-hero about-premium-hero--animated" aria-label="SA-BPO animated statement">
        <h1><span>South African people.</span><span>Global service.</span><span>Exceptional results.</span></h1>
      </section>

      <section className="about-premium-intro">
        <div className="about-premium-intro__heading"><p className="about-premium-kicker">Who we are</p><h2>A South African BPO built for a <em>global conversation.</em></h2></div>
        <div className="about-premium-intro__body"><p>SA-BPO is a South African outsourcing company that partners with global businesses to deliver world-class customer experiences across the omnichannel space.</p><p>We help our partners streamline efficiencies, support scalability and achieve sustainable growth within their respective markets. Through our talented team of specialists, innovative technology, compliant environment and customer-centric approach, we provide solutions designed around the specific needs of your business and your customers.</p></div>
        <figure className="about-premium-intro__media"><img src="/assets/sabpo-our-home-welcome.jpg" alt="People gathered at the SA-BPO reception" /></figure>
      </section>

      <section className="about-premium-experience">
        <figure className="about-premium-experience__media"><img src="/assets/sabpo-hero-team-lounge.jpg" alt="SA-BPO team members collaborating in a lounge" /></figure>
        <div className="about-premium-experience__copy"><p className="about-premium-kicker about-premium-kicker--yellow">A young operator with depth</p><h2>Young Company.<br /><em>Decades of Experience.</em></h2><p>We are proud to be one of South Africa's youngest BPO operators, collectively bringing decades of experience, know-how and innovation to the outsourcing industry.</p><div className="about-premium-stat"><strong>20+</strong><span>Years of international BPO experience</span></div></div>
      </section>

      <section className="about-premium-leadership">
        <div className="about-premium-portrait" aria-label="Portrait placeholder for Ralph Naicker"><span>RN</span><small>Leadership profile</small></div>
        <div className="about-premium-leadership__copy"><p className="about-premium-kicker">Experience that leads from the front</p><h2>Ralph <em>Naicker.</em></h2><p className="about-premium-role">Chief Executive Officer</p><p>SA-BPO CEO Ralph Naicker began his journey in the international BPO sector 20 years ago. Working across all elements of the industry, from advisor to analytics, Ralph continued to progress through the industry to become the CEO of one of South Africa's fastest-growing BPOs, Bespoke International Group.</p><p>Ralph oversaw the company's growth to approximately 1,500 advisors within a four-year period, while navigating and supporting the business and its employees through a global pandemic.</p><div className="about-premium-facts"><div><strong>20+</strong><span>Years in international BPO</span></div><div><strong>1,500</strong><span>Advisors reached during his previous leadership journey</span></div></div></div>
      </section>

      <section className="about-premium-break"><img src="/assets/sabpo-hero-workplace-collaboration.jpg" alt="SA-BPO colleagues collaborating on customer experience operations" /><div><p className="about-premium-kicker about-premium-kicker--yellow">The work behind the conversation</p><p>Every customer interaction is supported by people who care about getting the details right.</p></div></section>

      <section className="about-premium-belong"><div className="about-premium-belong__heading"><p className="about-premium-kicker">More than a workplace</p><h2>A place to <em>belong.</em></h2></div><div className="about-premium-belong__body"><p>This is reflected in the location we have carefully selected, the environment we have created and the solutions we present to you, our valued client.</p><p>Industry-leading salaries make SA-BPO a destination for all. Our location allows our people to be part of an established community at the heart of Durban, while the premises we selected and converted gives our employees a place they get to call home.</p></div><figure><img src="/assets/sabpo-our-home-work.jpg" alt="SA-BPO specialist working in the office" /></figure></section>

      <section className="about-premium-roots"><div className="about-premium-roots__copy"><p className="about-premium-kicker about-premium-kicker--yellow">Our roots</p><h2>Proudly South African.<br /><em>Globally Connected.</em></h2><p>South African talent, connected to the world through every customer conversation.</p></div><figure><img src="/assets/sabpo-hero-global-delivery.png" alt="SA-BPO team collaborating with a Durban city view" /></figure></section>

      <section className="about-premium-approach"><div className="about-premium-approach__heading"><p className="about-premium-kicker">What we stand for</p><h2>Disrupt the expected.<br /><em>Improve the everyday.</em></h2><p>With a management and support team rich in experience and knowledge, we have prided ourselves on becoming a disruptor within the BPO space; bringing innovation, change and continuous improvement to all aspects of day-to-day BPO operations.</p></div><div className="about-premium-principles" role="tablist" aria-label="SA-BPO principles">{principles.map(([title], index) => <button key={title} className={index === activePrinciple ? "is-active" : ""} onMouseEnter={() => setActivePrinciple(index)} onFocus={() => setActivePrinciple(index)} onClick={() => setActivePrinciple(index)} role="tab" aria-selected={index === activePrinciple}><strong>{title}</strong><ArrowRight size={16} /></button>)}<p>{active[1]}</p></div></section>

      <footer className="site-footer about-site-footer"><div><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><a href="/about-us">About SA-BPO</a><a href="/contact-us">Contact Us</a><a href="/#confidence">Why SA-BPO</a><a href="/privacy-policy">Privacy Policy</a><a className="footer-social-link" href="https://www.facebook.com/profile.php?id=61591312408781" target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook" title="Facebook"><Facebook size={16} aria-hidden="true" /></a><a className="footer-social-link" href="https://www.linkedin.com/company/sa-bpo/" target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn" title="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a className="footer-top-link" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} aria-hidden="true" /></a></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>
    </main>
  );
}
