// src/pages/HomePage/index.jsx

import NavBar from '@/components/NavBar/NavBar';
import HeroSection from '@/components/HeroSection/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer/Footer';
import { LABELS } from '@/config';
import styles from './HomePage.module.scss';

const features = LABELS.featuresSection;

console.log(features);

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
