import { ref } from 'vue';
import { run, type Output } from './commands';
import { useViewMode } from '../composables/useViewMode';
import { useTheme } from '../composables/useTheme';

export interface Entry {
  id: number;
  input: string;
  output: Output[];
}

let nextId = 0;

/** One independent shell session (the TTY view and the console each own one). */
export function useShell(opts: { exit?: () => void } = {}) {
  const entries = ref<Entry[]>([]);
  const { setMode } = useViewMode();
  const { theme, setTheme } = useTheme();

  function submit(input: string) {
    if (!input.trim()) return;
    const output = run(input, {
      setMode,
      setTheme,
      theme: () => theme.value,
      clear: () => (entries.value = []),
      exit: opts.exit,
    });
    if (output) entries.value.push({ id: nextId++, input: input.trim(), output });
  }

  return { entries, submit };
}
