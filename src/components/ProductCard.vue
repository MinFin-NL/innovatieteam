<script setup>
import StatusBadge from './StatusBadge.vue';

// `retired`: a tool on the Kerkhof. Faded logo, no status check, no button.
defineProps({
  product: { type: Object, required: true },
  status: { type: String, default: 'unknown' },
  retired: { type: Boolean, default: false },
});
</script>

<template>
  <nldd-card>
    <nldd-container padding="16" gap="8">
      <nldd-image
        :class="{ faded: retired }"
        :src="product.icon"
        :width="40"
        aspect-ratio="1/1"
        object-fit="contain"
        object-position="left"
        decorative
      ></nldd-image>

      <nldd-title size="4">
        <h3>{{ product.name }}</h3>
        <StatusBadge slot="end" :status="retired ? 'retired' : status" />
      </nldd-title>

      <nldd-text size="sm" color="secondary">{{ product.description }}</nldd-text>
    </nldd-container>

    <nldd-container v-if="!retired" slot="footer" padding-inline="16" padding-bottom="16">
      <nldd-button
        v-if="product.url"
        :href="product.url"
        target="_blank"
        variant="accent-filled"
        size="sm"
        width="full"
        text="Openen"
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

<style scoped>
.faded {
  filter: grayscale(1);
  opacity: 0.5;
}
</style>
