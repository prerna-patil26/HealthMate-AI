import { ExternalLink, CheckCircle2 } from 'lucide-react';
import styles from './SourceCitation.module.css';

/**
 * Source object shape:
 * {
 *   title: 'Blood Pressure — Overview',
 *   url: 'https://medlineplus.gov/highbloodpressure.html',
 *   publisher: 'MedlinePlus (NIH)',
 *   verified: true,   // optional
 * }
 */
function SourceCitation({ source }) {
  const { title, url, publisher, verified = true } = source;

  const content = (
    <>
      <div className={styles.iconBadge}>
        {verified ? (
          <CheckCircle2 size={13} />
        ) : (
          <ExternalLink size={13} />
        )}
      </div>
      <div className={styles.text}>
        <span className={styles.publisher}>{publisher}</span>
        <span className={styles.title}>{title}</span>
      </div>
      {url && <ExternalLink size={13} className={styles.externalIcon} />}
    </>
  );

  if (!url) {
    return <div className={styles.citation}>{content}</div>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.citation}
    >
      {content}
    </a>
  );
}

export default SourceCitation;