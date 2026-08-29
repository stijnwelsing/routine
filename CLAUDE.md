# Routine

Gesloten lus voor Stijn. Meet A→B. Grijpt alleen in bij stilstand of als het lijf het tempo niet aankan. Geen habit tracker.

De oude `legacy/index.html` is het prototype. Niet uitbreiden. Het product is `app/` (Vite + vanilla TypeScript).

## Stack

- Frontend: Vite, vanilla TypeScript, geen framework
- Data: Supabase, magic link, RLS op `auth.uid()`
- Zonder env: eerlijke lokale modus, geen nep-cloud
- Fonts: Bebas Neue + DM Sans
- Taal: Nederlands, iPhone-first

## Niet in deze fase

GTM, Stripe, landing, waitlist, App Store, HealthKit, AI-coach, chatbot, Memory/Obsidian, XP/levels, 8-oefeningen-checklist, avond-duplicaat, streak-als-kern, confetti, `user_id = 'stijn'`.

## Schermen

Twee tabs: **Vandaag** en **Koers**. Identiteit alleen achter Koers → Ik.

Vandaag: Lijf (slaap, energie; optioneel), Etappe push-ups `current → milestone → B`, knoppen +1 / Done / Skip, Koers ↑/→/↓ één woord.

Skip-chips: geen tijd / geen energie / vergeten / geen zin / pijn. Skip ≠ miss.

## Data

- `profiles` (id, display_name, identity_anti, identity_new, identity_constraint)
- `vectors` (user_id, domain strength, a, b, unit reps, pace_constraint)
- `stages` (vector_id, milestone, started_on, deadline, status, stage_type Build)
- `events` (user_id, date, kind, value, skip_reason)

Seed: A=25, B=50, milestone=35. Etappe schuift niet automatisch door.

Gear down: slaap &lt; 6u of energie laag → etappe mag niet omhoog; volgende actie kleiner of herstel.
