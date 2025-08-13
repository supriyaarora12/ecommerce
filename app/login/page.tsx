'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen">
        {/* Left Section - Visual Graphic */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-50 items-center justify-center p-8">
          <div className="relative w-full h-full">
            <Image
              src="/ui/login/side.png"
              alt="Login illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-black mb-2">Log in to Exclusive</h1>
            <p className="text-gray-600 mb-8">Enter your details below</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
              
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
                >
                  Log In
                </button>
                <Link href="/forgot-password" className="text-red-500 hover:text-red-600 text-sm">
                  Forget Password?
                </Link>
              </div>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                do not have an account?{' '}
                <Link href="/signup" className="text-red-500 hover:text-red-600 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
