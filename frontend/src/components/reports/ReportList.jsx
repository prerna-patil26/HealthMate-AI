import { useMemo, useState } from 'react';
import { Search, Filter, FileX, FileText } from 'lucide-react';
import ReportCard from './ReportCard';
import styles from './ReportList.module.css';

const FILTER_TYPES = [
  { id: 'all', label: 'All types' },
  { id: 'blood-test', label: 'Blood Test' },
  { id: 'lipid-profile', label: 'Lipid Profile' },
  { id: 'thyroid', label: 'Thyroid Panel' },
  { id: 'cbc', label: 'Complete Blood Count' },
  { id: 'other', label: 'Other' },
];

function ReportList({ reports = [], onOpenReport, onUploadClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter reports based on search + type
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Type filter
      if (filterType !== 'all' && report.type !== filterType) {
        return false;
      }
      // Search filter (filename or report title)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = report.fileName?.toLowerCase().includes(q);
        const matchesTitle = report.title?.toLowerCase().includes(q);
        const matchesType = report.typeLabel?.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle && !matchesType) {
          return false;
        }
      }
      return true;
    });
  }, [reports, searchQuery, filterType]);

  const totalCount = reports.length;
  const filteredCount = filteredReports.length;
  const hasFilters = searchQuery.trim() !== '' || filterType !== 'all';

  // ---------- Empty state: no reports at all ----------
  if (totalCount === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <FileText size={36} />
        </div>
        <h3 className={styles.emptyTitle}>No reports yet</h3>
        <p className={styles.emptyText}>
          Upload your first medical report to understand your test values in
          plain language.
        </p>
        {onUploadClick && (
          <button
            type="button"
            className={styles.emptyCta}
            onClick={onUploadClick}
          >
            Upload your first report
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* ---------- Search + filter bar ---------- */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search by filename or report type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search reports"
          />
        </div>

        <div className={styles.filterWrapper}>
          <Filter size={16} className={styles.filterIcon} />
          <select
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filter by report type"
          >
            {FILTER_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------- Count line ---------- */}
      <div className={styles.countLine}>
        {hasFilters ? (
          <span>
            Showing <strong>{filteredCount}</strong> of {totalCount}{' '}
            {totalCount === 1 ? 'report' : 'reports'}
          </span>
        ) : (
          <span>
            {totalCount} {totalCount === 1 ? 'report' : 'reports'}
          </span>
        )}
      </div>

      {/* ---------- Empty filter state ---------- */}
      {filteredCount === 0 ? (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>
            <FileX size={28} />
          </div>
          <h3 className={styles.noResultsTitle}>No reports match your filters</h3>
          <p className={styles.noResultsText}>
            Try adjusting your search or filter.
          </p>
          <button
            type="button"
            className={styles.clearFiltersButton}
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* ---------- Reports grid ---------- */
        <div className={styles.reportsGrid}>
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onOpen={() => onOpenReport && onOpenReport(report.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportList;