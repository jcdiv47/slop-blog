---
title: "Top Interview 150 — Solutions in Python"
slug: "top-interview-150"
pubDatetime: 2026-06-02T14:00:00.000Z
description: "Worked Python solutions to the LeetCode Top Interview 150, organized by topic with a short approach for each problem."
tags: ["leetcode", "algorithms", "python"]
---

## Table of contents

## Array / String

### 88. Merge Sorted Array

**Difficulty:** Easy · **Tags:** Array, Two Pointers, Sorting

[Leetcode](https://leetcode.com/problems/merge-sorted-array/)

You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

Merge `nums1` and `nums2` into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

Example 1:

```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
```

Example 2:

```
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```

Example 3:

```
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
```

Constraints:

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-10^9 <= nums1[i], nums2[j] <= 10^9`

Follow up: Can you come up with an algorithm that runs in `O(m + n)` time?

<details>

<summary>Approach</summary>

Two pointers from the back. Fill `nums1` from index `m+n-1` downward, taking the larger of `nums1[i]` and `nums2[j]`. Works in-place in O(m+n).

</details>

```python
class Solution:
    def merge(self, nums1, m, nums2, n):
        i, j, k = m - 1, n - 1, m + n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]; i -= 1
            else:
                nums1[k] = nums2[j]; j -= 1
            k -= 1
```

### 27. Remove Element

**Difficulty:** Easy · **Tags:** Array, Two Pointers

[Leetcode](https://leetcode.com/problems/remove-element/)

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.

Consider the number of elements in `nums` which are not equal to `val` be `k`, to get accepted, you need to do the following things:

- Change the array `nums` such that the first `k` elements of `nums` contain the elements which are not equal to `val`. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return `k`.

Custom Judge:

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be accepted.

Example 1:

```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

Example 2:

```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

Constraints:

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

<details>

<summary>Approach</summary>

Two pointers. `k` tracks write position; iterate `i`, copying any value `!= val` to `nums[k]`.

</details>

```python
class Solution:
    def removeElement(self, nums, val):
        k = 0
        for x in nums:
            if x != val:
                nums[k] = x; k += 1
        return k
```

### 26. Remove Duplicates from Sorted Array

**Difficulty:** Easy · **Tags:** Array, Two Pointers

[Leetcode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Consider the number of unique elements in `nums` to be `k​​​​​​​`​​​​​​​. After removing duplicates, return the number of unique elements `k`.

The first `k` elements of `nums` should contain the unique numbers in sorted order. The remaining elements beyond index `k - 1` can be ignored.

Custom Judge:

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be accepted.

Example 1:

```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

Example 2:

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

Constraints:

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order.

<details>

<summary>Approach</summary>

Slow/fast pointers. `k=1`; for each `i`, if `nums[i] != nums[k-1]` write it at `nums[k]` and advance.

</details>

```python
class Solution:
    def removeDuplicates(self, nums):
        k = 0
        for x in nums:
            if k == 0 or x != nums[k-1]:
                nums[k] = x; k += 1
        return k
```

### 80. Remove Duplicates from Sorted Array II

**Difficulty:** Medium · **Tags:** Array, Two Pointers

[Leetcode](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)

Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` after placing the final result in the first `k` slots of `nums`.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be accepted.

Example 1:

```
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

Example 2:

```
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

Constraints:

- `1 <= nums.length <= 3 * 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in non-decreasing order.

<details>

<summary>Approach</summary>

Same pattern; allow each value at most twice: compare with `nums[k-2]` instead of `nums[k-1]`.

</details>

```python
class Solution:
    def removeDuplicates(self, nums):
        k = 0
        for x in nums:
            if k < 2 or x != nums[k-2]:
                nums[k] = x; k += 1
        return k
```

### 169. Majority Element

**Difficulty:** Easy · **Tags:** Array, Hash Table, Divide and Conquer, Sorting, Counting

