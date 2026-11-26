import { Bot } from 'lucide-react';
import styles from './TypingIndicator.module.css';

function TypingIndicator() {
  return (
    <div className={styles.row}>
      <div className={styles.avatarAi}>
        <Bot size={18} />
      </div>
      <div className={styles.bubble}>
        <span className={styles.dot} style={{ animationDelay: '0s' }} />
        <span className={styles.dot} style={{ animationDelay: '0.15s' }} />
        <span className={styles.dot} style={{ animationDelay: '0.3s' }} />
      </div>
      <span className={styles.label}>HealthMate AI is thinking…</span>
    </div>
  );
}

export default TypingIndicator;