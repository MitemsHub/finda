"use client";

import {
  FaCheck, FaXmark, FaStore, FaEnvelope, FaPhone, FaLocationDot,
  FaBoxOpen, FaBellConcierge,
} from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';
import * as store from '@/lib/data/demo';
import { useStoreVersion } from '@/lib/hooks/useStore';

export default function AdminApprovals() {
  useStoreVersion();
  const pending = store.getPendingBusinesses();

  return (
    <AdminShell
      title="Business approvals"
      subtitle="Review submitted listings before they go live. Verification protects the Finda badge."
      active="/admin/approvals"
    >
      {pending.length === 0 ? (
        <div className="card p-16 text-center">
          <span className="w-16 h-16 rounded-2xl bg-success-soft dark:bg-success/15 text-success flex items-center justify-center mx-auto mb-5">
            <FaCheck className="text-2xl" aria-hidden />
          </span>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
            Approval queue is clear
          </h2>
          <p className="text-muted max-w-sm mx-auto">
            New business submissions from the “List your business” flow will
            appear here for review.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {pending.map((b) => (
            <article key={b.id} className="card p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">{b.name}</h2>
                      <p className="text-sm text-muted mt-0.5">
                        {b.category} · submitted {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <span className="badge-accent shrink-0">Pending review</span>
                  </div>

                  {b.description && (
                    <p className="text-[15px] text-ink-700 dark:text-ink-700-inv leading-relaxed mb-4">
                      {b.description}
                    </p>
                  )}

                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <span className="flex items-center gap-2 text-ink-700 dark:text-ink-700-inv">
                      <FaEnvelope className="text-ink-400 shrink-0" aria-hidden /> {b.email}
                    </span>
                    <span className="flex items-center gap-2 text-ink-700 dark:text-ink-700-inv">
                      <FaPhone className="text-ink-400 shrink-0" aria-hidden /> {b.phone}
                    </span>
                    <span className="flex items-center gap-2 text-ink-700 dark:text-ink-700-inv">
                      <FaLocationDot className="text-ink-400 shrink-0" aria-hidden /> {b.address}, {b.neighborhood}
                    </span>
                  </div>

                  {b.services.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-line-light dark:border-line-dark">
                      <div className="text-xs font-bold uppercase tracking-[0.08em] text-ink-400 dark:text-ink-400-inv mb-2 flex items-center gap-1.5">
                        <FaBellConcierge aria-hidden /> Submitted services ({b.services.length})
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {b.services.map((s) => (
                          <li key={s.name} className="px-3 py-1.5 rounded-lg bg-sunken-light dark:bg-white/5 text-sm">
                            <span className="font-semibold text-ink-900 dark:text-ink-900-inv">{s.name}</span>
                            {s.price && <span className="text-muted"> · {s.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(() => {
                    const submitted = store.getProductsForBusiness(b.id);
                    if (submitted.length === 0) return null;
                    return (
                      <div className="mt-3">
                        <div className="text-xs font-bold uppercase tracking-[0.08em] text-ink-400 dark:text-ink-400-inv mb-2 flex items-center gap-1.5">
                          <FaBoxOpen aria-hidden /> Storefront products ({submitted.length})
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {submitted.map((p) => (
                            <li key={p.id} className="px-3 py-1.5 rounded-lg bg-sunken-light dark:bg-white/5 text-sm">
                              <span className="font-semibold text-ink-900 dark:text-ink-900-inv">{p.name}</span>
                              {p.price && <span className="text-muted"> · {p.price}</span>}
                              {p.stock !== null && <span className="text-ink-400"> · {p.stock} in stock</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex lg:flex-col gap-3 lg:w-40 shrink-0">
                  <button
                    onClick={() => store.approveBusiness(b.id)}
                    className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-success text-white font-semibold rounded-xl hover:brightness-110 transition"
                  >
                    <FaCheck aria-hidden /> Approve
                  </button>
                  <button
                    onClick={() => store.rejectBusiness(b.id)}
                    className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 text-danger font-semibold rounded-xl border border-danger/40 hover:bg-danger-soft dark:hover:bg-danger/10 transition"
                  >
                    <FaXmark aria-hidden /> Reject
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Verification checklist */}
      <div className="mt-8 card p-6">
        <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4 flex items-center gap-2">
          <FaStore className="text-primary dark:text-primary-bright" aria-hidden /> Verification checklist
        </h3>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-ink-700 dark:text-ink-700-inv">
          {[
            'Business license matches the registered name',
            'Address is real and the category is accurate',
            'Phone and email reach the owner',
            'No policy violations or duplicate listings',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <FaCheck className="text-success mt-0.5 shrink-0 text-xs" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
}
