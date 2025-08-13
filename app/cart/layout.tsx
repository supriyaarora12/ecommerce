export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
