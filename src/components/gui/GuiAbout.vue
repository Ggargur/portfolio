<script setup lang="ts">
import SectionHead from './SectionHead.vue';
import { awards, education, profile, spokenLanguages } from '../../data/portfolio';
</script>

<template>
  <section id="about" class="sec" aria-labelledby="h-about">
    <SectionHead id="h-about" title="Background" cmd="cat about.md" />
    <div class="grid">
      <div class="col">
        <h3>Awards</h3>
        <div v-for="a in awards" :key="a.event" class="award">
          <strong>{{ a.event }}</strong>
          <span class="muted">{{ a.project }}</span>
          <ul class="prizes">
            <li v-for="p in a.prizes" :key="p">{{ p }}</li>
          </ul>
        </div>
      </div>

      <div class="col">
        <h3>Education</h3>
        <div v-for="e in education" :key="e.title" class="item">
          <strong>{{ e.title }}</strong>
          <span class="muted">{{ e.place }}</span>
        </div>
      </div>

      <div class="col">
        <h3>Languages</h3>
        <dl class="langs">
          <template v-for="[lang, level] in spokenLanguages" :key="lang">
            <dt>{{ lang }}</dt>
            <dd>{{ level }}</dd>
          </template>
        </dl>
        <p class="muted loc">Based in {{ profile.location }}</p>
      </div>
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1.5px solid var(--ink);
}
.col {
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 20px 24px 8px 0;
}
.col + .col {
  padding-left: 24px;
  border-left: 1px solid var(--rule);
}
h3 {
  margin: 0;
  font: 500 13px/1 var(--f-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}
strong {
  font: 700 17px/1.3 var(--f-display);
}
.muted {
  color: var(--muted);
}
.award,
.item {
  display: grid;
  gap: 2px;
}
.prizes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}
.prizes li {
  font: 500 12px/1 var(--f-mono);
  color: var(--warm);
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 5px 7px;
}
.langs {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 16px;
  margin: 0;
}
.langs dt {
  font-weight: 600;
}
.langs dd {
  margin: 0;
  color: var(--muted);
}
.loc {
  margin: 4px 0 0;
  font: 400 13px/1.5 var(--f-mono);
}
@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .col,
  .col + .col {
    padding: 18px 0;
    border-left: 0;
  }
  .col + .col {
    border-top: 1px solid var(--rule);
  }
}
</style>
