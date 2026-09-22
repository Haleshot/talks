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

<div class="cover-by">
  <div class="cover-by-name">Srihari Thyagarajan</div>
</div>

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
  <li>Technical writer at <a href="https://deepnote.com">Deepnote</a>. Docs, education and developer advocacy at <a href="https://marimo.io">marimo</a> before that.</li>
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
layout: two-cols
layoutClass: gap-10
---

# It has a name, and a literature

<p class="ink small mt-6">
"Link rot is the phenomenon of hyperlinks tending over time to cease to point to their originally targeted file, web page, or server."
</p>

<p class="cite mt-2">~ Wikipedia, which would know</p>

<p class="small mt-6">
Pew went back in 2023 and checked a sample of pages that existed in 2013. More than a third of them were gone.
</p>

<p class="small mt-4">
It is not only other people's websites, either. Over half of all Wikipedia articles now carry at least one reference pointing at something that no longer exists.
</p>

<p class="cite mt-4">Pew Research Center, May 2024</p>

::right::

<div class="h-full flex flex-col justify-center">

<LinkRot />

<p class="small mt-5 max-w-xs">
A hundred pages that were live in 2013. The orange ones were gone by 2023.
</p>

</div>

<!--
This is the part where I zoom out for fifteen seconds, because otherwise you could reasonably think this is a problem with my three pull requests rather than a problem with the web.

Link rot is the actual term, it has been studied since the nineties, and the numbers are worse than anyone expects. Pew took a sample of pages that existed in 2013, went back ten years later, and thirty-eight per cent of them were gone. That's the grid.

The line I find hardest to ignore is the Wikipedia one. More than half of all Wikipedia articles have at least one dead link in their references. That is the single most maintained body of writing on the internet, and the citations still rot.

So when I say a renamed heading breaks links, I am describing the small, local, entirely preventable end of something much larger.
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

