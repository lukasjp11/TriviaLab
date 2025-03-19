import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, Upload } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ImportConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const { darkMode } = useTheme();
  if (!isOpen) return null;
  
  return createPortal(
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          borderRadius: '0.75rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '28rem',
          overflow: 'hidden'
        }}
        className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex justify-between items-center p-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={20} />
            <h3 className="text-lg font-bold">Import Data</h3>
          </div>
          <button 
            onClick={onClose}
            className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            This will replace all your current cards and categories. This action cannot be undone.
          </p>
          
          <div className={`p-3 rounded-md mb-4 ${darkMode ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p className={`text-sm flex items-start gap-2 ${darkMode ? 'text-amber-200' : 'text-amber-800'}`}>
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <span>All existing data will be overwritten with the imported data.</span>
            </p>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Upload size={16} />
              <span>Yes, Import</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImportConfirmationModal;