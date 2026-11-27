import { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  Smartphone,
  Monitor,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  EyeOff,
} from 'lucide-react';
import SettingsSection from './SettingsSection';
import styles from './SecuritySettings.module.css';

// Mock active sessions
const MOCK_SESSIONS = [
  {
    id: 'sess-1',
    device: 'Chrome on Windows',
    icon: Monitor,
    location: 'Mumbai, India',
    lastActive: 'Active now',
    current: true,
  },
  {
    id: 'sess-2',
    device: 'Safari on iPhone',
    icon: Smartphone,
    location: 'Mumbai, India',
    lastActive: '2 hours ago',
    current: false,
  },
  {
    id: 'sess-3',
    device: 'Firefox on MacBook',
    icon: Monitor,
    location: 'Delhi, India',
    lastActive: 'Yesterday',
    current: false,
  },
];

// Mock security activity
const MOCK_ACTIVITY = [
  {
    id: 'act-1',
    event: 'Signed in from Chrome on Windows',
    timestamp: 'Just now',
    status: 'success',
  },
  {
    id: 'act-2',
    event: 'Password changed successfully',
    timestamp: '2 days ago',
    status: 'success',
  },
  {
    id: 'act-3',
    event: 'New login attempt blocked (unknown device)',
    timestamp: '5 days ago',
    status: 'warning',
  },
  {
    id: 'act-4',
    event: 'Signed in from Safari on iPhone',
    timestamp: '1 week ago',
    status: 'success',
  },
  {
    id: 'act-5',
    event: 'Account created',
    timestamp: '3 weeks ago',
    status: 'success',
  },
];

function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);

  const getPasswordStrength = () => {
    const p = newPassword;
    if (!p) return { level: 0, label: '', color: '' };
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 2) return { level: 1, label: 'Weak', color: 'var(--color-danger)' };
    if (score === 3) return { level: 2, label: 'Fair', color: 'var(--color-warning)' };
    if (score === 4) return { level: 3, label: 'Good', color: '#5BAE6C' };
    return { level: 4, label: 'Strong', color: 'var(--color-success)' };
  };

  const validate = () => {
    const next = {};
    if (!currentPassword) next.currentPassword = 'Current password is required';
    if (!newPassword) next.newPassword = 'New password is required';
    else if (newPassword.length < 8) next.newPassword = 'Password must be at least 8 characters';
    if (!confirmPassword) next.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== newPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChangePassword = () => {
    if (!validate()) return;
    console.log('Password change requested');
    setSuccessMessage('Password changed successfully (simulated)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSignOutAll = () => {
    if (window.confirm('Sign out of all devices except this one?')) {
      console.log('Sign out all devices requested');
      alert('Sign out all devices is simulated. In Phase 9, this will end all other sessions.');
    }
  };

  const strength = getPasswordStrength();
  const canSubmitPassword =
    currentPassword && newPassword && confirmPassword;

  return (
    <div className={styles.stack}>
      {/* ---------- Change password ---------- */}
      <SettingsSection
        title="Change password"
        description="Update your password regularly to keep your account secure."
        icon={<Lock size={20} />}
      >
        {successMessage && (
          <div className={styles.successBanner}>
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        <div className={styles.formStack}>
          {/* Current password */}
          <div className={styles.field}>
            <label htmlFor="sec-current" className={styles.label}>
              Current password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="sec-current"
                type={showCurrent ? 'text' : 'password'}
                className={`${styles.input} ${errors.currentPassword ? styles.inputError : ''}`}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setErrors({ ...errors, currentPassword: '' });
                }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowCurrent((p) => !p)}
                aria-label={showCurrent ? 'Hide' : 'Show'}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && (
              <span className={styles.errorText}>{errors.currentPassword}</span>
            )}
          </div>

          {/* New password */}
          <div className={styles.field}>
            <label htmlFor="sec-new" className={styles.label}>
              New password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="sec-new"
                type={showNew ? 'text' : 'password'}
                className={`${styles.input} ${errors.newPassword ? styles.inputError : ''}`}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: '' });
                }}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowNew((p) => !p)}
                aria-label={showNew ? 'Hide' : 'Show'}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {newPassword && (
              <div className={styles.strengthRow}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${strength.level * 25}%`,
                      background: strength.color,
                    }}
                  />
                </div>
                <span className={styles.strengthLabel} style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
            {errors.newPassword && (
              <span className={styles.errorText}>{errors.newPassword}</span>
            )}
          </div>

          {/* Confirm password */}
          <div className={styles.field}>
            <label htmlFor="sec-confirm" className={styles.label}>
              Confirm new password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="sec-confirm"
                type={showConfirm ? 'text' : 'password'}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={showConfirm ? 'Hide' : 'Show'}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleChangePassword}
            disabled={!canSubmitPassword}
          >
            <Lock size={14} />
            Change password
          </button>
        </div>
      </SettingsSection>

      {/* ---------- Two-factor authentication ---------- */}
      <SettingsSection
        title="Two-factor authentication"
        description="Add an extra layer of security to your account."
        icon={<ShieldCheck size={20} />}
      >
        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleLabel}>Enable two-factor authentication</span>
            <span className={styles.toggleDescription}>
              When enabled, you'll need a code from your authenticator app to sign in.
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={twoFactor}
            aria-label="Toggle two-factor authentication"
            className={`${styles.switch} ${twoFactor ? styles.switchOn : ''}`}
            onClick={() => {
              setTwoFactor(!twoFactor);
              if (!twoFactor) {
                alert(
                  'Two-factor authentication setup is simulated. In Phase 9, you will scan a QR code to link your authenticator app.'
                );
              }
            }}
          >
            <span className={styles.switchThumb} />
          </button>
        </div>
        <div className={styles.infoNote}>
          <AlertCircle size={12} />
          <span>
            Two-factor setup arrives in Phase 9. The toggle above is a preview.
          </span>
        </div>
      </SettingsSection>

      {/* ---------- Active sessions ---------- */}
      <SettingsSection
        title="Active sessions"
        description="Devices currently signed in to your account."
        icon={<Smartphone size={20} />}
      >
        <div className={styles.sessionsList}>
          {MOCK_SESSIONS.map((session) => {
            const Icon = session.icon;
            return (
              <div key={session.id} className={styles.sessionRow}>
                <div className={styles.sessionIcon}>
                  <Icon size={18} />
                </div>
                <div className={styles.sessionInfo}>
                  <div className={styles.sessionHeader}>
                    <span className={styles.sessionDevice}>{session.device}</span>
                    {session.current && (
                      <span className={styles.currentBadge}>This device</span>
                    )}
                  </div>
                  <span className={styles.sessionMeta}>
                    {session.location} · {session.lastActive}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className={styles.dangerOutlineButton}
          onClick={handleSignOutAll}
        >
          <LogOut size={14} />
          Sign out of all other devices
        </button>
      </SettingsSection>

      {/* ---------- Recent activity ---------- */}
      <SettingsSection
        title="Recent security activity"
        description="A log of important events on your account."
        icon={<Clock size={20} />}
      >
        <div className={styles.activityList}>
          {MOCK_ACTIVITY.map((item) => (
            <div key={item.id} className={styles.activityRow}>
              <div
                className={`${styles.activityDot} ${
                  item.status === 'warning' ? styles.activityDotWarning : ''
                }`}
              />
              <div className={styles.activityText}>
                <span className={styles.activityEvent}>{item.event}</span>
                <span className={styles.activityTime}>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}

export default SecuritySettings;