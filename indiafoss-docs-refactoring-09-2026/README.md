# Refactoring documentation without breaking it

Lightning talk for the Documentation & Technical Writing devroom at IndiaFOSS 2026, Bengaluru.

Renaming a heading or moving a page is a refactor. Your editor treats it as a text edit, so links break and CI reports it after the site is already live. Three link-repair PRs from real projects, and what an editor that understood the project could have caught.

**Date:** 26-27 September 2026

## Run

```bash
npm install
npm run dev
```

## Build / export

```bash
npm run build
npm run export
```

## Check before presenting

The [CFP](https://fossunited.org/c/indiafoss/2026/cfp/6dpd2lbkma) calls Zensical Studio "a newly launched FOSS extension for VS Code", which needs rewording on stage. The repo at [zensical/studio](https://github.com/zensical/studio) is public and its editor integrations and grammars are MIT, but Studio itself is covered by a separate EULA. From their README: "Studio will retain a free edition for everyday authoring. During the public beta, advanced features are also free to try. From November 5, 2026, project-wide refactoring and other advanced features will require Studio Pro." The deck carries one factual line about this, which felt like the right amount for a FOSS room.

Also worth fixing on the proposal page: `zensical.org/studio/write/links/`, listed there under References, now returns 404. Their docs moved under a `/docs/` prefix and that page did not come along.

## Assets

- `public/fluree-1376-diff.png`, `public/cocoindex-1959-diff.png` are the two PR diffs, cropped at 1:1 pixels by `components/ShotSlot.vue` so the text survives a projector. Swap either one and re-tune its `pos`.
- `public/indiafoss-2026.svg` and `public/write-the-docs-india.svg` render in the footer of every slide via `global-bottom.vue`.
- `components/LinkGraph.vue` is the inline SVG on the rename slide, following that slide's clicks.

## Notes

- PNG and PDF export freeze the Magic Move slide at its first state. It animates in the browser and in presenter mode.
- Every external link in the deck returned 200 when checked on 19 September 2026.

## References

- [Refactoring](https://refactoring.com/), Martin Fowler
- [Cool URIs don't change](https://www.w3.org/Provider/Style/URI), Tim Berners-Lee, 1998
- [Docs as Code](https://www.writethedocs.org/guide/docs-as-code/), Write the Docs
- [Zensical Studio](https://zensical.org/studio/)
- [lychee](https://lychee.cli.rs/)
- PRs: [fluree/db#1376](https://github.com/fluree/db/pull/1376), [cocoindex#1959](https://github.com/cocoindex-io/cocoindex/pull/1959), [cocoindex#1425](https://github.com/cocoindex-io/cocoindex/pull/1425)
