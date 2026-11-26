import { SEVERITY_LEVELS, SEVERITY_HELPER } from '../../data/symptomQuestions';
import styles from './SeverityScale.module.css';

function SeverityScale({ value, onChange }) {
  const selectedLevel = SEVERITY_LEVELS.find((l) => l.value === value) || SEVERITY_LEVELS[4];

  const handleKeyDown = (e, level) => {
    if (e.key === 'ArrowRight' && level < 10) {
      e.preventDefault();
      onChange(level + 1);
    } else if (e.key === 'ArrowLeft' && level > 1) {
      e.preventDefault();
      onChange(level - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(level);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{SEVERITY_HELPER.title}</h2>
        <p className={styles.hint}>{SEVERITY_HELPER.hint}</p>
      </div>

      {/* Selected value display */}
      <div
        className={styles.selectedDisplay}
        style={{ borderColor: selectedLevel.color }}
      >
        <span
          className={styles.selectedNumber}
          style={{ color: selectedLevel.color }}
        >
          {value}
        </span>
        <span
          className={styles.selectedLabel}
          style={{ color: selectedLevel.color }}
        >
          {selectedLevel.label}
        </span>
      </div>

      {/* 10 numbered buttons */}
      <div className={styles.scaleRow} role="radiogroup" aria-label="Severity level">
        {SEVERITY_LEVELS.map((level) => {
          const isSelected = level.value === value;
          return (
            <button
              key={level.value}
              type="button"
              className={`${styles.scaleButton} ${isSelected ? styles.selected : ''}`}
              style={{
                borderColor: isSelected ? level.color : undefined,
                backgroundColor: isSelected ? level.color : undefined,
              }}
              onClick={() => onChange(level.value)}
              onKeyDown={(e) => handleKeyDown(e, level.value)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Severity ${level.value}: ${level.label}`}
            >
              {level.value}
            </button>
          );
        })}
      </div>

      {/* Gradient fill bar */}
      <div className={styles.gradientTrack}>
        <div
          className={styles.gradientFill}
          style={{ width: `${value * 10}%` }}
        />
      </div>

      {/* Color-legend under the bar */}
      <div className={styles.legend}>
        <span className={styles.legendItem} style={{ color: '#198754' }}>
          Mild
        </span>
        <span className={styles.legendItem} style={{ color: '#D99A24' }}>
          Moderate
        </span>
        <span className={styles.legendItem} style={{ color: '#DC3545' }}>
          Severe
        </span>
      </div>
    </div>
  );
}

export default SeverityScale;