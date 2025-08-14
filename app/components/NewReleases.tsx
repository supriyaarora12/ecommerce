'use client';

import Product from './Product';

const newReleaseProducts = [
    {
        id: 1,
        name: "Breed Dry Dog Food",
        originalPrice: 100,
        discountedPrice: 100,
        discount: 0,
        rating: 5,
        reviews: 35,
        image: "/ui/newrelease/breed.svg",
        isNew: false
    },
    {
        id: 2,
        name: "CANON EOS DSLR Camera",
        originalPrice: 360,
        discountedPrice: 360,
        discount: 0,
        rating: 5,
        reviews: 95,
        image: "/ui/newrelease/dslr.svg",
        isNew: false
    },
    {
        id: 3,
        name: "ASUS FHD Gaming Laptop",
        originalPrice: 700,
        discountedPrice: 700,
        discount: 0,
        rating: 5,
        reviews: 325,
        image: "/ui/newrelease/laptopfhd.svg",
        isNew: false
    },
    {
        id: 4,
        name: "Curology Product Set",
        originalPrice: 500,
        discountedPrice: 500,
        discount: 0,
        rating: 5,
        reviews: 145,
        image: "/ui/newrelease/Copa_Sense 1.svg",
        isNew: false
    },
    {
        id: 5,
        name: "Kids Electric Car",
        originalPrice: 960,
        discountedPrice: 960,
        discount: 0,
        rating: 5,
        reviews: 65,
        image: "/ui/newrelease/toy.svg",
        isNew: true
    },
    {
        id: 6,
        name: "Jr. Zoom Soccer Cleats",
        originalPrice: 1160,
        discountedPrice: 1160,
        discount: 0,
        rating: 5,
        reviews: 35,
        image: "/ui/newrelease/Copa_Sense 1.svg",
        isNew: false
    },
    {
        id: 7,
        name: "GP11 Shooter USB Gamepad",
        originalPrice: 660,
        discountedPrice: 660,
        discount: 0,
        rating: 5,
        reviews: 55,
        image: "/ui/newrelease/usb.svg",
        isNew: true
    },
    {
        id: 8,
        name: "Quilted Satin Jacket",
        originalPrice: 660,
        discountedPrice: 660,
        discount: 0,
        rating: 5,
        reviews: 55,
        image: "/ui/newrelease/jacket.svg",
        isNew: false
    }
];

export default function NewReleases() {
    return (
        <section className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-10 bg-red-500 rounded"></div>
                        <span className="text-sm text-red-500 font-medium">Featured</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">New & Featured</h2>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-red-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
                        View All Products
                    </button>
                </div>
            </div>

            {/* Products Grid - 2 rows with 4 products per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newReleaseProducts.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        originalPrice={product.originalPrice}
                        discountedPrice={product.discountedPrice}
                        discount={product.discount}
                        rating={product.rating}
                        reviews={product.reviews}
                        image={product.image}
                        showAddToCart={true}
                        
                    />
                ))}
            </div>
        </section>
    );
}