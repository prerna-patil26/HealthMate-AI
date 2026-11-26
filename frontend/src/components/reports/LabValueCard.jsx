import { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowDownCircle,
  HelpCircle,
  ChevronDown,
  Flag,
} from 'lucide-react';
import styles from './LabValueCard.module.css';

const STATUS_CONFIG = {
  normal: {
    Icon: CheckCircle2,
    label: 'Normal',
    variant: 'normal',
  },
  high: {
    Icon: AlertCircle,
    label: 'High',
    variant: 'high',
  },
  low: {
    Icon: ArrowDownCircle,
    label: 'Low',
    variant: 'low',
  },
  unknown: {
    Icon: HelpCircle,
    label: 'Unknown',
    variant: 'unknown',
  },
};

function LabValueCard({ value }) {
  const [expanded, setExpanded] = useState(false);
  const [reported, setReported] = useState(false);

  const config = STATUS_CONFIG[value.status] || STATUS_CONFIG.unknown;
  const { Icon, label, variant } = config;

  const handleReportIssue = (e) => {
    e.stopPropagation();
    setReported(true);
    // In Phase 9, this will notify the backend for manual verification
    console.log(`Reported issue for value: ${value.testName} (${value.id})`);
  };

  return (
    <div
      className={`${styles.card} ${styles[variant]} ${
        value.uncertain ? styles.uncertain : ''
      }`}
    >
      {/* ---------- Main row ---------- */}
      <div className={styles.mainRow}>
        <div className={styles.leftSide}>
          <div className={styles.testInfo}>
            <h3 className={styles.testName}>{value.testName}</h3>
            <p className={styles.referenceRange}>
              Reference: {value.referenceRange} {value.unit}
            </p>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.valueBlock}>
            <span className={styles.value}>{value.value}</span>
            <span className={styles.unit}>{value.unit}</span>
          </div>
          <div className={`${styles.statusBadge} ${styles[`status-${variant}`]}`}>
            <Icon size={13} />
            {label}
          </div>
        </div>
      </div>

      {/* ---------- Uncertain warning ---------- */}
      {value.uncertain && (
        <div className={styles.uncertainRow}>
          <div className={styles.uncertainMessage}>
            <HelpCircle size={14} />
            <span>
              This value was read with low confidence from the image. Please
              verify with the original report.
            </span>
          </div>
          {!reported ? (
            <button
              type="button"
              className={styles.reportButton}
              onClick={handleReportIssue}
            >
              <Flag size={12} />
              Report an issue
            </button>
          ) : (
            <span className={styles.reportedBadge}>
              <CheckCircle2 size={12} />
              Reported
            </span>
          )}
        </div>
      )}

      {/* ---------- Expand toggle ---------- */}
      <button
        type="button"
        className={styles.expandButton}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <span>{expanded ? 'Hide explanation' : 'What does this mean?'}</span>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
        />
      </button>

      {/* ---------- Explanation ---------- */}
      {expanded && (
        <div className={styles.explanation}>
          <p className={styles.explanationText}>{value.explanation}</p>
          <div className={styles.safetyNote}>
            <AlertCircle size={12} />
            <span>
              This explanation is general information — not a diagnosis.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LabValueCard;