# URL Scheme Testing Guide

## Quick Test Links

Use these links to test the URL scheme implementation:

### Test 1: Simple URL Parameter
```
https://plately.app/?importUrl=https://www.ah.nl/allerhande/recepten/macaroni
```

### Test 2: URL-Encoded Parameter
```
https://plately.app/?importUrl=https%3A%2F%2Fwww.lekkerensimp.com%2Fmacaroni-met-spekjes-en-tomatensaus%2F
```

### Test 3: Multiple Parameters (with note)
```
https://plately.app/?importUrl=https://www.ah.nl/allerhande/recepten/pizza&note=Extra-kaas
```

## Testing Steps

1. **Copy test link** from above
2. **Paste in browser address bar**
3. **Expected behavior**:
   - App should open
   - Import automatically starts
   - Loading indicator shows: "Importeren..."
   - URL parameter should be removed from address bar
   - Recipe review screen appears with imported recipe
   - Toast confirms: "[Recipe title] klaar om na te lopen"

## Verify in Browser Console

Open DevTools (F12) and check console for:

```javascript
// This should run without errors:
const params = new URLSearchParams(window.location.search);
console.log(params.get('importUrl')); // Should show the URL
```

## Test iOS Share Shortcut

### Simulate Shortcut:
1. Open any website
2. Copy the URL
3. Open Plately settings (profile icon)
4. Scroll to "Over deze App" section
5. Tap "iOS-instelling bekijken"
6. Follow instructions to create Siri Shortcut

### Verify Shortcut:
- Go to Shortcuts app
- Your shortcut should appear
- Test by tapping the shortcut from any webpage

## Expected Flow

```
Safari (or TikTok/Instagram)
    ↓
Share Button
    ↓
Plately Shortcut
    ↓
App opens with: https://plately.app/?importUrl=<url>
    ↓
handleUrlSchemeImport() detects parameter
    ↓
URL parameter cleared from address bar immediately
    ↓
switchView('import') called
    ↓
submitImport() called AUTOMATICALLY 🚀
    ↓
Loading indicator: "Importeren..."
    ↓
Recipe is fetched and processed
    ↓
Recipe review screen appears
    ↓
Toast confirms: "[Recipe title] klaar om na te lopen"
    ↓
User can immediately review & save!
```

## Debugging

If URL scheme is not working:

### Check 1: Function exists
```javascript
typeof handleUrlSchemeImport === 'function' // Should be true
```

### Check 2: Parameters detected
```javascript
new URLSearchParams(window.location.search).get('importUrl') // Should show URL
```

### Check 3: Form elements exist
```javascript
console.log('recipeUrlInput:', recipeUrlInput);
console.log('recipeNoteInput:', recipeNoteInput);
```

### Check 4: View switching works
```javascript
switchView('import'); // Should switch to import view
```

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Safari | ✅ Works | Native iOS browser |
| Chrome | ✅ Works | May need PWA installed |
| Firefox | ✅ Works | May need PWA installed |
| iOS Safari | ✅ Works | Shortcut target |
| Android Chrome | ✅ Works | Works but less relevant |

## Limitations

- PWA must be installed or bookmarked on home screen
- Safari share sheet may not work with web apps on older iOS versions
- Some apps (TikTok, Instagram) may not share full URLs via share sheet
- URL parameters are limited in length by browser

## Success Indicators

✅ Import view opens automatically
✅ Loading indicator shows: "Importeren..."
✅ URL parameter removed from address bar immediately
✅ Import starts automatically (no manual click needed)
✅ Recipe is processed and displayed
✅ Toast confirmation appears: "[Recipe title] klaar om na te lopen"
✅ Review screen shows with imported recipe
✅ User can save or edit before cooking

---

**Last Updated**: 2026-05-05
