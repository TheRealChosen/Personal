/* ─────────────────────────────────────────────────────────
   Editorial copy & data — Banket & Koffiehuus Hoekman
   Dutch voice, warm & unhurried. Never corporate.
   ───────────────────────────────────────────────────────── */

export const brand = {
  name: "Hoekman",
  full: "Banket & Koffiehuus Hoekman",
  line: "Sinds jaar en dag.",
  established: "1937",
  region: "Raalte — Salland — Nederland",
};

export const address = {
  street: "Grotestraat 78",
  postcode: "8102 CD Raalte",
  country: "Nederland",
  phone: "0572 351608",
  phoneHref: "tel:+31572351608",
  mapsQuery: "Grotestraat 78, 8102 CD Raalte, Nederland",
  mapsEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=6.2735%2C52.3830%2C6.2835%2C52.3880&layer=mapnik&marker=52.3855%2C6.2785",
};

export const hours = [
  { day: "Maandag", time: "Gesloten", closed: true },
  { day: "Dinsdag", time: "08:30 — 17:30" },
  { day: "Woensdag", time: "08:30 — 17:30" },
  { day: "Donderdag", time: "08:30 — 17:30" },
  { day: "Vrijdag", time: "08:30 — 18:00" },
  { day: "Zaterdag", time: "08:30 — 18:00" },
  { day: "Zondag", time: "10:00 — 17:00" },
];

/* Hero */
export const hero = {
  eyebrow: "Raalte · Salland · Theeweg van Nederland",
  titleLines: ["Banket &", "Koffiehuus"],
  titleAccent: "Hoekman.",
  caption:
    "Drie generaties, één adres. Een kopje koffie dat smaakt zoals vroeger — en een glimlach die blijft hangen.",
  ctaPrimary: { label: "Kom langs", href: "#bezoek" },
  ctaSecondary: { label: "Bekijk de kaart", href: "#menukaart" },
};

/* Voorgeschiedenis / Our Story */
export const story = {
  eyebrow: "Ons verhaal",
  heading: "Al drie generaties\ngewoon Hoekman.",
  paragraphs: [
    "Het begon in 1937, toen grootvader Hendrik op Grotestraat 78 een tinkje opende waar reizigers tussen Zwolle en Deventer een kom koffie kregen. Niets bijzonders, maar wel goed.",
    "Inmiddels staat de derde generatie in de zaak. Het meel komt nog steeds van de molen aan de Overijsselse Vecht, de boter van de boer om de hoek, en de taarten worden zoals ze altijd werden — met de hand, met aandacht, en met geduld.",
    "Wij zijn geen koffieketen. Wij zijn een koffiehuus. En dat proef je.",
  ],
  quote: {
    text: "We doen hier niet aan haast. Een goede espresso vraagt zesentwintig seconden, een goed gesprek iets langer.",
    attribution: "— Marleen Hoekman, derde generatie",
  },
};

/* Menu data */
export type MenuItem = {
  name: string;
  detail: string;
  price: string;
  mark?: "signature" | "season" | "homemade";
};

