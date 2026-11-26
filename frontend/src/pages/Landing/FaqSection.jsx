import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import styles from './FaqSection.module.css';

const FAQS = [
  {
    question: 'Is HealthMate AI a replacement for my doctor?',
    answer:
      'No. HealthMate AI provides general health information and navigation only. It does not diagnose diseases, prescribe medication, or replace professional medical advice. Always consult a qualified healthcare provider before making medical decisions.',
  },
  {
    question: 'How does HealthMate AI handle my health information?',
    answer:
      'We require explicit consent before processing any personal health information. Your data is protected with secure authentication, role-based access, and clear privacy controls. You can export or delete your data at any time from account settings.',
  },
  {
    question: 'Can I upload my medical reports?',
    answer:
      'Yes. You can upload PDF, JPG, or PNG reports. HealthMate AI extracts values with their units and reference ranges, and explains them in plain language. Unclear values are flagged for verification, and the original report is always preserved.',
  },
  {
    question: 'Does HealthMate AI provide medicine recommendations?',
    answer:
      'No. HealthMate AI only provides general medicine information from reliable sources — uses, common side effects, and precautions. It never recommends dosages, changes to prescribed treatment, or stopping medication.',
  },
  {
    question: 'Which languages does the voice assistant support?',
    answer:
      'Voice interaction is planned for English, Hindi, Marathi, and Gujarati, with full transcripts. You choose the language from a selector, and recording is always visibly indicated.',
  },
  {
    question: 'How do I get emergency help?',
    answer:
      'HealthMate AI is not a substitute for emergency services. In a medical emergency in India, dial 112 immediately. HealthMate AI displays this number prominently across every screen so you always have it available.',
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.heading}>Frequently asked questions</h2>
          <p className={styles.subheading}>
            Clear answers to the questions we hear most. Can&apos;t find what you
            need? Reach out from Help &amp; Support inside the app.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.faqButton}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={styles.faqQuestionRow}>
                    <HelpCircle size={18} className={styles.faqQuestionIcon} />
                    <span className={styles.faqQuestion}>{faq.question}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={styles.faqAnswerWrapper}
                  role="region"
                >
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaRow}>
          <p className={styles.ctaText}>Still have questions?</p>
          <a
            href="mailto:support@healthmate.ai"
            className={styles.ctaLink}
          >
            Contact support
          </a>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;