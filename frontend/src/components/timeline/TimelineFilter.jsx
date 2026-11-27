import { Search, X, Calendar } from 'lucide-react';
import {
  TIMELINE_CATEGORIES,
  DATE_RANGES,
} from '../../data/mockTimeline';
import styles from './TimelineFilter.module.css';

function TimelineFilter({
  searchQuery = '',
  selectedCategory = 'all',
  selectedRange = 'all',
  resultCount = 0,
  totalCount = 0,
  onSearchChange,
  onCategoryChange,
  onRangeChange,
  onClearFilters,
}) {
  const hasFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedRange !== 'all';

  return (
    <div className={styles.container}>
      {/* ---------- Search bar ---------- */}
      <div className={styles.searchWrapper}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search your timeline..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search timeline"
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.clearSearch}
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ---------- Category pills + date range ---------- */}
      <div className={styles.controlsRow}>
        <div className={styles.categoriesWrap}>
          {TIMELINE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.categoryPill} ${
                selectedCategory === cat.id ? styles.pillActive : ''
              }`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.rangeWrapper}>
          <Calendar size={14} className={styles.rangeIcon} />
          <select
            className={styles.rangeSelect}
            value={selectedRange}
            onChange={(e) => onRangeChange(e.target.value)}
            aria-label="Filter by date range"
          >
            {DATE_RANGES.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------- Count + clear filters ---------- */}
      <div className={styles.bottomRow}>
        <p className={styles.countLine}>
          {hasFilters ? (
            <>
              Showing <strong>{resultCount}</strong> of {totalCount}{' '}
              {totalCount === 1 ? 'event' : 'events'}
            </>
          ) : (
            <>
              {totalCount} {totalCount === 1 ? 'event' : 'events'} in your timeline
            </>
          )}
        </p>

        {hasFilters && (
          <button
            type="button"
            className={styles.clearFilters}
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

export default TimelineFilter;