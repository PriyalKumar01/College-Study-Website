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
];
