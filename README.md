# talks

Archive of my conference talks/meetup presentations.

**Live site:** https://haleshot.github.io/talks/

## Structure

Each talk is in its own folder following `<name>-<MM>-<YYYY>` naming:

```
talks/
├── rust-delhi-cocoindex-01-2026/    # Rust Delhi Meetup, Jan 2026
├── pyconf-hyderabad-03-2026/        # PyConf Hyderabad, Mar 2026
└── ...
```

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

To enable GitHub Pages: Settings > Pages > Build and deployment > **GitHub Actions**

## Links

- [haleshot.github.io](https://haleshot.github.io/)
- [@hari_leo03](https://twitter.com/hari_leo03)
