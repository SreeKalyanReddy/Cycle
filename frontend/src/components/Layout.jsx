import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Home, CreditCard, BarChart3, User, LogOut, Moon, Sun, Menu, Bell, Search, Calendar, Settings } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';

const Layout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Subscriptions', href: '/dashboard/subscriptions', icon: CreditCard },
    { name: 'Insights', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-500 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-24 bg-white dark:bg-gray-900 md:bg-white/80 md:dark:bg-gray-900/80 md:backdrop-blur-2xl border-r border-gray-200/50 dark:border-gray-800/50`}>
        <div className="flex flex-col h-full items-center py-6">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="p-2 rounded-2xl hover:scale-110 transition-all duration-300 cursor-pointer">
              <img src={logo} alt="Cycle Logo" className="h-12 w-12 object-contain" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col items-center space-y-2 w-full px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative group w-full flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all duration-500 ${
                    active
                      ? 'bg-gray-200 dark:bg-gray-800 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-500'
                  }`}
                >
                  <Icon className={`h-6 w-6 mb-1 ${active ? '' : 'group-hover:scale-110'} transition-transform`} />
                  <span className={`text-xs font-medium ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Section with Dropdown */}
          <div className="mt-auto relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="relative group w-full flex items-center justify-center focus:outline-none"
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-11 w-11 rounded-2xl ring-2 ring-primary-500/50 hover:ring-4 hover:ring-primary-500 transition-all cursor-pointer"
                />
              ) : (
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold hover:scale-110 transition-transform cursor-pointer shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {profileMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setProfileMenuOpen(false)}
                ></div>
                <div className="absolute bottom-full left-20 mb-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50 transition-all duration-300 animate-scale-in origin-bottom-left">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 transition-colors duration-500">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="transition-all duration-300 md:ml-24">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 md:bg-white/70 md:dark:bg-gray-900/70 md:backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-500">
          <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4">
            {/* Mobile Menu & Logo */}
            <div className="flex items-center space-x-3 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 text-gray-700 dark:text-gray-300"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Logo on mobile */}
              <div className="md:hidden">
                <img src={logo} alt="Cycle Logo" className="h-8 w-8 object-contain" />
              </div>
              
              {/* Search Bar */}
              <div className="hidden sm:flex items-center flex-1 max-w-xl">
                <div className="relative w-full group">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary-500/50 outline-none transition-all duration-500 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 hover:scale-110 group"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  <Moon className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
                    theme === 'light' 
                      ? 'opacity-100 rotate-0 fill-gray-800 text-gray-800' 
                      : 'opacity-0 rotate-90 text-gray-300'
                  }`} />
                  <Sun className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
                    theme === 'dark' 
                      ? 'opacity-100 rotate-0 text-yellow-400' 
                      : 'opacity-0 -rotate-90 text-gray-300'
                  }`} />
                </div>
              </button>

              {/* Notifications */}
              <button className="relative p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 group">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:animate-bounce" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-3 sm:p-4 md:p-6 min-h-screen transition-colors duration-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
