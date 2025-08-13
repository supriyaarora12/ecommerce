"use client";
import Image from 'next/image';
import Link from 'next/link';
export default function ContactPage() {
  return (
    <div className="max-w-[1330px] mx-auto px-8 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        Home <span className="mx-2">/</span>
        <span className="text-black font-medium">Contact</span>
      </div>

      {/* Page title */}
      <h1 className="text-3xl font-semibold mb-10">Contact</h1>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left info section */}
        <div className="space-y-6">
          {/* Call Us */}
          <div className="bg-white  rounded-lg p-6 shadow-sm flex items-start space-x-4">
            <div className="bg-red-500 text-white p-3 rounded-full flex items-center justify-center w-12 h-12">
              📞
             
            </div>
            <div>
              <h2 className="text-lg font-semibold">Call To Us</h2>
              <p className="text-gray-600 mt-1">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-gray-600">Phone: +88016112222</p>
            </div>
          </div>

          {/* Write To Us */}
          <div className="bg-white  rounded-lg p-6 shadow-sm flex items-start space-x-4">
            <div className="bg-red-500 text-white p-3 rounded-full flex items-center justify-center w-12 h-12">
              ✉️
            </div>
            <div>
              <h2 className="text-lg font-semibold">Write To Us</h2>
              <p className="text-gray-600 mt-1">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-gray-600">Emails: customer@exclusive.com</p>
              <p className="text-gray-600">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white  rounded-lg p-6 shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                className="w-full  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>

            <button
              type="submit"
              className="ml-auto bg-red-500 text-white flex justify-end px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
