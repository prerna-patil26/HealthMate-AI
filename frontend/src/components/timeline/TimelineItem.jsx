import { Link } from 'react-router-dom';
import {
  FileText,
  Stethoscope,
  Pill,
  CalendarCheck2,
  MessageSquareHeart,
  ChevronRight,
} from 'lucide-react';
import { formatRelativeTime } from '../../data/mockTimeline';
import styles from './TimelineItem.module.css';

const TYPE_CONFIG = {
  report: {
    Icon: FileText,
    label: 'Report',
    variant: 'report',
  },
  symptom: {
    Icon: Stethoscope,
    label: 'Symptom',
    variant: 'symptom',
  },
  medicine: {
    Icon: Pill,
    label: 'Medicine',
    variant: 'medicine',
  },
  appointment: {
    Icon: CalendarCheck2,
    label: 'Appointment',
    variant: 'appointment',
  },
  conversation: {
    Icon: MessageSquareHeart,
    label: 'Conversation',
    variant: 'conversation',
  },
};

function TimelineItem({ event }) {
  const config = TYPE_CONFIG[event.type] || TYPE_CONFIG.report;
  const { Icon, label, variant } = config;
  const relativeTime = formatRelativeTime(event.timestamp);

  return (
    <Link
      to={event.sourceLink}
      className={`${styles.card} ${styles[`card-${variant}`]}`}
    >
      {/* Timeline dot on the left (sits on the vertical line) */}
      <span
        className={`${styles.dot} ${styles[`dot-${variant}`]}`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <span
            className={`${styles.typeBadge} ${styles[`typeBadge-${variant}`]}`}
          >
            <Icon size={12} />
            {label}
          </span>
          <span className={styles.timestamp}>{relativeTime}</span>
        </div>

        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.subtitle}>{event.subtitle}</p>
      </div>

      {/* Chevron */}
      <ChevronRight size={18} className={styles.chevron} />
    </Link>
  );
}

export default TimelineItem;