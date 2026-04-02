export const weddingInfo = {
  coupleName: "Sophie & Alexander",
  date: "2025-09-13",
  venue: "Schloss Rothenburg",
  venueAddress: "Schlossallee 12, 91541 Rothenburg ob der Tauber",
  dressCode: "Eleganter Abendstil – Farben: gedeckte Töne, keine rein weißen Outfits",
  hashtag: "#SophieUndAlex2025",
};

export const timelineEvents = [
  { time: "14:00", title: "Getting Ready", description: "Die letzten Vorbereitungen – Styling, Champagner und gute Laune.", icon: "sparkles" },
  { time: "15:30", title: "Trauung", description: "Die freie Trauung im Schlossgarten.", icon: "heart" },
  { time: "16:30", title: "Sektempfang", description: "Anstoßen, Gratulieren und gemeinsame Fotos.", icon: "glass-water" },
  { time: "18:00", title: "Dinner", description: "Ein festliches 4-Gänge-Menü im großen Saal.", icon: "utensils" },
  { time: "21:00", title: "Party", description: "Die Tanzfläche gehört euch – DJ & Live-Band.", icon: "music" },
  { time: "00:00", title: "Late Night Snack", description: "Burger, Pommes und Süßes für die Nachtschwärmer.", icon: "pizza" },
];

export const guests = [
  { id: "1", firstName: "Maria", lastName: "Müller", email: "maria@email.de", status: "confirmed", meal: "Vegetarisch", allergies: "Laktose", plusOne: true, plusOneName: "Thomas Müller", children: 0, accommodation: true, transport: "Eigene Anreise", notes: "Kommt aus München", table: "Tisch 1", group: "Familie Braut" },
  { id: "2", firstName: "Jan", lastName: "Schmidt", email: "jan@email.de", status: "confirmed", meal: "Fleisch", allergies: "", plusOne: false, plusOneName: "", children: 0, accommodation: false, transport: "Shuttle", notes: "", table: "Tisch 2", group: "Freunde Bräutigam" },
  { id: "3", firstName: "Lisa", lastName: "Weber", email: "lisa@email.de", status: "pending", meal: "", allergies: "", plusOne: true, plusOneName: "", children: 1, accommodation: true, transport: "", notes: "Hat ein Kleinkind (2 Jahre)", table: "Tisch 3", group: "Freunde Braut" },
  { id: "4", firstName: "Michael", lastName: "Koch", email: "michael@email.de", status: "declined", meal: "", allergies: "", plusOne: false, plusOneName: "", children: 0, accommodation: false, transport: "", notes: "Ist leider im Urlaub", table: "", group: "Kollegen" },
  { id: "5", firstName: "Anna", lastName: "Fischer", email: "anna@email.de", status: "confirmed", meal: "Vegan", allergies: "Gluten, Nüsse", plusOne: true, plusOneName: "David Fischer", children: 0, accommodation: true, transport: "Eigene Anreise", notes: "", table: "Tisch 1", group: "Familie Braut" },
  { id: "6", firstName: "Paul", lastName: "Bauer", email: "paul@email.de", status: "confirmed", meal: "Fleisch", allergies: "", plusOne: false, plusOneName: "", children: 0, accommodation: false, transport: "Shuttle", notes: "Trauzeuge", table: "Tisch Brautpaar", group: "Trauzeugen" },
  { id: "7", firstName: "Elena", lastName: "Wagner", email: "elena@email.de", status: "pending", meal: "", allergies: "", plusOne: true, plusOneName: "", children: 2, accommodation: true, transport: "", notes: "", table: "Tisch 4", group: "Familie Bräutigam" },
  { id: "8", firstName: "Tobias", lastName: "Richter", email: "tobias@email.de", status: "confirmed", meal: "Fisch", allergies: "Schalentiere", plusOne: true, plusOneName: "Sandra Richter", children: 0, accommodation: false, transport: "Eigene Anreise", notes: "", table: "Tisch 2", group: "Freunde Bräutigam" },
];

export const hotels = [
  { name: "Hotel Schlossblick", stars: 4, priceRange: "€€€", distance: "200m", description: "Direkt am Schloss gelegen. Perfekt für alle, die fußläufig zur Location möchten.", link: "#", shuttle: true, contingent: "10 Zimmer reserviert bis 01.07.2025" },
  { name: "Romantik Hotel Alte Post", stars: 4, priceRange: "€€", distance: "1.2km", description: "Charmantes Boutique-Hotel in der Altstadt mit hervorragendem Frühstück.", link: "#", shuttle: true, contingent: "8 Zimmer reserviert bis 01.07.2025" },
  { name: "Gasthof Zum Goldenen Hirsch", stars: 3, priceRange: "€", distance: "800m", description: "Gemütlich, unkompliziert und preiswert. Ideal für 1-2 Nächte.", link: "#", shuttle: true, contingent: "" },
  { name: "Airbnb & Ferienwohnungen", stars: 0, priceRange: "€–€€", distance: "variabel", description: "Viele schöne Ferienwohnungen in der Umgebung verfügbar.", link: "#", shuttle: false, contingent: "" },
];

