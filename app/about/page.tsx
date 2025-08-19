"use client";

import Image from "next/image";
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        Home / <span className="text-black">About</span>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Our Story</h1>
          <p className="text-gray-600 mb-4">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p className="text-gray-600">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="relative w-full h-[400px]">
          <Image
            src="/ui/about/SideImageourstory.svg"
            alt="Our Story"
            fill
            className="object-cover rounded"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
           {
      value: "10.5k",
      label: "Sellers active on our site",
      icon: "/ui/about/10k.svg",
      active: false,
    },
    {
      value: "33k",
      label: "Monthly Product Sale",
      icon: "/ui/about/33k.svg",
      active: true,
    },
    {
      value: "45.5k",
      label: "Customer active on our site",
      icon: "/ui/about/45k.svg",
      active: false,
    },
    {
      value: "25k",
      label: "Annual gross sale in our site",
      icon: "/ui/about/25k.svg",
      active: false,
    },
        ].map((stat, i) => (
          <div
            key={i}
            className={`border rounded-lg p-6 text-center ${
              stat.active ? "bg-red-500 text-white" : "border-gray-300"
            }`}
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { name: "Tom Cruise", role: "Founder & Chairman", img: "/ui/about/tom cruze.svg" },
            { name: "Emma Watson", role: "Managing Director", img: "/ui/about/emma.svg" },
            { name: "Will Smith", role: "Product Designer", img: "/ui/about/will.svg" },
          ].map((person, i) => (
            <div key={i}>
              <div className="relative w-full h-[430px] mb-4">
                <Image
                  src={person.img}
                  alt={person.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="font-bold">{person.name}</h3>
              <p className="text-gray-500 text-sm">{person.role}</p>
              <div className="flex justify-center gap-4 mt-2">
                <Image src="/ui/about/Icon-Twitter.svg" alt="Twitter" width={24} height={24} />
                <Image src="/ui/about/icon-instagram.svg" alt="Instagram" width={20} height={20} />
                <Image src="/ui/about/Icon-Linkedin.svg" alt="LinkedIn" width={20} height={20} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "/ui/about/Services.svg", title: "FREE AND FAST DELIVERY", desc: "Free delivery for all orders over $140" },
            { icon: "/ui/about/Services (1).svg", title: "24/7 CUSTOMER SERVICE", desc: "Friendly 24/7 customer support" },
            { icon: "/ui/about/Services (2).svg", title: "MONEY BACK GUARANTEE", desc: "We return money within 30 days" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center">
              <Image src={feature.icon} alt={feature.title} width={40} height={40} />
              <h4 className="mt-4 font-bold">{feature.title}</h4>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
