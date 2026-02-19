# Oddwork Mailgenerator

AI-driven säljmailgenerator baserad på analys av 44 609 mail. Genererar personaliserade mailsekvenser optimerade per roll, bransch, region och kontaktnivå.

## Deploy till Vercel (5 min)

### Steg 1: Pusha till GitHub
```bash
cd oddwork-mailgen
git init
git add .
git commit -m "Oddwork mailgenerator v1"
```
Skapa ett repo på GitHub och pusha:
```bash
git remote add origin https://github.com/DITT-KONTO/oddwork-mailgen.git
git branch -M main
git push -u origin main
```

### Steg 2: Deploya på Vercel
1. Gå till [vercel.com/new](https://vercel.com/new)
2. Importera ditt GitHub-repo
3. Lägg till environment variable:
   - `ANTHROPIC_API_KEY` = din Anthropic API-nyckel (hämta från console.anthropic.com)
4. Klicka **Deploy**

### Steg 3: Dela med teamet
Vercel ger dig en URL typ `oddwork-mailgen.vercel.app`. Dela den med teamet. Ingen installation behövs, de öppnar bara länken.

## Köra lokalt
```bash
npm install
cp .env.example .env.local
# Fyll i din ANTHROPIC_API_KEY i .env.local
npm run dev
```
Öppna http://localhost:3000

## Arkitektur
- `app/page.js` — React-frontend med alla kontroller
- `app/api/generate/route.js` — Server-side proxy till Claude API (genererar sekvenser)
- `app/api/add-step/route.js` — Server-side proxy för att lägga till steg
- `app/lib/system-prompt.js` — Systemprompt med alla datadrivna regler

API-nyckeln exponeras aldrig till klienten.

## Datadrivna regler inbakade
Alla rekommendationer baseras på analys av Oddworks historiska maildata:
- 44 609 skickade mail
- 11 910 öppnade
- 3 212 besvarade
- Korsanalys: roll × bransch × region × approach × kontaktnivå
