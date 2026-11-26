import { FileText, Calendar, AlertCircle, HelpCircle, ChevronRight } from 'lucide-react';
import { getFlaggedCount, getUncertainCount } from '../../data/mockReports';
import styles from './ReportCard.module.css';

const TYPE_COLORS = {
  'lipid-profile': { bg: '#EAF4FC', fg: '#1769AA' },
  cbc: { bg: '#E5F6F3', fg: '#0E6E65' },
  thyroid: { bg: '#FBF3E2', fg: '#7A4F0E' },
  'blood-test': { bg: '#FCE8EA', fg: '#7A1E27' },
  other: { bg: '#EEF2F5', fg: '#5A7184' },
};

function formatUploadDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Uploaded today';
  if (diffDays === 1) return 'Uploaded yesterday';
  if (diffDays < 7) return `Uploaded ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Uploaded ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  return `Uploaded ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
}

function ReportCard({ report, onOpen }) {
  const flagged = getFlaggedCount(report);
  const uncertain = getUncertainCount(report);
  const valueCount = report.values?.length || 0;
  const typeColor = TYPE_COLORS[report.type] || TYPE_COLORS.other;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onOpen}
      aria-label={`Open ${report.title}`}
    >
      {/* Type icon */}
      <div
        className={styles.iconBox}
        style={{ background: typeColor.bg, color: typeColor.fg }}
      >
        <FileText size={22} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{report.title}</h3>
          {report.typeLabel && (
            <span
              className={styles.typeBadge}
              style={{ background: typeColor.bg, color: typeColor.fg }}
            >
              {report.typeLabel}
            </span>
          )}
        </div>

        <p className={styles.fileName}>{report.fileName}</p>

        <div className={styles.metaRow}>
          <span className={styles.meta}>
            <Calendar size={12} />
            {formatUploadDate(report.uploadedAt)}
          </span>

          {valueCount > 0 && (
            <span className={styles.meta}>
              {valueCount} {valueCount === 1 ? 'value' : 'values'}
            </span>
          )}

          {flagged > 0 && (
            <span className={styles.flaggedBadge}>
              <AlertCircle size={12} />
              {flagged} flagged
            </span>
          )}

          {uncertain > 0 && (
            <span className={styles.uncertainBadge}>
              <HelpCircle size={12} />
              {uncertain} uncertain
            </span>
          )}
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight size={18} className={styles.chevron} />
    </button>
  );
}

export default ReportCard;