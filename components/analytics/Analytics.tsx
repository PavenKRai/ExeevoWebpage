"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsEnabled, CONSENT_EVENT, GA_ID, getConsent } from "@/lib/analytics";

/** Loads Google Analytics only after the visitor accepted (nothing is requested from Google before that) and never on staging. */
export function Analytics() {
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    if (!analyticsEnabled) return;
    const sync = () => setGranted(getConsent() === "granted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);
  if (!analyticsEnabled || !granted) return null;
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;window['ga-disable-${GA_ID}']=false;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
