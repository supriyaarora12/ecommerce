"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../src/context/AuthContext";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Account Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        {user?.photoURL ? (
          <Image 
            src={user.photoURL} 
            alt="Profile" 
            width={32} 
            height={32} 
            className="rounded-full"
          />
        ) : (
          <Image src="/ui/accountdropdown/user.svg" alt="Account" width={32} height={32} />
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-56 text-white shadow-lg border border-gray-200 rounded-md overflow-hidden z-50"
          style={{
            background:
              "linear-gradient(180deg, rgba(49, 46, 46, 0.9) 0%, rgba(89, 65, 92, 0.85) 100%)",
          }}
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-white/20">
            <p className="font-medium text-sm">
              {user?.displayName || user?.email || 'User'}
            </p>
            <p className="text-xs text-gray-300">
              {user?.email}
            </p>
          </div>
          
          <ul className="text-sm">
            <li>
              <Link
                href="/account"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <Image src="/ui/accountdropdown/myaacnt.svg" alt="Account" width={24} height={24} />
                Manage My Account
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <Image src="/ui/accountdropdown/order.svg" alt="Orders" width={24} height={24} />
                My Order
              </Link>
            </li>
            <li>
              <Link
                href="/cancellations"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <Image src="/ui/accountdropdown/icon-cancel.svg" alt="Cancellations" width={24} height={24} />
                My Cancellations
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <Image src="/ui/accountdropdown/Icon-Reviews.svg" alt="Reviews" width={24} height={24} />
                My Reviews
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-white/10"
              >
                <Image src="/ui/accountdropdown/Icon-logout.svg" alt="Logout" width={24} height={24} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}