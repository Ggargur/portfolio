<script setup lang="ts">
import SectionHead from './SectionHead.vue';
import { projects } from '../../data/portfolio';

// The flagship gets the big slot; the rest stack beside it.
const ordered = [...projects].sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship));
</script>

<template>
  <section id="games" class="sec" aria-labelledby="h-games">
    <SectionHead id="h-games" title="Games" cmd="ls ~/games" :meta="`${projects.length} titles`" />
    <div class="grid">
      <a
        v-for="p in ordered"
        :key="p.slug"
        class="card"
        :class="{ flagship: p.flagship }"
        :href="p.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="p.image" :alt="`${p.title} cover art`" loading="lazy" />
        <div class="body">
          <span v-if="p.flagship" class="status">in development</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
          <ul class="tags" aria-label="Tags">
            <li class="host">{{ p.host }}</li>
            <li v-for="t in p.tags" :key="t">{{ t }}</li>
          </ul>
          <span class="go">Open on {{ p.host }} <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.sec {
  display: grid;
  gap: 28px;
  scroll-margin-top: 96px;
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 20px;
}
.card {
  display: grid;
  grid-template-rows: auto 1fr;
  text-decoration: none;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  overflow: hidden;
  transition: transform var(--t-fast) var(--ease-out), box-shadow var(--t-fast) var(--ease-out),
    border-color var(--t-fast);
}
.card:hover {
  transform: translate(-3px, -3px);
  box-shadow: var(--offset);
  border-color: var(--ink);
}
.card:active {
  transform: none;
  box-shadow: none;
}
.flagship {
  grid-row: span 2;
}
img {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 1;
  object-fit: cover;
  border-bottom: 1px solid var(--line);
  background: var(--surface-2);
}
.flagship img {
  aspect-ratio: 460 / 215;
}
.body {
  display: grid;
  gap: 10px;
  align-content: start;
  padding: 18px 20px 20px;
}
.status {
  font: 500 12px/1 var(--f-mono);
  color: var(--warm);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
h3 {
  margin: 0;
  font: 700 22px/1.15 var(--f-display);
  letter-spacing: -0.01em;
}
.flagship h3 {
  font-size: clamp(26px, 3vw, 34px);
}
p {
  margin: 0;
  color: var(--muted);
  max-width: 52ch;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tags li {
  font: 500 12px/1 var(--f-mono);
  padding: 6px 8px;
  border: 1px solid var(--line);
  border-radius: 4px;
  color: var(--muted);
  background: var(--surface-2);
}
.tags .host {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
}
.go {
  margin-top: 4px;
  font: 500 13px/1 var(--f-mono);
  color: var(--accent);
}
@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
  }
}
@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .flagship {
    grid-row: auto;
  }
}
</style>
