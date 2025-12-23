import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-mist pt-6 text-sm text-slate dark:border-[#1f1f1f] dark:text-mist sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/privacy" className="hover:text-ink dark:hover:text-white">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-ink dark:hover:text-white">
          Terms
        </Link>
        <a href="mailto:hello@evident.app" className="hover:text-ink dark:hover:text-white">
          Contact
        </a>
      </div>
      <p className="text-xs">No user-level tracking.</p>
    </footer>
  );
}
