UPDATE LOG 

Update0.1: Create a basic 3d shooter game using three.js and HTML. Commited by BlazingiceYT on 4 Aug 2026 

Update0.11: Bigger world (400×400) with 160 trees, scattered grass, and 14 multi-floor houses (1–3 floors) with open doorways, interior floors, and ramps you can walk up/through.
Blocky 3D held weapons — a chunky low-poly gun and axe, visible in both first-person (view model) and third-person (held in the character's hand).
49 bots spawn with you (50 total players), each carrying a gun and shooting back at you when in range, with individual health bars.
Axe: chop trees (raycast-based) → get 5 wood each, or melee bots for heavy damage.
Equipment slots at the bottom (Axe = 1, Gun = 2) — click a slot or press the number to switch.
Inventory: click the bag icon between the slots (or press Tab) to open a panel showing wood count and a "Build Wall" button.
Building: 5 wood = 1 wall, placed in front of you facing your direction (B key, in-world Build button, or from inventory).
Dedicated FIRE button, joystick, jump button, and view-toggle button for mobile, all alongside WASD/mouse/P on desktop, commited on 4 Aug 2026 by BlazingiceYT

Update0.12: AI bots use raycasting, and you now launch from a parachute. Commited by BlazingiceYT on 5 Aug 2026

Update0.13: Refactor house spawning logic and added different guns, scope, sensitivity toggle. Commited by BlazingiceYT on 5 Aug 2026

Update0.14: Sprint — hold Left Shift while moving to sprint at 1.65x speed. Blue stamina bar drains while sprinting and regenerates when you stop or run dry. You'll also see a slight FOV widen and a subtle speed-lines/vignette effect while running.
No more respawning enemies — killed bots stay dead. The "Alive" counter will now actually count down over the course of a match instead of holding steady.
Enemies drop from the plane — bots now spawn high in the sky with their own parachute, free-fall, pop their chute at a randomized altitude, and glide down to their spot on the ground — timed to happen right as the match actually starts.
Smarter enemies — bots now strafe unpredictably side-to-side while fighting instead of walking straight at you, react and shoot faster (cooldown down from ~0.9–1.5s to ~0.65–1.15s), notice threats from further away (24m → 30m), and are a bit more accurate up close. Commited by BlazingiceYT on 5 Aug 2026

Update0.15: Added a home screen with both modes:
Mode select — after the world loads, you now get two buttons: FREE FOR ALL (unchanged, plays exactly as before) and ZOMBIE MODE, which opens a short intro screen explaining the mode before you drop in.
Zombie Mode specifics:
Same island, but fenced into a smaller ~130×130 area centered on your spawn (reuses the existing houses/trees inside that zone) — a visible green boundary wall marks the edge.
You spawn straight on the ground at the center — no plane, no parachute.
The 49 free-for-all fighters are disabled entirely in this mode; only zombies exist.
Zombies burst up out of the ground (a rise animation) before joining the chase.
They always know exactly where you are — no line-of-sight requirement — and sprint straight at you (faster than the FFA bots), attacking in melee when they close the distance.
Waves increase in size each round (5, 8, 11, 14...) and slightly in toughness/speed as you go.
A wave ends and the next one auto-starts shortly after the last zombie dies.
SKIP WAVE button in the top-right: doesn't touch the zombies currently alive — it just throws the next wave's zombies in on top of them immediately.
Dying and hitting RESPAWN in zombie mode puts you back on the ground mid-wave (no plane sequence), rather than restarting the whole match.
