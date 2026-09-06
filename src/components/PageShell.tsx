import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

/**
 * Standard page shell for inner app pages: fixed header,
 * consistent top padding, and footer.
 */
export function PageShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />
      <main
        className={
          wide
            ? "pt-28 pb-24 px-6 max-w-7xl mx-auto"
            : "pt-28 pb-24 px-6 max-w-6xl mx-auto"
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

/** Page heading block used across app pages */
export function PageTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        <h1 className="text-display-md font-bold text-ink-900 dark:text-ink-900-inv">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted mt-2 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Sidebar navigation item */
export function SideNavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  if (active) {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 px-4 py-3 bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright rounded-xl font-semibold"
        aria-current="page"
      >
        {icon}
        {label}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5 rounded-xl font-medium transition"
    >
      {icon}
      {label}
    </Link>
  );
}
