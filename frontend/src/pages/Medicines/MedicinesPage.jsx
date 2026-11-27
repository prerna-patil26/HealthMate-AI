import { useState } from 'react';
import { Pill, ArrowLeft } from 'lucide-react';
import MedicineSearch from '../../components/medicines/MedicineSearch';
import MedicineList from '../../components/medicines/MedicineList';
import MedicineDetail from '../../components/medicines/MedicineDetail';
import {
  MOCK_MEDICINES,
  searchMedicines,
  filterByCategory,
} from '../../data/mockMedicines';
import styles from './MedicinesPage.module.css';

function MedicinesPage() {
  const [view, setView] = useState('list'); // 'list' | 'detail'
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const searchedMedicines = searchMedicines(searchQuery);
  const filteredMedicines = filterByCategory(
    searchedMedicines,
    selectedCategory
  );

  const hasFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'all';

  const handleOpenMedicine = (id) => {
    setSelectedMedicineId(id);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedMedicineId(null);
    setView('list');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className={styles.page}>
      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        {view === 'detail' ? (
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBackToList}
          >
            <ArrowLeft size={16} />
            Back to medicines
          </button>
        ) : (
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Pill size={22} />
            </div>
            <div>
              <h1 className={styles.headerTitle}>Medicine Information</h1>
              <p className={styles.headerSubtitle}>
                General information about common medicines
              </p>
            </div>
          </div>
        )}
      </header>

      {/* ---------- Body ---------- */}
      <div className={styles.body}>
        {view === 'list' ? (
          <>
            <MedicineSearch
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              resultCount={filteredMedicines.length}
              totalCount={MOCK_MEDICINES.length}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
            />

            <MedicineList
              medicines={filteredMedicines}
              onOpenMedicine={handleOpenMedicine}
              onClearFilters={handleClearFilters}
              hasFilters={hasFilters}
            />
          </>
        ) : (
          <MedicineDetail medicineId={selectedMedicineId} />
        )}
      </div>
    </div>
  );
}

export default MedicinesPage;