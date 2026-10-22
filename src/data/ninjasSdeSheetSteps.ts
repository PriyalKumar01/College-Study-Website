import { DsaStep } from '@/types/dsaSheets';

/**
 * Ninjas SDE Sheet (Naukri Code360 / Coding Ninjas)
 * Comprehensive, industry-standard interview preparation sheet with 140+ top-tier SDE problems.
 * Directly mapped to official Naukri Code360 problem challenges and LeetCode counterparts.
 */
export const NINJAS_SDE_STEPS: DsaStep[] = [
  {
    id: 'code360-step-1',
    title: 'Chapter 1: Arrays & Matrix Operations (18 Problems)',
    lectures: [
      {
        id: 'code360-l1-1',
        title: 'Core Array Manipulation & 2D Matrices',
        problems: [
          {
            id: 'c360-1',
            title: 'Set Matrix Zeros',
            difficulty: 'Medium',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/set-matrix-zeros_3846774',
            youtubeUrl: 'https://www.youtube.com/results?search_query=set+matrix+zeros+code360',
            companies: ['Amazon', 'Microsoft', 'Google'],
            tags: ['Array', 'Matrix', 'Code360'],
          },
          {
            id: 'c360-2',
            title: "Pascal's Triangle",
            difficulty: 'Easy',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/pascal-s-triangle_1089580',
            youtubeUrl: 'https://www.youtube.com/results?search_query=pascals+triangle+code360',
            companies: ['Amazon', 'Google'],
            tags: ['Array', 'Math'],
          },
];
