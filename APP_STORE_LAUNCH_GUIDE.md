# 🚀 Plately App Store Launch Guide

## Overzicht

Dit document beschrijft hoe je Plately beschikbaar maakt in de Apple App Store en Google Play Store.

---

## 📋 Pre-Launch Checklist

### 1. **App Voorbereiding**

- [ ] App versie gereed (momenteel v3.0.0)
- [ ] Alle kritieke bugs opgelost
- [ ] Performance geoptimaliseerd
- [ ] Privacy policy geschreven
- [ ] Terms of Service opgesteld
- [ ] App icoon ontworpen (1024x1024px)
- [ ] Screenshots gegenereerd (voor beide platforms)
- [ ] Beschrijving geschreven
- [ ] Keywords/tags bepaald

### 2. **Developer Accounts Aanmaken**

- [ ] **Apple Developer Program**
  - Kosten: €99/jaar
  - Website: developer.apple.com
  
- [ ] **Google Play Developer**
  - Kosten: €25 (eenmalig)
  - Website: play.google.com/console

### 3. **Assets & Marketing Materials**

#### Screenshots (minstens 3-5 per platform)
- Startscherm (Home)
- Recipe Import flow
- Boodschappenlijst
- Meal Planning
- Settings/Channels

#### App Icon
```
iOS:
- 1024x1024px (minimum)
- PNG format
- No transparency on white areas
- Minimaal 50% van het vak gebruiken

Android:
- 512x512px minimum
- PNG format
- Vierkant format
```

#### Beschrijving (kort & lang)
```
Short Description (max 80 karakters):
"Sla recepten op, kook ze, hou ervan"

Long Description (max 4000 karakters):
"Plately helpt je recepten van Instagram, TikTok 
en websites automatisch opslaan. Organiseer je 
recepten in kookboeken, plan je week en maak 
automatisch een boodschappenlijst bij Albert Heijn."
```

---

## 🍎 iOS App Store (Apple)

### Stap 1: Apple Developer Account

1. **Ga naar developer.apple.com**
2. **Klik "Sign up" → Apple ID aanmaken of inloggen**
3. **Betaal €99/jaar**
4. **Verify je payment method**

### Stap 2: Certificate & Provisioning

Je hebt nodig:
- **Distribution Certificate** - handteken voor app signing
- **App ID** - unieke identifier
- **Provisioning Profile** - verbinding tussen app en account

#### In Xcode (als je iOS bouwt):
```bash
# 1. Open Xcode
# 2. Ga naar Xcode → Preferences → Accounts
# 3. Voeg je Apple ID toe
# 4. Klik "Manage Certificates"
# 5. Klik "Create Distribution Certificate"
```

#### Via Developer Portal (handmatig):
1. Ga naar developer.apple.com/account
2. **Identifiers**: Registreer "com.plately.app" (Bundle ID)
3. **Certificates**: Maak Distribution Certificate
4. **Provisioning Profiles**: Maak Distribution profile

### Stap 3: App Store Connect

1. **Ga naar appstoreconnect.apple.com**
2. **Klik "My Apps" → "+" → "New App"**
3. **Vul in:**
   - Platform: iOS
   - Name: "Plately"
   - Primary Language: Dutch
   - Bundle ID: com.plately.app
   - SKU: plately-2026 (uniek ID)

### Stap 4: App Versioning & Binaries

1. **In App Store Connect → "App Information"**
   - Version: 3.0.0
   - Subtitle: "Save it. Cook it. Love it."
   - Category: Food & Drink
   - Content Rating: Mild (geen beperkingen)

2. **App Privacy**
   - Klik "App Privacy"
   - Vul privacy vragenlijst in
   - Plately verzamelt: User ID, email (optioneel), recipe data
   - Niet verzameld: Locatie, contacten, foto's

### Stap 5: App Screenshots & Description

**Voor iPhone:**
```
Bouw screenshots voor:
- 6.7" display (iPhone 15 Pro Max)
- 5.5" display (iPhone SE)

Vologrde per screenshot:
1. "Sla recepten op van Instagram, TikTok & websites"
   - Laat import screen zien
2. "Organiseer in kookboeken"
   - Laat recipe list/cookbooks zien
3. "Plan je week in één oogopslag"
   - Laat meal plan scherm zien
4. "Automatisch boodschappenlijst"
   - Laat grocery list scherm zien
5. "Bestel direct bij Albert Heijn"
   - Laat AH integratie zien
```

### Stap 6: Build & Submit

#### Voor Web App → iOS (PWA):
```bash
# Option 1: Web App (Progressive Web App)
# Je web app draait in Safari wrapper
# Kies "Web App" in App Store Connect

# Option 2: React Native / Flutter
# Bouw native iOS app
# Vereist: Xcode, Apple Developer Account
```

