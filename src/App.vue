<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

import {
  AGILE_PRINCIPES,
  EXPERIMENT_STAPPEN,
  FASES,
  KANBAN_BOARD,
  PRODUCTS,
  SERVICES,
  SERVICE_INBRENG,
  TEAM,
} from './data.js';
import { pingUrl } from './ping.js';
import PhaseFlow from './components/PhaseFlow.vue';
import PhaseZoom from './components/PhaseZoom.vue';
import ProductCard from './components/ProductCard.vue';
import ServiceCard from './components/ServiceCard.vue';
import TeamMember from './components/TeamMember.vue';

// De fase die we uitvergroten; uit FASES gehaald zodat naam en nummer niet
// hardcoded in de template staan.
const EXPERIMENT_FASE = FASES.find((fase) => fase.id === 'experimenteren');

const TABS = [
  { id: 'producten', label: 'Producten', icon: 'square-grid-2x2' },
  { id: 'services', label: 'Services', icon: 'handshake' },
  { id: 'werkwijze', label: 'Onze werkwijze', icon: 'arrow-clockwise' },
  { id: 'team', label: 'Wie zijn wij', icon: 'person-2' },
];

const statuses = ref(
  Object.fromEntries(PRODUCTS.map((p) => [p.id, p.url ? 'checking' : 'unknown'])),
);
const activeSection = ref('producten');

const onlineCount = computed(
  () => Object.values(statuses.value).filter((s) => s === 'up').length,
);
const totalPingable = PRODUCTS.filter((p) => p.url).length;

async function checkHealth() {
  const pings = PRODUCTS.map(async (p) => {
    if (!p.url) return [p.id, 'unknown'];
    return [p.id, await pingUrl(p.url)];
  });
  statuses.value = Object.fromEntries(await Promise.all(pings));
}

let interval;
onMounted(() => {
  checkHealth();
  interval = setInterval(checkHealth, 60000);
});
onUnmounted(() => clearInterval(interval));

</script>

<template>
  <nldd-app-view>
    <nldd-page>
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
            @select="activeSection = tab.id"
          ></nldd-menu-bar-item>
        </nldd-menu-bar>
      </nldd-top-navigation-bar>

      <nldd-skip-link href="#hoofdinhoud" text="Direct naar de inhoud"></nldd-skip-link>

      <nldd-simple-section
        id="hoofdinhoud"
        padding-bottom="24"
        v-show="activeSection === 'producten'"
      >
        <nldd-title size="1">
          <h1>Wij bouwen AI-producten voor het Ministerie van Financiën</h1>
          <span slot="subtitle">
            Het Innovatieteam ontwikkelt, test en schaalt nieuwe technologie voor
            beleid en uitvoering — van idee tot draaiende tool.
          </span>
        </nldd-title>
        <nldd-spacer size="16"></nldd-spacer>
        <nldd-container layout="wrap" gap="8">
          <nldd-badge color="success" :text="`${onlineCount} van de ${totalPingable} nu online`"
          ></nldd-badge>
        </nldd-container>
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

      <nldd-simple-section v-show="activeSection === 'services'">
        <nldd-title slot="header" size="1">
          <h1>Onze services</h1>
          <span slot="subtitle">
            Drie manieren waarop wij directies en teams helpen om van idee naar
            bewezen waarde te komen.
          </span>
        </nldd-title>

        <nldd-rich-text>
          <p>
            Het innovatieteam helpt directies sneller besluiten of een idee relevant
            is, waarde oplevert en kan uitgroeien tot een dienst voor collega's. Elke
            service is los in te zetten, maar ze vormen samen ook een route: van
            verkennen, via scherpstellen, naar toetsen in de praktijk.
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
            <nldd-text color="secondary">
              Bij elke service werken we samen. Van jou vragen we in ieder geval:
            </nldd-text>
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

      <nldd-simple-section v-show="activeSection === 'werkwijze'">
        <nldd-title slot="header" size="1">
          <h1>Onze werkwijze</h1>
          <span slot="subtitle">
            Van idee naar dienst in drie fasen, agile uitgevoerd — en na elke fase
            een bewuste keuze om door te gaan of te stoppen.
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

        <!-- Fasen en uitvergroting zitten in één container met gap="0":
             nldd-simple-section zet standaard ruimte tussen zijn kinderen, en
             juist hier moet het punt van het paneel de Experimenteren-kaart
             raken — anders leest het weer als een los hoofdstuk. -->
        <nldd-container gap="0">
          <PhaseFlow :fases="FASES" label="Fase" variant="fase" />
          <PhaseZoom
            :fases="FASES"
            :fase="EXPERIMENT_FASE"
            :stappen="EXPERIMENT_STAPPEN"
          />
        </nldd-container>

        <nldd-spacer size="32"></nldd-spacer>

        <nldd-card>
          <nldd-container padding="24" gap="8">
            <nldd-title size="3">
              <span slot="overline">Hoe we werken</span>
              <h3>Wij werken agile</h3>
            </nldd-title>
            <nldd-text size="sm" color="secondary">
              Binnen elke fase werken we in korte sprints: steeds iets werkends
              opleveren, feedback ophalen bij de mensen die het gebruiken en de
              volgende sprint daarop aanpassen. De klant zit bij ons aan tafel.
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

      <nldd-simple-section v-show="activeSection === 'team'">
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
          <nldd-text>Innovatieteam — Ministerie van Financiën</nldd-text>
          <nldd-text size="sm" color="secondary">
            Status wordt elke 60 seconden bijgewerkt
          </nldd-text>
        </nldd-container>
      </nldd-page-footer>
    </nldd-page>
  </nldd-app-view>
</template>
