// src/modules/Home/pages/HomePage.jsx
import Navbar from '../../../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedProducts from '../components/FeaturedProducts';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
    </>
  );
}
