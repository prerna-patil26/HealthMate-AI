import { useState } from 'react';
import { FileText, Upload, ArrowLeft } from 'lucide-react';
import UploadZone from '../../components/reports/UploadZone';
import ReportList from '../../components/reports/ReportList';
import ReportAnalysis from '../../components/reports/ReportAnalysis';
import { MOCK_REPORTS } from '../../data/mockReports';
import styles from './ReportsPage.module.css';

function ReportsPage() {
  const [view, setView] = useState('list'); // 'list' | 'analysis'
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reports, setReports] = useState(MOCK_REPORTS);

  const handleOpenReport = (reportId) => {
    setSelectedReportId(reportId);
    setView('analysis');
  };

  const handleBackToList = () => {
    setSelectedReportId(null);
    setView('list');
  };

  const handleUpload = (file) => {
    // Simulate adding a new report to the list
    const newReport = {
      id: `report-${Date.now()}`,
      title: file.name.replace(/\.(pdf|jpg|jpeg|png)$/i, ''),
      fileName: file.name,
      type: 'other',
      typeLabel: 'Other',
      uploadedAt: new Date().toISOString(),
      overview:
        'This report was just uploaded. Analysis arrives in Phase 9.',
      values: [],
    };
    setReports((prev) => [newReport, ...prev]);
    console.log('New report added:', newReport.title);
  };

  return (
    <div className={styles.page}>
      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        {view === 'analysis' ? (
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBackToList}
          >
            <ArrowLeft size={16} />
            Back to reports
          </button>
        ) : (
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <FileText size={22} />
            </div>
            <div>
              <h1 className={styles.headerTitle}>Medical Reports</h1>
              <p className={styles.headerSubtitle}>
                Upload and understand your medical reports
              </p>
            </div>
          </div>
        )}

        {view === 'list' && (
          <button
            type="button"
            className={styles.uploadButton}
            onClick={() =>
              document.querySelector('input[type=file]')?.click()
            }
          >
            <Upload size={16} />
            Upload Report
          </button>
        )}
      </header>

      {/* ---------- Body ---------- */}
      <div className={styles.body}>
        {view === 'list' ? (
          <>
            <UploadZone onUpload={handleUpload} />
            <ReportList
              reports={reports}
              onOpenReport={handleOpenReport}
            />
          </>
        ) : (
          <ReportAnalysis
            report={reports.find((r) => r.id === selectedReportId)}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}

export default ReportsPage;