[Leetcode](https://leetcode.com/problems/majority-element/)

Given an array `nums` of size `n`, return the majority element.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

Example 1:

```
Input: nums = [3,2,3]
Output: 3
```

Example 2:

```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

Constraints:

- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`
- The input is generated such that a majority element will exist in the array.

Follow-up: Could you solve the problem in linear time and in `O(1)` space?

<details>

<summary>Approach</summary>

Boyer–Moore voting: maintain a candidate and count; reset candidate when count hits 0. Majority element survives.

</details>

```python
class Solution:
    def majorityElement(self, nums):
        cand = count = 0
        for x in nums:
            if count == 0: cand = x
            count += 1 if x == cand else -1
        return cand
```

### 189. Rotate Array

**Difficulty:** Medium · **Tags:** Array, Math, Two Pointers

[Leetcode](https://leetcode.com/problems/rotate-array/)

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

Example 1:

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```

Example 2:

```
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
```

Constraints:

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`

Follow up:

- Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.
- Could you do it in-place with `O(1)` extra space?

<details>

<summary>Approach</summary>

Reverse the whole array, then reverse the first `k` and the last `n-k`. In-place O(n), O(1) space.

</details>

```python
class Solution:
    def rotate(self, nums, k):
        n = len(nums); k %= n
        nums.reverse()
        nums[:k] = reversed(nums[:k])
        nums[k:] = reversed(nums[k:])
```

### 121. Best Time to Buy and Sell Stock

**Difficulty:** Easy · **Tags:** Array, Dynamic Programming

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i^th` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

Example 1:

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

Example 2:

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

Constraints:

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

<details>

<summary>Approach</summary>

Track the minimum price seen so far; max profit = current price − min so far.

</details>

```python
class Solution:
    def maxProfit(self, prices):
        lo = float('inf'); best = 0
        for p in prices:
            lo = min(lo, p); best = max(best, p - lo)
        return best
```

### 122. Best Time to Buy and Sell Stock II

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming, Greedy

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i^th` day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can sell and buy the stock multiple times on the same day, ensuring you never hold more than one share of the stock.

Find and return the maximum profit you can achieve.

Example 1:

```
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.
```

Example 2:

```
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Total profit is 4.
```

Example 3:

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
```

Constraints:

- `1 <= prices.length <= 3 * 10^4`
- `0 <= prices[i] <= 10^4`

<details>

<summary>Approach</summary>

Unlimited transactions: sum every positive day-to-day delta — equivalent to capturing every upswing.

</details>

```python
class Solution:
    def maxProfit(self, prices):
        return sum(max(0, b - a) for a, b in zip(prices, prices[1:]))
```

### 55. Jump Game

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming, Greedy

[Leetcode](https://leetcode.com/problems/jump-game/)

You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return `true` if you can reach the last index, or `false` otherwise.

Example 1:

```
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

Example 2:

```
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
```

Constraints:

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

<details>

<summary>Approach</summary>

Greedy: track the furthest index reachable. If `i` ever exceeds it, return False. Otherwise update reach with `i + nums[i]`.

</details>

```python
class Solution:
    def canJump(self, nums):
        reach = 0
        for i, x in enumerate(nums):
            if i > reach: return False
            reach = max(reach, i + x)
        return True
```

### 45. Jump Game II

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming, Greedy

[Leetcode](https://leetcode.com/problems/jump-game-ii/)

You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at index 0.

Each element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at index `i`, you can jump to any index `(i + j)` where:

- `0 <= j <= nums[i]` and
- `i + j < n`

Return the minimum number of jumps to reach index `n - 1`. The test cases are generated such that you can reach index `n - 1`.

Example 1:

```
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

Example 2:

```
Input: nums = [2,3,0,1,4]
Output: 2
```

Constraints:

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 1000`
- It's guaranteed that you can reach `nums[n - 1]`.

<details>

<summary>Approach</summary>

BFS-like greedy. Maintain `end` of current jump and `farthest` reachable in this layer. When `i == end`, take a jump and set `end = farthest`.

</details>

```python
class Solution:
    def jump(self, nums):
        jumps = end = farthest = 0
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == end:
                jumps += 1; end = farthest
        return jumps
```

### 274. H-Index

**Difficulty:** Medium · **Tags:** Array, Sorting, Counting Sort

[Leetcode](https://leetcode.com/problems/h-index/)

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i^th` paper, return the researcher's h-index.

According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.

Example 1:

```
Input: citations = [3,0,6,1,5]
Output: 3
Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
```

Example 2:

```
Input: citations = [1,3,1]
Output: 1
```

Constraints:

- `n == citations.length`
- `1 <= n <= 5000`
- `0 <= citations[i] <= 1000`

<details>

<summary>Approach</summary>

Counting sort by citation count, capped at n. Sweep from high to low accumulating papers; first `i` with `count >= i` is the h-index.

</details>

```python
class Solution:
    def hIndex(self, citations):
        n = len(citations); buckets = [0]*(n+1)
        for c in citations:
            buckets[min(c, n)] += 1
        total = 0
        for i in range(n, -1, -1):
            total += buckets[i]
            if total >= i: return i
        return 0
```

### 380. Insert Delete GetRandom O(1)

**Difficulty:** Medium · **Tags:** Array, Hash Table, Math, Design, Randomized

[Leetcode](https://leetcode.com/problems/insert-delete-getrandom-o1/)

Implement the `RandomizedSet` class:

- `RandomizedSet()` Initializes the `RandomizedSet` object.
- `bool insert(int val)` Inserts an item `val` into the set if not present. Returns `true` if the item was not present, `false` otherwise.
- `bool remove(int val)` Removes an item `val` from the set if present. Returns `true` if the item was present, `false` otherwise.
- `int getRandom()` Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.

You must implement the functions of the class such that each function works in average `O(1)` time complexity.

Example 1:

```
Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
```

Constraints:

- `-2^31 <= val <= 2^31 - 1`
- At most `2 * ``10^5` calls will be made to `insert`, `remove`, and `getRandom`.
- There will be at least one element in the data structure when `getRandom` is called.

<details>

<summary>Approach</summary>

Hashmap value→index + dynamic array. On remove, swap target with last element to keep array dense; update the map.

</details>

```python
import random
class RandomizedSet:
    def __init__(self):
        self.a = []; self.idx = {}
    def insert(self, val):
        if val in self.idx: return False
        self.idx[val] = len(self.a); self.a.append(val); return True
    def remove(self, val):
        if val not in self.idx: return False
        i = self.idx.pop(val); last = self.a.pop()
        if i < len(self.a):
            self.a[i] = last; self.idx[last] = i
        return True
    def getRandom(self):
        return random.choice(self.a)
```

### 238. Product of Array Except Self

**Difficulty:** Medium · **Tags:** Array, Prefix Sum

[Leetcode](https://leetcode.com/problems/product-of-array-except-self/)

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in `O(n)` time and without using the division operation.

Example 1:

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

Example 2:

```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

Constraints:

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The input is generated such that `answer[i]` is guaranteed to fit in a 32-bit integer.

Follow up: Can you solve the problem in `O(1)` extra space complexity? (The output array does not count as extra space for space complexity analysis.)

<details>

<summary>Approach</summary>

Two passes. First pass: `ans[i]` = product of everything left of `i`. Second pass (right→left): multiply by running product from the right.

</details>

```python
class Solution:
    def productExceptSelf(self, nums):
        n = len(nums); ans = [1]*n
        left = 1
        for i in range(n):
            ans[i] = left; left *= nums[i]
        right = 1
        for i in range(n-1, -1, -1):
            ans[i] *= right; right *= nums[i]
        return ans
```

### 134. Gas Station

**Difficulty:** Medium · **Tags:** Array, Greedy

[Leetcode](https://leetcode.com/problems/gas-station/)

There are `n` gas stations along a circular route, where the amount of gas at the `i^th` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i^th` station to its next `(i + 1)^th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. If there exists a solution, it is guaranteed to be unique.

Example 1:

```
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
```

Example 2:

```
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.
```

Constraints:

- `n == gas.length == cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`
- The input is generated such that the answer is unique.

<details>

<summary>Approach</summary>

If total gas ≥ total cost, a solution exists. Sweep once: when running tank goes negative, restart from the next station.

</details>

```python
class Solution:
    def canCompleteCircuit(self, gas, cost):
        if sum(gas) < sum(cost): return -1
        tank = start = 0
        for i in range(len(gas)):
            tank += gas[i] - cost[i]
            if tank < 0:
                start = i + 1; tank = 0
        return start
```

### 135. Candy

**Difficulty:** Hard · **Tags:** Array, Greedy

[Leetcode](https://leetcode.com/problems/candy/)

There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.

You are giving candies to these children subjected to the following requirements:

- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

Example 1:

```
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
```

Example 2:

```
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
```

Constraints:

- `n == ratings.length`
- `1 <= n <= 2 * 10^4`
- `0 <= ratings[i] <= 2 * 10^4`

<details>

<summary>Approach</summary>

Two passes. Left→right: if `ratings[i] > ratings[i-1]`, give one more. Right→left: enforce same rule from the other side via max.

</details>

```python
class Solution:
    def candy(self, ratings):
        n = len(ratings); c = [1]*n
        for i in range(1, n):
            if ratings[i] > ratings[i-1]: c[i] = c[i-1] + 1
        for i in range(n-2, -1, -1):
            if ratings[i] > ratings[i+1]: c[i] = max(c[i], c[i+1] + 1)
        return sum(c)
```

### 42. Trapping Rain Water

**Difficulty:** Hard · **Tags:** Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack

[Leetcode](https://leetcode.com/problems/trapping-rain-water/)

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

Example 1:

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

Example 2:

```
Input: height = [4,2,0,3,2,5]
Output: 9
```

Constraints:

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

<details>

<summary>Approach</summary>

Two pointers with running `leftMax`, `rightMax`. The shorter side determines how much water sits above the current bar.

</details>

```python
class Solution:
    def trap(self, height):
        l, r = 0, len(height)-1; lm = rm = ans = 0
        while l < r:
            if height[l] < height[r]:
                lm = max(lm, height[l]); ans += lm - height[l]; l += 1
            else:
                rm = max(rm, height[r]); ans += rm - height[r]; r -= 1
        return ans
```

### 13. Roman to Integer

**Difficulty:** Easy · **Tags:** Hash Table, Math, String

[Leetcode](https://leetcode.com/problems/roman-to-integer/)

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2` is written as `II` in Roman numeral, just two ones added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

Example 1:

```
Input: s = "III"
Output: 3
Explanation: III = 3.
```

Example 2:

```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

Example 3:

```
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

Constraints:

- `1 <= s.length <= 15`
- `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
- It is guaranteed that `s` is a valid roman numeral in the range `[1, 3999]`.

<details>

<summary>Approach</summary>

Scan left to right. If the current symbol is smaller than the next, subtract it; otherwise add.

</details>

```python
class Solution:
    def romanToInt(self, s):
        v = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
        total = 0
        for i, ch in enumerate(s):
            if i+1 < len(s) and v[ch] < v[s[i+1]]:
                total -= v[ch]
            else:
                total += v[ch]
        return total
```

### 12. Integer to Roman

**Difficulty:** Medium · **Tags:** Hash Table, Math, String

[Leetcode](https://leetcode.com/problems/integer-to-roman/)

Seven different symbols represent Roman numerals with the following values:

```
        Symbol
        Value




        I
        1


        V
        5


        X
        10


        L
        50


        C
        100


        D
        500


        M
        1000
```

Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

- If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
- If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (`I`) less than 5 (`V`): `IV` and 9 is 1 (`I`) less than 10 (`X`): `IX`. Only the following subtractive forms are used: 4 (`IV`), 9 (`IX`), 40 (`XL`), 90 (`XC`), 400 (`CD`) and 900 (`CM`).
- Only powers of 10 (`I`, `X`, `C`, `M`) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (`V`), 50 (`L`), or 500 (`D`) multiple times. If you need to append a symbol 4 times use the subtractive form.

Given an integer, convert it to a Roman numeral.

Example 1:

Input: num = 3749

Output: "MMMDCCXLIX"

Explanation:

```
3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
```

Example 2:

Input: num = 58

Output: "LVIII"

Explanation:

```
50 = L
 8 = VIII
```

Example 3:

Input: num = 1994

Output: "MCMXCIV"

Explanation:

```
1000 = M
 900 = CM
  90 = XC
   4 = IV
```

Constraints:

- `1 <= num <= 3999`

<details>

<summary>Approach</summary>

Greedy with a value/symbol table including the subtractive pairs (900, 400, 90, 40, 9, 4). Subtract repeatedly.

</details>

```python
class Solution:
    def intToRoman(self, num):
        pairs = [(1000,'M'),(900,'CM'),(500,'D'),(400,'CD'),
                 (100,'C'),(90,'XC'),(50,'L'),(40,'XL'),
                 (10,'X'),(9,'IX'),(5,'V'),(4,'IV'),(1,'I')]
        out = []
        for v, sym in pairs:
            while num >= v: out.append(sym); num -= v
        return ''.join(out)
```

### 58. Length of Last Word

**Difficulty:** Easy · **Tags:** String

[Leetcode](https://leetcode.com/problems/length-of-last-word/)

Given a string `s` consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

Example 1:

```
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
```

Example 2:

```
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
```

Example 3:

```
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
```

Constraints:

- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.

<details>

<summary>Approach</summary>

Walk from the end, skip trailing spaces, then count non-space chars.

</details>

```python
class Solution:
    def lengthOfLastWord(self, s):
        i = len(s) - 1
        while i >= 0 and s[i] == ' ': i -= 1
        j = i
        while j >= 0 and s[j] != ' ': j -= 1
        return i - j
```

### 14. Longest Common Prefix

**Difficulty:** Easy · **Tags:** Array, String, Trie

[Leetcode](https://leetcode.com/problems/longest-common-prefix/)

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

Example 1:

```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

Example 2:

```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

Constraints:

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of only lowercase English letters if it is non-empty.

<details>

<summary>Approach</summary>

Compare characters column-by-column across all strings; stop at first mismatch or end of shortest.

</details>

```python
class Solution:
    def longestCommonPrefix(self, strs):
        if not strs: return ""
        for i, ch in enumerate(strs[0]):
            for s in strs[1:]:
                if i >= len(s) or s[i] != ch: return strs[0][:i]
        return strs[0]
```

### 151. Reverse Words in a String

**Difficulty:** Medium · **Tags:** Two Pointers, String

[Leetcode](https://leetcode.com/problems/reverse-words-in-a-string/)

Given an input string `s`, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

Example 1:

```
Input: s = "the sky is blue"
Output: "blue is sky the"
```

Example 2:

```
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
```

Example 3:

```
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```

Constraints:

- `1 <= s.length <= 10^4`
- `s` contains English letters (upper-case and lower-case), digits, and spaces `' '`.
- There is at least one word in `s`.

Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1)` extra space?

<details>

<summary>Approach</summary>

`split()` already collapses whitespace; reverse the list and join with single spaces.

</details>

```python
class Solution:
    def reverseWords(self, s):
        return ' '.join(reversed(s.split()))
```

### 6. Zigzag Conversion

**Difficulty:** Medium · **Tags:** String

[Leetcode](https://leetcode.com/problems/zigzag-conversion/)

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```

Example 1:

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

Example 2:

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

Example 3:

```
Input: s = "A", numRows = 1
Output: "A"
```

Constraints:

- `1 <= s.length <= 1000`
- `s` consists of English letters (lower-case and upper-case), `','` and `'.'`.
- `1 <= numRows <= 1000`

<details>

<summary>Approach</summary>

Maintain `numRows` buckets; walk chars while bouncing direction at top/bottom rows. Concatenate buckets.

</details>

```python
class Solution:
    def convert(self, s, numRows):
        if numRows == 1 or numRows >= len(s): return s
        rows = [[] for _ in range(numRows)]
        r, step = 0, 1
        for ch in s:
            rows[r].append(ch)
            if r == 0: step = 1
            elif r == numRows - 1: step = -1
            r += step
        return ''.join(''.join(row) for row in rows)
```

### 28. Find the Index of the First Occurrence in a String

**Difficulty:** Easy · **Tags:** Two Pointers, String, String Matching

[Leetcode](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

Example 1:

```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
```

Example 2:

```
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
```

Constraints:

- `1 <= haystack.length, needle.length <= 10^4`
- `haystack` and `needle` consist of only lowercase English characters.

<details>

<summary>Approach</summary>

Built-in `str.find` is acceptable. For the canonical approach use KMP; here we keep it simple.

</details>

```python
class Solution:
    def strStr(self, haystack, needle):
        return haystack.find(needle)
```

### 68. Text Justification

**Difficulty:** Hard · **Tags:** Array, String, Simulation

[Leetcode](https://leetcode.com/problems/text-justification/)

Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces `' '` when necessary so that each line has exactly `maxWidth` characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

- A word is defined as a character sequence consisting of non-space characters only.
- Each word's length is guaranteed to be greater than `0` and not exceed `maxWidth`.
- The input array `words` contains at least one word.

Example 1:

```
Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

Example 2:

```
Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified because it contains only one word.
```

Example 3:

```
Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
```

Constraints:

- `1 <= words.length <= 300`
- `1 <= words[i].length <= 20`
- `words[i]` consists of only English letters and symbols.
- `1 <= maxWidth <= 100`
- `words[i].length <= maxWidth`

<details>

<summary>Approach</summary>

Greedy line packing. For each line, distribute extra spaces as evenly as possible, with leftover going to leftmost gaps. Last line is left-justified.

</details>

```python
class Solution:
    def fullJustify(self, words, maxWidth):
        res, i, n = [], 0, len(words)
        while i < n:
            j, length = i, 0
            while j < n and length + len(words[j]) + (j - i) <= maxWidth:
                length += len(words[j]); j += 1
            gaps = j - i - 1
            if j == n or gaps == 0:
                line = ' '.join(words[i:j])
                line += ' ' * (maxWidth - len(line))
            else:
                spaces = maxWidth - length
                base, extra = divmod(spaces, gaps)
                parts = []
                for k in range(i, j-1):
                    parts.append(words[k])
                    parts.append(' ' * (base + (1 if k - i < extra else 0)))
                parts.append(words[j-1])
                line = ''.join(parts)
            res.append(line); i = j
        return res
```

## Two Pointers

### 125. Valid Palindrome

**Difficulty:** Easy · **Tags:** Two Pointers, String

[Leetcode](https://leetcode.com/problems/valid-palindrome/)

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

Example 1:

```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

Example 2:

```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

Example 3:

```
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

Constraints:

- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters.

<details>

<summary>Approach</summary>

Two pointers from both ends; skip non-alphanumerics; compare lowercase.

</details>

```python
class Solution:
    def isPalindrome(self, s):
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not s[l].isalnum(): l += 1
            while l < r and not s[r].isalnum(): r -= 1
            if s[l].lower() != s[r].lower(): return False
            l += 1; r -= 1
        return True
```

### 392. Is Subsequence

**Difficulty:** Easy · **Tags:** Two Pointers, String, Dynamic Programming

[Leetcode](https://leetcode.com/problems/is-subsequence/)

Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

Example 1:

```
Input: s = "abc", t = "ahbgdc"
Output: true
```

Example 2:

```
Input: s = "axc", t = "ahbgdc"
Output: false
```

Constraints:

- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- `s` and `t` consist only of lowercase English letters.

Follow up: Suppose there are lots of incoming `s`, say `s_1, s_2, ..., s_k` where `k >= 10^9`, and you want to check one by one to see if `t` has its subsequence. In this scenario, how would you change your code?

<details>

<summary>Approach</summary>

Two pointers. Advance `i` over `s` only when characters match; advance `j` over `t` always.

</details>

```python
class Solution:
    def isSubsequence(self, s, t):
        i = 0
        for ch in t:
            if i < len(s) and s[i] == ch: i += 1
        return i == len(s)
```

### 167. Two Sum II - Input Array Is Sorted

**Difficulty:** Medium · **Tags:** Array, Two Pointers, Binary Search

[Leetcode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index_1]` and `numbers[index_2]` where `1 <= index_1 < index_2 <= numbers.length`.

Return the indices of the two numbers `index_1` and `index_2`, each incremented by one, as an integer array `[index_1, index_2]` of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

Example 1:

```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index_1 = 1, index_2 = 2. We return [1, 2].
```

Example 2:

```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index_1 = 1, index_2 = 3. We return [1, 3].
```

Example 3:

```
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index_1 = 1, index_2 = 2. We return [1, 2].
```

Constraints:

- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in non-decreasing order.
- `-1000 <= target <= 1000`
- The tests are generated such that there is exactly one solution.

<details>

<summary>Approach</summary>

Two pointers in a sorted array: shrink right if sum too big, advance left if too small.

</details>

```python
class Solution:
    def twoSum(self, numbers, target):
        l, r = 0, len(numbers) - 1
        while l < r:
            s = numbers[l] + numbers[r]
            if s == target: return [l+1, r+1]
            if s < target: l += 1
            else: r -= 1
```

### 11. Container With Most Water

**Difficulty:** Medium · **Tags:** Array, Two Pointers, Greedy

[Leetcode](https://leetcode.com/problems/container-with-most-water/)

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i^th` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

Example 2:

```
Input: height = [1,1]
Output: 1
```

Constraints:

- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

<details>

<summary>Approach</summary>

Two pointers; area = min(h[l], h[r]) * (r - l). Move the shorter side inward — only that can yield a taller min.

</details>

```python
class Solution:
    def maxArea(self, height):
        l, r = 0, len(height) - 1; best = 0
        while l < r:
            best = max(best, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]: l += 1
            else: r -= 1
        return best
```

### 15. 3Sum

**Difficulty:** Medium · **Tags:** Array, Two Pointers, Sorting

[Leetcode](https://leetcode.com/problems/3sum/)

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

Example 1:

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
```

Example 2:

```
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

Example 3:

```
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

Constraints:

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

<details>

<summary>Approach</summary>

Sort, fix `i`, then two-pointer the rest looking for sum `-nums[i]`. Skip duplicates at each level.

</details>

```python
class Solution:
    def threeSum(self, nums):
        nums.sort(); res = []
        for i in range(len(nums)-2):
            if nums[i] > 0: break
            if i and nums[i] == nums[i-1]: continue
            l, r = i+1, len(nums)-1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s < 0: l += 1
                elif s > 0: r -= 1
                else:
                    res.append([nums[i], nums[l], nums[r]])
                    l += 1; r -= 1
                    while l < r and nums[l] == nums[l-1]: l += 1
                    while l < r and nums[r] == nums[r+1]: r -= 1
        return res
```

## Sliding Window

### 209. Minimum Size Subarray Sum

**Difficulty:** Medium · **Tags:** Array, Binary Search, Sliding Window, Prefix Sum

[Leetcode](https://leetcode.com/problems/minimum-size-subarray-sum/)

Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.

Example 1:

```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
```

Example 2:

```
Input: target = 4, nums = [1,4,4]
Output: 1
```

Example 3:

```
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
```

Constraints:

- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

Follow up: If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.

<details>

<summary>Approach</summary>

Expand right pointer, accumulating sum; while sum ≥ target, shrink left and record min length.

</details>

```python
class Solution:
    def minSubArrayLen(self, target, nums):
        l = s = 0; best = float('inf')
        for r, x in enumerate(nums):
            s += x
            while s >= target:
                best = min(best, r - l + 1); s -= nums[l]; l += 1
        return 0 if best == float('inf') else best
```

### 3. Longest Substring Without Repeating Characters

**Difficulty:** Medium · **Tags:** Hash Table, String, Sliding Window

[Leetcode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

Given a string `s`, find the length of the longest substring without duplicate characters.

Example 1:

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that `"bca"` and `"cab"` are also correct answers.
```

Example 2:

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

Example 3:

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

Constraints:

- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces.

<details>

<summary>Approach</summary>

Sliding window with last-seen index map. When we revisit a char inside the window, jump `l` past its previous index.

</details>

```python
class Solution:
    def lengthOfLongestSubstring(self, s):
        last = {}; l = best = 0
        for r, ch in enumerate(s):
            if ch in last and last[ch] >= l: l = last[ch] + 1
            last[ch] = r; best = max(best, r - l + 1)
        return best
```

### 30. Substring with Concatenation of All Words

**Difficulty:** Hard · **Tags:** Hash Table, String, Sliding Window

[Leetcode](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)

You are given a string `s` and an array of strings `words`. All the strings of `words` are of the same length.

A concatenated string is a string that exactly contains all the strings of any permutation of `words` concatenated.

- For example, if `words = ["ab","cd","ef"]`, then `"abcdef"`, `"abefcd"`, `"cdabef"`, `"cdefab"`, `"efabcd"`, and `"efcdab"` are all concatenated strings. `"acdbef"` is not a concatenated string because it is not the concatenation of any permutation of `words`.

Return an array of the starting indices of all the concatenated substrings in `s`. You can return the answer in any order.

Example 1:

Input: s = "barfoothefoobarman", words = ["foo","bar"]

Output: [0,9]

Explanation:

The substring starting at 0 is `"barfoo"`. It is the concatenation of `["bar","foo"]` which is a permutation of `words`.

The substring starting at 9 is `"foobar"`. It is the concatenation of `["foo","bar"]` which is a permutation of `words`.

Example 2:

Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

Output: []

Explanation:

There is no concatenated substring.

Example 3:

Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

Output: [6,9,12]

Explanation:

The substring starting at 6 is `"foobarthe"`. It is the concatenation of `["foo","bar","the"]`.

The substring starting at 9 is `"barthefoo"`. It is the concatenation of `["bar","the","foo"]`.

The substring starting at 12 is `"thefoobar"`. It is the concatenation of `["the","foo","bar"]`.

Constraints:

- `1 <= s.length <= 10^4`
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 30`
- `s` and `words[i]` consist of lowercase English letters.

<details>

<summary>Approach</summary>

All words are equal length `w`. For each offset `0..w-1`, slide a window of `len(words)` words, maintaining a counter; record indices when counter matches the target multiset.

</details>

```python
from collections import Counter
class Solution:
    def findSubstring(self, s, words):
        if not words: return []
        w, k = len(words[0]), len(words)
        need = Counter(words); span = w * k; res = []
        for off in range(w):
            l = off; have = Counter(); count = 0
            for r in range(off, len(s) - w + 1, w):
                word = s[r:r+w]
                if word not in need:
                    have.clear(); count = 0; l = r + w; continue
                have[word] += 1; count += 1
                while have[word] > need[word]:
                    have[s[l:l+w]] -= 1; count -= 1; l += w
                if count == k: res.append(l)
        return res
```

### 76. Minimum Window Substring

**Difficulty:** Hard · **Tags:** Hash Table, String, Sliding Window

[Leetcode](https://leetcode.com/problems/minimum-window-substring/)

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

The testcases will be generated such that the answer is unique.

Example 1:

```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

Example 2:

```
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
```

Example 3:

```
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
```

Constraints:

- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 10^5`
- `s` and `t` consist of uppercase and lowercase English letters.

Follow up: Could you find an algorithm that runs in `O(m + n)` time?

<details>

<summary>Approach</summary>

Sliding window with character need-count and a `formed` counter. Expand right; when all chars satisfied, shrink left and track best window.

</details>

```python
from collections import Counter
class Solution:
    def minWindow(self, s, t):
        if not t or len(s) < len(t): return ""
        need = Counter(t); missing = len(t)
        l = 0; best = (float('inf'), 0, 0)
        for r, ch in enumerate(s):
            if need[ch] > 0: missing -= 1
            need[ch] -= 1
            while missing == 0:
                if r - l < best[0]: best = (r - l, l, r)
                need[s[l]] += 1
                if need[s[l]] > 0: missing += 1
                l += 1
        return "" if best[0] == float('inf') else s[best[1]:best[2]+1]
```

## Matrix

### 36. Valid Sudoku

**Difficulty:** Medium · **Tags:** Array, Hash Table, Matrix

[Leetcode](https://leetcode.com/problems/valid-sudoku/)

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

- Each row must contain the digits `1-9` without repetition.
- Each column must contain the digits `1-9` without repetition.
- Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

Note:

- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

Example 1:

```
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
```

Example 2:

```
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
```

Constraints:

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1-9` or `'.'`.

<details>

<summary>Approach</summary>

Track sets for each row, column, and 3×3 box. Reject on duplicate insertion.

</details>

```python
class Solution:
    def isValidSudoku(self, board):
        rows=[set() for _ in range(9)]; cols=[set() for _ in range(9)]; boxes=[set() for _ in range(9)]
        for r in range(9):
            for c in range(9):
                v = board[r][c]
                if v == '.': continue
                b = (r//3)*3 + c//3
                if v in rows[r] or v in cols[c] or v in boxes[b]: return False
                rows[r].add(v); cols[c].add(v); boxes[b].add(v)
        return True
```

### 54. Spiral Matrix

**Difficulty:** Medium · **Tags:** Array, Matrix, Simulation

[Leetcode](https://leetcode.com/problems/spiral-matrix/)

Given an `m x n` `matrix`, return all elements of the `matrix` in spiral order.

Example 1:

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

Example 2:

```
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

Constraints:

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

<details>

<summary>Approach</summary>

Maintain four boundaries (top, bottom, left, right) and shrink them after each side is consumed.

</details>

```python
class Solution:
    def spiralOrder(self, matrix):
        res = []; t, b = 0, len(matrix)-1; l, r = 0, len(matrix[0])-1
        while t <= b and l <= r:
            for c in range(l, r+1): res.append(matrix[t][c])
            t += 1
            for rr in range(t, b+1): res.append(matrix[rr][r])
            r -= 1
            if t <= b:
                for c in range(r, l-1, -1): res.append(matrix[b][c])
                b -= 1
            if l <= r:
                for rr in range(b, t-1, -1): res.append(matrix[rr][l])
                l += 1
        return res
```

### 48. Rotate Image

**Difficulty:** Medium · **Tags:** Array, Math, Matrix

[Leetcode](https://leetcode.com/problems/rotate-image/)

You are given an `n x n` 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

Example 1:

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

Example 2:

```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

Constraints:

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`

<details>

<summary>Approach</summary>

Transpose, then reverse each row. Yields a 90° clockwise rotation in-place.

</details>

```python
class Solution:
    def rotate(self, matrix):
        n = len(matrix)
        for i in range(n):
            for j in range(i+1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        for row in matrix:
            row.reverse()
```

### 73. Set Matrix Zeroes

**Difficulty:** Medium · **Tags:** Array, Hash Table, Matrix

[Leetcode](https://leetcode.com/problems/set-matrix-zeroes/)

Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.

You must do it in place.

Example 1:

```
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

Example 2:

```
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

Constraints:

- `m == matrix.length`
- `n == matrix[0].length`
- `1 <= m, n <= 200`
- `-2^31 <= matrix[i][j] <= 2^31 - 1`

Follow up:

- A straightforward solution using `O(mn)` space is probably a bad idea.
- A simple improvement uses `O(m + n)` space, but still not the best solution.
- Could you devise a constant space solution?

<details>

<summary>Approach</summary>

Use the first row & column as markers. Track separately whether row 0 / col 0 themselves must be zeroed.

</details>

```python
class Solution:
    def setZeroes(self, m):
        rows, cols = len(m), len(m[0])
        first_row = any(m[0][c] == 0 for c in range(cols))
        first_col = any(m[r][0] == 0 for r in range(rows))
        for r in range(1, rows):
            for c in range(1, cols):
                if m[r][c] == 0:
                    m[r][0] = 0; m[0][c] = 0
        for r in range(1, rows):
            for c in range(1, cols):
                if m[r][0] == 0 or m[0][c] == 0: m[r][c] = 0
        if first_row:
            for c in range(cols): m[0][c] = 0
        if first_col:
            for r in range(rows): m[r][0] = 0
```

### 289. Game of Life

**Difficulty:** Medium · **Tags:** Array, Matrix, Simulation

[Leetcode](https://leetcode.com/problems/game-of-life/)

According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an `m x n` grid of cells, where each cell has an initial state: live (represented by a `1`) or dead (represented by a `0`). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

- Any live cell with fewer than two live neighbors dies as if caused by under-population.
- Any live cell with two or three live neighbors lives on to the next generation.
- Any live cell with more than three live neighbors dies, as if by over-population.
- Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the `m x n` grid `board`. In this process, births and deaths occur simultaneously.

Given the current state of the `board`, update the `board` to reflect its next state.

Note that you do not need to return anything.

Example 1:

```
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

Example 2:

```
Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]
```

Constraints:

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 25`
- `board[i][j]` is `0` or `1`.

Follow up:

- Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.
- In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?

<details>

<summary>Approach</summary>

Encode old+new state in two bits: bit 0 = old, bit 1 = new. Compute new state from neighbors' old bits, then shift down.

</details>

```python
class Solution:
    def gameOfLife(self, board):
        R, C = len(board), len(board[0])
        for r in range(R):
            for c in range(C):
                live = 0
                for dr in (-1,0,1):
                    for dc in (-1,0,1):
                        if dr==0 and dc==0: continue
                        nr, nc = r+dr, c+dc
                        if 0<=nr<R and 0<=nc<C and board[nr][nc] & 1:
                            live += 1
                if board[r][c] & 1:
                    if live == 2 or live == 3: board[r][c] |= 2
                else:
                    if live == 3: board[r][c] |= 2
        for r in range(R):
            for c in range(C):
                board[r][c] >>= 1
```

## Hashmap

### 383. Ransom Note

**Difficulty:** Easy · **Tags:** Hash Table, String, Counting

[Leetcode](https://leetcode.com/problems/ransom-note/)

Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise.

Each letter in `magazine` can only be used once in `ransomNote`.

Example 1:

```
Input: ransomNote = "a", magazine = "b"
Output: false
```

Example 2:

```
Input: ransomNote = "aa", magazine = "ab"
Output: false
```

Example 3:

```
Input: ransomNote = "aa", magazine = "aab"
Output: true
```

Constraints:

- `1 <= ransomNote.length, magazine.length <= 10^5`
- `ransomNote` and `magazine` consist of lowercase English letters.

<details>

<summary>Approach</summary>

Counter of magazine must dominate counter of ransom note.

</details>

```python
from collections import Counter
class Solution:
    def canConstruct(self, ransomNote, magazine):
        return not (Counter(ransomNote) - Counter(magazine))
```

### 205. Isomorphic Strings

**Difficulty:** Easy · **Tags:** Hash Table, String

[Leetcode](https://leetcode.com/problems/isomorphic-strings/)

Given two strings `s` and `t`, determine if they are isomorphic.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

Example 1:

Input: s = "egg", t = "add"

Output: true

Explanation:

The strings `s` and `t` can be made identical by:

- Mapping `'e'` to `'a'`.
- Mapping `'g'` to `'d'`.

Example 2:

Input: s = "f11", t = "b23"

Output: false

Explanation:

The strings `s` and `t` can not be made identical as `'1'` needs to be mapped to both `'2'` and `'3'`.

Example 3:

Input: s = "paper", t = "title"

Output: true

Constraints:

- `1 <= s.length <= 5 * 10^4`
- `t.length == s.length`
- `s` and `t` consist of any valid ascii character.

<details>

<summary>Approach</summary>

Maintain two maps `s→t` and `t→s`; reject on any inconsistency.

</details>

```python
class Solution:
    def isIsomorphic(self, s, t):
        st, ts = {}, {}
        for a, b in zip(s, t):
            if st.get(a, b) != b or ts.get(b, a) != a: return False
            st[a] = b; ts[b] = a
        return True
```

### 290. Word Pattern

**Difficulty:** Easy · **Tags:** Hash Table, String

[Leetcode](https://leetcode.com/problems/word-pattern/)

Given a `pattern` and a string `s`, find if `s` follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`. Specifically:

- Each letter in `pattern` maps to exactly one unique word in `s`.
- Each unique word in `s` maps to exactly one letter in `pattern`.
- No two letters map to the same word, and no two words map to the same letter.

Example 1:

Input: pattern = "abba", s = "dog cat cat dog"

Output: true

Explanation:

The bijection can be established as:

- `'a'` maps to `"dog"`.
- `'b'` maps to `"cat"`.

Example 2:

Input: pattern = "abba", s = "dog cat cat fish"

Output: false

Example 3:

Input: pattern = "aaaa", s = "dog cat cat dog"

Output: false

Constraints:

- `1 <= pattern.length <= 300`
- `pattern` contains only lower-case English letters.
- `1 <= s.length <= 3000`
- `s` contains only lowercase English letters and spaces `' '`.
- `s` does not contain any leading or trailing spaces.
- All the words in `s` are separated by a single space.

<details>

<summary>Approach</summary>

Same idea as isomorphic strings but between pattern chars and words.

</details>

```python
class Solution:
    def wordPattern(self, pattern, s):
        words = s.split()
        if len(words) != len(pattern): return False
        cw, wc = {}, {}
        for ch, w in zip(pattern, words):
            if cw.get(ch, w) != w or wc.get(w, ch) != ch: return False
            cw[ch] = w; wc[w] = ch
        return True
```

### 242. Valid Anagram

**Difficulty:** Easy · **Tags:** Hash Table, String, Sorting

[Leetcode](https://leetcode.com/problems/valid-anagram/)

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

Constraints:

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

<details>

<summary>Approach</summary>

Counters equal — or sort both strings.

</details>

```python
from collections import Counter
class Solution:
    def isAnagram(self, s, t):
        return Counter(s) == Counter(t)
```

### 49. Group Anagrams

**Difficulty:** Medium · **Tags:** Array, Hash Table, String, Sorting

[Leetcode](https://leetcode.com/problems/group-anagrams/)

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

- There is no string in strs that can be rearranged to form `"bat"`.
- The strings `"nat"` and `"tan"` are anagrams as they can be rearranged to form each other.
- The strings `"ate"`, `"eat"`, and `"tea"` are anagrams as they can be rearranged to form each other.

Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]

Constraints:

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

<details>

<summary>Approach</summary>

Group by sorted-tuple key (or 26-letter count tuple).

</details>

```python
from collections import defaultdict
class Solution:
    def groupAnagrams(self, strs):
        g = defaultdict(list)
        for s in strs: g[''.join(sorted(s))].append(s)
        return list(g.values())
```

### 1. Two Sum

**Difficulty:** Easy · **Tags:** Array, Hash Table

[Leetcode](https://leetcode.com/problems/two-sum/)

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

Example 2:

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

Example 3:

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

Constraints:

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than `O(n^2)` time complexity?

<details>

<summary>Approach</summary>

One pass with a hashmap of value→index; look up `target − x`.

</details>

```python
class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, x in enumerate(nums):
            if target - x in seen: return [seen[target-x], i]
            seen[x] = i
```

### 202. Happy Number

**Difficulty:** Easy · **Tags:** Hash Table, Math, Two Pointers

[Leetcode](https://leetcode.com/problems/happy-number/)

Write an algorithm to determine if a number `n` is happy.

A happy number is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return `true` if `n` is a happy number, and `false` if not.

Example 1:

```
Input: n = 19
Output: true
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

Example 2:

```
Input: n = 2
Output: false
```

Constraints:

- `1 <= n <= 2^31 - 1`

<details>

<summary>Approach</summary>

Floyd cycle detection on the digit-square-sum function — either you hit 1 or you cycle.

</details>

```python
class Solution:
    def isHappy(self, n):
        def step(x):
            s = 0
            while x: x, d = divmod(x, 10); s += d*d
            return s
        slow, fast = n, step(n)
        while fast != 1 and slow != fast:
            slow = step(slow); fast = step(step(fast))
        return fast == 1
```

### 219. Contains Duplicate II

**Difficulty:** Easy · **Tags:** Array, Hash Table, Sliding Window

[Leetcode](https://leetcode.com/problems/contains-duplicate-ii/)

Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.

Example 1:

```
Input: nums = [1,2,3,1], k = 3
Output: true
```

Example 2:

```
Input: nums = [1,0,1,1], k = 1
Output: true
```

Example 3:

```
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
```

Constraints:

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= k <= 10^5`

<details>

<summary>Approach</summary>

Last-index hashmap; on revisit, check if index gap ≤ k.

</details>

```python
class Solution:
    def containsNearbyDuplicate(self, nums, k):
        last = {}
        for i, x in enumerate(nums):
            if x in last and i - last[x] <= k: return True
            last[x] = i
        return False
```

### 128. Longest Consecutive Sequence

**Difficulty:** Medium · **Tags:** Array, Hash Table, Union-Find

[Leetcode](https://leetcode.com/problems/longest-consecutive-sequence/)

Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in `O(n)` time.

Example 1:

```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.
```

Example 2:

```
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```

Example 3:

```
Input: nums = [1,0,1,2]
Output: 3
```

Constraints:

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

<details>

<summary>Approach</summary>

Put nums in a set. For each `x` with no `x-1` in set, walk upward counting the run.

</details>

```python
class Solution:
    def longestConsecutive(self, nums):
        s = set(nums); best = 0
        for x in s:
            if x - 1 in s: continue
            y = x
            while y + 1 in s: y += 1
            best = max(best, y - x + 1)
        return best
```

## Intervals

### 228. Summary Ranges

**Difficulty:** Easy · **Tags:** Array

[Leetcode](https://leetcode.com/problems/summary-ranges/)

You are given a sorted unique integer array `nums`.

A range `[a,b]` is the set of all integers from `a` to `b` (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of `nums` is covered by exactly one of the ranges, and there is no integer `x` such that `x` is in one of the ranges but not in `nums`.

Each range `[a,b]` in the list should be output as:

- `"a->b"` if `a != b`
- `"a"` if `a == b`

Example 1:

```
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

Example 2:

```
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
```

Constraints:

- `0 <= nums.length <= 20`
- `-2^31 <= nums[i] <= 2^31 - 1`
- All the values of `nums` are unique.
- `nums` is sorted in ascending order.

<details>

<summary>Approach</summary>

Walk array; whenever `nums[i] != nums[i-1] + 1`, close current range and start a new one.

</details>

```python
class Solution:
    def summaryRanges(self, nums):
        res = []; i = 0; n = len(nums)
        while i < n:
            j = i
            while j + 1 < n and nums[j+1] == nums[j] + 1: j += 1
            res.append(str(nums[i]) if i == j else f"{nums[i]}->{nums[j]}")
            i = j + 1
        return res
```

### 56. Merge Intervals

**Difficulty:** Medium · **Tags:** Array, Sorting

[Leetcode](https://leetcode.com/problems/merge-intervals/)

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:

```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

Example 2:

```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

Example 3:

```
Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.
```

Constraints:

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

<details>

<summary>Approach</summary>

Sort by start. Walk through; merge with last if overlapping, else append.

</details>

```python
class Solution:
    def merge(self, intervals):
        intervals.sort()
        res = []
        for s, e in intervals:
            if res and s <= res[-1][1]: res[-1][1] = max(res[-1][1], e)
            else: res.append([s, e])
        return res
```

### 57. Insert Interval

**Difficulty:** Medium · **Tags:** Array

[Leetcode](https://leetcode.com/problems/insert-interval/)

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` represent the start and the end of the `i^th` interval and `intervals` is sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` after the insertion.

Note that you don't need to modify `intervals` in-place. You can make a new array and return it.

Example 1:

```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

Example 2:

```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```

Constraints:

- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^5`
- `intervals` is sorted by `start_i` in ascending order.
- `newInterval.length == 2`
- `0 <= start <= end <= 10^5`

<details>

<summary>Approach</summary>

Three phases: copy intervals ending before new; merge overlapping ones into new; copy the rest.

</details>

```python
class Solution:
    def insert(self, intervals, newInterval):
        res = []; i = 0; n = len(intervals)
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i]); i += 1
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval = [min(newInterval[0], intervals[i][0]),
                           max(newInterval[1], intervals[i][1])]
            i += 1
        res.append(newInterval)
        res.extend(intervals[i:])
        return res
```

### 452. Minimum Number of Arrows to Burst Balloons

**Difficulty:** Medium · **Tags:** Array, Greedy, Sorting

[Leetcode](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)

There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [x_start, x_end]` denotes a balloon whose horizontal diameter stretches between `x_start` and `x_end`. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with `x_start` and `x_end` is burst by an arrow shot at `x` if `x_start <= x <= x_end`. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array `points`, return the minimum number of arrows that must be shot to burst all balloons.

Example 1:

```
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
```

Example 2:

```
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
```

Example 3:

```
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
```

Constraints:

- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `-2^31 <= x_start < x_end <= 2^31 - 1`

<details>

<summary>Approach</summary>

Sort by end. Greedy: shoot at current end; every subsequent balloon starting after that end needs a new arrow.

</details>

```python
class Solution:
    def findMinArrowShots(self, points):
        points.sort(key=lambda p: p[1])
        arrows = 0; last = -float('inf')
        for s, e in points:
            if s > last:
                arrows += 1; last = e
        return arrows
```

## Stack

### 20. Valid Parentheses

**Difficulty:** Easy · **Tags:** String, Stack

[Leetcode](https://leetcode.com/problems/valid-parentheses/)

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"

Output: false

Constraints:

- `1 <= s.length <= 10^4`
- `s` consists of parentheses only `'()[]{}'`.

<details>

<summary>Approach</summary>

Stack of expected closers; push when opener, check + pop when closer.

</details>

```python
class Solution:
    def isValid(self, s):
        pair = {')':'(', ']':'[', '}':'{'}
        st = []
        for ch in s:
            if ch in pair:
                if not st or st.pop() != pair[ch]: return False
            else: st.append(ch)
        return not st
```

### 71. Simplify Path

**Difficulty:** Medium · **Tags:** String, Stack

[Leetcode](https://leetcode.com/problems/simplify-path/)

You are given an absolute path for a Unix-style file system, which always begins with a slash `'/'`. Your task is to transform this absolute path into its simplified canonical path.

The rules of a Unix-style file system are as follows:

- A single period `'.'` represents the current directory.
- A double period `'..'` represents the previous/parent directory.
- Multiple consecutive slashes such as `'//'` and `'///'` are treated as a single slash `'/'`.
- Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, `'...' `and `'....'` are valid directory or file names.

The simplified canonical path should follow these rules:

- The path must start with a single slash `'/'`.
- Directories within the path must be separated by exactly one slash `'/'`.
- The path must not end with a slash `'/'`, unless it is the root directory.
- The path must not have any single or double periods (`'.'` and `'..'`) used to denote current or parent directories.

Return the simplified canonical path.

Example 1:

Input: path = "/home/"

Output: "/home"

Explanation:

The trailing slash should be removed.

Example 2:

Input: path = "/home//foo/"

Output: "/home/foo"

Explanation:

Multiple consecutive slashes are replaced by a single one.

Example 3:

Input: path = "/home/user/Documents/../Pictures"

Output: "/home/user/Pictures"

Explanation:

A double period `".."` refers to the directory up a level (the parent directory).

Example 4:

Input: path = "/../"

Output: "/"

Explanation:

Going one level up from the root directory is not possible.

Example 5:

Input: path = "/.../a/../b/c/../d/./"

Output: "/.../b/d"

Explanation:

`"..."` is a valid name for a directory in this problem.

Constraints:

- `1 <= path.length <= 3000`
- `path` consists of English letters, digits, period `'.'`, slash `'/'` or `'_'`.
- `path` is a valid absolute Unix path.

<details>

<summary>Approach</summary>

Split by `/`. Push real names on a stack; `..` pops; `.`/empty skipped.

</details>

```python
class Solution:
    def simplifyPath(self, path):
        st = []
        for part in path.split('/'):
            if part == '' or part == '.': continue
            if part == '..':
                if st: st.pop()
            else: st.append(part)
        return '/' + '/'.join(st)
```

### 155. Min Stack

**Difficulty:** Medium · **Tags:** Stack, Design

[Leetcode](https://leetcode.com/problems/min-stack/)

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:

- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with `O(1)` time complexity for each function.

Example 1:

```
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

Constraints:

- `-2^31 <= val <= 2^31 - 1`
- Methods `pop`, `top` and `getMin` operations will always be called on non-empty stacks.
- At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`.

<details>

<summary>Approach</summary>

Auxiliary stack tracking the running minimum at each level.

</details>

```python
class MinStack:
    def __init__(self):
        self.s = []; self.m = []
    def push(self, val):
        self.s.append(val)
        self.m.append(val if not self.m else min(val, self.m[-1]))
    def pop(self):
        self.s.pop(); self.m.pop()
    def top(self):
        return self.s[-1]
    def getMin(self):
        return self.m[-1]
```

### 150. Evaluate Reverse Polish Notation

**Difficulty:** Medium · **Tags:** Array, Math, Stack

[Leetcode](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:

- The valid operators are `'+'`, `'-'`, `'*'`, and `'/'`.
- Each operand may be an integer or another expression.
- The division between two integers always truncates toward zero.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in a reverse polish notation.
- The answer and all the intermediate calculations can be represented in a 32-bit integer.

Example 1:

```
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

Example 2:

```
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

Example 3:

```
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

Constraints:

- `1 <= tokens.length <= 10^4`
- `tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer in the range `[-200, 200]`.

<details>

<summary>Approach</summary>

Stack: push numbers; on operator, pop two and push result. Use integer truncation toward zero for division.

</details>

```python
class Solution:
    def evalRPN(self, tokens):
        st = []; ops = set("+-*/")
        for t in tokens:
            if t in ops:
                b = st.pop(); a = st.pop()
                if t == '+': st.append(a+b)
                elif t == '-': st.append(a-b)
                elif t == '*': st.append(a*b)
                else: st.append(int(a/b))
            else: st.append(int(t))
        return st[0]
```

### 224. Basic Calculator

**Difficulty:** Hard · **Tags:** Math, String, Stack, Recursion

[Leetcode](https://leetcode.com/problems/basic-calculator/)

Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.

Example 1:

```
Input: s = "1 + 1"
Output: 2
```

Example 2:

```
Input: s = " 2-1 + 2 "
Output: 3
```

Example 3:

```
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
```

Constraints:

- `1 <= s.length <= 3 * 10^5`
- `s` consists of digits, `'+'`, `'-'`, `'('`, `')'`, and `' '`.
- `s` represents a valid expression.
- `'+'` is not used as a unary operation (i.e., `"+1"` and `"+(2 + 3)"` is invalid).
- `'-'` could be used as a unary operation (i.e., `"-1"` and `"-(2 + 3)"` is valid).
- There will be no two consecutive operators in the input.
- Every number and running calculation will fit in a signed 32-bit integer.

<details>

<summary>Approach</summary>

Single pass with a stack of signs. Parentheses push the current sign multiplier; numbers are accumulated digit-by-digit.

</details>

```python
class Solution:
    def calculate(self, s):
        total, num, sign = 0, 0, 1
        st = []
        for ch in s + '+':
            if ch.isdigit():
                num = num * 10 + int(ch)
            elif ch in '+-':
                total += sign * num
                num = 0
                sign = 1 if ch == '+' else -1
            elif ch == '(':
                st.append(total); st.append(sign)
                total = 0; sign = 1
            elif ch == ')':
                total += sign * num; num = 0
                total *= st.pop()
                total += st.pop()
        return total
```

## Linked List

### 141. Linked List Cycle

**Difficulty:** Easy · **Tags:** Hash Table, Linked List, Two Pointers

[Leetcode](https://leetcode.com/problems/linked-list-cycle/)

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. Note that `pos` is not passed as a parameter.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

Example 1:

```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

Example 2:

```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

Example 3:

```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

Constraints:

- The number of the nodes in the list is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a valid index in the linked-list.

Follow up: Can you solve it using `O(1)` (i.e. constant) memory?

<details>

<summary>Approach</summary>

Floyd's tortoise & hare. Slow advances 1, fast advances 2; they meet iff there's a cycle.

</details>

```python
class Solution:
    def hasCycle(self, head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next; fast = fast.next.next
            if slow is fast: return True
        return False
```

### 2. Add Two Numbers

**Difficulty:** Medium · **Tags:** Linked List, Math, Recursion

[Leetcode](https://leetcode.com/problems/add-two-numbers/)

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:

```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

Example 2:

```
Input: l1 = [0], l2 = [0]
Output: [0]
```

Example 3:

```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

Constraints:

- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- It is guaranteed that the list represents a number that does not have leading zeros.

<details>

<summary>Approach</summary>

Walk both lists with a carry. Build a new list digit by digit.

</details>

```python
class Solution:
    def addTwoNumbers(self, l1, l2):
        from typing import Optional
        dummy = cur = type(l1)(0) if l1 else None
        # Use a generic node class compatible with LeetCode's ListNode.
        class _N:
            def __init__(self, v, n=None): self.val=v; self.next=n
        dummy = _N(0); cur = dummy; carry = 0
        while l1 or l2 or carry:
            s = carry + (l1.val if l1 else 0) + (l2.val if l2 else 0)
            carry, d = divmod(s, 10)
            cur.next = _N(d); cur = cur.next
            if l1: l1 = l1.next
            if l2: l2 = l2.next
        return dummy.next
```

### 21. Merge Two Sorted Lists

**Difficulty:** Easy · **Tags:** Linked List, Recursion

[Leetcode](https://leetcode.com/problems/merge-two-sorted-lists/)

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:

```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

Example 2:

```
Input: list1 = [], list2 = []
Output: []
```

Example 3:

```
Input: list1 = [], list2 = [0]
Output: [0]
```

Constraints:

- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in non-decreasing order.

<details>

<summary>Approach</summary>

Dummy head; splice the smaller node each step; attach remainder at end.

</details>

```python
class Solution:
    def mergeTwoLists(self, l1, l2):
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        dummy = _N(); cur = dummy
        while l1 and l2:
            if l1.val <= l2.val:
                cur.next = l1; l1 = l1.next
            else:
                cur.next = l2; l2 = l2.next
            cur = cur.next
        cur.next = l1 or l2
        return dummy.next
```

### 138. Copy List with Random Pointer

**Difficulty:** Medium · **Tags:** Hash Table, Linked List

[Leetcode](https://leetcode.com/problems/copy-list-with-random-pointer/)

A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a deep copy of the list. The deep copy should consist of exactly `n` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes `X` and `Y` in the original list, where `X.random --> Y`, then for the corresponding two nodes `x` and `y` in the copied list, `x.random --> y`.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of `n` nodes. Each node is represented as a pair of `[val, random_index]` where:

- `val`: an integer representing `Node.val`
- `random_index`: the index of the node (range from `0` to `n-1`) that the `random` pointer points to, or `null` if it does not point to any node.

Your code will only be given the `head` of the original linked list.

Example 1:

```
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

Example 2:

```
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
```

Example 3:

```
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
```

Constraints:

- `0 <= n <= 1000`
- `-10^4 <= Node.val <= 10^4`
- `Node.random` is `null` or is pointing to some node in the linked list.

<details>

<summary>Approach</summary>

Two passes with a hashmap old→new. First pass clones nodes; second pass wires `next` and `random`.

</details>

```python
class Solution:
    def copyRandomList(self, head):
        if not head: return None
        m = {}
        cur = head
        while cur:
            m[cur] = type(cur)(cur.val); cur = cur.next
        cur = head
        while cur:
            m[cur].next = m.get(cur.next)
            m[cur].random = m.get(cur.random)
            cur = cur.next
        return m[head]
```

### 92. Reverse Linked List II

**Difficulty:** Medium · **Tags:** Linked List

[Leetcode](https://leetcode.com/problems/reverse-linked-list-ii/)

Given the `head` of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.

Example 1:

```
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
```

Example 2:

```
Input: head = [5], left = 1, right = 1
Output: [5]
```

Constraints:

- The number of nodes in the list is `n`.
- `1 <= n <= 500`
- `-500 <= Node.val <= 500`
- `1 <= left <= right <= n`

Follow up: Could you do it in one pass?

<details>

<summary>Approach</summary>

Walk to position `left-1`, then iteratively splice the next node to the front of the sub-list `right-left` times.

</details>

```python
class Solution:
    def reverseBetween(self, head, left, right):
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        dummy = _N(0, head); prev = dummy
        for _ in range(left - 1): prev = prev.next
        cur = prev.next
        for _ in range(right - left):
            nxt = cur.next
            cur.next = nxt.next
            nxt.next = prev.next
            prev.next = nxt
        return dummy.next
```

### 25. Reverse Nodes in k-Group

**Difficulty:** Hard · **Tags:** Linked List, Recursion

[Leetcode](https://leetcode.com/problems/reverse-nodes-in-k-group/)

Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:

```
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
```

Example 2:

```
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
```

Constraints:

- The number of nodes in the list is `n`.
- `1 <= k <= n <= 5000`
- `0 <= Node.val <= 1000`

Follow-up: Can you solve the problem in `O(1)` extra memory space?

<details>

<summary>Approach</summary>

Walk in chunks of k (peek ahead to verify length); reverse each chunk in place and stitch.

</details>

```python
class Solution:
    def reverseKGroup(self, head, k):
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        dummy = _N(0, head); group_prev = dummy
        while True:
            kth = group_prev
            for _ in range(k):
                kth = kth.next
                if not kth: return dummy.next
            group_next = kth.next
            prev, cur = group_next, group_prev.next
            while cur is not group_next:
                nxt = cur.next; cur.next = prev; prev = cur; cur = nxt
            tmp = group_prev.next
            group_prev.next = kth
            group_prev = tmp
```

### 19. Remove Nth Node From End of List

**Difficulty:** Medium · **Tags:** Linked List, Two Pointers

[Leetcode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

Given the `head` of a linked list, remove the `n^th` node from the end of the list and return its head.

Example 1:

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

Example 2:

```
Input: head = [1], n = 1
Output: []
```

Example 3:

```
Input: head = [1,2], n = 1
Output: [1]
```

Constraints:

- The number of nodes in the list is `sz`.
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

Follow up: Could you do this in one pass?

<details>

<summary>Approach</summary>

Two-pointer gap of n: advance fast n steps, then move both until fast hits end; slow is at the previous node.

</details>

```python
class Solution:
    def removeNthFromEnd(self, head, n):
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        dummy = _N(0, head); fast = slow = dummy
        for _ in range(n): fast = fast.next
        while fast.next:
            fast = fast.next; slow = slow.next
        slow.next = slow.next.next
        return dummy.next
```

### 82. Remove Duplicates from Sorted List II

**Difficulty:** Medium · **Tags:** Linked List, Two Pointers

[Leetcode](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

Given the `head` of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

Example 1:

```
Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
```

Example 2:

```
Input: head = [1,1,1,2,3]
Output: [2,3]
```

Constraints:

- The number of nodes in the list is in the range `[0, 300]`.
- `-100 <= Node.val <= 100`
- The list is guaranteed to be sorted in ascending order.

<details>

<summary>Approach</summary>

Dummy head + previous-distinct pointer. If `cur.val == cur.next.val`, skip the entire run; else advance prev.

</details>

```python
class Solution:
    def deleteDuplicates(self, head):
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        dummy = _N(0, head); prev = dummy
        while head:
            if head.next and head.val == head.next.val:
                while head.next and head.val == head.next.val: head = head.next
                prev.next = head.next
            else:
                prev = prev.next
            head = head.next
        return dummy.next
```

### 61. Rotate List

**Difficulty:** Medium · **Tags:** Linked List, Two Pointers

[Leetcode](https://leetcode.com/problems/rotate-list/)

Given the `head` of a linked list, rotate the list to the right by `k` places.

Example 1:

```
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
```

Example 2:

```
Input: head = [0,1,2], k = 4
Output: [2,0,1]
```

Constraints:

- The number of nodes in the list is in the range `[0, 500]`.
- `-100 <= Node.val <= 100`
- `0 <= k <= 2 * 10^9`

<details>

<summary>Approach</summary>

Find length, connect tail→head to form a ring, then break the ring at `length − k%length`.

</details>

```python
class Solution:
    def rotateRight(self, head, k):
        if not head or not head.next: return head
        n = 1; tail = head
        while tail.next: tail = tail.next; n += 1
        k %= n
        if k == 0: return head
        tail.next = head
        new_tail = head
        for _ in range(n - k - 1): new_tail = new_tail.next
        new_head = new_tail.next
        new_tail.next = None
        return new_head
```

### 86. Partition List

**Difficulty:** Medium · **Tags:** Linked List, Two Pointers

[Leetcode](https://leetcode.com/problems/partition-list/)

Given the `head` of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`.

You should preserve the original relative order of the nodes in each of the two partitions.

Example 1:

```
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
```

Example 2:

```
Input: head = [2,1], x = 2
Output: [1,2]
```

Constraints:

- The number of nodes in the list is in the range `[0, 200]`.
- `-100 <= Node.val <= 100`
- `-200 <= x <= 200`

<details>

<summary>Approach</summary>

Build two separate lists (less-than-x, ≥x) then concatenate them.

</details>

```python
class Solution:
    def partition(self, head, x):
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        lo, hi = _N(), _N(); lt, ht = lo, hi
        while head:
            if head.val < x: lt.next = head; lt = lt.next
            else: ht.next = head; ht = ht.next
            head = head.next
        ht.next = None; lt.next = hi.next
        return lo.next
```

### 146. LRU Cache

**Difficulty:** Medium · **Tags:** Hash Table, Linked List, Design, Doubly-Linked List

[Leetcode](https://leetcode.com/problems/lru-cache/)

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the `LRUCache` class:

- `LRUCache(int capacity)` Initialize the LRU cache with positive size `capacity`.
- `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.
- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.

The functions `get` and `put` must each run in `O(1)` average time complexity.

Example 1:

```
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

Constraints:

- `1 <= capacity <= 3000`
- `0 <= key <= 10^4`
- `0 <= value <= 10^5`
- At most `2 * 10^5` calls will be made to `get` and `put`.

<details>

<summary>Approach</summary>

Hashmap + doubly linked list. Sentinel head/tail; hashmap maps key→node for O(1) move-to-front and eviction.

</details>

```python
class LRUCache:
    class _N:
        __slots__ = ('k','v','p','n')
        def __init__(self, k=0, v=0):
            self.k=k; self.v=v; self.p=self.n=None
    def __init__(self, capacity):
        self.cap = capacity; self.m = {}
        self.h = self._N(); self.t = self._N()
        self.h.n = self.t; self.t.p = self.h
    def _remove(self, x):
        x.p.n = x.n; x.n.p = x.p
    def _add_front(self, x):
        x.n = self.h.n; x.p = self.h
        self.h.n.p = x; self.h.n = x
    def get(self, key):
        if key not in self.m: return -1
        x = self.m[key]; self._remove(x); self._add_front(x)
        return x.v
    def put(self, key, value):
        if key in self.m:
            x = self.m[key]; x.v = value; self._remove(x); self._add_front(x); return
        if len(self.m) == self.cap:
            old = self.t.p; self._remove(old); del self.m[old.k]
        x = self._N(key, value); self.m[key] = x; self._add_front(x)
```

## Binary Tree General

### 104. Maximum Depth of Binary Tree

**Difficulty:** Easy · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

Given the `root` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Example 1:

```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

Example 2:

```
Input: root = [1,null,2]
Output: 2
```

Constraints:

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

<details>

<summary>Approach</summary>

Recurse: depth = 1 + max(left depth, right depth); 0 for None.

</details>

```python
class Solution:
    def maxDepth(self, root):
        if not root: return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
```

### 100. Same Tree

**Difficulty:** Easy · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/same-tree/)

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:

```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

Example 2:

```
Input: p = [1,2], q = [1,null,2]
Output: false
```

Example 3:

```
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

Constraints:

- The number of nodes in both trees is in the range `[0, 100]`.
- `-10^4 <= Node.val <= 10^4`

<details>

<summary>Approach</summary>

Both null → equal; one null → not equal; otherwise val match and recurse on children.

</details>

```python
class Solution:
    def isSameTree(self, p, q):
        if not p and not q: return True
        if not p or not q or p.val != q.val: return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

### 226. Invert Binary Tree

**Difficulty:** Easy · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/invert-binary-tree/)

Given the `root` of a binary tree, invert the tree, and return its root.

Example 1:

```
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

Example 2:

```
Input: root = [2,1,3]
Output: [2,3,1]
```

Example 3:

```
Input: root = []
Output: []
```

Constraints:

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

<details>

<summary>Approach</summary>

Swap children and recurse.

</details>

```python
class Solution:
    def invertTree(self, root):
        if not root: return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root
```

### 101. Symmetric Tree

**Difficulty:** Easy · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/symmetric-tree/)

Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1:

```
Input: root = [1,2,2,3,4,4,3]
Output: true
```

Example 2:

```
Input: root = [1,2,2,null,3,null,3]
Output: false
```

Constraints:

- The number of nodes in the tree is in the range `[1, 1000]`.
- `-100 <= Node.val <= 100`

Follow up: Could you solve it both recursively and iteratively?

<details>

<summary>Approach</summary>

Helper compares mirror pairs: left.left vs right.right, left.right vs right.left.

</details>

```python
class Solution:
    def isSymmetric(self, root):
        def mir(a, b):
            if not a and not b: return True
            if not a or not b or a.val != b.val: return False
            return mir(a.left, b.right) and mir(a.right, b.left)
        return mir(root, root)
```

### 105. Construct Binary Tree from Preorder and Inorder Traversal

**Difficulty:** Medium · **Tags:** Array, Hash Table, Divide and Conquer, Tree, Binary Tree

[Leetcode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

Example 1:

```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

Example 2:

```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

Constraints:

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` and `inorder` consist of unique values.
- Each value of `inorder` also appears in `preorder`.
- `preorder` is guaranteed to be the preorder traversal of the tree.
- `inorder` is guaranteed to be the inorder traversal of the tree.

<details>

<summary>Approach</summary>

Root = first of preorder; split inorder at that root to get left/right inorder sizes; recurse with the matching preorder slices. Index map gives O(n).

</details>

```python
class Solution:
    def buildTree(self, preorder, inorder):
        class _N:
            def __init__(self, v): self.val=v; self.left=self.right=None
        idx = {v:i for i,v in enumerate(inorder)}
        it = iter(preorder)
        def build(l, r):
            if l > r: return None
            v = next(it); node = _N(v); m = idx[v]
            node.left = build(l, m-1); node.right = build(m+1, r)
            return node
        return build(0, len(inorder)-1)
```

### 106. Construct Binary Tree from Inorder and Postorder Traversal

**Difficulty:** Medium · **Tags:** Array, Hash Table, Divide and Conquer, Tree, Binary Tree

[Leetcode](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return the binary tree.

Example 1:

```
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
```

Example 2:

```
Input: inorder = [-1], postorder = [-1]
Output: [-1]
```

Constraints:

- `1 <= inorder.length <= 3000`
- `postorder.length == inorder.length`
- `-3000 <= inorder[i], postorder[i] <= 3000`
- `inorder` and `postorder` consist of unique values.
- Each value of `postorder` also appears in `inorder`.
- `inorder` is guaranteed to be the inorder traversal of the tree.
- `postorder` is guaranteed to be the postorder traversal of the tree.

<details>

<summary>Approach</summary>

Root = last of postorder; consume postorder from the right; recurse right then left.

</details>

```python
class Solution:
    def buildTree(self, inorder, postorder):
        class _N:
            def __init__(self, v): self.val=v; self.left=self.right=None
        idx = {v:i for i,v in enumerate(inorder)}
        def build(l, r):
            if l > r: return None
            v = postorder.pop(); node = _N(v); m = idx[v]
            node.right = build(m+1, r); node.left = build(l, m-1)
            return node
        return build(0, len(inorder)-1)
```

### 117. Populating Next Right Pointers in Each Node II

**Difficulty:** Medium · **Tags:** Linked List, Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)

Given a binary tree

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

Example 1:

```
Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
```

Example 2:

```
Input: root = []
Output: []
```

Constraints:

- The number of nodes in the tree is in the range `[0, 6000]`.
- `-100 <= Node.val <= 100`

Follow-up:

- You may only use constant extra space.
- The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

<details>

<summary>Approach</summary>

Level-by-level traversal using the already-wired `next` pointers of the current level to build the next.

</details>

```python
class Solution:
    def connect(self, root):
        if not root: return None
        cur = root
        while cur:
            dummy = type(cur)(0); tail = dummy
            p = cur
            while p:
                if p.left: tail.next = p.left; tail = tail.next
                if p.right: tail.next = p.right; tail = tail.next
                p = p.next
            cur = dummy.next
        return root
```

### 114. Flatten Binary Tree to Linked List

**Difficulty:** Medium · **Tags:** Linked List, Stack, Tree, Depth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)

Given the `root` of a binary tree, flatten the tree into a "linked list":

- The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.
- The "linked list" should be in the same order as a pre-order traversal of the binary tree.

Example 1:

```
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```

Example 2:

```
Input: root = []
Output: []
```

Example 3:

```
Input: root = [0]
Output: [0]
```

Constraints:

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-100 <= Node.val <= 100`

Follow up: Can you flatten the tree in-place (with `O(1)` extra space)?

<details>

<summary>Approach</summary>

Reverse-Morris: traverse right→left→root and chain each node into a running `prev`.

</details>

```python
class Solution:
    def flatten(self, root):
        self.prev = None
        def rec(node):
            if not node: return
            rec(node.right); rec(node.left)
            node.right = self.prev; node.left = None
            self.prev = node
        rec(root)
```

### 112. Path Sum

**Difficulty:** Easy · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/path-sum/)

Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.

A leaf is a node with no children.

Example 1:

```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
```

Example 2:

```
Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There are two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
```

Example 3:

```
Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
```

Constraints:

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

<details>

<summary>Approach</summary>

DFS subtracting `node.val`; at a leaf check whether remaining target is 0.

</details>

```python
class Solution:
    def hasPathSum(self, root, targetSum):
        if not root: return False
        if not root.left and not root.right: return root.val == targetSum
        t = targetSum - root.val
        return self.hasPathSum(root.left, t) or self.hasPathSum(root.right, t)
```

### 129. Sum Root to Leaf Numbers

**Difficulty:** Medium · **Tags:** Tree, Depth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/sum-root-to-leaf-numbers/)

You are given the `root` of a binary tree containing digits from `0` to `9` only.

Each root-to-leaf path in the tree represents a number.

- For example, the root-to-leaf path `1 -> 2 -> 3` represents the number `123`.

Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A leaf node is a node with no children.

Example 1:

```
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path `1->2` represents the number `12`.
The root-to-leaf path `1->3` represents the number `13`.
Therefore, sum = 12 + 13 = `25`.
```

Example 2:

```
Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path `4->9->5` represents the number 495.
The root-to-leaf path `4->9->1` represents the number 491.
The root-to-leaf path `4->0` represents the number 40.
Therefore, sum = 495 + 491 + 40 = `1026`.
```

Constraints:

- The number of nodes in the tree is in the range `[1, 1000]`.
- `0 <= Node.val <= 9`
- The depth of the tree will not exceed `10`.

<details>

<summary>Approach</summary>

DFS carrying running number `cur*10 + val`; at leaves add to total.

</details>

```python
class Solution:
    def sumNumbers(self, root):
        def dfs(node, cur):
            if not node: return 0
            cur = cur*10 + node.val
            if not node.left and not node.right: return cur
            return dfs(node.left, cur) + dfs(node.right, cur)
        return dfs(root, 0)
```

### 124. Binary Tree Maximum Path Sum

**Difficulty:** Hard · **Tags:** Dynamic Programming, Tree, Depth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return the maximum path sum of any non-empty path.

Example 1:

```
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
```

Example 2:

```
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
```

Constraints:

- The number of nodes in the tree is in the range `[1, 3 * 10^4]`.
- `-1000 <= Node.val <= 1000`

<details>

<summary>Approach</summary>

Post-order recursion returning the best one-sided gain (≥0). At each node update global best with `node.val + leftGain + rightGain`.

</details>

```python
class Solution:
    def maxPathSum(self, root):
        self.best = float('-inf')
        def gain(n):
            if not n: return 0
            l = max(0, gain(n.left)); r = max(0, gain(n.right))
            self.best = max(self.best, n.val + l + r)
            return n.val + max(l, r)
        gain(root); return self.best
```

### 173. Binary Search Tree Iterator

**Difficulty:** Medium · **Tags:** Stack, Tree, Design, Binary Search Tree, Binary Tree, Iterator

[Leetcode](https://leetcode.com/problems/binary-search-tree-iterator/)

Implement the `BSTIterator` class that represents an iterator over the in-order traversal of a binary search tree (BST):

- `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
- `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.
- `int next()` Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` calls will always be valid. That is, there will be at least a next number in the in-order traversal when `next()` is called.

Example 1:

```
Input
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output
[null, 3, 7, true, 9, true, 15, true, 20, false]

Explanation
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
bSTIterator.next();    // return 3
bSTIterator.next();    // return 7
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 9
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 15
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 20
bSTIterator.hasNext(); // return False
```

Constraints:

- The number of nodes in the tree is in the range `[1, 10^5]`.
- `0 <= Node.val <= 10^6`
- At most `10^5` calls will be made to `hasNext`, and `next`.

Follow up:

- Could you implement `next()` and `hasNext()` to run in average `O(1)` time and use `O(h)` memory, where `h` is the height of the tree?

<details>

<summary>Approach</summary>

Stack-based controlled in-order. On init push left spine; `next` pops, then pushes left spine of popped node's right child.

</details>

```python
class BSTIterator:
    def __init__(self, root):
        self.st = []; self._push(root)
    def _push(self, n):
        while n: self.st.append(n); n = n.left
    def next(self):
        n = self.st.pop(); self._push(n.right); return n.val
    def hasNext(self):
        return bool(self.st)
```

### 222. Count Complete Tree Nodes

**Difficulty:** Easy · **Tags:** Binary Search, Bit Manipulation, Tree, Binary Tree

[Leetcode](https://leetcode.com/problems/count-complete-tree-nodes/)

Given the `root` of a complete binary tree, return the number of the nodes in the tree.

According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between `1` and `2^h` nodes inclusive at the last level `h`.

Design an algorithm that runs in less than O(n)` time complexity.

Example 1:

```
Input: root = [1,2,3,4,5,6]
Output: 6
```

Example 2:

```
Input: root = []
Output: 0
```

Example 3:

```
Input: root = [1]
Output: 1
```

Constraints:

- The number of nodes in the tree is in the range `[0, 5 * 10^4]`.
- `0 <= Node.val <= 5 * 10^4`
- The tree is guaranteed to be complete.

<details>

<summary>Approach</summary>

Compare left-spine and right-spine heights. Equal → perfect subtree of size 2^h−1; otherwise recurse on both sides.

</details>

```python
class Solution:
    def countNodes(self, root):
        def h_left(n):
            d = 0
            while n: n = n.left; d += 1
            return d
        def h_right(n):
            d = 0
            while n: n = n.right; d += 1
            return d
        if not root: return 0
        l, r = h_left(root), h_right(root)
        if l == r: return (1 << l) - 1
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
```

### 236. Lowest Common Ancestor of a Binary Tree

**Difficulty:** Medium · **Tags:** Tree, Depth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).”

Example 1:

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
```

Example 2:

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
```

Example 3:

```
Input: root = [1,2], p = 1, q = 2
Output: 1
```

Constraints:

- The number of nodes in the tree is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are unique.
- `p != q`
- `p` and `q` will exist in the tree.

<details>

<summary>Approach</summary>

Recursive search: if subtree contains either p or q return it; if both sides return non-null, current node is LCA.

</details>

```python
class Solution:
    def lowestCommonAncestor(self, root, p, q):
        if not root or root is p or root is q: return root
        l = self.lowestCommonAncestor(root.left, p, q)
        r = self.lowestCommonAncestor(root.right, p, q)
        if l and r: return root
        return l or r
```

## Binary Tree BFS

### 199. Binary Tree Right Side View

**Difficulty:** Medium · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/binary-tree-right-side-view/)

Given the `root` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

Example 1:

Input: root = [1,2,3,null,5,null,4]

Output: [1,3,4]

Explanation:

Example 2:

Input: root = [1,2,3,4,null,null,null,5]

Output: [1,3,4,5]

Explanation:

Example 3:

Input: root = [1,null,3]

Output: [1,3]

Example 4:

Input: root = []

Output: []

Constraints:

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

<details>

<summary>Approach</summary>

BFS by level; last node of each level joins the answer.

</details>

```python
from collections import deque
class Solution:
    def rightSideView(self, root):
        if not root: return []
        res = []; q = deque([root])
        while q:
            n = len(q); last = None
            for _ in range(n):
                x = q.popleft(); last = x.val
                if x.left: q.append(x.left)
                if x.right: q.append(x.right)
            res.append(last)
        return res
```

### 637. Average of Levels in Binary Tree

**Difficulty:** Easy · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/average-of-levels-in-binary-tree/)

Given the `root` of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within `10^-5` of the actual answer will be accepted.

Example 1:

```
Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
Hence return [3, 14.5, 11].
```

Example 2:

```
Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]
```

Constraints:

- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

<details>

<summary>Approach</summary>

BFS; for each level compute sum / count.

</details>

```python
from collections import deque
class Solution:
    def averageOfLevels(self, root):
        q = deque([root]); res = []
        while q:
            n = len(q); s = 0
            for _ in range(n):
                x = q.popleft(); s += x.val
                if x.left: q.append(x.left)
                if x.right: q.append(x.right)
            res.append(s / n)
        return res
```

### 102. Binary Tree Level Order Traversal

**Difficulty:** Medium · **Tags:** Tree, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/binary-tree-level-order-traversal/)

Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example 1:

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

Example 2:

```
Input: root = [1]
Output: [[1]]
```

Example 3:

```
Input: root = []
Output: []
```

Constraints:

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

<details>

<summary>Approach</summary>

Standard BFS, collecting one list per level.

</details>

```python
from collections import deque
class Solution:
    def levelOrder(self, root):
        if not root: return []
        res = []; q = deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                x = q.popleft(); level.append(x.val)
                if x.left: q.append(x.left)
                if x.right: q.append(x.right)
            res.append(level)
        return res
```

### 103. Binary Tree Zigzag Level Order Traversal

**Difficulty:** Medium · **Tags:** Tree, Breadth-First Search, Binary Tree

[Leetcode](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

Example 1:

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
```

Example 2:

```
Input: root = [1]
Output: [[1]]
```

Example 3:

```
Input: root = []
Output: []
```

Constraints:

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-100 <= Node.val <= 100`

<details>

<summary>Approach</summary>

BFS with a flag flipped each level — reverse the level list when going right→left.

</details>

```python
from collections import deque
class Solution:
    def zigzagLevelOrder(self, root):
        if not root: return []
        res = []; q = deque([root]); ltr = True
        while q:
            level = []
            for _ in range(len(q)):
                x = q.popleft(); level.append(x.val)
                if x.left: q.append(x.left)
                if x.right: q.append(x.right)
            res.append(level if ltr else level[::-1]); ltr = not ltr
        return res
```

## Binary Search Tree

### 530. Minimum Absolute Difference in BST

**Difficulty:** Easy · **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Search Tree, Binary Tree

[Leetcode](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)

Given the `root` of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

Example 1:

```
Input: root = [4,2,6,1,3]
Output: 1
```

Example 2:

```
Input: root = [1,0,48,null,null,12,49]
Output: 1
```

Constraints:

- The number of nodes in the tree is in the range `[2, 10^4]`.
- `0 <= Node.val <= 10^5`

Note: This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

<details>

<summary>Approach</summary>

In-order traversal yields sorted values; track previous and minimum gap.

</details>

```python
class Solution:
    def getMinimumDifference(self, root):
        self.prev = None; self.best = float('inf')
        def inorder(n):
            if not n: return
            inorder(n.left)
            if self.prev is not None: self.best = min(self.best, n.val - self.prev)
            self.prev = n.val
            inorder(n.right)
        inorder(root); return self.best
```

### 230. Kth Smallest Element in a BST

**Difficulty:** Medium · **Tags:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

[Leetcode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

Given the `root` of a binary search tree, and an integer `k`, return the `k^th` smallest value (1-indexed) of all the values of the nodes in the tree.

Example 1:

```
Input: root = [3,1,4,null,2], k = 1
Output: 1
```

Example 2:

```
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

Constraints:

- The number of nodes in the tree is `n`.
- `1 <= k <= n <= 10^4`
- `0 <= Node.val <= 10^4`

Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

<details>

<summary>Approach</summary>

Iterative in-order with a stack; stop after k pops.

</details>

```python
class Solution:
    def kthSmallest(self, root, k):
        st = []; cur = root
        while True:
            while cur: st.append(cur); cur = cur.left
            cur = st.pop(); k -= 1
            if k == 0: return cur.val
            cur = cur.right
```

### 98. Validate Binary Search Tree

**Difficulty:** Medium · **Tags:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

[Leetcode](https://leetcode.com/problems/validate-binary-search-tree/)

Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

- The left subtree of a node contains only nodes with keys strictly less than the node's key.
- The right subtree of a node contains only nodes with keys strictly greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

Example 1:

```
Input: root = [2,1,3]
Output: true
```

Example 2:

```
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

Constraints:

- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

<details>

<summary>Approach</summary>

DFS with (low, high) bounds inherited from ancestors; each node must lie strictly in (low, high).

</details>

```python
class Solution:
    def isValidBST(self, root, lo=float('-inf'), hi=float('inf')):
        if not root: return True
        if not (lo < root.val < hi): return False
        return (self.isValidBST(root.left, lo, root.val)
            and self.isValidBST(root.right, root.val, hi))
```

## Graph General

### 200. Number of Islands

**Difficulty:** Medium · **Tags:** Array, Depth-First Search, Breadth-First Search, Union-Find, Matrix

[Leetcode](https://leetcode.com/problems/number-of-islands/)

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:

```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

Example 2:

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

Constraints:

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`.

<details>

<summary>Approach</summary>

DFS or BFS from each unvisited '1', sinking the whole island to '0'. Count starts.

</details>

```python
class Solution:
    def numIslands(self, grid):
        R, C = len(grid), len(grid[0]); count = 0
        def dfs(r, c):
            if r<0 or r>=R or c<0 or c>=C or grid[r][c] != '1': return
            grid[r][c] = '0'
            dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
        for r in range(R):
            for c in range(C):
                if grid[r][c] == '1': count += 1; dfs(r, c)
        return count
```

### 130. Surrounded Regions

**Difficulty:** Medium · **Tags:** Array, Depth-First Search, Breadth-First Search, Union-Find, Matrix

[Leetcode](https://leetcode.com/problems/surrounded-regions/)

You are given an `m x n` matrix `board` containing letters `'X'` and `'O'`, capture regions that are surrounded:

- Connect: A cell is connected to adjacent cells horizontally or vertically.
- Region: To form a region connect every `'O'` cell.
- Surround: A region is surrounded if none of the `'O'` cells in that region are on the edge of the board. Such regions are completely enclosed by `'X'` cells.

To capture a surrounded region, replace all `'O'`s with `'X'`s in-place within the original board. You do not need to return anything.

Example 1:

Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

Explanation:

In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.

Example 2:

Input: board = [["X"]]

Output: [["X"]]

Constraints:

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 200`
- `board[i][j]` is `'X'` or `'O'`.

<details>

<summary>Approach</summary>

Mark all 'O' connected to a border as safe; flip remaining 'O' to 'X', restore safe to 'O'.

</details>

```python
class Solution:
    def solve(self, board):
        R, C = len(board), len(board[0])
        def dfs(r, c):
            if r<0 or r>=R or c<0 or c>=C or board[r][c] != 'O': return
            board[r][c] = '#'
            dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
        for r in range(R):
            dfs(r, 0); dfs(r, C-1)
        for c in range(C):
            dfs(0, c); dfs(R-1, c)
        for r in range(R):
            for c in range(C):
                board[r][c] = 'O' if board[r][c] == '#' else 'X'
```

### 133. Clone Graph

**Difficulty:** Medium · **Tags:** Hash Table, Depth-First Search, Breadth-First Search, Graph Theory

[Leetcode](https://leetcode.com/problems/clone-graph/)

Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

```
class Node {
    public int val;
    public List<Node> neighbors;
}
```

Test case format:

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with `val == 1`, the second node with `val == 2`, and so on. The graph is represented in the test case using an adjacency list.

An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with `val = 1`. You must return the copy of the given node as a reference to the cloned graph.

Example 1:

```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
```

Example 2:

```
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
```

Example 3:

```
Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.
```

Constraints:

- The number of nodes in the graph is in the range `[0, 100]`.
- `1 <= Node.val <= 100`
- `Node.val` is unique for each node.
- There are no repeated edges and no self-loops in the graph.
- The Graph is connected and all nodes can be visited starting from the given node.

<details>

<summary>Approach</summary>

DFS with a node→clone hashmap; create clone before recursing on neighbors.

</details>

```python
class Solution:
    def cloneGraph(self, node):
        if not node: return None
        m = {}
        def dfs(n):
            if n in m: return m[n]
            c = type(n)(n.val); m[n] = c
            c.neighbors = [dfs(nb) for nb in n.neighbors]
            return c
        return dfs(node)
```

### 399. Evaluate Division

**Difficulty:** Medium · **Tags:** Array, String, Depth-First Search, Breadth-First Search, Union-Find, Graph Theory, Shortest Path

[Leetcode](https://leetcode.com/problems/evaluate-division/)

You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [A_i, B_i]` and `values[i]` represent the equation `A_i / B_i = values[i]`. Each `A_i` or `B_i` is a string that represents a single variable.

You are also given some `queries`, where `queries[j] = [C_j, D_j]` represents the `j^th` query where you must find the answer for `C_j / D_j = ?`.

Return the answers to all queries. If a single answer cannot be determined, return `-1.0`.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.

Example 1:

```
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? 
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
note: x is undefined => -1.0
```

Example 2:

```
Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]
```

Example 3:

```
Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]
```

Constraints:

- `1 <= equations.length <= 20`
- `equations[i].length == 2`
- `1 <= A_i.length, B_i.length <= 5`
- `values.length == equations.length`
- `0.0 < values[i] <= 20.0`
- `1 <= queries.length <= 20`
- `queries[i].length == 2`
- `1 <= C_j.length, D_j.length <= 5`
- `A_i, B_i, C_j, D_j` consist of lower case English letters and digits.

<details>

<summary>Approach</summary>

Build a weighted directed graph (a/b = w → edge a→b weight w, b→a weight 1/w). DFS product from source to target.

</details>

```python
from collections import defaultdict
class Solution:
    def calcEquation(self, equations, values, queries):
        g = defaultdict(dict)
        for (a,b), v in zip(equations, values):
            g[a][b] = v; g[b][a] = 1.0/v
        def dfs(s, t, seen):
            if s not in g or t not in g: return -1.0
            if s == t: return 1.0
            seen.add(s)
            for nb, w in g[s].items():
                if nb in seen: continue
                r = dfs(nb, t, seen)
                if r != -1.0: return w * r
            return -1.0
        return [dfs(a, b, set()) for a, b in queries]
```

### 207. Course Schedule

**Difficulty:** Medium · **Tags:** Depth-First Search, Breadth-First Search, Graph Theory, Topological Sort

[Leetcode](https://leetcode.com/problems/course-schedule/)

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`.

- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

Example 1:

```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
```

Example 2:

```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
```

Constraints:

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= a_i, b_i < numCourses`
- All the pairs prerequisites[i] are unique.

<details>

<summary>Approach</summary>

Topological sort via Kahn's algorithm: detect a cycle by whether we manage to process all nodes.

</details>

```python
from collections import defaultdict, deque
class Solution:
    def canFinish(self, n, prerequisites):
        g = defaultdict(list); indeg = [0]*n
        for a, b in prerequisites:
            g[b].append(a); indeg[a] += 1
        q = deque(i for i in range(n) if indeg[i] == 0); done = 0
        while q:
            x = q.popleft(); done += 1
            for y in g[x]:
                indeg[y] -= 1
                if indeg[y] == 0: q.append(y)
        return done == n
```

### 210. Course Schedule II

**Difficulty:** Medium · **Tags:** Depth-First Search, Breadth-First Search, Graph Theory, Topological Sort

[Leetcode](https://leetcode.com/problems/course-schedule-ii/)

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`.

- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

Example 1:

```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
```

Example 2:

```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
```

Example 3:

```
Input: numCourses = 1, prerequisites = []
Output: [0]
```

Constraints:

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length == 2`
- `0 <= a_i, b_i < numCourses`
- `a_i != b_i`
- All the pairs `[a_i, b_i]` are distinct.

<details>

<summary>Approach</summary>

Same Kahn's algorithm but record processing order; empty if a cycle exists.

</details>

```python
from collections import defaultdict, deque
class Solution:
    def findOrder(self, n, prerequisites):
        g = defaultdict(list); indeg = [0]*n
        for a, b in prerequisites:
            g[b].append(a); indeg[a] += 1
        q = deque(i for i in range(n) if indeg[i] == 0); order = []
        while q:
            x = q.popleft(); order.append(x)
            for y in g[x]:
                indeg[y] -= 1
                if indeg[y] == 0: q.append(y)
        return order if len(order) == n else []
```

## Graph BFS

### 909. Snakes and Ladders

**Difficulty:** Medium · **Tags:** Array, Breadth-First Search, Matrix

[Leetcode](https://leetcode.com/problems/snakes-and-ladders/)

You are given an `n x n` integer matrix `board` where the cells are labeled from `1` to `n^2` in a Boustrophedon style starting from the bottom left of the board (i.e. `board[n - 1][0]`) and alternating direction each row.

You start on square `1` of the board. In each move, starting from square `curr`, do the following:

- Choose a destination square `next` with a label in the range `[curr + 1, min(curr + 6, n^2)]`.
- This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations, regardless of the size of the board.
- If `next` has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to `next`.
- The game ends when you reach the square `n^2`.

A board square on row `r` and column `c` has a snake or ladder if `board[r][c] != -1`. The destination of that snake or ladder is `board[r][c]`. Squares `1` and `n^2` are not the starting points of any snake or ladder.

Note that you only take a snake or ladder at most once per dice roll. If the destination to a snake or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

- For example, suppose the board is `[[-1,4],[-1,3]]`, and on the first move, your destination square is `2`. You follow the ladder to square `3`, but do not follow the subsequent ladder to `4`.

Return the least number of dice rolls required to reach the square `n^2`. If it is not possible to reach the square, return `-1`.

Example 1:

```
Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
Output: 4
Explanation: 
In the beginning, you start at square 1 (at row 5, column 0).
You decide to move to square 2 and must take the ladder to square 15.
You then decide to move to square 17 and must take the snake to square 13.
You then decide to move to square 14 and must take the ladder to square 35.
You then decide to move to square 36, ending the game.
This is the lowest possible number of moves to reach the last square, so return 4.
```

Example 2:

```
Input: board = [[-1,-1],[-1,3]]
Output: 1
```

Constraints:

- `n == board.length == board[i].length`
- `2 <= n <= 20`
- `board[i][j]` is either `-1` or in the range `[1, n^2]`.
- The squares labeled `1` and `n^2` are not the starting points of any snake or ladder.

<details>

<summary>Approach</summary>

BFS over labels 1..n²; each state has up to 6 successors. Convert label to (row, col) accounting for boustrophedon order.

</details>

```python
from collections import deque
class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        def cell(label):
            q, r = divmod(label - 1, n)
            row = n - 1 - q
            col = r if q % 2 == 0 else n - 1 - r
            return board[row][col]
        seen = {1}; q = deque([(1, 0)])
        while q:
            s, d = q.popleft()
            if s == n*n: return d
            for nxt in range(s+1, min(s+6, n*n) + 1):
                dest = cell(nxt)
                if dest != -1: nxt2 = dest
                else: nxt2 = nxt
                if nxt2 not in seen:
                    seen.add(nxt2); q.append((nxt2, d+1))
        return -1
```

### 433. Minimum Genetic Mutation

**Difficulty:** Medium · **Tags:** Hash Table, String, Breadth-First Search

[Leetcode](https://leetcode.com/problems/minimum-genetic-mutation/)

A gene string can be represented by an 8-character long string, with choices from `'A'`, `'C'`, `'G'`, and `'T'`.

Suppose we need to investigate a mutation from a gene string `startGene` to a gene string `endGene` where one mutation is defined as one single character changed in the gene string.

- For example, `"AACCGGTT" --> "AACCGGTA"` is one mutation.

There is also a gene bank `bank` that records all the valid gene mutations. A gene must be in `bank` to make it a valid gene string.

Given the two gene strings `startGene` and `endGene` and the gene bank `bank`, return the minimum number of mutations needed to mutate from `startGene` to `endGene`. If there is no such a mutation, return `-1`.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

Example 1:

```
Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1
```

Example 2:

```
Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
Output: 2
```

Constraints:

- `0 <= bank.length <= 10`
- `startGene.length == endGene.length == bank[i].length == 8`
- `startGene`, `endGene`, and `bank[i]` consist of only the characters `['A', 'C', 'G', 'T']`.

<details>

<summary>Approach</summary>

BFS treating each gene as a node; edges connect strings differing by one of A/C/G/T at any position. Only explore strings in `bank`.

</details>

```python
from collections import deque
class Solution:
    def minMutation(self, start, end, bank):
        bank = set(bank)
        if end not in bank: return -1
        q = deque([(start, 0)]); seen = {start}
        while q:
            s, d = q.popleft()
            if s == end: return d
            for i in range(len(s)):
                for c in 'ACGT':
                    if c == s[i]: continue
                    nxt = s[:i] + c + s[i+1:]
                    if nxt in bank and nxt not in seen:
                        seen.add(nxt); q.append((nxt, d+1))
        return -1
```

### 127. Word Ladder

**Difficulty:** Hard · **Tags:** Hash Table, String, Breadth-First Search

[Leetcode](https://leetcode.com/problems/word-ladder/)

A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s_1 -> s_2 -> ... -> s_k` such that:

- Every adjacent pair of words differs by a single letter.
- Every `s_i` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
- `s_k == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or `0` if no such sequence exists.

Example 1:

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
```

Example 2:

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

Constraints:

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.
- `beginWord != endWord`
- All the words in `wordList` are unique.

<details>

<summary>Approach</summary>

BFS where neighbors are words differing by one letter. Use wildcard buckets (`h*t` etc.) to find neighbors in O(L) per word.

</details>

```python
from collections import defaultdict, deque
class Solution:
    def ladderLength(self, beginWord, endWord, wordList):
        words = set(wordList)
        if endWord not in words: return 0
        L = len(beginWord)
        buckets = defaultdict(list)
        for w in words:
            for i in range(L):
                buckets[w[:i] + '*' + w[i+1:]].append(w)
        seen = {beginWord}; q = deque([(beginWord, 1)])
        while q:
            w, d = q.popleft()
            if w == endWord: return d
            for i in range(L):
                key = w[:i] + '*' + w[i+1:]
                for nb in buckets[key]:
                    if nb not in seen:
                        seen.add(nb); q.append((nb, d+1))
                buckets[key] = []
        return 0
```

## Trie

### 208. Implement Trie (Prefix Tree)

**Difficulty:** Medium · **Tags:** Hash Table, String, Design, Trie

[Leetcode](https://leetcode.com/problems/implement-trie-prefix-tree/)

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

Example 1:

```
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
```

Constraints:

- `1 <= word.length, prefix.length <= 2000`
- `word` and `prefix` consist only of lowercase English letters.
- At most `3 * 10^4` calls in total will be made to `insert`, `search`, and `startsWith`.

<details>

<summary>Approach</summary>

Nested dict + an end-of-word flag. Insert/lookup walk the chars.

</details>

```python
class Trie:
    def __init__(self):
        self.root = {}
    def insert(self, word):
        n = self.root
        for c in word:
            n = n.setdefault(c, {})
        n['$'] = True
    def _find(self, word):
        n = self.root
        for c in word:
            if c not in n: return None
            n = n[c]
        return n
    def search(self, word):
        n = self._find(word)
        return bool(n and n.get('$'))
    def startsWith(self, prefix):
        return self._find(prefix) is not None
```

### 211. Design Add and Search Words Data Structure

**Difficulty:** Medium · **Tags:** String, Depth-First Search, Design, Trie

[Leetcode](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the `WordDictionary` class:

- `WordDictionary()` Initializes the object.
- `void addWord(word)` Adds `word` to the data structure, it can be matched later.
- `bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `'.'` where dots can be matched with any letter.

Example:

```
Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
```

Constraints:

- `1 <= word.length <= 25`
- `word` in `addWord` consists of lowercase English letters.
- `word` in `search` consist of `'.'` or lowercase English letters.
- There will be at most `2` dots in `word` for `search` queries.
- At most `10^4` calls will be made to `addWord` and `search`.

<details>

<summary>Approach</summary>

Trie plus DFS for '.' wildcards (try every child).

</details>

```python
class WordDictionary:
    def __init__(self):
        self.root = {}
    def addWord(self, word):
        n = self.root
        for c in word: n = n.setdefault(c, {})
        n['$'] = True
    def search(self, word):
        def dfs(i, n):
            if i == len(word): return '$' in n
            c = word[i]
            if c == '.':
                return any(k != '$' and dfs(i+1, v) for k, v in n.items())
            return c in n and dfs(i+1, n[c])
        return dfs(0, self.root)
```

### 212. Word Search II

**Difficulty:** Hard · **Tags:** Array, String, Backtracking, Trie, Matrix

[Leetcode](https://leetcode.com/problems/word-search-ii/)

Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

Example 1:

```
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

Example 2:

```
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
```

Constraints:

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 12`
- `board[i][j]` is a lowercase English letter.
- `1 <= words.length <= 3 * 10^4`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.
- All the strings of `words` are unique.

<details>

<summary>Approach</summary>

Build a trie of `words`. DFS each cell, descending in both the grid and the trie. Prune by removing finished words from the trie.

</details>

```python
class Solution:
    def findWords(self, board, words):
        root = {}
        for w in words:
            n = root
            for c in w: n = n.setdefault(c, {})
            n['$'] = w
        R, C = len(board), len(board[0]); res = []
        def dfs(r, c, node):
            ch = board[r][c]
            if ch not in node: return
            nxt = node[ch]
            if '$' in nxt:
                res.append(nxt.pop('$'))
            board[r][c] = '#'
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r+dr, c+dc
                if 0<=nr<R and 0<=nc<C and board[nr][nc] != '#':
                    dfs(nr, nc, nxt)
            board[r][c] = ch
            if not nxt: node.pop(ch, None)
        for r in range(R):
            for c in range(C): dfs(r, c, root)
        return res
```

## Backtracking

### 17. Letter Combinations of a Phone Number

**Difficulty:** Medium · **Tags:** Hash Table, String, Backtracking

[Leetcode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Example 1:

```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

Example 2:

```
Input: digits = "2"
Output: ["a","b","c"]
```

Constraints:

- `1 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`.

<details>

<summary>Approach</summary>

Iteratively expand the current set of partial strings by appending each letter for the next digit.

</details>

```python
class Solution:
    def letterCombinations(self, digits):
        if not digits: return []
        m = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
        res = ['']
        for d in digits:
            res = [p + c for p in res for c in m[d]]
        return res
```

### 77. Combinations

**Difficulty:** Medium · **Tags:** Backtracking

[Leetcode](https://leetcode.com/problems/combinations/)

Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`.

You may return the answer in any order.

Example 1:

```
Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
```

Example 2:

```
Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.
```

Constraints:

- `1 <= n <= 20`
- `1 <= k <= n`

<details>

<summary>Approach</summary>

Backtrack picking the next index ≥ last+1. Prune when remaining slots can't be filled.

</details>

```python
class Solution:
    def combine(self, n, k):
        res = []
        def back(start, path):
            if len(path) == k: res.append(path[:]); return
            need = k - len(path)
            for i in range(start, n - need + 2):
                path.append(i); back(i+1, path); path.pop()
        back(1, []); return res
```

### 46. Permutations

**Difficulty:** Medium · **Tags:** Array, Backtracking

[Leetcode](https://leetcode.com/problems/permutations/)

Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

Example 1:

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

Example 2:

```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

Example 3:

```
Input: nums = [1]
Output: [[1]]
```

Constraints:

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All the integers of `nums` are unique.

<details>

<summary>Approach</summary>

Backtrack swapping elements into the current position, or use a `used` mask.

</details>

```python
class Solution:
    def permute(self, nums):
        res = []
        def back(i):
            if i == len(nums): res.append(nums[:]); return
            for j in range(i, len(nums)):
                nums[i], nums[j] = nums[j], nums[i]
                back(i+1)
                nums[i], nums[j] = nums[j], nums[i]
        back(0); return res
```

### 39. Combination Sum

**Difficulty:** Medium · **Tags:** Array, Backtracking

[Leetcode](https://leetcode.com/problems/combination-sum/)

Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.

The same number may be chosen from `candidates` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.

Example 1:

```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

Example 2:

```
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

Example 3:

```
Input: candidates = [2], target = 1
Output: []
```

Constraints:

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are distinct.
- `1 <= target <= 40`

<details>

<summary>Approach</summary>

Backtrack with reuse allowed: at each step try candidates from the current index forward, subtracting from remaining target.

</details>

```python
class Solution:
    def combinationSum(self, candidates, target):
        candidates.sort(); res = []
        def back(start, rem, path):
            if rem == 0: res.append(path[:]); return
            for i in range(start, len(candidates)):
                c = candidates[i]
                if c > rem: break
                path.append(c); back(i, rem - c, path); path.pop()
        back(0, target, []); return res
```

### 52. N-Queens II

**Difficulty:** Hard · **Tags:** Backtracking

[Leetcode](https://leetcode.com/problems/n-queens-ii/)

The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return the number of distinct solutions to the n-queens puzzle.

Example 1:

```
Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
```

Example 2:

```
Input: n = 1
Output: 1
```

Constraints:

- `1 <= n <= 9`

<details>

<summary>Approach</summary>

Backtrack row-by-row with three bitmask-style sets for columns and the two diagonals.

</details>

```python
class Solution:
    def totalNQueens(self, n):
        cols, d1, d2 = set(), set(), set()
        def back(r):
            if r == n: return 1
            total = 0
            for c in range(n):
                if c in cols or r-c in d1 or r+c in d2: continue
                cols.add(c); d1.add(r-c); d2.add(r+c)
                total += back(r+1)
                cols.remove(c); d1.remove(r-c); d2.remove(r+c)
            return total
        return back(0)
```

### 22. Generate Parentheses

**Difficulty:** Medium · **Tags:** String, Dynamic Programming, Backtracking

[Leetcode](https://leetcode.com/problems/generate-parentheses/)

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:

```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

Example 2:

```
Input: n = 1
Output: ["()"]
```

Constraints:

- `1 <= n <= 8`

<details>

<summary>Approach</summary>

Backtrack tracking remaining `(` and `)` slots; can place `(` if any left, can place `)` if remaining `)` > remaining `(`.

</details>

```python
class Solution:
    def generateParenthesis(self, n):
        res = []
        def back(s, open_left, close_left):
            if open_left == 0 and close_left == 0: res.append(s); return
            if open_left: back(s + '(', open_left-1, close_left)
            if close_left > open_left: back(s + ')', open_left, close_left-1)
        back('', n, n); return res
```

### 79. Word Search

**Difficulty:** Medium · **Tags:** Array, String, Backtracking, Depth-First Search, Matrix

[Leetcode](https://leetcode.com/problems/word-search/)

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

Example 2:

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

Example 3:

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

Constraints:

- `m == board.length`
- `n = board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a larger `board`?

<details>

<summary>Approach</summary>

DFS from every cell. Temporarily mark visited by mutating the cell, restore on backtrack.

</details>

```python
class Solution:
    def exist(self, board, word):
        R, C = len(board), len(board[0])
        def dfs(r, c, i):
            if i == len(word): return True
            if r<0 or r>=R or c<0 or c>=C or board[r][c] != word[i]: return False
            tmp = board[r][c]; board[r][c] = '#'
            ok = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1)
                  or dfs(r,c+1,i+1) or dfs(r,c-1,i+1))
            board[r][c] = tmp
            return ok
        return any(dfs(r,c,0) for r in range(R) for c in range(C))
```

## Divide & Conquer

### 108. Convert Sorted Array to Binary Search Tree

**Difficulty:** Easy · **Tags:** Array, Divide and Conquer, Tree, Binary Search Tree, Binary Tree

[Leetcode](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

Given an integer array `nums` where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

Example 1:

```
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:
```

Example 2:

```
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
```

Constraints:

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in a strictly increasing order.

<details>

<summary>Approach</summary>

Pick middle of range as root and recurse on halves.

</details>

```python
class Solution:
    def sortedArrayToBST(self, nums):
        class _N:
            def __init__(self, v): self.val=v; self.left=self.right=None
        def build(l, r):
            if l > r: return None
            m = (l + r) // 2
            n = _N(nums[m])
            n.left = build(l, m-1); n.right = build(m+1, r)
            return n
        return build(0, len(nums)-1)
```

### 148. Sort List

**Difficulty:** Medium · **Tags:** Linked List, Two Pointers, Divide and Conquer, Sorting, Merge Sort

[Leetcode](https://leetcode.com/problems/sort-list/)

Given the `head` of a linked list, return the list after sorting it in ascending order.

Example 1:

```
Input: head = [4,2,1,3]
Output: [1,2,3,4]
```

Example 2:

```
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
```

Example 3:

```
Input: head = []
Output: []
```

Constraints:

- The number of nodes in the list is in the range `[0, 5 * 10^4]`.
- `-10^5 <= Node.val <= 10^5`

Follow up: Can you sort the linked list in `O(n logn)` time and `O(1)` memory (i.e. constant space)?

<details>

<summary>Approach</summary>

Merge sort on linked list. Split via slow/fast, sort halves, merge.

</details>

```python
class Solution:
    def sortList(self, head):
        if not head or not head.next: return head
        slow, fast, prev = head, head, None
        while fast and fast.next:
            prev = slow; slow = slow.next; fast = fast.next.next
        prev.next = None
        a = self.sortList(head); b = self.sortList(slow)
        # merge
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        dummy = _N(); cur = dummy
        while a and b:
            if a.val <= b.val: cur.next = a; a = a.next
            else: cur.next = b; b = b.next
            cur = cur.next
        cur.next = a or b
        return dummy.next
```

### 427. Construct Quad Tree

**Difficulty:** Medium · **Tags:** Array, Divide and Conquer, Tree, Matrix

[Leetcode](https://leetcode.com/problems/construct-quad-tree/)

Given a `n * n` matrix `grid` of `0's` and `1's` only. We want to represent `grid` with a Quad-Tree.

Return the root of the Quad-Tree representing `grid`.

A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:

- `val`: True if the node represents a grid of 1's or False if the node represents a grid of 0's. Notice that you can assign the `val` to True or False when `isLeaf` is False, and both are accepted in the answer.
- `isLeaf`: True if the node is a leaf node on the tree or False if the node has four children.

```
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}
```

We can construct a Quad-Tree from a two-dimensional area using the following steps:

- If the current grid has the same value (i.e all `1's` or all `0's`) set `isLeaf` True and set `val` to the value of the grid and set the four children to Null and stop.
- If the current grid has different values, set `isLeaf` to False and set `val` to any value and divide the current grid into four sub-grids as shown in the photo.
- Recurse for each of the children with the proper sub-grid.

If you want to know more about the Quad-Tree, you can refer to the wiki.

Quad-Tree format:

You don't need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where `null` signifies a path terminator where no node exists below.

It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list `[isLeaf, val]`.

If the value of `isLeaf` or `val` is True we represent it as 1 in the list `[isLeaf, val]` and if the value of `isLeaf` or `val` is False we represent it as 0.

Example 1:

```
Input: grid = [[0,1],[1,0]]
Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
Explanation: The explanation of this example is shown below:
Notice that 0 represents False and 1 represents True in the photo representing the Quad-Tree.
```

Example 2:

```
Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.
The topLeft, bottomLeft and bottomRight each has the same value.
The topRight have different values so we divide it into 4 sub-grids where each has the same value.
Explanation is shown in the photo below:
```

Constraints:

- `n == grid.length == grid[i].length`
- `n == 2^x` where `0 <= x <= 6`

<details>

<summary>Approach</summary>

Recurse on quadrants. If all four children are leaves with the same value, collapse into a single leaf.

</details>

```python
class Solution:
    def construct(self, grid):
        from typing import Optional
        Node = type(grid[0][0]).__class__ if False else None
        # Use the LeetCode Node class implicitly available in env; emulate via duck typing.
        class _N:
            def __init__(self, val, isLeaf, tl=None, tr=None, bl=None, br=None):
                self.val=val; self.isLeaf=isLeaf
                self.topLeft=tl; self.topRight=tr
                self.bottomLeft=bl; self.bottomRight=br
        def build(r, c, n):
            if n == 1: return _N(bool(grid[r][c]), True)
            half = n // 2
            tl = build(r, c, half); tr = build(r, c+half, half)
            bl = build(r+half, c, half); br = build(r+half, c+half, half)
            if (tl.isLeaf and tr.isLeaf and bl.isLeaf and br.isLeaf
                and tl.val == tr.val == bl.val == br.val):
                return _N(tl.val, True)
            return _N(False, False, tl, tr, bl, br)
        return build(0, 0, len(grid))
```

### 23. Merge k Sorted Lists

**Difficulty:** Hard · **Tags:** Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort

[Leetcode](https://leetcode.com/problems/merge-k-sorted-lists/)

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
```

Example 2:

```
Input: lists = []
Output: []
```

Example 3:

```
Input: lists = [[]]
Output: []
```

Constraints:

- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` is sorted in ascending order.
- The sum of `lists[i].length` will not exceed `10^4`.

<details>

<summary>Approach</summary>

Min-heap of (val, list-index, node). Pop smallest, push its successor.

</details>

```python
import heapq
class Solution:
    def mergeKLists(self, lists):
        class _N:
            def __init__(self, v=0, n=None): self.val=v; self.next=n
        h = []
        for i, node in enumerate(lists):
            if node: heapq.heappush(h, (node.val, i, node))
        dummy = _N(); cur = dummy
        while h:
            v, i, n = heapq.heappop(h)
            cur.next = n; cur = n
            if n.next: heapq.heappush(h, (n.next.val, i, n.next))
        return dummy.next
```

## Kadane's Algorithm

### 53. Maximum Subarray

**Difficulty:** Medium · **Tags:** Array, Divide and Conquer, Dynamic Programming

[Leetcode](https://leetcode.com/problems/maximum-subarray/)

Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

Example 1:

```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

Example 2:

```
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

Example 3:

```
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

Constraints:

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

Follow up: If you have figured out the `O(n)` solution, try coding another solution using the divide and conquer approach, which is more subtle.

<details>

<summary>Approach</summary>

Kadane: running sum, reset to current if negative; track best seen.

</details>

```python
class Solution:
    def maxSubArray(self, nums):
        cur = best = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x); best = max(best, cur)
        return best
```

### 918. Maximum Sum Circular Subarray

**Difficulty:** Medium · **Tags:** Array, Divide and Conquer, Dynamic Programming, Queue, Monotonic Queue

[Leetcode](https://leetcode.com/problems/maximum-sum-circular-subarray/)

Given a circular integer array `nums` of length `n`, return the maximum possible sum of a non-empty subarray of `nums`.

A circular array means the end of the array connects to the beginning of the array. Formally, the next element of `nums[i]` is `nums[(i + 1) % n]` and the previous element of `nums[i]` is `nums[(i - 1 + n) % n]`.

A subarray may only include each element of the fixed buffer `nums` at most once. Formally, for a subarray `nums[i], nums[i + 1], ..., nums[j]`, there does not exist `i <= k1`, `k2 <= j` with `k1 % n == k2 % n`.

Example 1:

```
Input: nums = [1,-2,3,-2]
Output: 3
Explanation: Subarray [3] has maximum sum 3.
```

Example 2:

```
Input: nums = [5,-3,5]
Output: 10
Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.
```

Example 3:

```
Input: nums = [-3,-2,-3]
Output: -2
Explanation: Subarray [-2] has maximum sum -2.
```

Constraints:

- `n == nums.length`
- `1 <= n <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`

<details>

<summary>Approach</summary>

Answer is max of standard Kadane and (total − min subarray). Edge case: all-negative array — return Kadane max.

</details>

```python
class Solution:
    def maxSubarraySumCircular(self, nums):
        total = 0; cur_max = best_max = nums[0]; cur_min = best_min = nums[0]
        total = nums[0]
        for x in nums[1:]:
            total += x
            cur_max = max(x, cur_max + x); best_max = max(best_max, cur_max)
            cur_min = min(x, cur_min + x); best_min = min(best_min, cur_min)
        if best_max < 0: return best_max
        return max(best_max, total - best_min)
```

## Binary Search

### 35. Search Insert Position

**Difficulty:** Easy · **Tags:** Array, Binary Search

[Leetcode](https://leetcode.com/problems/search-insert-position/)

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with `O(log n)` runtime complexity.

Example 1:

```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

Example 2:

```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

Example 3:

```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

Constraints:

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` contains distinct values sorted in ascending order.
- `-10^4 <= target <= 10^4`

<details>

<summary>Approach</summary>

Binary search for the first index where `nums[i] >= target`.

</details>

```python
class Solution:
    def searchInsert(self, nums, target):
        l, r = 0, len(nums)
        while l < r:
            m = (l + r) // 2
            if nums[m] < target: l = m + 1
            else: r = m
        return l
```

### 74. Search a 2D Matrix

**Difficulty:** Medium · **Tags:** Array, Binary Search, Matrix

[Leetcode](https://leetcode.com/problems/search-a-2d-matrix/)

You are given an `m x n` integer matrix `matrix` with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.

You must write a solution in `O(log(m * n))` time complexity.

Example 1:

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

Example 2:

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

Constraints:

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

<details>

<summary>Approach</summary>

Treat the matrix as a flat sorted array; binary search using `divmod` for row/col.

</details>

```python
class Solution:
    def searchMatrix(self, matrix, target):
        R, C = len(matrix), len(matrix[0])
        l, r = 0, R*C
        while l < r:
            m = (l + r) // 2; v = matrix[m // C][m % C]
            if v == target: return True
            if v < target: l = m + 1
            else: r = m
        return False
```

### 162. Find Peak Element

**Difficulty:** Medium · **Tags:** Array, Binary Search

[Leetcode](https://leetcode.com/problems/find-peak-element/)

A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in `O(log n)` time.

Example 1:

```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
```

Example 2:

```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```

Constraints:

- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums[i] != nums[i + 1]` for all valid `i`.

<details>

<summary>Approach</summary>

Binary search: if `nums[m] < nums[m+1]`, a peak exists to the right; else to the left (including m).

</details>

```python
class Solution:
    def findPeakElement(self, nums):
        l, r = 0, len(nums) - 1
        while l < r:
            m = (l + r) // 2
            if nums[m] < nums[m+1]: l = m + 1
            else: r = m
        return l
```

### 33. Search in Rotated Sorted Array

**Difficulty:** Medium · **Tags:** Array, Binary Search

[Leetcode](https://leetcode.com/problems/search-in-rotated-sorted-array/)

There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is possibly left rotated at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,5,6,7]` might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.

Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

Example 1:

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

Example 2:

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

Example 3:

```
Input: nums = [1], target = 0
Output: -1
```

Constraints:

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are unique.
- `nums` is an ascending array that is possibly rotated.
- `-10^4 <= target <= 10^4`

<details>

<summary>Approach</summary>

Binary search with rotation. The half containing `nums[l]..nums[m]` (or the other) is sorted — decide based on that.

</details>

```python
class Solution:
    def search(self, nums, target):
        l, r = 0, len(nums) - 1
        while l <= r:
            m = (l + r) // 2
            if nums[m] == target: return m
            if nums[l] <= nums[m]:
                if nums[l] <= target < nums[m]: r = m - 1
                else: l = m + 1
            else:
                if nums[m] < target <= nums[r]: l = m + 1
                else: r = m - 1
        return -1
```

### 34. Find First and Last Position of Element in Sorted Array

**Difficulty:** Medium · **Tags:** Array, Binary Search

[Leetcode](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

You must write an algorithm with `O(log n)` runtime complexity.

Example 1:

```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

Example 2:

```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

Example 3:

```
Input: nums = [], target = 0
Output: [-1,-1]
```

Constraints:

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is a non-decreasing array.
- `-10^9 <= target <= 10^9`

<details>

<summary>Approach</summary>

Two binary searches: leftmost ≥ target and leftmost > target. Difference (and validity) yields the range.

</details>

```python
from bisect import bisect_left, bisect_right
class Solution:
    def searchRange(self, nums, target):
        l = bisect_left(nums, target); r = bisect_right(nums, target) - 1
        if l <= r: return [l, r]
        return [-1, -1]
```

### 153. Find Minimum in Rotated Sorted Array

**Difficulty:** Medium · **Tags:** Array, Binary Search

[Leetcode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.

You must write an algorithm that runs in `O(log n) time`.

Example 1:

```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

Example 2:

```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

Example 3:

```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
```

Constraints:

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All the integers of `nums` are unique.
- `nums` is sorted and rotated between `1` and `n` times.

<details>

<summary>Approach</summary>

Binary search: compare mid to `nums[r]` — if greater, the min is to the right, else to the left (including m).

</details>

```python
class Solution:
    def findMin(self, nums):
        l, r = 0, len(nums) - 1
        while l < r:
            m = (l + r) // 2
            if nums[m] > nums[r]: l = m + 1
            else: r = m
        return nums[l]
```

### 4. Median of Two Sorted Arrays

**Difficulty:** Hard · **Tags:** Array, Binary Search, Divide and Conquer

[Leetcode](https://leetcode.com/problems/median-of-two-sorted-arrays/)

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

Example 1:

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

Example 2:

```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

Constraints:

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

<details>

<summary>Approach</summary>

Binary search on the smaller array's partition; choose `i` so that `i + j = (m + n + 1) // 2` with `A[i-1] ≤ B[j]` and `B[j-1] ≤ A[i]`.

</details>

```python
class Solution:
    def findMedianSortedArrays(self, A, B):
        if len(A) > len(B): A, B = B, A
        m, n = len(A), len(B); half = (m + n + 1) // 2
        l, r = 0, m
        while l <= r:
            i = (l + r) // 2; j = half - i
            Al = A[i-1] if i else float('-inf')
            Ar = A[i] if i < m else float('inf')
            Bl = B[j-1] if j else float('-inf')
            Br = B[j] if j < n else float('inf')
            if Al <= Br and Bl <= Ar:
                if (m + n) % 2: return max(Al, Bl)
                return (max(Al, Bl) + min(Ar, Br)) / 2
            elif Al > Br: r = i - 1
            else: l = i + 1
```

## Heap

### 215. Kth Largest Element in an Array

**Difficulty:** Medium · **Tags:** Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect

[Leetcode](https://leetcode.com/problems/kth-largest-element-in-an-array/)

Given an integer array `nums` and an integer `k`, return the `k^th` largest element in the array.

Note that it is the `k^th` largest element in the sorted order, not the `k^th` distinct element.

Can you solve it without sorting?

Example 1:

```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

Example 2:

```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

Constraints:

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

<details>

<summary>Approach</summary>

Min-heap of size k.

</details>

```python
import heapq
class Solution:
    def findKthLargest(self, nums, k):
        return heapq.nlargest(k, nums)[-1]
```

### 502. IPO

**Difficulty:** Hard · **Tags:** Array, Greedy, Sorting, Heap (Priority Queue)

[Leetcode](https://leetcode.com/problems/ipo/)

Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most `k` distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most `k` distinct projects.

You are given `n` projects where the `i^th` project has a pure profit `profits[i]` and a minimum capital of `capital[i]` is needed to start it.

Initially, you have `w` capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most `k` distinct projects from given projects to maximize your final capital, and return the final maximized capital.

The answer is guaranteed to fit in a 32-bit signed integer.

Example 1:

```
Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
```

Example 2:

```
Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6
```

Constraints:

- `1 <= k <= 10^5`
- `0 <= w <= 10^9`
- `n == profits.length`
- `n == capital.length`
- `1 <= n <= 10^5`
- `0 <= profits[i] <= 10^4`
- `0 <= capital[i] <= 10^9`

<details>

<summary>Approach</summary>

Sort projects by capital. Iterate k rounds: add affordable projects to a max-heap of profits; pick the top.

</details>

```python
import heapq
class Solution:
    def findMaximizedCapital(self, k, w, profits, capital):
        proj = sorted(zip(capital, profits))
        i = 0; h = []
        for _ in range(k):
            while i < len(proj) and proj[i][0] <= w:
                heapq.heappush(h, -proj[i][1]); i += 1
            if not h: break
            w += -heapq.heappop(h)
        return w
```

### 373. Find K Pairs with Smallest Sums

**Difficulty:** Medium · **Tags:** Array, Heap (Priority Queue)

[Leetcode](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/)

You are given two integer arrays `nums1` and `nums2` sorted in non-decreasing order and an integer `k`.

Define a pair `(u, v)` which consists of one element from the first array and one element from the second array.

Return the `k` pairs `(u_1, v_1), (u_2, v_2), ..., (u_k, v_k)` with the smallest sums.

Example 1:

```
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
```

Example 2:

```
Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
```

Constraints:

- `1 <= nums1.length, nums2.length <= 10^5`
- `-10^9 <= nums1[i], nums2[i] <= 10^9`
- `nums1` and `nums2` both are sorted in non-decreasing order.
- `1 <= k <= 10^4`
- `k <= nums1.length * nums2.length`

<details>

<summary>Approach</summary>

Min-heap seeded with `(nums1[i] + nums2[0], i, 0)`. Pop k times; after popping (i, j), push (i, j+1).

</details>

```python
import heapq
class Solution:
    def kSmallestPairs(self, nums1, nums2, k):
        if not nums1 or not nums2: return []
        h = []
        for i in range(min(k, len(nums1))):
            heapq.heappush(h, (nums1[i] + nums2[0], i, 0))
        res = []
        while h and len(res) < k:
            _, i, j = heapq.heappop(h)
            res.append([nums1[i], nums2[j]])
            if j + 1 < len(nums2):
                heapq.heappush(h, (nums1[i] + nums2[j+1], i, j+1))
        return res
```

### 295. Find Median from Data Stream

**Difficulty:** Hard · **Tags:** Two Pointers, Design, Sorting, Heap (Priority Queue), Data Stream

[Leetcode](https://leetcode.com/problems/find-median-from-data-stream/)

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

- For example, for `arr = [2,3,4]`, the median is `3`.
- For example, for `arr = [2,3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the MedianFinder class:

- `MedianFinder()` initializes the `MedianFinder` object.
- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
- `double findMedian()` returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.

Example 1:

```
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
```

Constraints:

- `-10^5 <= num <= 10^5`
- There will be at least one element in the data structure before calling `findMedian`.
- At most `5 * 10^4` calls will be made to `addNum` and `findMedian`.

Follow up:

- If all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?
- If `99%` of all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?

<details>

<summary>Approach</summary>

Two heaps: max-heap of lower half, min-heap of upper half. Rebalance so sizes differ by ≤1.

</details>

```python
import heapq
class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (negated)
        self.hi = []
    def addNum(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    def findMedian(self):
        if len(self.lo) > len(self.hi): return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2
```

## Bit Manipulation

### 67. Add Binary

**Difficulty:** Easy · **Tags:** Math, String, Bit Manipulation, Simulation

[Leetcode](https://leetcode.com/problems/add-binary/)

Given two binary strings `a` and `b`, return their sum as a binary string.

Example 1:

```
Input: a = "11", b = "1"
Output: "100"
```

Example 2:

```
Input: a = "1010", b = "1011"
Output: "10101"
```

Constraints:

- `1 <= a.length, b.length <= 10^4`
- `a` and `b` consist only of `'0'` or `'1'` characters.
- Each string does not contain leading zeros except for the zero itself.

<details>

<summary>Approach</summary>

Reverse strings; add digit-by-digit with carry.

</details>

```python
class Solution:
    def addBinary(self, a, b):
        return bin(int(a, 2) + int(b, 2))[2:]
```

### 190. Reverse Bits

**Difficulty:** Easy · **Tags:** Divide and Conquer, Bit Manipulation

[Leetcode](https://leetcode.com/problems/reverse-bits/)

Reverse bits of a given 32 bits signed integer.

Example 1:

Input: n = 43261596

Output: 964176192

Explanation:

```
        Integer
        Binary


        43261596
        00000010100101000001111010011100


        964176192
        00111001011110000010100101000000
```

Example 2:

Input: n = 2147483644

Output: 1073741822

Explanation:

```
        Integer
        Binary


        2147483644
        01111111111111111111111111111100


        1073741822
        00111111111111111111111111111110
```

Constraints:

- `0 <= n <= 2^31 - 2`
- `n` is even.

Follow up: If this function is called many times, how would you optimize it?

<details>

<summary>Approach</summary>

Shift result left, OR in low bit of `n`, shift `n` right, 32 times.

</details>

```python
class Solution:
    def reverseBits(self, n):
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1); n >>= 1
        return res
```

### 191. Number of 1 Bits

**Difficulty:** Easy · **Tags:** Divide and Conquer, Bit Manipulation

[Leetcode](https://leetcode.com/problems/number-of-1-bits/)

Given a positive integer `n`, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).

Example 1:

Input: n = 11

Output: 3

Explanation:

The input binary string 1011 has a total of three set bits.

Example 2:

Input: n = 128

Output: 1

Explanation:

The input binary string 10000000 has a total of one set bit.

Example 3:

Input: n = 2147483645

Output: 30

Explanation:

The input binary string 1111111111111111111111111111101 has a total of thirty set bits.

Constraints:

- `1 <= n <= 2^31 - 1`

Follow up: If this function is called many times, how would you optimize it?

<details>

<summary>Approach</summary>

Repeatedly `n &= n - 1` (clears lowest set bit) and count.

</details>

```python
class Solution:
    def hammingWeight(self, n):
        c = 0
        while n: n &= n - 1; c += 1
        return c
```

### 136. Single Number

**Difficulty:** Easy · **Tags:** Array, Bit Manipulation

[Leetcode](https://leetcode.com/problems/single-number/)

Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Example 1:

Input: nums = [2,2,1]

Output: 1

Example 2:

Input: nums = [4,1,2,1,2]

Output: 4

Example 3:

Input: nums = [1]

Output: 1

Constraints:

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- Each element in the array appears twice except for one element which appears only once.

<details>

<summary>Approach</summary>

XOR everything — pairs cancel, leaving the unique number.

</details>

```python
from functools import reduce
from operator import xor
class Solution:
    def singleNumber(self, nums):
        return reduce(xor, nums)
```

### 137. Single Number II

**Difficulty:** Medium · **Tags:** Array, Bit Manipulation

[Leetcode](https://leetcode.com/problems/single-number-ii/)

Given an integer array `nums` where every element appears three times except for one, which appears exactly once. Find the single element and return it.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Example 1:

```
Input: nums = [2,2,3,2]
Output: 3
```

Example 2:

```
Input: nums = [0,1,0,1,0,1,99]
Output: 99
```

Constraints:

- `1 <= nums.length <= 3 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- Each element in `nums` appears exactly three times except for one element which appears once.

<details>

<summary>Approach</summary>

Two-bit state machine: `ones` and `twos` track each bit's count mod 3.

</details>

```python
class Solution:
    def singleNumber(self, nums):
        ones = twos = 0
        for x in nums:
            ones = (ones ^ x) & ~twos
            twos = (twos ^ x) & ~ones
        return ones
```

### 201. Bitwise AND of Numbers Range

**Difficulty:** Medium · **Tags:** Bit Manipulation

[Leetcode](https://leetcode.com/problems/bitwise-and-of-numbers-range/)

Given two integers `left` and `right` that represent the range `[left, right]`, return the bitwise AND of all numbers in this range, inclusive.

Example 1:

```
Input: left = 5, right = 7
Output: 4
```

Example 2:

```
Input: left = 0, right = 0
Output: 0
```

Example 3:

```
Input: left = 1, right = 2147483647
Output: 0
```

Constraints:

- `0 <= left <= right <= 2^31 - 1`

<details>

<summary>Approach</summary>

Common prefix of `left` and `right`: shift both right until equal, then shift back.

</details>

```python
class Solution:
    def rangeBitwiseAnd(self, left, right):
        shift = 0
        while left < right:
            left >>= 1; right >>= 1; shift += 1
        return left << shift
```

## Math

### 9. Palindrome Number

**Difficulty:** Easy · **Tags:** Math

[Leetcode](https://leetcode.com/problems/palindrome-number/)

Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

Example 1:

```
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

Example 2:

```
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

Example 3:

```
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

Constraints:

- `-2^31 <= x <= 2^31 - 1`

Follow up: Could you solve it without converting the integer to a string?

<details>

<summary>Approach</summary>

Reverse half the digits and compare; negative numbers are not palindromes.

</details>

```python
class Solution:
    def isPalindrome(self, x):
        if x < 0 or (x % 10 == 0 and x != 0): return False
        rev = 0
        while x > rev:
            rev = rev * 10 + x % 10; x //= 10
        return x == rev or x == rev // 10
```

### 66. Plus One

**Difficulty:** Easy · **Tags:** Array, Math

[Leetcode](https://leetcode.com/problems/plus-one/)

You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the `i^th` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading `0`'s.

Increment the large integer by one and return the resulting array of digits.

Example 1:

```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
```

Example 2:

```
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
```

Example 3:

```
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].
```

Constraints:

- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`
- `digits` does not contain any leading `0`'s.

<details>

<summary>Approach</summary>

Walk from end carrying; if all 9s, prepend 1.

</details>

```python
class Solution:
    def plusOne(self, digits):
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1; return digits
            digits[i] = 0
        return [1] + digits
```

### 172. Factorial Trailing Zeroes

**Difficulty:** Medium · **Tags:** Math

[Leetcode](https://leetcode.com/problems/factorial-trailing-zeroes/)

Given an integer `n`, return the number of trailing zeroes in `n!`.

Note that `n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1`.

Example 1:

```
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.
```

Example 2:

```
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
```

Example 3:

```
Input: n = 0
Output: 0
```

Constraints:

- `0 <= n <= 10^4`

Follow up: Could you write a solution that works in logarithmic time complexity?

<details>

<summary>Approach</summary>

Count factors of 5 in n!: n//5 + n//25 + n//125 + …

</details>

```python
class Solution:
    def trailingZeroes(self, n):
        c = 0
        while n: n //= 5; c += n
        return c
```

### 69. Sqrt(x)

**Difficulty:** Easy · **Tags:** Math, Binary Search

[Leetcode](https://leetcode.com/problems/sqrtx/)

Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

- For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.

Example 1:

```
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

Example 2:

```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
```

Constraints:

- `0 <= x <= 2^31 - 1`

<details>

<summary>Approach</summary>

Binary search for the largest `m` with `m*m ≤ x`.

</details>

```python
class Solution:
    def mySqrt(self, x):
        l, r = 0, x; ans = 0
        while l <= r:
            m = (l + r) // 2
            if m*m <= x: ans = m; l = m + 1
            else: r = m - 1
        return ans
```

### 50. Pow(x, n)

**Difficulty:** Medium · **Tags:** Math, Recursion

[Leetcode](https://leetcode.com/problems/powx-n/)

Implement pow(x, n), which calculates `x` raised to the power `n` (i.e., `x^n`).

Example 1:

```
Input: x = 2.00000, n = 10
Output: 1024.00000
```

Example 2:

```
Input: x = 2.10000, n = 3
Output: 9.26100
```

Example 3:

```
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
```

Constraints:

- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31-1`
- `n` is an integer.
- Either `x` is not zero or `n > 0`.
- `-10^4 <= x^n <= 10^4`

<details>

<summary>Approach</summary>

Fast exponentiation by squaring; handle negative `n` by inverting `x`.

</details>

```python
class Solution:
    def myPow(self, x, n):
        if n < 0: x, n = 1/x, -n
        res = 1.0
        while n:
            if n & 1: res *= x
            x *= x; n >>= 1
        return res
```

### 149. Max Points on a Line

**Difficulty:** Hard · **Tags:** Array, Hash Table, Math, Geometry

[Leetcode](https://leetcode.com/problems/max-points-on-a-line/)

Given an array of `points` where `points[i] = [x_i, y_i]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

Example 1:

```
Input: points = [[1,1],[2,2],[3,3]]
Output: 3
```

Example 2:

```
Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
```

Constraints:

- `1 <= points.length <= 300`
- `points[i].length == 2`
- `-10^4 <= x_i, y_i <= 10^4`
- All the `points` are unique.

<details>

<summary>Approach</summary>

For each anchor, count slope frequencies of all other points (use a reduced fraction key). Answer = max over anchors of (best slope count + 1).

</details>

```python
from math import gcd
from collections import defaultdict
class Solution:
    def maxPoints(self, points):
        n = len(points)
        if n <= 2: return n
        best = 0
        for i in range(n):
            slopes = defaultdict(int)
            for j in range(n):
                if i == j: continue
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]
                g = gcd(dx, dy)
                if g: dx //= g; dy //= g
                if dx < 0 or (dx == 0 and dy < 0): dx, dy = -dx, -dy
                slopes[(dx, dy)] += 1
            best = max(best, max(slopes.values()) + 1)
        return best
```

## 1D DP

### 70. Climbing Stairs

**Difficulty:** Easy · **Tags:** Math, Dynamic Programming, Memoization

[Leetcode](https://leetcode.com/problems/climbing-stairs/)

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

Example 1:

```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

Example 2:

```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

Constraints:

- `1 <= n <= 45`

<details>

<summary>Approach</summary>

Fibonacci recurrence; two rolling variables.

</details>

```python
class Solution:
    def climbStairs(self, n):
        a, b = 1, 1
        for _ in range(n): a, b = b, a + b
        return a
```

### 198. House Robber

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming

[Leetcode](https://leetcode.com/problems/house-robber/)

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:

```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

Example 2:

```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```

Constraints:

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

<details>

<summary>Approach</summary>

dp[i] = max(dp[i-1], dp[i-2] + nums[i]); rolling.

</details>

```python
class Solution:
    def rob(self, nums):
        prev = cur = 0
        for x in nums:
            prev, cur = cur, max(cur, prev + x)
        return cur
```

### 139. Word Break

**Difficulty:** Medium · **Tags:** Array, Hash Table, String, Dynamic Programming, Trie, Memoization

[Leetcode](https://leetcode.com/problems/word-break/)

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:

```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

Example 2:

```
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
```

Example 3:

```
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

Constraints:

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of only lowercase English letters.
- All the strings of `wordDict` are unique.

<details>

<summary>Approach</summary>

dp[i] = True if some j < i with dp[j] and s[j:i] in dict.

</details>

```python
class Solution:
    def wordBreak(self, s, wordDict):
        words = set(wordDict); n = len(s)
        dp = [True] + [False]*n
        for i in range(1, n+1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True; break
        return dp[n]
```

### 322. Coin Change

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming, Breadth-First Search

[Leetcode](https://leetcode.com/problems/coin-change/)

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

Example 1:

```
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

Example 2:

```
Input: coins = [2], amount = 3
Output: -1
```

Example 3:

```
Input: coins = [1], amount = 0
Output: 0
```

Constraints:

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

<details>

<summary>Approach</summary>

Unbounded knapsack: dp[a] = min(dp[a − c] + 1) over coins c. Initialize with amount+1 as infinity.

</details>

```python
class Solution:
    def coinChange(self, coins, amount):
        INF = amount + 1
        dp = [0] + [INF]*amount
        for a in range(1, amount + 1):
            for c in coins:
                if c <= a: dp[a] = min(dp[a], dp[a-c] + 1)
        return dp[amount] if dp[amount] < INF else -1
```

### 300. Longest Increasing Subsequence

**Difficulty:** Medium · **Tags:** Array, Binary Search, Dynamic Programming

[Leetcode](https://leetcode.com/problems/longest-increasing-subsequence/)

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

Example 1:

```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
```

Example 2:

```
Input: nums = [0,1,0,3,2,3]
Output: 4
```

Example 3:

```
Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

Constraints:

- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

Follow up: Can you come up with an algorithm that runs in `O(n log(n))` time complexity?

<details>

<summary>Approach</summary>

Patience: maintain `tails`. For each x, replace the first tail ≥ x using binary search; length of `tails` is the answer.

</details>

```python
from bisect import bisect_left
class Solution:
    def lengthOfLIS(self, nums):
        tails = []
        for x in nums:
            i = bisect_left(tails, x)
            if i == len(tails): tails.append(x)
            else: tails[i] = x
        return len(tails)
```

## Multidimensional DP

### 120. Triangle

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming

[Leetcode](https://leetcode.com/problems/triangle/)

Given a `triangle` array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` on the next row.

Example 1:

```
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
```

Example 2:

```
Input: triangle = [[-10]]
Output: -10
```

Constraints:

- `1 <= triangle.length <= 200`
- `triangle[0].length == 1`
- `triangle[i].length == triangle[i - 1].length + 1`
- `-10^4 <= triangle[i][j] <= 10^4`

Follow up: Could you do this using only `O(n)` extra space, where `n` is the total number of rows in the triangle?

<details>

<summary>Approach</summary>

Bottom-up: replace each row with row[i] + min(below[i], below[i+1]).

</details>

```python
class Solution:
    def minimumTotal(self, triangle):
        dp = triangle[-1][:]
        for r in range(len(triangle) - 2, -1, -1):
            for c in range(r + 1):
                dp[c] = triangle[r][c] + min(dp[c], dp[c+1])
        return dp[0]
```

### 64. Minimum Path Sum

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming, Matrix

[Leetcode](https://leetcode.com/problems/minimum-path-sum/)

Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:

```
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
```

Example 2:

```
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
```

Constraints:

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 200`

<details>

<summary>Approach</summary>

dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]); can be in-place.

</details>

```python
class Solution:
    def minPathSum(self, grid):
        R, C = len(grid), len(grid[0])
        for r in range(R):
            for c in range(C):
                if r == 0 and c == 0: continue
                up = grid[r-1][c] if r else float('inf')
                lf = grid[r][c-1] if c else float('inf')
                grid[r][c] += min(up, lf)
        return grid[-1][-1]
```

### 63. Unique Paths II

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming, Matrix

[Leetcode](https://leetcode.com/problems/unique-paths-ii/)

You are given an `m x n` integer array `grid`. There is a robot initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

An obstacle and space are marked as `1` or `0` respectively in `grid`. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to `2 * 10^9`.

Example 1:

```
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```

Example 2:

```
Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
```

Constraints:

- `m == obstacleGrid.length`
- `n == obstacleGrid[i].length`
- `1 <= m, n <= 100`
- `obstacleGrid[i][j]` is `0` or `1`.

<details>

<summary>Approach</summary>

dp[r][c] = 0 if obstacle else dp[r-1][c] + dp[r][c-1].

</details>

```python
class Solution:
    def uniquePathsWithObstacles(self, grid):
        R, C = len(grid), len(grid[0])
        dp = [0]*C
        dp[0] = 1 - grid[0][0]
        for c in range(1, C):
            dp[c] = dp[c-1] if grid[0][c] == 0 else 0
        for r in range(1, R):
            dp[0] = 0 if grid[r][0] else dp[0]
            for c in range(1, C):
                dp[c] = 0 if grid[r][c] else dp[c] + dp[c-1]
        return dp[-1]
```

### 5. Longest Palindromic Substring

**Difficulty:** Medium · **Tags:** Two Pointers, String, Dynamic Programming

[Leetcode](https://leetcode.com/problems/longest-palindromic-substring/)

Given a string `s`, return the longest palindromic substring in `s`.

Example 1:

```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

Example 2:

```
Input: s = "cbbd"
Output: "bb"
```

Constraints:

- `1 <= s.length <= 1000`
- `s` consist of only digits and English letters.

<details>

<summary>Approach</summary>

Expand around each center (2n−1 centers); keep best span.

</details>

```python
class Solution:
    def longestPalindrome(self, s):
        if not s: return ""
        start = end = 0
        for i in range(len(s)):
            for l, r in ((i, i), (i, i+1)):
                while l >= 0 and r < len(s) and s[l] == s[r]:
                    l -= 1; r += 1
                if r - l - 1 > end - start:
                    start, end = l + 1, r
        return s[start:end]
```

### 97. Interleaving String

**Difficulty:** Medium · **Tags:** String, Dynamic Programming

[Leetcode](https://leetcode.com/problems/interleaving-string/)

Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an interleaving of `s1` and `s2`.

An interleaving of two strings `s` and `t` is a configuration where `s` and `t` are divided into `n` and `m` substrings respectively, such that:

- `s = s_1 + s_2 + ... + s_n`
- `t = t_1 + t_2 + ... + t_m`
- `|n - m| <= 1`
- The interleaving is `s_1 + t_1 + s_2 + t_2 + s_3 + t_3 + ...` or `t_1 + s_1 + t_2 + s_2 + t_3 + s_3 + ...`

Note: `a + b` is the concatenation of strings `a` and `b`.

Example 1:

```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
```

Example 2:

```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
```

Example 3:

```
Input: s1 = "", s2 = "", s3 = ""
Output: true
```

Constraints:

- `0 <= s1.length, s2.length <= 100`
- `0 <= s3.length <= 200`
- `s1`, `s2`, and `s3` consist of lowercase English letters.

Follow up: Could you solve it using only `O(s2.length)` additional memory space?

<details>

<summary>Approach</summary>

dp[i][j] = True if s3[:i+j] is interleave of s1[:i] and s2[:j]. Transition from above or left depending on char match.

</details>

```python
class Solution:
    def isInterleave(self, s1, s2, s3):
        if len(s1) + len(s2) != len(s3): return False
        dp = [False] * (len(s2) + 1); dp[0] = True
        for j in range(1, len(s2)+1):
            dp[j] = dp[j-1] and s2[j-1] == s3[j-1]
        for i in range(1, len(s1)+1):
            dp[0] = dp[0] and s1[i-1] == s3[i-1]
            for j in range(1, len(s2)+1):
                dp[j] = ((dp[j] and s1[i-1] == s3[i+j-1]) or
                         (dp[j-1] and s2[j-1] == s3[i+j-1]))
        return dp[-1]
```

### 72. Edit Distance

**Difficulty:** Medium · **Tags:** String, Dynamic Programming

[Leetcode](https://leetcode.com/problems/edit-distance/)

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:

- Insert a character
- Delete a character
- Replace a character

Example 1:

```
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

Example 2:

```
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

Constraints:

- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

<details>

<summary>Approach</summary>

Classic Levenshtein DP. dp[i][j] = match → dp[i-1][j-1], else 1 + min of replace/insert/delete.

</details>

```python
class Solution:
    def minDistance(self, w1, w2):
        m, n = len(w1), len(w2)
        dp = [[0]*(n+1) for _ in range(m+1)]
        for i in range(m+1): dp[i][0] = i
        for j in range(n+1): dp[0][j] = j
        for i in range(1, m+1):
            for j in range(1, n+1):
                if w1[i-1] == w2[j-1]:
                    dp[i][j] = dp[i-1][j-1]
                else:
                    dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
        return dp[m][n]
```

### 123. Best Time to Buy and Sell Stock III

**Difficulty:** Hard · **Tags:** Array, Dynamic Programming

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i^th` day.

Find the maximum profit you can achieve. You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:

```
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
```

Example 2:

```
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
```

Example 3:

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

Constraints:

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^5`

<details>

<summary>Approach</summary>

At most 2 transactions. Track buy1/sell1/buy2/sell2 in a single pass.

</details>

```python
class Solution:
    def maxProfit(self, prices):
        b1 = b2 = float('inf'); s1 = s2 = 0
        for p in prices:
            b1 = min(b1, p); s1 = max(s1, p - b1)
            b2 = min(b2, p - s1); s2 = max(s2, p - b2)
        return s2
```

### 188. Best Time to Buy and Sell Stock IV

**Difficulty:** Hard · **Tags:** Array, Dynamic Programming

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i^th` day, and an integer `k`.

Find the maximum profit you can achieve. You may complete at most `k` transactions: i.e. you may buy at most `k` times and sell at most `k` times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:

```
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
```

Example 2:

```
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
```

Constraints:

- `1 <= k <= 100`
- `1 <= prices.length <= 1000`
- `0 <= prices[i] <= 1000`

<details>

<summary>Approach</summary>

Generalization with up to k transactions. dp[j] tracks best profit with j sells; iterate prices updating buy/sell pairs.

</details>

```python
class Solution:
    def maxProfit(self, k, prices):
        n = len(prices)
        if n == 0 or k == 0: return 0
        if k >= n // 2:
            return sum(max(0, b-a) for a,b in zip(prices, prices[1:]))
        buy = [float('inf')]*(k+1); sell = [0]*(k+1)
        for p in prices:
            for j in range(1, k+1):
                buy[j] = min(buy[j], p - sell[j-1])
                sell[j] = max(sell[j], p - buy[j])
        return sell[k]
```

### 221. Maximal Square

**Difficulty:** Medium · **Tags:** Array, Dynamic Programming, Matrix

[Leetcode](https://leetcode.com/problems/maximal-square/)

Given an `m x n` binary `matrix` filled with `0`'s and `1`'s, find the largest square containing only `1`'s and return its area.

Example 1:

```
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
```

Example 2:

```
Input: matrix = [["0","1"],["1","0"]]
Output: 1
```

Example 3:

```
Input: matrix = [["0"]]
Output: 0
```

Constraints:

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `matrix[i][j]` is `'0'` or `'1'`.

<details>

<summary>Approach</summary>

dp[r][c] = side of largest square ending at (r,c). If grid is '1', dp = 1 + min of three neighbors. Track max.

</details>

```python
class Solution:
    def maximalSquare(self, matrix):
        if not matrix: return 0
        R, C = len(matrix), len(matrix[0])
        dp = [0]*(C+1); best = 0; prev = 0
        for r in range(R):
            prev = 0
            for c in range(1, C+1):
                tmp = dp[c]
                if matrix[r][c-1] == '1':
                    dp[c] = 1 + min(dp[c], dp[c-1], prev)
                    best = max(best, dp[c])
                else:
                    dp[c] = 0
                prev = tmp
        return best * best
```
