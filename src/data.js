// Products built by the Innovatieteam. `url` is pinged for a live status; a
// null `url` shows the tool as "Onbekend". URLs come in at build time through
// the VITE_URL_* variables (Azure DevOps variable group innovatieteam-secrets).
// Everything VITE_* ends up in the public JS bundle, so it is not a secret.

// Azure DevOps passes an undefined pipeline variable through as the literal
// string "$(NAME)", so `env || null` is not enough. Only absolute http(s) URLs
// are kept; anything else becomes null instead of pinging the app's own origin.
function cleanUrl(value) {
  const v = (value || '').trim();
  if (!/^https?:\/\//i.test(v)) return null;
  return v;
}

export const PRODUCTS = [
  {
    id: 'findocs',
    name: 'FinDocs',
    description: 'Helpt met AI bij het invullen van formulieren en aanvragen.',
    url: cleanUrl(import.meta.env.VITE_URL_FINDOCS),
    icon: 'icons/findocs_logo.svg',
  },
  {
    id: 'kasvisie',
    name: 'Kasvisie',
    description: 'Maakt kasstromen en financiële prognoses van de overheid inzichtelijk.',
    url: cleanUrl(import.meta.env.VITE_URL_KASVISIE),
    icon: 'icons/kasvisie_logo.svg',
  },
  {
    id: 'innovatieplatform',
    name: 'Innovatieplatform',
    description: 'Hier delen en beheren we innovatie-ideeën.',
    url: cleanUrl(import.meta.env.VITE_URL_INNOVATIEPLATFORM),
    icon: 'icons/innovatieplatform_logo.svg',
  },
  {
    id: 'beleidsassistent',
    name: 'Beleids Evaluaties Agent',
    description: 'Helpt beleidsmakers met analyses en adviezen.',
    url: cleanUrl(import.meta.env.VITE_URL_BELEIDSASSISTENT),
    icon: 'icons/beleidsassistent_logo.svg',
  },
  {
    id: 'finchat-innovatie',
    name: 'FinChat - Innovatie',
    description: 'Experimentele versie van FinChat.',
    url: cleanUrl(import.meta.env.VITE_URL_FINCHAT_INNOVATIE),
    icon: 'icons/finchat_innovatie_logo.svg',
  },
  {
    id: 'kamerdebatai',
    name: 'KamerDebatAI',
    description: 'Schrijft Kamerdebatten live uit en haalt de gestelde vragen eruit.',
    url: cleanUrl(import.meta.env.VITE_URL_KAMERDEBATAI),
    icon: 'icons/kamerdebatai_logo.svg',
  },
  {
    id: 'normnet',
    name: 'NormNet',
    description: 'Auditeerbare procesautomatisering: een petrinet bewaakt de processtappen, logische normen bewaken wat is toegestaan.',
    url: cleanUrl(import.meta.env.VITE_URL_NORMNET),
    icon: 'icons/normnet_logo.svg',
  },
  {
    id: 'regiekamer',
    name: 'Regiekamer',
    description: 'Demo van een AI-organisatie: stel een organogram van AI-collega’s samen, geef ze taken en kijk hoe ze werken, delegeren en hun budget besteden.',
    url: cleanUrl(import.meta.env.VITE_URL_REGIEKAMER),
    icon: 'icons/regiekamer_logo.svg',
  },
];

// Tools we have stopped. They get no URL and are not pinged; the dashboard shows
// them under "Kerkhof" on the products tab.
export const RETIRED_PRODUCTS = [
  {
    id: 'finchat',
    name: 'FinChat - Productie',
    description: 'Chatbot voor financiële vragen van collega’s bij Financiën.',
    icon: 'icons/finchat_logo.svg',
  },
  {
    id: 'finchat-acceptatie',
    name: 'FinChat - Acceptatie',
    description: 'Testomgeving van FinChat.',
    icon: 'icons/finchat_acceptatie_logo.svg',
  },
  {
    id: 'note',
    name: 'Note',
    description: 'Notities snel vastleggen en ordenen, met hulp van AI.',
    icon: 'icons/note_logo.svg',
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

// De drie innovatieservices voor directies en teams. De teksten komen letterlijk
// uit de deck 'Eerste opzet - Innovatieservices'; pas ze daar samen aan.
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

// De route van idee naar dienst. Elke fase eindigt met een go/no-go.
// `background` markeert Experimenteren, omdat PhaseZoom op die fase inzoomt.
export const FASES = [
  {
    id: 'onderzoeken',
    nummer: 1,
    name: 'Onderzoeken',
    icon: 'binoculars',
    vraag: 'Wat speelt hier, en is het de moeite waard?',
    description:
      'Eerst zoeken we uit wat de technologie kan en brengen we samen met de klant het probleem in kaart. Pas daarna bouwen we iets.',
    activiteiten: [
      'Technologieverkenning',
      'Processen en knelpunten',
      'Gedeeld klantprobleem',
      'Go/no-go op het idee',
    ],
  },
  {
    id: 'experimenteren',
    nummer: 2,
    name: 'Experimenteren',
    icon: 'sparkles',
    background: 'tinted',
    vraag: 'Werkt het, en levert het waarde op?',
    description:
      'In het Concept Lab testen we het idee snel, gecontroleerd en verantwoord. Dat gaat in drie stappen, die hieronder staan.',
    activiteiten: ['Proof of Concept', 'Proof of Value', 'Pilot'],
  },
  {
    id: 'integreren',
    nummer: 3,
    name: 'Integreren',
    icon: 'check-mark-circle',
    vraag: 'Hoe wordt dit staand werk?',
    description:
      'Wat werkt, dragen we over aan een vaste eigenaar in de organisatie. Beheer, support en opleiding horen bij die overdracht.',
    activiteiten: [
      'Overdracht aan de lijn',
      'Beheer en support',
      'CISO-, CPO- en EA-toets',
      'Terugkijken en leren',
    ],
  },
];

// De stappen binnen de fase Experimenteren (het werk in het Concept Lab).
export const EXPERIMENT_STAPPEN = [
  {
    id: 'poc',
    nummer: 1,
    name: 'Proof of Concept',
    afkorting: 'PoC',
    vraag: 'Werkt het technisch?',
    description:
      'Een zo klein mogelijk werkend voorbeeld dat laat zien of de techniek doet wat we hopen. Zo halen we de grootste onzekerheid er vroeg uit.',
    activiteiten: [
      'De kleinste werkende opzet bouwen met de kerntechniek',
      'De grootste technische risico’s vroeg uitproberen',
      'Data, privacy, security en architectuur aftasten',
      'Besluiten: door naar de Proof of Value, of stoppen',
    ],
  },
  {
    id: 'pov',
    nummer: 2,
    name: 'Proof of Value',
    afkorting: 'PoV',
    vraag: 'Levert het waarde op?',
    description:
      'We bouwen een Minimum Viable Product (MVP): de kleinste versie waarmee een collega echt kan werken. Of het waarde oplevert, meten we aan criteria die we vooraf afspreken.',
    activiteiten: [
      'Een MVP bouwen die collega’s in hun eigen werk gebruiken',
      'Vooraf criteria afspreken en de resultaten meten',
      'Feedback ophalen bij gebruikers en het MVP bijsturen',
      'Een businesscase opstellen voor het besluit over opschalen',
    ],
  },
  {
    id: 'pilot',
    nummer: 3,
    name: 'Pilot',
    afkorting: 'Pilot',
    vraag: 'Kan het opschalen?',
    description:
      'We bouwen het MVP uit tot een productierijp systeem en draaien dat mee in de praktijk bij een directie of team. Hier blijkt of het ook buiten het Concept Lab overeind blijft.',
    activiteiten: [
      'Het MVP uitbouwen tot een productierijp systeem',
      'Meedraaien in de praktijk bij een directie of team',
      'Toetsen of het buiten het Concept Lab overeind blijft: beheerlast, kosten, support',
      'Besluiten: overdragen aan de organisatie, of stoppen',
    ],
  },
];

export const AGILE_PRINCIPES = [
  'Korte sprints',
  'Werkend product boven documentatie',
  'Klant aan tafel',
  'Continu leren en verbeteren',
  'Transparant bord',
  'Bewust stoppen mag',
];

// Ons Kanban-bord in Azure DevOps (pipelinevariabele URL_DEVOPS_BOARD).
export const KANBAN_BOARD = {
  url: cleanUrl(import.meta.env.VITE_URL_DEVOPS_BOARD),
};
