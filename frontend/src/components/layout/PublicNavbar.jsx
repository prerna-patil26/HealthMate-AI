import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HeartPulse } from 'lucide-react';
import styles from './PublicNavbar.module.css';

function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isOnLanding = location.pathname === '/';

  // Anchor-based nav links — only work on the landing page
  const navLinks = [
    { hash: '#about', label: 'About' },
    { hash: '#features', label: 'Features' },
    { hash: '#how-it-works', label: 'How It Works' },
    { hash: '#privacy-safety', label: 'Privacy & Safety' },
    { hash: '#faq', label: 'FAQ' },
  ];

  const closeMobile = () => setMobileOpen(false);

  // If on landing page, use in-page anchors; else link back to "/" + hash
  const getHref = (hash) => (isOnLanding ? hash : `/${hash}`);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobile}>
          <HeartPulse size={26} className={styles.logoIcon} />
          <span className={styles.logoText}>HealthMate AI</span>
        </Link>

        <nav className={styles.navLinks} aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={getHref(link.hash)}
              className={styles.navLink}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.authButtons}>
          <Link to="/login" className={styles.loginLink}>Login</Link>
          <Link to="/register" className={styles.registerLink}>Get Started</Link>
        </div>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMobileOpen((p) => !p)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={getHref(link.hash)}
                className={styles.mobileLink}
                onClick={closeMobile}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className={styles.mobileAuth}>
            <Link to="/login" onClick={closeMobile} className={styles.mobileAuthLink}>
              Login
            </Link>
            <Link to="/register" onClick={closeMobile} className={styles.mobileAuthPrimary}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default PublicNavbar;