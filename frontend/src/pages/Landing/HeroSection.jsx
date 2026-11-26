import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, FileText, Stethoscope } from 'lucide-react';
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* ---------- Left: text ---------- */}
        <div className={styles.textColumn}>
          <div className={styles.trustBadge}>
            <ShieldCheck size={16} />
            <span>Safe · Private · Information-only</span>
          </div>

          <h1 className={styles.heading}>
            Your Health. Your Information.{' '}
            <span className={styles.headingAccent}>One Intelligent Companion.</span>
          </h1>

          <p className={styles.subtitle}>
            Understand your health information, explore reliable medical guidance,
            and manage your healthcare journey with HealthMate AI.
          </p>

          <div className={styles.buttonRow}>
            <Link to="/register" className={styles.primaryButton}>
              Get Started
            </Link>
            <a href="#features" className={styles.secondaryButton}>
            Explore Features
            </a>
          </div>

          <p className={styles.note}>
            Not a replacement for doctors or emergency services.
          </p>
        </div>

        {/* ---------- Right: assistant preview card ---------- */}
        <div className={styles.visualColumn}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <Sparkles size={18} className={styles.previewIcon} />
              <span className={styles.previewTitle}>HealthMate AI</span>
            </div>

            <div className={styles.messageBubbleAi}>
              Hello! I&apos;m HealthMate AI. How can I help you with your health
              information today?
            </div>

            <div className={styles.actionList}>
              <div className={styles.actionItem}>
                <FileText size={16} />
                <span>Understand my medical report</span>
              </div>
              <div className={styles.actionItem}>
                <Stethoscope size={16} />
                <span>Explore symptom guidance</span>
              </div>
            </div>
          </div>

          {/* Decorative soft blob */}
          <div className={styles.blobTeal} aria-hidden="true" />
          <div className={styles.blobBlue} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;