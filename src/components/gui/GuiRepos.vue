<script setup lang="ts">
import { onMounted } from 'vue';
import SectionHead from './SectionHead.vue';
import { profile } from '../../data/portfolio';
import { formatDate, useGithubRepos } from '../../composables/useGithubRepos';

const { repos, status, error, load, retry } = useGithubRepos();
onMounted(load);
const profileUrl = `https://github.com/${profile.githubUser}`;
</script>

<template>
  <section id="repos" class="sec" aria-labelledby="h-repos">
    <SectionHead id="h-repos" title="Recent code" cmd="gh repo list --limit 6" meta="from GitHub" />

    <div aria-live="polite" :aria-busy="status === 'loading'">
      <ul v-if="status === 'loading' || status === 'idle'" class="list" aria-label="Loading repositories">
        <li v-for="i in 3" :key="i" class="row skeleton"><span></span><span></span></li>
      </ul>

      <div v-else-if="status === 'error'" class="state">
        <p>Couldn't load repositories from GitHub ({{ error }}).</p>
        <div class="actions">
          <button type="button" @click="retry">Try again</button>
          <a :href="profileUrl" target="_blank" rel="noopener noreferrer">Open my GitHub profile ↗</a>
        </div>
      </div>

      <div v-else-if="repos.length === 0" class="state">
        <p>No public repositories yet.</p>
      </div>

      <ul v-else class="list">
        <li v-for="r in repos" :key="r.id">
          <a class="row" :href="r.html_url" target="_blank" rel="noopener noreferrer">
            <span class="name">{{ r.name }}</span>
            <span class="desc">{{ r.description ?? 'No description.' }}</span>
            <span class="meta">
              <span v-if="r.language">{{ r.language }}</span>
              <span>updated {{ formatDate(r.updated_at) }}</span>
            </span>
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
.list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1.5px solid var(--ink);
}
.row {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr) auto;
  gap: 6px 24px;
  align-items: baseline;
  padding: 16px 8px;
  border-bottom: 1px solid var(--rule);
  text-decoration: none;
  color: var(--ink);
  transition: background-color var(--t-fast);
}
a.row:hover {
  background: color-mix(in srgb, var(--accent-soft) 35%, transparent);
}
.name {
  font: 700 15px/1.3 var(--f-mono);
  color: var(--accent);
  overflow-wrap: anywhere;
}
.desc {
  color: var(--muted);
}
.meta {
  display: flex;
  gap: 14px;
  font: 400 12.5px/1.4 var(--f-mono);
  color: var(--muted);
  white-space: nowrap;
}
.skeleton span {
  height: 14px;
  border-radius: 4px;
  background: var(--line);
}
.skeleton span:first-child {
  width: 60%;
}
@media (prefers-reduced-motion: no-preference) {
  .skeleton span {
    animation: shimmer 1.2s ease-in-out infinite alternate;
  }
}
@keyframes shimmer {
  to {
    opacity: 0.45;
  }
}
.state {
  display: grid;
  gap: 12px;
  padding: 20px;
  border: 1px dashed var(--rule);
  border-radius: var(--r-sm);
  background: var(--surface);
}
.state p {
  margin: 0;
  color: var(--muted);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
.actions button {
  min-height: 44px;
  padding: 0 16px;
  font: 600 14px/1 var(--f-body);
  color: var(--bg);
  background: var(--ink);
  border: 0;
  border-radius: var(--r-sm);
}
@media (max-width: 720px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
