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
        <p className="text-base text-slate dark:text-mist">
          Evident is designed to keep product usage focused on accounts, not individual users. We
          avoid user-level tracking and keep data handling minimal for GDPR alignment.
        </p>
        <p className="text-base text-slate dark:text-mist">
          For any questions about data handling or removal, contact us at{" "}
          <a href="mailto:dpo@evident.app" className="text-ink underline dark:text-white">
            dpo@evident.app
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