#### Stap voor PWA naar App Store:

1. **Web App manifest.json bijwerken**
```json
{
  "name": "Plately",
  "short_name": "Plately",
  "description": "Sla recepten op, kook ze, hou ervan",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **TestFlight (Beta Testing)**
   - Build je app in Xcode
   - Upload naar App Store Connect
   - Uitnodig 100+ testers via TestFlight
   - Verzamel feedback
   - Fix bugs

3. **Submit voor Review**
   - Klik "Submit for Review"
   - Apple review team (meestal 24-48 uur)
   - Goedkeuring of feedback

### Stap 7: Goedkeuringsrichtlijnen

**Apple let op:**
- ✅ Functionele app (geen crashes)
- ✅ Privacybeleid volledig
- ✅ Account registration not required (optioneel)
- ✅ Geen overmatige reclame
- ⚠️ Content restrictions

**Veel afgewezen redenen:**
- ❌ Crash bij starten
- ❌ Onvolledig privacybeleid
- ❌ Externe links naar betaalsystemen
- ❌ Koppelingen naar competitors

---

## 🤖 Google Play Store (Android)

### Stap 1: Google Play Developer Account

1. **Ga naar play.google.com/console**
2. **Klik "Create account"**
3. **Betaal €25 (eenmalig)**
4. **Voltooi accountgegevens**
   - Developer name: "Plately"
   - Email: info@plately.nl
   - Website: plately-19f9.onrender.com

### Stap 2: App Signing Key

```bash
# Maak keystore voor ondertekening
keytool -genkey -v -keystore plately.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias plately-key

# Bergplaats: plately.keystore
# Alias: plately-key
# Password: (lang en veilig)
```

**Bewaar deze keystore veilig!** Je hebt deze nodig voor alle toekomstige updates.

### Stap 3: App Setup in Google Play

1. **Ga naar Google Play Console**
2. **Klik "Create app"**
3. **Vul in:**
   - App name: "Plately"
   - Default language: Dutch
   - App type: Free

### Stap 4: Store Listing

**Basic info:**
- **Title:** Plately (max 50 karakters)
- **Short description:** "Sla recepten op, kook ze, hou ervan" (max 80)
- **Full description:** (max 4000)
- **Category:** Food & Drink

**Screenshots (minstens 2, max 8):**
```
Afmetingen:
- Phone: 1080x1920px
- 7" Tablet: 1200x1920px
- 10" Tablet: 1600x2560px
```

**App Icon:**
- 512x512px PNG
- No transparency
- Google Play resize automatisch

**Feature Graphic:**
- 1024x500px
- Banner bij top Play Store

### Stap 5: Content Rating

1. **Vul vragenlijst in**
   - Violence: None
   - Sexual content: None
   - Substances: None
   - Language: None
   - Parental guidance: 3+ (General Audiences)

### Stap 6: Privacy Policy

```markdown
# Privacy Policy

Plately verzamelt:
- ✓ Anoniem user ID
- ✓ E-mailadres (optioneel, voor login)
- ✓ Recepten en voorkeurendata
- ✗ Geolocatie
- ✗ Contacten
- ✗ Foto's/camera

Data storage:
- Lokaal opgeslagen op je device
- Optioneel: synchronized met server
- GDPR compliant
```

Link naar: `plately-19f9.onrender.com/privacy`

### Stap 7: Build & Upload

#### Voor Web App → Android:

```bash
# Option 1: Android PWA wrapper
# Gebruik Bubblewrap of TWA (Trusted Web Activity)

npm install -g @bubblewrap/cli

bubblewrap init \
  --manifest https://plately.app/manifest.json

bubblewrap build

