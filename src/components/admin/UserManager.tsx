'use client';

import { useState } from 'react';

interface User {
  id: number;
  username: string;
  displayName?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
}

const ROLES = ['admin', 'editor', 'viewer'];

function fmtDate(iso?: string | null) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

function fmtRel(iso?: string | null) {
  if (!iso) return 'never';
  try {
    const d = new Date(iso).getTime();
    const diff = Date.now() - d;
    const min = Math.round(diff / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return `${min}m ago`;
    const hr = Math.round(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.round(hr / 24);
    return `${day}d ago`;
  } catch {
    return '—';
  }
}

export function UserManager({ initial }: { initial: User[] }) {
  const [users, setUsers] = useState(initial);
  const [draft, setDraft] = useState({ username: '', password: '', displayName: '', role: 'editor' });
  const [err, setErr] = useState<string | null>(null);

  async function add() {
    setErr(null);
    if (!draft.username || !draft.password) {
      setErr('Username and password are required');
      return;
    }
    try {
      const r = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(draft),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data.error || 'Failed');
      }
      const data = await r.json();
      setUsers((p) => [
        ...p,
        { ...draft, id: data.id, isActive: true, createdAt: new Date().toISOString(), lastLoginAt: null },
      ]);
      setDraft({ username: '', password: '', displayName: '', role: 'editor' });
    } catch (e: any) {
      setErr(e.message);
    }
  }

  async function toggleActive(u: User) {
    const next = { ...u, isActive: !u.isActive };
    setUsers((p) => (p.map((x) => (x.id === u.id ? next : x))));
    await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: u.id, isActive: next.isActive }),
    });
  }

  async function remove(id: number) {
    if (!confirm('Delete this user?')) return;
    setUsers((p) => p.filter((x) => x.id !== id));
    await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id }),
    });
  }

  async function resetPassword(u: User) {
    const pwd = prompt(`Reset password for ${u.username}? Enter new password:`);
    if (!pwd) return;
    setUsers((p) => p.map((x) => (x.id === u.id ? x : x)));
    await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: u.id, password: pwd }),
    });
  }

  return (
    <div className="space-y-10">
      <section className="card-hair">
        <h2 className="font-display text-lg text-ink mb-4">Add user</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Username</label>
            <input value={draft.username} onChange={(e) => setDraft({ ...draft, username: e.target.value })} className="input-rule mt-1" placeholder="e.g. principal" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Password</label>
            <input type="password" value={draft.password} onChange={(e) => setDraft({ ...draft, password: e.target.value })} className="input-rule mt-1" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Display name</label>
            <input value={draft.displayName} onChange={(e) => setDraft({ ...draft, displayName: e.target.value })} className="input-rule mt-1" placeholder="e.g. Sri Rajesh Kumar Mahto" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Role</label>
            <select value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className="input-rule mt-1 bg-paper">
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
        {err && <div className="text-sm text-amber-700 mt-3">{err}</div>}
        <div className="mt-4">
          <button onClick={add} className="btn-primary">Add user</button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-4">All users ({users.length})</h2>
        <div className="border-y border-rule overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Username</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell">Display name</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Role</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden lg:table-cell">Last login</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Status</th>
                <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-rule-soft">
                  <td className="py-2 pr-3 font-mono text-ink">{u.username}</td>
                  <td className="py-2 pr-3 text-slate-700 hidden md:table-cell">{u.displayName || '—'}</td>
                  <td className="py-2 pr-3">
                    <span className={'pill text-[10px] ' + (u.role === 'admin' ? 'pill-forest' : '')}>{u.role}</span>
                  </td>
                  <td className="py-2 pr-3 text-slate-500 text-xs hidden lg:table-cell">{fmtRel(u.lastLoginAt)}</td>
                  <td className="py-2 pr-3">
                    <span className={'pill text-[10px] ' + (u.isActive ? 'pill-forest' : '')}>{u.isActive ? 'active' : 'disabled'}</span>
                  </td>
                  <td className="py-2 text-right">
                    <button onClick={() => resetPassword(u)} className="btn-link text-xs mr-3">Reset PW</button>
                    <button onClick={() => toggleActive(u)} className="btn-link text-xs mr-3">{u.isActive ? 'Disable' : 'Enable'}</button>
                    <button onClick={() => remove(u.id)} className="text-amber-700 hover:underline text-xs" disabled={u.username === 'admin'}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          The <code className="font-mono">admin</code> user cannot be deleted. Roles: <code className="font-mono">admin</code> (full access), <code className="font-mono">editor</code> (manage notices/faculty), <code className="font-mono">viewer</code> (read-only).
        </p>
      </section>
    </div>
  );
}