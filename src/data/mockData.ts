export const weddingInfo = {
  coupleName: "Sophie & Alexander",
  date: "2025-09-13",
  venue: "Schloss Rothenburg",
  venueAddress: "Schlossallee 12, 91541 Rothenburg ob der Tauber",
  dressCode: "Eleganter Abendstil – Farben: gedeckte Töne, keine rein weißen Outfits",
  hashtag: "#SophieUndAlex2025",
};

export const timelineEvents = [
  { id: "1", time: "14:00", endTime: "15:00", title: "Getting Ready", description: "Die letzten Vorbereitungen – Styling, Champagner und gute Laune.", icon: "sparkles", location: "Bridal Suite" },
  { id: "2", time: "15:30", endTime: "16:15", title: "Trauung", description: "Die freie Trauung im Schlossgarten.", icon: "heart", location: "Schlossgarten" },
  { id: "3", time: "16:30", endTime: "17:45", title: "Sektempfang", description: "Anstoßen, Gratulieren und gemeinsame Fotos.", icon: "glass-water", location: "Terrasse" },
  { id: "4", time: "18:00", endTime: "20:30", title: "Dinner", description: "Ein festliches 4-Gänge-Menü im großen Saal.", icon: "utensils", location: "Großer Saal" },
  { id: "5", time: "21:00", endTime: "23:59", title: "Party", description: "Die Tanzfläche gehört euch – DJ & Live-Band.", icon: "music", location: "Ballsaal" },
  { id: "6", time: "00:00", endTime: "02:00", title: "Late Night Snack", description: "Burger, Pommes und Süßes für die Nachtschwärmer.", icon: "pizza", location: "Foyer" },
];

export const guests = [
  { id: "1", firstName: "Maria", lastName: "Müller", email: "maria@email.de", status: "confirmed", meal: "Vegetarisch", allergies: "Laktose", plusOne: true, plusOneName: "Thomas Müller", children: 0, accommodation: true, transport: "Eigene Anreise", notes: "Kommt aus München", table: "Tisch 1", group: "Familie Braut", accessCode: "MARIA2025" },
  { id: "2", firstName: "Jan", lastName: "Schmidt", email: "jan@email.de", status: "confirmed", meal: "Fleisch", allergies: "", plusOne: false, plusOneName: "", children: 0, accommodation: false, transport: "Shuttle", notes: "", table: "Tisch 2", group: "Freunde Bräutigam", accessCode: "JAN2025" },
  { id: "3", firstName: "Lisa", lastName: "Weber", email: "lisa@email.de", status: "pending", meal: "", allergies: "", plusOne: true, plusOneName: "", children: 1, accommodation: true, transport: "", notes: "Hat ein Kleinkind (2 Jahre)", table: "Tisch 3", group: "Freunde Braut", accessCode: "LISA2025" },
  { id: "4", firstName: "Michael", lastName: "Koch", email: "michael@email.de", status: "declined", meal: "", allergies: "", plusOne: false, plusOneName: "", children: 0, accommodation: false, transport: "", notes: "Ist leider im Urlaub", table: "", group: "Kollegen", accessCode: "MICHAEL2025" },
  { id: "5", firstName: "Anna", lastName: "Fischer", email: "anna@email.de", status: "confirmed", meal: "Vegan", allergies: "Gluten, Nüsse", plusOne: true, plusOneName: "David Fischer", children: 0, accommodation: true, transport: "Eigene Anreise", notes: "", table: "Tisch 1", group: "Familie Braut", accessCode: "ANNA2025" },
  { id: "6", firstName: "Paul", lastName: "Bauer", email: "paul@email.de", status: "confirmed", meal: "Fleisch", allergies: "", plusOne: false, plusOneName: "", children: 0, accommodation: false, transport: "Shuttle", notes: "Trauzeuge", table: "Tisch Brautpaar", group: "Trauzeugen", accessCode: "PAUL2025" },
  { id: "7", firstName: "Elena", lastName: "Wagner", email: "elena@email.de", status: "pending", meal: "", allergies: "", plusOne: true, plusOneName: "", children: 2, accommodation: true, transport: "", notes: "", table: "Tisch 4", group: "Familie Bräutigam", accessCode: "ELENA2025" },
  { id: "8", firstName: "Tobias", lastName: "Richter", email: "tobias@email.de", status: "confirmed", meal: "Fisch", allergies: "Schalentiere", plusOne: true, plusOneName: "Sandra Richter", children: 0, accommodation: false, transport: "Eigene Anreise", notes: "", table: "Tisch 2", group: "Freunde Bräutigam", accessCode: "TOBIAS2025" },
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
  { id: "1", title: "Blumendeko finalisieren", due: "2025-06-15", status: "open", category: "Dekoration", priority: "high", assignee: "Sophie" },
  { id: "2", title: "DJ-Playlist abstimmen", due: "2025-07-01", status: "open", category: "Unterhaltung", priority: "medium", assignee: "Alexander" },
  { id: "3", title: "Menükarten drucken", due: "2025-08-01", status: "open", category: "Papeterie", priority: "medium", assignee: "Sophie" },
  { id: "4", title: "Sitzordnung erstellen", due: "2025-08-15", status: "open", category: "Planung", priority: "high", assignee: "Beide" },
  { id: "5", title: "Ringe abholen", due: "2025-09-01", status: "open", category: "Wichtig", priority: "high", assignee: "Alexander" },
  { id: "6", title: "Fotograf Briefing", due: "2025-09-10", status: "open", category: "Dienstleister", priority: "medium", assignee: "Sophie" },
  { id: "7", title: "Save-the-Date verschickt", due: "2025-03-01", status: "done", category: "Papeterie", priority: "high", assignee: "Sophie" },
  { id: "8", title: "Catering gebucht", due: "2025-02-15", status: "done", category: "Dienstleister", priority: "high", assignee: "Beide" },
  { id: "9", title: "Location besichtigt", due: "2025-01-20", status: "done", category: "Planung", priority: "high", assignee: "Beide" },
  { id: "10", title: "Einladungen versenden", due: "2025-05-15", status: "in-progress", category: "Papeterie", priority: "high", assignee: "Sophie" },
  { id: "11", title: "Musik für Trauung auswählen", due: "2025-07-15", status: "open", category: "Unterhaltung", priority: "low", assignee: "Beide" },
  { id: "12", title: "Gastgeschenke bestellen", due: "2025-08-01", status: "open", category: "Dekoration", priority: "low", assignee: "Sophie" },
];

