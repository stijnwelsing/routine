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

Seed lock 29 aug 2026: **A (start / huidige) = 40**, **etappe = 45**, **B = 50**. Eén set, niet verspreid. Unit = reps. 35 is fout (al voorbij). Vandaag toont `40 → 45 → 50`.

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

Multi-tenant vanaf dag 1. Functies in de app; inrichting (A/B/etappe, identity, vector, constraints) en alle rijen per tenant. Geen tenantnaam in schema of productcode.

1. Nieuw project. Niet een bestaand project hergebruiken.
2. Authentication → URL configuration:
   - Site URL: je app-URL (`http://localhost:5173` lokaal).
   - Redirect URLs: dezelfde origin, plus later GitHub Pages als die de ochtendroute wordt.
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
| A | tenant 1 | `test-a@example.test` | `TEST-a-routine-lock` | 40 → 45 → 50, één set |
| B | tenant 2 | `test-b@example.test` | `TEST-b-routine-lock` | eigen leeg (niet 40/45/50) |

Authentication → Providers → Email: password én magic link aan. B mag tenant 1 niet zien (RLS). Geen namen in de UI.

## Export

Op Koers: **Exporteer JSON** (profiel + vector + etappe + log).

## GitHub Pages

Root `index.html` stuurt door naar `legacy/index.html` zodat de oude ochtendroute blijft werken. De nieuwe app build je met `npm run build` in `app/` (`app/dist`). Die wordt pas de ochtendroute als jij dat zo zet.
