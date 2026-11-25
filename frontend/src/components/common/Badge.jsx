import styles from './Badge.module.css';

function Badge({ children, variant = 'info', className = '', ...props }) {
  const classes = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export default Badge;