import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus, Edit, Trash2, X, Calendar, DollarSign, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: '50%', y: '50%' });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    serviceName: '',
    cost: '',
    currency: 'USD',
    billingCycle: 'monthly',
    renewalDate: '',
    category: 'other',
    paymentMethod: '',
    description: '',
  });

  const categories = [
    'entertainment',
    'productivity',
    'education',
    'fitness',
    'music',
    'cloud-storage',
    'gaming',
    'news',
    'other',
  ];

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await api.get('/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await api.put(`/subscriptions/${editingId}`, formData);
        toast.success('Subscription updated successfully');
      } else {
        await api.post('/subscriptions', formData);
        toast.success('Subscription added successfully');
      }
      
      fetchSubscriptions();
      closeModal();
    } catch (error) {
      console.error('Failed to save subscription:', error);
      toast.error(error.response?.data?.message || 'Failed to save subscription');
    }
  };

  const handleEdit = (subscription, e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    if (rect) {
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setModalOrigin({ x: `${x}px`, y: `${y}px` });
    }
    setEditingId(subscription._id);
    setFormData({
      serviceName: subscription.serviceName,
      cost: subscription.cost,
      currency: subscription.currency,
      billingCycle: subscription.billingCycle,
      renewalDate: format(new Date(subscription.renewalDate), 'yyyy-MM-dd'),
      category: subscription.category,
      paymentMethod: subscription.paymentMethod || '',
      description: subscription.description || '',
    });
    setShowModal(true);
  };

  const handleOpenModal = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setModalOrigin({ x: `${x}px`, y: `${y}px` });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;
    
    try {
      await api.delete(`/subscriptions/${id}`);
      toast.success('Subscription deleted successfully');
      fetchSubscriptions();
    } catch (error) {
      console.error('Failed to delete subscription:', error);
      toast.error('Failed to delete subscription');
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setEditingId(null);
      setFormData({
        serviceName: '',
        cost: '',
        currency: 'USD',
        billingCycle: 'monthly',
        renewalDate: '',
        category: 'other',
        paymentMethod: '',
        description: '',
      });
    }, 400);
  };

  const getCategoryColor = (category) => {
    const colors = {
      entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      productivity: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      education: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      fitness: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      music: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      'cloud-storage': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      gaming: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      news: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      other: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
    };
    return colors[category] || colors.other;
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Subscriptions</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Manage all your subscriptions
          </p>
        </div>
        <button onClick={handleOpenModal} className="btn-primary text-sm sm:text-base w-full sm:w-auto">
          <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2 inline" />
          Add Subscription
        </button>
      </div>

      {/* Subscriptions Grid */}
      {subscriptions.length === 0 ? (
        <div className="card text-center py-8 sm:py-12">
          <CreditCard className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">
            No subscriptions yet
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
            Start tracking your subscriptions by adding your first one
          </p>
          <button onClick={handleOpenModal} className="btn-primary text-sm sm:text-base">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2 inline" />
            Add Your First Subscription
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="card hover:shadow-lg transition-shadow duration-500">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {sub.serviceName}
                  </h3>
                  <span className={`inline-block px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium mt-1 sm:mt-2 ${getCategoryColor(sub.category)}`}>
                    {sub.category}
                  </span>
                </div>
                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                  <button
                    onClick={(e) => handleEdit(sub, e)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-500"
                  >
                    <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-500"
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                    {sub.currency} {sub.cost}
                  </span>
                  <span className="ml-2 text-xs sm:text-sm">/ {sub.billingCycle}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Next: {format(new Date(sub.renewalDate), 'MMM dd, yyyy')}
                  </span>
                </div>

                {sub.paymentMethod && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{sub.paymentMethod}</span>
                  </div>
                )}

                {sub.description && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {sub.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div 
          className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-400`}
          style={{
            background: isClosing ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.5)',
            backdropFilter: isClosing ? 'blur(0px)' : 'blur(8px)',
            opacity: isClosing ? 0 : 1,
          }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-400 ease-out"
            style={{
              transformOrigin: isClosing ? `${modalOrigin.x} ${modalOrigin.y}` : 'center center',
              transform: isClosing 
                ? `translate(calc(${modalOrigin.x} - 50%), calc(${modalOrigin.y} - 50%)) scale(0.1)` 
                : 'translate(0, 0) scale(1)',
              opacity: isClosing ? 0 : 1,
            }}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingId ? 'Edit Subscription' : 'Add Subscription'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Service Name *</label>
                  <input
                    type="text"
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleChange}
                    className="input"
                    placeholder="Netflix, Spotify, etc."
                    required
                  />
                </div>

                <div>
                  <label className="label">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Cost *</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="input"
                    placeholder="9.99"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="label">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>

                <div>
                  <label className="label">Billing Cycle *</label>
                  <select
                    name="billingCycle"
                    value={formData.billingCycle}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="label">Renewal Date *</label>
                  <input
                    type="date"
                    name="renewalDate"
                    value={formData.renewalDate}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Payment Method</label>
                  <input
                    type="text"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="input"
                    placeholder="Visa ending in 1234"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input"
                    rows="3"
                    placeholder="Additional notes about this subscription"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button type="button" onClick={closeModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update' : 'Add'} Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
