import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1500px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Exclusive</h3>
            <h4 className="text-lg font-medium mb-2">Subscribe</h4>
            <p className="text-gray-300 mb-4">Get 10% off your first order</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-transparent border border-white rounded-l focus:outline-none focus:border-white text-white placeholder-gray-400"
              />
              <button className="px-4 py-2 bg-transparent border border-white border-l-0 rounded-r hover:bg-white hover:text-black transition-colors flex items-center justify-center">
                <Image
                  src="/ui/sendIcon.png"
                  alt="Send"
                  width={20}
                  height={20}
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-gray-300">
              <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
              <a href="mailto:exclusive@gmail.com" className="hover:text-white transition-colors">exclusive@gmail.com</a>
              <a href="tel:+88015888889999" className="hover:text-white transition-colors">+88015-88888-9999</a>
            </div>
          </div>

          {/* Account Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login / Register</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Link Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Orders</Link></li>
            </ul>
          </div>

          {/* Download App Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Download App</h3>
            <p className="text-gray-300 mb-4">Save $3 with App New User Only</p>
            
            <div className='flex items-center gap-4'>

            {/* QR Code */}
            <div className="mb-4">
              <Image
                src="/ui/qr.png"
                alt="QR Code"
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </div>

            {/* App Store Badges */}
            <div className="space-y-2 mb-4">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src="/ui/playstore.png"
                  alt="GET IT ON Google Play"
                  width={120}
                  height={40}
                  className="w-30 h-10"
                />
              </a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src="/ui/appstore.png"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="w-30 h-10"
                />
              </a>
            </div>

            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/ui/facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/ui/twiiter.png"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/ui/insta.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/ui/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
}
