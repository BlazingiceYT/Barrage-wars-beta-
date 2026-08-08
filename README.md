

**UPDATE LOG**

**Update 0.1** — *Committed by BlazingiceYT on 4 Aug 2026*
Created a basic 3D shooter using Three.js and HTML.

**Update 0.11** — *Committed by BlazingiceYT on 4 Aug 2026*
Expanded the world to 400×400 with 160 trees, scattered grass, and 14 multi-floor houses (1–3 floors) featuring open doorways, interior floors, and walkable ramps. Added blocky first-person and third-person held weapons (gun and axe). 49 AI bots spawn alongside you (50 total), each armed and shooting back when in range, with individual health bars. Axe doubles as a tree-chopping tool (raycast, 5 wood per tree) and a heavy melee weapon. Equipment slots at the bottom (Axe = 1, Gun = 2) — click or press number keys to switch. Inventory system: bag icon or Tab opens a panel showing wood count and a "Build Wall" button. Spend 5 wood to place a wall in front of you (B key, build button, or from inventory). Added full mobile support: dedicated fire button, joystick, jump, and view-toggle, alongside desktop WASD/mouse/P controls.

**Update 0.12** — *Committed by BlazingiceYT on 5 Aug 2026*
Bots now use raycasting. Players launch from a parachute at match start.

**Update 0.13** — *Committed by BlazingiceYT on 5 Aug 2026*
Refactored house spawning logic. Added multiple gun types, a scope, and a sensitivity toggle.

**Update 0.14** — *Committed by BlazingiceYT on 5 Aug 2026*
**Sprint system:** Hold Left Shift to sprint at 1.65× speed. A blue stamina bar drains while sprinting and regenerates when you stop or run dry. Sprinting also triggers a slight FOV widen and subtle speed-lines/vignette effect.
**Permanent kills:** Killed bots no longer respawn — the "Alive" counter now actually counts down over the match.
**Aerial spawns:** Bots now drop from the sky with their own parachutes, free-falling and deploying at randomized altitudes before gliding to the ground, timed to match the player's drop.
**Smarter AI:** Bots now strafe unpredictably while fighting, react and shoot faster (cooldown reduced from ~0.9–1.5s to ~0.65–1.15s), detect threats from further away (24m → 30m), and are more accurate at close range.

**Update 0.15** — *Committed by BlazingiceYT on 5 Aug 2026*
**Home screen with mode select:** After the world loads, players choose between FREE FOR ALL (unchanged) and ZOMBIE MODE (opens a brief intro screen before dropping in).
**Zombie Mode specifics:** Same island, but fenced into a ~130×130 area with a visible green boundary wall. Players spawn on the ground at center — no plane or parachute. FFA bots are disabled. Zombies burst out of the ground with a rise animation, then sprint directly at the player (no line-of-sight needed, faster than FFA bots) and attack in melee. Waves escalate in size (5, 8, 11, 14...) and slightly in toughness/speed. Next wave auto-starts shortly after the last zombie dies. A SKIP WAVE button in the top-right immediately adds the next wave without clearing current zombies. Respawning puts you back on the ground mid-wave with no plane sequence.

**Update 0.16** — *Committed by BlazingiceYT on 6 Aug 2026*
Added the r128-matched GLTFLoader script. Introduced MODEL_WEAPON_CONFIG pointing at pistol.glb, ak-47.glb, minigun.glb, and sniper.glb, plus per-weapon muzzle offsets and the minigun's barrel-cluster node for spin animation. Added model loading that swaps .glb weapons in for blocky placeholders in both first-person and third-person views, updating muzzle positions accordingly. The axe remains procedural. Missing files are handled gracefully with a warning and fallback to placeholders. Guarded the minigun barrel-spin animation against missing barrel cluster nodes. *(Mini patch applied.)*

**Update 0.17** — *Committed by BlazingiceYT on 6 Aug 2026*
Added customizable button layout via the settings menu.

**Patch 0.18** — *Committed by BlazingiceYT on 6 Aug 2026*
Fixed settings menu not appearing on the home screen. Fixed guns spawning in only some houses. Added credits.

**Patch 0.19** — *Committed by BlazingiceYT on 6 Aug 2026*
Fixed oversized gun models.

**Patch 0.20** — *Committed by BlazingiceYT on 7 Aug 2026*
Fixed inaccurate bullet trajectory.

**Update 0.21** — *Committed by BlazingiceYT on 7 Aug 2026*
Added a more dynamic joystick and an FPS counter.

**Patch 0.22** — *Committed by BlazingiceYT on 7 Aug 2026*
Fixed inaccurate FPS counter.

**Patch 0.23** — *Committed by BlazingiceYT on 7 Aug 2026*
Fixed sizing errors when playing on port 8000.

**Update 0.24** — *Committed by BlazingiceYT on 7 Aug 2026*
Settings can now be opened while walking.

**Optimization 0.25** — *Committed by BlazingiceYT on 7 Aug 2026*
**Object pooling:** Tracers and muzzle flashes are now pre-allocated in a pool of 48 each and recycled, eliminating per-shot creation/destruction. If the pool is exhausted, the oldest entry is reused instantly — every shot always produces a visible tracer.
**Shared geometry:** Bots and zombies now share body geometry only — health, alive/dead state, position, and varied colors (body/skin tones) remain fully individual. Killing one bot has zero effect on others. Trees and streetlamps received the same treatment.
**Distance-based shadow culling:** Characters beyond ~45m and trees beyond ~60m stop casting shadows (checked ~10× per second), reducing GPU load during large firefights without any visible impact.

**Update0.26** - *Committed by BlazingiceYT on 7 Aug 2026*
**Added reload button**

**Patch0.27** - *Commited by BlazingiceYT on 7 Aug 2026*
**Fixed no sound on IOS**
