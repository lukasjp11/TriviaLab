import { useState } from 'react';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { generateId, ERRORS, SUCCESS } from '../../utils/constants';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

const CategoryManager = ({ 
  categories, 
  setCategories, 
  setEditingCategory,
  cards,
  setCards
}) => {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  const handleAddCategory = () => {
    // Create default category name, adding a number if name already exists
    let baseName = "New Category";
    let name = baseName;
    let counter = 1;
    
    // Check if name already exists and increment counter until unique
    while (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
      counter++;
      name = `${baseName} ${counter}`;
    }
    
    // Create new category with white color
    const newCategory = { 
      id: generateId(), 
      name, 
      color: "#FFFFFF" 
    };
    
    // Add the new category
    setCategories([...categories, newCategory]);
    
    // Update all cards to include this new category
    const updatedCards = cards.map(card => ({
      ...card,
      questions: [...card.questions, { category: name, question: '', answer: '' }]
    }));
    setCards(updatedCards);
    
    // Show success notification
    toast.success(SUCCESS.CATEGORY_ADDED);
    
    // Optionally, immediately open the edit dialog for the new category
    setEditingCategory({ ...newCategory, originalName: newCategory.name });
  };
  
  const handleEditCategory = (category) => {
    setEditingCategory({ ...category, originalName: category.name });
  };
  
  const handleShowDeleteConfirm = (category) => {
    if (categories.length <= 1) {
      toast.error(ERRORS.MIN_CATEGORIES);
      return;
    }
    
    setCategoryToDelete(category);
  };
  
  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;
    
    // Remove this category
    const updatedCategories = categories.filter(cat => cat.id !== categoryToDelete.id);
    setCategories(updatedCategories);
    
    // Remove this category from all cards
    const updatedCards = cards.map(card => ({
      ...card,
      questions: card.questions.filter(q => q.category !== categoryToDelete.name)
    }));
    setCards(updatedCards);
    
    // Clear the deletion state
    setCategoryToDelete(null);
    
    toast.success(SUCCESS.CATEGORY_DELETED);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Categories</h2>
        <button 
          onClick={handleAddCategory}
          className="bg-blue-100 dark:bg-blue-800/40 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-blue-600 dark:text-blue-300 py-1.5 px-3 rounded-lg flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>
      
      <div className="space-y-2.5">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center">
              <div 
                className="w-6 h-6 mr-3 rounded-md border border-gray-200 dark:border-gray-600" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="font-medium text-gray-800 dark:text-gray-200">{category.name}</span>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleEditCategory(category)}
                className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Edit category"
              >
                <Edit2 size={16} />
              </button>
              
              <button 
                onClick={() => handleShowDeleteConfirm(category)}
                className="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                title="Delete category"
                disabled={categories.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {categories.length === 1 && (
        <div className="mt-4 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md flex items-start gap-2">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <p>You must have at least one category.</p>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={categoryToDelete !== null}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message={
          `Are you sure you want to delete the category "${categoryToDelete?.name}"? ` +
          "This will remove it from all cards. This action cannot be undone."
        }
        confirmButtonText="Delete Category"
        type="danger"
      />
    </motion.div>
  );
};

export default CategoryManager;