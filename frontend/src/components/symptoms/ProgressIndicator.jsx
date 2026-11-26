import { Check } from 'lucide-react';
import styles from './ProgressIndicator.module.css';

/**
 * Progress indicator for the symptom guidance flow.
 *
 * Props:
 *   currentStep: number (1-indexed)
 *   totalSteps: number
 *   labels: string[]  (optional — one per step)
 */
function ProgressIndicator({ currentStep, totalSteps, labels = [] }) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={styles.wrapper}>
      {/* Step dots row */}
      <div className={styles.stepsRow}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const label = labels[i];

          return (
            <div key={stepNum} className={styles.stepItem}>
              {/* Dot */}
              <div
                className={`${styles.dot} ${
                  isCompleted ? styles.dotCompleted : ''
                } ${isCurrent ? styles.dotCurrent : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
              </div>

              {/* Label (below dot) */}
              {label && (
                <span
                  className={`${styles.stepLabel} ${
                    isCurrent ? styles.stepLabelCurrent : ''
                  }`}
                >
                  {label}
                </span>
              )}

              {/* Connector line (between dots) */}
              {i < totalSteps - 1 && (
                <div
                  className={`${styles.connector} ${
                    isCompleted ? styles.connectorCompleted : ''
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        className={styles.progressBarTrack}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      >
        <div
          className={styles.progressBarFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Percentage text */}
      <p className={styles.percentText}>
        Step {currentStep} of {totalSteps} · {progressPercent}% complete
      </p>
    </div>
  );
}

export default ProgressIndicator;