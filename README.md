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

Vite + vanilla TypeScript. Alleen **Vandaag** en **Koers**. Geen derde scherm, geen aparte Ik-route, geen AI.

- **Vandaag** — Lijf (slaap, energie; 5 dots). Items uit tenant-inrichting. Alleen wat vandaag moet. +1 alleen bij een huidige. Rest Done/Skip. Koers in één woord.
- **Koers** — A, B, nu, etappe, venster, trend, hitrate, rem, volgende actie. **Ik** is een blok op Koers, niet op Vandaag.

Knoppen (lock 29 aug 2026):

- **+1** = set gedaan, huidige mag omhoog
- **Done** = set gedaan op het werkgetal, huidige blijft
- Geen van beide schuift de etappe
- Milestone: gebruiker kiest, nooit auto-advance
- **Skip** = chip, geen miss
- **Miss** = dag die dichtging zonder +1 / Done / Skip. Verse dag (0 events) is geen miss en geen stokt
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
| A | tenant 1 | `test-a@example.test` | `TEST-a-routine-lock` | push-ups 40→45→50; squat/plank/hang zonder werkgetal; wekelijks 2× zonder dagen; leefregels |
| B | tenant 2 | `test-b@example.test` | `TEST-b-routine-lock` | eigen leeg (niet 40/45/50) |

Authentication → Providers → Email: password én magic link aan. B mag tenant 1 niet zien (RLS). Geen namen in de UI.

## Export

Op Koers: **Exporteer JSON** (profiel + items + etappe + log).

## Preview, geen product-live

Kijk-URL (deze PR, geen login): **https://stijnwelsing.github.io/routine/preview/**

GitHub Pages serveert die map onder `/preview`. Root `index.html` blijft een doorverwijzing naar `legacy/` — het ochtendpad wordt niet overschreven. Geen DNS, geen aretan.app.

Lokaal: `cd app && npm run build` → `app/dist`. Voor de hosted map: `npm run build:pages` (base `/routine/preview/`, output `preview/`).
