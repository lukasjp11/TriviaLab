/**
 * Default categories for the application
 */
export const defaultCategories = [
    { id: 'cat-1', name: 'History', color: '#3B82F6' },     // Blue
    { id: 'cat-2', name: 'Science', color: '#EAB308' },     // Yellow
    { id: 'cat-3', name: 'Arts', color: '#F97316' },        // Orange
    { id: 'cat-4', name: 'Geography', color: '#10B981' },   // Green
    { id: 'cat-5', name: 'Sports', color: '#EC4899' },      // Pink
    { id: 'cat-6', name: 'Pop Culture', color: '#8B5CF6' }  // Purple
  ];
  
  /**
   * Generate a unique ID
   * @returns {string} A unique ID string
   */
  export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };
  
  /**
   * App routes
   */
  export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    HELP: '/help'
  };
  
  /**
   * Animation variants for Framer Motion
   */
  export const ANIMATIONS = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } }
    },
    slideUp: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
    },
    modalBackdrop: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    },
    modalContent: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
      exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } }
    }
  };
  
  /**
   * Common error messages
   */
  export const ERRORS = {
    REQUIRED_FIELD: 'This field is required',
    NAME_EXISTS: 'This name already exists',
    INVALID_COLOR: 'Please enter a valid color',
    MIN_CATEGORIES: 'You must have at least one category'
  };
  
  /**
   * Common success messages
   */
  export const SUCCESS = {
    CARD_ADDED: 'Card added successfully',
    CARD_UPDATED: 'Card updated successfully',
    CARD_DELETED: 'Card deleted successfully',
    CATEGORY_ADDED: 'Category added successfully',
    CATEGORY_UPDATED: 'Category updated successfully',
    CATEGORY_DELETED: 'Category deleted successfully',
    DATA_EXPORTED: 'Data exported successfully',
    DATA_IMPORTED: 'Data imported successfully'
  };