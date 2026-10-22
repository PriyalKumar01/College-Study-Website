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
];
