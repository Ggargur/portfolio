import { ref } from 'vue';

/** Which GUI window has focus, like a tiling WM. Shown in the status bar. */
const focused = ref('about');

export function useWm() {
  return { focused, focus: (name: string) => (focused.value = name) };
}