(Optional, if the room is warm: xkcd 1172, "every change breaks someone's workflow". Somebody out there bookmarked that anchor. Cut this if you're running long.)
-->

---
layout: two-cols-header
layoutClass: gap-8
class: code-sm
---

# Two of the 404s, and what moved underneath them

::left::

<p class="small"><strong>Fluree DB</strong>, built with mdBook.</p>

<p class="small mt-2">
mdBook rewrites <code>.md</code> links to <code>.html</code>, but publishes a <code>README.md</code> as <code>index.html</code>. Correct in the repo, dead on the site. The fix is to link to the directory.
</p>

<p class="small muted mt-2">
Found by clicking it. Building the book locally and running a checker turned up the rest.
</p>

```diff
- [CLI reference](cli/README.md)
+ [CLI reference](cli/)
```

<p class="cite mt-1"><a href="https://github.com/fluree/db/pull/1376">One of eleven lines on that landing page</a></p>

::right::

<p class="small"><strong>CocoIndex</strong>, links into GitHub.</p>

<p class="small mt-2">
Six pages linked to source files on the <code>v1</code> branch. The branch was deleted once that work became <code>main</code>. Nobody edited the docs; the thing they pointed at stopped existing.
</p>

<p class="small muted mt-2">
Caught by the nightly lychee run I'd added to that repo a few months earlier.
</p>

```diff
- .../cocoindex/blob/v1/python/.../_target.py
+ .../cocoindex/blob/main/python/.../_target.py
```

<p class="cite mt-1"><a href="https://github.com/cocoindex-io/cocoindex/pull/1959">The same edit, six files deep</a></p>

<!--
Both of these shipped.

Fluree on the left. mdBook rewrites your markdown links from .md to .html, except a README, which becomes index.html. So a link to getting-started/README.md is correct in the repo and dead on the published site. I found the first one by clicking it on the landing page, then built the book locally and ran a link checker, and that turned up more. The fix in that diff is linking to the directory instead.

CocoIndex on the right, and I like this one because nobody made a mistake in the docs at all. Six pages linked to source files on the v1 branch. That branch was deleted after its work landed on main. The markdown never changed. The thing underneath it did.

The reason I spotted it is the nightly cron in the lychee workflow I'd added to that repo months earlier, which is the third PR from the opening slide. If anyone asks: that run reported the broken links but still exited green, because the workflow only treats one specific exit code as a failure, so it never opened the issue it was supposed to. The net was there. It just had a hole in it.
-->

---

# The same rename, in two editors

<p class="small mt-1 max-w-3xl">
The left column is not aspirational. It is what every code editor has done for twenty years, for every language anyone takes seriously.
</p>

<table class="mt-6 w-full">
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
  <li>Markdown got one in 2022, and it has stayed remarkably obscure ever since.</li>
</ul>
</v-click>

<!--
Nothing in the left column is exotic. It's been in every serious IDE for twenty years, and none of us would put up with a language where renaming a function meant grepping for the old name and hoping for the best.

Same edit on the right, same class of risk, and we just live with it.

And the left column isn't even IDE-specific any more. Since 2016 the Language Server Protocol has made rename and find-references something any editor can ask a server about, which is why you get them in VS Code and in Neovim and everywhere else. Padmashree's talk makes that case for DocC. So the protocol has been there for a decade, and Markdown did get a server of its own in 2022. It just never made any noise.

Worth being honest about how I know: I had this talk built around a proprietary tool, and somebody sent me the FOSS one after reading the abstract. Which is roughly how the whole ecosystem works.
-->

---
layout: two-cols-header
layoutClass: gap-10
---

# Marksman

<p class="small ink">
An LSP server for Markdown. MIT licensed, one self-contained binary, and it plugs into whatever you already edit in: VS Code, Neovim, Helix, Emacs, Vim, Sublime, Kakoune.
</p>

::left::

<ul class="tight small mt-2">
  <li v-click="1">Find references on a heading, with a code lens showing how many there are, so you know what depends on it before you touch it.</li>
  <li v-click="2">Rename that heading and the incoming links follow, anchors included.</li>
  <li v-click="3">Diagnostics for links pointing at a file that isn't there.</li>
  <li v-click="4">Completion, hover and go-to-definition, for inline, reference and wiki links alike.</li>
</ul>

::right::

<div v-click="2" class="h-[250px] flex items-center">
  <LinkGraph fixed />
</div>

<p v-click="2" class="small muted mt-1">
The same three files from earlier. Marksman changed them as part of the rename, in one edit.
</p>

<!--
So what does it look like when an editor does understand the project?

This is Marksman. It's an LSP server for Markdown, it's MIT, it's one binary you drop on your path, and because it's a language server it works in basically anything. That last part matters in this room more than it would anywhere else.

Three things. It finds every reference to a heading and puts the count above it, so you can see what depends on something before you break it. It renames, and the links come along. And it warns you about links to files that don't exist.

The diagram on the right is the one from earlier, after the rename. Same three files, except now they point at the heading that actually exists. I ran this against a real workspace rather than drawing it hopefully: the server rewrites the heading and all three anchors in a single edit.

One gotcha the docs are clear about but everybody hits anyway: Marksman needs a project root, which means a .git directory or a .marksman.toml file. Without one it drops to single-file mode and none of the cross-file work happens.
-->

---

# The same rename, in an actual editor

<p class="small mt-1 max-w-3xl">
The links in the other two files update as part of the same rename, without anyone opening them.
</p>

<div class="flex flex-col items-center mt-4">
  <img src="/marksman-rename.gif" alt="Marksman renaming a heading in Neovim, with the links to it updating across files" class="max-h-[335px] max-w-full border border-[#d5d3cc]" />
  <p class="cite mt-2">From the Marksman repo</p>
</div>

<!--
Same thing in a real editor rather than a protocol dump. It's Neovim because it's their recording, but this is a language server, so it looks much the same wherever you run it.

Two renames here. The first is the document title, top left, and when it lands the wiki links in the other two panes follow. The second is further in: a reference link label on line 91, and its definition down at line 99 changes with it.

Both times the point is the same. You edit one thing, and the things that depended on it keep up. Nobody goes looking.
-->

---
class: code-sm
---

# What it catches, and what it doesn't

<div class="grid grid-cols-2 gap-10 mt-7">

<div>
<p class="small muted">Marksman catches</p>
<ul class="tight small mt-2">
  <li>A link to a file that isn't there</li>
  <li>Everything that depends on a heading, before you rename it</li>
  <li>The rename itself, anchors and all</li>
</ul>
</div>

<div>
<p class="small muted">It still doesn't</p>
<ul class="tight small mt-2">
  <li>Flag an inline link to a heading that's gone. Wiki links get the warning; inline ones are still waiting on someone to write it</li>
  <li>Follow a file when you move it, which is both of the 404s from earlier. <a href="https://zensical.org/studio/">Zensical Studio</a> does this today (though the refactoring half is paid, and not open source)</li>
  <li>Say anything about images or alt text (markdownlint will, pointed at the same folder)</li>
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
Which is why <a href="https://github.com/cocoindex-io/cocoindex/pull/1425">cocoindex#1425</a> stays. <a href="https://lychee.cli.rs/">lychee</a> walks the tree and checks every target it finds, including the ones no editor can see.
</p>

</div>

<!--
Here's the honest boundary, and I went and tested this rather than reading a feature table.

The left column works today. The right column is where it runs out, and the first one is almost funny: an inline link to a heading that no longer exists is the exact failure this whole talk is about, and it's the one thing Marksman stays quiet about. Wiki links get flagged, inline ones don't. There's an open issue if anyone in here fancies a weekend.

The second one matters more for the PRs I showed you. Move or rename a file and links to it stay where they were, which is both of my 404s. This is the part the commercial editors have and the free ones don't, so if it's the thing standing between you and sane docs, that's where the money goes.

lychee stays in CI regardless. Nothing in your editor is ever going to know that somebody deleted a branch on GitHub.

And lychee stays in CI regardless, because nothing in your editor will ever know that a branch on GitHub got deleted.
-->

---
class: code-sm
---

# One that has nothing to do with links

<p class="small mt-1 max-w-3xl">
You rename a concept. Not a heading, not a file: the word itself, the one your product uses for the thing.
</p>

<div class="grid grid-cols-[0.95fr_1.05fr] gap-10 mt-6 items-start">

<div>

```diff
- the workspace settings
+ the project settings
```

<p class="small mt-3">
Find and replace gets you most of the way, and then leaves you the plural, the possessive, the one inside a code sample, and the one in an image's alt text.
</p>

</div>

<div>

<p class="small">
This is a rename refactor with none of the tooling. No editor offers you rename-symbol for prose, because prose has no symbols.
</p>

<p class="small mt-4">
<a href="https://github.com/vale-cli/vale">Vale</a> is the closest thing, and it works the other way round. It can't do the rename for you, but once you've settled on a word it won't let you drift back to the old one. MIT, with a language server of its own.
</p>

</div>

</div>

<!--
I promised you this wasn't only about links, so here's the one I hit most often, and it's fifteen seconds.

You rename a concept. Workspace becomes project. It's the same refactor: something got renamed and everything referring to it should follow. Except now there's nothing to follow, because prose has no symbols. Find and replace gets you the easy ones and leaves you the plurals, the possessives, the one buried in a code sample, the one in alt text that nobody will ever read but a screen reader.

Vale is the nearest thing to help, and notice it solves the opposite half of the problem: it can't do the rename for you, but once you've settled on a word it won't let you slide back to the old one. That's still worth a lot.

There is no Marksman for this. Somebody should write one.
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
<div class="sub">Diagnostics while you type, find-references on a heading, a rename that carries the links with it. If your editor and your site generator can't manage it between them, that's worth raising with whoever maintains either.</div></li>

</v-clicks>

</ol>

<p v-click class="mt-9 max-w-3xl">
And a question back, because some of you are running things I've never heard of: what do you use for this? I'd love to hear about it afterwards!!
</p>

<!--
Three things.

The first is a way of thinking. If you're renaming a heading or reorganising a section, you're refactoring, and the thing that can break is a link. Give it the care you'd give a rename in code.

The second is the one you can do this afternoon. A link checker in CI is one file.

Three is the one you can act on this afternoon. If you want the specific recommendation, it's Marksman, it's MIT, and the only trap is that it needs a .git or a .marksman.toml at the project root or it silently does nothing. But the point is the capability, not that particular binary.

Then hand the room the question. Some of them are running something none of us have heard of, and that's the bit I'd actually like out of the Q&A.
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
Write the Docs India is starting to move again, and this devroom is part of that. If you'd like a hand in it (a talk, a venue, or just showing up), come and say hello to me or either of the other two devroom managers.
</p>

<!--
That's me, and the three PRs are linked on the slides if you want to see what the fixes actually looked like.

The last line is the real ask. The chapter is only just getting going again, so there is a lot of room and not much competition. Say hello to me or to either of the other two of us running the devroom, any time today.
-->
