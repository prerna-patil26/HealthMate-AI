import { useState, useRef } from 'react';
import {
  Pill,
  AlertTriangle,
  Info,
  Activity,
  ShieldAlert,
  Ban,
  ExternalLink,
  Lock,
  Upload,
  X,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { getMedicineById } from '../../data/mockMedicines';
import styles from './MedicineDetail.module.css';

const CATEGORY_COLORS = {
  'pain-relief': { bg: '#EAF4FC', fg: '#1769AA' },
  antibiotic: { bg: '#FCE8EA', fg: '#7A1E27' },
  antidiabetic: { bg: '#E5F6F3', fg: '#0E6E65' },
  gastro: { bg: '#FBF3E2', fg: '#7A4F0E' },
  statin: { bg: '#EAF4FC', fg: '#1769AA' },
  antihistamine: { bg: '#E5F6F3', fg: '#0E6E65' },
};

function MedicineDetail({ medicineId }) {
  const medicine = getMedicineById(medicineId);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!medicine) {
    return (
      <div className={styles.emptyState}>
        <p>Medicine not found.</p>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[medicine.category] || CATEGORY_COLORS['pain-relief'];

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const allowedExt = /\.(pdf|jpg|jpeg|png)$/i.test(file.name);

    if (!allowedTypes.includes(file.type) && !allowedExt) {
      alert('Only PDF, JPG, or PNG files are supported.');
      e.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large. Maximum is 10 MB.');
      e.target.value = '';
      return;
    }

    setPrescriptionFile(file);
    e.target.value = '';
  };

  const clearPrescription = () => {
    setPrescriptionFile(null);
  };

  return (
    <div className={styles.container}>
      {/* ---------- Medicine header ---------- */}
      <section className={styles.headerCard}>
        <div className={styles.headerTop}>
          <div
            className={styles.medicineIcon}
            style={{ background: colors.bg, color: colors.fg }}
          >
            <Pill size={32} />
          </div>
          <div className={styles.headerInfo}>
            <h1 className={styles.genericName}>{medicine.genericName}</h1>
            <p className={styles.brandNames}>
              Also known as: {medicine.brandNames.join(' · ')}
            </p>
            <div className={styles.badgeRow}>
              <span
                className={styles.categoryBadge}
                style={{ background: colors.bg, color: colors.fg }}
              >
                {medicine.categoryLabel}
              </span>
              {medicine.prescriptionRequired ? (
                <span className={styles.rxBadge}>
                  <Lock size={11} />
                  Prescription required
                </span>
              ) : (
                <span className={styles.otcBadge}>
                  Over-the-counter (OTC)
                </span>
              )}
            </div>
          </div>
        </div>

        <p className={styles.shortDescription}>{medicine.shortDescription}</p>
      </section>

      {/* ---------- Critical warning ---------- */}
      <section className={styles.criticalWarning}>
        <div className={styles.criticalIconBox}>
          <AlertTriangle size={20} />
        </div>
        <div className={styles.criticalContent}>
          <h3 className={styles.criticalTitle}>Important</h3>
          <p className={styles.criticalText}>{medicine.criticalWarning}</p>
        </div>
      </section>

      {/* ---------- General uses ---------- */}
      <Section
        icon={Info}
        title="General uses"
        iconColor="var(--color-primary)"
        items={medicine.uses}
      />

      {/* ---------- Common side effects ---------- */}
      <Section
        icon={Activity}
        title="Common side effects"
        iconColor="var(--color-warning)"
        items={medicine.sideEffects}
      />

      {/* ---------- Precautions ---------- */}
      <Section
        icon={ShieldAlert}
        title="Precautions"
        iconColor="var(--color-teal)"
        items={medicine.precautions}
      />

      {/* ---------- Interactions ---------- */}
      <Section
        icon={Ban}
        title="Drug interactions"
        iconColor="var(--color-danger)"
        items={medicine.interactions}
      />

      {/* ---------- Prescription upload ---------- */}
      <section className={styles.prescriptionSection}>
        <div className={styles.prescriptionHeader}>
          <div className={styles.prescriptionIcon}>
            <FileText size={20} />
          </div>
          <div>
            <h3 className={styles.prescriptionTitle}>Have a prescription?</h3>
            <p className={styles.prescriptionSubtitle}>
              Upload a prescription to check for potential issues with this
              medicine. Unclear handwriting will be flagged for professional
              verification.
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className={styles.hiddenInput}
          onChange={handleFileSelect}
        />

        {!prescriptionFile ? (
          <button
            type="button"
            className={styles.uploadButton}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <Upload size={14} />
            Upload prescription (PDF, JPG, PNG)
          </button>
        ) : (
          <div className={styles.filePreview}>
            <div className={styles.filePreviewLeft}>
              <CheckCircle2 size={16} />
              <div>
                <p className={styles.fileName}>{prescriptionFile.name}</p>
                <p className={styles.fileHint}>
                  Prescription review arrives in Phase 9.
                </p>
              </div>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={clearPrescription}
              aria-label="Remove file"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </section>

      {/* ---------- Sources ---------- */}
      <section className={styles.sourcesSection}>
        <h3 className={styles.sourcesTitle}>Sources</h3>
        <div className={styles.sourcesList}>
          {medicine.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceItem}
            >
              <div className={styles.sourceText}>
                <span className={styles.sourcePublisher}>
                  {source.publisher}
                </span>
                <span className={styles.sourceTitle}>{source.title}</span>
              </div>
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </section>

      {/* ---------- Safety disclaimer ---------- */}
      <section className={styles.disclaimer}>
        <ShieldAlert size={18} />
        <p>
          This information is <strong>general guidance only</strong> and is not
          a medical recommendation. <strong>Always follow your doctor's
          prescription.</strong> Do not change doses or stop medication without
          professional advice. If you experience severe or unusual symptoms,
          seek medical help immediately.
        </p>
      </section>
    </div>
  );
}

// ---------- Reusable section component ----------
function Section({ icon: Icon, title, iconColor, items }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div
          className={styles.sectionIconBox}
          style={{ color: iconColor }}
        >
          <Icon size={18} />
        </div>
        <h3 className={styles.sectionTitle}>{title}</h3>
      </div>
      <ul className={styles.sectionList}>
        {items.map((item, idx) => (
          <li key={idx} className={styles.sectionItem}>
            <span className={styles.bullet} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MedicineDetail;