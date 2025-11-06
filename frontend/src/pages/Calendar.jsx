import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Calendar View
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          View your subscription renewals in calendar format
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-12 text-center transition-colors duration-500">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full mb-4 sm:mb-6">
          <CalendarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Coming Soon
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Calendar view is under development. Soon you'll be able to see all your subscription renewals in a beautiful calendar interface.
        </p>
      </div>
    </div>
  );
};

export default Calendar;
