<script setup lang="ts">
import { computed } from 'vue';
import { useWm } from '../../composables/useWm';

const props = defineProps<{ name: string; title?: string }>();
const { focused, focus } = useWm();
const active = computed(() => focused.value === props.name);
</script>

<template>
  <section
    :id="name"
    class="win"
    :class="{ active }"
    :aria-labelledby="`title-${name}`"
    @pointerdown="focus(name)"
    @focusin="focus(name)"
  >
    <header class="tb">
      <h2 :id="`title-${name}`">{{ title ?? name }}</h2>
      <div v-if="$slots.actions" class="actions"><slot name="actions" /></div>
    </header>
    <div class="body"><slot /></div>
  </section>
</template>

<style scoped>
.win {
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r);
  overflow: hidden;
  scroll-margin-top: 56px;
  transition: border-color var(--t-fast);
}
.win.active {
  border-color: var(--accent);
}
.tb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 32px;
  padding: 0 12px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line);
  transition: background-color var(--t-fast);
}
.active .tb {
  background: color-mix(in srgb, var(--accent-soft) 55%, var(--surface-2));
}
h2 {
  margin: 0;
  font: 500 12.5px/1 var(--f-mono);
  color: var(--muted);
}
.active h2 {
  color: var(--ink);
}
.actions {
  display: flex;
  align-items: center;
}
.body {
  min-width: 0;
  padding: 18px 20px 20px;
}
@media (max-width: 640px) {
  .body {
    padding: 16px;
  }
}
</style>
