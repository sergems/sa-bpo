/* Human Circuit privacy page: a clear, people-first reading experience that uses the same editorial hierarchy as SA-BPO’s homepage. */
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import BrandLockupContent from "@/components/BrandLockupContent";
import { setPageMetadata } from "@/lib/seo";

const policySections = [
  {
    title: "Who this notice covers",
    body: "This Privacy Policy explains how SA-BPO handles personal information supplied through this website, through business enquiries, and during conversations about our services. It is intended for website visitors, prospective clients, client contacts, suppliers, and candidates who choose to contact us.",
  },
  {
    title: "Information we may receive",
    body: "We may receive contact details, company information, service requirements, correspondence, and any other information you choose to provide when you contact SA-BPO. Calculator details and, when selected, estimate information are sent to partnerships@sa-bpo.co.za when you close the calculator or choose to compose an estimate email. If you submit a completed calculator estimate, a copy of the submission is also sent to your company email. Replies to calculator emails are directed to partnerships@sa-bpo.co.za. We may also receive limited technical information that helps us keep the website secure and understand how it is used. Optional Snitcher data is collected only after you choose to allow business identification.",
  },
  {
    title: "How we use information",
    body: "SA-BPO uses information to prepare indicative calculator estimates, respond to enquiries, discuss and deliver services, maintain professional relationships, improve our website and operating model, and meet applicable legal or contractual obligations. The separate estimate-email draft is addressed to partnerships@sa-bpo.co.za and is sent only if you send it from your email application. We use information only where there is a clear business, legal, or service-related reason to do so.",
  },
  {
    title: "When information is shared",
    body: "We do not sell personal information. Information may be shared with trusted service providers, professional advisers, or partners where this is necessary to operate our business, provide a requested service, protect SA-BPO, or comply with a legal obligation. Those parties should handle information only for the agreed purpose and with appropriate safeguards. If you opt in, Snitcher processes tracker data on our behalf in EU-hosted infrastructure and reports activity to us at company level. We do not configure this trial to send form contents, named-person details, email-recipient identifiers, or identity integrations to Snitcher.",
  },
  {
    title: "Security and retention",
    body: "SA-BPO takes reasonable administrative, technical, and organisational steps to protect information from loss, misuse, unauthorised access, alteration, or disclosure. We keep information only for as long as it is needed for the purpose for which it was collected, to manage our relationship with you, or to meet legal and operational requirements.",
  },
  {
    title: "Your choices",
    body: "You may reject optional Snitcher tracking and still use this website. If you previously allowed it, select Privacy settings and withdraw your choice; we will deny further Snitcher consent, remove the Snitcher device, session, and trait identifiers that this site can remove, and stop loading the tracker for future visits. You may also ask us about the personal information we hold about you, request that we correct inaccurate information, or ask us to delete information where appropriate. Some requests may be limited where SA-BPO needs to retain information for legal, contractual, security, or record-keeping reasons.",
  },
  {
    title: "Cookies, storage and retention",
    body: "Snitcher uses a first-party snitcher_device_id cookie and matching local storage identifier for up to one year, plus a snitcher_session local-storage entry that expires 30 minutes after the last activity. A snitcher_user_traits entry is used only for optional visitor details; this site does not enable the features that create it. Snitcher may briefly use a technical __sn_tld_probe cookie while checking the correct cookie domain. SA-BPO's other records are kept only as long as needed for their stated purpose, our relationship, security, or legal and operational requirements. Snitcher company-level retention is subject to the current Snitcher account and contractual retention settings; we will review those settings before relying on the trial for longer-term records.",
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    setPageMetadata({
      title: "Privacy Policy | SA-BPO",
      description: "Read the SA-BPO privacy policy to learn how personal information is collected, used, shared, protected and retained.",
    });
  }, []);
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <a className="privacy-brand" href="/" aria-label="SA-BPO home"><BrandLockupContent /></a>
        <a className="privacy-home-link" href="/"><ArrowLeft size={16} /> Back to home</a>
      </header>

      <section className="privacy-main">
        <div className="privacy-hero">
          <div><p className="privacy-kicker">SA-BPO / Privacy and data</p><h1>Privacy, with<br /><em>clarity.</em></h1></div>
          <p className="privacy-summary">We treat personal information and optional business intelligence with the same practical care we bring to customer conversations: clearly, responsibly, and for a defined purpose.</p>
        </div>

        <div className="privacy-layout">
          <article className="privacy-article">
            {policySections.map((section, index) => <section className="privacy-section" key={section.title}>
                <span className="privacy-section-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="privacy-section__content">
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </div>
              </section>)}
            <section className="privacy-contact"><p className="privacy-kicker">Questions or requests</p><h2>Talk to our team.</h2><p>For privacy questions or requests about personal information, contact SA-BPO at <a href="mailto:partnerships@sa-bpo.co.za">partnerships@sa-bpo.co.za</a> or call <a href="tel:+27310026554" aria-label="Call SA-BPO on 031 002 6554">031 002 6554</a>.</p></section>
          </article>
        </div>
      </section>

      <footer className="privacy-footer">© 2026 SA-BPO. Privacy, with clarity.</footer>
    </main>
  );
}
