# Instagram OAuth Implementation Plan (Phase 2 - Future)

## Overview

This document outlines the architecture for implementing Instagram OAuth in Plately to enable user-level authentication and access to personal Instagram content. **This is Phase 2 and is NOT implemented yet.** Phase 1 (current) improves the existing app-level oEmbed API integration.

## Current vs. Future Architecture

### Phase 1: App-Level Credentials (CURRENT)
- **Token Type:** App credentials (`META_APP_ID|META_APP_SECRET`)
- **API:** Meta oEmbed (read-only, public posts)
- **User Experience:** Paste public Instagram URL, backend fetches metadata
- **Limitations:** Only public posts, no personal account access
- **Approval:** Requires Meta app approval for oEmbed Read permission

### Phase 2: User-Level OAuth (FUTURE)
- **Token Type:** User access tokens from Meta Login
- **API:** Instagram Graph API (full access)
- **User Experience:** "Connect Instagram Account" → Login with Meta → Browse personal posts
- **Benefits:** Private content, insights, post management, better UX
- **Approval:** Requires Meta app approval for each scope

## Phase 2 Implementation Scope

### 1. Database Schema

Add new tables to store user Instagram credentials:

```sql
-- New table: plately_instagram_tokens
CREATE TABLE plately_instagram_tokens (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL UNIQUE REFERENCES plately_users(id) ON DELETE CASCADE,
  
  -- OAuth token data
  access_token TEXT NOT NULL,
  token_type TEXT DEFAULT 'bearer',
  expires_at TIMESTAMPTZ,
  refresh_token TEXT,
  
  -- Instagram user info
  instagram_user_id TEXT NOT NULL UNIQUE,
  instagram_username TEXT NOT NULL,
  instagram_display_name TEXT,
  instagram_profile_picture_url TEXT,
  
  -- Scopes granted by user
  scope TEXT DEFAULT 'instagram_basic',
  
  -- Metadata
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_refreshed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_instagram_tokens_user_id ON plately_instagram_tokens(user_id);
CREATE INDEX idx_instagram_tokens_instagram_user_id ON plately_instagram_tokens(instagram_user_id);

-- Optional: Track authorization grants for audit/security
CREATE TABLE plately_oauth_grants (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES plately_users(id),
  provider TEXT NOT NULL,
  provider_user_id TEXT NOT NULL,
  token_id TEXT REFERENCES plately_instagram_tokens(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);
```

### 2. New API Endpoints

```
GET  /oauth/instagram/authorize
  Query: state=<csrf_token>&redirect_uri=<callback_url>
  Response: Redirect to Meta Login Dialog
  
POST /oauth/instagram/callback
  Body: { code, state }
  Response: { ok: true, user: {...} } or { ok: false, error: "..." }
  
POST /oauth/instagram/refresh
  Body: { token_id? }
  Response: { ok: true, new_expires_at: ... } or { ok: false }
  
GET  /api/instagram/tokens
  Headers: Authorization: Bearer <user_token>
  Response: [ { id, username, connected_at, expires_at, ... } ]
  
DELETE /api/instagram/tokens/:token_id
  Headers: Authorization: Bearer <user_token>
  Response: { ok: true } or { ok: false }
```

### 3. OAuth Flow Diagram

```
User clicks "Connect Instagram"
         ↓
GET /oauth/instagram/authorize?state=<csrf>&redirect_uri=<callback>
         ↓
Server generates PKCE code_challenge
         ↓
Redirect to Meta Login Dialog
         ↓
User logs in with Instagram account
         ↓
User grants permissions (instagram_basic, instagram_content_publish, etc.)
         ↓
Meta redirects to callback: /oauth/instagram/callback?code=<auth_code>&state=<csrf>
         ↓
Server verifies CSRF state
         ↓
POST code + code_verifier to Meta token endpoint
         ↓
Meta returns access_token, refresh_token, expires_in
         ↓
Server stores token in plately_instagram_tokens
         ↓
User can now browse/import their Instagram posts
```

### 4. Meta API Scopes

| Scope | Purpose | Use Case |
|-------|---------|----------|
| `instagram_basic` | Read user profile, username, media list | Browse personal recipes |
| `instagram_content_publish` | Publish/manage posts | Share recipes to Instagram |
| `pages_read_engagement` | Read insights on pages | See recipe popularity |
| `pages_read_user_content` | Read page posts | Not needed for personal recipes |

**Recommendation:** Start with `instagram_basic` only. Add others later if needed.

### 5. Security Considerations

#### PKCE (Proof Key for Code Exchange)
```javascript
// Server-side
const code_verifier = generateRandomString(43);
const code_challenge = base64url(sha256(code_verifier));
// Store code_verifier in session
// Send code_challenge in authorize request

// In callback
// Verify code_challenge matches code_verifier
```

#### CSRF Protection
```javascript
// Server-side
const state = generateRandomString(32);
// Store state in session/database
// Send state in authorize request

// In callback
// Verify state matches session value
```

#### Token Rotation
```javascript
// Before using token, check if expired
if (token.expires_at < Date.now()) {
  // Refresh using refresh_token
  const new_token = await refreshInstagramToken(token.refresh_token);
  // Update database
}
```

