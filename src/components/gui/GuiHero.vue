<script setup lang="ts">
import { profile, projects } from '../../data/portfolio';

const flagship = projects.find((p) => p.flagship) ?? projects[0];
</script>

<template>
  <section class="hero" aria-labelledby="hero-name">
    <div class="copy">
      <span class="eyebrow">~/gabriel-gargur · {{ profile.role.toLowerCase() }}</span>
      <h1 id="hero-name">{{ profile.name }}</h1>
      <p>
        I make games in <strong>Unity and C#</strong> and run <strong>{{ profile.studio }}</strong>. Before that I built
        VR science exhibits, hypercasual mobile games and a data dashboard.
      </p>
      <div class="ctas">
        <a class="btn primary" href="#games">See the games</a>
        <a class="btn" href="#contact">Get in touch</a>
      </div>
    </div>

    <a class="now" :href="flagship.url" target="_blank" rel="noopener noreferrer">
      <span class="label"><span class="dot" aria-hidden="true"></span>now building</span>
      <img :src="flagship.image" :alt="`${flagship.title} cover art`" width="460" height="215" />
      <span class="caption">
        <span>{{ flagship.title }}</span>
        <span class="go">on {{ flagship.host }} ↗</span>
      </span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
}
.copy {
  display: grid;
  gap: 22px;
}
.eyebrow {
  font: 500 13px/1 var(--f-mono);
  color: var(--muted);
}
h1 {
  margin: 0;
  font: 800 clamp(52px, 9vw, 108px) / 0.92 var(--f-display);
  letter-spacing: -0.04em;
  text-shadow: 0.055em 0.055em 0 var(--accent-soft);
  text-wrap: balance;
}
p {
  margin: 0;
  max-width: 54ch;
  font-size: clamp(18px, 2vw, 20px);
  color: var(--muted);
}
strong {
  color: var(--ink);
  font-weight: 600;
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.btn {
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 20px;
  font: 600 15px/1 var(--f-body);
  text-decoration: none;
  color: var(--ink);
  background: var(--surface);
  border: 1.5px solid var(--ink);
  border-radius: var(--r-sm);
  transition: transform var(--t-fast) var(--ease-out), box-shadow var(--t-fast) var(--ease-out);
}
.btn.primary {
  background: var(--ink);
  color: var(--bg);
}
.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--offset-sm);
}
.btn:active {
  transform: none;
  box-shadow: none;
}

/* "Now building" is a pinned snapshot: slightly rotated, hard shadow. */
.now {
  display: grid;
  gap: 10px;
  padding: 12px 12px 14px;
  text-decoration: none;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  box-shadow: var(--offset);
  transform: rotate(1.5deg);
  transition: transform var(--t-med) var(--ease-out);
}
.now:hover {
  transform: rotate(0deg) translateY(-3px);
}
.now img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 460 / 215;
  object-fit: cover;
  border-radius: 3px;
}
.label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 12px/1 var(--f-mono);
  color: var(--warm);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--warm);
}
@media (prefers-reduced-motion: no-preference) {
  .dot {
    animation: pulse 1.6s ease-in-out infinite;
  }
}
@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}
@media (prefers-reduced-motion: reduce) {
  .now,
  .now:hover {
    transform: none;
  }
}
.caption {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font: 600 16px/1.3 var(--f-display);
}
.go {
  font: 500 13px/1.6 var(--f-mono);
  color: var(--accent);
}
@media (max-width: 820px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .now {
    max-width: 420px;
  }
}
</style>
