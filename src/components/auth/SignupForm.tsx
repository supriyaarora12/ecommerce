import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FirebaseError } from "firebase/app";
import Image from 'next/image';
import { useToast } from '../../../app/context/ToastContext';

export default function SignupForm() {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      showError('Please enter your email address');
      return;
    }
    
    if (!password || password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setLoading(true);
      await signUp(email.trim(), password);
      showSuccess('Account created successfully!');
    } catch (err) {
      if (err instanceof FirebaseError) {
        // Handle specific Firebase errors
        if (err.code === 'auth/email-already-in-use') {
          showError('An account with this email already exists. Please try signing in instead.');
        } else if (err.code === 'auth/invalid-email') {
          showError('Please enter a valid email address.');
        } else if (err.code === 'auth/weak-password') {
          showError('Password is too weak. Please choose a stronger password.');
        } else {
          showError(err.message);
        }
      } else {
        showError("Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      showSuccess('Account created successfully with Google!');
    } catch (err) {
      if (err instanceof FirebaseError) {
        // Handle specific Firebase errors
        if (err.code === 'auth/operation-not-allowed') {
          showError('Google sign-in is not enabled. Please contact support or try email sign-up.');
        } else if (err.code === 'auth/popup-closed-by-user') {
          showError('Sign-up was cancelled. Please try again.');
        } else if (err.code === 'auth/popup-blocked') {
          showError('Popup was blocked. Please allow popups for this site and try again.');
        } else if (err.code === 'auth/account-exists-with-different-credential') {
          showError('An account already exists with this email using a different sign-in method.');
        } else {
          showError(err.message);
        }
      } else {
        showError("Failed to sign up with Google. Please try again.");
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
            placeholder="Email"
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
        <p className="text-xs text-gray-500 mt-2 text-center">
          Having trouble with Google sign-up? Try email sign-up above.
        </p>
      </div>
    </>
  );
}