<script setup>
import { computed } from 'vue';

// Maps a ping status onto an NLDD badge colour. `pulse` already respects
// prefers-reduced-motion.
const STATUS = {
  up: { color: 'success', label: 'Online' },
  down: { color: 'critical', label: 'Offline' },
  checking: { color: 'warning', label: 'Controleren…' },
  unknown: { color: 'neutral', label: 'Onbekend' },
  retired: { color: 'neutral', label: 'Gestopt' },
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
