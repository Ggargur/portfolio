<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useTheme } from '../composables/useTheme';
import { prefersReducedMotion } from '../composables/storage';

/**
 * Background: metaball "clouds" (from the logo) drifting sideways, drawn as ASCII glyphs
 * on a coarse grid. ~8k cells x ~15 blobs per frame at 30fps, far cheaper than per-pixel.
 */
const props = withDefaults(defineProps<{ count?: number; cell?: number }>(), { count: 14, cell: 16 });

interface Blob {
  x: number;
  y: number;
  r: number;
  vx: number;
  ph: number;
}

const RAMP = ' .·:-=+*#';
const THRESHOLD = 0.45;
const canvas = ref<HTMLCanvasElement | null>(null);
const { theme } = useTheme();

let ctx: CanvasRenderingContext2D | null = null;
let W = 0;
let H = 0;
let cols = 0;
let rows = 0;
let color = '';
let raf = 0;
let last = 0;
let reduced = false;
const blobs: Blob[] = [];
const mouse = { x: 0, y: 0, on: false };

function spawn(anywhere: boolean): Blob {
  const r = 40 + Math.random() * 90;
  return {
    x: anywhere ? Math.random() * W : -r * 2,
    y: Math.random() * H,
    r,
    vx: 0.2 + Math.random() * 0.45,
    ph: Math.random() * Math.PI * 2,
  };
}

function resize() {
  const el = canvas.value;
  if (!el || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  el.width = W * dpr;
  el.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cols = Math.ceil(W / props.cell);
  rows = Math.ceil(H / props.cell);
  const mono = getComputedStyle(document.documentElement).getPropertyValue('--f-mono');
  ctx.font = `500 12px ${mono}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
}

function recolor() {
  color = getComputedStyle(document.documentElement).getPropertyValue('--glyph').trim();
}

function step(t: number) {
  for (const b of blobs) {
    b.x += b.vx;
    b.y += Math.sin(t / 1800 + b.ph) * 0.15;
    if (b.x - b.r * 2 > W) Object.assign(b, spawn(false));
  }
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = color;
  const all = mouse.on ? [...blobs, { x: mouse.x, y: mouse.y, r: 70, vx: 0, ph: 0 }] : blobs;
  const c = props.cell;
  for (let j = 0; j < rows; j++) {
    const cy = j * c + c / 2;
    for (let i = 0; i < cols; i++) {
      const cx = i * c + c / 2;
      let s = 0;
      for (const b of all) {
        const dx = (cx - b.x) * 0.6; // wider than tall: cloud-shaped
        const dy = cy - b.y;
        s += (b.r * b.r) / (dx * dx + dy * dy + 1);
      }
      if (s < THRESHOLD) continue;
      const k = Math.min(RAMP.length - 1, 1 + Math.floor((s - THRESHOLD) * 7));
      ctx.fillText(RAMP[k], cx, cy);
    }
  }
}

function loop(t: number) {
  raf = requestAnimationFrame(loop);
  if (t - last < 33) return;
  last = t;
  step(t);
  draw();
}

function start() {
  if (reduced || raf) return;
  raf = requestAnimationFrame(loop);
}

function stop() {
  cancelAnimationFrame(raf);
  raf = 0;
}

function onResize() {
  resize();
  draw();
}

function onPointer(e: PointerEvent) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.on = e.pointerType === 'mouse';
  if (reduced) draw();
}

function onLeave() {
  mouse.on = false;
}

function onVisibility() {
  if (document.hidden) stop();
  else start();
}

onMounted(() => {
  ctx = canvas.value?.getContext('2d') ?? null;
  if (!ctx) return;
  reduced = prefersReducedMotion();
  resize();
  recolor();
  for (let i = 0; i < props.count; i++) blobs.push(spawn(true));
  draw();
  start();
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointer, { passive: true });
  document.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', onVisibility);
  document.fonts?.ready.then(onResize);
});

onBeforeUnmount(() => {
  stop();
  window.removeEventListener('resize', onResize);
  window.removeEventListener('pointermove', onPointer);
  document.removeEventListener('pointerleave', onLeave);
  document.removeEventListener('visibilitychange', onVisibility);
});

// Theme switches swap the token values; re-read after the attribute lands.
watch(theme, () => requestAnimationFrame(() => (recolor(), draw())));
</script>

<template>
  <canvas ref="canvas" class="field" aria-hidden="true"></canvas>
</template>

<style scoped>
.field {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-field);
  pointer-events: none;
}
</style>
