# talks

Archive of my conference talks/meetup presentations.

**Live site:** https://haleshot.github.io/talks/

## Structure

Each talk is in its own folder following `<name>-<MM>-<YYYY>` naming:

```
talks/
├── technical-writing-wikimedia-03-2026/  # Wikimedia workshop, Mar 2026
├── rust-delhi-cocoindex-01-2026/         # Rust Delhi Meetup, Jan 2026
└── ...
```

## Talk metadata

The landing page reads optional metadata from each talk's `slides.md` frontmatter.
These fields are supported:

- `event`
- `date`
- `description`
- `tags`
- `slidesUrl`
- `linkedinUrl`
- `blogUrl`
- `draft`

If they are omitted, the site falls back to the folder name, detected title, and local slide deck URL.

## Running a presentation

Most presentations use [Slidev](https://sli.dev/). To run one locally:

```bash
cd <talk-folder>
npm install
npm run dev
```

Then open http://localhost:3030

Presenter mode: press `p`
Export to PDF: `npm run export`

## Building the full site

The site auto-deploys via GitHub Actions on push to `main`. To build locally:

```bash
npm run build:local    # Builds all talks + landing page to dist/
```

To preview build:

```bash
npx serve dist
```

To enable GitHub Pages: Settings > Pages > Build and deployment > **GitHub Actions**

## Links

- [haleshot.github.io](https://haleshot.github.io/)
- [@hari_leo03](https://twitter.com/hari_leo03)
