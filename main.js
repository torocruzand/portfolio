/**
 * torocruzand.com — "The Living Compiler & Telemetry HUD"
 * -------------------------------------------------------------------------
 * Zero-dependency ES module. Architecture:
 *
 *   Engine (single rAF ticker, pauses when hidden)
 *     ├── Lattice        canvas spring-mesh reacting to cursor + scroll
 *     ├── Telemetry      frame-time / FPS / pointer / viewport readouts
 *     ├── Kinetic        per-glyph spring displacement on the hero title
 *     ├── Reticle        bracket cursor that locks onto interactive boxes
 *     └── Magnetic       spring pull on [data-magnetic] elements
 *   XRay                 Preview ⇄ Spec state machine per project module
 *   Terminal             <dialog> CLI with history, completion, live region
 *   VimNav               j / k / gg / G / x keyboard stepping
 *   Synth                Web Audio procedural UI sounds (opt-in, muted)
 *   Theme                carbon ⇄ blueprint via View Transitions API
 *
 * Every animated subsystem honours `prefers-reduced-motion: reduce` by
 * falling back to "Static Schematic" mode: one frame drawn, no loop.
 */

'use strict';

/* =========================================================================
   0. Environment & helpers
   ========================================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
const pad = (n, len = 4) => String(Math.max(0, Math.round(n))).padStart(len, '0');

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');

/** Safe localStorage wrapper: private windows may throw on access. */
const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
  },
};

/** Shared, mutable runtime state read by every subsystem. */
const state = {
  staticMode: motionQuery.matches,
  pointer: { x: -9999, y: -9999, vx: 0, vy: 0, inside: false },
  scroll: { y: window.scrollY, v: 0 },
  viewport: { w: window.innerWidth, h: window.innerHeight },
  frame: { dt: 16.7, work: 0, fps: 60 },
};

/** Screen-reader + visual toast. */
const toast = (() => {
  const el = $('#toast');
  let timer = 0;
  return (msg) => {
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('is-on'), 1800);
  };
})();

/* =========================================================================
   1. Synth — Web Audio procedural UI sounds (opt-in)
   ========================================================================= */

class Synth {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noise = null;
    this.enabled = store.get('tc-sound') === 'on';
  }

  /** AudioContext must be created from a user gesture. */
  ensure() {
    if (this.ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.18;
    this.master.connect(this.ctx.destination);

    // 100 ms of white noise reused for every mechanical transient.
    const len = Math.floor(this.ctx.sampleRate * 0.1);
    this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return true;
  }

  setEnabled(on) {
    this.enabled = on;
    store.set('tc-sound', on ? 'on' : 'off');
    if (on && this.ensure() && this.ctx.state === 'suspended') this.ctx.resume();
  }

  /**
   * @param {'tick'|'clack'|'confirm'|'error'|'key'} kind
   */
  play(kind = 'tick') {
    if (!this.enabled || !this.ensure()) return;
    const { ctx } = this;
    const t = ctx.currentTime;

    // Noise burst through a band-pass: the "mechanical" body of the click.
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    const env = ctx.createGain();

    const presets = {
      tick: { f: 4200, q: 8, dur: 0.018, gain: 0.5, tone: 0 },
      key: { f: 2600, q: 5, dur: 0.012, gain: 0.35, tone: 0 },
      clack: { f: 1700, q: 3, dur: 0.045, gain: 0.8, tone: 110 },
      confirm: { f: 3200, q: 6, dur: 0.03, gain: 0.4, tone: 880 },
      error: { f: 900, q: 2, dur: 0.06, gain: 0.6, tone: 140 },
    };
    const p = presets[kind] || presets.tick;

    band.frequency.value = p.f;
    band.Q.value = p.q;
    env.gain.setValueAtTime(p.gain, t);
    env.gain.exponentialRampToValueAtTime(0.0001, t + p.dur);
    src.connect(band).connect(env).connect(this.master);
    src.start(t);
    src.stop(t + p.dur + 0.01);

    // Optional pitched component (detent "thunk" or confirmation chirp).
    if (p.tone) {
      const osc = ctx.createOscillator();
      const og = ctx.createGain();
      osc.type = kind === 'error' ? 'square' : 'sine';
      osc.frequency.setValueAtTime(p.tone, t);
      if (kind === 'confirm') osc.frequency.exponentialRampToValueAtTime(p.tone * 1.5, t + 0.06);
      og.gain.setValueAtTime(kind === 'error' ? 0.08 : 0.15, t);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      osc.connect(og).connect(this.master);
      osc.start(t);
      osc.stop(t + 0.1);
    }
  }
}

const synth = new Synth();

/* =========================================================================
   2. Engine — single requestAnimationFrame ticker
   ========================================================================= */

class Engine {
  constructor() {
    this.systems = new Set();
    this.raf = 0;
    this.last = 0;
    this.running = false;
    this.tick = this.tick.bind(this);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });
  }

  add(system) {
    this.systems.add(system);
    return system;
  }

  start() {
    if (this.running || state.staticMode || document.hidden) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  tick(now) {
    if (!this.running) return;
    // Clamp dt so a long stall (tab switch, breakpoint) can't explode springs.
    const dt = Math.min(now - this.last, 64);
    this.last = now;

    const t0 = performance.now();
    for (const s of this.systems) {
      if (s.active !== false) s.update(dt, now);
    }
    const work = performance.now() - t0;

    // Exponential moving averages for readable telemetry.
    state.frame.dt += (dt - state.frame.dt) * 0.08;
    state.frame.work += (work - state.frame.work) * 0.08;
    state.frame.fps = 1000 / Math.max(state.frame.dt, 1);

    // Decay scroll velocity between scroll events.
    state.scroll.v *= 0.9;
    state.pointer.vx *= 0.85;
    state.pointer.vy *= 0.85;

    this.raf = requestAnimationFrame(this.tick);
  }
}

const engine = new Engine();

/* =========================================================================
   3. Input tracking — pointer velocity and scroll momentum
   ========================================================================= */

