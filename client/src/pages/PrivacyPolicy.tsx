/* Human Circuit privacy page: a clear, people-first reading experience that uses the same editorial hierarchy as SA-BPO’s homepage. */
import { ArrowLeft } from "lucide-react";

const policySections = [
  {
    title: "Who this notice covers",
    body: "This Privacy Policy explains how SA-BPO handles personal information supplied through this website, through business enquiries, and during conversations about our services. It is intended for website visitors, prospective clients, client contacts, suppliers, and candidates who choose to contact us.",
  },
  {
    title: "Information we may receive",
    body: "We may receive contact details, company information, service requirements, correspondence, and any other information you choose to provide when you contact SA-BPO. We may also receive limited technical information that helps us keep the website secure and understand how it is used.",
  },
  {
    title: "How we use information",
    body: "SA-BPO uses information to respond to enquiries, discuss and deliver services, maintain professional relationships, improve our website and operating model, and meet applicable legal or contractual obligations. We use information only where there is a clear business, legal, or service-related reason to do so.",
  },
  {
    title: "When information is shared",
    body: "We do not sell personal information. Information may be shared with trusted service providers, professional advisers, or partners where this is necessary to operate our business, provide a requested service, protect SA-BPO, or comply with a legal obligation. Those parties should handle information only for the agreed purpose and with appropriate safeguards.",
  },
  {
    title: "Security and retention",
    body: "SA-BPO takes reasonable administrative, technical, and organisational steps to protect information from loss, misuse, unauthorised access, alteration, or disclosure. We keep information only for as long as it is needed for the purpose for which it was collected, to manage our relationship with you, or to meet legal and operational requirements.",
  },
  {
    title: "Your choices",
    body: "You may ask us about the personal information we hold about you, request that we correct inaccurate information, or ask us to delete information where appropriate. Some requests may be limited where SA-BPO needs to retain information for legal, contractual, security, or record-keeping reasons.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <a className="privacy-brand" href="/" aria-label="SA-BPO home"><img src="/assets/sabpo-logo-original.png" alt="SA-BPO" /></a>
        <a className="privacy-home-link" href="/"><ArrowLeft size={16} /> Back to home</a>
      </header>

      <section className="privacy-main">
        <div className="privacy-hero">
          <div><p className="privacy-kicker">SA-BPO / Privacy and data</p><h1>Privacy, with<br /><em>clarity.</em></h1></div>
          <p className="privacy-summary">We treat personal information with the same practical care we bring to customer conversations: clearly, responsibly, and for a defined purpose.</p>
        </div>

        <div className="privacy-layout">
          <aside className="privacy-aside"><strong>Last updated</strong><p>21 August 2026</p><p>This is a working website draft. Review it with qualified legal counsel before publication or reliance.</p></aside>
          <article className="privacy-article">
            <p className="privacy-notice"><strong>Working draft — legal review recommended.</strong> This page explains SA-BPO’s intended approach to privacy in plain language. It should be reviewed and confirmed against SA-BPO’s final practices, contracts, and applicable privacy laws before publication.</p>
            {policySections.map((section, index) => <section className="privacy-section" key={section.title}><span className="privacy-section-number">0{index + 1}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></section>)}
            <section className="privacy-contact"><p className="privacy-kicker">Questions or requests</p><h2>Talk to our team.</h2><p>For privacy questions or requests about personal information, contact SA-BPO at <a href="mailto:hello@sa-bpo.com">hello@sa-bpo.com</a>.</p></section>
          </article>
        </div>
      </section>

      <footer className="privacy-footer">© 2026 SA-BPO. Privacy, with clarity.</footer>
    </main>
  );
}
