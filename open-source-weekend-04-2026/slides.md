---
theme: seriph
layout: cover
title: Lessons from Building a Devtool Community
info: |
  Conference talk for OpenSourceWeekend Gujarat 2026 on how dogfooding,
  educational artifacts, and contributor recognition shape durable OSS
  communities around developer tools.
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  sans: Space Grotesk
  serif: Space Grotesk
  mono: IBM Plex Mono
themeConfig:
  primary: '#5fa26a'
colorSchema: light
hideInToc: true
class: text-center
---

<EventFrame blob="hero" logo="bottom-right" grid="bottom-left" />

# Lessons from Building a Devtool Community

<div class="mt-8 text-lg opacity-70">
  OpenSourceWeekend Gujarat 2026 · Gandhinagar
</div>

<div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm opacity-72">
  Srihari Thyagarajan
</div>

---
layout: center
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />

<div class="osw-content max-w-4xl mx-auto text-center">
  <div class="text-4xl leading-tight font-semibold max-w-3xl mx-auto">
    I did not set out to build a community.
  </div>

  <div class="mt-6 text-xl leading-relaxed opacity-80 max-w-3xl mx-auto">
    I was trying to use the tool well, fix the rough edges I kept running into,
    and leave behind something <strong>useful</strong> for the next person.
  </div>

  <v-click>
    <div class="mt-8 text-base opacity-68 max-w-3xl mx-auto">
      That is why this talk starts so close to product use. The community part did not begin
      with strategy. It began with paying attention, helping where I could, and watching that
      slowly turn into something bigger.
    </div>
  </v-click>
</div>

---
layout: two-cols
layoutClass: gap-12
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />

# About me

<ul class="mt-6 osw-list text-left text-sm leading-relaxed opacity-84">
  <li>Technical Writer at Deepnote; previously educational dev-rel and advocacy at marimo</li>
  <li>I spend most of my time around notebooks, documentation, tutorials, integrations, and developer tooling</li>
  <li>This talk comes out of work close to the product: contributions, learning material, spotlights, workshops, and follow-up conversations</li>
  <li>The recurring thread has been simple: use the thing properly, help the next person, and make useful work easier to find</li>
</ul>

::right::

<div class="pt-11">
  <div class="osw-card-light">
    <div class="text-lg font-semibold">What that looked like in practice</div>
    <ul class="mt-4 osw-list text-sm leading-relaxed">
      <li>maintaining community spotlights and curated resource paths</li>
      <li>building notebook-first teaching material and workshop content</li>
      <li>helping people find the right resource, example, or next step in context</li>
      <li>navigating ambiguity and trial-and-error in fast-moving OSS settings</li>
    </ul>
  </div>
</div>

---
hideInToc: true
---

<EventFrame blob="top-right" logo="bottom-right" grid="bottom-left" />

# What you'll walk away with

<div class="mt-12 space-y-8 text-left max-w-3xl mx-auto">

<v-clicks>

<div class="osw-outcome-row">
  <div class="osw-check">01</div>
  <div>
    <span>How <strong>dogfooding</strong> a product changes the quality of community and contributor work</span>
    <div class="mt-2 osw-chip">Dogfooding = using your own tool as a real user, not just a builder</div>
  </div>
</div>

<div class="osw-outcome-row">
  <div class="osw-check">02</div>
  <span>Why small weekly habits often compound more than launches, campaigns, or vague “community initiatives”</span>
</div>

<div class="osw-outcome-row">
  <div class="osw-check">03</div>
  <span>How to keep users at the center while still building contributor paths that feel useful</span>
</div>

</v-clicks>

</div>

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />
<EventFrame blob="top-right" logo="none" grid="none" />

# Table of contents

<Toc class="mt-8 text-base leading-loose" minDepth="1" maxDepth="1" />

::right::

<div class="mt-8 text-sm opacity-72 leading-relaxed">
  From product contact to teaching, from teaching to contributor recognition, and ending on the tradeoffs that made some of this compound and some of it not.
</div>

<div class="mt-6 text-sm opacity-55 leading-relaxed">
  If you build tools, maintain docs, or keep ending up in community conversations around adoption, keep one real project in mind as we go.
