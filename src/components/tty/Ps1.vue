<script setup lang="ts">
import { profile } from '../../data/portfolio';

withDefaults(defineProps<{ user?: string; cmd?: string }>(), { user: 'gabriel', cmd: '' });
</script>

<template>
  <div class="ps1">
    <span class="u">{{ user }}</span>@<span class="h">{{ profile.host }}</span>:~$
    <span class="c"><slot>{{ cmd }}</slot></span>
  </div>
</template>

<style scoped>
.ps1 {
  color: var(--muted);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.u {
  color: var(--syn-str);
}
.h {
  color: var(--syn-key);
}
.c {
  color: var(--ink);
  font-weight: 500;
}
</style>
