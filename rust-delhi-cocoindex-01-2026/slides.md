---
theme: seriph
background: /assets/rustdelhi-logo.svg
backgroundSize: 40%
title: Stop reprocessing everything - Incremental data pipelines with CocoIndex
event: Rust Delhi Meetup
date: Jan 2026
description: A meetup talk on building incremental data pipelines with CocoIndex, with a focus on real workflows, Rust-powered execution, and sync-friendly data systems.
tags:
  - Rust
  - Data Pipelines
  - CocoIndex
  - OSS
linkedinUrl: https://www.linkedin.com/posts/srihari-thyagarajan_kicking-off-2026-with-rust-delhi-meetup-12-activity-7420450968770764800-SQyb?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSJzvgBkjBd85IWDyUWA6ttzq8B-NDq-Hs
info: |
  ## CocoIndex - Rust Delhi Meetup
  Building incremental data pipelines with a Rust-powered engine
class: text-center
transition: slide-left
mdc: true
---

<div
  v-motion
  :initial="{ y: -20, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { duration: 500 } }"
>

# Stop reprocessing everything

</div>

<div
  v-motion
  :initial="{ y: 20, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 300, duration: 500 } }"
>

## Incremental data pipelines with CocoIndex

</div>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 1, transition: { delay: 600 } }"
  class="pt-12"
>
  <span class="px-2 py-1">
    Srihari Thyagarajan, Contributor @ CocoIndex
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/cocoindex-io/cocoindex" target="_blank" class="text-xl slidev-icon-btn">
    <carbon-logo-github />
  </a>
</div>

---
transition: fade-out
layout: two-cols
layoutClass: gap-8
---

# Introduction

<div class="text-lg mt-4">

**About me:**

