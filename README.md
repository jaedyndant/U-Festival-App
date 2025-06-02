# ❤️U Festival PWA

A Progressive Web App for the ❤️U Festival 2026, featuring interactive maps, artist information, schedules, locker reservations, and real-time location tracking.

## 🚀 Features

### 📱 **Progressive Web App**
- **Offline Functionality**: Works without internet connection
- **Installable**: Add to home screen on mobile devices
- **Push Notifications**: Receive updates about artists and events
- **Fast Loading**: Optimized performance with service worker caching

### 🎵 **Artist Information**
- **Interactive Artist Cards**: Click to read detailed biographies
- **Embedded Videos**: Watch artist performances directly in the app
- **Side-by-side Layout**: Artist photos with descriptions
- **11 Featured Artists**: From Armin van Buuren to Spinvis

### 📅 **Festival Schedule**
- **Two-Day Schedule**: Saturday and Sunday programs
- **Four Stages**: Ponton, The Lake, The Club, and Hangar
- **Interactive Day Selector**: Switch between Saturday/Sunday
- **Color-coded Stages**: Easy visual identification
- **Detailed Time Slots**: Complete performance schedule

### 🗺️ **Interactive Map**
- **Live Location Tracking**: See your real-time position
- **Clickable Hotspots**: Tap numbered locations for stage information
- **Festival Ground Layout**: Accurate map representation
- **Location Services**: GPS integration with boundary detection

### 🔒 **Locker Reservation System**
- **Three Locker Sizes**: Small (€5), Medium (€8), Large (€12)
- **Multiple Locations**: Main Entrance, Ponton Stage, Food Court, VIP Area
- **Digital Locks**: 4-digit PIN access
- **Real-time Availability**: Live locker status updates

### 🌐 **Multilingual Support**
- **Dutch/English**: Complete bilingual interface
- **Dynamic Language Switching**: Instant content updates
- **Cultural Localization**: Proper date/time formatting

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Professional transitions and hover effects
- **Festival Branding**: Consistent color scheme and styling

## 🛠️ How to Operate the Site

### **Starting the Development Server**

1. **Python HTTP Server** (Recommended):
   ```bash
   python -m http.server 8000
   ```
   Then open: `http://localhost:8000`

2. **Alternative - Live Server Extension**:
   - Install Live Server extension in VS Code
   - Right-click `index.html` → "Open with Live Server"

### **Navigation**

#### **Header Controls**
- **📱 Install Button**: Opens PWA installation page with QR code
- **NL/EN Toggle**: Switches between Dutch and English
- **🌙 Theme Toggle**: Switches between light and dark mode

#### **Main Navigation**
- **Home**: Artist showcase with videos and descriptions
- **Info**: Festival information and practical details
- **Schedule**: Two-day program with stage schedules
- **Map**: Interactive festival map with location tracking
- **Lockers**: Locker reservation system

### **Using Key Features**

#### **Artist Information**
1. **Browse Artists**: Scroll through artist cards on Home page
2. **Read More**: Click "📖 Read More" for detailed biography
3. **Watch Videos**: Click "▶️ Watch Video" for embedded performances
4. **Navigation**: Only one content area open at a time

#### **Schedule Navigation**
1. **Select Day**: Click "Saturday" or "Sunday" tabs
2. **Browse Stages**: Scroll through four stage columns
3. **Stage Types**:
   - **Ponton**: Main stage with headliners
   - **The Lake**: Emerging talent showcase
   - **The Club**: Comedy, theater, and performances
   - **Hangar**: Continuous DJ sets

#### **Interactive Map**
1. **Location Permission**: Allow location access when prompted
2. **Find Yourself**: Green pulsing dot shows your position
3. **Explore Stages**: Tap numbered red circles (1-4) for stage info
4. **Map Controls**:
   - **🔍+/🔍−**: Zoom in/out (coming soon)
   - **📍**: Center on your location
   - **📋**: Toggle map legend
   - **🔄**: Refresh location

#### **Locker Reservation**
1. **Choose Size**: Select Small, Medium, or Large locker
2. **Pick Location**: Choose from 4 festival locations
3. **Fill Details**: Enter name, email, phone, and 4-digit PIN
4. **Confirm**: Review summary and complete reservation
5. **Access**: Use generated locker number and PIN

#### **PWA Installation**
1. **Open Install Page**: Click 📱 button in header
2. **Scan QR Code**: Use phone camera for quick access
3. **Manual Install**: Follow browser-specific instructions
4. **Benefits**: Offline access, notifications, home screen icon

### **Language Switching**
- **Toggle Button**: Click "NL" or "EN" in header
- **Auto-Update**: All content switches immediately
- **Persistent**: Language preference maintained during session

### **Theme Switching**
- **Dark Mode**: Click 🌙 button for dark theme
- **Light Mode**: Click ☀️ button for light theme
- **System Preference**: Initially matches device setting

## 📁 File Structure

```
loveu-pwa/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline functionality
├── css/
│   ├── styles.css          # Main stylesheet
│   └── images/             # Festival and artist images
├── js/
│   └── app.js             # Main JavaScript application
└── README.md              # This file
```

## 🔧 Technical Requirements

- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **HTTPS**: Required for PWA features and geolocation
- **Location Services**: Optional, for map functionality
- **Local Server**: Python 3.x for development server

## 📱 PWA Installation

### **Browser Support**
- **Android**: Chrome, Edge, Firefox, Samsung Internet
- **iOS**: Safari 14.0+ (limited PWA features)
- **Desktop**: Chrome, Edge, Firefox

### **Installation Methods**
1. **QR Code**: Scan from install page
2. **Browser Prompt**: Automatic install prompt
3. **Manual**: Browser menu → "Add to Home Screen" / "Install App"

## 🎪 Festival Information

- **Event**: ❤️U Festival 2026
- **Dates**: Saturday & Sunday
- **Location**: Strijkviertel, Utrecht, Netherlands
- **Stages**: 4 performance areas
- **Artists**: 11 featured performers
- **Facilities**: Lockers, food court, VIP area

## 🚨 Troubleshooting

### **Common Issues**

1. **Location Not Working**:
   - Check browser location permissions
   - Ensure HTTPS connection
   - Try manual refresh with 🔄 button

2. **App Not Loading**:
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache
   - Check console for errors

3. **PWA Not Installing**:
   - Use HTTPS (required for PWA)
   - Try different browser
   - Check manifest.json accessibility

4. **Language Not Switching**:
   - Hard refresh after language change
   - Check browser JavaScript settings

### **Development Tips**

1. **Local Testing**:
   - Use Python server for proper HTTPS simulation
   - Test on multiple devices/browsers
   - Validate PWA with Lighthouse

2. **Debugging**:
   - Open browser Developer Tools (F12)
   - Check Console for errors
   - Test offline functionality
   - Verify service worker registration

## 📞 Support

For technical issues or questions:
- Check browser console for error messages
- Ensure all files are properly served
- Verify PWA requirements are met
- Test with different browsers/devices

---

**Built with ❤️ for the ❤️U Festival 2026**
