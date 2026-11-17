<script setup lang="ts">
import { ref } from 'vue';
import { profile } from '../../data/portfolio';

const props = defineProps<{ inputId: string; placeholder?: string }>();
const emit = defineEmits<{ submit: [line: string]; escape: [] }>();

const value = ref('');
const input = ref<HTMLInputElement | null>(null);
const history: string[] = [];
let cursor = 0;

function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    const line = value.value;
    value.value = '';
    if (line.trim()) {
      history.push(line);
      cursor = history.length;
    }
    emit('submit', line);
  } else if (e.key === 'ArrowUp') {
    if (cursor > 0) {
      e.preventDefault();
      value.value = history[--cursor];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    cursor = Math.min(history.length, cursor + 1);
    value.value = history[cursor] ?? '';
  } else if (e.key === 'Escape') {
    emit('escape');
  }
}

defineExpose({ focus: () => input.value?.focus(), el: input });
</script>

<template>
  <div class="line">
    <label :for="props.inputId" class="ps1">
      <span class="u">guest</span>@<span class="h">{{ profile.host }}</span>:~$<span class="sr-only"> command</span>
    </label>
    <input
      :id="props.inputId"
      ref="input"
      v-model="value"
      type="text"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      enterkeyhint="send"
      :placeholder="placeholder"
      @keydown="onKey"
    />
  </div>
</template>

<style scoped>
.line {
  display: flex;
  align-items: center;
  gap: 1ch;
  min-height: 32px;
}
.ps1 {
  color: var(--muted);
  white-space: nowrap;
}
.u {
  color: var(--syn-str);
}
.h {
  color: var(--syn-key);
}
input {
  flex: 1;
  min-width: 6ch;
  background: none;
  border: 0;
  outline: none;
  color: var(--ink);
  font: inherit;
  font-size: max(16px, 1em); /* 16px+ avoids iOS zoom on focus */
  caret-color: var(--accent);
  padding: 4px 0;
}
input::placeholder {
  color: var(--muted);
  opacity: 0.8;
}
.line:focus-within {
  box-shadow: inset 0 -1px 0 var(--accent);
}
</style>
