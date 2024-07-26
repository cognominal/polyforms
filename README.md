This a
[svelte app](svelte.README.md) to generate polyforms and solve tiling problems
with [polyforms](https://en.wikipedia.org/wiki/Polyform) interactively or programmatically. This is ongoing work.
Currently, when the app is run with `npm run dev` the action is in
[Tests/Board](http://localhost:5173/Tests/Board) that are components to be used
by the app that should be tested with Playwright.

## Getting back after 13 months. 

For someone loading this app, it has no interest whatsover.

The board and tile editors don't work (anymore)

I attempted (too) many things. Learning svelte, ts, js libraries
and testing libraries. Documentation is lacking. Untested code have been added to support other
polyforms than [polyominoes](https://en.wikipedia.org/wiki/Polyomino).
It seems that the polyomino solver is broken.

Using svelte means I want something interactive. So my current goal is to support a
6x10 board to be solved by the user. And to use the solver to incrementally add pieces.

The interactive tests should run only on dev mode.
The preview mode does not work.