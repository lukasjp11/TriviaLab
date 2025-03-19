export function exportData(data, filename = 'trivialab-backup.json') {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting data:', error);
      return false;
    }
  }
  
  export function importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (!data.cards || !data.categories) {
            reject(new Error('Invalid data format: Missing cards or categories'));
            return;
          }
          
          resolve(data);
        } catch (error) {
          reject(new Error(`Failed to parse file: ${error.message}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  }
  
  export function prepareExportData(cards, categories) {
    return {
      appVersion: '1.0.0',
      exportDate: new Date().toISOString(),
      cards,
      categories,
      meta: {
        cardCount: cards.length,
        categoryCount: categories.length
      }
    };
  }
  
  export function createBackup(cards, categories) {
    const data = prepareExportData(cards, categories);
    const timestamp = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
    exportData(data, `trivialab-backup-${timestamp}.json`);
  }