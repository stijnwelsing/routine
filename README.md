# Routine

Gesloten lus: meet beweging van A naar B. Grijpt alleen in als het stokt of als het lijf het tempo niet aankan.

Dit is **geen habit tracker**. De oude single-file pagina in `legacy/` is het prototype. GitHub Pages blijft die tot deze app de ochtendroute is.

Interne naam: Routine. Publiek merk later. Deze fase: alleen Stijn. Geen landing, Stripe, waitlist, HealthKit, AI-coach, Memory of paywall.

## App

Vite + vanilla TypeScript. Twee schermen.

- **Vandaag** — Lijf (slaap, energie; optioneel), Etappe (push-ups: current → milestone → B), +1 / Done / Skip, Koers in één woord.
- **Koers** — A, B, nu, etappe, venster, trend, hitrate, rem, volgende actie. Identiteit staat achter Koers → **Ik**.

Skip ≠ miss. Skip telt niet als miss voor de lokale streak. Etappe-type is Build. Milestone-hit schuift niet vanzelf door.

Seed: A=25, B=50, etappe=35.

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
4. SQL: plak `supabase/migrations/20260829120000_routine_core.sql` in de SQL editor, of:

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

6. Restart `npm run dev`. Log in met magic link. RLS gebruikt `auth.uid()`. Er staat nergens `user_id = 'stijn'` in app-logica.

Tabellen: `profiles`, `vectors`, `stages`, `events`. Geen `memory_notes`. Experiments wachten.

## Export

Op Koers: **Exporteer JSON** (profiel + vector + etappe + log).

## GitHub Pages

Root `index.html` stuurt door naar `legacy/index.html` zodat de oude ochtendroute blijft werken. De nieuwe app build je met `npm run build` in `app/` (`app/dist`). Die wordt pas de ochtendroute als jij dat zo zet.
