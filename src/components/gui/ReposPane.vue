<script setup lang="ts">
import { onMounted } from 'vue';
import WmWindow from './WmWindow.vue';
import { profile } from '../../data/portfolio';
import { formatDate, useGithubRepos } from '../../composables/useGithubRepos';

const { repos, status, error, load, retry } = useGithubRepos();
onMounted(load);
const profileUrl = `https://github.com/${profile.githubUser}`;
</script>

<template>
  <WmWindow name="repos" title="repos — github">
    <div aria-live="polite" :aria-busy="status === 'loading'">
      <p v-if="status === 'loading' || status === 'idle'" class="note">Loading repositories from GitHub…</p>

      <div v-else-if="status === 'error'" class="note">
        <p>Couldn't load repositories from GitHub ({{ error }}).</p>
        <p>
          <button type="button" @click="retry">Try again</button> or
          <a :href="profileUrl" target="_blank" rel="noopener noreferrer">open github.com/{{ profile.githubUser }}</a>.
        </p>
      </div>

      <p v-else-if="repos.length === 0" class="note">No public repositories yet.</p>

      <ul v-else class="list">
        <li v-for="r in repos" :key="r.id">
          <a :href="r.html_url" target="_blank" rel="noopener noreferrer">{{ r.name }}</a>
          <span class="meta">{{ r.language ?? '—' }} · {{ formatDate(r.updated_at) }}</span>
          <span v-if="r.description" class="desc">{{ r.description }}</span>
        </li>
      </ul>
    </div>
  </WmWindow>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 14px 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2px 12px;
}
a {
  font: 500 14px/1.5 var(--f-mono);
  color: var(--accent);
  overflow-wrap: anywhere;
}
.meta {
  font: 400 12px/1.8 var(--f-mono);
  color: var(--muted);
  white-space: nowrap;
}
.desc {
  grid-column: 1 / -1;
  font-size: 14.5px;
  color: var(--muted);
}
.note {
  margin: 0;
  color: var(--muted);
}
.note p {
  margin: 0 0 8px;
}
button {
  min-height: 28px;
  padding: 0 10px;
  font: 500 13px/1 var(--f-mono);
  color: var(--ink);
  background: var(--surface-2);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
}
button:hover {
  border-color: var(--accent);
}
</style>
