import { DsaSheet, DsaStep, DsaLecture, DsaProblem } from '@/types/dsaSheets';
import { STRIVER_A2Z_FULL_STEPS } from './striverA2ZSteps';
import { RISING_BRAIN_STEPS } from './risingBrainSteps';
import { NINJAS_SDE_STEPS } from './ninjasSdeSheetSteps';

/**
 * Curated DSA Sheets & Question Bank (College Study Curated)
 * 1. NeetCode 150: Full 150 questions across all 18 topics
 * 2. Strivers A2Z DSA Sheet: Full step-by-step curriculum
 * 3. Strivers SDE Sheet: Top 191 FAANG interview problems
 * 4. Blind 75
 * 5. 20 Essential DSA Patterns by Kushal
 * 6. Free Company-Wise Question Kits (Google, Amazon, Microsoft, Uber, Meta)
 */

export const NEETCODE_150_SHEET: DsaSheet = {
  id: 'neetcode-150',
  slug: 'neetcode-150',
  title: 'NeetCode 150',
  creator: 'Navdeep Singh (NeetCode)',
  description: 'The NeetCode 150 is the Blind 75 plus 75 more problems. It is the ideal roadmap for people who want to master algorithmic problem solving.',
  category: ['All', 'Popular', 'Quick Revision', 'Complete DSA'],
  totalQuestions: 150,
  followersCount: 16789,
  steps: [
    {
      id: 'nc-arrays-hashing',
      title: 'Arrays & Hashing (9 Problems)',
      lectures: [
        {
          id: 'nc-ah-1',
          title: 'Foundational Hash & Array Problems',
          problems: [
            { id: 'nc-1', title: 'Contains Duplicate', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/contains-duplicate/', youtubeUrl: 'https://www.youtube.com/watch?v=3OamzN90kPg', tags: ['Hashmap'] },
            { id: 'nc-2', title: 'Valid Anagram', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/valid-anagram/', youtubeUrl: 'https://www.youtube.com/watch?v=9UtInBqnCgA', tags: ['Hashmap', 'Strings'] },
            { id: 'nc-3', title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/two-sum/', youtubeUrl: 'https://www.youtube.com/watch?v=KLlXCFG5TnA', companies: ['Google', 'Amazon', 'Meta'], tags: ['Hashmap'] },
            { id: 'nc-4', title: 'Group Anagrams', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/group-anagrams/', youtubeUrl: 'https://www.youtube.com/watch?v=vzdNOK2oQ2E', companies: ['Amazon', 'Microsoft'], tags: ['Hashmap', 'Sorting'] },
            { id: 'nc-5', title: 'Top K Frequent Elements', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', youtubeUrl: 'https://www.youtube.com/watch?v=YPTqKIgVk-k', companies: ['Amazon', 'Google'], tags: ['Heap', 'Bucket Sort'] },
            { id: 'nc-6', title: 'Product of Array Except Self', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/product-of-array-except-self/', youtubeUrl: 'https://www.youtube.com/watch?v=bNvIQI2wAjk', companies: ['Amazon', 'Apple', 'Meta'], tags: ['Prefix Product'] },
            { id: 'nc-7', title: 'Valid Sudoku', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/valid-sudoku/', youtubeUrl: 'https://www.youtube.com/watch?v=TjFXEUCMqI8', companies: ['Amazon', 'Uber'], tags: ['Matrix', 'Hashset'] },
            { id: 'nc-8', title: 'Encode and Decode Strings', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/encode-and-decode-strings/', youtubeUrl: 'https://www.youtube.com/watch?v=B1k_sxOSgv8', companies: ['Google'], tags: ['Strings'] },
            { id: 'nc-9', title: 'Longest Consecutive Sequence', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/', youtubeUrl: 'https://www.youtube.com/watch?v=P6RZZMu_maU', companies: ['Google', 'Amazon'], tags: ['Hashset'] },
          ],
        },
      ],
    },
    {
      id: 'nc-two-pointers',
      title: 'Two Pointers (5 Problems)',
      lectures: [
        {
          id: 'nc-tp-1',
          title: 'Opposite & Dynamic Two Pointers',
          problems: [
            { id: 'nc-10', title: 'Valid Palindrome', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/valid-palindrome/', youtubeUrl: 'https://www.youtube.com/watch?v=0h3j2v5z42E', tags: ['Two Pointers'] },
            { id: 'nc-11', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', youtubeUrl: 'https://www.youtube.com/watch?v=cQ1Oz4ckcMM', tags: ['Two Pointers'] },
            { id: 'nc-12', title: '3Sum', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/3sum/', youtubeUrl: 'https://www.youtube.com/watch?v=jzZsG8n2R9A', companies: ['Meta', 'Amazon'], tags: ['Two Pointers'] },
            { id: 'nc-13', title: 'Container With Most Water', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/container-with-most-water/', youtubeUrl: 'https://www.youtube.com/watch?v=UuiTKBwPgAo', companies: ['Google', 'Amazon'], tags: ['Two Pointers'] },
            { id: 'nc-14', title: 'Trapping Rain Water', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/trapping-rain-water/', youtubeUrl: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA', companies: ['Google', 'Amazon', 'Microsoft'], tags: ['Two Pointers', 'Stack'] },
          ],
        },
      ],
    },
    {
      id: 'nc-sliding-window',
      title: 'Sliding Window (6 Problems)',
      lectures: [
        {
          id: 'nc-sw-1',
          title: 'Fixed & Variable Window Sequences',
          problems: [
            { id: 'nc-15', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', youtubeUrl: 'https://www.youtube.com/watch?v=1pkOGxDNx5M', tags: ['Sliding Window'] },
            { id: 'nc-16', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', youtubeUrl: 'https://www.youtube.com/watch?v=wiGpQwVHdE0', companies: ['Amazon', 'Google', 'Meta'], tags: ['Sliding Window', 'Hashmap'] },
            { id: 'nc-17', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/', youtubeUrl: 'https://www.youtube.com/watch?v=gqXU1UyA8pk', companies: ['Google'], tags: ['Sliding Window'] },
            { id: 'nc-18', title: 'Permutation in String', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/permutation-in-string/', youtubeUrl: 'https://www.youtube.com/watch?v=UbyhOgBN834', companies: ['Microsoft'], tags: ['Sliding Window'] },
            { id: 'nc-19', title: 'Minimum Window Substring', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/minimum-window-substring/', youtubeUrl: 'https://www.youtube.com/watch?v=jSto0O4AJbM', companies: ['Meta', 'Uber', 'Google'], tags: ['Sliding Window'] },
            { id: 'nc-20', title: 'Sliding Window Maximum', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/sliding-window-maximum/', youtubeUrl: 'https://www.youtube.com/watch?v=DfljaUwZsOk', companies: ['Amazon', 'Google'], tags: ['Monotonic Queue'] },
          ],
        },
      ],
    },
    {
      id: 'nc-stack',
      title: 'Stack (7 Problems)',
      lectures: [
        {
          id: 'nc-st-1',
          title: 'LIFO & Monotonic Stack Patterns',
          problems: [
            { id: 'nc-21', title: 'Valid Parentheses', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/valid-parentheses/', youtubeUrl: 'https://www.youtube.com/watch?v=WTzjTskDFMg', companies: ['Google', 'Meta', 'Amazon'], tags: ['Stack'] },
            { id: 'nc-22', title: 'Min Stack', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/min-stack/', youtubeUrl: 'https://www.youtube.com/watch?v=qkLl7nAwDPo', companies: ['Amazon', 'Microsoft'], tags: ['Stack', 'Design'] },
            { id: 'nc-23', title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', youtubeUrl: 'https://www.youtube.com/watch?v=iu0082c4H_g', tags: ['Stack'] },
            { id: 'nc-24', title: 'Generate Parentheses', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/generate-parentheses/', youtubeUrl: 'https://www.youtube.com/watch?v=s9fokUqJ76A', companies: ['Amazon', 'Google'], tags: ['Stack', 'Backtracking'] },
            { id: 'nc-25', title: 'Daily Temperatures', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/daily-temperatures/', youtubeUrl: 'https://www.youtube.com/watch?v=cTBiBSnjO3c', companies: ['Google', 'Meta'], tags: ['Monotonic Stack'] },
            { id: 'nc-26', title: 'Car Fleet', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/car-fleet/', youtubeUrl: 'https://www.youtube.com/watch?v=Pr6T-3yB9RM', tags: ['Monotonic Stack', 'Sorting'] },
            { id: 'nc-27', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', youtubeUrl: 'https://www.youtube.com/watch?v=zx5Sw9130L0', companies: ['Amazon', 'Google'], tags: ['Monotonic Stack'] },
          ],
        },
      ],
    },
    {
      id: 'nc-binary-search',
      title: 'Binary Search (7 Problems)',
      lectures: [
        {
          id: 'nc-bs-1',
          title: 'Search Space Reduction',
          problems: [
            { id: 'nc-28', title: 'Binary Search', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/binary-search/', youtubeUrl: 'https://www.youtube.com/watch?v=s4DPM8ct1pI', tags: ['Binary Search'] },
            { id: 'nc-29', title: 'Search a 2D Matrix', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/search-a-2d-matrix/', youtubeUrl: 'https://www.youtube.com/watch?v=Ber2pi2C0j0', companies: ['Amazon', 'Microsoft'], tags: ['Binary Search'] },
            { id: 'nc-30', title: 'Koko Eating Bananas', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/koko-eating-bananas/', youtubeUrl: 'https://www.youtube.com/watch?v=U2SozAs9RzA', companies: ['Google'], tags: ['Binary Search'] },
            { id: 'nc-31', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', youtubeUrl: 'https://www.youtube.com/watch?v=nIVW4P8b1VA', companies: ['Microsoft', 'Uber'], tags: ['Binary Search'] },
            { id: 'nc-32', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', youtubeUrl: 'https://www.youtube.com/watch?v=U8XENwh8Oy8', companies: ['Google', 'Amazon'], tags: ['Binary Search'] },
            { id: 'nc-33', title: 'Time Based Key-Value Store', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/time-based-key-value-store/', youtubeUrl: 'https://www.youtube.com/watch?v=fu2cD_6E8Hw', companies: ['Google', 'Apple'], tags: ['Binary Search', 'Design'] },
            { id: 'nc-34', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', youtubeUrl: 'https://www.youtube.com/watch?v=q6IEA26hvPE', companies: ['Google', 'Amazon', 'Microsoft'], tags: ['Binary Search', 'Divide and Conquer'] },
          ],
        },
      ],
    },
    {
      id: 'nc-linked-list',
      title: 'Linked List (11 Problems)',
      lectures: [
        {
          id: 'nc-ll-1',
          title: 'Pointer & In-Place Node Manipulation',
          problems: [
            { id: 'nc-35', title: 'Reverse Linked List', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reverse-linked-list/', youtubeUrl: 'https://www.youtube.com/watch?v=G0_I-ZF0S38', companies: ['Amazon', 'Microsoft'], tags: ['Linked List'] },
            { id: 'nc-36', title: 'Merge Two Sorted Lists', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', youtubeUrl: 'https://www.youtube.com/watch?v=XIdigk956u0', companies: ['Amazon', 'Apple'], tags: ['Linked List'] },
            { id: 'nc-37', title: 'Reorder List', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reorder-list/', youtubeUrl: 'https://www.youtube.com/watch?v=S5bfdUTrKLM', companies: ['Meta', 'Amazon'], tags: ['Linked List'] },
            { id: 'nc-38', title: 'Remove Nth Node From End of List', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', youtubeUrl: 'https://www.youtube.com/watch?v=XVuQxVej6y8', companies: ['Google', 'Amazon'], tags: ['Linked List'] },
            { id: 'nc-39', title: 'Copy List with Random Pointer', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/', youtubeUrl: 'https://www.youtube.com/watch?v=5Y2EiZST97Y', companies: ['Microsoft', 'Amazon'], tags: ['Linked List'] },
            { id: 'nc-40', title: 'Add Two Numbers', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/add-two-numbers/', youtubeUrl: 'https://www.youtube.com/watch?v=wgFPrzTjm7s', companies: ['Amazon', 'Meta'], tags: ['Linked List'] },
            { id: 'nc-41', title: 'Linked List Cycle', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/linked-list-cycle/', youtubeUrl: 'https://www.youtube.com/watch?v=gBTe7lFR3vc', companies: ['Amazon', 'Microsoft'], tags: ['Fast-Slow Pointers'] },
            { id: 'nc-42', title: 'Find the Duplicate Number', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/find-the-duplicate-number/', youtubeUrl: 'https://www.youtube.com/watch?v=wjYnzkAhcNk', companies: ['Amazon'], tags: ['Fast-Slow Pointers'] },
            { id: 'nc-43', title: 'LRU Cache', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/lru-cache/', youtubeUrl: 'https://www.youtube.com/watch?v=7ABFKPK2hD4', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Hashmap', 'Doubly Linked List'] },
            { id: 'nc-44', title: 'Merge k Sorted Lists', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', youtubeUrl: 'https://www.youtube.com/watch?v=q5a5OiGbT6Q', companies: ['Amazon', 'Google'], tags: ['Heap', 'Linked List'] },
            { id: 'nc-45', title: 'Reverse Nodes in k-Group', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', youtubeUrl: 'https://www.youtube.com/watch?v=1UOPsfP85V4', companies: ['Microsoft', 'Amazon'], tags: ['Linked List'] },
          ],
        },
      ],
    },
    {
      id: 'nc-trees',
      title: 'Trees (15 Problems)',
      lectures: [
        {
          id: 'nc-tr-1',
          title: 'Binary Tree Traversals & Recursion',
          problems: [
            { id: 'nc-46', title: 'Invert Binary Tree', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/invert-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY', companies: ['Google'], tags: ['Tree'] },
            { id: 'nc-47', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=hTM3phVI6YQ', tags: ['Tree', 'DFS'] },
            { id: 'nc-48', title: 'Diameter of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=bkxqA8Rfo04', companies: ['Meta', 'Amazon'], tags: ['Tree'] },
            { id: 'nc-49', title: 'Balanced Binary Tree', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/balanced-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=QfJsau0ItOY', tags: ['Tree'] },
            { id: 'nc-50', title: 'Same Tree', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/same-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=vRbbcKXCxOw', tags: ['Tree'] },
            { id: 'nc-51', title: 'Subtree of Another Tree', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/subtree-of-another-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=E36O5SWp-LE', companies: ['Amazon'], tags: ['Tree'] },
            { id: 'nc-52', title: 'Lowest Common Ancestor of a BST', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=gs2LMfuOR9k', companies: ['Amazon'], tags: ['BST'] },
            { id: 'nc-53', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', youtubeUrl: 'https://www.youtube.com/watch?v=6ZnyEApgFYg', companies: ['Amazon', 'Microsoft'], tags: ['BFS', 'Tree'] },
            { id: 'nc-54', title: 'Binary Tree Right Side View', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/', youtubeUrl: 'https://www.youtube.com/watch?v=d4zLyf32e3I', companies: ['Meta'], tags: ['BFS', 'DFS'] },
            { id: 'nc-55', title: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=7cp5imvDzl4', tags: ['Tree', 'DFS'] },
            { id: 'nc-56', title: 'Validate Binary Search Tree', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/validate-binary-search-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=s6ATEkipzow', companies: ['Amazon', 'Microsoft'], tags: ['BST'] },
            { id: 'nc-57', title: 'Kth Smallest Element in a BST', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', youtubeUrl: 'https://www.youtube.com/watch?v=5LUXSvKTGCg', companies: ['Amazon', 'Uber'], tags: ['BST'] },
            { id: 'nc-58', title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', youtubeUrl: 'https://www.youtube.com/watch?v=ihj4IQGZ2zc', companies: ['Amazon', 'Microsoft'], tags: ['Tree'] },
            { id: 'nc-59', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', youtubeUrl: 'https://www.youtube.com/watch?v=Hr5cWUld4vU', companies: ['Meta', 'Google'], tags: ['Tree', 'DFS'] },
            { id: 'nc-60', title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=u4JAi2JJhIg', companies: ['Google', 'Meta'], tags: ['Tree', 'Design'] },
          ],
        },
      ],
    },
    {
      id: 'nc-tries',
      title: 'Tries (3 Problems)',
      lectures: [
        {
          id: 'nc-tr-tries',
          title: 'Prefix Tree Implementations',
          problems: [
            { id: 'nc-61', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=oobqoCJlHA0', companies: ['Google', 'Amazon'], tags: ['Trie'] },
            { id: 'nc-62', title: 'Design Add and Search Words Data Structure', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', youtubeUrl: 'https://www.youtube.com/watch?v=BTf05gs_8iU', companies: ['Meta'], tags: ['Trie'] },
            { id: 'nc-63', title: 'Word Search II', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/word-search-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=asbcE9mZz_U', companies: ['Uber', 'Microsoft'], tags: ['Trie', 'Backtracking'] },
          ],
        },
      ],
    },
    {
      id: 'nc-heap',
      title: 'Heap / Priority Queue (7 Problems)',
      lectures: [
        {
          id: 'nc-hp-1',
          title: 'Min-Heap & Stream Processing',
          problems: [
            { id: 'nc-64', title: 'Kth Largest Element in a Stream', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', youtubeUrl: 'https://www.youtube.com/watch?v=hOjcdrqMoQ8', tags: ['Heap'] },
            { id: 'nc-65', title: 'Last Stone Weight', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/last-stone-weight/', youtubeUrl: 'https://www.youtube.com/watch?v=B-QCq79-Vfw', tags: ['Heap'] },
            { id: 'nc-66', title: 'K Closest Points to Origin', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', youtubeUrl: 'https://www.youtube.com/watch?v=rI2EBUEMfTk', companies: ['Amazon', 'Meta'], tags: ['Heap'] },
            { id: 'nc-67', title: 'Kth Largest Element in an Array', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', youtubeUrl: 'https://www.youtube.com/watch?v=XEmy138QB9Q', companies: ['Amazon', 'Google'], tags: ['Heap', 'QuickSelect'] },
            { id: 'nc-68', title: 'Task Scheduler', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/task-scheduler/', youtubeUrl: 'https://www.youtube.com/watch?v=s8p8ukTyA2I', companies: ['Meta', 'Amazon'], tags: ['Heap', 'Greedy'] },
            { id: 'nc-69', title: 'Design Twitter', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/design-twitter/', youtubeUrl: 'https://www.youtube.com/watch?v=pNichitDD2E', companies: ['Twitter', 'Amazon'], tags: ['Heap', 'Design'] },
            { id: 'nc-70', title: 'Find Median from Data Stream', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/find-median-from-data-stream/', youtubeUrl: 'https://www.youtube.com/watch?v=itmhHWaHupI', companies: ['Google', 'Amazon'], tags: ['Heap', 'Two Heaps'] },
          ],
        },
      ],
    },
    {
      id: 'nc-backtracking',
      title: 'Backtracking (9 Problems)',
      lectures: [
        {
          id: 'nc-bt-1',
          title: 'Permutations, Subsets & Pruning',
          problems: [
            { id: 'nc-71', title: 'Subsets', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/subsets/', youtubeUrl: 'https://www.youtube.com/watch?v=REOH22Xwdkk', companies: ['Meta', 'Amazon'], tags: ['Backtracking'] },
            { id: 'nc-72', title: 'Combination Sum', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/combination-sum/', youtubeUrl: 'https://www.youtube.com/watch?v=GBKI9VSKdGg', companies: ['Google', 'Amazon'], tags: ['Backtracking'] },
            { id: 'nc-73', title: 'Permutations', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/permutations/', youtubeUrl: 'https://www.youtube.com/watch?v=s7AvT7cGdSo', companies: ['Microsoft', 'Google'], tags: ['Backtracking'] },
            { id: 'nc-74', title: 'Subsets II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/subsets-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=Vn2v6ajA7U0', tags: ['Backtracking'] },
            { id: 'nc-75', title: 'Combination Sum II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/combination-sum-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=rSA3t6BDDwg', tags: ['Backtracking'] },
            { id: 'nc-76', title: 'Word Search', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/word-search/', youtubeUrl: 'https://www.youtube.com/watch?v=pfiQ_PS1g8E', companies: ['Amazon', 'Microsoft'], tags: ['Backtracking'] },
            { id: 'nc-77', title: 'Palindrome Partitioning', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/palindrome-partitioning/', youtubeUrl: 'https://www.youtube.com/watch?v=3jvWodd7ht0', tags: ['Backtracking'] },
            { id: 'nc-78', title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', youtubeUrl: 'https://www.youtube.com/watch?v=0snEunUacZY', companies: ['Amazon', 'Meta'], tags: ['Backtracking'] },
            { id: 'nc-79', title: 'N-Queens', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/n-queens/', youtubeUrl: 'https://www.youtube.com/watch?v=Ph95IHmRp5M', companies: ['Google', 'Microsoft'], tags: ['Backtracking'] },
          ],
        },
      ],
    },
    {
      id: 'nc-graphs',
      title: 'Graphs (13 Problems)',
      lectures: [
        {
          id: 'nc-gr-1',
          title: 'BFS, DFS & Topological Sort',
          problems: [
            { id: 'nc-80', title: 'Number of Islands', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/number-of-islands/', youtubeUrl: 'https://www.youtube.com/watch?v=pV2kpPD66nE', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Graph', 'BFS', 'DFS'] },
            { id: 'nc-81', title: 'Max Area of Island', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/max-area-of-island/', youtubeUrl: 'https://www.youtube.com/watch?v=iJGr1OtmH0c', tags: ['Graph', 'DFS'] },
            { id: 'nc-82', title: 'Clone Graph', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/clone-graph/', youtubeUrl: 'https://www.youtube.com/watch?v=mQeF6bN8hMk', companies: ['Meta', 'Amazon'], tags: ['Graph'] },
            { id: 'nc-83', title: 'Walls and Gates', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/walls-and-gates/', youtubeUrl: 'https://www.youtube.com/watch?v=e69C6xhiSQE', tags: ['Graph', 'BFS'] },
            { id: 'nc-84', title: 'Rotting Oranges', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/rotting-oranges/', youtubeUrl: 'https://www.youtube.com/watch?v=y704cgRxPQA', companies: ['Amazon', 'Microsoft'], tags: ['Graph', 'BFS'] },
            { id: 'nc-85', title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', youtubeUrl: 'https://www.youtube.com/watch?v=s-VkcjHqkGI', tags: ['Graph', 'DFS'] },
            { id: 'nc-86', title: 'Surrounded Regions', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/surrounded-regions/', youtubeUrl: 'https://www.youtube.com/watch?v=9z2BunfoZ5Y', tags: ['Graph', 'DFS'] },
            { id: 'nc-87', title: 'Course Schedule', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/course-schedule/', youtubeUrl: 'https://www.youtube.com/watch?v=EgI5nU9etnU', companies: ['Google', 'Amazon'], tags: ['Graph', 'Topological Sort'] },
            { id: 'nc-88', title: 'Course Schedule II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/course-schedule-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=Akt3glAwyfY', companies: ['Google', 'Amazon'], tags: ['Graph', 'Topological Sort'] },
            { id: 'nc-89', title: 'Graph Valid Tree', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/graph-valid-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=bXsUuownnoQ', tags: ['Graph', 'Union-Find'] },
            { id: 'nc-90', title: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', youtubeUrl: 'https://www.youtube.com/watch?v=8f1XPm4WOUc', tags: ['Graph', 'Union-Find'] },
            { id: 'nc-91', title: 'Redundant Connection', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/redundant-connection/', youtubeUrl: 'https://www.youtube.com/watch?v=FXWRE67PLL0', tags: ['Graph', 'Union-Find'] },
            { id: 'nc-92', title: 'Word Ladder', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/word-ladder/', youtubeUrl: 'https://www.youtube.com/watch?v=h9iTnkgv05E', companies: ['Google', 'Amazon'], tags: ['Graph', 'BFS'] },
          ],
        },
      ],
    },
    {
      id: 'nc-advanced-graphs',
      title: 'Advanced Graphs (6 Problems)',
      lectures: [
        {
          id: 'nc-ag-1',
          title: 'Shortest Path & MST',
          problems: [
            { id: 'nc-93', title: 'Reconstruct Itinerary', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reconstruct-itinerary/', youtubeUrl: 'https://www.youtube.com/watch?v=ZyB_gQ89GA4', companies: ['Uber'], tags: ['Graph', 'Eulerian Path'] },
            { id: 'nc-94', title: 'Min Cost to Connect All Points', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', youtubeUrl: 'https://www.youtube.com/watch?v=f7JOBJIC-NA', tags: ['Graph', 'Prim', 'Kruskal'] },
            { id: 'nc-95', title: 'Network Delay Time', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/network-delay-time/', youtubeUrl: 'https://www.youtube.com/watch?v=EaphyqKU4PQ', tags: ['Graph', 'Dijkstra'] },
            { id: 'nc-96', title: 'Swim in Rising Water', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/swim-in-rising-water/', youtubeUrl: 'https://www.youtube.com/watch?v=amvrKlMLuGY', tags: ['Graph', 'Binary Search'] },
            { id: 'nc-97', title: 'Alien Dictionary', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/alien-dictionary/', youtubeUrl: 'https://www.youtube.com/watch?v=6kTZYvNNyps', companies: ['Google', 'Meta'], tags: ['Graph', 'Topological Sort'] },
            { id: 'nc-98', title: 'Cheapest Flights Within K Stops', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', youtubeUrl: 'https://www.youtube.com/watch?v=5eIK3zUdYmE', tags: ['Graph', 'Bellman-Ford'] },
          ],
        },
      ],
    },
    {
      id: 'nc-1d-dp',
      title: '1-D Dynamic Programming (12 Problems)',
      lectures: [
        {
          id: 'nc-1dp-1',
          title: 'Optimal Substructure & Memoization',
          problems: [
            { id: 'nc-99', title: 'Climbing Stairs', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/climbing-stairs/', youtubeUrl: 'https://www.youtube.com/watch?v=Y0lT9Fck7q8', tags: ['DP'] },
            { id: 'nc-100', title: 'Min Cost Climbing Stairs', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/', youtubeUrl: 'https://www.youtube.com/watch?v=ktmzAZWkEZ0', tags: ['DP'] },
            { id: 'nc-101', title: 'House Robber', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/house-robber/', youtubeUrl: 'https://www.youtube.com/watch?v=73r3KWiEvyk', companies: ['Amazon', 'Microsoft'], tags: ['DP'] },
            { id: 'nc-102', title: 'House Robber II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/house-robber-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=rWAJCfYYOvM', tags: ['DP'] },
            { id: 'nc-103', title: 'Longest Palindromic Substring', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/longest-palindromic-substring/', youtubeUrl: 'https://www.youtube.com/watch?v=XYQecbcd6_c', companies: ['Amazon', 'Google'], tags: ['DP'] },
            { id: 'nc-104', title: 'Palindromic Substrings', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/palindromic-substrings/', youtubeUrl: 'https://www.youtube.com/watch?v=4RACzI5-du8', tags: ['DP'] },
            { id: 'nc-105', title: 'Decode Ways', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/decode-ways/', youtubeUrl: 'https://www.youtube.com/watch?v=6aEyTjOwlJU', companies: ['Meta', 'Amazon'], tags: ['DP'] },
            { id: 'nc-106', title: 'Coin Change', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/coin-change/', youtubeUrl: 'https://www.youtube.com/watch?v=H9bfqozJoqs', companies: ['Amazon', 'Google'], tags: ['DP'] },
            { id: 'nc-107', title: 'Maximum Product Subarray', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/maximum-product-subarray/', youtubeUrl: 'https://www.youtube.com/watch?v=lXVy6YWFcRM', companies: ['Google', 'Microsoft'], tags: ['DP'] },
            { id: 'nc-108', title: 'Word Break', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/word-break/', youtubeUrl: 'https://www.youtube.com/watch?v=Sx9NNgInc3A', companies: ['Amazon', 'Meta'], tags: ['DP'] },
            { id: 'nc-109', title: 'Longest Increasing Subsequence', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/', youtubeUrl: 'https://www.youtube.com/watch?v=cjWnW0hdF1Y', companies: ['Google', 'Amazon'], tags: ['DP', 'Binary Search'] },
            { id: 'nc-110', title: 'Partition Equal Subset Sum', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/', youtubeUrl: 'https://www.youtube.com/watch?v=IsvocB5BJhw', tags: ['DP', 'Knapsack'] },
          ],
        },
      ],
    },
    {
      id: 'nc-2d-dp',
      title: '2-D Dynamic Programming (11 Problems)',
      lectures: [
        {
          id: 'nc-2dp-1',
          title: 'Grids & String Subsequences',
          problems: [
            { id: 'nc-111', title: 'Unique Paths', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/unique-paths/', youtubeUrl: 'https://www.youtube.com/watch?v=IlEsdxuD4lY', companies: ['Amazon', 'Google'], tags: ['DP'] },
            { id: 'nc-112', title: 'Longest Common Subsequence', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/longest-common-subsequence/', youtubeUrl: 'https://www.youtube.com/watch?v=Ua0GhsJSlWM', companies: ['Amazon'], tags: ['DP'] },
            { id: 'nc-113', title: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', youtubeUrl: 'https://www.youtube.com/watch?v=I7j0F7AHpb8', tags: ['DP'] },
            { id: 'nc-114', title: 'Coin Change II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/coin-change-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=Mjy4hd2xgrs', tags: ['DP'] },
            { id: 'nc-115', title: 'Target Sum', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/target-sum/', youtubeUrl: 'https://www.youtube.com/watch?v=g0npyaQtAQM', tags: ['DP'] },
            { id: 'nc-116', title: 'Interleaving String', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/interleaving-string/', youtubeUrl: 'https://www.youtube.com/watch?v=3Rw3p9LrgvE', tags: ['DP'] },
            { id: 'nc-117', title: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', youtubeUrl: 'https://www.youtube.com/watch?v=wCc_nd-GiEc', companies: ['Google'], tags: ['DP', 'DFS'] },
            { id: 'nc-118', title: 'Distinct Subsequences', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/distinct-subsequences/', youtubeUrl: 'https://www.youtube.com/watch?v=-RDzMJ33nx8', tags: ['DP'] },
            { id: 'nc-119', title: 'Edit Distance', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/edit-distance/', youtubeUrl: 'https://www.youtube.com/watch?v=XYi2-LPrv4A', companies: ['Google', 'Amazon'], tags: ['DP'] },
            { id: 'nc-120', title: 'Burst Balloons', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/burst-balloons/', youtubeUrl: 'https://www.youtube.com/watch?v=VFskby7lUbw', tags: ['DP'] },
            { id: 'nc-121', title: 'Regular Expression Matching', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/regular-expression-matching/', youtubeUrl: 'https://www.youtube.com/watch?v=HAA8mgxlov8', companies: ['Google', 'Meta'], tags: ['DP'] },
          ],
        },
      ],
    },
    {
      id: 'nc-greedy',
      title: 'Greedy (8 Problems)',
      lectures: [
        {
          id: 'nc-grd-1',
          title: 'Local Optimal Decisions',
          problems: [
            { id: 'nc-122', title: 'Maximum Subarray', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/maximum-subarray/', youtubeUrl: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg', companies: ['Amazon', 'Microsoft'], tags: ['Greedy', 'Kadane'] },
            { id: 'nc-123', title: 'Jump Game', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/jump-game/', youtubeUrl: 'https://www.youtube.com/watch?v=Yan0cv2cLy8', companies: ['Amazon'], tags: ['Greedy'] },
            { id: 'nc-124', title: 'Jump Game II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/jump-game-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=dJ7sWiOoK7g', companies: ['Amazon', 'Google'], tags: ['Greedy'] },
            { id: 'nc-125', title: 'Gas Station', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/gas-station/', youtubeUrl: 'https://www.youtube.com/watch?v=lJwbPZGo05A', tags: ['Greedy'] },
            { id: 'nc-126', title: 'Hand of Straights', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/hand-of-straights/', youtubeUrl: 'https://www.youtube.com/watch?v=amnrMCVd2YI', tags: ['Greedy'] },
            { id: 'nc-127', title: 'Merge Triplets to Form Target Triplet', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/', youtubeUrl: 'https://www.youtube.com/watch?v=kKAO_D1r7yA', tags: ['Greedy'] },
            { id: 'nc-128', title: 'Partition Labels', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/partition-labels/', youtubeUrl: 'https://www.youtube.com/watch?v=B7m8UmZE-vw', companies: ['Amazon'], tags: ['Greedy'] },
            { id: 'nc-129', title: 'Valid Parenthesis String', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/valid-parenthesis-string/', youtubeUrl: 'https://www.youtube.com/watch?v=QhPdNS143Rs', tags: ['Greedy'] },
          ],
        },
      ],
    },
    {
      id: 'nc-intervals',
      title: 'Intervals (6 Problems)',
      lectures: [
        {
          id: 'nc-int-1',
          title: 'Range Merging & Scheduling',
          problems: [
            { id: 'nc-130', title: 'Insert Interval', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/insert-interval/', youtubeUrl: 'https://www.youtube.com/watch?v=A8NUOmlwOlM', companies: ['Google'], tags: ['Intervals'] },
            { id: 'nc-131', title: 'Merge Intervals', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/merge-intervals/', youtubeUrl: 'https://www.youtube.com/watch?v=44H3cEC2fFM', companies: ['Google', 'Amazon', 'Meta'], tags: ['Intervals'] },
            { id: 'nc-132', title: 'Non-overlapping Intervals', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/non-overlapping-intervals/', youtubeUrl: 'https://www.youtube.com/watch?v=nONCGxWoUfM', tags: ['Intervals'] },
            { id: 'nc-133', title: 'Meeting Rooms', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/meeting-rooms/', youtubeUrl: 'https://www.youtube.com/watch?v=PaJxqZVPhkq', tags: ['Intervals'] },
            { id: 'nc-134', title: 'Meeting Rooms II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/meeting-rooms-ii/', youtubeUrl: 'https://www.youtube.com/watch?v=FdzJmTCVyJU', companies: ['Google', 'Amazon'], tags: ['Intervals', 'Heap'] },
            { id: 'nc-135', title: 'Minimum Interval to Include Each Query', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/', youtubeUrl: 'https://www.youtube.com/watch?v=5hQ5WWW5awQ', tags: ['Intervals', 'Heap'] },
          ],
        },
      ],
    },
    {
      id: 'nc-math-geometry',
      title: 'Math & Geometry (8 Problems)',
      lectures: [
        {
          id: 'nc-mg-1',
          title: 'Coordinate & Number Theory',
          problems: [
            { id: 'nc-136', title: 'Rotate Image', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/rotate-image/', youtubeUrl: 'https://www.youtube.com/watch?v=fMSJSS7eO1w', companies: ['Microsoft', 'Amazon'], tags: ['Matrix', 'Math'] },
            { id: 'nc-137', title: 'Spiral Matrix', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/spiral-matrix/', youtubeUrl: 'https://www.youtube.com/watch?v=BJnMZNwUk1M', companies: ['Microsoft', 'Google'], tags: ['Matrix'] },
            { id: 'nc-138', title: 'Set Matrix Zeroes', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/set-matrix-zeroes/', youtubeUrl: 'https://www.youtube.com/watch?v=T41rL0L3Pnw', companies: ['Microsoft', 'Amazon'], tags: ['Matrix'] },
            { id: 'nc-139', title: 'Happy Number', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/happy-number/', youtubeUrl: 'https://www.youtube.com/watch?v=ljz85bxOYJ0', tags: ['Math'] },
            { id: 'nc-140', title: 'Plus One', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/plus-one/', youtubeUrl: 'https://www.youtube.com/watch?v=jIaA8boiG1s', tags: ['Math'] },
            { id: 'nc-141', title: 'Pow(x, n)', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/powx-n/', youtubeUrl: 'https://www.youtube.com/watch?v=g9YQyYi4IQQ', companies: ['Meta', 'Google'], tags: ['Math'] },
            { id: 'nc-142', title: 'Multiply Strings', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/multiply-strings/', youtubeUrl: 'https://www.youtube.com/watch?v=1vZswirL8Y8', tags: ['Math', 'Strings'] },
            { id: 'nc-143', title: 'Detect Squares', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/detect-squares/', youtubeUrl: 'https://www.youtube.com/watch?v=bahebearrDc', tags: ['Geometry', 'Hashmap'] },
          ],
        },
      ],
    },
    {
      id: 'nc-bit-manipulation',
      title: 'Bit Manipulation (7 Problems)',
      lectures: [
        {
          id: 'nc-bm-1',
          title: 'Bitwise Operators & Masks',
          problems: [
            { id: 'nc-144', title: 'Single Number', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/single-number/', youtubeUrl: 'https://www.youtube.com/watch?v=qMPX1AOa83k', companies: ['Amazon'], tags: ['Bit Manipulation'] },
            { id: 'nc-145', title: 'Number of 1 Bits', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/number-of-1-bits/', youtubeUrl: 'https://www.youtube.com/watch?v=5Km3utixwZs', tags: ['Bit Manipulation'] },
            { id: 'nc-146', title: 'Counting Bits', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/counting-bits/', youtubeUrl: 'https://www.youtube.com/watch?v=RyBM56P6QR8', tags: ['Bit Manipulation', 'DP'] },
            { id: 'nc-147', title: 'Reverse Bits', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reverse-bits/', youtubeUrl: 'https://www.youtube.com/watch?v=UcoN6UjAI64', tags: ['Bit Manipulation'] },
            { id: 'nc-148', title: 'Missing Number', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/missing-number/', youtubeUrl: 'https://www.youtube.com/watch?v=WnPLSRLSANE', companies: ['Amazon'], tags: ['Bit Manipulation'] },
            { id: 'nc-149', title: 'Sum of Two Integers', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/sum-of-two-integers/', youtubeUrl: 'https://www.youtube.com/watch?v=gVUrDV4tZfY', tags: ['Bit Manipulation'] },
            { id: 'nc-150', title: 'Reverse Integer', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reverse-integer/', youtubeUrl: 'https://www.youtube.com/watch?v=HAgLH58IgJQ', companies: ['Google', 'Amazon'], tags: ['Math', 'Bit Manipulation'] },
          ],
        },
      ],
    },
  ],
};

export const STRIVER_A2Z_SHEET: DsaSheet = {
  id: 'strivers-a2z-dsa-sheet',
  slug: 'strivers-a2z-dsa-sheet',
  title: 'Strivers A2Z DSA Sheet',
  creator: 'Striver (Take U Forward)',
  description: 'This course is made for people who want to learn DSA from A to Z for free in a well-structured and comprehensive way.',
  category: ['All', 'Popular', 'Complete DSA'],
  totalQuestions: 455,
  followersCount: 39729,
  steps: STRIVER_A2Z_FULL_STEPS,
};

export const STRIVER_SDE_SHEET: DsaSheet = {
  id: 'striver-sde-sheet',
  slug: 'striver-sde-sheet',
  title: 'Striver SDE Sheet',
  creator: 'Striver',
  description: 'Striver SDE Sheet contains very handily crafted and picked top coding interview problems asked in FAANG and Tier-1 MNCs.',
  category: ['All', 'Popular', 'Quick Revision'],
  totalQuestions: 191,
  followersCount: 14689,
  steps: [
    {
      id: 'sde-day-1',
      title: 'Day 1: Arrays',
      lectures: [
        {
          id: 'sde-d1-l1',
          title: 'Core Array Foundations',
          problems: [
            { id: 'sde-1', title: 'Set Matrix Zeroes', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/set-matrix-zeroes/', youtubeUrl: 'https://www.youtube.com/watch?v=N0MgLvLSXMM', companies: ['Microsoft', 'Amazon'], tags: ['Arrays'] },
            { id: 'sde-2', title: 'Pascal\'s Triangle', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/pascals-triangle/', youtubeUrl: 'https://www.youtube.com/watch?v=bR7mQgwQ_o8', companies: ['Google', 'Amazon'], tags: ['Arrays'] },
            { id: 'sde-3', title: 'Next Permutation', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/next-permutation/', youtubeUrl: 'https://www.youtube.com/watch?v=JDOXKqF60RQ', companies: ['Google', 'Uber'], tags: ['Arrays'] },
            { id: 'sde-4', title: 'Kadane\'s Algorithm (Max Subarray Sum)', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/maximum-subarray/', youtubeUrl: 'https://www.youtube.com/watch?v=AHZpyENo7k4', companies: ['Amazon', 'Microsoft'], tags: ['Arrays'] },
            { id: 'sde-5', title: 'Sort an array of 0\'s, 1\'s and 2\'s', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/sort-colors/', youtubeUrl: 'https://www.youtube.com/watch?v=tp8JIu4BcUg', companies: ['Amazon', 'Microsoft'], tags: ['Arrays'] },
            { id: 'sde-6', title: 'Stock Buy and Sell', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', youtubeUrl: 'https://www.youtube.com/watch?v=excAOvwF_Wk', companies: ['Meta', 'Amazon'], tags: ['Arrays'] },
          ],
        },
      ],
    },
    {
      id: 'sde-day-2',
      title: 'Day 2: Arrays Part-II',
      lectures: [
        {
          id: 'sde-d2-l1',
          title: 'Advanced In-place Transformations',
          problems: [
            { id: 'sde-7', title: 'Rotate Matrix by 90 Degrees', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/rotate-image/', youtubeUrl: 'https://www.youtube.com/watch?v=Z0w2Z3loSwt', companies: ['Microsoft', 'Amazon'], tags: ['Arrays'] },
            { id: 'sde-8', title: 'Merge Overlapping Subintervals', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/merge-intervals/', youtubeUrl: 'https://www.youtube.com/watch?v=IexN60k62jo', companies: ['Google', 'Meta'], tags: ['Intervals'] },
            { id: 'sde-9', title: 'Merge Two Sorted Arrays Without Extra Space', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/merge-sorted-array/', youtubeUrl: 'https://www.youtube.com/watch?v=n7uwj04E0I4', companies: ['Amazon'], tags: ['Two Pointers'] },
            { id: 'sde-10', title: 'Find the Duplicate in an Array of N+1 Integers', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/find-the-duplicate-number/', youtubeUrl: 'https://www.youtube.com/watch?v=32Ll35mhWg0', companies: ['Amazon', 'Google'], tags: ['Floyd Tortoise'] },
            { id: 'sde-11', title: 'Repeat and Missing Number', difficulty: 'Medium', platform: 'GeeksforGeeks', problemUrl: 'https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2512/1', youtubeUrl: 'https://www.youtube.com/watch?v=2D0D8HE6Ano', companies: ['Amazon'], tags: ['Math'] },
            { id: 'sde-12', title: 'Inversion of Array', difficulty: 'Hard', platform: 'GeeksforGeeks', problemUrl: 'https://practice.geeksforgeeks.org/problems/inversion-of-array-1587115620/1', youtubeUrl: 'https://www.youtube.com/watch?v=AseUmwVNaoY', companies: ['Google'], tags: ['Divide and Conquer'] },
          ],
        },
      ],
    },
  ],
};

export const BLIND_75_SHEET: DsaSheet = {
  id: 'blind-75',
  slug: 'blind-75',
  title: 'Blind 75',
  creator: 'Yangshun Tay',
  description: 'The Blind 75 sheet includes a curated list of 75 most essential LeetCode questions to prepare for technical interviews in minimum time.',
  category: ['All', 'Popular', 'Quick Revision'],
  totalQuestions: 75,
  followersCount: 4630,
  steps: [
    {
      id: 'b75-array',
      title: 'Array & Matrix',
      lectures: [
        {
          id: 'b75-arr-1',
          title: 'Top Essential Array Problems',
          problems: [
            { id: 'b75-1', title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/two-sum/', companies: ['Google', 'Amazon', 'Meta'], tags: ['Hashmap'] },
            { id: 'b75-2', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', companies: ['Amazon', 'Microsoft'], tags: ['Greedy'] },
            { id: 'b75-3', title: 'Contains Duplicate', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/contains-duplicate/', tags: ['Hashmap'] },
            { id: 'b75-4', title: 'Product of Array Except Self', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/product-of-array-except-self/', companies: ['Amazon', 'Meta'], tags: ['Arrays'] },
            { id: 'b75-5', title: 'Maximum Subarray', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/maximum-subarray/', companies: ['Amazon', 'Microsoft'], tags: ['Kadane'] },
            { id: 'b75-6', title: 'Maximum Product Subarray', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/maximum-product-subarray/', companies: ['Google', 'Microsoft'], tags: ['DP'] },
            { id: 'b75-7', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', companies: ['Microsoft', 'Uber'], tags: ['Binary Search'] },
            { id: 'b75-8', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', companies: ['Google', 'Amazon'], tags: ['Binary Search'] },
            { id: 'b75-9', title: '3Sum', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/3sum/', companies: ['Meta', 'Amazon'], tags: ['Two Pointers'] },
            { id: 'b75-10', title: 'Container With Most Water', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/container-with-most-water/', companies: ['Google', 'Amazon'], tags: ['Two Pointers'] },
          ],
        },
      ],
    },
  ],
};

export const DSA_PATTERNS_KUSHAL_SHEET: DsaSheet = {
  id: '20-essential-dsa-patterns-by-kushal',
  slug: '20-essential-dsa-patterns-by-kushal',
  title: '20 Essential DSA Patterns by Kushal',
  creator: 'Kushal (Codolio / FAANG Mentor)',
  description: 'Master the 20 fundamental patterns that solve 90% of coding interview problems. Learn how to identify underlying templates.',
  category: ['All', 'Popular', 'Topic Specific'],
  totalQuestions: 80,
  followersCount: 8920,
  steps: [
    {
      id: 'pat-1',
      title: 'Pattern 1: Two Pointers',
      lectures: [
        {
          id: 'p1-l1',
          title: 'Opposite & Same Direction Pointers',
          problems: [
            { id: 'pat-1-1', title: 'Valid Palindrome', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/valid-palindrome/', tags: ['Two Pointers'] },
            { id: 'pat-1-2', title: '3Sum', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/3sum/', companies: ['Amazon', 'Google'], tags: ['Two Pointers'] },
            { id: 'pat-1-3', title: 'Trapping Rain Water', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/trapping-rain-water/', companies: ['Google', 'Amazon', 'Microsoft'], tags: ['Two Pointers'] },
            { id: 'pat-1-4', title: 'Boats to Save People', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/boats-to-save-people/', tags: ['Two Pointers', 'Greedy'] },
          ],
        },
      ],
    },
    {
      id: 'pat-2',
      title: 'Pattern 2: Fast & Slow Pointers',
      lectures: [
        {
          id: 'p2-l1',
          title: 'Floyd\'s Cycle Finding',
          problems: [
            { id: 'pat-2-1', title: 'Linked List Cycle', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/linked-list-cycle/', companies: ['Amazon', 'Microsoft'], tags: ['Fast-Slow Pointers'] },
            { id: 'pat-2-2', title: 'Middle of the Linked List', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/', tags: ['Fast-Slow Pointers'] },
            { id: 'pat-2-3', title: 'Find the Duplicate Number', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/find-the-duplicate-number/', companies: ['Amazon'], tags: ['Fast-Slow Pointers'] },
            { id: 'pat-2-4', title: 'Happy Number', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/happy-number/', tags: ['Fast-Slow Pointers'] },
          ],
        },
      ],
    },
  ],
};

// -------------------------------------------------------------
// Company Wise Free Interview Kits (College Study Curated)
// -------------------------------------------------------------

export const GOOGLE_SDE_KIT: DsaSheet = {
  id: 'google-sde-kit',
  slug: 'google-sde-kit',
  title: 'Google SDE High-Frequency Interview Kit 🎁',
  creator: 'College Study Curated',
  description: 'Cherry-picked, high-frequency questions directly asked in Google L3/L4/L5 coding rounds over the past 6-12 months. Free & unlocked.',
  category: ['Company Wise', 'All', 'Popular'],
  totalQuestions: 65,
  followersCount: 12340,
  isCompanyWise: true,
  featuredCompany: 'Google',
  steps: [
    {
      id: 'goog-round-1',
      title: 'Google Round 1: Strings, Trees & Advanced Binary Search',
      lectures: [
        {
          id: 'goog-r1-l1',
          title: 'High-Frequency Round 1 Problems',
          problems: [
            { id: 'goog-1', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', companies: ['Google', 'Amazon', 'Microsoft'], tags: ['Binary Search'] },
            { id: 'goog-2', title: 'Word Ladder II', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/word-ladder-ii/', companies: ['Google', 'Amazon'], tags: ['BFS', 'Backtracking'] },
            { id: 'goog-3', title: 'Trapping Rain Water', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/trapping-rain-water/', companies: ['Google', 'Amazon', 'Microsoft'], tags: ['Two Pointers', 'Stack'] },
            { id: 'goog-4', title: 'Course Schedule II', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/course-schedule-ii/', companies: ['Google', 'Amazon'], tags: ['Topological Sort', 'Graph'] },
            { id: 'goog-5', title: 'Alien Dictionary', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/alien-dictionary/', companies: ['Google', 'Meta'], tags: ['Graph', 'Topological Sort'] },
            { id: 'goog-6', title: 'Employee Free Time', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/employee-free-time/', companies: ['Google', 'Amazon'], tags: ['Intervals', 'Heap'] },
          ],
        },
      ],
    },
    {
      id: 'goog-round-2',
      title: 'Google Round 2: Dynamic Programming & Graph Models',
      lectures: [
        {
          id: 'goog-r2-l1',
          title: 'Deep Logic & Optimization',
          problems: [
            { id: 'goog-7', title: 'Robot Room Cleaner', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/robot-room-cleaner/', companies: ['Google'], tags: ['Backtracking', 'DFS'] },
            { id: 'goog-8', title: 'Bus Routes', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/bus-routes/', companies: ['Google', 'Uber'], tags: ['BFS', 'Graph'] },
            { id: 'goog-9', title: 'Russian Doll Envelopes', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/russian-doll-envelopes/', companies: ['Google'], tags: ['Binary Search', 'DP'] },
            { id: 'goog-10', title: 'Minimum Area Rectangle', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/minimum-area-rectangle/', companies: ['Google', 'Amazon'], tags: ['Hashmap', 'Geometry'] },
            { id: 'goog-11', title: 'Number of Good Paths', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/number-of-good-paths/', companies: ['Google'], tags: ['Disjoint Set', 'Tree'] },
          ],
        },
      ],
    },
  ],
};

export const AMAZON_SDE_KIT: DsaSheet = {
  id: 'amazon-sde-kit',
  slug: 'amazon-sde-kit',
  title: 'Amazon SDE High-Frequency Interview Kit 🎁',
  creator: 'College Study Curated',
  description: 'Core Amazon Bar-Raiser and technical interview problems asked repeatedly across SDE 1, 2 and intern interviews.',
  category: ['Company Wise', 'All', 'Popular'],
  totalQuestions: 80,
  followersCount: 15820,
  isCompanyWise: true,
  featuredCompany: 'Amazon',
  steps: [
    {
      id: 'amz-round-1',
      title: 'Amazon Core Bar-Raiser Favorites',
      lectures: [
        {
          id: 'amz-r1-l1',
          title: 'Top Frequency Amazon Problems',
          problems: [
            { id: 'amz-1', title: 'Number of Islands', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/number-of-islands/', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['DFS', 'BFS'] },
            { id: 'amz-2', title: 'Merge K Sorted Lists', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', companies: ['Amazon', 'Google'], tags: ['Heap'] },
            { id: 'amz-3', title: 'LRU Cache', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/lru-cache/', companies: ['Amazon', 'Microsoft', 'Google'], tags: ['Hashmap', 'Doubly Linked List'] },
            { id: 'amz-4', title: 'Rotting Oranges', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/rotting-oranges/', companies: ['Amazon', 'Microsoft'], tags: ['BFS'] },
            { id: 'amz-5', title: 'K Closest Points to Origin', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', companies: ['Amazon', 'Meta'], tags: ['Heap'] },
            { id: 'amz-6', title: 'Critical Connections in a Network (Tarjan\'s)', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/critical-connections-in-a-network/', companies: ['Amazon'], tags: ['Graph', 'Bridges'] },
            { id: 'amz-7', title: 'Reorder Data in Log Files', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reorder-data-in-log-files/', companies: ['Amazon'], tags: ['Custom Sorting', 'Strings'] },
          ],
        },
      ],
    },
  ],
};

export const MICROSOFT_SDE_KIT: DsaSheet = {
  id: 'microsoft-sde-kit',
  slug: 'microsoft-sde-kit',
  title: 'Microsoft SDE High-Frequency Interview Kit 🎁',
  creator: 'College Study Curated',
  description: 'Frequently tested interview questions for Microsoft Software Engineer roles across campus and off-campus drives.',
  category: ['Company Wise', 'All', 'Quick Revision'],
  totalQuestions: 60,
  followersCount: 11400,
  isCompanyWise: true,
  featuredCompany: 'Microsoft',
  steps: [
    {
      id: 'ms-core',
      title: 'Microsoft Core Algorithm Questions',
      lectures: [
        {
          id: 'ms-c1',
          title: 'High-Frequency Problems',
          problems: [
            { id: 'ms-1', title: 'Spiral Matrix', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/spiral-matrix/', companies: ['Microsoft', 'Google'], tags: ['Matrix'] },
            { id: 'ms-2', title: 'Copy List with Random Pointer', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/', companies: ['Microsoft', 'Amazon'], tags: ['Linked List'] },
            { id: 'ms-3', title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', companies: ['Microsoft', 'Amazon'], tags: ['BFS', 'Tree'] },
            { id: 'ms-4', title: 'Reverse Nodes in k-Group', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', companies: ['Microsoft', 'Amazon'], tags: ['Linked List'] },
            { id: 'ms-5', title: 'Sign of the Product of an Array', difficulty: 'Easy', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/sign-of-the-product-of-an-array/', companies: ['Microsoft'], tags: ['Arrays'] },
            { id: 'ms-6', title: 'Find All Anagrams in a String', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', companies: ['Microsoft', 'Amazon'], tags: ['Sliding Window'] },
          ],
        },
      ],
    },
  ],
};

export const UBER_HIGH_FREQUENCY_KIT: DsaSheet = {
  id: 'uber-high-frequency-kit',
  slug: 'uber-high-frequency-kit',
  title: 'Uber High-Frequency Interview Kit 🎁',
  creator: 'College Study Curated',
  description: 'Uber-specific graph, routing, sliding window, and interval scheduling interview challenges.',
  category: ['Company Wise', 'All', 'Competitive'],
  totalQuestions: 50,
  followersCount: 7320,
  isCompanyWise: true,
  featuredCompany: 'Uber',
  steps: [
    {
      id: 'uber-routing',
      title: 'Uber Graph & System Simulation Problems',
      lectures: [
        {
          id: 'ub-l1',
          title: 'Top Problems',
          problems: [
            { id: 'ub-1', title: 'Bus Routes', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/bus-routes/', companies: ['Uber', 'Google'], tags: ['BFS', 'Graph'] },
            { id: 'ub-2', title: 'Evaluate Division', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/evaluate-division/', companies: ['Uber', 'Amazon'], tags: ['DFS', 'Graph'] },
            { id: 'ub-3', title: 'Reconstruct Itinerary', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/reconstruct-itinerary/', companies: ['Uber'], tags: ['Graph'] },
            { id: 'ub-4', title: 'Sliding Window Maximum', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/sliding-window-maximum/', companies: ['Uber', 'Amazon', 'Google'], tags: ['Monotonic Queue'] },
            { id: 'ub-5', title: 'Word Search II', difficulty: 'Hard', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/word-search-ii/', companies: ['Uber', 'Microsoft'], tags: ['Trie'] },
          ],
        },
      ],
    },
  ],
};

export const META_HIGH_FREQUENCY_KIT: DsaSheet = {
  id: 'meta-facebook-kit',
  slug: 'meta-facebook-kit',
  title: 'Meta / Facebook High-Frequency Kit 🎁',
  creator: 'College Study Curated',
  description: 'Meta technical screen questions focusing on clean code, bug-free speed, and optimal time complexity.',
  category: ['Company Wise', 'All', 'Popular'],
  totalQuestions: 55,
  followersCount: 9110,
  isCompanyWise: true,
  featuredCompany: 'Meta',
  steps: [
    {
      id: 'meta-speed',
      title: 'Meta Core Coding Screen Problems',
      lectures: [
        {
          id: 'meta-l1',
          title: 'Top Problems',
          problems: [
            { id: 'meta-1', title: 'Minimum Remove to Make Valid Parentheses', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/', companies: ['Meta'], tags: ['Stack'] },
            { id: 'meta-2', title: 'Dot Product of Two Sparse Vectors', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/dot-product-of-two-sparse-vectors/', companies: ['Meta'], tags: ['Two Pointers'] },
            { id: 'meta-3', title: 'Subarray Sum Equals K', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/', companies: ['Meta', 'Google'], tags: ['Prefix Sum'] },
            { id: 'meta-4', title: 'Lowest Common Ancestor of a Binary Tree III', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/', companies: ['Meta'], tags: ['Tree'] },
            { id: 'meta-5', title: 'Buildings With an Ocean View', difficulty: 'Medium', platform: 'LeetCode', problemUrl: 'https://leetcode.com/problems/buildings-with-an-ocean-view/', companies: ['Meta'], tags: ['Monotonic Stack'] },
          ],
        },
      ],
    },
  ],
};

export const RISING_BRAIN_DSA_SHEET: DsaSheet = {
  id: 'rising-brain-sheet',
  slug: 'rising-brain-sheet',
  title: 'Rising Brain Pattern-Wise DSA Sheet',
  creator: 'Anjali Kumari (Rising Brain)',
  description: 'Pattern-first curriculum with Java-oriented solutions by Anjali Kumari. Master logic-building across 20 high-frequency pattern families from TCS to FAANG.',
  category: ['All', 'Popular', 'Complete DSA', 'Topic Specific'],
  totalQuestions: 81,
  followersCount: 14210,
  steps: RISING_BRAIN_STEPS,
};

export const NINJAS_SDE_SHEET: DsaSheet = {
  id: 'ninjas-sde-sheet',
  slug: 'ninjas-sde-sheet',
  title: "Ninja's SDE Sheet (Code360)",
  creator: 'Naukri Code360 / Coding Ninjas',
  description: "The authoritative Ninja's SDE problem list covering essential DSA questions asked in technical interviews at top-tier product companies like Amazon, Google, Microsoft, and Flipkart.",
  category: ['All', 'Popular', 'Complete DSA', 'Quick Revision'],
  totalQuestions: 131,
  followersCount: 18450,
  steps: NINJAS_SDE_STEPS,
};

export const ALL_DSA_SHEETS: DsaSheet[] = [
  NEETCODE_150_SHEET,
  STRIVER_A2Z_SHEET,
  STRIVER_SDE_SHEET,
  NINJAS_SDE_SHEET,
  RISING_BRAIN_DSA_SHEET,
  BLIND_75_SHEET,
  DSA_PATTERNS_KUSHAL_SHEET,
  GOOGLE_SDE_KIT,
  AMAZON_SDE_KIT,
  MICROSOFT_SDE_KIT,
  UBER_HIGH_FREQUENCY_KIT,
  META_HIGH_FREQUENCY_KIT,
];
