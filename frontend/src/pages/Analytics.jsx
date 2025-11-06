import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Calendar, PieChart } from 'lucide-react';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [analyticsResponse, subsResponse] = await Promise.all([
        api.get('/subscriptions/analytics/summary'),
        api.get('/subscriptions'),
      ]);
      setAnalytics(analyticsResponse.data);
      setSubscriptions(subsResponse.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const categoryColors = {
    entertainment: '#9333EA',
    productivity: '#3B82F6',
    education: '#10B981',
    fitness: '#EF4444',
    music: '#EC4899',
    'cloud-storage': '#6366F1',
    gaming: '#F97316',
    news: '#EAB308',
    other: '#6B7280',
  };

  // Prepare data for pie chart
  const pieChartData = {
    labels: Object.keys(analytics?.byCategory || {}).map(cat => cat.replace('-', ' ')),
    datasets: [
      {
        label: 'Monthly Spending',
        data: Object.values(analytics?.byCategory || {}).map(cat => cat.total.toFixed(2)),
        backgroundColor: Object.keys(analytics?.byCategory || {}).map(cat => categoryColors[cat]),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for bar chart (monthly costs by subscription)
  const barChartData = {
    labels: subscriptions.slice(0, 10).map(sub => sub.serviceName),
    datasets: [
      {
        label: 'Monthly Cost (USD)',
        data: subscriptions.slice(0, 10).map(sub => {
          switch (sub.billingCycle) {
            case 'weekly': return (sub.cost * 4).toFixed(2);
            case 'monthly': return sub.cost.toFixed(2);
            case 'quarterly': return (sub.cost / 3).toFixed(2);
            case 'yearly': return (sub.cost / 12).toFixed(2);
            default: return sub.cost.toFixed(2);
          }
        }),
        backgroundColor: '#6366F1',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
          padding: 15,
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          Detailed insights into your subscription spending
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="card transition-all duration-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Monthly Total</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                ${analytics?.monthlyTotal?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-2 sm:p-3 rounded-full flex-shrink-0">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="card transition-all duration-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Yearly Total</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                ${analytics?.yearlyTotal?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full flex-shrink-0">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card transition-all duration-500 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Avg per Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                ${analytics?.totalSubscriptions > 0 
                  ? (analytics.monthlyTotal / analytics.totalSubscriptions).toFixed(2) 
                  : '0.00'}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-full flex-shrink-0">
              <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {subscriptions.length === 0 ? (
        <div className="card text-center py-8 sm:py-12">
          <PieChart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">
            No data to display
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Add some subscriptions to see analytics
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Pie Chart */}
            <div className="card transition-all duration-500">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Spending by Category
              </h2>
              <div className="h-64 sm:h-80">
                <Pie data={pieChartData} options={chartOptions} />
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="card transition-all duration-500">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Category Breakdown
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(analytics?.byCategory || {}).map(([category, data]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: categoryColors[category] }}
                      />
                      <span className="text-sm sm:text-base text-gray-900 dark:text-white capitalize truncate">
                        {category.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        ${data.total.toFixed(2)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {data.count} sub{data.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="card transition-all duration-500">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Top Subscriptions by Monthly Cost
            </h2>
            <div className="h-64 sm:h-80">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Cost Projection */}
          <div className="card transition-all duration-500">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Cost Projection
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-500">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">3 Months</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                  ${(analytics?.monthlyTotal * 3).toFixed(2)}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-500">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">6 Months</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                  ${(analytics?.monthlyTotal * 6).toFixed(2)}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-500">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">1 Year</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                  ${analytics?.yearlyTotal?.toFixed(2)}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-500">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">5 Years</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                  ${(analytics?.yearlyTotal * 5).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
