# Zustain - Health & Wellness Tracker

> ⚠️ **IMPORTANT:** Before running the app, you need to add your API Ninjas key!  
> See [API_CONFIG.md](./API_CONFIG.md) for quick 2-minute setup.

**IN3210 Mobile Applications Development - Assignment 2**  
**Domain:** Health & Wellness (Index Last Digit: 6)  
**App Theme:** FitBuddy - Track exercises, water intake, and wellness tips

A comprehensive React Native mobile application for tracking exercises and managing wellness routines, built following industry best practices and standards.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dulshanMMS/Zustain.git
   cd Zustain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **⚠️ ADD YOUR API KEY (Required!)**
   - Open `src/features/exercises/exerciseApi.ts`
   - Get FREE API key from: https://api-ninjas.com/
   - Replace `YOUR_API_KEY_HERE` with your actual key
   - See [API_CONFIG.md](./API_CONFIG.md) for detailed instructions

4. **Start the app**
   ```bash
   npm start
   ```
   Then press:
   - `w` for web
   - `a` for Android
   - `i` for iOS

### Test Credentials
- Username: `emilys`
- Password: `emilyspass`

---

## 📱 About This App

Zustain is a cross-platform mobile application that helps users:
- 🏋️ Browse and discover exercises by muscle group
- ❤️ Save favorite exercises for quick access
- 💧 Track daily water intake with interactive goals
- 💡 Discover daily wellness tips for healthy living
- 📊 Monitor workout progress and statistics
- 🌙 Enjoy seamless experience with dark mode
- 🔐 Secure authentication and data persistence

---

## ✅ Assignment Requirements Checklist

### User Authentication (15 marks)
- ✅ Registration and login flow implemented
- ✅ React Hook Form for form handling
- ✅ Yup validation schemas for input validation
- ✅ Navigation to home screen on successful login
- ✅ Username visible in app header/profile
- ✅ Secure token storage using Expo SecureStore
- ✅ DummyJSON API for authentication

### Navigation Structure (10 marks)
- ✅ React Navigation library
- ✅ Stack Navigator for auth flow
- ✅ Bottom Tab Navigator for main app
- ✅ Proper screen transitions

### Home Screen - Dynamic Item List (15 marks)
- ✅ Fetches exercises from API Ninjas Exercise API
- ✅ Card-based layout with:
  - Exercise image/icon
  - Exercise title
  - Status/difficulty (Beginner/Intermediate/Expert)
- ✅ Category filtering (Chest, Back, Arms, Legs, etc.)
- ✅ Loading and error states

### Item Interaction & State Management (15 marks)
- ✅ Tap exercise to open Details Screen
- ✅ Redux Toolkit for state management
- ✅ RTK Query for API calls with caching
- ✅ Clean architecture with feature-based structure

### Favourites (15 marks)
- ✅ Heart icon to mark exercises as favorites
- ✅ Dedicated Favorites screen (Bottom Tab)
- ✅ Redux Persist for local storage
- ✅ Favorites survive app restart

### Styling and UI (15 marks)
- ✅ Consistent, clean visual design
- ✅ Feather Icons throughout the app
- ✅ Responsive design for various screen sizes
- ✅ Theme system with color consistency

### Code Quality & Best Practices (20 marks)
- ✅ TypeScript for type safety
- ✅ Feature-based folder structure
- ✅ Modular, reusable components
- ✅ Decoupled architecture
- ✅ Custom validation schemas
- ✅ Error handling and user feedback
- ✅ Industry-standard patterns

### Bonus Feature (5 marks)
- ✅ **Dark Mode Toggle** - Fully functional with persistent preference

### Additional Features (Beyond Requirements)
- ✅ **Water Intake Tracker** - Interactive daily water tracking with progress visualization
- ✅ **Wellness Tips** - Daily rotating wellness tips with fitness, nutrition, and mental health advice
- ✅ **Enhanced UI/UX** - Beautiful card-based design optimized for mobile interaction

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native (Expo) |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit |
| **API Client** | RTK Query |
| **Navigation** | React Navigation 6 |
| **Forms** | React Hook Form |
| **Validation** | Yup |
| **Storage** | Expo SecureStore + AsyncStorage |
| **Persistence** | Redux Persist |
| **Icons** | Feather Icons (@expo/vector-icons) |
| **APIs** | DummyJSON (Auth) + API Ninjas (Exercises) |

---

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app on your phone)

### Steps

