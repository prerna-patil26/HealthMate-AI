import { Search, X } from 'lucide-react';
import { MEDICINE_CATEGORIES } from '../../data/mockMedicines';
import styles from './MedicineSearch.module.css';

function MedicineSearch({
  searchQuery = '',
  selectedCategory = 'all',
  resultCount = 0,
  totalCount = 0,
  onSearchChange,
  onCategoryChange,
}) {
  const hasFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'all';

  const handleClear = () => {
    onSearchChange('');
    onCategoryChange('all');
  };

  return (
    <div className={styles.container}>
      {/* ---------- Search bar ---------- */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search by name, brand, or use..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search medicines"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ---------- Category pills ---------- */}
      <div className={styles.categoriesRow}>
        <div className={styles.categoriesList}>
          {MEDICINE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.categoryPill} ${
                selectedCategory === cat.id ? styles.categoryPillActive : ''
              }`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button
            type="button"
            className={styles.clearFilters}
            onClick={handleClear}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ---------- Count line ---------- */}
      <p className={styles.countLine}>
        {hasFilters ? (
          <>
            Showing <strong>{resultCount}</strong> of {totalCount}{' '}
            {totalCount === 1 ? 'medicine' : 'medicines'}
          </>
        ) : (
          <>
            {totalCount} {totalCount === 1 ? 'medicine' : 'medicines'}
          </>
        )}
      </p>
    </div>
  );
}

export default MedicineSearch;