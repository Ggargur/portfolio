<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Output } from '../../terminal/commands';
import {
  awards,
  education,
  experiences,
  links,
  period,
  profile,
  projects,
  skillCount,
  skills,
  spokenLanguages,
  tracks,
  yearsOfExperience,
} from '../../data/portfolio';
import { formatDate, useGithubRepos } from '../../composables/useGithubRepos';

const props = defineProps<{ out: Output }>();

const skillEntries = Object.entries(skills);
const { repos, status, error, load, retry } = useGithubRepos();

onMounted(() => {
  if (props.out.kind === 'repos') load();
});

// Logo as a pixel grid (block glyphs don't line up in every font): ink G + sky-blue G.
const G = ['.####.', '#.....', '#..##.', '#...#.', '.####.'];
const pixels = G.flatMap((row) => [...row, ' ', ...row].map((c, i) => (c === '#' ? (i < row.length ? 'p1' : 'p2') : '')));

const swatches = ['--ink', '--accent', '--accent-soft', '--warm', '--syn-str', '--muted'];

/* Hover preview of a game's cover next to the pointer (desktop only, decorative). */
const peek = ref<{ src: string; x: number; y: number } | null>(null);
function showPeek(src: string, e: MouseEvent) {
  peek.value = {
    src,
    x: Math.min(e.clientX + 18, window.innerWidth - 276),
    y: Math.min(e.clientY + 18, window.innerHeight - 150),
  };
}
const ext = { target: '_blank', rel: 'noopener noreferrer' };
</script>

<template>
  <!-- plain text lines -->
  <div v-if="out.kind === 'lines'" class="lines">
    <div v-for="(line, i) in out.lines" :key="i" class="pre">
      <template v-for="(seg, j) in line" :key="j">
        <a v-if="seg.href" :href="seg.href" v-bind="ext">{{ seg.t }}</a>
        <span v-else :class="seg.c">{{ seg.t }}</span>
      </template>
    </div>
  </div>

  <div v-else-if="out.kind === 'whoami'">
    <div class="big">{{ profile.name }}</div>
    <div class="dim">c# game developer · {{ yearsOfExperience }}+ years · vr · mobile · pc · console · fullstack on the side</div>
  </div>

  <div v-else-if="out.kind === 'neofetch'" class="neo">
    <div class="art" role="img" aria-label="GG logo">
      <span v-for="(on, i) in pixels" :key="i" :class="on"></span>
    </div>
    <dl>
      <dt class="who">{{ profile.handle }}@{{ profile.host }}</dt>
      <dd></dd>
      <dt>OS</dt>
      <dd>Game Developer</dd>
      <dt>Kernel</dt>
      <dd>Unity + C#</dd>
      <dt>Uptime</dt>
      <dd>shipping since {{ profile.careerStart }}</dd>
      <dt>Shell</dt>
      <dd>clojure <span class="dim">(day job @ {{ profile.dayJob.company }})</span></dd>
      <dt>Locale</dt>
      <dd>{{ profile.location }}</dd>
      <dt>Packages</dt>
      <dd>{{ skillCount }} (cat skills.json)</dd>
      <dd class="swatches" aria-hidden="true">
        <span v-for="s in swatches" :key="s" :style="{ background: `var(${s})` }"></span>
      </dd>
    </dl>
  </div>

  <div v-else-if="out.kind === 'ls'" class="scroll-x">
    <table class="ls">
      <caption class="sr-only">Games</caption>
      <tbody>
        <tr
          v-for="(p, i) in projects"
          :key="p.slug"
          @mouseenter="showPeek(p.image, $event)"
          @mousemove="showPeek(p.image, $event)"
          @mouseleave="peek = null"
        >
          <td class="dim">drwxr-xr-x</td>
          <td class="dim">{{ i + 1 }}</td>
          <td class="n">{{ p.host }}</td>
          <td><a :href="p.url" v-bind="ext" class="dir">{{ p.slug }}/</a></td>
          <td class="cm"># {{ p.description }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="peek" class="peek" :style="{ left: peek.x + 'px', top: peek.y + 'px' }" aria-hidden="true">
      <img :src="peek.src" alt="" />
    </div>
  </div>

  <ol v-else-if="out.kind === 'gitlog'" class="gitlog" aria-label="Work history">
    <li v-for="e in experiences" :key="e.hash">
      <span class="graph" aria-hidden="true">*</span>
      <span class="hash n">{{ e.hash }}</span>
      <span class="msg">
        <span v-if="e.end === null" class="head">(HEAD -&gt; main) </span>
        <b>{{ e.role }}</b> @ {{ e.company }} <span class="dim">[{{ period(e) }}]</span>
        <span :class="e.track === 'games' ? 'k' : 's'"> #{{ tracks[e.track].toLowerCase() }}</span>
        <span v-for="(pt, i) in e.points" :key="i" class="cm pt">{{ pt }}</span>
      </span>
    </li>
  </ol>

  <pre v-else-if="out.kind === 'skills'" class="json">{
<template v-for="([group, list], i) in skillEntries" :key="group">  <span class="k">"{{ group }}"</span>: [<template v-for="(s, j) in list" :key="s"><span class="s">"{{ s }}"</span>{{ j < list.length - 1 ? ', ' : '' }}</template>]{{ i < skillEntries.length - 1 ? ',' : '' }}
</template>}</pre>

  <div v-else-if="out.kind === 'contact'" class="contact">
    <div v-for="l in links" :key="l.key">
      <span class="k key">{{ l.key }}</span>
      <a :href="l.url" v-bind="l.key === 'email' ? {} : ext">{{ l.value }}</a>
    </div>
  </div>

  <div v-else-if="out.kind === 'repos'" class="repos" aria-live="polite">
    <div v-if="status === 'loading' || status === 'idle'" class="dim">fetching github.com/{{ profile.githubUser }} …</div>
    <div v-else-if="status === 'error'">
      <span class="warn">error: {{ error }}.</span>
      <button type="button" class="retry" @click="retry">retry</button>
      <span class="dim"> or browse </span>
      <a :href="`https://github.com/${profile.githubUser}`" v-bind="ext">github.com/{{ profile.githubUser }}</a>
    </div>
    <div v-else-if="repos.length === 0" class="dim">no public repositories yet.</div>
    <div v-else class="scroll-x">
      <table class="ls">
        <caption class="sr-only">Recent GitHub repositories</caption>
        <tbody>
          <tr v-for="r in repos" :key="r.id">
            <td><a :href="r.html_url" v-bind="ext" class="dir">{{ r.name }}</a></td>
            <td class="s">{{ r.language ?? '—' }}</td>
            <td class="dim">{{ formatDate(r.updated_at) }}</td>
            <td class="cm"># {{ r.description ?? 'no description' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else-if="out.kind === 'about'" class="about">
    <div><span class="k"># Awards</span></div>
    <div v-for="a in awards" :key="a.event">
      - {{ a.event }}, {{ a.project }}: <span class="warn">{{ a.prizes.join(' · ') }}</span>
    </div>
    <div class="gap"><span class="k"># Education</span></div>
    <div v-for="e in education" :key="e.title">- {{ e.title }} <span class="dim">· {{ e.place }}</span></div>
    <div class="gap"><span class="k"># Languages</span></div>
    <div>
      <template v-for="([lang, level], i) in spokenLanguages" :key="lang">
        {{ lang }} <span class="dim">({{ level.toLowerCase() }})</span>{{ i < spokenLanguages.length - 1 ? ' · ' : '' }}
      </template>
    </div>
  </div>

  <pre v-else-if="out.kind === 'cat'" class="json" role="img" aria-label="ASCII cat">  /\_/\
 ( o.o )
  &gt; ^ &lt;</pre>
