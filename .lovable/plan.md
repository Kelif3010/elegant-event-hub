

# Empty States mit Illustrationen und CTAs

## Übersicht

Erstelle eine wiederverwendbare `EmptyState`-Komponente und ersetze alle bestehenden minimalen Empty States durch visuell ansprechende Versionen mit SVG-Illustrationen, beschreibendem Text und Call-to-Action Buttons.

## Komponente

**Neue Datei: `src/components/EmptyState.tsx`**
- Props: `icon`, `title`, `description`, `actionLabel`, `onAction`, `illustration` (SVG inline)
- Layout: Zentriert, großes SVG-Illustration oben, Titel (font-serif), Beschreibung (muted), Button mit accent-Farbe
- Sanfte fade-in Animation (animate-fade-in)
- Jede Seite bekommt eine eigene thematische SVG-Illustration (abstrakte, elegante Linienzeichnungen passend zum Hochzeitsthema)

## Betroffene Seiten und ihre Empty States

| Seite | Illustration | Titel | CTA |
|---|---|---|---|
| **Guests** | Personen-Silhouetten | "Noch keine Gäste eingeladen" | "Ersten Gast hinzufügen" → öffnet Add-Dialog |
| **Tasks** | Checkliste mit Häkchen | "Keine Aufgaben vorhanden" | "Erste Aufgabe erstellen" → öffnet Add-Dialog |
| **Budget** | Münzen/Sparkasse | "Noch keine Ausgaben erfasst" | "Erste Ausgabe hinzufügen" → öffnet Add-Dialog |
| **Timeline** | Uhr/Zeitstrahl | "Noch kein Programm erstellt" | "Programmpunkt hinzufügen" → öffnet Add-Dialog |
| **Vendors** | Handshake/Vertrag | "Noch keine Dienstleister" | "Dienstleister hinzufügen" → öffnet Add-Dialog |
| **PhotoGallery** | Kamera/Bilderrahmen | "Noch keine Fotos" | "Erstes Foto hochladen" → öffnet Upload |
| **Wishlist** | Geschenk/Herz | "Noch keine Wünsche" | "Ersten Wunsch hinzufügen" → öffnet Add-Dialog |
| **Guestbook** | Buch/Feder | "Noch keine Einträge" | "Zum Gästebuch einladen" |
| **MusicPlaylist** | Musiknote | "Noch keine Songs" | "Song vorschlagen" → öffnet Add |
| **TablePlan** | Tisch-Layout | "Noch keine Tische erstellt" | "Ersten Tisch erstellen" |
| **Invitations** | Briefumschlag | "Noch keine Einladungen" | "Einladung erstellen" |

## Technische Umsetzung

1. **EmptyState-Komponente** mit inline SVG-Illustrationen als React-Komponenten (keine externen Dateien nötig)
2. **Pro Seite**: Bestehende `filtered.length === 0` / `taskList.length === 0` Blöcke durch `<EmptyState>` ersetzen, wobei der CTA-Button die jeweilige `setShowAddDialog(true)` Funktion aufruft
3. **Zwei Varianten**: "Keine Daten vorhanden" (leere Liste) vs. "Keine Treffer" (Filter aktiv) — bei aktivem Filter kürzerer Text ohne CTA
4. SVG-Illustrationen: Minimalistische Linien-Art im eleganten Stil, einfarbig mit accent-Farbe aus ThemeContext

