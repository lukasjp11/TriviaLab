import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, ArrowDownUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { SUCCESS } from '../../utils/constants';

const CardList = ({ cards, categories, setCards }) => {
  const handleDeleteCard = (cardId) => {
    if (confirm('Are you sure you want to delete this card?')) {
      setCards(cards.filter(card => card.id !== cardId));
      toast.success(SUCCESS.CARD_DELETED);
    }
  };

  const handleEditCard = (card) => {
    // This would typically be handled by the parent component
    // by passing a function to update the current card being edited
    toast(
      'Edit card functionality is not implemented in this preview', 
      { icon: '🔧' }
    );
  };

  const renderCardPreview = (card, index) => {
    return (
      <motion.div 
        key={card.id} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-5 mb-5 shadow-md hover:shadow-lg transition-shadow"
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            Card #{index + 1}
            <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
              {card.questions.filter(q => q.question.trim()).length} Questions
            </span>
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => handleEditCard(card)} 
              className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              title="Edit card"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => handleDeleteCard(card.id)} 
              className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              title="Delete card"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {card.questions.map((q, qIndex) => {
            const category = categories.find(c => c.name === q.category);
            if (!q.question || !category) return null;
            
            return (
              <div key={qIndex} className="border dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-3 h-3 mr-2 rounded-sm" 
                    style={{ backgroundColor: category?.color || '#ccc' }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{q.category}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">Q:</span> {q.question}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic border-t dark:border-gray-700 pt-2">
                    <span className="font-semibold">A:</span> {q.answer || 'No answer provided'}
                  </p>
                </div>
              </div>
            );
          }).filter(Boolean)}
        </div>
      </motion.div>
    );
  };

  if (cards.length === 0) {
    return (
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Cards</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
          <p className="text-gray-600 dark:text-gray-400">No cards yet. Start creating some!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Cards</h2>
        <div className="flex items-center">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <ArrowDownUp size={16} />
            <span>Sort</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {cards.map((card, index) => renderCardPreview(card, index))}
      </div>
    </section>
  );
};

export default CardList;