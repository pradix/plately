# iOS Share Integration Guide

## Overview

Plately now supports importing recipes directly from the iOS share sheet. This allows users to quickly import recipes from Safari, TikTok, Instagram, and other apps using a custom Siri Shortcut.

## How It Works

### Technical Architecture

1. **URL Scheme Handling**: When a user invokes the share shortcut, it opens Plately with a special URL parameter:
   ```
   https://plately.app/?importUrl=<encoded-url>
   ```

2. **Auto-Population**: The app detects the `importUrl` parameter and automatically:
   - Switches to the import view
   - Populates the recipe URL input field
   - Clears the URL parameter from the address bar (for privacy)

3. **User Flow**:
   - User sees a recipe in Safari/TikTok/Instagram
   - User taps Share → Plately
   - Plately opens with the URL pre-filled in the import form
   - User can review and import the recipe

## Setting Up the Siri Shortcut

### Prerequisites
- iPhone running iOS 13 or later
- Shortcuts app installed (built-in on iOS 13+)
- Plately web app bookmarked or installed as PWA

### Step-by-Step Instructions

#### 1. Open the Shortcuts App
- Tap **Shortcuts** app on your home screen
- Tap **+** (Create Shortcut) to start a new shortcut

#### 2. Build the Shortcut
Add these actions in order:

**Action 1: Get Current URL**
- Search for and add: **"Ask for [URL]"**
- This will prompt the user for the URL to import

Alternatively, if you want to use the shared URL:
- Add: **"Text"** with value: `shortcutlink`
- Add: **"Run Shortcut"** 
- Or use **"Receive from Shared"** (not available in all iOS versions)

**Action 2: Create Import URL**
- Add: **"Text"** with contents:
  ```
  plately.app/?importUrl=
  ```
- Add: **"Combine Text"** (+ append)
- Drag the URL from Step 1 into the text field

**Action 3: Open in Safari**
- Add: **"Open URLs"**
- For the URL parameter, use the result from Step 2

#### 3. Save and Add to Share Sheet
- Tap **"Done"** (top right)
- Give your shortcut a name (e.g., "Add to Plately")
- Tap **"Add to Home Screen"** or **"Add to Share Sheet"**

#### 4. Configure Share Sheet
- Choose an icon and color
- Select **"Add to Share Sheet"** 
- Your shortcut will now appear in the share menu

## Alternative: Quick Setup Without Shortcut

If you don't want to create a shortcut manually, you can:

1. Manually append `?importUrl=<URL>` to the Plately link
2. Copy the entire URL and open it in Safari
3. The app will auto-populate the import form

Example:
```
https://plately.app/?importUrl=https://www.ah.nl/allerhande/recepten/...
```

## Testing the Feature

### Test Case 1: Manual URL Parameter
1. Go to a recipe website (e.g., AH.nl)
2. Copy the recipe URL
3. Navigate to: `https://plately.app/?importUrl=[paste-url]`
4. Expected: Import view opens with URL pre-filled

### Test Case 2: Shortcut Integration
1. Open any webpage with a recipe
2. Tap Share → Plately (or whatever you named it)
3. Expected: App opens with the URL pre-filled in the import form

### Test Case 3: Import Flow
1. After shortcut populates the URL
2. Tap "Recept importeren" (Import Recipe)
3. Expected: Recipe is imported and ready to review

## Supported Sources

The URL scheme works with any URL, but Plately is optimized for:
- 🇳🇱 Albert Heijn (ah.nl)
- 🍳 Lekker & Simpel
- 🧑‍🍳 Other recipe websites
- 📱 TikTok (copy link from video)
- 📸 Instagram (copy profile/post links)
- 🌐 Any webpage with a recipe

## Troubleshooting

### Shortcut Not Appearing in Share Sheet
- Close and reopen the Shortcuts app
- Make sure you selected "Add to Share Sheet" (not just "Add to Home Screen")
- iOS requires Shortcuts to be marked as a share action

### URL Not Pre-Filling
- Check that the URL parameter is properly encoded
- Some browsers might not preserve URL parameters
- Try manually copying and pasting the URL into the app

### App Doesn't Open
- Make sure Plately is installed as a PWA or bookmarked
- Check that the shortcut points to the correct URL (plately.app)
- Try opening plately.app manually first

### Recipe Not Importing After URL Pre-Fills
- This is normal! The URL is pre-filled but requires the user to review
- Tap "Recept importeren" to start the import
- You can modify the shortcut to auto-submit if desired

## Advanced: Auto-Submit Import

If you want the recipe to import automatically after the shortcut opens:

1. In your Siri Shortcut, add after opening the URL:
2. Add: **"Wait 2 seconds"** (gives the app time to load)
3. Add: **"Open App: Plately"** (to bring app to foreground)

Note: This requires the shortcut to have special permissions and may not work on all iOS versions.

## Privacy & Security

- URL parameters are cleared from the address bar after processing
- URLs are never stored or logged
- Only the import process has access to the shared URL
- Plately does not share URLs with third parties

## Future Enhancements

Potential improvements:
- [ ] Share extension app (native iOS integration)
- [ ] Direct QR code scanning for recipes
- [ ] Voice command support via Siri
- [ ] Batch import from multiple URLs
- [ ] Automatic image extraction from shared URLs

## Support

For issues with the Siri Shortcut:
1. Check the troubleshooting section above
2. Ensure you're on a supported iOS version
3. Try rebuilding the shortcut from scratch
4. Contact: pradix@me.com

---

**Last Updated**: 2026-05-05
**Tested On**: iOS 17+
**App Version**: 1.0.8+
