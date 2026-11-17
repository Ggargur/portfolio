<script setup lang="ts">
import SectionHead from './SectionHead.vue';
import { experiences, period } from '../../data/portfolio';
</script>

<template>
  <section id="experience" class="sec" aria-labelledby="h-exp">
    <SectionHead id="h-exp" title="Experience" cmd="git log --oneline" :meta="`${experiences.length} roles`" />
    <ol class="timeline">
      <li v-for="e in experiences" :key="e.hash" :class="{ current: e.end === null }">
        <span class="when">{{ period(e) }}</span>
        <span class="rail" aria-hidden="true"><i></i></span>
        <div class="what">
          <h3>{{ e.role }} <span>· {{ e.company }}</span></h3>
          <p>{{ e.description }}</p>
          <span v-if="e.end === null" class="badge">current</span>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.sec {
  display: grid;
  gap: 28px;
  scroll-margin-top: 96px;
}
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: grid;
  grid-template-columns: 170px 24px 1fr;
  gap: 0 16px;
}
.when {
  padding-top: 3px;
  text-align: right;
  font: 500 13px/1.6 var(--f-mono);
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.rail {
  position: relative;
  display: flex;
  justify-content: center;
}
.rail::before {
  content: '';
  position: absolute;
  inset: 0 auto;
  width: 2px;
  background: var(--line);
}
li:first-child .rail::before {
  top: 10px;
}
li:last-child .rail::before {
  bottom: auto;
  height: 10px;
}
.rail i {
  position: relative;
  width: 14px;
  height: 14px;
  margin-top: 5px;
  background: var(--surface);
  border: 2px solid var(--accent);
  border-radius: 50%;
}
.current .rail i {
  background: var(--warm);
  border-color: var(--warm);
}
.what {
  display: grid;
  gap: 4px;
  justify-items: start;
  padding-bottom: 30px;
}
h3 {
  margin: 0;
  font: 700 19px/1.3 var(--f-display);
}
h3 span {
  color: var(--muted);
  font-weight: 600;
}
p {
  margin: 0;
  max-width: 60ch;
  color: var(--muted);
}
.badge {
  margin-top: 4px;
  font: 500 11px/1 var(--f-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--warm);
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 4px 6px;
}
@media (max-width: 640px) {
  li {
    grid-template-columns: 18px 1fr;
    gap: 0 12px;
  }
  .when {
    grid-column: 2;
    grid-row: 1;
    text-align: left;
    padding-top: 0;
  }
  .rail {
    grid-column: 1;
    grid-row: 1 / span 2;
  }
  .what {
    grid-column: 2;
  }
}
</style>
