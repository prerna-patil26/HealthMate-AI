import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './AppLayout.module.css';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen((p) => !p);
  const toggleCollapse = () => setSidebarCollapsed((p) => !p);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.layout}>
      {sidebarOpen && (
        <div
          className={styles.backdrop}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar
        mobileOpen={sidebarOpen}
        collapsed={sidebarCollapsed}
        onCloseMobile={closeSidebar}
      />

      <div
        className={`${styles.mainWrapper} ${
          sidebarCollapsed ? styles.mainWrapperCollapsed : ''
        }`}
      >
        <Topbar
          onToggleSidebar={toggleSidebar}
          onToggleCollapse={toggleCollapse}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;