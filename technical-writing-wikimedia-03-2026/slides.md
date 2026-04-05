---
theme: seriph
layout: cover
title: Technical Writing in the Age of AI
info: |
  90-minute workshop for WikiMedia Developer Skill Development Program India 2026.
  Covers writing quality in the AI era, Diátaxis documentation architecture,
  and community advocacy as a natural extension of technical writing.
class: text-center
colorSchema: dark
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  sans: Inter
  mono: Fira Code
hideInToc: true
---

<img
  src="/metawiki.svg"
  alt="Meta-Wiki"
  class="absolute right-8 top-8 h-56 w-56 opacity-12 pointer-events-none"
/>

<div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { duration: 500 } }">

# Technical Writing in the Age of AI

</div>

<div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 300, duration: 500 } }" class="text-xl opacity-80 mt-4">
Writing is thinking in public.
</div>

<div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 600 } }" class="absolute bottom-8 left-0 right-0 text-center text-sm opacity-50">
  Srihari Thyagarajan · WikiMedia Developer Skill Development Program India 2026
</div>


---
layout: center
hideInToc: true
---

<div class="text-3xl font-bold text-center max-w-2xl mx-auto leading-tight">
You built something. Does anyone know how to use it?
</div>

<v-click>
<div class="text-lg text-center mt-8 opacity-70">
Documentation is not packaging. It's the product.
</div>
</v-click>


---
transition: fade-out
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# About me

<div class="text-base mt-4 text-left">

<p class="text-sm opacity-80 leading-relaxed mb-5">
I studied AI, got pulled into open source toward the end of college, and kept gravitating toward the same kind of work:
trying tools properly, contributing where I felt friction, and then writing the guide I wish I had when I got stuck.
</p>

<p class="text-sm opacity-80 leading-relaxed mb-5">
It took me a while to realise that this mix of community work, advocacy, educational writing, and developer tooling was
already a role. I just hadn't learned the vocabulary for it yet.
</p>