function initInput() {
  let lastX = 0;
  let lastY = 0;
  let lastT = performance.now();

  window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    const dt = Math.max(now - lastT, 1);
    const p = state.pointer;
    p.vx = ((e.clientX - lastX) / dt) * 16;
    p.vy = ((e.clientY - lastY) / dt) * 16;
    p.x = lastX = e.clientX;
    p.y = lastY = e.clientY;
    p.inside = true;
    lastT = now;
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', () => {
    state.pointer.inside = false;
    state.pointer.x = state.pointer.y = -9999;
  });

  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    state.scroll.v = clamp(state.scroll.v * 0.5 + (y - lastScroll), -120, 120);
    state.scroll.y = lastScroll = y;
  }, { passive: true });

  window.addEventListener('resize', () => {
    state.viewport.w = window.innerWidth;
    state.viewport.h = window.innerHeight;
  }, { passive: true });
}

/* =========================================================================
   4. Lattice — memory-allocation spring mesh on 2D canvas
   ========================================================================= */

class Lattice {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    this.active = true;
    this.nodes = null; // Float32Array [dx, dy, vx, vy] per node
    this.cols = 0;
    this.rows = 0;
    this.spacing = 56;
    this.allocs = [];
    this.packets = [];
    this.spawnClock = 0;
    this.colors = this.readColors();

