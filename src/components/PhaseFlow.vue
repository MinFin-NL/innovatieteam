<script setup>
// Kaarten naast elkaar met een pijl ertussen, voor de fasen en voor de stappen
// binnen Experimenteren. `label` en `variant` gaan door naar PhaseCard.
//
// Eigen CSS omdat NLDD-containers ruimte naar inhoud verdelen, en hier moeten
// de kolommen even breed en even hoog zijn. Een grid `1fr auto 1fr auto 1fr`
// (kaart, pijl, kaart, pijl, kaart) doet dat.
import PhaseCard from './PhaseCard.vue';

const props = defineProps({
  fases: { type: Array, required: true },
  label: { type: String, default: 'Stap' },
  variant: { type: String, default: 'stap' },
});

// Berekend, zodat een extra fase in data.js vanzelf een kolom krijgt.
const columns = props.fases.map(() => '1fr').join(' auto ');
</script>

<template>
  <div class="flow" :style="{ gridTemplateColumns: columns }">
    <template v-for="(fase, index) in fases" :key="fase.id">
      <!-- Decoratief: de volgorde staat al in de overline van elke kaart. -->
      <div v-if="index > 0" class="arrow" aria-hidden="true">
        <nldd-icon name="arrow-right" size="24" color="accent"></nldd-icon>
      </div>
      <PhaseCard :fase="fase" :label="label" :variant="variant" />
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

/* Smaller dan dit zijn drie kolommen niet leesbaar: dan één kolom, met de pijlen
   een kwartslag gedraaid. */
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
