// import PromotionalBanner from "../components/PromotionalBanner";
// import NavigationBar from "../components/NavigationBar";
// import Footer from "../components/Footer";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Top banner & navbar
      <PromotionalBanner />
      <NavigationBar /> */}

      {/* Page content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
