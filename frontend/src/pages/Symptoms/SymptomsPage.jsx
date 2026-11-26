import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Stethoscope } from 'lucide-react';
import ProgressIndicator from '../../components/symptoms/ProgressIndicator';
import StepPrimarySymptom from '../../components/symptoms/StepPrimarySymptom';
import StepDuration from '../../components/symptoms/StepDuration';
import SeverityScale from '../../components/symptoms/SeverityScale';
import SymptomCheckboxGrid from '../../components/symptoms/SymptomCheckboxGrid';
import RedFlagScreen from '../../components/symptoms/RedFlagScreen';
import SummaryCard from '../../components/symptoms/SummaryCard';
import { TOTAL_STEPS, STEP_TITLES } from '../../data/symptomQuestions';
import styles from './SymptomsPage.module.css';

const INITIAL_FORM = {
  primarySymptom: '',
  duration: '',
  severity: 5,
  relatedSymptoms: [],
  redFlags: {},
};

function SymptomsPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [showSummary, setShowSummary] = useState(false);

  const canProceed = () => {
    if (step === 1) return Boolean(form.primarySymptom);
    if (step === 2) return Boolean(form.duration);
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setForm(INITIAL_FORM);
    setShowSummary(false);
  };

  return (
    <div className={styles.page}>
      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Stethoscope size={22} />
          </div>
          <div>
            <h1 className={styles.headerTitle}>Symptom Guidance</h1>
            <p className={styles.headerSubtitle}>
              Organize your symptoms and understand appropriate next steps
            </p>
          </div>
        </div>
        {(step > 1 || showSummary) && (
          <button
            type="button"
            className={styles.startOverButton}
            onClick={handleStartOver}
          >
            <RotateCcw size={14} />
            <span>Start over</span>
          </button>
        )}
      </header>

      {/* ---------- Progress indicator ---------- */}
      {!showSummary && (
        <ProgressIndicator
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          labels={STEP_TITLES}
        />
      )}

      {/* ---------- Body ---------- */}
      <div className={styles.body}>
            {showSummary ? (
        <SummaryCard form={form} onStartOver={handleStartOver} />
        ) : (
          <>
            {step === 1 && (
              <StepPrimarySymptom
                value={form.primarySymptom}
                onChange={(v) => setForm({ ...form, primarySymptom: v })}
              />
            )}
            {step === 2 && (
              <StepDuration
                value={form.duration}
                onChange={(v) => setForm({ ...form, duration: v })}
              />
            )}
            {step === 3 && (
            <SeverityScale
                value={form.severity}
                onChange={(v) => setForm({ ...form, severity: v })}
            />
            )}
            {step === 4 && (
            <SymptomCheckboxGrid
                value={form.relatedSymptoms}
                onChange={(v) => setForm({ ...form, relatedSymptoms: v })}
            />
            )}
            {step === 5 && (
            <RedFlagScreen
                value={form.redFlags}
                onChange={(v) => setForm({ ...form, redFlags: v })}
            />
            )}
          </>
        )}
      </div>

      {/* ---------- Footer navigation ---------- */}
      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
          disabled={step === 1 && !showSummary}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {showSummary ? (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleStartOver}
          >
            <RotateCcw size={16} />
            Start new assessment
          </button>
        ) : (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {step === TOTAL_STEPS ? 'See results' : 'Next'}
            <ArrowRight size={16} />
          </button>
        )}
      </footer>
    </div>
  );
}

export default SymptomsPage;