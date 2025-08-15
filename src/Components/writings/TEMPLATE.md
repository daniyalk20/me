---
slug: example-slug
Title: "Your Post Title (Change Me)"
date: 2025-08-12
updated: 2025-08-12
description: "One‑line summary for meta tags."
tags: [react, algorithms, performance]
cover: ./images/cover-example.png
canonical: https://your-canonical-url.example.com/your-post
readingTime: 7
---

<!--
HOW TO USE THIS TEMPLATE
1. Copy this file to a new filename, e.g. 2025-08-12-cool-algorithm.md
2. Update front‑matter above.
3. Keep image assets inside a sibling ./images folder or /public/blog/<slug>/
4. Supported: headings h1–h6, tables, task lists, code fences, callouts, footnotes, inline HTML (limited), block quotes.
5. Tags help with filtering.
-->

# Your Big Catchy Heading

> A compelling hook / abstract. Summarize the core value in 1–2 sentences.

![Cover image alt text](./images/cover-example.png "Optional Title")

## Table of Contents

<!-- TOC will be auto-generated in component, but you can keep manual fallback: -->
1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Approach](#approach)
4. [Complexity](#complexity)
5. [Results](#results)
6. [Conclusion](#conclusion)

---

## Introduction

Set context. Explain why the topic matters. Add an inline code sample like `O(n log n)` or `useEffect`.

### Background
Provide minimal background. Reference sources with footnotes.[^1]

## Problem Statement

Define the core problem clearly:

> We need to parse large logs in < 2 seconds while using < 50MB memory.

- Constraint A
- Constraint B
- Edge Case: empty input

## Approach

### Algorithm Outline

```pseudo
function parse(logLines):
  window = []
  for line in logLines:
    if isEvent(line):
      window.push(line)
    if window too big:
      flush(window)
  return aggregate(window)
```

### Key Data Structures

| Structure | Purpose | Complexity |
|-----------|---------|------------|
| MinHeap   | Track kth element | O(log k) |
| RingBuffer| Sliding window    | O(1) amortized |

### Design Decisions

1. Streaming to avoid full in-memory load.
2. Heap for top-k accuracy.
3. Memory pool to reduce GC churn.

### Code (JavaScript Example)

```js
// Highlighted JavaScript example
export function topK(stream, k) {
  const heap = new MinPriorityQueue();
  for (const item of stream) {
    if (heap.size() < k) heap.enqueue(item);
    else if (item.score > heap.front().score) {
      heap.dequeue();
      heap.enqueue(item);
    }
  }
  return heap.toArray().sort((a,b)=>b.score-a.score);
}
```

```python
# Python variant
import heapq

def top_k(stream, k):
    heap = []
    for item in stream:
        if len(heap) < k:
            heapq.heappush(heap, item)
        else:
            if item.score > heap[0].score:
                heapq.heapreplace(heap, item)
    return sorted(heap, key=lambda x: x.score, reverse=True)
```

### Callouts / Admonitions

> NOTE: Replace with your own note. Emphasize trade-offs.

> WARNING: Be careful with unbounded input; always cap buffers.

> TIP: Micro-benchmark hot loops before premature refactors.

## Complexity

| Phase | Time | Space |
|-------|------|-------|
| Ingest | O(n log k) | O(k) |
| Output | O(k log k) | O(k) |

Total time: `O(n log k)`; space: `O(k)`.

## Results

- Throughput: ~1.2M events/sec (M2 Pro, 16GB) *(example — replace with real)*
- Memory peak: 38MB
- P95 latency: 640µs

```bash
# Sample shell snippet
node benchmark/topK.js --k 25 --input data/log.json
```

## Conclusion

Summarize impact, reiterate key insight, propose future work.

### Next Steps
- Add adaptive window
- Parallel parse via workers

---

## Appendix

### Extended Table

| Param | Value | Notes |
|-------|-------|-------|
| alpha | 0.8   | smoothing |
| beta  | 0.2   | threshold |

### Checklist / Task List

- [x] Outline
- [ ] Flesh out content
- [ ] Add diagrams

### Footnotes

[^1]: Example footnote reference.
