import { AlertTriangle, Phone } from 'lucide-react';
import { RED_FLAGS } from '../../data/symptomQuestions';
import styles from './RedFlagScreen.module.css';

function RedFlagScreen({ value = {}, onChange }) {
  const handleAnswer = (flagId, answer) => {
    onChange({ ...value, [flagId]: answer });
  };

  const answeredCount = Object.keys(value).length;
  const yesCount = Object.values(value).filter((v) => v === true).length;

  return (
    <div className={styles.container}>
      {/* ---------- Emergency notice at top ---------- */}
      <div className={styles.emergencyNotice}>
        <div className={styles.emergencyIconCircle}>
          <Phone size={18} />
        </div>
        <div>
          <h3 className={styles.emergencyTitle}>In an emergency, call 112 now</h3>
          <p className={styles.emergencyText}>
            If any of the following apply to you right now, do not wait for this
            assessment — call <strong>112</strong> (India) or go to the nearest
            emergency department immediately.
          </p>
        </div>
      </div>

      {/* ---------- Header ---------- */}
      <div className={styles.header}>
        <h2 className={styles.title}>Emergency check</h2>
        <p className={styles.hint}>
          Please answer honestly. This helps us understand whether you need
          urgent medical care. Nothing is shared without your consent.
        </p>
      </div>

      {/* ---------- Red flag questions ---------- */}
      <div className={styles.questionsList}>
        {RED_FLAGS.map((flag, index) => {
          const currentAnswer = value[flag.id];
          const isYes = currentAnswer === true;
          const isNo = currentAnswer === false;

          return (
            <div
              key={flag.id}
              className={`${styles.questionCard} ${isYes ? styles.questionCardYes : ''}`}
            >
              <div className={styles.questionContent}>
                <div className={styles.questionNumber}>{index + 1}</div>
                <div className={styles.questionText}>
                  <span className={styles.questionLabel}>{flag.label}</span>
                  <span className={styles.questionDescription}>
                    {flag.description}
                  </span>
                </div>
              </div>

              <div className={styles.answerButtons}>
                <button
                  type="button"
                  className={`${styles.answerButton} ${styles.answerYes} ${
                    isYes ? styles.answerYesSelected : ''
                  }`}
                  onClick={() => handleAnswer(flag.id, true)}
                  aria-pressed={isYes}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`${styles.answerButton} ${styles.answerNo} ${
                    isNo ? styles.answerNoSelected : ''
                  }`}
                  onClick={() => handleAnswer(flag.id, false)}
                  aria-pressed={isNo}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Footer summary ---------- */}
      <div className={styles.footer}>
        <span className={styles.progressText}>
          {answeredCount} of {RED_FLAGS.length} answered
        </span>
        {yesCount > 0 && (
          <span className={styles.warningBadge}>
            <AlertTriangle size={12} />
            {yesCount} urgent {yesCount === 1 ? 'sign' : 'signs'} selected
          </span>
        )}
      </div>
    </div>
  );
}

export default RedFlagScreen;