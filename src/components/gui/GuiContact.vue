<script setup lang="ts">
import { ref } from 'vue';
import SectionHead from './SectionHead.vue';
import { email, links } from '../../data/portfolio';

const copyState = ref<'idle' | 'copied' | 'failed'>('idle');
let timer = 0;

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email);
    copyState.value = 'copied';
  } catch {
    copyState.value = 'failed';
  }
  window.clearTimeout(timer);
  timer = window.setTimeout(() => (copyState.value = 'idle'), 3000);
}

const others = links.filter((l) => l.key !== 'email');
</script>

<template>
  <section id="contact" class="sec" aria-labelledby="h-contact">
    <SectionHead id="h-contact" title="Contact" cmd="cat contact.txt" />
    <div class="box">
      <p class="lead">Working on a game or a Unity project? Write to me.</p>
      <div class="mail">
        <a :href="`mailto:${email}`" class="addr">{{ email }}</a>
        <button type="button" class="copy" @click="copyEmail">
          {{ copyState === 'copied' ? 'Copied' : 'Copy address' }}
        </button>
      </div>
      <p class="status" role="status">
        <template v-if="copyState === 'copied'">Address copied to your clipboard.</template>
        <template v-else-if="copyState === 'failed'">Couldn't copy. Select the address above and copy it manually.</template>
      </p>
      <ul class="links">
        <li v-for="l in others" :key="l.key">
          <a :href="l.url" target="_blank" rel="noopener noreferrer">
            <strong>{{ l.label }}</strong>
            <small>{{ l.value }}</small>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.sec {
  display: grid;
  gap: 28px;
  scroll-margin-top: 96px;
}
.box {
  display: grid;
  gap: 16px;
}
.lead {
  margin: 0;
  font-size: 18px;
  color: var(--muted);
}
.mail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}
.addr {
  font: 800 clamp(24px, 4.6vw, 44px) / 1.1 var(--f-display);
  letter-spacing: -0.02em;
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
  overflow-wrap: anywhere;
}
.addr:hover {
  color: var(--accent);
}
.copy {
  min-height: 44px;
  padding: 0 16px;
  font: 500 13px/1 var(--f-mono);
  color: var(--ink);
  background: var(--surface);
  border: 1.5px solid var(--ink);
  border-radius: var(--r-sm);
  transition: box-shadow var(--t-fast), transform var(--t-fast);
}
.copy:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--offset-sm);
}
.status {
  margin: 0;
  min-height: 1.6em;
  font: 400 13px/1.6 var(--f-mono);
  color: var(--muted);
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.links a {
  display: grid;
  gap: 2px;
  min-width: 180px;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  transition: border-color var(--t-fast);
}
.links a:hover {
  border-color: var(--accent);
}
.links small {
  font: 400 12.5px/1.3 var(--f-mono);
  color: var(--muted);
}
</style>
