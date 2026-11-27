import { useState, useEffect } from 'react';
import { User, Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import SettingsSection from './SettingsSection';
import {
  LANGUAGES,
  formatPhone,
  isValidEmail,
} from '../../data/mockSettings';
import styles from './ProfileSettings.module.css';

function ProfileSettings({ profile, onUpdate }) {
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [savedRecently, setSavedRecently] = useState(false);

  // Sync form when parent's profile changes (e.g. discard)
  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === 'phone') {
      value = formatPhone(value);
    }
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) {
      next.fullName = 'Name is required';
    } else if (form.fullName.trim().length < 2) {
      next.fullName = 'Name is too short';
    }

    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      next.email = 'Enter a valid email address';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onUpdate(form);
    setSavedRecently(true);
    setTimeout(() => setSavedRecently(false), 2000);
  };

  const handleReset = () => {
    setForm(profile);
    setErrors({});
    setSavedRecently(false);
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(profile);

  return (
    <SettingsSection
      title="Personal information"
      description="Update your basic profile details and preferred language."
      icon={<User size={20} />}
      footer={
        <>
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
        </>
      }
    >
      <div className={styles.formGrid}>
        {/* Full name */}
        <div className={styles.field}>
          <label htmlFor="profile-name" className={styles.label}>
            Full name <span className={styles.required}>*</span>
          </label>
          <input
            id="profile-name"
            type="text"
            className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
            value={form.fullName}
            onChange={handleChange('fullName')}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.fullName && (
            <span className={styles.errorText}>{errors.fullName}</span>
          )}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label htmlFor="profile-email" className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            id="profile-email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <label htmlFor="profile-phone" className={styles.label}>
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="profile-phone"
            type="tel"
            className={styles.input}
            value={form.phone || ''}
            onChange={handleChange('phone')}
            placeholder="98765 43210"
            autoComplete="tel"
          />
          <span className={styles.helperText}>
            Used only for appointment reminders.
          </span>
        </div>

        {/* Date of birth */}
        <div className={styles.field}>
          <label htmlFor="profile-dob" className={styles.label}>
            Date of birth <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="profile-dob"
            type="date"
            className={styles.input}
            value={form.dateOfBirth || ''}
            onChange={handleChange('dateOfBirth')}
            max={new Date().toISOString().split('T')[0]}
          />
          <span className={styles.helperText}>
            Helps us provide age-appropriate health information.
          </span>
        </div>

        {/* Language */}
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label htmlFor="profile-language" className={styles.label}>
            Preferred language
          </label>
          <select
            id="profile-language"
            className={styles.select}
            value={form.language || 'en'}
            onChange={handleChange('language')}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.nativeLabel} ({lang.label})
              </option>
            ))}
          </select>
          <span className={styles.helperText}>
            Used for AI responses and voice interaction. You can change this
            anytime.
          </span>
        </div>
      </div>
    </SettingsSection>
  );
}

export default ProfileSettings;