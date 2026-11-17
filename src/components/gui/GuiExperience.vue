<script setup lang="ts">
import { computed, ref } from 'vue';
import SectionHead from './SectionHead.vue';
import { experiences, period, tracks, type Track } from '../../data/portfolio';

type Filter = 'all' | Track;
const filter = ref<Filter>('all');
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...(Object.keys(tracks) as Track[]).map((t) => ({ id: t, label: tracks[t] })),
];

const shown = computed(() => (filter.value === 'all' ? experiences : experiences.filter((e) => e.track === filter.value)));
const count = (f: Filter) => (f === 'all' ? experiences.length : experiences.filter((e) => e.track === f).length);
</script>

<template>
  <section id="experience" class="sec" aria-labelledby="h-exp">
    <SectionHead id="h-exp" title="Experience" cmd="git log --oneline" :meta="`${shown.length} roles`" />

    <div class="filters" role="group" aria-label="Filter roles">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        :aria-pressed="filter === f.id"
        @click="filter = f.id"
      >
        {{ f.label }} <span class="n">{{ count(f.id) }}</span>
      </button>
    </div>

    <ol class="timeline">
      <li v-for="e in shown" :key="e.hash" :class="{ current: e.end === null }">
        <span class="when">{{ period(e) }}</span>
        <span class="rail" aria-hidden="true"><i></i></span>
        <div class="what">
          <div class="title">
            <h3>{{ e.role }} <span>· {{ e.company }}</span></h3>
            <span class="track" :class="e.track">{{ tracks[e.track] }}</span>
            <span v-if="e.end === null" class="badge">current</span>
          </div>
          <ul>
            <li v-for="(pt, i) in e.points" :key="i">{{ pt }}</li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.sec {
  display: grid;
  gap: 24px;
  scroll-margin-top: 96px;
}
.filters {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filters button {
  min-height: 40px;
  padding: 0 14px;
  font: 500 13px/1 var(--f-mono);
  color: var(--muted);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  transition: color var(--t-fast), border-color var(--t-fast), background-color var(--t-fast);
}
.filters button:hover {
  color: var(--ink);
  border-color: var(--ink);
}
.filters button[aria-pressed='true'] {
  color: var(--bg);
  background: var(--ink);
  border-color: var(--ink);
}
.filters .n {
  opacity: 0.65;
  margin-left: 4px;
}
.timeline {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
}
.timeline > li {
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
.timeline > li:first-child .rail::before {
  top: 10px;
}
.timeline > li:last-child .rail::before {
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
  gap: 8px;
  padding-bottom: 32px;
}
.title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
}
h3 {
  margin: 0;
  font: 700 19px/1.3 var(--f-display);
}
h3 span {
  color: var(--muted);
  font-weight: 600;
}
.track,
.badge {
  font: 500 11px/1 var(--f-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 4px 6px;
}
.track.games {
  color: var(--accent);
}
.track.web {
  color: var(--syn-str);
}
.badge {
  color: var(--warm);
}
.what ul {
  display: grid;
  gap: 4px;
  margin: 0;
  padding-left: 18px;
  max-width: 68ch;
  color: var(--muted);
}
.what ul li::marker {
  color: var(--rule);
}
@media (max-width: 640px) {
  .timeline > li {
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
