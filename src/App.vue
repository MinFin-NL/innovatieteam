<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

import {
  AGILE_PRINCIPES,
  EXPERIMENT_STAPPEN,
  FASES,
  KANBAN_BOARD,
  PRODUCTS,
  RETIRED_PRODUCTS,
  SERVICES,
  SERVICE_INBRENG,
  TEAM,
} from './data.js';
import { pingUrl } from './ping.js';
import PhaseFlow from './components/PhaseFlow.vue';
import PhaseZoom from './components/PhaseZoom.vue';
import ProductCard from './components/ProductCard.vue';
import ProductGraveyard from './components/ProductGraveyard.vue';
import ServiceCard from './components/ServiceCard.vue';
import TeamMember from './components/TeamMember.vue';

const EXPERIMENT_FASE = FASES.find((fase) => fase.id === 'experimenteren');

const TABS = [
  { id: 'producten', label: 'Producten', icon: 'square-grid-2x2' },
  { id: 'services', label: 'Services', icon: 'handshake' },
  { id: 'werkwijze', label: 'Onze werkwijze', icon: 'arrow-clockwise' },
  { id: 'team', label: 'Wie zijn wij', icon: 'person-2' },
];

// The active tab lives in ?tab= so a refresh, the back button and a shared link
// all land on the same tab. A query parameter rather than a hash, because the
// skip link below already navigates to #<section-id>.
function tabFromUrl() {
  const tab = new URLSearchParams(window.location.search).get('tab');
  return TABS.some((t) => t.id === tab) ? tab : TABS[0].id;
}

const activeSection = ref(tabFromUrl());

function selectTab(id) {
  if (id === activeSection.value) return;
  activeSection.value = id;
  const url = new URL(window.location.href);
  url.searchParams.set('tab', id);
  url.hash = '';
  window.history.pushState(null, '', url);
}

function onPopState() {
  activeSection.value = tabFromUrl();
}

const statuses = ref(
  Object.fromEntries(PRODUCTS.map((p) => [p.id, p.url ? 'checking' : 'unknown'])),
);
const checking = ref(false);

const totalPingable = PRODUCTS.filter((p) => p.url).length;
const onlineCount = computed(
  () => Object.values(statuses.value).filter((s) => s === 'up').length,
);
const firstCheckDone = computed(
  () => !Object.values(statuses.value).includes('checking'),
);
const onlineBadge = computed(() => {
  if (!firstCheckDone.value) return { color: 'neutral', text: 'Status controleren…' };
  return {
    color: onlineCount.value === totalPingable ? 'success' : 'warning',
    text: `${onlineCount.value} van ${totalPingable} tools online`,
  };
});

async function checkHealth() {
  if (checking.value) return;
  checking.value = true;
  try {
    const pings = PRODUCTS.map(async (p) => [p.id, await pingUrl(p.url)]);
    statuses.value = Object.fromEntries(await Promise.all(pings));
  } finally {
    checking.value = false;
  }
}

let interval;
onMounted(() => {
  window.addEventListener('popstate', onPopState);
  checkHealth();
  // A background tab skips its turn; the next visible tick catches up.
  interval = setInterval(() => {
    if (!document.hidden) checkHealth();
  }, 60000);
});
onUnmounted(() => {
  window.removeEventListener('popstate', onPopState);
  clearInterval(interval);
});
</script>

