// Products built by the Innovatieteam. `url` is pinged for a live status; a
// null `url` means the tool is not yet reachable ("Binnenkort").
// URLs are injected at build time via VITE_URL_* env vars (Azure DevOps secret group: innovatieteam-secrets).
export const PRODUCTS = [
  {
    id: 'findocs',
    name: 'FinDocs',
    description: 'AI-ondersteunde hulp bij het invullen van formulieren en aanvragen.',
    url: import.meta.env.VITE_URL_FINDOCS || null,
    icon: 'icons/findocs_logo.svg',
    category: 'Formulieren',
  },
  {
    id: 'opstelhulp',
    name: 'Opstelhulp',
    description: 'Hulp bij het opstellen van brieven, nota\'s en andere documenten.',
    url: import.meta.env.VITE_URL_OPSTELHULP || null,
    icon: 'icons/opstelhulp_logo.svg',
    category: 'Documenten',
  },
  {
    id: 'kasvisie',
    name: 'Kasvisie',
    description: 'Inzicht in kasstromen en financiële prognoses voor de overheid.',
    url: import.meta.env.VITE_URL_KASVISIE || null,
    icon: 'icons/kasvisie_logo.svg',
    category: 'Financiën',
  },
  {
    id: 'innovatieplatform',
    name: 'Innovatieplatform',
    description: 'Centraal platform voor het delen en beheren van innovatie-ideeën.',
    url: import.meta.env.VITE_URL_INNOVATIEPLATFORM || null,
    icon: 'icons/innovatieplatform_logo.svg',
    category: 'Platform',
  },
  {
    id: 'beleidsassistent',
    name: 'Beleids Evaluaties Agent',
    description: 'AI-assistent die beleidsmakers ondersteunt bij analyses en adviezen.',
    url: import.meta.env.VITE_URL_BELEIDSASSISTENT || null,
    icon: 'icons/beleidsassistent_logo.svg',
    category: 'Beleid',
  },
  {
    id: 'finchat',
    name: 'FinChat',
    description: 'Chatbot voor financiële vragen binnen het Ministerie van Financiën.',
    url: import.meta.env.VITE_URL_FINCHAT || null,
    icon: 'icons/finchat_logo.svg',
    category: 'Communicatie',
  },
  {
    id: 'annotatietool',
    name: 'Annotatietool',
    description: 'Hulpmiddel voor het annoteren en labelen van documenten en data.',
    url: null,
    icon: 'icons/annotatietool_logo.svg',
    category: 'Data',
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
    role: 'Innovatie Manager AI',
    photo: 'people/mathijs_scholten.jpg',
  },
  {
    id: 'thomas',
    name: 'Thomas van der Meer',
    role: 'Innovatie Manager Quantum',
    photo: 'people/thomas_van_der_meer.png',
  },
  {
    id: 'britt',
    name: 'Britt Hegge',
    role: 'Innovatie Manager Post Quantum Cryptografie',
    photo: 'people/britt_hegge.jpg',
  },
  {
    id: 'job',
    name: 'Job Slaats',
    role: 'Innovatie Manager',
    photo: 'people/job_slaats.jpg',
  },
];
