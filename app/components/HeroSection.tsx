



// import LeftMenu from './LeftMenu';
// import HeroCarousel from './HeroCarousel';

// export default function HeroSection() {
//   return (
//     <section className="container px-4 pb-8 lg:pb-12 xl:pb-8">
//       <div className="lg:pl-[95px] xl:pr-[170px] flex flex-col lg:flex-row gap-4 lg:gap-6">
        
//         {/* Left Menu - Mobile icon, Desktop full menu */}
//         <div className="lg:block">
//           <LeftMenu />
//         </div>  
        
//         {/* Hero Carousel - Full width on mobile, flex-1 on desktop */}
//         <div className="w-full lg:flex-1 pt-0 lg:pt-4">
//           <HeroCarousel />
//         </div>
        
//       </div>
//     </section>
//   );
// }

import LeftMenu from './LeftMenu';
import HeroCarousel from './HeroCarousel';

export default function HeroSection() {
  return (
    <section className="container px-4 pb-8 lg:pb-12 xl:pb-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:pl-[95px] xl:pr-[170px]">
        
        {/* Left Menu - fixed width on desktop, auto on mobile */}
        <div className="w-full lg:w-[220px] xl:w-[250px]">
          <LeftMenu />
        </div>  

        {/* Hero Carousel - take full remaining space */}
        <div className="flex-1 pt-0 lg:pt-4">
          <HeroCarousel />
        </div>
        
      </div>
    </section>
  );
}

