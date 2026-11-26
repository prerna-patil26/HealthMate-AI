import OptionCard from './OptionCard';
import { DURATION_OPTIONS } from '../../data/symptomQuestions';
import styles from './steps.module.css';

function StepDuration({ value, onChange }) {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>How long have you had this?</h2>
        <p className={styles.stepDescription}>
          Roughly how long has this symptom been present? An approximate answer
          is fine.
        </p>
      </div>

      <div className={styles.listOptions} role="radiogroup" aria-label="Duration">
        {DURATION_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.label}
            selected={value === option.id}
            onClick={() => onChange(option.id)}
            layout="list"
          />
        ))}
      </div>
    </div>
  );
}

export default StepDuration;