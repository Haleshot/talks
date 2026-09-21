# WTD-IndiaFOSS

Slidev deck for IndiaFOSS 2026, Documentation & Technical Writing devroom.

- Title: Refactoring documentation without breaking it
- Format: lightning talk, 13 slides, about 10 minutes by the notes
- Proposal: https://fossunited.org/c/indiafoss/2026/cfp/6dpd2lbkma

## Check before you present

**The proposal still describes a Zensical Studio talk.** That tooling is proprietary, so the talk now uses [Marksman](https://github.com/artempyanykh/marksman) instead: MIT, F#, one self-contained binary, and it works through LSP in VS Code, Neovim, Helix, Emacs, Vim, Sublime and Kakoune. Reword the abstract if FOSS United still lets you edit it.

Everything the deck claims about Marksman was tested against release `2026-02-08`, not read off a feature table. The test drove the server over LSP against a workspace built to match the deck's own `guide/setup.md#getting-started` example:

| Tried | Result |
|---|---|
| Find references on `## Getting started` | 3, covering file-relative, root-relative and wiki links |
| Rename that heading | 4 edits across 4 files, anchors included |
| Inline link to a missing file | Flagged |
| Inline link to a missing **anchor** | Not flagged. Wiki links are |
| Moving or renaming a file | Unsupported. No `willRename` or `didRename` |

Re-run it before the talk. A six-month-old release is exactly the sort of thing that shifts underneath a claim, and the inline-anchor gap is the one the deck leans on.

**Marksman needs a project root.** A `.git` directory or a `.marksman.toml` file. Without one it drops into single-file mode and none of the cross-file work happens, which the [features doc](https://github.com/artempyanykh/marksman/blob/main/docs/features.md) explains under "Workspace folders, project roots, and single-file mode". Worth saying out loud, because everyone hits it.

## Design

- Seriph, light. Off-white paper, ink text, the theme's own serif for headings.
- One accent (Material indigo, the Zensical site's primary) for links and the thing being pointed at. Deep orange only for something broken.
- No pills, badges, cards, gradients, glows or icon grids. Type, hairline rules, tables.
- The cover shows the title with the anchor that title would generate sitting under it. It is the whole argument in one grey line, and the opening note points at it.
- `global-bottom.vue` puts the IndiaFOSS 2026 and Write the Docs India logos in the bottom-right corner of every slide. Change the size or corner there.
- `components/LinkGraph.vue` is inline SVG on the rename slide: three pages linking to one heading, following the slide's clicks. Right-angle connectors, masked labels, one accent, per the diagram-design skill's connector rules.
- `components/ShotSlot.vue` frames a screenshot. Pass `raw` with `pos` to show it at 1:1 pixels instead of shrinking it, which is the only way a wide GitHub diff stays readable on a projector. If you swap either screenshot, re-tune `pos` by exporting and looking.

## Assets in `public/`

| File | Used on |
|---|---|
| `indiafoss-2026.svg`, `write-the-docs-india.svg` | the footer, every slide |
| `fluree-1376-diff.png` | the 404s slide, left, cropped to the README-link change |
| `cocoindex-1959-diff.png` | the 404s slide, right, cropped to the `blob/v1` → `blob/main` hunk |
| `zensical_inspect_references.png` | the Zensical slide |
| `studio_bulk_repair_links.webp` | the bulk-repair recording slide |
| `srihari.png`, `qr-code.png` | about, and the closing slide |

## Commands

```bash
npm install
npm run dev
npm run build
npm run export
```

## Other things worth knowing

- PNG and PDF export freeze the Magic Move slide at its first state. It animates in the browser and in presenter mode.
- Every external link in the deck was checked on 19 September 2026 and returned 200.
- Sources for the quoted lines: Fowler's definition from refactoring.com, "URIs don't change: people change them" from Berners-Lee's *Cool URIs don't change* (W3C, 1998), the docs-as-code definition from the Write the Docs guide, The Language Server Protocol shipped in 2016.
- The stray slide list on the right in `npm run dev` was Slidev 0.49's "go to slide" autocomplete leaking through. `styles/index.css` hides it until the dialog is open.
