# Plately Webapp

Productieklare basis voor de eerste online versie van Plately:

- mobiele webapp
- PWA / homescreen install
- backend-import voor TikTok, Instagram en websites
- Render-ready deploy config

## Wat er nu bij zit

- `manifest.webmanifest`
- `service-worker.js`
- app icons voor homescreen / install
- `render.yaml` voor deploy op Render
- Node `PORT` support
- health endpoint: `/api/health`
- basis cache headers voor static files

## Lokaal starten

```bash
node server.js
```

Open daarna:

```text
http://localhost:3000
```

## PWA

De webapp is nu installeerbaar op telefoon en desktop:

- iPhone / iPad:
  open in Safari
  kies `Zet op beginscherm`
- Android:
  open in Chrome
  kies `Installeren`

## Environment

Kopieer `.env.example` naar `.env`.

```bash
cp .env.example .env
```

### Beschikbare variabelen

- `ANTHROPIC_API_KEY`
  verbetert parsing van titel, ingrediënten en stappen
- `META_APP_ID`
  nodig voor officiële Instagram oEmbed flow
- `META_APP_SECRET`
  nodig voor officiële Instagram oEmbed flow
- `NODE_ENV`
  optioneel, in productie meestal `production`

## Online zetten op Render

Deze repo bevat al `render.yaml`.

### Aanbevolen setup

- service type: `Web Service`
- runtime: `Node`
- build command: `npm install`
- start command: `npm start`
- health check path: `/api/health`

### Stappen

1. Zet deze code in GitHub.
2. Maak in Render een nieuw project aan vanaf die GitHub repo.
3. Render leest automatisch `render.yaml`.
4. Voeg in Render environment variables toe:
   - `ANTHROPIC_API_KEY`
   - `META_APP_ID`
   - `META_APP_SECRET`
5. Deploy.
6. Koppel daarna je custom domein, bijvoorbeeld `app.plately.nl`.

## Domeinstructuur

Aanbevolen:

- `plately.nl` voor je WordPress site
- `app.plately.nl` voor de webapp

## Wat jij moet doen voor livegang

1. GitHub repo aanmaken en deze code pushen.
2. Render account koppelen aan GitHub.
3. Web service deployen.
4. DNS record zetten voor `app.plately.nl`.
5. Environment variables invullen.
6. Testen op iPhone en Android homescreen install.

## Wat hierna stap 2 is

Voordat je echt publiek gaat lanceren adviseer ik daarna:

1. database toevoegen
2. accounts / login
3. recepten, kookboeken en lijstjes persistent opslaan
4. analytics en error logging toevoegen
5. import pipeline verder verharden
6. privacy policy en terms toevoegen

## Bekende beperkingen

- TikTok import blijft afhankelijk van publieke brondata
- Instagram import vraagt officiële Meta toegang
- directe AH / Jumbo cart flows zijn nog niet volledig partner-grade
- er is nog geen database; data leeft nu in frontend state
