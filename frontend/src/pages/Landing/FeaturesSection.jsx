import {
  MessageSquareHeart,
  FileText,
  Stethoscope,
  Pill,
  CalendarClock,
  BarChart3,
  Users,
  Mic,
} from 'lucide-react';
import styles from './FeaturesSection.module.css';

const FEATURES = [
  {
    icon: MessageSquareHeart,
    title: 'AI Health Assistant',
    description:
      'Ask general health questions and get clear, source-backed answers with safety disclaimers.',
  },
  {
    icon: FileText,
    title: 'Medical Reports',
    description:
      'Upload PDF or image reports and understand extracted values with plain-language explanations.',
  },
  {
    icon: Stethoscope,
    title: 'Symptom Guidance',
    description:
      'Organize your symptoms through a guided questionnaire and understand appropriate next steps.',
  },
  {
    icon: Pill,
    title: 'Medicine Information',
    description:
      'Look up general uses, common side effects, and precautions from reliable sources.',
  },
  {
    icon: CalendarClock,
    title: 'Health Timeline',
    description:
      'See reports, appointments, and saved events in one chronological view, filterable by date.',
  },
  {
    icon: BarChart3,
    title: 'Health Analytics',
    description:
      'Visualize trends from your uploaded data with clear charts showing units, dates, and context.',
  },
  {
    icon: Users,
    title: 'Family Health',
    description:
      'Manage family profiles with consent-based access and fully separated health records.',
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    description:
      'Interact by voice in English, Hindi, Marathi, or Gujarati, with speech-to-text and text-to-speech.',
  },
];

function FeaturesSection() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Main Features</span>
          <h2 className={styles.heading}>
            Everything you need to understand your health
          </h2>
          <p className={styles.subheading}>
            HealthMate AI brings your health information, medical guidance, and
            navigation into one intelligent platform.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <article key={title} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Icon size={24} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDescription}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;