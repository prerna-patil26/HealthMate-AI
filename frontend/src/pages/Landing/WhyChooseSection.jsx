import {
  Lock,
  ShieldCheck,
  Languages,
  Users,
  FileCheck2,
  Accessibility,
} from 'lucide-react';
import styles from './WhyChooseSection.module.css';

const PILLARS = [
  {
    icon: Lock,
    title: 'Privacy-first by design',
    description:
      'Your health information is protected with explicit consent, role-based access, and secure data separation for family members.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety at every response',
    description:
      'Clear medical disclaimers and prominent emergency guidance — because your health deserves safety, not guesses.',
  },
  {
    icon: Languages,
    title: 'Multilingual & voice-enabled',
    description:
      'Interact in English, Hindi, Marathi, or Gujarati, by text or voice, with full transcripts.',
  },
  {
    icon: Users,
    title: 'Built for families',
    description:
      'Manage health profiles for your loved ones with individual timelines and consent-based permissions.',
  },
  {
    icon: FileCheck2,
    title: 'Genuine source citations',
    description:
      'Every medical claim is backed by real sources — no fabricated links, no invented statistics.',
  },
  {
    icon: Accessibility,
    title: 'Accessible to everyone',
    description:
      'Readable typography, high contrast, and a clean interface designed for users of all technical backgrounds.',
  },
];

function WhyChooseSection() {
  return (
    <section className={styles.section} id="why-choose">
      <div className={styles.container}>
        {/* ---------- Left: pillars ---------- */}
        <div className={styles.pillarsColumn}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Why Choose HealthMate AI</span>
            <h2 className={styles.heading}>
              Built with safety, privacy, and clarity at the core
            </h2>
            <p className={styles.subheading}>
              HealthMate AI isn&apos;t just another chatbot. Every design decision
              puts your safety, privacy, and understanding first.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <article key={title} className={styles.pillar}>
                <div className={styles.pillarIcon}>
                  <Icon size={20} />
                </div>
                <div className={styles.pillarText}>
                  <h3 className={styles.pillarTitle}>{title}</h3>
                  <p className={styles.pillarDescription}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- Right: trust card ---------- */}
        <aside className={styles.trustCard}>
          <div className={styles.trustHeader}>
            <ShieldCheck size={28} className={styles.trustIcon} />
            <h3 className={styles.trustTitle}>Our promise to you</h3>
          </div>

          <ul className={styles.trustList}>
            <li>Informational only — never a substitute for doctors</li>
            <li>No diagnosis or medicine prescriptions</li>
            <li>Explicit consent before processing health data</li>
            <li>Uncertain values are clearly flagged</li>
            <li>Family records are fully separated</li>
            <li>Emergency number displayed everywhere</li>
          </ul>

          <div className={styles.trustFooter}>
            <span className={styles.trustBadge}>Safe</span>
            <span className={styles.trustBadge}>Private</span>
            <span className={styles.trustBadge}>Source-backed</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default WhyChooseSection;