"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const steps = [
  {
    title: "Import product usage data",
    detail: "Upload a CSV or connect to Amplitude in minutes."
  },
  {
    title: "Evident resolves activity",
    detail: "Account-level signals are assembled without user-level tracking."
  },
  {
    title: "Send signals to workflows",
    detail: "Push clean account usage to the tools your teams already use."
  }
];

const personas = [
  "Product-led SaaS teams",
  "Product Marketing & RevOps",
  "Early GTM and account-based motions"
];

export default function Page() {
  const [email, setEmail] = useState("");
  const [wantsFeedback, setWantsFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

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
              Evident resolves raw product usage into clear account-level signals you can
              confidently act on. See which companies are truly using your product and move
              fast with certainty.
            </p>
            <div className="flex flex-col gap-4 sm:max-w-2xl">
              {submitted ? (
                <div className="rounded-2xl border border-mist bg-white px-5 py-4 text-sm text-slate shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist">
                  Thanks — we’ll be in touch soon.
                </div>
              ) : (
                <form className="flex flex-col gap-3" onSubmit={handleSubmit} suppressHydrationWarning>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      suppressHydrationWarning
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-mist bg-white px-4 py-3 text-sm text-ink shadow-inner shadow-white placeholder:text-slate focus:border-ink focus:outline-none focus:ring-2 focus:ring-accentMuted dark:border-[#1f1f1f] dark:bg-[#0f0f0f] dark:text-mist dark:shadow-none dark:placeholder:text-[#8a8a8a]"
                    />
                    <button className="cta-primary whitespace-nowrap" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Joining..." : "Join early access"}
                    </button>
                  </div>
                  <p className="text-xs text-slate dark:text-mist">
                    Early access opens February 2026. No spam. No user-level tracking.
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
                  <h3 className="text-lg font-semibold text-ink dark:text-white">{step.title}</h3>
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
              Analytics tools capture events. GTM tools act on accounts. Evident connects the two
              — without user-level tracking. You get reliable, account-level visibility that your
              teams can use immediately.
            </p>
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
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-mist bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-[#1f1f1f] dark:bg-[#0f0f0f] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                  Starter — €29/month
                </p>
                <p className="text-base text-slate dark:text-mist">
                  Built for self-serve teams getting started with account-level product intelligence.
                </p>
              </div>
              <Link href="#try" className="cta-primary">
                Join early access
              </Link>
            </div>
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
