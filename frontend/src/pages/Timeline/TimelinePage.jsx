import { useState, useMemo } from 'react';
import { CalendarClock } from 'lucide-react';
import TimelineFilter from '../../components/timeline/TimelineFilter';
import TimelineItem from '../../components/timeline/TimelineItem';
import {
  MOCK_TIMELINE,
  filterByCategory,
  filterByDateRange,
  groupEventsByDate,
  searchEvents,
} from '../../data/mockTimeline';
import styles from './TimelinePage.module.css';

const GROUP_LABELS = {
  today: 'Today',
  thisWeek: 'This week',
  thisMonth: 'This month',
  earlier: 'Earlier',
};

function TimelinePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRange, setSelectedRange] = useState('all');

  const filteredEvents = useMemo(() => {
    let result = MOCK_TIMELINE;
    result = searchEvents(result, searchQuery);
    result = filterByCategory(result, selectedCategory);
    result = filterByDateRange(result, selectedRange);
    return result;
  }, [searchQuery, selectedCategory, selectedRange]);

  const grouped = useMemo(
    () => groupEventsByDate(filteredEvents),
    [filteredEvents]
  );

  const totalCount = MOCK_TIMELINE.length;
  const filteredCount = filteredEvents.length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRange('all');
  };

  return (
    <div className={styles.page}>
      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <CalendarClock size={22} />
          </div>
          <div>
            <h1 className={styles.headerTitle}>Health Timeline</h1>
            <p className={styles.headerSubtitle}>
              Your health journey, chronologically
            </p>
          </div>
        </div>
      </header>

      {/* ---------- Body ---------- */}
      <div className={styles.body}>
        <TimelineFilter
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedRange={selectedRange}
          resultCount={filteredCount}
          totalCount={totalCount}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onRangeChange={setSelectedRange}
          onClearFilters={handleClearFilters}
        />

        {filteredCount === 0 ? (
          <div className={styles.placeholderBox}>
            <h2>No events match your filters</h2>
            <p>Try adjusting your search, category, or date range.</p>
            <button
              type="button"
              onClick={handleClearFilters}
              style={{ marginTop: '12px', padding: '8px 16px' }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.timelineGroups}>
            {['today', 'thisWeek', 'thisMonth', 'earlier'].map((groupKey) => {
              const events = grouped[groupKey];
              if (!events || events.length === 0) return null;

              return (
                <section key={groupKey} className={styles.group}>
                  <div className={styles.groupHeader}>
                    <h2 className={styles.groupLabel}>
                      {GROUP_LABELS[groupKey]}
                    </h2>
                    <span className={styles.groupCount}>{events.length}</span>
                  </div>
                  <div className={styles.groupItems}>
                    {events.map((event) => (
                      <TimelineItem key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TimelinePage;