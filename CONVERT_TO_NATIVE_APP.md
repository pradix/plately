# 📱 Plately: Web App → Native Mobile App

## Overzicht

Plately is momenteel een **web app** (draait in browser). Dit document beschrijft hoe je er een echte native **iOS & Android app** van maakt.

---

## 🎯 Opties Vergeleken

### Option 1: PWA (Progressive Web App) ⭐ EENVOUDIG
```
Wat: Jouw web app in app store "wrapper"
Voordeel:
  ✅ Snelste om uit te rollen (1-2 weken)
  ✅ Enkel codebase (geen duplicatie)
  ✅ Altijd up-to-date voor gebruikers
  ✅ Goedkoop
  
Nadeel:
  ❌ Minder native features
  ❌ Performance iets lager
  ❌ iOS beperkt (Safari engines)
  
Geschikt voor: MVP, snelle launch
```

### Option 2: React Native ⭐⭐ BEST
```
Wat: JavaScript → iOS + Android native
Voordeel:
  ✅ Code reusability (70% web code)
  ✅ Native performance
  ✅ Veel libraries beschikbaar
  ✅ Groot community
  ✅ Snelle development
  
Nadeel:
  ⚠️ 4-8 weken development
  ⚠️ Twee platforms onderhouden
  ⚠️ Sommige features moeten native
  
Geschikt voor: Lange termijn, serious app
```

### Option 3: Flutter ⭐⭐⭐ FUTURE-PROOF
```
Wat: Dart → iOS + Android native
Voordeel:
  ✅ Snelste performance
  ✅ Geweldige UI uit box
  ✅ Google-backed (long term)
  ✅ Beste user experience
  
Nadeel:
  ⚠️ Compleet herschrijven (8-12 weken)
  ⚠️ Kleiner community dan React Native
  ⚠️ Meer learning curve
  
Geschikt voor: Premium experience, groeiende app
```

### Option 4: Capacitor ⭐⭐ HYBRID
```
Wat: Web app → Native shells (Ionic)
Voordeel:
  ✅ Web code draait in native wrapper
  ✅ Native device access (camera, storage)
  ✅ Minder rewriting dan React Native
  
Nadeel:
  ❌ Performance tussen web & native
  ❌ Minder native look & feel
  
Geschikt voor: Snelle conversie van existing web app
```

---

## 🎯 AANBEVELING: React Native

Voor Plately raden we **React Native** aan omdat:

1. ✅ Je hebt al JavaScript/React kennis
2. ✅ Kan veel code hergebruiken (server, logica)
3. ✅ Sneller dan Flutter (kleinere team)
4. ✅ Proven framework (Facebook, Microsoft, etc.)
5. ✅ Groot ecosystem (UI libraries, tools)

---

## 📋 React Native Implementatie Plan

### Phase 1: Setup (Week 1)

```bash
# 1. Install React Native CLI
npm install -g react-native-cli
npm install -g expo-cli

# 2. Create new React Native project
npx react-native init Plately

# 3. OR use Expo (easier for beginners)
npx create-expo-app Plately

# Project structure:
Plately/
├── ios/                 # iOS native code
├── android/             # Android native code
├── src/
│   ├── screens/         # UI screens
│   ├── components/      # Reusable components
│   ├── api/             # Server calls
│   ├── hooks/           # Custom hooks
│   └── utils/           # Helpers
├── app.json            # App config
└── package.json
```

### Phase 2: Migrate Components (Week 2-3)

**Map web components → React Native:**

```javascript
// Web (HTML)
<div className="recipe-card">
  <img src={image} />
  <h2>{title}</h2>
</div>

// React Native
import { View, Image, Text } from 'react-native';

<View style={styles.recipeCard}>
  <Image source={{ uri: image }} />
  <Text style={styles.title}>{title}</Text>
</View>
```

**Reusable components to migrate:**

| Web Component | React Native | Status |
|---|---|---|
| RecipeCard | RecipeCard | ✓ Port |
| GroceryList | GroceryList | ✓ Port |
| ImportModal | ImportModal | ✓ Port |
| MealPlan | MealPlanScreen | ✓ Port |
| SearchBar | SearchBar | ✓ Port |
| IngredientInput | IngredientInput | ✓ Port |
| ChannelToggle | ChannelToggle | ✓ Port |

### Phase 3: Native Features (Week 4)

**Add device features:**

