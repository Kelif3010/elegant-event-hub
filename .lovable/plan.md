

# Status-Analyse: Was ist umgesetzt vs. was fehlt

## BEREITS UMGESETZT (funktioniert)

| Feature | Status | Details |
|---|---|---|
| **Dark Mode Toggle** | ✅ Umgesetzt | ThemeContext mit `darkMode`, Toggle in Settings und Header, `document.documentElement.classList.toggle("dark")` |
| **ThemeContext (globaler Theme-Store)** | ✅ Umgesetzt | accentColor, fontPairing, coupleName, eventDate, eventLocation, primaryLanguage, activeModules, guestPortalGreeting, paypalLink, borderRadius, fontSize, darkMode |
| **Theme Studio (/theme-studio)** | ✅ Umgesetzt | 8 Preset-Farben, 4 Font-Pairings, Border-Radius-Toggle, Dark/Light Toggle, 4 Templates (Grand Ballroom, Garden Party, Modern Loft, Beach Romance), Live-Preview mit 3 Tabs |
| **Dashboard Widgets anpassbar** | ✅ Grundversion | Add/Remove/Reset Widgets, localStorage-Persistenz, 13 Widget-Typen inkl. Honeymoon-Globus |
| **Gäste: Hinzufügen + Bearbeiten** | ✅ Umgesetzt | Dialog für neuen Gast, Edit-Dialog, Sheet für Gast-Details |
| **Aufgaben: Hinzufügen-Dialog** | ✅ Umgesetzt | Dialog mit Titel, Kategorie, Priorität, Fälligkeitsdatum |
| **Zeitplan: Hinzufügen-Dialog** | ✅ Umgesetzt | Dialog für neue Timeline-Events |
| **Dienstleister: Hinzufügen-Dialog** | ✅ Umgesetzt | Dialog für neue Vendors |
| **RSVP Form Builder** | ✅ Umgesetzt | Felder erstellen/bearbeiten/löschen, Pflichtfeld-Toggle, Bedingungslogik, Vorschau |
| **RSVP Drag & Drop Reihenfolge** | ✅ Umgesetzt | DragIdx-basiertes Reordering der Felder |
| **Flitterwochen-Frage im RSVP** | ✅ Umgesetzt | Feld "f14" für Flitterwochen-Empfehlung |
| **Flitterwochen im Dashboard** | ✅ Umgesetzt | Honeymoon-Widget mit Weltkarte-Visualisierung, Ranking, Emoji-Pins |
| **Wunschliste: eigene Kategorien** | ✅ Umgesetzt | Custom-Kategorie-Dialog, dynamische Kategorie-Liste |
| **Wunschliste: PayPal** | ✅ Umgesetzt | PayPal-Link aus ThemeContext, im Gästeportal sichtbar |
| **Settings überarbeitet** | ✅ Umgesetzt | 6 Tabs (Profil, Event, Design, Benachrichtigungen, Datenschutz, Abo), konsumiert ThemeContext |
| **Command Palette (Cmd+K)** | ✅ Umgesetzt | Suche über Gäste, Tasks, Vendors, Seiten; Quick-Actions |
| **Notification Center** | ✅ Umgesetzt | Glocken-Icon im Header, Dropdown mit Mock-Benachrichtigungen, gelesen/ungelesen |
| **Check-In Modus (/checkin)** | ✅ Umgesetzt | Suchfeld, Gästeliste, Check-in Button, Statistik-Bar, QR-Scanner-Placeholder |
| **Guest Portal Manager** | ✅ Umgesetzt | Sektionen aktivieren/deaktivieren, Reihenfolge ändern, Vorschau-Button |
| **Address Collector (/address-collector)** | ✅ Umgesetzt | QR-Code, Link-Generator, Gast-Tabelle, öffentliches Formular |
| **Tischplan: Liste + Raumansicht** | ✅ Umgesetzt | Drag & Drop Gäste, Room-View mit draggable Tischen, rund/rechteckig/quadratisch |
| **Onboarding (/onboarding)** | ✅ Umgesetzt | 3-Schritt-Flow: Namen, Event-Details, Theme-Auswahl |
| **Gästeportal: interaktive Karte** | ✅ Umgesetzt | SVG-Karte mit Location-Pin, Hotels, Shuttle-Routen |

---

## FEHLT NOCH / NICHT VOLLSTÄNDIG

### 1. Dashboard: iPhone-Widget-Größen + echtes Drag & Drop
**Status:** Teilweise. Widgets können hinzugefügt/entfernt werden, aber es gibt KEIN echtes Drag & Drop zum Umordnen und KEINE wählbare Größe (xs/s/l/xl) mit adaptivem Content.

**Plan:**
- Widget-Größen-System: jedes Widget bekommt `size: "xs" | "sm" | "lg" | "xl"`, umschaltbar per Kontextmenü
- Je nach Größe zeigt das Widget unterschiedlich viel Info (z.B. Stats xs = nur Zahl, xl = Zahl + Chart + Details)
- Drag & Drop der Widgets mit `onDragStart/onDragOver/onDrop` (nativ HTML5) zum freien Anordnen
- Größen + Reihenfolge in localStorage persistiert

