# Routine

Gesloten lus: meet beweging van A naar B. Grijpt alleen in als het stokt of als het lijf het tempo niet aankan.

Dit is **geen habit tracker**. De oude single-file pagina in `legacy/` is het prototype.

Interne naam: Routine. UI-woordmerk: **ARETAN**. Product-domein (bedoeld, niet live): **aretan.app**. Reserve: aretan.nl, aretan.eu. Geen DNS, geen custom domain, geen aretan.app-deploy. Kijk-URL van deze PR: GitHub Pages onder `/preview` (ochtendpad `legacy/` blijft). Geen tagline. Geen landing, Stripe, waitlist, HealthKit, AI-coach, Memory of paywall.

## Merk

Drie tekens uit board IMG_3780. Geen vierde, geen vlam, geen tagline.

- **WORDMARK** — header: Bebas Neue ARETAN + lijn (NOW-stip cream, tick sage). Geen icoon-A ernaast.
- **ICON** — alleen favicon 32 + apple-touch 180 (SVG+PNG). Nooit in de header.
- **MARK** — Koers-nav + statuslijn. Eind · stip · tick · eind.

Kleuren: Ink `#0C0C0C`, kaarten `#161616`, Cream `#F0ECE4`, Fog `#606060`, Sage `#3D6B5A`. Ember `#E8533A` alleen Skip en gear-down.

## App

Vite + vanilla TypeScript. **Vandaag**, **Koers**, **Voortgang**, **Profiel** (max ~4 tabs). Geen aparte Ik-route, geen AI.

- **Vandaag** — Lijf (slaap, energie, gewicht, opstaan; optioneel). Gewicht in kg (`body_weight`), opstaan-tijd als clock (`body_wake`, voedt relative wake / cafeïne 90 min). Geen blokkade van de dag. Geen bloed/urine/foto’s, geen health score, geen wearables. Items uit tenant-inrichting. Alleen wat vandaag moet. +1 alleen bij een huidige. Rest Done/Skip. Low carb is een dag-tag (voorkeur), geen Done/Skip. Cafeïne en scherm uit 22:00 zijn stille regels, geen Done/Skip. **Korte rust** is een actie met tijdvenster (08:00–22:00) en conditie (alleen na slaap of energie). Geen extra tekst op de lijst; venster en conditie staan in detail. Tik cafeïne, wandelen, Low carb, scherm uit, korte rust, vitamine D of koud douchen voor bron-tag in detail (`public-framework` / `evidence-informed` / `user preference` / `guideline` / `hypothesis`). Tags niet op de Today-lijst. Koers in één woord.
- **Koers** — thema’s, weekoverzicht (hits/misses), A, B, nu, etappe, venster, trend, rem, volgende actie. **Ik** is een blok op Koers, niet op Vandaag of Profiel.
- **Voortgang** — dezelfde week-strip, een lijn van de huidige, hits, rustige kg-reeks van `body_weight`. Leeg mag. Geen health score, geen BMI, geen doelgewicht, geen streak-als-core, geen confetti.
- **Profiel** — doelen, leeftijdsband, thema’s, Later (Nu/Later) en eigen item (toevoegen, wijzigen, weg) zonder wipe. Seed-suggestie gaat naar Later, niet hard-delete. Events blijven. Ik-velden blijven op Koers.

Knoppen (lock 29 aug 2026):

- **+1** = set gedaan, huidige mag omhoog
- **Done** = set gedaan op het werkgetal, huidige blijft
- Na +1/Done: korte rustige bevestiging op de kaart. Sage alleen ná Done. Ember blijft Skip/miss. Geen health score, geen badges, geen confetti
- **Ongedaan** = laatste +1 / Done / Genomen / Skip van dat item vandaag weg. Andere dagen, andere items en Lijf blijven. Geen straf, geen ember
- Geen van beide schuift de etappe
- Milestone: gebruiker kiest, nooit auto-advance
- **Skip** = chip, geen miss
- **Miss** = dag die dichtging zonder +1 / Done / Skip op een actie-item. Korte reden (zelfde chips als Skip). Geen straf-UI. Verse dag (0 events) is geen miss en geen stokt
- **Week** = mini-overzicht op Koers en Voortgang: hits / overgeslagen / niet gedaan. Geen health score, geen streak-als-core, geen confetti
- **Stok** = miss. Niet de startstaat van vandaag
- Gear-down (slaap &lt; 6u of energie laag) blokkeert etappe-omhoog, is geen stop
- Eén set per dag

Seed lock 29 aug 2026: **A (start / huidige) = 40**, **etappe = 45**, **B = 50**. Eén set, niet verspreid. Unit = reps. 35 is fout (al voorbij). Vandaag toont `40 → 45 → 50`.

Items zijn tenant-inrichting, geen hardcoded Home. Types: dagelijks / wekelijks / leefregel. Geen catalogus. Wekelijks alleen op gezette dagen — dagen niet verzinnen. +1 alleen bij een item met huidige. Ember alleen Skip, gear-down, echte miss. Startstaat rustig.

Ik-blok (alleen Koers, leeg mag, geen seed-tekst):

- Leven dat ik weiger (`identity_anti`, max 280)
- Wie ik word (`identity_new`, max 140)
- Wat B niet mag schenden (`identity_constraint`, max 140)
- 1-jaars B (`horizon_1y`, max 140)

Koppeling, geen theater: nieuwe etappe/B waarschuwt als er een constraint staat, geen blokkade. WON'T-skip = chip `geen zin`; herhaald toont `identity_new` als die is ingevuld. Horizon leeg + etappes roteren: één regel om een 1-jaars B te zetten. Herijk blijft uit.

## Starten

```bash
cd app
npm install
npm test
npm run build    # statische preview in dist/, geen .env nodig
npm run preview  # of npm run dev
```

Zonder `.env` opent **Vandaag** meteen (seed 40→45→50, lokaal). Geen loginmuur. Auth/RLS blijft in `supabase/migrations/` voor later.

## Supabase

Multi-tenant vanaf dag 1. Functies in de app; inrichting (A/B/etappe, identity, vector, constraints) en alle rijen per tenant. Geen tenantnaam in schema of productcode.

1. Nieuw project. Niet een bestaand project hergebruiken.
2. Authentication → URL configuration (niets registreren of deployen):
   - Site URL lokaal: `http://localhost:5173`
   - Bedoelde product-URL later: `https://aretan.app` (reserve: aretan.nl, aretan.eu)
   - Redirect URLs: dezelfde origins. Geen aretan.app.
3. Authentication → Providers → Email: password én magic link aan.
4. SQL: alle bestanden in `supabase/migrations/` in de SQL editor (core → horizon → multi_tenant → test_tenants), of:

   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```

5. Kopieer Project URL + anon/publishable key naar `app/.env.local`:

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=...
   ```

6. Restart `npm run dev`. Log in met wachtwoord (test) of magic link. RLS: alleen rijen van de tenant waar `auth.uid()` lid van is. `ensure_own_tenant()` maakt alleen een tenant als je nog geen lid bent — de twee TEST-logins hieronder worden niet weggegooid.

Tabellen: `tenants`, `tenant_members`, `profiles`, `vectors`, `stages`, `events`. Geen `memory_notes`. Geen Stripe, GTM, waitlist. Experiments wachten.

### TEST-logins (reset mag tot ze echte tenant 1 / 2 worden)

Staat in `supabase/migrations/20260829150000_test_tenants.sql`. Niet in de client. Niet mailen. Alleen om isolatie te testen.

| Login | Later | E-mail | Wachtwoord | Inrichting |
|-------|-------|--------|------------|------------|
| A | tenant 1 | `test-a@example.test` | `TEST-a-routine-lock` | push-ups 40→45→50; squat 30; plank 60s; hang 45s; etappe/B leeg; wekelijks 2× zonder dagen; leefregels |
| B | tenant 2 | `test-b@example.test` | `TEST-b-routine-lock` | eigen leeg (niet 40/45/50) |

Authentication → Providers → Email: password én magic link aan. B mag tenant 1 niet zien (RLS). Geen namen in de UI.

## Export en import

Op Koers en Profiel: **Exporteer JSON** (v6-snapshot: profiel/doelen/thema’s + items + vector + etappe + events inclusief `body_weight` en `body_wake`). Read-only.

Daarnaast **Importeer JSON** (bestand kiezen of plakken). Merge in `routine_loop_v6`: nieuwe labels en event-ids erbij, bestaande ids/events blijven. Ongeldig bestand = fout, geen reset. Geen wipe.

## Preview, geen product-live

Kijk-URL (deze PR, geen login): **https://stijnwelsing.github.io/routine/preview/**

GitHub Pages serveert die map onder `/preview`. Root `index.html` blijft een doorverwijzing naar `legacy/` — het ochtendpad wordt niet overschreven. Geen DNS, geen aretan.app.

Lokaal: `cd app && npm run build` → `app/dist`. Voor de hosted map: `npm run build:pages` (base `/routine/preview/`, output `preview/`).
