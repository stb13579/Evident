import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy | Evident",
  description: "Privacy practices for Evident."
};

export default function PrivacyPage() {
  return (
    <main className="px-4 py-12 text-ink dark:text-mist sm:py-16 lg:py-20">
      <SiteHeader />
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-semibold text-ink dark:text-white">Privacy</h1>
        <p className="text-base text-slate dark:text-mist">Last updated: 27 December 2025</p>
        <section className="space-y-3">
          <p className="text-base text-slate dark:text-mist">
            Evident (“Evident”, “we”, “our”, or “us”) provides a B2B SaaS product that helps teams understand
            company-level usage signals derived from network and event data. We act as a data controller for
            personal data processed through our website and application.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Legal entity: Shaun BROWN — micro-entreprise</li>
            <li>Location: France (European Union)</li>
            <li>Contact: <a href="mailto:dpo@useevident.com" className="text-ink underline dark:text-white">dpo@useevident.com</a></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Our privacy principles</h2>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>We focus on company-level identification, not individual profiling.</li>
            <li>We do not sell personal data.</li>
            <li>We do not use data for advertising or cross-site tracking.</li>
            <li>We minimize retention and aggregate data wherever possible.</li>
          </ul>
          <p className="text-base text-slate dark:text-mist">
            Some customers outside the EU may choose to associate Evident data with user-level identifiers in
            their own systems (e.g., CRM). Evident does not perform this re-identification on their behalf.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Personal data we process</h2>
          <div className="space-y-2 text-base text-slate dark:text-mist">
            <p className="font-semibold text-ink dark:text-white">3.1 Account and contact data</p>
            <p>When you create or manage an account, we may process:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>Authentication identifiers (authentication is handled by Clerk)</li>
            </ul>
          </div>
          <div className="space-y-2 text-base text-slate dark:text-mist">
            <p className="font-semibold text-ink dark:text-white">3.2 Product and technical data</p>
            <p>When using the Evident application, we may process:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>IP addresses</li>
              <li>Timestamps (first seen / last seen)</li>
              <li>Event counts and usage metadata</li>
              <li>Derived company, domain, or organization information</li>
              <li>Configuration and preference data</li>
            </ul>
            <p>IP addresses are considered personal data under GDPR. We process them primarily to derive company-level insights and apply filtering, aggregation, and retention limits.</p>
          </div>
          <div className="space-y-2 text-base text-slate dark:text-mist">
            <p className="font-semibold text-ink dark:text-white">3.3 Website analytics data</p>
            <p>When visiting our website, we may collect:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Page views and navigation events</li>
              <li>Approximate location</li>
              <li>Device and browser information</li>
            </ul>
            <p>This data is collected via Google Analytics 4 (GA4).</p>
          </div>
          <div className="space-y-2 text-base text-slate dark:text-mist">
            <p className="font-semibold text-ink dark:text-white">3.4 Billing data</p>
            <p>Billing and payments are handled by a Merchant of Record (MoR) provider (planned: Paddle). Evident does not store full payment card details.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">What we do not do</h2>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Perform behavioral advertising or ad targeting</li>
            <li>Track users across third-party websites</li>
            <li>Sell or rent personal data</li>
            <li>Use fingerprinting techniques</li>
            <li>Enrich data for individual-level profiling</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Purposes of processing</h2>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Provide and operate the Evident service</li>
            <li>Generate company-level analytics and insights</li>
            <li>Authenticate users and secure accounts</li>
            <li>Monitor performance, reliability, and abuse</li>
            <li>Improve product functionality</li>
            <li>Meet legal and compliance obligations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Legal bases for processing (GDPR)</h2>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Contract performance — providing the service you request</li>
            <li>Legitimate interests — security, fraud prevention, product improvement</li>
            <li>Legal obligations — accounting, compliance, and regulatory requirements</li>
          </ul>
          <p className="text-base text-slate dark:text-mist">We do not generally rely on consent for core product functionality.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Data retention</h2>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Raw technical data (including IP addresses) is retained for a limited period and then aggregated, anonymized, or deleted.</li>
            <li>Account data is retained for the duration of the customer relationship.</li>
            <li>Data may be retained longer where required by law.</li>
            <li>You may request deletion at any time, subject to legal obligations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Data sharing and subprocessors</h2>
          <p className="text-base text-slate dark:text-mist">
            We share data only with trusted service providers necessary to operate the service, including:
          </p>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Hosting & infrastructure: Railway Corporation (EU region — Amsterdam)</li>
            <li>Authentication: Clerk</li>
            <li>Product analytics: Amplitude</li>
            <li>Website analytics: Google Analytics (GA4)</li>
            <li>Payments: Merchant of Record provider (planned: Paddle)</li>
          </ul>
          <p className="text-base text-slate dark:text-mist">
            These providers process data under contractual obligations and appropriate safeguards. We do not share
            data with advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">International data transfers</h2>
          <p className="text-base text-slate dark:text-mist">
            Some service providers may process data outside the European Union. Where this occurs, we rely on
            appropriate safeguards such as:
          </p>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Adequacy decisions where applicable</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Your rights (GDPR)</h2>
          <p className="text-base text-slate dark:text-mist">You have the right to:</p>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Access your personal data</li>
            <li>Request rectification or deletion</li>
            <li>Object to or restrict processing</li>
            <li>Request data portability</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="text-base text-slate dark:text-mist">
            To exercise your rights, contact us at{" "}
            <a href="mailto:dpo@useevident.com" className="text-ink underline dark:text-white">
              dpo@useevident.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Changes to this policy</h2>
          <p className="text-base text-slate dark:text-mist">
            We may update this Privacy Policy from time to time. The latest version will always be available on our
            website, with the effective date clearly indicated.
          </p>
        </section>

        <p className="text-base text-slate dark:text-mist">
          For any questions about data handling or removal, contact us at{" "}
          <a href="mailto:dpo@useevident.com" className="text-ink underline dark:text-white">
            dpo@useevident.com
          </a>
          .
        </p>
        <Link href="/" className="cta-text">
          Back to home
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}
