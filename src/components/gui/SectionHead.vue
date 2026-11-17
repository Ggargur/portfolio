<script setup lang="ts">
defineProps<{ id: string; title: string; cmd: string; meta?: string }>();
</script>

<template>
  <header class="head">
    <code class="cmd" aria-hidden="true"><span>$</span> {{ cmd }}</code>
    <div class="row">
      <h2 :id="id">{{ title }}</h2>
      <span v-if="meta" class="meta">{{ meta }}</span>
    </div>
  </header>
</template>

<style scoped>
.head {
  display: grid;
  gap: 6px;
}
.cmd {
  font: 400 13px/1 var(--f-mono);
  color: var(--muted);
}
.cmd span {
  color: var(--warm);
}
.row {
  display: flex;
  align-items: baseline;
  gap: 16px;
}
h2 {
  margin: 0;
  font: 800 clamp(30px, 4.4vw, 44px) / 1.05 var(--f-display);
  letter-spacing: -0.025em;
  text-wrap: balance;
}
.meta {
  margin-left: auto;
  font: 400 13px/1 var(--f-mono);
  color: var(--muted);
  white-space: nowrap;
}
</style>
