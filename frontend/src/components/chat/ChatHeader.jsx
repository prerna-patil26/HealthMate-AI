import { MessageSquareHeart, RotateCcw, ShieldCheck } from 'lucide-react';
import styles from './ChatHeader.module.css';

function ChatHeader({ onNewConversation, hasMessages = false }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.iconWrapper}>
          <MessageSquareHeart size={20} />
          <span className={styles.onlineDot} aria-label="Online" />
        </div>
        <div className={styles.text}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>AI Health Assistant</h1>
            <span className={styles.onlineLabel}>
              <span className={styles.onlineIndicator} />
              Online
            </span>
          </div>
          <p className={styles.subtitle}>
            <ShieldCheck size={12} />
            Source-backed answers · Not a substitute for doctors
          </p>
        </div>
      </div>

      {hasMessages && (
        <button
          type="button"
          className={styles.newButton}
          onClick={onNewConversation}
        >
          <RotateCcw size={16} />
          <span>New conversation</span>
        </button>
      )}
    </header>
  );
}

export default ChatHeader;