- Technical Writer at [Deepnote](https://deepnote.com)
- Contributor to projects I actively use, including [CocoIndex](https://github.com/cocoindex-io/cocoindex) and [marimo](https://github.com/marimo-team/marimo)
- Co-organizer, [SciPy India](https://scipy-india.github.io/)
- I spend a lot of time around notebooks, tutorials, integrations, and OSS communities

</div>

::right::

<div class="flex justify-center items-start pt-12">
  <img src="/srihari.png" class="rounded-full w-40 h-40 object-cover shadow-xl border-2 border-gray-600" />
</div>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

# Table of contents

<div class="mt-8 text-sm opacity-75 leading-relaxed max-w-xl">
We are going to move from why writing feels harder now, to what good writing is actually doing, to how to structure docs so they stop fighting the reader, and then to what that kind of work can grow into in public.
</div>

<div class="mt-4 text-sm opacity-60 leading-relaxed max-w-xl">
If you have a project, a README, a wiki page, or even one annoying doc in mind, keep it with you through the session. A lot of these slides are built out of things I have read, quoted, argued with, and fallen down rabbit holes through. That felt fitting for a Wikimedia workshop.
</div>

::right::

<Toc class="mt-2 text-base leading-loose" minDepth="1" maxDepth="1" />


---
layout: default
hideInToc: true
transition: slide-up
---

<img
  src="/linus.png"
  alt="Linus Torvalds"
  class="absolute inset-0 h-full w-full object-cover object-right-top opacity-100 pointer-events-none"
/>
<div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/45 pointer-events-none"></div>

<div class="relative z-10 max-w-3xl text-white pt-18">
  <div class="text-4xl leading-tight font-semibold">
    "Talk is cheap. Show me the code."
  </div>
  <div class="mt-4 text-lg opacity-85">
    ~ <em>Linus Torvalds</em>, August 2000
  </div>
</div>

<div class="mt-5 text-sm max-w-2xl opacity-72 leading-relaxed">
He wrote this on the Linux kernel mailing list while pushing back on a proposal that was still mostly talk and confidence. In that moment, "show me the code" meant: stop telling me what you think should work and show me the version that has survived implementation, constraints, and contact with reality.
</div>

<div class="mt-4 text-sm max-w-2xl opacity-60 leading-relaxed">
That only made sense because code was still expensive. Writing it was the proof of seriousness.
</div>


---
layout: section
title: The Stakes Have Shifted
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# The Stakes Have Shifted

</div>


---
layout: default
hideInToc: true
transition: slide-up
---

<div class="text-4xl font-bold mb-12">
"<span v-mark.crossed-off="1">Talk</span> is cheap. Show me the <span v-mark.crossed-off="2">code</span>."
</div>

<v-click at="3">
<div class="text-4xl font-bold text-primary">
"<span v-mark.underline="3">Code</span> is cheap. Show me the <span v-mark.box="{ at: 4, color: '#5d8392' }">talk</span>."
</div>
<div class="text-sm mt-4 opacity-60">~ <em>Kailash Nadh</em>, January 2026</div>
</v-click>

<v-click at="5">
<div class="mt-6 text-sm opacity-70 max-w-3xl">
The point of Kailash Nadh's inversion is not that code stopped mattering. It is that code generation has been commodified so aggressively that output alone no longer tells you who understood the problem, who made the trade-offs, or who can be trusted to review what was produced.
</div>
</v-click>

<v-click at="6">
<div class="mt-3 text-xs opacity-60 max-w-3xl">
  He talks about this kind of work elsewhere too, including performance and large-scale systems conversations on Perfology. The recurring theme is the same: the valuable part is not raw output, but the thinking that makes systems legible and reviewable.
</div>
</v-click>

<v-click at="7">
<div class="mt-8 border border-primary/25 rounded-lg p-3 font-mono text-sm">
  "100% human written, including emdashes. Sigh."
  <div class="text-xs mt-1 opacity-50 not-italic font-sans">footer on every post, <a href="https://nadh.in/blog/code-is-cheap/" class="underline opacity-70">nadh.in</a></div>
</div>
</v-click>

<v-click at="8">
<div class="mt-3 text-xs opacity-60">
  This is the world that made <a href="https://github.com/mitchellh/vouch" class="underline">Vouch</a> necessary: "contributors can no longer be trusted based on the minimal barrier to entry to simply submit a change."
</div>
</v-click>

<v-click at="9">
<div class="mt-3 text-xs opacity-60 max-w-3xl">
  And honestly, I would still rather take a little less traffic and a little more friction if it means the people showing up are actual humans, not waves of bot-generated drive-by contributions.
</div>
</v-click>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

<div class="mt-16">

### <carbon-time class="inline mr-2" />Then

- Code was expensive
- Effort signalled quality
- Experience was legible

</div>

::right::

<div
  v-motion
  :initial="{ x: 80, opacity: 0 }"
  :enter="{ x: 0, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 20, delay: 200 } }"
  class="mt-16"
>

### <carbon-lightning class="inline mr-2" />Now

- Code is near-free
- Judgment is the bottleneck
- Clear articulation becomes the differentiator
- Opinionated review starts mattering again

</div>


---
layout: default
hideInToc: true
---

# Infinite output, zero meaning

<v-clicks>

- Borges imagined a library containing every possible book. Most of it would be nonsense, and the few useful things would be buried beyond recovery. That is why <em>Library of Babel</em> fits here.
- AI generation: every possible README already exists. Most of it is hollow.
- The problem is not volume. The problem is ownership.

</v-clicks>

<v-click>
<div class="text-primary text-2xl font-bold mt-6">"<span v-mark.underline>Slop is well-liked.</span>"</div>
<div class="text-sm mt-2 opacity-60">~ <em>Benjamin Breen</em>, <em>Res Obscura</em></div>
</v-click>

<v-click>
<div class="text-sm mt-4 opacity-70">
Slop did not begin with AI. We have always had filler, SEO sludge, and content farms. AI changes the scale, speed, and confidence of the problem. The floor rises, the volume explodes, and the cost of producing something plausible drops so far that discernment and ownership become the scarce part.
</div>
</v-click>


---
layout: quote
hideInToc: true
---

# "Here's the hard thing about easy things: if everyone can do something, there's no advantage to doing it, but you still have to do it anyway."

~ <em>Packy McCormick</em>, [<em>Not Boring</em>](https://www.notboring.co/)

<v-click>
<div class="text-sm mt-8 opacity-70 max-w-3xl mx-auto text-center">
This comes from <em>Costless Sacrifice</em>: an essay about what happens when output becomes cheap and effort stops being a reliable signal of quality.
</div>
</v-click>


---
layout: default
hideInToc: true
---

<div class="grid grid-cols-2 gap-8 mt-12">

<div>

### <carbon-batch-job class="inline mr-2" />Generation

- Cost: near zero
- Speed: instant
- Volume: unlimited

</div>

<v-click>
<div>

### <carbon-search-locate class="inline mr-2" />Verification

- Cost: rising
- Speed: slow and effortful
- Volume: the actual bottleneck

</div>
</v-click>

</div>

<v-click>
<div class="mt-8 text-center italic text-xl border-t border-primary/20 pt-6">
"<span v-mark.underline>Cheap to Generate</span>, <span v-mark.underline>Expensive to Verify</span>"
<div class="text-sm not-italic opacity-60 mt-2">~ <em>Shreya Shankar</em></div>
</div>
</v-click>


---
layout: default
hideInToc: true
---

# Your project docs are part of the ecosystem now.

<v-clicks>

- WikiMedia runs on documentation. Extensions, gadgets, bots all depend on contributors being able to read and write clearly.
- Auto-generated docs feel hollow because they are. Users notice the absence of judgment.
- If you want an example of this done well, look at notebook ecosystems: people like <a href="https://github.com/willingc" class="underline">Carol Willing</a> helped make documentation, governance, and education part of the project itself.
- The person who writes well often becomes the person who shapes how the community understands the project.

</v-clicks>


---
layout: default
hideInToc: true
---

# What this demands

<v-clicks>

- <carbon-decision-tree class="inline mr-2 text-primary" /> The ability to decide *what* to say, not just how to say it
- <carbon-checkmark-filled class="inline mr-2 text-primary" /> The ability to verify claims before publishing
- <carbon-user-avatar class="inline mr-2 text-primary" /> The ability to own the reasoning, not just the output

</v-clicks>

<v-click>
<div class="mt-8 text-sm italic opacity-70">
"Figuring out <span v-mark.underline>what to say</span>, how to frame it, and when and how to go deep is still the hard part."
<div class="mt-1 opacity-60">~ <em>Shreya Shankar</em></div>
</div>
</v-click>


---
layout: section
title: What Writing Actually Is
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# What Writing Actually Is

</div>


---
layout: quote
hideInToc: true
---

# "Writing is thinking in public."

~ <em>Benjamin Breen</em>, <em>Res Obscura</em>

<v-click>
<div class="text-sm mt-8 opacity-70 max-w-2xl mx-auto text-center">
When you write a design doc, a README, or a how-to guide, you are not just recording thought after the fact. You are using the act of writing to notice gaps, make trade-offs visible, and arrive at something worth sharing.
</div>
</v-click>

<v-click>
<div class="text-sm mt-4 opacity-60 max-w-3xl mx-auto text-center">
That is the part I want to protect in an AI-heavy workflow: not the romance of suffering, but the thinking work that only becomes visible once you try to explain it to someone else.
</div>
</v-click>


---
layout: two-cols
layoutClass: gap-8
hideInToc: true
transition: slide-up
---

# The ideas layer is still expensive

<div class="mt-4 text-sm opacity-70">

<em>Prashanth Rao</em> on why the ideas layer is still expensive, even when code generation is nearly free.

</div>

::right::

<Tweet id="2004354523876438301" scale="0.55" />


---
layout: default
hideInToc: true
transition: slide-up
---

# Three layers of reading and writing.

| Layer | Reader asks | Where LLMs fall short |
|---|---|---|
| **Outline** | "Why should I care?" | No genuine motivation |
| **Ideas** | "What matters here?" | Derivative, no real argument |
| **Text** | "How does this work?" | Fluent, but shallow judgment |

<v-click>
<div class="text-primary text-xl font-bold mt-6">"<span v-mark.circle>Ideas are the meat.</span>"</div>
<div class="text-sm mt-1 opacity-60">~ <em>Prashanth Rao</em></div>
</v-click>

<v-click>
<div class="text-sm mt-4 opacity-70 italic">"The whole point of a blog post is that a human spent time thinking about something and arrived at conclusions worth sharing. It's valuable because it reflects their actual reasoning process."</div>
<div class="text-sm mt-1 opacity-50">~ <em>Shreya Shankar</em></div>
</v-click>


---
layout: quote
hideInToc: true
---

# "The goal isn't to avoid sounding like a model; it's to write with clarity, intention, and control."

~ <em>Shreya Shankar</em>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
transition: slide-up
---

<div class="mt-18 flex flex-col gap-8 text-lg">

<div v-click>1. Empty summaries</div>
<div v-click>2. Overuse of lists</div>
<div v-click>3. Flat rhythm</div>
<div v-click>4. Wrong subjects</div>

</div>

::right::

<div class="mt-18 flex flex-col gap-8 text-lg">

<div v-click>5. Low information density</div>
<div v-click>6. Vagueness</div>
<div v-click>7. Demonstrative pronoun overload</div>
<div v-click><span v-mark.underline="8">8. Fluency masking ignorance</span></div>

</div>


---
layout: default
hideInToc: true
---

# These are rhetoric, not LLM tells.

<div class="text-xs mb-4 opacity-50">via <a href="https://www.sh-reya.com/blog/ai-writing/" class="underline">Shreya Shankar, "Writing in the Age of LLMs"</a></div>

<v-clicks>

- Intentional repetition for clarity
- Signposting phrases ("essentially," "the point is")
- Parallel structure
- Predictable section headings
- Declarative topic openings
- <span v-mark.underline>Em dashes</span> (yes, really)

</v-clicks>


---
layout: default
hideInToc: true
---

# Somebody Wanted But So Then

<div class="text-sm opacity-75 leading-relaxed max-w-3xl">
This is a compact narrative scaffold Shreya Shankar recommends because it forces you to include motivation, friction, and consequence. It is popular because it works on more than stories: incidents, design docs, changelogs, postmortems, and PR descriptions all get clearer when the tension is explicit.
</div>

<div class="mt-10 max-w-3xl">

````md magic-move {lines:true}
```txt
Somebody   ___
Wanted     ___
But        ___
So         ___
Then       ___
```

```txt {1|2|3|4|5}
Somebody   We built a citation-fixing bot.
Wanted     Automated, reliable citation repair.
But        Edge cases broke 20% of inputs.
So         We added a validation pass before writes.
Then       Error rate dropped to under 2%.
```
````

</div>


---
layout: default
hideInToc: true
---

# Working with AI without losing the wheel

<div class="mt-8">
<v-clicks>

- <carbon-chat class="inline mr-2 text-primary" /> **Narrate the story**: talk through structure, get a detailed outline back
- <carbon-edit class="inline mr-2 text-primary" /> **Write rough drafts yourself**: imperfect paragraphs keep ownership; blank pages don't
- <carbon-rotate-360 class="inline mr-2 text-primary" /> **Scoped rewrites during revision**: ask the model to follow specific patterns, not to author

</v-clicks>
</div>


---
layout: section
title: Designing Docs for Real Users
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# Designing Docs for Real Users

</div>


---
layout: center
hideInToc: true
transition: slide-up
---

<div class="max-w-4xl mx-auto text-left">
  <div class="text-3xl font-semibold mb-6">Before I show the next slide, here is the useful part.</div>
  <div class="text-lg opacity-75 leading-relaxed">
    Diataxis is a way of looking at docs by asking two questions at once: is the reader trying to <em>learn</em> or <em>get something done</em>, and do they need <em>action</em> or <em>understanding</em>? The map is useful because it makes mixed-up docs visible.
  </div>
  <div class="text-base opacity-60 leading-relaxed mt-5">
    When a tutorial starts explaining architecture, or a reference page starts behaving like a walkthrough, the problem is often not bad prose. The problem is that one page is trying to do multiple jobs.
  </div>
</div>


---
layout: center
hideInToc: true
transition: slide-up
---

<img
  src="/diataxis.png"
  alt="Diataxis map"
  class="h-full max-h-[78vh] w-full object-contain mx-auto"
/>


---
layout: center
hideInToc: true
transition: slide-up
---

# Four types. Each serves one user need.

<div class="mt-6">
<QuadrantGrid highlight="all" />
</div>

<v-click>
<div class="text-base mt-6 text-center opacity-70">Most projects need all four. Most projects accidentally collapse them into one page.</div>
</v-click>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
transition: slide-up
---

<QuadrantGrid highlight="tutorials" />

::right::

### Tutorials

<v-clicks>

- "Don't try to teach." The learner should discover by doing.
- Ruthlessly minimise explanation while the hands are moving.
- Use "we" language: "In this tutorial, we will..."
- Perfect reliability: it must work every single time.
- Success = capability growth, not just finishing the page.

</v-clicks>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
transition: slide-up
---

<QuadrantGrid highlight="how-to" />

::right::

### How-to guides

<v-clicks>

- "Seek flow." Keep the user moving toward a concrete goal.
- Problem-centered, not tool-centered.
- Title precisely: "How to configure X for Y".
- Link out to background material instead of embedding all of it here.
- It does not need to be complete. It needs to unblock the task.

</v-clicks>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
transition: slide-up
---

<QuadrantGrid highlight="explanation" />

::right::

<div
  v-motion
  :initial="{ x: 40, opacity: 0 }"
  :enter="{ x: 0, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 20, delay: 200 } }"
>

### Explanation

<v-clicks>

- "Make connections." Go beyond the immediate task.
- Provide context: the why, design rationale, history.
- Best read when the user is trying to understand, not fix something in the next 30 seconds.
- <em>On Food and Cooking</em> is useful here as an analogy: it teaches you how a domain works without turning into a recipe book.
- This is the most underinvested quadrant in most OSS projects. 
  - Any guesses on why? 👀

</v-clicks>

</div>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

<QuadrantGrid highlight="reference" />

::right::

### Reference

<v-clicks>

- "Describe and only describe."
- Neutral, objective, no opinions.
- Mirror the product's structure.
- Use standard patterns so users find what they expect.
- Examples illustrate what exists; they do not become mini-tutorials.

</v-clicks>


---
layout: default
hideInToc: true
---

# Your project probably has all four. Do they know what they are?

<div class="grid grid-cols-2 gap-6 mt-6">

<v-click>
<div class="border border-primary/30 rounded-lg p-4">
<div class="font-bold text-sm mb-1">Extension README</div>
<div class="text-sm opacity-70">Tutorial? How-to? Both?</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-4">
<div class="font-bold text-sm mb-1">Action API docs</div>
<div class="text-sm opacity-70">Reference (should be)</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-4">
<div class="font-bold text-sm mb-1">"Why we built this gadget"</div>
<div class="text-sm opacity-70">Explanation (usually missing)</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-4">
<div class="font-bold text-sm mb-1">"How to contribute fixes"</div>
<div class="text-sm opacity-70">How-to (often mislabeled as tutorial)</div>
</div>
</v-click>

</div>


---
layout: default
hideInToc: true
---

# Most doc problems are type problems.

<v-clicks>

- A tutorial that explains too much stops being a tutorial.
- A how-to with deep background stops being a how-to.
- Reference that tells you what to do stops being reference.

</v-clicks>

<v-click>
<div class="mt-8">

> "Diataxis is not just a list. Crossing or blurring the boundaries is a root cause of quality failures."
>
> ~ <em>Daniele Procida</em>

</div>
</v-click>


---
layout: default
hideInToc: true
---

# Three moves. No rewrite required.

<div class="text-sm opacity-75 leading-relaxed max-w-3xl mb-6">
This is the part I want people to leave with because it makes the framework feel usable. You do not need a full rewrite to improve docs. You need a better way to separate jobs.
</div>

<v-clicks>

- <carbon-tag class="inline mr-2 text-primary" /> <span v-mark.underline="1">**Classify**</span>: read existing docs, label each one
- <carbon-split class="inline mr-2 text-primary" /> <span v-mark.underline="2">**Separate**</span>: split mixed-type content into dedicated pages
- <carbon-link class="inline mr-2 text-primary" /> <span v-mark.underline="3">**Link**</span>: connect across types instead of embedding

</v-clicks>

<v-click>
<div class="mt-6 text-sm italic opacity-70">
"It doesn't impose implementation constraints."
<div class="mt-1 opacity-60">~ <em>Daniele Procida</em></div>
</div>
</v-click>


---
layout: default
hideInToc: true
---

## Growing the Practice

<div class="text-sm opacity-75 max-w-3xl leading-relaxed mb-8">
This is the part of the workshop for anyone who has ever thought: "I can follow the docs, but I don't know if I'm technical enough to write them." Janine Chan's point is that this is not an identity problem. It is a habit problem.
</div>

<div class="text-sm italic mb-6 opacity-70">Seven habits of increasingly technical technical writers</div>

<v-clicks>

1. Don't essentialize lack of experience.
2. Redirect overwhelm into curiosity.
3. Turn knowledge gaps into specific questions.
4. Get tinkering.
5. Notice peer struggle and commonality.
6. Avoid perfection traps.
7. Love the process, or be honest if you can't.

</v-clicks>

<div v-click class="text-sm mt-4 opacity-50">~ <em>Janine Chan</em>, <em>Write the Docs Portland 2026</em></div>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

### A knitting pattern is like software.

<v-clicks>

- Precise, unambiguous instruction
- Steps that must happen in order
- Designed to be followed by someone not in the room
- **Pattern failures are discovered when someone actually executes it**

</v-clicks>

::right::

<v-click>
<div class="mt-8">
  <div class="text-xl font-bold leading-snug">
    "You don't know your docs are broken until someone tries to follow them."
  </div>
  <div class="text-sm mt-4 opacity-60">~ <em>Heather Zoppetti</em>, <em>Write the Docs</em></div>
</div>
</v-click>


---
layout: default
hideInToc: true
---

# Your background is the point, not the detour.

<div class="flex items-center gap-4 text-sm my-6 flex-wrap">
  <div
    v-motion
    :initial="{ x: -30, opacity: 0 }"
    :enter="{ x: 0, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 20, delay: 100 } }"
    class="border border-primary rounded px-3 py-2"
  >Software engineer</div>
  <carbon-arrow-right class="opacity-40" />
  <div
    v-motion
    :initial="{ x: -30, opacity: 0 }"
    :enter="{ x: 0, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 20, delay: 250 } }"
    class="border border-primary rounded px-3 py-2"
  >Knitwear designer</div>
  <carbon-arrow-right class="opacity-40" />
  <div
    v-motion
    :initial="{ x: -30, opacity: 0 }"
    :enter="{ x: 0, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 20, delay: 400 } }"
    class="border border-primary rounded px-3 py-2"
  >Craft business</div>
  <carbon-arrow-right class="opacity-40" />
  <div
    v-motion
    :initial="{ x: -30, opacity: 0 }"
    :enter="{ x: 0, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 20, delay: 550 } }"
    class="border border-primary rounded px-3 py-2"
  >Technical writer</div>
</div>

<v-click>
<div class="text-base font-semibold">"A varied background is a powerful asset."</div>
<div class="text-sm opacity-60 mt-1">~ <em>Heather Zoppetti</em></div>
</v-click>

<v-click>
<div class="text-base mt-4 opacity-80">Every domain taught you a reader and a set of constraints. That cross-domain empathy is rare.</div>
</v-click>

<v-click>
<div class="mt-4 border-l-2 border-primary/40 pl-4 text-sm opacity-80">

Started contributing to <a href="https://github.com/marimo-team/marimo" class="underline">marimo</a>'s docs while using it for data work.
That writing got me into their community Slack, then a booth at PyCon India, and so on...
No TW job title at any point prior, just clear writing and an affinity for documenting things I cared about.

</div>
</v-click>


---
layout: section
title: The Natural Extension
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# The Natural Extension

</div>


---
layout: default
hideInToc: true
---

# Technical writing is not the destination.

<v-clicks>

- Docs are infrastructure. Advocacy is what builds on top.
- When you write clearly about a project, you become the person who shapes how others understand it.
- That's not just a writing role. It's a community role.
- In Wiki spaces especially, good writing does not sit next to the project. It becomes part of how the project survives handoffs, volunteers, forks, and new contributors.

</v-clicks>

<v-click>
<div class="mt-6 text-base opacity-80 leading-relaxed">
If you stay close to the docs long enough, you stop being "the person who wrote the guide" and start becoming the person others trust to explain what the project is, why it exists, and where it should go next.
</div>
</v-click>


---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

### Writing well means:

<v-clicks>

- People find your project
- New contributors get unblocked faster
- Design decisions have a record
- The project survives beyond its original authors

</v-clicks>

::right::

<v-after>

### Advocacy means:

</v-after>

<v-clicks at="6">

- Representing the project at events (like this one)
- Writing posts that explain decisions to the community
- Being the person who makes the project legible to outsiders
- Owning community trust, not just code

</v-clicks>


---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Writing led me here

<div class="mt-4 text-sm opacity-70">

<em>Prashanth Rao</em> writes about how reading closely and writing publicly changes who finds you. That has been true for me too. A lot of this started with writing about tools I cared about before I had any formal reason to.

</div>

::right::

<Tweet id="2004028850758615548" scale="0.55" />


---
layout: two-cols
layoutClass: gap-10
hideInToc: true
---

# A docs problem I cared enough to write down

<div class="text-sm opacity-80 leading-relaxed mt-6">
One of the clearest signs that I genuinely like this work is that I keep ending up writing about documentation structure even when nobody asked for a slide deck.
</div>

<div class="text-sm opacity-80 leading-relaxed mt-4">
For CocoIndex, I wrote up a larger migration proposal around how the framework docs should evolve because the information architecture itself was becoming part of the product experience.
</div>

<div class="mt-6 text-xs opacity-60">
Reference: cocoindex-io/cocoindex issue #1553
</div>

::right::

<img
  src="/cocoindex-docs-migration.png"
  alt="CocoIndex docs migration issue screenshot"
  class="rounded-lg border border-primary/20 shadow-lg mt-4 max-h-80 mx-auto"
/>


---
layout: default
hideInToc: true
---

# 15-minute group exercise

<div class="text-sm opacity-80 leading-relaxed max-w-4xl mt-4">
Take one of the wiki projects presented at this program and sketch a docs site for it using Diataxis. Use any docs SSG you like: Sphinx, Read the Docs, MkDocs, Zola, or something similar. AI tools are fair game and expected.
</div>

<div class="grid grid-cols-3 gap-5 mt-8 text-left text-sm">
  <div class="border border-primary/30 rounded-lg p-4">
    <div class="font-semibold mb-2">Your goal</div>
    Get a basic docs site running quickly enough that another participant can understand the structure.
  </div>
  <div class="border border-primary/30 rounded-lg p-4">
    <div class="font-semibold mb-2">What to include</div>
    Tutorials, how-to guides, reference, explanation, plus links to any relevant project resources.
  </div>
  <div class="border border-primary/30 rounded-lg p-4">
    <div class="font-semibold mb-2">What I am looking for</div>
    Not polish. Workflow. How fast you can turn messy project knowledge into a usable docs skeleton.
  </div>
</div>

<div class="mt-8 text-sm opacity-65">
This is intentionally more technical than the earlier activities: I want to see what your current docs + AI workflow looks like in practice.
</div>


---
layout: default
hideInToc: true
---

# How I got here

<div class="text-sm opacity-75 leading-relaxed max-w-4xl mt-4">
This is the part I care about saying carefully. None of this felt linear while it was happening. It mostly felt like showing up repeatedly for projects and communities I cared about, usually through writing first, and only later realising that people had actually been paying attention.
</div>

<div class="grid grid-cols-4 gap-4 mt-8 text-sm">

<v-click>
<div class="border border-primary/30 rounded-lg p-4 text-center h-full">
  <carbon-document class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">Docs PRs</div>
  <div class="text-xs opacity-60 mt-1">marimo, CocoIndex, fixes I wanted for myself</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-4 text-center h-full">
  <carbon-group class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">Community</div>
  <div class="text-xs opacity-60 mt-1">conversations, Slack, SciPy India</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-4 text-center h-full">
  <carbon-presentation-file class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">Speaking</div>
  <div class="text-xs opacity-60 mt-1">the moment someone asked me to say this out loud</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-4 text-center h-full">
  <carbon-edit class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">TW role</div>
  <div class="text-xs opacity-60 mt-1">eventually, a title caught up</div>
</div>
</v-click>

</div>

<v-click>
<div class="mt-7 text-sm opacity-65 text-center max-w-3xl mx-auto">
No technical-writing title at the start. Just reading a lot, writing where I felt friction, and discovering that careful public thinking has a way of travelling further than you expect.
</div>
</v-click>


---
layout: default
hideInToc: true
---

# One more thing about AI.

<v-clicks>

- "I've already noticed that I am slowly starting to <span v-mark.underline="1">atrophy my ability</span> to write code manually." -- Benjamin Breen
- The same risk exists for writing. If you outsource the thinking, <span v-mark.underline="2">you lose the thinking.</span>
- Writing is not just communication. It's <span v-mark.circle="3">how you know what you know.</span>

</v-clicks>

<v-click>
<div class="mt-6 text-base italic opacity-80">
"Style isn't something you apply later; it's embedded in your perception."
<div class="text-sm mt-1 opacity-60">~ <em>Martin Amis</em> (via Breen)</div>
</div>
</v-click>


---
layout: quote
hideInToc: true
---

# "The work is, itself, the point."

~ <em>Benjamin Breen</em>, <em>Res Obscura</em>


---
layout: default
hideInToc: true
---

# Leave with these three.

<v-clicks>

- <carbon-grid class="inline mr-2 text-primary" /> **A way to diagnose docs**: ask what job the page is actually doing before you rewrite it.
- <carbon-text-align-left class="inline mr-2 text-primary" /> **A way to shape technical narrative**: use SWBST when the point, friction, or consequence feels muddy.
- <carbon-growth class="inline mr-2 text-primary" /> **A way to stay human in the loop**: keep one part of the writing process that you still do from first principles.

</v-clicks>


---
layout: end
hideInToc: true
---

# Technical Writing in the Age of AI

Questions?

<div class="mt-6 text-sm opacity-60">
  GitHub: @Haleshot · Twitter: @hari_leo03
</div>
