import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FirebaseError } from "firebase/app";
import Image from 'next/image';

export default function SignupForm() {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await signUp(email.trim(), password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Failed to sign up");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Failed to sign up with Google");
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
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-6">
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full bg-white text-black px-8 py-3 rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Image
            src="/ui/login/Icon-Google.png"
            alt="Google"
            width={20}
            height={20}
          />
          <span>Sign up with Google</span>
        </button>
      </div>
    </>
  );
}