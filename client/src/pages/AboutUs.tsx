import { useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Facebook, Linkedin, Menu, X } from "lucide-react";

const aboutSections = [
  {
    title: "Built for world-class customer experience",
    body: "SA-BPO is the South African Business Process Outsourcing company that helps international businesses deliver world class customer service experience, streamline their operations and scale their selective markets. Through our talented agents, innovative technology and customer centred approach, we will provide the perfect solution for your business.",
  },
  {
    title: "South Africa’s youngest BPO with the most experience",
    body: "SA’s youngest BPO with the most experience began with a vision to create a more customer focused BPO model that exceeds our clients’ expectations.",
  },
  {
    title: "A 20-year journey in BPO",
    body: "Our story begins with a 20-year journey through the South African BPO market, where our CEO Ralph Naicker joined the BPO industry straight out of school, grew his career in analytics and then operational excellence.",
  },
  {
    title: "A proven track record of disruption",
    body: "In the big 2019 he partnered together with other shareholders and founded Bespoke International Group (BIG) which became a disruptive market entrant which grew to 1400 employees in 4 years and was then acquired by one of the world’s leading BPOs.",
  },
  {
    title: "Ready to disrupt the market again",
    body: "We simply look to disrupt the BPO market yet again.",
  },
];

export default function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="about-page">
      <header className={`site-header site-header--scrolled about-site-header ${menuOpen ? "is-menu-open" : ""}`}>
        <a className="brand-lockup" href="/" onClick={closeMenu} aria-label="SA-BPO home"><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /></a>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <a href="/about-us" onClick={closeMenu}>About SA-BPO</a>
          <a href="/#confidence" onClick={closeMenu}>Why SA-BPO</a>
          <a className="nav-join" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer" onClick={closeMenu}>Join Our Team <ArrowUpRight size={14} /></a>
          <a className="nav-calculator" href="/#calculator" onClick={closeMenu}>BPO calculator <ArrowDownRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="about-main">
        <div className="about-hero">
          <div>
            <p className="about-kicker">SA-BPO / About SA-BPO</p>
            <h1 className="about-hero-title">About <em>SA-BPO.</em></h1>
          </div>
          <div className="about-hero-copy"><h2 className="about-hero-tagline">South African People.<br /><em>International Service.<br /><span className="about-hero-tagline__red">Exceptional Results.</span></em></h2><p className="about-summary">A South African BPO with international ambition, deep operational experience, and a clear focus on exceptional customer outcomes.</p></div>
        </div>

        <div className="about-layout">
          <aside className="about-aside">
            <strong>South African people.</strong>
            <p>International service. Exceptional results.</p>
            <div className="about-image-grid" aria-label="SA-BPO people and workplace imagery">
              <figure className="about-image about-image--large"><img src="/assets/sabpo-hero-workplace-collaboration.jpg" alt="SA-BPO colleagues collaborating in a modern workplace" /><figcaption>People first, in every conversation.</figcaption></figure>
              <figure className="about-image about-image--top"><img src="/assets/sabpo-our-home-reception.png" alt="SA-BPO reception and welcome area" /></figure>
              <figure className="about-image about-image--bottom"><img src="/assets/sabpo-our-home-contact-centre.jpg" alt="SA-BPO customer service specialists at work" /></figure>
            </div>
          </aside>
          <article className="about-article">
            {aboutSections.map((section) => (
              <section className="about-section" key={section.title}>
                <div><h2>{section.title}</h2><p>{section.body}</p></div>
              </section>
            ))}
            <section className="about-contact">
              <p className="about-kicker">Start a conversation</p>
              <h2>Let’s build what’s next.</h2>
              <p>Discover how a people-first approach can support your customers and your business.</p>
              <a className="about-contact-link" href="/contact-us">Talk to our team <ArrowRight size={16} /></a>
            </section>
          </article>
        </div>
      </section>

      <footer className="site-footer about-site-footer"><div><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><a href="/about-us">About SA-BPO</a><a href="/contact-us">Contact Us</a><a href="/#confidence">Why SA-BPO</a><a href="/privacy-policy">Privacy Policy</a><a className="footer-social-link" href="https://www.facebook.com/profile.php?id=61591312408781" target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook" title="Facebook"><Facebook size={16} aria-hidden="true" /></a><a className="footer-social-link" href="https://www.linkedin.com/company/sa-bpo/" target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn" title="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a className="footer-top-link" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} aria-hidden="true" /></a></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>
    </main>
  );
}
