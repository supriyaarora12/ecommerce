'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', { name, email, password });
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log('Google signup clicked');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen">
        {/* Left Section - Visual Graphic */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <div className="relative w-full h-full">
            <Image
              src="/ui/login/side.png"
              alt="Signup illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Section - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-black mb-2">Create an account</h1>
            <p className="text-gray-600 mb-8">Enter your details below</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
              
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
              
              <button
                type="submit"
                className="w-full bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
              >
                Create Account
              </button>
            </form>
            
            <div className="mt-6">
              <button
                onClick={handleGoogleSignup}
                className="w-full bg-white text-black px-8 py-3 rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
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
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have account?{' '}
                <Link href="/login" className="text-red-500 hover:text-red-600 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
