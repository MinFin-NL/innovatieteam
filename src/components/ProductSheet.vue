<script setup>
import { nextTick, ref, watch } from 'vue';
import StatusBadge from './StatusBadge.vue';

const props = defineProps({
  product: { type: Object, default: null },
  status: { type: String, default: 'unknown' },
});
const emit = defineEmits(['close']);

const sheetEl = ref(null);

// The sheet element stays mounted so show()/hide() can animate — v-if would
// skip the transition and drop DOM state. `shown` holds the last product past
// the close so the content does not blank out mid-animation.
const shown = ref(null);

watch(
  () => props.product,
  async (product) => {
    if (!product) {
      sheetEl.value?.hide();
      return;
    }
    shown.value = product;
    await nextTick();
    sheetEl.value?.show();
  },
  { immediate: true },
);

// Only @close is handled here. The sheet closes itself on Escape, a click
// outside, or the title bar's dismiss button, and fires `close`; letting that
// clear the parent's selection drives exactly one hide() through the watch
// above. Calling hide() from this handler would loop hide() -> close -> hide().
function onClose() {
  emit('close');
}
</script>

<template>
  <nldd-sheet
    ref="sheetEl"
    placement="right"
    width="480px"
    :accessible-label="shown?.name"
    @close="onClose"
  >
    <nldd-page v-if="shown">
      <nldd-top-title-bar
        slot="header"
        :text="shown.name"
        :supporting-text="shown.category"
        dismiss-text="Sluiten"
      ></nldd-top-title-bar>

      <nldd-container padding="24" gap="16">
        <nldd-image
          :src="shown.icon"
          :width="64"
          object-fit="contain"
          shape="rounded"
          decorative
        ></nldd-image>

        <nldd-rich-text>
          <p>{{ shown.description }}</p>
        </nldd-rich-text>

        <nldd-container layout="row" gap="8" vertical-alignment="center">
          <nldd-text size="sm" color="secondary">Systeemstatus</nldd-text>
          <StatusBadge :status="status" />
        </nldd-container>

        <nldd-button
          v-if="shown.url"
          :href="shown.url"
          target="_blank"
          variant="accent-filled"
          text="Open tool"
          end-icon="square-arrow-right-top"
        ></nldd-button>
        <nldd-button
          v-else
          variant="neutral-tinted"
          text="Geen link beschikbaar"
          disabled
        ></nldd-button>
      </nldd-container>
    </nldd-page>
  </nldd-sheet>
</template>
