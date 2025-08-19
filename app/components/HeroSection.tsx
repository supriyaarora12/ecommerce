import LeftMenu from './LeftMenu';
import HeroCarousel from './HeroCarousel';

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 pb-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Menu - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          <LeftMenu />
        </div>
        
        {/* Hero Carousel - Full width on mobile, flex-1 on desktop */}
        <div className="w-full lg:flex-1 pt-0 lg:pt-4">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}