export const recentActivity = [
  { text: "Maria Müller hat zugesagt", time: "vor 2 Stunden", type: "rsvp" },
  { text: "Anna Fischer hat Allergien aktualisiert", time: "vor 5 Stunden", type: "update" },
  { text: "Paul Bauer hat Songwunsch eingereicht", time: "gestern", type: "song" },
  { text: "3 neue RSVP-Antworten", time: "gestern", type: "rsvp" },
  { text: "Hotel Schlossblick Kontingent bestätigt", time: "vor 2 Tagen", type: "hotel" },
  { text: "Lisa Weber hat ein Foto hochgeladen", time: "vor 3 Tagen", type: "photo" },
  { text: "Jan Schmidt hat einen Song vorgeschlagen", time: "vor 3 Tagen", type: "song" },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    period: "kostenlos",
    description: "Perfekt zum Ausprobieren und für kleine Feiern.",
    features: ["Bis zu 30 Gäste", "1 Event", "RSVP-Verwaltung", "Basis-Gästeseite", "E-Mail-Benachrichtigungen"],
    cta: "Kostenlos starten",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "29",
    period: "/ Monat",
    description: "Alles, was ihr für eure Traumhochzeit braucht.",
    features: ["Unbegrenzte Gäste", "Eigene Domain", "Individuelle Gästeseite", "Gästemanagement Pro", "Hotel- & Transportplanung", "Tischplanung", "Budget-Tracker", "Gästebuch & Fotogalerie", "Wunschliste", "Musik-Integration", "Priority Support"],
    cta: "Premium wählen",
    highlighted: true,
  },
  {
    name: "Event Pro",
    price: "79",
    period: "/ Monat",
    description: "Für Wedding Planner und große Events.",
    features: ["Alles aus Premium", "Mehrere Events", "Team-Zugänge", "Erweiterte Analysen", "White-Label Option", "API-Zugang", "Dedizierter Account Manager", "Custom Branding"],
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

// Budget data
export const budgetCategories = [
  { id: "1", name: "Location & Catering", budget: 12000, spent: 9800, color: "hsl(var(--champagne))" },
  { id: "2", name: "Fotografie & Video", budget: 4000, spent: 3500, color: "hsl(var(--sage))" },
  { id: "3", name: "Blumen & Dekoration", budget: 3500, spent: 2200, color: "hsl(var(--rose))" },
  { id: "4", name: "Musik & Unterhaltung", budget: 3000, spent: 2800, color: "hsl(38 55% 72%)" },
  { id: "5", name: "Kleidung & Styling", budget: 4500, spent: 1800, color: "hsl(150 20% 60%)" },
  { id: "6", name: "Papeterie & Druck", budget: 1500, spent: 950, color: "hsl(350 40% 82%)" },
  { id: "7", name: "Transport & Shuttle", budget: 2000, spent: 600, color: "hsl(30 10% 60%)" },
  { id: "8", name: "Sonstiges", budget: 4500, spent: 800, color: "hsl(220 15% 50%)" },
];

export const budgetExpenses = [
  { id: "1", categoryId: "1", title: "Catering – 4-Gänge-Menü", amount: 6200, date: "2025-03-15", vendor: "Gourmet & Co.", paid: true },
  { id: "2", categoryId: "1", title: "Location-Miete Schloss", amount: 3600, date: "2025-01-20", vendor: "Schloss Rothenburg", paid: true },
  { id: "3", categoryId: "2", title: "Fotograf – Ganztag", amount: 2500, date: "2025-02-10", vendor: "Studio Lichtblick", paid: true },
  { id: "4", categoryId: "2", title: "Videograf – Highlight-Film", amount: 1000, date: "2025-02-10", vendor: "Filmmoment", paid: false },
  { id: "5", categoryId: "3", title: "Brautstrauß & Tischdeko", amount: 1400, date: "2025-04-01", vendor: "Blütenwerk", paid: false },
  { id: "6", categoryId: "3", title: "Traubogen & Zeremonie-Deko", amount: 800, date: "2025-04-01", vendor: "Blütenwerk", paid: false },
  { id: "7", categoryId: "4", title: "DJ – Abendprogramm", amount: 1800, date: "2025-03-01", vendor: "DJ Soundwave", paid: true },
  { id: "8", categoryId: "4", title: "Live-Band – 2 Stunden", amount: 1000, date: "2025-03-15", vendor: "The Wedding Notes", paid: false },
  { id: "9", categoryId: "5", title: "Brautkleid", amount: 1200, date: "2025-02-20", vendor: "Brautmoden Elegance", paid: true },
  { id: "10", categoryId: "5", title: "Anzug Bräutigam", amount: 600, date: "2025-03-05", vendor: "Herrenausstatter König", paid: true },
  { id: "11", categoryId: "6", title: "Einladungskarten (120 Stk)", amount: 650, date: "2025-01-30", vendor: "Druckerei Fein", paid: true },
  { id: "12", categoryId: "6", title: "Menükarten & Tischkarten", amount: 300, date: "2025-07-15", vendor: "Druckerei Fein", paid: false },
  { id: "13", categoryId: "7", title: "Shuttle-Bus Anzahlung", amount: 600, date: "2025-04-20", vendor: "Reisebus Meyer", paid: true },
  { id: "14", categoryId: "8", title: "Gastgeschenke", amount: 450, date: "2025-06-01", vendor: "Personalisiert.de", paid: false },
  { id: "15", categoryId: "8", title: "Versicherung", amount: 350, date: "2025-01-15", vendor: "EventProtect", paid: true },
];

// Table/seating data
export const seatingTables = [
  { id: "brautpaar", name: "Tisch Brautpaar", shape: "rectangle" as const, seats: 6, x: 400, y: 100, guests: ["6"] },
  { id: "1", name: "Tisch 1", shape: "round" as const, seats: 8, x: 150, y: 280, guests: ["1", "5"] },
  { id: "2", name: "Tisch 2", shape: "round" as const, seats: 8, x: 400, y: 280, guests: ["2", "8"] },
  { id: "3", name: "Tisch 3", shape: "round" as const, seats: 8, x: 650, y: 280, guests: ["3"] },
  { id: "4", name: "Tisch 4", shape: "round" as const, seats: 8, x: 150, y: 460, guests: ["7"] },
  { id: "5", name: "Tisch 5", shape: "round" as const, seats: 8, x: 400, y: 460, guests: [] },
  { id: "6", name: "Tisch 6", shape: "round" as const, seats: 8, x: 650, y: 460, guests: [] },
];

// Vendors
export const vendors = [
  { id: "1", name: "Gourmet & Co.", category: "Catering", contact: "Frau Berger", email: "info@gourmetco.de", phone: "+49 9861 12345", status: "confirmed", amount: 6200, rating: 5, notes: "4-Gänge-Menü inkl. Getränke" },
  { id: "2", name: "Studio Lichtblick", category: "Fotografie", contact: "Herr Meier", email: "info@lichtblick.de", phone: "+49 9861 23456", status: "confirmed", amount: 2500, rating: 5, notes: "Ganztages-Reportage + Online-Galerie" },
  { id: "3", name: "Blütenwerk", category: "Floristik", contact: "Frau Blume", email: "hello@bluetenwerk.de", phone: "+49 9861 34567", status: "confirmed", amount: 2200, rating: 4, notes: "Brautstrauß, Tischdeko, Traubogen" },
  { id: "4", name: "DJ Soundwave", category: "Musik", contact: "Max Sound", email: "max@djsoundwave.de", phone: "+49 171 5551234", status: "confirmed", amount: 1800, rating: 4, notes: "21:00–03:00 Uhr" },
  { id: "5", name: "Filmmoment", category: "Video", contact: "Herr Schneider", email: "info@filmmoment.de", phone: "+49 9861 45678", status: "pending", amount: 1000, rating: 0, notes: "Highlight-Film, Angebot ausstehend" },
  { id: "6", name: "The Wedding Notes", category: "Musik", contact: "Sarah Keys", email: "band@weddingnotes.de", phone: "+49 172 5559876", status: "confirmed", amount: 1000, rating: 5, notes: "Live-Band für Dinner, 2h Set" },
  { id: "7", name: "Reisebus Meyer", category: "Transport", contact: "Herr Meyer", email: "info@reisebus-meyer.de", phone: "+49 9861 56789", status: "confirmed", amount: 1200, rating: 4, notes: "Shuttle 2x hin und zurück" },
  { id: "8", name: "Druckerei Fein", category: "Papeterie", contact: "Frau Fein", email: "info@druckereifein.de", phone: "+49 9861 67890", status: "confirmed", amount: 950, rating: 5, notes: "Einladungen, Menü- und Tischkarten" },
];

// Wishlist / Gift Registry
export const wishlistItems = [
  { id: "1", title: "KitchenAid Küchenmaschine", description: "Artisan 4.8L in Cream", price: 599, image: "🍳", category: "Küche", reservedBy: "Maria Müller", link: "#" },
  { id: "2", title: "Dyson V15 Staubsauger", description: "Kabelloser Staubsauger", price: 699, image: "🧹", category: "Haushalt", reservedBy: null, link: "#" },
  { id: "3", title: "Flitterwochen-Beitrag", description: "Für unsere Reise nach Bali 🌴", price: null, image: "✈️", category: "Erlebnis", reservedBy: null, link: "#" },
  { id: "4", title: "Espressomaschine", description: "Sage Barista Express", price: 549, image: "☕", category: "Küche", reservedBy: "Jan Schmidt", link: "#" },
  { id: "5", title: "Bettwäsche-Set", description: "Premium Leinen, Weiß & Sage", price: 289, image: "🛏️", category: "Schlafzimmer", reservedBy: null, link: "#" },
  { id: "6", title: "Weber Gasgrill", description: "Spirit EPX-335 GBS", price: 899, image: "🔥", category: "Garten", reservedBy: null, link: "#" },
  { id: "7", title: "Weinpaket Toskana", description: "12 Flaschen ausgewählte Weine", price: 199, image: "🍷", category: "Genuss", reservedBy: "Anna Fischer", link: "#" },
  { id: "8", title: "Fotoalbum-Gutschein", description: "Professionelles Hochzeitsalbum", price: 350, image: "📸", category: "Erinnerungen", reservedBy: null, link: "#" },
  { id: "9", title: "Kochkurs für Zwei", description: "Italienische Küche – 3 Abende", price: 180, image: "👨‍🍳", category: "Erlebnis", reservedBy: null, link: "#" },
  { id: "10", title: "Handtuch-Set", description: "Ägyptische Baumwolle, 10-tlg.", price: 159, image: "🛁", category: "Bad", reservedBy: "Paul Bauer", link: "#" },
];

// Photo gallery
export const galleryPhotos = [
  { id: "1", url: "/placeholder.svg", caption: "Save the Date Shooting", uploadedBy: "Studio Lichtblick", date: "2025-03-20", likes: 24, category: "pre-wedding" },
  { id: "2", url: "/placeholder.svg", caption: "Verlobung im Park", uploadedBy: "Maria Müller", date: "2025-01-15", likes: 18, category: "pre-wedding" },
  { id: "3", url: "/placeholder.svg", caption: "Location-Besichtigung", uploadedBy: "Sophie", date: "2025-02-01", likes: 12, category: "pre-wedding" },
  { id: "4", url: "/placeholder.svg", caption: "Einladungs-Design", uploadedBy: "Sophie", date: "2025-03-01", likes: 8, category: "preparation" },
  { id: "5", url: "/placeholder.svg", caption: "Blumenprobe", uploadedBy: "Sophie", date: "2025-04-10", likes: 15, category: "preparation" },
  { id: "6", url: "/placeholder.svg", caption: "Tortenpobe", uploadedBy: "Alexander", date: "2025-05-01", likes: 22, category: "preparation" },
];

// Playlist / Music
export const playlistSongs = [
  { id: "1", title: "Perfect", artist: "Ed Sheeran", addedBy: "Sophie & Alexander", votes: 42, category: "first-dance" },
  { id: "2", title: "Thinking Out Loud", artist: "Ed Sheeran", addedBy: "Maria Müller", votes: 38, category: "romantic" },
  { id: "3", title: "Uptown Funk", artist: "Bruno Mars", addedBy: "Paul Bauer", votes: 35, category: "party" },
  { id: "4", title: "Shut Up and Dance", artist: "WALK THE MOON", addedBy: "Jan Schmidt", votes: 28, category: "party" },
  { id: "5", title: "Can't Stop the Feeling!", artist: "Justin Timberlake", addedBy: "Anna Fischer", votes: 25, category: "party" },
  { id: "6", title: "A Thousand Years", artist: "Christina Perri", addedBy: "Elena Wagner", votes: 22, category: "romantic" },
  { id: "7", title: "Dancing Queen", artist: "ABBA", addedBy: "Tobias Richter", votes: 30, category: "party" },
  { id: "8", title: "All of Me", artist: "John Legend", addedBy: "Sophie & Alexander", votes: 40, category: "romantic" },
  { id: "9", title: "September", artist: "Earth, Wind & Fire", addedBy: "Paul Bauer", votes: 33, category: "party" },
  { id: "10", title: "I Gotta Feeling", artist: "Black Eyed Peas", addedBy: "Jan Schmidt", votes: 27, category: "party" },
];

// Guestbook
export const guestbookEntries = [
  { id: "1", name: "Maria & Thomas Müller", message: "Wir freuen uns so sehr auf euren großen Tag! Ihr seid das schönste Paar und habt all das Glück der Welt verdient. 💕", date: "2025-04-15", emoji: "💕" },
  { id: "2", name: "Paul Bauer", message: "Bester Freund, bester Bräutigam! Ich bin so stolz, euer Trauzeuge sein zu dürfen. Auf euch beiden! 🥂", date: "2025-04-12", emoji: "🥂" },
  { id: "3", name: "Anna & David Fischer", message: "Liebe Sophie, lieber Alex – wir wünschen euch von ganzem Herzen alles Gute. Genießt jeden Moment! 🌟", date: "2025-04-10", emoji: "🌟" },
  { id: "4", name: "Jan Schmidt", message: "Ich hab schon die Tanzschuhe poliert! Freue mich riesig auf eine unvergessliche Party mit euch. 🕺", date: "2025-04-08", emoji: "🕺" },
];

// Menu for guest portal
export const menuCourses = [
  { course: "Amuse-Bouche", title: "Trüffel-Crème-Brûlée", description: "Mit Parmesan-Chip und Microgreens", icon: "🍽️" },
  { course: "Vorspeise", title: "Carpaccio vom Rind", description: "Mit Rucola, Pinienkerne und Parmesanspäne. Vegetarisch: Burrata mit ofengetrockneten Tomaten", icon: "🥗" },
  { course: "Zwischengang", title: "Waldpilz-Velouté", description: "Mit Trüffelöl und knusprigem Ciabatta", icon: "🍵" },
  { course: "Hauptgang", title: "Filet vom Weiderind", description: "Rosa gebraten mit Rotweinjus, Süßkartoffelpüree und glasiertem Gemüse. Alternativ: Lachs oder veganes Risotto", icon: "🥩" },
  { course: "Dessert", title: "Trio vom Schokoladentraum", description: "Mousse au Chocolat, Lava Cake und Praline mit Himbeersorbet", icon: "🍫" },
];

// Invitation templates
export const invitationTemplates = [
  { id: "1", name: "Elegant Classic", preview: "Klassisch elegant mit goldenen Akzenten", style: "classic" },
  { id: "2", name: "Modern Minimal", preview: "Minimalistisch und modern", style: "modern" },
  { id: "3", name: "Garden Romance", preview: "Romantisch mit floralen Elementen", style: "garden" },
];