### 2. Einladungs-Funnel (erweiterte Invitations-Seite)
**Status:** Basisversion vorhanden (QR-Code + persönliche Links). Fehlt: Funnel-Header mit 4 KPIs, Status-Tabelle mit farbigen Chips, Bulk-Actions Floating Bar, Filter-Leiste, Template Designer Modal.

**Plan:**
- Funnel-KPIs oben: Eingeladen/Geöffnet/Erinnert/RSVP erhalten mit animierten Zählern
- Tabelle mit Checkbox, Kanal-Icons, farbigen Status-Chips
- Floating Bulk-Actions Bar bei Auswahl > 0
- Filter-Tabs mit Zahlen-Badges
- Template Designer als Dialog mit 3 Templates + ThemeContext-Preview

### 3. Adaptives Gästeportal pro Gast
**Status:** Gästeportal existiert, aber NICHT personalisiert pro Gast. Kein Gast-Selektor, keine konditionalen Inhalte basierend auf Gast-Profil.

**Plan:**
- Dropdown "Vorschau als Gast" oben im Portal
- Personalisierter Header: "Hallo, [Name]!" + Countdown + RSVP/Tisch/Hotel-Chips
- Dynamischer Content: Plus-One Begrüßung, eigener Tisch mit Tischnachbarn, eigenes Hotel, Shuttle-Zeit, Menüwahl, Sonderanforderungen
- "Dein Tag"-Tab mit personalisierter Timeline

### 4. RSVP Persona-Vorschau
**Status:** RSVP hat statische Vorschau. Fehlt: Persona-Toggle-Panel (Plus-One, Vegetarisch, Hotel, Bahn) mit live-reagierendem Formular.

**Plan:**
- 4 Toggle-Buttons im Preview-Panel
- Formularfelder erscheinen/verschwinden basierend auf Toggles
- Chip oben zeigt aktive Persona-Kombination

### 5. Foto-Wall (Pinterest-Masonry)
**Status:** Basis-Galerie mit Grid/List. Fehlt: Masonry-Layout, Emoji-Reactions, Drag & Drop Upload-Zone, Diashow-Modus, Moderation-Panel.

**Plan:**
- CSS Columns-basiertes Masonry (kein Extra-Lib nötig)
- Reaction-Bar pro Foto (❤️ 😂 😍 🥂) mit Bounce-Animation
- Upload-Zone mit gestrichelter Border
- Fullscreen-Slideshow mit Auto-Play
- Admin-Toggle für Moderations-Panel

### 6. Travel Concierge View (Hotels-Seite erweitern)
**Status:** Basis Hotels-Seite vorhanden. Fehlt: Karten-Placeholder mit Pins, 4-Tab-Struktur (Hotels/Shuttle/Anreise/Parken), Copy-Buttons, Buchungscodes.

**Plan:**
- SVG-Kartenplaceholder oben mit Pins für Venue, Hotels, Bahnhof, Parkplätze
- 4 Tabs darunter mit detaillierten Infos
- Shuttle-Reservierung (Mock), Anreise-Icons mit Details

### 7. Micro-Animations (Framer Motion / CSS)
**Status:** Keine speziellen Micro-Interactions implementiert.

**Plan:** Da Framer Motion nicht installiert ist, CSS-Animationen und Tailwind-Keyframes verwenden:
- RSVP abgeschlossen: CSS-Konfetti + animierte Bestätigungsschrift
- Task abgehakt: Durchstreich-Animation
- Wunsch reserviert: Häkchen-Fade-in
- Budget 100%: Gold-Shine-Effekt
- Hover-Scale auf alle Cards
- Fade-in auf Seitenladung (`animate-fade-in` bereits in Tailwind definiert)

### 8. Design live in Settings umsetzen
**Status:** Settings-Design-Tab existiert mit Farbpresets. Aber die Akzentfarbe wird nur als Preset-Buttons angeboten, nicht als vollwertiger Editor.

**Plan:**
- Hex-Input für Custom-Farbe ergänzen
- Font-Pairing-Auswahl in Settings einbauen (nicht nur in Theme Studio)
- Border-Radius + Font-Size Slider
- Live-Mini-Preview in Settings

---

## Zusammenfassung: 8 offene Arbeitspakete

1. **Dashboard Widget-Größen + Drag & Drop** (Dashboard.tsx)
2. **Einladungs-Funnel** (Invitations.tsx komplett überarbeiten)
3. **Adaptives Gästeportal** (GuestPortal.tsx erweitern)
4. **RSVP Persona-Vorschau** (RSVP.tsx erweitern)
5. **Foto-Wall Masonry** (PhotoGallery.tsx erweitern)
6. **Travel Concierge** (Hotels.tsx erweitern)
7. **Micro-Animations global** (CSS-Keyframes + Klassen)
8. **Settings Design-Editor erweitern** (Settings.tsx)

Soll ich mit der Umsetzung aller 8 Punkte beginnen, oder willst du priorisieren?

