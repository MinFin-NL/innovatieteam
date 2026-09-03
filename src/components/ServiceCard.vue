<script setup>
// Eén innovatieservice als kaart: omschrijving plus de drie vaste kolommen uit
// de servicebeschrijving (wanneer inzetten, wat doen wij, wat levert het op).
// nldd-title heeft geen `start`-slot, dus het service-icoon staat in een eigen
// row-container boven de titel.
defineProps({ service: { type: Object, required: true } });

const COLUMNS = [
  { key: 'wanneer', label: 'Wanneer inzetten?', icon: 'question-mark-circle' },
  { key: 'watWijDoen', label: 'Wat doen wij?', icon: 'gear' },
  { key: 'opbrengst', label: 'Wat levert het op?', icon: 'check-mark-circle' },
];
</script>

<template>
  <nldd-card>
    <nldd-container padding="24" gap="16">
      <nldd-container layout="row" gap="12" vertical-alignment="center">
        <nldd-icon :name="service.icon" size="32" color="accent"></nldd-icon>
        <nldd-title size="3">
          <h3>{{ service.name }}</h3>
        </nldd-title>
        <nldd-badge
          v-if="service.voorbeeld"
          color="accent"
          size="sm"
          :text="`Voorbeeld: ${service.voorbeeld}`"
        ></nldd-badge>
      </nldd-container>

      <nldd-text color="secondary">{{ service.description }}</nldd-text>

      <nldd-container layout="grid" gap="24">
        <nldd-container v-for="column in COLUMNS" :key="column.key" gap="8">
          <nldd-container layout="row" gap="8" vertical-alignment="center">
            <nldd-icon :name="column.icon" size="20" color="accent"></nldd-icon>
            <nldd-title size="5">
              <h4>{{ column.label }}</h4>
            </nldd-title>
          </nldd-container>
          <nldd-rich-text>
            <ul>
              <li v-for="item in service[column.key]" :key="item">{{ item }}</li>
            </ul>
          </nldd-rich-text>
        </nldd-container>
      </nldd-container>
    </nldd-container>
  </nldd-card>
</template>
