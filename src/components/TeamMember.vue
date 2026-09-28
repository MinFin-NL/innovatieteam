<script setup>
// `decorative`: the name is right below the avatar. A missing photo falls back
// to initials.
defineProps({ member: { type: Object, required: true } });
</script>

<template>
  <nldd-card>
    <nldd-container padding="16" gap="8" horizontal-alignment="center">
      <nldd-avatar
        size="96"
        :src="member.photo"
        :name="member.name"
        decorative
      ></nldd-avatar>
      <nldd-title size="4">
        <h3>{{ member.name }}</h3>
      </nldd-title>
      <nldd-text size="sm" color="secondary" horizontal-alignment="center">
        {{ member.role }}
      </nldd-text>
    </nldd-container>
  </nldd-card>
</template>