#### Token Storage
- **DO:** Store in database encrypted (use KMS or encryption key)
- **DON'T:** Log tokens in console/logs
- **DON'T:** Send tokens to client-side JavaScript
- **DO:** Use HTTPS only for all OAuth endpoints

### 6. Implementation Steps

1. **Database Migration**
   - Run SQL to create `plately_instagram_tokens` table
   - Migrate existing Instagram imports (if any) to track origin
   
2. **OAuth Endpoints**
   - Implement `/oauth/instagram/authorize` → Redirect to Meta
   - Implement `/oauth/instagram/callback` → Exchange code for token
   - Implement `/oauth/instagram/refresh` → Refresh expiring tokens
   - Implement `/api/instagram/tokens` → List user's Instagram accounts
   - Implement `DELETE /api/instagram/tokens/:id` → Disconnect account
   
3. **Token Management**
   - Add refresh token logic to auth middleware
   - Handle token expiration gracefully
   - Log token refresh events for audit
   
4. **Updated Import Flow**
   - Modify `importInstagram()` to check for user tokens first
   - If user has Instagram token, use Graph API instead of oEmbed
   - Fall back to oEmbed for public URLs (backward compatibility)
   
5. **UI Updates**
   - Add "Connect Instagram Account" button in settings
   - Show connected accounts with username/profile picture
   - Add disconnect/reconnect options
   - Show last synced time
   
6. **Testing**
   - Test OAuth flow end-to-end
   - Test token refresh at expiration
   - Test error cases (rejected authorization, expired token, etc.)
   - Load test token refresh (high volume)

### 7. Environment Variables

```bash
# Already exist
META_APP_ID=<your_app_id>
META_APP_SECRET=<your_app_secret>

# New for Phase 2
META_OAUTH_REDIRECT_URI=https://plately-19f9.onrender.com/oauth/instagram/callback
INSTAGRAM_OAUTH_ENCRYPTION_KEY=<256-bit key for token encryption>
```

### 8. Meta App Configuration

In Meta Developer Console:
1. Go to Settings → Basic → Copy App ID and App Secret
2. Add Instagram Product to app
3. Go to Instagram → Settings → Basic
4. Set "Valid OAuth Redirect URIs" = `https://plately-19f9.onrender.com/oauth/instagram/callback`
5. Request app review for scopes:
   - `instagram_basic` (usually approved quickly)
   - `instagram_content_publish` (if publishing recipes)
   - `pages_read_engagement` (optional)

### 9. Migration Path: App-Level → User-Level

When moving from Phase 1 to Phase 2:

```javascript
// In importInstagram()
async function importInstagram(sourceUrl, note) {
  // 1. Check if user has Instagram token
  const userToken = await getUserInstagramToken(user_id);
  
  if (userToken) {
    // 2. Use Graph API with user token
    const recipe = await importInstagramWithUserToken(sourceUrl, userToken);
    if (recipe) return recipe;
  }
  
  // 3. Fall back to oEmbed (backward compatibility, public posts only)
  return importInstagramWithOEmbed(sourceUrl);
}
```

### 10. Error Handling

```javascript
// Common OAuth errors to handle
if (error.error === 'access_denied') {
  // User declined authorization
  throw "User declined Instagram access"
}

if (error.error === 'invalid_scope') {
  // Requested scope not approved
  throw "Instagram scope not yet approved by Meta"
}

if (error.error_code === 190) {
  // Token expired or invalid
  // Try to refresh
}

if (error.error_code === 100) {
  // Invalid parameter
  throw "Instagram API error: " + error.error_description
}
```

## Testing Checklist (Phase 2)

- [ ] User can click "Connect Instagram Account"
- [ ] User is redirected to Meta Login
- [ ] User can authorize with their Instagram account
- [ ] User is redirected back to Plately
- [ ] User's Instagram token is stored securely
- [ ] User can see connected Instagram account in settings
- [ ] User can disconnect their Instagram account
- [ ] Token refresh works when token expires
- [ ] Import uses Graph API when user has token
- [ ] Import falls back to oEmbed for public URLs
- [ ] Error messages are clear (token expired, no access, etc.)
- [ ] Multiple Instagram accounts can be connected
- [ ] Deleting user account also deletes Instagram tokens

## Notes

- **Phase 1 (Current):** Uses app-level credentials, only public posts
- **Phase 2 (Future):** User-level OAuth, personal content access
- **Backward Compatibility:** Phase 2 falls back to Phase 1 flow
- **Timeline:** Phase 1 ships now (2026-05). Phase 2 in next sprint (estimated 2026-06)
- **Priority:** Phase 2 should be high (user demand for personal content import)
- **Approval:** Meta app review is required, plan 2-4 weeks lead time

## References

- [Meta Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [Instagram oEmbed](https://developers.facebook.com/docs/instagram-api/guides/oembed)
- [OAuth 2.0 PKCE](https://tools.ietf.org/html/rfc7636)
- [OWASP OAuth Security](https://owasp.org/www-community/attacks/oauth_2.0)
