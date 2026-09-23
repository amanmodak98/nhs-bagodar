'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Invalid credentials');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
          Username
        </label>
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-rule mt-2"
          autoComplete="username"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
          Password
        </label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-rule mt-2"
          autoComplete="current-password"
        />
      </div>
      {error && (
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-sm">
          {error}
        </div>
      )}
      <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}