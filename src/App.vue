<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { PRODUCTS, TEAM } from './data.js';
import { pingUrl } from './ping.js';
import ProductCard from './components/ProductCard.vue';
import ProductSheet from './components/ProductSheet.vue';
import TeamMember from './components/TeamMember.vue';

const TABS = [
  { id: 'producten', label: 'Producten', icon: 'square-grid-2x2' },
  { id: 'team', label: 'Wie zijn wij', icon: 'person-2' },
];

const statuses = ref(
  Object.fromEntries(PRODUCTS.map((p) => [p.id, p.url ? 'checking' : 'unknown'])),
);
const selectedProduct = ref(null);
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

// tabchange hands over the item element, not an id — read it back off the
// data-id we put on each item.
function onTabChange(event) {
  const id = event.detail?.item?.dataset?.id;
  if (id) activeSection.value = id;
}
</script>

<template>
  <nldd-app-view>
    <nldd-page>
      <nldd-top-navigation-bar
        slot="header"
        logo-title="Ministerie van Financiën"
        website-title="Innovatieteam"
      ></nldd-top-navigation-bar>

      <nldd-skip-link href="#hoofdinhoud" text="Direct naar de inhoud"></nldd-skip-link>

      <!-- No hero band. A full-width coloured block spends ~180px repeating the
           team name that the navigation bar already carries, and pushes the
           product grid — the actual proof of what this team does — below the
           fold. The h1 states the work instead of the label. -->
      <nldd-simple-section padding-bottom="24">
        <nldd-title size="1">
          <h1>Wij bouwen AI-producten voor het Ministerie van Financiën</h1>
          <span slot="subtitle">
            Het Innovatieteam ontwikkelt, test en schaalt nieuwe technologie voor
            beleid en uitvoering — van idee tot draaiende tool.
          </span>
        </nldd-title>
        <nldd-spacer size="16"></nldd-spacer>
        <nldd-container layout="wrap" gap="8">
          <nldd-badge color="accent" :text="`${PRODUCTS.length} producten live`"></nldd-badge>
          <nldd-badge
            color="success"
            :text="`${onlineCount} van de ${totalPingable} nu online`"
          ></nldd-badge>
          <nldd-badge color="neutral" :text="`${TEAM.length} teamleden`"></nldd-badge>
        </nldd-container>
      </nldd-simple-section>

      <nldd-simple-section padding-block="0">
        <nldd-tab-bar
          id="hoofdinhoud"
          accessible-label="Secties"
          @tabchange="onTabChange"
        >
          <nldd-tab-bar-item
            v-for="tab in TABS"
            :key="tab.id"
            :data-id="tab.id"
            :text="tab.label"
            :icon="tab.icon"
            :selected="activeSection === tab.id"
          ></nldd-tab-bar-item>
        </nldd-tab-bar>
      </nldd-simple-section>

      <nldd-simple-section v-show="activeSection === 'producten'">
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
            @open="selectedProduct = $event"
          />
        </nldd-collection>
      </nldd-simple-section>

      <nldd-simple-section v-show="activeSection === 'team'">
        <nldd-title slot="header" size="3">
          <h2>Wie zijn wij</h2>
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

    <Teleport to="body">
      <ProductSheet
        :product="selectedProduct"
        :status="selectedProduct ? statuses[selectedProduct.id] : 'unknown'"
        @close="selectedProduct = null"
      />
    </Teleport>
  </nldd-app-view>
</template>
