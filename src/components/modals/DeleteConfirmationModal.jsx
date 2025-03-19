import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, AlertCircle, Trash2 } from 'lucide-react';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion", 
  message = "Are you sure you want to delete this item?",
  confirmButtonText = "Delete",
  type = "danger"
}) => {
  if (!isOpen) return null;

  const isDanger = type === "danger";

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
        transition={{ type: 'spring', duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b dark:border-gray-700 p-4">
          <div className="flex items-center gap-2">
            {isDanger ? (
              <AlertTriangle className="text-red-500" size={20} />
            ) : (
              <AlertCircle className="text-amber-500" size={20} />
            )}
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {message}
          </p>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 ${
                isDanger 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-amber-600 hover:bg-amber-700"
              } text-white rounded-lg transition-colors flex items-center gap-2`}
            >
              <Trash2 size={16} />
              {confirmButtonText}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteConfirmationModal;