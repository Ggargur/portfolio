<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import Ps1 from './tty/Ps1.vue';
import TermBlock from './tty/TermBlock.vue';
import ShellInput from './tty/ShellInput.vue';
import { useShell } from '../terminal/useShell';

/** Drop-down console, like the ones in games and Guake/Yakuake. Works in both views. */
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();

const { entries, submit } = useShell({ exit: () => emit('close') });
const shell = ref<InstanceType<typeof ShellInput> | null>(null);
const log = ref<HTMLElement | null>(null);
let returnFocus: HTMLElement | null = null;

watch(
  () => props.open,
  async (open) => {
    if (open) {
      returnFocus = document.activeElement as HTMLElement | null;
      await nextTick();
      shell.value?.focus();
    } else {
      returnFocus?.focus?.();
    }
  },
);

async function onSubmit(line: string) {
  submit(line);
  await nextTick();
  if (log.value) log.value.scrollTop = log.value.scrollHeight;
}

/* Keep Tab inside the console while it's open. */
function trap(e: KeyboardEvent) {
  if (e.key !== 'Tab') return;
  const root = e.currentTarget as HTMLElement;
  const items = [...root.querySelectorAll<HTMLElement>('a[href], button, input')];
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
</script>

<template>
  <div class="scrim" :class="{ open }" aria-hidden="true" @click="emit('close')"></div>
  <div
    id="console"
    class="console"
    :class="{ open }"
    role="dialog"
    aria-modal="true"
    aria-label="Console"
    :inert="!open"
    @keydown="trap"
  >
    <div class="head wrap">
      <span>gargur-console · type <span class="k">help</span></span>
      <button type="button" @click="emit('close')">close <kbd>esc</kbd></button>
    </div>
    <div ref="log" class="log wrap" aria-live="polite">
      <div class="dim">This console works in both views. Try <span class="k">help</span> or <span class="k">sudo hire-me</span>.</div>
      <div v-for="e in entries" :key="e.id" class="entry">
        <Ps1 user="guest" :cmd="e.input" />
        <TermBlock v-for="(o, i) in e.output" :key="i" :out="o" />
      </div>
    </div>
    <div class="input wrap">
      <ShellInput ref="shell" input-id="console-input" @submit="onSubmit" @escape="emit('close')" />
    </div>
  </div>
</template>

<style scoped>
.scrim {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-console) - 1);
  background: var(--scrim);
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--t-med), visibility 0s linear var(--t-med);
}
.scrim.open {
  opacity: 1;
  visibility: visible;
  transition: opacity var(--t-med);
}
.console {
  position: fixed;
  inset: 0 0 auto;
  z-index: var(--z-console);
  height: min(56vh, 460px);
  padding-top: env(safe-area-inset-top, 0px);
  background: var(--surface-2);
  border-bottom: 2px solid var(--accent);
  font: 400 14px/1.6 var(--f-mono);
  display: grid;
  grid-template-rows: auto 1fr auto;
  transform: translateY(-104%);
  visibility: hidden;
  transition: transform 160ms ease-in, visibility 0s linear 160ms;
}
.console.open {
  transform: none;
  visibility: visible;
  transition: transform var(--t-med) var(--ease-out);
}
@media (prefers-reduced-motion: reduce) {
  .console,
  .console.open,
  .scrim,
  .scrim.open {
    transition: none;
  }
}
.wrap {
  width: 100%;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-block: 8px 4px;
  color: var(--muted);
  font-size: 12.5px;
}
.head button {
  font: inherit;
  color: var(--muted);
  background: none;
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  min-height: 32px;
  padding: 0 10px;
}
.head button:hover {
  color: var(--ink);
  border-color: var(--rule);
}
.head kbd {
  font: inherit;
  opacity: 0.7;
}
.log {
  overflow-y: auto;
  overscroll-behavior: contain;
  display: grid;
  gap: 14px;
  align-content: start;
  padding-block: 6px;
}
.entry {
  display: grid;
  gap: 6px;
}
.input {
  border-top: 1px solid var(--line);
  padding-block: 6px 10px;
}
</style>
