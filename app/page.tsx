"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const steps = [
  {
    title: "Import product usage data",
    detail: "Upload a CSV or connect to Amplitude in minutes — get started without engineering tickets.",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-ink dark:text-white"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 17.5v1a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18.5v-1" />
        <path d="M12 4v10" />
        <path d="m8 8 4-4 4 4" />
      </svg>
    )
  },
  {
    title: "Evident resolves activity",
    detail: "IP enrichment, filtering, and deterministic signals map activity to accounts — no user-level tracking.",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-ink dark:text-white"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 6.5a5.5 5.5 0 1 0 5.5 5.5" />
        <path d="M12 9a3 3 0 1 0 3 3" />
        <circle cx="12" cy="12" r="1" />
        <path d="m15 9 5-5" />
        <path d="m19 5 .5 2.5L22 8" />
      </svg>
    )
  },
  {
    title: "Send signals to workflows",
    detail: "Push clean account usage to the tools your teams already use — trigger actions with confidence.",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-ink dark:text-white"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2 6 13h5v7l7-11h-5z" />
      </svg>
    )
  }
];

const personas = [
  "Product-led SaaS teams",
  "Product Marketing & RevOps",
  "Early GTM and account-based motions"
];

const notFor = [
  "Lead reselling or data brokers",
  "Spray-and-pray outbound",
  "Cookie-based retargeting programs"
];

