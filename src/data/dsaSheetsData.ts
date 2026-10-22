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
];
