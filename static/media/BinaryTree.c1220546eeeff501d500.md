````markdown
---
slug: intro-binary-search
Title: "Binary Search: Beyond the Basics"
date: 2025-08-12
updated: 2025-08-12
description: "A deeply practical look at binary search patterns (answer, first true, last true, lower/upper bound)."
tags: [algorithms, patterns, complexity]
cover: ./images/binary-cover.png
readingTime: 6
---

# Binary Search: Beyond the Basics

> Binary search is more than `while (lo <= hi)`: pattern mastery unlocks interview agility and production reliability.

![Stylized binary search visualization](./images/binary-cover.png)

## TL;DR

Binary search solves ordered search in `O(log n)`, but variants (first true, last true, predicate answer, discrete vs. continuous) are what you actually implement day to day.

---

## Classic Template

```js
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1); // avoid overflow
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
````

### Python Variant

```python
def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if a[mid] == target:
            return mid
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

---

## Pattern: First True in Predicate

We generalize: given a monotonic boolean function `f(i)`, find smallest `i` where `f(i)` is true.

```ts
function firstTrue(n: number, f: (i:number)=>boolean) {
  let lo = 0, hi = n; // hi exclusive
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (f(mid)) hi = mid; else lo = mid + 1;
  }
  return lo; // possibly n if none
}
```

> **TIP:** Use half-open interval `[lo, hi)` to make termination reasoning simpler.

---

## Lower vs Upper Bound

| Variant      | Return           | Invariant | Loop Condition |
| ------------ | ---------------- | --------- | -------------- |
| lower\_bound | first index >= x | \[lo, hi) | lo < hi        |
| upper\_bound | first index >  x | \[lo, hi) | lo < hi        |

```cpp
int lower_bound(const vector<int>& a, int x){
  int lo=0, hi=a.size();
  while(lo<hi){
    int mid=(lo+hi)/2;
    if(a[mid] < x) lo=mid+1; else hi=mid;
  }
  return lo;
}
```

---

## Edge Cases

* **WARNING:** Mid calculation overflow in 32-bit languages.
* **NOTE:** Empty array should return -1 / size depending on variant.
* **TIP:** Off-by-one bugs arise when mixing closed and half-open thinking.

---

## Complexity

| Operation      | Time     | Space |
| -------------- | -------- | ----- |
| Search / Bound | O(log n) | O(1)  |

---

## Practice Task List

* [x] Basic search
* [x] First true
* [ ] Floating point answer search (tolerance based)
* [ ] Optimize for branch prediction (micro-bench)

---

## Conclusion

Binary search variants are portable mental templates. Drill them until they're reflexive.

```

Do you want me to also add **visual diagrams** for the first true / last true patterns so it’s more intuitive for readers? That could make this blog more engaging.
```
