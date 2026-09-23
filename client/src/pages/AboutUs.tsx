import { useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Facebook, Linkedin, Menu, X } from "lucide-react";

const aboutSections = [
  {
    title: "A changing BPO landscape",
    body: "After a 20 year journey of building large scale international BPOs, we have come to understand that the business model has changed at a very rapid pace.",
  },
  {
    title: "Human experience, strengthened by technology",
    body: "The rise of technology, costs and margin pressures for clients have made people worry about job security through automation. This led to customer experience being strained by demotivated agents, technology that isn’t fit for purpose or ready for deployment, leaving customers handling time taking longer than needed.",
  },
  {
    title: "Simple. People first.",
    body: "At SA-BPO we are a business that is Simple, putting people and customers first. A business that will disrupt the trends and create an environment where outstanding service is met with a people-first approach, enhanced by technology, thus improving customer experience.",
  },
  {
    title: "Investing in better outcomes",
    body: "We firmly believe that through investing in your people, you can get more value to your customers and overall service that is unrivalled in an ever-changing environment.",
  },
  {
    title: "Community at the centre",
    body: "Community is the centre of our hearts as we aim to invest in early learning and school care, nurturing the future generations of SA-BPO advisors.",
  },
];

export default function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="about-page">
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
            <h1>About <em>SA-BPO.</em></h1>
          </div>
          <p className="about-summary">A people-first BPO model, shaped by experience, strengthened by technology, and grounded in community.</p>
        </div>

        <div className="about-layout">
          <aside className="about-aside">
            <strong>Our point of view</strong>
            <p>Simple operations. Supported people. Better customer experiences.</p>
            <div className="about-image-grid" aria-label="SA-BPO people and workplace imagery">
              <figure className="about-image about-image--large"><img src="/assets/sabpo-hero-workplace-collaboration.jpg" alt="SA-BPO colleagues collaborating in a modern workplace" /><figcaption>People first, in every conversation.</figcaption></figure>
              <figure className="about-image about-image--top"><img src="/assets/sabpo-our-home-reception.png" alt="SA-BPO reception and welcome area" /></figure>
              <figure className="about-image about-image--bottom"><img src="/assets/sabpo-our-home-contact-centre.jpg" alt="SA-BPO customer service specialists at work" /></figure>
            </div>
          </aside>
          <article className="about-article">
            {aboutSections.map((section, index) => (
              <section className="about-section" key={section.title}>
                <span className="about-section-number">0{index + 1}</span>
                <div><h2>{section.title}</h2><p>{section.body}</p></div>
              </section>
            ))}
            <section className="about-contact">
              <p className="about-kicker">Start a conversation</p>
              <h2>Let’s build what’s next.</h2>
              <p>Discover how a people-first approach can support your customers and your business.</p>
              <a className="about-contact-link" href="/#contact">Talk to our team <ArrowRight size={16} /></a>
            </section>
          </article>
        </div>
      </section>

      <footer className="site-footer about-site-footer"><div><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><a href="/about-us">About SA-BPO</a><a href="/#confidence">Why SA-BPO</a><a href="/privacy-policy">Privacy Policy</a><a className="footer-social-link" href="https://www.facebook.com/profile.php?id=61591312408781" target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook" title="Facebook"><Facebook size={16} aria-hidden="true" /></a><a className="footer-social-link" href="https://www.linkedin.com/company/sa-bpo/" target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn" title="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a href="/#top">Back to top</a></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>
    </main>
  );
}
