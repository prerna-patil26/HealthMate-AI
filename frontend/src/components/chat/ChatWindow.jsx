import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';
import styles from './ChatWindow.module.css';

function ChatWindow({
  messages = [],
  isTyping = false,
  onSuggestionClick,
}) {
  const bottomRef = useRef(null);
  const windowRef = useRef(null);

  // Auto-scroll to bottom when messages or typing change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isTyping]);

  const isEmpty = messages.length === 0 && !isTyping;

  return (
    <div className={styles.window} ref={windowRef}>
      {isEmpty ? (
        <WelcomeScreen onSuggestionClick={onSuggestionClick} />
      ) : (
        <div className={styles.messageList}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={bottomRef} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export default ChatWindow;