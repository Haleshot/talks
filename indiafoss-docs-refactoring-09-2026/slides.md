---
theme: seriph
title: Refactoring documentation without breaking it
event: IndiaFOSS 2026 · Bengaluru
date: Sep 2026
description: Renaming a heading or moving a page is a refactor, and your editor treats it as a text edit. Three link-repair PRs, and what an editor that understood the project could have caught.
tags:
  - Documentation
  - Technical Writing
  - Refactoring
  - Write the Docs
info: |
  Lightning talk for IndiaFOSS 2026, Documentation & Technical Writing devroom.
  Renaming a heading or moving a page is a refactor. Editors treat it as a text edit,
  so links break and CI reports it after the site is already live. Three link-repair
  PRs from real projects, and what an editor that understood the project could do.
colorSchema: light
drawings:
  persist: false
transition: fade
mdc: true
fonts:
  mono: JetBrains Mono
themeConfig:
  primary: '#3f51b5'
layout: cover
class: text-left
---

<div class="cover-block">

# Refactoring documentation without breaking it

<p class="cover-anchor">#refactoring-documentation-without-breaking-it</p>

<p class="cover-sub">
What happens to a link when you rename the heading it points at, and why the editor should be the one to notice.
</p>

<div class="cover-by">Srihari Thyagarajan</div>

</div>

<!--
Hi, I'm Srihari.

One thing before I start. That grey line under the title is the anchor this talk's title would generate if it were a heading in your docs. If I renamed the talk right now, every link anyone had made to it would quietly stop working, and nothing in my editor would tell me.

That's the talk. Ten minutes on what happens to links when you reorganise documentation, and why the place to catch it is where you're typing rather than in CI an hour later.
-->

---
transition: fade
---

# Why I proposed this talk

<p class="ink mt-5 text-xl leading-relaxed max-w-3xl">
Three times in the past year, I've opened a pull request that did nothing but repair links.
</p>

<div class="prlist mt-9 max-w-4xl">

<div v-click class="prrow">
  <a href="https://github.com/fluree/db/pull/1376" class="mono">fluree/db#1376</a>
  <div>mdBook publishes a <code>README.md</code> as <code>index.html</code>. The docs landing page linked to pages the build never produced.</div>
</div>

<div v-click class="prrow">
  <a href="https://github.com/cocoindex-io/cocoindex/pull/1959" class="mono">cocoindex#1959</a>
  <div>A release branch was deleted once its work landed on <code>main</code>. Six docs pages were still linking into it.</div>
</div>

<div v-click class="prrow">
  <a href="https://github.com/cocoindex-io/cocoindex/pull/1425" class="mono">cocoindex#1425</a>
  <div>Before either of those, a link checker in that project's docs CI. It did its job. It just does it after the push.</div>
</div>

</div>

<v-click>
<p class="mt-7 max-w-3xl">
None of these were typos. Something structural moved, the links stayed where they were, and we all found out later than we should have. I wanted to do this talk because that's a refactoring problem, and nobody treats it like one.
</p>
</v-click>

<!--
Three PRs in the past year that were nothing but link repair.

The Fluree one. mdBook publishes a README as index.html, so a link that is perfectly correct in the source tree resolves to a page that was never built. I found the first one by clicking it.

The CocoIndex one. We had docs pages linking to source files on the v1 branch, that branch got deleted once its work landed on main, and six pages were pointing into nothing. Nobody touched the docs at all.

And the third is the one I did first: putting a link checker in CI, which is the sensible thing to do and I'd still recommend it. It just tells you once you've pushed.

None of these were typos. Something moved underneath, the links stayed put, and we found out late.
-->

---
layout: two-cols
layoutClass: gap-10
---

# About me

<ul class="tight mt-8 leading-relaxed">
  <li>Technical writer at <a href="https://deepnote.com">Deepnote</a>. I did docs and education work at <a href="https://marimo.io">marimo</a> before that.</li>
  <li>Most of my open-source work is documentation, mainly on marimo and <a href="https://github.com/cocoindex-io/cocoindex">CocoIndex</a>, plus whatever broken page I end up on.</li>
  <li>Co-organizer of <a href="https://scipy-india.github.io/">SciPy India</a>, and I ran community booths at PyCon India and IndiaFOSS last year.</li>
  <li>One of the people trying to get a <a href="https://www.writethedocs.org/">Write the Docs</a> India chapter going. This devroom is part of that.</li>
