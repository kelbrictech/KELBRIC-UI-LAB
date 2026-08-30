# KELBRIC UI LAB

A mobile-first static interaction playground for learning what browser UI can do before those interactions are committed to production apps.

## Purpose

No story, backend, login, database, or AI workflow. Each specimen isolates one interaction and provides a quick hands-on demo.

## Included specimens

- Motion basics: fade/slide, spring, stagger
- Touch & gesture: drag + snap, swipe card, long press
- Physical UI: drawer, card flip, finger-driven pull-down studio backdrop
- Cards & galleries: scroll-snap carousel, preview → commit
- Microinteractions: favorite, toggle, success pulse
- Image interactions: before/after wipe, lightbox
- SHALA experiments: compact open, rack slide-in, InspOOTD pair reveal

## Run

Open `index.html` directly, or serve as a static site.

For GitHub Pages, publish the repository root from the default branch.

## Important Studio prototype rule

The Studio selector specimen models the agreed interaction:

- **Swipe down = inspect / mini reveal**
- **Tap unfurled Studio = select / switch mode**
- It is finger-driven, not a canned GIF.
- In production, the preview must use the approved Studio asset registry itself.

## Difficulty legend

- `● EASY` — CSS/basic JavaScript
- `●● MODERATE` — gesture/state handling
- `●●● ADVANCED` — careful gesture physics, accessibility, and state coordination
