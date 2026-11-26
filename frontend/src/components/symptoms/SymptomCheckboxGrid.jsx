import { Check } from 'lucide-react';
import { RELATED_SYMPTOMS } from '../../data/symptomQuestions';
import styles from './SymptomCheckboxGrid.module.css';

function SymptomCheckboxGrid({ value = [], onChange }) {
  const selectedSet = new Set(value);

  const toggle = (id) => {
    const next = new Set(selectedSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(Array.from(next));
  };

  const selectedCount = value.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Any related symptoms?</h2>
        <p className={styles.hint}>
          Select any other symptoms you are experiencing. If none apply, just
          tap Next.
        </p>
      </div>

      <div className={styles.grid} role="group" aria-label="Related symptoms">
        {RELATED_SYMPTOMS.map((symptom) => {
          const isSelected = selectedSet.has(symptom.id);
          return (
            <button
              key={symptom.id}
              type="button"
              className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
              onClick={() => toggle(symptom.id)}
              aria-pressed={isSelected}
            >
              <span className={`${styles.checkbox} ${isSelected ? styles.checkboxSelected : ''}`}>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </span>
              <span className={styles.itemLabel}>{symptom.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
        <span className={styles.count}>
          {selectedCount > 0
            ? `${selectedCount} selected`
            : 'None selected — that\u2019s fine'}
        </span>
        {selectedCount > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => onChange([])}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

export default SymptomCheckboxGrid;