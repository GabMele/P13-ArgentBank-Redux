// src/components/FeaturesSection/FeaturesSection.jsx
/**
 * FeaturesSection component renders a section displaying a list of features 
 * related to the service or product. Each feature is represented by an icon, 
 * a title, and a description. 
 * 
 * The content is dynamically populated using the `LABELS` configuration, 
 * specifically the `featuresSection` object, which provides the heading 
 * and the individual feature details.
 * 
 * - `features.heading`: The main heading of the features section.
 * - `features.feature`: An array of feature objects, each containing 
 *   an `icon`, `title`, and `description`.
 */
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
