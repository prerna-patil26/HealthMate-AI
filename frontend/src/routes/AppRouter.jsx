import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public pages
import LandingPage from '../pages/Landing/LandingPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';

// Authenticated layout + pages
import AppLayout from '../components/layout/AppLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import StubPage from '../components/common/StubPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public routes ---------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ---------- Authenticated routes (wrapped in AppLayout) ---------- */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/assistant"
            element={<StubPage title="AI Health Assistant" phase="Phase 6" />}
          />
          <Route
            path="/symptoms"
            element={<StubPage title="Symptom Guidance" phase="Phase 7" />}
          />
          <Route
            path="/reports"
            element={<StubPage title="Medical Reports" phase="Phase 7" />}
          />
          <Route
            path="/medicines"
            element={<StubPage title="Medicine Information" phase="Phase 7" />}
          />
          <Route
            path="/timeline"
            element={<StubPage title="Health Timeline" phase="Phase 7" />}
          />
          <Route
            path="/analytics"
            element={<StubPage title="Health Analytics" phase="Phase 8" />}
          />
          <Route
            path="/doctors"
            element={<StubPage title="Doctors & Hospitals" phase="Phase 8" />}
          />
          <Route
            path="/appointments"
            element={<StubPage title="Appointments" phase="Phase 8" />}
          />
          <Route
            path="/family"
            element={<StubPage title="Family Health" phase="Phase 8" />}
          />
          <Route
            path="/voice"
            element={<StubPage title="Voice Assistant" phase="Phase 8" />}
          />
          <Route
            path="/settings"
            element={<StubPage title="Settings" phase="Phase 8" />}
          />
          <Route
            path="/help"
            element={<StubPage title="Help & Support" phase="Phase 8" />}
          />
          <Route
            path="/profile"
            element={<StubPage title="Profile" phase="Phase 8" />}
          />
        </Route>

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;