    // Pause drawing when the canvas is not on screen (e.g. print, overlays).
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        this.active = entry.isIntersecting;
      }).observe(canvas);
    }

    this.resize();
    let rt = 0;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => this.resize(), 120);
    }, { passive: true });
  }

  readColors() {
    const cs = getComputedStyle(document.documentElement);
    return {
      node: cs.getPropertyValue('--canvas-node').trim() || '226, 232, 240',
      alloc: cs.getPropertyValue('--canvas-alloc').trim() || '255, 79, 0',
      signal: cs.getPropertyValue('--canvas-signal').trim() || '0, 229, 163',
    };
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.w = w;
    this.h = h;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Keep node count bounded (~1400) regardless of viewport size.
    this.spacing = Math.max(44, Math.ceil(Math.sqrt((w * h) / 1400)));
    this.cols = Math.ceil(w / this.spacing) + 2;
    this.rows = Math.ceil(h / this.spacing) + 3;
    this.nodes = new Float32Array(this.cols * this.rows * 4);
    this.allocs.length = 0;
    this.packets.length = 0;
    this.draw();
  }

  /** Spawns a rectangular "allocation" block on the lattice. */
  spawnAlloc() {
    const w = 1 + Math.floor(Math.random() * 4);
    const h = 1 + Math.floor(Math.random() * 3);
    this.allocs.push({
      c: Math.floor(Math.random() * (this.cols - w)),
      r: Math.floor(Math.random() * (this.rows - h)),
      w, h,
      life: 0,
      ttl: 1800 + Math.random() * 2600,
      signal: Math.random() < 0.18,
    });
  }

  /** Spawns a data packet travelling along a row or column. */
  spawnPacket() {
    const horizontal = Math.random() < 0.6;
    this.packets.push({
      horizontal,
      lane: Math.floor(Math.random() * (horizontal ? this.rows : this.cols)),
      t: 0,
      speed: 0.18 + Math.random() * 0.25,
    });
  }

  update(dt) {
    const { nodes, cols, rows, spacing } = this;
    const p = state.pointer;
    const speed = Math.hypot(p.vx, p.vy);
    const radius = 120 + Math.min(speed * 6, 140);
    const r2 = radius * radius;
    const offY = (state.scroll.y * 0.35) % spacing;
    const scrollKick = state.scroll.v * 0.06;

    // Semi-implicit Euler spring integration, normalised to 60 fps steps.
    const step = dt / 16.67;
    const k = 0.06 * step;
    const damp = Math.pow(0.82, step);

    for (let r = 0; r < rows; r++) {
      const ry = r * spacing - spacing - offY;
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4;
        const rx = c * spacing - spacing * 0.5;
        let fx = -nodes[i] * k;
        let fy = -nodes[i + 1] * k;

        if (p.inside) {
          const dx = rx + nodes[i] - p.x;
          const dy = ry + nodes[i + 1] - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const falloff = 1 - d / radius;
            const push = falloff * falloff * (1.2 + speed * 0.08) * step;
            fx += (dx / d) * push + p.vx * falloff * 0.02 * step;
            fy += (dy / d) * push + p.vy * falloff * 0.02 * step;
          }
        }

        // Scroll momentum shears the lattice; springs pull it back.
        fy -= scrollKick * (0.6 + (c % 3) * 0.2) * step * 0.2;

        nodes[i + 2] = (nodes[i + 2] + fx) * damp;
        nodes[i + 3] = (nodes[i + 3] + fy) * damp;
        nodes[i] = clamp(nodes[i] + nodes[i + 2] * step, -spacing * 0.6, spacing * 0.6);
        nodes[i + 1] = clamp(nodes[i + 1] + nodes[i + 3] * step, -spacing * 0.6, spacing * 0.6);
      }
    }

    // Allocator simulation.
    this.spawnClock += dt;
    if (this.spawnClock > 260) {
      this.spawnClock = 0;
      if (this.allocs.length < 14) this.spawnAlloc();
      if (this.packets.length < 4 && Math.random() < 0.35) this.spawnPacket();
    }
    for (let i = this.allocs.length - 1; i >= 0; i--) {
      const a = this.allocs[i];
      a.life += dt;
      if (a.life > a.ttl) this.allocs.splice(i, 1);
    }
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const pk = this.packets[i];
      pk.t += pk.speed * dt * 0.001;
      if (pk.t > 1) this.packets.splice(i, 1);
    }

    if (this.active) this.draw();
  }

  /** Position of node (c, r) in screen space including spring offset. */
  pos(c, r, offY) {
    const i = (r * this.cols + c) * 4;
    return [
      c * this.spacing - this.spacing * 0.5 + this.nodes[i],
      r * this.spacing - this.spacing - offY + this.nodes[i + 1],
    ];
  }

  draw() {
    const { ctx, cols, rows, spacing, colors } = this;
    const offY = (state.scroll.y * 0.35) % spacing;
    ctx.clearRect(0, 0, this.w, this.h);

    // Allocation blocks (filled quads following the deformed mesh).
    for (const a of this.allocs) {
      const t = a.life / a.ttl;
      const alpha = Math.sin(Math.PI * t) * (a.signal ? 0.16 : 0.1);
      if (alpha <= 0.002) continue;
      const [x0, y0] = this.pos(a.c, a.r, offY);
      const [x1, y1] = this.pos(a.c + a.w, a.r + a.h, offY);
      ctx.fillStyle = `rgba(${a.signal ? colors.signal : colors.alloc}, ${alpha})`;
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      ctx.strokeStyle = `rgba(${a.signal ? colors.signal : colors.alloc}, ${alpha * 3})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x0 + 0.5, y0 + 0.5, x1 - x0 - 1, y1 - y0 - 1);
    }

    // Mesh edges — one batched path for the whole lattice.
    ctx.beginPath();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const [x, y] = this.pos(c, r, offY);
        if (c + 1 < cols) {
          const [x2, y2] = this.pos(c + 1, r, offY);
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
        }
        if (r + 1 < rows) {
          const [x3, y3] = this.pos(c, r + 1, offY);
          ctx.moveTo(x, y);
          ctx.lineTo(x3, y3);
        }
      }
    }
    ctx.strokeStyle = `rgba(${colors.node}, 0.045)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Nodes: brighter when displaced (stress visualisation).
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4;
        const disp = Math.abs(this.nodes[i]) + Math.abs(this.nodes[i + 1]);
        const [x, y] = this.pos(c, r, offY);
        if (disp > 1.5) {
          const a = Math.min(disp / 30, 1);
          ctx.fillStyle = `rgba(${colors.alloc}, ${0.25 + a * 0.6})`;
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        } else {
          ctx.fillStyle = `rgba(${colors.node}, 0.22)`;
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }
    }

    // Packets travelling along lanes.
    for (const pk of this.packets) {
      const along = pk.horizontal ? cols - 1 : rows - 1;
      const f = pk.t * along;
      const i0 = Math.floor(f);
      const frac = f - i0;
      const i1 = Math.min(i0 + 1, along);
      const [ax, ay] = pk.horizontal ? this.pos(i0, pk.lane, offY) : this.pos(pk.lane, i0, offY);
      const [bx, by] = pk.horizontal ? this.pos(i1, pk.lane, offY) : this.pos(pk.lane, i1, offY);
      const x = ax + (bx - ax) * frac;
      const y = ay + (by - ay) * frac;
      ctx.fillStyle = `rgba(${colors.signal}, 0.85)`;
      ctx.fillRect(x - 2, y - 2, 4, 4);
      ctx.strokeStyle = `rgba(${colors.signal}, 0.25)`;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  /** Used by `run benchmark`: N full physics steps without drawing. */
  benchmark(steps = 300) {
    const wasActive = this.active;
    this.active = false;
    const t0 = performance.now();
    for (let i = 0; i < steps; i++) this.update(16.67);
    const ms = performance.now() - t0;
    this.active = wasActive;
    return { ms, nodes: this.cols * this.rows, steps };
  }
}

/* =========================================================================
   5. Telemetry HUD — pointer, viewport, frame time, scroll, clock
   ========================================================================= */

class Telemetry {
  constructor() {
    this.el = {
      x: $('#t-x'), y: $('#t-y'), vp: $('#t-vp'), ft: $('#t-ft'), fps: $('#t-fps'),
      scroll: $('#f-scroll'), vel: $('#f-vel'), sec: $('#f-sec'), addr: $('#f-addr'),
      clock: $('#f-clock'), mode: $('#f-mode'),
    };
    this.acc = 0;
    this.progressEl = $('.progress');
    this.cssProgress = CSS.supports('animation-timeline: scroll()') && !state.staticMode;

    this.clockFmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const tickClock = () => { if (this.el.clock) this.el.clock.textContent = this.clockFmt.format(new Date()); };
    tickClock();
    setInterval(tickClock, 1000);

    this.render(true);
    // In static mode the engine is idle, so refresh on input events instead.
    const lazy = () => { if (state.staticMode) this.render(true); };
    window.addEventListener('scroll', lazy, { passive: true });
    window.addEventListener('pointermove', lazy, { passive: true });
    window.addEventListener('resize', lazy, { passive: true });
  }

  setSection(index, label, addr) {
    if (this.el.sec) this.el.sec.textContent = `${index} ${label}`;
    if (this.el.addr) this.el.addr.textContent = addr;
  }

  setMode(text) {
    if (this.el.mode) this.el.mode.textContent = text;
  }

  update(dt) {
    // Throttle DOM writes to ~12 Hz; the readouts are for humans.
    this.acc += dt;
    if (this.acc < 80) return;
    this.acc = 0;
    this.render(false);
  }

  render() {
    const { el } = this;
    const p = state.pointer;
    if (el.x) el.x.textContent = p.inside ? pad(p.x) : '----';
    if (el.y) el.y.textContent = p.inside ? pad(p.y + state.scroll.y) : '----';
    if (el.vp) el.vp.textContent = `${pad(state.viewport.w)}×${pad(state.viewport.h)}`;
    if (el.ft) el.ft.textContent = state.staticMode ? 'STATIC' : `~${state.frame.work.toFixed(1)}ms`;
    if (el.fps) el.fps.textContent = state.staticMode ? '000' : pad(state.frame.fps, 3);

    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct = clamp(state.scroll.y / max, 0, 1);
    if (el.scroll) el.scroll.textContent = (pct * 100).toFixed(1).padStart(5, '0');
    if (el.vel) {
      const v = state.scroll.v / 10;
      el.vel.textContent = `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(2)}`;
    }
    if (!this.cssProgress && this.progressEl) this.progressEl.style.setProperty('--progress', pct.toFixed(4));
  }
}

/* =========================================================================
   6. Section tracking — nav aria-current + HUD segment readout
   ========================================================================= */

function initSectionTracking(telemetry) {
  const sections = $$('main > section[id]');
  const links = new Map($$('.nav a').map((a) => [a.getAttribute('href').slice(1), a]));
  const labels = {
    boot: 'HELLO', about: 'ABOUT', projects: 'PROJECTS', experience: 'EXPERIENCE', skills: 'SKILLS', contact: 'CONTACT',
  };

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = entry.target.id;
      const idx = String(sections.indexOf(entry.target) + 1).padStart(2, '0');
      telemetry.setSection(idx, labels[id] || id.toUpperCase(), entry.target.dataset.addr || '0x0');
      links.forEach((a, key) => {
        if (key === id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((s) => io.observe(s));
}

/* =========================================================================
   7. Kinetic headline — glyph springs reacting to the cursor
   ========================================================================= */

class Kinetic {
  constructor(root) {
    this.root = root;
    this.glyphs = [];
    this.active = false;

    // Lines are aria-hidden; the accessible name lives in an .sr-only span.
    for (const host of $$('[data-kinetic]', root)) {
      const text = host.textContent;
      host.textContent = '';
      for (const ch of text) {
        const span = document.createElement('span');
        span.className = 'glyph';
        span.textContent = ch === ' ' ? ' ' : ch;
        host.appendChild(span);
        this.glyphs.push({ el: span, x: 0, y: 0, vx: 0, vy: 0, cx: 0, cy: 0 });
      }
    }

    this.measure();
    window.addEventListener('resize', () => this.measure(), { passive: true });

    new IntersectionObserver(([e]) => {
      this.active = e.isIntersecting;
      if (e.isIntersecting) this.measure();
    }).observe(root);
  }

  /** Cache glyph centres in document space (avoids per-frame layout reads). */
  measure() {
    const sy = window.scrollY;
    for (const g of this.glyphs) {
      const r = g.el.getBoundingClientRect();
      g.cx = r.left + r.width / 2 - g.x;
      g.cy = r.top + sy + r.height / 2 - g.y;
    }
  }

  update(dt) {
    const p = state.pointer;
    const step = dt / 16.67;
    const sy = window.scrollY;
    for (const g of this.glyphs) {
      let tx = 0;
      let ty = 0;
      if (p.inside) {
        const dx = g.cx - p.x;
        const dy = g.cy - sy - p.y;
        const d = Math.hypot(dx, dy);
        const R = 220;
        if (d < R) {
          const f = (1 - d / R) ** 2;
          tx = (dx / (d || 1)) * f * 26;
          ty = (dy / (d || 1)) * f * 18;
        }
      }
      // Critically-damped-ish spring toward the target offset.
      g.vx = (g.vx + (tx - g.x) * 0.12 * step) * Math.pow(0.72, step);
      g.vy = (g.vy + (ty - g.y) * 0.12 * step) * Math.pow(0.72, step);
      g.x += g.vx * step;
      g.y += g.vy * step;
      if (Math.abs(g.x) < 0.01 && Math.abs(g.y) < 0.01 && !tx && !ty) {
        if (g.el.style.transform) g.el.style.transform = '';
        continue;
      }
      g.el.style.transform = `translate3d(${g.x.toFixed(2)}px, ${g.y.toFixed(2)}px, 0)`;
    }
  }

  reset() {
    for (const g of this.glyphs) {
      g.x = g.y = g.vx = g.vy = 0;
      g.el.style.transform = '';
    }
  }
}

/* =========================================================================
   8. Reticle cursor — morphs into bracket box around interactive elements
   ========================================================================= */

const INTERACTIVE = 'a[href], button, [role="button"], input, summary, [tabindex]:not([tabindex="-1"])';

class Reticle {
  constructor() {
    this.root = $('#reticle');
    this.box = $('#reticle-box');
    this.dot = $('#reticle-dot');
    this.label = $('#reticle-label');
    this.target = null;
    // Spring state for box geometry.
    this.g = { x: 0, y: 0, w: 22, h: 22, vx: 0, vy: 0, vw: 0, vh: 0 };
    this.active = true;

    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest?.(INTERACTIVE);
      if (t && !t.closest('.cli')) this.lock(t);
      else this.unlock();
    });
    document.addEventListener('pointerdown', () => this.root.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(0.86)' }, { transform: 'scale(1)' }],
      { duration: 160, easing: 'ease-out' },
    ));
  }

  lock(el) {
    if (this.target === el) return;
    this.target = el;
    this.root.classList.add('is-locked');
    const name = el.getAttribute('aria-label') || el.textContent.trim().split(/\s+/).slice(0, 3).join(' ');
    this.label.textContent = `${el.tagName} · ${name}`.slice(0, 38).toUpperCase();
    synth.play('key');
  }

  unlock() {
    if (!this.target) return;
    this.target = null;
    this.root.classList.remove('is-locked');
  }

  update(dt) {
    const p = state.pointer;
    const step = dt / 16.67;
    let tx; let ty; let tw; let th;

    if (this.target && this.target.isConnected) {
      const r = this.target.getBoundingClientRect();
      const padPx = 6;
      tx = r.left - padPx;
      ty = r.top - padPx;
      tw = r.width + padPx * 2;
      th = r.height + padPx * 2;
    } else {
      tw = th = 22;
      tx = p.x - tw / 2;
      ty = p.y - th / 2;
    }

    // Spring physics per channel (stiff on position, softer on size).
    const g = this.g;
    const spring = (key, vkey, target, k, d) => {
      g[vkey] = (g[vkey] + (target - g[key]) * k * step) * Math.pow(d, step);
      g[key] += g[vkey] * step;
    };
    spring('x', 'vx', tx, 0.32, 0.62);
    spring('y', 'vy', ty, 0.32, 0.62);
    spring('w', 'vw', tw, 0.22, 0.66);
    spring('h', 'vh', th, 0.22, 0.66);

    this.box.style.transform = `translate3d(${g.x}px, ${g.y}px, 0)`;
    this.box.style.width = `${g.w}px`;
    this.box.style.height = `${g.h}px`;
    this.label.style.transform = `translate3d(0, ${-16}px, 0)`;
    this.dot.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
  }
}

/* =========================================================================
   9. Magnetic micro-interactions
   ========================================================================= */

class Magnetic {
  constructor() {
    this.items = $$('[data-magnetic]').map((el) => ({ el, x: 0, y: 0, vx: 0, vy: 0, rect: null }));
    this.active = true;
    const refresh = () => this.items.forEach((m) => { m.rect = null; });
    window.addEventListener('scroll', refresh, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
  }

  update(dt) {
    const p = state.pointer;
    const step = dt / 16.67;
    for (const m of this.items) {
      if (!m.rect) m.rect = m.el.getBoundingClientRect();
      const r = m.rect;
      let tx = 0;
      let ty = 0;
      const cx = r.left + r.width / 2 - m.x;
      const cy = r.top + r.height / 2 - m.y;
      const dx = p.x - cx;
      const dy = p.y - cy;
      const reach = Math.max(r.width, r.height) * 0.75 + 40;
      if (p.inside && Math.abs(dx) < reach && Math.abs(dy) < reach) {
        tx = clamp(dx * 0.18, -8, 8);
        ty = clamp(dy * 0.28, -6, 6);
      }
      m.vx = (m.vx + (tx - m.x) * 0.16 * step) * Math.pow(0.7, step);
      m.vy = (m.vy + (ty - m.y) * 0.16 * step) * Math.pow(0.7, step);
      m.x += m.vx * step;
      m.y += m.vy * step;
      if (Math.abs(m.x) + Math.abs(m.y) < 0.02 && !tx && !ty) {
        if (m.el.style.translate) m.el.style.translate = '';
        continue;
      }
      // `translate` composes with existing transforms (e.g. :active press).
      m.el.style.translate = `${m.x.toFixed(2)}px ${m.y.toFixed(2)}px`;
    }
  }

  reset() {
    for (const m of this.items) {
      m.x = m.y = m.vx = m.vy = 0;
      m.el.style.translate = '';
    }
  }
}

/* =========================================================================
   10. XRay — Preview ⇄ Spec state machine
   ========================================================================= */

class XRay {
  constructor() {
    this.modules = $$('.module');
    for (const mod of this.modules) {
      const btn = $('.xray', mod);
      btn?.addEventListener('click', () => this.toggle(mod));

      // Optional stage inspector inside a spec face.
      const readout = $('.bp-readout', mod);
      for (const stage of $$('.pipeline button', mod)) {
        stage.addEventListener('click', () => {
          $$('.pipeline button', mod).forEach((b) => b.setAttribute('aria-pressed', String(b === stage)));
          readout.innerHTML = '';
          const b = document.createElement('b');
          b.textContent = `${stage.textContent} → `;
          readout.append(b, stage.dataset.info || '');
          synth.play('tick');
        });
        stage.setAttribute('aria-pressed', 'false');
      }
    }
  }

  /** @param {HTMLElement} mod @param {'preview'|'blueprint'} [force] */
  toggle(mod, force) {
    const next = force || (mod.dataset.mode === 'blueprint' ? 'preview' : 'blueprint');
    if (next === mod.dataset.mode) return next;

    const btn = $('.xray', mod);
    const preview = $('.face.preview', mod);
    const blueprint = $('.face.blueprint', mod);
    const stage = $('.stage', mod);

    stage.style.setProperty('--stage-w', `${stage.clientWidth}px`);
    mod.classList.remove('is-swapping');
    void mod.offsetWidth; // restart the sweep animation
    mod.classList.add('is-swapping');
    setTimeout(() => mod.classList.remove('is-swapping'), 560);

    mod.dataset.mode = next;
    btn.setAttribute('aria-pressed', String(next === 'blueprint'));
    // Inactive face is removed from tab order and the accessibility tree.
    preview.inert = next === 'blueprint';
    blueprint.inert = next !== 'blueprint';
    synth.play('clack');
    return next;
  }

  find(name) {
    const q = name.toLowerCase().replace(/[^a-z]/g, '');
    return this.modules.find((m) => m.id.startsWith(q) || $('h3', m).textContent.toLowerCase().replace(/[^a-z]/g, '').startsWith(q));
  }

  all(mode) {
    this.modules.forEach((m) => this.toggle(m, mode));
  }
}

/* =========================================================================
   11. Theme — carbon ⇄ blueprint with View Transitions
   ========================================================================= */

class Theme {
  constructor(onChange) {
    this.btn = $('#theme-toggle');
    this.onChange = onChange;
    this.sync();
    this.btn?.addEventListener('click', () => this.set(this.current === 'blueprint' ? 'carbon' : 'blueprint'));
  }

  get current() {
    return document.documentElement.dataset.theme;
  }

  sync() {
    this.btn?.setAttribute('aria-pressed', String(this.current === 'blueprint'));
  }

  set(theme) {
    if (theme !== 'carbon' && theme !== 'blueprint') return false;
    const apply = () => {
      document.documentElement.dataset.theme = theme;
      store.set('tc-theme', theme);
      this.sync();
      this.onChange?.(theme);
    };
    synth.play('clack');
    if (document.startViewTransition && !state.staticMode) document.startViewTransition(apply);
    else apply();
    toast(theme === 'blueprint' ? 'Paper blueprint mode' : 'Carbon telemetry mode');
    return true;
  }
}

/* =========================================================================
   12. Terminal — command palette / CLI
   ========================================================================= */

class Terminal {
  constructor(ctx) {
    this.ctx = ctx; // { xray, theme, lattice, telemetry, setSound }
    this.dialog = $('#cli');
    this.out = $('#cli-out');
    this.form = $('#cli-form');
    this.input = $('#cli-input');
    this.suggest = $('#cli-suggest');
    this.history = [];
    this.hIndex = -1;
    this.booted = false;
    this.opener = null;

    this.commands = this.defineCommands();

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = this.input.value.trim();
      this.input.value = '';
      this.renderSuggestions('');
      if (value) this.exec(value);
    });

    this.input.addEventListener('input', () => {
      synth.play('key');
      this.renderSuggestions(this.input.value);
    });

    this.input.addEventListener('keydown', (e) => this.onInputKey(e));
    $('#cli-close').addEventListener('click', () => this.close());
    this.dialog.addEventListener('close', () => {
      this.opener?.focus?.();
      this.opener = null;
    });
    // Click on backdrop closes.
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) this.close();
    });

    $$('[data-open-cli], #cli-open').forEach((b) => b.addEventListener('click', () => this.open()));
  }

  defineCommands() {
    const { ctx } = this;
    const moduleNames = ctx.xray.modules.map((m) => m.id);
    const sections = $$('main > section[id]').map((s) => s.id);

    return {
      help: {
        desc: 'list commands',
        run: () => {
          const rows = Object.entries(this.commands)
            .map(([name, c]) => `  ${(name + (c.args ? ' ' + c.args : '')).padEnd(26)} ${c.desc}`);
          this.print(['COMMANDS', ...rows, '', 'KEYS  ⌘/Ctrl+K or ~ toggle · Tab complete · ↑↓ history · Esc close',
            '      j/k step modules · x x-ray focused · gg top · G bottom'].join('\n'), 'dim');
        },
      },
      ls: {
        desc: 'list projects',
        run: () => this.print(ctx.xray.modules.map((m, i) =>
          `  MOD.${String(i + 1).padStart(2, '0')}  ${m.id.padEnd(12)} ${$('.module-title p', m).textContent}`).join('\n')),
      },
      inspect: {
        args: '<module>',
        desc: 'open a project in spec mode',
        complete: moduleNames,
        run: (arg) => {
          if (!arg) return this.print('usage: inspect <module>  (try: ls)', 'err');
          const mod = ctx.xray.find(arg);
          if (!mod) return this.print(`inspect: no module '${arg}'`, 'err');
          ctx.xray.toggle(mod, 'blueprint');
          const tech = $$('.chips li', mod).map((li) => li.textContent).join(' · ');
          this.print(`${$('h3', mod).textContent.toUpperCase()} @ ${mod.dataset.addr}\n  stack: ${tech}`, 'ok');
          this.close();
          mod.scrollIntoView({ behavior: state.staticMode ? 'auto' : 'smooth', block: 'start' });
          $('.xray', mod).focus({ preventScroll: true });
        },
      },
      xray: {
        args: 'on|off',
        desc: 'toggle spec mode on every project',
        complete: ['on', 'off'],
        run: (arg) => {
          const mode = arg === 'off' ? 'preview' : 'blueprint';
          ctx.xray.all(mode);
          this.print(`x-ray ${mode === 'blueprint' ? 'engaged' : 'disengaged'} on ${ctx.xray.modules.length} modules`, 'ok');
        },
      },
      goto: {
        args: '<section>',
        desc: 'jump to a section',
        complete: sections,
        run: (arg) => {
          const target = sections.find((s) => s.startsWith((arg || '').toLowerCase()));
          if (!target) return this.print(`goto: sections are ${sections.join(', ')}`, 'err');
          this.close();
          const el = document.getElementById(target);
          el.scrollIntoView({ behavior: state.staticMode ? 'auto' : 'smooth' });
          el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        },
      },
      theme: {
        args: 'blueprint|carbon',
        desc: 'switch visual theme',
        complete: ['blueprint', 'carbon'],
        run: (arg) => {
          const next = arg || (ctx.theme.current === 'blueprint' ? 'carbon' : 'blueprint');
          if (!ctx.theme.set(next)) return this.print('theme: expected blueprint | carbon', 'err');
          this.print(`theme → ${next}`, 'ok');
        },
      },
      sound: {
        args: 'on|off',
        desc: 'toggle synthesized UI audio',
        complete: ['on', 'off'],
        run: (arg) => {
          const on = arg ? arg === 'on' : !synth.enabled;
          ctx.setSound(on);
          this.print(`audio bus ${on ? 'armed' : 'muted'}`, 'ok');
        },
      },
      run: {
        args: 'benchmark',
        desc: 'run in-browser micro-benchmarks',
        complete: ['benchmark'],
        run: (arg) => {
          if (arg !== 'benchmark') return this.print('usage: run benchmark', 'err');
          this.benchmark();
        },
      },
      whoami: {
        desc: 'identity record',
        run: () => this.print([
          'Andrés del Toro Cruz  (@TOROCRUZAND)',
          'Full-Stack Developer & Technology Educator',
          'Software Developer @ LiveCode Ltd · Paraná, Brazil',
          '10+ years of experience · 300+ projects completed',
        ].join('\n')),
      },
      contact: {
        desc: 'open communication channels',
        run: () => {
          const wrap = document.createElement('div');
          const links = [
            ['mail', 'mailto:torocruzand@gmail.com', 'torocruzand@gmail.com'],
            ['github', 'https://github.com/torocruzand', 'github.com/torocruzand'],
            ['linkedin', 'https://linkedin.com/in/torocruzand', 'linkedin.com/in/torocruzand'],
          ];
          for (const [k, href, text] of links) {
            const line = document.createElement('div');
            line.append(`  ${k.padEnd(10)}`);
            const a = document.createElement('a');
            a.href = href;
            a.textContent = text;
            if (href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
            line.append(a);
            wrap.append(line);
          }
          this.printNode(wrap);
        },
      },
      stats: {
        desc: 'live engine telemetry',
        run: () => this.print([
          `mode      ${state.staticMode ? 'STATIC SCHEMATIC (reduced motion)' : 'LIVE'}`,
          `frame     ${state.frame.work.toFixed(2)} ms work · ${state.frame.fps.toFixed(0)} fps`,
          `lattice   ${ctx.lattice ? ctx.lattice.cols * ctx.lattice.rows : 0} nodes`,
          `viewport  ${state.viewport.w}×${state.viewport.h} @ ${window.devicePixelRatio}x`,
          `theme     ${ctx.theme.current}`,
          `audio     ${synth.enabled ? 'armed' : 'muted'}`,
        ].join('\n')),
      },
      clear: {
        desc: 'clear the terminal',
        run: () => { this.out.textContent = ''; },
      },
      exit: {
        desc: 'close the terminal',
        run: () => this.close(),
      },
    };
  }

  open() {
    if (this.dialog.open) return;
    this.opener = document.activeElement;
    this.dialog.showModal();
    synth.play('confirm');
    if (!this.booted) {
      this.booted = true;
      this.print('TTY0 attached. type `help` — or try `inspect pixelcrush`, `run benchmark`, `theme blueprint`.', 'dim');
    }
    this.renderSuggestions('');
    this.input.focus();
  }

  close() {
    if (this.dialog.open) this.dialog.close();
  }

  toggle() {
    if (this.dialog.open) this.close();
    else this.open();
  }

  print(text, cls = '') {
    const line = document.createElement('div');
    if (cls) line.className = cls;
    line.textContent = text;
    this.out.append(line);
    this.out.scrollTop = this.out.scrollHeight;
  }

  printNode(node) {
    this.out.append(node);
    this.out.scrollTop = this.out.scrollHeight;
  }

  exec(raw) {
    this.history.unshift(raw);
    this.history.length = Math.min(this.history.length, 50);
    this.hIndex = -1;
    this.print(raw, 'in');

    const [name, ...rest] = raw.split(/\s+/);
    const cmd = this.commands[name.toLowerCase()];
    if (!cmd) {
      synth.play('error');
      const near = Object.keys(this.commands).find((c) => c.startsWith(name[0]?.toLowerCase() || '~'));
      this.print(`command not found: ${name}${near ? ` — did you mean '${near}'?` : ''}`, 'err');
      return;
    }
    synth.play('confirm');
    cmd.run(rest.join(' ').trim());
  }

  /** Candidates for the current input: commands, or arguments of a command. */
  candidates(value) {
    const parts = value.replace(/^\s+/, '').split(/\s+/);
    if (parts.length <= 1) {
      return Object.keys(this.commands).filter((c) => c.startsWith(parts[0].toLowerCase())).map((c) => c);
    }
    const cmd = this.commands[parts[0].toLowerCase()];
    if (!cmd?.complete) return [];
    return cmd.complete.filter((a) => a.startsWith(parts[1].toLowerCase())).map((a) => `${parts[0]} ${a}`);
  }

  renderSuggestions(value) {
    const list = value ? this.candidates(value) : ['help', 'ls', 'inspect pixelcrush', 'run benchmark', 'theme blueprint', 'contact'];
    this.suggest.textContent = '';
    list.slice(0, 8).forEach((text, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'option');
      b.setAttribute('aria-selected', String(i === 0 && !!value));
      b.textContent = text;
      b.tabIndex = -1;
      b.addEventListener('click', () => {
        this.exec(text);
        this.input.value = '';
        this.renderSuggestions('');
        this.input.focus();
      });
      this.suggest.append(b);
    });
  }

  onInputKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const c = this.candidates(this.input.value);
      if (c.length === 1) this.input.value = `${c[0]} `;
      else if (c.length > 1) {
        // Complete the longest common prefix.
        let prefix = c[0];
        for (const s of c) while (!s.startsWith(prefix)) prefix = prefix.slice(0, -1);
        if (prefix.length > this.input.value.length) this.input.value = prefix;
        this.print(c.join('   '), 'dim');
      }
      this.renderSuggestions(this.input.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.hIndex < this.history.length - 1) this.input.value = this.history[++this.hIndex];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.hIndex = Math.max(this.hIndex - 1, -1);
      this.input.value = this.hIndex === -1 ? '' : this.history[this.hIndex];
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      this.out.textContent = '';
    }
  }

  /** Honest, measured micro-benchmarks executed on the visitor's machine. */
  async benchmark() {
    this.print('running 3 kernels on this device …', 'dim');
    await new Promise((r) => setTimeout(r, 30));

    // 1. FNV-1a hashing over 8 MiB.
    const buf = new Uint8Array(8 * 1024 * 1024);
    for (let i = 0; i < buf.length; i++) buf[i] = (i * 2654435761) >>> 24;
    let t0 = performance.now();
    let h = 0x811c9dc5;
    for (let i = 0; i < buf.length; i++) {
      h ^= buf[i];
      h = Math.imul(h, 0x01000193);
    }
    const hashMs = performance.now() - t0;

    // 2. Sort 250k float64.
    const arr = new Float64Array(250000);
    for (let i = 0; i < arr.length; i++) arr[i] = Math.random();
    t0 = performance.now();
    arr.sort();
    const sortMs = performance.now() - t0;

    // 3. Lattice physics.
    const lat = this.ctx.lattice ? this.ctx.lattice.benchmark(300) : null;

    const lines = [
      `fnv1a     8 MiB in ${hashMs.toFixed(1)} ms  → ${(8 / (hashMs / 1000)).toFixed(0)} MiB/s  (0x${(h >>> 0).toString(16)})`,
      `sort      250k f64 in ${sortMs.toFixed(1)} ms`,
    ];
    if (lat) {
      lines.push(`lattice   ${lat.steps} steps × ${lat.nodes} nodes in ${lat.ms.toFixed(1)} ms  → ${(lat.ms / lat.steps).toFixed(3)} ms/step`);
    }
    lines.push(`render    ${state.staticMode ? 'static (reduced motion)' : `${state.frame.work.toFixed(2)} ms/frame · ${state.frame.fps.toFixed(0)} fps`}`);
    this.print(lines.join('\n'), 'ok');
  }
}