# Dit geeft je: app-release.aab (Android App Bundle)
```

#### Option 2: React Native / Flutter
```bash
flutter build appbundle
# Geeft: build/app/outputs/bundle/release/app-release.aab
```

### Stap 8: Upload & Review

1. **Google Play Console → App releases**
2. **Klik "Create new release"**
3. **Upload app-release.aab**
4. **Vul Release notes in:**
   ```
   🎉 Plately v3.0.0

   ✨ Nieuw:
   - Ingredient quantity validation
   - Channel management verbeterd
   - Recipe import optimaliseerd

   🐛 Bug fixes:
   - Vaste recipe logo sizing
   - View persistence op refresh
   ```

5. **Review & Publish**
   - Google review (meestal 2-4 uur)
   - Dan automatisch live op Play Store

### Stap 9: Goedkeuringsrichtlijnen

**Google Play let op:**
- ✅ Functionele app
- ✅ Privacybeleid aanwezig
- ✅ Geen crashes/ANRs
- ⚠️ Content guidelines

**Veel afgewezen redenen:**
- ❌ Crash op startup
- ❌ Onvolledig privacybeleid
- ❌ Malware/SDK issues
- ❌ Misleading ads

---

## 📦 Build Process Summary

### Web → Native Conversion Opties

#### Option 1: Progressive Web App (Easiest)
```bash
# Jouw huidge app blijft web-based
# Verpak als PWA voor app stores
# Kosten: €99 (iOS) + €25 (Android)
# Tijd: 2-4 weken
# Onderhoud: Minimal
```

#### Option 2: React Native (Best)
```bash
# Bouw echte native iOS + Android app
# Hergebruik veel code
# Kosten: €99 + €25
# Tijd: 4-8 weken
# Onderhoud: Regular updates
```

#### Option 3: Flutter (Future-proof)
```bash
# Modern framework, snelle development
# Excellente performance
# Kosten: €99 + €25
# Tijd: 4-8 weken
# Onderhoud: Google-backed
```

**Aanbeveling voor Plately:** React Native (Web + App code delen)

---

## 🗓️ Timeline

### Week 1: Voorbereiding
- [ ] Assets klaar (icon, screenshots)
- [ ] Copy geschreven (description)
- [ ] Privacy policy
- [ ] Developer accounts aanmaken

### Week 2-3: iOS Voorbereiding
- [ ] TestFlight setup
- [ ] 100+ beta testers
- [ ] Feedback verzamelen
- [ ] Bugs fixen

### Week 4: Android Voorbereiding
- [ ] Build Android APK/AAB
- [ ] Screenshots Android sizes
- [ ] Content rating

### Week 5: Submit & Review
- [ ] iOS submit (2-3 dagen review)
- [ ] Android submit (1-2 uur review)
- [ ] Monitoring & updates

### Week 6+: Post-Launch
- [ ] Monitor reviews
- [ ] Update ratings
- [ ] Bug fixes
- [ ] Feature updates (volgende versie)

---

## 💰 Kosten

| Platform | Kosten | Frequentie |
|----------|--------|-----------|
| iOS Dev Account | €99 | Jaarlijks |
| Android Dev Account | €25 | Eenmalig |
| App Hosting (Render) | $7 | Maandelijks |
| **Totaal Eerste Jaar** | **€176 + €84 hosting** | - |
| **Jaarlijks daarna** | **€99 + €84 hosting** | - |

---

## 🔒 Security Checklist

Voordat je app publiceert:

- [ ] HTTPS overal (https://plately-19f9.onrender.com)
- [ ] Encryptie voor sensitive data
- [ ] No hardcoded API keys/passwords
- [ ] Rate limiting op server
- [ ] CORS properly configured
- [ ] Input validation (ingredients, channels)
- [ ] SQL injection protection
- [ ] XSS protection

---

## 📱 Post-Launch Maintenance

### Eerste Maand
- Monitor crash reports
- Read user reviews
- Fix bugs within 48 hours
- Push v3.0.1 with fixes

### Maandelijks
- Monitor analytics
- Push feature updates (v3.1, v3.2)
- Maintain server (Render)
- Database backups

### Jaarlijks
- Renew iOS Developer Account (€99)
- Update privacy policy
- Security audit
- Major feature release

---

## 🎯 Success Metrics

Track na launch:

```
Installaties:
- Week 1: 100-500 (organic)
- Month 1: 1000-5000
- Month 3: 5000-20000

Ratings:
- Target: 4.5+ stars
- Monitor reviews
- Respond to feedback

Retention:
- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- Churn rate < 5%/maand
```

---

## 📞 Support Resources

### Apple
- Developer Portal: developer.apple.com
- TestFlight Guide: developer.apple.com/testflight
- App Review Guidelines: developer.apple.com/app-store/review/guidelines

### Google
- Google Play Console: play.google.com/console
- Play Store Policies: play.google.com/about/developer-content-policy
- Android Developers: developer.android.com

### Algemeen
- App Store Optimization (ASO): keywords, ratings, reviews
- Analytics: Firebase, Sentry, custom logging
- Crash reporting: Sentry, Firebase Crashlytics

---

## 🚀 Next Steps

1. **Nu:** Assets & copy gereed maken
2. **Week 1:** Developer accounts aanmaken
3. **Week 2:** TestFlight starten (iOS)
4. **Week 3:** Beta testers uitnodigen
5. **Week 4:** Build Android APK
6. **Week 5:** Submit beide platforms
7. **Week 6:** Go live! 🎉

---

**Veel succes met Plately!** 🍳🚀

*Versie: 1.0*  
*Datum: Mei 6, 2026*  
*Status: Klaar voor implementatie*
