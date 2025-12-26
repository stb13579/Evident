import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms | Evident",
  description: "Terms of service for Evident."
};

export default function TermsPage() {
  return (
    <main className="px-4 py-12 text-ink dark:text-mist sm:py-16 lg:py-20">
      <SiteHeader />
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-semibold text-ink dark:text-white">Terms</h1>
        <p className="text-base text-slate dark:text-mist">
          Evident is offered as a self-serve product for teams who want account-level visibility. Use is
          provided as-is. Please ensure your data inputs comply with your company and regional policies.
        </p>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Refunds and right of withdrawal</h2>
          <p className="text-base text-slate dark:text-mist">
            If you are an EU consumer, you have a 14-day “cooling-off” period from the day of delivery to
            cancel your purchase of services or digital content for any reason. We will refund you in full,
            including any standard shipping costs where applicable.
          </p>
          <p className="text-base text-slate dark:text-mist">
            Once you start using digital content or SaaS features after giving explicit consent to begin
            immediately, you waive the right of withdrawal for that content.
          </p>
          <p className="text-base text-slate dark:text-mist">
            Defective or non-conforming products (anything that does not function as described) can be
            repaired, replaced, or refunded under EU conformity guarantees. Return postage for defective
            goods is covered by Evident.
          </p>
          <div className="space-y-2 text-base text-slate dark:text-mist">
            <p className="font-semibold text-ink dark:text-white">How to request a refund</p>
            <ol className="ml-5 list-decimal space-y-1">
              <li>Contact us at <a href="mailto:hello@useevident.com" className="text-ink underline dark:text-white">hello@useevident.com</a> with “Refund request” in the subject.</li>
              <li>Include the email used for purchase, order/transaction reference, and what went wrong.</li>
              <li>For digital services, we will confirm eligibility and process the refund to the original payment method.</li>
              <li>For any physical items (if ever applicable), we will share the return address. Return shipping is covered for defective goods.</li>
            </ol>
            <p>We aim to review and process refunds within 14 days of approval to the original payment method.</p>
          </div>
          <div className="space-y-2 text-base text-slate dark:text-mist">
            <p className="font-semibold text-ink dark:text-white">Exclusions and timelines</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Personalised services or services already consumed after explicit consent may not be refundable.</li>
              <li>Digital subscriptions are not refundable after use beyond the cooling-off period.</li>
              <li>If a free trial is offered, charges start once the trial ends or when you explicitly upgrade.</li>
            </ul>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-white">Legal notices (France)</h2>
          <p className="text-base text-slate dark:text-mist">
            Evident is operated by Shaun BROWN, entrepreneur individuel (EI), trading under the brand “Evident”.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-base text-slate dark:text-mist">
            <li>Legal name: Shaun BROWN, entrepreneur individuel (EI)</li>
            <li>Contact: <a href="mailto:hello@useevident.com" className="text-ink underline dark:text-white">hello@useevident.com</a></li>
            <li>Business/domiciliation address: 14 rue Clément Rossal, 06000 Nice, France</li>
            <li>Phone: 06 52 07 87 73</li>
            <li>SIREN/SIRET: [add SIREN or SIRET registration]</li>
            <li>VAT status: TVA non applicable — article 293B du CGI (micro-entreprise).</li>
            <li>Hosting provider: Railway Corporation Address: 548 Market St PMB 68956, San Francisco, California 94104 (415) 707-7675</li>
          </ul>
          <p className="text-base text-slate dark:text-mist">
            These legal notices and refund terms are linked in the footer so they can be reviewed before purchase.
          </p>
        </section>
        <Link href="/" className="cta-text">
          Back to home
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}
