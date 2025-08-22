import LeftMenu from './LeftMenu';
import HeroCarousel from './HeroCarousel';

export default function HeroSection() {
  return (
    <section className=" container px-4 pb-8">
      <div className="pl-[95px] pr-[117px] flex flex-col lg:flex-row gap-4 lg:gap-6">
        
    {/* Left Menu - Now always visible */}
    <div>
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