<script setup lang="ts">
import { computed, ref } from 'vue';
import WmWindow from './WmWindow.vue';
import { experiences, period, tracks, type Track } from '../../data/portfolio';

type Filter = 'all' | Track;
const filter = ref<Filter>('all');
const filters: Filter[] = ['all', ...(Object.keys(tracks) as Track[])];
const shown = computed(() => (filter.value === 'all' ? experiences : experiences.filter((e) => e.track === filter.value)));
</script>

<template>
  <WmWindow name="work" title="work — git log">
    <template #actions>
      <div class="filters" role="group" aria-label="Filter roles">
        <button v-for="f in filters" :key="f" type="button" :aria-pressed="filter === f" @click="filter = f">
          {{ f }}
        </button>
      </div>
    </template>

    <ol class="log">
      <li v-for="e in shown" :key="e.hash">
        <span class="when" :class="{ now: e.end === null }">{{ period(e) }}</span>
        <div>
          <h3>
            {{ e.role }}<span class="at">, {{ e.company }}</span>
            <span class="track">{{ tracks[e.track].toLowerCase() }}</span>
          </h3>
          <ul>
            <li v-for="(pt, i) in e.points" :key="i">{{ pt }}</li>
          </ul>
        </div>
      </li>
    </ol>
  </WmWindow>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 2px;
}
.filters button {
  min-height: 24px;
  padding: 0 8px;
  font: 400 12px/1 var(--f-mono);
  color: var(--muted);
  background: none;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
}
.filters button:hover {
  color: var(--ink);
}
.filters button[aria-pressed='true'] {
  color: var(--ink);
  border-color: var(--rule);
  background: var(--surface);
}
.log {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}
.log > li {
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr);
  gap: 4px 20px;
  padding-block: 14px;
  border-top: 1px solid var(--line);
}
.log > li:first-child {
  padding-top: 0;
  border-top: 0;
}
.when {
  padding-top: 2px;
  font: 400 12.5px/1.6 var(--f-mono);
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.when.now {
  color: var(--warm);
}
h3 {
  margin: 0 0 6px;
  font: 600 16px/1.4 var(--f-body);
}
.at {
  font-weight: 400;
  color: var(--muted);
}
.track {
  margin-left: 8px;
  font: 400 12px/1 var(--f-mono);
  color: var(--muted);
}
ul {
  display: grid;
  gap: 4px;
  margin: 0;
  padding-left: 16px;
  max-width: 64ch;
  font-size: 15px;
  color: var(--muted);
}
li::marker {
  color: var(--rule);
}
@media (max-width: 560px) {
  .log > li {
    grid-template-columns: 1fr;
  }
}
</style>
