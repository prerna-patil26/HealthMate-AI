import { PackageX, Pill } from 'lucide-react';
import MedicineCard from './MedicineCard';
import styles from './MedicineList.module.css';

function MedicineList({
  medicines = [],
  onOpenMedicine,
  onClearFilters,
  hasFilters = false,
}) {
  // Empty state: no medicines in the data at all
  if (medicines.length === 0 && !hasFilters) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <Pill size={32} />
        </div>
        <h3 className={styles.emptyTitle}>No medicines available</h3>
        <p className={styles.emptyText}>
          Medicine information will appear here once the knowledge base is
          connected.
        </p>
      </div>
    );
  }

  // No results for the current filter
  if (medicines.length === 0 && hasFilters) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <PackageX size={32} />
        </div>
        <h3 className={styles.emptyTitle}>No medicines match your search</h3>
        <p className={styles.emptyText}>
          Try a different search term or category.
        </p>
        {onClearFilters && (
          <button
            type="button"
            className={styles.emptyCta}
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onOpen={() => onOpenMedicine(medicine.id)}
        />
      ))}
    </div>
  );
}

export default MedicineList;