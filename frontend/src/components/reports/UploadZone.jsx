import { useState, useRef } from 'react';
import { UploadCloud, FileText, X, Check, AlertCircle } from 'lucide-react';
import styles from './UploadZone.module.css';

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png';
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function UploadZone({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const validateFile = (file) => {
    if (!file) return { valid: false, error: 'No file selected' };

    // Check file type
    if (
      !ACCEPTED_TYPES.includes(file.type) &&
      !file.name.toLowerCase().match(/\.(pdf|jpg|jpeg|png)$/)
    ) {
      return {
        valid: false,
        error: 'Only PDF, JPG, or PNG files are supported.',
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is ${MAX_FILE_SIZE_MB} MB.`,
      };
    }

    return { valid: true, error: '' };
  };

  const handleFile = (file) => {
    setError('');
    setUploadSuccess(false);

    const { valid, error: validationError } = validateFile(file);
    if (!valid) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // ---------- Drag handlers ----------

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // ---------- Input change ----------

  const handleFileInput = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFile(file);
    // Reset input so the same file can be selected again if needed
    e.target.value = '';
  };

  // ---------- Actions ----------

  const handleBrowseClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setError('');
    setUploadSuccess(false);
  };

  const handleProcess = () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    // Simulate processing — real extraction arrives in Phase 9
    setTimeout(() => {
      setIsProcessing(false);
      setUploadSuccess(true);
      if (onUpload) {
        onUpload(selectedFile);
      }
      // Show success briefly, then reset
      setTimeout(() => {
        setSelectedFile(null);
        setUploadSuccess(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      {/* ---------- Drop zone ---------- */}
      <div
        className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ''} ${
          selectedFile ? styles.dropZoneFilled : ''
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          className={styles.hiddenInput}
          onChange={handleFileInput}
        />

        {/* No file selected */}
        {!selectedFile && (
          <>
            <div className={styles.uploadIcon}>
              <UploadCloud size={40} />
            </div>
            <h3 className={styles.dropTitle}>
              {isDragging
                ? 'Drop your file here'
                : 'Drag and drop your report here'}
            </h3>
            <p className={styles.dropSubtitle}>
              PDF, JPG, or PNG · up to {MAX_FILE_SIZE_MB} MB
            </p>
            <button
              type="button"
              className={styles.browseButton}
              onClick={handleBrowseClick}
            >
              Browse files
            </button>
          </>
        )}

        {/* File selected — preview + actions */}
        {selectedFile && (
          <div className={styles.filePreview}>
            <div className={styles.fileIcon}>
              <FileText size={28} />
            </div>
            <div className={styles.fileInfo}>
              <p className={styles.fileName}>{selectedFile.name}</p>
              <p className={styles.fileMeta}>
                {(selectedFile.size / 1024).toFixed(0)} KB ·{' '}
                {selectedFile.type || 'Unknown type'}
              </p>
            </div>
            {!isProcessing && !uploadSuccess && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={clearSelection}
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Processing state */}
        {isProcessing && (
          <div className={styles.processingState}>
            <div className={styles.spinner} />
            <p className={styles.processingText}>
              Processing your report...
            </p>
          </div>
        )}

        {/* Success state */}
        {uploadSuccess && (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <Check size={28} strokeWidth={3} />
            </div>
            <p className={styles.successText}>Report uploaded successfully</p>
          </div>
        )}
      </div>

      {/* ---------- Error message ---------- */}
      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} />
          <span>{error}</span>
          <button
            type="button"
            className={styles.errorClose}
            onClick={() => setError('')}
            aria-label="Dismiss error"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ---------- Process button (below drop zone) ---------- */}
      {selectedFile && !isProcessing && !uploadSuccess && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.processButton}
            onClick={handleProcess}
          >
            <UploadCloud size={16} />
            Process Report
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={clearSelection}
          >
            Cancel
          </button>
        </div>
      )}

      {/* ---------- Helper note ---------- */}
      {!selectedFile && (
        <p className={styles.helperNote}>
          Your original file is preserved. Extracted values are shown for
          understanding only — they are not a diagnosis.
        </p>
      )}
    </div>
  );
}

export default UploadZone;