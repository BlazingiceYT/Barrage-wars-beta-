const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const state = {
  speed: 0.02,
  maxSpeed: 0.22,
  minSpeed: 0.01,
  distance: 0,
  lateral: 0,
  heading: 0,
  roadHalfWidth: 0.28,
  keys: new Set(),
  hillsSeed: 0,
  turnsSeed: 0
};

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
addEventListener('resize', resize);
resize();

addEventListener('keydown', e => state.keys.add(e.key.toLowerCase()));
addEventListener('keyup', e => state.keys.delete(e.key.toLowerCase()));

function noise1d(x) {
  return Math.sin(x * 0.55) * 0.6 + Math.sin(x * 1.3 + 2.2) * 0.3 + Math.sin(x * 3.7 + 1.8) * 0.1;
}

function project(x, y, z, cameraZ = 0.75) {
  const depth = Math.max(0.01, z - cameraZ);
  const f = 1.0 / depth;
  return {
    x: canvas.clientWidth * (0.5 + x * f * 0.45),
    y: canvas.clientHeight * (0.62 - y * f * 0.45),
    s: f
  };
}

function update(dt) {
  if (state.keys.has('arrowup') || state.keys.has('w')) state.speed += dt * 0.06;
  if (state.keys.has('arrowdown') || state.keys.has('s')) state.speed -= dt * 0.1;
  state.speed = Math.min(state.maxSpeed, Math.max(state.minSpeed, state.speed));

  const steer = (state.keys.has('arrowleft') || state.keys.has('a') ? -1 : 0) +
                (state.keys.has('arrowright') || state.keys.has('d') ? 1 : 0);

  const curve = noise1d(state.distance * 0.08 + state.turnsSeed) * 0.02;
  state.heading += (curve + steer * 0.0018 * (state.speed / state.maxSpeed)) * dt * 60;
  state.lateral += steer * dt * 0.5 * (0.4 + state.speed);
  state.lateral -= state.heading * dt * 0.4;
  state.lateral = Math.max(-0.9, Math.min(0.9, state.lateral));

  state.distance += state.speed * dt * 60;
}

function draw() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  // sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#78c6ff');
  sky.addColorStop(1, '#d5f0ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // ground
  ctx.fillStyle = '#5aa35d';
  ctx.fillRect(0, h * 0.58, w, h * 0.42);

  // draw road slices from far to near
  for (let i = 110; i >= 4; i--) {
    const z1 = i * 0.12;
    const z2 = (i - 1) * 0.12;

    const worldD1 = state.distance + z1;
    const worldD2 = state.distance + z2;

    const hill1 = noise1d(worldD1 * 0.05 + state.hillsSeed) * 0.1;
    const hill2 = noise1d(worldD2 * 0.05 + state.hillsSeed) * 0.1;

    const bend1 = noise1d(worldD1 * 0.08 + state.turnsSeed) * 0.5;
    const bend2 = noise1d(worldD2 * 0.08 + state.turnsSeed) * 0.5;

    const cx1 = bend1 - state.heading - state.lateral;
    const cx2 = bend2 - state.heading - state.lateral;

    const p1l = project(cx1 - state.roadHalfWidth, hill1, z1);
    const p1r = project(cx1 + state.roadHalfWidth, hill1, z1);
    const p2l = project(cx2 - state.roadHalfWidth, hill2, z2);
    const p2r = project(cx2 + state.roadHalfWidth, hill2, z2);

    ctx.beginPath();
    ctx.moveTo(p1l.x, p1l.y);
    ctx.lineTo(p1r.x, p1r.y);
    ctx.lineTo(p2r.x, p2r.y);
    ctx.lineTo(p2l.x, p2l.y);
    ctx.closePath();
    const shade = 42 + Math.floor((i % 18) * 1.4);
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.fill();

    // edge lines
    if (i % 8 < 4) {
      ctx.strokeStyle = '#f4f4f4';
      ctx.lineWidth = Math.max(1, 4 / z1);
      ctx.beginPath(); ctx.moveTo(p1l.x, p1l.y); ctx.lineTo(p2l.x, p2l.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(p1r.x, p1r.y); ctx.lineTo(p2r.x, p2r.y); ctx.stroke();
    }

    // center dashed
    if (i % 10 < 5) {
      const c1 = project(cx1, hill1, z1);
      const c2 = project(cx2, hill2, z2);
      ctx.strokeStyle = '#ffd93b';
      ctx.lineWidth = Math.max(1, 3 / z1);
      ctx.beginPath(); ctx.moveTo(c1.x, c1.y); ctx.lineTo(c2.x, c2.y); ctx.stroke();
    }
  }

  // simple HUD speed
  ctx.fillStyle = 'rgba(0,0,0,.45)';
  ctx.fillRect(w - 150, 12, 130, 40);
  ctx.fillStyle = '#fff';
  ctx.font = '16px system-ui';
  ctx.fillText(`Speed ${Math.round(state.speed * 420)} km/h`, w - 140, 38);
}

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  update(dt);
  draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
