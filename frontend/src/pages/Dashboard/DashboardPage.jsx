import { Link } from 'react-router-dom';
import {
  MessageSquareHeart,
  FileText,
  Stethoscope,
  Building2,
  Clock,
  CalendarCheck2,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import styles from './DashboardPage.module.css';

const QUICK_ACTIONS = [
  {
    icon: MessageSquareHeart,
    title: 'Ask HealthMate AI',
    description: 'Get source-backed answers to general health questions.',
    to: '/assistant',
    color: 'blue',
  },
  {
    icon: FileText,
    title: 'Upload Medical Report',
    description: 'Understand extracted values in plain language.',
    to: '/reports',
    color: 'teal',
  },
  {
    icon: Stethoscope,
    title: 'Explore Symptom Guidance',
    description: 'Organize symptoms with a guided questionnaire.',
    to: '/symptoms',
    color: 'blue',
  },
  {
    icon: Building2,
    title: 'Find a Doctor',
    description: 'Browse hospitals and specialists near you.',
    to: '/doctors',
    color: 'teal',
  },
];

function DashboardPage() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className={styles.page}>
      {/* ---------- Welcome header ---------- */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1 className={styles.welcomeHeading}>
            {getGreeting()}! Welcome to HealthMate AI.
          </h1>
          <p className={styles.welcomeSubheading}>
            Here&apos;s an overview of your health information and activity.
          </p>
        </div>
        <Link to="/assistant" className={styles.welcomeCta}>
          <Sparkles size={16} />
          Start a conversation
        </Link>
      </section>

      {/* ---------- Quick actions ---------- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick actions</h2>
        <div className={styles.quickActionsGrid}>
          {QUICK_ACTIONS.map(({ icon: Icon, title, description, to, color }) => (
            <Link
              key={title}
              to={to}
              className={`${styles.actionCard} ${styles[`actionCard${color === 'teal' ? 'Teal' : 'Blue'}`]}`}
            >
              <div
                className={`${styles.actionIcon} ${
                  color === 'teal' ? styles.actionIconTeal : styles.actionIconBlue
                }`}
              >
                <Icon size={22} />
              </div>
              <h3 className={styles.actionTitle}>{title}</h3>
              <p className={styles.actionDescription}>{description}</p>
              <span className={styles.actionArrow}>
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Recent activity + timeline preview (two-column) ---------- */}
      <div className={styles.twoColumn}>
        {/* Recent activity */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <Clock size={18} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Recent activity</h2>
            </div>
          </div>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Clock size={32} />
            </div>
            <h3 className={styles.emptyTitle}>No activity yet</h3>
            <p className={styles.emptyText}>
              Your recent conversations, uploaded reports, and timeline events will
              appear here.
            </p>
            <Link to="/assistant" className={styles.emptyCta}>
              Start your first conversation
            </Link>
          </div>
        </section>

        {/* Health timeline preview */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <TrendingUp size={18} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Health timeline preview</h2>
            </div>
            <Link to="/timeline" className={styles.cardLink}>
              View all
            </Link>
          </div>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <TrendingUp size={32} />
            </div>
            <h3 className={styles.emptyTitle}>No timeline events yet</h3>
            <p className={styles.emptyText}>
              Once you add health information, reports, or appointments, they&apos;ll
              appear here chronologically.
            </p>
            <Link to="/reports" className={styles.emptyCta}>
              Upload a medical report
            </Link>
          </div>
        </section>
      </div>

      {/* ---------- Upcoming appointments ---------- */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <CalendarCheck2 size={18} className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Upcoming appointments</h2>
          </div>
          <Link to="/appointments" className={styles.cardLink}>
            Manage
          </Link>
        </div>
        <div className={styles.emptyStateCompact}>
          <p className={styles.emptyText}>
            No appointments booked. Once connected, your upcoming visits will
            appear here.
          </p>
          <Link to="/doctors" className={styles.emptyCtaCompact}>
            Find a doctor
          </Link>
        </div>
      </section>

      {/* ---------- Emergency help ---------- */}
      <section className={styles.emergencyCard}>
        <div className={styles.emergencyLeft}>
          <div className={styles.emergencyIconCircle}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className={styles.emergencyTitle}>Medical emergency?</h3>
            <p className={styles.emergencyText}>
              HealthMate AI is not a substitute for emergency services. In a medical
              emergency in India, call <strong>112</strong> immediately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;