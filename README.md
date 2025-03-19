# 🎮 TriviaForge - Modern Trivia Card Generator

![TriviaForge Banner](https://api.placeholder.com/1200/300)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0.0-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite)](https://vitejs.dev/)

TriviaForge is a modern, feature-rich web application for creating customizable trivia cards that can be printed or shared digitally. Perfect for teachers, game hosts, and trivia enthusiasts looking to create professional-quality trivia cards with ease.

## ✨ Features

- **Intuitive Card Creation** - Easily create trivia cards with questions and answers
- **Category Customization** - Create, edit, and manage categories with custom colors
- **Print-Ready Output** - Generate printer-friendly layouts optimized for double-sided printing
- **HTML Export** - Download your cards as an HTML file for offline use
- **JSON Import/Export** - Save and share your card collections
- **Dark Mode Support** - Work comfortably day or night
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Local Storage** - Never lose your work with automatic saving
- **Card Preview System** - See exactly how your cards will look before printing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/triviaforge.git
cd triviaforge
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🖨️ Printing Guide

For best results when printing your trivia cards:

1. Use the "Print Cards" button to open the print-ready version
2. Select double-sided printing in your browser's print dialog
3. Choose A4 paper size
4. Set margins to "None" or the minimum your printer allows
5. Make sure "Background Graphics" is enabled in your print settings

## 🧩 Project Structure

```
triviaforge/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── cards/         # Card-related components
│   │   ├── categories/    # Category management components
│   │   ├── layout/        # Layout components (header, footer, etc.)
│   │   └── ui/            # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles and Tailwind config
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── .eslintrc.js           # ESLint configuration
├── .gitignore             # Git ignore file
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## 📱 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="https://api.placeholder.com/400/300" alt="Dashboard" width="400" />
  <img src="https://api.placeholder.com/400/300" alt="Card Editor" width="400" />
  <img src="https://api.placeholder.com/400/300" alt="Category Management" width="400" />
  <img src="https://api.placeholder.com/400/300" alt="Print Preview" width="400" />
</div>

## 💡 Usage Tips

- **Categories**: Start by customizing your categories to match your trivia theme
- **Questions**: Add questions and answers for each category to create well-rounded cards
- **Preview**: Use the card preview to check your formatting before printing
- **Backup**: Regularly export your data using the JSON export feature
- **Sharing**: Share your trivia set with colleagues by exporting and sending the JSON file

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hot Toast](https://react-hot-toast.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by traditional trivia card games
- Thanks to all contributors who help improve this project
- Icons by [Lucide](https://lucide.dev/)

## 📬 Contact

Project Link: [https://github.com/yourusername/triviaforge](https://github.com/yourusername/triviaforge)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)