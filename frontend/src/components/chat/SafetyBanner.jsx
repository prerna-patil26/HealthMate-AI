import { AlertTriangle, Phone, Stethoscope } from 'lucide-react';
import styles from './SafetyBanner.module.css';

/**
 * Three-part safety reminder shown under medical AI responses.
 * Props:
 *   variant: 'default' | 'emergency'   (default = amber; emergency = red)
 */
function SafetyBanner({ variant = 'default' }) {
  const isEmergency = variant === 'emergency';

  return (
    <div
      className={`${styles.banner} ${isEmergency ? styles.bannerEmergency : ''}`}
      role="note"
      aria-label="Medical safety reminder"
    >
      <div className={styles.iconColumn}>
        <AlertTriangle size={16} />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>
          {isEmergency ? 'Urgent — seek medical help' : 'General information only'}
        </p>

        <ul className={styles.list}>
          <li>
            <Stethoscope size={12} />
            <span>
              This is <strong>not medical advice</strong>. Always consult a
              qualified healthcare provider.
            </span>
          </li>
          <li>
            <Phone size={12} />
            <span>
              For a medical emergency in India, call <strong>112</strong> immediately.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SafetyBanner;