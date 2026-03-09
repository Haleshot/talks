---
theme: seriph
layout: cover
title: Technical Writing in the Age of AI
info: |
  90-minute workshop for WikiMedia Developer Skill Development Program India 2025.
  Covers writing quality in the AI era, Diátaxis documentation architecture,
  and community advocacy as a natural extension of technical writing.
class: text-center
colorSchema: dark
drawings:
  persist: false
transition: slide-up
mdc: true
fonts:
  sans: Inter
  mono: Fira Code
hideInToc: true
draft: true
---

<div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { duration: 500 } }">

# Technical Writing in the Age of AI

</div>

<div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 300, duration: 500 } }" class="text-xl opacity-80 mt-4">
Writing is thinking in public.
</div>

<div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 600 } }" class="absolute bottom-8 left-0 right-0 text-center text-sm opacity-50">
  Srihari Thyagarajan · WikiMedia Developer Skill Development Program India 2025
</div>

<!--
This workshop is for anyone who has spent months building something and hasn't figured out how to talk about it yet. 45s.
-->

---
layout: center
hideInToc: true
---

<div class="text-3xl font-bold text-center max-w-2xl mx-auto leading-tight">
"You built something. Does anyone know how to use it?"
</div>

<v-click>
<div class="text-lg text-center mt-8 opacity-70">
Documentation is not packaging. It's the product.
</div>
</v-click>

<!--
Direct address to these specific participants. They just demoed projects. This is the hook.
-->

---
transition: fade-out
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# About me

<div class="text-base mt-4">

