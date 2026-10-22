import { useCallback, useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "sa_bpo_snitcher_consent";
const SNITCHER_SCRIPT_ID = "sa-bpo-snitcher-loader";
const SNITCHER_RUNTIME_SCRIPT_ID = "__radar__";
const SNITCHER_STORAGE_KEYS = ["snitcher_device_id", "snitcher_session", "snitcher_user_traits"];

type ConsentChoice = "granted" | "denied" | null;
type SnitcherApi = { giveCookieConsent?: () => void; denyCookieConsent?: () => void };

declare global { interface Window { Snitcher?: SnitcherApi } }

function readStoredChoice(): ConsentChoice {
  try {
    const choice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return choice === "granted" || choice === "denied" ? choice : null;
  } catch { return null; }
}

function removeSnitcherData() {
  SNITCHER_STORAGE_KEYS.forEach((key) => {
    try { window.localStorage.removeItem(key); window.sessionStorage.removeItem(key); } catch { /* storage unavailable */ }
  });
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !name.toLowerCase().startsWith("snitcher_")) return;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}; SameSite=Lax`;
  });
}

function stopSnitcher() {
  window.Snitcher?.denyCookieConsent?.();
  removeSnitcherData();
  document.getElementById(SNITCHER_RUNTIME_SCRIPT_ID)?.remove();
  document.getElementById(SNITCHER_SCRIPT_ID)?.remove();
  delete window.Snitcher;
}

function startSnitcher() {
  if (document.getElementById(SNITCHER_SCRIPT_ID)) return;
  const loader = document.createElement("script");
  loader.id = SNITCHER_SCRIPT_ID;
  loader.type = "text/javascript";
  loader.text = `
    !function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","company","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent","denyCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})}));i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0;i.type="text/javascript";i.id="__radar__";i.setAttribute("data-settings",JSON.stringify(e));i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");var a=document.scripts[0];a.parentNode.insertBefore(i,a)};i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({
      apiEndpoint: "radar.snitcher.com",
      cdn: "cdn.snitcher.com",
      namespace: "Snitcher",
      profileId: "sT6AsYuryF",
      waitForConsent: true,
      features: { formTracking: false, clickTracking: false, downloadTracking: false }
    });
  `;
  document.head.appendChild(loader);
  window.Snitcher?.giveCookieConsent?.();
}

function saveChoice(choice: Exclude<ConsentChoice, null>) {
  try { window.localStorage.setItem(CONSENT_STORAGE_KEY, choice); } catch { /* choice still applies for this page */ }
}

export default function PrivacyConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const storedChoice = readStoredChoice();
    setChoice(storedChoice);
    if (storedChoice === "granted") startSnitcher();
    if (storedChoice === "denied") stopSnitcher();
  }, []);

  const deny = useCallback(() => { saveChoice("denied"); stopSnitcher(); setChoice("denied"); setIsSettingsOpen(false); }, []);
  const grant = useCallback(() => { saveChoice("granted"); startSnitcher(); setChoice("granted"); setIsSettingsOpen(false); }, []);

  return (
    <>
      {choice === null || isSettingsOpen ? (
        <div className="privacy-consent-backdrop" role="presentation">
          <section className="privacy-consent" role="dialog" aria-modal="true" aria-labelledby="privacy-consent-title">
            <div className="privacy-consent__copy">
              <p className="privacy-consent__eyebrow">Your privacy, your choice</p>
              <h2 id="privacy-consent-title">Help us understand business interest.</h2>
              <p>With your permission, SA-BPO uses Snitcher to process your IP address and website activity, estimate which business your visit relates to, and help our sales team prioritise businesses to contact. This uses cookies and browser storage. You can browse without this tracking and change your choice at any time.</p>
              <a href="/privacy-policy" className="privacy-consent__link">Read our privacy and cookie notice</a>
            </div>
            <div className="privacy-consent__actions">
              <button type="button" className="privacy-consent__button privacy-consent__button--primary" onClick={grant}>Allow business identification</button>
              <button type="button" className="privacy-consent__button privacy-consent__button--secondary" onClick={deny}>Reject optional tracking</button>
              {choice !== null ? <button type="button" className="privacy-consent__text-button" onClick={() => setIsSettingsOpen(false)}>Close</button> : null}
            </div>
          </section>
        </div>
      ) : <button type="button" className="privacy-settings-trigger" onClick={() => setIsSettingsOpen(true)}>Privacy settings</button>}
    </>
  );
}
