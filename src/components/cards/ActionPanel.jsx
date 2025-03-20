import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, Eye, EyeOff, Upload, Database, HelpCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { downloadHtml, openPrintWindow } from '../../utils/htmlGenerator';
import { createBackup, importData } from '../../utils/dataExportImport';
import { SUCCESS, defaultCategories } from '../../utils/constants';
import ImportConfirmationModal from '../modals/ImportConfirmationModal';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

const ActionPanel = ({ cards, categories, setCards, setCategories, showCardPreview, setShowCardPreview }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef(null);
  
  const handlePrint = () => {
    if (cards.length === 0) {
      toast.error('Please add at least one card first');
      return;
    }
    
    toast.promise(
      new Promise((resolve) => {
        openPrintWindow(cards, categories);
        setTimeout(resolve, 500);
      }),
      {
        loading: 'Preparing print view...',
        success: 'Print view ready!',
        error: 'Failed to prepare print view'
      }
    );
  };
  
  const handleDownloadHtml = () => {
    if (cards.length === 0) {
      toast.error('Please add at least one card first');
      return;
    }
    
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          downloadHtml(cards, categories);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: 'Generating HTML...',
        success: 'HTML downloaded successfully!',
        error: 'Failed to generate HTML'
      }
    );
  };
  
  const handleExportData = () => {
    if (cards.length === 0) {
      toast.error('Please add at least one card first');
      return;
    }
    
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          createBackup(cards, categories);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: 'Preparing backup...',
        success: SUCCESS.DATA_EXPORTED,
        error: 'Failed to export data'
      }
    );
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setImportFile(file);
    setShowImportConfirm(true);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const confirmImport = async () => {
    if (!importFile) return;
    
    setIsImporting(true);
    setShowImportConfirm(false);
    
    try {
      const importedData = await importData(importFile);
      
      if (importedData.cards && Array.isArray(importedData.cards)) {
        setCards(importedData.cards);
      }
      
      if (importedData.categories && Array.isArray(importedData.categories)) {
        setCategories(importedData.categories);
      }
      
      toast.success(
        `Successfully imported ${importedData.cards?.length || 0} cards and ${importedData.categories?.length || 0} categories`
      );
    } catch (error) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setIsImporting(false);
      setImportFile(null);
    }
  };

  const cancelImport = () => {
    setShowImportConfirm(false);
    setImportFile(null);
  };

  const handleResetAll = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setCards([]);
    setCategories(defaultCategories);
    setShowResetConfirm(false);
    toast.success('All data has been reset');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md sticky top-4"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5">Actions</h2>
      
      <div className="space-y-4">
        <button 
          onClick={handlePrint}
          disabled={cards.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <Printer size={20} />
          <span className="font-medium">Print Cards</span>
        </button>
        
        <button 
          onClick={handleDownloadHtml}
          disabled={cards.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 dark:disabled:bg-purple-900 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <Download size={20} />
          <span className="font-medium">Download HTML</span>
        </button>
        
        <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Data Management</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleExportData}
              disabled={cards.length === 0}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 dark:disabled:bg-green-900 text-white py-2 px-3 rounded-lg transition-colors"
            >
              <Database size={18} />
              <span>Export</span>
            </button>
            
            <button 
              onClick={handleImportClick}
              disabled={isImporting}
              className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 dark:disabled:bg-amber-900 text-white py-2 px-3 rounded-lg transition-colors"
            >
              <Upload size={18} />
              <span>{isImporting ? 'Importing...' : 'Import'}</span>
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
          
          <button 
            onClick={handleResetAll}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
            <span>Reset All Data</span>
          </button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Card Count:</span>
            <span className="font-medium">{cards.length}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <span>Category Count:</span>
            <span className="font-medium">{categories.length}</span>
          </div>
        </div>
        
        <button
          onClick={() => setShowCardPreview(!showCardPreview)}
          className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg transition-colors"
        >
          {showCardPreview ? (
            <>
              <EyeOff size={18} />
              <span>Hide Card Previews</span>
            </>
          ) : (
            <>
              <Eye size={18} />
              <span>Show Card Previews</span>
            </>
          )}
        </button>
      </div>

      <ImportConfirmationModal
        isOpen={showImportConfirm}
        onClose={cancelImport}
        onConfirm={confirmImport}
      />
      
      <DeleteConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={confirmReset}
        title="Reset All Data"
        message="Are you sure you want to reset all data? This will delete all your cards and restore default categories. This action cannot be undone."
        confirmButtonText="Reset Everything"
        type="danger"
      />
    </motion.div>
  );
};

export default ActionPanel;