/* =========================================================================
   13. Vim-style navigation
   ========================================================================= */

class VimNav {
  constructor({ xray, terminal }) {
    this.xray = xray;
    this.terminal = terminal;
    this.index = -1;
    this.lastG = 0;
    this.stops = () => [...$$('main > section[id]'), ...$$('.module')]
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

    document.addEventListener('keydown', (e) => this.onKey(e));
  }

  isTyping(e) {
    const t = e.target;
    return t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t?.isContentEditable;
  }

  focusStop(dir) {
    const stops = this.stops();
    // Start relative to whatever is nearest the top of the viewport.
    if (this.index === -1 || !stops[this.index]) {
      const top = window.innerHeight * 0.25;
      this.index = stops.findIndex((s) => s.getBoundingClientRect().bottom > top) - (dir > 0 ? 1 : 0);
    }
    this.index = clamp(this.index + dir, 0, stops.length - 1);
    const el = stops[this.index];
    $$('.module.is-focused').forEach((m) => m.classList.remove('is-focused'));
    if (el.classList.contains('module')) el.classList.add('is-focused');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: state.staticMode ? 'auto' : 'smooth', block: 'start' });
    synth.play('tick');
  }

  onKey(e) {
    // Global palette shortcut works everywhere.
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.terminal.toggle();
      return;
    }
    if (this.terminal.dialog.open || this.isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case '~':
      case '`':
        e.preventDefault();
        this.terminal.open();
        break;
      case 'j':
        this.focusStop(1);
        break;
      case 'k':
        this.focusStop(-1);
        break;
      case 'x': {
        const mod = document.activeElement?.closest?.('.module') || $('.module.is-focused');
        if (mod) this.xray.toggle(mod);
        break;
      }
      case 'g': {
        const now = performance.now();
        if (now - this.lastG < 400) {
          window.scrollTo({ top: 0, behavior: state.staticMode ? 'auto' : 'smooth' });
          this.index = -1;
        }
        this.lastG = now;
        break;
      }
      case 'G':
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: state.staticMode ? 'auto' : 'smooth' });
        this.index = -1;
        break;
      case '?':
        this.terminal.open();
        this.terminal.exec('help');
        break;
      default:
    }
  }
}

