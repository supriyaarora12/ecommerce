import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FirebaseError } from "firebase/app";


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

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button disabled={loading} type="submit">{loading ? 'Logging in...' : 'Log in'}</button>
      <button type="button" onClick={signInWithGoogle}>Continue with Google</button>
    </form>
  );
}