</template>

<style scoped>
.pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.lines {
  display: grid;
}
.big {
  font: 700 clamp(22px, 4vw, 30px) / 1.25 var(--f-mono);
  letter-spacing: -0.01em;
}
.neo {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  align-items: flex-start;
}
.art {
  display: grid;
  grid-template-columns: repeat(13, 9px);
  grid-auto-rows: 9px;
  gap: 1px;
  padding-top: 4px;
}
.art .p1 {
  background: var(--ink);
}
.art .p2 {
  background: var(--accent);
}
dl {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 12px;
}
dt {
  color: var(--accent);
  font-weight: 700;
}
dt.who {
  color: var(--ink);
}
dd {
  margin: 0;
}
.swatches {
  display: flex;
  margin-top: 8px;
  grid-column: 1 / -1;
}
.swatches span {
  width: 26px;
  height: 14px;
}
.scroll-x {
  overflow-x: auto;
}
.ls {
  border-collapse: collapse;
  white-space: nowrap;
}
.ls td {
  padding: 2px 18px 2px 0;
  vertical-align: top;
}
.ls tr:hover td {
  background: color-mix(in srgb, var(--accent-soft) 35%, transparent);
}
.dir {
  color: var(--syn-key);
  font-weight: 700;
  text-decoration: none;
}
.dir:hover {
  text-decoration: underline;
}
.peek {
  position: fixed;
  z-index: var(--z-peek);
  width: 260px;
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  overflow: hidden;
  pointer-events: none;
  background: var(--surface);
}
.peek img {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 1;
  object-fit: cover;
}
@media (hover: none) {
  .peek {
    display: none;
  }
}
.gitlog {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.gitlog li {
  display: grid;
  grid-template-columns: 2ch 8ch 1fr;
  gap: 0 10px;
  position: relative;
}
.gitlog li:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 0.45ch;
  top: 1.5em;
  bottom: -10px;
  border-left: 1px solid var(--warm);
}
.graph {
  color: var(--warm);
}
.head {
  color: var(--syn-str);
  font-weight: 700;
}
.msg {
  min-width: 0;
  overflow-wrap: anywhere;
}
.pt {
  display: block;
}
.pt::before {
  content: '  ';
}
.about {
  display: grid;
}
.about .gap {
  margin-top: 10px;
}
.json {
  margin: 0;
  font: inherit;
  white-space: pre-wrap;
}
.contact {
  display: grid;
}
.contact .key {
  display: inline-block;
  width: 10ch;
}
.contact a {
  overflow-wrap: anywhere;
}
.retry {
  font: inherit;
  color: var(--accent);
  background: none;
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 0 8px;
  margin-left: 6px;
  min-height: 28px;
}
@media (max-width: 640px) {
  .gitlog li {
    grid-template-columns: 2ch 1fr;
  }
  .hash {
    display: none;
  }
}
</style>
