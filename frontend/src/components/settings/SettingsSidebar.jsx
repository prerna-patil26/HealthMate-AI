import { User, Sliders, Shield, Lock } from 'lucide-react';
import styles from './SettingsSidebar.module.css';

const SECTION_ICONS = {
  profile: User,
  preferences: Sliders,
  privacy: Shield,
  security: Lock,
};

/**
 * Left sidebar navigation for the Settings page.
 * Fully controlled — parent owns active state.
 */
function SettingsSidebar({ sections, activeSection, onSelect }) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav} aria-label="Settings sections">
        {sections.map((section) => {
          const Icon = SECTION_ICONS[section.id] || User;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={() => onSelect(section.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.navIcon}>
                <Icon size={18} />
              </span>
              <span className={styles.navText}>
                <span className={styles.navLabel}>{section.label}</span>
                <span className={styles.navDescription}>
                  {section.description}
                </span>
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default SettingsSidebar;