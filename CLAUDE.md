# Routine App — Claude Code Context

## Doel
Persoonlijke dagelijkse routine tracker voor Stijn. Gebouwd als enkelvoudig HTML bestand,
gehost via GitHub Pages, data opgeslagen in Supabase. Primair gebruik op iPhone als PWA.

---

## Stack
- **Frontend**: Enkelvoudig `index.html` — vanilla JS, geen frameworks, geen build tooling
- **Database**: Supabase (Postgres) — centrale opslag, sync bij elke invoer
- **Hosting**: GitHub Pages — main branch, root map, bestand heet `index.html`
- **Fonts**: Google Fonts — Bebas Neue (headers) + DM Sans (body)
- **Offline**: localStorage als fallback als Supabase niet bereikbaar is

---

## Supabase

**Project URL**: [INVULLEN]
**Anon public key**: [INVULLEN]

### Tabel: routine_log
```sql
create table routine_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null default 'stijn',
  date date not null unique,
  done text[] default '{}',
  supps text[] default '{}',
  weight numeric(5,2),
  sleep numeric(4,1),
  energy int,
  clean_eat text,
  cold_shower text,
  if_done text,
  alcohol text,
  walk_morning text,
  walk_evening text,
  updated_at timestamptz default now()
);
```

### Tabel: routine_settings
```sql
create table routine_settings (
  user_id text primary key default 'stijn',
  height int default 188,
  updated_at timestamptz default now()
);
```

### Row Level Security
Beide tabellen hebben open access policy (anon key heeft lees/schrijf toegang).

---

## Gebruiker
- **Naam**: Stijn Welsing
- **Leeftijd**: Geboren juli 1973, Generation X
- **Lengte**: 188 cm (default, eens per kwartaal bij te werken)
- **Primair apparaat**: iPhone
- **Taal**: Nederlands

---

## Wat de app bijhoudt

### Beweging (2x per dag)
| ID | Naam | Detail | Target |
|----|------|--------|--------|
| o-pushups | Push-ups | Borst, schouders, triceps | 25 reps |
| o-squats | Squats | Quads, billen, hamstrings | 25 reps |
| o-plank | Plank | Core, erector spinae | 45 sec |
| o-hang | Dead Hang | Lats, grip, decompressie | 25 sec |
| a-pushups | Push-ups | Avond sessie | 25 reps |
| a-squats | Squats | Avond sessie | 25 reps |
| a-plank | Plank | Avond sessie | 45 sec |
| a-hang | Dead Hang | Avond sessie | 25 sec |

**Volgorde**: ochtend = na opstaan → workout → wandeling. Avond = wandeling → workout → eten.

### Wandelingen
- Ochtend en avond apart bijgehouden
- Opties: `none` / `small` / `big` / `xl`
- Klein = door de straat naar het parkje
- Groot = langs de A
- XL = extra grote ronde

### Lichaam
- **Gewicht**: dagelijks in kg (0.1 stappen), plus/min knoppen + direct invoer
- **Slaap**: dagelijks in uren (0.5 stappen), plus/min knoppen + direct invoer
- **Energie**: 1-5 sterren
- **Lengte**: 188 cm default, eens per kwartaal, plus/min + direct invoer
- **BMI**: automatisch berekend uit gewicht + lengte, getoond als tweede lijn in grafiek

### Gedrag (ja/nee toggles)
- Clean gegeten (ja = groen, nee = rood)
- Koud gedoucht (ja = groen, nee = rood)
- IF venster gehouden / 13:00-19:00 eetvenster (ja = groen, nee = rood)
- Alcohol (geen = groen, gedronken = rood)

### Supplementen
- **Calcium + D3**: nemen bij lunch/middag (icoon: 🦴)
- **Magnesium**: nemen voor het slapen (icoon: 🌙)

---

## UI / Stijl

### Kleurcodering
```
--bg:       #0c0c0c   (achtergrond)
--card:     #161616   (kaart achtergrond)
--accent:   #e8533a   (rood, primaire accentkleur)
--accent2:  #f0a090   (licht rood)
--green:    #2e7d52   (groen, gedaan/positief)
--green2:   #3da06a   (licht groen)
--blue:     #4a8fd4   (blauw, BMI lijn, wandeling pills)
--yellow:   #d4a820   (geel, supplementen)
--text:     #f0ece4   (primaire tekst)
--muted:    #606060   (secundaire tekst)
```

### Typografie
- Headers/cijfers: `Bebas Neue` (Google Fonts)
- Body: `DM Sans` (Google Fonts)

### Layout principes
- Mobile-first, geoptimaliseerd voor iPhone Safari
- `env(safe-area-inset-*)` voor notch/home bar
- Geen externe CSS frameworks
- Ripple animatie op interactieve elementen
- Confetti bij volledig voltooide dag (alle 8 oefeningen)

---

## Navigatie
- **Vandaag** tab: hoofdscherm met alle invoer
- **Historie** tab: lijst van alle dagen met pills per categorie

---

## Data structuur (localStorage key: `routine_v4`)
```json
{
  "2025-05-14": {
    "done": ["o-pushups", "o-squats", "o-plank", "o-hang"],
    "supps": ["calcium", "magnesium"],
    "weight": 88.4,
    "sleep": 7.5,
    "energy": 4,
    "cleanEat": "yes",
    "coldShower": "yes",
    "ifDone": "yes",
    "alcohol": "no",
    "walkMorning": "big",
    "walkEvening": "small"
  }
}
```

### Settings (localStorage key: `routine_settings`)
```json
{
  "height": 188
}
```

---

## Supabase sync strategie
- **Bij elke invoer**: upsert naar `routine_log` op basis van `date`
- **Bij opstarten**: laad vandaag + laatste 30 dagen van Supabase
- **Offline fallback**: schrijf naar localStorage, sync zodra verbinding herstelt
- **Conflict resolutie**: `updated_at` timestamp, meest recent wint
- **user_id**: hardcoded `'stijn'` voor nu (single-user app)

---

## GitHub
- **Repo**: github.com/[GEBRUIKERSNAAM]/routine
- **Branch**: main
- **Deploy**: GitHub Pages, root map, `index.html`
- **Update workflow**: bestand bewerken → commit naar main → automatisch live na ~1 min

---

## Bekende beperkingen / toekomstige uitbreidingen
- Bluetooth koppeling met e.volve weegschaal is niet mogelijk vanuit Safari (Apple blokkeert Bluetooth API)
- Gewicht wordt daarom handmatig ingevoerd
- Mogelijke uitbreiding: export als CSV of JSON download knop
- Mogelijke uitbreiding: weekrapport / maandoverzicht scherm
- Mogelijke uitbreiding: stappenteller koppeling via Apple Health (vereist native app)
