import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, BookOpen, Compass } from 'lucide-react';
import styles from './AboutSection.module.css';

const VALUES = [
  {
    icon: BookOpen,
    title: 'Information, clearly delivered',
    description:
      'We translate medical jargon into plain language — with real sources and clear uncertainty markers.',
  },
  {
    icon: Compass,
    title: 'Navigation, not diagnosis',
    description:
      'We help you understand your options and find the right care — but we never diagnose or prescribe.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety as a first-class feature',
    description:
      'Disclaimers, emergency guidance, and consent flows are built into every screen from day one.',
  },
];

function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left: content */}
          <div className={styles.contentColumn}>
            <span className={styles.eyebrow}>About HealthMate AI</span>

            <h2 className={styles.heading}>
              An intelligent companion for understanding your health
            </h2>

            <p className={styles.paragraph}>
              HealthMate AI is an informational and healthcare-navigation
              assistant. It helps you access general health information, understand
              medical reports, explore medicine information, and navigate
              healthcare services — all through one unified platform.
            </p>

            <p className={styles.paragraph}>
              We combine AI-powered assistance, medical document analysis,
              retrieval-augmented generation (RAG), voice interaction, and
              specialized agents — designed for the general public, including
              users with varying levels of technical knowledge.
            </p>

            <div className={styles.positioningCard}>
              <div className={styles.positioningHeader}>
                <HeartPulse size={20} className={styles.positioningIcon} />
                <h3 className={styles.positioningTitle}>What we are — and what we are not</h3>
              </div>
              <div className={styles.positioningGrid}>
                <div className={styles.positioningColumn}>
                  <h4 className={styles.positioningSubtitle}>We are</h4>
                  <ul className={styles.positioningList}>
                    <li>An informational assistant</li>
                    <li>A healthcare navigation tool</li>
                    <li>A source-backed explainer</li>
                    <li>A consent-first platform</li>
                  </ul>
                </div>
                <div className={styles.positioningColumn}>
                  <h4 className={styles.positioningSubtitle}>We are not</h4>
                  <ul className={styles.positioningListNegative}>
                    <li>A doctor or medical professional</li>
                    <li>A diagnostic tool</li>
                    <li>An emergency service</li>
                    <li>A prescription system</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.ctaRow}>
              <Link to="/register" className={styles.primaryButton}>
                Get Started
              </Link>
              <Link to="/privacy" className={styles.secondaryButton}>
                Read our Privacy & Safety policy
              </Link>
            </div>
          </div>

          {/* Right: values */}
          <div className={styles.valuesColumn}>
            {VALUES.map(({ icon: Icon, title, description }) => (
              <article key={title} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Icon size={22} />
                </div>
                <h3 className={styles.valueTitle}>{title}</h3>
                <p className={styles.valueDescription}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;