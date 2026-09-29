import { FormEvent, useEffect, useState } from "react";
import BrandLockupContent from "@/components/BrandLockupContent";
import { setPageMetadata } from "@/lib/seo";
import { ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Facebook, Linkedin, MapPin, Menu, X } from "lucide-react";

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
    window.location.href = `mailto:admin@sa-bpo.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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
        <div className="contact-premium-location"><p className="contact-premium-kicker">Find us</p><div className="contact-premium-location__title"><MapPin size={21} /><h2>{address}</h2></div><p>Durban North, South Africa</p><a className="contact-premium-link" href={mapUrl} target="_blank" rel="noreferrer">Open location on map <ArrowUpRight size={16} /></a></div>
        <div className="contact-premium-social"><p className="contact-premium-kicker">Keep in touch</p><h2>Follow the conversation.</h2><div><a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook"><Facebook size={18} /> Facebook <ArrowUpRight size={14} /></a><a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} /></a></div></div>
      </section>

      <section className="contact-premium-routes">
        <article className="contact-premium-route contact-premium-route--jobs">
          <div>
            <p className="contact-premium-kicker">Applications / Looking for jobs</p>
            <h2>Bring your best work.</h2>
            <p>We are always interested in hearing from people who care about customers, teamwork, and doing meaningful work. Send your CV to our recruitment team.</p>
            <a className="contact-premium-link contact-premium-link--button" href="https://referral.recruitment.sa-bpo.net" target="_blank" rel="noreferrer">Join Our Team <ArrowUpRight size={16} /></a>
          </div>
        </article>
        <article className="contact-premium-route contact-premium-route--business">
          <div>
            <p className="contact-premium-kicker">Business enquiries</p>
            <h2>Build a clearer BPO model.</h2>
            <p>Instead of waiting on proposals or calls, use our calculator to provide you with indicative rates in real time!</p>
            <a className="contact-premium-link contact-premium-link--button" href="/?calculator=open">Use the BPO-Calculator <ArrowRight size={16} /></a>
          </div>
        </article>
      </section>

      <section className="contact-premium-enquiry"><div className="contact-premium-enquiry__intro"><p className="contact-premium-kicker">Business enquiry details</p><h2>Make the first move.</h2><p>Complete details below to submit your enquiry to admin@sa-bpo.co.za and explore potential business opportunities with our team!</p></div><form onSubmit={submitEnquiry} className="contact-premium-form"><label>Name<input name="name" required autoComplete="given-name" /></label><label>Surname<input name="surname" required autoComplete="family-name" /></label><label>Company<input name="company" required autoComplete="organization" /></label><label>Position<input name="position" required autoComplete="organization-title" /></label><label>Company email<input type="email" name="email" required autoComplete="email" /></label><label>Telephone number<input type="tel" name="telephone" required autoComplete="tel" /></label><button type="submit">Prepare business enquiry <ArrowUpRight size={16} /></button></form></section>

      <footer className="site-footer about-site-footer"><div><a className="site-footer-brand" href="/" aria-label="SA-BPO home"><BrandLockupContent /></a><p>Our people speak for your brand.</p></div><div className="footer-right"><div className="footer-nav"><a href="/#about">Explore SA-BPO</a><a href="/#confidence">Why SA-BPO</a><a href="/about-us">About SA-BPO</a><a href="/contact-us">Contact Us</a><a href="/privacy-policy">Privacy Policy</a><a className="footer-social-link" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on Facebook" title="Facebook"><Facebook size={16} aria-hidden="true" /></a><a className="footer-social-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="SA-BPO on LinkedIn" title="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a className="footer-top-link" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} aria-hidden="true" /></a></div><img className="footer-bpo-graphic" src="/assets/footer-compliance-latest.png" alt="SA-BPO compliance and quality accreditations" /></div><small>© 2026 SA-BPO. South Africa / Global conversations.</small></footer>
    </main>
  );
}
