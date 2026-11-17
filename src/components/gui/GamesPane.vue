<script setup lang="ts">
import WmWindow from './WmWindow.vue';
import { projects } from '../../data/portfolio';
</script>

<template>
  <WmWindow name="games" title="games — ~/games">
    <ul class="list">
      <li v-for="p in projects" :key="p.slug">
        <a :href="p.url" target="_blank" rel="noopener noreferrer">
          <img :src="p.image" :alt="`${p.title} cover art`" loading="lazy" width="120" height="60" />
          <span class="text">
            <span class="name">{{ p.title }}</span>
            <span class="desc">{{ p.description }}</span>
            <span class="meta">{{ p.tags.join(' · ') }} — {{ p.host }}&nbsp;↗</span>
          </span>
        </a>
      </li>
    </ul>
  </WmWindow>
</template>

<style scoped>
.list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}
li + li {
  border-top: 1px solid var(--line);
}
a {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding-block: 12px;
  margin-inline: -8px;
  padding-inline: 8px;
  border-radius: var(--r-sm);
  color: var(--ink);
  text-decoration: none;
  transition: background-color var(--t-fast);
}
li:first-child a {
  padding-top: 0;
}
a:hover {
  background: var(--surface-2);
}
img {
  display: block;
  width: 120px;
  height: 60px;
  object-fit: contain;
  border: 1px solid var(--line);
  border-radius: 3px;
  background: var(--surface-2);
}
.text {
  display: grid;
  gap: 2px;
}
.name {
  font-weight: 600;
}
a:hover .name {
  color: var(--accent);
}
.desc {
  font-size: 14.5px;
  color: var(--muted);
}
.meta {
  font: 400 12px/1.5 var(--f-mono);
  color: var(--muted);
}
@media (max-width: 400px) {
  a {
    grid-template-columns: 1fr;
  }
  img {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 1;
  }
}
</style>
