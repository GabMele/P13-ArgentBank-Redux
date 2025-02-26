// src/components/FeaturesSection/FeaturesSection.jsx
import Feature from './Feature/Feature';
import styles from './FeaturesSection.module.scss';
import { LABELS } from '@/config'; 

const FeaturesSection = () => {
  const features = LABELS.featuresSection;

  return (
    <section className={styles.featuresSection}>
      <h2 className="sr-only">{features.heading}</h2>
      {features.feature.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
};

export default FeaturesSection;
