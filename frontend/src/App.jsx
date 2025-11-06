import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import Layout from './components/Layout';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                success: {
                  style: {
                    background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#4F46E5',
                  },
                },
                error: {
                  style: {
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#DC2626',
                  },
                },
              }}
            />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
