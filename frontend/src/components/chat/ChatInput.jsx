import { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, Send, X } from 'lucide-react';
import styles from './ChatInput.module.css';

const MAX_CHARS = 2000;
const MAX_ROWS_PX = 160;

function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-grow textarea up to MAX_ROWS_PX
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, MAX_ROWS_PX)}px`;
  }, [text]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend({ text: trimmed, attachment: attachedFile });
    setText('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    // Refocus input after send
    setTimeout(() => textareaRef.current && textareaRef.current.focus(), 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setAttachedFile(file);
  };

  const clearAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleRecording = () => {
    setIsRecording((r) => !r);
    // Real recording arrives in Phase 8 (Voice Assistant)
  };

  const charsLeft = MAX_CHARS - text.length;
  const showCounter = text.length > MAX_CHARS - 200;
  const overLimit = text.length > MAX_CHARS;
  const canSend = text.trim().length > 0 && !overLimit && !disabled;

  return (
    <div className={styles.inputArea}>
      {/* Attachment preview */}
      {attachedFile && (
        <div className={styles.attachmentPreview}>
          <Paperclip size={14} />
          <span className={styles.attachmentName}>{attachedFile.name}</span>
          <span className={styles.attachmentSize}>
            ({(attachedFile.size / 1024).toFixed(0)} KB)
          </span>
          <button
            type="button"
            className={styles.removeAttachment}
            onClick={clearAttachment}
            aria-label="Remove attachment"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main input row */}
      <div className={styles.inputRow}>
        {/* File attach */}
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          aria-label="Attach file"
          title="Attach a medical report (PDF, JPG, PNG)"
          disabled={disabled}
        >
          <Paperclip size={18} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className={styles.hiddenFileInput}
          onChange={handleFileChange}
          tabIndex={-1}
        />

        {/* Textarea */}
        <div className={styles.textareaWrapper}>
          <textarea
            ref={textareaRef}
            className={`${styles.textarea} ${overLimit ? styles.textareaError : ''}`}
            placeholder="Type your health question... (Shift + Enter for new line)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={disabled}
            aria-label="Message input"
          />
          {showCounter && (
            <span
              className={`${styles.counter} ${overLimit ? styles.counterError : ''}`}
            >
              {charsLeft}
            </span>
          )}
        </div>

        {/* Mic */}
        <button
          type="button"
          className={`${styles.iconButton} ${isRecording ? styles.iconButtonRecording : ''}`}
          onClick={toggleRecording}
          aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
          title={isRecording ? 'Stop recording' : 'Voice input (coming in Phase 8)'}
          disabled={disabled}
        >
          <Mic size={18} />
          {isRecording && <span className={styles.recordingDot} />}
        </button>

        {/* Send */}
        <button
          type="button"
          className={styles.sendButton}
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Recording indicator */}
      {isRecording && (
        <div className={styles.recordingBanner}>
          <span className={styles.recordingBannerDot} />
          Voice recording is not connected yet — coming in Phase 8.
        </div>
      )}

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        HealthMate AI provides general health information only. It does not
        diagnose diseases or replace professional medical advice.
      </p>
    </div>
  );
}

export default ChatInput;