import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  AlertCircle,
  Stethoscope,
  CheckCircle2,
  Phone,
  ArrowRight,
  RotateCcw,
  MessageSquareHeart,
  ShieldCheck,
} from 'lucide-react';
import {
  getGuidance,
  PRIMARY_SYMPTOMS,
  DURATION_OPTIONS,
  SEVERITY_LEVELS,
  RELATED_SYMPTOMS,
  RED_FLAGS,
} from '../../data/symptomQuestions';
import styles from './SummaryCard.module.css';

const OUTCOME_CONFIG = {
  emergency: {
    Icon: AlertTriangle,
    variant: 'danger',
    badge: 'Urgent — seek help now',
  },
  urgent: {
    Icon: AlertCircle,
    variant: 'warning',
    badge: 'See a doctor soon',
  },
  'follow-up': {
    Icon: Stethoscope,
    variant: 'info',
    badge: 'Recommended check-up',
  },
  'self-care': {
    Icon: CheckCircle2,
    variant: 'success',
    badge: 'Self-care likely appropriate',
  },
};

function SummaryCard({ form, onStartOver }) {
  const guidance = getGuidance(form);
  const config = OUTCOME_CONFIG[guidance.type] || OUTCOME_CONFIG['self-care'];
  const { Icon } = config;

  // Resolve readable labels from IDs
  const primaryLabel =
    PRIMARY_SYMPTOMS.find((s) => s.id === form.primarySymptom)?.label || '—';
  const durationLabel =
    DURATION_OPTIONS.find((d) => d.id === form.duration)?.label || '—';
  const severityLabel =
    SEVERITY_LEVELS.find((s) => s.value === form.severity)?.label || '—';
  const relatedLabels = (form.relatedSymptoms || [])
    .map((id) => RELATED_SYMPTOMS.find((s) => s.id === id)?.label)
    .filter(Boolean);
  const yesFlags = RED_FLAGS.filter((f) => form.redFlags && form.redFlags[f.id] === true);

  return (
    <div className={styles.container}>
      {/* ---------- Outcome banner ---------- */}
      <div className={`${styles.banner} ${styles[config.variant]}`}>
        <div className={styles.bannerIconCircle}>
          <Icon size={24} />
        </div>
        <div className={styles.bannerContent}>
          <span className={styles.badge}>{config.badge}</span>
          <h2 className={styles.bannerTitle}>{guidance.title}</h2>
          <p className={styles.bannerDescription}>{guidance.description}</p>
        </div>
      </div>

      {/* ---------- Emergency callout (only for emergency) ---------- */}
      {guidance.emergency && (
        <div className={styles.callButton}>
          <Phone size={20} />
          <div>
            <p className={styles.callTitle}>Call 112 now (India emergency)</p>
            <p className={styles.callSubtitle}>
              Do not wait for further guidance. Stay on the line.
            </p>
          </div>
        </div>
      )}

      {/* ---------- Action steps ---------- */}
      <div className={styles.stepsSection}>
        <h3 className={styles.sectionTitle}>What to do next</h3>
        <ol className={styles.stepsList}>
          {guidance.steps.map((step, idx) => (
            <li key={step} className={styles.step}>
              <span className={styles.stepNumber}>{idx + 1}</span>
              <span className={styles.stepText}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- Your answers (recap) ---------- */}
      <div className={styles.recapSection}>
        <h3 className={styles.sectionTitle}>Your answers</h3>
        <div className={styles.recapGrid}>
          <div className={styles.recapItem}>
            <span className={styles.recapLabel}>Primary symptom</span>
            <span className={styles.recapValue}>{primaryLabel}</span>
          </div>
          <div className={styles.recapItem}>
            <span className={styles.recapLabel}>Duration</span>
            <span className={styles.recapValue}>{durationLabel}</span>
          </div>
          <div className={styles.recapItem}>
            <span className={styles.recapLabel}>Severity</span>
            <span className={styles.recapValue}>
              {form.severity} / 10 — {severityLabel}
            </span>
          </div>
          <div className={styles.recapItem}>
            <span className={styles.recapLabel}>Related symptoms</span>
            <span className={styles.recapValue}>
              {relatedLabels.length > 0 ? relatedLabels.join(', ') : 'None reported'}
            </span>
          </div>
          <div className={`${styles.recapItem} ${styles.recapItemFull}`}>
            <span className={styles.recapLabel}>Urgent signs reported</span>
            <span className={styles.recapValue}>
              {yesFlags.length > 0
                ? yesFlags.map((f) => f.label).join(', ')
                : 'None reported'}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- CTAs ---------- */}
      <div className={styles.ctaRow}>
        <Link to="/assistant" className={styles.secondaryCta}>
          <MessageSquareHeart size={16} />
          Discuss with AI Assistant
        </Link>
        <button
          type="button"
          className={styles.primaryCta}
          onClick={onStartOver}
        >
          <RotateCcw size={16} />
          Start new assessment
          <ArrowRight size={16} />
        </button>
      </div>

      {/* ---------- Disclaimer ---------- */}
      <div className={styles.disclaimer}>
        <ShieldCheck size={14} />
        <p>
          This is <strong>general information only</strong> and does not
          diagnose any condition. Always consult a qualified healthcare provider
          before making medical decisions. For emergencies, call{' '}
          <strong>112</strong>.
        </p>
      </div>
    </div>
  );
}

export default SummaryCard;