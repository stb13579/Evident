import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between pb-8">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/Logo.svg"
          alt="Evident logo"
          width={40}
          height={40}
          className="h-10 w-10 dark:hidden"
          priority
        />
        <Image
          src="/Logo-dark.svg"
          alt="Evident logo"
          width={40}
          height={40}
          className="hidden h-10 w-10 dark:block"
          priority
        />
        <span className="text-base font-semibold text-ink dark:text-mist">
          Evident
        </span>
      </Link>
      <ThemeToggle />
    </header>
  );
}