export default function Page() {
  const [email, setEmail] = useState("");
  const [wantsFeedback, setWantsFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [showPricing, setShowPricing] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, wantsFeedback })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setEmail("");
      setWantsFeedback(false);
    } catch (error) {
      setSubmissionError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="px-4 py-12 text-ink dark:text-mist sm:py-16 lg:py-20">
      <SiteHeader />
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <section id="try" className="section-card px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-semibold leading-[1.15] text-ink dark:text-white sm:text-4xl lg:text-4xl lg:leading-[1.1]">
              Turn product usage into reliable account-level intelligence
            </h1>
            <p className="max-w-3xl text-lg text-slate dark:text-mist">
              For product-led SaaS teams and GTM operators who need clarity without user-level tracking.
              Evident resolves raw product usage into account-level signals you can confidently act on.
            </p>
            <div className="flex flex-col gap-4 sm:max-w-2xl">
              {submitted ? (
                <div className="rounded-2xl border border-mist bg-white px-5 py-4 text-sm text-slate shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist">
                  You’re on the early-access list! We’ll keep you updated.
                </div>
              ) : (
                <form className="flex flex-col gap-3" onSubmit={handleSubmit} suppressHydrationWarning>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-ink dark:text-mist" htmlFor="email">
                      Work email
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center" suppressHydrationWarning>
                      <input
                        suppressHydrationWarning
                        required
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        placeholder="you@yourcompany.com"
                        className="w-full rounded-xl border border-mist bg-white px-4 py-3 text-sm text-ink shadow-inner shadow-white placeholder:text-slate focus:border-ink focus:outline-none focus:ring-2 focus:ring-accentMuted dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist dark:shadow-none dark:placeholder:text-[#8a8a8a]"
                      />
                      <button className="cta-primary whitespace-nowrap" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Requesting..." : "Request early access"}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate dark:text-mist">
                    Early access opens Feb 2026 — spaces are limited. No spam. No user-level tracking.
                  </p>
                  <label className="inline-flex items-center gap-2 text-sm text-slate dark:text-mist">
                    <input
                      suppressHydrationWarning
                      type="checkbox"
                      name="wantsFeedback"
                      checked={wantsFeedback}
                      onChange={(event) => setWantsFeedback(event.target.checked)}
                      className="h-4 w-4 rounded border-mist text-ink focus:ring-2 focus:ring-accentMuted dark:border-[#1f1f1f] dark:bg-transparent"
                    />
                    I’m happy to give early feedback
                  </label>
                  {submissionError ? (
                    <p className="text-sm text-accent">{submissionError}</p>
                  ) : null}
                </form>
              )}
              <Link href="#how-it-works" className="cta-text">
                See how it works
              </Link>
            </div>
            <p className="text-xs font-medium text-slate dark:text-mist">
              Built to stay GDPR-friendly.
            </p>
            <div className="rounded-xl border border-mist bg-white/60 px-4 py-3 text-sm text-slate shadow-inner shadow-white dark:border-[#1f1f1f] dark:bg-[#0f0f0f]/60 dark:text-mist dark:shadow-none">
              <p className="font-semibold text-ink dark:text-white">Not for:</p>
              <ul className="ml-4 list-disc space-y-1">
                {notFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section-card px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-accent">How it works</p>
              <h2 className="text-2xl font-semibold text-ink dark:text-white">Three steps to clarity</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="flex flex-col gap-2 rounded-2xl border border-mist bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-[#1f1f1f] dark:bg-[#0f0f0f]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-mist bg-white text-lg text-ink dark:border-[#303030] dark:bg-[#1a1a1a] dark:text-white"
                    >
                      {step.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-ink dark:text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-slate dark:text-mist">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="who" className="section-card px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-accent">Who it is for</p>
            <h2 className="text-2xl font-semibold text-ink dark:text-white">Built for focused B2B teams</h2>
            <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {personas.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-sky px-4 py-3 text-sm font-medium text-slate shadow-inner shadow-white dark:border dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist dark:shadow-none"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="why" className="section-card px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-accent">Why Evident</p>
            <h2 className="text-2xl font-semibold text-ink dark:text-white">Connect action to reality</h2>
            <p className="text-base text-slate dark:text-mist">
              Analytics tools capture events. GTM tools act on accounts. Evident connects the two — without
              user-level tracking. IP enrichment, noise filtering, and deterministic matching give you reliable,
              account-level visibility your teams can use immediately.
            </p>
            <div className="rounded-xl border border-mist bg-white px-4 py-3 text-sm text-slate shadow-inner shadow-white dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist dark:shadow-none">
              <p className="font-semibold text-ink dark:text-white">Proof point</p>
              <p>We aggressively filter cloud, VPN, and shared infrastructure traffic to avoid false positives.</p>
            </div>
          </div>
        </section>

        <section id="privacy" className="section-card px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-accent">Privacy & compliance</p>
            <h2 className="text-2xl font-semibold text-ink dark:text-white">Built to stay GDPR-friendly</h2>
            <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              <li className="rounded-xl bg-sky px-4 py-3 text-sm font-medium text-slate shadow-inner shadow-white dark:border dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist dark:shadow-none">
                No user-level tracking or cookies required.
              </li>
              <li className="rounded-xl bg-sky px-4 py-3 text-sm font-medium text-slate shadow-inner shadow-white dark:border dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist dark:shadow-none">
                GDPR-compliant by design; data stored in the EU.
              </li>
              <li className="rounded-xl bg-sky px-4 py-3 text-sm font-medium text-slate shadow-inner shadow-white dark:border dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist dark:shadow-none">
                Built for privacy-first teams who still need decisive signals.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="pricing"
          className="section-card px-6 py-8 sm:px-8 sm:py-10"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-accent">Pricing preview</p>
              <h2 className="text-2xl font-semibold text-ink dark:text-white">Simple, self-serve</h2>
              <p className="text-sm text-slate dark:text-mist">
                Early access partners receive founder pricing and a free first month. Final plans may change at launch.
              </p>
            </div>
            <details
              className="rounded-2xl border border-mist bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-[#1f1f1f] dark:bg-[#0f0f0f]"
              open={showPricing}
              onToggle={(event) => setShowPricing((event.target as HTMLDetailsElement).open)}
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-ink dark:text-white">
                View pricing preview
                <span className="text-sm text-slate dark:text-mist">{showPricing ? "Hide" : "Show"}</span>
              </summary>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                    Starter — €29/month
                  </p>
                  <p className="text-base text-slate dark:text-mist">
                    Built for self-serve teams getting started with account-level product intelligence.
                  </p>
                </div>
                <Link href="#try" className="cta-primary">
                  Request early access
                </Link>
              </div>
            </details>
            <p className="text-xs text-slate dark:text-mist">
              Higher-volume plans available at launch.
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
