import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowLeft, AlertCircle } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    setFormError('');
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!form.password) {
      next.password = 'Password is required';
    } else if (form.password.length < 8) {
      next.password = 'Password must be at least 8 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    setLoading(true);

    // Simulated backend call — will be replaced in Phase 9 (backend integration)
    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    setFormError('Login is not connected yet. Backend integration arrives in Phase 9.');
  };

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

          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.subheading}>
            Sign in to access your health assistant, reports, and history.
          </p>

          {formError && (
            <div className={styles.formError}>
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <Input
              id="login-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
              required
              autoComplete="email"
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              required
              autoComplete="current-password"
            />

            <div className={styles.row}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/login" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth loading={loading} size="lg">
              {loading ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <p className={styles.footerText}>
            New to HealthMate AI? <Link to="/register">Create an account</Link>
          </p>
        </div>

        {/* Right: visual */}
        <div className={styles.visualColumn}>
          <div className={styles.visualContent}>
            <h2 className={styles.visualHeading}>
              Your health, in one place.
            </h2>
            <p className={styles.visualSubheading}>
              Understand your reports, explore reliable guidance, and manage
              your healthcare journey — all with clear privacy and safety.
            </p>
            <ul className={styles.visualList}>
              <li>Source-backed AI assistant</li>
              <li>Private medical report analysis</li>
              <li>Family profiles with consent</li>
              <li>Emergency guidance always visible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;