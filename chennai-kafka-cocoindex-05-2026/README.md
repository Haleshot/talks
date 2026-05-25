# CocoIndex × Kafka meetup

Talk for an Apache Kafka meetup, walking through CocoIndex's new Kafka target connector via a live CSV → Kafka demo.

## Run

```bash
npm install
npm run dev
```

## Build / export

```bash
npm run build
npm run export
```

## Notes

- Source narrative is `blog.md` (the published CocoIndex post).
- `stitch-prompt.md` documents the CocoIndex design language the deck borrows from.
- All five hero diagrams live in `assets/` (authoring originals) and `public/` (slidev-resolved copies).
- Managed broker is mentioned generically. The example happens to use a SASL_SSL endpoint; the same code works against `localhost:9092` with the SASL fields blank.

## Slide map

1. Cover
2. Intro bridge (structured vs unstructured)
3. About me
4. Three takeaways
5. Section: the problem
6. Snapshots break long-running agents
7. The webhook trap (diagram)
8. What the trap costs
9. Section: the reframe
10. Snapshot vs change-event backbone (diagram)
11. What a log buys you
12. Section: Kafka stays Kafka
13. Message in, message out (diagram)
14. Closing the unstructured gap (diagram)
15. Why CocoIndex + Kafka (4 cards)
16. Section: the demo
17. High-level flow (diagram)
18. The source data
19. Step 1: producer lifespan
20. Step 2: process_csv
21. The conceptual moment: declare_target_state
22. State → wire ops
23. Step 3: app_main
24. Section: live mode
25. The diff (magic-move)
26. What the flag does and doesn't
27. What lands on the topic
28. Section: where this goes
29. Try it
30. Three takeaways (reprise)
31. Thanks
