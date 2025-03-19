import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultCategories } from './utils/constants';

// Components
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
  // State management
  const [categories, setCategories] = useLocalStorage('triviaCategories', defaultCategories);
  const [cards, setCards] = useLocalStorage('triviaCards', []);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage('firstVisit', true);

  // Check if it's the user's first visit
  useEffect(() => {
    if (isFirstVisit) {
      setShowWelcomeModal(true);
      setIsFirstVisit(false);
    }
  }, [isFirstVisit, setIsFirstVisit]);

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
                categories={categories}
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
            />
          )}
        </main>
        
        <Footer />
        
        {/* Modals */}
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
        
        {/* Toast notifications */}
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;