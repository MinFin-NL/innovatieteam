// Products built by the Innovatieteam. `url` is pinged for a live status; a
// null `url` means the tool is not yet reachable ("Onbekend").
// URLs are injected at build time via VITE_URL_* env vars (Azure DevOps secret group: innovatieteam-secrets).

// Normalise a build-time env var into a usable URL or null. Azure DevOps leaves
// undefined pipeline variables as the literal unsubstituted string "$(NAME)",
// which is truthy — so `env || null` is not enough. We only accept absolute
// http(s) URLs; anything else (empty, whitespace, "$(...)" placeholder) is null
// so the tool shows as "Onbekend" instead of falsely pinging the app origin.
function cleanUrl(value) {
  const v = (value || '').trim();
  if (!/^https?:\/\//i.test(v)) return null;
  return v;
}

export const PRODUCTS = [
  {
    id: 'findocs',
    name: 'FinDocs',
    description: 'AI-ondersteunde hulp bij het invullen van formulieren en aanvragen.',
    url: cleanUrl(import.meta.env.VITE_URL_FINDOCS),
    icon: 'icons/findocs_logo.svg',
    category: 'Formulieren',
  },
  {
    id: 'kasvisie',
    name: 'Kasvisie',
    description: 'Inzicht in kasstromen en financiële prognoses voor de overheid.',
    url: cleanUrl(import.meta.env.VITE_URL_KASVISIE),
    icon: 'icons/kasvisie_logo.svg',
    category: 'Financiën',
  },
  {
    id: 'innovatieplatform',
    name: 'Innovatieplatform',
    description: 'Centraal platform voor het delen en beheren van innovatie-ideeën.',
    url: cleanUrl(import.meta.env.VITE_URL_INNOVATIEPLATFORM),
    icon: 'icons/innovatieplatform_logo.svg',
    category: 'Platform',
  },
  {
    id: 'beleidsassistent',
    name: 'Beleids Evaluaties Agent',
    description: 'AI-assistent die beleidsmakers ondersteunt bij analyses en adviezen.',
    url: cleanUrl(import.meta.env.VITE_URL_BELEIDSASSISTENT),
    icon: 'icons/beleidsassistent_logo.svg',
    category: 'Beleid',
  },
  {
    id: 'finchat',
    name: 'FinChat',
    description: 'Chatbot voor financiële vragen binnen het Ministerie van Financiën.',
    url: cleanUrl(import.meta.env.VITE_URL_FINCHAT),
    icon: 'icons/finchat_logo.svg',
    category: 'Communicatie',
  },
  {
    id: 'finchat-acceptatie',
    name: 'FinChat - Acceptatie',
    description: 'Testomgeving van FinChat',
    url: cleanUrl(import.meta.env.VITE_URL_FINCHAT_ACCEPTATIE),
    icon: 'icons/finchat_acceptatie_logo.svg',
    category: 'Communicatie',
  },
  {
    id: 'finchat-innovatie',
    name: 'FinChat - Innovatie',
    description: 'Experimentele versie van FinChat',
    url: cleanUrl(import.meta.env.VITE_URL_FINCHAT_INNOVATIE),
    icon: 'icons/finchat_innovatie_logo.svg',
    category: 'Communicatie',
  },
  {
    id: 'kamerdebatai',
    name: 'KamerDebatAI',
    description: 'Live transcriptie en vraagextractie tijdens Kamerdebatten.',
    url: cleanUrl(import.meta.env.VITE_URL_KAMERDEBATAI),
    icon: 'icons/kamerdebatai_logo.svg',
    category: 'Communicatie',
  },
  {
    id: 'normnet',
    name: 'NormNet',
    description: 'Auditeerbare procesautomatisering: een petrinet bewaakt de processtappen, logische normen bewaken wat is toegestaan.',
    url: cleanUrl(import.meta.env.VITE_URL_NORMNET),
    icon: 'icons/normnet_logo.svg',
    category: 'Procesautomatisering',
  },
  {
    id: 'note',
    name: 'Note',
    description: 'AI-ondersteunde notities voor het snel vastleggen en structureren van informatie.',
    url: cleanUrl(import.meta.env.VITE_URL_NOTE),
    icon: 'icons/note_logo.svg',
    category: 'Productiviteit',
  },
];

export const TEAM = [
  {
    id: 'laurens',
    name: 'Laurens Weijs',
    role: 'AI Engineer',
    photo: 'people/laurens_weijs.jpg',
  },
  {
    id: 'mathijs',
    name: 'Mathijs Scholten',
    role: 'Innovatiemanager AI',
    photo: 'people/mathijs_scholten.jpg',
  },
  {
    id: 'thomas',
    name: 'Thomas van der Meer',
    role: 'Innovatiemanager Quantum',
    photo: 'people/thomas_van_der_meer.png',
  },
  {
    id: 'britt',
    name: 'Britt Hegge',
    role: 'Innovatiemanager Post Quantum Cryptografie',
    photo: 'people/britt_hegge.jpg',
  },
  {
    id: 'jop',
    name: 'Jop Slaats',
    role: 'Innovatiemanager',
    photo: 'people/jop_slaats.jpg',
  },
  {
    id: 'yasmine',
    name: 'Yasmine Uaali',
    role: 'UI/UX Designer',
    photo: 'people/yasmine_uaali.jpg',
  },
];

// De drie innovatieservices die het team aanbiedt aan directies en teams.
export const SERVICES = [
  {
    id: 'innovatieverkenning',
    name: 'Innovatieverkenning',
    icon: 'binoculars',
    description:
      'Innovatieverkenning helpt directies en teams om grip te krijgen op nieuwe technologieën en ontwikkelingen, en te bepalen of en hoe deze relevant zijn voor hun werk en voor collega’s binnen Financiën.',
    wanneer: [
      'Er is een beleids- of uitvoeringsvraagstuk, maar nog geen duidelijke oplossingsrichting',
      'Nieuwe technologie (bijv. generatieve AI of low-code) roept kansen én vragen op',
      'Je wilt voorkomen dat je investeert in iets dat niet aansluit op de organisatie',
    ],
    watWijDoen: [
      'Markt- en technologieverkenning (o.a. Tech Radar, deep dives)',
      'Vertalen van technologische ontwikkelingen naar concrete kansen voor Financiën',
      'Identificeren van mogelijke use cases voor collega’s',
      'Delen van inzichten via presentaties en korte rapportages',
    ],
    opbrengst: [
      'Duidelijk antwoord op de vraag: is dit relevant voor onze collega’s?',
      'Een gedeeld beeld van kansen en risico’s',
      'Onderbouwde input voor een vervolgstap (of juist een bewuste stop)',
    ],
    voorbeeld: 'Quantum Computing',
  },
  {
    id: 'waarde-ontwerp',
    name: 'Waarde ontwerp',
    icon: 'lightbulb',
    description:
      'Waarde ontwerp met de klant is een intensieve samenwerking waarin we samen met directies en teams hun processen, knelpunten en behoeften scherp in kaart brengen, en deze vertalen naar kansrijke oplossingsrichtingen. Dit gaat nadrukkelijk niet over technologie, maar over waarde voor collega’s.',
    wanneer: [
      'Het probleem is nog niet scherp genoeg',
      'Er zijn meerdere knelpunten of belangen',
      'Er is behoefte aan gezamenlijke denkkracht voordat er gebouwd wordt',
    ],
    watWijDoen: [
      'In kaart brengen van processen, pijnpunten en gebruikersbehoeften',
      'Gesprekken en werksessies met beleidsmedewerkers en stakeholders',
      'Vertalen van inzichten naar duidelijke probleemdefinities en oplossingsrichtingen',
      'Toetsen van overlap in behoeften tussen verschillende klanten/directies',
    ],
    opbrengst: [
      'Een scherp en gedeeld klantprobleem',
      'Heldere keuzes: welke oplossing levert echt waarde?',
      'Een stevige basis voor een Proof of Concept of Value',
    ],
    voorbeeld: null,
  },
  {
    id: 'concept-lab',
    name: 'Concept Lab',
    icon: 'sparkles',
    description:
      'Het Concept Lab is de omgeving waarin ideeën snel, gecontroleerd en verantwoord worden getest, voordat ze uitgroeien tot een dienst voor de organisatie.',
    wanneer: [
      'Er is een concreet idee of oplossingsrichting',
      'Je wilt weten of iets technisch haalbaar én waardevol is',
      'Er is behoefte aan bewijs vóór opschaling of investering',
    ],
    watWijDoen: [
      'Ontwikkelen van Proof of Concept (werkt het technisch?)',
      'Uitvoeren van Proof of Value (levert het waarde op voor collega’s?)',
      'Opzetten en begeleiden van pilots in de praktijk',
      'Beleids-, privacy- en securitytoets (CISO, CPO, EA) vanaf de start',
    ],
    opbrengst: [
      'Bewezen inzicht in haalbaarheid, waarde en randvoorwaarden',
      'Minder risico’s en verrassingen bij opschaling',
      'Een duidelijke basis voor besluitvorming: doorgaan naar dienst of stoppen',
    ],
    voorbeeld: 'FinChat',
  },
];

// Wat de klant zelf meebrengt; geldt voor alle drie de services.
export const SERVICE_INBRENG = {
  vereist: ['Kaders', 'Data', 'Eigenaarschap', 'Budget'],
  optioneel: ['Capaciteit'],
};

// De vaste route van idee naar dienst. Elke fase beantwoordt één vraag en is een
// go/no-go moment: pas als het antwoord er is gaan we door, of stoppen we bewust.
export const FASES = [
  {
    id: 'poc',
    stap: 1,
    name: 'Proof of Concept',
    afkorting: 'PoC',
    vraag: 'Werkt het technisch?',
    description:
      'Het kleinst mogelijke bewijs dat de techniek doet wat we hopen. Nog geen product, wel een werkend voorbeeld dat de grootste onzekerheid wegneemt.',
    activiteiten: [
      'De kleinste werkende opzet bouwen met de kerntechniek',
      'De grootste technische risico’s vroeg uitproberen',
      'Data, privacy, security en architectuur aftasten',
      'Besluiten: door naar de Proof of Value, of stoppen',
    ],
  },
  {
    id: 'pov',
    stap: 2,
    name: 'Proof of Value',
    afkorting: 'PoV',
    vraag: 'Levert het waarde op?',
    description:
      'We bouwen een Minimum Viable Product (MVP): de kleinste versie die een collega écht kan gebruiken. Daarmee meten we de waarde met vooraf afgesproken criteria, niet op gevoel.',
    activiteiten: [
      'Een MVP bouwen dat collega’s in hun eigen werk gebruiken',
      'Vooraf criteria afspreken en de resultaten meten',
      'Feedback ophalen bij gebruikers en het MVP bijsturen',
      'Een businesscase opstellen voor het besluit over opschalen',
    ],
  },
  {
    id: 'pilot',
    stap: 3,
    name: 'Pilot',
    afkorting: 'Pilot',
    vraag: 'Kan het opschalen?',
    description:
      'We bouwen het MVP uit tot een productierijp systeem en draaien dat mee in de praktijk bij een directie of team. Hier blijkt of het ook buiten het Concept Lab overeind blijft.',
    activiteiten: [
      'Het MVP uitbouwen tot een productierijp systeem',
      'Meedraaien in de praktijk bij een directie of team',
      'Beheer, ondersteuning en opleiding inrichten',
      'Formeel toetsen met CISO, CPO en EA en overdragen',
    ],
  },
];

// Hoe we het werk organiseren: agile, in korte cycli, samen met de klant.
export const AGILE_PRINCIPES = [
  'Korte sprints',
  'Werkend product boven documentatie',
  'Klant aan tafel',
  'Continu leren en verbeteren',
  'Transparant bord',
  'Bewust stoppen mag',
];

// Ons Kanban-bord in Azure DevOps; URL via pipelinevariabele URL_DEVOPS_BOARD.
export const KANBAN_BOARD = {
  url: cleanUrl(import.meta.env.VITE_URL_DEVOPS_BOARD),
};
