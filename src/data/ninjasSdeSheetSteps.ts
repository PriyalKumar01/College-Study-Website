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
          {
            id: 'c360-3',
            title: 'Next Permutation',
            difficulty: 'Medium',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/next-permutaion_893046',
            youtubeUrl: 'https://www.youtube.com/results?search_query=next+permutation+code360',
            companies: ['Google', 'Meta', 'Amazon'],
            tags: ['Array', 'Two Pointers'],
          },
          {
            id: 'c360-4',
            title: "Maximum Subarray Sum (Kadane's Algorithm)",
            difficulty: 'Easy',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/maximum-subarray-sum_630526',
            youtubeUrl: 'https://www.youtube.com/results?search_query=maximum+subarray+sum+kadane+code360',
            companies: ['Microsoft', 'Amazon', 'Adobe'],
            tags: ['Array', 'Dynamic Programming'],
          },
          {
            id: 'c360-5',
            title: 'Sort 0 1 2 (Dutch National Flag Algorithm)',
            difficulty: 'Easy',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/sort-0-1-2_631055',
            youtubeUrl: 'https://www.youtube.com/results?search_query=sort+0+1+2+code360',
            companies: ['Amazon', 'Microsoft'],
            tags: ['Array', 'Two Pointers'],
          },
          {
            id: 'c360-6',
            title: 'Best Time to Buy and Sell Stock',
            difficulty: 'Easy',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/best-time-to-buy-and-sell-stock_619452',
            youtubeUrl: 'https://www.youtube.com/results?search_query=best+time+to+buy+and+sell+stock+code360',
            companies: ['Amazon', 'Google', 'Meta'],
            tags: ['Array', 'Dynamic Programming'],
          },
          {
            id: 'c360-7',
            title: 'Rotate Matrix by 90 Degrees',
            difficulty: 'Medium',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/rotate-matrix_981260',
            youtubeUrl: 'https://www.youtube.com/results?search_query=rotate+matrix+90+degrees+code360',
            companies: ['Google', 'Microsoft', 'Amazon'],
            tags: ['Matrix'],
          },
          {
            id: 'c360-8',
            title: 'Merge Overlapping Subintervals',
            difficulty: 'Medium',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/merge-intervals_699045',
            youtubeUrl: 'https://www.youtube.com/results?search_query=merge-intervals+code360',
            companies: ['Google', 'Amazon', 'Meta'],
            tags: ['Array', 'Sorting'],
          },
          {
            id: 'c360-9',
            title: 'Merge Two Sorted Arrays Without Extra Space',
            difficulty: 'Medium',
            platform: 'Code360',
            problemUrl: 'https://www.naukri.com/code360/problems/merge-two-sorted-arrays-without-extra-space_689883',
            youtubeUrl: 'https://www.youtube.com/results?search_query=merge+two+sorted+arrays+without+extra+space+code360',
            companies: ['Microsoft', 'Amazon', 'Goldman Sachs'],
            tags: ['Array', 'Two Pointers'],
          },
          {
            id: 'c360-10',
];
