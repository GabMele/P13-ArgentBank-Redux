// src/components/Feature/Feature.jsx
/**
 * Feature component renders an individual feature item that includes:
 * - an icon,
 * - a title,
 * - and a description.
 * 
 * Each feature item is displayed as an image (icon), followed by a title and 
 * a description. This component is commonly used within a larger section, 
 * such as the `FeaturesSection`, to showcase key features of a product or service.
 * 
 * Props:
 * - `icon`: A string representing the URL of the feature's icon image.
 * - `title`: A string for the title of the feature.
 * - `description`: A string providing additional information about the feature.
 */
import PropTypes from 'prop-types';
import styles from './Feature.module.scss';

const Feature = ({ icon, title, description }) => {
  return (
    <div className={styles.featureItem}>
      <img src={icon} alt={title} className={styles.featureIcon} />
      <h3 className={styles.featureItemTitle}>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Feature;
