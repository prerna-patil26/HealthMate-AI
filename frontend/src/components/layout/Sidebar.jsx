import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareHeart,
  Stethoscope,
  FileText,
  Pill,
  CalendarClock,
  BarChart3,
  Building2,
  CalendarCheck2,
  Users,
  Mic,
  Settings,
  HelpCircle,
  User,
  LogOut,
  HeartPulse,
  X,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const NAV_SECTIONS = [
  {
    title: 'MAIN',
    items: [
      { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
      { to: '/assistant', label: 'AI Assistant', icon: MessageSquareHeart },
      { to: '/symptoms', label: 'Symptom Guidance', icon: Stethoscope },
    ],
  },
  {
    title: 'HEALTH',
    items: [
      { to: '/reports', label: 'Medical Reports', icon: FileText },
      { to: '/medicines', label: 'Medicine Information', icon: Pill },
      { to: '/timeline', label: 'Health Timeline', icon: CalendarClock },
      { to: '/analytics', label: 'Health Analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'SERVICES',
    items: [
      { to: '/doctors', label: 'Doctors & Hospitals', icon: Building2 },
      { to: '/appointments', label: 'Appointments', icon: CalendarCheck2 },
      { to: '/family', label: 'Family Health', icon: Users },
      { to: '/voice', label: 'Voice Assistant', icon: Mic },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { to: '/settings', label: 'Settings', icon: Settings },
      { to: '/help', label: 'Help & Support', icon: HelpCircle },
      { to: '/profile', label: 'Profile', icon: User },
    ],
  },
];

function Sidebar({ mobileOpen = false, collapsed = false, onCloseMobile }) {
  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ''} ${
        collapsed ? styles.collapsed : ''
      }`}
    >
      {/* Logo / close button */}
      <div className={styles.header}>
        <Link to="/dashboard" className={styles.logo} onClick={handleNavClick}>
          <HeartPulse size={24} className={styles.logoIcon} />
          <span className={styles.logoText}>HealthMate AI</span>
        </Link>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onCloseMobile}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.nav} aria-label="Application navigation">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className={styles.section}>
            <p className={styles.sectionTitle}>{section.title}</p>
            <ul className={styles.sectionList}>
              {section.items.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                    }
                    title={collapsed ? label : undefined}
                  >
                    <Icon size={19} className={styles.navIcon} />
                    <span className={styles.navLabel}>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className={styles.footer}>
        <Link
          to="/"
          className={styles.logoutButton}
          title={collapsed ? 'Logout' : undefined}
          onClick={handleNavClick}
        >
          <LogOut size={19} />
          <span className={styles.navLabel}>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;