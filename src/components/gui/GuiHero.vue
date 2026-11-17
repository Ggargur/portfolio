<script setup lang="ts">
import { profile, yearsOfExperience } from '../../data/portfolio';
</script>

<template>
  <section class="hero" aria-labelledby="hero-name">
    <div class="copy">
      <span class="eyebrow">~/gabriel-gargur · {{ profile.location.toLowerCase() }}</span>
      <h1 id="hero-name">{{ profile.name }}</h1>
      <p>
        <strong>C# game developer</strong> with {{ yearsOfExperience }}+ years across VR, mobile, PC and console. I worked on
        <strong>God of War: Sons of Sparta</strong> at Mega Cat Studios and co-led the award-winning
        <strong>Kitty Rhythm TD</strong>. I also build web apps, currently in Clojure at {{ profile.dayJob.company }}.
      </p>
      <div class="ctas">
        <a class="btn primary" href="#games">See the games</a>
        <a class="btn" href="#contact">Get in touch</a>
      </div>
    </div>

    <!-- Current project is under NDA: show it as a redacted file instead of a cover. -->
    <figure class="now" aria-labelledby="now-caption">
      <span class="label"><span class="dot" aria-hidden="true"></span>now building</span>
      <div class="redacted" aria-hidden="true">
        <span class="stamp">NDA</span>
        <pre>
  ██████████  ████  ██████
  █████  ████████████  ███
  ████████  ██████  ██████</pre>
      </div>
      <figcaption id="now-caption" class="caption">
        <strong>{{ profile.now.project }}</strong>
        <span>{{ profile.now.role }} at {{ profile.now.company }} · {{ profile.now.detail }}</span>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
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
  max-width: 58ch;
  font-size: clamp(17px, 1.9vw, 19px);
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

/* A pinned, slightly rotated case file with a hard shadow. */
.now {
  margin: 0;
  display: grid;
  gap: 12px;
  padding: 14px 14px 16px;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r-sm);
  box-shadow: var(--offset);
  transform: rotate(1.5deg);
}
@media (prefers-reduced-motion: reduce) {
  .now {
    transform: none;
  }
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
.redacted {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 460 / 215;
  overflow: hidden;
  border-radius: 3px;
  background: repeating-linear-gradient(
    -45deg,
    var(--surface-2) 0 10px,
    color-mix(in srgb, var(--accent-soft) 45%, var(--surface-2)) 10px 20px
  );
}
.redacted pre {
  margin: 0;
  font: 700 clamp(9px, 1.4vw, 13px) / 1.2 var(--f-mono);
  color: var(--ink);
  opacity: 0.85;
}
.stamp {
  position: absolute;
  top: 12px;
  right: 12px;
  font: 700 13px/1 var(--f-mono);
  letter-spacing: 0.2em;
  color: var(--warm);
  border: 2px solid currentColor;
  border-radius: 4px;
  padding: 5px 6px 5px 8px;
  transform: rotate(-6deg);
  background: var(--surface);
}
.caption {
  display: grid;
  gap: 4px;
}
.caption strong {
  font: 700 18px/1.25 var(--f-display);
}
.caption span {
  font: 400 13px/1.5 var(--f-mono);
  color: var(--muted);
}
@media (max-width: 820px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .now {
    max-width: 440px;
  }
}
</style>
