import styles from './SettingsSection.module.css';

/**
 * Reusable wrapper for a settings section.
 * Provides a consistent header + body styling.
 *
 * Props:
 *   title: string
 *   description: string (optional)
 *   icon: React node (optional)
 *   children: React node
 *   footer: React node (optional) — e.g. save buttons
 */
function SettingsSection({ title, description, icon, children, footer }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        {icon && <div className={styles.iconBox}>{icon}</div>}
        <div className={styles.headerText}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>

      <div className={styles.body}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </section>
  );
}

export default SettingsSection;