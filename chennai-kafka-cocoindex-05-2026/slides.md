---
theme: seriph
layout: cover
title: Declare State, Not Messages
info: |
  A Kafka target connector for the unstructured world. Talk for the Chennai Apache Kafka meetup
  hosted by Confluent. We walk through CocoIndex's new Kafka target connector via a live
  CSV-to-Kafka demo, then explain the declare_target_state model behind it.
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
A look at CocoIndex's Kafka target connector, and how file changes become keyed Kafka records.
</div>

<div class="coco-cover-presenter">
  <div class="coco-cover-presenter-label">PRESENTED BY</div>
  <div class="coco-cover-presenter-name">Srihari Thyagarajan</div>
</div>

</div>

<!--
Hey folks, I'm Srihari. Glad to be part of this meetup. My world, at work and outside it, is notebooks and Python (I came to Kafka recently). I pull data from a lot of sources through integrations and work with it once it has already landed. The engineering that moves data around and gets it onto a broker is not where I sit day to day.

So take this as a talk from the data-consumer side of the fence. The question I care about is how file-backed sources, docs, repos, exports, get into Kafka without every source and every consumer turning into its own integration project. CocoIndex's Kafka connector is the example I'll use. I'll start with why the snapshot and webhook habits get painful, then build a small CSV-to-Kafka pipeline and run it live.
-->

---
layout: center
title: Why I'm even up here
---

<div class="text-2xl leading-relaxed max-w-3xl mx-auto text-left">
Kafka already carries the predictable streams in your stack. Orders, clicks, CDC, telemetry.
</div>

<v-click>
<div class="mt-8 text-2xl leading-relaxed max-w-3xl mx-auto text-left">
The docs your agents read (wikis, drives, repos, PDFs) usually arrive through nightly cron jobs and one-off webhooks. <span class="accent-pink">No durable history, no replay, no clean audit trail.</span>
</div>
</v-click>

<v-click>
<div class="mt-8 text-xl leading-relaxed max-w-3xl mx-auto text-left" style="color: var(--coco-plum);">
This talk is about turning those sources into ordinary keyed Kafka records. Nothing about your broker changes.
</div>
</v-click>

<!--
Most Kafka deployments already have a clean story for operational data. Orders, clicks, payments, CDC feeds. Records have identity, changes are naturally event-shaped, and replay is part of the model.

The sources behind AI features are different. Wikis, shared drives, Git repos, PDFs, design files. They are edited constantly, but teams usually feed them to downstream systems through cron jobs or one-off webhooks. The gap this talk focuses on is the producer side: how those sources become keyed Kafka records without asking every consumer to invent its own sync path.
-->

---
title: Hi, I'm Srihari
---

<div class="coco-aboutme-grid">

<div>

# Hi, I'm Srihari

<div class="mt-6 text-base leading-relaxed space-y-4">

