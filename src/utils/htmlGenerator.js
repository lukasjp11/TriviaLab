export function generateHtml(cards, categories) {
    if (cards.length === 0) {
      throw new Error('No cards available to generate HTML');
    }
  
    let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TriviaLab Cards</title>
      <style>
          @media print {
              @page {
                  size: A4;
                  margin: 0;
              }
  
              body {
                  margin: 0;
                  padding: 0;
              }
  
              * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
              }
  
              .upside-down {
                  transform: rotate(180deg) !important;
                  -webkit-transform: rotate(180deg) !important;
              }
  
              .print-instructions {
                  display: none;
              }
              
              .page-break {
                  page-break-before: always;
                  break-before: page;
              }
          }
  
          body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              padding: 0;
              margin: 0;
              color: #333;
          }
  
          .container {
              width: 100%;
              box-sizing: border-box;
              display: flex;
              flex-wrap: wrap;
              padding: 0;
              margin: 0;
          }
  
          .card {
              width: 105mm;
              height: 99mm;
              border: 1px solid #000;
              box-sizing: border-box;
              padding: 2mm;
              page-break-inside: avoid;
              background-color: #64a7d9;
              overflow: hidden;
              margin: 0;
              position: relative;
          }
  
          .card-inner {
              background-color: white;
              border: 1px solid #ddd;
              border-radius: 4px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding: 12px;
              position: relative;
              display: flex;
              flex-direction: column;
          }
  
          .category {
              display: flex;
              align-items: center;
              padding: 6px 0;
              border-bottom: 1px solid #f0f0f0;
              min-height: 32px;
              flex-grow: 1;
          }
  
          .category:nth-child(6) {
             border-bottom: none;
          }
  
          .marker {
              width: 20px;
              height: 20px;
              margin-right: 10px;
              flex-shrink: 0;
              position: relative;
          }
  
          .marker:before {
              content: "";
              position: absolute;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 10px 0 10px 15px;
              border-radius: 0 2px 2px 0;
              left: 0;
              top: 0;
          }
  
          ${categories.map((cat) => `
          .${cat.name.toLowerCase().replace(/\s+/g, '-')}-marker:before {
              border-color: transparent transparent transparent ${cat.color};
          }
          `).join('\n')}
  
          .category-content {
              font-size: 12pt;
              line-height: 1.3;
              flex-grow: 1;
              word-wrap: break-word;
              overflow-wrap: break-word;
          }
  
          .upside-down {
              transform: rotate(180deg);
              -webkit-transform: rotate(180deg);
          }
  
          .questions-container .category-content {
              font-style: normal;
          }
  
          .answers-container .category-content {
              font-style: italic;
              font-weight: 500;
          }
  
          .card-number {
              position: absolute;
              bottom: 6px;
              right: 12px;
              font-size: 11pt;
              color: #555;
              font-weight: bold;
              background: #f8f8f8;
              border-radius: 12px;
              padding: 1px 8px;
          }
  
          .page-break {
              page-break-before: always;
              break-before: page;
              display: block;
              height: 0;
              clear: both;
          }
  
          .print-instructions {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              background: #f8f9fa;
              border: 1px solid #ddd;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }
  
          .print-instructions h1 {
              color: #2563eb;
              margin-top: 0;
          }
  
          .print-instructions h2 {
              margin-top: 20px;
              color: #4b5563;
          }
  
          .print-button {
              background: #2563eb;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 16px;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.2s;
              margin-top: 10px;
          }
  
          .print-button:hover {
              background: #1d4ed8;
          }
  
          .category-legend {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-top: 15px;
          }
  
          .category-item {
              display: flex;
              align-items: center;
              background: white;
              padding: 6px 12px;
              border-radius: 20px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
  
          .category-color {
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              margin-right: 8px;
          }
  
          .branding {
              text-align: center;
              margin-top: 20px;
              color: #6b7280;
              font-size: 12px;
          }
      </style>
  </head>
  <body>
      <div class="print-instructions">
          <h1>TriviaLab Cards</h1>
          <p>Your trivia cards are ready to print! Follow these instructions for the best results:</p>
          
          <h2>Printing Instructions</h2>
          <ol>
              <li>Use <strong>double-sided printing</strong> (flip on short edge)</li>
              <li>Set paper size to <strong>A4</strong></li>
              <li>Set margins to <strong>None</strong> or the smallest available</li>
              <li>Make sure <strong>Background Graphics</strong> is enabled in your print settings</li>
          </ol>
          
          <h2>Categories</h2>
          <div class="category-legend">
              ${categories.map(cat => `
              <div class="category-item">
                  <span class="category-color" style="background-color: ${cat.color};"></span>
                  <span>${cat.name}</span>
              </div>`).join('')}
          </div>
          
          <p>Total cards: <strong>${cards.length}</strong></p>
          
          <button onclick="window.print()" class="print-button">Print Cards</button>
          
          <div class="branding">
              Created with TriviaLab
          </div>
      </div>`;
  
    html += `
      <!-- QUESTIONS PAGE -->
      <div class="container questions-container">`;
      
    cards.forEach((card, index) => {
      html += `
          <!-- Card ${index + 1} -->
          <div class="card">
              <div class="card-inner">`;
        
      categories.forEach(category => {
        const questionData = card.questions.find(q => q.category === category.name);
        if (questionData && questionData.question) {
          html += `
                  <div class="category">
                      <div class="marker ${category.name.toLowerCase().replace(/\s+/g, '-')}-marker"></div>
                      <div class="category-content">${questionData.question}</div>
                  </div>`;
        }
      });
        
      html += `
                  <div class="card-number">${index + 1}</div>
              </div>
          </div>`;
    });
      
    html += `
      </div>
  
      <div class="page-break"></div>
  
      <!-- ANSWERS PAGE -->
      <div class="container answers-container">`;
      
    [...cards].reverse().forEach((card, reversedIndex) => {
      const index = cards.length - reversedIndex - 1;
      html += `
          <!-- Card ${index + 1} Answers -->
          <div class="card">
              <div class="card-inner upside-down">`;
        
      categories.forEach(category => {
        const questionData = card.questions.find(q => q.category === category.name);
        if (questionData && questionData.question) {
          html += `
                  <div class="category">
                      <div class="marker ${category.name.toLowerCase().replace(/\s+/g, '-')}-marker"></div>
                      <div class="category-content">${questionData.answer || 'No answer provided'}</div>
                  </div>`;
        }
      });
        
      html += `
                  <div class="card-number">${index + 1}</div>
              </div>
          </div>`;
    });
      
    html += `
      </div>
  </body>
  </html>`;
  
    return html;
  }
  
  export function openPrintWindow(cards, categories) {
    try {
      const html = generateHtml(cards, categories);
      const printWindow = window.open('', '_blank');
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
    } catch (error) {
      console.error('Error generating print window:', error);
      throw error;
    }
  }
  
  export function downloadHtml(cards, categories, filename = 'trivia-cards.html') {
    try {
      const html = generateHtml(cards, categories);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading HTML:', error);
      throw error;
    }
  }