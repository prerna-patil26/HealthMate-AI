import {
  MessageSquareHeart,
  FileText,
  HelpCircle,
  Stethoscope,
  Pill,
  Building2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import styles from './WelcomeScreen.module.css';

const SUGGESTIONS = [
  {
    icon: FileText,
    title: 'Understand my medical report',
    prompt: 'I have a medical report and I want help understanding the values.',
    color: 'teal',
  },
  {
    icon: HelpCircle,
    title: 'Ask a general health question',
    prompt: 'I have a general health question I would like to understand better.',
    color: 'blue',
  },
  {
    icon: Stethoscope,
    title: 'Explore symptom guidance',
    prompt: 'I would like to explore symptom guidance for something I am experiencing.',
    color: 'teal',
  },
  {
    icon: Pill,
    title: 'Learn about a medicine',
    prompt: 'I want to learn about a specific medicine — its uses and precautions.',
    color: 'blue',
  },
  {
    icon: Building2,
    title: 'Find healthcare services',
    prompt: 'I am looking for a doctor or hospital for a specific need.',
    color: 'teal',
  },
];

function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className={styles.screen}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.iconCircle}>
          <MessageSquareHeart size={40} />
          <span className={styles.sparkle}>
            <Sparkles size={16} />
          </span>
        </div>
        <h1 className={styles.heading}>Hello! I&apos;m HealthMate AI.</h1>
        <p className={styles.subheading}>
          How can I help you with your health information today?
        </p>
      </div>

      {/* Suggested actions */}
      <div className={styles.suggestionsSection}>
        <p className={styles.suggestionsLabel}>Try one of these to get started</p>
        <div className={styles.suggestionsGrid}>
          {SUGGESTIONS.map(({ icon: Icon, title, prompt, color }) => (
            <button
              key={title}
              type="button"
              className={`${styles.suggestionCard} ${
                color === 'teal' ? styles.suggestionTeal : styles.suggestionBlue
              }`}
              onClick={() => onSuggestionClick && onSuggestionClick(prompt)}
            >
              <div
                className={`${styles.suggestionIcon} ${
                  color === 'teal' ? styles.suggestionIconTeal : styles.suggestionIconBlue
                }`}
              >
                <Icon size={18} />
              </div>
              <span className={styles.suggestionTitle}>{title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Safety note */}
      <div className={styles.safetyNote}>
        <ShieldCheck size={16} />
        <p>
          HealthMate AI provides <strong>general health information only</strong>.
          It does not diagnose diseases, prescribe medication, or replace
          professional medical advice.
        </p>
      </div>
    </div>
  );
}

export default WelcomeScreen;