import Image from 'next/image';
import Link from 'next/link';

const NewArrivals = () => {
  return (
    <section className="container px-4 lg:pl-[117px] lg:pr-[117px] py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-8 bg-red-500"></div>
          <span className="text-red-500 font-semibold text-xs sm:text-sm lg:text-base">Featured</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">New Arrival</h2>
      </div>

      {/* Product Grid */}
      <div className="gridContainerHome">
        {/* Main Featured Product - PlayStation 5 */}
        <div className="gridItemHome playstation">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden h-full">
            <Image
              src="/ui/newarrival/play.png"
              alt="PlayStation 5"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3">PlayStation 5</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-xs sm:text-sm lg:text-base xl:text-lg">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link 
                href="/products/playstation-5"
                className="inline-block bg-black text-white px-4 sm:px-8 py-2 sm:py-4 rounded hover:bg-gray-800 transition-colors font-semibold text-xs sm:text-sm lg:text-base"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Women's Collections */}
        <div className="gridItemHome womens">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden h-full">
            <Image
              src="/ui/newarrival/lady.png"
              alt="Women's Collections"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-white">
              <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold mb-1 sm:mb-2"> Collections</h3>
              <p className="text-gray-300 mb-2 sm:mb-3 text-xs">
                Featured woman collections that give you another vibe.
              </p>
              <Link 
                href="/products/womens-collections"
                className="inline-block bg-black text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-xs hover:bg-gray-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Speakers */}
        <div className="gridItemHome speakers">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden h-full">
            <Image
              src="/ui/newarrival/alexa.png"
              alt="Amazon Wireless Speakers"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-white">
              <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold mb-1 sm:mb-2">Speakers</h3>
              <p className="text-gray-300 mb-2 sm:mb-3 text-xs">
                Amazon wireless speakers
              </p>
              <Link 
                href="/products/speakers"
                className="inline-block bg-black text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-xs hover:bg-gray-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Perfume */}
        <div className="gridItemHome perfume">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden h-full">
            <Image
              src="/ui/newarrival/perfume.png"
              alt="GUCCI INTENSE OUD EDP"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-white">
              <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold mb-1 sm:mb-2">Perfume</h3>
              <p className="text-gray-300 mb-2 sm:mb-3 text-xs">
                GUCCI INTENSE OUD EDP
              </p>
              <Link 
                href="/products/perfume"
                className="inline-block bg-black text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-xs hover:bg-gray-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;