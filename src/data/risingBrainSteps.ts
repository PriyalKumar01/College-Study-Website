import { DsaStep } from '@/types/dsaSheets';

/**
 * Rising Brain Pattern-Wise DSA Sheet (Anjali Kumari)
 * Comprehensive pattern-first curriculum with Java-oriented problem solving.
 * Organized systematically into 20 fundamental problem-solving patterns.
 */
export const RISING_BRAIN_STEPS: DsaStep[] = [
  {
    id: 'rb-step-1',
    title: 'Pattern 1: Two Pointers (Opposite Ends & Same Direction)',
    lectures: [
      {
        id: 'rb-l1-1',
        title: 'Foundational Two-Pointer Mechanics',
        problems: [
          {
            id: 'rb-1',
            title: 'Valid Palindrome',
            difficulty: 'Easy',
            platform: 'LeetCode',
            problemUrl: 'https://leetcode.com/problems/valid-palindrome/',
            youtubeUrl: 'https://www.youtube.com/results?search_query=rising+brain+valid+palindrome+java',
            companies: ['Meta', 'Amazon', 'Microsoft'],
            tags: ['Two Pointers', 'String', 'Java'],
          },
          {
            id: 'rb-2',
            title: 'Two Sum II - Input Array Is Sorted',
            difficulty: 'Medium',
            platform: 'LeetCode',
            problemUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
            youtubeUrl: 'https://www.youtube.com/results?search_query=rising+brain+two+sum+sorted+java',
            companies: ['Amazon', 'Google'],
            tags: ['Two Pointers', 'Array'],
          },
          {
            id: 'rb-3',
            title: '3Sum',
            difficulty: 'Medium',
            platform: 'LeetCode',
            problemUrl: 'https://leetcode.com/problems/3sum/',
            youtubeUrl: 'https://www.youtube.com/results?search_query=rising+brain+3sum+java',
            companies: ['Meta', 'Amazon', 'Google'],
            tags: ['Two Pointers', 'Sorting'],
          },
          {
            id: 'rb-4',
            title: 'Container With Most Water',
            difficulty: 'Medium',
            platform: 'LeetCode',
            problemUrl: 'https://leetcode.com/problems/container-with-most-water/',
            youtubeUrl: 'https://www.youtube.com/results?search_query=rising+brain+container+with+most+water+java',
            companies: ['Google', 'Amazon', 'Apple'],
            tags: ['Two Pointers', 'Greedy'],
          },
          {
            id: 'rb-5',
            title: 'Trapping Rain Water',
            difficulty: 'Hard',
];
