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
];
