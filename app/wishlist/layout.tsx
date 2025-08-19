export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <span className="hover:underline cursor-pointer">Home</span> /{" "}
        <span className="text-gray-800">Wishlist</span>
      </div>

      {/* Wishlist content */}
      {children}
    </section>
  );
}
