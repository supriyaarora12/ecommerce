import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FirebaseError } from "firebase/app";
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await signIn(email.trim(), password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Failed to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500 transition-colors"
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <Link href="/forgot-password" className="text-red-500 hover:text-red-600 text-sm">
            Forget Password?
          </Link>
        </div>
      </form>
      
      <div className="mt-6">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white text-black px-8 py-3 rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Image
            src="/ui/login/Icon-Google.png"
            alt="Google"
            width={20}
            height={20}
          />
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
}