<script setup>
import StatusBadge from './StatusBadge.vue';

// `nldd-card button` renders an overlay button over the whole card, so the
// composed click below plus native Enter/Space come for free — no role="button"
// div and no hand-written key handler.
defineProps({
  product: { type: Object, required: true },
  status: { type: String, default: 'unknown' },
});
defineEmits(['open']);
</script>

<template>
  <nldd-card button :accessible-label="product.name" @click="$emit('open', product)">
    <nldd-container padding="16" gap="8">
      <nldd-image
        :src="product.icon"
        :width="40"
        aspect-ratio="1/1"
        object-fit="contain"
        object-position="left"
        shape="rounded"
        decorative
      ></nldd-image>
      <nldd-title size="4">
        <h3>{{ product.name }}</h3>
      </nldd-title>
      <nldd-text size="sm" color="secondary">{{ product.description }}</nldd-text>
    </nldd-container>

    <nldd-container
      slot="footer"
      layout="row"
      padding-inline="16"
      padding-bottom="16"
      gap="8"
      vertical-alignment="center"
    >
      <StatusBadge :status="status" />
      <nldd-tag size="sm" color="lintblauw" :text="product.category"></nldd-tag>
    </nldd-container>
  </nldd-card>
</template>
