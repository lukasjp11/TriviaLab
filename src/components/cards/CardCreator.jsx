import { useState } from 'react';
import { PlusCircle, Save, Trash, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { generateId, SUCCESS } from '../../utils/constants';

const CardCreator = ({ categories, cards, setCards }) => {
  const [currentCard, setCurrentCard] = useState(() => ({
    id: generateId(),
    questions: categories.map(cat => ({ category: cat.name, question: '', answer: '' }))
  }));

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...currentCard.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setCurrentCard({ ...currentCard, questions: newQuestions });
  };

  const handleAddCard = () => {
    // Only add if card has at least one filled question
    if (currentCard.questions.some(q => q.question.trim() !== '')) {
      setCards([...cards, currentCard]);
      setCurrentCard({
        id: generateId(),
        questions: categories.map(cat => ({ category: cat.name, question: '', answer: '' }))
      });
      toast.success(SUCCESS.CARD_ADDED);
    } else {
      toast.error('Please fill at least one question before adding a card');
    }
  };

  const handleClearForm = () => {
    if (confirm('Clear the current form? This will remove all unsaved questions and answers.')) {
      setCurrentCard({
        id: generateId(),
        questions: categories.map(cat => ({ category: cat.name, question: '', answer: '' }))
      });
      toast('Form cleared', { icon: '🧹' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Create a New Card</h2>
        <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-300 text-sm font-medium">
          {categories.length} Categories
        </div>
      </div>
      
      <div className="space-y-5">
        {currentCard.questions.map((q, index) => {
          const category = categories.find(c => c.name === q.category);
          if (!category) return null;
          
          return (
            <div 
              key={index} 
              className="p-4 border dark:border-gray-700 rounded-lg transition-all hover:shadow-md"
            >
              <div className="flex items-center mb-3">
                <div 
                  className="w-4 h-4 mr-2 rounded-sm" 
                  style={{ backgroundColor: category?.color || '#ccc' }}
                ></div>
                <span className="font-medium text-gray-700 dark:text-gray-200">{q.category}</span>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Question
                </label>
                <textarea
                  className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  rows="2"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  placeholder={`Enter a question for ${q.category}...`}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Answer
                </label>
                <textarea
                  className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  rows="2"
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                  placeholder="Enter the answer..."
                ></textarea>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <button 
          onClick={handleAddCard}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          <Save size={18} />
          <span>Save Card</span>
        </button>
        
        <button 
          onClick={handleClearForm}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md transition-colors"
        >
          <RefreshCw size={18} />
          <span>Clear Form</span>
        </button>
        
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {cards.length} cards in collection
        </div>
      </div>
    </motion.div>
  );
};

export default CardCreator;