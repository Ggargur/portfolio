import { ref } from 'vue';
import { profile } from '../data/portfolio';

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  language: string | null;
  fork: boolean;
}

type Status = 'idle' | 'loading' | 'ready' | 'error';

const CACHE_KEY = 'gg-repos';
const CACHE_MS = 30 * 60 * 1000;

// Shared across the GUI section, the TTY view and console commands: one request per visit.
const repos = ref<Repo[]>([]);
const status = ref<Status>('idle');
const error = ref('');

function readCache(): Repo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: Repo[] };
    return Date.now() - at < CACHE_MS && Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data: Repo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* ignore */
  }
}

async function load() {
  if (status.value === 'loading' || status.value === 'ready') return;
  const cached = readCache();
  if (cached) {
    repos.value = cached;
    status.value = 'ready';
    return;
  }
  status.value = 'loading';
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=12`,
      { headers: { Accept: 'application/vnd.github+json' } },
    );
    const body: unknown = await res.json();
    if (!res.ok || !Array.isArray(body)) {
      // A rate-limited response is an object with a `message`, not a list.
      const msg = (body as { message?: string } | null)?.message;
      throw new Error(res.status === 403 ? 'GitHub rate limit reached' : msg || `HTTP ${res.status}`);
    }
    const list = (body as Repo[]).filter((r) => !r.fork).slice(0, 6);
    repos.value = list;
    writeCache(list);
    status.value = 'ready';
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Network error';
    status.value = 'error';
  }
}

function retry() {
  status.value = 'idle';
  return load();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function useGithubRepos() {
  return { repos, status, error, load, retry };
}
