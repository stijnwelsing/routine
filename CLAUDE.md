# Routine

Gesloten lus. Meet A→B. Grijpt alleen in bij stilstand of als het lijf het tempo niet aankan. Geen habit tracker.

De oude `legacy/index.html` is het prototype. Niet uitbreiden. Het product is `app/` (Vite + vanilla TypeScript).

Lock 29 aug 2026: alleen Vandaag en Koers. Geen Ik/identity-scherm. Geen 8-oefening-Home. Geen AI.

## Stack

- Frontend: Vite, vanilla TypeScript, geen framework
- Data: Supabase, magic link, RLS op `auth.uid()`
- Zonder env: eerlijke lokale modus, geen nep-cloud
- Fonts: Bebas Neue + DM Sans
- Taal: Nederlands, iPhone-first

## Niet in deze fase

GTM, Stripe, landing, waitlist, App Store, HealthKit, AI-coach, chatbot, Memory/Obsidian, XP/levels, 8-oefeningen-checklist, avond-duplicaat, streak-als-kern, confetti, hardcoded `user_id`.

## Schermen

Alleen **Vandaag** en **Koers**.

Vandaag: Lijf (slaap, energie; optioneel), Etappe push-ups `current → milestone → B`, knoppen +1 / Done / Skip, Koers ↑/→/↓ één woord.

- +1 = set gedaan, huidige mag omhoog
- Done = set op het werkgetal, huidige blijft
- Geen van beide schuift de etappe
- Milestone: gebruiker kiest, nooit auto-advance
- Skip = chip, geen miss
- Miss = dag zonder +1 / Done / Skip
- Gear-down blokkeert etappe-omhoog, is geen stop

## Data

- `profiles` (id, display_name, identity_* kolommen bestaan; geen Ik-scherm)
- `vectors` (user_id, domain strength, a, b, unit reps, pace_constraint)
- `stages` (vector_id, milestone, started_on, deadline, status, stage_type Build)
- `events` (user_id, date, kind, value, skip_reason)

Seed: A=40, etappe=45, B=50. Eén set per dag. Etappe schuift niet automatisch door.

Gear down: slaap &lt; 6u of energie laag → etappe mag niet omhoog; volgende actie kleiner of herstel. Geen stop.
