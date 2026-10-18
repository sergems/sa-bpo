import { useEffect, useState } from "react";
import BrandLockupContent from "@/components/BrandLockupContent";
import { setPageMetadata } from "@/lib/seo";
import { ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Facebook, Linkedin, MapPin, Menu, PhoneCall, X } from "lucide-react";

const facebookUrl = "https://www.facebook.com/profile.php?id=61591312408781";
const linkedinUrl = "https://www.linkedin.com/company/sa-bpo/";
const address = "59 Adelaide Tambo Drive";
const mapUrl = "https://www.google.com/maps/search/?api=1&query=59+Adelaide+Tambo+Drive+Durban+North+South+Africa";

export default function ContactUs() {
  useEffect(() => {
    setPageMetadata({
      title: "Contact SA-BPO | BPO Enquiries, Careers & Locations",
      description: "Contact SA-BPO in Durban North for BPO service enquiries, indicative rates, business partnerships, or recruitment and careers information.",
    });
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="about-page contact-page contact-premium">
      <header className={`site-header site-header--scrolled about-site-header ${menuOpen ? "is-menu-open" : ""}`}>
        <a className="brand-lockup" href="/" onClick={closeMenu} aria-label="SA-BPO home"><BrandLockupContent /></a>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <a href="/about-us" onClick={closeMenu}>About SA-BPO</a>
          <a href="/contact-us" onClick={closeMenu}>Contact Us</a>
          <a className="nav-join" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer" onClick={closeMenu}>Join Our Team <ArrowUpRight size={14} /></a>
          <a className="nav-calculator" href="/?calculator=open" onClick={closeMenu}>BPO calculator <ArrowDownRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="contact-premium-hero">
        <div><p className="contact-premium-kicker">SA-BPO / Contact Us</p><h1>Let’s move<br /><em>forward.</em></h1><p className="contact-premium-hero__lead">Whether you are looking for your next opportunity or a better way to support your customers, start the conversation with SA-BPO.</p></div>
        <figure><img src="/assets/sabpo-our-home-reception.png" alt="SA-BPO reception with branded front desk and wall signage" /><figcaption>Durban North, South Africa</figcaption></figure>
      </section>

      <section className="contact-premium-info">
        <article className="contact-premium-location contact-info-card contact-info-card--location">
          <p className="contact-premium-kicker"><span>01</span> Find us</p>
          <div className="contact-premium-location__title">
            <span className="contact-premium-location__icon"><MapPin size={22} aria-hidden="true" /></span>
            <div><h2>{address}</h2><p>Durban North, South Africa</p></div>
          </div>
          <div className="contact-premium-location__actions">
            <a className="contact-premium-link contact-premium-location__map" href={mapUrl} target="_blank" rel="noreferrer">Open location on map <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="contact-premium-link contact-premium-phone" href="tel:+27310026554" aria-label="Call SA-BPO on 031 002 6554"><PhoneCall size={16} aria-hidden="true" /> 031 002 6554</a>
          </div>
          <span className="contact-premium-location__watermark" aria-hidden="true">SA</span>
        </article>
        <article className="contact-premium-social contact-info-card">
          <p className="contact-premium-kicker"><span>02</span> Keep in touch</p>
          <h2>Follow the<br /><em>conversation.</em></h2>
          <p className="contact-premium-social__note">Find SA-BPO on your preferred network.</p>
          <div className="contact-premium-social__links">
            <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook"><span className="contact-premium-social__icon"><Facebook size={19} aria-hidden="true" /></span><span>Facebook</span><ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn"><span className="contact-premium-social__icon"><Linkedin size={19} aria-hidden="true" /></span><span>LinkedIn</span><ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </article>
      </section>

      <section className="contact-premium-routes">
        <article className="contact-premium-route contact-premium-route--jobs contact-info-card">
          <p className="contact-premium-kicker"><span>03</span> Applications / Looking for jobs</p>
          <div className="contact-premium-route__content">
            <h2>Bring your best <em>work.</em></h2>
            <p>We are always interested in hearing from people who care about customers, teamwork, and doing meaningful work. Send your CV to our recruitment team.</p>
          </div>
          <a className="contact-premium-route__action contact-premium-route__action--jobs" href="https://referral.recruitment.sa-bpo.net/" target="_blank" rel="noreferrer">Join Our Team <ArrowUpRight size={16} aria-hidden="true" /></a>
        </article>
        <article className="contact-premium-route contact-premium-route--business contact-info-card">
          <p className="contact-premium-kicker"><span>04</span> Business enquiries</p>
          <div className="contact-premium-route__content">
            <h2>Build a clearer <em>BPO model.</em></h2>
            <p>Instead of waiting on proposals or calls, use our calculator to provide you with indicative rates in real time!</p>
          </div>
          <a className="contact-premium-route__action contact-premium-route__action--business" href="/?calculator=open">Use the BPO-Calculator <ArrowRight size={16} aria-hidden="true" /></a>
        </article>
      </section>

      <section className="contact-premium-enquiry contact-premium-enquiry--application">
        <a className="contact-premium-enquiry__submit" href="https://referral.recruitment.sa-bpo.net/" target="_blank" rel="noreferrer" aria-label="Open the SA-BPO application form">
          <span>Submit application</span>
          <span className="contact-premium-enquiry__arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
        </a>
      </section>

      <footer className="site-footer about-site-footer"><div><a className="site-footer-brand" href="/" aria-label="SA-BPO home"><BrandLockupContent /></a><p>Our people speak for your brand.</p><a className="site-footer-phone" href="tel:+27310026554" aria-label="Call SA-BPO on 031 002 6554">031 002 6554</a></div><div className="footer-right"><div className="footer-nav"><a href="/#about">Explore SA-BPO</a><a href="/#confidence">Why SA-BPO</a><a href="/about-us">About SA-BPO</a><a href="/contact-us">Contact Us</a><a href="/privacy-policy">Privacy Policy</a><a className="footer-social-link" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook" title="Facebook"><Facebook size={16} aria-hidden="true" /></a><a className="footer-social-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn" title="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a className="footer-top-link" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} aria-hidden="true" /></a></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>
    </main>
  );
}
