import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultCategories, generateId } from './utils/constants';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/layout/Dashboard';
import CardCreator from './components/cards/CardCreator';
import CategoryManager from './components/categories/CategoryManager';
import ActionPanel from './components/cards/ActionPanel';
import CardList from './components/cards/CardList';
import EditCategoryModal from './components/modals/EditCategoryModal';
import WelcomeModal from './components/modals/WelcomeModal';
import ThemeProvider from './contexts/ThemeContext';

function App() {
  const [categories, setCategories] = useLocalStorage('triviaCategories', defaultCategories);
  const [cards, setCards] = useLocalStorage('triviaCards', []);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showCardPreview, setShowCardPreview] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage('firstVisit', true);
  const [isEditingCard, setIsEditingCard] = useState(false);
  
  const createEmptyCard = () => ({
    id: generateId(),
    questions: categories.map(cat => ({ category: cat.name, question: '', answer: '' }))
  });
  
  const [currentCard, setCurrentCard] = useState(createEmptyCard);

  const handleEditCard = (card) => {
    setCurrentCard(card);
    setIsEditingCard(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCard = (card) => {
    if (isEditingCard) {
      setCards(cards.map(c => c.id === card.id ? card : c));
      setIsEditingCard(false);
    } else {
      setCards([...cards, card]);
    }
    setCurrentCard(createEmptyCard());
  };

  useEffect(() => {
    if (isFirstVisit) {
      setShowWelcomeModal(true);
      setIsFirstVisit(false);
    }
  }, [isFirstVisit, setIsFirstVisit]);

  useEffect(() => {
    if (!isEditingCard) {
      setCurrentCard(createEmptyCard());
    }
  }, [categories, isEditingCard]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
          <Dashboard
            leftPanel={
              <>
                <CardCreator 
                  categories={categories} 
                  cards={cards}
                  setCards={setCards}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                  onSaveCard={handleSaveCard}
                  isEditingCard={isEditingCard}
                  setIsEditingCard={setIsEditingCard}
                />
                
                <CategoryManager 
                  categories={categories}
                  setCategories={setCategories}
                  setEditingCategory={setEditingCategory}
                  cards={cards}
                  setCards={setCards}
                />
              </>
            }
            rightPanel={
              <ActionPanel 
                cards={cards}
                setCards={setCards}
                categories={categories}
                setCategories={setCategories}
                showCardPreview={showCardPreview}
                setShowCardPreview={setShowCardPreview}
              />
            }
          />
          
          {showCardPreview && cards.length > 0 && (
            <CardList 
              cards={cards} 
              categories={categories}
              setCards={setCards}
              onEditCard={handleEditCard}
            />
          )}
        </main>
        
        <Footer />
        
        <AnimatePresence>
          {editingCategory && (
            <EditCategoryModal 
              editingCategory={editingCategory}
              setEditingCategory={setEditingCategory}
              categories={categories}
              setCategories={setCategories}
              cards={cards}
              setCards={setCards}
            />
          )}
          
          {showWelcomeModal && (
            <WelcomeModal 
              onClose={() => setShowWelcomeModal(false)}
            />
          )}
        </AnimatePresence>
        
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;