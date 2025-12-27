"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

type ConsentState = "pending" | "granted" | "denied";

type AnalyticsContextValue = {
  trackEvent: (action: string, params?: Record<string, unknown>) => void;
  consentState: ConsentState;
  requiresConsent: boolean;
  acceptConsent: () => void;
  declineConsent: () => void;
  isTrackingEnabled: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackEvent: () => {},
  consentState: "pending",
  requiresConsent: false,
  acceptConsent: () => {},
  declineConsent: () => {},
  isTrackingEnabled: false
});

const FORCE_CONSENT_BANNER = process.env.NEXT_PUBLIC_FORCE_CONSENT_BANNER === "true";

const GDPR_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "GB",
  "UK",
  "IS",
  "LI",
  "NO",
  "CH"
]);

const CONSENT_STORAGE_KEY = "evident-ga-consent";

function isGdprRegion(countryCode?: string | null) {
  if (!countryCode) return false;
  return GDPR_COUNTRIES.has(countryCode.toUpperCase());
}

function inferCountryFromNavigator(): string | null {
  if (typeof window === "undefined") return null;

  const languages = window.navigator.languages || [];
  const primary = languages.find(Boolean) || window.navigator.language;

  if (primary) {
    const parts = primary.split("-");
    if (parts.length > 1) {
      return parts[1].toUpperCase();
    }
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz && tz.includes("/")) {
    const region = tz.split("/")[0];
    if (region === "Europe") {
      return "EU";
    }
  }

  return null;
}

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (stored === "granted" || stored === "denied") {
    return stored;
  }

  return null;
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

type AnalyticsProviderProps = {
  measurementId?: string | null;
  countryCode?: string | null;
  children: ReactNode;
};

export function AnalyticsProvider({ measurementId, countryCode, children }: AnalyticsProviderProps) {
  const [resolvedCountry] = useState<string | null>(() => countryCode ?? inferCountryFromNavigator());
  const requiresConsent = useMemo(
    () => FORCE_CONSENT_BANNER || isGdprRegion(resolvedCountry),
    [resolvedCountry]
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString();
  const [consentState, setConsentState] = useState<ConsentState>(() => {
    const stored = readStoredConsent();
    if (stored) return stored;

    const initialCountry = countryCode ?? inferCountryFromNavigator();
    return (FORCE_CONSENT_BANNER || isGdprRegion(initialCountry)) ? "pending" : "granted";
  });
  const [isGtagReady, setIsGtagReady] = useState(false);
  const hasConfiguredRef = useRef(false);

  const updateConsentOnGtag = useCallback(
    (status: ConsentState) => {
      if (!window.gtag) return;
      const consentValue = status === "granted" ? "granted" : "denied";
      window.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: consentValue,
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: consentValue,
        personalization_storage: "denied",
        security_storage: "granted",
        wait_for_update: 500
      });
    },
    []
  );

  const configureAnalytics = useCallback(() => {
    if (!measurementId || !window.gtag || hasConfiguredRef.current) return;
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      page_path: window.location.pathname,
      page_location: window.location.href
    });
    hasConfiguredRef.current = true;
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || !isGtagReady) return;

    if (!requiresConsent || consentState === "granted") {
      updateConsentOnGtag("granted");
      configureAnalytics();
    } else if (consentState === "denied" || consentState === "pending") {
      updateConsentOnGtag("denied");
    }
  }, [consentState, configureAnalytics, isGtagReady, measurementId, requiresConsent, updateConsentOnGtag]);

  const isTrackingEnabled = Boolean(measurementId) && isGtagReady && consentState === "granted";

  const trackPageView = useCallback(() => {
    if (!isTrackingEnabled || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href
    });
  }, [isTrackingEnabled, pathname]);

  useEffect(() => {
    if (!isTrackingEnabled || !window.gtag) return;
    trackPageView();
  }, [isTrackingEnabled, searchParamsString, trackPageView]);

  const trackEvent = useCallback(
    (action: string, params?: Record<string, unknown>) => {
      if (!isTrackingEnabled || !window.gtag) return;
      window.gtag("event", action, params);
    },
    [isTrackingEnabled]
  );

  const persistConsent = useCallback((value: ConsentState) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  }, []);

  const acceptConsent = useCallback(() => {
    persistConsent("granted");
    setConsentState("granted");
  }, [persistConsent]);

  const declineConsent = useCallback(() => {
    persistConsent("denied");
    setConsentState("denied");
  }, [persistConsent]);

  const showBanner = Boolean(measurementId) && requiresConsent && consentState === "pending";

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        consentState,
        requiresConsent,
        acceptConsent,
        declineConsent,
        isTrackingEnabled
      }}
    >
      {measurementId ? (
        <>
          <Script id="gtag-base" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              window.gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                functionality_storage: 'denied',
                personalization_storage: 'denied',
                security_storage: 'granted'
              });
            `}
          </Script>
          <Script
            id="gtag-js"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            onLoad={() => setIsGtagReady(true)}
          />
        </>
      ) : null}

      {children}

      {showBanner ? (
        <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-mist bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.1)] dark:border-[#1f1f1f] dark:bg-[#0f0f0f]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm text-ink dark:text-mist">
              <p className="font-semibold text-ink dark:text-white">Analytics consent</p>
              <p>
                We use Google Analytics for page views and the waitlist form. Tracking stays off until you grant
                consent. IPs stay anonymized.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="cta-primary px-4 py-2"
                onClick={acceptConsent}
              >
                Accept analytics
              </button>
              <button
                type="button"
                className="rounded-full border border-mist px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink dark:border-[#1f1f1f] dark:text-mist dark:hover:border-[#2b2b2b]"
                onClick={declineConsent}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AnalyticsContext.Provider>
  );
}
