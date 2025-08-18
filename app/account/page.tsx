"use client";

import { useState, useEffect } from "react";
import RouteGuard from "../../src/components/auth/RouteGuard";
import { useAuth } from "../../src/context/AuthContext";

export default function ManageAccount() {
  const { user, saveUserDoc } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      const nameParts = user.displayName?.split(" ") || ["", ""];
      setForm({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        address: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const displayName = `${form.firstName} ${form.lastName}`.trim();
      await saveUserDoc({
        displayName,
        // Add other fields as needed
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RouteGuard requireAuth>
      <div className="container mx-auto px-4 py-10">
        {/* Top Row */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-500">
            Home <span className="mx-1">/</span>{" "}
            <span className="text-gray-800">My Account</span>
          </p>
          <p className="text-sm">
            Welcome! <span className="text-red-500 font-medium">{user?.displayName || user?.email}</span>
          </p>
        </div>

        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="w-60 flex-shrink-0">
            <nav className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Manage My Account</h3>
                <ul className="space-y-3 text-sm">
                  <li className="text-red-500 font-medium">My Profile</li>
                  <li className="text-gray-400">Address Book</li>
                  <li className="text-gray-400">My Payment Options</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">My Orders</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="/orders" className="text-red-500 hover:text-red-600">View All Orders</a>
                  </li>
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
              <h2 className="text-lg font-semibold text-red-500 mb-6">Edit Your Profile</h2>

              {message && (
                <div
                  className={`mb-4 p-3 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {message}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      disabled
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
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>

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

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-md disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
