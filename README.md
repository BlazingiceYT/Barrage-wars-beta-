

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

**Update0.28** - *Commited by BlazingiceYT on 7 Aug 2026*
Bigger map + terrain
Map size increased 40% per side (400 → 560)
11 rolling hills scattered across the FFA map with smooth walkable slopes — the ground mesh itself is now deformed to match, and player/bot gravity follows the terrain naturally
Grass nearly doubled (3,000 → ~5,200 blades, 3 shades for a lusher look), trees increased 160 → 260, houses 22 → 30, ammo crates 20 → 28 — all sitting correctly on the new terrain, with houses staying off hillsides
Closing zone (FFA only)
Shrinks in 4 stages after you land from the plane, each with a hold period then a shrink period, center drifting a bit each time like a real BR storm
Purple wall + ring shows the current safe zone, white ring previews where it's shrinking to next
Damages you (with a pulsing vignette) and bots once per second when outside it, damage increasing each stage — bots also bias their wandering to stay inside the zone so the match doesn't fizzle out
HUD shows "Zone: Safe / Closing! / Final Zone"
Fully inactive in Zombie Mode — resets clean on every FFA restart

**Update0.29** - *Commited by BlazingiceYT on 10 Aug 2026*
Mini-map
A circular radar in the top-left, centered on you, north-up
Shows hills, houses, ammo crates (yellow), weapon pickups (colored by type), enemies (red triangles showing facing direction), and your own position (blue arrow that rotates with your facing)
In FFA it also draws the storm zone — a purple overlay for the danger area outside the safe circle, plus a white preview ring during the "hold" phase showing where it's shrinking to next
Automatically shows the smaller zombie-mode city area when you're in Zombie Mode instead
Smarter bots
Bots now start with an infinite-ammo pistol but actively seek out and pick up dropped/spawned guns (AK-47, sniper, minigun) when they spot one that's a real upgrade over what they're carrying
Picked-up guns have real limited ammo (mag + reserve) just like yours — bots reload from reserve, and fall back to the pistol if they run completely dry
Bots seek out ammo crates when running low on ammo for their equipped gun
Each weapon type now has bot-appropriate damage and fire-rate (minigun sprays fast for chip damage, sniper hits hard but rarely, etc.)
Low-health bots now hang back and try to keep distance instead of always charging in
Idle "standing around" time between wander points cut way down, so downtime bots look busier

**Update0.30** - *Commited by BlazingiceYT on 10 Aug 2026*
Fire/scope button overlap — while scoped, the scope button slides over to sit right on the fire button (computed from its live on-screen position, so it still respects a custom control layout), and snaps back when you unscope.
Bots deal more damage — damage bumped ~60-70% across all bot weapons.
Expandable minimap — tap the ⤢ button in its corner to grow it from 150px to 280px (crisp at both sizes since the canvas resolution scales too).
Graphics settings — new GRAPHICS section in the settings panel:
Render Distance slider (Low/Medium/High) — scales fog and camera draw distance
Show Dead Bodies toggle — corpses now stay on the ground (tipped over) instead of vanishing, capped at 60 at once so Zombie Mode's endless waves can't quietly tank your framerate over a long session
Grenades — full throw mechanic, not just a pickup:
Spawn in houses on their own independent 35% roll per floor (separate from the 55% gun roll, so one doesn't crowd out the other)
Green pickup ring, HUD counter (💣 button, max 4 held)
Bound to F / the grenade button — throws with a real arc (gravity + a bit of bounce off terrain), fuse timer, then explodes with a radius-falloff blast (up to 95 dmg at the center, tapering to 0 at the 9-unit edge), checks line-of-sight so walls actually block the blast, damages you, bots, and zombies alike, with a light/flash FX and a synthesized boom sound plus screen shake if you're close

**Patch0.31** - *Commited by BlazingiceYT on 10 Aug 2026*
Grenade button invisible and Mini-map wouldn't expand gliteches fixed

**Update0.32** - *Commited by BlazingiceYT on 10 Aug 2026*
Footsteps — a soft low-passed noise thud plays on a timer while you're moving on the ground, cadence changes with sprint/walk/crouch (faster when sprinting, slower and quieter when crouched), and it goes silent mid-air or in menus.
Crouching — hold Ctrl/C (desktop) or the new crouch button next to Jump (mobile, drag it in the HUD editor like any other control). Crouching drops your speed to ~45%, disables sprint, lowers your camera/eye height, and squashes the third-person model down smoothly. Only works while grounded.
Fall damage — tracks your peak height during a fall (whether you jumped or walked off a ledge) and compares it to landing height. Falls under ~4.2m are free; beyond that it's ~11 damage per meter over, using the same damagePlayer hit-flash/vignette/death flow as combat damage.

**Update0.33** - *Commited by BlazingiceYT on 11 Aug 2026*
Added auto shoot and aim assist for mobile

**Update0.34** - *Commited by BlazingiceYT on 11 Aug 2026*
Added a hit-confirm sound alongside the existing hitmarker — a quick two-tick chirp that plays the moment a bullet or axe swing actually lands on a bot or zombie. Headshots layer a brighter ringing tone on top so they're audibly distinct from a body shot.

**Update0.35** - *Commited by BlazingiceYT on 11 Aug 2026*
Added runner tank boss zombie
