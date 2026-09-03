<script setup>
// De uitvergroting van één fase: de stappen die binnen die fase worden gezet.
//
// Dit blok stond eerst als losse kop plus kaartenrij onder de fasen, met een
// spacer ertussen — en las daardoor als een nieuw hoofdstuk in plaats van als
// een uitvergroting. Wat er nu één object van maakt: het paneel deelt de tint
// van de fasekaart waar het bij hoort, de kop staat bínnen het paneel, en twee
// schuine vlakken waaieren uit van de onderrand van die kaart naar de volle
// breedte van het paneel — het beeld van een vergrootglas.
//
// Eigen CSS is hier nodig omdat NLDD geen "uitvergroting van een kaart" kent;
// de kleur- en radius-tokens komen wel uit het design system, zodat het paneel
// exact dezelfde tint heeft als een nldd-card met background="tinted".
import PhaseFlow from './PhaseFlow.vue';

const props = defineProps({
  fases: { type: Array, required: true },
  // Welke fase uit `fases` wordt uitgevergroot; bepaalt waar de trechter begint.
  fase: { type: Object, required: true },
  stappen: { type: Array, required: true },
  label: { type: String, default: 'Fase' },
});

// Dezelfde kolomverdeling als PhaseFlow, zodat de trechter exact onder de
// fasekaart begint in plaats van op een uitgerekende positie: het grid doet het
// rekenwerk. Een fase op index i staat in kolom 2i+1 (de even kolommen zijn de
// pijlen).
const columns = props.fases.map(() => '1fr').join(' auto ');
const index = props.fases.findIndex((f) => f.id === props.fase.id);
const midColumn = 2 * index + 1;
</script>

<template>
  <div class="zoom">
    <!-- Puur decoratief: de relatie staat ook in de kop ("Binnen
         Experimenteren"), dus dit blijft weg uit de toegankelijkheidsboom. -->
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
            <span slot="overline">{{ label }} {{ fase.nummer }} uitgevouwen</span>
            <h3>Binnen {{ fase.name }}</h3>
          </nldd-title>
        </nldd-container>

        <nldd-text size="sm" color="secondary">
          Experimenteren doen we in het Concept Lab, in drie stappen. Elke stap
          beantwoordt één vraag en eindigt met een go/no-go: pas als het antwoord
          er is gaan we door, of stoppen we bewust.
        </nldd-text>

        <PhaseFlow :fases="stappen" label="Stap" variant="stap" />
      </nldd-container>
    </div>
  </div>
</template>

<style scoped>
.funnel {
  display: grid;
  /* Dezelfde gap als PhaseFlow, zodat de kolommen samenvallen; de vlakken
     steken 4px naar buiten om die gap dicht te lopen tot één doorlopend vlak. */
  gap: 8px;
  /* Hoog genoeg dat de schuinte als schuinte leest; bij 20px werd het een
     rechte lijn en viel de verbinding weer weg. */
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

/* Op smalle schermen stapelt PhaseFlow tot één kolom en heeft een trechter geen
   betekenis meer; er blijft een smalle verbindende band over. */
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
