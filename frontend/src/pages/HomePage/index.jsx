// src/pages/HomePage/index.jsx
/**
 * HomePage component is the main landing page that showcases the key sections 
 * of the website. It includes the `HeroSection` and `FeaturesSection` components.
 * 
 * - `HeroSection`: A visually impactful section that introduces the brand, 
 *   usually with a call-to-action.
 * - `FeaturesSection`: Displays key features or benefits offered by the service, 
 *   product, or platform.
 */
import HeroSection from './HeroSection/HeroSection';
import FeaturesSection from './FeaturesSection/FeaturesSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
