import { useEffect, useRef, useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ERRORS, SUCCESS } from '../../utils/constants';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const EditCategoryModal = ({ 
  editingCategory, 
  setEditingCategory, 
  categories, 
  setCategories,
  cards,
  setCards
}) => {
  const [formState, setFormState] = useState({
    name: editingCategory.name,
    color: editingCategory.color,
    errors: {
      name: '',
      color: ''
    }
  });
  
  const modalRef = useRef(null);
  
  useOnClickOutside(modalRef, () => setEditingCategory(null));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('category-name-input')?.focus();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const validateForm = () => {
    const errors = {
      name: '',
      color: ''
    };
    
    if (!formState.name.trim()) {
      errors.name = ERRORS.REQUIRED_FIELD;
    }
    
    const nameExists = categories.some(
      cat => cat.name.toLowerCase() === formState.name.trim().toLowerCase() && 
             cat.name !== editingCategory.originalName
    );
    
    if (nameExists) {
      errors.name = ERRORS.NAME_EXISTS;
    }
    
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    if (!colorRegex.test(formState.color)) {
      errors.color = ERRORS.INVALID_COLOR;
    }
    
    setFormState(prev => ({ ...prev, errors }));
    
    return !errors.name && !errors.color;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: ''
      }
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory.id ? 
        { ...cat, name: formState.name.trim(), color: formState.color } : cat
    );
    
    setCategories(updatedCategories);
    
    const updatedCards = cards.map(card => ({
      ...card,
      questions: card.questions.map(q => 
        q.category === editingCategory.originalName ? 
          { ...q, category: formState.name.trim() } : q
      )
    }));
    
    setCards(updatedCards);
    setEditingCategory(null);
    toast.success(SUCCESS.CATEGORY_UPDATED);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.3 }}
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="flex justify-between items-center border-b dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Edit Category</h3>
          <button 
            onClick={() => setEditingCategory(null)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="category-name-input">
              Category Name
            </label>
            <input
              id="category-name-input"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              className={`w-full p-2.5 border ${formState.errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 outline-none transition-colors`}
            />
            {formState.errors.name && (
              <div className="mt-1 text-sm text-red-500 flex items-center gap-1.5">
                <AlertCircle size={14} />
                <span>{formState.errors.name}</span>
              </div>
            )}
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Color
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                name="color"
                value={formState.color}
                onChange={handleInputChange}
                className="w-12 h-12 p-1 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
              />
              <input
                type="text"
                name="color"
                value={formState.color}
                onChange={handleInputChange}
                placeholder="#RRGGBB"
                className={`flex-1 p-2.5 border ${formState.errors.color ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
            </div>
            {formState.errors.color && (
              <div className="mt-1 text-sm text-red-500 flex items-center gap-1.5">
                <AlertCircle size={14} />
                <span>{formState.errors.color}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onClick={() => setEditingCategory(null)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Check size={18} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditCategoryModal;