# Routine

Gesloten lus: meet beweging van A naar B. Grijpt alleen in als het stokt of als het lijf het tempo niet aankan.

Dit is **geen habit tracker**. De oude single-file pagina in `legacy/` is het prototype. GitHub Pages blijft die tot deze app de ochtendroute is.

Interne naam: Routine. Publiek merk later. Geen landing, Stripe, waitlist, HealthKit, AI-coach, Memory of paywall.

## App

Vite + vanilla TypeScript. Alleen **Vandaag** en **Koers**. Geen derde scherm, geen aparte Ik-route, geen AI.

- **Vandaag** — Lijf (slaap, energie; optioneel), Etappe (push-ups: current → milestone → B), +1 / Done / Skip, Koers in één woord.
- **Koers** — A, B, nu, etappe, venster, trend, hitrate, rem, volgende actie. **Ik** is een blok op Koers, niet op Vandaag.

Knoppen (lock 29 aug 2026):

- **+1** = set gedaan, huidige mag omhoog
- **Done** = set gedaan op het werkgetal, huidige blijft
- Geen van beide schuift de etappe
- Milestone: gebruiker kiest, nooit auto-advance
- **Skip** = chip, geen miss
- **Miss** = dag zonder +1 / Done / Skip
- Gear-down (slaap &lt; 6u of energie laag) blokkeert etappe-omhoog, is geen stop
- Eén set per dag

Seed: A=40, etappe=45, B=50.

Ik-blok (alleen Koers, leeg mag, geen seed-tekst):

- Leven dat ik weiger (`identity_anti`, max 280)
- Wie ik word, één zin (`identity_new`, max 140)
- Wat B niet mag schenden (`identity_constraint`, max 140)
- 1-jaars B (`horizon_1y`, max 140)

Koppeling, geen theater: nieuwe etappe/B waarschuwt als er een constraint staat, geen blokkade. WON'T-skip = chip `geen zin`; herhaald toont `identity_new` als die is ingevuld. Horizon leeg + etappes roteren: één regel om een 1-jaars B te zetten. Herijk blijft uit.

## Starten

```bash
cd app
cp ../.env.example .env.local   # of leeg laten voor lokale modus
npm install
npm test
npm run dev
```

Zonder `.env.local` is er **geen nep-Supabase**. De app zegt dat er geen project is. Je kunt lokaal doorgaan; data blijft in deze browser.

## Supabase

1. Nieuw project (niet KitchenOS/ScreenOS hergebruiken).
2. Authentication → URL configuration:
   - Site URL: je app-URL (`http://localhost:5173` lokaal).
   - Redirect URLs: dezelfde origin, plus later GitHub Pages als die de ochtendroute wordt.
3. Authentication → Providers → Email: Magic link aan.
4. SQL: plak beide bestanden in `supabase/migrations/` in de SQL editor (eerst core, dan horizon), of:

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

6. Restart `npm run dev`. Log in met magic link. RLS gebruikt `auth.uid()`. Geen hardcoded `user_id` in app-logica.

Tabellen: `profiles`, `vectors`, `stages`, `events`. Geen `memory_notes`. Experiments wachten.

## Export

Op Koers: **Exporteer JSON** (profiel + vector + etappe + log).

## GitHub Pages

Root `index.html` stuurt door naar `legacy/index.html` zodat de oude ochtendroute blijft werken. De nieuwe app build je met `npm run build` in `app/` (`app/dist`). Die wordt pas de ochtendroute als jij dat zo zet.
