<script setup>
// Eén fase uit de werkwijze als kaart. De kaarten staan naast elkaar in
// PhaseFlow, dus de inhoud is bewust kort: de vraag die de fase beantwoordt, een
// korte toelichting en wat we in die stap doen. Het stapnummer staat in de overline in plaats van in een
// nldd-step-indicator: dat component is een voortgangs-nav met één `current`
// stap ("hier ben je nu"), terwijl deze tab een werkwijze beschrijft en niet de
// stand van één traject.
defineProps({ fase: { type: Object, required: true } });
</script>

<template>
  <nldd-card>
    <nldd-container padding="20" gap="12">
      <nldd-container layout="row" gap="8" vertical-alignment="center">
        <nldd-title size="4">
          <span slot="overline">Stap {{ fase.stap }}</span>
          <h3>{{ fase.name }}</h3>
        </nldd-title>
        <nldd-badge color="accent" size="sm" :text="fase.afkorting"></nldd-badge>
      </nldd-container>

      <nldd-title size="5">
        <h4>{{ fase.vraag }}</h4>
      </nldd-title>

      <nldd-text size="sm" color="secondary">{{ fase.description }}</nldd-text>

      <nldd-container gap="4">
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
