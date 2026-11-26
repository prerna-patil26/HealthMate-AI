import { Check } from 'lucide-react';
import styles from './OptionCard.module.css';

/**
 * Reusable selectable option card.
 *
 * Props:
 *   icon: React node (optional) — usually a Lucide icon
 *   title: string
 *   description: string (optional)
 *   selected: boolean
 *   onClick: () => void
 *   layout: 'grid' | 'list'  (default 'grid')
 *   disabled: boolean (optional)
 */
function OptionCard({
  icon,
  title,
  description,
  selected = false,
  onClick,
  layout = 'grid',
  disabled = false,
}) {
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <button
      type="button"
      className={`${styles.card} ${styles[layout]} ${
        selected ? styles.selected : ''
      } ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      role="radio"
      aria-checked={selected}
    >
      {/* Selection indicator (top-right) */}
      {selected && (
        <span className={styles.checkBadge} aria-hidden="true">
          <Check size={13} strokeWidth={3} />
        </span>
      )}

      {/* Icon */}
      {icon && (
        <div className={`${styles.iconBox} ${selected ? styles.iconBoxSelected : ''}`}>
          {icon}
        </div>
      )}

      {/* Text */}
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </div>
    </button>
  );
}

export default OptionCard;