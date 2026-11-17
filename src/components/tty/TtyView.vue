<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import Ps1 from './Ps1.vue';
import TermBlock from './TermBlock.vue';
import ShellInput from './ShellInput.vue';
import { useShell } from '../../terminal/useShell';
import type { BlockKind } from '../../terminal/commands';
import { profile } from '../../data/portfolio';
import { prefersReducedMotion } from '../../composables/storage';

const script: { cmd: string; kind: BlockKind }[] = [
  { cmd: 'neofetch', kind: 'neofetch' },
  { cmd: 'ls -la ~/games/', kind: 'ls' },
  { cmd: 'git log --graph experience', kind: 'gitlog' },
  { cmd: 'cat skills.json', kind: 'skills' },
  { cmd: 'cat about.md', kind: 'about' },
  { cmd: 'gh repo list --limit 6', kind: 'repos' },
  { cmd: 'cat contact.txt', kind: 'contact' },
];

const { entries, submit } = useShell();
const shell = ref<InstanceType<typeof ShellInput> | null>(null);
const live = ref<HTMLElement | null>(null);

// Type `whoami` once per mount; the rest of the output is static so the page reads at a glance.
const typed = ref('whoami');
onMounted(() => {
  if (prefersReducedMotion()) return;
  const word = typed.value;
  let i = 0;
  typed.value = '';
  const t = window.setInterval(() => {
    typed.value = word.slice(0, ++i);
    if (i >= word.length) window.clearInterval(t);
  }, 70);
});

async function onSubmit(line: string) {
  submit(line);
  await nextTick();
  shell.value?.el?.scrollIntoView({ block: 'nearest' });
}
</script>

<template>
  <section class="term" aria-label="Terminal view">
    <div class="term-bar">
      <span>{{ profile.handle }}@{{ profile.host }}: ~ — zsh</span>
    </div>
    <div class="term-body">
      <div class="block">
        <Ps1><span>{{ typed }}</span><span class="caret" aria-hidden="true"></span></Ps1>
        <h1 class="sr-only">{{ profile.name }}</h1>
        <TermBlock :out="{ kind: 'whoami' }" />
      </div>

      <div v-for="s in script" :id="s.kind === 'ls' ? 'games' : undefined" :key="s.cmd" class="block">
        <Ps1 :cmd="s.cmd" />
        <TermBlock :out="{ kind: s.kind }" />
      </div>

      <div ref="live" class="block" aria-live="polite">
        <div v-for="e in entries" :key="e.id" class="block">
          <Ps1 user="guest" :cmd="e.input" />
          <TermBlock v-for="(o, i) in e.output" :key="i" :out="o" />
        </div>
      </div>
      <div class="block">
        <ShellInput ref="shell" input-id="tty-input" placeholder="type help" @submit="onSubmit" />
        <p class="hint">Try <span class="k">help</span>, <span class="k">open kitty</span> or <span class="k">gui</span>.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.term {
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  border: 1px solid var(--rule);
  border-radius: var(--r);
  overflow: hidden;
  font: 400 14px/1.65 var(--f-mono);
}
.term-bar {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 14px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line);
  font-size: 12.5px;
  color: var(--muted);
}
.term-body {
  padding: 20px clamp(14px, 3vw, 28px) 24px;
  display: grid;
  gap: 26px;
}
.block {
  display: grid;
  gap: 8px;
  min-width: 0;
}
.block:empty {
  display: none;
}
.caret {
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -0.2em;
  background: var(--accent);
}
@media (prefers-reduced-motion: no-preference) {
  .caret {
    animation: blink 1.05s steps(1) infinite;
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.hint {
  margin: 0;
  color: var(--muted);
  font-size: 12.5px;
}
@media (max-width: 640px) {
  .term {
    font-size: 13px;
  }
}
</style>
