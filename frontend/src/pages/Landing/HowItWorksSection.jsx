import { Upload, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import styles from './HowItWorksSection.module.css';

const STEPS = [
  {
    number: '01',
    icon: Upload,
    title: 'Add your information',
    description:
      'Upload a medical report, describe a symptom, or ask a general health question — whichever fits your need.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Get clear, source-backed answers',
    description:
      'HealthMate AI processes your input using RAG and specialist agents, with genuine citations and safety warnings.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Understand and act',
    description:
      'See plain-language explanations, view trends over time, and get guided next steps — including when to see a doctor.',
  },
];

function HowItWorksSection() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className={styles.heading}>Three simple steps</h2>
          <p className={styles.subheading}>
            From upload to understanding — HealthMate AI guides you through every
            step, with safety and clarity built in.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map(({ number, icon: Icon, title, description }, index) => (
            <div key={number} className={styles.stepWrapper}>
              <article className={styles.step}>
                <div className={styles.numberBadge}>{number}</div>
                <div className={styles.iconWrapper}>
                  <Icon size={26} />
                </div>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDescription}>{description}</p>
              </article>

              {index < STEPS.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <svg
                    width="40"
                    height="24"
                    viewBox="0 0 40 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12H34M34 12L26 5M34 12L26 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.safetyNote}>
          <ShieldCheck size={18} />
          <span>
            Every response includes safety disclaimers. HealthMate AI never
            diagnoses diseases or prescribes medication.
          </span>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;