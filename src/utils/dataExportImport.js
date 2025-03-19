/**
 * Utility functions for data import/export
 */

/**
 * Export all app data as a JSON file
 * @param {Object} data - The data to export
 * @param {string} filename - Filename for the exported file
 */
export function exportData(data, filename = 'triviaforge-backup.json') {
    try {
      // Format the JSON with indentation for readability
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting data:', error);
      return false;
    }
  }
  
  /**
   * Import app data from a JSON file
   * @param {File} file - The uploaded JSON file
   * @returns {Promise<Object>} The parsed data
   */
  export function importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          // Validate the imported data
          if (!data.cards || !data.categories) {
            reject(new Error('Invalid data format: Missing cards or categories'));
            return;
          }
          
          // Additional validation could be done here
          
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
  
  /**
   * Prepare current app data for export
   * @param {Array} cards - Cards array
   * @param {Array} categories - Categories array
   * @returns {Object} Export-ready data object with metadata
   */
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
  
  /**
   * Create a downloadable backup file
   * @param {Array} cards - Cards array
   * @param {Array} categories - Categories array
   */
  export function createBackup(cards, categories) {
    const data = prepareExportData(cards, categories);
    const timestamp = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
    exportData(data, `triviaforge-backup-${timestamp}.json`);
  }