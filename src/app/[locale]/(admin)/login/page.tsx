'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-8">
        <h1 className="text-2xl font-bold text-center text-[var(--color-primary)]">
          Admin Login
        </h1>
        {error && (
          <p className="text-sm text-[var(--color-error)] text-center">{error}</p>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[var(--color-primary)] text-[var(--color-text-on-dark)] rounded-[var(--radius-md)] disabled:opacity-50"
        >
          {loading ? '...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}