</ul>

::right::

<div class="h-full flex items-center justify-end">
  <img src="/srihari.png" alt="Srihari Thyagarajan" class="w-72 h-96 object-cover" />
</div>

<!--
Very quickly, so you know who's talking.

I write docs at Deepnote and I was at marimo before that. Both notebook tools, so I spend my time around Python and around people trying to learn something from a page.

The last line is the one I care about. A few of us are trying to get a Write the Docs chapter going in India, and this devroom is part of that. If docs is most of your job and you feel like the only person in your building doing it, come find us afterwards.
-->

---
layout: default
---

# The definition I'm borrowing

<blockquote class="bigquote mt-7 max-w-4xl">
"Refactoring is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior."
</blockquote>

<p class="cite mt-3">~ Martin Fowler, <a href="https://refactoring.com/">refactoring.com</a></p>

<v-click>
<p class="mt-7 max-w-3xl">
Documentation has an external behaviour too, and it's a small, precise one: a reader clicks a link and lands where it points. Rename a heading, move a page, split a topic, and that behaviour is supposed to survive.
</p>
</v-click>

<v-click>
<p class="mt-7 max-w-3xl">
"URIs don't change: people change them."
</p>
<p class="cite mt-2">~ Tim Berners-Lee, <em>Cool URIs don't change</em>, 1998</p>
</v-click>

<v-click>
<p class="mt-5 max-w-3xl muted">
Rename a heading and you've changed one, whether or not you meant to.
</p>
</v-click>

<!--
Read the Fowler line out, then stop on the last four words: without changing its external behaviour. That clause is the whole reason this slide is here, so let it sit for a second before moving on.

Then make it ours. Documentation has an external behaviour too, it's just much smaller than a program's. Someone clicks a link and ends up where it said they would. That's the contract, and renaming a heading, moving a page or splitting one page into two is all meant to leave it alone.

The Berners-Lee line is the one to land slowly, because it's short enough that people will actually remember it. URIs don't change, people change them. Pause, then turn it on the room: when you rename a heading, you're the person changing it. You don't get to opt out, because the anchor is generated from the heading text. The edit and the breakage are the same keystroke.
-->

---
layout: two-cols-header
layoutClass: gap-10
---

# Docs-as-code stopped at the editor

::left::

<p class="small mt-1">
The <a href="https://www.writethedocs.org/guide/docs-as-code/">Write the Docs guide</a> defines it as "writing documentation with the same tools as code", and lists them:
</p>

<ul class="tight small mt-3">
  <li>Issue trackers</li>
  <li>Version control</li>
  <li>Plain-text markup</li>
  <li>Code reviews</li>
  <li>Automated tests</li>
</ul>

<p class="small mt-5">
Everything <em>around</em> the file got the upgrade. The file, and the thing you edit it in, did not.
</p>

<v-click>
<p class="small mt-5">
An IDE knows a function has six call sites. A Markdown editor has no idea a heading has <span v-mark.underline="{ at: 1, color: '#d9480f' }">six incoming links</span>.
</p>
</v-click>

::right::

<p class="small muted mt-1">What the editor sees</p>

