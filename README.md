# OTT Finance - Digital Wallet App

<div align="center">
  <img src="public/images/logos/ott_logo-removebg-preview.png" alt="OTT Finance Logo" width="120"/>
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

  **A modern, feature-rich digital wallet application with international remittance capabilities**
</div>

## 🌟 Features

### Core Wallet Functionality
- 🔐 **Secure Authentication** - User login/logout with session management
- 💰 **Account Overview** - Real-time balance display with gradient cards
- 📊 **Transaction History** - Comprehensive transaction tracking and details
- 💳 **Card Management** - Multiple card support with visual themes
- 📱 **Responsive Design** - Mobile-first approach with modern UI/UX

### International Remittance
- 🌍 **Global Money Transfer** - Send money to 50+ countries
- 💱 **Real-time FX Rates** - Live currency conversion with transparent fees
- 🎯 **Smart Recipient Selection** - Quick access to recent transfers
- 📈 **Transfer Analytics** - Track international transfer patterns
- 🔄 **Multi-currency Support** - USD, EUR, GBP, CAD, AUD, and more

### Advanced Features
- 📊 **Analytics Dashboard** - Spending insights and financial analytics
- 🔔 **Payment Requests** - Send and receive payment requests
- ⚙️ **Settings Management** - Customizable preferences and security
- 🌙 **Dark Mode** - Consistent dark theme with design tokens
- 🎨 **OTT Branding** - Custom red color scheme and professional styling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JacobKayembekazadi/OTT-app.git
   cd OTT-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Demo Credentials
```
Username: demouser
Password: (any password)
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18.2.0 with hooks and context API
- **Build Tool**: Vite 5.4.1 for fast development and optimized builds
- **Styling**: Tailwind CSS 3.4.1 with custom design tokens
- **Icons**: Custom SVG icon system
- **State Management**: React Context API with useReducer

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── AccountOverview.js   # Main balance card
│   ├── AppShell.js         # Global layout wrapper
│   ├── NavButton.js        # Navigation components
│   └── Toggle.js           # Settings toggles
├── screens/            # Main application screens
│   ├── LoginScreen.js      # Authentication
│   ├── Dashboard.js        # Main app container
│   ├── HomeScreen.js       # Wallet overview
│   ├── PaymentsScreen.js   # Send/request money
│   ├── InternationalRemittanceScreen.js  # FX transfers
│   ├── AnalyticsScreen.js  # Financial insights
│   ├── CardManagementScreen.js  # Card operations
│   └── SettingsScreen.js   # User preferences
├── context/            # State management
│   └── WalletContext.js    # Global app state
├── theme/              # Design system
│   └── tokens.css          # CSS custom properties
├── icons/              # SVG icon definitions
└── App.js             # Root component
```

## 🎨 Design System

### Color Palette
The app uses a carefully crafted dark theme with OTT's signature red accents:

```css
/* Primary Backgrounds */
--color-bg-primary: #121212     /* Main background */
--color-bg-secondary: #1E1E1E   /* Card surfaces */
--color-bg-tertiary: #2A2A2A    /* Elevated elements */

/* Text Colors */
--color-text-primary: #FFFFFF    /* Primary text */
--color-text-secondary: #AFAFAF  /* Secondary text */
--color-text-tertiary: #6C6C6C   /* Muted text */

/* Brand Accents */
--color-accent-primary: #B83E3E  /* OTT Red */
--color-accent-positive: #2E8B57 /* Success green */
--color-accent-negative: #D24B4B /* Error red */
```

### Design Tokens
All visual properties are centralized in `src/theme/tokens.css`:
- 🎨 **Colors**: Semantic color system
- 🌈 **Gradients**: Brand gradient definitions
- 📐 **Spacing**: Consistent border radius values
- 🎭 **Shadows**: Layered shadow system

## 💡 Key Features Deep Dive

### International Remittance System
The remittance feature provides a complete international money transfer experience:

- **Currency Selection**: Dropdown with flag icons for 15+ currencies
- **Real-time Rates**: Live FX conversion with transparent fee structure
- **Transfer History**: Track all international transfers with status
- **Recipient Management**: Save and reuse recipient information
- **Smart Defaults**: Auto-populate fields based on recent transfers

### State Management
Uses React Context API with useReducer for predictable state updates:

```javascript
// Available actions
LOGIN, LOGOUT, SET_THEME
SEND_MONEY, REQUEST_MONEY
SEND_REMITTANCE
ADD_CARD, REMOVE_CARD
```

### Responsive Navigation
- **Mobile-First**: Optimized for mobile devices
- **Tab Navigation**: Intuitive bottom navigation
- **Floating Action**: Prominent payment button
- **State Persistence**: Maintains navigation state

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

### Environment Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Git hooks** (optional)
   ```bash
   npx husky install
   ```

3. **Start coding!**
   ```bash
   npm run dev
   ```

## 🎯 Roadmap

### Phase 1: Core Enhancement
- [ ] **Real Backend Integration** - Connect to actual payment APIs
- [ ] **Authentication** - JWT-based auth with refresh tokens
- [ ] **Push Notifications** - Real-time transaction alerts
- [ ] **Biometric Auth** - Fingerprint/Face ID support

### Phase 2: Advanced Features
- [ ] **Cryptocurrency** - Bitcoin/Ethereum support
- [ ] **Investment Portfolio** - Stock and crypto tracking
- [ ] **Bill Payments** - Utility and subscription payments
- [ ] **QR Code Payments** - Scan-to-pay functionality

### Phase 3: Business Features
- [ ] **Merchant Dashboard** - Business account management
- [ ] **API Documentation** - Developer portal
- [ ] **White-label Solution** - Customizable branding
- [ ] **Compliance Tools** - KYC/AML integration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS classes for styling
- Maintain design token consistency
- Write clear, descriptive commit messages
- Test your changes across different screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jacob Kayembe Kazadi**
- GitHub: [@JacobKayembekazadi](https://github.com/JacobKayembekazadi)
- LinkedIn: [Jacob Kayembe Kazadi](https://linkedin.com/in/jacob-kayembe-kazadi)

## 🙏 Acknowledgments

- **React Team** for the excellent framework
- **Tailwind CSS** for the utility-first approach
- **Vite** for the lightning-fast build tool
- **OTT** for the brand inspiration and design direction

---

<div align="center">
  <p><strong>Built with ❤️ for the future of digital finance</strong></p>
  
  ⭐ **Star this repository if you found it helpful!** ⭐
</div>