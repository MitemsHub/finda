"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/session/SessionProvider";
import Header from "@/components/landing/Header";

type RequiredRole = "user" | "business" | "admin";

/**
 * Blocks rendering until a session exists (and matches the role when given).
 * Preserves the intended destination in ?returnTo for sign-in.
 * In demo mode there is no server session, so this guards the UI layer.
 * Live mode: the middleware handles this server-side.
 */
export function AuthGuard({
  role,
  children,
}: {
  role?: RequiredRole;
  children: ReactNode;
}) {
  const { user, loading } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/signin?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper-light dark:bg-paper-dark flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
        <Header />
        <main className="pt-40 pb-24 px-6 text-center max-w-md mx-auto">
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-3">
            Sign in to continue
          </h1>
          <p className="text-muted mb-8">
            This area is for signed-in members. It takes a few seconds to join.
          </p>
          <Link href={`/signin?returnTo=${encodeURIComponent(pathname)}`} className="btn-primary">
            Sign in
          </Link>
        </main>
        <style>{`footer{display:none}`}</style>
      </div>
    );
  }

  if (role && user.role !== role) {
    const home = user.role === "admin" ? "/admin/dashboard" : user.role === "business" ? "/business/dashboard" : "/dashboard";
    return (
      <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
        <Header />
        <main className="pt-40 pb-24 px-6 text-center max-w-md mx-auto">
          <span className="badge-danger mb-4">Wrong account type</span>
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-3">
            This area needs a {role} account
          </h1>
          <p className="text-muted mb-8">
            You&apos;re signed in as a {user.role}. Head to your own dashboard instead.
          </p>
          <Link href={home} className="btn-primary">
            Go to my dashboard
          </Link>
        </main>
        <style>{`footer{display:none}`}</style>
      </div>
    );
  }

  return <>{children}</>;
}
