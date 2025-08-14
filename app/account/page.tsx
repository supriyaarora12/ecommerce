"use client";

import { useState } from "react";

export default function ManageAccount() {
  const [form, setForm] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Top Row: Breadcrumb + Welcome */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm text-gray-500">
          Home <span className="mx-1">/</span>{" "}
          <span className="text-gray-800">My Account</span>
        </p>
        <p className="text-sm">
          Welcome! <span className="text-red-500 font-medium">Md Rimel</span>
        </p>
      </div>

      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0">
          <nav className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Manage My Account</h3>
              <ul className="space-y-3 x-2 text-sm">
                <li className="text-red-500 font-medium">My Profile</li>
                <li className="text-gray-400">Address Book</li>
                <li className="text-gray-400">My Payment Options</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">My Orders</h3>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-400">My Returns</li>
                <li className="text-gray-400">My Cancellations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">My Wishlist</h3>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white shadow-md rounded-md p-8">
            <h2 className="text-lg font-semibold text-red-500 mb-6">
              Edit Your Profile
            </h2>

            {/* Form */}
            <form className="space-y-6">
              {/* First Name / Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-100"
                  />
                </div>
              </div>

              {/* Email / Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-100"
                  />
                </div>
              </div>

              {/* Password Changes */}
              <div>
                <h3 className="text-sm font-medium mb-2">Password Changes</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={form.currentPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
