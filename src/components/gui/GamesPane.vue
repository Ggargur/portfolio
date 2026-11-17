<script setup lang="ts">
import WmWindow from './WmWindow.vue';
import { projects } from '../../data/portfolio';
</script>

<template>
  <WmWindow name="games" title="games — ~/games">
    <ul class="list">
      <li v-for="p in projects" :key="p.slug">
        <component
          :is="p.url ? 'a' : 'div'"
          class="item"
          v-bind="p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
        >
          <img v-if="p.image" :src="p.image" :alt="`${p.title} cover art`" loading="lazy" width="120" height="60" />
          <span v-else class="ph" aria-hidden="true">{{ p.title.split(':')[0] }}</span>
          <span class="text">
            <span class="name">{{ p.title }}</span>
            <span class="desc">{{ p.description }}</span>
            <span class="meta">
              {{ [p.credit, ...p.tags].filter(Boolean).join(' · ') }} — {{ p.host }}<template v-if="p.url">&nbsp;↗</template>
            </span>
          </span>
        </component>
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
.item {
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
li:first-child .item {
  padding-top: 0;
}
a.item:hover {
  background: var(--surface-2);
}
img,
.ph {
  display: block;
  width: 120px;
  height: 60px;
  object-fit: contain;
  border: 1px solid var(--line);
  border-radius: 3px;
  background: var(--surface-2);
}
.ph {
  display: grid;
  place-items: center;
  padding: 4px;
  font: 500 11px/1.2 var(--f-mono);
  text-align: center;
  color: var(--muted);
  box-sizing: border-box;
}
.text {
  display: grid;
  gap: 2px;
}
.name {
  font-weight: 600;
}
a.item:hover .name {
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
  .item {
    grid-template-columns: 1fr;
  }
  img,
  .ph {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 1;
  }
}
</style>
