import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import SettingsSidebar from '../../components/settings/SettingsSidebar';
import ProfileSettings from '../../components/settings/ProfileSettings';
import PreferencesSettings from '../../components/settings/PreferencesSettings';
import PrivacySettings from '../../components/settings/PrivacySettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import { SETTINGS_SECTIONS } from '../../data/mockSettings';
import { useSettings } from '../../context/SettingsContext';
import styles from './SettingsPage.module.css';

function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [hasChanges, setHasChanges] = useState(false);
  const { settings, updateSettings, updatePrivacy } = useSettings();

  const handleUpdate = (sectionKey, updates) => {
    updateSettings(sectionKey, updates);
    setHasChanges(true);
  };

  const handlePrivacyUpdate = (payload) => {
    updatePrivacy(payload);
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const activeSectionData = SETTINGS_SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <SettingsIcon size={22} />
          </div>
          <div>
            <h1 className={styles.headerTitle}>Settings</h1>
            <p className={styles.headerSubtitle}>
              Manage your account and preferences
            </p>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.layout}>
          <SettingsSidebar
            sections={SETTINGS_SECTIONS}
            activeSection={activeSection}
            onSelect={setActiveSection}
          />

          <main className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>{activeSectionData?.label}</h2>
              <p className={styles.panelSubtitle}>
                {activeSectionData?.description}
              </p>
            </div>

            <div className={styles.panelContent}>
              {activeSection === 'profile' && (
                <ProfileSettings
                  profile={settings.profile}
                  onUpdate={(updates) => handleUpdate('profile', updates)}
                />
              )}

              {activeSection === 'preferences' && (
                <PreferencesSettings
                  preferences={settings.preferences}
                  onUpdate={(updates) => handleUpdate('preferences', updates)}
                />
              )}

              {activeSection === 'privacy' && (
                <PrivacySettings
                  privacy={settings.privacy}
                  consents={settings.consents}
                  onUpdate={handlePrivacyUpdate}
                />
              )}

              {activeSection === 'security' && <SecuritySettings />}
            </div>

            {hasChanges && (
              <div className={styles.saveBar}>
                <p className={styles.saveBarText}>Settings saved</p>
                <div className={styles.saveBarActions}>
                  <button
                    type="button"
                    className={styles.saveButton}
                    onClick={handleSave}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;