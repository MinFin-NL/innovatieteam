<script setup>
// De drie fasen naast elkaar met een pijl ertussen, als één horizontale route.
//
// Dit is het enige component met eigen CSS. De NLDD-containers verdelen ruimte
// naar inhoud, en dat is hier precies niet de bedoeling: de kolommen moeten
// even breed zijn en samen even breed als de kaarten erboven en eronder. Een
// grid met `1fr auto 1fr auto 1fr` (kolom, pijl, kolom, pijl, kolom) doet dat
// wel, en houdt de kaarten meteen even hoog.
import PhaseCard from './PhaseCard.vue';

const props = defineProps({ fases: { type: Array, required: true } });

// Eén `1fr` per fase, met een `auto` pijlkolom ertussen. Berekend in plaats van
// hardcoded, zodat een vierde fase toevoegen in data.js genoeg is.
const columns = props.fases.map(() => '1fr').join(' auto ');
</script>

<template>
  <div class="flow" :style="{ gridTemplateColumns: columns }">
    <template v-for="(fase, index) in fases" :key="fase.id">
      <!-- De volgorde blijkt al uit "Stap 1/2/3" in de kaart zelf, dus de pijl
           is decoratief en blijft weg uit de toegankelijkheidsboom. -->
      <div v-if="index > 0" class="arrow" aria-hidden="true">
        <nldd-icon name="arrow-right" size="24" color="accent"></nldd-icon>
      </div>
      <PhaseCard :fase="fase" />
    </template>
  </div>
</template>

<style scoped>
.flow {
  display: grid;
  gap: 8px;
  align-items: stretch;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Onder de kaartbreedte waarop drie kolommen nog leesbaar zijn, wordt het een
   verticale route: de pijlen kantelen mee zodat de richting blijft kloppen. */
@media (max-width: 900px) {
  .flow {
    grid-template-columns: 1fr !important;
    gap: 12px;
  }

  .arrow nldd-icon {
    transform: rotate(90deg);
  }
}
</style>
