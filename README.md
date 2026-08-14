

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
Added sprinting
Fixed bots respawning
Bots now drop from the sky with their own parachutes
Smarter AI: Bots now strafe unpredictably

**Update 0.15** — *Committed by BlazingiceYT on 5 Aug 2026*
Added home screen and zombie mode

**Update 0.16** — *Committed by BlazingiceYT on 6 Aug 2026*
Game now loads actual 3d models

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
Object pooling: Tracers and muzzle flashes are now pre-allocated in a pool of 48 each and recycled to improve performance
Shared geometry: Bots and zombies now share body geometry 
Added Distance-based shadow culling

**Update0.26** - *Committed by BlazingiceYT on 7 Aug 2026*
**Added reload button**

**Patch0.27** - *Commited by BlazingiceYT on 7 Aug 2026*
**Fixed no sound on IOS**

**Update0.28** - *Commited by BlazingiceYT on 7 Aug 2026*
Bigger map with hills

**Update0.29** - *Commited by BlazingiceYT on 10 Aug 2026*
Added mini map andSmarter bots.

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

**Update0.36** - *Commited by BlazingiceYT on 11 Aug 2026*
Added key rebinding for keyboard

**Update0.37** - *Commited by BlazingiceYT on 11 Aug 2026*
Bots now drop their held gun when killed

**Update0.38** - *Commited by BlazingiceYT on 11 Aug 2026*
Added windows to houses

**Patch0.39** - *Commited by BlazingiceYT on 11 Aug 2026*
Fixed zombie mode bugs

**Update0.40** - *Commited by BlazingiceYT on 12 Aug 2026*
Added smoke bomb

**Update0.41** - *Commited by BlazingiceYT on 12 Aug 2026*
Field of View slider (60–110°, default 70) — right under Scope Sensitivity. Changes apply live (smoothly eased in, same mechanism that already handles the sprint FOV bump), and correctly returns to your chosen value when you unscope.
Invert Look Y toggle — flips vertical look on mouse drag, touch drag, and the fire-button drag-to-aim, so it works the same on desktop and mobile.
Colorblind-Friendly Colors toggle (new "Accessibility" section) — swaps the red/yellow/green enemy-health-bar and hitmarker scheme for blue/amber/red, since red vs. green is the pairing most colorblind players struggle with. Applies immediately to any bots/zombies/boss already on screen, not just future ones.

**Update0.43** - *Commited by BlazingiceYT on 12 Aug 2026*
Added better UI and molotov

**Update0.44** - *Commited by BlazingiceYT on 12 Aug 2026*
Upgraded pickup logic

**Update0.45** - *Commited by BlazingiceYT on 12 Aug 2026*
Upgraded buliding mechanic

**Patch0.46** - *Commited by BlazingiceYT on 13 Aug 2026*
Fixed bulidng mechanic]

**Update0.47** - *Commited by BlazingiceYT on 13 Aug 2026*
Added different types of bots

**Update0.48** - *Commited by BlazingiceYT on 13 Aug 2026*
Added damage direction indicator

**Patch0.49** - *Commited by BlazingiceYT on 13 Aug 2026*
Fixed skip wave button not working

**Update0.50** - *Commited by BlazingiceYT on 13 Aug 2026*
Added new guns but yet to fix their rotation

**Update0.51** - *Commited by BlazingiceYT on 13 Aug 2026*
Add ability buttons for trampoline, dash, forcefield, and fly

**Update0.52** - *Commited by BlazingiceYT on 14 Aug 2026*
Upgraded inventory slots
