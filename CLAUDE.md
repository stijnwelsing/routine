# Routine

Gesloten lus. Meet A→B. Grijpt alleen in bij stilstand of als het lijf het tempo niet aankan. Geen habit tracker.

De oude `legacy/index.html` is het prototype. Niet uitbreiden. Het product is `app/` (Vite + vanilla TypeScript).

Lock 29 aug 2026: alleen Vandaag en Koers. Ik is een blok op Koers, geen extra scherm of route. Geen 8-oefening-Home. Geen AI. Geen GTM. Niet live. Product-domein bedoeld: aretan.app (reserve .nl / .eu). Geen DNS, geen Pages. Twee TEST-tenants in seed (README); geen namen in productcode.

## Stack

- Frontend: Vite, vanilla TypeScript, geen framework
- Data: Supabase, magic link, multi-tenant
- RLS: `auth.uid()` lidmaatschap van een tenant, geen hardcoded `user_id`
- Functies in de app (zelfde voor elke tenant). Inrichting en data per tenant in Supabase
- Zonder env: eerlijke lokale modus, geen nep-cloud
- Fonts: Bebas Neue (woordmerk/display) + DM Sans (UI). Geen Impact, geen Roboto.
- UI-woordmerk: ARETAN. Intern product: Routine. Geen tagline.
- Drie tekens (IMG_3780): WORDMARK header, ICON favicon/PWA, MARK Koers-nav. Geen vierde, geen vlam, Ember niet in het logo.
- Taal: Nederlands, iPhone-first. Copy zonder streak/grind/protocol/OS.

## Niet in deze fase

GTM, Stripe, landing, waitlist, App Store, HealthKit, AI-coach, chatbot, Memory/Obsidian, XP/levels, 8-oefeningen-checklist, avond-duplicaat, streak-als-kern, confetti, hardcoded `user_id` / tenantnaam, Koe, Human 3.0, 1 Day Protocol, 12-vragen, AI-anti-visie, Herijk, Memory-vault, gallery.

## Schermen

Alleen **Vandaag** en **Koers**.

Vandaag: Lijf (slaap, energie; optioneel), Etappe push-ups `current → milestone → B`, knoppen +1 / Done / Skip, Koers ↑/→/↓ één woord.

- +1 = set gedaan, huidige mag omhoog
- Done = set op het werkgetal, huidige blijft
- Geen van beide schuift de etappe
- Milestone: gebruiker kiest, nooit auto-advance
- Skip = chip, geen miss
- Miss = dag die dichtging zonder +1 / Done / Skip. Verse dag (0 events) is startstaat, geen miss, geen stokt
- Stok = miss. Niet “geen set in de laatste dagen inclusief vandaag”
- Startstaat is rustig. Ember alleen Skip, gear-down, en stokt bij een echte miss. Geen Ember op Koers bij een verse dag.
- Gear-down blokkeert etappe-omhoog, is geen stop
- WON'T-skip = `geen zin`; herhaald toont `identity_new` (geen interview)

Koers: A/B/nu/etappe/venster/trend/hitrate/rem/actie + Ik-blok.

Ik-velden (leeg mag, geen seed-tekst, geen namen in defaults):

- identity_anti — Leven dat ik weiger (280)
- identity_new — Wie ik word (140)
- identity_constraint — Wat B niet mag schenden (140)
- horizon_1y — optioneel 1-jaars B (140)

Nieuwe etappe/B: waarschuw als constraint is gezet, geen blokkade. Horizon leeg + etappes roteren: één regel voor 1-jaars B.

## Data

Multi-tenant vanaf dag 1. Geen tenantnaam, geen `stijn`, geen zaaknaam in productcode.

- `tenants` (id, created_at) — geen name-kolom
- `tenant_members` (tenant_id, user_id) — één tenant per user
- TEST-logins A/B (README) worden later tenant 1 / 2; `ensure_own_tenant()` maakt geen tweede tenant als lidmaatschap al bestaat
- `profiles` (id, tenant_id, display_name, identity_anti, identity_new, identity_constraint, horizon_1y)
- `vectors` (tenant_id, user_id, domain strength, a, b, unit reps, pace_constraint) — één strength-vector per tenant
- `stages` (tenant_id, vector_id, milestone, started_on, deadline, status, stage_type Build)
- `events` (tenant_id, user_id, date, kind, value, skip_reason)

RLS: rij zichtbaar als `tenant_id = private.current_tenant_id()` (lidmaatschap via `auth.uid()`). Events-insert eist ook `user_id = auth.uid()`.

Seed lock 29 aug 2026: A (start / huidige) = 40, etappe = 45, B = 50. Eén set, niet verspreid. Unit = reps. 35 is fout. Dat zijn **lege-tenant inrichting-defaults** (`SEED`), geen UI-constanten. Live A/B/etappe komen uit tenantrijen. Vandaag toont die rijen. Etappe schuift niet automatisch door.

Gear down: slaap &lt; 6u of energie laag → etappe mag niet omhoog; volgende actie kleiner of herstel. Geen stop.
