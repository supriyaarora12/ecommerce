'use client';

import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../../src/components/auth/LoginForm';
import RouteGuard from '../../src/components/auth/RouteGuard';

export default function LoginPage() {
  return (
    <RouteGuard requireNoAuth>
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
              
              <LoginForm />
              
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
    </RouteGuard>
  );
}