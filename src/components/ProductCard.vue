<script setup>
import StatusBadge from './StatusBadge.vue';

// The card is no longer one big button. An overlay button gave no visual
// affordance — nothing on the card said "click me" — so the action is now an
// explicit link button in the footer that opens the tool directly.
defineProps({
  product: { type: Object, required: true },
  status: { type: String, default: 'unknown' },
});
</script>

<template>
  <nldd-card>
    <nldd-container padding="16" gap="8">
      <nldd-image
        :src="product.icon"
        :width="40"
        aspect-ratio="1/1"
        object-fit="contain"
        object-position="left"
        decorative
      ></nldd-image>

      <nldd-title size="4">
        <h3>{{ product.name }}</h3>
        <StatusBadge slot="end" :status="status" />
      </nldd-title>

      <nldd-text size="sm" color="secondary">{{ product.description }}</nldd-text>
    </nldd-container>

    <nldd-container slot="footer" padding-inline="16" padding-bottom="16">
      <nldd-button
        v-if="product.url"
        :href="product.url"
        target="_blank"
        variant="accent-filled"
        size="sm"
        width="full"
        text="Open tool"
        end-icon="square-arrow-right-top"
        :accessible-label="`${product.name} openen`"
      ></nldd-button>
      <nldd-button
        v-else
        variant="neutral-tinted"
        size="sm"
        width="full"
        disabled
        text="Nog niet beschikbaar"
      ></nldd-button>
    </nldd-container>
  </nldd-card>
</template>