<template>
  <nldd-app-view>
    <nldd-page>
      <!-- First in the header, so it is the first thing a keyboard user reaches. -->
      <nldd-skip-link
        slot="header"
        :href="`#${activeSection}`"
        text="Direct naar de inhoud"
      ></nldd-skip-link>

      <nldd-top-navigation-bar
        slot="header"
        logo-title="Ministerie van Financiën"
        website-title="Innovatieteam"
      >
        <nldd-menu-bar slot="global" accessible-label="Secties">
          <nldd-menu-bar-item
            v-for="tab in TABS"
            :key="tab.id"
            :text="tab.label"
            :icon="tab.icon"
            :current="activeSection === tab.id"
            @select="selectTab(tab.id)"
          ></nldd-menu-bar-item>
        </nldd-menu-bar>
      </nldd-top-navigation-bar>

      <nldd-simple-section
        id="producten"
        padding-bottom="24"
        v-show="activeSection === 'producten'"
      >
        <nldd-title size="1">
          <h1>Wij bouwen AI-producten voor het Ministerie van Financiën</h1>
          <span slot="subtitle">
            We proberen nieuwe technologie uit voor beleid en uitvoering. Wat werkt,
            bouwen we uit tot een tool die collega's gebruiken.
          </span>
        </nldd-title>
        <template v-if="totalPingable">
          <nldd-spacer size="16"></nldd-spacer>
          <nldd-container layout="wrap" gap="8">
            <nldd-badge :color="onlineBadge.color" :text="onlineBadge.text"></nldd-badge>
          </nldd-container>
        </template>
      </nldd-simple-section>

      <nldd-simple-section padding-top="8" v-show="activeSection === 'producten'">
        <nldd-title slot="header" size="3">
          <h2>Onze producten</h2>
          <nldd-button
            slot="end"
            variant="neutral-tinted"
            size="sm"
            start-icon="arrow-clockwise"
            text="Vernieuwen"
            accessible-label="Status van alle tools vernieuwen"
            :loading="checking"
            @click="checkHealth"
          ></nldd-button>
        </nldd-title>

        <nldd-collection layout="grid" item-width="280px" :max-items="PRODUCTS.length">
          <ProductCard
            v-for="product in PRODUCTS"
            :key="product.id"
            :product="product"
            :status="statuses[product.id]"
          />
        </nldd-collection>
      </nldd-simple-section>

      <nldd-simple-section
        v-if="RETIRED_PRODUCTS.length"
        v-show="activeSection === 'producten'"
        padding-top="0"
      >
        <ProductGraveyard :products="RETIRED_PRODUCTS" />
      </nldd-simple-section>

      <nldd-simple-section id="services" v-show="activeSection === 'services'">
        <nldd-title slot="header" size="1">
          <h1>Onze services</h1>
          <span slot="subtitle">Wat we voor directies en teams kunnen doen.</span>
        </nldd-title>

        <nldd-rich-text>
          <p>
            Het innovatieteam helpt directies sneller besluiten of een idee relevant
            is, waarde oplevert en kan uitgroeien tot een dienst voor collega's. Je
            kunt elke service apart afnemen, maar ze sluiten ook op elkaar aan: eerst
            verkennen, dan het probleem scherp krijgen, dan toetsen in de praktijk.
          </p>
        </nldd-rich-text>

        <nldd-spacer size="24"></nldd-spacer>

        <nldd-container gap="24">
          <ServiceCard
            v-for="service in SERVICES"
            :key="service.id"
            :service="service"
          />
        </nldd-container>

        <nldd-spacer size="32"></nldd-spacer>

        <nldd-card>
          <nldd-container padding="24" gap="8">
            <nldd-title size="3">
              <span slot="overline">Samenwerking</span>
              <h3>Wat breng jij mee?</h3>
            </nldd-title>
            <nldd-text color="secondary">Voor elke service hebben we dit van je nodig:</nldd-text>
            <nldd-container layout="wrap" gap="8">
              <nldd-tag
                v-for="item in SERVICE_INBRENG.vereist"
                :key="item"
                :text="item"
              ></nldd-tag>
            </nldd-container>
            <nldd-text size="sm" color="secondary">En eventueel:</nldd-text>
            <nldd-container layout="wrap" gap="8">
              <nldd-tag
                v-for="item in SERVICE_INBRENG.optioneel"
                :key="item"
                :text="item"
              ></nldd-tag>
            </nldd-container>
          </nldd-container>
        </nldd-card>
      </nldd-simple-section>

      <nldd-simple-section id="werkwijze" v-show="activeSection === 'werkwijze'">
        <nldd-title slot="header" size="1">
          <h1>Onze werkwijze</h1>
          <span slot="subtitle">
            Een idee gaat door drie fasen voordat het een dienst wordt. Na elke fase
            besluiten we of we doorgaan of stoppen.
          </span>
          <nldd-button
            v-if="KANBAN_BOARD.url"
            slot="end"
            :href="KANBAN_BOARD.url"
            target="_blank"
            variant="accent-filled"
            size="sm"
            text="Kanban-bord"
            end-icon="square-arrow-right-top"
            accessible-label="Ons Kanban-bord in Azure DevOps openen"
          ></nldd-button>
          <nldd-button
            v-else
            slot="end"
            variant="neutral-tinted"
            size="sm"
            disabled
            text="Kanban-bord"
            accessible-label="Kanban-bord nog niet beschikbaar"
          ></nldd-button>
        </nldd-title>

        <!-- gap="0": the zoom panel has to touch the Experimenteren card, and
             nldd-simple-section would otherwise put space between them. -->
        <nldd-container gap="0">
          <PhaseFlow :fases="FASES" label="Fase" variant="fase" />
          <PhaseZoom :fases="FASES" :fase="EXPERIMENT_FASE" :stappen="EXPERIMENT_STAPPEN">
            Elke stap beantwoordt één vraag en eindigt met een go/no-go.
          </PhaseZoom>
        </nldd-container>

        <nldd-spacer size="32"></nldd-spacer>

        <nldd-card>
          <nldd-container padding="24" gap="8">
            <nldd-title size="3">
              <span slot="overline">Binnen elke fase</span>
              <h3>Wij werken agile</h3>
            </nldd-title>
            <nldd-text size="sm" color="secondary">
              We werken in korte sprints. Elke sprint levert iets op dat werkt, we
              vragen de gebruikers wat ze ervan vinden en passen de volgende sprint
              daarop aan. De klant zit bij ons aan tafel.
            </nldd-text>
            <nldd-container layout="wrap" gap="8">
              <nldd-tag
                v-for="principe in AGILE_PRINCIPES"
                :key="principe"
                :text="principe"
              ></nldd-tag>
            </nldd-container>
          </nldd-container>
        </nldd-card>
      </nldd-simple-section>

      <nldd-simple-section id="team" v-show="activeSection === 'team'">
        <nldd-title slot="header" size="1">
          <h1>Wie zijn wij</h1>
          <span slot="subtitle">Het innovatieteam van het Ministerie van Financiën</span>
        </nldd-title>

        <nldd-card>
          <nldd-container padding="24" gap="8">
            <nldd-title size="3">
              <span slot="overline">Onze missie</span>
              <h3>
                Wij versterken het innovatievermogen van het Ministerie van Financiën
              </h3>
            </nldd-title>
            <nldd-rich-text>
              <p>
                Door innovatie doelgericht en wendbaar te organiseren, ondersteunen wij
                het beleidsdepartement van het Ministerie van Financiën bij het
                ontwikkelen, testen en toepassen van nieuwe producten en diensten. We
                leggen een solide basis voor innovatie en bouwen deze agile uit via
                continu leren en verbeteren. Dit doen we door aandacht te geven aan
                innovatiecultuur, structuur, middelen en planning, zodat kansrijke
                initiatieven effectief bijdragen aan waarde voor burger en klant.
              </p>
            </nldd-rich-text>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="32"></nldd-spacer>

        <nldd-title size="3">
          <h3>Teamleden</h3>
        </nldd-title>
        <nldd-spacer size="16"></nldd-spacer>

        <nldd-collection layout="grid" item-width="240px" :max-items="TEAM.length">
          <TeamMember v-for="member in TEAM" :key="member.id" :member="member" />
        </nldd-collection>
      </nldd-simple-section>

      <nldd-page-footer>
        <nldd-container padding="24" gap="8">
          <nldd-text>Innovatieteam, Ministerie van Financiën</nldd-text>
          <nldd-text size="sm" color="secondary">
            De status van de tools wordt elke minuut ververst.
          </nldd-text>
        </nldd-container>
      </nldd-page-footer>
    </nldd-page>
  </nldd-app-view>
</template>
