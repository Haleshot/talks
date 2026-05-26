---
theme: seriph
layout: cover
title: Declare State, Not Messages
info: |
  A Kafka target connector for the unstructured world. Talk for the Chennai Apache Kafka meetup
  hosted by Confluent. We walk through CocoIndex's new Kafka target connector via a live
  CSV-to-Kafka demo, then unpack the declare_target_state mental model that makes it work.
colorSchema: light
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  sans: Inter
  serif: 'GT Sectra'
  mono: Fira Code
themeConfig:
  primary: '#BE5133'
---

<div class="coco-cover-wrap">

<div class="coco-cover-kicker">
  <span>Chennai Apache Kafka Meetup</span>
  <span class="coco-cover-kicker-sep">·</span>
  <span>Hosted by Confluent</span>
</div>

# Declare State,<br/><span class="accent">Not Messages</span>

<div class="coco-cover-sub">
A look at CocoIndex's new Kafka target connector, and the producer API that gave it its name.
</div>

<div class="coco-cover-presenter">
  <div class="coco-cover-presenter-label">PRESENTED BY</div>
  <div class="coco-cover-presenter-name">Srihari Thyagarajan</div>
</div>

</div>

<!--
Hello everyone, thanks for being here. Quick disclaimer: this is a Kafka meetup, but I'm not coming at it from the Kafka side. I'm coming at it from a Python framework called CocoIndex, which I contribute to in my evenings. That framework recently shipped a Kafka target connector, and the API it picked is what made me want to do this talk.

The title is literal. The producer side of this connector doesn't ask you which messages to send. It asks you what the topic should look like. Once you've described that, the framework figures out the upserts, the tombstones, and the no-ops on its own.

Over the next half hour, I'll walk you through why a producer would want to be shaped like that, what it looks like in code, and what flips when you go from one-shot reconciliation to a live pipeline.

Timing: 45s
-->

---
layout: center
title: Kafka already moves the structured half
---

<div class="text-2xl leading-relaxed max-w-3xl mx-auto text-left">
Kafka has always been great at moving the <span class="accent">structured</span> half of your data. Orders, clicks, CDC streams, telemetry.
</div>

<v-click>
<div class="mt-8 text-2xl leading-relaxed max-w-3xl mx-auto text-left">
The other half, your wikis, drives, repos, PDFs, has lived somewhere else: nightly batch jobs, vendor webhooks, scheduled re-indexers. <span class="accent-pink">A parallel universe</span> with none of Kafka's guarantees.
</div>
</v-click>

<v-click>
<div class="mt-8 text-xl leading-relaxed max-w-3xl mx-auto text-left" style="color: var(--coco-plum);">
The talk is about closing that gap. Same Kafka contract you already trust, now carrying the messy half too.
</div>
</v-click>

<!--
Most of you run Kafka for the easy half of your data. Orders, clicks, CDC off a primary database, telemetry, payment events. That data's regular, every event has a clear identity, and putting it on a log is an obvious win.

The other half your business runs on lives in messier places. Internal wikis, shared drives, Git repos, PDFs, design files. It changes constantly, it powers your AI features, search, compliance, dashboards, and almost nobody puts it on Kafka. It gets re-indexed in a nightly cron, or fanned out through one-off webhooks that every consumer reinvents.

This whole talk is about closing that gap. I'm not changing Kafka. Same wire protocol, same topics, same consumers. I just want to give the unstructured side a clean way to publish its changes onto the same log.

Timing: 60s
-->

---
title: Hi, I'm Srihari
---

<div class="coco-aboutme-grid">

<div>

# Hi, I'm Srihari

<div class="mt-6 text-base leading-relaxed space-y-4">

