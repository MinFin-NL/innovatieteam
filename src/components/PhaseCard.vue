<script setup>
// Een fase of stap uit de werkwijze. `variant="fase"` toont de activiteiten als
// tags, `variant="stap"` als lijst; zo lezen de fasen als overzicht en de stappen
// eronder als detail.
//
// Geen nldd-step-indicator voor het nummer: die markeert één huidige stap in een
// traject, en deze pagina beschrijft een werkwijze.
defineProps({
  fase: { type: Object, required: true },
  // Het woord voor de overline; het nummer komt uit `fase.nummer`.
  label: { type: String, default: 'Stap' },
  variant: { type: String, default: 'stap' },
});
</script>

<template>
  <nldd-card :background="fase.background">
    <nldd-container padding="20" gap="12">
      <!-- nldd-title heeft geen `start`-slot, vandaar de row-container. -->
      <nldd-container layout="row" gap="8" vertical-alignment="center">
        <nldd-icon
          v-if="fase.icon"
          :name="fase.icon"
          size="24"
          color="accent"
        ></nldd-icon>
        <nldd-title size="4">
          <span slot="overline">{{ label }} {{ fase.nummer }}</span>
          <h3>{{ fase.name }}</h3>
        </nldd-title>
        <nldd-badge
          v-if="fase.afkorting"
          color="accent"
          size="sm"
          :text="fase.afkorting"
        ></nldd-badge>
      </nldd-container>

      <nldd-title size="5">
        <h4>{{ fase.vraag }}</h4>
      </nldd-title>

      <nldd-text size="sm" color="secondary">{{ fase.description }}</nldd-text>

      <nldd-container v-if="variant === 'fase'" layout="wrap" gap="8">
        <nldd-tag
          v-for="item in fase.activiteiten"
          :key="item"
          :text="item"
        ></nldd-tag>
      </nldd-container>

      <nldd-container v-else gap="4">
        <nldd-text size="sm">Wat doen we in deze stap?</nldd-text>
        <nldd-rich-text>
          <ul>
            <li v-for="item in fase.activiteiten" :key="item">{{ item }}</li>
          </ul>
        </nldd-rich-text>
      </nldd-container>
    </nldd-container>
  </nldd-card>
</template>
