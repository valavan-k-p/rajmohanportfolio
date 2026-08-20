import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/roles';
import { isSupabaseConfigured } from '@/config/env';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { EmptyState } from '@/components/common/EmptyState';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Sign in' };

/**
 * Staff sign-in.
 *
 * Deliberately email + password, not the citizens' OTP flow. Staff accounts are
 * provisioned by an administrator, are long-lived, and are not tied to a
 * personal mobile number — and a shared OTP path would let anyone with a phone
 * reach the admin login surface.
 */
export default async function AdminLoginPage() {
  if (!isSupabaseConfigured) {
    return (
      <>
        <h1 className="mb-8 font-display text-h1 text-charcoal-900">Sign in</h1>
        <EmptyState
          title="Not connected"
          body="Admin sign-in requires Supabase. Set the environment variables and run the migrations."
        />
      </>
    );
  }

  // Already signed in as staff — skip the form.
  const session = await getAdminSession();
  if (session) redirect('/admin/dashboard');

  return (
    <div className="mx-auto max-w-[26rem]">
      <h1 className="mb-2 font-display text-h1 text-charcoal-900">Sign in</h1>
      <p className="mb-8 text-meta text-charcoal-700">Staff access only.</p>
      <AdminLoginForm />
    </div>
  );
}
