<script setup lang="ts">
import logo from '../assets/logo.webp';
import { profile } from '../data/portfolio';
import { useTheme } from '../composables/useTheme';
import { useViewMode, type ViewMode } from '../composables/useViewMode';

defineProps<{ consoleOpen: boolean }>();
const emit = defineEmits<{ toggleConsole: [] }>();

const { theme, toggleTheme } = useTheme();
const { mode, setMode } = useViewMode();

const modes: { id: ViewMode; label: string; hint: string }[] = [
  { id: 'gui', label: 'GUI', hint: 'Visual layout' },
  { id: 'tty', label: 'TTY', hint: 'Terminal layout' },
];

const nav = [
  { href: '#games', label: 'Games' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'Background' },
  { href: '#contact', label: 'Contact' },
];
</script>

<template>
  <header class="bar">
    <div class="wrap row">
      <a class="brand" href="#top" aria-label="Gabriel Gargur, back to top">
        <img :src="logo" alt="" width="36" height="36" />
        <span>{{ profile.handle }}<b>@</b>{{ profile.host }}</span>
      </a>

      <nav v-if="mode === 'gui'" class="nav" aria-label="Sections">
        <a v-for="n in nav" :key="n.href" :href="n.href">{{ n.label }}</a>
      </nav>

      <div class="tools">
        <div class="seg" role="group" aria-label="View mode">
          <button
            v-for="m in modes"
            :key="m.id"
            type="button"
            :aria-pressed="mode === m.id"
            :title="m.hint"
            @click="setMode(m.id)"
          >
            {{ m.label }}
          </button>
        </div>

        <button
          type="button"
          class="icon-btn"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          :title="theme === 'dark' ? 'Light theme' : 'Dark theme'"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2" />
            <path
              d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          class="icon-btn con"
          :aria-expanded="consoleOpen"
          aria-controls="console"
          aria-label="Open console (shortcut: backtick)"
          @click="emit('toggleConsole')"
        >
          <span aria-hidden="true">&gt;_</span><kbd aria-hidden="true">`</kbd>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.bar {
  position: sticky;
  top: env(safe-area-inset-top, 0px);
  z-index: var(--z-bar);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.row {
  display: flex;
  align-items: center;
  gap: 12px 20px;
  padding-block: 10px;
  flex-wrap: wrap;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink);
  min-height: 44px;
}
.brand img {
  border-radius: var(--r-sm);
  background: var(--logo-tile);
}
.brand span {
  font: 500 14px/1 var(--f-mono);
}
.brand b {
  color: var(--accent);
  font-weight: 500;
}
.nav {
  display: flex;
  gap: 4px;
  margin-right: auto;
}
.nav a {
  font: 500 14px/1 var(--f-body);
  color: var(--muted);
  text-decoration: none;
  padding: 10px 10px;
  border-radius: var(--r-sm);
  transition: color var(--t-fast);
}
.nav a:hover {
  color: var(--ink);
}
.tools {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
.seg {
  display: inline-flex;
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  padding: 2px;
  background: var(--surface);
}
.seg button {
  font: 500 13px/1 var(--f-mono);
  color: var(--muted);
  background: none;
  border: 0;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 4px;
  transition: color var(--t-fast), background-color var(--t-fast);
}
.seg button:hover {
  color: var(--ink);
}
.seg button[aria-pressed='true'] {
  background: var(--ink);
  color: var(--bg);
}
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 44px;
  min-height: 44px;
  padding: 0 10px;
  font: 500 13px/1 var(--f-mono);
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  transition: border-color var(--t-fast), color var(--t-fast);
}
.icon-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.icon-btn kbd {
  font: inherit;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 1px 5px;
}
@media (max-width: 820px) {
  .nav {
    display: none;
  }
}
@media (max-width: 420px) {
  .brand span,
  .con kbd {
    display: none;
  }
}
</style>
