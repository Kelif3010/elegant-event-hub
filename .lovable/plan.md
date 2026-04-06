

# Budget-Seite: Redesign mit Tabs, Add-Dialog und Bezahlt-Toggle

## Problem
1. "Ausgabe hinzufügen" Button macht nichts — es fehlt ein Dialog
2. Ausgaben können nicht als bezahlt/offen markiert werden (nur Anzeige)
3. Alles auf einer Seite → zu viel Scrollen

## Lösung: Tab-basiertes Layout

Die Budget-Seite bekommt **3 horizontale Reiter** direkt unter den Summary-Cards:

```text
┌─────────────┬──────────────┬──────────────┐
│  Übersicht  │  Kategorien  │ Einzelposten │
└─────────────┴──────────────┴──────────────┘
```

- **Übersicht**: Summary-Cards + beide Charts (Pie + Bar) — der schnelle Finanzüberblick
- **Kategorien**: Kategorie-Liste mit Progress-Bars, klickbar zum Filtern
- **Einzelposten**: Ausgaben-Tabelle mit Filter (Alle/Bezahlt/Offen), Toggle zum Abhaken

So sieht man sofort alles Wichtige ohne Scrollen.

## Neue Features

### 1. "Ausgabe hinzufügen" Dialog
Pop-up mit Feldern:
- Titel (Text)
- Kategorie (Select aus budgetCategories)
- Betrag (Number, €)
- Anbieter (Text)
- Datum (Date)
- Status: Bezahlt/Offen (Switch)

Neue Ausgabe wird per `useState` zur lokalen Liste hinzugefügt.

### 2. Bezahlt-Toggle pro Ausgabe
In der Einzelposten-Tabelle: Klick auf den Status-Badge (oder Checkbox) toggelt zwischen "Bezahlt" und "Offen". Die Summary-Cards oben aktualisieren sich live.

### 3. Kategorie hinzufügen
Im Kategorien-Tab: Button "Kategorie hinzufügen" mit kleinem Dialog (Name + Budget + Farbe).

## Technisch

- **Eine Datei**: `Budget.tsx` komplett überarbeiten
- `useState` für `activeTab`, `expenses` (kopiert aus mockData), `categories`, `showAddDialog`, `showAddCategoryDialog`
- Tabs via `Tabs/TabsList/TabsTrigger/TabsContent` (bereits vorhanden)
- Dialog via `Dialog/DialogContent` (bereits vorhanden)
- Bestehende Recharts-Charts bleiben, werden nur in den Übersicht-Tab verschoben

