// src/components/Feature/Feature.jsx
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
