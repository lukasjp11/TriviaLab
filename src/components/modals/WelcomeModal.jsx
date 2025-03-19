import { motion } from 'framer-motion';
import { X, HelpCircle, Printer, Download, Edit2, Check } from 'lucide-react';

const WelcomeModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b dark:border-gray-700 p-5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <HelpCircle className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome to TriviaLab</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Getting Started</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Create cards by filling in questions and answers in the card editor</li>
                <li>Customize your categories and their colors</li>
                <li>Preview your cards before printing</li>
                <li>Print your cards or download the HTML for later use</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Edit2 className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Create Cards</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Add questions and answers for each category.
                </p>
              </div>

              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <Printer className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Print Cards</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your cards are designed for double-sided printing with questions on one side and answers on the reverse.
                </p>
              </div>

              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <Download className="text-amber-600 dark:text-amber-400" size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Export Options</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Download your cards as HTML or export all your data to save or share your work.
                </p>
              </div>

              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                    <Check className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Automatic Saving</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your work is automatically saved in your browser cache, but to be shure, you can export your data at any time.
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
              <p className="mb-2">
                <strong>Pro Tip:</strong> For best results when printing, use double-sided printing and select "Flip on short edge" in your printer settings.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Let's Get Started
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal;