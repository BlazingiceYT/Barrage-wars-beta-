const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const gun = document.querySelector('#gun');
const shootButton = document.querySelector('#shootButton');
const scoreEl = document.querySelector('#score');
const healthEl = document.querySelector('#health');
const joystick = document.querySelector('#joystick');
const stick = document.querySelector('#stick');

const player = { x: 0, z: 0, yaw: 0, health: 100, score: 0 };
const keys = new Set();
const joy = { x: 0, y: 0, active: false, id: null };
let lastTime = performance.now();
let shake = 0;
let lookDrag = null;

const enemies = Array.from({ length: 18 }, (_, i) => ({
  x: Math.cos(i * 1.7) * (18 + (i % 5) * 9),
  z: Math.sin(i * 1.7) * (18 + (i % 5) * 9),
  hp: 2,
  phase: i * 0.9,
}));

const props = Array.from({ length: 90 }, (_, i) => ({
  x: Math.sin(i * 12.989) * 85 + Math.cos(i * 5.22) * 18,
  z: Math.cos(i * 7.31) * 85 + Math.sin(i * 9.17) * 18,
  h: 2 + (i % 6),
  color: i % 4 === 0 ? '#4a6b2c' : '#5f7d38',
}));

function resize() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(innerWidth * ratio);
  canvas.height = Math.floor(innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
window.addEventListener('resize', resize);
resize();

function worldToCamera(x, z) {
  const dx = x - player.x;
  const dz = z - player.z;
  const s = Math.sin(player.yaw);
  const c = Math.cos(player.yaw);
  return { x: dx * c - dz * s, z: dx * s + dz * c };
}

function project(x, y, z) {
  const fov = Math.min(innerWidth, innerHeight) * 0.9;
  return {
    x: innerWidth / 2 + (x / z) * fov,
    y: innerHeight / 2 - (y / z) * fov,
    scale: fov / z,
  };
}

function drawGround() {
  const horizon = innerHeight * 0.46;
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#78c8ff');
  sky.addColorStop(1, '#d9f4ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, innerWidth, horizon);

  const ground = ctx.createLinearGradient(0, horizon, 0, innerHeight);
  ground.addColorStop(0, '#678d3a');
  ground.addColorStop(1, '#213b1d');
  ctx.fillStyle = ground;
  ctx.fillRect(0, horizon, innerWidth, innerHeight - horizon);

  ctx.strokeStyle = 'rgba(255,255,255,0.09)';
  for (let i = 1; i < 18; i++) {
    const y = horizon + (i / 18) ** 1.8 * (innerHeight - horizon);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(innerWidth, y);
    ctx.stroke();
  }
}

function drawBillboard(item, width, height, color, label) {
  const cam = worldToCamera(item.x, item.z);
  if (cam.z < 1) return;
  const p = project(cam.x, height / 2, cam.z);
  const w = width * p.scale;
  const h = height * p.scale;
  if (p.x + w < 0 || p.x - w > innerWidth) return;
  ctx.fillStyle = color;
  ctx.fillRect(p.x - w / 2, p.y - h / 2, w, h);
  ctx.strokeStyle = 'rgba(0,0,0,0.45)';
  ctx.lineWidth = Math.max(1, p.scale * 0.04);
  ctx.strokeRect(p.x - w / 2, p.y - h / 2, w, h);
  if (label && p.scale > 8) {
    ctx.fillStyle = 'white';
    ctx.font = `${Math.max(10, p.scale * 0.22)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(label, p.x, p.y - h / 2 - 8);
  }
}

function drawWorld() {
  drawGround();
  const renderables = [
    ...props.map((p) => ({ type: 'prop', item: p, depth: worldToCamera(p.x, p.z).z })),
    ...enemies.filter((e) => e.hp > 0).map((e) => ({ type: 'enemy', item: e, depth: worldToCamera(e.x, e.z).z })),
  ].sort((a, b) => b.depth - a.depth);

  for (const r of renderables) {
    if (r.type === 'prop') drawBillboard(r.item, 1.8, r.item.h, r.item.color);
    else drawBillboard(r.item, 1.2, 2.4, '#b7352d', 'enemy');
  }
}

function update(dt) {
  const forward = (keys.has('w') ? 1 : 0) - (keys.has('s') ? 1 : 0) - joy.y;
  const strafe = (keys.has('d') ? 1 : 0) - (keys.has('a') ? 1 : 0) + joy.x;
  const speed = 8 * dt;
  const s = Math.sin(player.yaw);
  const c = Math.cos(player.yaw);
  player.x += (s * forward + c * strafe) * speed;
  player.z += (c * forward - s * strafe) * speed;

  for (const enemy of enemies) {
    if (enemy.hp <= 0) continue;
    enemy.phase += dt;
    const dx = player.x - enemy.x;
    const dz = player.z - enemy.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 22) {
      enemy.x += (dx / dist) * dt * 1.5;
      enemy.z += (dz / dist) * dt * 1.5;
    }
    if (dist < 2) player.health = Math.max(0, player.health - dt * 11);
  }
  healthEl.textContent = `Health: ${Math.round(player.health)}`;
}

function shoot() {
  gun.classList.remove('flash');
  void gun.offsetWidth;
  gun.classList.add('flash');
  document.body.classList.remove('shake');
  void document.body.offsetWidth;
  document.body.classList.add('shake');
  shake = 0.15;

  let best = null;
  for (const enemy of enemies) {
    if (enemy.hp <= 0) continue;
    const cam = worldToCamera(enemy.x, enemy.z);
    if (cam.z < 1) continue;
    const aim = Math.abs(cam.x / cam.z);
    if (aim < 0.08 && (!best || cam.z < best.cam.z)) best = { enemy, cam };
  }
  if (best) {
    best.enemy.hp -= 1;
    if (best.enemy.hp <= 0) {
      player.score += 100;
      scoreEl.textContent = `Score: ${player.score}`;
    }
  }
}

function loop(now) {
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  ctx.save();
  if (shake > 0) {
    shake -= dt;
    ctx.translate((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9);
  }
  drawWorld();
  ctx.restore();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

window.addEventListener('keydown', (e) => keys.add(e.key.toLowerCase()));
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
shootButton.addEventListener('pointerdown', (e) => { e.preventDefault(); shoot(); });
window.addEventListener('click', (e) => { if (e.target === canvas) shoot(); });

canvas.addEventListener('pointerdown', (e) => {
  lookDrag = { id: e.pointerId, x: e.clientX };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (lookDrag?.id !== e.pointerId) return;
  player.yaw -= (e.clientX - lookDrag.x) * 0.004;
  lookDrag.x = e.clientX;
});
canvas.addEventListener('pointerup', () => { lookDrag = null; });

function updateJoystick(e) {
  const rect = joystick.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const max = rect.width * 0.34;
  const dx = Math.max(-max, Math.min(max, e.clientX - cx));
  const dy = Math.max(-max, Math.min(max, e.clientY - cy));
  joy.x = dx / max;
  joy.y = dy / max;
  stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
}
joystick.addEventListener('pointerdown', (e) => {
  joy.active = true;
  joy.id = e.pointerId;
  joystick.setPointerCapture(e.pointerId);
  updateJoystick(e);
});
joystick.addEventListener('pointermove', (e) => {
  if (joy.active && joy.id === e.pointerId) updateJoystick(e);
});
function releaseJoystick() {
  joy.active = false;
  joy.id = null;
  joy.x = 0;
  joy.y = 0;
  stick.style.transform = 'translate(-50%, -50%)';
}
joystick.addEventListener('pointerup', releaseJoystick);
joystick.addEventListener('pointercancel', releaseJoystick);
