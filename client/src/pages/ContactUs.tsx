import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, BriefcaseBusiness, Calculator, Facebook, Linkedin, Mail, MapPin, Menu, X } from "lucide-react";

const facebookUrl = "https://www.facebook.com/profile.php?id=61591312408781";
const linkedinUrl = "https://www.linkedin.com/company/sa-bpo/";
const address = "59 Adelaide Tambo Drive";
const mapUrl = "https://www.google.com/maps/search/?api=1&query=59+Adelaide+Tambo+Drive+Durban+North+South+Africa";

export default function ContactUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `BPO enquiry from ${data.get("company") || data.get("name") || "a prospective client"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Surname: ${data.get("surname") || ""}`,
      `Company: ${data.get("company") || ""}`,
      `Position: ${data.get("position") || ""}`,
      `Company email: ${data.get("email") || ""}`,
      `Telephone: ${data.get("telephone") || ""}`,
    ].join("\n");
    window.location.href = `mailto:outsourcing@sa-bpo.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main id="top" className="about-page contact-page">
      <header className={`site-header site-header--scrolled about-site-header ${menuOpen ? "is-menu-open" : ""}`}>
        <a className="brand-lockup" href="/" onClick={closeMenu} aria-label="SA-BPO home"><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /></a>
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}>
          <a href="/about-us" onClick={closeMenu}>About SA-BPO</a>
          <a href="/#confidence" onClick={closeMenu}>Why SA-BPO</a>
          <a className="nav-join" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer" onClick={closeMenu}>Join Our Team <ArrowUpRight size={14} /></a>
          <a className="nav-calculator" href="/?calculator=open" onClick={closeMenu}>BPO calculator <ArrowDownRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="about-main contact-main">
        <div className="about-hero contact-hero">
          <div>
            <p className="about-kicker">SA-BPO / Contact Us</p>
            <h1>Let’s move<br /><em>forward.</em></h1>
          </div>
          <p className="about-summary">Whether you are looking for your next opportunity or a better way to support your customers, start the conversation with SA-BPO.</p>
        </div>

        <div className="contact-page-grid">
          <aside className="contact-page-aside">
            <div className="contact-map-card">
              <div className="contact-map-card__visual"><MapPin size={30} aria-hidden="true" /><span>Durban North</span></div>
              <div className="contact-map-card__body"><p className="about-kicker">Find us</p><h2>{address}</h2><p>Durban North, South Africa</p><a className="contact-page-link" href={mapUrl} target="_blank" rel="noreferrer">Open location on map <ArrowUpRight size={16} /></a></div>
            </div>
            <div className="contact-social-card"><p className="about-kicker">Keep in touch</p><h2>Follow the conversation.</h2><div className="contact-social-links"><a className="contact-social-link contact-social-link--facebook" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook"><Facebook size={19} /> <span>SA-BPO</span><ArrowUpRight size={14} /></a><a className="contact-social-link contact-social-link--linkedin" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn"><Linkedin size={19} /> <span>SA-BPO</span><ArrowUpRight size={14} /></a></div></div>
          </aside>

          <div className="contact-page-content">
            <section className="contact-route contact-route--jobs"><div className="contact-route__icon"><BriefcaseBusiness size={24} /></div><div><p className="about-kicker">Applications / Looking for jobs</p><h2>Bring your best work.</h2><p>We are always interested in hearing from people who care about customers, teamwork, and doing meaningful work. Send your CV to our recruitment team.</p><a className="contact-page-link" href="mailto:recruitement@sa-bpo.co.za?subject=Job%20application">Email your CV <Mail size={16} /></a><a className="contact-email-note contact-email-note--prominent" href="mailto:recruitement@sa-bpo.co.za">recruitement@sa-bpo.co.za</a></div></section>

            <section className="contact-route contact-route--business"><div className="contact-route__icon"><Calculator size={24} /></div><div><p className="about-kicker">Business enquiries</p><h2>Build a clearer BPO model.</h2><p>Use our BPO-Calc — “Calc” is short for Calculator — to frame your operation, or send the requested details directly to our business team.</p><a className="contact-page-link" href="/?calculator=open">Open BPO-Calculator <ArrowRight size={16} /></a><a className="contact-email-note contact-email-note--prominent" href="mailto:outsourcing@sa-bpo.co.za">outsourcing@sa-bpo.co.za</a></div></section>

            <section className="contact-enquiry"><div><p className="about-kicker">Business enquiry details</p><h2>Tell us what needs to move.</h2><p>Share the information below and your email client will prepare an enquiry for outsourcing@sa-bpo.co.za.</p></div><form onSubmit={submitEnquiry} className="contact-enquiry-form"><label>Name<input name="name" required autoComplete="given-name" /></label><label>Surname<input name="surname" required autoComplete="family-name" /></label><label>Company<input name="company" required autoComplete="organization" /></label><label>Position<input name="position" required autoComplete="organization-title" /></label><label>Company email<input type="email" name="email" required autoComplete="email" /></label><label>Telephone number<input type="tel" name="telephone" required autoComplete="tel" /></label><button className="contact-form-submit" type="submit">Prepare business enquiry <ArrowUpRight size={16} /></button></form></section>
          </div>
        </div>
      </section>

      <footer className="site-footer about-site-footer"><div><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><a href="/about-us">About SA-BPO</a><a href="/contact-us">Contact Us</a><a href="/#confidence">Why SA-BPO</a><a href="/privacy-policy">Privacy Policy</a><a className="footer-social-link" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook" title="Facebook"><Facebook size={16} aria-hidden="true" /></a><a className="footer-social-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn" title="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a className="footer-top-link" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} aria-hidden="true" /></a></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>
    </main>
  );
}
