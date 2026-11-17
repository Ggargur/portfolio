<script setup lang="ts">
import { ref } from 'vue';
import WmWindow from './WmWindow.vue';
import WorkPane from './WorkPane.vue';
import GamesPane from './GamesPane.vue';
import ReposPane from './ReposPane.vue';
import {
  awards,
  education,
  email,
  links,
  profile,
  skills,
  spokenLanguages,
  yearsOfExperience,
} from '../../data/portfolio';

const others = links.filter((l) => l.key !== 'email');

const copyState = ref<'idle' | 'copied' | 'failed'>('idle');
let timer = 0;
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email);
    copyState.value = 'copied';
  } catch {
    copyState.value = 'failed';
  }
  window.clearTimeout(timer);
  timer = window.setTimeout(() => (copyState.value = 'idle'), 3000);
}
</script>

<template>
  <div class="desktop">
    <WmWindow name="about" class="a-about">
      <div class="about">
        <h1>{{ profile.fullName }}</h1>
        <p class="role">{{ profile.role }} · {{ profile.location }}</p>
        <p>
          C# game developer with {{ yearsOfExperience }}+ years across VR, mobile, PC and console. Most recently I led the
          programming team on a 2.5D metroidvania at Darkside. Before that I worked on
          <em>God of War: Sons of Sparta</em> at Mega Cat Studios and built VR exhibits for a science museum.
        </p>
        <p>I also build web applications. Right now I work in Clojure and ClojureScript at {{ profile.dayJob.company }}.</p>
      </div>
    </WmWindow>

    <WmWindow name="contact" class="a-contact">
      <div class="contact">
        <p class="mail">
          <a :href="`mailto:${email}`">{{ email }}</a>
          <button type="button" @click="copyEmail">{{ copyState === 'copied' ? 'copied' : 'copy' }}</button>
        </p>
        <p class="status" role="status">
          <template v-if="copyState === 'copied'">Address copied to the clipboard.</template>
          <template v-else-if="copyState === 'failed'">Couldn't copy. Select the address and copy it manually.</template>
        </p>
        <dl class="kv">
          <template v-for="l in others" :key="l.key">
            <dt>{{ l.label }}</dt>
            <dd><a :href="l.url" target="_blank" rel="noopener noreferrer">{{ l.value }}</a></dd>
          </template>
        </dl>
      </div>
    </WmWindow>

    <WorkPane class="a-work" />
    <GamesPane class="a-games" />

    <WmWindow name="skills" title="skills — skills.json" class="a-skills">
      <dl class="kv wide">
        <template v-for="(list, group) in skills" :key="group">
          <dt>{{ group }}</dt>
          <dd>{{ list.join(' · ') }}</dd>
        </template>
      </dl>
    </WmWindow>

    <WmWindow name="background" title="background — about.md" class="a-bg">
      <dl class="kv wide">
        <template v-for="a in awards" :key="a.event">
          <dt>Awards</dt>
          <dd>{{ a.event }}, {{ a.project }}: {{ a.prizes.join(', ') }}</dd>
        </template>
        <dt>Education</dt>
        <dd>
          <span v-for="e in education" :key="e.title" class="line">{{ e.title }}, {{ e.place }}</span>
        </dd>
        <dt>Languages</dt>
        <dd>{{ spokenLanguages.map(([l, lvl]) => `${l} (${lvl.toLowerCase()})`).join(' · ') }}</dd>
      </dl>
    </WmWindow>

    <ReposPane class="a-repos" />
  </div>
</template>

<style scoped>
/* Tiling layout: the ASCII wallpaper shows through the gaps. */
.desktop {
  display: grid;
  gap: var(--gap);
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  grid-template-rows: auto auto auto 1fr auto;
  grid-template-areas:
    'about contact'
    'work games'
    'work skills'
    'work bg'
    'repos repos';
  align-items: stretch;
}
.a-about { grid-area: about; }
.a-contact { grid-area: contact; }
.a-work { grid-area: work; }
.a-games { grid-area: games; }
.a-skills { grid-area: skills; }
.a-bg { grid-area: bg; }
.a-repos { grid-area: repos; }

@media (max-width: 900px) {
  .desktop {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: none;
    grid-template-areas: 'about' 'contact' 'work' 'games' 'skills' 'bg' 'repos';
  }
}

.about {
  display: grid;
  gap: 12px;
  max-width: 64ch;
}
h1 {
  margin: 0;
  font: 600 clamp(28px, 3.6vw, 38px) / 1.1 var(--f-body);
  letter-spacing: -0.015em;
}
.role {
  margin: 0 0 4px;
  font: 400 13px/1.5 var(--f-mono);
  color: var(--muted);
}
.about p {
  margin: 0;
}
.about p:not(.role) {
  color: var(--ink);
}
em {
  font-style: italic;
}

.contact {
  display: grid;
  gap: 6px;
}
.mail {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 12px;
  margin: 0;
}
.mail a {
  font: 600 clamp(17px, 2vw, 20px) / 1.3 var(--f-body);
  color: var(--ink);
  text-decoration-color: var(--accent);
  text-underline-offset: 4px;
  overflow-wrap: anywhere;
}
.mail a:hover {
  color: var(--accent);
}
.mail button {
  min-height: 26px;
  padding: 0 10px;
  font: 400 12px/1 var(--f-mono);
  color: var(--muted);
  background: var(--surface-2);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
}
.mail button:hover {
  color: var(--ink);
  border-color: var(--accent);
}
.status {
  min-height: 1.5em;
  margin: 0;
  font: 400 12px/1.5 var(--f-mono);
  color: var(--muted);
}

.kv {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 8px 20px;
  margin: 0;
}
.kv dt {
  font: 400 12.5px/1.75 var(--f-mono);
  color: var(--muted);
}
.kv dd {
  margin: 0;
  overflow-wrap: anywhere;
}
.kv.wide dt {
  min-width: 8.5rem;
}
.kv a {
  font: 400 14px/1.6 var(--f-mono);
}
.line {
  display: block;
}
@media (max-width: 480px) {
  .kv.wide {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .kv.wide dd {
    margin-bottom: 10px;
  }
}
</style>
