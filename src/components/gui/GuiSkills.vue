<script setup lang="ts">
import SectionHead from './SectionHead.vue';
import { skillCount, skills } from '../../data/portfolio';
</script>

<template>
  <section id="skills" class="sec" aria-labelledby="h-skills">
    <SectionHead id="h-skills" title="Skills" cmd="cat skills.json" :meta="`${skillCount} entries`" />
    <dl class="table">
      <div v-for="(list, group) in skills" :key="group" class="row">
        <dt>{{ group }}</dt>
        <dd>
          <ul>
            <li v-for="s in list" :key="s">{{ s }}</li>
          </ul>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.sec {
  display: grid;
  gap: 28px;
  scroll-margin-top: 96px;
}
.table {
  margin: 0;
  border-top: 1.5px solid var(--ink);
}
.row {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 12px 40px;
  align-items: center;
  padding-block: 18px;
  border-bottom: 1px solid var(--rule);
}
dt {
  font: 500 13px/1 var(--f-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}
dd {
  margin: 0;
}
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  font: 600 15px/1 var(--f-body);
  padding: 9px 12px;
  background: var(--surface);
  border: 1.5px solid var(--ink);
  border-radius: var(--r-sm);
}
@media (max-width: 640px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
