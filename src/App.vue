<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import AsciiField from './components/AsciiField.vue';
import TopBar from './components/TopBar.vue';
import ConsoleDrawer from './components/ConsoleDrawer.vue';
import GuiHero from './components/gui/GuiHero.vue';
import GuiProjects from './components/gui/GuiProjects.vue';
import GuiExperience from './components/gui/GuiExperience.vue';
import GuiSkills from './components/gui/GuiSkills.vue';
import GuiRepos from './components/gui/GuiRepos.vue';
import GuiContact from './components/gui/GuiContact.vue';
import TtyView from './components/tty/TtyView.vue';
import { useViewMode } from './composables/useViewMode';
import { profile } from './data/portfolio';

const { mode } = useViewMode();
const consoleOpen = ref(false);
const year = new Date().getFullYear();

function isTyping(el: Element | null) {
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || (el as HTMLElement | null)?.isContentEditable;
}

// Backtick toggles the console, unless the visitor is typing somewhere else.
function onKey(e: KeyboardEvent) {
  if (e.key === '`') {
    const inConsole = document.activeElement?.id === 'console-input';
    if (isTyping(document.activeElement) && !inConsole) return;
    e.preventDefault();
    consoleOpen.value = !consoleOpen.value;
  } else if (e.key === 'Escape' && consoleOpen.value) {
    consoleOpen.value = false;
  }
}

onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));

// Switching views scrolls back up, so the new view starts at its beginning.
watch(mode, () => window.scrollTo({ top: 0 }));
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <AsciiField />
  <TopBar :console-open="consoleOpen" @toggle-console="consoleOpen = !consoleOpen" />

  <main id="main" tabindex="-1">
    <div id="top" class="wrap content">
      <div v-if="mode === 'gui'" class="gui">
        <GuiHero />
        <GuiProjects />
        <GuiExperience />
        <GuiSkills />
        <GuiRepos />
        <GuiContact />
      </div>
      <TtyView v-else />
    </div>
  </main>

  <footer class="wrap foot">
    <span>© {{ year }} {{ profile.name }}</span>
    <span>Press <kbd>`</kbd> anywhere to open the console</span>
  </footer>

  <ConsoleDrawer :open="consoleOpen" @close="consoleOpen = false" />
</template>

<style scoped>
main:focus {
  outline: none;
}
.content {
  padding-block: 56px 32px;
}
.gui {
  display: grid;
  gap: 104px;
}
.foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding-block: 40px 48px;
  font: 400 13px/1.6 var(--f-mono);
  color: var(--muted);
}
.foot kbd {
  font: inherit;
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 0 5px;
}
@media (max-width: 640px) {
  .content {
    padding-block: 32px 24px;
  }
  .gui {
    gap: 72px;
  }
}
</style>
