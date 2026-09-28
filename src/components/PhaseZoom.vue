<script setup>
// Zoomt in op één fase: een paneel met de stappen binnen die fase, verbonden met
// de fasekaart erboven door een trechter. Paneel en trechter hebben dezelfde tint
// als een nldd-card met background="tinted", zodat ze met die kaart één vorm
// maken. NLDD heeft hier geen component voor, vandaar de eigen CSS; kleur en
// radius komen wel uit de design-system-tokens.
//
// De default slot is de inleidende tekst in het paneel.
import PhaseFlow from './PhaseFlow.vue';

const props = defineProps({
  fases: { type: Array, required: true },
  // Welke fase uit `fases` wordt uitgevergroot; bepaalt waar de trechter begint.
  fase: { type: Object, required: true },
  stappen: { type: Array, required: true },
  label: { type: String, default: 'Fase' },
});

// Dezelfde kolommen als PhaseFlow, zodat de trechter precies onder de fasekaart
// begint. Fase i staat in kolom 2i+1; de even kolommen zijn de pijlen.
const columns = props.fases.map(() => '1fr').join(' auto ');
const index = props.fases.findIndex((f) => f.id === props.fase.id);
const midColumn = 2 * index + 1;
</script>

<template>
  <div class="zoom">
    <!-- Decoratief: de kop "Binnen <fase>" zegt hetzelfde in tekst. -->
    <div class="funnel" :style="{ gridTemplateColumns: columns }" aria-hidden="true">
      <div class="ramp left" :style="{ gridColumn: `1 / ${midColumn}` }"></div>
      <div class="stem" :style="{ gridColumn: `${midColumn} / ${midColumn + 1}` }"></div>
      <div class="ramp right" :style="{ gridColumn: `${midColumn + 1} / -1` }"></div>
    </div>

    <div class="panel">
      <nldd-container padding="24" gap="16">
        <nldd-container layout="row" gap="8" vertical-alignment="center">
          <nldd-icon name="arrow-down" size="20" color="accent"></nldd-icon>
          <nldd-title size="3">
            <span slot="overline">{{ label }} {{ fase.nummer }} in detail</span>
            <h3>Binnen {{ fase.name }}</h3>
          </nldd-title>
        </nldd-container>

        <nldd-text v-if="$slots.default" size="sm" color="secondary">
          <slot></slot>
        </nldd-text>

        <PhaseFlow :fases="stappen" label="Stap" variant="stap" />
      </nldd-container>
    </div>
  </div>
</template>

<style scoped>
.funnel {
  display: grid;
  /* Dezelfde gap als PhaseFlow, zodat de kolommen samenvallen. De vlakken
     steken 4px uit om die gap te dichten. */
  gap: 8px;
  /* Bij 20px leest de schuinte als een rechte lijn. */
  height: 40px;
}

.funnel > * {
  background: var(--semantics-surfaces-tinted-background-color);
  margin-inline: -4px;
}

/* De schuine kanten: van de rand van de fasekaart naar de rand van het paneel. */
.ramp.left {
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

.ramp.right {
  clip-path: polygon(0 0, 100% 100%, 0 100%);
}

.panel {
  background: var(--semantics-surfaces-tinted-background-color);
  border-radius: var(--semantics-surfaces-corner-radius);
  /* De trechter loopt door in het paneel, dus bovenaan geen ronde hoeken. */
  border-start-start-radius: 0;
  border-start-end-radius: 0;
}

/* Op smalle schermen staat PhaseFlow in één kolom en heeft een trechter geen zin.
   Er blijft een smalle band over die kaart en paneel verbindt. */
@media (max-width: 900px) {
  .funnel {
    grid-template-columns: 1fr !important;
    height: 12px;
  }

  .ramp {
    display: none;
  }

  .stem {
    grid-column: 1 / -1 !important;
  }
}
</style>