Technical Writer @ [Deepnote](https://deepnote.com), prev @ [marimo](https://marimo.io). Both notebook tools, so I'm usually thinking about Python and how people work with their data.

Outside work I contribute to [CocoIndex](https://github.com/cocoindex-io/cocoindex), the framework this talk is about, and help run [SciPy India](https://scipy-india.github.io/) and [Write the Docs India](https://www.writethedocs.org/).

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
My day job is technical writing at Deepnote, and before that I worked at marimo. Both are notebook tools, so I spend a lot of time around Python, data workflows, and the places where people expect state to stay understandable.

Outside work I contribute to CocoIndex, which is the framework behind the demo. I am not presenting this as a Kafka internals talk. I am looking at the producer boundary from the point of view of a Python data workflow that needs to stay in sync with Kafka.
-->

---
title: About CocoIndex
---

# About <span class="accent">CocoIndex</span>

<div class="mt-6 coco-explainer max-w-3xl mx-auto">
CocoIndex is an incremental data transformation framework: it tracks source items, runs Python transforms, and updates targets only for records whose inputs changed. Think spreadsheet-style dependency tracking for derived data.
</div>

<div class="mt-7 grid grid-cols-3 gap-5 max-w-4xl mx-auto text-sm">

<v-clicks>

<div class="coco-card">
  <div class="coco-tag-terracotta">SOURCES</div>
  <div class="mt-3 font-semibold text-sm">Where data lives</div>
  <div class="text-xs opacity-75 mt-1">Local folders, S3, Google Drive, Notion, GitHub.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-sage">TRANSFORMS</div>
  <div class="mt-3 font-semibold text-sm">Plain Python functions</div>
  <div class="text-xs opacity-75 mt-1">Parse, chunk, embed. Skipped when the input hasn't changed.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">TARGETS</div>
  <div class="mt-3 font-semibold text-sm">Where it ends up</div>
  <div class="text-xs opacity-75 mt-1">Vector DBs, Postgres, and now <em>Kafka</em>.</div>
</div>

</v-clicks>

</div>

<div v-click class="mt-7 max-w-3xl mx-auto flex items-center gap-3 text-sm" style="color: var(--coco-plum);">
  <span class="coco-pill coco-pill-live" style="flex-shrink: 0;">NEW</span>
  <div>The <a href="https://cocoindex.io/docs/connectors/kafka/">Kafka target connector</a>, built on Confluent's <code>confluent-kafka</code> Python client. The broker can be local Kafka, Confluent Cloud or Platform, or any Kafka-compatible endpoint.</div>
</div>

<!--
For this talk, the important thing about CocoIndex is dependency tracking. You point it at a source, write Python that turns each item into downstream data, and CocoIndex tracks which inputs produced which outputs. If one source item changes, only the dependent output reruns. If nothing changed, nothing reruns.

The model has three parts. Sources are folders, Drive, Notion, repos. Transforms are plain Python functions. Targets are where the derived data lands: vector databases, Postgres, and now Kafka. The Kafka target uses Confluent's `confluent-kafka` Python client, while the broker can be local Kafka, Confluent Cloud, Confluent Platform, or another Kafka-compatible endpoint.
-->

---
title: Agenda
---

# Agenda

<div class="mt-8 coco-agenda">

<div class="num">01</div>
<div class="item">
  Why snapshots fail for agent knowledge
  <span class="sub">Cron is simple until the consumer needs history.</span>
</div>

<div class="num">02</div>
<div class="item">
  What Kafka gives you that webhooks do not
  <span class="sub">Replay, buffering, fan-out, and an audit trail.</span>
</div>

<div class="num">03</div>
<div class="item">
  How CocoIndex declares topic state
  <span class="sub">The producer API is desired state, not send calls.</span>
</div>

<div class="num">04</div>
<div class="item">
  CSV to Kafka, line by line
  <span class="sub">Producer setup, row declarations, source wiring.</span>
</div>

<div class="num">05</div>
<div class="item">
  Live watcher, one file edit, one record
  <span class="sub">Same code path, then we watch it land on a topic.</span>
</div>

</div>

<!--
The first part is the failure mode. By snapshot here, I mean "read the current copy of the data on a schedule": re-embed the wiki at midnight, pull the CRM every few hours, scan the repo once a day. That is easy to set up, but it does not give consumers a durable record of what changed.

After that the talk becomes concrete. CocoIndex declares topic state instead of manually sending messages. The demo is a small CSV-to-Kafka pipeline, then the same pipeline in live mode against a local broker.
-->

---
layout: section
---

<div class="coco-mark-bl">01 · THE SNAPSHOT PROBLEM</div>

# Knowledge changes continuously.<br/>Most pipelines read it on a schedule.

<!--
Operational systems usually treat change as the primitive. Knowledge systems often treat the latest snapshot as the primitive. That is the mismatch this connector is trying to remove.

The next few slides stay on the problem before showing the connector, because the API makes more sense once the failure mode is visible.
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
These jobs are familiar because they are practical. Re-embed the wiki overnight. Re-index the codebase daily. Pull the CRM every few hours. Each one is reasonable in isolation, but the consumer sees a series of snapshots instead of a stream of changes.

For a long-running agent, that means the index can drift while the task is still in progress. It may quote a page, call another tool, and keep reasoning against the old version after somebody has already edited the source.
-->

---
layout: full
title: Webhook trap diagram
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/webhook-trap.svg" class="max-h-full max-w-full" />
</div>

<!--
The common reaction is to replace polling with direct webhooks. Notion fires on edit, the indexer updates. GitHub sends a webhook, the agent context refreshes. For one source and one consumer, that can be enough.

In the diagram, Notion is the source on the left and each orange box is a consumer: vector index, agent runtime, search backend, analytics. The pink arrows are point-to-point integrations. Each arrow carries a slightly different payload shape and repeats the same machinery: retries, dedup, queues, acknowledgements. The point is not that webhooks are bad; it is that every pair starts rebuilding pieces of a durable log.
-->

---

# The webhook trap

<div class="mt-8 max-w-4xl text-left">

<v-clicks>

<div class="grid grid-cols-[150px_1fr] gap-4 items-start border-b border-black/10 pb-4">
  <div class="font-semibold text-base">Replay</div>
  <div class="text-sm opacity-75">A new consumer can't catch up on history. There's no log to read.</div>
</div>

<div class="grid grid-cols-[150px_1fr] gap-4 items-start border-b border-black/10 py-4">
  <div class="font-semibold text-base">Bursts</div>
  <div class="text-sm opacity-75">10k Notion edits land at once, your indexer eats them directly.</div>
</div>

<div class="grid grid-cols-[150px_1fr] gap-4 items-start border-b border-black/10 py-4">
  <div class="font-semibold text-base">Change semantics</div>
  <div class="text-sm opacity-75">Every integration invents its own schema for renames, deletes, edits.</div>
</div>

<div class="grid grid-cols-[150px_1fr] gap-4 items-start pt-4">
  <div class="font-semibold text-base">Glue code</div>
  <div class="text-sm opacity-75">Each source-consumer pair re-implements buffering, retries, dedup, and backfill.</div>
</div>

</v-clicks>

</div>

<!--
The costs are the parts Kafka normally absorbs for us. A new consumer wants history, but webhooks only describe what happens after it subscribes. A burst lands all at once, and the consumer has to absorb it directly. A rename or delete happens, and every integration decides what that means.

The last row is the structural problem: the number of paths grows as sources times consumers. The more teams depend on the same knowledge sources, the more expensive this gets.
-->

---
layout: section
---

<div class="coco-mark-bl">02 · THE KAFKA REFRAME</div>

# Treat docs and repos<br/>like <span class="accent">event sources</span>

<!--
The Kafka part of the talk starts from a conservative claim. We do not need a new broker or a new consumer model for this. We need a producer that can turn document and repo changes into ordinary keyed records.
-->

---
layout: full
title: Snapshot vs change-event backbone
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/snapshot-related.svg" class="max-h-full max-w-full" />
</div>


<!--
The left side is snapshot-driven. Sources feed scheduled re-indexers, consumers read from whatever the latest snapshot store contains, and the clock is the mechanism that makes progress happen.

The right side is log-driven. Sources publish changes, the log keeps them durable and ordered, and consumers can join at different times without asking the sources to resend anything. The offsets and timestamps under the topic are the audit trail: they let you talk about which change a consumer saw, not just which cron run happened last.
-->

---

# What the log gives you

<div class="mt-8 max-w-5xl text-left">

<v-clicks>

<div class="grid grid-cols-[140px_1fr] gap-5 items-start border-b border-black/10 pb-4">
  <div class="coco-tag-terracotta">FAN-OUT</div>
  <div class="text-sm leading-relaxed">One commit, one rename, one Notion edit reaches every consumer that subscribes. The producer doesn't need to know they exist.</div>
</div>

<div class="grid grid-cols-[140px_1fr] gap-5 items-start border-b border-black/10 py-4">
  <div class="coco-tag-sage">FRESHNESS</div>
  <div class="text-sm leading-relaxed">Embeddings and retrievals refresh <span class="accent">only</span> when a source item changed. Unchanged data stays quiet.</div>
</div>

<div class="grid grid-cols-[140px_1fr] gap-5 items-start border-b border-black/10 py-4">
  <div class="coco-tag-plum">REPLAY</div>
  <div class="text-sm leading-relaxed">A new consumer joins next quarter, subscribes to the topic, gets history the same way it gets new events. No backfill scripts.</div>
</div>

<div class="grid grid-cols-[140px_1fr] gap-5 items-start pt-4">
  <div class="coco-tag-terracotta">AUDIT</div>
  <div class="text-sm leading-relaxed">Every change has an offset and a timestamp. "Did the agent see this?" stops being a guess.</div>
</div>

</v-clicks>

</div>

<!--
Fan-out means the producer does not need to know which systems will read the change later. Freshness means we stop reprocessing the whole corpus just because one document moved.

Replay is the sharpest difference from webhooks: a new service can join and read history. Audit is the operational payoff: if someone asks whether an agent saw a specific version, you can answer with an offset and timestamp instead of guessing from cron timing.
-->

---
layout: section
---

<div class="coco-mark-bl">03 · COCOINDEX + KAFKA</div>

# Your Kafka cluster<br/>doesn't change

<div class="mt-6 text-xl max-w-2xl mx-auto" style="color: var(--coco-plum);">
Same wire protocol, same consumers, same partitioner. The only new piece is on the producer side.
</div>

<!--
Before the code, it is important to narrow the scope. The connector is not asking Kafka to behave differently. There is no new wire protocol and no sidecar in the middle.

Consumers still see ordinary keyed Kafka records, with normal partitioning, retention, and compaction behavior. The new logic sits on the producer side, between the source system and the `confluent-kafka` client.
-->

---
layout: full
title: Kafka message in message out
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/CocoIndex-Kafka.svg" class="max-h-full max-w-full" />
</div>

<!--
This diagram has two lanes. The top lane is the Kafka world people already know: orders, clicks, telemetry, Postgres CDC flow into a topic log, then out to Flink, search, vector stores, and agent runtimes.

The bottom lane is the awkward part: meeting notes, codebases, PDFs, wikis, docs. They often sit behind SaaS webhooks, cron jobs, custom polling, and brittle ETL. CocoIndex's role is to turn that bottom lane into the top lane by producing normal keyed Kafka records from unstructured or file-backed sources.
-->

---
layout: section
---

<div class="coco-mark-bl">04 · THE DEMO</div>

# Build the producer

<div class="mt-6 text-xl max-w-3xl mx-auto text-center" style="color: var(--coco-plum);">
About <span class="accent">60 lines</span> of Python. A folder watching for changes, a Kafka topic on the other side.
</div>

<!--
The example is deliberately small: a local folder of CSV files. The pipeline reads each file, treats each row as a record, and publishes JSON to Kafka using the first column as the key.

The three code slides match the three responsibilities in the app: create the producer once, declare target state for each row, and mount the source to the target.
-->

---
layout: full
title: CSV to Kafka high-level flow
---

<div class="h-full w-full flex items-center justify-center bg-[#FBF6E8] p-4">
  <img src="/CocoIndex-Kafka-high-level-flow.svg" class="max-h-full max-w-full" />
</div>

<!--
Start on the left: a local `./data/` folder with `products.csv` and `employees.csv`. The animation highlights an edit in `products.csv`, but the same source slot could be S3, GitHub, Drive, or another connector.

In the middle, CocoIndex watches the folder, diffs against prior state, and calls `declare_target_state(key, value)`. On the right is the Kafka topic, `cocoindex-csv-rows`. A changed row becomes an upsert for that key. A deleted row becomes a tombstone. An unchanged row is a no-op.
-->

---
title: The source data
---

# The source data

<div class="mt-3 text-sm max-w-3xl" style="color: var(--coco-plum);">
CSV has rows and columns, but it often lives as a file somebody edits and drops into a folder. That makes it a useful stand-in for PDFs, wikis, and repos.
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
  <div class="text-sm"><strong>First column is the primary key.</strong> Each row becomes one JSON message on the topic, keyed by that column. Two files, two schemas, same topic.</div>
</div>

<!--
The two files have different schemas on purpose. `products.csv` uses `sku` as its first column, so the first row is keyed by `SKU001`. `employees.csv` uses `emp_id`, so `E101` becomes the key there.

The pipeline does not need a shared schema across files for this demo. It needs a stable key per row and a JSON payload. CSV is a useful example because it is structured enough to reason about and file-like enough to show the same problems as documents, exports, and shared-folder data.
-->

---

# Create one producer for the app

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
  <span class="coco-tag-terracotta" style="min-width: 96px; text-align: center;">KAFKA CLIENT</span>
  <div style="color: var(--coco-plum);">Built on the <code>confluent-kafka</code> Python client. The client library is Confluent's; the broker can be local Kafka, Confluent Cloud, Confluent Platform, or any Kafka-compatible endpoint.</div>
</div>

<div class="mt-3 text-sm" style="color: var(--coco-muted);">
SASL block is for any managed broker. For local Kafka, drop those four lines and point at <code>localhost:9092</code>.
</div>

<!--
This block is all setup. `AIOProducer` comes from Confluent's async Python client. CocoIndex is not replacing that client; it is mounting a target on top of a producer you provide.

The `ContextKey` is the way the flow refers to that producer later without threading it through every function. The lifespan hook runs once at startup, builds the client config, creates the producer, registers it under the key, and keeps it alive for the app lifetime.
-->

---

# Declare topic state for each row

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
This function is where file contents become declared Kafka state. The `memo=True` decorator is what keeps unchanged files out of the work path: if the file contents match what CocoIndex has already seen, the function is skipped.

Inside the loop, the first column becomes the key and the row becomes JSON. The important call is `declare_target_state`: for this key, this value should exist on the topic. There is no `producer.send` here, and that is the point of the next slide.
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
This is a reconciliation model, not a send loop:
</div>

<div class="coco-patterns">
  <div class="coco-pattern-chip">spreadsheet cell <span class="equals">=</span> formula</div>
  <div class="coco-pattern-chip">SQL view <span class="equals">=</span> query</div>
  <div class="coco-pattern-chip">k8s manifest <span class="equals">=</span> desired state</div>
</div>
</v-click>

<!--
This is the API distinction the title is pointing at. `send_message` is imperative: emit this record now. `declare_target_state` is declarative: this key should currently have this value.

The analogies are there to anchor the reconciliation model. A spreadsheet recalculates from formulas. A SQL view materializes from a query. A Kubernetes controller reconciles toward a manifest. CocoIndex compares declared topic state with previously published topic state, then emits only the required upserts and tombstones.
-->

---

# Mount the folder and topic together

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
This slide wires the two sides together. `mount_kafka_topic_target` resolves the producer from the context key and gives the flow a topic target. CocoIndex does not create the Kafka topic; the topic is infrastructure you bring in.

`walk_dir` is the source. It points at `./data`, filters for CSV files, and with `live=True` keeps watching after the initial scan. `mount_each` connects every source item to `process_csv` with the Kafka topic target.
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
<code>process_csv</code> doesn't change. The Kafka target doesn't change. Catch-up and live mode share the same pipeline.
</div>

<!--
The first version is catch-up mode: scan the folder, reconcile the topic, exit. That is the path you would use for a scheduled update or a backfill.

The second version adds `live=True`, so the same source keeps watching for filesystem events. The processor function and Kafka target do not fork into separate batch and streaming implementations. The CLI mirrors that: `cocoindex update` for catch-up, `cocoindex update -L` for live.
-->

---

# One change in, one message out

<div class="mt-3 text-sm max-w-3xl" style="color: var(--coco-plum);">
What you'll see in the live demo, before we tab over to it.
</div>

<div class="mt-8 grid grid-cols-3 gap-5 max-w-5xl">

<div class="coco-card">
  <div class="coco-tag-sage">EDIT A ROW</div>
  <div class="mt-3 text-sm">One message on the topic with the new value. The other rows stay silent.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-terracotta">ADD A ROW</div>
  <div class="mt-3 text-sm">One upsert for the new key. Everything else untouched.</div>
</div>

<div class="coco-card">
  <div class="coco-tag-plum">DELETE A ROW</div>
  <div class="mt-3 text-sm">One tombstone (null value), keyed by the row that disappeared.</div>
</div>

</div>

<div class="mt-8 coco-card max-w-3xl">
  <div class="text-sm">
    <strong>Restart the pipeline?</strong> Unchanged rows aren't re-emitted. The state store remembers what's already been published.
    <span class="opacity-70"> · Keys hash to partitions via Kafka's default partitioner, so log compaction and key-based consumers behave normally.</span>
  </div>
</div>

<!--
This is the expected behavior in the demo. Editing one row should produce one updated value on the topic. Adding one row should produce one upsert for the new key. Deleting one row should produce one tombstone for the key that disappeared.

The restart case matters because it separates declaration from blind publishing. If the process restarts and the source files are unchanged, CocoIndex already knows the target state it declared earlier, so it does not re-emit those rows.
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
  <div class="text-xs opacity-75 mt-2">One Docker container, one topic.</div>
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
Small on purpose. I edit a file, CocoIndex compares the declared rows with the stored target state, and only the difference hits the topic.
</div>

<!--
For the live run, there are three moving parts. Docker is running a local Kafka broker on port 9092. One terminal has a console consumer parked at the end of the topic. Another terminal runs `cocoindex update -L`, which scans once and then waits for file changes.

The action is just editing `products.csv`. Add a row, save, and the consumer should receive one JSON record. Delete the row, save again, and the consumer should receive the delete representation. The thing to watch is that the producer behavior is driven by file state, not by a send call in the demo script.
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
  <div class="text-sm">I never called <code>send</code>. I edited a CSV cell. CocoIndex compared the new row against what it had already declared for that key, found one difference, and produced one message.</div>
</div>

<!--
The left output shows the unit of recomputation: one file reprocessed. The right output shows the unit of publication: one Kafka record.

That is the distinction from a send loop. I changed source state. CocoIndex compared the newly declared target state with what it had already published for that key, found one difference, and emitted one message. Saving the file again without changing the row should produce nothing.
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
The example lives in the CocoIndex repo, so this is the path to reproduce the demo. Clone the repo, enter the CSV-to-Kafka example, copy the env template, install the package, and run the live update command.

For an existing CocoIndex project, the Kafka connector comes from the optional `cocoindex[kafka]` dependency. For a local broker, point `KAFKA_BOOTSTRAP_SERVERS` at `localhost:9092` and leave the SASL values blank.
-->

---
layout: center
title: Wrapping up
---

# What carries over

<div class="mt-10 coco-takeaways">

<v-clicks>

<div class="coco-takeaway">
  <div class="num">01</div>
  <div class="body">Use Kafka for knowledge changes too: docs, repos, PDFs, shared drives, not only orders and CDC.</div>
</div>

<div class="coco-takeaway">
  <div class="num">02</div>
  <div class="body">Keep derived systems fresh incrementally: RAG stores, search indexes, vector DBs, audit jobs.</div>
</div>

<div class="coco-takeaway">
  <div class="num">03</div>
  <div class="body">Declare state by key, let CocoIndex reconcile, then let Kafka fan the change out to every consumer.</div>
</div>

</v-clicks>

</div>

<!--
The demo used CSV because the mechanics are visible. The same pattern applies when the source is a repo, a folder of PDFs, a wiki, or a shared drive, and the consumers are RAG stores, search indexes, vector databases, analytics, or audit jobs.

The part to carry forward is not "CSV to Kafka." It is incremental processing over changing source data: declare the target state by key, let CocoIndex reconcile the difference, and keep catch-up and live updates on the same code path where possible.
-->

---
layout: end
title: Thanks
---

<img src="/cocoindex-avatar.svg" class="coco-thanks-mark" alt="" />

<div class="coco-thanks-wrap">

<div class="coco-thanks-header">

# Thanks.

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
The demo repo has the code path we just walked through. The connector docs cover the Kafka-specific options, including local Kafka and managed brokers. My site is there if you want to follow up after the meetup.

I am especially interested in producer-side cases where teams are already tracking sent keys, deletes, or backfills manually. Those are the places where this model is easiest to test against real pain.
-->