export type MenuCategory = {
  key: string;
  label: string;
  blurb: string;
  image: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    key: "koffie",
    label: "Koffie",
    blurb:
      "Donker gebrand, fair trade, en met de hand gezet — zoals het hoort. Onze espresso is een familierecept.",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
    items: [
      {
        name: "Espresso Hoekman",
        detail: "Onze single origin uit de Colombiaanse Huila. Kort en krachtig.",
        price: "€ 3,20",
        mark: "signature",
      },
      {
        name: "Cappuccino",
        detail: "Espresso, gestoomde melk, een klein hart van schuim.",
        price: "€ 3,60",
      },
      {
        name: "Café Latte",
        detail: "Langer, romiger. Met een klein kunstwerkje in de kop.",
        price: "€ 3,80",
      },
      {
        name: "Flat White",
        detail: "Dubbele espresso, kleine hoeveelheid fluweelzachte melk.",
        price: "€ 4,00",
      },
      {
        name: "Filter — Ethiopia Yirgacheffe",
        detail: "Bloemig en fruitig. Met de hand geschonken, tafel na tafel.",
        price: "€ 3,90",
        mark: "season",
      },
      {
        name: "Verkeerd",
        detail: "Half koffie, half warme melk. Zoals opa het dronk.",
        price: "€ 3,40",
      },
    ],
  },
  {
    key: "thee",
    label: "Thee",
    blurb:
      "Kleine blaadjes, groot verschil. Onze thee komt van een theehuis in Utrecht dat wij al dertig jaar kennen.",
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=1400&q=80",
    items: [
      {
        name: "Sallandse Kruidenthee",
        detail: "Munthe, kamille en citroenmelisse uit eigen tuin.",
        price: "€ 3,20",
        mark: "homemade",
      },
      {
        name: "Earl Grey Superior",
        detail: "Met calabriese bergamot — fris, niet te zoet.",
        price: "€ 3,00",
      },
      {
        name: "Japanse Sencha",
        detail: "Zachte, grassige groene thee uit Uji.",
        price: "€ 3,40",
      },
      {
        name: "Rooibos Vanille",
        detail: "Zoet en zacht. Met een kleine lepel honing van de imker.",
        price: "€ 3,20",
      },
      {
        name: "Verse Muntthee",
        detail: "Verse munt, kokend water, even wachten.",
        price: "€ 3,50",
        mark: "homemade",
      },
    ],
  },
  {
    key: "lunch",
    label: "Lunch",
    blurb:
      "Tussen 11:30 en 15:00 serveren wij een uitgebreide lunchkaart. Eerlijke broodjes, soepen van het seizoen, en salades die smaken naar de moestuin.",
    image:
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1400&q=80",
    items: [
      {
        name: "Boerenomelet",
        detail: "Drie eieren van de buurman, met spek, kaas en bieslook.",
        price: "€ 11,50",
      },
      {
        name: "Carpaccio van Restrain",
        detail: "Dun gesneden runderhaas, oude kaas, pitten, truffelmayonaise.",
        price: "€ 13,50",
      },
      {
        name: "Uitsmijter Hoekman",
        detail: "Drie spiegeleieren op oud brood, met ham en jonge kaas.",
        price: "€ 10,50",
      },
      {
        name: "Soep van het Seizoen",
        detail: "Wisselend — vraag aan de bediening. Altijd huisgemaakt.",
        price: "€ 8,50",
        mark: "season",
      },
      {
        name: "Geitenkaas uit de Biesland",
        detail: "Geitenkaas uit de polder, gegrilde vijg, walnoten, honing.",
        price: "€ 12,50",
        mark: "homemade",
      },
      {
        name: "Tosti Oud-Hollands",
        detail: "Oud brood, oude kaas, ham van slagerij ten Have.",
        price: "€ 7,50",
        mark: "signature",
      },
    ],
  },
  {
    key: "gebak",
    label: "Gebak",
    blurb:
      "Onze bakker staat om halfvijf op. Tegen tienen liggen de eerste croissants in de vitrine — warm, krokant en met de hand gevouwen.",
    image:
      "https://images.unsplash.com/photo-1481836561327-6ce4d8d39bdf?auto=format&fit=crop&w=1400&q=80",
    items: [
      {
        name: "Appelgebak van Oma",
        detail: "Met kaneel, rozijnen en een deksel van kruimeldeeg.",
        price: "€ 4,20",
        mark: "signature",
      },
      {
        name: "Slagroom-taart",
        detail: "Luchtig, romig, en groot genoeg om te delen.",
        price: "€ 4,80",
      },
      {
        name: "Notentaart",
        detail: "Hazelnoten, amandel, een klein zoetje honing erdoor.",
        price: "€ 4,50",
      },
      {
        name: "Roomboter-croissant",
        detail: "Voor 11:00 vers uit de oven — krokant en goudbruin.",
        price: "€ 3,20",
        mark: "homemade",
      },
      {
        name: "Chocolate Brownie",
        detail: "Donker, sticky, met een snuf grof zeezout.",
        price: "€ 4,40",
      },
      {
        name: "Banketstaaf",
        detail: "Geheel volgens Hollands recept. Amandelspijs, amandel, ei.",
        price: "€ 3,60",
        mark: "homemade",
      },
    ],
  },
  {
    key: "highTea",
    label: "High Tea",
    blurb:
      "Onze high tea is een klein feest — drie verdiepingen hartig en zoet, met een flesje prosecco voor wie wil.",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1400&q=80",
    items: [
      {
        name: "Hoekman High Tea — Basis",
        detail: "Vijf mini-gebakjes, drie hartige hapjes, onbeperkt thee.",
        price: "€ 24,50",
        mark: "signature",
      },
      {
        name: "Hoekman High Tea — Royale",
        detail: "Met een glas prosecco en een kom huisgemaakte soep vooraf.",
        price: "€ 31,50",
        mark: "signature",
      },
      {
        name: "Kinder High Tea",
        detail: "Kleinere porties, kindvriendelijke smaken, een chocolademelk.",
        price: "€ 14,50",
      },
      {
        name: "Thee & Taart",
        detail: "Een stuk gebak naar keuze, met een pot huisgemaakte thee.",
        price: "€ 9,80",
      },
    ],
  },
];

/* Atmosphere gallery */
export const atmosphere = [
  {
    title: "Het aanrecht in de ochtend",
    span: "tall",
    image:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Onze vitrine",
    span: "wide",
    image:
      "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Koffie, met rust",
    span: "",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "De achterkamer",
    span: "tall",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "De eerste croissant",
    span: "",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Met de hand gevouwen",
    span: "wide",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80",
  },
];

/* Experiences */
export const experiences = [
  {
    n: "01",
    title: "Met de hand gebakken",
    body:
      "Iedere ochtend om halfvijf beginnen de bakkers. Geen mix, geen machine — alleen meel, boter, geduld en een oven die al dertig jaar meeloopt.",
  },
  {
    n: "02",
    title: "Koffie die blijft hangen",
    body:
      "Onze bonen worden in kleine hoeveelheden gebrand door een ambachtelijke branderij in Deventer. Wanneer de bonen op zijn, wachten we liever dan dat we bijbestellen.",
  },
  {
    n: "03",
    title: "Gezeten zoals thuis",
    body:
      "De stoelen zijn oud, de tafels kraken, de gordijnen zijn niet nieuw. Dat is geen toeval — hier moet het aanvoelen alsof je even bij iemand op bezoek bent.",
  },
  {
    n: "04",
    title: "Lokaal en seizoensgebonden",
    body:
      "Onze boter komt van de buurman, onze appels van de boomgaard in Heino, en onze kruiden plukken we zelf. Seizoenen proeven — dat is de bedoeling.",
  },
];

/* Marquee ribbon */
export const ribbonLines = [
  "Banket & Koffiehuus Hoekman",
  "Sinds 1937",
  "Grotestraat 78, Raalte",
  "Koffie die blijft hangen",
  "Met de hand gebakken",
  "Open van dinsdag t/m zondag",
];
