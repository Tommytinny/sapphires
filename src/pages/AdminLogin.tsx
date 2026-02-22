import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // First verify credentials against the admins table using the server-side function
      const { data: verifyData, error: verifyError } = await supabase.rpc('verify_admin', {
        p_email: email,
        p_password: password,
      });

      if (verifyError) {
        // Help the developer diagnose a missing RPC/function in Supabase
        const msg = verifyError.message || 'Login verification failed';
        console.error('verify_admin RPC error:', verifyError);
        if (msg.toLowerCase().includes('function') && msg.toLowerCase().includes('verify_admin')) {
          setErrorMessage(
            'Server function `verify_admin` not found. Run `db/seed_admin.sql` in the Supabase SQL editor to create the function and ensure the `admins` table exists.'
          );
        } else {
          setErrorMessage(msg);
        }
        setIsSubmitting(false);
        return;
      }

      // rpc returns null/empty if not verified
      const isAdmin = Array.isArray(verifyData) ? verifyData.length > 0 : !!verifyData;
      if (!isAdmin) {
        setErrorMessage('Unauthorized: invalid admin credentials');
        setIsSubmitting(false);
        return;
      }

      // Verified as admin — now sign in with Supabase Auth to create a session
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Supabase signInWithPassword error:', error);
        // Provide actionable guidance when admin record exists but Auth user is missing or password differs
        if (error.message && error.message.toLowerCase().includes('invalid login')) {
          setErrorMessage(
            'Admin record verified, but Supabase Auth rejected the credentials. Create a matching Auth user (Authentication → Users) with the same email/password, or reset the Auth user password to match.'
          );
        } else {
          setErrorMessage(
            error.message || 'Signed-in verification passed but failed to create session. Ensure a matching Auth user exists.'
          );
        }
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage('Login successful — redirecting...');
      setTimeout(() => (window.location.href = '/admin'), 700);
    } catch (err) {
      setErrorMessage('Unexpected error. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-slate-100 p-6">
      <Helmet>
        <title>Admin Login - SAPPHIRES</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md bg-white/80 border border-gray-200 rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Login</h2>

        {errorMessage && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
        {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Your password"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-[#117cb4] text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
