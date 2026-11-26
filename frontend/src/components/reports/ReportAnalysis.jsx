import {
  FileText,
  Calendar,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import LabValueCard from './LabValueCard';
import { getFlaggedCount, getUncertainCount } from '../../data/mockReports';
import styles from './ReportAnalysis.module.css';

function formatFullDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function ReportAnalysis({ report, onBack }) {
  if (!report) {
    return (
      <div className={styles.emptyState}>
        <p>Report not found.</p>
      </div>
    );
  }

  const valueCount = report.values?.length || 0;
  const flagged = getFlaggedCount(report);
  const uncertain = getUncertainCount(report);
  const normal = valueCount - flagged;

  return (
    <div className={styles.container}>
      {/* ---------- Overview banner ---------- */}
      <section className={styles.overviewCard}>
        <div className={styles.overviewHeader}>
          <div className={styles.overviewIcon}>
            <FileText size={22} />
          </div>
          <div className={styles.overviewTitleBlock}>
            <h2 className={styles.overviewTitle}>{report.title}</h2>
            <div className={styles.overviewMeta}>
              <span>
                <Calendar size={12} />
                {formatFullDate(report.uploadedAt)}
              </span>
              <span>
                <FileText size={12} />
                {report.fileName}
              </span>
            </div>
          </div>
          <button
            type="button"
            className={styles.viewOriginalButton}
            title="Coming in Phase 9"
          >
            <ExternalLink size={14} />
            View original
          </button>
        </div>

        <p className={styles.overviewDescription}>{report.overview}</p>
      </section>

      {/* ---------- Stats row ---------- */}
      <section className={styles.statsRow}>
        <div className={styles.stat}>
          <div className={styles.statIcon} style={{ background: '#EAF4FC', color: '#1769AA' }}>
            <FileText size={18} />
          </div>
          <div>
            <p className={styles.statValue}>{valueCount}</p>
            <p className={styles.statLabel}>
              {valueCount === 1 ? 'Value' : 'Values'} measured
            </p>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statIcon} style={{ background: '#E6F4EC', color: '#198754' }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className={styles.statValue}>{normal}</p>
            <p className={styles.statLabel}>In reference range</p>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statIcon} style={{ background: '#FBF3E2', color: '#A56B0E' }}>
            <AlertCircle size={18} />
          </div>
          <div>
            <p className={styles.statValue}>{flagged}</p>
            <p className={styles.statLabel}>
              Outside reference range
            </p>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statIcon} style={{ background: '#FBF3E2', color: '#A56B0E' }}>
            <HelpCircle size={18} />
          </div>
          <div>
            <p className={styles.statValue}>{uncertain}</p>
            <p className={styles.statLabel}>Uncertain readings</p>
          </div>
        </div>
      </section>

      {/* ---------- Values list ---------- */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesHeader}>
          <h3 className={styles.valuesTitle}>
            Extracted Values ({valueCount})
          </h3>
          <p className={styles.valuesSubtitle}>
            Tap any value to see what it measures and why doctors track it.
          </p>
        </div>

        {valueCount === 0 ? (
          <div className={styles.emptyValues}>
            <HelpCircle size={32} />
            <p>No values extracted yet.</p>
            <p className={styles.emptyHint}>
              This report is pending analysis — extraction arrives in Phase 9.
            </p>
          </div>
        ) : (
          <div className={styles.valuesList}>
            {report.values.map((value) => (
              <LabValueCard key={value.id} value={value} />
            ))}
          </div>
        )}
      </section>

      {/* ---------- Comparison prompt ---------- */}
      {valueCount > 0 && (
        <section className={styles.comparisonCard}>
          <div className={styles.comparisonIcon}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.comparisonText}>
            <h4 className={styles.comparisonTitle}>
              Track trends over time
            </h4>
            <p className={styles.comparisonDesc}>
              Upload another report of the same type to compare values and see
              trends. Comparison arrives in Phase 8.
            </p>
          </div>
        </section>
      )}

      {/* ---------- Safety disclaimer ---------- */}
      <section className={styles.disclaimer}>
        <div className={styles.disclaimerIcon}>
          <ShieldAlert size={20} />
        </div>
        <div className={styles.disclaimerText}>
          <h4 className={styles.disclaimerTitle}>Important</h4>
          <p>
            Values outside the reference range do <strong>not</strong>{' '}
            automatically indicate disease. Many factors — time of day,
            hydration, recent meals, stress, and others — can shift readings.
            Always discuss results with the doctor who ordered the test before
            making any medical decision.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ReportAnalysis;