import { Link } from 'react-router-dom';
import {
  Lock,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  UserCheck,
  Eye,
  Phone,
} from 'lucide-react';
import styles from './PrivacySafetySection.module.css';

const PRIVACY_POINTS = [
  {
    icon: UserCheck,
    title: 'Explicit consent',
    description:
      'You decide when your health data is processed. Nothing happens without your explicit permission.',
  },
  {
    icon: Lock,
    title: 'Secure by default',
    description:
      'Authenticated access, role-based controls, and family records kept fully separated.',
  },
  {
    icon: Eye,
    title: 'You control your data',
    description:
      'Export your information or request deletion at any time from your account settings.',
  },
];

const SAFETY_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Information, not diagnosis',
    description:
      'HealthMate AI explains and informs. It never diagnoses diseases or prescribes medication.',
  },
  {
    icon: FileCheck2,
    title: 'Source-backed answers',
    description:
      'Medical claims link to genuine sources. Uncertain values are clearly flagged for verification.',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency-first',
    description:
      'Urgent symptoms trigger prominent warnings and direct users to emergency services immediately.',
  },
];

function PrivacySafetySection() {
  return (
    <section className={styles.section} id="privacy-safety">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Privacy & Safety</span>
          <h2 className={styles.heading}>
            Your trust is non-negotiable
          </h2>
          <p className={styles.subheading}>
            HealthMate AI handles sensitive health information with the care it
            deserves — from consent and data protection to medical safety and
            emergency guidance.
          </p>
        </div>

        {/* Two columns: Privacy / Safety */}
        <div className={styles.columns}>
          {/* Privacy column */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <Lock size={22} className={styles.columnIcon} />
              <h3 className={styles.columnTitle}>Privacy you can verify</h3>
            </div>
            <div className={styles.pointList}>
              {PRIVACY_POINTS.map(({ icon: Icon, title, description }) => (
                <div key={title} className={styles.point}>
                  <div className={styles.pointIcon}>
                    <Icon size={18} />
                  </div>
                  <div className={styles.pointText}>
                    <h4 className={styles.pointTitle}>{title}</h4>
                    <p className={styles.pointDescription}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety column */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <ShieldCheck size={22} className={styles.columnIcon} />
              <h3 className={styles.columnTitle}>Safety built into every screen</h3>
            </div>
            <div className={styles.pointList}>
              {SAFETY_POINTS.map(({ icon: Icon, title, description }) => (
                <div key={title} className={styles.point}>
                  <div className={styles.pointIcon}>
                    <Icon size={18} />
                  </div>
                  <div className={styles.pointText}>
                    <h4 className={styles.pointTitle}>{title}</h4>
                    <p className={styles.pointDescription}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency banner */}
        <div className={styles.emergencyBanner}>
          <div className={styles.emergencyLeft}>
            <div className={styles.emergencyIconCircle}>
              <Phone size={22} />
            </div>
            <div>
              <h4 className={styles.emergencyTitle}>
                In a medical emergency, call 112 immediately
              </h4>
              <p className={styles.emergencyText}>
                HealthMate AI is not a substitute for emergency services or
                professional medical care. For urgent symptoms, contact your local
                emergency number — in India, dial <strong>112</strong>.
              </p>
            </div>
          </div>
          <Link to="/privacy" className={styles.learnMore}>
            Read our privacy & safety policy
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PrivacySafetySection;