- Technical Writer at Deepnote (previously marimo, doing dev-rel/advocacy)
- [Contributor to CocoIndex](https://github.com/cocoindex-io/cocoindex/pulls?q=author%3AHaleshot)
- Core volunteer at [SciPy India](https://scipy.in)
- Active attendee (in OSS communities in India)

</div>

::right::

<div class="flex justify-center items-start pt-16">
  <img src="/assets/srihari.jpg" class="rounded-full w-40 h-40 object-cover shadow-xl border-2 border-gray-600" />
</div>

---
layout: two-cols
layoutClass: gap-8
---

# CocoIndex

A data <span v-mark.underline.orange="1">transformation</span> framework with a Rust-powered engine and Python bindings.

<v-clicks>

- **Sources:** File systems, databases, APIs, message queues
- **Transformations:** Python functions with LLM components
- **Targets:** Vector DB, knowledge graph, data warehouse

</v-clicks>

::right::

<div class="mt-12">

**What makes it different:**

<v-clicks>

- <span v-mark.underline.orange="4">**Incremental**</span> - only processes what changed
- **Explainable** - you can trace every transformation
- **Self-evolving** - adapts when your schema or code changes

</v-clicks>

</div>

---

# What Can You Build With It?

When you have source data and want to keep a target **in sync** with it (after transformation), CocoIndex is a good fit.

<div class="mt-6">

| Scenario | Typical Targets |
|----------|-----------------|
| Knowledge graphs from docs | **graph DB** (what we'll demo) |
| Semantic search | vector DB, search index |
| ETL pipelines | data lake, data warehouse |
| Feature engineering | relational DB, data warehouse |
| Notifications / alerts | message queue, webhook |

</div>

<v-click>

<div class="mt-4 text-sm text-gray-400">
Today we'll focus on building a knowledge graph from meeting notes - my actual use case.
</div>

</v-click>

---

# The Problem: Scattered Meeting Notes

<div class="grid grid-cols-2 gap-6 mt-8">
  <v-click>
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div class="font-bold text-blue-400 mb-2">Google Drive</div>
      <div class="text-sm text-gray-300">SciPy India planning docs, dev-rel meeting notes, conference agendas...</div>
    </div>
  </v-click>
  <v-click>
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div class="font-bold text-green-400 mb-2">HackMD</div>
      <div class="text-sm text-gray-300">Collaborative notes, standup summaries, action items from calls...</div>
    </div>
  </v-click>
  <v-click>
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div class="font-bold text-purple-400 mb-2">Deepnote Workspace</div>
      <div class="text-sm text-gray-300">Integration docs, Pipecat notes, LangGraph experiments...</div>
    </div>
  </v-click>
  <v-click>
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div class="font-bold text-orange-400 mb-2">Chat Messages</div>
      <div class="text-sm text-gray-300">Quick decisions, TODOs mentioned in passing, scattered context...</div>
    </div>
  </v-click>
</div>

<v-click>
<div class="mt-6 text-center text-xl text-yellow-400">
No consistency. Hard to track what was decided weeks ago.
</div>
</v-click>

---

# The Simple Solution

<div class="grid grid-cols-2 gap-8">
<div>

**The task:** Index meeting notes for querying

```python {all|2-3|4-6|7-9|all}
input_drive = Drive.open(...)
for file in input_drive.list():
    content = file.read_text()
    for (offset, note) in split_into_meetings(content):
        parsed = parse_meeting_note_by_llm(note)
        OutputDB.upsert({
            "filename": file.name,
            "offset": offset,
            "time": parsed.time, ...})
```

</div>
<div>

<v-click>

**Plain and simple!**

<span class="text-green-500">+</span> Read files from cloud storage

<span class="text-green-500">+</span> Parse meeting notes

<span class="text-green-500">+</span> Insert into database

<div
  v-motion
  :initial="{ scale: 0.9, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { delay: 200, type: 'spring' } }"
  class="mt-4 text-2xl font-bold text-green-500"
>
Done in 1 hour!
</div>

</v-click>

</div>
</div>

---

# But how to catch up with new input?

<div class="text-center mt-12">

Set up a **cron job** to run the same code every hour...

<div
  v-motion
  :initial="{ rotate: -10, opacity: 0 }"
  :enter="{ rotate: 0, opacity: 1, transition: { type: 'spring' } }"
  class="text-8xl mt-8"
>
<carbon-time class="inline-block" />
</div>

<v-click>

<div
  v-motion
  :initial="{ y: 20, opacity: 0 }"
  :enter="{ y: 0, opacity: 1 }"
  class="mt-8 text-2xl text-red-400"
>
As input keeps growing, problems quickly emerge
</div>

</v-click>

</div>

---

# Problem 1: Growing Bill, Slower Run

<div class="flex items-center justify-center gap-4 mt-8">
  <div class="text-center p-4 bg-gray-800 rounded">
    <div class="text-4xl font-mono">5 docs</div>
    <div class="text-sm text-gray-400">quick</div>
  </div>
  <div class="text-2xl text-gray-500">→</div>
  <div class="text-center p-4 bg-gray-800 rounded">
    <div class="text-4xl font-mono">20 docs</div>
    <div class="text-sm text-gray-400">still okay</div>
  </div>
  <div class="text-2xl text-gray-500">→</div>
  <div class="text-center p-4 bg-gray-800 rounded">
    <div class="text-4xl font-mono">50 docs</div>
    <div class="text-sm text-gray-400">getting slow</div>
  </div>
  <div class="text-2xl text-gray-500">→</div>
  <div class="text-center p-4 bg-red-900/50 rounded border border-red-500">
    <div class="text-4xl font-mono">months of notes</div>
    <div class="text-sm text-red-400 font-bold">LLM bills add up</div>
  </div>
</div>

<v-click>

<div class="mt-12 text-center">

If I add **one new meeting note**, why reprocess everything?

<div class="mt-4 text-gray-400">
Task: Add a cache to reuse previous results...
</div>

</div>

</v-click>

---

# Problem 2: Ghost Data Lingered

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

<v-click>

**What's ghost data?**

Think of it like hidden state in Jupyter notebooks - you deleted the cell, but the variable still exists in memory. Ghost data is the database version: you renamed or deleted the source file, but orphaned records linger forever.

</v-click>

<v-click>

**File renamed:**

`SciPy_Planning.docx` → `SciPy_Planning_v2.docx`

</v-click>

</div>
<div>

<v-click>

| filename | offset | date |
|----------|--------|------|
| <span class="text-red-400 line-through">SciPy_Planning.docx</span> | 0 | 2025/03/03 |
| <span class="text-red-400 line-through">SciPy_Planning.docx</span> | 1200 | 2025/03/10 |
| SciPy_Planning_v2.docx | 0 | 2025/03/03 |
| SciPy_Planning_v2.docx | 1200 | 2025/03/10 |

</v-click>

<v-click>

<div class="mt-4 p-3 bg-red-900/30 rounded border border-red-500/50">
<span class="font-bold text-red-400">Ghost records remain!</span>
<div class="text-sm mt-1">Old entries pollute your queries...</div>
</div>

</v-click>

</div>
</div>

---

# Problem 2: It Gets Worse

<div class="mt-6">

<v-click>

**Content inserted mid-document?** All offsets shift. More ghost data.

</v-click>

<v-click>

**Someone reorganizes the shared GDrive folder?** Every filename changes.

</v-click>

<v-click>

**HackMD note gets merged into a master doc?** Duplicate entries everywhere.

</v-click>

</div>

<v-click>

<div class="mt-6 p-4 bg-amber-900/30 rounded-lg border border-amber-500/50">

When you have notes scattered across **GDrive, HackMD, Deepnote, and chat** - a single reorganization can cascade ghost data across your entire pipeline.

<div class="mt-2 text-sm text-gray-400">
The complexity of maintaining transformed output incrementally is easily overlooked... and very error-prone.
</div>

</div>

</v-click>

---

# Problem 3: Fixed-interval Schedule is Slow

<div class="mt-8">

You want to query your notes **immediately after the meeting ends**.

Why wait for hourly cron?

</div>

<v-click>

<div class="mt-8">

**Task:** Use event-driven task to subscribe to change streams...

- React on file added, modified, deleted
- Only process the changed file

<div class="mt-4 text-gray-400">
More complexity piling up...
</div>

</div>

</v-click>

---

# Core Business Logic

```python {all|1-3|4-6|7-9}
input_drive = Drive.open(...)
for file in input_drive.list():
    content = file.read_text()
    for (offset, note) in split_into_meetings(content):
        parsed = parse_meeting_note_by_llm(note)
        OutputDB.upsert({
            "filename": file.name,
            "offset": offset,
            "time": parsed.time, ...})
```

<v-click>

<div class="mt-8 text-center">

The code has all necessary information – **intuitively describes the business logic**.

<div class="mt-4 text-2xl font-bold text-orange-400">
But we're executing it in a naive way
</div>

</div>

</v-click>

---

# The Solution: Let the Engine Handle It

<div class="grid grid-cols-2 gap-8">
<div>

Your meeting notes pipeline stays **simple**. Write the transformation logic once - the engine keeps your knowledge graph in sync.

<v-clicks>

- Add a new meeting note? Only that file gets processed
- Rename a doc? Ghost records cleaned up automatically
- Change your extraction prompt? Engine re-runs affected entries

</v-clicks>

</div>
<div>

<v-click>

**What CocoIndex handles for you:**

<div class="space-y-2 mt-4">
  <div class="flex items-center gap-2">
    <span class="text-green-500 font-bold">+</span>
    <span>Change detection (Blake2b hashing)</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-green-500 font-bold">+</span>
    <span>Incremental updates</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-green-500 font-bold">+</span>
    <span>Ghost data cleanup</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-green-500 font-bold">+</span>
    <span>Schema evolution</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-green-500 font-bold">+</span>
    <span>Data lineage tracking</span>
  </div>
</div>

</v-click>

</div>
</div>

---
layout: center
class: text-center
---

# Live Demo

<div class="flex flex-col items-center justify-center mt-12">

<div
  v-motion
  :initial="{ scale: 0.8, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } }"
  class="text-8xl text-green-500"
>
<carbon-play-filled class="inline-block" />
</div>

<div
  v-motion
  :initial="{ y: 20, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 300 } }"
  class="mt-8 text-xl text-gray-400"
>

Meeting notes → Knowledge graph in Neo4j

</div>

</div>

---
layout: image-right
image: /assets/cocoindex-architecture.png
backgroundSize: contain
---

# Why Rust Powers the Engine

<v-clicks>

- **Long-running pipelines** need memory safety
- **No GC pauses** during continuous reconciliation
- **Compile-time** bug catching vs production failures
- **Type system** prevents state corruption

</v-clicks>

<v-click>

<div class="mt-8 p-4 bg-gray-800 rounded text-sm">

**Bottom line:** Data infrastructure needs reliability, performance, and tight control over resources. Rust delivers all three.

</div>

</v-click>

<div class="absolute bottom-4 left-4 text-xs text-gray-500">
Architecture diagram: zhihanz.github.io/posts/from-blobs-to-managed-context
</div>

---

# Python Writes It, Rust Runs It

CocoIndex uses the same **Rust-to-Python binding approach** as Polars, Pydantic v2, and DataFusion.

<v-clicks>

- You write normal Python (dataclasses, decorators)
- A Rust engine handles the heavy lifting
- Enabled by **PyO3** - Rust bindings as idiomatic Python objects
- CocoIndex codebase: **77.9% Rust**

</v-clicks>

<v-click>

<div class="mt-8 p-4 bg-gray-800 rounded text-sm">

This pattern treats your knowledge graph as a <span v-mark.underline.orange="6">**materialized view**</span> - precomputing expensive synthesis work once, then reusing it. The engine maintains a reconciliation loop, comparing fingerprints (Blake2b hashing) to decide what needs reprocessing.

</div>

</v-click>

<div class="absolute bottom-4 right-4 text-xs text-gray-500">
Materialized view concept: daft.ai/blog/knowledge-curation-not-search-is-the-big-data-problem-for-ai
</div>

---

# Rust + Python: Best of Both Worlds

<div class="grid grid-cols-2 gap-8 mt-6">
<div
  v-motion
  :initial="{ x: -50, opacity: 0 }"
  :enter="{ x: 0, opacity: 1, transition: { delay: 200 } }"
>

<div class="p-4 bg-orange-900/30 rounded-lg border border-orange-500/50">
<div class="font-bold text-orange-400 mb-3">Rust Engine handles:</div>

<v-clicks>

- Concurrent document processing
- Incremental state management
- Change detection <span class="text-gray-400">(Blake2b hashing)</span>
- Reconciliation loop
- Target lineage tracking

</v-clicks>

</div>

</div>
<div
  v-motion
  :initial="{ x: 50, opacity: 0 }"
  :enter="{ x: 0, opacity: 1, transition: { delay: 400 } }"
>

<div class="p-4 bg-blue-900/30 rounded-lg border border-blue-500/50">
<div class="font-bold text-blue-400 mb-3">Python API exposes:</div>

<v-clicks>

- Dataclasses for schemas
- Decorators for flows
- Familiar patterns
- Easy to learn
- Extensible transformations

</v-clicks>

</div>

</div>
</div>

<v-click>

<div class="mt-6 text-center p-3 bg-gray-800/50 rounded-lg">

This pattern is <span v-mark.circle.green="12">revolutionizing</span> Python devtools: **uv**, **Polars**, **Ruff**, **Pydantic v2**...

</div>

</v-click>

<div class="absolute bottom-4 right-4 text-xs text-gray-500">
Reference: thedataquarry.com/blog/rust-is-supercharging-python
</div>

---
layout: two-cols
layoutClass: gap-8
---

# Thanks!

<div class="text-xl mt-6">

**Star the repo:**

github.com/cocoindex-io/cocoindex

</div>

<div
  v-motion
  :initial="{ scale: 0.9, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { delay: 300 } }"
  class="mt-6"
>
<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com/cocoindex-io/cocoindex" class="rounded-lg" />
</div>

<div class="mt-4 text-gray-400">

GitHub: @Haleshot | Twitter: @hari_leo03

</div>

::right::

<div class="mt-10">

**References:**

- [Rust Ownership in CocoIndex](https://cocoindex.io/blogs/rust-ownership-access)
- [From Blobs to Managed Context](https://zhihanz.github.io/posts/from-blobs-to-managed-context)
- [Rust Supercharging Python](https://thedataquarry.com/blog/rust-is-supercharging-python)
- [Knowledge Curation for AI](https://www.daft.ai/blog/knowledge-curation-not-search-is-the-big-data-problem-for-ai)
- [PyO3 User Guide](https://pyo3.rs)

</div>