<pre class="mt-3 small" style="padding: 0.9rem 1rem; white-space: pre-wrap;">See the <span class="target">[setup guide](guide/setup.md#getting-started)</span>
for the full steps.</pre>

<p class="small mt-3">A string, and nothing more.</p>

<ul class="tight small mt-2 muted">
  <li><code>guide/setup.md</code> is never resolved to a file on disk</li>
  <li><code>#getting-started</code> is never matched to a heading inside it</li>
  <li>The first thing that resolves either one is the site build</li>
</ul>

<!--
Docs-as-code won, and I'm glad it did. Our docs live in Git, they go through review, they build in CI, they ship versioned.

But read that list again. Issue trackers, version control, plain text markup, code reviews, automated tests. Every one of those is about what happens around the file.

On the right is what your editor sees when you write a link. It's a string. It doesn't know that guide/setup.md is a file on disk, and it has no idea that #getting-started is supposed to match a heading inside it. The first piece of software in the entire pipeline that resolves either half of that link is the site build, and that runs after you've committed.
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Rename a heading. The link doesn't follow.

::left::

````md magic-move
```md
<!-- guide/setup.md -->
## Getting started

Install the CLI, then run `init`.

<!-- index.md -->
See the [setup guide](guide/setup.md#getting-started).
```

```md {2}
<!-- guide/setup.md -->
## Quickstart

Install the CLI, then run `init`.

<!-- index.md -->
See the [setup guide](guide/setup.md#getting-started).
```

```md {2,7}
<!-- guide/setup.md -->
## Quickstart              <- anchor is now #quickstart

Install the CLI, then run `init`.

<!-- index.md -->
See the [setup guide](guide/setup.md#getting-started).
```
````

<p class="small muted mt-3">
Three pages point at the old anchor. Nothing in the diff says so, because the diff is one line long and it's in a different file.
</p>

::right::

<div class="h-full flex items-center pt-2">
  <LinkGraph :step="$clicks" />
</div>

<!--
Here's the mechanism.

I rename a heading. Getting started becomes Quickstart, because Quickstart is a better name. One line, one file, and it's an improvement.

The anchor is generated from the heading text, so renaming the heading renamed the anchor. And those three pages on the right are still pointing at the old one. My diff is one line in setup.md. Nothing in it mentions index, faq or tutorial, so there's nothing for a reviewer to catch either.

If the page had moved as well, those are 404s. If it only got renamed, it's quieter and honestly worse: the reader lands at the top of a long page and has to go hunting for the thing you promised them.
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Two of the 404s, and what moved underneath them

::left::

<p class="small"><strong>Fluree DB</strong>, built with mdBook. <a href="https://github.com/fluree/db/pull/1376" class="cite">fluree/db#1376</a></p>

<p class="small mt-2">
mdBook rewrites <code>.md</code> links to <code>.html</code>, but publishes a <code>README.md</code> as <code>index.html</code>. Correct in the repo, dead on the site. The fix is to link to the directory.
</p>

<p class="small muted mt-2">
Found by clicking it. Building the book locally and running a checker turned up the rest.
</p>

<ShotSlot class="mt-3" src="/fluree-1376-diff.png" raw pos="-336px -58px"
  label="The Fluree DB docs landing page diff" height="11rem"
  caption="README.md links replaced with directory links, across the docs landing page" />

::right::

<p class="small"><strong>CocoIndex</strong>, links into GitHub. <a href="https://github.com/cocoindex-io/cocoindex/pull/1959" class="cite">cocoindex#1959</a></p>

<p class="small mt-2">
Six pages linked to source files on the <code>v1</code> branch. The branch was deleted once that work became <code>main</code>. Nobody edited the docs; the thing they pointed at stopped existing.
</p>

<p class="small muted mt-2">
Caught by the nightly lychee run I'd added to that repo a few months earlier.
</p>

<ShotSlot class="mt-3" src="/cocoindex-1959-diff.png" raw pos="-280px -290px"
  label="The CocoIndex v1 link repair diff" height="11rem"
  caption="blob/v1 and tree/v1 rewritten to main, six files" />

<!--
Both of these shipped.

Fluree on the left. mdBook rewrites your markdown links from .md to .html, except a README, which becomes index.html. So a link to getting-started/README.md is correct in the repo and dead on the published site. I found the first one by clicking it on the landing page, then built the book locally and ran a link checker, and that turned up more. The fix in that diff is linking to the directory instead.

CocoIndex on the right, and I like this one because nobody made a mistake in the docs at all. Six pages linked to source files on the v1 branch. That branch was deleted after its work landed on main. The markdown never changed. The thing underneath it did.

The reason I spotted it is the nightly cron in the lychee workflow I'd added to that repo months earlier, which is the third PR from the opening slide. If anyone asks: that run reported the broken links but still exited green, because the workflow only treats one specific exit code as a failure, so it never opened the issue it was supposed to. The net was there. It just had a hole in it.
-->

---

# The same rename, in two editors

<table class="mt-8 w-full">
<thead>
<tr><th class="w-1/2 pb-2">Renaming a function in an IDE</th><th class="pb-2">Renaming a heading in a vanilla Markdown editor</th></tr>
</thead>
<tbody>
<tr><td class="py-3 pr-6">Find references, before you touch anything</td><td class="py-3"><code>grep</code>, and hope everyone spelt it the same way</td></tr>
<tr><td class="py-3 pr-6">Rename updates every call site in one edit</td><td class="py-3">Find and replace, then read the diff twice</td></tr>
<tr><td class="py-3 pr-6">A squiggle while you type</td><td class="py-3">CI, or a reader</td></tr>
</tbody>
</table>

<v-click>
<ul class="tight mt-10 max-w-3xl">
  <li>None of this is new. The Language Server Protocol gave every editor "rename" and "find references" back in 2016.</li>
  <li>Padmashree's talk makes the case for bringing that to DocC.</li>
  <li>What Markdown never got was anyone deciding a heading is a symbol worth tracking.</li>
</ul>
</v-click>

<!--
Nothing in the left column is exotic. It's been in every serious IDE for twenty years, and none of us would put up with a language where renaming a function meant grepping for the old name and hoping for the best.

Same edit on the right, same class of risk, and we just live with it.

And the left column isn't even IDE-specific any more. Since 2016 the Language Server Protocol has made rename and find-references something any editor can ask a server about, which is why you get them in VS Code and in Neovim and everywhere else. Padmashree's talk makes that case for DocC. So the protocol has been there for a decade. What Markdown never got was anyone deciding a heading is a symbol worth tracking.
-->

---
layout: two-cols-header
layoutClass: gap-10
---

# An editor that knows what a heading is

<p class="small ink">
<a href="https://zensical.org/studio/">Zensical Studio</a> is a VS Code extension from the people who make Material for MkDocs. It reads Python Markdown and your project config the way MkDocs does, so it knows which anchor a heading is going to produce. I'm using it because it's the one that exists today, not because you need this particular one.
</p>

::left::

<ul class="tight small mt-2">
  <li v-click="1">A link to a file or anchor that doesn't exist gets underlined as you type, and listed in the Problems panel, "instead of waiting for a QA process to flag it".</li>
  <li v-click="2">Find every use of a heading, so you know what depends on it <em>before</em> you rename it.</li>
  <li v-click="3">Rename a heading, or move a file, and the incoming links are updated with it.</li>
</ul>

::right::

<ShotSlot class="mt-2" src="/zensical_inspect_references.png"
  label="Find All References on a heading"
  caption="A heading, and the pages that depend on it" />

<!--
So what does it look like when the editor does understand your project?

This is Zensical Studio, from the Material for MkDocs people. The reason it can do any of this is the boring part: it parses Python Markdown and reads your mkdocs.yml, so it knows which anchor a given heading is going to generate. That's exactly the bit my editor was missing.

Three things. It underlines a bad link while you're typing it, and their docs have a good phrase for why that matters: instead of waiting for a QA process to flag it. It'll show you every use of a heading, which is the find-references I was asking for a minute ago. And rename carries the links with it.

Keep this in your back pocket in case someone asks, since we're at a FOSS conference. The editor integrations are on GitHub under MIT, but Studio itself is under its own EULA rather than an open licence. The free edition stays free, and project-wide refactoring becomes a Pro feature from the fifth of November.
-->

---

# The same repair, inside the editor

<p class="small mt-1 max-w-3xl">
Three files moved. Every link that pointed at them, listed in the Problems panel and repaired in one action.
</p>

<div class="flex flex-col items-center mt-5">
  <img src="/studio_bulk_repair_links.webp" alt="Zensical Studio listing every broken link after three files were moved, then repairing them" class="max-h-[330px] max-w-full border border-[#d5d3cc]" />
  <p class="cite mt-2">Recording from zensical.org/studio</p>
</div>

<!--
This is the CocoIndex situation, caught in the editor instead of by a nightly job.

Three files get moved. Everything that pointed at them is now wrong, and instead of finding that out tomorrow morning in an issue, it's sitting in the Problems panel with a fix attached.

That afternoon I spent on the v1 branch PR is this.
-->

---
class: code-sm
---

# What an editor can see, and what it can't

<div class="grid grid-cols-2 gap-10 mt-7">

<div>
<p class="small muted">Inside your project</p>
<ul class="tight small mt-2">
  <li>Headings, anchors and files it can resolve</li>
  <li>Links that broke because you just moved something</li>
  <li>All of it while you type, before the commit</li>
</ul>
</div>

<div>
<p class="small muted">Outside it, still CI's job</p>
<ul class="tight small mt-2">
  <li>Every external URL you link to</li>
  <li>A branch someone deleted on GitHub, which is #1959 exactly</li>
  <li>Other people's links <em>into</em> your docs. Only stable URLs and redirects protect those.</li>
</ul>
</div>

</div>

<div class="mt-8 rule pt-5 grid grid-cols-[1.1fr_0.9fr] gap-10 items-center">

```yaml
- uses: lycheeverse/lychee-action@v2
  with:
    args: --root-dir './docs' 'docs/**/*.md'
# on: pull_request, plus a nightly cron
# exit code 2 opens an issue
```

<p class="small">
The shape of the one in <a href="https://github.com/cocoindex-io/cocoindex/pull/1425">cocoindex#1425</a> (I recommend <a href="https://lychee.cli.rs/">lychee</a> to anyone who'll listen). It doesn't prevent the break. It shortens the window where something's broken and nobody knows.
</p>

</div>

<!--
Where the line sits.

An editor can only reason about the project that's open in front of it. Headings, anchors, files, anything it can resolve on disk. That's a big chunk of the problem and it's the chunk that's invisible to us right now.

The right column stays CI's job. Your editor can't know that a URL on someone else's site died last week. It can't know that a branch on GitHub got deleted, which is exactly what happened to us. And the links coming into your docs from other people's blog posts and READMEs, you can't fix those from your side at all. Keeping your URLs stable is the only thing protecting them, and redirects when you can't.

The snippet is the shape of what I put into CocoIndex. lychee, on docs pull requests and once a night, opening an issue if the nightly run finds something. About forty lines, and I recommend it to anyone maintaining docs.
-->

---

# If you maintain docs for a project

<ol class="takeaways mt-8 max-w-3xl">

<v-clicks>

<li><strong>Structural edits are refactors.</strong>
<div class="sub">Rename a heading, move a page, split a topic. What breaks is a link, and a reader finds it before you do.</div></li>

<li><strong>Put a link checker in your docs CI.</strong>
<div class="sub">lychee's GitHub action, if you want a specific one. It catches nothing before you push, but nothing else catches it at all.</div></li>

<li><strong>Ask more of your editor.</strong>
<div class="sub">Diagnostics as you type, find-references on a heading, a rename that carries the links with it. If your toolchain can't, go and ask for it.</div></li>

</v-clicks>

</ol>

<!--
Three things.

The first is a way of thinking. If you're renaming a heading or reorganising a section, you're refactoring, and the thing that can break is a link. Give it the care you'd give a rename in code.

The second is the one you can do this afternoon. A link checker in CI is one file.

The third is the one I actually want. Ask your tooling to understand your project. Diagnostics as you type, find references on a heading, rename that takes the links with it. Some of this exists today, most of it doesn't, and the more of us who ask for it, the faster that changes.
-->

---
layout: center
---

# Find me {.text-center}

<div class="mt-8 flex gap-14 justify-center items-center">
  <div class="text-left small leading-loose">
    <div><a href="https://github.com/Haleshot">GitHub: @Haleshot</a></div>
    <div><a href="https://www.linkedin.com/in/srihari-thyagarajan/">LinkedIn: srihari-thyagarajan</a></div>
    <div><a href="https://twitter.com/hari_leo03">Twitter: @hari_leo03</a></div>
    <div><a href="https://mastodon.social/@haleshot">Mastodon: @haleshot@mastodon.social</a></div>
    <div><a href="https://bsky.app/profile/haleshot.bsky.social">BlueSky: @haleshot.bsky.social</a></div>
  </div>
  <div class="flex flex-col items-center">
    <img src="/qr-code.png" alt="QR code to Srihari's website" class="w-36 h-36 border border-[#d5d3cc] bg-white p-2" />
    <div class="mt-2 cite">haleshot.github.io</div>
  </div>
</div>

<p class="mt-10 small">
Three of us run this devroom, and we're working on getting a Write the Docs India chapter off the ground. Come and talk to any of us if you'd like to be part of it.
</p>

<!--
That's me, and the three PRs are linked on the slides if you want to see what the fixes actually looked like.

The last line is the real ask. Three of us run this devroom, and we're working on getting a Write the Docs chapter off the ground here. If that's something you want to be part of, any of us are around for the rest of the day.
-->
