import {
  Thermometer,
  Brain,
  Wind,
  Mic,
  UtensilsCrossed,
  BatteryLow,
  Activity,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import OptionCard from './OptionCard';
import { PRIMARY_SYMPTOMS } from '../../data/symptomQuestions';
import styles from './steps.module.css';

// Map icon name strings to Lucide icon components
const ICON_MAP = {
  Thermometer,
  Brain,
  Wind,
  Mic,
  UtensilsCrossed,
  BatteryLow,
  Activity,
  HelpCircle,
  AlertCircle,
};

function StepPrimarySymptom({ value, onChange }) {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>What brings you here today?</h2>
        <p className={styles.stepDescription}>
          Select the symptom that is bothering you most. You can add more
          details in the next steps.
        </p>
      </div>

      <div className={styles.gridOptions} role="radiogroup" aria-label="Primary symptom">
        {PRIMARY_SYMPTOMS.map((symptom) => {
          const Icon = ICON_MAP[symptom.icon] || AlertCircle;
          return (
            <OptionCard
              key={symptom.id}
              icon={<Icon size={18} />}
              title={symptom.label}
              description={symptom.description}
              selected={value === symptom.id}
              onClick={() => onChange(symptom.id)}
              layout="grid"
            />
          );
        })}
      </div>
    </div>
  );
}

export default StepPrimarySymptom;