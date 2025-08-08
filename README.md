# Event Manager

A modern React Native mobile application for managing and organizing events with Firebase.

## 🚀 Features

- **User Authentication**: Secure login and registration with Firebase Auth
- **Event Management**: Create, edit, and delete events
- **Favorites System**: Save and manage your favorite events


## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and build tools
- **Firebase** - Backend as a Service (Authentication & Firestore)
- **React Navigation** - Navigation library
- **Material Icons** - Icon library

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/figorgarcia/event_manager
   cd event_manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   The project uses environment variables for Firebase configuration. Follow these steps:
   
   a. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
   
   b. Edit the `.env` file with your Firebase configuration:
   ```env
   FIREBASE_API_KEY=your_api_key_here
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

4. **Firebase Setup**
   
   To get your Firebase configuration:
   
   a. Go to [Firebase Console](https://console.firebase.google.com/)
   b. Create a new project or select an existing one
   c. Add a new app (Web app)
   d. Copy the configuration values to your `.env` file
   e. Enable Authentication (Email/Password)
   f. Create a Firestore database

## 🚀 Running the App

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator or `a` for Android emulator

## 📁 Project Structure

```
event_manager/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── EmptyState/     # Empty state component
│   │   ├── EventCard/      # Event display card
│   │   ├── LoadingState/   # Loading indicator
│   │   └── LogoutButton/   # Logout functionality
│   ├── configs/            # Configuration files
│   │   └── firebase.js     # Firebase configuration
│   ├── navigation/         # Navigation setup
│   │   ├── StackNavigation.js
│   │   └── TabNavigation.js
│   ├── pages/              # Screen components
│   │   ├── login/          # Authentication screens
│   │   ├── dashboard/      # Main events list
│   │   ├── favorites/      # Favorite events
│   │   ├── addEvent/       # Create new event
│   │   └── editEvent/      # Edit existing event
│   └── services/           # Business logic
│       ├── authService.js  # Authentication service
│       └── eventService.js # Event management service
├── assets/                 # Images and static files
├── .env                    # Environment variables (not in git)
├── .env.example           # Environment template
└── babel.config.js        # Babel configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request