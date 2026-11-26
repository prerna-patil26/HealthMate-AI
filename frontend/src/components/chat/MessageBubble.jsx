import { Bot, User, BookOpen } from 'lucide-react';
import SourceCitation from './SourceCitation';
import SafetyBanner from './SafetyBanner';
import styles from './MessageBubble.module.css';

function MessageBubble({ message, onSuggestionClick }) {
  const {
    role,
    text,
    timestamp,
    sources = [],
    showSafetyBanner = false,
    suggestions = [],
  } = message;

  const isUser = role === 'user';

  return (
    <div className={`${styles.row} ${isUser ? styles.userRow : styles.aiRow}`}>
      {/* AI avatar (left) */}
      {!isUser && (
        <div className={styles.avatarAi}>
          <Bot size={18} />
        </div>
      )}

      {/* Bubble + extras */}
      <div className={styles.bubbleColumn}>
        <div
          className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAi}`}
        >
          <p className={styles.text}>{text}</p>
          {timestamp && (
            <span className={styles.timestamp}>{timestamp}</span>
          )}
        </div>

        {/* Source citations (AI only) */}
        {!isUser && sources.length > 0 && (
          <div className={styles.sources}>
            <div className={styles.sourcesHeader}>
              <BookOpen size={13} />
              <span>Sources</span>
            </div>
            <div className={styles.sourcesList}>
              {sources.map((src) => (
                <SourceCitation key={src.url || src.title} source={src} />
              ))}
            </div>
          </div>
        )}

        {/* Safety banner (AI only) */}
        {!isUser && showSafetyBanner && <SafetyBanner />}

        {/* Suggested follow-ups (AI only) */}
        {!isUser && suggestions.length > 0 && (
          <div className={styles.suggestions}>
            <p className={styles.suggestionsLabel}>You might also ask:</p>
            <div className={styles.suggestionChips}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={styles.suggestionChip}
                  onClick={() => onSuggestionClick && onSuggestionClick(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User avatar (right) */}
      {isUser && (
        <div className={styles.avatarUser}>
          <User size={16} />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;