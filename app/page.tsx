import HeroSection from './components/HeroSection';
import FlashSales from './components/FlashSales';
import BrowseByCategory from './components/BrowseByCategory';
import BestSellingProducts from './components/BestSellingProducts';
import NewReleases from './components/NewReleases';
import NewArrivals from './components/NewArrivals';
import PromotionalBannerTwo from './components/PromotionalBannerTwo';
import ServicesSection from './components/ServicesSection';
import Divider from './components/Divider';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Divider />
      <FlashSales />
      <Divider />
      <BrowseByCategory />
      <Divider />
      <BestSellingProducts />
      <Divider />
      <PromotionalBannerTwo />
      <Divider />
      <NewReleases />
      <Divider />
      <NewArrivals />
      <ServicesSection />
    </main>
  );
}