</div>

---
layout: section
title: Dogfooding as a community instinct
---

<EventFrame blob="top-right" logo="bottom-right" grid="bottom-left" />

<div class="osw-content pt-8 text-center">
  <div class="osw-kicker mb-5">Lesson 1</div>
  <h1 class="osw-title text-center">Start with use, not audience growth.</h1>
  <div class="mt-5 text-lg max-w-3xl mx-auto opacity-72 text-center">
    Dogfooding sharpens your judgment about what a worthwhile contribution looks like.
  </div>
</div>

---
layout: center
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />

<div class="osw-content max-w-4xl mx-auto text-center">
  <div class="text-3xl leading-relaxed font-semibold max-w-3xl mx-auto">
    So why am I starting with my own contributions in a talk about community?
  </div>

  <div class="mt-6 text-lg leading-relaxed opacity-78 max-w-3xl mx-auto">
    Because this is where my judgment changed. Using the tool closely made it obvious
    what was actually helping users, what was just busywork, and what kind of
    contributions were worth investing in.
  </div>

  <v-click>
    <div class="mt-8 text-sm opacity-68 max-w-3xl mx-auto">
      The widget, the snippets, the Windows fixes, even the numbers on the next slide are not
      there as a resume. They are there to show the kind of product contact the community work
      grew out of.
    </div>
  </v-click>
</div>

---
layout: two-cols
layoutClass: gap-10
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />

# Dogfooding changed how I reviewed work

<v-clicks class="mt-5 osw-list text-sm leading-relaxed">

- New users kept stalling on blank notebooks, so examples had to be practical, not generic starter demos.
- 18 snippets added to the snippets system, each based on real library usage patterns.
- Windows-specific bugs quietly narrowed who could participate.
- A user's visualization workflow surfaced a gap, which became the `mo.image_compare()` widget.

</v-clicks>

<v-click>
  <div class="mt-4 text-sm opacity-70 leading-relaxed">
    <span v-mark.underline="{ at: 5, color: '#5fa26a' }">The shift: reviewing for usability, not just correctness.</span>
  </div>
</v-click>

::right::

<div class="pt-8">

```python
# One example of workflow-driven contribution
import marimo as mo

comparison = mo.image_compare(
    before="scan_original.png",
    after="scan_enhanced.png",
    label_before="Raw",
    label_after="Processed",
)
comparison
```

<div class="mt-4 osw-outline-card text-sm leading-relaxed">
  The point is not to over-index on one widget. It is that product contact gave me better instincts for snippets, docs, fixes, and the occasional feature.
</div>
</div>

---
layout: fact
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />
<EventFrame blob="top-right" logo="none" grid="none" />

<div class="osw-content pt-8">
  <div class="osw-kicker mb-4">What this looked like in practice</div>
  <div class="osw-grid-3 mt-6">
    <div class="osw-card-light min-h-[10rem]">
      <div class="osw-stat">37+</div>
      <div class="mt-2 font-semibold">merged PRs</div>
      <div class="mt-1 text-sm opacity-80">docs, snippets, DX improvements, widgets, Windows fixes</div>
    </div>
    <div class="osw-card min-h-[10rem]">
      <div class="osw-stat">18</div>
      <div class="mt-2 font-semibold">practical snippets</div>
      <div class="mt-1 text-sm opacity-78">examples shaped around real notebook workflows</div>
    </div>
    <div class="osw-card-light min-h-[10rem]">
      <div class="osw-stat">50+</div>
      <div class="mt-2 font-semibold">interactive notebooks</div>
      <div class="mt-1 text-sm opacity-80">teaching material that lowered the first-use barrier</div>
    </div>
  </div>

  <div class="mt-4 text-sm opacity-66 max-w-4xl">
    None of these happened from a single big push. They accumulated over months of small, consistent work.
  </div>
</div>

---
layout: section
title: Teaching, spotlights, and contributor paths
---

<EventFrame blob="left-arc" logo="bottom-right" grid="bottom-left" />

