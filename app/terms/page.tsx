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
          Evident is offered as a self-serve product for teams who want account-level visibility.
          Use is provided as-is. Please ensure your data inputs comply with your company and
          regional policies.
        </p>
        <p className="text-base text-slate dark:text-mist">
          Reach out anytime at{" "}
          <a href="mailto:hello@evident.app" className="text-ink underline dark:text-white">
            hello@evident.app
          </a>{" "}
          if you need support or have questions.
        </p>
        <Link href="/" className="cta-text">
          Back to home
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}
