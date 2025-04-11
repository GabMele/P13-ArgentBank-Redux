// src/components/HeroSection/HeroSection.jsx
/**
 * HeroSection component displays a prominent introductory section of the page.
 * It uses a background image and text elements to introduce the main theme of 
 * the page or brand. The component dynamically renders subtitles and text content 
 * from a configuration object (LABELS).
 * 
 * The text content can be customized through `LABELS` object.
 */
import { LABELS } from '@/config';
import styles from './HeroSection.module.scss';
import backgroundImage from '@/assets/bank-tree.jpeg';

const hero = LABELS.hero;

const HeroSection = () => (   
  <section className={styles.hero}
    style={{ backgroundImage: `url(${backgroundImage})` }} >
    <div className={styles.heroContent}>
      <h2 className="sr-only">{hero.srOnly}</h2>
      {hero.subtitle.map((subtitle, index) => (
        <p key={index} className={styles.subtitle}>{subtitle}</p>
      ))}
      <p className={styles.text}>{hero.text}</p>
    </div>
  </section>
);

export default HeroSection;
