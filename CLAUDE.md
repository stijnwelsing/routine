# Routine

Gesloten lus. Meet A→B. Grijpt alleen in bij stilstand of als het lijf het tempo niet aankan. Geen habit tracker.

De oude `legacy/index.html` is het prototype. Niet uitbreiden. Het product is `app/` (Vite + vanilla TypeScript).

Lock 29 aug 2026: alleen Vandaag en Koers. Ik is een blok op Koers, geen extra scherm of route. Geen 8-oefening-Home. Geen AI. Geen GTM. Niet live.

## Stack

- Frontend: Vite, vanilla TypeScript, geen framework
- Data: Supabase, magic link, RLS op `auth.uid()`
- Zonder env: eerlijke lokale modus, geen nep-cloud
- Fonts: Bebas Neue + DM Sans
- Taal: Nederlands, iPhone-first

## Niet in deze fase

GTM, Stripe, landing, waitlist, App Store, HealthKit, AI-coach, chatbot, Memory/Obsidian, XP/levels, 8-oefeningen-checklist, avond-duplicaat, streak-als-kern, confetti, hardcoded `user_id`, Koe, Human 3.0, 1 Day Protocol, 12-vragen, AI-anti-visie, Herijk, Memory-vault, gallery.

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
- WON'T-skip = `geen zin`; herhaald toont `identity_new` (geen interview)

Koers: A/B/nu/etappe/venster/trend/hitrate/rem/actie + Ik-blok.

Ik-velden (leeg mag, geen seed-tekst, geen namen in defaults):

- identity_anti — Leven dat ik weiger (280)
- identity_new — Wie ik word, één zin (140)
- identity_constraint — Wat B niet mag schenden (140)
- horizon_1y — optioneel 1-jaars B (140)

Nieuwe etappe/B: waarschuw als constraint is gezet, geen blokkade. Horizon leeg + etappes roteren: één regel voor 1-jaars B.

## Data

- `profiles` (id, display_name, identity_anti, identity_new, identity_constraint, horizon_1y)
- `vectors` (user_id, domain strength, a, b, unit reps, pace_constraint)
- `stages` (vector_id, milestone, started_on, deadline, status, stage_type Build)
- `events` (user_id, date, kind, value, skip_reason)

Seed: A=40, etappe=45, B=50. Eén set per dag. Etappe schuift niet automatisch door.

Gear down: slaap &lt; 6u of energie laag → etappe mag niet omhoog; volgende actie kleiner of herstel. Geen stop.
