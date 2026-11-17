import { ref, watch } from 'vue';
import { storage } from './storage';

export type ViewMode = 'gui' | 'tty';
const KEY = 'gg-mode';

/** `#tty` / `#gui` in the URL wins, so a view can be linked directly. */
function initialMode(): ViewMode {
  const hash = location.hash.slice(1);
  if (hash === 'tty' || hash === 'gui') return hash;
  return storage.get(KEY) === 'tty' ? 'tty' : 'gui';
}

const mode = ref<ViewMode>(initialMode());
watch(mode, (m) => storage.set(KEY, m), { immediate: true });

export function useViewMode() {
  return { mode, setMode: (m: ViewMode) => (mode.value = m) };
}
