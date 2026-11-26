import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === 'consent' ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    setFormError('');
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return { label: '', level: 0 };
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 2) return { label: 'Weak', level: 1 };
    if (score === 3) return { label: 'Fair', level: 2 };
    if (score === 4) return { label: 'Good', level: 3 };
    return { label: 'Strong', level: 4 };
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    else if (form.fullName.trim().length < 2) next.fullName = 'Name is too short';

    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';

    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters';

    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password';
    else if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match';

    if (!form.consent) next.consent = 'You must accept the privacy and consent policy';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setFormError('Registration is not connected yet. Backend integration arrives in Phase 9.');
  };

  const strength = passwordStrength();

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        {/* Left: form */}
        <div className={styles.formColumn}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className={styles.brand}>
            <HeartPulse size={28} className={styles.brandIcon} />
            <span className={styles.brandText}>HealthMate AI</span>
          </div>

          <h1 className={styles.heading}>Create your account</h1>
          <p className={styles.subheading}>
            Start understanding your health information with a safe, private, and
            intelligent companion.
          </p>

          {formError && (
            <div className={styles.formError}>
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <Input
              id="reg-name"
              label="Full name"
              type="text"
              placeholder="Your full name"
              value={form.fullName}
              onChange={handleChange('fullName')}
              error={errors.fullName}
              required
              autoComplete="name"
            />

            <Input
              id="reg-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
              required
              autoComplete="email"
            />

            <div>
              <Input
                id="reg-password"
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange('password')}
                error={errors.password}
                required
                autoComplete="new-password"
              />
              {form.password && (
                <div className={styles.strengthRow}>
                  <div className={styles.strengthBar}>
                    <div className={`${styles.strengthFill} ${styles[`strengthLevel${strength.level}`]}`} />
                  </div>
                  <span className={styles.strengthLabel}>{strength.label}</span>
                </div>
              )}
            </div>

            <Input
              id="reg-confirm"
              label="Confirm password"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />

            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                checked={form.consent}
                onChange={handleChange('consent')}
              />
              <span>
                I understand this platform provides general health information only,
                is not a replacement for professional medical advice, and I consent to
                the <Link to="/privacy" className={styles.consentLink}>privacy policy</Link>.
              </span>
            </label>
            {errors.consent && (
              <p className={styles.consentError}>{errors.consent}</p>
            )}

            <Button type="submit" fullWidth loading={loading} size="lg">
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p className={styles.footerText}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        {/* Right: visual */}
        <div className={styles.visualColumn}>
          <div className={styles.visualContent}>
            <h2 className={styles.visualHeading}>
              Everything you need, in one place.
            </h2>
            <ul className={styles.benefitsList}>
              <li>
                <CheckCircle2 size={18} />
                <span>Understand medical reports in plain language</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Get source-backed answers to general health questions</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Explore symptom guidance with red-flag screening</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Manage family health profiles with consent</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Access emergency guidance instantly</span>
              </li>
            </ul>
            <p className={styles.visualNote}>
              Your data is protected with explicit consent and role-based access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;