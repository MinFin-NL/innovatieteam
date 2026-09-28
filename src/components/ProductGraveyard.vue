<script setup>
// Het Kerkhof: tools waar we mee gestopt zijn, standaard ingeklapt.
//
// NLDD heeft geen accordion, dus dit is een native <details>: toetsenbord,
// open/dicht-status voor schermlezers en zoeken-op-pagina (Chrome klapt hem
// open bij een treffer) werken zonder eigen JavaScript. De kleuren, radius en
// focusring komen uit de NLDD-tokens.
import ProductCard from './ProductCard.vue';

defineProps({ products: { type: Array, required: true } });
</script>

<template>
  <details class="graveyard">
    <summary>
      <nldd-container layout="row" gap="12" vertical-alignment="center">
        <nldd-icon class="chevron" name="chevron-right" size="20" color="accent"></nldd-icon>
        <nldd-icon name="archive" size="24" color="accent"></nldd-icon>
        <nldd-title size="3">
          <h2>Kerkhof</h2>
          <span slot="subtitle">
            {{ products.length }} {{ products.length === 1 ? 'tool' : 'tools' }} waar we
            mee gestopt zijn. Bewust stoppen hoort bij onze werkwijze.
          </span>
        </nldd-title>
      </nldd-container>
    </summary>

    <nldd-container padding-inline="16" padding-top="8" padding-bottom="16">
      <nldd-collection layout="grid" item-width="280px" :max-items="products.length">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          retired
        />
      </nldd-collection>
    </nldd-container>
  </details>
</template>

<style scoped>
.graveyard {
  background: var(--semantics-surfaces-tinted-background-color);
  border-radius: var(--semantics-surfaces-corner-radius);
}

summary {
  list-style: none;
  cursor: pointer;
  padding: 16px;
  border-radius: var(--semantics-surfaces-corner-radius);
}

summary::-webkit-details-marker {
  display: none;
}

summary:focus-visible {
  outline: var(--semantics-focus-ring-outline);
  outline-offset: var(--semantics-focus-ring-outline-offset);
}

summary nldd-icon {
  flex-shrink: 0;
}

.chevron {
  transition: transform 150ms ease;
}

.graveyard[open] .chevron {
  transform: rotate(90deg);
}

@media (prefers-reduced-motion: reduce) {
  .chevron {
    transition: none;
  }
}
</style>
