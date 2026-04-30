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
- server-side sessie + profielopslag
- optionele Postgres accounts + login
- persistente opslag van:
  - geïmporteerde recepten
  - kookboeken
  - weekplanning
  - boodschappenlijst

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
- `DATA_DIR`
  map waar Plately server-side data wegschrijft
  lokaal kan dit `./data` zijn
  op Render adviseer ik een persistent disk mount
- `DATABASE_URL`
  schakelt echte accounts + synchronisatie tussen apparaten in via Postgres
  als deze leeg blijft, werkt Plately als guest met JSON-opslag

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
   - `DATABASE_URL`
   - `META_APP_ID`
   - `META_APP_SECRET`
   - `DATA_DIR=/opt/render/project/src/data`
5. Deploy.
6. Koppel daarna je custom domein, bijvoorbeeld `app.plately.nl`.

### Belangrijk voor live data op Render

Plately slaat gebruikersdata nu server-side op in JSON-bestanden.

Zonder extra opslag is het Render-filesysteem ephemeral.
Dat betekent dat je data kwijt kunt raken bij redeploys of restarts.

Gebruik daarom een `Persistent Disk` in Render.

Officiële docs:
[Render Persistent Disks](https://render.com/docs/disks)

Aanbevolen mount path:

```text
/opt/render/project/src/data
```

Zet daarna ook:

```text
DATA_DIR=/opt/render/project/src/data
```

## Stap 3: echte accounts met Postgres

Plately ondersteunt nu twee modi:

- `guest mode`
  zonder `DATABASE_URL`
  data blijft per browser bewaard via server-side JSON sessies
- `account mode`
  met `DATABASE_URL`
  gebruikers kunnen registreren, inloggen en hun data op meerdere apparaten terugzien

### Wat er nu synchroniseert

- profielnaam en handle
- geïmporteerde recepten
- kookboeken
- standaard kookboek
- weekplanning
- boodschappenlijst
- gekozen featured / geselecteerd recept

### Render setup voor Postgres

1. Maak in Render een `PostgreSQL` database aan.
2. Kopieer de `External Database URL`.
3. Open je bestaande Plately web service.
4. Voeg environment variable toe:
   - `DATABASE_URL=<jouw render postgres url>`
5. Redeploy de app.

Na de redeploy verschijnt op het profielscherm automatisch de accountkaart met:

- `Account maken`
- `Inloggen`
- `Uitloggen`

### Belangrijke nuance

Als `DATABASE_URL` aan staat, gebruikt Plately Postgres voor ingelogde gebruikers.
Guest gebruikers blijven daarnaast gewoon werken via de bestaande JSON-opslag.

### Lokaal testen

1. Start lokaal een Postgres database.
2. Zet in `.env`:

```text
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DATABASE
```

3. Start daarna opnieuw:

```bash
npm install
node server.js
```

4. Open:

```text
http://localhost:3000
```

De auth-tabellen worden automatisch aangemaakt bij de eerste login of registratie.

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

1. wachtwoord reset / magic link toevoegen
2. analytics en error logging toevoegen
3. import pipeline verder verharden
4. privacy policy en terms toevoegen
5. later cookbooks en recepten ook relationeel modelleren

## Bekende beperkingen

- TikTok import blijft afhankelijk van publieke brondata
- Instagram import vraagt officiële Meta toegang
- directe AH / Jumbo cart flows zijn nog niet volledig partner-grade
- guest opslag gebruikt nog JSON-bestanden; voor grote schaal wil je uiteindelijk meer data volledig naar Postgres trekken
