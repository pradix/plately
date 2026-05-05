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
   - Import view should be shown
   - Recipe URL input should be pre-filled
   - URL parameter should be removed from address bar
   - Toast message should appear: "URL klaar om in te voeren"

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
switchView('import') called
    ↓
recipeUrlInput.value populated
    ↓
URL parameter cleared from address bar
    ↓
User sees pre-filled import form
    ↓
User taps "Recept importeren"
    ↓
Recipe imported!
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
✅ URL field is populated
✅ Placeholder shows correct platform
✅ Toast notification appears
✅ URL parameter removed from address bar
✅ User can modify URL before importing
✅ Import proceeds normally after clicking submit

---

**Last Updated**: 2026-05-05
