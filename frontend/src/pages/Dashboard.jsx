import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { CreditCard, TrendingUp, DollarSign, Calendar, AlertCircle, Plus, ArrowUp, ArrowDown, Activity, X } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: '50%', y: '50%' });
  const [formData, setFormData] = useState({
    serviceName: '',
    cost: '',
    billingCycle: 'monthly',
    renewalDate: '',
    category: 'other',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subsResponse, analyticsResponse] = await Promise.all([
        api.get('/subscriptions'),
        api.get('/subscriptions/analytics/summary'),
      ]);
      setSubscriptions(subsResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const upcomingRenewals = subscriptions
    .filter(sub => sub.isActive)
    .map(sub => ({
      ...sub,
      daysUntil: differenceInDays(new Date(sub.renewalDate), new Date())
    }))
    .filter(sub => sub.daysUntil >= 0 && sub.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 10);

  const getRenewalColor = (daysUntil) => {
    if (daysUntil <= 3) return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    if (daysUntil <= 7) return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
    return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowAddModal(false);
      setIsClosing(false);
    }, 400);
  };

  const handleOpenModal = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setModalOrigin({ x: `${x}px`, y: `${y}px` });
    setShowAddModal(true);
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();
    try {
      await api.post('/subscriptions', formData);
      toast.success('Subscription added successfully!');
      handleCloseModal();
      setFormData({
        serviceName: '',
        cost: '',
        billingCycle: 'monthly',
        renewalDate: '',
        category: 'other',
        notes: ''
      });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Failed to add subscription:', error);
      toast.error('Failed to add subscription');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
      {/* Stats Cards with Minimal Design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {/* Total Spent Card */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-200 to-green-300 dark:from-emerald-900/40 dark:to-green-800/40 rounded-lg md:rounded-2xl p-2 sm:p-4 md:p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 border border-emerald-300 dark:border-emerald-800/50 animate-slide-in-up stagger-1">
          <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-emerald-300/30 dark:bg-white/5 rounded-full -mr-8 md:-mr-12 -mt-8 md:-mt-12 group-hover:scale-150 transition-all duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
              <div className="bg-emerald-300 dark:bg-emerald-700 p-1.5 sm:p-2 rounded-lg md:rounded-xl transition-colors duration-500">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-emerald-800 dark:text-emerald-300 transition-colors duration-500" />
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 text-[8px] sm:text-xs font-medium transition-colors duration-500">MONTH</span>
            </div>
            <p className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-0.5 sm:mb-1 transition-colors duration-500">
              ${analytics?.monthlyTotal?.toFixed(2) || '0.00'}
            </p>
            <p className="text-emerald-800 dark:text-emerald-300 text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-500">Total Spent</p>
          </div>
        </div>

        {/* Next Payment Card */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-900/40 dark:to-indigo-800/40 rounded-lg md:rounded-2xl p-2 sm:p-4 md:p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 border border-blue-300 dark:border-blue-800/50 animate-slide-in-up stagger-2">
          <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-blue-300/30 dark:bg-white/5 rounded-full -mr-8 md:-mr-12 -mt-8 md:-mt-12 group-hover:scale-150 transition-all duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
              <div className="bg-blue-300 dark:bg-blue-700 p-1.5 sm:p-2 rounded-lg md:rounded-xl transition-colors duration-500">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-800 dark:text-blue-300 transition-colors duration-500" />
              </div>
              <span className="text-blue-700 dark:text-blue-400 text-[8px] sm:text-xs font-medium transition-colors duration-500">NEXT</span>
            </div>
            <p className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-blue-900 dark:text-blue-100 mb-0.5 sm:mb-1 transition-colors duration-500">
              {upcomingRenewals[0] ? upcomingRenewals[0].daysUntil : '-'}
            </p>
            <p className="text-blue-800 dark:text-blue-300 text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-500 truncate">
              {upcomingRenewals[0] ? `${upcomingRenewals[0].serviceName}` : 'No renewals'}
            </p>
          </div>
        </div>

        {/* Active Subscriptions Card */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-900/40 dark:to-pink-800/40 rounded-lg md:rounded-2xl p-2 sm:p-4 md:p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 border border-purple-300 dark:border-purple-800/50 animate-slide-in-up stagger-3">
          <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-purple-300/30 dark:bg-white/5 rounded-full -mr-8 md:-mr-12 -mt-8 md:-mt-12 group-hover:scale-150 transition-all duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
              <div className="bg-purple-300 dark:bg-purple-700 p-1.5 sm:p-2 rounded-lg md:rounded-xl transition-colors duration-500">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-800 dark:text-purple-300 transition-colors duration-500" />
              </div>
              <span className="text-purple-700 dark:text-purple-400 text-[8px] sm:text-xs font-medium transition-colors duration-500">ACTIVE</span>
            </div>
            <p className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-purple-900 dark:text-purple-100 mb-0.5 sm:mb-1 transition-colors duration-500">
              {analytics?.totalSubscriptions || 0}
            </p>
            <p className="text-purple-800 dark:text-purple-300 text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-500">Subscriptions</p>
          </div>
        </div>

        {/* Yearly Projection Card */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-200 to-red-300 dark:from-orange-900/40 dark:to-red-800/40 rounded-lg md:rounded-2xl p-2 sm:p-4 md:p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 border border-orange-300 dark:border-orange-800/50 animate-slide-in-up stagger-4">
          <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-orange-300/30 dark:bg-white/5 rounded-full -mr-8 md:-mr-12 -mt-8 md:-mt-12 group-hover:scale-150 transition-all duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
              <div className="bg-orange-300 dark:bg-orange-700 p-1.5 sm:p-2 rounded-lg md:rounded-xl transition-colors duration-500">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-orange-800 dark:text-orange-300 transition-colors duration-500" />
              </div>
              <span className="text-orange-700 dark:text-orange-400 text-[8px] sm:text-xs font-medium transition-colors duration-500">YEAR</span>
            </div>
            <p className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-orange-900 dark:text-orange-100 mb-0.5 sm:mb-1 transition-colors duration-500">
              ${analytics?.yearlyTotal?.toFixed(2) || '0.00'}
            </p>
            <p className="text-orange-800 dark:text-orange-300 text-[10px] sm:text-xs md:text-sm font-medium flex items-center transition-colors duration-500">
              <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" />
              Projection
            </p>
          </div>
        </div>
      </div>

      {/* Full Width Upcoming Renewals */}
      <div className="bg-white dark:bg-gray-800 md:bg-white/60 md:dark:bg-gray-800/60 md:backdrop-blur-xl rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-200 dark:border-gray-700 md:border-white/20 md:dark:border-gray-700/50 shadow-xl transition-colors duration-500">
        <div className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
              Upcoming Renewals
            </h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={handleOpenModal}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-primary-500 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex-1 sm:flex-initial"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Add New
              </button>
              <Link 
                to="/dashboard/subscriptions" 
                className="text-xs sm:text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:underline transition-all duration-300 whitespace-nowrap"
              >
                View all →
              </Link>
            </div>
          </div>

          {upcomingRenewals.length === 0 ? (
            <div className="text-center py-6 sm:py-8 md:py-12">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-2 sm:mb-3 md:mb-4">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-lg">No upcoming renewals</p>
              <p className="text-gray-500 dark:text-gray-500 text-[10px] sm:text-xs md:text-sm mt-1">in the next 30 days</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {upcomingRenewals.map((sub, index) => (
                <div
                  key={sub._id}
                  className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-700 md:bg-white/90 md:dark:bg-gray-700/70 md:backdrop-blur-xl rounded-lg md:rounded-xl border-2 border-gray-300 dark:border-gray-600/50 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-1">
                    <div className="bg-gradient-to-br from-primary-400 to-purple-600 p-1.5 sm:p-2 md:p-2.5 rounded-lg md:rounded-xl shadow-md transition-colors duration-500 flex-shrink-0">
                      <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate transition-colors duration-500">
                        {sub.serviceName}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 transition-colors duration-500 truncate">
                        {format(new Date(sub.renewalDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 sm:gap-1 ml-1 sm:ml-2 flex-shrink-0">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 dark:text-white whitespace-nowrap transition-colors duration-500">
                      ${sub.cost}
                    </p>
                    <div className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold transition-colors duration-500 ${getRenewalColor(sub.daysUntil)}`}>
                      {sub.daysUntil === 0 ? 'Today' : `${sub.daysUntil}d`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      
      {/* Add Subscription Modal */}
      {showAddModal && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-400 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            background: isClosing ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.5)',
            backdropFilter: isClosing ? 'blur(0px)' : 'blur(8px)',
          }}
        >
          <div 
            className={`bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-400 ease-out`}
            style={{
              transformOrigin: isClosing ? `${modalOrigin.x} ${modalOrigin.y}` : 'center center',
              transform: isClosing 
                ? `translate(calc(${modalOrigin.x} - 50%), calc(${modalOrigin.y} - 50%)) scale(0.1)` 
                : 'translate(0, 0) scale(1)',
              opacity: isClosing ? 0 : 1,
            }}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500">Add Subscription</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl transition-all duration-300"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400 transition-colors duration-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubscription} className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 transition-colors duration-500">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-500"
                    placeholder="Netflix, Spotify, etc."
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 transition-colors duration-500">
                    Cost *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-500"
                    placeholder="9.99"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 transition-colors duration-500">
                    Billing Cycle *
                  </label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 transition-colors duration-500">
                    Renewal Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.renewalDate}
                    onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-500"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 transition-colors duration-500">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-500"
                  >
                    <option value="entertainment">Entertainment</option>
                    <option value="productivity">Productivity</option>
                    <option value="education">Education</option>
                    <option value="fitness">Fitness</option>
                    <option value="music">Music</option>
                    <option value="cloud-storage">Cloud Storage</option>
                    <option value="gaming">Gaming</option>
                    <option value="news">News</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 transition-colors duration-500">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-500"
                  rows="3"
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-br from-primary-500 to-purple-600 text-white py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Add Subscription
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