export const dashboardStats = {
  totalGuests: 124,
  confirmed: 86,
  pending: 28,
  declined: 10,
  plusOnes: 34,
  children: 8,
  accommodationNeeded: 42,
  shuttleNeeded: 38,
  dietarySpecial: 18,
  openTasks: 12,
  completedTasks: 34,
  budget: { total: 35000, spent: 22450 },
};

export const tasks = [
  { id: "1", title: "Blumendeko finalisieren", due: "2025-06-15", status: "open", category: "Dekoration" },
  { id: "2", title: "DJ-Playlist abstimmen", due: "2025-07-01", status: "open", category: "Unterhaltung" },
  { id: "3", title: "Menükarten drucken", due: "2025-08-01", status: "open", category: "Papeterie" },
  { id: "4", title: "Sitzordnung erstellen", due: "2025-08-15", status: "open", category: "Planung" },
  { id: "5", title: "Ringe abholen", due: "2025-09-01", status: "open", category: "Wichtig" },
  { id: "6", title: "Fotograf Briefing", due: "2025-09-10", status: "open", category: "Dienstleister" },
];

export const recentActivity = [
  { text: "Maria Müller hat zugesagt", time: "vor 2 Stunden", type: "rsvp" },
  { text: "Anna Fischer hat Allergien aktualisiert", time: "vor 5 Stunden", type: "update" },
  { text: "Paul Bauer hat Songwunsch eingereicht", time: "gestern", type: "song" },
  { text: "3 neue RSVP-Antworten", time: "gestern", type: "rsvp" },
  { text: "Hotel Schlossblick Kontingent bestätigt", time: "vor 2 Tagen", type: "hotel" },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    period: "kostenlos",
    description: "Perfekt zum Ausprobieren und für kleine Feiern.",
    features: [
      "Bis zu 30 Gäste",
      "1 Event",
      "RSVP-Verwaltung",
      "Basis-Gästeseite",
      "E-Mail-Benachrichtigungen",
    ],
    cta: "Kostenlos starten",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "29",
    period: "/ Monat",
    description: "Alles, was ihr für eure Traumhochzeit braucht.",
    features: [
      "Unbegrenzte Gäste",
      "Eigene Domain",
      "Individuelle Gästeseite",
      "Gästemanagement Pro",
      "Hotel- & Transportplanung",
      "Tischplanung",
      "Budget-Tracker",
      "Priority Support",
    ],
    cta: "Premium wählen",
    highlighted: true,
  },
  {
    name: "Event Pro",
    price: "79",
    period: "/ Monat",
    description: "Für Wedding Planner und große Events.",
    features: [
      "Alles aus Premium",
      "Mehrere Events",
      "Team-Zugänge",
      "Erweiterte Analysen",
      "White-Label Option",
      "API-Zugang",
      "Dedizierter Account Manager",
      "Custom Branding",
    ],
    cta: "Kontakt aufnehmen",
    highlighted: false,
  },
];

export const faqItems = [
  { q: "Wie funktioniert die Gästeverwaltung?", a: "Ihr ladet eure Gäste per Link oder E-Mail ein. Jeder Gast erhält eine persönliche Seite mit RSVP-Formular, Event-Infos und mehr. Alle Antworten werden automatisch in eurem Dashboard zusammengefasst." },
  { q: "Können Gäste ihre Antworten nachträglich ändern?", a: "Ja, Gäste können ihre Angaben jederzeit bis zu einem von euch festgelegten Stichtag aktualisieren." },
  { q: "Ist die Plattform auch für andere Events nutzbar?", a: "Aktuell liegt unser Fokus auf Hochzeiten, aber die Plattform eignet sich auch für Jubiläen, Geburtstage und andere Feierlichkeiten. Weitere Event-Typen sind in Planung." },
  { q: "Wie sicher sind unsere Daten?", a: "Datenschutz hat für uns höchste Priorität. Alle Daten werden DSGVO-konform auf europäischen Servern gespeichert und verschlüsselt übertragen." },
  { q: "Kann ich meine eigene Domain verwenden?", a: "Ja, ab dem Premium-Plan könnt ihr eure eigene Domain (z.B. sophie-und-alex.de) verbinden." },
  { q: "Gibt es eine App?", a: "Die Plattform ist als responsive Web-App konzipiert und funktioniert auf allen Geräten perfekt – ohne Installation." },
];
