import { useState, useCallback } from 'react';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatWindow from '../../components/chat/ChatWindow';
import ChatInput from '../../components/chat/ChatInput';
import { getMockResponse, formatTime } from '../../data/mockConversations';
import styles from './AssistantPage.module.css';

const TYPING_DELAY_MS = 1500;

function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback(({ text, attachment }) => {
    if (!text.trim()) return;

    // Build display text — include attachment notice if present
    let displayText = text;
    if (attachment) {
      displayText = `📎 ${attachment.name}\n\n${text}`;
    }

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'user',
      text: displayText,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponse = getMockResponse(text);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }, []);

  const handleNewConversation = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  const handleSuggestionClick = useCallback(
    (prompt) => {
      handleSend({ text: prompt, attachment: null });
    },
    [handleSend]
  );

  return (
    <div className={styles.page}>
      <ChatHeader
        onNewConversation={handleNewConversation}
        hasMessages={messages.length > 0}
      />

      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        onSuggestionClick={handleSuggestionClick}
      />

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}

export default AssistantPage;