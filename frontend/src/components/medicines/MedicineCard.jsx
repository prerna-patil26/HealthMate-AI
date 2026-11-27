import { Pill, ChevronRight, Lock } from 'lucide-react';
import styles from './MedicineCard.module.css';

const CATEGORY_COLORS = {
  'pain-relief': { bg: '#EAF4FC', fg: '#1769AA' },
  antibiotic: { bg: '#FCE8EA', fg: '#7A1E27' },
  antidiabetic: { bg: '#E5F6F3', fg: '#0E6E65' },
  gastro: { bg: '#FBF3E2', fg: '#7A4F0E' },
  statin: { bg: '#EAF4FC', fg: '#1769AA' },
  antihistamine: { bg: '#E5F6F3', fg: '#0E6E65' },
};

function MedicineCard({ medicine, onOpen }) {
  const colors = CATEGORY_COLORS[medicine.category] || CATEGORY_COLORS['pain-relief'];

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onOpen}
      aria-label={`View ${medicine.genericName} details`}
    >
      {/* Icon */}
      <div
        className={styles.iconBox}
        style={{ background: colors.bg, color: colors.fg }}
      >
        <Pill size={22} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.genericName}>{medicine.genericName}</h3>
          {medicine.prescriptionRequired ? (
            <span className={styles.rxBadge}>
              <Lock size={10} />
              Rx
            </span>
          ) : (
            <span className={styles.otcBadge}>OTC</span>
          )}
        </div>

        <p className={styles.brandNames}>
          {medicine.brandNames.join(' · ')}
        </p>

        <div className={styles.metaRow}>
          <span
            className={styles.categoryBadge}
            style={{ background: colors.bg, color: colors.fg }}
          >
            {medicine.categoryLabel}
          </span>
          <span className={styles.shortDescription}>
            {medicine.shortDescription}
          </span>
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight size={18} className={styles.chevron} />
    </button>
  );
}

export default MedicineCard;