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
];
