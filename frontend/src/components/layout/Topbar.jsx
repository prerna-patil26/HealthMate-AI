import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Globe,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import styles from './Topbar.module.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
];

function Topbar({ onToggleSidebar, onToggleCollapse, sidebarCollapsed }) {
  const { settings, toggleTheme } = useSettings();
  const [profileOpen, setProfileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const profileRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setLanguageOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const selectLanguage = (lang) => {
    setCurrentLang(lang);
    setLanguageOpen(false);
  };

  const isDark = settings.preferences.theme === 'dark';
  const displayName = settings.profile.fullName || 'Guest User';
  const displayEmail = settings.profile.email || 'guest@healthmate.ai';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className={styles.topbar}>
      {/* Left: sidebar toggles + search */}
      <div className={styles.leftSection}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onToggleSidebar}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          className={`${styles.iconButton} ${styles.desktopOnly}`}
          onClick={onToggleCollapse}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>

        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search health information, reports, medicines..."
            className={styles.searchInput}
            aria-label="Global search"
          />
        </div>
      </div>

      {/* Right: language, theme, notifications, profile */}
      <div className={styles.rightSection}>
        {/* Language selector */}
        <div className={styles.dropdownWrapper} ref={langRef}>
          <button
            type="button"
            className={styles.langButton}
            onClick={() => setLanguageOpen((p) => !p)}
            aria-haspopup="menu"
            aria-expanded={languageOpen}
          >
            <Globe size={18} />
            <span className={styles.langLabel}>{currentLang.label}</span>
            <ChevronDown size={14} />
          </button>
          {languageOpen && (
            <div className={styles.dropdown} role="menu">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`${styles.dropdownItem} ${
                    currentLang.code === lang.code
                      ? styles.dropdownItemActive
                      : ''
                  }`}
                  onClick={() => selectLanguage(lang)}
                  role="menuitem"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme switcher — real toggle */}
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label={
            isDark ? 'Switch to light theme' : 'Switch to dark theme'
          }
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className={styles.notificationDot} />
        </button>

        {/* Profile dropdown */}
        <div className={styles.dropdownWrapper} ref={profileRef}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setProfileOpen((p) => !p)}
            aria-haspopup="menu"
            aria-expanded={profileOpen}
          >
            <div className={styles.avatar}>{avatarInitial}</div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{displayName}</span>
              <span className={styles.profileEmail}>{displayEmail}</span>
            </div>
            <ChevronDown size={14} />
          </button>
          {profileOpen && (
            <div className={styles.dropdown} role="menu">
              <Link
                to="/profile"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={() => setProfileOpen(false)}
              >
                <User size={16} />
                Profile
              </Link>
              <Link
                to="/settings"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={() => setProfileOpen(false)}
              >
                <Settings size={16} />
                Settings
              </Link>
              <Link
                to="/help"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={() => setProfileOpen(false)}
              >
                <HelpCircle size={16} />
                Help & Support
              </Link>
              <div className={styles.dropdownDivider} />
              <Link
                to="/"
                className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                role="menuitem"
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={16} />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;