<div class="osw-content pt-8 text-center">
  <div class="osw-kicker mb-5">Lesson 2</div>
  <h1 class="osw-title text-center">Teach in public.</h1>
  <div class="mt-5 text-lg max-w-3xl mx-auto opacity-72 text-center">
    Tutorials, examples, and notebooks are not marketing garnish. They are infrastructure for adoption.
  </div>
</div>

---
layout: two-cols
layoutClass: gap-12
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />
<EventFrame blob="top-right" logo="none" grid="none" />

# Teaching scales what a conference conversation starts

<div class="mt-4 text-sm leading-relaxed opacity-82">
  After someone gets interested, what do they get to touch next?
</div>

<v-clicks class="mt-4 osw-list text-sm leading-relaxed">

- Interactive notebooks covering fundamentals and applied topics
- A dedicated `learn` repo modeling good notebook pedagogy
- Scoped out platforms where learners already were and got marimo integrated into [HuggingFace's LLM course](https://huggingface.co/learn/llm-course/en/chapter12/4?fw=pt) and [Deep-ML](https://www.deep-ml.com/)

</v-clicks>

<v-click>
  <div class="mt-3 text-sm opacity-70 leading-relaxed">
    <span v-mark.underline="{ at: 1, color: '#5fa26a' }">Community artifacts should feel like a path, not a pile.</span>
  </div>
</v-click>

::right::

<div class="pt-7">
  <div class="osw-card">
    <div class="text-sm font-semibold">Compounding effect</div>
    <div class="mt-3 text-xl font-bold">every tutorial answers the next repeated question in advance</div>
    <div class="mt-3 text-sm opacity-80">
      That saves maintainer time, gives new contributors a model to imitate, and makes workshops less dependent on live explanation.
    </div>
  </div>

  <div class="mt-4 osw-grid-2">
    <div class="osw-card-light min-h-[9rem]">
      <div class="font-semibold">50+</div>
      <div class="mt-2 text-sm">interactive notebooks built for learning and onboarding</div>
    </div>
    <div class="osw-outline-card min-h-[9rem]">
      <div class="font-semibold">Transferable lesson</div>
      <div class="mt-2 text-sm">teaching material is often your most reusable community asset</div>
    </div>
  </div>
</div>

---
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />

# A weekly habit that compounded

<div class="mt-8 space-y-4 max-w-2xl text-left">

<v-clicks>

- Every week, I would find a community project using marimo, write it up, attribute the creator, and share it through the spotlights work.
- This was not automated. It meant paying attention to what people were building, reaching out, writing the showcase, and linking their work properly.
- Contributors who were spotlighted often stayed closer to the project. Some brought the tool into their teams or became louder advocates for it.
- **Attribution turned out to be one of the main levers.** People who felt seen kept building.

</v-clicks>

</div>

<div class="mt-8 osw-chip">marimo-team/spotlights</div>
<div class="osw-chip ml-2">awesome-marimo</div>
<div class="osw-chip ml-2">recognition as community infrastructure</div>

---
layout: two-cols
layoutClass: gap-10
hideInToc: true
transition: slide-up
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />
<EventFrame blob="top-right" logo="none" grid="none" />

# Contributor paths should feel useful

<div class="mt-5 text-sm opacity-80 leading-relaxed">
  One of the better community instincts I picked up was: do not build contributor pathways out of tidy little chores that only teach process.
</div>

<div class="mt-6 osw-card-light">
  <div class="font-semibold">Weak path</div>
  <ul class="mt-4 osw-list text-sm leading-relaxed">
    <li>a generic “good first issue” that teaches the process but not the product</li>
    <li>contribution slots detached from real user needs</li>
    <li>work that gets merged but does not make the contributor feel useful</li>
  </ul>
</div>

::right::

<div class="mt-10 osw-card">
  <div class="font-semibold">Useful path</div>
  <ul class="mt-4 osw-list text-sm leading-relaxed opacity-82">
    <li>docs improvements where users actually got stuck</li>
    <li>examples or notebooks on topics people kept asking about</li>
    <li>resource lists and showcases that grew with the community</li>
    <li>public contributor pathways: open calls, scoped issues, regular check-ins, and context-rich entry points</li>
  </ul>
</div>

<div class="mt-8 osw-cite">
  Marco Gorelli, “Stop browsing good first issues” (Quansight Labs, 2026)
</div>

---
layout: quote
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />
<EventFrame blob="top-right" logo="none" grid="none" />

# "Be kind: all else is details."

Greg Wilson, co-founder of Software Carpentry and author of *Teaching Tech Together*

<v-click>
<div class="mt-5 text-sm max-w-2xl opacity-72 leading-relaxed">
  Community work gets explained as process. Its durability comes from whether people feel respected, helped, and properly attributed.
</div>
</v-click>

<v-click>
<div class="mt-6 osw-card-light text-sm leading-relaxed max-w-2xl">
  <strong>🙌 Show of hands:</strong> how many of you run a community, a meetup, or maintain something open source?
  <div class="mt-2 opacity-72">
    You're doing it voluntarily. Nobody is paying most of you for this. The people contributing to your project are choosing to spend their time. That's the context this quote lives in.
  </div>
</div>
</v-click>

---
layout: section
title: The ripple effects I didn't plan for
---

<EventFrame blob="top-right" logo="bottom-right" grid="bottom-left" />

<div class="osw-content pt-8 text-center">
  <div class="osw-kicker mb-5">What surprised me</div>
  <h1 class="osw-title text-center">Some of them became vocal advocates.</h1>
  <div class="mt-5 text-lg max-w-3xl mx-auto opacity-72 text-center">
    I expected better onboarding and better contributions. I did not expect the ripple effect to travel this far on its own.
  </div>
</div>

---
hideInToc: true
---

<EventFrame blob="left-arc" logo="bottom-right" grid="bottom-left" />

# Some of them became vocal advocates

<div class="mt-8 space-y-4 max-w-2xl text-left">

<v-clicks>

- People I had spotlighted or helped onboard started advocating independently: writing their own tutorials, presenting at meetups, bringing the tool into their teams.
- In OSS, your product speaks for itself. You can do genuine outreach, but nothing compares to people advocating without being asked.
- Parul Pandey, the first woman Kaggle Grandmaster in India, [wrote about switching to marimo](https://pandeyparul.medium.com/why-im-making-the-switch-to-marimo-notebooks-6e2218b5c98d) and now shares her data science work through it. Nobody asked her to.
- **Trust creates advocates.** Advocates create reach you cannot manufacture.

</v-clicks>

</div>

<div v-click="5" class="mt-8 osw-outline-card text-sm leading-relaxed max-w-2xl">
  I had outreach spreadsheets too. The people who moved the needle were the ones I had been paying attention to week after week.
</div>

---
layout: two-cols
layoutClass: gap-12
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />
<EventFrame blob="top-right" logo="none" grid="none" />

# Not just one tool

<div class="mt-6 text-sm leading-relaxed opacity-82">
  These instincts transferred across projects and communities I touched:
</div>

<v-clicks class="mt-4 osw-list text-sm leading-relaxed">

- Presented CocoIndex at the Rust Delhi Meetup, making an unfamiliar tool legible to a new audience
- Held marimo community booths at PyCon India and IndiaFOSS 2025: live demos, onboarding new users, collecting friction feedback firsthand
- Active across socials and community channels, pointing people to relevant resources in context
- Partnering with GroundZeroAI on linear algebra course content, connecting tools to communities where they fill a real gap

</v-clicks>

<v-click>
  <div class="mt-4 text-sm opacity-70 leading-relaxed">
    <span v-mark.underline="{ at: 5, color: '#5fa26a' }">Once you learn to pay attention and contribute at the friction points, the pattern transfers across ecosystems.</span>
  </div>
</v-click>

::right::

<div class="pt-7 osw-grid-2">
  <div class="osw-card-light min-h-[10rem]">
    <div class="font-semibold">Product contact</div>
    <div class="mt-3 text-sm">use the thing seriously enough to feel its friction</div>
  </div>
  <div class="osw-card min-h-[10rem]">
    <div class="font-semibold">Teaching layer</div>
    <div class="mt-3 text-sm opacity-82">turn what you learned into examples, walkthroughs, and clearer paths</div>
  </div>
  <div class="osw-card min-h-[10rem]">
    <div class="font-semibold">Recognition layer</div>
    <div class="mt-3 text-sm opacity-82">make contributors legible, attributable, and worth following</div>
  </div>
  <div class="osw-card-light min-h-[10rem]">
    <div class="font-semibold">Result</div>
    <div class="mt-3 text-sm">a community that grows around useful artifacts instead of slogans</div>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-10
hideInToc: true
---

<EventFrame blob="none" logo="bottom-right" grid="bottom-left" />
<EventFrame blob="top-right" logo="none" grid="none" />

# What I thought would work

<div class="mt-6 osw-card-light">
  <div class="font-semibold mb-4">What I thought would work</div>
  <ul class="osw-list text-sm leading-relaxed">
    <li>big launch announcements</li>
    <li>outreach spreadsheets by themselves</li>
    <li>comprehensive rewrites before smaller useful fixes</li>
    <li>trying to convert power users through persuasion alone</li>
  </ul>
</div>

::right::

<div class="mt-6 osw-card">
  <div class="font-semibold mb-4">What actually compounded</div>
  <ul class="osw-list text-sm leading-relaxed opacity-82">
    <li>weekly spotlights, every week, no exceptions</li>
    <li>small DX improvements filed as PRs</li>
    <li>writing the notebook or example I wished I had</li>
    <li>showing up consistently at events, socials, and community channels while pointing people to genuinely useful resources</li>
    <li>figuring things out as I went instead of waiting for a playbook</li>
  </ul>
</div>

---
layout: fact
hideInToc: true
---

<EventFrame blob="left-arc" logo="bottom-right" grid="bottom-left" />

<div class="text-2xl font-bold">Users need to be at the center of every decision</div>

<v-click>
  <div class="mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
    Contributors come from users. Advocates come from contributors.
    The whole chain starts with <strong>users</strong>.
  </div>
</v-click>

<v-click>
  <div class="mt-8 text-sm opacity-72 max-w-3xl mx-auto leading-relaxed">
    Pay attention to the people trying to use the thing. Everything else follows from that.
  </div>
</v-click>

<v-click>
  <div class="mt-6 osw-cite max-w-3xl mx-auto">
    Greg Wilson's rule in Teaching Tech Together: "Never teach alone." The same applies to maintaining.
  </div>
</v-click>

---
layout: end
hideInToc: true
class: '!bg-[#f7f8f2] !text-[#111111]'
---

<EventFrame blob="hero" logo="bottom-right" grid="bottom-left" />

# Connect with me

<div class="mt-12 flex gap-8 justify-center items-start">
  <div class="osw-outline-card text-left text-sm space-y-3 min-w-[360px] max-w-[460px]">
    <div class="font-semibold text-lg">Srihari Thyagarajan</div>
    <div class="opacity-72">Technical Writer at Deepnote</div>
    <div><a href="https://github.com/Haleshot" class="!no-underline !decoration-transparent">GitHub: @Haleshot</a></div>
    <div><a href="https://www.linkedin.com/in/srihari-thyagarajan/" class="!no-underline !decoration-transparent">LinkedIn: srihari-thyagarajan</a></div>
    <div><a href="https://twitter.com/hari_leo03" class="!no-underline !decoration-transparent">Twitter: @hari_leo03</a></div>
    <div><a href="https://mastodon.social/@haleshot" class="!no-underline !decoration-transparent">Mastodon: @haleshot@mastodon.social</a></div>
    <div><a href="https://bsky.app/profile/haleshot.bsky.social" class="!no-underline !decoration-transparent">BlueSky: @haleshot.bsky.social</a></div>
  </div>

  <div class="osw-outline-card flex flex-col items-center text-center">
    <img src="/qr-code.png" alt="QR code to Srihari's website" class="osw-qr" />
    <div class="mt-3 text-xs opacity-62">Website</div>
  </div>
</div>

<div class="mt-10 text-sm opacity-68">
  Thank you. Come say hi if any of this resonated or if you want to swap notes on what’s worked in your communities.
</div>