```javascript
// Camera for recipe photo
import { Camera } from 'expo-camera';

// Push notifications
import * as Notifications from 'expo-notifications';

// Local storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Haptics/vibration
import { Vibration } from 'react-native';

// Share recipe
import { Share } from 'react-native';
```

### Phase 4: Testing (Week 5)

**Test on real devices:**

```bash
# iOS (requires Mac)
cd ios
pod install
cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Or use Expo (easier)
npx expo start
# Scan QR code with Expo Go app
```

### Phase 5: Build & Submit (Week 6)

```bash
# iOS
cd ios
xcodebuild -workspace Plately.xcworkspace \
  -scheme Plately \
  -configuration Release \
  -derivedDataPath build

# Android
cd android
./gradlew bundleRelease
# Generates app-release.aab in:
# android/app/build/outputs/bundle/release/
```

---

## 🛠️ Tech Stack Recommendation

```javascript
// Core
"react-native": "0.72.0",
"react-navigation": "^6.0",
"expo": "~49.0.0",

// UI Components
"react-native-paper": "^5.0",
"react-native-svg": "^13.0",
"react-native-linear-gradient": "^2.6",

// State & API
"axios": "^1.4",
"zustand": "^4.0",  // State management (lighter than Redux)

// Storage
"@react-native-async-storage/async-storage": "^1.17",
"realm": "^12.0",    // Local DB (optional, for offline)

// Device
"expo-camera": "~14.0",
"expo-file-system": "~16.0",
"expo-notifications": "~0.20",
"expo-sharing": "~12.0",

// Analytics (optional)
"firebase": "^10.0",
"sentry-react-native": "^5.0",
```

---

## 📱 Architecture

```
React Native App
├─ iOS (Built with Xcode)
├─ Android (Built with Gradle)
└─ Shared Code
   ├─ API calls (axios)
   ├─ Business logic
   ├─ State management (zustand)
   ├─ Utils & helpers
   └─ Assets (fonts, images)

Backend (Unchanged)
└─ Plately API (server.js on Render)
   ├─ /api/recipes
   ├─ /api/cookbooks
   ├─ /api/groceries
   ├─ /api/channels
   └─ /api/import
```

---

## 📝 Code Reuse Strategy

### What You CAN Reuse (70-80%)
- ✅ Business logic (recipe parsing, validation)
- ✅ API calls (axios, data fetching)
- ✅ State management (zustand store)
- ✅ Utils functions (parseIngredient, etc.)
- ✅ Constants (colors, sizes, strings)

### What Needs Rewriting (20-30%)
- ❌ UI components (HTML → React Native)
- ❌ Styling (CSS → StyleSheet)
- ❌ Navigation (web routing → React Navigation)
- ❌ Device interactions (new native features)

---

## 🎨 UI Component Mapping

### Example: Recipe Card

**Before (Web):**
```javascript
// app.js
function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <div className="recipe-meta">
        <span className="meal-pill">{recipe.mealTag}</span>
        <span className="time">{recipe.time}</span>
      </div>
      <button onClick={() => viewRecipe(recipe.id)}>
        View Recipe
      </button>
    </div>
  );
}
```

**After (React Native):**
```javascript
// screens/recipes/RecipeCard.js
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RecipeCard({ recipe }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('RecipeDetail', { id: recipe.id })}
      style={styles.container}
    >
      <Image 
        source={{ uri: recipe.image }} 
        style={styles.image}
      />
      <Text style={styles.title}>{recipe.title}</Text>
      <View style={styles.meta}>
        <Text style={styles.mealTag}>{recipe.mealTag}</Text>
        <Text style={styles.time}>{recipe.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 12,
  },
  meta: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  mealTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#dce8dc',
    borderRadius: 12,
  },
});

export default RecipeCard;
```

---

## 🔄 Migration Timeline

### Week 1: Foundation
- [ ] React Native project setup
- [ ] Navigation structure
- [ ] App shell & bottom tabs
- [ ] Basic screens layout

### Week 2-3: Core Features
- [ ] Recipe list screen
- [ ] Recipe detail screen
- [ ] Import functionality
- [ ] Grocery list screen
- [ ] Meal plan screen

### Week 4: Polish
- [ ] Styling & theming
- [ ] Animations
- [ ] Device features (camera, sharing)
- [ ] Offline support (optional)

### Week 5: Testing
- [ ] iOS testing (TestFlight)
- [ ] Android testing (beta)
- [ ] Bug fixes
- [ ] Performance optimization

### Week 6: Launch
- [ ] Final builds
- [ ] App Store submission
- [ ] Play Store submission
- [ ] Marketing launch

---

## 💰 Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| iOS Developer Account | €99 | Yearly |
| Android Developer Account | €25 | Once |
| Development Tools | FREE | - |
| Hosting (Render) | €7 | Monthly |
| **First Year Total** | **~€184** | - |
| **Yearly After** | **~€99** | - |

---

## 🚀 Implementation Strategy

### Option A: DIY (Save Money)
```
Timeline: 6-8 weeks
Cost: €184 + dev time
Skill needed: React Native knowledge
Risk: May need debugging, slower
```

### Option B: Hire Developer(s)
```
Timeline: 4-6 weeks
Cost: €184 + €3000-5000 dev
Skill needed: Project management
Risk: Finding right developer
```

### Option C: Use Agency
```
Timeline: 3-5 weeks
Cost: €184 + €8000-15000
Skill needed: Requirements definition
Risk: Higher cost, but faster
```

**Recommendation:** Start with DIY or hire 1 React Native developer

---

## ✅ Pre-Migration Checklist

Before starting conversion:

- [ ] API is stable and documented
- [ ] Web app feature-complete
- [ ] No major web changes planned
- [ ] Team has React Native experience (or willing to learn)
- [ ] Design system defined (colors, spacing, typography)
- [ ] Icons & assets prepared
- [ ] Analytics planned (Firebase)
- [ ] Error tracking setup (Sentry)

---

## 📚 Resources & Tools

### Development
- **React Native Docs:** reactnative.dev
- **Expo Docs:** expo.dev
- **React Navigation:** reactnavigation.org

### UI Components
- **React Native Paper:** callstack.github.io/react-native-paper
- **Native Base:** nativebase.io
- **UI Kitten:** akveo.github.io/react-native-ui-kitten

### Tools
- **Xcode** (iOS) - xcode.apple.com
- **Android Studio** - developer.android.com/studio
- **Expo Go** - Free iOS/Android testing app

### Learning
- **React Native School:** YouTube (Codeheir)
- **Fireship:** React Native tutorials
- **Pluralsight:** React Native courses

---

## 🎯 Success Metrics

**After launch, track:**

```
Performance:
- iOS launch time < 2 seconds
- Android launch time < 3 seconds
- Smooth 60 FPS scrolling
- No major crashes

User Experience:
- 4.5+ app store rating
- <2% uninstall rate
- High DAU/MAU ratio
- Positive reviews

Adoption:
- Week 1: 100-500 installs
- Month 1: 1000-5000 installs
- Month 3: 5000-20000 installs
```

---

## ⚠️ Common Pitfalls

1. **Not testing early**
   - Solution: Use Expo for quick testing

2. **Ignoring platform differences**
   - Solution: Test on real iOS & Android devices

3. **Performance issues**
   - Solution: Profile with React Native Profiler

4. **Inconsistent styling**
   - Solution: Create shared theme/constants

5. **Complex state management**
   - Solution: Use Zustand (lighter than Redux)

---

## 🔮 Post-Launch Features

### Phase 2 (Month 2-3)
- [ ] Offline mode (recipes work without internet)
- [ ] Push notifications (new recipe alerts)
- [ ] Recipe sharing (native share sheet)
- [ ] App clips (iOS quick action)

### Phase 3 (Month 4-6)
- [ ] Camera integration (take recipe photos)
- [ ] Voice input (speak ingredients)
- [ ] Apple Watch app (view recipes on wrist)
- [ ] App widgets (iOS 15+)

### Phase 4 (Month 7-12)
- [ ] AR cooking mode (step-by-step AR)
- [ ] Smart home integration (Alexa, Google Home)
- [ ] MacOS app (with Catalyst)
- [ ] Wearable sync

---

## 📞 Next Steps

1. **Decide:** PWA vs React Native vs Flutter?
2. **Learn:** Do React Native tutorial
3. **Plan:** Map components to migrate
4. **Setup:** Create React Native project
5. **Build:** Migrate components week by week
6. **Test:** TestFlight & Beta testing
7. **Launch:** App Store & Play Store

---

**Recommendation: Start React Native this week!** 🚀

---

Version: 1.0  
Date: May 6, 2026  
Status: Ready for implementation ✅
