<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import logo from '../assets/logo.webp';
import { profile } from '../data/portfolio';
import { useTheme } from '../composables/useTheme';
import { useViewMode, type ViewMode } from '../composables/useViewMode';
import { useWm } from '../composables/useWm';

defineProps<{ consoleOpen: boolean }>();
const emit = defineEmits<{ toggleConsole: [] }>();

const { theme, toggleTheme } = useTheme();
const { mode, setMode } = useViewMode();
const { focused } = useWm();

const workspaces: { id: ViewMode; n: number; label: string }[] = [
  { id: 'gui', n: 1, label: 'gui' },
  { id: 'tty', n: 2, label: 'tty' },
];

const title = computed(() =>
  mode.value === 'gui' ? `${profile.handle}@${profile.host}: ${focused.value}` : `${profile.handle}@${profile.host}: ~ — zsh`,
);

const clock = ref('');
let timer = 0;
function tick() {
  clock.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
onMounted(() => {
  tick();
  timer = window.setInterval(tick, 15_000);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <header class="bar">
    <div class="wrap row">
      <div class="left">
        <a class="brand" href="#top" aria-label="Gabriel Gargur, back to top">
          <img :src="logo" alt="" width="22" height="22" />
        </a>
        <nav class="ws" aria-label="Workspaces">
          <button
            v-for="w in workspaces"
            :key="w.id"
            type="button"
            :aria-pressed="mode === w.id"
            :aria-label="`Workspace ${w.n}: ${w.id === 'gui' ? 'visual layout' : 'terminal'}`"
            @click="setMode(w.id)"
          >
            <span class="num">{{ w.n }}</span> {{ w.label }}
          </button>
        </nav>
      </div>

      <span class="title" aria-hidden="true">{{ title }}</span>

      <div class="right">
        <button
          type="button"
          class="tool"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2" />
            <path
              d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
          <span class="txt">{{ theme }}</span>
        </button>
        <button
          type="button"
          class="tool"
          :aria-expanded="consoleOpen"
          aria-controls="console"
          aria-label="Open console (shortcut: backtick)"
          @click="emit('toggleConsole')"
        >
          <span aria-hidden="true">&gt;_</span><span class="txt">console</span>
        </button>
        <span class="clock" aria-hidden="true">{{ clock }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.bar {
  position: sticky;
  top: env(safe-area-inset-top, 0px);
  z-index: var(--z-bar);
  background: var(--surface);
  border-bottom: 1px solid var(--rule);
  font: 400 13px/1 var(--f-mono);
}
.row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  min-height: 40px;
}
.left,
.right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.right {
  justify-content: flex-end;
}
.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 4px;
}
.brand img {
  border-radius: 3px;
  background: var(--logo-tile);
}
.ws {
  display: flex;
  gap: 2px;
}
.ws button,
.tool {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 10px;
  font: inherit;
  color: var(--muted);
  background: none;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  transition: color var(--t-fast), background-color var(--t-fast), border-color var(--t-fast);
}
.ws button:hover,
.tool:hover {
  color: var(--ink);
  border-color: var(--line);
}
.ws button[aria-pressed='true'] {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent-soft) 55%, var(--surface));
  border-color: var(--accent);
}
.num {
  color: var(--accent);
}
.title {
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.clock {
  padding-left: 8px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
@media (max-width: 760px) {
  .row {
    grid-template-columns: 1fr auto;
  }
  .title,
  .clock,
  .txt {
    display: none;
  }
}
</style>
