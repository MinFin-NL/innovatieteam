<script setup>
import { computed } from 'vue';

// Maps a ping status onto an NLDD semantic badge colour. `pulse` grows a ring
// out of the badge for something happening right now — it respects
// prefers-reduced-motion on its own, so no media query is needed here.
const STATUS = {
  up: { color: 'success', label: 'Online' },
  down: { color: 'critical', label: 'Offline' },
  checking: { color: 'warning', label: 'Controleren…' },
  unknown: { color: 'neutral', label: 'Onbekend' },
};

const props = defineProps({ status: { type: String, default: 'unknown' } });

const badge = computed(() => STATUS[props.status] || STATUS.unknown);
</script>

<template>
  <nldd-badge
    size="sm"
    :color="badge.color"
    :text="badge.label"
    :pulse="status === 'checking'"
  ></nldd-badge>
</template>
