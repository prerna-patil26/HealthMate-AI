import styles from './Card.module.css';

function Card({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
  ...props
}) {
  const classes = [
    styles.card,
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Card;