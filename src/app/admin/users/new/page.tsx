"use client";

import { useState } from 'react';
import { FaUserPlus, FaCircleCheck } from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';

export default function CreateUser() {
  const [created, setCreated] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode: with Supabase this calls admin.createUser() + profile insert.
    setCreated(true);
    setTimeout(() => setCreated(false), 3000);
  };

  return (
    <AdminShell
      title="Create user"
      subtitle="Add a staff account with elevated platform access."
      active="/admin/users"
    >
      <form onSubmit={submit} className="card p-8 space-y-6 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="field-label">First name</label>
            <input id="firstName" type="text" required placeholder="John" className="field" />
          </div>
          <div>
            <label htmlFor="lastName" className="field-label">Last name</label>
            <input id="lastName" type="text" required placeholder="Doe" className="field" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="field-label">Email address</label>
          <input id="email" type="email" required placeholder="staff@finda.app" className="field" />
        </div>

        <div>
          <label htmlFor="role" className="field-label">Role</label>
          <select id="role" className="field" defaultValue="support">
            <option value="support">Support agent</option>
            <option value="admin">Administrator</option>
          </select>
          <p className="text-xs text-muted mt-1.5">
            Support agents can review approvals; administrators have full platform access.
          </p>
        </div>

        <div>
          <label htmlFor="password" className="field-label">Temporary password</label>
          <input id="password" type="password" required placeholder="••••••••" className="field" />
          <p className="text-xs text-muted mt-1.5">They&apos;ll be prompted to change it at first sign-in.</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {created && (
            <span className="text-sm font-semibold text-success flex items-center gap-1.5" role="status">
              <FaCircleCheck aria-hidden /> Invite sent
            </span>
          )}
          <button type="submit" className="btn-primary">
            <FaUserPlus aria-hidden /> Create user
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
