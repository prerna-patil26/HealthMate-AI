import { Construction } from 'lucide-react';
import styles from './StubPage.module.css';

function StubPage({ title, phase }) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Construction size={32} />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>
          This module is coming in <strong>{phase || 'a future phase'}</strong>.
        </p>
        <p className={styles.note}>
          The layout, sidebar, and topbar are already connected — this page is
          ready to be replaced with real content.
        </p>
      </div>
    </div>
  );
}

export default StubPage;