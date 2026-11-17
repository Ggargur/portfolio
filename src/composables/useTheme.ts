import { ref, watch } from 'vue';
import { storage } from './storage';

export type Theme = 'light' | 'dark';
const KEY = 'gg-theme';

function initialTheme(): Theme {
  const saved = storage.get(KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  // index.html already resolved it before first paint.
  const pre = document.documentElement.getAttribute('data-theme');
  if (pre === 'light' || pre === 'dark') return pre;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Module-level so every caller shares one theme.
const theme = ref<Theme>(initialTheme());
let explicit = storage.get(KEY) !== null;

watch(
  theme,
  (t) => {
    document.documentElement.setAttribute('data-theme', t);
    if (explicit) storage.set(KEY, t);
  },
  { immediate: true },
);

// Follow the OS setting until the visitor picks a theme themselves.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!explicit) theme.value = e.matches ? 'dark' : 'light';
});

export function useTheme() {
  function setTheme(t: Theme) {
    explicit = true;
    theme.value = t;
  }
  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  }
  return { theme, setTheme, toggleTheme };
}
