'use client';

import { useEffect, useState } from 'react';
import { UserManager } from '@/components/admin/UserManager';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[] | null>(null);
  useEffect(() => {
    fetch('/api/admin/users', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setUsers(d.items ?? []))
      .catch(() => setUsers([]));
  }, []);
  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Users</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Add or remove admin users. The default <code className="font-mono">admin</code> account cannot be deleted.
        </p>
      </header>
      {users === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <UserManager initial={users} />
      )}
    </div>
  );
}