/* =========================================================================
   14. Boot log reveal (cosmetic, motion-only)
   ========================================================================= */

function bootLog() {
  if (state.staticMode) return;
  const lines = $$('#compile-log li');
  lines.forEach((li) => { li.style.opacity = '0'; });
  lines.forEach((li, i) => {
    setTimeout(() => {
      li.style.opacity = '';
      li.animate([{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], {
        duration: 220, easing: 'cubic-bezier(.16,1,.3,1)',
      });
    }, 260 + i * 140);
  });
}

/* =========================================================================
   15. Service worker (offline shell)
   ========================================================================= */

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol !== 'https:') return;
  navigator.serviceWorker.register('service-worker.js').then((reg) => {
    reg.update();
    if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          worker.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    });
  }).catch(() => { /* offline shell is optional */ });
}

/* =========================================================================
   16. Bootstrap
   ========================================================================= */

function main() {
  initInput();

  const telemetry = engine.add(new Telemetry());
  initSectionTracking(telemetry);

  const xray = new XRay();

  // Heavy visual systems start once the page is idle, keeping TBT ≈ 0.
  let lattice = null;
  let kinetic = null;
  let reticle = null;
  let magnetic = null;

  const theme = new Theme(() => {
    if (lattice) {
      lattice.colors = lattice.readColors();
      lattice.draw();
    }
  });

  const soundBtn = $('#sound-toggle');
  const setSound = (on) => {
    synth.setEnabled(on);
    soundBtn?.setAttribute('aria-pressed', String(on));
    if (on) synth.play('confirm');
  };
  soundBtn?.setAttribute('aria-pressed', String(synth.enabled));
  soundBtn?.addEventListener('click', () => {
    setSound(!synth.enabled);
    toast(synth.enabled ? 'Audio armed' : 'Audio muted');
  });

  const terminal = new Terminal({
    xray, theme, telemetry, setSound,
    get lattice() { return lattice; },
  });
  new VimNav({ xray, terminal });

  const enableReticle = () => {
    if (state.staticMode || !finePointer.matches) return;
    if (!reticle) reticle = engine.add(new Reticle());
    reticle.active = true;
    document.documentElement.classList.add('has-reticle');
  };
  const disableReticle = () => {
    if (reticle) reticle.active = false;
    document.documentElement.classList.remove('has-reticle');
  };

  const startVisuals = () => {
    const canvas = $('#lattice');
    if (canvas?.getContext) lattice = engine.add(new Lattice(canvas));
    const mega = $('.mega');
    if (mega) kinetic = engine.add(new Kinetic(mega));
    if (finePointer.matches) magnetic = engine.add(new Magnetic());
    enableReticle();
    telemetry.setMode(state.staticMode ? 'STATIC' : 'LIVE');
    engine.start();
  };

  bootLog();
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
  if (document.readyState === 'complete') idle(startVisuals, { timeout: 800 });
  else window.addEventListener('load', () => idle(startVisuals, { timeout: 800 }), { once: true });

  // Live switch between LIVE and STATIC SCHEMATIC when the OS setting changes.
  motionQuery.addEventListener('change', (e) => {
    state.staticMode = e.matches;
    telemetry.setMode(e.matches ? 'STATIC' : 'LIVE');
    if (e.matches) {
      engine.stop();
      kinetic?.reset();
      magnetic?.reset();
      disableReticle();
      lattice?.draw();
    } else {
      enableReticle();
      engine.start();
    }
  });
  finePointer.addEventListener('change', (e) => (e.matches ? enableReticle() : disableReticle()));

  // Tactile feedback on every activation.
  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href], .key-cta, .hud-btn')) synth.play('tick');
  });

  registerServiceWorker();
}

main();