- Technical Writer at [Deepnote](https://deepnote.com)
- OSS contributor: [CocoIndex](https://github.com/cocoindex-io/cocoindex), [marimo](https://github.com/marimo-team/marimo)
- Co-organizer, [SciPy India](https://scipy-india.github.io/)
- Met the organiser at an OSS community booth, holding a community booth about marimo

</div>

<div class="text-sm mt-6 opacity-60">

The through-line: writing clearly about projects you care about
is how you get to rooms like this one.

</div>

::right::

<div class="flex justify-center items-start pt-12">
  <img src="/srihari.png" class="rounded-full w-40 h-40 object-cover shadow-xl border-2 border-gray-600" />
</div>

<!--
I started where you are — building things in public, writing about them, and eventually getting invited to talk about the writing. That's the arc.
-->

---
layout: default
hideInToc: true
---

# Why these slides look like this

<v-clicks>

- No templates. No branded deck.
- Inspired by a talk I saw at the [Happy Llama Battleground event](https://www.linkedin.com/posts/srihari-thyagarajan_makeaiinindia-aim-happy-activity-7321571014532849665-Z4Vt?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSJzvgBkjBd85IWDyUWA6ttzq8B-NDq-Hs) in Bangalore: black screen, white text, real talk. No jargon, no slide-deck performance.
- The speaker was Shekar Sivasubramanian of Wadhwani AI. Stayed with me.
- The point: if the content is good, the slides don't need to carry it.

</v-clicks>

<!--
Name-check Shekar only if the room has context. Otherwise just the principle. This is also why there are no bullet-point summaries of things I'm about to say aloud.
-->

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

# Table of contents

<div class="mt-6 text-sm opacity-60">5 parts · exercises throughout</div>

::right::

<Toc text-sm minDepth="1" maxDepth="1" />

<!--
Orient the room.
-->

---
layout: section
title: The Stakes Have Shifted
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# The Stakes Have Shifted

</div>

<!--
Why writing is now the scarce input.
-->

---
layout: quote
hideInToc: true
---

# "Talk is cheap. Show me the code."

~ <em>Linus Torvalds</em>, August 2000

<!--
"This was the whole deal. Effort was legible. Code was expensive. Let it sit." 30s.
-->

---
layout: default
hideInToc: true
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
<div class="mt-8 border border-primary/25 rounded-lg p-3 font-mono text-sm">
  "100% human written, including emdashes. Sigh."
  <div class="text-xs mt-1 opacity-50 not-italic font-sans">footer on every post — <a href="https://nadh.in/blog/code-is-cheap/" class="underline opacity-70">nadh.in</a></div>
</div>
</v-click>

<v-click at="6">
<div class="mt-3 text-xs opacity-60">
  This is the world that made <a href="https://github.com/mitchellh/vouch" class="underline">Vouch</a> necessary: "contributors can no longer be trusted based on the minimal barrier to entry to simply submit a change."
</div>
</v-click>

<!--
Hold silence after click 3. "25 years of software development. One sentence." Then: "His footer on every post says it all."
-->

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

### <carbon-time class="inline mr-2" />Then

- Code was expensive
- Effort signalled quality
- Experience was legible

::right::

<div
  v-motion
  :initial="{ x: 80, opacity: 0 }"
  :enter="{ x: 0, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 20, delay: 200 } }"
>

### <carbon-lightning class="inline mr-2" />Now

- Code is near-free
- Judgment is the bottleneck
- **"Good talk is exponentially more valuable than good code."**{class="text-primary"}

</div>

<!--
"The right column is not the bad news. For this room, it's the best news you'll hear today." 90s.
-->

---
layout: default
hideInToc: true
---

# Infinite output, zero meaning

<v-clicks>

- The Library of Babel: every possible text already exists. None of it is useful.
- AI generation: every possible README already exists. Most of it is hollow.
- The problem is not volume. The problem is ownership.

</v-clicks>

<v-click>
<div class="text-primary text-2xl font-bold mt-6">"<span v-mark.underline>Slop is well-liked.</span>"</div>
<div class="text-sm mt-2 opacity-60">~ <em>Benjamin Breen</em>, <em>Res Obscura</em></div>
</v-click>

<v-click>
<div class="text-sm mt-4 opacity-70">People read and share AI-generated content without noticing it's hollow. The problem isn't that people hate slop — it's that they can't tell. Neither can the person who published it.</div>
</v-click>

<!--
"People consume AI-generated content willingly. The ceiling has risen but so has the noise floor." 60s.
-->

---
layout: quote
hideInToc: true
---

# "Here's the hard thing about easy things: if everyone can do something, there's no advantage to doing it, but you still have to do it anyway."

~ <em>Packy McCormick</em>, [<em>Not Boring</em>](https://www.notboring.co/)

<!--
"The baseline has moved. Writing is now the table stake, not the differentiator. But judgment? Verification? Ownership? Those are still scarce." 30s.
-->

---
layout: default
hideInToc: true
---

<div class="grid grid-cols-2 gap-8">

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

<!--
"We automated the cheap part. The expensive part is still yours." 60s.
-->

---
layout: default
hideInToc: true
---

# Your project docs are part of the ecosystem now.

<v-clicks>

- WikiMedia runs on documentation. Extensions, gadgets, bots all depend on contributors being able to read and write clearly.
- Auto-generated docs feel hollow because they are. Users notice the absence of judgment.
- The person who writes well is the person who shapes how the community understands the project.

</v-clicks>

<!--
"You're not writing for a company. You're writing for a community that will outlast any single contributor." 60s.
-->

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

<!--
Bridge to Part 2. "The rest of this workshop is the how."
Exercise: "Think of the last doc you touched. Which of these three did you actually do?" 60s.
-->

---
layout: section
title: What Writing Actually Is
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# What Writing Actually Is

</div>

<!--
Not grammar. Not style guides. The actual cognitive work.
-->

---
layout: quote
hideInToc: true
---

# "Writing is thinking in public."

~ <em>Benjamin Breen</em>, <em>Res Obscura</em>

<v-click>
<div class="text-sm mt-8 opacity-70 max-w-2xl mx-auto text-center">
When you write a design doc, a README, a how-to guide: you're not transcribing a decision that already happened. You're making it.
</div>
</v-click>

<!--
"This is the whole workshop in five words." 30s.
-->

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# The ideas layer is still expensive

<div class="mt-4 text-sm opacity-70">

<em>Prashanth Rao</em> on writing in the age of AI — on why clear thinking on the page still matters when code generation is nearly free. <em>Shreya Shankar</em> shared it.

</div>

::right::

<Tweet id="2004354523876438301" scale="0.55" />

<!--
Brief. Let the tweet breathe.
-->

---
layout: default
hideInToc: true
---

# Three layers of reading — and writing.

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

<!--
"When you read a bad doc, you feel it at the outline layer first — there's no reason to keep reading." 90s.
-->

---
layout: statement
hideInToc: true
---

<div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

"Ideas are the meat."

<div class="text-sm mt-4 opacity-60">~ <em>Prashanth Rao</em></div>

</div>

<!--
Let it sit. "Everything else is packaging."
-->

---
layout: quote
hideInToc: true
---

# "The goal isn't to avoid sounding like a model; it's to write with clarity, intention, and control."

~ <em>Shreya Shankar</em>

<!--
"The question is not: does this sound human? The question is: does this say something?" 30s.
-->

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

<v-clicks>

1. Empty summaries
2. Overuse of lists
3. Flat rhythm
4. Wrong subjects

</v-clicks>

::right::

<v-clicks at="5">

5. Low information density
6. Vagueness
7. Demonstrative pronoun overload
8. <span v-mark.underline="8">Fluency masking ignorance</span>

</v-clicks>

<!--
Walk each. For #8: "Correct sentences that explain nothing. The hardest to spot because they pass all the checks."
Exercise: "Pick one. Find it in something you wrote recently." 3 min.
-->

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

<!--
"Don't throw out the tools because they're also used badly. The tool is neutral." 60s.
-->

---
layout: default
hideInToc: true
---

# Somebody Wanted But So Then

```{1|2|3|4|5}
Somebody   We built a citation-fixing bot.
Wanted     Automated, reliable citation repair.
But        Edge cases broke 20% of inputs.
So         We added a validation pass before writes.
Then       Error rate dropped to under 2%.
```


<!--
"Any incident report. Any design doc. Any ADR. Any PR description. SWBST works."
Exercise: "Your project. 2 minutes. Write its SWBST right now." (Speaker waits.) 3 min with exercise.
-->

---
layout: default
hideInToc: true
---

# Working with AI without losing the wheel

<v-clicks>

- <carbon-chat class="inline mr-2 text-primary" /> **Narrate the story**: talk through structure, get a detailed outline back
- <carbon-edit class="inline mr-2 text-primary" /> **Write rough drafts yourself**: imperfect paragraphs keep ownership; blank pages don't
- <carbon-rotate-360 class="inline mr-2 text-primary" /> **Scoped rewrites during revision**: ask the model to follow specific patterns, not to author

</v-clicks>

<!--
"LLM at the edges. You at the center." 90s.
-->

---
layout: section
title: Designing Docs for Real Users
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# Designing Docs for Real Users

</div>

<!--
"Writing quality is one thing. Writing the right kind of doc is another. Most doc problems aren't quality problems. They're type problems."
-->

---
layout: center
hideInToc: true
---

# Four types. One user need each.

<div class="mt-6">
<QuadrantGrid highlight="all" />
</div>

<v-click>
<div class="text-base mt-6 text-center opacity-70">Most projects have all four. Most projects mix them all together.</div>
</v-click>

<!--
"This is your diagnostic framework. We'll go through each quadrant."
Exercise: "Think of a doc in your project. Which quadrant?" 60s.
-->

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

<QuadrantGrid highlight="tutorials" />

::right::

### Tutorials

<v-clicks>

- "Don't try to teach." (the counterintuitive core)
- Ruthlessly minimise explanation
- Use "we" language: "In this tutorial, we will..."
- Perfect reliability: it must work every single time
- Success = capability growth, not task completion

</v-clicks>

<!--
"The paradox: the way to teach is not to explain. Explanation distracts from doing. The learner's hands need to move." 2 min.
-->

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

<QuadrantGrid highlight="how-to" />

::right::

### How-to guides

<v-clicks>

- "Seek flow." (Diataxis verbatim)
- Problem-centered, not tool-centered
- Title precisely: "How to configure X for Y"
- Link away explanatory content, don't embed it
- Does not need to be complete. Needs to be useful.

</v-clicks>

<!--
"The most written type. The most confused with tutorials." 90s.
-->

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
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

- "Make connections." Beyond the immediate topic.
- Provides context: the why, design rationale, history
- Read away from active work, no urgency to act
- *On Food and Cooking* by Harold McGee: cooking through history and science, no recipes
- The most underinvested quadrant in most OSS projects

</v-clicks>

</div>

<!--
"Architecture docs. Design rationale. ADRs. The 'why we made this decision' that lives in nobody's head but the original author. This is what gets lost." 2 min.
-->

---
layout: two-cols
layoutClass: gap-16
hideInToc: true
---

<QuadrantGrid highlight="reference" />

::right::

### Reference

<v-clicks>

- "Describe and only describe." (Diataxis verbatim)
- Neutral, objective, no opinions
- Mirror the product's structure
- Adopt standard patterns so users find what they expect
- Examples illustrate; they don't instruct

</v-clicks>

<!--
"Reference is a map. It doesn't tell you where to go. It tells you what's there." 90s.
-->

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

<!--
"Concrete. Make them look at their own projects."
Exercise: "Name one doc in your project that's confused about its type." 90s.
-->

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

<!--
"When someone says 'our docs are bad,' they usually mean 'our docs are confused about what they're trying to do.'" 2 min.
-->

---
layout: default
hideInToc: true
---

# Three moves. No rewrite required.

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

<!--
"Start with labeling. The labels create clarity before you write a single new word." 90s.
-->

---
layout: section
title: Growing the Practice
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# Growing the Practice

</div>

<!--
"Quality and structure covered. Now the harder question: how do you get better at this, consistently, without waiting for permission?"
-->

---
layout: statement
hideInToc: true
---

<div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

"Technical isn't binary."

<div class="text-sm mt-4 opacity-60">~ <em>Janine Chan</em>, <em>Write the Docs Portland 2025</em></div>

</div>

<!--
"'I'm not technical enough to write this.'" 5 seconds of silence. "Let me show you what that actually means."
-->

---
layout: default
hideInToc: true
---

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

<div v-click class="text-sm mt-4 opacity-50">~ <em>Janine Chan</em>, <em>Write the Docs Portland 2025</em></div>

<!--
Emphasize #3: "Not 'I don't understand X' ~ that's a feeling. 'What does this parameter control?' ~ that's a question you can answer."
Exercise: "Pick two. Which two start this week?" 4 min.
-->

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

<div v-click="5" class="mt-8">
  <div class="text-xl font-bold leading-snug">
    "You don't know your docs are broken until someone tries to follow them."
  </div>
  <div class="text-sm mt-4 opacity-60">~ <em>Heather Zoppetti</em>, <em>Write the Docs</em></div>
</div>

<!--
"Real-user testing is the equivalent of having an actual knitter follow your pattern." 2 min.
-->

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

<div class="mt-4 border-l-2 border-primary/40 pl-4 text-sm opacity-80">

Started contributing to <a href="https://github.com/marimo-team/marimo" class="underline">marimo</a>'s docs while using it for data work.
That writing got me into their community Slack, then a booth at PyCon India, then this room.
No TW job title at any point, just clear writing about things I cared about.

</div>

<!--
Exercise: "What's one domain you've worked in ~ before or outside TW ~ where you were already doing technical writing and didn't call it that?" 90s.
-->

---
layout: section
title: The Natural Extension
---

<div v-motion :initial="{ y: -30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }">

# The Natural Extension

</div>

<!--
"Writing well opens a door. This is what's behind it."
-->

---
layout: default
hideInToc: true
---

# Technical writing is not the destination.

<v-clicks>

- Docs are infrastructure. Advocacy is what builds on top.
- When you write clearly about a project, you become the person who shapes how others understand it.
- That's not just a writing role. It's a community role.

</v-clicks>

<v-click>
<div class="mt-6 text-base opacity-80">

- At an OSS event last year, I was holding a community booth for marimo.
  The person who invited me to give this talk was in the audience.
  The booth was just a printed one-pager explaining what marimo does.

</div>
</v-click>

<!--
"This is the through-line from your work here today to something larger." 60s.
-->

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

<div v-click="5">

### Advocacy means:

</div>

<v-clicks at="6">

- Representing the project at events (like this one)
- Writing posts that explain decisions to the community
- Being the person who makes the project legible to outsiders
- Owning community trust, not just code

</v-clicks>

<!--
"This is not a separate career. It's an expansion of the same skill." 90s.
-->

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Writing led me here

<div class="mt-4 text-sm opacity-70">

<em>Prashanth Rao</em> on how putting your thinking in public brings people to you. This is the same reason I was at a marimo booth when the organiser of this workshop walked past.

</div>

::right::

<Tweet id="2004028850758615548" scale="0.55" />

<!--
Let it sit. The point is personal and tangible.
-->

---
layout: default
hideInToc: true
---

# How I got here

<div class="grid grid-cols-4 gap-3 mt-6 text-sm">

<v-click>
<div class="border border-primary/30 rounded-lg p-3 text-center">
  <carbon-document class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">Docs PRs</div>
  <div class="text-xs opacity-60 mt-1">marimo, CocoIndex</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-3 text-center">
  <carbon-group class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">Community</div>
  <div class="text-xs opacity-60 mt-1">Slack, SciPy India</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-3 text-center">
  <carbon-presentation-file class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">Speaking</div>
  <div class="text-xs opacity-60 mt-1">this room</div>
</div>
</v-click>

<v-click>
<div class="border border-primary/30 rounded-lg p-3 text-center">
  <carbon-edit class="text-primary text-xl mx-auto mb-1" />
  <div class="font-semibold">TW role</div>
  <div class="text-xs opacity-60 mt-1">Deepnote</div>
</div>
</v-click>

</div>

<v-click>
<div class="mt-6 text-sm opacity-60 text-center">No TW job title at the start. Just writing clearly about things I cared about.</div>
</v-click>

<!--
"The point: writing led to community, which led to advocacy, which led to this room. The path is non-linear but the skill is consistent."
-->

---
layout: default
hideInToc: true
---

# One more thing about AI.

<v-clicks>

- "I've already noticed that I am slowly starting to <span v-mark.underline="1">atrophy my ability</span> to write code manually." — Benjamin Breen
- The same risk exists for writing. If you outsource the thinking, <span v-mark.underline="2">you lose the thinking.</span>
- Writing is not just communication. It's <span v-mark.circle="3">how you know what you know.</span>

</v-clicks>

<v-click>
<div class="mt-6 text-base italic opacity-80">
"Style isn't something you apply later; it's embedded in your perception."
<div class="text-sm mt-1 opacity-60">~ <em>Martin Amis</em> (via Breen)</div>
</div>
</v-click>

<!--
"The cognitive debt argument: every time you skip the draft and go straight to the output, you borrow from your future thinking capacity." 60s.
-->

---
layout: quote
hideInToc: true
---

# "The work is, itself, the point."

~ <em>Benjamin Breen</em>, <em>Res Obscura</em>

<!--
5-10 seconds of silence. "Not the output. Not the recognition. Not the career outcome. The act of thinking clearly in public." 30s.
-->

---
layout: default
hideInToc: true
---

# Leave with these three.

<v-clicks>

- <carbon-grid class="inline mr-2 text-primary" /> **A framework**: Diataxis (classify, separate, link)
- <carbon-text-align-left class="inline mr-2 text-primary" /> **A structure**: SWBST for any technical narrative
- <carbon-growth class="inline mr-2 text-primary" /> **A habit**: one from the seven, starting this week

</v-clicks>

<!--
"Six outcomes promised. Three anchors. If you do nothing else, do these three." 60s.
-->

---
layout: end
hideInToc: true
---

# Technical Writing in the Age of AI

Questions?

<div class="mt-6 text-sm opacity-60">
  GitHub: @Haleshot · Twitter: @hari_leo03
</div>

<!--
If it's quiet: "What's one doc from your project that you'll look at differently after today?"
-->
