'use client';

import Image from 'next/image';
import Link from 'next/link';
import SignupForm from '../../src/components/auth/SignupForm';
import RouteGuard from '../../src/components/auth/RouteGuard';

export default function SignupPage() {
  return (
    <RouteGuard requireNoAuth>
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
              
              <SignupForm />
              
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
    </RouteGuard>
  );
}