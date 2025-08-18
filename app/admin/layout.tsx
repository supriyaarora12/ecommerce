"use client";


import { useAdmin } from "../../src/context/AdminContext";
import RouteGuard from "../../src/components/auth/RouteGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useAdmin();
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/order", label: "Orders", icon: "📦" },
    { href: "/admin/products", label: "Products", icon: "🛍️" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <RouteGuard requireAuth>
      {isAdmin ? (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Admin Dashboard
                  </span>
                  <Link 
                    href="/" 
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Back to Store
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
              {/* Sidebar */}
              <aside className="w-64 flex-shrink-0">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-red-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
            <Link 
              href="/" 
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </RouteGuard>
  );
}
