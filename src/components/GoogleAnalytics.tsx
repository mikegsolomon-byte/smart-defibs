import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: (string | number | object | undefined)[]) => void;
    dataLayer: (string | number | object | undefined)[][];
  }
}

export function GoogleAnalytics() {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!GA_ID || initialized.current) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: (string | number | object | undefined)[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });

    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!GA_ID || !initialized.current) return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}
