<script setup>
// Eén blok uit de werkwijze als kaart, in twee dichtheden. De werkwijze staat in
// twee lagen op de pagina — de drie fasen als overzicht, daaronder de drie
// stappen binnen Experimenteren — en zonder verschil in dichtheid lees je zes
// gelijkwaardige stappen in plaats van een overzicht met een uitvergroting.
// Daarom: `fase` vat de activiteiten samen in tags, `stap` somt ze op in bullets.
//
// Het nummer staat in de overline in plaats van in een nldd-step-indicator: dat
// component is een voortgangs-nav met één `current` stap ("hier ben je nu"),
// terwijl deze tab een werkwijze beschrijft en niet de stand van één traject.
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
      <!-- nldd-title heeft geen `start`-slot, dus het fase-icoon staat naast de
           titel in een row-container, net als in ServiceCard. -->
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
