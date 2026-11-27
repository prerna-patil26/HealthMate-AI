import { useState, useEffect } from 'react';
import {
  Shield,
  Download,
  Trash2,
  CheckCircle2,
  Save,
  RotateCcw,
  Lock,
  AlertTriangle,
  X,
} from 'lucide-react';
import SettingsSection from './SettingsSection';
import {
  PRIVACY_OPTIONS,
  CONSENT_OPTIONS,
} from '../../data/mockSettings';
import styles from './PrivacySettings.module.css';

function PrivacySettings({ privacy, consents, onUpdate }) {
  const [privacyForm, setPrivacyForm] = useState(privacy);
  const [consentForm, setConsentForm] = useState(consents);
  const [savedRecently, setSavedRecently] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    setPrivacyForm(privacy);
    setConsentForm(consents);
  }, [privacy, consents]);

  const handlePrivacyToggle = (key) => {
    setPrivacyForm({
      ...privacyForm,
      [key]: !privacyForm[key],
    });
  };

  const handleConsentToggle = (key) => {
    setConsentForm({
      ...consentForm,
      [key]: !consentForm[key],
    });
  };

  const handleSave = () => {
    onUpdate({ privacy: privacyForm, consents: consentForm });
    setSavedRecently(true);
    setTimeout(() => setSavedRecently(false), 2000);
  };

  const handleReset = () => {
    setPrivacyForm(privacy);
    setConsentForm(consents);
    setSavedRecently(false);
  };

  const handleExport = () => {
    // In Phase 9, this will trigger a real backend export
    console.log('Export requested');
    alert(
      'Data export is simulated. In Phase 9, you will receive a downloadable archive of your health data.'
    );
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') return;
    console.log('Account deletion requested');
    alert(
      'Account deletion is simulated. In Phase 9, this will permanently delete all your data.'
    );
    setShowDeleteDialog(false);
    setDeleteConfirmText('');
  };

  const privacyHasChanges =
    JSON.stringify(privacyForm) !== JSON.stringify(privacy);
  const consentsHaveChanges =
    JSON.stringify(consentForm) !== JSON.stringify(consents);
  const hasChanges = privacyHasChanges || consentsHaveChanges;

  return (
    <div className={styles.stack}>
      {/* ---------- Privacy controls ---------- */}
      <SettingsSection
        title="Privacy controls"
        description="Choose what data you share and how it's used."
        icon={<Shield size={20} />}
      >
        <div className={styles.toggleList}>
          {PRIVACY_OPTIONS.map((option) => (
            <div key={option.id} className={styles.toggleRow}>
              <div className={styles.toggleText}>
                <span className={styles.toggleLabel}>{option.label}</span>
                <span className={styles.toggleDescription}>
                  {option.description}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={privacyForm[option.id]}
                aria-label={`Toggle ${option.label}`}
                className={`${styles.switch} ${
                  privacyForm[option.id] ? styles.switchOn : ''
                }`}
                onClick={() => handlePrivacyToggle(option.id)}
              >
                <span className={styles.switchThumb} />
              </button>
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* ---------- Consent management ---------- */}
      <SettingsSection
        title="Consent management"
        description="Control the permissions you've granted to HealthMate AI."
        icon={<CheckCircle2 size={20} />}
      >
        <div className={styles.toggleList}>
          {CONSENT_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`${styles.toggleRow} ${
                option.required ? styles.toggleRowRequired : ''
              }`}
            >
              <div className={styles.toggleText}>
                <div className={styles.toggleLabelRow}>
                  <span className={styles.toggleLabel}>{option.label}</span>
                  {option.required && (
                    <span className={styles.requiredBadge}>
                      <Lock size={10} />
                      Required
                    </span>
                  )}
                </div>
                <span className={styles.toggleDescription}>
                  {option.description}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={consentForm[option.id]}
                aria-label={`Toggle ${option.label}`}
                className={`${styles.switch} ${
                  consentForm[option.id] ? styles.switchOn : ''
                } ${option.required ? styles.switchLocked : ''}`}
                onClick={() =>
                  !option.required && handleConsentToggle(option.id)
                }
                disabled={option.required}
              >
                <span className={styles.switchThumb} />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.consentNote}>
          <Lock size={12} />
          <span>
            Required consent cannot be disabled — it's necessary for the AI
            assistant and report analysis to function.
          </span>
        </div>
      </SettingsSection>

      {/* ---------- Data management ---------- */}
      <SettingsSection
        title="Your data"
        description="Export or delete the data you've shared with HealthMate AI."
        icon={<Download size={20} />}
      >
        <div className={styles.dataActions}>
          <div className={styles.dataActionRow}>
            <div className={styles.dataActionText}>
              <span className={styles.dataActionTitle}>Download my data</span>
              <span className={styles.dataActionDescription}>
                Get a copy of all your health information, reports, and
                preferences.
              </span>
            </div>
            <button
              type="button"
              className={styles.exportButton}
              onClick={handleExport}
            >
              <Download size={14} />
              Export
            </button>
          </div>

          <div className={`${styles.dataActionRow} ${styles.dangerRow}`}>
            <div className={styles.dataActionText}>
              <span className={styles.dataActionTitle}>Delete my account</span>
              <span className={styles.dataActionDescription}>
                Permanently delete your account and all associated data. This
                cannot be undone.
              </span>
            </div>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 size={14} />
              Delete account
            </button>
          </div>
        </div>
      </SettingsSection>

      {/* ---------- Actions ---------- */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          disabled={!hasChanges}
        >
          <RotateCcw size={14} />
          Reset
        </button>
        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          {savedRecently ? (
            <>
              <CheckCircle2 size={14} />
              Saved
            </>
          ) : (
            <>
              <Save size={14} />
              Save changes
            </>
          )}
        </button>
      </div>

      {/* ---------- Delete confirmation dialog ---------- */}
      {showDeleteDialog && (
        <div className={styles.dialogBackdrop} onClick={() => setShowDeleteDialog(false)}>
          <div
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <div className={styles.dialogIcon}>
              <AlertTriangle size={24} />
            </div>
            <h3 id="delete-dialog-title" className={styles.dialogTitle}>
              Delete your account?
            </h3>
            <p className={styles.dialogText}>
              This will permanently delete all your health data, reports, and
              conversations. This action <strong>cannot be undone</strong>.
            </p>
            <p className={styles.dialogPrompt}>
              Type <strong>DELETE</strong> to confirm:
            </p>
            <input
              type="text"
              className={styles.dialogInput}
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              autoFocus
            />
            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.dialogCancel}
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteConfirmText('');
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.dialogConfirm}
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
              >
                <Trash2 size={14} />
                Delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrivacySettings;