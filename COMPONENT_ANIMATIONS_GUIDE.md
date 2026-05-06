# 🍳 Plately Component Animations Guide

## Overview

This guide showcases animated demonstrations of Plately's key features and components. The animations illustrate how users interact with the app's core functionality.

## Interactive Demo

Open **`component-animations-demo.html`** in a web browser to see all animations in action.

---

## 📸 Component 1: Recipe Import Flow

**Animation shows:** The complete journey from pasting a recipe link to having it saved in your collection.

### Steps:
1. **Paste Instagram/TikTok/Website Link** - User inputs a recipe URL
2. **Extract Data** - Claude AI automatically extracts:
   - Recipe title & description
   - Ingredient list with quantities
   - Cooking instructions
   - Estimated cooking time
   - Meal category (Avond/Lunch)
3. **Recipe Saved** - The recipe is instantly added to your collection

### Technologies:
- Meta oEmbed API (Instagram, TikTok)
- Web scraping (HTML parsing + Claude)
- Automatic unit normalization (gr → g, etc.)

---

## 🔍 Component 2: Search & Discovery

**Animation shows:** Real-time recipe discovery with intelligent filtering.

### Features Animated:
- **Instant Search** - Type to filter recipes from your collection
- **Live Results** - Results update as you type
- **Smart Filters** - Filter by:
  - Meal type (Avond/Lunch)
  - Cooking time
  - Meal tags
  - Channels/Sources

### UX Details:
- Search bar pulses to indicate active input
- Results slide in smoothly
- Visual feedback for filtering

---

## 🥘 Component 3: Ingredient Validation

**Animation shows:** Smart ingredient parsing with automatic quality checks.

### Recently Fixed Features:
1. **Quantity Validation** ✅
   - Ensures quantities are positive numbers
   - Caps unreasonably large quantities (> 999)
   - Handles very small quantities (< 0.01)
   - Shows helpful error messages

2. **Automatic Parsing**
   - Extracts quantity, unit, and ingredient name
   - Handles common units: gr, g, ml, el, tl, stuks, etc.
   - Removes trailing punctuation: "plakjes." → "plakjes"
   - Normalizes unit names automatically

### Animation Flow:
- Each ingredient pops in with a satisfying animation
- Check mark appears when validated
- Invalid ingredients show helpful feedback

### Example Parsing:
```
Input:  "2 el suiker"
Output: { quantity: "2", unit: "el", name: "suiker" }

Input:  "250gr boter"
Output: { quantity: "250", unit: "g", name: "boter" }
```

---

## 📺 Component 4: Channel Management

**Animation shows:** Following recipe sources and managing custom channels.

### Recently Fixed: Channel Deletion ✅

**The Problem:** Delete button wasn't working due to HTML entity encoding in data attributes.

**The Fix:** 
- Removed `escapeHtml()` from data attributes
- Data attributes now use plain IDs matching state exactly
- Delete confirmation dialog appears and works properly

### Features Animated:
1. **Toggle Channels** - Turn sources on/off
2. **Add Custom Channels** - Add any website as a recipe source
3. **Channel Status** - Shows "Goedgekeurd" (Approved) or "In behandeling" (Pending)
4. **Delete with Confirmation** - Remove unwanted channels

### Channel Types:
- **Seed Channels** - Built-in sources (Instagram, TikTok, food blogs)
- **Custom Channels** - User-added website sources
- **Pending Approval** - New channels awaiting admin review

---

## 📅 Component 5: Weekly Meal Planning

**Animation shows:** Organizing recipes into a meal plan at a glance.

### Features:
- **Weekly Overview** - See your entire week's meals
- **Drag & Drop** - Add recipes to specific days
- **Auto-Shopping List** - Generate groceries from selected meals
- **Meal Types** - Lunch/Dinner organization
- **Visual Icons** - Quick recipe identification

### Interaction Flow:
1. View your saved recipes
2. Drag recipe to meal plan slot
3. Shopping list auto-updates
4. Ready for grocery shopping!

---

## 🛒 Component 6: Smart Grocery List

**Animation shows:** Interactive shopping with Albert Heijn integration.

### Recently Improved:
- **Ingredient Validation** - Quantities are checked for validity
- **Better Parsing** - Multi-line ingredient input with smart detection
- **Unit Normalization** - Consistent measurement units

### Features:
1. **Auto-Generated List** - From your meal plan
2. **Checkbox Tracking** - Mark items as purchased
3. **Albert Heijn Links** - Direct shopping links (soon)
4. **Category Organization** - Group by type
5. **Quantity Display** - How much to buy

### Example:
```
☐ Melk (1L)
☐ Eieren (12st)
☐ Boter (250g)
☑ Bloem (500g)
```

---

## 🎨 UI/UX Improvements (Latest Updates)

### Logo Sizing
- **Home Screen:** 76px with 40px circle
- **Recipe Detail:** Reduced to 48px for subtler presence
- **Review Screen:** 56px without background circle

### Meal Tags
- **Styling:** Reduced from 0.88rem to 0.7rem
- **Padding:** More compact (4px 8px vs 8px 13px)
- **Appearance:** Cleaner, less prominent

### View Persistence
- **Session Storage:** Remembers your current view
- **Detail Mode:** Restores the recipe you were viewing
- **Page Refresh:** Stays on same page (not jumping to home)

### Authentication Flow
- **First Load:** Shows login screen immediately (no race conditions)
- **Session Check:** Verified before rendering UI
- **Fallback:** Guest mode if not logged in

---

## 📊 Component Architecture

```
Plately App
├── 🏠 Home Screen
│   ├── Recipe List
│   ├── Search & Filter
│   └── Quick Actions
├── 📖 Recipe Detail
│   ├── Image & Title
│   ├── Ingredients (with validation)
│   ├── Instructions
│   └── Meal Planning
├── 📸 Import Screen
│   ├── URL Input
│   ├── Preview
│   └── Review/Edit
├── 📅 Meal Plan
│   ├── Weekly Grid
│   ├── Drag & Drop
│   └── Quick Add
├── 🛒 Grocery List
│   ├── Checklist
│   ├── Quantity Tracking
│   └── Shopping Links
└── ⚙️ Settings
    ├── Channel Management
    ├── Preferences
    └── Account
```

---

## 🚀 Animation Specifications

### Performance
- **Smooth 60fps** - All animations run at native device frame rate
- **GPU Accelerated** - Uses CSS transforms and will-change
- **Battery Friendly** - Respects prefers-reduced-motion

### Timing
- **Quick Feedback** - < 300ms for user interactions
- **Micro-interactions** - 200-400ms for transitions
- **Longer Sequences** - 2-3 seconds for complex flows

### Accessibility
- **Keyboard Navigation** - All interactive elements accessible
- **Screen Readers** - Proper ARIA labels and semantic HTML
- **Color Contrast** - WCAG AA compliant throughout

---

## 🔄 Animation Library

All animations use:
- **CSS Animations** - For performance (no JavaScript overhead)
- **Keyframes** - Smooth, predictable motion
- **Easing Functions** - Natural acceleration/deceleration
- **Staggered Timing** - Visual hierarchy through timing

### Common Easing:
- **ease-in-out** - Standard transitions
- **cubic-bezier(0.34, 1.56, 0.64, 1)** - Bouncy pop-in effect
- **ease** - Default smooth motion

---

## 📱 Responsive Design

All component animations work seamlessly on:
- **Desktop** - Full-width interactions
- **Tablet** - Touch-optimized (44px minimum tap targets)
- **Mobile** - Vertical layouts with scrolling

---

## 🎬 Video Generation Tips

To capture these animations as GIFs/videos:

### Option 1: Screen Recording
```bash
# macOS
⌘ Shift 5 → Record Selected Portion

# Windows
Win + Shift + S → Snip & Sketch
```

### Option 2: GIF Conversion
```bash
# Convert video to GIF using ffmpeg
ffmpeg -i animation.mp4 -vf "fps=10" animation.gif
```

### Option 3: Built-in Tools
- Chrome DevTools → Record Performance
- Firefox Developer Tools → Capture Screenshot
- ScreenFlow (macOS), Camtasia, OBS (all platforms)

---

## 📚 Related Documentation

- **Ingredient Parsing:** See `parseIngredientInput()` in app.js (line 1510)
- **Channel Management:** See channel event handlers in app.js (line 6551)
- **View Persistence:** See `switchView()` in app.js (line 1426)
- **Authentication:** See `bootstrapSession()` in app.js (line 4800)

---

## 🐛 Known Fixes in Latest Versions

### Fixed ✅
- [x] Ingredient quantity validation with error messages
- [x] Channel deletion not working (data attribute encoding issue)
- [x] Recipe logo too prominent on detail pages
- [x] View not persisting on page refresh
- [x] Login screen not showing for unauthenticated users
- [x] Ingredient parsing creating "plakjes.s" instead of "plakjes"

### In Progress 🔄
- [ ] Instagram OAuth Phase 2 (user-level tokens)
- [ ] Advanced recipe recommendations
- [ ] Meal plan sharing & collaboration

---

## 🎯 Next Steps

To see these animations in action:

1. **Open the demo file:**
   ```bash
   open component-animations-demo.html
   ```

2. **Record animations you want to share:**
   - Use your screen recording tool
   - Capture 5-10 second clips of each component
   - Save as MP4 or GIF

3. **Share with stakeholders:**
   - Embed in documentation
   - Use in presentations
   - Send to designers for feedback

---

**Created:** May 6, 2026  
**Updated:** Latest with all recent fixes  
**Version:** 3.0.0  
**Status:** Production Ready ✅