1. **Clone the repository**
   ```bash
   cd Zustain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key** (Required for exercises)
   - Get FREE API key from [API Ninjas](https://api-ninjas.com/)
   - Open `src/features/exercises/exerciseApi.ts`
   - Replace `YOUR_API_KEY_HERE` with your actual key
   - See [API_CONFIG.md](./API_CONFIG.md) for detailed instructions

4. **Start the app**
   ```bash
   npm start
   ```

5. **Run on device/emulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app

---

## 🎮 Demo Credentials

**Login with:**
- Username: `emilys`
- Password: `emilyspass`

*Or create your own account using the Register screen*

---

## 📁 Project Structure

```
Zustain/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Custom button component
│   │   ├── Input.tsx        # Form input with validation display
│   │   ├── ExerciseCard.tsx # Exercise display card
│   │   ├── Loading.tsx      # Loading indicator
│   │   └── ErrorView.tsx    # Error state component
│   │
│   ├── features/            # Feature-based modules
│   │   ├── auth/           # Authentication feature
│   │   │   ├── authSlice.ts       # Redux slice for auth state
│   │   │   ├── authService.ts     # API calls for auth
│   │   │   └── authStorage.ts     # Secure token storage
│   │   ├── exercises/      # Exercise feature
│   │   │   └── exerciseApi.ts     # RTK Query API for exercises
│   │   ├── favorites/      # Favorites feature
│   │   │   └── favoritesSlice.ts  # Redux slice for favorites
│   │   └── water/          # Water tracking feature
│   │       └── waterSlice.ts      # Redux slice for water intake
│   │
│   ├── data/              # Static data and content
│   │   └── wellnessTips.ts   # Wellness tips database
│   │
│   ├── navigation/         # Navigation configuration
│   │   ├── AuthNavigator.tsx      # Auth stack navigator
│   │   ├── MainTabNavigator.tsx   # Bottom tab navigator
│   │   └── RootNavigator.tsx      # Root navigation with auth check
│   │
│   ├── screens/           # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ExerciseDetailsScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── store/            # Redux store configuration
│   │   ├── index.ts      # Store setup with persistence
│   │   └── hooks.ts      # Typed Redux hooks
│   │
│   ├── theme/           # Theme configuration
│   │   ├── colors.ts    # Light/dark color schemes
│   │   └── ThemeContext.tsx  # Theme provider & hook
│   │
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts    # Global types and interfaces
│   │
│   └── utils/         # Utility functions
│       ├── validation.ts  # Yup validation schemas
│       └── helpers.ts     # Helper functions
│
├── App.tsx            # App entry point
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md         # This file
```

---

## 🎨 Key Features Breakdown

### 1. Authentication System
- **Login Screen:** Email/password validation with error handling
- **Register Screen:** Multi-field validation with password confirmation
- **Secure Storage:** Tokens stored using Expo SecureStore
- **Auto-login:** Persistent sessions across app restarts
- **User Profile:** Display user info in header and profile screen

### 2. Exercise Browsing
- **Categories:** Filter by muscle group (Chest, Back, Arms, Legs, Core, etc.)
- **Real-time Data:** Fetches from API Ninjas Exercise API
- **Card Layout:** Beautiful cards with exercise image, name, difficulty
- **Loading States:** Smooth loading indicators
- **Error Handling:** Graceful error messages with retry option

### 3. Exercise Details
- **Full Information:** Name, muscle group, equipment, difficulty, instructions
- **Visual Design:** Color-coded difficulty badges
- **Favorite Toggle:** Heart icon to add/remove from favorites
- **Smooth Navigation:** Slide animations between screens

### 4. Favorites Management
- **Persistent Storage:** Redux Persist saves favorites locally
- **Dedicated Screen:** Bottom tab for quick access
- **Bulk Actions:** Clear all favorites option
- **Real-time Updates:** Instant UI updates when favoriting

### 5. Dark Mode
- **Toggle Switch:** In Profile screen
- **Persistent Preference:** Remembers user choice
- **Smooth Transition:** Animated color changes
- **Complete Coverage:** All screens support dark mode

### 6. Water Intake Tracking (Bonus)
- **Daily Goal:** Track progress towards 2000ml daily goal
- **Quick Add:** One-tap buttons for glass (250ml) or bottle (500ml)
- **Progress Bar:** Visual representation of daily water consumption
- **Glass Counter:** Shows glasses consumed out of daily target
- **Undo Function:** Remove last water entry if added by mistake
- **Auto Reset:** Automatically resets each day
- **Persistent Data:** Water intake saved and survives app restart

### 7. Wellness Tips (Bonus)
- **Tip of the Day:** Rotating daily wellness advice based on date
- **Categories:** Fitness, nutrition, mental health, hydration, and sleep tips
- **12 Curated Tips:** Expert advice for healthy living
- **Beautiful Card:** Prominent display on home screen with icon
- **Color-coded:** Matches app's primary theme color

---

## 🔑 Key Design Decisions

### Architecture
- **Feature-based structure** for better scalability
- **Redux Toolkit** for simplified state management
- **RTK Query** for automatic caching and loading states
- **TypeScript** for type safety and better DX

### State Management
- **Global State:** User auth, favorites
- **Local State:** Form inputs, UI toggles
- **Persisted State:** Auth tokens, favorites, theme preference
- **API Cache:** RTK Query handles caching automatically

### Security
- **Expo SecureStore** for sensitive data (tokens)
- **AsyncStorage** for non-sensitive data (preferences)
- **Input Validation** at both client and schema level
- **Error Boundaries** to prevent crashes

---

## � Screenshots

### Authentication Screens
- Login Screen: Clean form with validation
- Register Screen: Multi-step validation with visual feedback

### Main App Screens
- Home Screen: Exercise categories and dynamic list
- Exercise Details: Full exercise information with favorite toggle
- Favorites Screen: User's saved exercises
- Profile Screen: User info, stats, dark mode toggle

---

## � Demo Video

A 2-minute demo video showcasing:
1. User registration/login flow
2. Browsing exercises by category
3. Viewing exercise details
4. Adding/removing favorites
5. Dark mode toggle
6. Navigation flow
7. Data persistence demo

---

## 🧪 Testing the App

### Test Authentication
1. Open app → Register screen
2. Fill all fields with validation
3. Login with created account
4. Verify username appears in header

### Test Exercise Browsing
1. Navigate to Home screen
2. Select different categories
3. Verify exercises load from API
4. Check loading states

### Test Details & Favorites
1. Tap any exercise card
2. View full details
3. Tap heart icon to favorite
4. Navigate to Favorites tab
5. Verify exercise appears

### Test Persistence
1. Add exercises to favorites
2. Toggle dark mode on
3. Close the app completely
4. Reopen the app
5. Verify favorites and theme persist

---

## 🐛 Troubleshooting

**Exercises not loading?**
- Check API key in `src/features/exercises/exerciseApi.ts`
- Verify internet connection
- See [API_CONFIG.md](./API_CONFIG.md)

**Login not working?**
- Use demo credentials: `emilys` / `emilyspass`
- Check network connection
- Try creating a new account

**App crashes on startup?**
- Clear cache: `npm start -- --clear`
- Reinstall: `rm -rf node_modules && npm install`

---

## 📝 Git Commits (Feature-based)

✅ feat: initial project setup with TypeScript and Expo  
✅ feat: add Redux store and RTK Query configuration  
✅ feat: implement theme system with dark mode  
✅ feat: add authentication screens and validation  
✅ feat: create navigation structure  
✅ feat: implement exercise API integration  
✅ feat: add favorites functionality with persistence  
✅ feat: create reusable UI components  
✅ feat: implement profile and settings  
✅ style: add responsive design and polish UI

---

## � API Documentation

### DummyJSON (Authentication)
- **Base URL:** `https://dummyjson.com`
- **Endpoints:**
  - POST `/auth/login` - User login
  - GET `/auth/me` - Get current user
- **Docs:** https://dummyjson.com/docs/auth

### API Ninjas (Exercises)
- **Base URL:** `https://api.api-ninjas.com/v1/`
- **Endpoints:**
  - GET `/exercises?muscle={muscle}` - Get exercises by muscle group
  - GET `/exercises?difficulty={level}` - Filter by difficulty
- **Docs:** https://api-ninjas.com/api/exercises

---

## 📄 License

This project is created for educational purposes as part of the IN3210 Mobile Applications Development course assignment.

---

## 👨‍💻 Author

**Assignment Submission for IN3210**  
**Domain:** Health & Wellness (Index Last Digit: 6)  
**Framework:** React Native with Expo  
**Submission Date:** November 23, 2025

---

## ✨ Highlights

✅ All assignment requirements met  
✅ Bonus feature implemented (Dark Mode)  
✅ Industry-standard code quality  
✅ Type-safe TypeScript codebase  
✅ Comprehensive error handling  
✅ Responsive design  
✅ Clean, maintainable architecture  
✅ Feature-based Git commits  
✅ Complete documentation

---

**Built with ❤️ for Health & Wellness**
