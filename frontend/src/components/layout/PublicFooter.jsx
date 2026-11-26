import { Link } from 'react-router-dom';
import { HeartPulse, AlertTriangle } from 'lucide-react';
import styles from './PublicFooter.module.css';

function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ---------- Top: columns ---------- */}
        <div className={styles.columns}>
          {/* Brand column */}
          <div className={styles.brandColumn}>
            <Link to="/" className={styles.logo}>
              <HeartPulse size={26} className={styles.logoIcon} />
              <span className={styles.logoText}>HealthMate AI</span>
            </Link>
            <p className={styles.tagline}>
              An intelligent healthcare information and navigation assistant.
              Understand your health information, explore reliable medical guidance,
              and manage your healthcare journey.
            </p>
          </div>

          {/* Product column */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Product</h4>
            <Link to="/features" className={styles.footerLink}>Features</Link>
            <Link to="/how-it-works" className={styles.footerLink}>How It Works</Link>
            <Link to="/about" className={styles.footerLink}>About Us</Link>
          </div>

          {/* Safety column */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Safety & Privacy</h4>
            <Link to="/privacy" className={styles.footerLink}>Privacy & Safety</Link>
            <Link to="/privacy" className={styles.footerLink}>Data Protection</Link>
            <Link to="/privacy" className={styles.footerLink}>Medical Disclaimer</Link>
          </div>

          {/* Account column */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Account</h4>
            <Link to="/login" className={styles.footerLink}>Login</Link>
            <Link to="/register" className={styles.footerLink}>Create Account</Link>
            <Link to="/" className={styles.footerLink}>Help & Support</Link>
          </div>
        </div>

        {/* ---------- Emergency notice ---------- */}
        <div className={styles.emergencyNotice}>
          <AlertTriangle size={20} className={styles.emergencyIcon} />
          <p className={styles.emergencyText}>
            <strong>Medical Emergency?</strong> HealthMate AI is not a substitute
            for emergency services. If you or someone near you is experiencing a
            medical emergency, call <strong>112</strong> (India) or your local
            emergency number immediately.
          </p>
        </div>

        {/* ---------- Disclaimer ---------- */}
        <div className={styles.disclaimer}>
          <p>
            HealthMate AI provides general health information only. It does not
            diagnose diseases, prescribe medication, or replace professional
            medical advice. Always consult a qualified healthcare provider before
            making any medical decision.
          </p>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} HealthMate AI. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link to="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <span className={styles.divider}>•</span>
            <Link to="/privacy" className={styles.bottomLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;