A career-long notebook person. Currently a Technical Writer at [Deepnote](https://deepnote.com), where I work on docs, integrations, and developer education. Before that, a [marimo](https://marimo.io) ambassador. Both notebook devtool companies, which says something about my taste.

Outside the day job, I contribute to [CocoIndex](https://github.com/cocoindex-io/cocoindex) (the framework this talk is about) and co-organize [SciPy India](https://scipy-india.github.io/) and [Write the Docs India](https://www.writethedocs.org/).

</div>

</div>

<div class="coco-aboutme-img-wrap">
  <div class="coco-aboutme-img-frame">
    <img src="https://github.com/Haleshot.png" alt="Srihari" />
  </div>
  <div class="coco-aboutme-caption">SRIHARI THYAGARAJAN</div>
  <div class="coco-aboutme-tagline">advocating, writing, and tinkering with the tools I use</div>
</div>

</div>

<!--
I'll keep this short, you came for Kafka, not my bio. Day job is technical writing at Deepnote, a collaborative notebook tool. Before that I was a marimo ambassador, another notebook tool. So I spend all day around notebooks, and I keep showing up to talks like this from the notebook side.

In the evenings I contribute to CocoIndex, the framework this talk is built around. I'm not on the core team, but I've been close enough to the Kafka connector work to walk you through it. I also co-organize SciPy India and Write the Docs India.

If you want to find me later, github.com/Haleshot is the best handle.

Timing: 40s
-->

---
title: About CocoIndex
---

# About <span class="accent">CocoIndex</span>

<div class="mt-6 coco-explainer max-w-3xl mx-auto">
An open-source Python framework for <strong>incremental data transformation</strong>, built for the derived data AI systems care about: chunks, embeddings, indexes, knowledge graphs. You define a flow once. CocoIndex watches the sources, recomputes only what changed, and keeps your targets in sync.
</div>

<div class="mt-7 grid grid-cols-3 gap-5 max-w-4xl mx-auto text-sm">

<v-clicks>

<div class="coco-card">
  <div class="coco-tag-terracotta">SOURCES</div>
  <div class="mt-3 font-semibold text-sm">The messy half</div>
  <div class="text-xs opacity-75 mt-1">Local folders, S3, Google Drive, Notion, GitHub.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-sage">TRANSFORMS</div>
  <div class="mt-3 font-semibold text-sm">Plain Python functions</div>
  <div class="text-xs opacity-75 mt-1">Parse, chunk, embed, derive. Memoized per input.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">TARGETS</div>
  <div class="mt-3 font-semibold text-sm">Vector DBs, Postgres, <em>Kafka</em></div>
  <div class="text-xs opacity-75 mt-1">One flow, many sinks, kept in sync from the same state.</div>
</div>

</v-clicks>

</div>

<div v-click class="mt-7 max-w-3xl mx-auto flex items-center gap-3 text-sm" style="color: var(--coco-plum);">
  <span class="coco-pill coco-pill-live" style="flex-shrink: 0;">NEW</span>
  <div>The <a href="https://cocoindex.io/docs/connectors/kafka/">Kafka target connector</a>, built on the official <code>confluent-kafka</code> Python client. Works against any Kafka-compatible broker.</div>
</div>

<!--
Most of you haven't seen CocoIndex before, so let me set it up. The one-liner: it's a Python framework for incremental data transformation. "Incremental" is the word that matters. It tracks the state of every source it knows about, and when something changes upstream, it works out exactly what derived data to recompute and which targets to update.

Easiest way to picture it is a spreadsheet for data pipelines. You write formulas, that's your transforms, you point them at cells, that's your sources, and CocoIndex keeps the dependency graph so the right cells recompute when their inputs change.

It's tuned for derived AI data, which is why you'll see chunks, embeddings, indexes, knowledge graphs all over the docs. That's the stuff that's expensive to recompute and worth tracking carefully.

Three building blocks. Sources: local folders, S3, Drive, Notion, GitHub, anything you can enumerate and watch for changes. Transforms: plain Python functions, memoized per input, so if a row hasn't changed the function doesn't rerun. Targets: vector DBs, Postgres, and now Kafka. One flow can write to several of them and keep them in sync.

And the Kafka target is the new piece. It's built on confluent-kafka, the official Python client, so it works with whatever broker you have, including Confluent Cloud or Platform. Nothing magical underneath.

Timing: 75s
-->

---
title: The plan
---

# The plan

<div class="mt-8 coco-agenda">

<div class="num">01</div>
<div class="item">
  The snapshot problem
  <span class="sub">Why agent stacks re-index on a cron, and what it costs.</span>
</div>

<div class="num">02</div>
<div class="item">
  The Kafka reframe
  <span class="sub">Bring the knowledge layer onto the same rail as operational data.</span>
</div>

<div class="num">03</div>
<div class="item">
  CocoIndex + Kafka
  <span class="sub">Why declarative, incremental, schema-aware fits this problem.</span>
</div>

<div class="num">04</div>
<div class="item">
  The demo: CSV to Kafka
  <span class="sub">The whole pipeline broken into its three real moves.</span>
</div>

<div class="num">05</div>
<div class="item">
  Live mode, then a live run
  <span class="sub">One flag flips batch to live. Then we watch it land on a real topic.</span>
</div>

</div>

<!--
Quick map of where we're going.

First two beats are framing. Why snapshot-based knowledge breaks, and what it looks like to treat unstructured data the way you already treat operational data.

Beat three is the pairing, why CocoIndex specifically, behind a Kafka producer, fits that reframe.

Beat four is the demo. About 60 lines of Python that watches a folder of CSVs and publishes change events to a topic. I'll break it into three moves: producer setup, the per-file processor, and the wiring.

Beat five is live mode. The same code goes from one-shot reconciliation to a continuously running pipeline with one keyword argument and one CLI flag, and then I'll tab out and run it for real: edit a CSV cell and watch a single message land on a live topic.

If we're running long, the demo's the part to lean on. The framing still works even if I skip it.

Timing: 30s
-->

---
layout: section
---

<div class="coco-mark-bl">01 · THE SNAPSHOT PROBLEM</div>

# A streaming-shaped problem,<br/>solved with <span class="accent">batch tools</span>

<!--
The reason this connector exists at all is that the way most teams handle knowledge updates today looks nothing like the way they handle operational events. Knowledge gets treated as a snapshot to re-read, not a stream of changes to react to. That mismatch is what the next few minutes are about.

Timing: 15s
-->

---

# Most agent stacks still re-index on a cron

<div class="mt-8 space-y-5 max-w-3xl text-left text-base leading-relaxed">

<v-clicks>

- The wiki gets re-embedded overnight.
- The codebase gets re-indexed on a schedule.
- The CRM gets re-pulled every few hours.
- Long-running agents read those snapshots over and over, hoping to notice when something shifted.

</v-clicks>

</div>

<v-click>
<div class="mt-10 max-w-3xl coco-card">
  <div class="font-semibold text-base">An agent that runs for hours is reading data that <span class="accent">drifted out of sync</span> within the first ten minutes.</div>
</div>
</v-click>

<!--
Look at what most teams actually do to feed knowledge into AI systems. The wiki gets re-embedded overnight. The codebase gets re-indexed daily. The CRM gets pulled every few hours. None of these are bad on their own, but they all share one shape: they're snapshots.

Now picture a long-running agent. Say it's drafting a quarterly report, or doing a multi-step investigation across docs. It reads from that index. At the start of the run the index is reasonably fresh. By the time the agent's on its fourth or fifth tool call, somebody's already edited the doc it quoted in step one. The agent has no idea. The retrieval layer has no idea. The answer's built on stale data and nobody flagged it.

That's the card at the bottom: the agent runs for hours, but the data it's reading drifted within the first ten minutes. Closing that gap is the whole point of this connector.

Timing: 75s
-->

---
layout: center
---

# The obvious next step:<br/>wire sources to consumers <span class="accent">directly</span>

<div class="mt-8 text-lg opacity-80 max-w-2xl mx-auto">
Point-to-point webhooks. Notion to indexer. GitHub to agent. Drive to search.
</div>

<v-click>
<div class="mt-10 text-xl italic max-w-2xl mx-auto">
This works, for exactly one consumer.
</div>
</v-click>

<!--
The obvious move, once you notice the snapshot problem, is to skip the snapshot entirely. Instead of re-indexing on a cron, wire each source straight to each consumer with a webhook. Notion fires when a page changes, the indexer updates. GitHub fires on push, the agent picks it up.

For one source and one consumer this is great. Latency drops from hours to seconds, and the work scales with what changed, not the size of the corpus.

The catch is right there on the slide: this works, for exactly one consumer. The second you've got two or three consumers that need the same change events, it starts to crack. That's the next slide.

Timing: 30s
-->

---
layout: full
title: Webhook trap diagram
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/webhook-trap.svg" class="max-h-full max-w-full" />
</div>

<!--
On the left, the sources: Notion, GitHub, Drive, a CRM. On the right, the consumers: an embedding indexer, a RAG agent, a search service, a compliance log. In the middle, nothing shared, just N times M direct webhook pipes connecting every source to every consumer.

And every one of those pipes has to reinvent the same things. Buffering when a source bursts faster than the consumer can keep up. Retries and dedup when a delivery fails halfway. A schema for what even counts as a change, that every consumer has to agree on. Replay logic for any new consumer that wants history.

None of that lives in a log. There's no thing in the middle holding the truth. Every pair of arrows is its own little broken broker, written by whoever was on call when that integration shipped.

And even if all four sources talk to all four consumers today, adding one more source or one more consumer means a whole new row or column of integrations to write and maintain.

Timing: 60s
-->

---

# What the webhook trap costs you

<div class="mt-8 grid grid-cols-2 gap-6 max-w-4xl text-left">

<v-clicks>

<div class="coco-card">
  <div class="font-semibold text-base">No shared replay or backfill</div>
  <div class="text-sm opacity-75 mt-2">A new consumer can't catch up on history. There's no log to read.</div>
</div>

<div class="coco-card">
  <div class="font-semibold text-base">No buffer for bursts</div>
  <div class="text-sm opacity-75 mt-2">When 10k Notion edits land at once, your indexer eats it directly.</div>
</div>

<div class="coco-card">
  <div class="font-semibold text-base">No shared "what's a change?"</div>
  <div class="text-sm opacity-75 mt-2">Every integration invents its own schema for renames, deletes, edits.</div>
</div>

<div class="coco-card">
  <div class="font-semibold text-base">N × M integrations</div>
  <div class="text-sm opacity-75 mt-2">Sources × consumers. Each pair re-implements the same broken machinery.</div>
</div>

</v-clicks>

</div>

<!--
Four costs here.

No shared replay or backfill. A consumer that comes online next month wants history. There's no log to read, just live webhooks going forward. Either the source has a backfill API, and most don't, or the new consumer goes without.

No buffer for bursts. Say ten thousand Notion edits land in five minutes because someone migrated a workspace. The indexer eats the whole burst directly. No upstream queue to absorb it, so you either over-provision or drop events.

No shared definition of a change. Every source has its own webhook payload shape, and every consumer translates it into its own model. A rename happens, one consumer calls it delete-plus-create, another calls it an update. Nobody has the authoritative answer.

And N times M integrations. This is the structural one. The number of glue paths grows with the product of sources and consumers, not the sum. Add a source, write M integrations. Add a consumer, write N.

If you've felt any of these, you already know why this talk exists.

Timing: 75s
-->

---
layout: section
---

<div class="coco-mark-bl">02 · THE KAFKA REFRAME</div>

# Treat the knowledge layer the same way<br/>we already treat <span class="accent">operational data</span>

<!--
The Kafka community already solved this, but only for the operational half. We've had log-shaped event distribution for orders, clicks, payments, CDC for over a decade. This connector is basically saying: take that exact playbook and point it at the messy half. Wikis, drives, repos, PDFs, the half your AI systems depend on. That's the reframe.

Timing: 20s
-->

---
layout: full
title: Snapshot vs change-event backbone
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/snapshot-related.svg" class="max-h-full max-w-full" />
</div>


<!--
Left side is the world most AI stacks live in today. Sources at the top, each feeding its own scheduled re-indexer, which writes into a snapshot store. Consumers read from snapshots. Those arrows are polling, not change. The clock icon is the only thing keeping any of it moving.

Right side is the world Kafka's been giving the operational half for years. Sources publish change events onto a log. The log's durable, ordered, shared. Multiple consumers subscribe to the same log. A new consumer can replay history because the log holds it. You add a consumer without touching a single source, and a source without touching a single consumer.

The talk in one sentence: this connector is what lets you take the left picture and replace it with the right one, without changing your broker, your consumers, or the contract between them.

Timing: 75s
-->

---

# What flips when knowledge runs through a log

<div class="mt-8 grid grid-cols-2 gap-5 max-w-5xl text-left">

<v-clicks>

<div class="coco-card">
  <div class="coco-tag-terracotta">FAN-OUT</div>
  <div class="mt-3 text-sm leading-relaxed">One commit, one rename, one Notion edit reaches every consumer that subscribes. The producer doesn't need to know about any of them.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-sage">FRESHNESS</div>
  <div class="mt-3 text-sm leading-relaxed">Embeddings and retrievals refresh <span class="accent">only</span> when something actually changed. No re-index of unchanged data.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">REPLAY</div>
  <div class="mt-3 text-sm leading-relaxed">A new consumer joins next quarter, subscribes to the topic, and gets history the same way it gets new events. No backfill scripts.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-terracotta">AUDIT</div>
  <div class="mt-3 text-sm leading-relaxed">Every change is durably recorded with offsets and timestamps. "Did the agent see this?" stops being a guess.</div>
</div>

</v-clicks>

</div>

<!--
Four properties you already trust from operational Kafka, now for knowledge data.

Fan-out. One source change, one Kafka message, every interested consumer gets it. The producer stays simple, the consumer side scales out without coordination.

Freshness. This is where it beats the cron pattern outright. You re-embed only the doc that changed, not the whole corpus. For most teams that's an order-of-magnitude saving on embedding cost, and the index is current within seconds.

Replay. This is the one webhooks can never give you. A new RAG service, a compliance tool, a Slack bot that wants every wiki edit since Q1, all of them subscribe and replay the topic from whatever offset they want. The history is just there.

Audit. Every change has an offset and a timestamp. So when someone asks "did the agent see this version of the doc when it answered?", you can give a real answer instead of a shrug.

These are the same four properties Kafka people already trust for the operational half. We're just claiming them for the knowledge half too.

Timing: 90s
-->

---
layout: section
---

<div class="coco-mark-bl">03 · COCOINDEX + KAFKA</div>

# Kafka stays <span class="accent">Kafka</span>

<div class="mt-6 text-xl max-w-2xl mx-auto" style="color: var(--coco-plum);">
Message in, message out. The wire model doesn't move.
</div>

<!--
Before I show any CocoIndex code, the reassurance: nothing on the broker side changes. No new wire protocol, no sidecar in front of the broker, no special schema registry layer. The producer sends Kafka messages with bytes and a key, the consumer reads Kafka messages with bytes and a key. Same partitioner, same log compaction, same offsets, same retention.

The new piece is only on the producer side. CocoIndex sits between your messy sources and the official Kafka client and gives the producer a shape that fits this kind of data. Everything downstream of the topic behaves like any Kafka topic.

Timing: 20s
-->

---
layout: full
title: Kafka message in message out
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/CocoIndex-Kafka.svg" class="max-h-full max-w-full" />
</div>

<!--
This is the big-picture one, and the rest of the talk is grounded here, so a minute on it.

Across the middle, a single Kafka topic. Unchanged. Same broker behavior you already trust.

Above it, the producer side. Structured sources, your operational database, an event-emitting service, have been publishing onto this kind of topic for years. That arrow's in every Kafka deployment.

Below it, the unstructured sources. Wikis, drives, repos, design files. Until recently those had no producer story. They lived behind cron-driven re-indexers and one-off webhooks. The arrow into the topic was just missing.

This connector adds that missing arrow. Same topic, same consumer side. The only new thing is the producer side of the messy half.

Timing: 60s
-->

---
layout: full
title: CocoIndex closes the unstructured gap
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/CocoIndex-Kafka-animation.svg" class="max-h-full max-w-full" />
</div>

<!--
Same diagram, animated. The one point I want to land: this slots in cleanly. Same brokers, same consumers, same wire protocol. CocoIndex is just a producer-side library between your messy sources and the official confluent-kafka client. From the topic's point of view, it can't tell a message from this connector apart from any other producer.

If you already run Kafka in production, adopting this changes nothing about how you operate the cluster. It's purely additive on the producer side.

Timing: 45s
-->

---

# Why CocoIndex fits behind Kafka

<div class="mt-8 grid grid-cols-2 gap-6 max-w-5xl text-left">

<div class="coco-card">
  <div class="coco-tag-terracotta">DECLARATIVE</div>
  <div class="font-semibold text-base mt-3">Define transformations like formulas</div>
  <div class="text-sm opacity-80 mt-2">"From this source, derive these messages." CocoIndex recomputes derived data when sources change, the same way a spreadsheet reacts to edits.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-sage">INCREMENTAL</div>
  <div class="font-semibold text-base mt-3">Only the deltas hit the wire</div>
  <div class="text-sm opacity-80 mt-2">Local state (checksums, primary keys, version markers) means subsequent runs push only what changed.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">SCHEMA-AWARE</div>
  <div class="font-semibold text-base mt-3">No ad-hoc topic bootstraps</div>
  <div class="text-sm opacity-80 mt-2">When upstream schemas shift, CocoIndex re-derives downstream messages. No bespoke migration scripts.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-terracotta">MULTI-SINK</div>
  <div class="font-semibold text-base mt-3">Kafka is one target, not the only one</div>
  <div class="text-sm opacity-80 mt-2">The same flow can feed a vector DB, Postgres, OpenSearch. Kafka events and downstream stores stay in sync from one definition.</div>
</div>

</div>

<!--
Four reasons CocoIndex is shaped right for the producer side.

Declarative. You don't write code that says "for this row, send a message." You write code that says "for this source, here's what the topic should look like," and the framework works out the messages. Same spreadsheet idea as before: you write formulas, it keeps the cells consistent. We'll hit the actual API in a minute.

Incremental. It keeps local state, checksums, primary keys, version markers, for every source row it's seen. Every run it knows exactly what changed and what didn't. Nothing changed, nothing hits the wire. One row changed, one message. That's what makes the producer side cheap.

Schema-aware. When an upstream schema shifts, the derived data gets re-derived from the new schema. No bespoke migration script, no manual replay. The flow definition is the schema-evolution path.

Multi-sink. Kafka's one target, but the same flow can write to a vector DB, Postgres, OpenSearch, all from one definition, all in sync because they're computed from the same state. I won't dwell on this, it's a follow-up topic, but I want you to know the option's there.

Timing: 90s
-->

---
layout: section
---

<div class="coco-mark-bl">04 · THE DEMO</div>

# Now, the actual code.

<div class="mt-6 text-xl max-w-3xl mx-auto text-center" style="color: var(--coco-plum);">
A folder of CSVs, a live Kafka topic, about <span class="accent">60 lines</span> of Python. Three moves: set up the producer, write the per-file processor, wire them together.
</div>

<!--
Everything up to here was framing. Why snapshots break, what the Kafka reframe looks like, why CocoIndex fits behind the producer. From here on it's code.

I picked the smallest end-to-end example the connector supports: a local folder of CSV files. The pipeline watches the folder, and for every row in every file it publishes one JSON message to a Kafka topic, keyed by the row's primary key.

About sixty lines total, and I'll break it into three steps. Producer setup, where we hand CocoIndex a Kafka client. The per-file processor, the only function in the whole thing that talks to Kafka. And the wiring, which says here's the folder, here's the processor, run them together.

Why it matters: even though it's CSVs, the same three moves cover PDFs, repos, wikis, anything in a folder.

Timing: 20s
-->

---
layout: full
title: CSV to Kafka high-level flow
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/CocoIndex-Kafka-high-level-flow.svg" class="max-h-full max-w-full" />
</div>

<!--
Quick orientation before the code, left to right.

On the left, a local folder with two CSV files. That's the source. Swap it for an S3 bucket or a GitHub repo and the rest of the pipeline doesn't change.

In the middle, the CocoIndex flow. It watches the folder, runs the per-file processor on each CSV, and turns the result into target-state declarations. Two arrows to notice: the dotted one back from CocoIndex's state store, which is what makes "did this file change?" cheap, and the diff arrow flowing out the right into the producer.

On the right, the official confluent-kafka client and the topic. CocoIndex hands the client the actual upserts and deletes, and the client puts Kafka messages on the wire.

Latency-wise: edit a row, save the file, and about a second later one JSON message shows up on the topic. That's the demo.

Timing: 45s
-->

---
title: The source data
---

# The source data

<div class="mt-3 text-sm max-w-3xl" style="color: var(--coco-plum);">
A CSV is the humblest unstructured asset there is: looks structured, lives like a dropped file. If this shape works for CSV, it also works for PDFs, wikis, repos.
</div>

<div class="mt-6 grid grid-cols-2 gap-6">

<div>
  <div><span class="coco-tag-plum">data/products.csv</span></div>

```csv
sku,name,category,price
SKU001,Wireless Mouse,Electronics,29.99
SKU002,Mechanical Keyboard,Electronics,89.99
SKU003,USB-C Hub,Accessories,45.00
```

</div>

<div>
  <div><span class="coco-tag-plum">data/employees.csv</span></div>

```csv
emp_id,first_name,last_name,department,email
E101,Alice,Chen,Engineering,alice.chen@example.com
E102,Bob,Smith,Marketing,bob.smith@example.com
```

</div>

</div>

<div class="mt-6 coco-card max-w-3xl">
  <div class="text-sm"><strong>First column is the primary key.</strong> Each row becomes one JSON message on the topic, keyed by that column. Different files, different schemas, all going to the same topic.</div>
</div>

<!--
Two files, and I made the schemas different on purpose, because that's the realistic case.

products.csv has four columns. First column is sku, the primary key, so row one becomes a Kafka message keyed by SKU001 with the rest of the row as the JSON value.

employees.csv has five columns. Primary key is emp_id, so E101 becomes the key.

The pipeline doesn't care that the two files have different schemas. They both land on the same topic, each row keyed by its own primary key. Downstream consumers can partition on the key, run log compaction, do everything they'd do with any other Kafka topic.

Why CSV? Because it's the format every team has, nobody really respects, and always ends up in a shared folder nobody owns. If we can turn that into a clean Kafka feed, we can do it for anything.

Timing: 60s
-->

---

# Step 1. Set up the producer once

<div class="mt-3 text-sm" style="color: var(--coco-plum);">
A lifespan hook owns the <code>AIOProducer</code>. A <code>ContextKey</code> hands it to the rest of the pipeline without threading it through every function.
</div>

```python {all|1-3|5|7-15}
import cocoindex as coco
from cocoindex.connectors import kafka, localfs
from confluent_kafka.aio import AIOProducer

KAFKA_PRODUCER = coco.ContextKey[AIOProducer]("kafka_producer", tracked=False)

@coco.lifespan
async def coco_lifespan(builder: coco.EnvironmentBuilder):
    config = {
        "bootstrap.servers": KAFKA_BOOTSTRAP_SERVERS,
        "sasl.mechanism": "PLAIN",
        "security.protocol": "SASL_SSL",
        "sasl.username": KAFKA_SASL_USERNAME,
        "sasl.password": KAFKA_SASL_PASSWORD,
    }
    producer = AIOProducer(config)
    builder.provide(KAFKA_PRODUCER, producer)
    yield
```

<div class="mt-4 flex items-start gap-3 text-sm">
  <span class="coco-tag-terracotta" style="min-width: 88px; text-align: center;">CONFLUENT</span>
  <div style="color: var(--coco-plum);">That import is the official <code>confluent-kafka</code> Python client. The connector is a thin layer on top of it, so anything that talks to a Confluent broker works here too.</div>
</div>

<div class="mt-3 text-sm" style="color: var(--coco-muted);">
SASL block is for any managed broker. For local Kafka, drop those four lines and point at <code>localhost:9092</code>.
</div>

<!--
Three things in this block, and the highlights step through them.

First, the imports. cocoindex is the framework. cocoindex.connectors gives you kafka and localfs, the two connectors this demo uses. Then AIOProducer from confluent_kafka.aio, the official Confluent client, async flavour, the thing most of you already know. The connector really is a thin layer on top of it.

Second, the ContextKey line. It's a typed slot for sharing the Kafka producer across the flow. Without it you'd thread the producer through every function. With it, you fill the slot once in the lifespan, and anything in the flow asks the framework for the producer by key.

Third, the lifespan function. Runs once at startup. Builds the producer config, bootstrap, SASL if you're on a managed broker, blank for localhost, constructs the AIOProducer, and registers it under the ContextKey. The yield keeps it alive for the life of the app.

That SASL block is what you'd use against any managed broker. For local Kafka, drop those four lines and point bootstrap.servers at localhost:9092. Otherwise the code's identical.

Timing: 75s
-->

---

# Step 2. Per-file processor

```python {all|1-2|3-4|6-8|10-14}
@coco.fn(memo=True)
async def process_csv(file: FileLike, topic_target: kafka.KafkaTopicTarget) -> None:
    text = await file.read_text()
    reader = csv.DictReader(io.StringIO(text))

    headers = reader.fieldnames
    if not headers:
        return
    first_col = headers[0]

    for row in reader:
        key_value = row.get(first_col)
        if key_value is not None:
            value = json.dumps(row)
            topic_target.declare_target_state(key=key_value, value=value)
```

<div class="mt-4 text-sm opacity-80">
<code>@coco.fn(memo=True)</code> means: if the file's contents haven't changed, this function doesn't run.
</div>

<!--
This is the only function in the whole pipeline that touches Kafka, and the highlights match the beats.

The decorator, coco.fn with memo=True. CocoIndex remembers the inputs to this function. If the file's contents haven't changed since last run, it doesn't even call it. That's where the per-file incremental behavior comes from.

The signature takes a FileLike, a handle to one CSV, and a topic_target, the Kafka topic handle. Returns nothing. The side effect is the point.

The parse: read the text, hand it to csv.DictReader, grab the headers, bail early if the file's empty. First column is the primary key.

The loop: for each row, grab the primary key value, dump the rest as JSON, and then the interesting line, topic_target.declare_target_state, key and value.

Notice what we're not calling. Not producer.send, not topic.publish. We're saying "for this key, the desired state on the topic is this value." We're not telling the framework to send anything right now. That distinction is the whole next slide.

Timing: 90s
-->

---
layout: center
title: The API isn't send, it's declare
transition: slide-up
---

<div class="text-4xl font-bold text-center">
<code v-mark.crossed-off="1">send_message</code>
</div>

<v-click at="2">
<div class="mt-10 text-4xl font-bold text-center" style="color: var(--coco-ink);">
<span v-mark.underline="3" class="accent" style="font-family: 'Fira Code', monospace;">declare_target_state</span>
</div>
</v-click>

<v-click at="4">
<div class="mt-10 text-xl max-w-3xl mx-auto text-center" style="color: var(--coco-plum);">
You describe what the topic <em>should look like</em> for each key. The producer figures out the rest.
</div>
</v-click>

<v-click at="5">
<div class="mt-3 text-sm text-center" style="color: var(--coco-muted);">
The same shape you already use when you're not thinking about Kafka:
</div>

<div class="coco-patterns">
  <div class="coco-pattern-chip">spreadsheet cell <span class="equals">=</span> formula</div>
  <div class="coco-pattern-chip">React component <span class="equals">=</span> props</div>
  <div class="coco-pattern-chip">SQL view <span class="equals">=</span> query</div>
  <div class="coco-pattern-chip">k8s manifest <span class="equals">=</span> desired state</div>
  <div class="coco-pattern-chip">Terraform plan <span class="equals">=</span> resource</div>
</div>
</v-click>

<!--
This is the moment the title pays off, so I'll let it breathe.

First, send_message gets crossed out. That's the API every Kafka tutorial opens with, and it's not what we have here. Then declare_target_state shows up. Different word, different model.

In plain English: you describe what the topic should look like for each key, and the producer figures out which messages to send to make the topic match. You never call anything that looks like send. You only ever say "for this key, the value should be this."

And here's the part I really want to land. This isn't a CocoIndex idea. It's the same model that runs the rest of your day. A spreadsheet cell holds a formula, the sheet decides when to recompute. A React component takes props, React decides what DOM ops to run. A SQL view holds a query, the database figures out the rows. A Kubernetes manifest holds desired state, the controller figures out what to spawn. Terraform takes a plan, the engine figures out what to create or destroy.

The Kafka producer in CocoIndex picks the same pattern. You describe the target, the framework owns the transitions, and those transitions are what become Kafka messages, or sometimes no message at all.

If you take one thing from this talk, take this slide.

Timing: 90s
-->

---

# State transitions become wire ops

<div class="mt-6 space-y-4 max-w-4xl text-left">

<v-clicks>

<div class="coco-card flex items-center gap-5">
  <div class="coco-tag-sage min-w-[100px] text-center">UPSERT</div>
  <div class="text-sm">
    Key is new, <em>or</em> value differs from what was last sent for that key.<br/>
    Wire op: <code>(k, v)</code> on the topic.
  </div>
</div>

<div class="coco-card flex items-center gap-5">
  <div class="coco-tag-terracotta min-w-[100px] text-center">DELETE</div>
  <div class="text-sm">
    Key was declared before, isn't declared this run.<br/>
    Wire op: <code>(k, None)</code>, or <code>(k, deletion_value_fn(k))</code> if you supplied a tombstone.
  </div>
</div>

<div class="coco-card flex items-center gap-5">
  <div class="coco-tag-plum min-w-[100px] text-center">NO-OP</div>
  <div class="text-sm">
    Key was declared before with the <em>same</em> value.<br/>
    Wire op: nothing. No message, no broker round-trip, no consumer wakeup.
  </div>
</div>

</v-clicks>

</div>

<!--
Three things can happen on the wire.

Upsert. Either the key's new, or the value differs from what was last sent for that key. Result: one Kafka message with that key and value. Standard producer behavior.

Delete. The key was declared in a previous run but isn't declared now. Maybe the row was removed from the CSV, maybe the whole file's gone. The framework notices the absence and sends a tombstone, a message with a null value keyed by the missing key. Or, if you gave it a deletion_value_fn, it calls that to build the value. Either way, one message.

No-op. The key was declared before with the same value, and again with the same value. Nothing hits the wire. No broker round-trip, no consumer wakeup.

Why this matters: the same process_csv function works on the first run, the hundredth run, after edits, after deletes, after a crash. There's no separate initial-load path, no special "we changed our minds" code. You write one function for all of it, and the framework's state tracking does the diff.

This also lines up cleanly with log compaction. Tombstones for deletes, upserts for changes, same key partitioning, all the things a Kafka consumer already expects from a well-behaved producer.

Timing: 90s
-->

---

# Step 3. Wire it together

```python {all|2|4-8|9|11}
@coco.fn
async def app_main() -> None:
    topic_target = await kafka.mount_kafka_topic_target(KAFKA_PRODUCER, KAFKA_TOPIC)

    files = localfs.walk_dir(
        localfs.FilePath(path="./data"),
        path_matcher=PatternFilePathMatcher(included_patterns=["**/*.csv"]),
        live=True,
    )
    await coco.mount_each(process_csv, files.items(), topic_target)

app = coco.App(coco.AppConfig(name="CsvToKafka"), app_main)
```

<div class="mt-6 grid grid-cols-2 gap-6 text-sm">
  <div>
    <div class="coco-tag-terracotta">topic_target</div>
    <div class="mt-2 opacity-80">Resolves the producer from the context key. CocoIndex never creates or deletes topics, you bring your own.</div>
  </div>
  <div>
    <div class="coco-tag-sage">live=True</div>
    <div class="mt-2 opacity-80">Turns the directory walker into a watcher. Initial scan, then filesystem events drive incremental updates.</div>
  </div>
</div>

<!--
Wiring. The whole thing's about ten lines, and the highlights walk through them.

First interesting line, mount_kafka_topic_target. Takes the ContextKey we registered in the lifespan, looks up the producer, and gives back a topic handle the processor knows how to write to. CocoIndex never creates or deletes topics, you bring your own. The handle's just a typed wrapper around the producer plus the topic name.

walk_dir is the source side. Point it at the data folder, give it a glob, and tell it whether to watch. live=True is the flag I'll come back to in the next section. With it, walk_dir does an initial scan plus subscribes to filesystem events.

Then mount_each, the orchestrator. "For every file the source produces, run process_csv with topic_target as the second argument." The framework handles the dependency tracking from there.

Last line, wrap it in an App and you're done. That's the pipeline. A dozen lines of glue, and the processor was maybe twenty more.

Timing: 75s
-->

---
layout: section
---

<div class="coco-mark-bl">05 · LIVE MODE</div>

# One flag flips it<br/>from <span class="accent">catch-up</span> to <span class="accent-sage">live</span>

<!--
One thing I want to flag before the next slide. Most teams I talk to expect "going live" to be a totally separate code path. A whole streaming pipeline running parallel to the batch one, that they have to keep in sync. Different file, different runtime, different deploy.

That's not what happens here. The same code that does a one-shot reconciliation also runs as a continuously running pipeline. The diff is one keyword argument and one CLI flag. Next slide shows exactly that.

Timing: 15s
-->

---

# The entire diff between batch and live

````md magic-move {lines: true}
```python
# catch-up: scan once, reconcile, exit
files = localfs.walk_dir(
    localfs.FilePath(path="./data"),
    path_matcher=PatternFilePathMatcher(included_patterns=["**/*.csv"]),
)
await coco.mount_each(process_csv, files.items(), topic_target)
```

```python {4}
# live: same scan, then keep watching
files = localfs.walk_dir(
    localfs.FilePath(path="./data"),
    path_matcher=PatternFilePathMatcher(included_patterns=["**/*.csv"]),
    live=True,
)
await coco.mount_each(process_csv, files.items(), topic_target)
```
````

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="coco-card">
    <div class="coco-tag-plum">CATCH-UP</div>
    <div class="mt-2 font-mono text-xs">cocoindex update main.py</div>
  </div>
  <div class="coco-card">
    <div class="coco-tag-sage">LIVE</div>
    <div class="mt-2 font-mono text-xs">cocoindex update -L main.py</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-75 max-w-2xl">
<code>process_csv</code> doesn't change. The Kafka target doesn't change. There's no separate "streaming" code path to maintain.
</div>

<!--
These two blocks are the same function, one without live=True, one with, and the animation shows you exactly which line moved.

First block is catch-up. Scan the folder once, run the processor on every file, reconcile against the state store, push whatever upserts and deletes fall out, exit. This is what you'd run as a cron or a backfill.

Second block adds live=True to walk_dir. That's it, one keyword argument. It still scans once at startup, but now it stays alive and subscribes to filesystem events. Save the CSV, the watcher fires, the processor runs on just that file, and the wire ops fall out.

Below the code, the two CLI calls. Same script. cocoindex update runs catch-up, cocoindex update -L runs live. process_csv doesn't change, the Kafka target doesn't change, there's no second streaming version of the code to keep in sync.

This is the second big moment after declare_target_state, and the reason I make a point of it is that "same code, one flag" is unusual. Most stacks treat live and batch as two pipelines.

Timing: 75s
-->

---

# What the flag does, and doesn't

<div class="mt-8 space-y-4 max-w-4xl text-left">

<v-clicks>

<div class="coco-card">
  <div class="coco-tag-sage">DOES</div>
  <div class="text-sm mt-2">Tells the runtime to keep the app alive after the first scan, so the watcher's events have something to drive.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">DOES NOT</div>
  <div class="text-sm mt-2">Change what reconciliation means. Same delta computation, same internal state store, same wire ops.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">DOES NOT</div>
  <div class="text-sm mt-2">Add a streaming code path. The watching half lives in the source (<code>live=True</code>), not in the flag.</div>
</div>

</v-clicks>

</div>

<div v-click class="mt-8 max-w-3xl">
<div class="text-sm italic opacity-80">
State store survives restarts. The next run picks up where the last one stopped, anchored to the <code>ContextKey</code> and topic name (not credentials or endpoint).
</div>
</div>

<!--
Three quick beats.

What it does: tells the runtime to keep the app alive after the first scan, so the watcher's events have something to drive. Without it, the runtime exits the moment reconciliation's done.

What it doesn't do: change what reconciliation means. Same delta computation, same internal state store, same wire ops. The first scan in live mode runs the exact same logic as a one-shot run.

What it also doesn't do: add a streaming code path. The watching half lives in the source, in the live=True on walk_dir, not in the flag. The flag just keeps the process alive long enough for the watcher to fire.

Last thing: the state store survives restarts. The next run, catch-up or live, picks up where the last one left off. That state's anchored to the ContextKey and the topic name, not to credentials or endpoint, so you can rotate a Kafka password without the framework thinking every key is new.

Timing: 75s
-->

---

# What lands on the topic

<div class="mt-6 grid grid-cols-2 gap-8 max-w-5xl">

<div>
  <div class="coco-tag-terracotta">EDIT ONE CELL</div>
  <div class="mt-3 text-sm opacity-85">One message for that one row. The other four rows stay silent.</div>
</div>

<div>
  <div class="coco-tag-sage">ADD A ROW</div>
  <div class="mt-3 text-sm opacity-85">One new upsert message.</div>
</div>

<div>
  <div class="coco-tag-plum">DELETE A ROW</div>
  <div class="mt-3 text-sm opacity-85">One delete message. No value, unless a tombstone constructor is supplied.</div>
</div>

<div>
  <div class="coco-tag-terracotta">DROP A NEW CSV FILE</div>
  <div class="mt-3 text-sm opacity-85"><code>process_csv</code> runs once. Each row becomes a message.</div>
</div>

<div>
  <div class="coco-tag-plum">DELETE A CSV FILE</div>
  <div class="mt-3 text-sm opacity-85">Every row from it gets a delete message.</div>
</div>

<div>
  <div class="coco-tag-sage">RESTART THE PIPELINE</div>
  <div class="mt-3 text-sm opacity-85">Nothing replays. The state store remembers.</div>
</div>

</div>

<div class="mt-10 coco-foot max-w-2xl">
Keys hash to partitions via Kafka's default partitioner. Same key, same partition. Log compaction and key-based consumers behave the way they would with any hand-rolled producer.
</div>

<!--
This is the menu for the live run I'm about to do. Six scenarios, and I'll show you a couple of them for real in a second.

Edit one cell. The processor runs on just that file, the delta is just that row, exactly one message hits the topic. The other rows stay silent, the other CSV stays silent.

Add a row. One upsert for the new key.

Delete a row. One tombstone, null value, keyed by the row that disappeared. Or a custom payload if you wired up deletion_value_fn, handy for consumers that want a soft-delete marker.

Drop a new CSV file. The watcher fires, process_csv runs on it, every row becomes a message.

Delete a CSV file. Every row that came from it gets a delete. From the topic's view, those keys are gone.

Restart the pipeline. Nothing replays. The state store remembers every key it's published, so nothing gets re-emitted just because the process bounced.

The footnote's for the Kafka folks: keys hash to partitions via the default partitioner, so same key, same partition. Log compaction works exactly like it does for any producer, key-based consumers behave normally. Nothing weird under the hood.

Timing: 75s
-->

---
layout: center
title: Live demo
---

<div class="coco-demo-badge">▶ LIVE DEMO</div>

# Local CSV → live watcher → <span class="accent">Kafka topic</span>

<div class="mt-8 grid grid-cols-3 gap-5 max-w-5xl mx-auto text-left text-sm">

<div class="coco-card">
  <div class="coco-tag-terracotta">BROKER</div>
  <div class="mt-3 font-mono text-xs">local-kafka · :9092</div>
  <div class="text-xs opacity-75 mt-2">One Docker container, one topic. The thing everything lands on.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-sage">CONSUMER</div>
  <div class="mt-3 font-mono text-xs">kafka-console-consumer</div>
  <div class="text-xs opacity-75 mt-2">Parked at the end of the topic. Silent until a record arrives.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">WATCHER</div>
  <div class="mt-3 font-mono text-xs">cocoindex update -L</div>
  <div class="text-xs opacity-75 mt-2">Scans once, then sits on <em>Watching for changes…</em></div>
</div>

</div>

<div class="mt-8 text-sm max-w-3xl mx-auto" style="color: var(--coco-plum);">
About as small as it gets: one broker, one topic, a few rows of CSV. I'm keeping it tiny so you can actually watch it happen. The same idea holds at any size, because I just change a file, and CocoIndex works out what's different and sends only that.
</div>

<!--
Okay, slides down for a minute. Let me tab over to my terminal and spin this up live, it'll be quick.

Quick tour of my setup so you know what you're looking at. Three terminals. The first is just Docker running a little Kafka broker on my laptop, it's called local-kafka, on port 9092. The second is a console consumer pointed at our topic. It's going to look frozen, and that's fine, it's just parked at the end of the topic waiting for something new to arrive. The third is CocoIndex in live mode, cocoindex update -L. It does one scan of the data folder when it starts, then prints "Watching for changes" and sits there.

Now the fun part. I'll open products.csv, add a row, and save. Watch the CocoIndex window, it'll say it reprocessed one file. Watch the consumer, one JSON message pops out. Then I'll delete that row and you'll see the delete go through too.

And keep an eye on what I'm not doing here. I'm never calling a send function, never pushing a message. I'm literally editing a file and hitting save. CocoIndex notices the change and handles the rest.

If anything goes sideways with the live setup, no stress, the next slide has the exact output, so I'll just walk you through it.

Timing: 150s
-->

---
title: What just happened
---

# I didn't send a message.<br/>I <span class="accent">edited state</span>.

<div class="mt-6 grid grid-cols-2 gap-6 max-w-5xl text-left text-sm">

<div>
  <div><span class="coco-tag-plum">cocoindex update -L</span></div>

```text
✅ process_csv: 1 total | 1 reprocessed
⏳ Ready | Watching for changes...
```

  <div class="text-xs opacity-75 mt-2">One file changed, one function reran. Every other row was a no-op.</div>
</div>

<div>
  <div><span class="coco-tag-sage">kafka-console-consumer</span></div>

```json
{"sku": "SKU999", "name": "Test Item",
 "category": "Test", "price": "1.23"}
```

  <div class="text-xs opacity-75 mt-2">One record on the topic. The offset moved by one.</div>
</div>

</div>

<div class="mt-8 coco-card max-w-3xl">
  <div class="text-sm">I never called <code>send</code>. I edited a CSV cell. CocoIndex diffed the desired state against what it had already declared for that key, and the producer emitted the single message that changed. The unchanged rows: nothing on the wire.</div>
</div>

<!--
Back to slides. So what did we just watch, and why am I making a big deal of it?

Two windows. On the left, CocoIndex told us it reprocessed exactly one file, the one I touched. Everything else it skipped, because nothing about those rows changed. On the right, the Kafka consumer, and one message showed up. That's the row I edited.

Now this line, "I didn't send a message, I edited state." Here's what I mean by it. At no point did I write code that says "send this message to Kafka." I changed what I wanted that row to look like, in the CSV, and saved. CocoIndex was already holding what it had published for that key, compared it to the new version, saw one difference, and produced one message to cover it. If I'd saved the file without actually changing anything, nothing would've gone out at all.

That's the declare_target_state idea from earlier, except now you've seen it run on a real topic. Same code as the batch version, one flag to go live, and I never had to keep track of what to send.

Timing: 45s
-->

---
layout: section
---

<div class="coco-mark-bl">06 · WHERE THIS GOES</div>

# CSV is the warm-up.<br/>The same shape carries <span class="accent">PDFs, repos, wikis</span>.

<!--
CSV was deliberately the simplest case I could pick. Every team has CSVs, the schema's trivial, nothing distracts from the connector itself.

But the same three moves cover almost anything else you'd put on a topic from the unstructured side. PDF chunks for a RAG pipeline. Markdown from a docs repo. Issue updates from a tracker. Notion pages, once you swap localfs for the Notion source. Anything with a primary key and a way to enumerate items.

The producer side generalizes. That's the last thing I want you holding before the takeaways.

Timing: 20s
-->

---

# Try it

<div class="mt-6 text-sm opacity-80">
The Kafka connector ships as an optional dependency group.
</div>

```bash
git clone https://github.com/cocoindex-io/cocoindex
cd cocoindex/examples/csv_to_kafka
cp .env.example .env  # fill in your Kafka bootstrap + SASL creds
pip install -e .
cocoindex update -L main.py
```

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="coco-card">
    <div class="coco-tag-sage">EXISTING PROJECT</div>
    <div class="mt-2 font-mono text-xs">pip install cocoindex[kafka]</div>
  </div>
  <div class="coco-card">
    <div class="coco-tag-terracotta">NO MANAGED BROKER?</div>
    <div class="mt-2 text-xs opacity-85">Point <code>KAFKA_BOOTSTRAP_SERVERS</code> at <code>localhost:9092</code>, leave SASL blank.</div>
  </div>
</div>

<div class="mt-10 coco-foot">
Blog post and full source: <a href="https://cocoindex.io/blogs/csv-to-kafka-live/">https://cocoindex.io/blogs/csv-to-kafka-live/</a>
</div>

<!--
If you want to try this tonight, here's everything you need.

Top block, five commands. Clone the CocoIndex repo, cd into the csv_to_kafka example, copy the env template and fill in your bootstrap and SASL creds, pip install, run with the live flag. Five lines, working pipeline.

Bottom row, two callouts. Existing project: bolt the connector into a CocoIndex project you already have with pip install cocoindex[kafka]. No managed broker: point bootstrap.servers at localhost:9092, leave SASL blank, same code works.

The link at the bottom goes to the repo, where the blog post and the full source sit side by side.

Timing: 45s
-->

---
layout: center
title: Wrapping up
---

# Why I think this matters,<br/>beyond my CSV demo

<div class="mt-10 space-y-6 max-w-3xl mx-auto text-left">

<v-clicks>

<div class="flex items-start gap-5">
  <div class="coco-pill mt-1">01</div>
  <div class="text-base">My demo was CSV to Kafka. Yours might be PDFs to Postgres, design files to OpenSearch, repos to a vector DB. <span class="accent">Same three moves.</span> Whatever lives in the messy half of your data belongs on the same Kafka rail as the structured half.</div>
</div>

<div class="flex items-start gap-5">
  <div class="coco-pill mt-1">02</div>
  <div class="text-base">A state-shaped producer API is not unique to CocoIndex. If you've ever felt allergic to <code>send()</code> in a pipeline, that hunch is worth following.</div>
</div>

<div class="flex items-start gap-5">
  <div class="coco-pill mt-1">03</div>
  <div class="text-base">One code path for batch and live is a real option, not just a slogan. The connector is one example. The shape applies to other producer-side tooling too.</div>
</div>

</v-clicks>

</div>

<!--
Wrapping up, and I'll be direct since we're short on time.

My use case was CSV files in a folder, a Kafka topic on the other side, agents and search downstream. That's the demo I built and the one this talk's built around.

But the reason it's worth bringing to a Kafka room is that almost nothing about it is CSV-specific. PDFs going into a Postgres pgvector table for RAG, same three moves. Design files in Figma that an internal search needs, same three moves. A vector DB kept in sync with a Git repo, same three moves. The source and the target change, the shape of the producer side doesn't.

Second thing: the state-shaped producer API isn't a CocoIndex invention. The team borrowed it from spreadsheets, React, k8s, the things we talked about. If you've ever felt off about a pipeline that made you call send and remember whether you'd already sent that key, that hunch is exactly what this API resolves. So even if you never touch CocoIndex, the API shape is worth looking for in other tooling.

Third: same-code-batch-and-live is a real option, not a slogan. Most teams treat batch and streaming as two pipelines that have to stay in sync. This connector's a counter-example, and if you're building producer-side tooling yourself, it's worth knowing it can be done.

Timing: 75s
-->

---
layout: end
title: Thanks
---

<img src="/cocoindex-avatar.svg" class="coco-thanks-mark" alt="" />

<div class="coco-thanks-wrap">

<div class="coco-thanks-header">

# Thanks.

<div class="coco-thanks-sub">
Questions, opinions, war stories about webhook traps.
</div>

</div>

<div class="coco-thanks-spacer"></div>

<div class="coco-thanks-grid">

<div class="coco-thanks-card">
  <div class="coco-tag-terracotta">DEMO REPO</div>
  <div class="coco-thanks-link">github.com/cocoindex-io/cocoindex</div>
  <div class="coco-thanks-qr"><img src="/qrcode_github.com.png" alt="github.com/cocoindex-io/cocoindex QR" /></div>
</div>

<div class="coco-thanks-card">
  <div class="coco-tag-sage">KAFKA DOCS</div>
  <div class="coco-thanks-link">cocoindex.io/docs/connectors/kafka</div>
  <div class="coco-thanks-qr"><img src="/qrcode_cocoindex.io.png" alt="cocoindex.io docs QR" /></div>
</div>

<div class="coco-thanks-card">
  <div class="coco-tag-plum">FIND ME</div>
  <div class="coco-thanks-link">haleshot.github.io</div>
  <div class="coco-thanks-qr"><img src="/qrcode_haleshot.github.io.png" alt="haleshot.github.io QR" /></div>
</div>

</div>

</div>

<!--
Short close, then Q&A. Three QR codes if you want to follow up.

Demo repo is the GitHub repo with the full CSV-to-Kafka example, first link if you want to try it tonight. Kafka docs is the connector reference on cocoindex.io. And find me is my page, easiest way to reach me and where I'll respond to issues or pushback.

And honestly, if you want to push back on any of this, please do. That's the part I'm most interested in. Thanks for coming.

Timing: 30s
-->
