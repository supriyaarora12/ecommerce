import LeftMenu from './LeftMenu';
import HeroCarousel from './HeroCarousel';

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 pb-8">
      <div className="flex gap-6">
        {/* Left Menu */}
        <LeftMenu />
        
        {/* Hero Carousel */}
        <div className="flex-1 pt-4">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}