import { QuizQuestion } from './gateQuizzesData';

export const GENERAL_APTITUDE_QUIZ_DATA: Record<string, QuizQuestion[]> = {
  "Numbers": [
    {
      "id": 60001,
      "question": "<p dir=\"ltr\"><span>If the sum of two numbers is 13 and the sum of their square is 85. Find the numbers?</span></p>",
      "options": [
        "<p><span>6 &amp; 7</span></p>",
        "<p><span>5 &amp; 8</span></p>",
        "<p><span> 4 &amp; 9</span></p>",
        "<p><span>3 &amp; 10</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the numbers be x and 13-x </span><br/><span>Then x</span><sup><span>2</span></sup><span> + (13 \u2013 x)</span><sup><span>2</span></sup><span> = 85 </span><br/><span>\u2234 x</span><sup><span>2</span></sup><span> + 169 + x</span><sup><span>2</span></sup><span> \u2013 26x = 85 </span><br/><span>\u2234 2 x</span><sup><span>2</span></sup><span> \u2013 26x + 84 = 0 </span><br/><span>\u2234 x</span><sup><span>2</span></sup><span> \u2013 13x + 42 = 0 </span><br/><span>\u2234 (x-6)(x-7) = 0 Hence numbers are 6 &amp; 7.</span></p><p dir=\"ltr\"><span>Alternate Method:</span></p><p dir=\"ltr\"><span>The last digit of the sum of the last digit of the squares of options should be 5 to be a correct option.(Given sum of squares is 85).</span><br/><span>let's check, </span><br/><span>last digit of squares  of 6 and 7 is 6 and 9 respectively, on adding 6+7 = 15(last digit is 5)</span><br/><span>last digit of squares  of 5 and 8 is 5 and 4 respectively, on adding 5+4 = 9(last digit is 9)</span><br/><span>last digit of squares  of 4 and 9 is 6 and 1 respectively, on adding 6+1 = 7(last digit is 7)</span><br/><span>last digit of squares  of 3 and 10 is 9 and 0 respectively, on adding 9+0 = 9(last digit is 9).</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60002,
      "question": "<p>The difference between a two-digit number and the number obtained by interchanging the positions of its digits is 36. What is the difference between the two digits of that number?</p>",
      "options": [
        "<p>4</p>",
        "<p>5</p>",
        "<p>6</p>",
        "<p>None of these</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Let the ten\u2019s digit be x and the unit\u2019s digit be y<br>Then (10x + y) \u2013 (10y + x) = 36<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;9(x \u2013 y) = 36<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;x \u2013 y = 4</p><p>Hence Option (A) is correct.</p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60003,
      "question": "<p dir=\"ltr\"><span>A two-digit number is such that the product of the digits is 12. When 9 is subtracted from the number, the digits are reversed. The number is:</span></p>",
      "options": [
        "<p><span>34</span></p>",
        "<p><span>62</span></p>",
        "<p><span>43</span></p>",
        "<p><span>26</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the tens digit of the number be a and the ones digit be b. </span></p><p dir=\"ltr\"><span>Given:</span><br/><span>ab = 12 ................(i) and,</span><br/><span>(10a + b) - (10b + a) = 9</span><br/><span>10a + b - 10b - a = 9</span><br/><span>9a - 9b = 9</span><br/><span>9(a-b) = 9</span><br/><span>(a-b) = 1 .................(ii)</span></p><p dir=\"ltr\"><span>  Factors of 12 = 1, 2, 3, 4, 6, 12. and from equation (ii), (a - b) = 1 So, a = 4 &amp; b = 3. Required number = ab = 43.</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60004,
      "question": "<p dir=\"ltr\"><span>Find a positive number which when increased by 16 is equal to 80 times the reciprocal of the number</span></p>",
      "options": [
        "<p><span>20</span></p>",
        "<p><span>-4</span></p>",
        "<p><span>-10</span></p>",
        "<p><span>4</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the number be x.</span><br/><span>Then x + 16 = 80 * (1/x)</span><br/><span>x</span><sup><span>2</span></sup><span> + 16x \u2013 80 = 0</span><br/><span>x</span><sup><span>2</span></sup><span> + 20x \u2013 4x \u2013 80 =0</span><br/><span>(x + 20) (x -4)</span><br/><span>Therefore x = 4</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60005,
      "question": "<p dir=\"ltr\"><span>What is the sum of two consecutive odd numbers, the difference of whose squares is 56?</span></p>",
      "options": [
        "<p><span>30</span></p>",
        "<p><span>28</span></p>",
        "<p><span>34</span></p>",
        "<p><span>32</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the no. be x and (x +2).</span><br/><span>Then (x + 2)</span><sup><span>2</span></sup><span> \u2013 x</span><sup><span>2</span></sup><span> = 56</span><br/><span>4x + 4 = 56</span><br/><span>x + 1 = 14</span><br/><span>x = 13 also (x+2)=15</span><br/><span>Sum of numbers = 13+15 = 28</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60006,
      "question": "<p dir=\"ltr\"><span>The product of two numbers is 108 and the sum of their squares is 225. The difference of the number is:</span></p>",
      "options": [
        "<p><span>5</span></p>",
        "<p><span>4</span></p>",
        "<p><span>3</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the numbers be x and y.</span><br/><span>Then xy = 108 and x</span><sup><span>2</span></sup><span> + y</span><sup><span>2</span></sup><span> = 225</span><br/><span>(x \u2013y)</span><sup><span>2</span></sup><span> = x</span><sup><span>2</span></sup><span> + y</span><sup><span>2</span></sup><span> \u2013 2xy</span><br/><span>(x \u2013y)</span><sup><span>2</span></sup><span> = 225 \u2013 216</span><br/><span>(x \u2013y)</span><sup><span>2</span></sup><span> = 9</span><br/><span>Therefore (x \u2013y) = 3</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60007,
      "question": "<p dir=\"ltr\"><span>What is the sum of the first 50 natural numbers? </span></p>",
      "options": [
        "<p><span>1325</span></p>",
        "<p><span>1225</span></p>",
        "<p><span>1275</span></p>",
        "<p><span>1270</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sum of the first n natural numbers is given by the formula:</span></p><p dir=\"ltr\">[Tex]S = \\frac{n(n + 1)}{2}[/Tex]</p><p dir=\"ltr\"><span>For n = 50:</span></p><p dir=\"ltr\">[Tex]S = \\frac{50(51)}{2} = 1275[/Tex]</p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60008,
      "question": "<p dir=\"ltr\"><span>What is the unit's digit in the product (267)</span><sup><span>153  </span></sup><span>x (66666)</span><sup><span>72</span></sup><span> ?</span></p>",
      "options": [
        "<p><span>7</span></p>",
        "<p><span>6</span></p>",
        "<p><span>1</span></p>",
        "<p><span>2</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have to find the unit digit only. </span></p><p dir=\"ltr\"><span>In 267 unit digit is 7 and cyclicity of 7 is 4.</span><br><span>So, (267)</span><sup><span>153</span></sup><span> can be written as (267)</span><sup><span>Rem(153)/4</span></sup><span> = (267)</span><sup><span>1</span></sup><span> </span><br><span>Unit digit of (267)</span><sup><span>1</span></sup><span> = 7.</span><br><span>similarly for 66666 unit digit is 6 and cyclicity for 6 is 1.</span><br><span>Unit digit for (66666)</span><sup><span>72</span></sup><span> = 6.</span></p><p dir=\"ltr\"><span>Resultant is 7 \u00d7 6 = 42</span><br><br><span>Therefore , Unit digit is 2.</span><br></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60009,
      "question": "<p dir=\"ltr\"><span>What is the total number of prime factors in the expression 12</span><sup><span>12</span></sup><span> x 16</span><sup><span>16</span></sup><span> x 18</span><sup><span>18</span></sup><span> ?</span></p>",
      "options": [
        "<p><span>46</span></p>",
        "<p><span>154</span></p>",
        "<p><span>3456</span></p>",
        "<p><span>2</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>12</span><sup><span>12</span></sup><span> = (2 x 2 x 3)</span><sup><span>12</span></sup><span> = 2</span><sup><span>24</span></sup><span> x 3</span><sup><span>12</span></sup><span> </span><br><span>16</span><sup><span>16</span></sup><span> = (2 x 2 x 2 x 2)</span><sup><span>16</span></sup><span> = 2</span><sup><span>64</span></sup><span> </span><br><span>18</span><sup><span>18</span></sup><span> = (2 x 3 x 3)</span><sup><span>18</span></sup><span> = 2</span><sup><span>18</span></sup><span> x 3</span><sup><span>36</span></sup><span> &nbsp; </span><br><span>Therefore, total number of prime factors = 24 + 12 + 64 + 18 + 36 = 154</span></p><p dir=\"ltr\"><span>Alternate method,</span></p><p dir=\"ltr\"><span>Total number of prime factors of 12 is 3 so, total number of prime factors of 12</span><sup><span>12</span></sup><span> is (3 x 12) 36.</span><br><span>Total Number of prime factors of 16 is 4 so, total number of prime factors of 16</span><sup><span>16</span></sup><span> is (4 x 16) 64.</span><br><span>Total Number of prime factors of 18 is 3 so, total number of prime factors of 18</span><sup><span>18</span></sup><span> is (3 x 18) 54.</span><br><span>Therefore, total number of prime factors = 36+64+54 = 154</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60010,
      "question": "What should be assigned to # so that 2582#724 is divisible by 11 ?",
      "options": [
        "4",
        "5",
        "6",
        "7"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "For a number to be divisible by 11, the difference of the sum of numbers at even and odd places should be either 0 or a multiple of 11.\r\nWe assume the leftmost digit at position 1.\r\nSo, Sum of numbers at even places = 5 + 2 + 7 + 4 = 18\r\nSum of numbers at odd places = 2 + 8 + # + 2 = 12 + #\r\n&nbsp;\r\nNow, to make the number divisible by 11, we equate the sums obtained in the above step.\r\n18 = 12 + #\r\n=> # = 6\r\nTherefore, C (6) is the correct choice.",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60011,
      "question": "<p>You are given the largest number of 5-digit, you have to subtract x from this number so that the number is divisible by 23. Find the smallest possible value of x.</p>",
      "options": [
        "<p>22</p>",
        "<p>20</p>",
        "<p>18</p>",
        "<p>16</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>99999 is the greatest five digit number.</p><pre>On dividing 99999 by 23 we get a remainder of 18.\nIt means 18 must be subtracted from 99999 to find greatest 5 digit number divisible  by 23.</pre>\n<p>Thus, C (18) is the correct choice.</p>\n\n",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60012,
      "question": "<p dir=\"ltr\"><span>A number leaves remainders 1, 4 and 7 on being divided successively by 3, 5 and 8 respectively. What is the product of the remainders when the order of divisors is reversed ?</span></p>",
      "options": [
        "<p><span>28</span></p>",
        "<p><span>48</span></p>",
        "<p><span>24</span></p>",
        "<p><span>36</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let us assume the number be N, </span></p><p dir=\"ltr\"><span>Then the number( N ) when divided by 3 leaves remainder of 1 </span><br><span>As, N = 3P + 1</span></p><p dir=\"ltr\"><span>Further when P is divided by 5 leaves a remainder of 4</span><br><span>As, P = 5Q + 4</span></p><p dir=\"ltr\"><span>Lastly when Q is divided by 8 leaves remainder of 7</span><br><span>As, Q = 8R + 7</span></p><p dir=\"ltr\"><span>Combining the above equations we get, </span><br><span>N = 3(5(8R + 7) + 4 ) +1</span><br><span>N = 120R + 118 </span></p><p dir=\"ltr\"><span>after reversing the order of the divisors</span></p><p dir=\"ltr\"><span>N divided by 8 leaves remainder of 6 as, </span><br><span>N = 8(15Q + 14) + 6</span></p><p dir=\"ltr\"><span>then (15Q + 14) divided by 5 leaves remainder of 4 as, </span><br><span>15Q + 14 = 5( 3R + 2) + 4</span></p><p dir=\"ltr\"><span>lastly 3R + 2 divided by 3 clearly leaves remainder of 2   </span></p><p dir=\"ltr\"><span>multiplying the remainder together we get, </span><br><span>6 x 4&nbsp;x 2 = 48</span></p><p dir=\"ltr\"><span>So, the product of the remainders when the order of divisors is reversed is 48 </span></p><p><br></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60013,
      "question": " What is the smallest number which when divided by 6, 9, 11, 16 and 22 leaves remainder 3 in each case ?",
      "options": [
        "3267",
        "1584",
        "1587",
        "9504"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "LCM (6,9,11,16,22) = 1584\r\nThe required number =  1584 + 3 = 1587",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60014,
      "question": "<p dir=\"ltr\"><span>Which of the following is the largest of all ? (i) 7/8 (ii) 15/16 (iii) 23/24 (iv) 31/32</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>(i)</span></p>",
        "<p dir=\"ltr\"><span>(ii)</span></p>",
        "<p dir=\"ltr\"><span>(iii)</span></p>",
        "<p dir=\"ltr\"><span>(iv)</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>LCM (8, 16, 24, 32) = 96 </span><br><span>7/8 = 84/96 </span><br><span>15/16 = 90/96 </span><br><span>23/24 = 92/96 </span><br><span>31/32 = 93/96 </span><br><span>Hence, 31/32 is the largest of all.</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60015,
      "question": "<p dir=\"ltr\"><span>Which is the largest number that divides 17, 23, 35, 59 to leave the same remainder in each case ?</span></p>",
      "options": [
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>6</span></p>",
        "<p><span>12</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The number which divides the differences between the numbers evenly, ensuring that the remainder left by dividing each number (17, 23, 35, 59) is the same</span></p><p dir=\"ltr\"><span>Required Number = HCF (23-17, 35-23, 59-35, 59-17) </span><br><span>Required Number = HCF (6, 12, 24, 42) = 6.</span></p>",
      "tag": "Numbers || MCQ"
    },
    {
      "id": 60016,
      "question": "<p dir=\"ltr\"><span>Find the values of a, b, c, and d in the below expression</span><br><span>(2</span><sup><span>a</span></sup><span>) x (3</span><sup><span>b</span></sup><span>) x (5</span><sup><span>c</span></sup><span>) x (11</span><sup><span>d</span></sup><span>) = 720</span></p>",
      "options": [
        "<p><span>2,4,1,0</span></p>",
        "<p><span>4,2,1,0</span></p>",
        "<p><span>4,2,1,1</span></p>",
        "<p><span>3,2,2,1</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Prime factorization of 720 is (2</span><sup><span>4</span></sup><span> x 3</span><sup><span>2</span></sup><span> x 5</span><sup><span>1</span></sup><span>).  We can write it as (2</span><sup><span>4</span></sup><span> x 3</span><sup><span>2 </span></sup><span>x 5</span><sup><span>1</span></sup><span> x 11</span><sup><span>0</span></sup><span>)</span><br><span>So the values of a, b, c and d are 4, 2, 1 and 0 respectively.</span></p>",
      "tag": "Numbers || MCQ"
    }
  ],
  "LCM and HCF": [
    {
      "id": 60017,
      "question": "<p dir=\"ltr\"><span>Two numbers are in the ratio of 5:7. If their LCM is 105, what is the difference between their squares ?</span></p>",
      "options": [
        "<p><span>216</span></p>",
        "<p><span>210</span></p>",
        "<p><span>72</span></p>",
        "<p><span>840</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let 'h' be the HCF of the two numbers.</span><br><span>The numbers are 5h and 7h. </span><br><span>We know that Product of Numbers = LCM x HCF =&gt; 5h x 7h = 105 x h =&gt; h = 3</span><br><span>So, the numbers are 15 and 21. Therefore, difference of their squares = 441 - 225 = 216</span></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60018,
      "question": "<p dir=\"ltr\"><span>The LCM of two numbers is 30, and their HCF is 15. If one of the numbers is 30, what is the other?</span></p>",
      "options": [
        "<p><span>30</span></p>",
        "<p><span>10</span></p>",
        "<p><span>15</span></p>",
        "<p><span>20</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say another number =y  </span><br><span>Product of two numbers = Product of HCF and LCM  </span><br><span>y \u2715 30 = 15 \u2715 30, so  y=15 is the required answer.</span></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60019,
      "question": "<p dir=\"ltr\"><span>A, B and C start at the same time in the same direction to run around a circular track. A completes a round in 252 seconds, B in 308 seconds and C in 198 seconds, all starting at the same point. When will they meet again at the starting point?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>26 minutes 18 seconds </span></p>",
        "<p dir=\"ltr\"><span>42 minutes 36 seconds </span></p>",
        "<p dir=\"ltr\"><span>45 minutes </span></p>",
        "<p dir=\"ltr\"><span>46 minutes 12 seconds </span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>LCM of 252, 308 and 198 = 2772. </span><br><span>Therefore, they will meet at the starting point again after 2772 seconds = 46 minutes and 12 seconds.</span></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60020,
      "question": "<p dir=\"ltr\"><span>What is the least number which when divided by 4, 5, 6 and 7 leaves a remainder 3, but when divided by 9 leaves no remainder?</span></p>",
      "options": [
        "<p><span>1683</span></p>",
        "<p><span>417</span></p>",
        "<p><span>843</span></p>",
        "<p><span>423</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>LCM of 4,5,6,7 is 420</span><br><span>we know that common multiple of 4,5,6,7 is in the form of 420y (where y is any natural number)</span><br><span>(420y+3) should be divisible by 9&nbsp;</span><br><span>if y =1, 423/9, remainder=0</span><br><span>When 423 is divided by 4, 5, 6, 7, it gives remainder 3 and when divided by 9 leaves a remainder 0.</span><br><span>So, the least number which when divided by 4, 5, 6 and 7 leaves a remainder 3, but when divided by 9 leaves no remainder is 423</span></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60021,
      "question": "<p dir=\"ltr\"><span>Ravi got six alarm clocks which he set to alarm at intervals of 8, 4, 6, 2, 12, and 10 seconds respectively. Now Ravi wonders how many times they alarm together in 30 minutes.</span></p>",
      "options": [
        "<p><span>16</span></p>",
        "<p><span>10</span></p>",
        "<p><span>20</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>LCM of 2,4,6,8,10 and 12 is 120.&nbsp;</span><br><span>So, the bells will toll together after every 120 seconds.&nbsp;</span><br><span>In 30 minutes, they will toll together [30/2] + 1 (they started to toll together) = 16 Times</span></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60022,
      "question": "<p dir=\"ltr\"><span>The product of two number is 4107. If the HCF of these numbers is 37, then the greater number is:</span></p>",
      "options": [
        "<p><span>101</span></p>",
        "<p><span>107</span></p>",
        "<p><span>111</span></p>",
        "<p><span>185</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the required numbers be 37x and 37y. </span><br><span>Then, 37x * 37y = 4107 </span><br><span>So, x * y = 4107/(37*37) = 3. </span><br><span>Co-primes with product 3 are (1,3). </span><br><span>Therefore, the greater number = 3 * 37 = 111.   </span></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60023,
      "question": "<p dir=\"ltr\"><span>The sum of two numbers is 528 and their HCF is 33. The number of pairs of numbers satisfying the above condition is:</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>6</span></p>",
        "<p><span>3</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the required numbers be 33x and 33y. </span><br><span>Then,  33x + 33y = 528 </span><br><span>33(x+y)=528.</span><br><span>But, 528 = 2 \u2715 2 \u2715 2 \u2715 2 \u2715 3 \u2715 11. </span><br><span>33(x+y)= 528= 16 \u2715 33</span><br><span>So, x + y = 16 </span><br><span>Co-primes with the sum 16 are: (1, 15), (3, 13), (5, 11) and (7, 9). </span><br><span>Hence, 4 is the required answer.</span></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60024,
      "question": "Calculate the HCF of 1.08, 0.36 and 0.9.",
      "options": [
        "0.03",
        "0.9",
        "0.18",
        "0.108"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "Let's rewrite the numbers as 108/100, 36/100 and 90/100. Now,\r\nHCF of 108, 36 and 90 is 18. Therefore, 18/100 = 0.18 is our answer.",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60025,
      "question": "<p dir=\"ltr\"><span>Two numbers are in the ratio 3 : 5. If their L.C.M. is 75. what is sum of the numbers?</span></p>",
      "options": [
        "<p><span>40</span></p>",
        "<p><span>25</span></p>",
        "<p><span>20</span></p>",
        "<p><span>50</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>1st number = 3x</span><br><span>2nd number =5x</span><br><br><span>LCM of 3x and 5x is 15x</span><br><span>=&gt; 15x = 75</span><br><span>=&gt; x = 5</span><br><br><span>sum = 15+25 =40</span><br></p>",
      "tag": "LCM and HCF || MCQ"
    },
    {
      "id": 60026,
      "question": "When a number is divided by 15, 20 or 35 it leaves a common remainder of 8. Find the smallest such number.",
      "options": [
        "420",
        "428",
        "210",
        "216"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "Smallest number = LCM of (15,20,35) + 8\r\n= 420 + 8\r\n = 428",
      "tag": "LCM and HCF || MCQ"
    }
  ],
  "Ratio, Proportion": [
    {
      "id": 60027,
      "question": "<p dir=\"ltr\"><span>In a party, 60% of the invited guests are male and 40% are female. If 80% of the invited guests attended the party and if all the invited female guests attended, what would be the ratio of males to females among the attendees in the party? </span></p>",
      "options": [
        "<p><span>2:3</span></p>",
        "<p><span>1:1</span></p>",
        "<p><span>3:2</span></p>",
        "<p><span>2:1</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let total males and females be 60x and 40x respectively.</span><br/><span>Total number of people = (60x + 40x)</span><br/><span>Total number of people who attended : </span><br/><span>0.8(60x + 40x) = 80x</span><br/><span>Let y males attended. It is given all females attended </span><br/><span>40x + y = 80x</span><br/><span>y = 40x which is same as females.</span><br/><br/><span>Alternative Approach - </span><br/><br/><span>Lets total number of people = 100. </span><br/><span>Therefore, 60 are male and and 40 are female.  </span><br/><span>But total 80 guests are attended and all 40 female attended the party. </span><br/><span>So, there remaining (80 - 40 = 40) attendees should be male.   </span><br/><span>Then the ration of male to female among attendees is 40 : 40 = 1 : 1.  </span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60028,
      "question": "<p dir=\"ltr\"><span>In appreciation of social improvement completed in a town, a wealthy philanthropist decided to give gift of Rs. 750 to each male senior citizen and Rs. 1000 for female senior citizens. There are total 300 citizens and the 8/9</span><sup><span>th</span></sup><span> of total men and 2/3</span><sup><span>rd</span></sup><span> of total women claimed the gift. What is amount of money philanthropist paid?</span></p>",
      "options": [
        "<p><span>15000</span></p>",
        "<p><span>200000</span></p>",
        "<p><span>115000</span></p>",
        "<p><span>151000</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let there be M total men and F total women.</span><br><span>M + F = 300</span><br><span>Total amount paid = (M \u00d7 8/9) \u00d7 750 + (2/3 \u00d7 F ) \u00d7 1000</span><br><span>Total amount paid  = (6000/9) M + (2000/3) F</span><br><span>Total amount paid = (2000/3) M + (2000/3)  F </span><br><span>Total amount paid = (2000/3) (M + F)  =  (2000/3) (300)</span><br><span>Total amount paid = 200000</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60029,
      "question": "<img height=\"345\" loading=\"auto\" src=\"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210302140547/1423.png\" width=\"576\"/><p dir=\"ltr\"><span>The number of units of a product sold in three different years and the respective net profits are presented in the figure above. The cost/unit in Year 3 was Re. 1, which was half the cost/unit in Year 2. The cost/unit in Year 3 was one-third of the cost/unit in Year 1. Taxes were paid on the selling price at 10%, 13%, and 15% respectively for the three years. Net profit is calculated as the difference between the selling price and the sum of cost and taxes paid in that year.  The ratio of the selling price in Year 2 to the selling price in Year 3 is _________. </span><b><strong>[GATE 2021 || Set-2 || 2 Marks || MCQ]</strong></b></p>",
      "options": [
        "<p><span>4:3</span></p>",
        "<p><span>1:1</span></p>",
        "<p><span>3:4</span></p>",
        "<p><span>1:2</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>From the above graph we obtained following information-\u00a0</span></p><table><thead><tr><th><p dir=\"ltr\"><span>Year</span></p></th><th><p dir=\"ltr\"><span>Cost/Unit</span></p></th><th><p dir=\"ltr\"><span>Cost Price </span></p></th><th><p dir=\"ltr\"><span>No. Of Units</span></p></th></tr></thead><tbody><tr><th><p><span>1</span></p></th><td><p><span>3</span></p></td><td><p><span>300</span></p></td><td><p><span>100</span></p></td></tr><tr><th><p><span>2</span></p></th><td><p><span>2</span></p></td><td><p><span>400</span></p></td><td><p><span>200</span></p></td></tr><tr><th><p><span>3</span></p></th><td><p><span>1</span></p></td><td><p><span>300</span></p></td><td><p><span>300</span></p></td></tr></tbody></table><p dir=\"ltr\"><span>Let selling price of year 2 = SP2 and Selling price of year3 = SP3</span></p><p dir=\"ltr\"><span>Given that-</span><br/><span>Taxes for year 2 = 13% of SP2 = 0.13SP2</span><br/><span>Taxes for year 3 = 15% of SP3 = 0.15SP3</span><br/><span>Cost per unit of year 3 = 1</span><br/><span>(Cost per unit of year 2)/2 = 1</span><br/><span>So now Cost / unit of year 2 = 2\u00d71 = 2</span></p><p dir=\"ltr\"><span>Net profit formula now = Selling Price - (Cost Price + (Tax% \u00d7 selling price )</span></p><p dir=\"ltr\"><span>For year 2</span><br/><span>=&gt; 296 = SP2- (200\u00d72 + 0.13\u00d7SP2) </span></p><p dir=\"ltr\"><span>=&gt; SP2 = 696\u00d7100/87 SP2 = 800</span></p><p dir=\"ltr\"><span>For year 3</span><br/><span>=&gt; 210 = SP3 - (300\u00d71+0.15\u00d7SP3) </span></p><p dir=\"ltr\"><span>=&gt; SP3 = 510\u00d7100/85 SP3 = 600</span></p><p dir=\"ltr\"><span>Required Ratio 800/600= 4/3 (Correct Option A)</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60030,
      "question": "<figure class=\"image\"><img alt=\"TABLE\" height=\"200\" loading=\"auto\" src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241111160138080107/TABLE.webp\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241111160138080107/TABLE.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241111160138080107/TABLE-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241111160138080107/TABLE-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241111160138080107/TABLE-300.webp 300w\" width=\"400\"/><figcaption> </figcaption></figure><p dir=\"ltr\"><span>Details of prices of two items P and Q are presented in the above table. The ratio of cost of item P to cost of item Q is 3:4. Discount is calculated as the difference between the marked price and the selling price. The profit percentage is calculated as the ratio of the difference between selling price and cost, to the cost. Discount is being offered to the products and new labels are used with marked price that represent the final price after discount. ( Marked Price = Normal Selling Price - Discount ) </span></p><pre><span>Profit% = ((Selling price \u2013 Cost)/Cost)\u00d7100 </span></pre><p dir=\"ltr\"><span>  The discount on item Q, as a percentage of its marked price, is _______ .</span></p>",
      "options": [
        "<p><span>25</span></p>",
        "<p><span>12.5</span></p>",
        "<p><span>10</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given, ratio of cost of item P to cost of item Q is 3 : 4</span></p><p dir=\"ltr\"><span>So,</span><br/><span>Cost</span><sub><span>P</span></sub><span> / Cost</span><sub><span>Q</span></sub><span> = 3 / 4</span><br/><span>5400 / Cost</span><sub><span>Q</span></sub><span> = 3 / 4</span></p><p dir=\"ltr\"><span>=&gt; Cost</span><sub><span>Q</span></sub><span> = 7200</span></p><p dir=\"ltr\"><span>According to question, Profit % = 25%</span></p><p dir=\"ltr\"><span>So, Selling Price (SP) of Q:</span><br/><span>SP = 7200 + 25% of 7200</span><br/><span>   = 7200 + 1800</span><br/><span>   = 9000</span></p><p dir=\"ltr\"><span>Now, from the table:</span></p><p dir=\"ltr\"><span>Marked Price (MP) = 8000</span><br/><span>Discount = SP \u2212 MP</span><br/><span>        = 9000 \u2212 8000</span><br/><span>         = 1000</span></p><p dir=\"ltr\"><span>Discount % = (Discount / Marked Price) \u00d7 100</span><br/><span>           = (1000 / 8000) \u00d7 100</span><br/><span>           = 12.5%</span></p><p dir=\"ltr\"><span>Hence, Discount = 12.5%</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60031,
      "question": "<p dir=\"ltr\"><span>The present ages of A, B and C are in proportions 4:5:9. Nine years ago, sum of their ages was 45 years. Find their present ages in years </span></p>",
      "options": [
        "<p><span>15,20,35</span></p>",
        "<p><span>20,24,36</span></p>",
        "<p><span>20,25,45</span></p>",
        "<p><span>16,20,36</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the current ages of A, B and C be ax years, 5x years and 9x respectively. </span><br><span>Then (4x-9) + (5x-9) + (9x-9) =45</span><br><span>18x \u2013 27 = 45</span><br><span>18x = 72</span><br><span>x = 4</span><br><span>Present ages of A, B and C are 4x = 16, 5x = 20, 9x = 36 respectively.  </span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60032,
      "question": "<p dir=\"ltr\"><span>At present, the ratio between ages of Ram and Shyam is 6:5 respectively. After 7 years, Shyam\u2019s age will be 32 years. What is the present age of Ram?</span></p>",
      "options": [
        "<p><span>32</span></p>",
        "<p><span>40</span></p>",
        "<p><span>30</span></p>",
        "<p><span>36</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the present age of Ram and Shyam be 6x years and 5x years respectively.</span><br><span>Then 5x + 7 = 32</span><br><span>5x = 25</span><br><span>x = 5</span><br><span>Present age of Ram = 6x = 30 years</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60033,
      "question": "<p dir=\"ltr\"><span>Present age of Vinod and Ashok are in ratio of 3:4 respectively. After 5 years, the ratio of their ages becomes 7:9 respectively. What is Ashok\u2019s present age is ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>40 years</span></p>",
        "<p dir=\"ltr\"><span>28 years</span></p>",
        "<p dir=\"ltr\"><span>32 years</span></p>",
        "<p dir=\"ltr\"><span>36 years</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the present age of Vinod and Ashok be 3x years and 4x years respectively. </span><br><span>Then (3x+5) / (4x+5)  = 7 / 9 </span><br><span>9(3x + 5) = 7(4x + 5)</span><br><span>27x + 45 = 28x + 35</span><br><span>x = 10</span><br><span>Ashok\u2019s present age = 4x = 40 years </span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60034,
      "question": "<p dir=\"ltr\"><span> Two numbers are in the ratio of 2:9. If their H. C. F. is 19, numbers are:</span></p>",
      "options": [
        "<p><span>171, 38</span></p>",
        "<p><span> 38,151</span></p>",
        "<p><span>38, 171</span></p>",
        "<p><span>38,161</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the numbers be 2X and 9X</span><br><span>Then their H.C.F. is X, so X = 19</span><br><span>\u2234 Numbers are (2x19 and 9x19) i.e. 38 and 171</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60035,
      "question": "<p dir=\"ltr\"><span>Felix and Adam win Rs 1210 together. 4/15 of Felix's share is same as 2/5 of Adam's share. How much did Adam win?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 484</span></p>",
        "<p dir=\"ltr\"><span>Rs 330</span></p>",
        "<p dir=\"ltr\"><span>Rs 360</span></p>",
        "<p dir=\"ltr\"><span>Data inadequate</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let Felix's and Adam's share be F and A respectively. </span><br><span>Then, 4/15 \u00d7 F = 2/5 \u00d7 A  </span><br><span>20 F = 30 A </span><br><span>F/A = 3/2  </span><br><span>F:A = 3:2. </span><br><span>Therefore, Adam won = 2/5 of Rs 1210 = Rs 484.</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60036,
      "question": "<p dir=\"ltr\"><span>In a box, there are 10p, 25p and 50p coins in the ratio 4:9:5 with the total sum of Rs 206. How many coins of each kind does the box have?</span></p>",
      "options": [
        "<p><span>200, 360, 160</span></p>",
        "<p><span>135, 250, 150</span></p>",
        "<p><span>90, 60, 110</span></p>",
        "<p dir=\"ltr\"><span>Cannot be determined</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the number of 10p, 25p, 50p coins be 4x, 9x, 5x respectively. </span><br><span>Then, 4x \u2a2f 10 + 9x \u2a2f 25 + 5x \u2a2f 50 = 206   \u2a2f 100 ( Converting all values in Paise)   </span><br><span>4x/10 + 9x/4 + 5x/2 = 206</span><br><span>8x + 45x + 50x = 4120 (Multiplying both sides by 20 which is the LCM of 10, 4, 2)  </span><br><span>103x = 4120   </span><br><span>x = 40. </span><br><span>Therefore, No. of 10p coins = 4 x 40 = 160 (= Rs 16) </span><br><span>No. of 25p coins = 9 x 40 = 360 (= Rs 90) </span><br><span>No. of 50p coins = 5 x 40 = 200 (= Rs 100). </span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60037,
      "question": "<p dir=\"ltr\"><span>The ratio of the speed of two trains is 7:8. If the second train covers 400 km in 4 h, find out the speed of the first train.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>69.4 km/h</span></p>",
        "<p dir=\"ltr\"><span>78.6 km/h</span></p>",
        "<p dir=\"ltr\"><span>87.5 km/h</span></p>",
        "<p dir=\"ltr\"><span>40.5 km/h</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the speed of the two trains be 7x and 8x. </span><br><span>Then, 8x = 400 / 4 </span><br><span>8x = 100 \u21d2 x = 12.5 km/h. </span><br><span>Hence, speed of the first train = 7x = 7 \u00d7 12.5 = 87.5 km/h.</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60038,
      "question": "<p dir=\"ltr\"><span>Syrup and Water are mixed in 2:1 ratio to form 60 litres of a mixture. How much water needs to be added to make the ratio 1:2?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>60 litres</span></p>",
        "<p dir=\"ltr\"><span>85 litres</span></p>",
        "<p dir=\"ltr\"><span>55 litres</span></p>",
        "<p dir=\"ltr\"><span>Cannot be determined</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of Syrup in the mixture = 60 \u00d7 2/3 = 40 litres. </span><br><span>Volume of Water in the mixture = 60 \u00d7 1/3 = 20 litres </span><br><span>Let the required volume of water be x litres. </span><br><span>Then, 40:(20+x) = 1:2  </span><br><span>20+x = 80 \u21d2 x = 60 litres.</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60039,
      "question": "<p dir=\"ltr\"><span>If (x:y) = 2:1, then (x\u00b2-y\u00b2):(x\u00b2+y\u00b2) = __ ?</span></p>",
      "options": [
        "<p><span>1:2</span></p>",
        "<p><span>3:5</span></p>",
        "<p><span>2:1</span></p>",
        "<p><span>5:4</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given, x:y = 2:1 \u21d2 x\u00b2:y\u00b2 = 4:1. </span><br><span>Then, (x\u00b2+y\u00b2):(x\u00b2-y\u00b2) = (4+1)/(4-1) [by applying Componendo &amp; Dividendo]. </span><br><span>(x\u00b2-y\u00b2):(x\u00b2+y\u00b2) = 3/5.</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60040,
      "question": "<p dir=\"ltr\"><span>A certain amount of money is distributed between Alfred, Adam, Harry and Leo in the proportion of 5:2:4:3. Harry's share is Rs 1000 more than Leo's share. How much money does Adam get?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 800</span></p>",
        "<p dir=\"ltr\"><span>Rs 1000</span></p>",
        "<p dir=\"ltr\"><span>Rs 1050</span></p>",
        "<p dir=\"ltr\"><span>Rs 2000</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the shares of Alfred, Adam, Harry and Leo be Rs 5x, Rs 2x, Rs 4x and Rs 3x respectively. </span><br><span>Then, 4x - 3x = 1000 \u21d2 x = 1000. </span><br><span>Therefore, Adam gets = Rs 2x = Rs 2000.</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60041,
      "question": "<p dir=\"ltr\"><span>If the ages of Jacob, Max and Samuel are in the proportion 3:5:7 and the average of their ages is 25 years, then find the age of the youngest person.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>15 years</span></p>",
        "<p dir=\"ltr\"><span>10 years</span></p>",
        "<p dir=\"ltr\"><span>7 years</span></p>",
        "<p dir=\"ltr\"><span>18 years</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let their ages be 3a, 5a and 7a. </span><br><span>Then, (3a + 5a + 7a) / 3 = 25  </span><br><span>15a/3 = 25 =&gt; 5a = 25  </span><br><span>a = 5. </span><br><span>Therefore, age of the youngest person = 3a = 15 years.</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60042,
      "question": "<p dir=\"ltr\"><span>There is 16 liters of a mixture containing milk and water in the ratio 5:3. If 4 liters of water is added and 4 liters of milk is extracted from the mixture, then the ratio of the mixture will be:</span></p>",
      "options": [
        "<p><span>7:3</span></p>",
        "<p><span>5:6</span></p>",
        "<p><span>2:3</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Amount of Milk in 16 litres of mixture: (5/8) x 16 = 10 litres </span><br><span>Amount of Water in 16 litres of mixture: 16-10 = 6 litres </span><br><span>If we add 4 litres of water and extract 4 litres of milk, </span><br><span>the total volume remains the same. </span><br><span>Amount of Milk in 16 litres of new mixture:  = 10 - 4 = 6 litres</span><br><span>Amount of Water in 16 litres of new mixture:  = 6 + 4 = 10 litres </span><br><span>So, the new ratio becomes 3:5.</span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60043,
      "question": "<p dir=\"ltr\"><span>In a library, the ratio of the books on Computer, Physics and Mathematics is 5:7:8. If the collection of books is increased respectively by 40%, 50% and 75%, find out the new ratio:</span></p>",
      "options": [
        "<p><span>3:9:5</span></p>",
        "<p><span>7:5:3</span></p>",
        "<p><span>2:3:4</span></p>",
        "<p><span>2:5:4</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Old ratio = 5:7:8 </span></p><p dir=\"ltr\"><span>40% increase in 5 = 5\u00d7140/100 = 7 </span><br><span>50% increase in 7 = 7\u00d7150/100 = 10.5</span><br><span>75% increase in 8 = 8\u00d7175/100 = 14</span></p><p dir=\"ltr\"><span>New ratio = 7 : 10.5 : 14 = 2 : 3 : 4. </span></p>",
      "tag": "Ratio, Proportion || MCQ"
    },
    {
      "id": 60044,
      "question": "<p dir=\"ltr\"><span>Mark, Steve and Bill get their salaries in the ratio of 2:3:5. If their salaries are incremented by 15%, 10%, and 20% respectively, the new ratio of their salaries becomes:</span></p>",
      "options": [
        "<p><span>8:16:15</span></p>",
        "<p><span>23:33:60</span></p>",
        "<p><span>33:30:20</span></p>",
        "<p><span>21:25:32</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let their old salaries be 2a, 3a, 5a respectively. </span><br><span>Then, their new salaries become: 115% of 2a = 2a x 1.15 = 2.3a </span><br><span>110% of 3a = 3a x 1.10 = 3.3a </span><br><span>120% of 5a = 5a x 1.20 = 6a </span><br><span>So, the new ratio becomes 2.3a:3.3a:6a </span><br><span>Upon simplification, this becomes 23:33:60. </span></p>",
      "tag": "Ratio, Proportion || MCQ"
    }
  ],
  "Average": [
    {
      "id": 60045,
      "question": "<p dir=\"ltr\"><span>The average of five numbers is 20. If one number is removed, the average of the remaining numbers becomes 18. What is the number that was removed?</span></p>",
      "options": [
        "<p><span>25</span></p>",
        "<p><span>40</span></p>",
        "<p><span>28</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the five numbers be x1,x2,x3,x4,x5.</span><br><span>The total of the five numbers is 5\u00d720 = 100.</span><br><span>Let the removed number be x.</span><br><span>The total of the remaining four numbers is 100\u2212x.</span><br><span>The average of the remaining numbers is given by:</span><br><span>100\u2212x/4 = 18</span><br><span>Multiplying both sides by 4 gives:</span><br><span>100\u2212x = 72\u2005\u200a\u2005</span><br><span>\u200ax = 28.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60046,
      "question": "<p dir=\"ltr\"><span> A class of 30 students has an average score of 75. If a new student joins the class and the average score becomes 76, what is the score of the new student?</span></p>",
      "options": [
        "<p><span>100</span></p>",
        "<p><span>110</span></p>",
        "<p><span>76</span></p>",
        "<p><span>106</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The total score of the original 30 students is 30\u00d775 = 2250.</span><br><span>Let the score of the new student be y.</span><br><span>The new average for 31 students is:</span><br><span>(2250+y)/31 = 76</span><br><span>Multiplying both sides by 31 gives:</span><br><span>2250+y = 2356\u2005\u200a\u2005\u200a</span><br><span>y = 106.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60047,
      "question": "<p dir=\"ltr\"><span>In a race, the average speed of a car is 60 km/h for the first half and 90 km/h for the second half. If the total distance is 120 km, what is the average speed for the entire race?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>75 km/h</span></p>",
        "<p dir=\"ltr\"><span>78 km/h</span></p>",
        "<p dir=\"ltr\"><span>72 km/h</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The first half distance is 60 km at 60 km/h, </span><br><span>taking 60/60 = 1 hour.</span><br><span>The second half distance is also 60 km at 90 km/h, </span><br><span>taking 60/90 = 2/3 hours.</span><br><span>Total time = 1+(2/3) = 5/3 hours.</span><br><span>Average speed = 120&nbsp;km/(5/3&nbsp;)hours = (120\u00d73)/5 = 72 km/h.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60048,
      "question": "<p dir=\"ltr\"><span>The average of three numbers is 40. If one of the numbers is increased by 20, what will be the new average?</span></p>",
      "options": [
        "<p><span>46.67</span></p>",
        "<p><span>35.67</span></p>",
        "<p><span>40.67</span></p>",
        "<p><span>45</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the three numbers be x1,x2,x3\u200b.</span><br><span>Then (x1+x2+x3)/3 = 40 </span><br><span>implies x1+x2+x3 = 120.</span><br><span>If one number is increased by 20, </span><br><span>the new total is 120+20 = 140.</span><br><span>New average = 140/3 \u2248 46.67.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60049,
      "question": "<p dir=\"ltr\"><span>The average age of a group of 10 people is 30 years. If 5 people leave the group and their average age is 32 years, what is the average age of the remaining people?</span></p>",
      "options": [
        "<p><span>32</span></p>",
        "<p><span>30</span></p>",
        "<p><span>27</span></p>",
        "<p><span>28</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total age of 10 people = 10\u00d730 = 300.</span><br><span>Total age of the 5 people who left = 5\u00d732 = 160.</span><br><span>Total age of remaining people = 300\u2212160 = 140.</span><br><span>Average age of remaining people = 140/5 = 28 years.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60050,
      "question": "<p dir=\"ltr\"><span>A teacher gives a test to her students, and the average score is 75. If the top score of 100 is removed from the average calculation, how does this affect the average if the total number of students is 20?</span></p>",
      "options": [
        "<p><span>73.68</span></p>",
        "<p><span>72.68</span></p>",
        "<p><span>71.68</span></p>",
        "<p><span>70.68</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total score with the top score = 20\u00d775 = 1500.</span><br><span>New total without the top score = 1500\u2212100 = 1400.</span><br><span>New number of students = 19.</span><br><span>New average = 1400/19 \u2248 73.68.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60051,
      "question": "<p dir=\"ltr\"><span>If the average of two numbers is x and the average of three numbers is y, what is the average of all five numbers?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>(2y+3x)/5</span></p>",
        "<p dir=\"ltr\"><span>(2x+3y)</span></p>",
        "<p dir=\"ltr\"><span>(2x+3y)/5</span></p>",
        "<p dir=\"ltr\"><span>(2x+3y)/2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the two numbers be a1\u200b and a2\u200b.</span><br><span>Then (a1+a2)/2 = x\u2005\u200a\u200a</span><br><span>a1+a2 = 2x.</span><br><span>Let the three numbers be b1,b2,b3\u200b.</span><br><span>Then (b1+b2+b3)/3 = y\u2005\u200a\u2005</span><br><span>\u200ab1+b2+b3 = 3y.</span><br><span>Total of all five numbers = 2x+3y.</span><br><span>Average = (2x+3y)/5\u200b.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60052,
      "question": "<p dir=\"ltr\"><span> A student scored 80, 90, and 70 in three subjects. If he scores 100 in the fourth subject, what will be his average?</span></p>",
      "options": [
        "<p><span>85</span></p>",
        "<p><span>90</span></p>",
        "<p><span>70</span></p>",
        "<p><span>95</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total score for three subjects = 80+90+70 = 240.</span><br><span>Including the fourth subject: 240+100 = 340.</span><br><span>Average = 340/4 = 85.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60053,
      "question": "<p dir=\"ltr\"><span>The average of four numbers is 50. If the first number is increased by 10, what is the new average?</span></p>",
      "options": [
        "<p><span>48.5</span></p>",
        "<p><span>55</span></p>",
        "<p><span>55.5</span></p>",
        "<p><span>52.5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total of four numbers = 4\u00d750 = 200.</span><br><span>If the first number is increased by 10, </span><br><span>the new total becomes 200+10 = 210.</span><br><span>New average = 210/4 = 52.5.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60054,
      "question": "<p dir=\"ltr\"><span>A bag contains 3 red balls, 5 blue balls, and 2 green balls. What is the average number of balls of each color?</span></p>",
      "options": [
        "<p><span>3.33</span></p>",
        "<p><span>4</span></p>",
        "<p><span>3.1</span></p>",
        "<p><span>3.5</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total balls = 3+5+2 = 10.</span><br><span>Number of colors = 3 (red, blue, green).</span><br><span>Average number of balls of each color = 10/3 \u2248 3.33.</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60055,
      "question": "<p dir=\"ltr\"><span>The average of 21 results is 20. Average of first 10 of them is 24 that of last 10 is 14. the result of 11'th is :</span></p>",
      "options": [
        "<p><span>42</span></p>",
        "<p><span>44</span></p>",
        "<p><span>46</span></p>",
        "<p><span>40</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> 11'th result = sum of 21 results \u2013 sum of 20 results             </span><br><span>= 21 x 20 \u2013 (24 x 10 + 14 x 10)             </span><br><span>= 420 \u2013 (240 + 140)             </span><br><span>= 420- 380 = 40</span></p>",
      "tag": "Average || MCQ"
    },
    {
      "id": 60056,
      "question": "<p dir=\"ltr\"><span>If the average of four consecutive odd numbers is 16, find the smallest of these numbers?</span></p>",
      "options": [
        "<p><span>5</span></p>",
        "<p><span>7</span></p>",
        "<p><span>13</span></p>",
        "<p><span>11</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the numbers be x, x+2, x+4 and x+6</span><br><span>Then (x + x + 2 + x + 4 + x + 6)/4  = 16</span><br><span>\u2234 4x + 12 = 64</span><br><span>\u2234 x = 13</span></p>",
      "tag": "Average || MCQ"
    }
  ],
  "Problem on Age": [
    {
      "id": 60057,
      "question": "<p dir=\"ltr\"><span>A is 5 years older than B who is thrice as old as C. If the total of ages of A, B and C is 40, then how old is C ?   </span></p>",
      "options": [
        "<p><span>6</span></p>",
        "<p><span>7</span></p>",
        "<p><span>5</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let C\u2019s age be x years then B\u2019s age be 3x</span><br><span>years and A\u2019s age be (3x+5) years</span><br><span>Therefore  x + 3x + (3x + 5) = 40</span><br><span>7x + 5 = 40</span><br><span>7x = 35</span><br><span>x = 5</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60058,
      "question": "<p dir=\"ltr\"><span>Sum of the age of 4 children born at interval of 4 years is 36. What is the age of youngest child?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2 years</span></p>",
        "<p dir=\"ltr\"><span>3 years</span></p>",
        "<p dir=\"ltr\"><span>4 years</span></p>",
        "<p dir=\"ltr\"><span>5 years</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the ages of children be x, (x+4), </span><br><span>(x+8) and (x+12) years.</span><br><span>Then x + x + 4 + x + 8 + x +12 = 36</span><br><span>4x + 24 = 36</span><br><span>4x = 12</span><br><span>x = 3</span><br><span>Age of the youngest child = x = 3 years</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60059,
      "question": "<p dir=\"ltr\"><span> A is as older than B as he is younger than C.If the sum of ages of B and C is 68 years. What is the present age of A?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>24 years</span></p>",
        "<p dir=\"ltr\"><span>34 years</span></p>",
        "<p dir=\"ltr\"><span>28 years</span></p>",
        "<p dir=\"ltr\"><span>32 years</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A \u2013 B = C \u2013 A</span><br><span>\u2234 2A = B + C</span><br><span>And also given that B + C = 68</span><br><span>\u2234 2A = 68</span><br><span>\u2234   A = 34 </span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60060,
      "question": "<p dir=\"ltr\"><span>The present ages of A, B and C are in proportions 4:5:9. Nine years ago, sum of their ages was 45 years. Find their present ages in years </span></p>",
      "options": [
        "<p><span>15,20,35</span></p>",
        "<p><span>20,24,36</span></p>",
        "<p><span>20,25,45</span></p>",
        "<p><span>16,20,36</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the current ages of A, B and C be ax years, 5x years and 9x respectively. </span><br><span>Then (4x-9) + (5x-9) + (9x-9) =45</span><br><span>18x \u2013 27 = 45</span><br><span>18x = 72</span><br><span>x = 4</span><br><span>Present ages of A, B and C are 4x = 16, 5x = 20, 9x = 36 respectively.  </span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60061,
      "question": "<p dir=\"ltr\"><span>At present, the ratio between ages of Ram and Shyam is 6:5 respectively. After 7 years, Shyam\u2019s age will be 32 years. What is the present age of Ram?</span></p>",
      "options": [
        "<p><span>32</span></p>",
        "<p><span>40</span></p>",
        "<p><span>30</span></p>",
        "<p><span>36</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the present age of Ram and Shyam be 6x years and 5x years respectively.</span><br><span>Then 5x + 7 = 32</span><br><span>5x = 25</span><br><span>x = 5</span><br><span>Present age of Ram = 6x = 30 years</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60062,
      "question": "<p dir=\"ltr\"><span>Present age of Vinod and Ashok are in ratio of 3:4 respectively. After 5 years, the ratio of their ages becomes 7:9 respectively. What is Ashok\u2019s present age is ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>40 years</span></p>",
        "<p dir=\"ltr\"><span>28 years</span></p>",
        "<p dir=\"ltr\"><span>32 years</span></p>",
        "<p dir=\"ltr\"><span>36 years</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the present age of Vinod and Ashok be 3x years and 4x years respectively. </span><br><span>Then (3x+5) / (4x+5)  = 7 / 9 </span><br><span>9(3x + 5) = 7(4x + 5)</span><br><span>27x + 45 = 28x + 35</span><br><span>x = 10</span><br><span>Ashok\u2019s present age = 4x = 40 years </span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60063,
      "question": "<p dir=\"ltr\"><span>A person\u2019s present age is one third of the age of his mother. After 12 years, his age will be one half of the age of his mother. What is present age of his mother?  </span></p>",
      "options": [
        "<p><span>30</span></p>",
        "<p><span>34</span></p>",
        "<p><span>38</span></p>",
        "<p><span>36</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Le the present ages of son and his mother are x years and 3x years. </span><br><span>Then (3x + 12) = 2( x + 12)</span><br><span>\u2234 3x + 12 = 2x + 24</span><br><span>\u2234 x = 12</span><br><span>\u2234 Present age of mother = 3x = 36 years </span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60064,
      "question": "<p dir=\"ltr\"><span>5 years ago the ratio of Shyam\u2019s age to Ram\u2019s age is 3:2. If Ram\u2019s present age is 25% less than Shyam\u2019s present age. What will be Ram\u2019s age after 10 years?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>20 years</span></p>",
        "<p dir=\"ltr\"><span>15 years</span></p>",
        "<p dir=\"ltr\"><span>25 years</span></p>",
        "<p dir=\"ltr\"><span>20 years</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say Ram\u2019s present age = R  </span><br><span>Shyam\u2019s present age&nbsp; = S  </span><br><span>R = (3/4) S </span><br><span>S = (3/4) R---------------------(1)  </span><br><span>5 years ago:  (S-5)/(R-5) = 3/2------------(2)  </span><br><span>from 1 and 2:  </span><br><span>(8R/3) - 10 = (9R/3) \u2013 15  </span><br><span>R = 15  </span><br><span>After 10 years Ram\u2019s age = 25 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60065,
      "question": "<p dir=\"ltr\"><span>5 years ago age of Ram was 50 % less than Shyam\u2019s age. If the ratio of Shyam\u2019s present age to Ram\u2019s present age 4:3. What will be Ram\u2019s age after 7.5 years?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>25 years</span></p>",
        "<p dir=\"ltr\"><span>20 years</span></p>",
        "<p dir=\"ltr\"><span>20 years</span></p>",
        "<p dir=\"ltr\"><span>15 years</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say Ram\u2019s present age = R,  </span><br><span>Shyam\u2019s present age&nbsp; = S,  </span><br><span>R:S = 3:4,  R = 3S/4 ------------ (1)  </span><br><span>5 years ago Ram\u2019s age = R - 5,  </span><br><span>5 years ago Shyam\u2019s age S - 5, </span><br><span>and according to given condition, </span><br><span>R - 5 = (S - 5)/2 ------- (2) </span><br><span>From 1 and 2:  </span><br><span>(R - 5) = ((4R/3) - 5)/2, </span><br><span> 6R - 30 = 4R - 15,  R = 15/2 = 7.5 years,  </span><br><span>After 7.5 years, Ram\u2019s age = 7.5 + 7.5 = 15 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60066,
      "question": "<p dir=\"ltr\"><span>Ram age was half of Shaym\u2019s age, 10 years ago. If the ratio of their present ages is 3:5, what is the sum of their ages at present?</span></p>",
      "options": [
        "<p><span>30</span></p>",
        "<p><span>50</span></p>",
        "<p><span>70</span></p>",
        "<p><span>80</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<h4><span>Say Rams present age = r</span><br><span>that of shaym = s</span><br><span>r - 10 = (s - 10)/2</span><br><span>r/s = 3/5 </span><br><span>6s - 100 = 5s - 50</span><br><span>s = 50</span><br><span>r = 30</span><br><span>Sum = 80.</span></h4>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60067,
      "question": "<p dir=\"ltr\"><span>Ram and Shyam\u2019s ages are in the ratio between 4:3. After 6 Years age of Ram will be 26 years. What is present age of Shyam?</span></p>",
      "options": [
        "<p><span>20</span></p>",
        "<p><span>16</span></p>",
        "<p><span>15</span></p>",
        "<p><span>12</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say, Ram present age =4x</span><br><span>Shyam present age = 3x</span><br><span>after 6 years:</span><br><span>4x+6 = 26</span><br><span>x=5</span><br><span>Shyam age = 3x = 15.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60068,
      "question": "<p dir=\"ltr\"><span>The ages of A and B differ by 16 years. 6 years ago, the elder one was 3 times as old as the younger one. What is present ages of the elder person?</span></p>",
      "options": [
        "<p><span>35</span></p>",
        "<p><span>20</span></p>",
        "<p><span>25</span></p>",
        "<p><span>30</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A - B = 16</span><br><span>A - 6 = 3(B - 6)</span><br><span>A - 6 = 3(A - 16 - 6)</span><br><span>A =30.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60069,
      "question": "<p dir=\"ltr\"><span>The Sum of ages of Seeta and Geeta is 12 years less than the sum of ages of Geeta and Ina. By how many years Ina is older than Seeta?</span></p>",
      "options": [
        "<p><span>15</span></p>",
        "<p><span>12</span></p>",
        "<p><span>10</span></p>",
        "<p><span>18</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<h4><span>Seeta's age +Geeta's age + 12 = Geeta's age + Ina's age</span><br><span>Ina's age = Seeta's age + 12</span></h4>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60070,
      "question": "<p dir=\"ltr\"><span> At present father\u2019s age is thrice of son\u2019s age. After 15 years father\u2019s age will be double of son\u2019s age. What is son\u2019s present age?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>16 years</span></p>",
        "<p dir=\"ltr\"><span>15 years</span></p>",
        "<p dir=\"ltr\"><span>12 years</span></p>",
        "<p dir=\"ltr\"><span>10 years</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the present age of son and father be x years and 3x years respectively.</span><br><span>Then (3x + 15) = 2(x + 15)</span><br><span>\u2234 3x + 15 = 2x + 30</span><br><span>\u2234 x = 15</span><br><span>\u2234 Son\u2019s present age = x = 15 years. </span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60071,
      "question": "<p dir=\"ltr\"><span>The sum of the ages of a mother and daughter is 45 years. 5 years ago, the product of their ages was 30 times the daughter's age at that time. What is the present age of daughter?</span></p>",
      "options": [
        "<p><span>10</span></p>",
        "<p><span>30</span></p>",
        "<p><span>32</span></p>",
        "<p><span>37</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say present age of mother =m</span><br><span>Daughter\u2019s age =d </span><br><span>m+d = 45 -------------(1)</span><br><span>(m - 5)(d - 5) = 30(d - 5) --------(2)</span><br><span>d = 10.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60072,
      "question": "<p dir=\"ltr\"><span>The sum of the ages of a mother and daughter is 45 years. 5 years ago, the product of their ages was 30 times the daughter's age at that time. What is the present age of mother?</span></p>",
      "options": [
        "<p><span>12</span></p>",
        "<p><span>7</span></p>",
        "<p><span>35</span></p>",
        "<p><span>10</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say present age of mother =m</span><br><span>Daughter\u2019s age =d </span><br><span>m + d = 45 -------------(1)</span><br><span>(m - 5)(d - 5) = 30(d - 5) --------(2)</span><br><span>m=35.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60073,
      "question": "<p dir=\"ltr\"><span>If difference of ages of Ram and Shyam is 16 years. If 6 year ago, the Ram\u2019s age is 3 times as old the Shyam, What are Ram and Shyam's respective present ages?</span></p>",
      "options": [
        "<p><span>17, 30</span></p>",
        "<p><span>30, 14</span></p>",
        "<p><span>15, 32</span></p>",
        "<p><span>14, 30</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let  the age of Ram is x, </span><br><span>Then elder person age is (x+16)  </span><br><span>3(x-6) = (x+16-6) [6 years before] </span><br><span>3x-18 = x+10 =&gt; x = 14. </span><br><span>So other person age is x + 16 = 30</span></p><h4></h4>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60074,
      "question": "<p dir=\"ltr\"><span>The present ages of Ram and Shyam are in the ratio 6:7. If Shyam is 4 years older than Ram, after 4 years what will be the ratio of their ages?</span></p>",
      "options": [
        "<p><span>5:8</span></p>",
        "<p><span>4:8</span></p>",
        "<p><span>7:8</span></p>",
        "<p><span>8:7</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let present age of Ram = 6x years</span><br><span>present age of Shyam = 7x years</span><br><span>Then 7x - 6x = 4</span><br><span>x = 4</span><br><span>After 4 years required ratio will be (6x+4): (7x+4)</span><br><span>28:32 </span><br><span>7:8</span></p><p><br></p><p dir=\"ltr\"><br></p><h4></h4>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60075,
      "question": "<p dir=\"ltr\"><span>A boy is older than girl by 7 years. If the ratio of ages of boy:girl is 9:7, what is the age of boy?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>30 years</span></p>",
        "<p dir=\"ltr\"><span>20 years</span></p>",
        "<p dir=\"ltr\"><span>31.5 years</span></p>",
        "<p dir=\"ltr\"><span>25.5 years</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say age of boy = b</span><br><span>Age of girl = b-7</span><br><span>b:b-7 = 9:7</span><br><span>7b = 9b -63</span><br><span>2b = 63</span><br><span>b= 31.5 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60076,
      "question": "<p dir=\"ltr\"><span>After 15 years, Meena's age will be 5 times his age 5 years ago. What is Meena's present age?\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>10 years</span></p>",
        "<p dir=\"ltr\"><span>15 years</span></p>",
        "<p dir=\"ltr\"><span>12 years</span></p>",
        "<p dir=\"ltr\"><span>16 years</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say present age of meena = m  </span><br><span>5 years ago Meena\u2019s age = m-5  </span><br><span>after 15 years  </span><br><span>5(\u00adm-5) = m+15  </span><br><span>5m-25=m+15  </span><br><span>4m = 40  </span><br><span>m = 10 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60077,
      "question": "<p dir=\"ltr\"><span>6:7 is the ratio of Michael's and Rosan\u2018s ages one year back. The ratio will become 7:8 in four years. Calculate the present age of Rosan.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>35 years</span></p>",
        "<p dir=\"ltr\"><span>32 years</span></p>",
        "<p dir=\"ltr\"><span>36 years</span></p>",
        "<p dir=\"ltr\"><span>31 years</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the ages of Michael and Rosan one year ago be 6a and 7a respectively. </span><br><span>Then, Michael's age after 4 years = (6a + 1) + 4 = (6a + 5) years. </span><br><span>Rosan's age after 4 years = (7a + 1) + 4 = (7a + 5) years. </span><br><span>Therefore, (6a + 5):(7a + 5) = 7:8</span><br><span>8\u00d7(6a + 5) = 7\u00d7(7a + 5) </span><br><span>48a + 40 = 49a + 35 </span><br><span>a = 5. </span><br><span>Hence, the present age of Rosan = (7a + 1) = 7\u00d75 + 1 = 35 + 1 = 36 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60078,
      "question": "<p dir=\"ltr\"><span>The age of a father was 4 times his son\u2019s age 8 years back. After 8 years, the father will be twice as old as his son. Find out the present ages of father and son.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>16 and 40 years</span></p>",
        "<p dir=\"ltr\"><span>14 and 45 years</span></p>",
        "<p dir=\"ltr\"><span>10 and 42 years</span></p>",
        "<p dir=\"ltr\"><span>13 and 41 years</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the son be x years old and the father be y years old. </span><br><span>Then, y-8 = 4(x-8) and y+8 = 2(x+8). </span><br><span>Subtracting the first equation from the second, we get (y+8) - (y-8) = (2x+16) - (4x-32) </span><br><span>16 = -2x + 48. </span><br><span>2x = 32 </span><br><span>x = 16. </span><br><span>But, y-8 = 4(x-8). </span><br><span>So, y = 4(x-8) + 8 = 40. </span><br><span>Therefore, the present ages are 16 and 40 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60079,
      "question": "<p dir=\"ltr\"><span>Cooper's present age is 3 years more than thrice Max's present age. After 3 years, Cooper's age will 10 years more than twice Max's age. What is Cooper's present age?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>33 years</span></p>",
        "<p dir=\"ltr\"><span>34 years</span></p>",
        "<p dir=\"ltr\"><span>38 years</span></p>",
        "<p dir=\"ltr\"><span>32 years</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let's Max's present age be x years. </span><br><span>Then, Cooper's present age is (3x + 3) years. </span><br><span>According to the question, (3x + 3) + 3 = 2(x + 3) + 10 </span><br><span>3x + 6 = 2x + 16</span><br><span>x = 10. </span><br><span>Therefore, Cooper's present age is (3x + 3) = 33 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60080,
      "question": "<p dir=\"ltr\"><span>Sam is 16 years older than Peter. If 6 years back, Sam's age was 3 times Peter's age, what are their present ages?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>14 and 30 years</span></p>",
        "<p dir=\"ltr\"><span>15 and 31 years</span></p>",
        "<p dir=\"ltr\"><span>13 and 30 years</span></p>",
        "<p dir=\"ltr\"><span>12 and 30</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let Peter's age be x years. </span><br><span>Then, Sam's age = x + 16 years. </span><br><span>We know, 3 \u00d7 (x-6) = (x+16) - 6 </span><br><span>3x - 18 = x + 10</span><br><span>2x = 28  </span><br><span>x = 14. </span><br><span>Therefore, Peter's present age is 14 years and Sam's present age is 30 years.</span></p>",
      "tag": "Problem on Age || MCQ"
    },
    {
      "id": 60081,
      "question": "<p dir=\"ltr\"><span>After 15 years, Paul\u2019s age will be 5 times his age 5 years back. Find out his present age.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>10 years</span></p>",
        "<p dir=\"ltr\"><span>14 years</span></p>",
        "<p dir=\"ltr\"><span>12 years</span></p>",
        "<p dir=\"ltr\"><span>11 years</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let his present age be x years. </span><br><span>Paul\u2019s age after 15 years = (x+15) years. </span><br><span>Paul\u2019s age 5 years back = (x-5) years. </span><br><span>Hence, x+15 = 5(x-5) </span><br><span>x+15 = 5x-25 </span><br><span>4x = 40 \u21d2 x = 10.</span></p>",
      "tag": "Problem on Age || MCQ"
    }
  ],
  "Percentages": [
    {
      "id": 60082,
      "question": "<p dir=\"ltr\"><span>John earns 33.33% more than Peter. By what percentage is Peter's earnings less than that of John's?</span></p>",
      "options": [
        "<p><span>22 % </span></p>",
        "<p><span>25 % </span></p>",
        "<p><span>26 % </span></p>",
        "<p><span>23 % </span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>John earns 33.33% more than Peter \u21d2 John = 133.33, </span></p><p dir=\"ltr\"><span>Peter = 100.</span><br><span>Difference = 33.33.</span></p><p><span>33.33/133.33\u00d7100=25%</span></p><p dir=\"ltr\"><span>Peter earns 25% less than John.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60083,
      "question": "<p dir=\"ltr\"><span>Mary's salary is reduced by 10%. By what percentage must her new salary be increased in order to gain her old salary?</span></p>",
      "options": [
        "<p>[Tex]\\frac{137}{9}\\% [/Tex]</p>",
        "<p>[Tex]\\frac{194}{9}\\%[/Tex]</p>",
        "<p>[Tex]\\frac{100}{9}\\%[/Tex]</p>",
        "<p>[Tex]\\frac{110}{9}\\%    [/Tex]</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let her old salary be Rs 100. </span><br><span>Then, her new salary = 100 - 10 = Rs 90. </span><br><span>So, to gain her old salary, her new salary must be increased by Rs 10. </span><br><span>Therefore, the required percentage = (10 \u2044 90) \u00d7 100% = 100/9 %.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60084,
      "question": "<p dir=\"ltr\"><span>The price of sugar is decreased by 10%. As a consequence, monthly sales is increased by 30%. Find out the percentage increase in monthly revenue.</span></p>",
      "options": [
        "<p><span>17 %</span></p>",
        "<p><span>19 %</span></p>",
        "<p><span>18 %</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the price of sugar be Rs 100 and monthly sales be 100 units. </span><br><span>Then, total revenue = 100 \u00d7 100 = Rs 10000. </span><br><span>And, new revenue = 90 \u00d7 130 = Rs 11700. </span><br><span>Increase in revenue = 11700 - 10000 = Rs 1700. </span><br><span>Hence, percentage increase in revenue = (1700/10000) \u00d7 100% = 17%.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60085,
      "question": "<p dir=\"ltr\"><span>Jack consumes 75% of his salary. Later his salary is increased by 20% and he increases his expenditures by 10%. Find the percentage increase in his savings.</span></p>",
      "options": [
        "<p><span>51%</span></p>",
        "<p><span>60%</span></p>",
        "<p><span>50%</span></p>",
        "<p><span>55%</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let Jack's original salary be Rs 100. </span><br><span>Then, his expenditure = Rs 75, his savings = Rs 25. </span><br><span>Now, his new salary = Rs 120. </span><br><span>So, new expenditure = (110/100) \u00d7 75 = Rs 165/2, </span><br><span>new savings = 120 - 165/2 = Rs 75/2. </span><br><span>Increase in savings = 75/2 - 25 = Rs 25/2. </span><br><span>Therefore, percentage increase in savings = (25/2)/25 \u00d7 100% = 50%.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60086,
      "question": "<p dir=\"ltr\"><span>Barack spends Rs 6650 to buy some goods and gets a rebate of 6% on it. After this, he pays a sales tax of 10%. What is his total expenditure?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 6870.10</span></p>",
        "<p dir=\"ltr\"><span>Rs 6876.10</span></p>",
        "<p dir=\"ltr\"><span>Rs 6865.10</span></p>",
        "<p dir=\"ltr\"><span>Rs 6776.10 </span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Rebate received by Barack = 6% of Rs 6650 = 6/100&nbsp;\u00d7 6650 = 3/5 \u00d7 665 = Rs 399. </span><br><span>Sales Tax paid by Barack = 10% of Rs (6650-399) = 10% of Rs 6251 = Rs 625.10. </span><br><span>Therefore, Barack's total expenditure = Rs (6251 + 625.10) = Rs 6876.10.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60087,
      "question": "<p dir=\"ltr\"><span>Felix spends 66.66% of his salary and saves Rs 1200 every month. Calculate his monthly expenditure in Rupees.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 2402</span></p>",
        "<p dir=\"ltr\"><span>Rs 2400</span></p>",
        "<p dir=\"ltr\"><span>Rs 2401</span></p>",
        "<p dir=\"ltr\"><span>Rs 2405</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let Felix's monthly salary be Rs x. </span><br><span>Then, (100 - 66.66)% of x = Rs 1200</span><br><span>33.33 % of x = Rs 1200 \u21d2 x/3 = Rs 1200 </span><br><span>x = Rs 3600. </span><br><span>Therefore, his monthly expenditure = 3600 - 1200 = Rs 2400.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60088,
      "question": "<p dir=\"ltr\"><span>Jack and Robert appeared in an examination. Robert scored 9 marks less than Jack. Jack's score was 56% of the sum of their scores added together. Calculate their individual scores.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>22 and 33</span></p>",
        "<p dir=\"ltr\"><span>41 and 35</span></p>",
        "<p dir=\"ltr\"><span>40 and 35</span></p>",
        "<p dir=\"ltr\"><span>42 and 33</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let Robert's score be x. Then, Jack's score = x+9. </span><br><span>Now, x+9 = 56% of [(x+9) + x]  </span><br><span>x+9 = 14/25 \u00d7 (2x + 9) </span><br><span>25 \u00d7 (x+9) = 14 \u00d7 (2x+9) </span><br><span>25x + 225 = 28x + 126 </span><br><span>3x = 99 \u21d2 x = 33. </span><br><span>Therefore, Robert scored 33 marks and Jack scored 42 marks.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60089,
      "question": "<p dir=\"ltr\"><span>Ram spends 20% of is salary on food, 15 % of remaining on cloths, and 400 on entertainment. If his salary is 10000, how much he spends on food?</span></p>",
      "options": [
        "<p><span>2000</span></p>",
        "<p><span>3000</span></p>",
        "<p><span>1500</span></p>",
        "<p><span>2500</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>20 percent of 10000 is:</span><br><span>10000*20/100 = 2000.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60090,
      "question": "<p dir=\"ltr\"><span>Ram spends 20% of is salary on food, 15 % of remaining on cloths, and 400 on entertainment. If his salary is 10000, how much he spends on cloths?</span></p>",
      "options": [
        "<p><span>1100</span></p>",
        "<p><span>1200</span></p>",
        "<p><span>1500</span></p>",
        "<p><span>1000</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total salary of Ram = 10000.</span><br><span>20 percent of Ram salary=10000\u00d720</span><br><span>[10000-(10000\u00d720/100)]\u00d715/100 = 1200</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60091,
      "question": "<p dir=\"ltr\"><span>Ram spends 20% of is salary on food, 15 % of remaining on cloths, and 400 on entertainment. If his salary is 10000, how much &nbsp;salary he saves at the end of month?</span></p>",
      "options": [
        "<p><span>1400</span></p>",
        "<p><span>3600</span></p>",
        "<p><span>6400</span></p>",
        "<p><span>2000</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total expenditure = &nbsp;[10000\u00d720/100] + [[10000-(10000\u00d720/100)]\u00d715/100] +400  = 2000+1200+ 400 = 3600  </span><br><span>Savings = 10000-3600 = 6400</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60092,
      "question": "<p dir=\"ltr\"><span>A product is sold at two consecutive discounts of 30% and subsequently 40%. If the product is sold for 1500, what is the marked price on product?</span></p>",
      "options": [
        "<p><span>3500</span></p>",
        "<p><span>3600</span></p>",
        "<p><span>3550</span></p>",
        "<p><span>3571</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say MP is the marked price  </span><br><span>(70.MP/100) \u00d7 (60/100) =1500   </span><br><span>0.7 \u00d7 0.6 MP = 1500  </span><br><span>MP = 1500/0.42 = 3571.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60093,
      "question": "<p dir=\"ltr\"><span>A product is sold at two consecutive discounts of 30% and subsequently 40%. If the marked price on the product is 1500, What is the selling price of the product?</span></p>",
      "options": [
        "<p><span>420</span></p>",
        "<p><span>360</span></p>",
        "<p><span>600</span></p>",
        "<p><span>630</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SP&nbsp;= (70\u00d71500/100)\u00d7(60/100) = 0.42\u00d71500 = 630.</span></p>",
      "tag": "Percentages || MCQ"
    },
    {
      "id": 60094,
      "question": "<p dir=\"ltr\"><span>Sudheer\u2019s family can use the water up to 10 days when the tank is full. If the water consumption of his family is increased by 25% per day, how many days will the water tank last?</span></p>",
      "options": [
        "<p><span>5</span></p>",
        "<p><span>6</span></p>",
        "<p><span>7</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the water capacity of the tank be x liters. </span><br><span>Then,  Initial water consumption rate = x/10 ltr per day </span><br><span>New water consumption rate after the increase by 25% = x/10 \u00d7 (1 + 25/100) ltr per day = x/10 \u00d7 1.25 = x/8 ltr per day </span><br><span>The water tank last in number of days = full tank capacity in ltr / new water consumption rate in ltr per day = x / (x/8) = 8 days.</span></p>",
      "tag": "Percentages || MCQ"
    }
  ],
  "Profit and Loss": [
    {
      "id": 60095,
      "question": "<p dir=\"ltr\"><span>A product is sold at two consecutive discounts of 30% and subsequently 40%. If the product is sold for 1500, what is the marked price on product?</span></p>",
      "options": [
        "<p><span>3500</span></p>",
        "<p><span>3600</span></p>",
        "<p><span>3550</span></p>",
        "<p><span>3571</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say MP is the marked price  </span><br><span>(70.MP/100) \u00d7 (60/100) =1500   </span><br><span>0.7 \u00d7 0.6 MP = 1500  </span><br><span>MP = 1500/0.42 = 3571.</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60096,
      "question": "<p dir=\"ltr\"><span>Peter buys a bag at the price of Rs 27.50. After some days, he sells it at the price of Rs 28.90. What is the percentage of his gain? </span></p>",
      "options": [
        "<p><span>7.19%</span></p>",
        "<p><span>5.09%</span></p>",
        "<p><span>5.55% </span></p>",
        "<p><span>6.09% </span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Cost price of the bag is Rs 27.50 and Selling price is Rs 28.90. </span><br><span>So, Peter gains Rs (28.90 - 27.50) = Rs 1.40. </span><br><span>Percentage of gain = (1.40/27.50&nbsp;\u00d7 100)% = 140/27.5 % = 5.09 %.</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60097,
      "question": "<p dir=\"ltr\"><span>Sam purchases a book at Rs 490 and sells it at Rs 465.50. What is the percentage of his loss?</span></p>",
      "options": [
        "<p><span>6%</span></p>",
        "<p><span>10%</span></p>",
        "<p><span>5%</span></p>",
        "<p><span>4%</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>CP of the book = Rs 490.00. </span><br><span>SP of the book = Rs 465.50. </span><br><span>Loss = Rs (490.00 - 465.50) = Rs 24.50. </span><br><span>Hence, the required percentage = (24.50/490&nbsp;\u00d7 100)% = 5%.</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60098,
      "question": "<p dir=\"ltr\"><span>A bookseller gains a profit of 10% after selling a book at the price of Rs 27.50. If it is sold at the price of Rs 25.75, find out the percentage of loss or profit on the book.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Profit 3%</span></p>",
        "<p dir=\"ltr\"><span>Loss 4%</span></p>",
        "<p dir=\"ltr\"><span>Profit 5%</span></p>",
        "<p dir=\"ltr\"><span>Loss 2%</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SP of the book = Rs 27.50 and he gains 10% profit on it. </span><br><span>So, CP of the book = Rs (100/110&nbsp;\u00d7 27.50) = Rs 25. </span><br><span>If the book is sold at Rs 25.75, </span><br><span>the seller will make a profit of Rs (25.75 - 25.00) = Rs 0.75. </span><br><span>Therefore, percentage of profit = 0.75/25 \u00d7 100% = 3%.</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60099,
      "question": "<p dir=\"ltr\"><span>A shopkeeper sells an article at the price of Rs 1140 and incurs a loss of 5% on it. For him to gain a profit of 5% on the same article, at what price should the article be sold?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 1200</span></p>",
        "<p dir=\"ltr\"><span>Rs 1250</span></p>",
        "<p dir=\"ltr\"><span>Rs 1260</span></p>",
        "<p dir=\"ltr\"><span>Rs 1245</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the selling price be Rs a. </span><br><span>We know, (100 - Percentage of loss):(Original SP) = (100 + Percentage of profit):(New SP). </span><br><span>Then, (100-5):1140 = (100+5):a </span><br><span>95:1140 = 105:a  </span><br><span>a = (105\u00d71140)/95 = 1260.</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60100,
      "question": "<p dir=\"ltr\"><span>After selling 33 meters of a cloth, a shopkeeper makes a gain equal to the selling price of 11 meters of the cloth. What is the percentage of his gain?</span></p>",
      "options": [
        "<p><span>50%</span></p>",
        "<p><span>45%</span></p>",
        "<p><span>60%</span></p>",
        "<p><span>55%</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Here, (SP of 33m)-(CP of 33m) = Gain = SP of 11m. </span><br><span>This means, CP of 33m = (SP of 33m)-(SP of 11m) = SP of 22m. </span><br><span>Let the CP of each meter be Re 1. </span><br><span>Then, CP of 33m = Rs 33. </span><br><span>SP of 11m = (SP of 22m)/2 = (CP of 33m)/2 = Rs 33/2. </span><br><span>Percentage of Gain = Gain/CP \u00d7 100% = (SP of 11m)/(CP) \u00d7 100%  = (33/2)/(33) \u00d7 100% = 50%. </span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60101,
      "question": "<p dir=\"ltr\"><span>For a shirt cost price = 400Rs. Shopkeeper prints a tag on it with Markup% = 20% to earn a profit of 7.5%. What is marked price.</span></p>",
      "options": [
        "<p><span>480</span></p>",
        "<p><span>500</span></p>",
        "<p><span>520</span></p>",
        "<p><span>600</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>MP= CP +Markup = 400+80 = 480</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60102,
      "question": "<p dir=\"ltr\"><span>For a shirt cost price = 400Rs. Shopkeeper prints a tag on it with Markup% = 20% to earn a profit of 7.5%. How much profit shopkeeper earns?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 40</span></p>",
        "<p dir=\"ltr\"><span>Rs 50</span></p>",
        "<p dir=\"ltr\"><span>Rs 60</span></p>",
        "<p dir=\"ltr\"><span>Rs 30</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Profit = CP \u00d7 Profit%/100 = 400 \u00d7 7.5/100 = 30.</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60103,
      "question": "<p dir=\"ltr\"><span>Cost Price of a shirt is Rs 400. Shopkeeper prints a tag on it with Markup% = 20% to earn a profit of 7.5%. What is selling price of the shirt?</span><br><br></p>",
      "options": [
        "<p><span>450</span></p>",
        "<p><span>430</span></p>",
        "<p><span>420</span></p>",
        "<p><span>460</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SP = CP + Profit = 400 +30 = 430</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60104,
      "question": "<p dir=\"ltr\"><span>Cost Price of a shirt is Rs 400. Shopkeeper prints a tag on it with Markup% = 20% to earn a profit of 7.5%. How discount % shopkeeper offered on the shirt?</span></p>",
      "options": [
        "<p><span>10.60 %</span></p>",
        "<p><span>10.20 %</span></p>",
        "<p><span>10.42 %</span></p>",
        "<p><span>10.48</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Discount% = (Discount/MP) \u00d7 100 = 50 \u00d7 100/480 = 10.42%</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60105,
      "question": "<p dir=\"ltr\"><span>If cost price of 15 pen is equal to Selling price of 20 pens, what is the gain or loss percent?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>25% Loss</span></p>",
        "<p dir=\"ltr\"><span>25% Profit</span></p>",
        "<p dir=\"ltr\"><span>30% Loss</span></p>",
        "<p dir=\"ltr\"><span>30% Profit</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Suppose CP of 1 pen = x  </span><br><span>CP of 15 pen = 15x = SP of 20 pen  </span><br><span>SP of 1 Pen = 15x/20  </span><br><span>SP of 15 Pen = 15x \u00d7 15/20 </span><br><span>(as we have to bring number of pens sold and purchased to be equal, so say we are considering everything for 15 pens)  </span><br><span>Loss on 15 pens = CP of 15 pen-SP of 15 pen = 15x \u2013 225x/20 = 75x/20  </span><br><span>Loss% = [Loss/CP] \u00d7 100 = [(75x/40)/15x] \u00d7 100 = 25%</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60106,
      "question": "<p dir=\"ltr\"><span>By selling 8 bananas a fruit seller gains the selling price of 1 banana. Calculate his profit percent.</span></p>",
      "options": [
        "<p><span>14.9%</span></p>",
        "<p><span>16.3%</span></p>",
        "<p><span>15.4%</span></p>",
        "<p><span>14.28%</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>That means when he sells 8 bananas, </span><br><span>he gets 1 bananas price in return as a profit </span><br><span>overall he sold 7 (8 sold -1 received)  </span><br><span>Let CP of 1 banana = x Rs  </span><br><span>Means &nbsp;CP of 7 banana will be 7x Rs  </span><br><span>SP of 8 bananas = 8x  </span><br><span>Profit = 8x-7x = x  Profit% = (x/7x) \u00d7 100 = 14.2857%.</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60107,
      "question": "<p dir=\"ltr\"><span>A fruit seller sells all his bananas at the cost price but gives 15% less bananas as he should give. Find his profit percentage?</span></p>",
      "options": [
        "<p><span>17.64%</span></p>",
        "<p><span>15.64%</span></p>",
        "<p><span>18.60%</span></p>",
        "<p><span>14.45%</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>let 100 bananas are there.  </span><br><span>Bananas left = 15% = 15 bananas  </span><br><span>So, bananas sold = 100-15 = 85  </span><br><span>On 85 bananas sold, he gets 15 bananas as profit  </span><br><span>Profit % = [bananas left / bananas sold] \u00d7 100 = [15/85] \u00d7 100 = 17.64%</span></p>",
      "tag": "Profit and Loss || MCQ"
    },
    {
      "id": 60108,
      "question": "<p dir=\"ltr\"><span>A person bought 3 Oranges for 2 Rs and sold 2 Oranges for 3 Rs. Calculate his Profit percentage?</span></p>",
      "options": [
        "<p><span>100%</span></p>",
        "<p><span>150%</span></p>",
        "<p><span>120%</span></p>",
        "<p><span>125%</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>3 Oranges bought for 2 Rs. </span><br><span>6 Oranges bought for 4 Rs.  </span><br><span>2 Oranges sold for 3 Rs.</span><br><span>6 Oranges sold for 9 Rs.  </span><br><span>6 Oranges, CP = 4 Rs, </span><br><span>SP = 9 Rs .</span><br><span>Profit = 5 Rs. </span><br><span>Profit Percentage = [5/4] \u00d7 100 = 125%</span></p><p dir=\"ltr\"><i><em class=\"GFGEditorTheme__textItalic\">Note: Always remember to equate things (Oranges in this case), not money.</em></i></p>",
      "tag": "Profit and Loss || MCQ"
    }
  ],
  "Mixture and Alligations": [
    {
      "id": 60109,
      "question": "<p dir=\"ltr\"><span>There are two types of sugar. One is priced at Rs 62 per kg and the other is priced at Rs 72 per kg. If the two types are mixed together, the price of new mixture will be Rs 64.50 per kg. Find the ratio of the two types of sugar in this new mixture.</span></p>",
      "options": [
        "<p><span>2:5 </span></p>",
        "<p><span>3:1 </span></p>",
        "<p><span>6:7 </span></p>",
        "<p><span>3:2 </span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Cost Price of 1kg of Type 1 sugar = 6200 p. </span><br><span>Cost Price of 1kg of Type 2 sugar = 7200 p. </span><br><span>Mean Price of 1 kg of mixture = 6450 p. </span><br><span>According to the Rule of Alligation, (Quantity of Cheaper):(Quantity of Dearer) = (CP of dearer - Mean Price):(Mean Price - CP of cheaper) </span><br><span>Therefore, the required ratio = (7200-6450):(6450-6200) = 750:250 = 3:1. </span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60110,
      "question": "<p dir=\"ltr\"><span>A certain quantity of water is mixed with milk priced at Rs 12 per litre. The price of mixture is Rs 8 per litre. Find out the ratio of water and milk in the new mixture.</span><br><span>Assuming the price of water is Rs. 0 per litre. </span></p>",
      "options": [
        "<p><span>3:2</span></p>",
        "<p><span>1:2</span></p>",
        "<p><span>5:2</span></p>",
        "<p><span>2:1</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Cost Price of 1 litre of water = Rs 0. </span><br><span>Cost Price of 1 litre of milk = Rs 12. </span><br><span>Mean Price of Mixture = Rs 8. </span><br><span>According to the Rule of Alligation, (Quantity of Cheaper):(Quantity of Dearer) = (CP of dearer - Mean Price):(Mean Price - CP of cheaper) </span><br><span>Therefore, Water:Milk = (12-8):(8-0) = 4:8 = 1:2.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60111,
      "question": "<p dir=\"ltr\"><span>A drum contains forty liters of whisky. Four liters of whisky is taken out and replaced by soda. This process is carried out twice further. How much whisky is now contained by the container?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>30 Lt</span></p>",
        "<p dir=\"ltr\"><span>29.16 Lt</span></p>",
        "<p dir=\"ltr\"><span>28.70 Lt</span></p>",
        "<p dir=\"ltr\"><span>27.60 Lt</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Suppose a solution contains\u00a0x\u00a0units of a liquid from which\u00a0y\u00a0units are taken out and replaced by water. </span><br/><span>After\u00a0n\u00a0repeated operations, quantity of pure liquid\u00a0remaining in solution\u00a0\u00a0=x(1\u2212y/x)</span><sup><span>n</span></sup><span>\u00a0units.\u00a0</span><br/><span>So, Whisky in the drum now =40(1\u22124/40)</span><sup><span>3</span></sup><span>=40(1\u22121/10)</span><sup><span>3</span></sup><span>\u00a0=29.16.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60112,
      "question": "<p dir=\"ltr\"><span>Rice of rate Rs. 126 per kg and Rs. 135 per kg and 3</span><sup><span>rd</span></sup><span> variety in the ratio 1 : 1 : 2. If the final mixture is worth Rs. 153 per kg, what is the rate of the third variety per kg?</span></p>",
      "options": [
        "<p><span>165.4</span></p>",
        "<p><span>170</span></p>",
        "<p><span>169</span></p>",
        "<p><span>175.5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Rice worth Rs. 126 per kg and Rs. 135 per kg are mixed in the ratio 1 : 1 So their average price&nbsp;=(126+135)/2=130.5. </span><br><span>Now there are two mixtures one of rate 130.5 /kg and another is of rate say x /kg.</span><br><span>Ratio of new mixtures be 2:2 = 1:1.&nbsp;  </span><br><span>so, the final prize (153) = (x+130.5)/2.</span><br><span>153 = (x+130.5)/2  </span><br><span>x = (153)2 - 130.5</span><br><span>x = 306 - 130.5 = 175.5.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60113,
      "question": "<p dir=\"ltr\"><span>A sikanji vendor has two drums of sikanji. The first contains 75% of sikanji. The second contains 50% sikanji. How much sikanji should he mix from each of the drum so as to get twelve litres of sikanji such that the ratio of sikanji to soda is 5 : 3?</span></p>",
      "options": [
        "<p><span>8</span></p>",
        "<p><span>6</span></p>",
        "<p><span>10</span></p>",
        "<p><span>9</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let x litrs from 1</span><sup><span>st</span></sup><span> drum and 12 - x litres from 2</span><sup><span>nd</span></sup><span> drum are mixed.  </span><br><span>Sikanji from 1</span><sup><span>st</span></sup><span> drum = (.75x)  </span><br><span>Soda from 1</span><sup><span>st</span></sup><span> drum = (.25x)  </span><br><span>Sikanji from 2</span><sup><span>nd</span></sup><span> drum = .5(12-x).</span><br><span>Soda from 2</span><sup><span>nd</span></sup><span> drum = .5(12-x)  </span><br><span>Total sikanji = (.25x + 6).  </span><br><span>Total soda = (.25x) + (.5)(12-x) = 6 - (.25x)  </span><br><span>Ratio = (.25x+6)/(6-.25x) = 5/3  </span><br><span>(.75x) + 18 = 30 - (1.25x)  </span><br><span>2x =12  </span><br><span>x= 6ltr </span></p><p dir=\"ltr\"><span>The vendor should mix 6 litre shikanji from 1st drum and 6 litre shikanji from 2nd drum.  </span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60114,
      "question": "<p dir=\"ltr\"><span>There are two drums of vanaspati gee. One of them contains 25% of oil (and rest 75% gee) and the another contains 50% oil  (and rest 50% gee). How much vanaspati gee (approx) should one mix from each of the drum so as to get 14 litres of vanaspati gee such that the ratio of gee to oil is 5 : 2?</span></p>",
      "options": [
        "<p><span>6, 8</span></p>",
        "<p><span>7, 7</span></p>",
        "<p><span>12, 2</span></p>",
        "<p><span>10, 4</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Quantity of Ghee in 1st Drum = 75%  Quantity of Ghee in 2nd Drum = 50%  Total quantity of Ghee required in the final mixture = 14 liters    </span><br><span>Ratio of Ghee to Oil in the final mixture = 5 : 2   ( i-e 500/7 % Ghee )  </span><br><span>By Alligation Rule :   </span></p><p dir=\"ltr\"><span>Quantity of Cheaper mixture /Quantity of Dearer mixture = (Ratio of Dearer mixture - Ratio of final mixture) /   (Ratio of final mixture - Ratio of cheaper mixture) </span></p><p><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20201118224508/alligationGeeks.png\" width=\"762\" height=\"453\" loading=\"auto\"></p><p dir=\"ltr\"><span>Quantity from 2nd drum / Quantity from 1st drum =   (Ratio of  1st Drum - Ratio of final mixture) /   (Ratio of final mixture - Ratio of 2nd mixture) </span><br><span>= (3/4 - 5/7) /( 5/7 - 1/2) </span><br><span>= (1/28) / (3/14)</span><br><span>= 1/6</span><br><span>So, we have to mix Ghee from 1st and 2nd Drum in the ratio of 6 : 1  </span><br><span>Since total quantity of Ghee in the final mixture is 14 liters.   </span><br><span>So, Ghee to be mixed from 1st Drum = 6/7*14 = 12 liters.   </span><br><span>And Ghee to be mixed from 2nd Drum = 1/7*14 = 2 liters.  </span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60115,
      "question": "<p dir=\"ltr\"><span>Two solutions S1 and S2 contain whisky and soda in the ratio 2 : 5 and 6 : 7 respectively. In what ratio these solutions be mixed to get a new solution S3, \u00a0containing whisky and soda in the ratio 5 : 8 ?</span></p>",
      "options": [
        "<p><span>7:9</span></p>",
        "<p><span>21:5</span></p>",
        "<p><span>23:6</span></p>",
        "<p><span>6:23</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the amount taken from S1 be 7x</span><br/><span>And amount taken from S2 be 13y</span><br/><span>(2x + 6y)/(5x + 7y) = 5/8</span><br/><span>16x + 48y = 25x + 35y</span><br/><span>9x = 13y</span><br/><span>x/y = 13/9</span><br/><span>Actual ratios of amounts = 7x/13y</span><br/><span>Actual ratios of amounts = (7/13) * (13/9</span><br/><span>Actual ratios of amounts = 7/9</span></p><p dir=\"ltr\"><span>Alternate Approach (Using Rule fo alligation ): </span></p><p dir=\"ltr\"><span>Ratio of whiskey in first mixture= 2/7 </span><br/><span>Ratio of whiskey in second mixture= 6/13</span><br/><span>Ratio of whiskey in the final mixture = 5/13</span></p><p dir=\"ltr\"><span>Applying to rule of alligation : </span><br/><span>Quantity of cheaper mixture /  Quantity of cheaper mixture = (Ratio of wine in dearer mixture - ratio of wine in final mixture) / ( Ratio of wine in final mixture - ratio of wine in cheaper mixture) </span></p><p><span>= (6/13 - 5/13) / ( 5/13 - 2/7)   </span><br/><span>= (1/13) / (9/91) </span><br/><span>= 7/9</span></p><p dir=\"ltr\"><span>The solution S1 and S2 should be mixed in ratio of 7:9</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60116,
      "question": "<p dir=\"ltr\"><span>8 liters of wine is replaced by water from a pot full of wine and repeated this two more times. The ratio of the wine:total left in pot is 8 : 27.&nbsp;</span><br><span>How much wine was there in the pot originally?</span></p>",
      "options": [
        "<p><span>32</span></p>",
        "<p><span>26</span></p>",
        "<p><span>28</span></p>",
        "<p><span>24</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let initial quantity of wine&nbsp;=x&nbsp;litre&nbsp;</span><br><span>After a total of 1+2=3 operations,&nbsp;</span><br><span>Quantity of wine&nbsp;</span><br><span>x(1\u2212y/x)n&nbsp;</span><br><span>x(1\u22128/x)3&nbsp;</span><br><span>x(1\u22128/x)3 x = 8/27&nbsp;</span><br><span>(1\u22128/x)3 = (2/3)3&nbsp;</span><br><span>(1\u22128/x)=2/3&nbsp;</span><br><span>x=24.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60117,
      "question": "<p dir=\"ltr\"><span>A vessel full of orange juice contains 40% orange pulp. A part of juice is replaced by another juice containing 19% orange pulp and now the percentage of orange pulp is found to be 26%. What quantity of juice is replaced?</span></p>",
      "options": [
        "<p><span>3:2</span></p>",
        "<p><span>5:4</span></p>",
        "<p><span>4:5</span></p>",
        "<p><span>2:3</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Concentration of orange pulp in 1</span><sup><span>st </span></sup><span>vessel = 40% </span><br><span>Concentration of orange pulp in 2</span><sup><span>nd</span></sup><span> vessel = 19% </span><br><span>After the mixing, Concentration of orange pulp in the mixture = 26% By rule of alligation, </span></p><table><thead></thead><tbody><tr><td><p dir=\"ltr\" style=\"text-align: center;\"><span>Concentration of orange pulp in 1st vessel</span></p></td><td><p dir=\"ltr\" style=\"text-align: center;\"><span>Concentration of orange pulp in 2nd vessel</span></p></td></tr><tr><td><p style=\"text-align: center;\"><span>&nbsp; &nbsp; 40%</span></p></td><td><p style=\"text-align: center;\"><span>19%</span></p></td></tr><tr><td colspan=\"2\"><p style=\"text-align: center;\"><span>26%</span></p></td><td style=\"text-align: center;\"></td></tr><tr><td style=\"text-align: center;\"><span>26-19=7</span></td><td><p style=\"text-align: center;\"><span>40-26=14</span></p></td><td></td></tr></tbody></table><p dir=\"ltr\"><span>Hence ratio of 1</span><sup><span>st</span></sup><span> and 2</span><sup><span>nd</span></sup><span> quantities&nbsp;= 7 : 14 = 1 : 2  i.e.,&nbsp;2/(1+2)=2/3&nbsp;part of the juice is replaced.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60118,
      "question": "<p dir=\"ltr\"><span>How many kg of rice, of cost 9 Rs/kg must be mixed with 27 kg of rice of cost 7 Rs/kg get a gain of 10 % by selling the mixture at 9.24 Rs/kg?</span></p>",
      "options": [
        "<p><span>60</span></p>",
        "<p><span>71</span></p>",
        "<p><span>63</span></p>",
        "<p><span>65</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Selling Price(SP) of 1 kg mixture= Rs. 9.24 </span><br><span>Profit = 10% </span><br><span>Cost Price(CP) of 1 kg mixture&nbsp;= 100SP/(100+Profit%) =100*9.24/(100+10) =924/110=8.4  </span><br><span>By rule of alligation, </span></p><table><thead></thead><tbody><tr><td><p dir=\"ltr\" style=\"text-align: center;\"><span>CP of 1 kg rice of 1st kind</span></p></td><td><p dir=\"ltr\" style=\"text-align: center;\"><span>CP of 1 kg rice of 2nd kind</span></p></td></tr><tr><td><p dir=\"ltr\" style=\"text-align: center;\"><span>Rs. 9</span></p></td><td style=\"text-align: center;\"><span>Rs. 7</span></td></tr><tr><td colspan=\"2\"><p dir=\"ltr\" style=\"text-align: center;\"><span>Rs.8.4</span></p></td><td></td></tr><tr><td><p style=\"text-align: center;\"><span>8.4 - 7 = 1.4</span></p></td><td><p style=\"text-align: center;\"><span>9 - 8.4 = 0.6</span></p></td><td></td></tr></tbody></table><p dir=\"ltr\"><span> Ratio = 1.4 : 0.6 = 14 : 6 = 7 : 3 </span><br><span>Suppose&nbsp;x&nbsp;kg of kind1 rice is mixed with 27 kg of kind2 rice. </span><br><span>then&nbsp;x&nbsp;: 27 = 7 : 3 \u21d23x=27\u00d77  \u21d2x=9\u00d77=63.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60119,
      "question": "<p dir=\"ltr\"><span>In what ratio should a kind of sugar at 8.70 Rs/kg be mixed with another kind of sugar at 9.70 Rs/kg so, that the mixture be worth 9 Rs/kg?</span></p>",
      "options": [
        "<p><span>3:7</span></p>",
        "<p><span>4:7</span></p>",
        "<p><span>7:4</span></p>",
        "<p><span>7:3</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>By rule of Allegation, </span></p><table><thead></thead><tbody><tr><td><p dir=\"ltr\" style=\"text-align: center;\"><span>Cost of 1 kg sugar of 1st kind</span></p></td><td style=\"text-align: center;\"><span>Cost of 1 kg sugar of 2nd kind</span></td></tr><tr><td><p style=\"text-align: center;\"><span>8.7</span></p></td><td><p style=\"text-align: center;\"><span>9.70</span></p></td></tr><tr><td colspan=\"2\"><p style=\"text-align: center;\"><span>9</span></p></td></tr><tr><td style=\"text-align: center;\"><span>9.7-9 = .7</span></td><td><p style=\"text-align: center;\"><span>9 - 8.7 = .3</span></p></td></tr></tbody></table><p><span> = 0.7 : 0.3 = 7 : 3</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60120,
      "question": "<p dir=\"ltr\"><span>In what ratio must rice of one kind worth Rs. 50/kg be mixed with another kind of rice of worth Rs. 55/kg such that by selling the mixture at Rs. 57.20/kg, there can be a gain 10%?</span></p>",
      "options": [
        "<p><span>3:4</span></p>",
        "<p><span>4:6</span></p>",
        "<p><span>1:3</span></p>",
        "<p><span>3:2</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SP of 1 kg mixture = Rs. 57.20 </span><br><span>Profit = 10% </span><br><span>CP of 1 kg mixture&nbsp;=100SP/(100+Profit%) &nbsp;=100*57.20/(100+10) =5720/110  =Rs.&nbsp;52  </span><br><span>By rule of allegation  &nbsp; </span></p><table><thead></thead><tbody><tr><td><p dir=\"ltr\" style=\"text-align: center;\"><span>CP of 1 kg rice of 1st kind</span></p></td><td><p dir=\"ltr\" style=\"text-align: center;\"><span>CP of 1 kg rice of 2nd kind</span></p></td></tr><tr><td><p style=\"text-align: center;\"><span>50</span></p></td><td><p style=\"text-align: center;\"><span>55</span></p></td></tr><tr><td colspan=\"2\"><p style=\"text-align: center;\"><span>52</span></p></td><td></td></tr><tr><td><p style=\"text-align: center;\"><span>55 - 52 = 3</span></p></td><td><p style=\"text-align: center;\"><span>52 - 50 = 2</span></p></td><td></td></tr></tbody></table><p dir=\"ltr\"><span> Hence required ratio = 3 : 2</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60121,
      "question": "<p dir=\"ltr\"><span>A drum filled with a mixture of two liquids l1 and l2 in the ratio 5:7. When 9 liters of mixture is taken out and the replaced by l1. Now the ratio of l1 and l2 is 9:7. How many liters of the liquid l1 were there in the drum initially?</span></p>",
      "options": [
        "<p><span>15</span></p>",
        "<p><span>20</span></p>",
        "<p><span>18</span></p>",
        "<p><span>25</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the initial quantity of l1 in the container be 5x.  </span><br><span>Let the initial quantity of l2 in the container be 7x.  </span><br><span>Now, 9 liters of mixture is drawn off from the container.  </span><br><span>Quantity of l1 in 9 liters of the mixture drawn off  =9\u00d75/12=15/4  </span><br><span>Quantity of l2 in 9 liters of the mixture drawn off  =9\u00d77/12=21/4  </span><br><span>Hence,  Quantity of l1 remaining in the mixture after 9 liters is drawn off  =5x\u221215/4  </span><br><span>Quantity of l2 remaining in the mixture after 9 liters is drawn off  =7x\u221221/4  </span><br><span>Since the container is filled with l1 after 9 liters of mixture is drawn off, </span><br><span>quantity of l1 in the mixture  =5x-15/4+9=5x+21/4.   </span><br><span>Given that the ratio of l1 and l2 becomes 9:7 </span><br><span>5x+21/4:7x-21/4=9:7  </span><br><span>20x+21:28x-21=9:7  </span><br><span>7(20x+21)=9(28x-21)  </span><br><span>140x+147=252x-189  </span><br><span>112x=336  </span><br><span>x=3.   </span><br><span>Therefore, liters of l1 present in the container initially  =5x=(5\u00d73)=15.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60122,
      "question": "<p dir=\"ltr\"><span>In what ratio a vendor should mix rice at Rs.60 per kg with rice at Rs. 68 per kg so that the final rice mixture must be of worth Rs. 63 per kg?</span></p>",
      "options": [
        "<p><span>4:5</span></p>",
        "<p><span>5:3</span></p>",
        "<p><span>2:3</span></p>",
        "<p><span>3:2</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>C.P. of 1 kg of rice = Rs. 60 (cheaper rice)</span><br><span>C.P. of 1 kg of rice of 2nd kind = Rs. 68 (dearer rice)</span><br><span>Also, Mean price of the mixture (per kg) = &nbsp;Rs. 63&nbsp;</span><br><span>So, By the rule of alligation,</span><br><span>(Quantity of Cheaper Substance):(Quantity of Dearer Substance) = (CP of dearer substance \u2013 Mean Price):(Mean Price \u2013 CP of cheaper substance)</span><br><span>(Quantity of Cheaper Substance):(Quantity of Dearer Substance) = (CP of dearer rice \u2013 Mean Price):(Mean Price \u2013 CP of cheaper rice)</span><br><span>(Quantity of cheaper rice) : (Quantity of dearer rice) = (68 - 63):(63-60)</span><br><span>(Quantity of cheaper rice) : (Quantity of dearer rice) = 5:3</span><br><span>So, The answer is 5:3</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    },
    {
      "id": 60123,
      "question": "<p dir=\"ltr\"><span>A vessel is filled with a solution of, 3 parts soda and 5 parts rum. How much of the solution must be taken out and replaced with soda so that the solution contains equal amount of soda and rum?</span></p>",
      "options": [
        "<p><span>8/5</span></p>",
        "<p><span>2/5</span></p>",
        "<p><span>1/5</span></p>",
        "<p><span>5/8</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the total solution = 8 litre. </span><br><span>Soda in the solution = 3 litre, </span><br><span>Rum in the solution = 5 litre.  </span><br><span>Say&nbsp;x&nbsp;Lt of the solution is is taken out and replaced with soda. soda in the new solution =3\u2212(3x/8)+x </span><br><span>Quantity of rum in the new mixture =5\u2212(5x/8) soda : rum = 1:1 </span><br><span>3\u2212(3x/8)+x = 5\u2212(5x/8)  </span><br><span>x=8/5  if the quantity of the solution is 8 litre,&nbsp;</span><br><span>8/5&nbsp;litre of the solution needs to be taken out and replaced with soda so that the solution contains equal amount of soda and rum. </span><br><span>1/5</span><sup><span>th</span></sup><span> of the solution needs to be taken out and replaced with soda so that the solution contains equal amount of soda and rum.</span></p>",
      "tag": "Mixture and Alligations || MCQ"
    }
  ],
  "Simple Interest": [
    {
      "id": 60124,
      "question": "<p dir=\"ltr\"><span>A sum amounts to Rs 1065 at simple interest rate of 7.5% per annum after 3 years. Find the sum.</span></p>",
      "options": [
        "<p><span>878.40</span></p>",
        "<p><span>869.38</span></p>",
        "<p><span>869.28</span></p>",
        "<p><span>783.20</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the required sum be x. Then,&nbsp;</span><br><span>Simple interest = (x \u00d7 3 \u00d7 7.5 /100) = Rs 22.5x/100.&nbsp;</span><br><span>Amount = (x + 22.5x/100) = Rs 122.5x/100.&nbsp;</span><br><span>Therefore, 122.5x/100 = 1065 </span><br><span>122.5x = 1065 \u00d7 100 </span><br><span>x = 106500/122.5</span><br><span>x = 869.38</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60125,
      "question": "<p dir=\"ltr\"><span>James deposits a sum of Rs 800 that will amount to Rs 920 in 3 years. However, the bank decides to increase the interest rate by 4%. What amount will he receive now?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 1015</span></p>",
        "<p dir=\"ltr\"><span>Rs 1016</span></p>",
        "<p dir=\"ltr\"><span>Rs 1025</span></p>",
        "<p dir=\"ltr\"><span>Rs 1102</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>James gets simple interest (SI) = Rs 920-800 = Rs 120.&nbsp;</span><br><span>Here, Principal (P) = Rs 800 and Time (T) = 3 years.&nbsp;</span><br><span>We know, Rate (R) = (100 \u00d7 SI)/(P \u00d7 T) = (100 \u00d7 120)/(800 \u00d7 3) = 5%.&nbsp;</span><br><span>Given, New Rate = 9%. </span><br><span>So, New Interest = P\u00d7R\u00d7T = 800\u00d7(0.09)\u00d73 = Rs 216.&nbsp;</span><br><span>Therefore, James will get Rs (800+216) = Rs 1016.</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60126,
      "question": "<p dir=\"ltr\"><span>What will be the simple interest on Rs 70,000 at 50/3 % per annum after 9 months?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 8750</span></p>",
        "<p dir=\"ltr\"><span>Rs 8745</span></p>",
        "<p dir=\"ltr\"><span>Rs 8678</span></p>",
        "<p dir=\"ltr\"><span>Rs 8555</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given, Principal (P) = Rs 70000, </span><br><span>Rate (R) = 50/3 % per annum </span><br><span>and Time (T) = 9/12 = 3/4 years. </span><br><span>Simple Interest (SI) = (P \u00d7 R \u00d7 T) /100= (70000 \u00d7 (50/3) \u00d7 (3/4))/100 = Rs 8750.</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60127,
      "question": "<p dir=\"ltr\"><span>Find out the simple interest if Harry invests an amount of Rs 15800 for 9 months at the rate of 25/4 % per annum.&nbsp;</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs 740.54</span></p>",
        "<p dir=\"ltr\"><span>Rs 745.63</span></p>",
        "<p dir=\"ltr\"><span>Rs 742.63</span></p>",
        "<p dir=\"ltr\"><span>Rs 740.63</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given, Principal = 15800. </span><br><span>Rate = 25/4 % per annum. </span><br><span>Time = 9/12 = 3/4 years. </span><br><span>Hence, SI = 15800 \u00d7 (25/400) \u00d7 (9/12) = Rs 740.63.</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60128,
      "question": "<p dir=\"ltr\"><span>After lending out an amount of Rs.9600 at a rate of 9/2 % per annum for a 1 year and 9 months, what was the S.I earned ?&nbsp;</span></p>",
      "options": [
        "<p><span>677</span></p>",
        "<p><span>756</span></p>",
        "<p><span>765</span></p>",
        "<p><span>625</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given that, principal = P = Rs.9600, </span><br><span>R = 9/2 % and T = 1 year and 9 months = 1 + 9/12 year = 7/4 years.</span><br><span>Now, we have to find the S.I for 7/4 years.</span><br><span>S.I = PRT/100 = Rs. 9600 x 9/2 x 7/4 x 1/100 = 12 x 9 x 7 = 756</span><br><span>Hence, the required S.I amount is Rs.756</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60129,
      "question": "<p dir=\"ltr\"><span>Find the amount of S.I received by Ram after getting Rs.3360 at 25/4 % per annum for 9 months.</span></p>",
      "options": [
        "<p><span>156.5</span></p>",
        "<p><span>153.2</span></p>",
        "<p><span>168.5</span></p>",
        "<p><span>157.5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>S.I = P \u00d7 R \u00d7 T/100&nbsp;</span><br><span>S.I = (3360 \u00d7 25/4 \u00d7 3/4)/100 = 2.1 \u00d7 25 \u00d7 3&nbsp;</span><br><span>S.I = Rs. 157.5</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60130,
      "question": "<p dir=\"ltr\"><span>Ram has an amount of Rs. 9000. How much time will it take to earn 1620 as S.I at a rate of 4.5% per annum?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2 Years</span></p>",
        "<p dir=\"ltr\"><span>1 Years</span></p>",
        "<p dir=\"ltr\"><span>5 Years</span></p>",
        "<p dir=\"ltr\"><span>4 Years</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SI = (P x R x T) /100 </span><br><span>T = S.I x 100/P x R = 1620 x 100/9000 x 4.5 = 4 Years</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60131,
      "question": "<p dir=\"ltr\"><span>At what rate of SI, a sum of Rs.7000 amounts to Rs.7700 in 2 years?</span></p>",
      "options": [
        "<p><span>5.5%</span></p>",
        "<p><span>6.5%</span></p>",
        "<p><span>6%</span></p>",
        "<p><span>5%</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SI= 7700-7000 = 700 </span><br><span>700 = 7000 \u00d7 R \u00d7 2/100 </span><br><span>R = 70000/14000 = 5%</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60132,
      "question": "<p dir=\"ltr\"><span>Find the simple interest on Rs.300 for 6 months at 10%  per annum.</span></p>",
      "options": [
        "<p><span>20</span></p>",
        "<p><span>15</span></p>",
        "<p><span>17</span></p>",
        "<p><span>13</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SI = 300 \u00d7 10 \u00d7 (6/12)/100 </span><br><span>SI = 15</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60133,
      "question": "<p dir=\"ltr\"><span>A sum of Rs. 468.75 was lent out on simple interest. At the end of 5/3 years, the S.I earned is Rs. 31.25. Find the rate of interest per annum.  </span></p><p dir=\"ltr\"><span>choose the correct option:</span></p>",
      "options": [
        "<p><span>5</span></p>",
        "<p><span>4</span></p>",
        "<p><span>4.25</span></p>",
        "<p><span>6</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>R=SI\u00d7100/P\u00d7T = (31.25 \u00d7 100)/(468.75 \u00d7 5/3) = 4</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60134,
      "question": "<p dir=\"ltr\"><span>In what time will Rs.8500 pay an amount of Rs. 7267.50 as S.I at 4.5 per cent per annum?</span></p>",
      "options": [
        "<p><span>19</span></p>",
        "<p><span>20</span></p>",
        "<p><span>18</span></p>",
        "<p><span>21</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SI=P\u00d7R\u00d7T/100</span><br><span>T = SI \u00d7 100/(P \u00d7 R)</span><br><span>T = 7267.50 \u00d7 100/(8500 \u00d7 4.5)</span><br><span>T = 19 years.</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60135,
      "question": "<p dir=\"ltr\"><span>The SI on a sum is 1/4</span><sup><span>th</span></sup><span> of the principal, and the duration(in years) is equal to the rate per cent per annum. Find the rate per cent.</span></p>",
      "options": [
        "<p><span>5</span></p>",
        "<p><span>11/10</span></p>",
        "<p><span>10</span></p>",
        "<p><span>11</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SI= P\u00d7R\u00d7T/100 </span><br><span>R=SI \u00d7 100/(P \u00d7 T)  = (P/4)\u00d7100/P\u00d7R </span><br><span>R</span><sup><span>2</span></sup><span> = 100/4 </span><br><span>R=5</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60136,
      "question": "<p dir=\"ltr\"><span>The rate of interest for the first 2 yrs is 3% per annum, for the next 3 years is 8% per annum and for the period beyond 5 years 10% per annum.  A person deposited some money 6 years back. Now he earns an interest of RS. 1520. What money did he deposit?</span></p>",
      "options": [
        "<p><span>3600</span></p>",
        "<p><span>5000</span></p>",
        "<p><span>3800</span></p>",
        "<p><span>4100</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say Deposited money is P.</span><br><span>1520 = P \u00d7 3 \u00d7 2/100 + P \u00d7 8 \u00d7 3/100 + P \u00d7 10 \u00d7 1/100</span><br><span>1520 = P \u00d7 40/100</span><br><span>P = 1520 \u00d7 100/ 40</span><br><span>P = 3800.</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60137,
      "question": "<p dir=\"ltr\"><span>A sum of money doubles itself in 6 years at simple interest. What is the rate of interest?</span></p>",
      "options": [
        "<p><span>16.66</span></p>",
        "<p><span>15.55</span></p>",
        "<p><span>14.44</span></p>",
        "<p><span>16.22</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SI = P</span><br><span>P = P \u00d7 R \u00d7 6/100</span><br><span>R= 16.66 %</span></p>",
      "tag": "Simple Interest || MCQ"
    },
    {
      "id": 60138,
      "question": "<p dir=\"ltr\"><span>A certain amount was lent at a rate R for 2 yrs at SI. If it been put at 3% higher rate, it would have fetched Rs 300 more. Find the amount?</span></p>",
      "options": [
        "<p><span>5500</span></p>",
        "<p><span>6000</span></p>",
        "<p><span>5000</span></p>",
        "<p><span>4500</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>SI = P \u00d7 R \u00d7 2/100...........(1)</span><br><span>SI+300 = P\u00d7(R+3) \u00d7 2/100.....(2)</span><br><span>P=5000</span></p>",
      "tag": "Simple Interest || MCQ"
    }
  ],
  "Compound Interest": [
    {
      "id": 60139,
      "question": "<p dir=\"ltr\"><span>An amount of Rs.9000 is invested for 2 years at interest rate of 15% per annual and compounded annually. At the end of 2nd year how much amount will be obtained as interest?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs. 2902.50</span></p>",
        "<p dir=\"ltr\"><span>Rs. 2900.50</span></p>",
        "<p dir=\"ltr\"><span>Rs. 2899.50</span></p>",
        "<p dir=\"ltr\"><span>Rs. 2899</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Amount = P[1+ (R/100)]</span><sup><span>n</span></sup><span>&nbsp;</span><br><span>where P = principal, R = rate of interest and n = time(years)</span><br><span>Amount= Rs.9000 \u00d7 [1 + (15/100)]</span><sup><span>n</span></sup><span> = 9000 \u00d7 (23/20)</span><sup><span>n</span></sup><span> = 23805/2 = Rs.11902.5</span><br><span>The amount obtained by the way of interest in compound interest = Amount - principal = Rs.(11902.5 - 9000) = Rs.2902.50</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60140,
      "question": "<p dir=\"ltr\"><span>Ram deposits Rs.2000 each on 1</span><sup><span>st</span></sup><span> January and 1</span><sup><span>st</span></sup><span> July of a year at the rate of 8% compound interest calculated on half-yearly basis. At the end of the year how much amount he would have?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs.4215.50 </span></p>",
        "<p dir=\"ltr\"><span>Rs.4182.40</span></p>",
        "<p dir=\"ltr\"><span>Rs.4243.20</span></p>",
        "<p dir=\"ltr\"><span>Rs.4280.40</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We can break this problem into two parts: Rs. 1500 invested for 1 year (Jan to Dec) and Rs. 2000 invested for 6 months (Jul to Dec)</span><br><span>When interest is compounded Half-yearly: </span><br><span>Amount = P[1+ (R/2)/100 ]</span><sup><span>2n</span></sup><br><span>The total amount for the investment on 1</span><sup><span>st</span></sup><span> Jan is: Amount1 = Rs. 2000 \u00d7 [1+ (8/2)/100]</span><sup><span>2\u00d71</span></sup><span> = Rs. 2000 \u00d7 [1 + (4/100)]</span><sup><span>2</span></sup><span> = Rs. 2000 \u00d7 [26/25]</span><sup><span>2</span></sup><span> </span><br><span>The total amount for investment on 1</span><sup><span>st</span></sup><span> july is: Amount2 = Rs. 2000 \u00d7 [1+ (8/2)/100][2 \u00d7 (1/2)] = Rs. 2000 \u00d7 [1+ 4/100 ] = Rs. 2000 \u00d7 [26/25] </span><br><span>The total amount at the end of the year = amount1 + amount2 = 2000 \u00d7 [26/25]</span><sup><span>2</span></sup><span> + 2000 \u00d7 [26/25] = 2000 \u00d7 [26/25] \u00d7 [(26/25) + 1] = 2000 \u00d7 26/25 \u00d7 51/25 = 4243.20</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60141,
      "question": "<p dir=\"ltr\"><span>Ram invests Rs. 10,000 for 1 year at a rate of 10% per annum compounded yearly and Sita invests the same amount for same time at same rate per annum compounded half yearly. What is the difference between the interests earned by both?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rs. 25.50</span></p>",
        "<p dir=\"ltr\"><span>Rs. 25</span></p>",
        "<p dir=\"ltr\"><span>Rs.20.50</span></p>",
        "<p dir=\"ltr\"><span>Rs.23.75</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>For Ram: Amount = 10000\u00d7[1 + 10/100]</span><sup><span>1</span></sup><span> = Rs.10000 \u00d7 11/10 = Rs.11000&nbsp;</span><br><span>For Sita: Amount= Rs. 10000\u00d7[1 +(10/2)/100]</span><sup><span>2</span></sup><span> = 10000 \u00d7 (21/20)</span><sup><span>2</span></sup><span> = Rs.11025&nbsp;</span><br><span>Difference = Rs.(11000-11025) = Rs.25</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60142,
      "question": "<p dir=\"ltr\"><span>Sagar has a sum of Rs.8000. He lends it for 20% per annum at compound interest. In how much time the sum of the amount will be Rs.13824?</span></p>",
      "options": [
        "<p><span>2</span></p>",
        "<p><span>1</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>3824 = 8000 \u00d7 (1 + 20/100)</span><sup><span>n</span></sup><br><span>13824/8000 = (120/100)</span><sup><span>n</span></sup><br><span>(24/20)</span><sup><span>3</span></sup><span> = (12/10)</span><sup><span>n</span></sup><br><span>(12/10)</span><sup><span>3</span></sup><span> = (12/10)</span><sup><span>n</span></sup><br><span>n = 3 years</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60143,
      "question": "<p dir=\"ltr\"><span>Find the interest returned for an investment of Rs.5,000 after 2 years, if the rate of interest for the 1st year is 5% and for the 2nd year is 10%.</span></p>",
      "options": [
        "<p><span>772</span></p>",
        "<p><span>775</span></p>",
        "<p><span>622</span></p>",
        "<p><span>820</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Amount = (Principal + Compound interest) = P(1 + R1/100)(1 + R2/100)(1 + R3/100)</span><br><span>Amount = 5000(1 + 5/100)(1 + 10/100)</span><br><span> = 5000 \u00d7  (21/20)(11/10)</span><br><span> = 5000 \u00d7  (231/200)</span><br><span> =5775</span><br><span> Interest = 5775 - 5000 = 775</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60144,
      "question": "<p dir=\"ltr\"><span>What sum will be amount to Rs.30000 at CI in 3 years, if the rate of interest for 1</span><sup><span>st</span></sup><span>, 2</span><sup><span>nd</span></sup><span> and 3</span><sup><span>rd</span></sup><span> year being 10%, 20% and 30% respectively? </span></p>",
      "options": [
        "<p><span>17482.5</span></p>",
        "<p><span>20145</span></p>",
        "<p><span>16524</span></p>",
        "<p><span>17000</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let Rs.P be the required sum.</span><br><span> 30000= p(1 + 10/100)(1 + 20/100)(1 + 30/100)</span><br><span> = p (110/100) \u00d7  (120/100) \u00d7  (130/100)</span><br><span> p = 30000 \u00d7  100 \u00d7  100 \u00d7  100 / (110 \u00d7  120 \u00d7  130)</span><br><span> p = 17482.5</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60145,
      "question": "<p dir=\"ltr\"><span>What will be the amount if Rs.10,00,000 is invested at CI for 3 years at a rate of interest 10%, 11% and 12% respectively? </span></p>",
      "options": [
        "<p><span>1367520</span></p>",
        "<p><span>1367602</span></p>",
        "<p><span>1367420</span></p>",
        "<p><span>1365520</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Amount = p(1 + R1/100)(1 + R2/100)(1 + R3/100)</span><br><span> = 10,00,000 \u00d7 (1 + 10/100)\u00d7(1 + 11/100)\u00d7(1 + 12/100)</span><br><span> = 10,00,000 \u00d7 (110/100) \u00d7 (111/100) \u00d7 (112/100)</span><br><span> = 110 \u00d7 111 \u00d7 112 = 1367520.</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60146,
      "question": "<p dir=\"ltr\"><span>An amount of Rs.9600 lent out at a rate of 4.5 % per annum for a 1 year and 9 months. At the end of the period, the amount he earned was:</span></p>",
      "options": [
        "<p><span>10450.69</span></p>",
        "<p><span>10368.7</span></p>",
        "<p><span>10465.69</span></p>",
        "<p><span>10555.69</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Amount = 9600 \u00d7 (1+(4.5)/100)</span><sup><span>7/4</span></sup><span> = 10368.7103188.</span></p><p dir=\"ltr\"><span>So, option (B) is correct.</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60147,
      "question": "<p dir=\"ltr\"><span>An amount of Rs.8000 is lended out for 2 years at compound interest rate 5 %  per annum. How much interest will be incurred on maturity of the FD?</span></p>",
      "options": [
        "<p><span>850</span></p>",
        "<p><span>832</span></p>",
        "<p><span>800</span></p>",
        "<p><span>820</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>CI = 8000(1+5/100)</span><sup><span>2</span></sup><span> \u2013 8000</span><br><span>= 8000(105/100)</span><sup><span>2</span></sup><span> \u2013 8000</span><br><span>= 8000 [(105/100)</span><sup><span>2</span></sup><span> -1]</span><br><span>= 8000 [1.1025-1]</span><br><span>= 8000 \u00d7 0.1025</span><br><span>CI = 820.</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60148,
      "question": "<p dir=\"ltr\"><span>An amount of Rs.1500 is invested at 10% per annum for one year. If the interest is compounded half-yearly, then what amount will be received at the end of the year?</span></p>",
      "options": [
        "<p><span>1652.20</span></p>",
        "<p><span>1642.50</span></p>",
        "<p><span>1652.7</span></p>",
        "<p><span>1653.75</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Amount = 15000[1+(10/2)/100]</span><sup><span>2</span></sup><br><span>= 1500[105/100]</span><sup><span>2</span></sup><br><span>= 1500 X 1.1025</span><br><span>= 1653.75</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60149,
      "question": "<p dir=\"ltr\"><span>Find the compound interest on Rs. 15,000 for 9 months at 16% per annum compounded quarterly.</span></p>",
      "options": [
        "<p><span>1872.96</span></p>",
        "<p><span>1972.96</span></p>",
        "<p><span>2072.96</span></p>",
        "<p><span>2172.96</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>CI = 15000[1+(16/4)/100]</span><sup><span>4X(9/12)</span></sup><span> -15000</span><br><span>     = 15000[104/100]</span><sup><span>3</span></sup><span> - 15000</span><br><span>     =  15000 [1.125-1] </span><br><span>     = 15000 X 0.125</span><br><span>     = 1872.96</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60150,
      "question": "<p dir=\"ltr\"><span>An amount of 200000 is deposited in bank under a scheme which provides 10% rate 1st years, 20% rate 2nd year and 5% rate 3rd year. After 3rd year what amount will be returned?</span></p>",
      "options": [
        "<p><span>277400</span></p>",
        "<p><span>277220</span></p>",
        "<p><span>277200</span></p>",
        "<p><span>277320</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Amount = 200000 (1+10/100)(1+20/100)(1+5/100)</span><br><span>Amount = 200000(110/100)(120/100)(105/100)</span><br><span>Amount = 277200.</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60151,
      "question": "<p dir=\"ltr\"><span>A sum of money is borrowed and paid back in two annual installments of Rs. 882 each allowing 5% compound interest. The sum borrowed was:</span></p>",
      "options": [
        "<p><span>1540</span></p>",
        "<p><span>1640</span></p>",
        "<p><span>1580</span></p>",
        "<p><span>1680</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Principal = Present worth of the installment at the end of first year + Present worth of the installment at the end of second year .</span><br><span>Principal = 882/(1 + 5%) + 882/(1 + 5%)</span><sup><span>2</span></sup><span> </span><br><span>Principal = 882/(1 + 5/100) + 882/(1 + 5/100)</span><sup><span>2</span></sup><span> </span><br><span>Principal = 882/(105/100) + 882/(105/100)</span><sup><span>2</span></sup><span> </span><br><span>Principal = 882/(21/20) + 882/(21/20)</span><sup><span>2</span></sup><span> </span><br><span>Principal = 882 \u00d7 20/21 + 882 \u00d7 400/441 </span><br><span>Principal = 42 \u00d7 20 + 2 \u00d7 400 </span><br><span>Principal = 840 + 800 = 1640.</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60152,
      "question": "<p dir=\"ltr\"><span>The least number of complete years in which a sum of money put out at 20% compound interest will be more than doubled is:</span></p>",
      "options": [
        "<p><span>6</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>",
        "<p><span>3</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the Principal be P. </span><br><span>Then,  P(1 + 20%)^n &gt; 2P </span><br><span>Or, P(1 + 1/5)^n &gt; 2P </span><br><span>Or, P(6/5)^n &gt; 2P </span><br><span>Or (6/5)^n &gt; 2. </span><br><span>Now,  (6/5)^3 = 1.728 (6/5)^4 = 2.074 </span><br><span>Therefore, in 4 years.</span></p>",
      "tag": "Compound Interest || MCQ"
    },
    {
      "id": 60153,
      "question": "<p dir=\"ltr\"><span>The difference between compound interest and simple interest on an amount of Rs 15,000 for 2 years is Rs 96. What is the rate of interest per annum?</span></p>",
      "options": [
        "<p><span>8</span></p>",
        "<p><span>9</span></p>",
        "<p><span>10</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Simple Interest = 15000 \u00d7 R/100 \u00d7 2 </span><br><span>Compound Interest = 15000 \u00d7 (1 + R/100)</span><sup><span>2</span></sup><span> - 15000 </span><br><span>We have, [ 15000 \u00d7 (1 + R/100)</span><sup><span>2</span></sup><span> - 15000 ] - [15000 \u00d7 R/100 \u00d7 2] = 96 </span><br><span>15000 [ (1 + R/100)</span><sup><span>2</span></sup><span> - 1 - 2R/100 ] = 96 </span><br><span>15000 [ 1 + R</span><sup><span>2</span></sup><span>/10000 + 2R/100 - 1 - 2R/100 ] = 96 </span><br><span>15000 [ R</span><sup><span>2</span></sup><span>/10000 ] = 96 </span><br><span>R</span><sup><span>2</span></sup><span> = 96 \u00d7 10000/15000 = </span><br><span>96 \u00d7 2/3 = 64 = R</span><sup><span>2</span></sup><br><span> R = 8.</span></p>",
      "tag": "Compound Interest || MCQ"
    }
  ],
  "Time, Speed, and Distance": [
    {
      "id": 60154,
      "question": "<p dir=\"ltr\"><span>The ratio of the speed of two trains is 7:8. If the second train covers 400 km in 4 h, find out the speed of the first train.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>69.4 km/h</span></p>",
        "<p dir=\"ltr\"><span>78.6 km/h</span></p>",
        "<p dir=\"ltr\"><span>87.5 km/h</span></p>",
        "<p dir=\"ltr\"><span>40.5 km/h</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the speed of the two trains be 7x and 8x. </span><br><span>Then, 8x = 400 / 4 </span><br><span>8x = 100 \u21d2 x = 12.5 km/h. </span><br><span>Hence, speed of the first train = 7x = 7 \u00d7 12.5 = 87.5 km/h.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60155,
      "question": "<p dir=\"ltr\"><span>Peter and Beckon start to walk in the same direction together. If Peter's speed is 5 km/h and Beckon's speed is 6 km/h, find out the time duration after which they are 17 km apart if peter was 3 km behind Beckon at the time of starting.</span></p>",
      "options": [
        "<p><span>14</span></p>",
        "<p><span>15</span></p>",
        "<p><span>19</span></p>",
        "<p><span>20</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In 1 hour Peter covers 5 km and Beckon covers 6 km. So, they get 1 km apart in every 1 hour. </span><br><span>At the time of start they were 3 Km apart</span></p><p dir=\"ltr\"><span>Therefore, to get apart 17km they will have to travel 17 - 3 = 14 Hours.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60156,
      "question": "<p dir=\"ltr\"><span> If Mandeep can give a start of 50 m of distance or 10 s of time to Somesh in a race of 1000 meters and finish the race 10 seconds before Somesh.  How much time Mandeep will take to cover the 1000 meters?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>190 sec</span></p>",
        "<p dir=\"ltr\"><span>200 sec</span></p>",
        "<p dir=\"ltr\"><span>240 sec</span></p>",
        "<p dir=\"ltr\"><span>180 sec</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>That means Somesh takes 10 sec to cover 50 meters </span><br><span>Somesh will cover 1000 meters in 200 sec</span><br><span>Mandeep is giving a start of 10 sec and finishes the race 10 seconds before Somesh . means Mandeep will take 20 sec less than Somesh to cover 1000 m.</span><br><span>so, Time taken by Mandeep to cover 1000 m is 180 sec. </span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60157,
      "question": "<p dir=\"ltr\"><span>A train\u2019s speed including stoppages, is 10 m/sec and 15 m/sec excluding stoppages. For how many seconds&nbsp;does the train stop per minute?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>10 sec</span></p>",
        "<p dir=\"ltr\"><span>15 sec</span></p>",
        "<p dir=\"ltr\"><span>20 sec</span></p>",
        "<p dir=\"ltr\"><span>8 sec</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>speed of the train excluding stoppages = 15 m/sec  </span><br><span>speed of the train including stoppages = 10 m/sec  </span><br><span>Loss in speed when including stoppages = 15-10 = 5 m/sec  </span><br><span>In 1 second, train covers 5 m less due to stoppages  </span><br><span>Hence, time that the train stop per second = time taken to cover 5 m  =distance/speed=5/15 sec =1/3 sec  </span><br><span>So, in 1 sec it stops for 1/3 sec </span><br><span>In 60 sec it will stop for 60/3 = 20 sec.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60158,
      "question": "<p dir=\"ltr\"><span>A boy takes 5 hours 45 min to walk from home to school come back by auto. He would have gained 2 hours by taking auto both ways. How much time would he take, to walk both ways?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>6 hrs 30 min</span></p>",
        "<p dir=\"ltr\"><span>7 hrs 45  min</span></p>",
        "<p dir=\"ltr\"><span>7 hrs 33 min</span></p>",
        "<p dir=\"ltr\"><span>6 hrs 55 min</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the distance be x km.  (Time taken to walk x km) + (Time taken to come back by auto x km)  = 5 hour 45 = 23/4&nbsp;hour &nbsp;-----------------(1)   </span><br><span>both ways auto is taken time(for 2x km) = 5 hour 45 min - 2 =&nbsp;15/4&nbsp;hour ------(2)  </span><br><span>(Time taken to walk 2x km)+ (Time taken to ride 2x km) =&nbsp;23/2&nbsp;hour &nbsp;</span><br><span>Time taken to walk 2x km=23/2\u221215/4  =&nbsp;7&nbsp;hours 45 minutes.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60159,
      "question": "<p dir=\"ltr\"><span>Walking 3/4</span><sup><span>th</span></sup><span> of his speed, a person is 10 sec late to his office. Find his usual time to cover the distance?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>40 sec</span></p>",
        "<p dir=\"ltr\"><span>25 sec</span></p>",
        "<p dir=\"ltr\"><span>45 sec</span></p>",
        "<p dir=\"ltr\"><span>30 sec</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Say distance =x meters</span><br><span>usually he takes t sec</span><br><span>usual speed v = x/t m/sec ---------(1)</span><br><span>3v/4 = x/(t+10) ---------------(2)</span><br><span>By  using(1)/(2)</span><br><span>4/3 = (t+10)/t</span><br><span>t =30 sec</span><br></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60160,
      "question": "<p dir=\"ltr\"><span>The speed of a child while going to school is 2 kmph and returns to the village at a speed of 3 kmph. If he takes 5 hrs in all, what is the distance between the village and the school?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4 Km</span></p>",
        "<p dir=\"ltr\"><span>6 Km</span></p>",
        "<p dir=\"ltr\"><span>8 Km</span></p>",
        "<p dir=\"ltr\"><span>10 Km</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the required distance be x km. </span><br><span>Then time taken during the first journey = x/2 hr. </span><br><span>and time taken during the second journey = x/3 hr. </span><br><span>x/3 + x/2 = 5 </span><br><span> (2x + 3x) / 6 = 5  </span><br><span>5x = 30. </span><br><span>x = 6 Required distance = 6 km.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60161,
      "question": "<p dir=\"ltr\"><span>A car completes a journey in 10 hrs, the first half at 11 kmph and the second half at 14kmph. Find the total distance covered?</span></p>",
      "options": [
        "<p><span>120.5</span></p>",
        "<p><span>123.2</span></p>",
        "<p><span>130.4</span></p>",
        "<p><span>134.5</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Average speed = 2V1\u00d7V2/(V1+V2)</span><br><span> = 2\u00d711\u00d714/25</span><br><span> Distance = (22\u00d714/25)\u00d710</span><br><span> = 44\u00d714/5</span><br><span> = 123.2 km.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60162,
      "question": "<p dir=\"ltr\"><span>A train covers a journey of 4 stations connected to form a square at speeds of 20, 40, 60 and 80 km/hr. What is the average speed of train for this journey?</span></p>",
      "options": [
        "<p><span>38.4</span></p>",
        "<p><span>100</span></p>",
        "<p><span>80.4</span></p>",
        "<p><span>160</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Speed = distance/time  </span><br><span>Say, side of square = y km  </span><br><span>time T</span><sub><span>1</span></sub><span> = y/20  </span><br><span>T</span><sub><span>2</span></sub><span> = y/40, T</span><sub><span>3</span></sub><span> = y/60 and T</span><sub><span>4</span></sub><span> = y/80  </span><br><span>Total time = (12+6+4+3)y/240  </span><br><span>speed = total distance/total time  = 4y/(T</span><sub><span>1</span></sub><span> +T</span><sub><span>2</span></sub><span> +T</span><sub><span>3</span></sub><span> +T</span><sub><span>4</span></sub><span>) = 4y\u00d7240/25y = 38.4 km/hr</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60163,
      "question": "<p dir=\"ltr\"><span>A car covers a distance of 450m in 90 secs. What is the speed in km/hr?</span></p>",
      "options": [
        "<p><span>20</span></p>",
        "<p><span>5</span></p>",
        "<p><span>10</span></p>",
        "<p><span>18</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Speed = distance/time  = 450m/90sec = 5m/sec  = (5\u00d760\u00d760)/(1000) = 18 Km/hr.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60164,
      "question": "<p dir=\"ltr\"><span>Samuel covers the distance from his home to his office at a speed of 25 km/hr and comes back at a speed of 4 km/hr. He completes the whole journey within 5 hours 48 minutes. Find out the distance from his home to office:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>20 km</span></p>",
        "<p dir=\"ltr\"><span>18 km</span></p>",
        "<p dir=\"ltr\"><span>15 km</span></p>",
        "<p dir=\"ltr\"><span>25 km</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let d be the distance between office and home, and speed of travelling to office and back to home be x and y respectively.</span></p><p dir=\"ltr\"><span>Time taken to go from home to office at speed x is:</span><br><span>t</span><sub><span>1 </span></sub><span>= d/x\u200b</span></p><p dir=\"ltr\"><span>Time taken to return from office to home at speed y is:</span><br><span>t</span><sub><span>2 </span></sub><span>= d/y\u200b</span></p><p dir=\"ltr\"><span>Average Speed = Total Travelled Distance/Total Time Taken = </span>[Tex]\\frac{d + d}{t_1 + t_2} [/Tex]</p><p dir=\"ltr\"><span>Thus, Average Speed </span>[Tex]= \\frac{2d}{\\frac{d}{x} + \\frac{d}{y}} = \\frac{2d}{d\\left(\\frac{1}{x} + \\frac{1}{y}\\right)}= \\frac{2}{\\left(\\frac{x + y}{xy}\\right)} =\\frac{2xy}{x + y}[/Tex]</p><p dir=\"ltr\"><span>Average Speed = (2&nbsp;\u00d7 25 \u00d7 4) / (25 + 4) = 200/29 km/hr (putting given values in the formula) </span></p><p dir=\"ltr\"><span>He covers the whole journey in 5 hours 48 minutes = 5\u2158 = 29/5 hrs </span></p><p dir=\"ltr\"><span>Therefore, total distance covered = (200/29&nbsp;\u00d7 29/5) = 40 km </span></p><p dir=\"ltr\"><span>So, the distance from his home to office = 40/2 = 20 km.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60165,
      "question": "<p dir=\"ltr\"><span>Max completes his journey at an average speed of 9 km/h. He covers the first 9 km at a speed of 6 km/h and he takes 1\u00b75 hours to cover the remaining distance. Find out the speed at which he covered the remaining distance.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>11 km/h</span></p>",
        "<p dir=\"ltr\"><span>12 km/h</span></p>",
        "<p dir=\"ltr\"><span>13 km/h</span></p>",
        "<p dir=\"ltr\"><span>15 km/h</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the required speed be x km/h. </span><br><span>Total time taken to finish his journey = (9/6 + 1\u00b75) = 3 hours. </span><br><span>Total distance = 9 + 1\u00b75x km. Given, average speed = 9 km/h. </span><br><span>Therefore, (9 + 1\u00b75x)/3 = 9 \u21d2 9 + 1\u00b75x = 27 \u21d2 1\u00b75x = 18 \u21d2 x = 12 km/h.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60166,
      "question": "<p dir=\"ltr\"><span>Rajdhani Express halts for 3 minutes every time it covers a distance of 75 km. If the train runs at a speed of 100 km/h and the destination is 600 km away from the source, find out the time taken to reach the destination station from the source station.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>6 h 23 min</span></p>",
        "<p dir=\"ltr\"><span>6 h 22 min</span></p>",
        "<p dir=\"ltr\"><span>6 h 21 min</span></p>",
        "<p dir=\"ltr\"><span>6 h 24 min</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since the train runs at a speed of 100 km/h, the time taken to cover 600 km = 600/100 = 6 h. </span><br><span>Number of times the train halts = 600/75 - 1 = 7. Since the train halts for 3 minutes at each stop, </span><br><span>the time spent waiting = 7 * 3 = 21 min. Therefore, total time taken = 6 h 21 min.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60167,
      "question": "<p dir=\"ltr\"><span>Paul has to travel 24 km. After walking for 1 hour 40 minutes he sees that he has covered 5/7 of the distance left to cover. Find out Paul\u2019s speed in meters per second.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>5/3 m/s</span></p>",
        "<p dir=\"ltr\"><span>7/5 m/s</span></p>",
        "<p dir=\"ltr\"><span>2/3 m/s</span></p>",
        "<p dir=\"ltr\"><span>8/5 m/s</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the required speed be x km/hr. </span><br/><span>Distance covered by Paul in 1 hr 40 min = x \u00d7 100/60 = 5x/3 km. </span><br/><span>Remaining distance = (24 - 5x/3) km. </span><br/><span>Therefore, 5x/3 = 5/7 \u00d7 (24 - 5x/3) \u21d2 7/5 \u00d7 5x/3 = 24 - 5x/3 \u21d2 7x/3 = (72 - 5x)/3 </span><br/><span>7x = 72 - 5x \u21d2 12x = 72 \u21d2 x = 6. </span><br/><span>Paul's speed in meters per second = 6 \u00d7 5/18 = 5/3 m/s.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60168,
      "question": "<p dir=\"ltr\"><span>A policeman sees a thief at a distance of 100 meters and starts to chase him. The thief sees him and starts to run too. If the thief is running at the speed of 8 km/hr and the policeman is running at the speed of 10 km/hr, find out the distance covered by the thief before the policeman catches him.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>250 meters</span></p>",
        "<p dir=\"ltr\"><span>400 meters</span></p>",
        "<p dir=\"ltr\"><span>450 meters</span></p>",
        "<p dir=\"ltr\"><span>401 meters</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We can safely assume that the policeman is running in the same direction as the thief. </span><br><span>Speed of policeman w.r.t thief = (10 - 8) = 2 km/hr. </span><br><span>Time taken by policeman to cover the 100m distance between him and the thief = (100/1000) / 2 = 1/20 hr. </span><br><span>Therefore, the distance covered by thief in 1/20 hrs = 8 \u00d7 1/20 = 2/5 km = 400 meters.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60169,
      "question": "<p dir=\"ltr\"><span>If John walks at the speed of 5 km/h, he reaches his office 7 minutes late. However, if he walks at the speed of 6 km/h, he reaches his office 5 minutes early. How far is his office from his home?</span></p>",
      "options": [
        "<p><span>9</span></p>",
        "<p><span>8</span></p>",
        "<p><span>10</span></p>",
        "<p><span>6</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the distance of John\u2019s office from his home be x. </span><br><span>The time difference when covering the distance x at the two different speeds = 5 - (-7) = 12 min = 1/5 hr  </span><br><span>x/5 - x/6 = 1/5 \u21d2 (6x - 5x)/30 = 1/5  </span><br><span>x = 6. So, his office is 6 km far from his home.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    },
    {
      "id": 60170,
      "question": "<p dir=\"ltr\"><span>Two cars with speed of 15 kmph and 30 kmph respectively are 100 km apart and face each other. The distance between them 5 minutes before crossing is</span></p>",
      "options": [
        "<p><span>2.75</span></p>",
        "<p><span>3.75</span></p>",
        "<p><span>4.75</span></p>",
        "<p><span>5.75</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>As the two cars are moving towards each other, their relative speed will be = 15+30 = 45 kmph. </span><br><span>The distance between them 5 minutes before crossing will be equal to the distance traveled by their relative speed in 5 minutes, </span><br><span>i.e.  Required distance = Relative speed (in km per min)  *  time (in minute) = (45/60)*5 = 3.75 km.</span></p>",
      "tag": "Time, Speed, and Distance || MCQ"
    }
  ],
  "Trains, Boats, and Streams": [
    {
      "id": 60171,
      "question": "<p dir=\"ltr\"><span>A speedboat runs 6 km upstream in a river and comes back to the starting point in 33 minutes. The stream of the river is running at 2 km/hr. What is the speed of speedboat in still water?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>25 km/h</span></p>",
        "<p dir=\"ltr\"><span>21 km/h</span></p>",
        "<p dir=\"ltr\"><span>26 km/h</span></p>",
        "<p dir=\"ltr\"><span>22 km/h</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the speed of speedboat in still water be x km/h. </span><br><span>Then, speed downstream = (x + 2) km/h, speed upstream = (x - 2) km/h. </span><br><span>Since it goes 6 km upstream and comes back in 33 minutes, </span><br><span>we have 6/(x+2) + 6/(x-2) = 33/60  </span><br><span>11x\u00b2 - 240x - 44 = 0 </span><br><span>11x\u00b2 - 242x + 2x - 44 = 0 </span><br><span>(x - 22)(11x + 2) = 0 </span><br><span>x = 22. Therefore, the required speed = 22 km/h.</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60172,
      "question": "<p dir=\"ltr\"><span>A boat runs at the speed of 13 km/h in still water. If the speed of the stream is 4 km/h, how much time will it take to go 68 km downstream?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>5 h</span></p>",
        "<p dir=\"ltr\"><span>4 h</span></p>",
        "<p dir=\"ltr\"><span>6 h</span></p>",
        "<p dir=\"ltr\"><span>3 h</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Speed of the boat downstream = 13 + 4 = 17 km/h. </span><br><span>Therefore, time taken to go 68 km downstream = (68/17) = 4 h.</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60173,
      "question": "<p dir=\"ltr\"><span>Peter's speedboat run at a speed of 9 km/h in still water. He rows to a place at a distance of 105 km and comes back to the starting point. If the speed of stream is 1.5 km/h, find out the time taken by Peter.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>24 h</span></p>",
        "<p dir=\"ltr\"><span>21 h</span></p>",
        "<p dir=\"ltr\"><span>23 h</span></p>",
        "<p dir=\"ltr\"><span>22 h</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Upstream speed = 9 - 1.5 = 7.5 km/h. </span><br><span>Downstream speed = 9 + 1.5 = 10.5 km/h. </span><br><span>Therefore, time taken = 105/7.5 + 105/10.5 = 14 + 10 = 24 h.  </span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60174,
      "question": "<p dir=\"ltr\"><span>A motorboat crosses a certain distance in 1 hour and comes back in 1\u00bd hours. If the stream is running at 3 km/h, find out the speed of motorboat in still water.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>10 km/h</span></p>",
        "<p dir=\"ltr\"><span>15 km/h</span></p>",
        "<p dir=\"ltr\"><span>12 km/h</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the speed of motorboat in still water be x km/h. </span><br><span>Then, Downstream speed = (x + 3) km/h. </span><br><span>Upstream speed = (x - 3) km/h. </span><br><span>Then, (x + 3) \u00d7 1 = (x - 3) \u00d7 3/2 </span><br><span>2x + 6 = 3x - 9 \u21d2 x = 15. </span><br><span>So, the speed of motorboat in still water is 15 km/h.</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60175,
      "question": "<p dir=\"ltr\"><span>A boat can travel 12 km downstream in 1 hour and return upstream in 3 hours. What is the speed of the boat in still water?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>5 km/h</span></p>",
        "<p dir=\"ltr\"><span>8 km/h</span></p>",
        "<p dir=\"ltr\"><span>7 km/h</span></p>",
        "<p dir=\"ltr\"><span>6 km/h</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the speed of the boat in still water be x km/h, and the speed of the current be y km/h.</span></p><p dir=\"ltr\"><span>Downstream speed = x + y, and upstream speed =  x \u2212 y.</span></p><p dir=\"ltr\"><span>The time taken for downstream is 12 / x + y = 1, and for upstream is 12 / x - y = 3.</span></p><p dir=\"ltr\"><span>Solving these equations gives x = 8.</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60176,
      "question": "<p dir=\"ltr\"><span>A boat goes downstream from point A to point B in 4 hours and returns upstream in 6 hours. If the speed of the stream is 3 km/h, what is the speed of the boat in still water?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>12 km/h</span></p>",
        "<p dir=\"ltr\"><span>15 km/h</span></p>",
        "<p dir=\"ltr\"><span>18 km/h</span></p>",
        "<p dir=\"ltr\"><span>9 km/h</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let b = speed of boat in still water (km/h).</span></p><p dir=\"ltr\"><span>Downstream speed = b + 3 (with current).</span></p><ul><li value=\"1\"><span>Time = 4 hours \u2192 Distance = 4(b + 3).</span></li></ul><p dir=\"ltr\"><span>Upstream speed = b \u2212 3 (against current).</span></p><ul><li value=\"1\"><span>Time = 6 hours \u2192 Distance = 6(b \u2212 3).</span></li></ul><p dir=\"ltr\"><span>Set distances equal (same path):</span></p><p dir=\"ltr\"><span>4(b + 3) = 6(b \u2212 3)</span></p><p dir=\"ltr\"><span>Solve:</span></p><p dir=\"ltr\"><span>4b + 12 = 6b \u2212 18 \u27f9 30 = 2b \u27f9 b = 15 km/h</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60177,
      "question": "<p dir=\"ltr\"><span>A boat takes </span><b><strong>3 hours</strong></b><span> to travel </span><b><strong>36 km downstream</strong></b><span> and </span><b><strong>6 hours</strong></b><span> to travel the same distance upstream. Find the </span><b><strong>speed of the boat in still water</strong></b><span> and the </span><b><strong>speed of the stream</strong></b><span> respectively.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>9 km/hr, 6km/hr</span></p>",
        "<p dir=\"ltr\"><span>6 km/hr, 9km/hr</span></p>",
        "<p dir=\"ltr\"><span>3 km/hr, 9 km/hr</span></p>",
        "<p dir=\"ltr\"><span>9km/hr, 3km/hr</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given:</span></p><ul><li value=\"1\"><span>Time to travel 36 km downstream = 3 hours, so </span>[Tex]\\frac{36}{b+s} = 3[/Tex]</li><li value=\"2\"><span>Time to travel 36 km upstream = 6 hours, so \\frac{36}{b-s} = 6</span>[Tex]\\frac{36}{b-s} = 6[/Tex]</li></ul><p dir=\"ltr\"><span>b+s=12 and b\u2212s=6</span></p><p dir=\"ltr\"><span>Add the two equations:</span></p><p dir=\"ltr\"><span>(b+s) + (b-s) = 12 + 6</span></p><p dir=\"ltr\"><span>2b=18\u21d2b=9</span></p><p dir=\"ltr\"><span>Substitute b = 9 into b+s = 12</span></p><p>[Tex]9 + s = 12 \\quad \\Rightarrow \\quad s = 3[/Tex]</p><p dir=\"ltr\"><span>Thus, the speed of the boat in still water is </span><b><strong>9 km/h</strong></b><span> and the speed of the stream is </span><b><strong>3 km/h</strong></b><span>.</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60178,
      "question": "<p dir=\"ltr\"><span>Shiva rows a boat at 8 km/h in still water. He finds that it takes him 5 hours longer to row upstream than downstream for a certain distance. If the speed of the stream is s km/h, and the distance is 40 km, find s.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>3.31 km/h</span></p>",
        "<p dir=\"ltr\"><span>2 km/h</span></p>",
        "<p dir=\"ltr\"><span>1.5 km/h</span></p>",
        "<p dir=\"ltr\"><span>2.5 km/h</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Here's the explanation:</span></p><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20250523123442480151/Screenshot-2025-05-23-123512.png\" alt=\"Screenshot-2025-05-23-123512\" width=\"inherit\" height=\"inherit\" loading=\"auto\"><p dir=\"ltr\"><span>Answer: 3.31 km/h</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60179,
      "question": "<p dir=\"ltr\"><span>Two boats, P and Q, start from two points 160 km apart and move towards each other. Boat P\u2019s speed in still water is 18 km/h and boat Q\u2019s speed in still water is 16 km/h. If the speed of the stream is 2 km/h and P is moving downstream while Q is moving upstream, after how many hours will they meet?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4.5 hours</span></p>",
        "<p dir=\"ltr\"><span>4 hours</span></p>",
        "<p dir=\"ltr\"><span>5 hours</span></p>",
        "<p dir=\"ltr\"><span>4.71 hours</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Speed of P downstream = 18 + 2 = 20 km/h</span></p><p dir=\"ltr\"><span>Speed of Q upstream = 16 \u2013 2 = 14 km/h</span></p><p dir=\"ltr\"><span>Combined speed = 20 + 14 = 34 km/h</span></p><p dir=\"ltr\"><span>Time to meet = Distance / Combined speed = 160 / 34 \u2248 4.71 hours</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    },
    {
      "id": 60180,
      "question": "<p dir=\"ltr\"><span>A boat\u2019s speed in still water is 5 km/hr. While river is flowing with the speed of 2 km/hr. and time taken to cover a certain distance upstream is 2 hr more than time taken to cover the same distance downstream.  Find the distance.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>11 km</span></p>",
        "<p dir=\"ltr\"><span>10.9 km</span></p>",
        "<p dir=\"ltr\"><span>12.5 km</span></p>",
        "<p dir=\"ltr\"><span>10.5 km</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the distance be X km</span></p><p dir=\"ltr\"><span>Speed of downstream = (5 + 2) =7</span></p><p dir=\"ltr\"><span>Speed of upstream = (5 \u2013 2) =3</span></p><p dir=\"ltr\"><span>(x/3)+2 = x/7</span></p><p dir=\"ltr\"><span>(x+6)/3 = x/7</span></p><p dir=\"ltr\"><span>7X \u2013 3X = 42</span></p><p dir=\"ltr\"><span>X = 10.5 km</span></p>",
      "tag": "Trains, Boats, and Streams || MCQ"
    }
  ],
  "Race": [
    {
      "id": 60181,
      "question": "<p dir=\"ltr\"><span>Ram and Shyam participate in a race of 200m. If Ram starts when Shyam has covered 25 meters, then Ram finishes the race 10 seconds before Shyam and if Ram starts when Shyam has covered 45 meters then both finish the race at the same time. How long does Ram take to run 200m?</span></p>",
      "options": [
        "<p><span>120</span></p>",
        "<p><span>77.5</span></p>",
        "<p><span>87.2</span></p>",
        "<p><span>100</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let time taken by Ram be Tr seconds to cover 200 m. &nbsp;  </span><br><span>For first case, Shyam will be covering 175m in (Tr+10) sec </span><br><span>(As it is given that Ram takes 10sec less than Shyam)  So speed of Shyam is (175/Tr+10) m/s. &nbsp;  </span><br><span>For second case, Shyam will take Tr seconds to cover 155m (200 - 45) &nbsp;  </span><br><span>so speed of Shyam is (155/Tr) m/s &nbsp;  </span><br><span>Equating both speed of Ram we get 175Tr = 155(Tr+10)  </span><br><span>Tr = 77.5 s &nbsp;</span></p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60182,
      "question": "<p dir=\"ltr\"><span>A runs 500 m in 100 seconds while B runs the same distance in 125 seconds. By how many meters does A beat B?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>100 m</span></p>",
        "<p dir=\"ltr\"><span>150 m</span></p>",
        "<p dir=\"ltr\"><span>200 m</span></p>",
        "<p dir=\"ltr\"><span>250 m</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Speed of A = 500 / 100 = 5 m/s</span></p><p dir=\"ltr\"><span>Speed of B = 500 / 125 = 4 m/s</span></p><p dir=\"ltr\"><span>When A finishes the race (100 sec), B runs:</span></p><p dir=\"ltr\"><span>Distance covered by B in 100 sec = 4 \u00d7 100 = 400 m</span></p><p dir=\"ltr\"><span>So A beats B by:</span></p><p dir=\"ltr\"><span>500 \u2212 400 = 100 m</span></p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60183,
      "question": "<p dir=\"ltr\"><span>In a 1000 m race, A gives B a start of 100 m and still beats him by 20 seconds. If A finishes the race in 200 seconds, what is B\u2019s speed?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4 m/s</span></p>",
        "<p dir=\"ltr\"><span>4.2 m/s</span></p>",
        "<p dir=\"ltr\"><span>4.5 m/s</span></p>",
        "<p dir=\"ltr\"><span>5 m/s</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A\u2019s speed:</span></p><p dir=\"ltr\"><span>Speed&nbsp;of&nbsp;A=1000/200 = 5\u2009m/s</span></p><p dir=\"ltr\"><span>200 + 20 = 220&nbsp;sec</span></p><p dir=\"ltr\"><span>But B runs only 900 m (because he got a 100 m start).</span></p><p dir=\"ltr\"><span>Speed&nbsp;of&nbsp;B = 900/220 = 4.09\u2009m/s&nbsp;(approx)</span></p><p dir=\"ltr\"><span>Closest option = 4.2 m/s</span></p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60184,
      "question": "<p dir=\"ltr\"><span>If Geeta gives Meena a 100-meter head start or waits for 20 seconds before starting, and both conditions result in them finishing the race at the same time, how long does it take Geeta to cover the 1000 meters?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>200 sec</span></p>",
        "<p dir=\"ltr\"><span>160 sec</span></p>",
        "<p dir=\"ltr\"><span>180 sec</span></p>",
        "<p dir=\"ltr\"><span>140 sec</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>That means Meena will cover 100 m in 20 sec</span><br><span>Meena can cover 1000 m in = 200 secs</span><br><span>Geeta can give a start of 100 m or 20 sec to Meena</span><br><span>Geeta will take 20 sec less than Meena</span><br><span>Geeta will take 180 sec to cover 1000 meters. </span></p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60185,
      "question": "<p dir=\"ltr\"><span>Sita and Radha participate in a race of 1000 m. If Sita starts, when Radha has covered 100 meters, then Sita finishes the race 20 seconds before Radha, and if Sita starts, when Radha has covered 125 meters then both finish the race at the same time. How long does Sita take to run the complete race?</span><br><span>&nbsp;</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>350 sec</span><br><span>&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>700 sec</span><br><span>&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>780 sec</span><br><span>&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>900 sec</span><br><span>&nbsp;</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let time taken by Sita be Ts seconds to cover 1000m. &nbsp;&nbsp;</span><br><span>For first case, Radha will be covering 900m is (Ts+20) sec (As it is given that Sita takes 20sec less than Radha) &nbsp;&nbsp;</span><br><span>So speed of Radha is (900/(Ts + 20)) m/s &nbsp;&nbsp;</span><br><span>For second case, Radha will take Ts second to cover 875 m (1000-125) &nbsp;&nbsp;</span><br><span>so speed of Radha is (875/Ts) m/s &nbsp;&nbsp;</span><br><span>Equating both speed of Radha we get 900Ts = 875(Ts+20)  </span><br><span>Ts = 700 sec.&nbsp;</span></p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60186,
      "question": "<p dir=\"ltr\"><span>Ram and Sita participate in a 1000-meter race. If Ram gives Sita a head start of either 200 meters or 20 seconds, and both conditions result in them finishing the race at the same time, how long does it take Ram to complete the race?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>70 sec</span></p>",
        "<p dir=\"ltr\"><span>120 sec</span></p>",
        "<p dir=\"ltr\"><span>100 sec</span></p>",
        "<p dir=\"ltr\"><span>80 sec</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Sita takes 20 sec. to run 200 m.</span><br/><span>Sita takes 100 sec. to run complete 1000 m.</span><br/><span>Ram gives Sita a start of 20 sec, means Ram is able to complete the race in 20 sec. less time than Sita</span><br/><span>Ram will take 80 sec. </span></p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60187,
      "question": "<p dir=\"ltr\"><span>In a 400-meter race around a circular track, Aaron gives Brad a head start of 25 meters. If Aaron runs at a speed of 8 meters per second, and Brad at 6 meters per second, who will win the race, and by how many seconds?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Aaron wins by 12.5 seconds</span></p>",
        "<p dir=\"ltr\"><span>Brad wins by 10.5 seconds</span></p>",
        "<p dir=\"ltr\"><span>Aaron wins by 5 seconds</span></p>",
        "<p dir=\"ltr\"><span>Brad wins by 5 seconds.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given, </span><br><span>Aaron gives Brad a head start of 25 meters.</span><br><span>Speed of Aaron = 8m/s</span><br><span>Speed of Brad = 6m/s</span></p><p dir=\"ltr\"><span>Distance to be travelled by Aaron = 400 metre</span><br><span>Distance to be travelled by Brad = 375 metre</span></p><p dir=\"ltr\"><span>time taken by Aaron = 400/8 = 50 Sec</span><br><span>time taken by Brad = 375/6 = 62.5 Sec</span></p><p dir=\"ltr\"><span>thus, Aaron wins the race by 12.5 sec</span><br><br></p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60188,
      "question": "<p dir=\"ltr\"><span>Ram and Shyam are racing along a circular track. The speed of Ram is thrice the speed of Shyam. The length of the circular track is 1440 m. After the start of the race from the same point simultaneously, Ram meets Shyam for the first time at the end of the 8</span><sup><span>th</span></sup><span> minute. If Ram and Shyam start the race again from the same starting point simultaneously, then the time taken by Shyam to finish the race is: (given that the length of the race is same as the length of the track)</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>7.5 min</span></p>",
        "<p dir=\"ltr\"><span>16&nbsp;min</span></p>",
        "<p dir=\"ltr\"><span>30&nbsp;min</span></p>",
        "<p dir=\"ltr\"><span>22.5&nbsp;min</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let Shyam's speed be v m/s, so Ram's speed is 3v m/s.</span></p><p dir=\"ltr\"><span>Relative speed = 3v - v = 2v.</span></p><p dir=\"ltr\"><span>They meet after 8 minutes (480 seconds), and the distance covered relative to Shyam is 1440 m:</span></p><p>[Tex]2v \\times 480 = 1440 \\implies v = 1.5 \\, \\text{m/s}[/Tex]</p><p dir=\"ltr\"><span>Shyam's time to finish the race:</span></p><p>[Tex]\\text{Time} = \\frac{1440}{1.5} = 960 \\, \\text{seconds} = 16 \\, \\text{minutes}[/Tex]</p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60189,
      "question": "<p>In a 500 m race, P and Q have speeds in the ratio of 3 : 4. Q starts the race when P has already covered 140 m. What is the distance between P and Q (in m) when P wins the race?</p>",
      "options": [
        "<p>20</p>",
        "<p>40</p>",
        "<p>60</p>",
        "<p>140</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p><img src=\"https://app-content.cdn.examgoal.net/fly/@width/image/1l75qxqov/e5174f2c-98a9-4270-ad9f-f9069a6a3925/6488eef0-22a4-11ed-b27e-e9a697490be1/file-1l75qxqow.png?format=png\" data-orsrc=\"https://app-content.cdn.examgoal.net/image/1l75qxqov/e5174f2c-98a9-4270-ad9f-f9069a6a3925/6488eef0-22a4-11ed-b27e-e9a697490be1/file-1l75qxqow.png\" loading=\"lazy\" style=\"max-width: 100%; height: auto; display: block; margin: 0px auto; max-height: 40vh;\" alt=\"GATE EE 2022 General Aptitude - Numerical Ability Question 17 English Explanation\"></p>\n<p>P : Q = 3 : 4</p>\n<p>P = 3x</p>\n<p>Q = 4x</p>\n<p>So, 3x = 360</p>\n<p>x = 120 m</p>\n<p>Q = 4x = 4 [Tex]\\times[/Tex] 120 = 480 m</p>\n<p>When P reaches 500 metres and Q reaches only 480 metres.</p>\n<p>[Tex]\\therefore[/Tex] P wins by 20 m.</p>",
      "tag": "Race || MCQ"
    },
    {
      "id": 60190,
      "question": "<p dir=\"ltr\"><span>In a game of billiards:</span></p><ul><li value=\"1\"><span>Player X can give Y 12 points in 60.</span></li><li value=\"2\"><span>Player X can give Z 18 points in 60.</span></li></ul><p dir=\"ltr\"><span>How many points can Y give Z in a game of 120?</span></p>",
      "options": [
        "<p><span>15</span></p>",
        "<p><span>6</span></p>",
        "<p><span>12</span></p>",
        "<p><span>4</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Player X : Player Y = 60 : 48</span><br/><span>Player X : Player Z = 60 : 42</span></p><p>[Tex]\\frac{Y}{Z} = \\left( \\frac{Y}{X} \\times \\frac{X}{Z} \\right) = \\left( \\frac{48}{60} \\times \\frac{60}{42} \\right) = \\frac{48}{42} = \\frac{8}{7}[/Tex]<span> </span></p><p dir=\"ltr\"><span>So,</span><br/><span> Y : Z = 8 : 7 = 120 : 105</span></p><p dir=\"ltr\"><span>\u2234 Y can give Z 15 points in a game of 120.</span></p>",
      "tag": "Race || MCQ"
    }
  ],
  "Work and Wages": [
    {
      "id": 60191,
      "question": "<p dir=\"ltr\"><span>Two friends A and B were employed to do a work. Initial deadline was fixed at 24 days. Both started working together but after 20 days, A left the work and the whole work took 30 days to complete. In how much time can B alone can do the work?</span></p>",
      "options": [
        "<p><span>40</span></p>",
        "<p><span>50</span></p>",
        "<p><span>60</span></p>",
        "<p><span>70</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the total work be 24 units. It is given that A and B together can do the work in 24 days.  </span><br><span>Combined efficiency of A and B  = 24/24 = 1 unit / day  </span><br><span>Work done in 20 days = 20 units  </span><br><span>Work left = 24 - 20 = 4 units </span><br><span>Now, this remaining 4 units of work was done by B alone in 10 days.  </span><br><span>Efficiency of B = 4/10 = 0.4 Therefore, time required by B alone to do the work = 24/0.4 = 60 days.</span></p><p dir=\"ltr\"><span>Alternate method,</span></p><p dir=\"ltr\"><span>Time taken by B to complete remaining work=10 days</span><br><span>Time taken by both to complete same work = 4 days</span><br><span>if work efficiency of B = 1 unit/day </span><br><span>so, in 10 days B work=10units and  both do 10 unit work in 4 days so, 10/4 per day is the efficiency of both </span><br><span>therefore, work efficiency of both = 2.5 units/day.</span><br><span>work done in 24 days by both =24 x 2.5=60units.</span><br><span>here we can conclude the time taken by B to complete 60 units is 60 days which is the required answer. </span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60192,
      "question": "<p dir=\"ltr\"><span>A and B took a job to be completed in 20 days. They started working together and after 12 days, C joined them and the whole job finished in 15 days. How much time would C require to complete the job if only C was hired?</span></p>",
      "options": [
        "<p><span>15</span></p>",
        "<p><span>12</span></p>",
        "<p><span>10</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the total job be 20 units. </span><br><span>It is given that A and B took the job to be completed in 20 days.  </span><br><span>Combined efficiency of A and B = 20/20 = 1 unit / day </span><br><span>Now, job done in 12 days = 12 units  </span><br><span>Job Left = 8 units </span><br><span>Now, the remaining 8 units of job has been done by all A, B and C together. </span><br><span>Let the efficiency of C be 'x'.</span><br><span>Combined efficiency of A, B and C = 1+x units/ day </span><br><span>Now, with this efficiency, the job got completed in 3 more days. </span><br><span>Job done in 3 days = 3 x (1+x) = 8 units =&gt; x = 5/3 </span><br><span>Therefore, efficiency of C = x = 5/3 units / day </span><br><span>Hence, time required by C alone to do the job = 20/(5/3) = 12 days</span></p><p dir=\"ltr\"><span>Alternate method:</span></p><p dir=\"ltr\"><span>3 days of work of C equal to the 5 days work of A and B both .</span><br><span>so, if A and B take 20 days to complete the work, C will take = (20 x 3)/5 days=12 Days.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60193,
      "question": "<p dir=\"ltr\"><span>Three people A, B and C working individually can finish a job in 10, 12 and 20 days respectively. They decided to work together but after 2 days, A left the work and after another one day, B also left work. If they got two lacs collectively for the entire work, find the difference of the highest and lowest share.</span></p>",
      "options": [
        "<p><span>70000</span></p>",
        "<p><span>60000</span></p>",
        "<p><span>10000</span></p>",
        "<p><span>20000</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the total work be LCM(10, 12, 20) = 60 units</span><br><span>Efficiency of A = 60/10 = 6 units / day </span><br><span>Efficiency of B = 60/12 = 5 units / day  </span><br><span>Efficiency of C = 60/20 = 3 units / day </span><br><span>Since the number of working days are different for each person, the share of each will be calculated in the ratio of the units of work done. </span><br><span>Now, A works for 2 days and B works for 3 days. </span><br><span>Work done by A = 2 x 6 = 12 units </span><br><span>Work done by B = 3 x 5 = 15 units </span><br><span>Work done by C = 60 - 12 - 15 = 33 units </span><br><span>Therefore, ratio of work done = 12:15:33 = 4:5:11 </span><br><span>So, A's share = (4/20) x 2,00,000 = Rs 40,000 </span><br><span>B's share = (5/20) x 2,00,000 = Rs 50,000 </span><br><span>C's share = (11/20) x 2,00,000 = Rs 1,10,000 </span><br><span>Therefore, difference of the highest and lowest share = Rs 1,10,000 - 40,000 = Rs 70,000.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60194,
      "question": "<p dir=\"ltr\"><span>A alone and B alone can do a work in respectively 18 and 8 days more than both working together. Find the number of days required if both work together. </span></p>",
      "options": [
        "<p><span>12</span></p>",
        "<p><span>8</span></p>",
        "<p><span>16</span></p>",
        "<p><span>36</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the time required to complete the work by A and B together = n days </span><br><span>Time required by A alone = n + 18 days </span><br><span>Time required by B alone = n + 8 days </span><br><span>As we know according to combined work formula for two workers,</span><br><span>(No.&nbsp;of&nbsp;days&nbsp;both&nbsp;work)2=No.&nbsp;of&nbsp;extra&nbsp;days&nbsp;A&nbsp;takes \u00d7 No.&nbsp;of&nbsp;extra&nbsp;days&nbsp;B&nbsp;takes</span><br><span>Therefore, n</span><sup><span>2</span></sup><span> = 18 x 8 = 144  </span><br><span>n = 12 Hence, A and B require 12 days to complete the work if they work together.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60195,
      "question": "<p dir=\"ltr\"><span>Three friends, A, B, and C, are making pastries in a bakery. When working alone, A can make 60 pastries per hour, B can make 30 pastries per hour, and C can make 40 pastries per hour. Due to limited equipment, only one person can work at a time, so they decide to work in 30-minute shifts, one after the other. How long will it take them to make a total of 185 pastries?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4 hours</span></p>",
        "<p dir=\"ltr\"><span>3 hours 45 minutes</span></p>",
        "<p dir=\"ltr\"><span>4 hours 15 minutes</span></p>",
        "<p dir=\"ltr\"><span>5 hours</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>It is given that A, B and C make 60, 30 and 40 pastries respectively in an hour.</span><br><span>In 30 minutes, they will make 30, 15 and 20 pastries respectively. </span><br><span>So, in one cycle of 1 hour 30 minutes where each works for 30 minutes, pastries made = 30 + 15 + 20 = 65 </span><br><span>Now, in 2 cycles (3 hours), 130 pastries would be made. In the next 30 minutes, A would make 30 pastries. </span><br><span>So, total time elapsed = 3 hours 30 minutes and pastries made = 130 + 30 = 160 </span></p><p dir=\"ltr\"><span>In the next 30 minutes, B would make 15 pastries. So, total time elapsed = 4 hours and pastries made = 160 + 15 = 175 </span><br><span>In the next 15 minutes, C would make 10 pastries. So, total time elapsed = 4 hours 15 minutes and pastries made = 175 + 10 = 185 </span><br><span>Therefore, total time taken = 4 hours 15 minutes.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60196,
      "question": "<p dir=\"ltr\"><span>A person employed a group of 20 men for a construction job. These 20 men working 8 hours a day can complete the job in 28 days. The work started on time but after 18 days, it was observed that two thirds of the work was still pending. To avoid penalty and complete the work on time, the employer had to employ more men and also increase the working hours to 9 hours a day. Find the additional number of men employed if the efficiency of all men is same.</span></p>",
      "options": [
        "<p><span>40</span></p>",
        "<p><span>44</span></p>",
        "<p><span>64</span></p>",
        "<p><span>80</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the total work be 3 units and additional men employed after 18 days be 'x'.  </span><br/><span>Work done in first 18 days by 20 men working 8 hours a day = (1/3) \u00d7 3 = 1 unit </span><br/><span>Work done in last 10 days by (20 + x) men working 9 hours a day = (2/3) \u00d7 3 = 2 unit </span><br/><span>Here, we need to apply the formula </span><br/><span>M</span><sub><span>1</span></sub><span>\u00a0D</span><sub><span>1</span></sub><span>\u00a0H</span><sub><span>1</span></sub><span>\u00a0E</span><sub><span>1</span></sub><span>\u00a0/ W</span><sub><span>1</span></sub><span>\u00a0= M</span><sub><span>2</span></sub><span>\u00a0D</span><sub><span>2</span></sub><span>\u00a0H</span><sub><span>2</span></sub><span>\u00a0E</span><sub><span>2</span></sub><span>\u00a0/ W</span><sub><span>2</span></sub><br/><span>where M</span><sub><span>1</span></sub><span>\u00a0= 20 men, D</span><sub><span>1</span></sub><span>\u00a0= 18 days, H</span><sub><span>1</span></sub><span>\u00a0= 8 hours/day, W</span><sub><span>1</span></sub><span>\u00a0= 1 unit, E</span><sub><span>1</span></sub><span>\u00a0= E</span><sub><span>2</span></sub><span>\u00a0= Efficiency of each man, M</span><sub><span>2</span></sub><span>\u00a0= (20 + x) men, D</span><sub><span>2</span></sub><span>\u00a0= 10 days, H</span><sub><span>2</span></sub><span>\u00a0= 9 hours/day, W</span><sub><span>2</span></sub><span>\u00a0= 2 unit. So, we have 20 \u00d7 18 \u00d7 8 / 1  =  (20 + x) \u00d7 10 \u00d7 9 / 2  </span><br/><span>x + 20 = 64  </span><br/><span>x = 44 Therefore, additional men employed = 44.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60197,
      "question": "<p dir=\"ltr\"><span>6 men and 10 women were employed to make a road 360 km long. They were able to make 150 kilometres of road in 15 days by working 6 hours a day. After 15 days, two more men were employed and four women were removed. Also, the working hours were increased to 7 hours a day. If the daily working power of 2 men and 3 women are equal, find the total number of days required to complete the work. </span></p>",
      "options": [
        "<p><span>19</span></p>",
        "<p><span>35</span></p>",
        "<p><span>34</span></p>",
        "<p><span>50</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We are given that the daily working power of 2 men and 3 women are equal. </span><br/><span>2 Em = 3 Ew =&gt; Em / Ew = 3/2, </span><br/><span>where 'Em' is the efficiency of 1 man and 'Ew' is the efficiency of 1 woman. </span><br/><span>Therefore, ratio of efficiency of man and woman = 3 : 2.</span><br/><span>If 'k' is the constant of proportionality, Em = 3k and Ew = 2k. </span><br/><span>Here, we need to apply the formula  </span><br/><span>\u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) D</span><sub><span>1</span></sub><span>\u00a0H</span><sub><span>1</span></sub><span>\u00a0/ W</span><sub><span>1</span></sub><span>\u00a0= \u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) D</span><sub><span>2</span></sub><span>\u00a0H</span><sub><span>2</span></sub><span>\u00a0/ W</span><sub><span>2</span></sub><span>, </span><br/><span>where \u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) = (6 x 3k) + (10 x 2k), </span><br/><span>\u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) = (8 x 3k) + (6 x 2k),</span><br/><span>D</span><sub><span>1</span></sub><span>\u00a0= 15 days, D</span><sub><span>2</span></sub><span>\u00a0= Number of days after increasing men and reducing women, </span><br/><span>H</span><sub><span>1</span></sub><span>\u00a0= 6 hours, H</span><sub><span>2</span></sub><span>\u00a0= 7 hours, W</span><sub><span>1</span></sub><span>\u00a0= 150 km, W</span><sub><span>2</span></sub><span>\u00a0= 210 km. \u00a0 </span><br/><span>So, we have 38k x 15 x 6 / 150 = 36k x D</span><sub><span>2</span></sub><span>\u00a0x 7 / 210  </span><br/><span>38k x 6 = 12k x D</span><sub><span>2</span></sub><span>\u00a0=&gt; D</span><sub><span>2</span></sub><span>\u00a0= 19 days </span><br/><span>Therefore, total days required to complete the work = 15 + 19 = 34 days.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60198,
      "question": "<p dir=\"ltr\"><span>A stadium was to be built in 1500 days. The contractor employed 200 men, 300 women and 750 robotic machines. After 600 days, 75% of the work was still to be done. Fearing delay, the contractor removed all women and 500 robotic machines. Also, he employed some more men having the same efficiency as earlier employed men. This led to a speedup in work and the stadium got built 50 days in advance. Find the additional number of men employed if in one day, six men, ten women and fifteen robotic machines have same work output. </span></p>",
      "options": [
        "<p><span>1100</span></p>",
        "<p><span>1340</span></p>",
        "<p><span>1300</span></p>",
        "<p><span>1140</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the total work be 4 units.</span><br/><span>Work done in first 600 days = 25% of 4 = 1 unit</span><br/><span>Work done in next 850 days = 75% of 4 = 3 unit</span><br/><span> Also, we are given that the daily work output of 6 men, 10 women and 15 robotic machines are same.</span><br/><span>6 Em = 10 Ew = 15 Er</span><br/><span>Em : Ew : Er = 5 : 3 : 2, where 'Em' is the efficiency of 1 man, 'Ew' is the efficiency of 1 woman and 'Er' is the efficiency of 1 robotic machine.</span><br/><span>Therefore, ratio of efficiency of man, woman and robotic machine = 5:3:2.</span><br/><span>If 'k' is the constant of proportionality, Em = 5k, Ew = 3k and Er = 2k.</span><br/><span>Here, we need to apply the formula </span><br/><span>\u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) D</span><sub><span>1</span></sub><span>\u00a0H</span><sub><span>1</span></sub><span>\u00a0/ W</span><sub><span>1</span></sub><span>\u00a0= \u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) D</span><sub><span>2</span></sub><span>\u00a0H</span><sub><span>2</span></sub><span>\u00a0/ W</span><sub><span>2</span></sub><span>, where</span><br/><span>\u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) = (200 x 5k) + (300 x 3k) + (750 x 2k)</span><br/><span>\u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) = (200 x 5k) + (m x 5k) + (250 x 2k), where 'm' is the additional men employed</span><br/><span>D</span><sub><span>1</span></sub><span>\u00a0= 600 days</span><br/><span>D</span><sub><span>2</span></sub><span>\u00a0= 850 days</span><br/><span>H</span><sub><span>1</span></sub><span>\u00a0= H</span><sub><span>2</span></sub><span>\u00a0= Daily working hours</span><br/><span>W</span><sub><span>1</span></sub><span>\u00a0= 1 unit</span><br/><span>W</span><sub><span>2</span></sub><span>\u00a0= 3 units</span><br/><span>So, we have</span><br/><span>3400k x 600 / 1 = (1500 + 5m)k x 850 / 3</span><br/><span>3400k x 1800 = (1500 + 5m)k x 850</span><br/><span>1500 + 5m = 7200.</span><br/><span>5m = 5700</span><br/><span>m = 1140</span><br/><span>Therefore, additional men employed = 1140.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60199,
      "question": "<p dir=\"ltr\"><span>3 men and 4 women can complete a work in 10 days by working 12 hours a day. 13 men and 24 women can do the same work by working same hours a day in 2 days. How much time would 12 men and 1 women working same hours a day will take to complete the whole work?</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>6</span></p>",
        "<p><span>8</span></p>",
        "<p><span>10</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Here, we need to apply the formula\u00a0</span><br/><span>\u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) D</span><sub><span>1</span></sub><span>\u00a0H</span><sub><span>1</span></sub><span>\u00a0/ W</span><sub><span>1</span></sub><span>\u00a0= \u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) D</span><sub><span>2</span></sub><span>\u00a0H</span><sub><span>2</span></sub><span>\u00a0/ W</span><sub><span>2</span></sub><span>, </span><br/><span>where \u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) = (3 x m) + (4 x w), \u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) = (13 x m) + (24 x w), where 'm' is the efficiency of each man and 'w' is the efficiency of each woman,</span><br/><span>D</span><sub><span>1</span></sub><span>\u00a0= 10 days, D</span><sub><span>2</span></sub><span>\u00a0= 2 days, H</span><sub><span>1</span></sub><span>\u00a0= 12 hours, H</span><sub><span>2</span></sub><span>\u00a0= 12 hours, W</span><sub><span>1</span></sub><span>\u00a0= W</span><sub><span>2</span></sub><span>\u00a0= Work to be done \u00a0 </span><br/><span>So, we have (3m + 4w) x 10 x 12 = (13m + 24w) x 2 x 12  </span><br/><span>15m + 20w = 13m + 24w  </span><br/><span>2m = 4w =&gt; m = 2w  </span><br/><span>m : w = 2 : 1, Therefore, ratio of efficiency of man and woman = 2 : 1 </span><br/><span>If the constant of proportionality be 'k', Efficiency of each man = m = 2k </span><br/><span>Efficiency of each woman = w = k \u00a0 Now, we re-apply the same formula.\u00a0</span><br/><span>\u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) D</span><sub><span>1</span></sub><span>\u00a0H</span><sub><span>1</span></sub><span>\u00a0/ W</span><sub><span>1</span></sub><span>\u00a0= \u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) D</span><sub><span>2</span></sub><span>\u00a0H</span><sub><span>2</span></sub><span>\u00a0/ W</span><sub><span>2</span></sub><span>, where,</span><br/><span>\u2211(M</span><sub><span>i</span></sub><span>\u00a0E</span><sub><span>i</span></sub><span>) = (3 x m) + (4 x w), \u2211(M</span><sub><span>j</span></sub><span>\u00a0E</span><sub><span>j</span></sub><span>) = (12 x m) + (1 x w), D</span><sub><span>1</span></sub><span>\u00a0= 10 days, D</span><sub><span>2</span></sub><span>\u00a0= Days requires by 12 men and 1 woman, H</span><sub><span>1</span></sub><span>\u00a0= 12 hours, H</span><sub><span>2</span></sub><span>\u00a0= 12 hours, </span><br/><span>W</span><sub><span>1</span></sub><span>\u00a0= W</span><sub><span>2</span></sub><span>\u00a0= Work to be done \u00a0 </span><br/><span>So, we have (3m + 4w) x 10 x 12 = (12m + w) x D</span><sub><span>2</span></sub><span>\u00a0x 12  </span><br/><span>30m + 40w = (12m + w) x D</span><sub><span>2</span></sub><span>\u00a0=&gt; 60k + 40k = (24k + k) x D</span><sub><span>2</span></sub><span>\u00a0</span><br/><span>100k = 25k x D</span><sub><span>2</span></sub><span>\u00a0</span><br/><span>D</span><sub><span>2</span></sub><span>\u00a0= 4 Therefore, 12 men and 1 woman would require 4 days to complete the work.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60200,
      "question": "<p dir=\"ltr\"><span>15 workers can complete a construction project in 30 days, working 8 hours a day. After 10 days, 5 workers leave. The remaining workers increase their daily working hours to finish the project on time. How many extra hours per day must the remaining workers now work?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2 hours</span></p>",
        "<p dir=\"ltr\"><span>3 hours</span></p>",
        "<p dir=\"ltr\"><span>4 hours</span></p>",
        "<p dir=\"ltr\"><span>5 hours</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total Work&nbsp;= Workers \u00d7 Days \u00d7 Hours/Day = 15 \u00d7 30 \u00d7 8 = 3600 worker-hours.</span></p><p dir=\"ltr\"><span>Work Done in 10 Days&nbsp;= 15 \u00d7 10 \u00d7 8 = 1200 worker-hours.</span></p><p dir=\"ltr\"><span>Remaining Work&nbsp;= 3600 \u2013 1200 = 2400 worker-hours.</span></p><p dir=\"ltr\"><span>Remaining Workers&nbsp;= 15 \u2013 5 = 10 workers.</span></p><p dir=\"ltr\"><span>Remaining Days&nbsp;= 30 \u2013 10 = 20 days.</span></p><p dir=\"ltr\"><span>New Hours/Day Required&nbsp;= Remaining Work / (Workers \u00d7 Days) = 2400 / (10 \u00d7 20) = 12 hours/day.</span></p><p dir=\"ltr\"><span>Extra Hours Needed&nbsp;= 12 \u2013 8 =&nbsp;4 hours/day.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60201,
      "question": "<p dir=\"ltr\"><span>10 men working 9 hours a day can complete a work in 24 days. How much time will it take to complete the work if 15 men are employed for 6 hours a day?</span></p>",
      "options": [
        "<p><span>18</span></p>",
        "<p><span>20</span></p>",
        "<p><span>24</span></p>",
        "<p><span>30</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Here, we need to apply the formula,</span><br><b><strong>M</strong></b><b><sub><strong>1</strong></sub></b><b><strong> D</strong></b><b><sub><strong>1</strong></sub></b><b><strong> H</strong></b><b><sub><strong>1</strong></sub></b><b><strong> E</strong></b><b><sub><strong>1</strong></sub></b><b><strong> / W</strong></b><b><sub><strong>1</strong></sub></b><b><strong> = M</strong></b><b><sub><strong>2</strong></sub></b><b><strong> D</strong></b><b><sub><strong>2</strong></sub></b><b><strong> H</strong></b><b><sub><strong>2</strong></sub></b><b><strong> E</strong></b><b><sub><strong>2</strong></sub></b><b><strong> / W</strong></b><b><sub><strong>2</strong></sub></b><span>, </span><br><span>where M</span><sub><span>1</span></sub><span> = 10 men,</span><br><span>D</span><sub><span>1</span></sub><span> = 24 days, </span><br><span>H</span><sub><span>1</span></sub><span> = 9 hours/day, </span><br><span>W</span><sub><span>1</span></sub><span> = W</span><sub><span>2</span></sub><span> = Work to be done,</span><br><span>E</span><sub><span>1</span></sub><span> = E</span><sub><span>2</span></sub><span> = Efficiency of each man, </span><br><span>M</span><sub><span>2</span></sub><span> = 15 men, </span><br><span>D</span><sub><span>2</span></sub><span> = Days required by 15 men, </span><br><span>H</span><sub><span>2</span></sub><span> = 6 hours/day, &nbsp; </span><br><span>So, we have 10 x 24 x 9 = 15 x 6 x D</span><sub><span>2</span></sub><span> </span><br><span>D</span><sub><span>2</span></sub><span> = 24 </span><br><span>Therefore, 15 men working 6 hours / day would require 24 days to complete the work. &nbsp; </span><br><span>(</span><b><strong>Note : </strong></b><span>Here, 10 men working 9 hours a day is equivalent to 90 working hours by 1 man. 15 men working 6 hours / day is also equivalent to 90 working hours by 1 man. Hence, the number of days required to complete the work would not change.)</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60202,
      "question": "<p dir=\"ltr\"><span>32 Bakers working 6 hours a day can make 400 cakes in 25 days. If 30 such bakers are given a contract to make 300 cakes in 24 days, how many hours a day should they work?</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>5</span></p>",
        "<p><span>6</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Here, we need to apply the formula </span><br><b><strong>M</strong></b><b><sub><strong>1</strong></sub></b><b><strong> D</strong></b><b><sub><strong>1</strong></sub></b><b><strong> H</strong></b><b><sub><strong>1</strong></sub></b><b><strong> E</strong></b><b><sub><strong>1</strong></sub></b><b><strong> / W</strong></b><b><sub><strong>1</strong></sub></b><b><strong> = M</strong></b><b><sub><strong>2</strong></sub></b><b><strong> D</strong></b><b><sub><strong>2</strong></sub></b><b><strong> H</strong></b><b><sub><strong>2</strong></sub></b><b><strong> E</strong></b><b><sub><strong>2</strong></sub></b><b><strong> / W</strong></b><b><sub><strong>2</strong></sub></b><span>, </span><br><span>where M</span><sub><span>1</span></sub><span> = 32 bakers, D</span><sub><span>1</span></sub><span> = 25 days, H</span><sub><span>1</span></sub><span> = 6 hours/day, W</span><sub><span>1</span></sub><span> = 400 cakes, E</span><sub><span>1</span></sub><span> = E</span><sub><span>2</span></sub><span> = Efficiency of each baker, M</span><sub><span>2</span></sub><span> = 30 bakers, D</span><sub><span>2</span></sub><span> = 24 days, H</span><sub><span>2</span></sub><span> = Daily working hours, for 30 bakers W</span><sub><span>2</span></sub><span> = 300 cakes, &nbsp; </span><br><span>So, we have 32 x 25 x 6 / 400 = 30 x 24 x H</span><sub><span>2</span></sub><span> / 300  </span><br><span>H</span><sub><span>2</span></sub><span> = 5 Therefore, 30 bakers should work 5 hours / day to make 300 cakes in 24 days.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60203,
      "question": "<p dir=\"ltr\"><span>Two friends A and B were hired to paint a room. A alone can paint the room in 10 days and is twice as efficient as B. Due to lack of resources, they decided to work alternatively with A starting first. Find the days it will take to paint the room.</span></p>",
      "options": [
        "<p><span>13</span></p>",
        "<p><span>15</span></p>",
        "<p><span>16</span></p>",
        "<p><span>18</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We are given that A alone can paint the room in 10 days and A is twice as efficient as B.  </span><br><span>B alone would take double the time than A alone ,i.e., 20 days. </span><br><span>Now, let the total work of painting be LCM (10, 20) = 20 units.  </span><br><span>Efficiency of A = 20/10 = 2 units / day .</span><br><span>Efficiency of B = 20/20 = 1 unit / day Since they work alternatively with A starting first, room painted in  1 cycle of 2 days = 3 units. </span><br><span>Room painted in 6 cycles (total 12 days) = 18 units Now, we are left with 20-18 = 2 units of painting and it is A's turn to paint, who can paint 2 units in a day. Therefore, total number of days required to paint the room = 12 + 1 = 13.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60204,
      "question": "<p dir=\"ltr\"><span>Two friends A and B take a job for Rs. 10000. Had they worked alone, A would have taken 20 days while B would have taken 30 days. They started working together but after 10 days, A left and B completed the remaining work alone. Find the difference between their share.</span></p>",
      "options": [
        "<p><span>0</span></p>",
        "<p><span>1000</span></p>",
        "<p><span>2000</span></p>",
        "<p><span>5000</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the total job be LCM (20, 30) = 60 units  </span><br><span>Efficiency of A = 60/20 = 3 units / day  </span><br><span>Efficiency of B = 60/30 = 2 units / day </span><br><span>Now, since they work for different number of days, the amount of Rs.10,000 would be divided in the ratio of units of work done. &nbsp; </span><br><span>Work done by A in 10 days = 30 units, Work done by B in 10 days = 20 units, Work left = 60 - 30 - 20 = 10 units,</span><br><span>This 10 units of leftover work was done by B alone. &nbsp; </span><br><span>Therefore, Total work done by A = 30 units, Total work done by B = 20 + 10 = 30 units. &nbsp; </span><br><span>Hence, ratio of share in amount = 30 : 30 = 1 : 1  </span><br><span>Each would be getting Rs.5000. Thus, difference in share = 0.</span></p>",
      "tag": "Work and Wages || MCQ"
    },
    {
      "id": 60205,
      "question": "<p dir=\"ltr\"><span>If 6 men and 8 boys can do a piece of work in 10 days while 26 men and 48 boys can do the same in 2 days, the time taken by 15 men and 20 boys in doing the same type of work will be:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4 days</span></p>",
        "<p dir=\"ltr\"><span>5 days</span></p>",
        "<p dir=\"ltr\"><span>6 days</span></p>",
        "<p dir=\"ltr\"><span>7 days</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the amount of work 1 man can do in 1 day be x and the amount of work 1 boys can do in 1 day be y. </span><br><span>Then, 6x + 8y = 1/10 and 26x + 48y = \u00bd. Solving these two equations, </span><br><span>we get: x = 1/100 and y = 1/200. </span><br><span>Amount of work done by 15 men and 20 boys in 1 day = 15/100 + 20/200 = \u00bc. </span><br><span>Therefore, the answer is 4 days. </span></p>",
      "tag": "Work and Wages || MCQ"
    }
  ],
  "Pipes and Cistern": [
    {
      "id": 60206,
      "question": "<p dir=\"ltr\"><span>Two outlet pipes A and B are connected to a full tank. Pipe A alone can empty the tank in 10 minutes and pipe B alone can empty the tank in 30 minutes. If both are opened together, how much time will it take to empty the tank completely?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>7 minutes</span></p>",
        "<p dir=\"ltr\"><span>7 minutes 30 seconds</span></p>",
        "<p dir=\"ltr\"><span>6 minutes</span></p>",
        "<p dir=\"ltr\"><span>6 minutes 3 seconds</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the tank be LCM(10, 30) = 30 units. </span><br><span>Efficiency of pipe A = 30 / 10 = 3 units / minute  </span><br><span>Efficiency of pipe A = 30 / 30 = 1 units / minute </span><br><span>Combined efficiency of pipe A and pipe B = 4 units / minute &nbsp; </span><br><span>Therefore, time required to empty the tank if both pipes work = 30 / 4 = 7 minutes 30 seconds</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60207,
      "question": "<p dir=\"ltr\"><span>Two pipes X and Y attached to a swimming pool can fill the pool in 20 minutes and 30 minutes respectively working alone. Both were opened together but due to malfunctioning of motor of pipe X, it had to be shut down after two minutes but Y continued to work till the swimming pool was filled completely. Find the total time taken to fill the pool.</span></p>",
      "options": [
        "<p><span>27</span></p>",
        "<p><span>22</span></p>",
        "<p><span>25</span></p>",
        "<p><span>20</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the pool be LCM(20, 30) = 60 units.  </span><br><span>Efficiency of pipe X = 60 / 20 = 3 units / minute </span><br><span>Efficiency of pipe Y = 60 / 30 = 2 units / minute </span><br><span>Combined efficiency of pipe X and pipe Y = 5 units / minute </span><br><span>Now, the pool is filled with the efficiency of 5 units / minute for two minutes. </span><br><span>Pool filled in two minutes = 10 units </span><br><span>Pool still empty = 60 - 10 = 50 units This 50 units is filled by Y alone. </span><br><span>Time required to fill these 50 units = 50 / 2 = 25 minutes &nbsp; </span><br><span>Therefore, total time required to fill the pool = 2 + 25 = 27 minutes.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60208,
      "question": "<p dir=\"ltr\"><span>Three pipes A, B and C were opened to fill a cistern. Working alone, A, B and C require 12, 15 and 20 minutes respectively.After 4 minutes of working together, A got blocked and after another 1 minute, B also got blocked. C continued to work till the end and the cistern got completely filled. What is the total time taken to fill the cistern ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>6 minutes</span></p>",
        "<p dir=\"ltr\"><span>6 minutes 15 seconds</span></p>",
        "<p dir=\"ltr\"><span>6 minutes 40 seconds</span></p>",
        "<p dir=\"ltr\"><span>6 minutes 50 seconds</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the cistern be LCM(12, 15, 20) = 60 units. </span><br><span>Efficiency of pipe A = 60 / 12 = 5 units / minute </span><br><span>Efficiency of pipe B = 60 / 15 = 4 units / minute </span><br><span>Efficiency of pipe C = 60 / 20 = 3 units / minute </span><br><span>Combined efficiency of pipe A, pipe B and pipe C = 12 units / minute </span><br><span>Now, the cistern is filled with the efficiency of 12 units / minute for 4 minutes.  </span><br><span>cistern filled in 4 minutes = 48 units </span><br><span>cistern still empty = 60 \u2013 48 = 12 units Now, A stops working. </span><br><span>Combined efficiency of pipe B and pipe C = 7 units / minute </span><br><span>Now, the cistern is filled with the efficiency of 7 units / minute for 1 minute.  </span><br><span>cistern filled in 1 minute = 7 units </span><br><span>cistern still empty = 12 \u2013 7 = 5 units Now, B also stops working. </span><br><span>These remaining 5 units are filled by C alone.  </span><br><span>Time required to fill these 5 units = 5 / 3 = 1 minute 40 seconds  &nbsp; </span><br><span>Therefore, total time required to fill the cistern = 4 minutes + 1 minutes + 1 minute 40 seconds = 6 minutes 40 seconds</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60209,
      "question": "<p dir=\"ltr\"><span>Three pipes A, B and C are connected to a tank. Working alone, they require 10 hours, 20 hours and 30 hours respectively. After some time, A is closed and after another 2 hours, B is also closed. C works for another 14 hours so that the tank gets filled completely. Find the time (in hours) after which pipe A was closed.</span></p>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>1.5</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the tank be LCM (10, 20, 30) = 60 </span><br><span>Efficiency of pipe A = 60 / 10 = 6 units / hour </span><br><span>Efficiency of pipe B = 60 / 20 = 3 units / hour </span><br><span>Efficiency of pipe C = 60 / 30 = 2 units / hour </span><br><span>Now, all three work for some time, say 't' hours. </span><br><span>So, B and C work for 2 more hours after 't' hours and then, C works for another 14 hours.  </span><br><span>Combined efficiency of pipe A, pipe B and pipe C = 11 units / hour  </span><br><span>Combined efficiency of pipe B and pipe C = 5 units / hour &nbsp; </span><br><span>So, we have 11 x t + 5 x 2 + 14 x 2 = 60  </span><br><span>11 t + 10 + 28 = 60 =&gt; 11 t = 60 - 38  </span><br><span>11 t = 22  </span><br><span>t = 2 &nbsp; Therefore, A was closed after 2 hours.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60210,
      "question": "<p dir=\"ltr\"><span>Working alone, two pipes A and B require 9 hours and 6.25 hours more respectively to fill a pool than if they were working together. Find the total time taken to fill the pool if both were working together.</span></p>",
      "options": [
        "<p><span>6</span></p>",
        "<p><span>6.5</span></p>",
        "<p><span>7</span></p>",
        "<p><span>7.5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the time taken if both were working together be 'n' hours. </span><br><span>Time taken by A = n + 9 </span><br><span>Time taken by B = n + 6.25 &nbsp; </span><br><span>In such kind of problems, we apply the formula : n</span><sup><span>2</span></sup><span>&nbsp;= a x b, </span><br><span>where 'a' and 'b' are the extra time taken if both work individually than if both work together. Therefore, n</span><sup><span>2</span></sup><span>&nbsp;= 9 x 6.25 </span><br><span>n = 3 x 2.5 = 7.5 &nbsp; </span><br><span>Thus, working together, pipes A and B require 7.5 hours.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60211,
      "question": "<p dir=\"ltr\"><span>Three pipes A, B and C were opened to fill a cistern. Working alone, A, B and C require 12, 15 and 20 minutes respectively. Another pipe D, which is a waste pipe, can empty the filled tank in 30 minutes working alone. What is the total time (in minutes) taken to fill the cistern if all the pipes are simultaneously opened ?</span></p>",
      "options": [
        "<p><span>5</span></p>",
        "<p><span>6</span></p>",
        "<p><span>7</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the cistern be LCM(12, 15, 20, 30) = 60 units.  </span><br><span>Efficiency of pipe A = 60 / 12 = 5 units / minute </span><br><span>Efficiency of pipe B = 60 / 15 = 4 units / minute </span><br><span>Efficiency of pipe C = 60 / 20 = 3 units / minute </span><br><span>Efficiency of pipe D = 60 / 30 = 2 units / minute </span><br><span>Combined efficiency of pipe A, pipe B, pipe C and pipe D = 10 units / minute &nbsp; </span><br><span>Therefore, time required to fill the cistern if all the pipes are opened simultaneously = 60 / 10 = 6 minutes.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60212,
      "question": "<p dir=\"ltr\"><span>Three pipes A, B and C were opened to fill a tank. Working alone, A, B and C require 10, 15 and 20 hours respectively. A was opened at 7 AM, B at 8 AM and C at 9 AM. At what time the tank would be completely filled, given that pipe C can only work for 3 hours at a stretch, and needs 1 hour standing time to work again.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>12 : 00 PM</span></p>",
        "<p dir=\"ltr\"><span>12 : 30 PM</span></p>",
        "<p dir=\"ltr\"><span>1 : 30 PM</span></p>",
        "<p dir=\"ltr\"><span>1 : 00 PM</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the tank be LCM (10, 15, 20) = 60  </span><br><span>Efficiency of pipe A = 60 / 10 = 6 units / hour </span><br><span>Efficiency of pipe B = 60 / 15 = 4 units / hour </span><br><span>Efficiency of pipe C = 60 / 20 = 3 units / hour </span><br><span>Combined efficiency of all three pipes = 13 units / hour &nbsp; </span><br><span>Till 9 AM, A works for 2 hours and B work for 1 hour. </span><br><span>Tank filled in 2 hours by A = 12 units  </span><br><span>Tank filled in 1 hour by B = 4 units  </span><br><span>Tank filled till 9 AM = 16 units </span><br><span>Tank still empty = 60 - 16 = 44 units &nbsp; </span><br><span>Now, all three pipes work for 3 hours with the efficiency of 13 units / hour. </span><br><span>Tank filled in 3 more hours = 39 units </span><br><span>Tank filled till 12 PM = 16 + 39 units = 55 units </span><br><span>Tank empty = 60 - 55 = 5 units &nbsp; </span><br><span>Now, C is closed for 1 hour and these remaining 5 units would be filled by A and B working together with the efficiency 10 units / hour. </span><br><span>Time taken to fill these remaining 5 units = 5 / 10 = 0.5 hours &nbsp; </span><br><span>Therefore, time at which the tank will be completely filled = 12 PM + 0.5 hours = 12 : 30 PM.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60213,
      "question": "<p dir=\"ltr\"><span>Two pipes A and B can fill a tank in 10 hours and 30 hours respectively. Due to a leak in the tank, it takes 2.5 hours more than the normal time to fill the tank if pipes A and B are working together. How much time would the leak alone will take to empty the tank ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>20 hours</span></p>",
        "<p dir=\"ltr\"><span>25 hours</span></p>",
        "<p dir=\"ltr\"><span>30 hours</span></p>",
        "<p dir=\"ltr\"><span>35 hours</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the tank be LCM (10, 30) = 30 units </span><br><span>Efficiency of pipe A = 30 / 10 = 3 units / hour </span><br><span>Efficiency of pipe B = 30 / 30 = 1 units / hour </span><br><span>Combined efficiency of both pipes = 4 units / hour </span><br><span>Now, total time taken by A and B working together to fill the tank if there was no leak = 30 / 4 = 7.5 hours</span><br><span>Actual time taken = 7.5 + 2.5 = 10 hours &nbsp; </span><br><span>The tank filled by A and B in these 2.5 hours is the extra work done to compensate the wastage by the leak in 10 hours. </span><br><span>2.5 hours work of A and B together = 10 hours work of the leak </span><br><span>2.5 x 4 = 10 x E, where 'E' is the efficiency of the leak. </span><br><span>E = 1 unit / hour &nbsp; Therefore, time taken by the leak alone to empty the full tank = 30 / 1 = 30 hours</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60214,
      "question": "<p dir=\"ltr\"><span>Two pipes, A and B operate in alternate hours along with a third pipe, C working continuously( i.e. In 1st hour A and C are working together and in next hour B and C are working together and so on.....) , to fill a swimming pool. When working alone, pipes A, B, and C can fill the pool in 10, 20, and 15 hours, respectively. What is the total time required to fill the pool when they work in this alternating manner?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>7 hours 14 minutes</span></p>",
        "<p dir=\"ltr\"><span>6 hours 54 minutes</span></p>",
        "<p dir=\"ltr\"><span>5 hours 14 minutes</span></p>",
        "<p dir=\"ltr\"><span>8 hours 54 minutes</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the pool be LCM (10, 20, 15) = 60 units. </span><br><span>Efficiency of pipe A = 60 / 10 = 6 units / hour </span><br><span>Efficiency of pipe B = 60 / 20 = 3 units / hour </span><br><span>Efficiency of pipe C = 60 / 15 = 4 units / hour &nbsp; </span><br><span>Efficiency of pipe A and pipe C working together = 10 units / hour </span><br><span>Efficiency of pipe B and pipe C working together = 7 units / hour &nbsp;</span><br><span>Pool filled in first hour = 10 units </span><br><span>Pool filled in second hour = 7 units </span><br><span>Pool filled in 2 hours = 10 + 7 = 17 units &nbsp; </span><br><span>We will have 3 cycles of 2 hours each such that A and C, and, B and C work alternatively. </span><br><span>Pool filled in 6 hours = 17 x 3 = 51 units </span><br><span>Pool empty = 60 - 51 = 9 units Now, these 9 units would be filled by A and C working together with the efficiency of 10 units / hour. </span><br><span>Time required to fill these 9 units = 9/10 hour = 0.9 hours = 54 minutes &nbsp; </span><br><span>Therefore, total time required to fill the pool = 6 hours 54 minutes.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60215,
      "question": "<p dir=\"ltr\"><span>Two pipes A and B are connected to drain out a water tank. A alone can drain out the tank in 20 hours and B can drain 20 liters per hour. Find the capacity of the water tank given that working together, they require 12 hours to completely drain out the tank.</span></p>",
      "options": [
        "<p><span>600</span></p>",
        "<p><span>400</span></p>",
        "<p><span>800</span></p>",
        "<p><span>700</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the capacity of the tank be LCM (20, 12) = 60 units </span><br><span>Efficiency of A working alone = 60 / 20 = 3 units / hour </span><br><span>Efficiency of A and B working together = 60 / 12 = 5 units / hour </span><br><span>Therefore, Efficiency of B working alone = Efficiency of A and B working together - Efficiency of A working alone </span><br><span>Efficiency of B working alone = 5 - 3 = 2 units / hour </span><br><span>Time required by B alone to drain the tank = 60 / 2 = 30 hours &nbsp; </span><br><span>But we are given that B can drain the tank at the rate of 20 liters per hour. </span><br><span>Therefore, capacity of the water tank = 20 x 30 = 600 liters.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60216,
      "question": "<p dir=\"ltr\"><span>Two friends A and B decided to work together and fill a pool of capacity 1000 liters. Using a bucket each, A fills at the rate of 4 liters every 3 minutes and B fills at 3 liters every 4 minute. What would be the total time required to fill the pool, given that they take a break of 3 minutes each time both of them put a bucket into the pool at the same instant ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>6 hours</span></p>",
        "<p dir=\"ltr\"><span>10 hours</span></p>",
        "<p dir=\"ltr\"><span>8 hours</span></p>",
        "<p dir=\"ltr\"><span>9 hours 57 minutes</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We are given that A fills the pool at the rate of 4 liters every 3 minutes and B fills the pool at the rate of 3 liters every 4 minutes. </span><br><span>Pool filled by A in 12 minutes = 4 x 4 = 16 liters </span><br><span>Pool filled by B in 12 minutes = 3 x 3 = 9 liters </span><br><span>Pool filled in 12 minutes = 16 + 9 = 25 liters  or we can say to fill 25 liters water, they will take 12 minutes. </span><br><span>Therefore to fill 1000 liters they will take (12*1000)/25 minutes i.e. 8 hours. </span><br><span>Since they will put a bucket at the same instant every 12 minutes. (LCM of 3 and 4 minutes = 12 minutes). </span><br><span>After every 12 minutes they will take rest for 3 minutes. </span><br><span>Overall&nbsp;&nbsp;(8*60)/12 i.e 40 times they take rest while working . </span><br><span>So every 12 minutes should be considered 15 (12+3) minutes for 40 times. </span><br><span>But after having taken 39 times . The pool of capacity 1000 liters will be filled. </span><br><span>Last 3 minutes must not be considered.  </span><br><span>Therefore, to fill 1000 liters (25 x 40 liters), it would take (12*1000)/25 minutes </span><br><span>i.e. 8 hours. + (39*3) minutes = 8 hrs. + 117 minutes So ans is&nbsp; 9 hrs 57 minutes.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60217,
      "question": "<p dir=\"ltr\"><span>Two taps A and B can fill a tank in 10 hours and 15 hours respectively. If both the taps are opened together, the tank will be full in ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>5 hr</span></p>",
        "<p dir=\"ltr\"><span>6 hr</span></p>",
        "<p dir=\"ltr\"><span>4 hr</span></p>",
        "<p dir=\"ltr\"><span>3 hr</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>If A can do a piece of work in x hours and B can do a piece of work in y hours.</span><br><span>Then A and B together will do the work in = (1/x) + (1/y)</span><br><span>Time taken by A = 10 hours</span><br><span>Time taken by B = 15 hours</span><br><span>Time taken by A and B = (15\u00d710 / 15+10) = 6 hours.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60218,
      "question": "<p dir=\"ltr\"><span>To fill a cistern, pipes A, B and C take 15 minutes, 12 minute and 10 minutes respectively. The time in minutes that the three pipes together will take to fill the cistern is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>5 min</span></p>",
        "<p dir=\"ltr\"><span>7 min</span></p>",
        "<p dir=\"ltr\"><span>4 min</span></p>",
        "<p dir=\"ltr\"><span>6 min</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A can do a piece of work in x minutes</span><br><span>B can do a piece of work in y minutes</span><br><span>C can do a piece of work in z minutes</span><br><span>Minute\u2019s work of each of the three is 1/x +1/y + 1/z</span><br><span>1 minutes work of each of the three pipes = 1/15 + 1/12 + 1/10= 1/4.</span><br><span>so, its take 4 minutes to fill the cistern. </span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60219,
      "question": "<p dir=\"ltr\"><span>Two pipes can fill a tank in 10 hours and 12 hours respectively, while third pipe empties the full tank in 20 hours. If all the three pipes operate simultaneously, in how much time the tank will be filled?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>7 hr. 30 min.</span></p>",
        "<p dir=\"ltr\"><span>7 hr. 25 min</span></p>",
        "<p dir=\"ltr\"><span>7 hr. 40 min</span></p>",
        "<p dir=\"ltr\"><span>7 hr. 50 min</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Pipe A can fill a tank in x hours and pipe B can fill a tank in y hours and pipe C can empty it in z hours. </span><br><span>If all the pipes are operate simultaneously, 1 hours of work of each of the three pipes = 1/x +1/y - 1/z</span><br><span>1 hour work of each of the three pipes = 1/10 + 1/12 - 1/20 = 2/15 hours&nbsp;</span><br><span>so, it takes 7 \u00bd hour = 7 hours 30 minutes. to fulfill the tank completely.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    },
    {
      "id": 60220,
      "question": "<p dir=\"ltr\"><span>A cistern can be filled in 9 hours but it takes 10 hours due to a leak in its bottom. If the cistern is full, then the time that the leak will take to empty it is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>60 hr</span></p>",
        "<p dir=\"ltr\"><span>50 hr</span></p>",
        "<p dir=\"ltr\"><span>80 hr</span></p>",
        "<p dir=\"ltr\"><span>90 hr</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>If A can fill a tank in x hours and B can empty a tank in y hours. Then the tank will be empty in = (xy / y-x) hours</span><br><span>Time taken by A = 9 hours</span><br><span>Time taken by B = 10 hours</span><br><span>Time taken by A and B = (9x10 / 10-9) = 90 hours.</span></p>",
      "tag": "Pipes and Cistern || MCQ"
    }
  ],
  "Algebra": [
    {
      "id": 60221,
      "question": "<p dir=\"ltr\"><span>If log(base a) 2 = x and log(base a) 8 = y, what is the value of log(base a) 16?&nbsp;</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2x + y&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>2x - y&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>x + y&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>4x</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We know that log(base a) 2 = x and log(base a) 8 = y.&nbsp;</span><br><span>We need to find the value of log(base a) 16.&nbsp;</span><br><span>Let's express 16 as a power of 2: {16 = 2^4}&nbsp;</span><br><span>Now, we can rewrite log(base a) 16 using the properties of logarithms:&nbsp;</span><br><span>log(base a) 16 = log(base a) (2^4)&nbsp;</span><br><span>Using the power rule of logarithms, we can bring the exponent out front:&nbsp;</span><br><span>log(base a) 16 = 4 * log(base a) 2&nbsp;</span><br><span>Substituting the given values, we have: log(base a) 16 = 4x&nbsp;</span><br><span>The correct answer is 4x.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60222,
      "question": "<p dir=\"ltr\"><span>If pqr \u2260 0 and p^(-x) = 1/q, q^(-y) = 1/r, r^(-z) = 1/p, find the value of the product xyz ?</span></p>",
      "options": [
        "<p><span>-1</span></p>",
        "<p dir=\"ltr\"><span>1 / pqr</span></p>",
        "<p><span>1</span></p>",
        "<p dir=\"ltr\"><span>pqr</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Taking logs of given three values, we get</span><br><span>1/q = p</span><sup><span>-x</span></sup><span> -------(1)</span><br><span>1/r = q</span><sup><span>-y</span></sup><span> -------(2)</span><br><span>1/p = r</span><sup><span>-z</span></sup><span> -------(3)</span><br><span>1/q = p</span><sup><span>-x</span></sup><br><span>1/q = r</span><sup><span>-xz</span></sup><span> [Putting value of p from (3)]</span><br><span>1/q = q</span><sup><span>-xyz</span></sup><span>  [Putting value of r from (2)]</span><br><span>1/q = 1 / q</span><sup><span>xyz</span></sup><br><span>On comparing power of q both sides, we get xyz = 1</span><br><span>So, option (C) is correct.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60223,
      "question": "<p dir=\"ltr\"><span>If values of P=3, R=27, T=243, then find the value of Q+S = ________ .</span></p>",
      "options": [
        "<p><span>40</span></p>",
        "<p><span>80</span></p>",
        "<p><span>90</span></p>",
        "<p><span>180</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given, sequence is in n-th power of 3. Starting from n=1 and position 'P' alphabetically order.</span></p><p dir=\"ltr\"><span>P = 3</span><sup><span>1</span></sup><span> = 3 </span><br><span>Q = 3</span><sup><span>2</span></sup><span> = 9</span><br><span>R = 3</span><sup><span>3</span></sup><span> = 27</span><br><span>S = 3</span><sup><span>4</span></sup><span> = 81</span><br><span>T = 3</span><sup><span>5</span></sup><span> = 243 </span></p><p dir=\"ltr\"><span>Therefore,</span><br><span>Q+S = 9+81 = 90 </span><br><span>Option (C) is correct.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60224,
      "question": "<p dir=\"ltr\"><span>The value of x+1/2x is given as 2, then find the value of 8x</span><sup><span>3</span></sup><span>+1/x</span><sup><span>3</span></sup></p>",
      "options": [
        "<p><span>40/3</span></p>",
        "<p><span>20/7</span></p>",
        "<p><span>28</span></p>",
        "<p><span>40</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>x</span><sup><span>3 </span></sup><span>+ 1/8x</span><sup><span>3</span></sup><span> + 3.x.1/2x(x + 1/2x) = (x+1/2x)</span><sup><span>3</span></sup><br><span>x</span><sup><span>3</span></sup><span> + 1/8x</span><sup><span>3 </span></sup><span>+ 3 = 2</span><sup><span>3</span></sup><br><span>x</span><sup><span>3</span></sup><span> + 1/8x</span><sup><span>3</span></sup><span> = 5</span><br><span>8x</span><sup><span>3</span></sup><span> + 1/x</span><sup><span>3</span></sup><span> = 5.8 = 40</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60225,
      "question": "<p dir=\"ltr\"><span>The sum of two numbers is 24 and their product is 128. Find the absolute difference of numbers.</span></p>",
      "options": [
        "<p><span>2</span></p>",
        "<p><span>4</span></p>",
        "<p><span>6</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the numbers be \u2018x\u2019 and \u2018y\u2019.</span><br><span>x + y = 24 and x y = 128&nbsp;</span><br><span>Here, we need to apply the formula</span><br><span>(x + y)&nbsp;2&nbsp;\u2013 (x \u2013 y)&nbsp;2&nbsp;= 4xy&nbsp;</span><br><span>(24)2&nbsp;\u2013 (x \u2013 y)&nbsp;2&nbsp;= 4 x (128)&nbsp;</span><br><span>(x \u2013 y)&nbsp;2&nbsp;= (24)2&nbsp;\u2013 4 x (128)&nbsp;</span><br><span>(x \u2013 y)&nbsp;2&nbsp;= 576 \u2013 512</span><br><span>(x \u2013 y)&nbsp;2&nbsp;= 64 =&gt; |x \u2013 y| = 8</span><br><span>Therefore, absolute difference of the two numbers = 8.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60226,
      "question": "<p dir=\"ltr\"><span>The cubic polynomial y(x) which takes the following values: y(0) = 1, y(1) = 0, y(2) = 1 y(3) = 10 is</span></p>",
      "options": [
        "<p>[Tex] x^{3} - 2 x^2 + 1 [/Tex]</p>",
        "<p>[Tex] x^3 + 3x^2 + 1[/Tex]</p>",
        "<p>[Tex]x^3 + 1[/Tex]</p>",
        "<p>[Tex]x^3 +2 x^2 + 1[/Tex]</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The answer can be obtained by substituting the values of x and checking for y(x): Option (A) is correct as:</span></p><p dir=\"ltr\"><span>x = 0: y(x) = 1</span><br><span>x = 1: y(x) = 0</span><br><span>x = 2: y(x) = 8 - 8 + 1 = 1</span><br><span>x = 3: y(x) = 27 - 18 + 1 = 10</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60227,
      "question": "<img src=\"http://www.geeksforgeeks.org/wp-content/uploads/gq/2017/01/Mock.png\" alt=\"mock\" width=\"495\" height=\"103\" loading=\"auto\"><p dir=\"ltr\"><span>choose the correct answer:</span></p>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>0</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "[Tex]Applying R_{2}\\rightarrow R_{2} + 2R_{1}; R_{3}\\rightarrow R_{3} + 3R_{1}; R_{4}\\rightarrow R_{4} + 5R_{1};[/Tex][Tex]Q \\sim \\begin{bmatrix}\n -1&amp; 2 &amp; 3 &amp;-2 \\\\\n  0&amp; -1 &amp; 7 &amp; -2\\\\ \n  0&amp; -2 &amp; 14 &amp; -4\\\\ \n  0&amp; -2 &amp; 14 &amp; -4\n\\end{bmatrix}[/Tex][Tex]Applying R_{3}\\rightarrow R_{3} - 2R_{2}; R_{4}\\rightarrow R_{4} + 2R_{2}[/Tex][Tex]Q \\sim \\begin{bmatrix}\n -1&amp; 2 &amp; 3 &amp;-2 \\\\\n  0&amp; -1 &amp; 7 &amp; -2\\\\ \n  0&amp;  0 &amp; 0 &amp;  0\\\\ \n  0&amp;  0 &amp; 0 &amp; 0\n\\end{bmatrix}[/Tex][Tex]\\therefore [/Tex]<p dir=\"ltr\"><span>It is echelon form. </span></p>[Tex]\\therefore [/Tex]<p dir=\"ltr\"><span>Rank of Q = 2 &lt; n-1 We know that if </span></p>[Tex]\\rho (A_{n \\times n})[/Tex]<p dir=\"ltr\"><span> &lt; n-1 then </span></p>[Tex]\\rho (Adj \\ A)[/Tex]<p dir=\"ltr\"><span> = 0. So, Rank of Adjoint matrix of Q is 0. </span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60228,
      "question": "<p dir=\"ltr\"><span>Following instructions are to be used throughout the quiz:</span><br><br><span> Each of the questions given below consists of a statement and/or a question and two statements numbered I and II given below it. You have to decide whether the data provided in the statement(s) is/are sufficient to answer the given question. </span><br><span> Read both the statements and Give answer </span><br><span> (a) if the data in Statement I alone is sufficient to answer the question, while the data in Statement II alone is not sufficient to answer the question.</span><br><span> (b) if the data in Statement II alone is sufficient to answer the question, while the data in Statement I alone is not sufficient to answer the question.</span><br><span> (c) if the data in each Statement I and Statement II alone is sufficient to answer the question.</span><br><span> (d) if the data even in both Statements I and II together are not sufficient to answer the question.</span><br><span> (e) if the data in both Statements I and II together are necessary to answer the question.</span><br><br><span> If x,y are integers, then (x</span><sup><span>2</span></sup><span> + y</span><sup><span>2</span></sup><span>)</span><sup><span>1/2</span></sup><span> is an integer?</span><br><span> I) x</span><sup><span>2</span></sup><span> + y</span><sup><span>2</span></sup><span> is an integer</span><br><span> II) x</span><sup><span>2</span></sup><span> - 3y</span><sup><span>2</span></sup><span> = 0</span><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>",
        "<p dir=\"ltr\"><span>E</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><b><strong>Statement 1:</strong></b></p><p dir=\"ltr\"><span> x</span><sup><span>2</span></sup><span>+ y</span><sup><span>2</span></sup><span> is an integer Since x and y are integer x</span><sup><span>2</span></sup><span>+ y</span><sup><span>2</span></sup><span> can be any real number which may not be a perfect square so statement 1 alone cant prove whether(x</span><sup><span>2</span></sup><span>+y</span><sup><span>2</span></sup><span>)</span><sup><span>(\u00bd)</span></sup><span> is an integer or not. </span></p><p dir=\"ltr\"><b><strong>Statement 2:</strong></b></p><p dir=\"ltr\"><span>x</span><sup><span>2</span></sup><span>- 3y</span><sup><span>2</span></sup><span> = 0 </span><br><span>x</span><sup><span>2</span></sup><span>+y</span><sup><span>2</span></sup><span>-4y</span><sup><span>2</span></sup><span>=0</span><br><span>x</span><sup><span>2</span></sup><span>+y</span><sup><span>2</span></sup><span>=4y</span><sup><span>2</span></sup><span> </span><br><span>(x</span><sup><span>2</span></sup><span>+y</span><sup><span>2</span></sup><span>)</span><sup><span>(\u00bd)</span></sup><span>= 2y  Which is an integer because y is an integer. </span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60229,
      "question": "<p dir=\"ltr\"><span>If a total of 324 coins of 20 paise and 25 paise make a sum of Rs 71. Then find the number of 25-paise coins.</span></p>",
      "options": [
        "<p><span>104</span></p>",
        "<p><span>120</span></p>",
        "<p><span>124</span></p>",
        "<p><span>128</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the number of 20-paise coins be x and the number of 25-paise coins be y. </span><br><span>Then, x + y = 324 (equation 1) </span><br><span>And, x/5 + y/4 = 71 </span><br><span>4x + 5y = 71 \u00d7 20 (Multiplying by 20 on both sides) Substituting the value of x from equation 1, we get 4(324-y) + 5y = 71 \u00d7 20.</span><br><span>1296 - 4y + 5y = 1420</span><br><span>Therefore, y = 124.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60230,
      "question": "<p dir=\"ltr\"><span>A zoo has some peacocks and some horses. If the number of heads be 48 and the number of feet be 140, then the number of peacocks will be:</span></p>",
      "options": [
        "<p><span>23</span></p>",
        "<p><span>24</span></p>",
        "<p><span>25</span></p>",
        "<p><span>26</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let there be x peacocks and y horses. </span><br><span>Then, x + y = 48 (equation 1) and 2x + 4y = 140 </span><br><span>x + 2y = 70 </span><br><span>Substituting the value of x from equation 1, </span><br><span>we get 48-y + 2y = 70 y = 22 </span><br><span>Then, x = 48 - 22 = 26.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60231,
      "question": "<p dir=\"ltr\"><span>Find the value of (1-1/3)(1-1/4)(1-1/5)...(1-1/100).</span></p>",
      "options": [
        "<p><span>1/10</span></p>",
        "<p><span>1/17</span></p>",
        "<p><span>1/20</span></p>",
        "<p><span>1/50</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have (1-1/3)(1-1/4)(1-1/5)...(1-1/100) = (2/3)(3/4)(4/5)...(99/100) = 2/100 = 1/50.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60232,
      "question": "<p dir=\"ltr\"><span>If 2x/(1 + 1/(1 + x/(1 - x))) = 1, then find the value of x.</span></p>",
      "options": [
        "<p><span>1/3</span></p>",
        "<p><span>2/3</span></p>",
        "<p><span>1/2</span></p>",
        "<p><span>3/2</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have 2x/(1 + 1/(1 + x/(1-x))) = 1 </span><br><span>2x/(1 + 1/((1-x+x)/(1-x))) = 1 </span><br><span>2x/(1 + 1/(1/(1-x))) = 1 </span><br><span>2x/(1 + 1-x) = 1 </span><br><span>2x/(2-x) = 1 </span><br><span>2x = 2-x </span><br><span>3x = 2 </span><br><span>x = 2/3.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60233,
      "question": "<p dir=\"ltr\"><span>4/15 of 5/7 of a number is greater than 4/9 of 2/5 of the same number by 8. What is half of that number?</span></p>",
      "options": [
        "<p><span>630</span></p>",
        "<p><span>63</span></p>",
        "<p><span>315</span></p>",
        "<p><span>105</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the number be x. </span><br><span>Then, 4/15 of 5x/7 = 4/9 of 2x/5 + 8 </span><br><span>4/15 \u00d7 5x/7 = 4/9 \u00d7 2x/5 + 8 </span><br><span>4x/21 = 8x/45 + 8 </span><br><span>x/21 = 2x/45 + 2 </span><br><span>x/21 = (2x + 90)/45 </span><br><span>45x = 21(2x + 90) </span><br><span>45x = 42x + 90 \u00d7 21 </span><br><span>3x = 90 \u00d7 21 </span><br><span>x = 30 \u00d7 21 = 630.  </span><br><span>Half of the number will be x/2  x/2 = 630/2 = 315.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60234,
      "question": "<p dir=\"ltr\"><span>If a+b+c = 0, then the value of </span>[Tex]\\frac{a^2}{bc}[/Tex]<span> + </span>[Tex]\\frac{b^2}{ac}[/Tex]<span> + </span>[Tex]\\frac{c^2}{ab}[/Tex]<span> will be?\u00a0</span></p>",
      "options": [
        "<p><span>3</span></p>",
        "<p><span>2</span></p>",
        "<p><span>1</span></p>",
        "<p><span>0</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Using, a\u00b3 + b\u00b3 + c\u00b3 - 3abc = (a + b + c)(a\u00b2 + b\u00b2 + c\u00b2 - ab - ac - bc):</span></p><p dir=\"ltr\"><span>If a + b + c = 0, then a\u00b3 + b\u00b3 + c\u00b3 = 3abc</span></p><p dir=\"ltr\"><span>a\u00b3 + b\u00b3 + c\u00b3 = 3abc</span></p><p dir=\"ltr\"><span>On dividing both sides by abc, we get:</span></p><p dir=\"ltr\"><span>(a\u00b3/abc) + (b\u00b3/abc) + (c\u00b3/abc) = 3abc/abc</span></p><p dir=\"ltr\"><span> (a\u00b2/bc) + (b\u00b2/ac) + (c\u00b2/ab) = 3</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60235,
      "question": "<p dir=\"ltr\"><span>The value of </span>[Tex]\\left(1 + \\dfrac{1}{x}\\right)\r\n\\left(1 + \\dfrac{1}{x+1}\\right)\r\n\\left(1 + \\dfrac{1}{x+2}\\right)\r\n\\left(1 + \\dfrac{1}{x+3}\\right)[/Tex]<span> is?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>1 + 1/(x+4)</span></p>",
        "<p dir=\"ltr\"><span>x+4</span></p>",
        "<p dir=\"ltr\"><span>1/x</span></p>",
        "<p dir=\"ltr\"><span>(x+4)/ x</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>[Tex]\\left(1 + \\frac{1}{x}\\right)\r\n\\left(1 + \\frac{1}{x+1}\\right)\r\n\\left(1 + \\frac{1}{x+2}\\right)\r\n\\left(1 + \\frac{1}{x+3}\\right)[/Tex]</p><p dir=\"ltr\"><span>Taking LCM of each term</span></p><p>[Tex]\\Rightarrow \r\n\\left(\\frac{x+1}{x}\\right)\r\n\\left(\\frac{x+2}{x+1}\\right)\r\n\\left(\\frac{x+3}{x+2}\\right)\r\n\\left(\\frac{x+4}{x+3}\\right)[/Tex]</p><p>[Tex]\\Rightarrow \\frac{1}{x} \\times (x+4)[/Tex]</p><p>[Tex]\\Rightarrow \\frac{x+4}{x}[/Tex]</p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60236,
      "question": "<p dir=\"ltr\"><span>If the value of b</span><sup><span>2</span></sup><span> + </span><sup><span>1</span></sup><span>\u2044</span><sub><span>b</span></sub><sup><span>2</span></sup><span> = 1, then find the value of b</span><sup><span>3</span></sup><span> + </span><sup><span>1</span></sup><span>\u2044</span><sub><span>b</span></sub><sup><span>3 </span></sup><span>.</span></p>",
      "options": [
        "<p><span>-1/12</span></p>",
        "<p><span>-2</span></p>",
        "<p><span>-4</span></p>",
        "<p dir=\"ltr\"><span>None of the above</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>b</span><sup><span>3</span></sup><span> + </span><sup><span>1</span></sup><span>\u2044</span><sub><span>b</span></sub><sup><span>3</span></sup><span> = (b + </span><sup><span>1</span></sup><span>\u2044</span><sub><span>b</span></sub><span>)(b</span><sup><span>2</span></sup><span> - 1 + </span><sup><span>1</span></sup><span>\u2044</span><sub><span>b</span></sub><sup><span>2</span></sup><span>) = 0.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60237,
      "question": "<p dir=\"ltr\"><span>For what value of x, the following equation: 5</span><sup><span>\u221ax</span></sup><span> +12</span><sup><span>\u221ax</span></sup><span> =13</span><sup><span>\u221ax</span></sup><span> will be true?</span></p>",
      "options": [
        "<p><span>-2</span></p>",
        "<p><span>0</span></p>",
        "<p><span>3</span></p>",
        "<p dir=\"ltr\"><span>None of the above</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>For x=1</span><br><span>17 \u2260 13</span><br><span>for, x=2 and 3 also not possible&nbsp;</span><br><span>x=4&nbsp;</span><br><span>25+144 = 169&nbsp;</span><br><span>169=169</span></p><p dir=\"ltr\"><span>So the correct answer is none of the above. </span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60238,
      "question": "<p dir=\"ltr\"><span>Solve for x in the equation: log(2x - 1) + log(3) = log(x + 5)&nbsp;</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>x = -1/3&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>x = 1/3&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>x = 5/3&nbsp;</span></p>",
        "<p dir=\"ltr\"><span>x = 8/5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Using the property of logarithms that states log(a) + log(b) = log(ab), </span><br><span>we can simplify the equation as log(3(2x - 1)) = log(x + 5). </span><br><span>Therefore, we have 6x - 3 = x + 5. </span><br><span>Simplifying, we get 5x = 8, </span><br><span>which gives us x = 8/5. </span><br><span>x = 8/5. (Hence, the answer is D)</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60239,
      "question": "<p dir=\"ltr\"><span>If x takes only real numbers. For what value of x, the value of&nbsp;the expression: 4\u22126x\u2212x</span><sup><span>2</span></sup><span>&nbsp;will be maximum?</span></p>",
      "options": [
        "<p><span>-4</span></p>",
        "<p><span>-3</span></p>",
        "<p><span>0</span></p>",
        "<p><span>3</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Differentiate and equate to 0 </span><br><span>6+2x =0 </span><br><span>x=\u22123.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60240,
      "question": "<p dir=\"ltr\"><span>Given two numbers x and y such that x</span><sup><span>3</span></sup><span> + y</span><sup><span>3</span></sup><span> = 9\u00a0and x + y = 3 .</span><br/><span>Find the value of\u00a0x</span><sup><span>4</span></sup><span>+y</span><sup><span>4 </span></sup><span>.</span></p>",
      "options": [
        "<p><span>2/3</span></p>",
        "<p><span>7</span></p>",
        "<p><span>13</span></p>",
        "<p><span>17</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>x</span><sup><span>3</span></sup><span>+y</span><sup><span>3</span></sup><span> = (x + y) \u00d7 (x</span><sup><span>2</span></sup><span> \u2212 xy + y</span><sup><span>2</span></sup><span>)</span><br/><span>Putting given values of x</span><sup><span>3</span></sup><span>+y</span><sup><span>3</span></sup><span> and (x + y)</span><br/><span>9 = 3 \u00d7 ((x+y)</span><sup><span>2</span></sup><span> \u2212 3xy)</span><br/><span>9 = 3 \u00d7 (9 \u2212 3xy) </span><br/><span>9 = 27 \u2212 9xy</span><br/><span>9xy = 18</span><br/><span>xy = 2</span><br/><span>x</span><sup><span>4</span></sup><span> + y</span><sup><span>4</span></sup><span> = (x</span><sup><span>2</span></sup><span> + y</span><sup><span>2</span></sup><span>)</span><sup><span>2</span></sup><span> - 2x</span><sup><span>2</span></sup><span>y</span><sup><span>2</span></sup><br/><span>x</span><sup><span>4</span></sup><span> + y</span><sup><span>4</span></sup><span> = (x</span><sup><span>2</span></sup><span> + y</span><sup><span>2</span></sup><span>)</span><sup><span>2</span></sup><span> - 2*4 </span><br/><span>[Putting value of xy]</span><br/><span>x</span><sup><span>4</span></sup><span> + y</span><sup><span>4</span></sup><span> = ((x + y)</span><sup><span>2</span></sup><span> - 2xy)</span><sup><span>2</span></sup><span> - 2*4 </span><br/><span>[Putting values of (x+y) and xy]</span><br/><span>x</span><sup><span>4</span></sup><span> + y</span><sup><span>4</span></sup><span> = (9 - 4)</span><sup><span>2</span></sup><span> - 2*4 </span><br/><span>x</span><sup><span>4</span></sup><span> + y</span><sup><span>4</span></sup><span> = 17.</span></p>",
      "tag": "Algebra || MCQ"
    },
    {
      "id": 60241,
      "question": "<p dir=\"ltr\"><span> If x</span><sup><span>1/3</span></sup><span> + y</span><sup><span>1/3</span></sup><span> - z</span><sup><span>1/3</span></sup><span> = 0 then value of (x + y - z)</span><sup><span>3</span></sup><span> + 27xyz is</span></p>",
      "options": [
        "<p><span>8</span></p>",
        "<p><span>2</span></p>",
        "<p><span>0</span></p>",
        "<p><span>6</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>x</span><sup><span>1/3</span></sup><span> + y</span><sup><span>1/3</span></sup><span> = z</span><sup><span>1/3</span></sup><br><span>Now cubing both sides we get </span><br><span>x + 3x</span><sup><span>1/3</span></sup><span>y</span><sup><span>1/3</span></sup><span>(x</span><sup><span>1/3</span></sup><span> + y</span><sup><span>1/3</span></sup><span>) + y = z</span><br><span>or, (x + y - z) = -3x</span><sup><span>1/3</span></sup><span>y</span><sup><span>1/3</span></sup><span>z</span><sup><span>1/3</span></sup><br><span>Cubing again both sides, (x + y - z) = -27xyz.</span><br><span>So answer is zero</span></p>",
      "tag": "Algebra || MCQ"
    }
  ],
  "Mensuration 2D": [
    {
      "id": 60242,
      "question": "<p dir=\"ltr\"><span>Jack went to the garden for a picnic. He saw a board in the garden with the area of the square garden mentioned as 625 sq.m. He is curious to know what will be the area of a path of width 2.5 m around it if the path is outside the garden?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>169 sq. m</span></p>",
        "<p dir=\"ltr\"><span>200 sq. m</span></p>",
        "<p dir=\"ltr\"><span>275 sq. m</span></p>",
        "<p dir=\"ltr\"><span>400 sq. m</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>area of the square garden = 625m\u00b2</span><br><span>therefore side\u00b2 = 625m\u00b2</span><br><span>side = \u221a625</span><br><span>side = 25m</span><br><span>hence, the length of the side of the square garden is 25m.</span><br><span>therefore the length of the path = 25+2.5+2.5</span><br><span>the length of the path = 25 + 5 = 30m</span><br><span>total area along with the road = 30\u00d730 = 900m\u00b2</span><br><span>hence, area of the path=900-625 = 275 sq m</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60243,
      "question": "<p dir=\"ltr\"><span>Johnny went to an exhibition, he saw a triangular swing there. He noted the dimensions of the swing as 3m, 4m, and 5m. Find its area?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>7/2 sq. m</span></p>",
        "<p dir=\"ltr\"><span>5 sq. m</span></p>",
        "<p dir=\"ltr\"><span>6 sq. m</span></p>",
        "<p dir=\"ltr\"><span>11 sq. m</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given is a right angled triangle as 3</span><sup><span>2</span></sup><span> + 4</span><sup><span>2</span></sup><span> = 5</span><sup><span>2</span></sup><br><span>so, Area = \u00bd \u00d7 Base \u00d7 Height</span><br><span>\u00bd \u00d7 3 \u00d7 4 = 6 m</span><sup><span>2</span></sup></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60244,
      "question": "<p dir=\"ltr\"><span>Given: The area of a rectangle field is 6000 sq.m. The ratio of the sides is 5:4, find the perimeter of the rectangular field.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>100 m</span></p>",
        "<p dir=\"ltr\"><span>183\u221a3 m</span></p>",
        "<p dir=\"ltr\"><span>180\u221a3 m</span></p>",
        "<p dir=\"ltr\"><span>200 m</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>5x \u00d7 4x = 6000</span><br><span>x</span><sup><span>2</span></sup><span> = 300</span><br><span>x= 10\u221a3</span><br><span>perimeter = [(50\u221a3)+(40\u221a3)]\u00d72 = 180\u221a3</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60245,
      "question": "<p dir=\"ltr\"><span>If the diagonal of a square has a length of 23\u221a2. Find the area of the square?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>46\u221a2 sq . m</span></p>",
        "<p dir=\"ltr\"><span>441 sq. m</span></p>",
        "<p dir=\"ltr\"><span>529 sq. m</span></p>",
        "<p dir=\"ltr\"><span>1058 sq. m</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>2(Area of square)</span><sup><span>2</span></sup><span> = (Diagonal)</span><sup><span>2</span></sup><br><span>2a</span><sup><span>2</span></sup><span> = 2 \u00d7 23</span><sup><span>2</span></sup><span>  </span><br><span>a</span><sup><span>2</span></sup><span> = 23</span><sup><span>2</span></sup><span> = 529 sq. m</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60246,
      "question": "<p dir=\"ltr\"><span>The diagonals of a rhombus are 26 cm and 14 cm. Find the length of its boundaries:</span></p>",
      "options": [
        "<p><span>30\u221a3</span></p>",
        "<p><span>4\u00d7\u221a216</span></p>",
        "<p><span>4\u00d7\u221a218</span></p>",
        "<p dir=\"ltr\"><span>None of the above</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><b><strong>Given:</strong></b><span> Diagonals of a rhombus = 14 cm and 26 cm.</span><br><b><strong>To Find:</strong></b><span> Find its Perimeter i.e. length of boundaries.</span></p><p dir=\"ltr\"><b><strong>Solution:</strong></b><span> To find the perimeter of the rhombus we should find the length of its side as perimeter = 4a, </span><br><span>where a is the length of one side of the rhombus.</span><br><span>As diagonals of the rhombus are perpendicular, they bisect each other.</span><br><span>So, 26 cm is considered as 13 cm = x and 14 cm is considered as 7 cm = y</span><br><span>Side of the rhombus, a = \u221a(13</span><sup><span>2</span></sup><span>+7</span><sup><span>2</span></sup><span>)</span><br><span>a = \u221a218 cm</span><br><span>Perimeter, p = 4a = 4 \u00d7 \u221a218 cm.</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60247,
      "question": "<p dir=\"ltr\"><span>The sides of a rectangular garden are 36 m x 64 m. Find the perimeter of a square garden which is having the same area as that of the rectangle?</span></p>",
      "options": [
        "<p><span>136</span></p>",
        "<p><span>140</span></p>",
        "<p><span>180</span></p>",
        "<p><span>192</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Area of square L</span><sup><span>2 </span></sup><span> = 36 m \u00d7 64 m&nbsp;</span><br><span>L = 6 \u00d7 8 = 48</span><br><span>Perimeter of square = 48 \u00d7 4 = 192 meters.</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60248,
      "question": "<p dir=\"ltr\"><span>Jimin was calculating the area of a square. He made a mistake in measuring the side of square, the error of 10% excess is made in calculating the side of a square by him. Find the % error in its area.</span></p>",
      "options": [
        "<p><span>11</span></p>",
        "<p><span>15</span></p>",
        "<p><span>21</span></p>",
        "<p><span>60</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Area of square = L</span><sup><span>2</span></sup><br><span>Area of square with error = (1.1L)</span><sup><span>2</span></sup><span> = 1.21 L</span><sup><span>2</span></sup><br><span>Error percentage = 21 %.</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60249,
      "question": "<p dir=\"ltr\"><span>If a circular swing in an exhibition has an area of 616 sq.m. Find the radius of the swing?</span></p>",
      "options": [
        "<p><span>24/7</span></p>",
        "<p><span>40/7</span></p>",
        "<p><span>11</span></p>",
        "<p><span>14</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A = \u03c0r</span><sup><span>2&nbsp;</span></sup><br><span>r = \u221a(A/\u03c0) = \u221a(616/\u03c0)</span><br><span>r = 14.</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60250,
      "question": "<p dir=\"ltr\"><span>The perimeter of a field of length 100 m and breadth is 50 m is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>500 m</span></p>",
        "<p dir=\"ltr\"><span>400 m</span></p>",
        "<p dir=\"ltr\"><span>300 m</span></p>",
        "<p dir=\"ltr\"><span>200 m</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Perimeter = 2 ( l + b )</span><br><span>Perimeter = 2( 100 + 50 )</span><br><span>Perimeter = 2 \u00d7 150</span><br><span>Perimeter = 300 m.</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60251,
      "question": "<p dir=\"ltr\"><span>If the radius of a circle is increased by 7.36%, then by how the area will be increased?</span></p>",
      "options": [
        "<p><span>13.58</span></p>",
        "<p><span>14.97</span></p>",
        "<p><span>15.26</span></p>",
        "<p><span>22.75</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>New Area of the Circle = \u03c0 \u00d7 (R + 7.36% of R)</span><sup><span>2</span></sup><br><span>New Area of the Circle = \u03c0 \u00d7 (R + 0.0736R)</span><sup><span>2</span></sup><br><span>New Area of the Circle = \u03c0 \u00d7 (1.0736R)</span><sup><span>2</span></sup><br><span>New Area of the Circle = \u03c0 \u00d7 R</span><sup><span>2</span></sup><span> \u00d7 (1.0736)</span><sup><span>2</span></sup><span>. </span><br><span>Therefore, percentage increase in Area = [ \u03c0 \u00d7 R</span><sup><span>2</span></sup><span> \u00d7 (1.0736)</span><sup><span>2</span></sup><span> - \u03c0 \u00d7 R</span><sup><span>2</span></sup><span> ]/ (\u03c0 \u00d7 R</span><sup><span>2</span></sup><span>) = 1.0736</span><sup><span>2</span></sup><span> - 1 = 0.15261696 = 15.26%</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60252,
      "question": "<p dir=\"ltr\"><span>If an area enclosed by a circle or a square or an equilateral triangle is the same, then the maximum perimeter is possessed by:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>circle</span></p>",
        "<p dir=\"ltr\"><span>square</span></p>",
        "<p dir=\"ltr\"><span>equilateral triangle</span></p>",
        "<p dir=\"ltr\"><span>triangle and square have equal perimeters greater than that of circle</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the area be a. </span><br><span>Then, Radius of the circle = \u221a(a/\u03c0)</span><br><span>Side of square = \u221aa </span><br><span>Side of equilateral triangle = \u221a(4a/\u221a3)</span><br><span>Therefore, Perimeter of circle = 2\u00d7\u03c0\u00d7\u221a(a/\u03c0) = 2\u00d7\u221a(\u03c0\u00d7a) = 2\u00d7\u221a(3.14\u00d7a) = 3.54\u221aa </span><br><span>Perimeter of square = 4\u221aa </span><br><span>Perimeter of equilateral triangle = 3[\u221a(4a/\u221a3)] = 3[\u221a(4a/1.732)] = 3[\u221a(2.31a)] = 3\u00d71.52\u221aa = 4.56\u221aa</span><br><span>Therefore, perimeter of the equilateral triangle is the highest. </span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60253,
      "question": "<p dir=\"ltr\"><span>The area of the largest triangle that can be inscribed in a semi-circle of radius r, is:-</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>r</span><sup><span>2</span></sup></p>",
        "<p dir=\"ltr\"><span>2r</span><sup><span>2</span></sup></p>",
        "<p dir=\"ltr\"><span>r</span><sup><span>3</span></sup></p>",
        "<p dir=\"ltr\"><span>2r</span><sup><span>3</span></sup></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The largest triangle that can be inscribed is the right-angled triangle with its base as the diameter of the semicircle. </span><br/><span>Area = 1/2 \u00d7 base \u00d7 height = 1/2 \u00d7 2r \u00d7 r = r</span><sup><span>2.</span></sup></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60254,
      "question": "<p dir=\"ltr\"><span>An equilateral triangle, a square and a circle have equal perimeters. If  T denotes the area of the triangle,  S denotes the area of the square, and C denotes the area of the circle, then: </span></p>",
      "options": [
        "<p dir=\"ltr\"><span>S &lt; T &lt; C</span></p>",
        "<p dir=\"ltr\"><span>T &lt; C &lt; S</span></p>",
        "<p dir=\"ltr\"><span>T &lt; S &lt; C</span></p>",
        "<p dir=\"ltr\"><span>S &lt; C &lt; T</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let p be the perimeter. </span><br><span>Then, Side of equilateral triangle = p/3 </span><br><span>Side of square = p/4 </span><br><span>Side of circle = p/(2\u00d7\u03c0) </span><br><span>Now, Area of equilateral triangle, </span><br><span>T = \u221a3/4a\u00b2 = 1.732/4 \u00d7 (p/3)\u00b2 = 0.0481 p\u00b2 </span><br><span>Area of square, S = (p/4)\u00b2 = 0.0625 p\u00b2 </span><br><span>Area of circle, C = \u03c0 \u00d7 [p/(2\u00d7\u03c0)]\u00b2 = (\u03c0/4\u03c0\u00b2) p\u00b2 = (1/4\u03c0) p\u00b2 = 0.0796 p\u00b2 </span><br><span>Clearly, T &lt; S &lt; C.</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60255,
      "question": "<p dir=\"ltr\"><span>The sides of a triangle are 6 cm, 11 cm and 15 cm. The radius of its in-circle is:</span></p>",
      "options": [
        "<p><span>3\u00d7\u221a2</span></p>",
        "<p><span>(4/5)\u00d7\u221a2</span></p>",
        "<p><span>(5/4)\u00d7\u221a2</span></p>",
        "<p><span>6\u00d7\u221a2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let a, b, c be the sides of the triangle. </span><br><span>Then, we know Semi-perimeter = 1/2 \u00d7 (a + b + c) = 1/2 \u00d7 (6 + 11 + 15) = 16 cm. </span><br><span>Area = \u221a[s\u00d7(s-a)\u00d7(s-b)\u00d7(s-c)] = \u221a[16\u00d710\u00d75\u00d71] = 20\u221a2 cm</span><sup><span>2</span></sup><br><span>Therefore, Radius of in-circle = Area/Semi-perimeter = 20\u221a2/ 16 = (5/4)\u00d7\u221a2cm.</span></p>",
      "tag": "Mensuration 2D || MCQ"
    },
    {
      "id": 60256,
      "question": "<p dir=\"ltr\"><span>The circumference of a circle is 100 cm. The side of a square inscribed in the circle is:</span></p>",
      "options": [
        "<p><span>50(\u221a2)</span></p>",
        "<p dir=\"ltr\"><span>100/\u03c0</span></p>",
        "<p dir=\"ltr\"><span>[50(\u221a2)]/\u03c0</span></p>",
        "<p dir=\"ltr\"><span>[100(\u221a2)]/\u03c0</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given,  Circumference = 100cm 2\u00d7\u03c0\u00d7r = 100 r = 50/\u03c0. </span><br><span>The diagonal of the square inscribed, D = 2r = 100/\u03c0. </span><br><span>Area of the square = 1/2 \u00d7 D</span><sup><span>2</span></sup><span> = 1/2 \u00d7 (100/\u03c0)</span><sup><span>2</span></sup><span> </span><br><span>Therefore, Side of the square = \u221a[ 1/2 \u00d7 (100/\u03c0)</span><sup><span>2</span></sup><span> ] = 1/(\u221a2) \u00d7 100/\u03c0 = 50(\u221a2)/\u03c0. </span></p>",
      "tag": "Mensuration 2D || MCQ"
    }
  ],
  "Mensuration 3D": [
    {
      "id": 60257,
      "question": "<p dir=\"ltr\"><span>A water tank is being used to supply drinking water in a city due to a shortage of water. If the dimensions of the tank are 7m in length, 11m in breadth, and 3.5m in height. Find how many liters of water can be filled in the tank?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>128,700 lt.</span></p>",
        "<p dir=\"ltr\"><span>225,535 lt.</span></p>",
        "<p dir=\"ltr\"><span>269,500 lt.</span></p>",
        "<p dir=\"ltr\"><span>324,600 lt.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of a cuboid = l \u00d7 b \u00d7 h.</span><br><span>7m \u00d7 11m \u00d7 3.5m = 269,500 litres</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60258,
      "question": "<p dir=\"ltr\"><span>If Jimmy rolls a sheet of paper initially square-shaped along its length to make it a cylinder. Find what will be the ratio of the base radius of the cylinder to the side of the square?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>1/2\u03c0</span></p>",
        "<p dir=\"ltr\"><span>7/2\u03c0</span></p>",
        "<p dir=\"ltr\"><span>9/\u03c0</span></p>",
        "<p dir=\"ltr\"><span>11/2\u03c0</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Perimeter of base circle = side of square&nbsp;</span><br><span>2\u03c0r = a</span><br><span>r/a = 1 : 2\u03c0</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60259,
      "question": "<p dir=\"ltr\"><span>A 5 cm cube is cut into as many smaller cubes of 1 cm as possible. Find what will be the ratio of the surface area of the original cube to that of the sum of the surface areas of all the smaller cubes formed after cutting?&nbsp;</span></p>",
      "options": [
        "<p><span>5:4</span></p>",
        "<p><span>5:1</span></p>",
        "<p><span>6:7</span></p>",
        "<p><span>1:5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The volume of the original cube = 5</span><sup><span>3</span></sup><span> = 125 cm</span><sup><span>3</span></sup><span>.</span><br><span>The volume of a smaller cubes = 1</span><sup><span>3</span></sup><span> = 1 cm</span><sup><span>3</span></sup><span>.&nbsp;</span><br><span>we will be getting total cubes = 125</span><br><span>The surface area of the larger cube = 6 \u00d7 a</span><sup><span>2</span></sup><span> = 6(5</span><sup><span>2</span></sup><span>) = 6 \u00d7 25 = 150</span><br><span>The surface area of each of the smaller cubes = 6 (1</span><sup><span>2</span></sup><span>) = 6.</span><br><span>Therefore, surface area of all of the 125, 1 cm</span><sup><span>3</span></sup><span> cubes = 125 \u00d7 6 = 750.</span><br><span>Therefore, the required ratio = 150 : 750 = 1 : 5</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60260,
      "question": "<p dir=\"ltr\"><span>A cubical wooden structure with sides of 5 cm is painted on all its faces. If the cubical structure is sliced into 1 cm cubes, find how many 1 cm cubes will have exactly one of their faces painted?</span></p>",
      "options": [
        "<p><span>33</span></p>",
        "<p><span>54</span></p>",
        "<p><span>76</span></p>",
        "<p><span>140</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given: The cube side = 5 cm</span><br><span>The side of cube 5cm is cut into 5 equal parts, in which each of 1 cm. </span><br><span>Therefore, the total number of cubes of side 1 cm = 25 + 25 + 25 + 25 + 25 = 125.</span><br><span>In one face of cube, there are total of 9 small cubes painted.</span><br><span>We know that, there are 6 faces in cube.</span><br><span>Thus, total of 9 x 6 faces will have one face painted. (i.e.) 54</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60261,
      "question": "<p dir=\"ltr\"><span>A drum is full of water. Diameter of the drum is 35cm. The level of water will be dropped by how much, if 11 litres of water is taken out:</span></p>",
      "options": [
        "<p><span>40/7</span></p>",
        "<p><span>80/7</span></p>",
        "<p><span>70/9</span></p>",
        "<p><span>13/8</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of cylinder= \u03c0r</span><sup><span>2</span></sup><span>h</span><br><span>22/7 \u00d7 (35/2) \u00d7 (35/2) \u00d7 h=11000 {11 lt = 11000 mlt}</span><br><span>h=(11000\u00d77\u00d74)/(22\u00d735\u00d735)cm=80/7cm</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60262,
      "question": "<p dir=\"ltr\"><span>A hemispherical bowl is filled to the brim with water. The content of the bowl i.e. water is transferred into a cylindrical vessel whose radius is 50% more than its height. If the diameter is the same for both the bowl and the cylinder, find the volume of water in the cylindrical vessel.</span></p>",
      "options": [
        "<p><span>33.33%</span></p>",
        "<p><span>66.66%</span></p>",
        "<p><span>50%</span></p>",
        "<p><span>100%</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the height of the vessel be h. </span><br><span>Then, Radius of the bowl = h/2 </span><br><span>Radius of the vessel = h/2 And, </span><br><span>Volume of the bowl = 2/3 \u00d7 \u03c0 \u00d7 (h/2)</span><sup><span>3 </span></sup><span>= 1/12 \u00d7 \u03c0 \u00d7 h</span><sup><span>3</span></sup><span> </span><br><span>Volume of the vessel = \u03c0 \u00d7 (h/2)</span><sup><span>2</span></sup><span> \u00d7 h = 1/4 \u00d7 \u03c0 \u00d7 h</span><sup><span>3</span></sup><span> </span><br><span>As the volume of the vessel is 3 times more than that of the bowl, it can contain 100% of water.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60263,
      "question": "<p dir=\"ltr\"><span>A metallic hemisphere is melted and recast in the shape of a cone with the same base radius (R) as that of the hemisphere. If H is the height of the cone, then:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>H = 2R</span></p>",
        "<p dir=\"ltr\"><span>H = 3R</span></p>",
        "<p dir=\"ltr\"><span>H = 2/3R</span></p>",
        "<p dir=\"ltr\"><span>H = 3/2R</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of the Hemisphere = 2/3 \u00d7 \u03c0 \u00d7 R</span><sup><span>3</span></sup><br><span>Volume of the Cone = 1/3 \u00d7 \u03c0 \u00d7 R</span><sup><span>2</span></sup><span> \u00d7 H </span><br><span>As the two volumes are same, we have 2/3 \u00d7 \u03c0 \u00d7 R</span><sup><span>3</span></sup><span> = 1/3 \u00d7 \u03c0 \u00d7 R</span><sup><span>2</span></sup><span> \u00d7 H </span><br><span>Therefore, H = 2R.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60264,
      "question": "<p dir=\"ltr\"><span>A hemisphere and a cone have equal bases. If their heights are also equal, then the ratio of their curved surfaces will be:</span></p>",
      "options": [
        "<p><span>1:2</span></p>",
        "<p><span>2:1</span></p>",
        "<p><span>1:\u221a2</span></p>",
        "<p><span>\u221a2:1</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let r be the radius of the hemisphere and the cone. </span><br><span>Given, Height of Cone = Radius of Hemisphere = r </span><br><span>Slant height of Cone = \u221a(r\u00b2+ r\u00b2) = \u221a2r </span><br><span>Ratio of their Curved Surfaces = Hemisphere/Cone = 2 \u00d7 \u03c0 \u00d7 r\u00b2 / \u03c0 \u00d7 r \u00d7 \u221a2r = \u221a2:1.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60265,
      "question": "<p dir=\"ltr\"><span>A hollow sphere of internal and external diameters 4 cm and 8 cm respectively is melted into a cone of base diameter 8 cm. The height of the cone is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>12 cm</span></p>",
        "<p dir=\"ltr\"><span>14 cm</span></p>",
        "<p dir=\"ltr\"><span>15 cm</span></p>",
        "<p dir=\"ltr\"><span>18 cm</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of the hollow sphere = 4/3 \u00d7 \u03c0 \u00d7 (R\u00b3-r\u00b3) = 4/3 \u00d7 \u03c0 \u00d7 (4\u00b3-2\u00b3) =&nbsp;4/3 \u00d7 \u03c0 \u00d7 56 cm\u00b3 </span><br><span>Let the height of the cone be h cm. </span><br><span>Then, </span><br><span>Volume of cone = 1/3 \u00d7 \u03c0 \u00d7 4 \u00d7 4 \u00d7 h</span><br><span>1/3 \u00d7 \u03c0 \u00d7 4 \u00d7 4 \u00d7 h = 4/3 \u00d7 \u03c0 \u00d7 56 </span><br><span>h = (4 \u00d7 56 / 4 \u00d7 4) = 14 cm.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60266,
      "question": "<p dir=\"ltr\"><span>A solid metallic spherical ball of diameter 6 cm is melted and recast into a cone with diameter of the base as 12 cm. The height of the cone is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2 cm</span></p>",
        "<p dir=\"ltr\"><span>3 cm</span></p>",
        "<p dir=\"ltr\"><span>4 cm</span></p>",
        "<p dir=\"ltr\"><span>6 cm</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of Sphere = 4/3 \u00d7 \u03c0 \u00d7 r\u00b3 = 4/3 \u00d7 \u03c0 \u00d7 3\u00b3 </span><br><span>Volume of Cone = 1/3 \u00d7 \u03c0 \u00d7 r\u00b2 \u00d7 h = 1/3 \u00d7 \u03c0 \u00d7 6\u00b2 \u00d7 h </span><br><span>Given,  Volume of Sphere = Volume of Cone </span><br><span>4/3 \u00d7 \u03c0 \u00d7 3\u00b3 = 1/3 \u00d7 \u03c0 \u00d7 6\u00b2 \u00d7 h </span><br><span>h = 4 \u00d7 (3\u00b3 / 6\u00b2) = 3 cm.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60267,
      "question": "<p dir=\"ltr\"><span>A cylindrical container of radius 4 cm contains some fluid. A solid sphere of radius 3 cm is lowered into the fluid until it is completely immersed in it. Find by how the level of fluid in the vessel will rise.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>5/8 cm</span></p>",
        "<p dir=\"ltr\"><span>9/4 cm</span></p>",
        "<p dir=\"ltr\"><span>3/7 cm</span></p>",
        "<p dir=\"ltr\"><span>9/13 cm</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of the sphere = 4/3 \u00d7 \u03c0 \u00d7 r\u00b3 = 4/3 \u00d7 \u03c0 \u00d7 3\u00b3 </span><br><span>Volume of fluid displaced = \u03c0 \u00d7 r\u00b2 \u00d7 h = \u03c0 \u00d7 4\u00b2 \u00d7 h </span><br><span>Given, Volume of fluid displaced = Volume of sphere </span><br><span>\u03c0 \u00d7 4\u00b2 \u00d7 h = 4/3 \u00d7 \u03c0 \u00d7 3\u00b3 </span><br><span>h = 4/3 \u00d7 3\u00b3 / 4\u00b2 = 9/4</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60268,
      "question": "<p dir=\"ltr\"><span>A welder has a solid piece of iron of dimensions 49 \u00d7 33 \u00d7 24 cm\u00b3 which he will be molding into a sphere. What will be the radius of the sphere?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>17/4 cm</span></p>",
        "<p dir=\"ltr\"><span>20 cm</span></p>",
        "<p dir=\"ltr\"><span>21 cm</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Volume of Solid Iron Piece = 49 \u00d7 33 \u00d7 24 </span><br><span>Volume of a Sphere = 4/3 \u00d7 \u03c0 \u00d7 r\u00b3 </span><br><span>Volume of Solid Iron Piece = Volume of a Sphere</span><br><span>4/3 \u00d7 \u03c0 \u00d7 r\u00b3 = 49 \u00d7 33 \u00d7 24 </span><br><span>r\u00b3 = 49 \u00d7 33 \u00d7 24 \u00d7 7/22 \u00d7 3/4 = 7\u00b3 \u00d7 11 \u00d7 3 \u00d7 2\u00b3 \u00d7 3 \u00d7 1/22 \u00d7 3/4 = 7\u00b3 \u00d7 3\u00b3 = 21\u00b3 cm\u00b3 </span><br><span>Therefore, r = 21 cm.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60269,
      "question": "<p dir=\"ltr\"><span>If three metallic spheres of iron, steel, and aluminium of radii 6 cm, 8 cm, and 10 cm are melted to form a single sphere, find the diameter of the new sphere formed.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>12.5 cm</span></p>",
        "<p dir=\"ltr\"><span>18.7 cm</span></p>",
        "<p dir=\"ltr\"><span>24 cm</span></p>",
        "<p dir=\"ltr\"><span>30 cm</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total volume of the sphere = 4/3 \u00d7 \u03c0 \u00d7 (a\u00b3 + b\u00b3 + c\u00b3) </span><br><span>Total volume of the sphere = 4/3 \u00d7 \u03c0 \u00d7 (6\u00b3 + 8\u00b3 + 10\u00b3) = 4/3 \u00d7 \u03c0 \u00d7 (1728) = 4/3 \u00d7 \u03c0 \u00d7 12\u00b3 </span><br><span>Therefore, diameter of the new sphere = 24 cm.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60270,
      "question": "<p dir=\"ltr\"><span>The volumes of two sphere are in the ratio of 64:27. The ratio of their surface areas is:</span></p>",
      "options": [
        "<p><span>1:2</span></p>",
        "<p><span>2:3</span></p>",
        "<p><span>9:16</span></p>",
        "<p><span>16:9</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have,</span><br><span>Ratio of volume =  &nbsp;(4/3 \u00d7 \u03c0 \u00d7 R\u00b3) / &nbsp;(4/3 \u00d7 \u03c0 \u00d7 r\u00b3) =  64/27</span><br><span>R\u00b3/r\u00b3= 64/27 </span><br><span>R/r = 4/3</span><br><span>Ratio of surface area = (4 \u00d7 \u03c0 \u00d7 R</span><sup><span>2</span></sup><span>) / (4 \u00d7 \u03c0 \u00d7 r</span><sup><span>2</span></sup><span>)</span><br><span>R\u00b2:r\u00b2 = 4\u00b2:3\u00b2 = 16:9.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    },
    {
      "id": 60271,
      "question": "<p dir=\"ltr\"><span>The radii of two cones of copper and aluminium are in the ratio of 3:7. Consider their volumes to be equal. Find the ratio of their heights.</span></p>",
      "options": [
        "<p><span>9:49</span></p>",
        "<p><span>3:7</span></p>",
        "<p><span>49:9</span></p>",
        "<p><span>7:3</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the radius and height of the two cones be R, H and r, h respectively such that R:r = 3:7. </span><br><span>Then, Volume of the cone C = 1/3 \u00d7&nbsp;\u03c0 \u00d7 R\u00b2 \u00d7 H </span><br><span>Volume of the cone c = 1/3 \u00d7 \u03c0 \u00d7 r\u00b2 \u00d7 h </span><br><span>Now, 1/3 \u00d7 \u03c0 \u00d7 R\u00b2 \u00d7 H = 1/3 \u00d7 \u03c0 \u00d7 r\u00b2 \u00d7 h </span><br><span>H:h = r\u00b2:R\u00b2 = 7\u00b2:3\u00b2 = 49:9.</span></p>",
      "tag": "Mensuration 3D || MCQ"
    }
  ],
  "Geometry": [
    {
      "id": 60272,
      "question": "<p dir=\"ltr\"><span>What is the area of a triangle with a base of 10 units and a height of 5 units?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>50 square units</span></p>",
        "<p dir=\"ltr\"><span>15 square units</span></p>",
        "<p dir=\"ltr\"><span>25 square units</span></p>",
        "<p dir=\"ltr\"><span>30 square units</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The area of a triangle is given by the formula 12 \u00d7 base \u00d7 height.  </span></p><p dir=\"ltr\"><span>Therefore, 1/2 \u00d7 10 \u00d7 5 = 25 square units.</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60273,
      "question": "<p dir=\"ltr\"><span>Which of the following represents the volume of a rectangular prism with length 8 units, width 3 units, and height 2 units?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>48 cubic units</span></p>",
        "<p dir=\"ltr\"><span>52 cubic units</span></p>",
        "<p dir=\"ltr\"><span>13 cubic units</span></p>",
        "<p dir=\"ltr\"><span>24 cubic units</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The volume of a rectangular prism is calculated by length\u00d7width\u00d7height. Thus, 8\u00d73\u00d72=48 cubic units.</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60274,
      "question": "<p dir=\"ltr\"><span>A circle has a diameter of 8 cm. What is its circumference? (Use \ud835\udf0b\u22483.14</span><i><em class=\"GFGEditorTheme__textItalic\">\u03c0</em></i><span>\u22483.14)</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>25.12 cm</span></p>",
        "<p dir=\"ltr\"><span>24.00 cm</span></p>",
        "<p dir=\"ltr\"><span>12.56 cm</span></p>",
        "<p dir=\"ltr\"><span>50.24 cm</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The circumference of a circle is given by \ud835\udf0b\u00d7diameter. Hence, 3.14\u00d78=25.12</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60275,
      "question": "<p dir=\"ltr\"><span>Which of the following shapes has exactly four equal sides and four right angles?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rectangle</span></p>",
        "<p dir=\"ltr\"><span>Square</span></p>",
        "<p dir=\"ltr\"><span>Rhombus</span></p>",
        "<p dir=\"ltr\"><span>Parallelogram</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A square has four equal sides and four right angles, which distinguishes it from the other shapes listed.</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60276,
      "question": "<p dir=\"ltr\"><span>What is the measure of each interior angle of a regular pentagon (five-sided polygon)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>108 degrees</span></p>",
        "<p dir=\"ltr\"><span>120 degrees</span></p>",
        "<p dir=\"ltr\"><span>135 degrees</span></p>",
        "<p dir=\"ltr\"><span>150 degrees</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sum of the interior angles of a polygon is 180\u00d7(\ud835\udc5b\u22122) where \ud835\udc5b is the number of sides. For a pentagon, 180\u00d7(5\u22122)=540 degrees. Each angle in a regular pentagon is 540/5=108 degrees.</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60277,
      "question": "<p dir=\"ltr\"><span>Which term describes a line segment that connects two points on a circle\u2019s circumference and passes through its center?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Radius</span></p>",
        "<p dir=\"ltr\"><span>Chord</span></p>",
        "<p dir=\"ltr\"><span>Diameter</span></p>",
        "<p dir=\"ltr\"><span>Secant</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The diameter is the longest chord in a circle, passing through the center and connecting two points on the circumference.</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60278,
      "question": "<p dir=\"ltr\"><span>What is the surface area of a cube with side length 4 units?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>64 square units</span></p>",
        "<p dir=\"ltr\"><span>96 square units</span></p>",
        "<p dir=\"ltr\"><span>16 square units</span></p>",
        "<p dir=\"ltr\"><span>48 square units</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The surface area of a cube is given by 6\u00d7side2. So, 6\u00d742=96 square units.</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60279,
      "question": "<p dir=\"ltr\"><span>How many lines of symmetry does an equilateral triangle have?</span></p>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>An equilateral triangle has three lines of symmetry, each bisecting a vertex and the midpoint of the opposite side.</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60280,
      "question": "<p dir=\"ltr\"><span>What is the result of a 90-degree clockwise rotation of a point around the origin from (2,3) in the coordinate plane?</span></p>",
      "options": [
        "<p><span>(3, -2)</span></p>",
        "<p><span> (-3, 2)</span></p>",
        "<p><span>(-2, -3)</span></p>",
        "<p><span>(-3, -2)</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A 90-degree rotation of a point (2,3) around the origin results in the point (3,-2).</span></p>",
      "tag": "Geometry || MCQ"
    },
    {
      "id": 60281,
      "question": "<p dir=\"ltr\"><span>What is the sum of the interior angles in a quadrilateral (four-sided polygon)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>180 degrees</span></p>",
        "<p dir=\"ltr\"><span> 270 degrees</span></p>",
        "<p dir=\"ltr\"><span>360 degrees</span></p>",
        "<p dir=\"ltr\"><span>450 degrees</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sum of the interior angles of any quadrilateral is always 360 degrees.</span></p>",
      "tag": "Geometry || MCQ"
    }
  ],
  "Trigonometry & Height and Distances": [
    {
      "id": 60282,
      "question": "<p dir=\"ltr\"><span>What is the maximum value of 3 Sin\u03b8 + 4 cos\u03b8?</span></p>",
      "options": [
        "<p><span>12</span></p>",
        "<p><span>5</span></p>",
        "<p><span>6</span></p>",
        "<p><span>1</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>(minimum value)-\u221a(a</span><sup><span>2</span></sup><span> + b</span><sup><span>2</span></sup><span>) \u2264 a Sin\u03b8 + b cos\u03b8 \u2264 \u221a(a</span><sup><span>2</span></sup><span> + b</span><sup><span>2</span></sup><span>) (maximum value)</span></p><p dir=\"ltr\"><span>Thus, Maximum value of 3 Sin\u03b8 + 4 cos\u03b8 = \u221a(3</span><sup><span>2</span></sup><span> + 4</span><sup><span>2</span></sup><span>) = 5</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60283,
      "question": "<p dir=\"ltr\"><span>What is minimum value of Sin\u03b8 + cos\u03b8 ?</span></p>",
      "options": [
        "<p><span>-2</span></p>",
        "<p><span>\u221a3/2</span></p>",
        "<p><span>-1</span></p>",
        "<p><span>-\u221a2</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>(minimum value)-\u221a(a</span><sup><span>2</span></sup><span> + b</span><sup><span>2</span></sup><span>) \u2264 a Sin\u03b8 + b cos\u03b8 \u2264 \u221a(a</span><sup><span>2</span></sup><span> + b</span><sup><span>2</span></sup><span>) (maximum value)</span></p><p dir=\"ltr\"><span>Thus, minimum value of sin \u03b8 + cos \u03b8 = -\u221a(1</span><sup><span>2</span></sup><span> + 1</span><sup><span>2</span></sup><span>) = -\u221a2</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60284,
      "question": "<p dir=\"ltr\"><span>If tan (x+y) tan (x-y) = 1, then find tan (2x/3)?</span></p>",
      "options": [
        "<p><span>1/\u221a3</span></p>",
        "<p><span>1/2</span></p>",
        "<p><span>1/\u221a2</span></p>",
        "<p><span>2/\u221a3</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>tan A \u00d7 tan B = 1</span><br><span>then, tan A = cot B,</span><br><span>So, A + B = 90</span><sup><span>o</span></sup></p><p dir=\"ltr\"><span>(x + y) + (x - y) = 90</span><sup><span>o</span></sup><span>,</span><br><span>\u21d2 2x = 90</span><sup><span>o</span></sup><span>,</span><br><span>\u21d2 x = 45</span><sup><span>o</span></sup></p><p dir=\"ltr\"><span>Thus, tan (2x/3) = tan 30</span><sup><span>o</span></sup><span> = 1/\u221a3</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60285,
      "question": "<p dir=\"ltr\"><span>Find the Value of tan30</span><sup><span>o</span></sup><span> + tan120</span><sup><span>o</span></sup><span>?</span></p>",
      "options": [
        "<p><span>\u221a3</span></p>",
        "<p><span>-1/\u221a3</span></p>",
        "<p><span>0</span></p>",
        "<p><span>-2/\u221a3</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>tan30</span><sup><span>o</span></sup><span> + tan120</span><sup><span>o</span></sup><span> = tan(30) + tan(180 - 120) = 1/\u221a3 + (-\u221a3) = -2/\u221a3 [tan(180 - x) = -tan x]</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60286,
      "question": "<p dir=\"ltr\"><span>The least value of 2sin</span><sup><span>2</span></sup><span>\u03b8 + 3cos</span><sup><span>2</span></sup><span>\u03b8</span></p>",
      "options": [
        "<p><span>1/3</span></p>",
        "<p><span>4/3</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3/4</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>2sin</span><sup><span>2</span></sup><span>\u03b8 + 3cos</span><sup><span>2</span></sup><span>\u03b8 = 2sin</span><sup><span>2</span></sup><span>\u03b8 + 2cos</span><sup><span>2</span></sup><span>\u03b8 + cos</span><sup><span>2</span></sup><span>\u03b8 </span><br><span>\u21d2 2sin</span><sup><span>2</span></sup><span>\u03b8 + 3cos</span><sup><span>2</span></sup><span>\u03b8 = 2(sin</span><sup><span>2</span></sup><span>\u03b8 + cos</span><sup><span>2</span></sup><span>\u03b8) + cos</span><sup><span>2</span></sup><span>\u03b8 ; (by putting sin</span><sup><span>2</span></sup><span>\u03b8 + cos</span><sup><span>2</span></sup><span>=1)</span><br><span>\u21d2 2sin</span><sup><span>2</span></sup><span>\u03b8 + 3cos</span><sup><span>2</span></sup><span>\u03b8 = 2 + cos</span><sup><span>2</span></sup><span>\u03b8; (the minimum value of cos</span><sup><span>2</span></sup><span>\u03b8=0)</span></p><p dir=\"ltr\"><span>Thus, minimum value of 2sin</span><sup><span>2</span></sup><span>\u03b8 + 3cos</span><sup><span>2</span></sup><span>\u03b8 = 2 + 0 = 2</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60287,
      "question": "<p dir=\"ltr\"><span>The angle of elevation of the sun, when the length of the shadow of a tree is 1/\u221a3 times the height of the tree, is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>30</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>45</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>60</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>90</span><sup><span>o</span></sup></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let AB be the height of the tree and AC be the length of the shadow. We need to calculate the angle ACB where BC is the hypotenuse.</span></p><p dir=\"ltr\"><span>tan \u03b8 = Perpendicular / Base = 1/(1/\u221a3)</span><br><span>\u21d2 tan \u03b8 &nbsp;= Tan 60\u00b0</span></p><p dir=\"ltr\"><span>Therefore, angle of elevation is 60</span><sup><span>o</span></sup><span>.</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60288,
      "question": "<p dir=\"ltr\"><span>From a point A on a level ground, the angle of elevation of the top of a tower is 30 degrees. If the tower is 100 m high, the distance of point A from the foot of the tower is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>148 m</span></p>",
        "<p dir=\"ltr\"><span>156 m</span></p>",
        "<p dir=\"ltr\"><span>173 m</span></p>",
        "<p dir=\"ltr\"><span>200 m</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let QR be the tower. Then, QR = 100 m and angle QAR = 30</span><sup><span>o</span></sup><span>. </span><br><span>We know, cot 30\u00b0 = \u221a3 = AQ/QR. </span></p><p dir=\"ltr\"><span>Therefore, AQ = 100 \u00d7 \u221a3 = 173 m.</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60289,
      "question": "<p dir=\"ltr\"><span>Amit is standing at a point P is watching the top of a tower, which makes an angle of elevation of 45\u00b0 with Amit's eye. He walks some distance towards the tower to watch its top and the angle of elevation becomes 60\u00b0.</span></p><p dir=\"ltr\"><span>What is the distance between the base of the tower and the point P?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4.2 units</span></p>",
        "<p dir=\"ltr\"><span>8 units</span></p>",
        "<p dir=\"ltr\"><span>10 units</span></p>",
        "<p dir=\"ltr\"><span>Data inadequate</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let MN be the tower and Amit be standing at P (45\u00b0 = angle MPN) </span><br><span>and Q (60\u00b0 = angle MQN).</span></p><p dir=\"ltr\"><span>We are only given two angles and no sides of the triangles, thus we can't find any sides. Therefore, the data is inadequate.</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60290,
      "question": "<p dir=\"ltr\"><span>A man is watching from the top of a tower a boat speeding away from the tower. The boat makes an angle of depression of 45\u00b0 with the man's eye when at a distance of 60 meters from the tower. After 5 seconds, the angle of depression becomes 30\u00b0. What is the approximate speed of the boat, assuming that it is running in still water?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>32 kmph</span></p>",
        "<p dir=\"ltr\"><span>36 kmph</span></p>",
        "<p dir=\"ltr\"><span>40 kmph</span></p>",
        "<p dir=\"ltr\"><span>44 kmph</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let the tower be PQ and the boat be at positions R and S when making angles of 45\u00b0 and 30\u00b0 respectively.&nbsp;</span><br><span>Given, PR = 60 m. </span><br><span>Now, PQ/PR = tan 45\u00b0 = 1. </span><br><span>So, PQ = PR = 60 m.&nbsp;</span><br><span>Again, PQ/PS = tan 30\u00b0 = 1/\u221a3. </span><br><span>So, PS = 60 \u00d7 \u221a3 m = 103.92 m.&nbsp;</span><br><span>Distance covered in 5 seconds = 103.92 - 60 = 43.92 m. </span><br><span>Speed in kmph = (43.92/5) \u00d7 (18/5) = 32 kmph (approximately).</span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    },
    {
      "id": 60291,
      "question": "<p dir=\"ltr\"><span>x = a cos(t), y = b sin(t) is the parametric form of</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Ellipse</span></p>",
        "<p dir=\"ltr\"><span> Hyperbola</span></p>",
        "<p dir=\"ltr\"><span> Circle</span></p>",
        "<p dir=\"ltr\"><span>Parabola</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>If the ellipse is centered on the origin (0,0) is described by equations x = a cos\u202ft  and y = b sin\u202ft. Where, a is the radius along the x-axis b is the radius along the y-axis or we can say a and b are semi major axis of ellipse where a \u2260 b. (for a = b, equation represents circle.) </span></p><p dir=\"ltr\"><span>So, option (A) is correct. </span></p>",
      "tag": "Trigonometry & Height and Distances || MCQ"
    }
  ],
  "Progressions": [
    {
      "id": 60292,
      "question": "<p dir=\"ltr\"><span>Calculate the arithmetic mean of the given series: 2, 6, 10, 14, 18, 22, 26, 30.</span></p>",
      "options": [
        "<p><span>8</span></p>",
        "<p><span>16</span></p>",
        "<p><span>32</span></p>",
        "<p dir=\"ltr\"><span>None of the above</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>AM = (a1+a2+a3+......+an)/n</span><br><span>=(n(a1+an)/2)/n</span><br><span>=(a1+an)/2 = (2 + 30)/2 = 16</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60293,
      "question": "<p dir=\"ltr\"><span>Find the Sum of series: 2, 6, 10, 14, 18, 22, 26, 30</span></p>",
      "options": [
        "<p><span>32</span></p>",
        "<p><span>88</span></p>",
        "<p><span>128</span></p>",
        "<p><span>110</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Sum of AP = (n/2)[2a+(n-1)d]</span><br><span> = 4 \u00d7 [4+7\u00d74]</span><br><span> =128 </span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60294,
      "question": "<p dir=\"ltr\"><span>Find the Arithmatic mean of series: 10, 7, 4, 1, -2</span></p>",
      "options": [
        "<p><span>13/2</span></p>",
        "<p><span>14/3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>16/5</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Arithmatic Mean = (a1+a2+a3+......+an)/n =(n(a1+an)/2)/n =a1+a2/2 =10-2/2 = 4</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60295,
      "question": "<p dir=\"ltr\"><span>Find the Sum of series: 10,  7,   4,    1,    -2 </span></p>",
      "options": [
        "<p><span>40</span></p>",
        "<p><span>21</span></p>",
        "<p><span>20</span></p>",
        "<p><span>18</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Sum of series = (n/2)[2a+(n-1)d] = 20 </span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60296,
      "question": "<p dir=\"ltr\"><span>Find sum of series: 2, 2.5, 3, 3. 5, 4, 4. 5..........11</span></p>",
      "options": [
        "<p><span>120</span></p>",
        "<p><span>123.5</span></p>",
        "<p><span>126.5</span></p>",
        "<p><span>118.5</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>To, find the number of terms in the Ap&nbsp;</span><br><span>Tn = a+(n-1)\u00d7d</span><br><span>11 = 2+(n-1)\u00d70.5</span><br><span>So, we get n = 19</span><br><span>sum of AP = (n/2)[2a+(n-1)d]</span><br><span>n=19, a=2, d=1/2</span><br><span>S = (19/2)[2\u00d72+(19-1)1/2]</span><br><span>S =(19/2)[4+9]&nbsp;</span><br><span>S =9.5\u00d713 = 123.5</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60297,
      "question": "<p dir=\"ltr\"><span>Find Arithmetic Mean of series: 2, 2.5, 3, 3. 5, 4, 4. 5..........11</span></p>",
      "options": [
        "<p><span>13/2</span></p>",
        "<p><span>25/8</span></p>",
        "<p><span>19</span></p>",
        "<p><span>22/9</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Arithmetic mean AM of the series is given by = (a1+a2+a3+.....+an)/n \u2026\u2026\u2026 (1)  </span><br><span>But the given series is also an AP which sum is given by = (n/2)*(a1+an) \u2026\u2026\u2026..(2)  </span><br><span>From equation (1),(2) we get,  </span><br><span>AM=(a1+an)/2  AM=(2+11)/2=13/2.</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60298,
      "question": "<p dir=\"ltr\"><span>Find the sum of series: 1, 3, 9, 27, 81, ..............3</span><sup><span>9</span></sup></p>",
      "options": [
        "<p><span>[(1-3^(10))]/(1-3)</span></p>",
        "<p><span>18</span></p>",
        "<p><span>10</span></p>",
        "<p><span>20</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Sn=[a(1-r</span><sup><span>n</span></sup><span>)]/(1-r) =[1(1-3</span><sup><span>10</span></sup><span>)]/(1-3) =[(1-3</span><sup><span>10</span></sup><span>)]/(1-3)</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60299,
      "question": "<p dir=\"ltr\"><span>Calculate the sum of given series: 1/3, 1/9, 1/27, 1/81.................</span></p>",
      "options": [
        "<p><span>1/4</span></p>",
        "<p><span>1/3</span></p>",
        "<p><span>1/2</span></p>",
        "<p><span>1</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The given series is an infinite GP, </span><br><span>whose sum is given by Sn=a/(r-1) </span><br><span>Where, a=first term of series, </span><br><span>r=common ratio. </span><br><span>Therefore, Sn=(1/3)/(1-1/3) Sn=1/2</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60300,
      "question": "<p dir=\"ltr\"><span>For n positive integers, if their product is n</span><sup><span>n</span></sup><span>, then what will be their sum?</span><br><span>&nbsp;</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Equal to n+(1/n)</span></p>",
        "<p dir=\"ltr\"><span>Equal to n</span></p>",
        "<p dir=\"ltr\"><span>A negative integer</span></p>",
        "<p dir=\"ltr\"><span>Never less than n</span><sup><span>2</span></sup></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Clearly, since the given integers are positive, their sum can't be negative.&nbsp;</span><br><span>Also, since the numbers are all integers their sum can't be a fraction.&nbsp;</span><br><span>Let's take 1, 3 and 9. The product of these three integers is 27 = 3</span><sup><span>3</span></sup><span>.&nbsp;</span><br><span>This can also be written as n</span><sup><span>n</span></sup><span> where n=3.&nbsp;</span><br><span>As we can see, the sum of these 3 integers is not equal to 3.&nbsp;</span><br><span>Therefore, we are left with the fourth option.</span><br><span>&nbsp;</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60301,
      "question": "<p dir=\"ltr\"><span>A tennis ball is initially dropped from a building of height 180 m. After striking the ground, it rebounds (3/5)</span><sup><span>th</span></sup><span> of the height from which it has fallen.&nbsp;Calculate the total distance that the ball traveled before it comes to rest.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>540 m</span></p>",
        "<p dir=\"ltr\"><span>600 m</span></p>",
        "<p dir=\"ltr\"><span>900 m</span></p>",
        "<p dir=\"ltr\"><span>None of the above</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The total distance traveled by the ball is the sum of two infinite series: a. </span><br><span>Series 1: the distance traveled by the ball when it's falling down b. </span><br><span>Series 2: the distance traveled by the ball when it's bouncing up </span><br><span>S1 = a1 / (1 - r1) and S2 = a2 / (1 - r2) </span><br><span>S1 = 180 / (1 - 3/5) and S2 = (180 * 3/5) / (1 - 3/5) </span><br><span>S1 = 180 / (2/5) and S2 = 108 / (2/5) </span><br><span>S1 = 180 * 5/2 and S2 = 108 * 5/2 </span><br><span>S1 = 450 and S2 = 270 </span><br><span>Therefore, S = S1+S2 = 720 m.</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60302,
      "question": "<p dir=\"ltr\"><span>If the average of the given 7 consecutive numbers is x. Now, the next three numbers are also added, what effect will it have on the calculated average?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Remain unchanged</span></p>",
        "<p dir=\"ltr\"><span>Increase by 1</span></p>",
        "<p dir=\"ltr\"><span>Increase by 1.5</span></p>",
        "<p dir=\"ltr\"><span>Increase by 2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We are given x = [(a-3)+(a-2)+(a-1)+a+(a+1)+(a+2)+(a+3)]/7 </span><br><span>assuming that the middle number is a. </span><br><span>Then, x = 7a/7 = a. </span><br><span>If we add, the next three integers </span><br><span>then the average becomes y = {[(a-3)+(a-2)+(a-1)+a+(a+1)+(a+2)+(a+3)] + [(a+4)+(a+5)+(a+6)]}/10 = {7a + 3a + 15}/10 = {10a + 15}/10 = a + 1.5. </span><br><span>So, the average is increased by y-x = 1.5</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60303,
      "question": "<p dir=\"ltr\"><span>Calculate the sum of given series: log</span><sub><span>10</span></sub><span>10 + log</span><sub><span>10</span></sub><span>10</span><sup><span>2</span></sup><span> + ... + log</span><sub><span>10</span></sub><span>10</span><sup><span>n</span></sup></p>",
      "options": [
        "<p>[Tex]\\\\n^2 + 1[/Tex]</p>",
        "<p>[Tex]\\\\n^2- 1[/Tex]</p>",
        "<p>[Tex]\\\\n^3 + 3[/Tex]</p>",
        "<p>[Tex]\\\\(n^2+ n)/2[/Tex]</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Rewriting the expression as 1 + 2 + ... + n </span><br><span>We know, sum of n natural numbers is given by n\u00d7(n+1)/2 = (n</span><sup><span>2</span></sup><span>+n)/2</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60304,
      "question": "<p dir=\"ltr\"><span>Four consecutive terms of an increasing arithmetic sequence are : x, 17, 3x - y</span><sup><span>2</span></sup><span> - 2 and 3x + y</span><sup><span>2</span></sup><span> - 30.&nbsp;The sum of the four numbers will be divisible by:</span></p>",
      "options": [
        "<p><span>2</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>",
        "<p dir=\"ltr\"><span>None of the above</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let's rewrite the 4 terms as (17-d), 17, (17+d), (17+2d) </span><br><span>where d is the common difference. </span><br><span>Then, Sum = (17-d) + 17 + (17+d) + (17+2d) = 17\u00d74 + 2d = 2 \u00d7 (17\u00d72 + d). </span><br><span>So, their sum is divisible by 2.</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60305,
      "question": "<p dir=\"ltr\"><span>Given an expression </span><sup><span>13</span></sup><span>\u2211</span><sub><span>n=1</span></sub><span>1/n which can also be written as a/13!&nbsp;. What would be the remainder if a is divided by 11?</span></p>",
      "options": [
        "<p><span>3</span></p>",
        "<p><span>5</span></p>",
        "<p><span>7</span></p>",
        "<p><span>9</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have, a/13! = 1/1 + 1/2 + 1/3 ... + 1/13 </span><br><span>a = 13!/1 + 13!/2 + 13!/3 ... + 13!/13 </span><br><span>Clearly, all the terms in the summation are divisible by 11 except 13!/11. </span><br><span>We can rewrite it as 13\u00d712\u00d711\u00d7...\u00d72\u00d71 / 11 = 13\u00d712\u00d710! </span><br><span>We have to find the remainder for 13\u00d712\u00d710! / 11. </span><br><span>But, we know, remainder for ((n-1)!/n) = -1. </span><br><span>Then, Remainder for 13\u00d712\u00d710! / 11 = 2\u00d71\u00d7(-1) = -2. </span><br><span>Converting the negative remainder to positive, -2+11 = 9.</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60306,
      "question": "<p dir=\"ltr\"><span>The value of the expression </span><sup><span>100</span></sup><span>\u2211</span><sub><span>i=2</span></sub><span> 1/log</span><sub><span>i</span></sub><span>100! is:</span></p>",
      "options": [
        "<p><span>0.01</span></p>",
        "<p><span>0.1</span></p>",
        "<p><span>1</span></p>",
        "<p><span>10</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The expression </span><sup><span>100</span></sup><span>\u2211</span><sub><span>i=2</span></sub><span> 1/log</span><sub><span>i</span></sub><span>100! can be rewritten as: </span><br><span>1/log</span><sub><span>2</span></sub><span>100! + 1/log</span><sub><span>3</span></sub><span>100! + ... + 1/log</span><sub><span>100</span></sub><span>100! = log</span><sub><span>100!</span></sub><span>2 + log</span><sub><span>100!</span></sub><span>3 + ... + log</span><sub><span>100!</span></sub><span>100  = log</span><sub><span>100!</span></sub><span>2\u00d73\u00d7...\u00d7100 = log</span><sub><span>100!</span></sub><span>100! = 1.</span></p>",
      "tag": "Progressions || MCQ"
    },
    {
      "id": 60307,
      "question": "<p dir=\"ltr\"><span>How many terms are there in 3,9,27,81........531441?   </span></p>",
      "options": [
        "<p><span>10</span></p>",
        "<p><span>12</span></p>",
        "<p><span>13</span></p>",
        "<p><span>14</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<pre><span>3, 9, 27, 81..............531441 form a G.P. with a = 3 and r = 9/3 = 3Let the number of terms be n</span></pre><p dir=\"ltr\"><span>According to the formula,   N</span><sup><span>th</span></sup><span> term of the G.P is represented as T</span><sub><span>n</span></sub><span> = a x r</span><sup><span>n-1</span></sup></p><pre><span>Then 3 x 3</span><sup><span>n-1</span></sup><span> = 531441\u2234 3</span><sup><span>n</span></sup><span> = 3</span><sup><span>12</span></sup><span>\u2234 n = 12</span></pre><p dir=\"ltr\"><span>Alternate method,</span></p><p dir=\"ltr\"><span>cyclicity of 3</span><sup><span>n</span></sup><span> (where , n=1,2,3,4,5,6..........) is 4 with (3,9,7,1 as its last digit cycles respectively).</span><br><span>so, as the given number ends with digit 1  we can conclude that n is divisible by 4.</span><br><span>12 is the only option with divisor 4 so, we can say 3</span><sup><span>12  </span></sup><span>is the required  answer.</span></p>",
      "tag": "Progressions || MCQ"
    }
  ],
  "Logarithms": [
    {
      "id": 60308,
      "question": "<p dir=\"ltr\"><span>Solve for x: log\u2061</span><sub><span>2</span></sub><span>\u2061(x\u22123)+log</span><sub><span>2</span></sub><span>(x+5)=3</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>3.59</span></p>",
        "<p><span>3</span></p>",
        "<p><span>3.89</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Combine logs: \u2061log</span><sub><span>2</span></sub><span>((x\u22123)(x+5)) = 3</span></p><p dir=\"ltr\"><span>Rewrite in exponential form: (x\u22123)(x+5) = 2</span><sup><span>3 </span></sup><span>= 8</span></p><p dir=\"ltr\"><span>Expand and solve: x</span><sup><span>2</span></sup><span>+2x\u221215 = 8\u2005\u200a\u2005\u200a</span><br><span>x</span><sup><span>2</span></sup><span>+2x\u221223 = 0</span></p><p dir=\"ltr\"><span>Using the quadratic formula:</span></p><p>[Tex]x = \\frac{-2 \\pm \\sqrt{4 + 92}}{2} = \\frac{-2 \\pm \\sqrt{96}}{2} = \\frac{-2 \\pm 4\\sqrt{6}}{2} = -1 \\pm 2\\sqrt{6}[/Tex]<span>\u200b</span></p><p dir=\"ltr\"><span>Valid x: </span>[Tex]x = -1 + 2\\sqrt{6} \\approx 3.898[/Tex]</p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60309,
      "question": "<p dir=\"ltr\"><span>If log</span><sub><span>\u2061a</span></sub><span>b=2 and log\u2061</span><sub><span>b</span></sub><span>c=3, find log</span><sub><span>\u2061a</span></sub><span>c.</span></p>",
      "options": [
        "<p><span>5</span></p>",
        "<p><span>6</span></p>",
        "<p><span>3</span></p>",
        "<p><span>10</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Using the change of base formula:</span></p><p dir=\"ltr\"><span>log\u2061</span><sub><span>a</span></sub><span>c = log\u2061</span><sub><span>a</span></sub><span>b \u00d7 log</span><sub><span>\u2061b</span></sub><span>c = 2\u00d73 = 6</span></p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60310,
      "question": "<p dir=\"ltr\"><span>Simplify  </span>[Tex]\\log \\left(\\frac{1000 \\cdot \\sqrt{10}}{10^3}\\right)[/Tex]</p>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>0.5</span></p>",
        "<p><span>0.3</span></p>",
        "<p><span>0.7</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Rewrite inside the log:</span><br>[Tex]\\log \\left(\\frac{1000 \\cdot \\sqrt{10}}{1000}\\right) = \\log (\\sqrt{10}) = \\log (10^{1/2}) = \\frac{1}{2} \\log (10) = \\frac{1}{2} \\times 1 = 0.5[/Tex]</p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60311,
      "question": "<p dir=\"ltr\"><span>If log</span><sub><span>\u2061x </span></sub><span>2 = a  and log\u2061</span><sub><span>x </span></sub><span>5 = b, express log\u2061</span><sub><span>x </span></sub><span>20 in terms of a and b.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2a+b</span></p>",
        "<p dir=\"ltr\"><span>a+2b</span></p>",
        "<p dir=\"ltr\"><span>2a</span></p>",
        "<p dir=\"ltr\"><span>2ab</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>log</span><sub><span>x</span></sub><span>\u200b20 = log</span><sub><span>x</span></sub><span>\u200b(2</span><sup><span>2 </span></sup><span>\u00d7 5) = 2log</span><sub><span>x\u200b</span></sub><span>2 + log</span><sub><span>x\u200b</span></sub><span>5 = 2a+b</span></p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60312,
      "question": "<p dir=\"ltr\"><span>Evaluate: log</span><sub><span>\u20614 </span></sub><span>8 + log</span><sub><span>\u20618 </span></sub><span>4</span></p>",
      "options": [
        "<p><span>11/6</span></p>",
        "<p><span>12/6</span></p>",
        "<p><span>13/6</span></p>",
        "<p><span>10/6</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Rewrite using change of base:</span></p><p dir=\"ltr\"><span>log\u2061</span><sub><span>4</span></sub><span>8+log</span><sub><span>\u20618</span></sub><span>4 = (log\u2061 8/log\u2061 4)+(log \u20614/log \u20618)</span></p><p dir=\"ltr\"><span>Since log \u20618 = 3log \u20612 and log \u20614 = 2log \u20612:</span></p><p><span>= 3/2+2/3=(9+4)/6=13/6.</span></p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60313,
      "question": "<p dir=\"ltr\"><span>If log</span><sub><span>\u2061x </span></sub><span>4 = 2 and log</span><sub><span>\u2061x </span></sub><span>8 = 3, find x.</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>8</span></p>",
        "<p><span>3</span></p>",
        "<p><span>2</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Using properties of logarithms:</span><br><span>x</span><sup><span>2 </span></sup><span>= 4 and x</span><sup><span>3 </span></sup><span>= 8</span><br><span>From x</span><sup><span>2 </span></sup><span>= 4, we find x=2, which also satisfies x</span><sup><span>3 </span></sup><span>= 8 </span><br><span>Therefore, x=2</span></p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60314,
      "question": "<p dir=\"ltr\"><span>Solve for x if log\u2061</span><sub><span>3 </span></sub><span>(x+1) \u2212 log</span><sub><span>\u20613 </span></sub><span>(x\u22121) = 1</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>2</span></p>",
        "<p><span>8</span></p>",
        "<p dir=\"ltr\"><span>none of these</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Combine logs:</span><br><span>log</span><sub><span>\u20613 </span></sub><span>[(x+1)/(x\u22121)] = 1</span><br><span>Rewrite in exponential form:</span><br><span>(x+1)/(x\u22121) = 3</span><br><span>Cross-multiply and solve:</span><br><span>x+1 = 3(x\u22121)\u2005\u200a\u2005\u200a</span><br><span>\u21d2 x+1 = 3x\u22123\u2005\u200a</span><br><span>\u21d2 4 = 2x\u2005\u200a</span><br><span>\u21d2 \u200ax = 2</span></p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60315,
      "question": "<p dir=\"ltr\"><span>If log</span><sub><span>\u20615 </span></sub><span>(3x\u22127) = 2, find x</span></p>",
      "options": [
        "<p><span>10.80</span></p>",
        "<p><span>10.55</span></p>",
        "<p><span>10.67</span></p>",
        "<p><span>10.79</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Rewrite in exponential form:</span><br><span>3x\u22127 = 5</span><sup><span>2 </span></sup><span>= 25</span><br><span>Solve for x:</span><br><span>3x=32</span><br><span>\u21d2 x = 32/3 \u2248 10.67</span></p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60316,
      "question": "<p dir=\"ltr\"><span>Solve the following logarithmic equation for x : 2log</span><sub><span>a</span></sub><span>x = log</span><sub><span>a</span></sub><span>18 + log</span><sub><span>a</span></sub><span>(x-4).</span></p>",
      "options": [
        "<p><span>6, 10</span></p>",
        "<p><span>4, 7</span></p>",
        "<p><span>12, 6</span></p>",
        "<p><span>7, 6</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>As we know, log ( m \u00d7 n ) = log m + log n </span></p><p dir=\"ltr\"><span>log</span><sub><span>a</span></sub><span>(x</span><sup><span>2</span></sup><span>)= log</span><sub><span>a</span></sub><span>(18 \u00d7 (x-4))</span><br/><span>x</span><sup><span>2</span></sup><span>= 18 \u00d7 (x-4)</span><br/><span>\u21d2 x</span><sup><span>2 </span></sup><span>= 18x-72 </span><br/><span>\u21d2 x</span><sup><span>2 </span></sup><span>- 18x + 72 = 0</span><br/><span>\u21d2 (x - 6) (x - 12) =0</span><br/><span>\u21d2 x = 6, 12.</span><br/></p>",
      "tag": "Logarithms || MCQ"
    },
    {
      "id": 60317,
      "question": "<p dir=\"ltr\"><span>If log</span><sub><span>\u20613 </span></sub><span>x = 5, find log\u2061</span><sub><span>9 </span></sub><span>x</span></p>",
      "options": [
        "<p><span>2.5</span></p>",
        "<p><span>2.75</span></p>",
        "<p><span>2.35</span></p>",
        "<p><span>2.78</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Rewrite log\u2061</span><sub><span>9 </span></sub><span>x using base change:</span></p><p dir=\"ltr\"><span>log</span><sub><span>\u20619</span></sub><span> x = log\u2061</span><sub><span>3 </span></sub><span>x/log</span><sub><span>\u20613 </span></sub><span>9 = 5/2=2.5</span></p>",
      "tag": "Logarithms || MCQ"
    }
  ],
  "Permutation and Combination": [
    {
      "id": 60318,
      "question": "<p dir=\"ltr\"><span>What is the number of possible words that can be made using the word \u201cEASYQUIZ\u201d such that the vowels always come together?</span></p>",
      "options": [
        "<p><span>120</span></p>",
        "<p><span>720</span></p>",
        "<p><span>2880</span></p>",
        "<p><span>4320</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The word \u201cEASYQUIZ\u201d has 8 letters in which \u201cEAUI\u201d are vowels. </span><br><span>Since vowels always come together, we can assume \u201cEAUI\u201d as a single unit letter.  </span><br><span>4 + 1 letter can be arranged in 5! ways. </span><br><span>Also, vowels \u201cEAUI\u201d can be arranged in 4! ways. </span><br><span>Hence the total number of possible words = 5! \u00d7 4! = 2880.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60319,
      "question": "<p dir=\"ltr\"><span>What is the number of possible words that can be made using the word \u201cQUIZ\u201d such that the vowels never come together?</span></p>",
      "options": [
        "<p><span>8</span></p>",
        "<p><span>12</span></p>",
        "<p><span>16</span></p>",
        "<p><span>24</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The word \u201cQUIZ\u201d has 4 letters in which \u201cUI\u201d are vowels.  </span><br><span>Total number of possible words = 4! </span><br><span>Treating \u201cUI\u201d as a single letter we can make words in 3! ways. </span><br><span>\u201cUI\u201d can be arranged in 2! ways. </span><br><span>Therefore, the number of words can be made using vowels together = 3! \u00d7 2! = 12 ways. </span><br><span>Hence, the number of words can be made such that vowels never come together = 24 \u2013 12 = 12 ways.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60320,
      "question": "<p dir=\"ltr\"><span>How many five-letter words can be made from the word \u201cAPPLE\u201d using all the alphabets with repetition and without repetition, respectively?</span></p>",
      "options": [
        "<p><span>1024, 60</span></p>",
        "<p><span>3125, 60</span></p>",
        "<p><span>1024, 1024</span></p>",
        "<p><span>240, 1024</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><b><strong>With repetition allowed: If</strong></b><span> repetition is allowed, each of the 5 positions can be filled by any of the 4 distinct letters {A, P, L, E}. 4</span><sup><span>5</span></sup><span> = 1024</span></li><li value=\"2\"><b><strong>Without repetition:</strong></b><span> The number of distinct arrangements of the letters in APPLE is: </span>[Tex]\\frac{5!}{2!} = 60[/Tex]<span>, since the letter P occurs twice.</span></li></ul><p dir=\"ltr\"><span>Hence, the required numbers are 1024,\u00a060</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60321,
      "question": "<p dir=\"ltr\"><span>How many ways a 6 member team can be formed having 3 men and 3 ladies from a group of 6 men and 7 ladies?</span></p>",
      "options": [
        "<p><span>700</span></p>",
        "<p><span>720</span></p>",
        "<p><span>120</span></p>",
        "<p><span>500</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have to pick 3 men from 6 available men and 3 ladies from 7 available ladies. </span><br><span>Required number of ways =&nbsp;&nbsp;</span><sup><span>6</span></sup><span>C</span><sub><span>3</span></sub><span> \u00d7 </span><sup><span>7</span></sup><span>C</span><sub><span>3</span></sub><span> = 20 \u00d7 35 = 700.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60322,
      "question": "<p dir=\"ltr\"><span>In how many ways can an interview panel of 3 members be formed from 3 engineers, 2 psychologists and 3 managers if at least 1 engineer must be included?</span></p>",
      "options": [
        "<p><span>30</span></p>",
        "<p><span>15</span></p>",
        "<p><span>46</span></p>",
        "<p><span>45</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The interview panel of 3 members can be formed in 3 ways by selecting 1 engineer and 2 other professionals, 2 engineers and 1 other professionals and all 3 engineers. </span></p><ul><li value=\"1\"><span>1 engineer out of 3 engineers and 2 other professionals out of 5 professionals can be selected as = </span><sup><span>3</span></sup><span>C</span><sub><span>1</span></sub><span> \u00d7 </span><sup><span>5</span></sup><span>C</span><sub><span>2</span></sub><span> = 3 * 10 = 30 ways.</span></li><li value=\"2\"><span>2 engineers out of 3 engineers and 1 other professional out of 5 professionals can be selected as = </span><sup><span>3</span></sup><span>C</span><sub><span>2</span></sub><span> \u00d7 </span><sup><span>5</span></sup><span>C</span><sub><span>1</span></sub><span> = 3 * 5 = 15 ways.</span></li><li value=\"3\"><span>3 engineers out of 3 engineers and 0 other professional out of 5 professionals can be selected as = </span><sup><span>3</span></sup><span>C</span><sub><span>3</span></sub><span> \u00d7 </span><sup><span>5</span></sup><span>C</span><sub><span>0</span></sub><span> = 1 way.</span></li></ul><p dir=\"ltr\"><span> Hence, total number of ways = 30 + 15 + 1 = 46 ways.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60323,
      "question": "<p dir=\"ltr\"><span>How many 4-digit numbers can be formed from the digits 1, 2, 3, 4, 5, 6 and 7 which are divisible by 5 when none of the digits are repeated?</span></p>",
      "options": [
        "<p><span>120</span></p>",
        "<p><span>35</span></p>",
        "<p><span>24</span></p>",
        "<p><span>720</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A number is divisible by 5 if and only if its last digit is either 5 or 0. </span><br><span>But, 0 is not available here. </span><br><span>So, we have to fix 5 as a last digit of 4-digit number and fill 3 places with remaining 6 digits. </span><br><span>Number of ways to choose 3 digits = </span><sup><span>6</span></sup><span>C</span><sub><span>3</span></sub><span> = 20. </span><br><span>Number of ways to arrange the chosen digits = 3! </span><br><span>Hence, total number of required ways = </span><sup><span>6</span></sup><span>C</span><sub><span>3</span></sub><span> \u00d7 3! = </span><sup><span>6</span></sup><span>P</span><sub><span>3</span></sub><span> = 120.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60324,
      "question": "<p dir=\"ltr\"><span>In how many ways can 20 boys and 18 girls make a queue such that no two girls are together?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>20! \u00d7 </span><sup><span>20</span></sup><span>C</span><sub><span>18</span></sub><span> </span></p>",
        "<p dir=\"ltr\"><span>20! \u00d7 </span><sup><span>20</span></sup><span>P</span><sub><span>18</span></sub><span> </span></p>",
        "<p dir=\"ltr\"><span>20! \u00d7 </span><sup><span>21</span></sup><span>C</span><sub><span>18</span></sub><span> </span></p>",
        "<p dir=\"ltr\"><span>20! \u00d7 </span><sup><span>21</span></sup><span>P</span><sub><span>18</span></sub><span> </span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The boys will be arranged in 20! ways. </span><br><span>Now, there are a total of 21 possible places available between boys such that no 2 girls can be placed together </span><br><span>(alternate sequence of boys and girls, starting and ending positions for girls). </span><br><span>Therefore, the 18 girls can stand at these 21 places only.  </span><br><span>Hence, the number of ways = 20! \u00d7 </span><sup><span>21</span></sup><span>P</span><sub><span>18</span></sub><span>  Option (D) is correct.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60325,
      "question": "<p dir=\"ltr\"><span>There are 5 floating stones on a river. A man wants to cross the river. He can move either 1 or 2 steps at a time. Find the number of ways in which he can cross the river? (Man can't take double step from last stone).</span></p>",
      "options": [
        "<p><span>11</span></p>",
        "<p><span>12</span></p>",
        "<p><span>13</span></p>",
        "<p><span>14</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The man needs to take 6 steps to cross the river. He can do this in the following ways: </span></p><ul><li value=\"1\"><span>Crossing the river by 6 unit steps = 1 way.</span></li><li value=\"2\"><span>Crossing the river by 4 unit steps and 1 double step = </span><sup><span>5</span></sup><span>C</span><sub><span>1</span></sub><span> = </span><sup><span>5</span></sup><span>C</span><sub><span>4</span></sub><span> = 5 ways.</span></li><li value=\"3\"><span>Crossing the river by 2 unit steps and 2 double steps = </span><sup><span>4</span></sup><span>C</span><sub><span>2</span></sub><span> = 6 ways.</span></li><li value=\"4\"><span>Crossing the river by 3 double steps = 1 way.</span></li></ul><p dir=\"ltr\"><span> Hence, the required number of ways = 1 + 5 + 6 + 1 = 13.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60326,
      "question": "<p dir=\"ltr\"><span>Out of 7 boys and 4 girls, how many queues of 3 boys and 2 girls can be formed?</span></p>",
      "options": [
        "<p><span>120</span></p>",
        "<p><span>25200</span></p>",
        "<p><span>24800</span></p>",
        "<p><span>1440</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Number of ways to choose 3 boys out of 7 = </span><sup><span>7</span></sup><span>C</span><sub><span>3</span></sub><span>. </span><br><span>Number of ways to choose 2 girls out of 4 = </span><sup><span>4</span></sup><span>C</span><sub><span>2</span></sub><span>. </span><br><span>Therefore, number of ways to choose the required groups = </span><sup><span>7</span></sup><span>C</span><sub><span>3</span></sub><span> \u00d7 </span><sup><span>4</span></sup><span>C</span><sub><span>2</span></sub><span> = 35 \u00d7 6 = 210. </span><br><span>Number of ways to arrange the 3 boys and 2 girls in a queue = 5! = 120. </span><br><span>Therefore, the required number of queues = 210 \u00d7 120 = 25200.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60327,
      "question": "<p dir=\"ltr\"><span>A box contains 2 red coins, 3 green coins and 4 blue coins. In how many ways can 3 coins be chosen such that at least one coin is green?</span></p>",
      "options": [
        "<p><span>16</span></p>",
        "<p><span>32</span></p>",
        "<p><span>64</span></p>",
        "<p><span>128</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>There are three cases: </span></p><ul><li value=\"1\"><span>3 green coins</span></li><li value=\"2\"><span>2 green coins + 1 non-green coin</span></li><li value=\"3\"><span>1 green coin + 2 non-green coins</span></li></ul><p dir=\"ltr\"><span> Therefore, total number of ways = </span><sup><span>3</span></sup><span>C</span><sub><span>3 </span></sub><span>+ </span><sup><span>3</span></sup><span>C</span><sub><span>2</span></sub><span> \u00d7 </span><sup><span>6</span></sup><span>C</span><sub><span>1</span></sub><span> + </span><sup><span>3</span></sup><span>C</span><sub><span>1</span></sub><span> </span><sub><span> </span></sub><span>\u00d7 </span><sup><span>6</span></sup><span>C</span><sub><span>2</span></sub><span> = 1 + 3</span><sub><span> </span></sub><span>\u00d7 6 + 3 </span><sub><span> </span></sub><span>\u00d7 15 = 64.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60328,
      "question": "<p dir=\"ltr\"><span>Out of 6 engineers and 4 doctors, how many groups of 4 professionals can be formed such that at least 1 engineer is always there?</span></p>",
      "options": [
        "<p><span>129</span></p>",
        "<p><span>109</span></p>",
        "<p><span>229</span></p>",
        "<p><span>209</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>There are four cases: </span></p><ul><li value=\"1\"><span>4 engineers = </span><sup><span>6</span></sup><span>C</span><sub><span>4</span></sub><span> = 15</span></li><li value=\"2\"><span>3 engineers and 1 doctor = </span><sup><span>6</span></sup><span>C</span><sub><span>3 </span></sub><span>\u00d7 </span><sup><span>4</span></sup><span>C</span><sub><span>1</span></sub><span> = 20 \u00d7 4 = 80</span></li><li value=\"3\"><span>2 engineers and 2 doctors = </span><sup><span>6</span></sup><span>C</span><sub><span>2 </span></sub><span>\u00d7 </span><sup><span>4</span></sup><span>C</span><sub><span>2</span></sub><span> = 15 \u00d7 6 = 90</span></li><li value=\"4\"><span>1 engineer and 3 doctors = </span><sup><span>6</span></sup><span>C</span><sub><span>1 </span></sub><span>\u00d7 </span><sup><span>4</span></sup><span>C</span><sub><span>3</span></sub><span> = 24</span></li></ul><p dir=\"ltr\"><span> Therefore, total number of ways = 15 + 80 + 90 + 24 = 209.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60329,
      "question": "<p dir=\"ltr\"><span>Out of 8 boys and 10 girls, how many groups of 5 boys and 6 girls can be formed?</span></p>",
      "options": [
        "<p><span>11760</span></p>",
        "<p><span>25200</span></p>",
        "<p><span>720 </span></p>",
        "<p><span>120960</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Required number of ways = </span><sup><span>8</span></sup><span>C</span><sub><span>5</span></sub><span> \u00d7 </span><sup><span>10</span></sup><span>C</span><sub><span>6</span></sub><span> = 56 \u00d7 210 = 11760.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60330,
      "question": "<p dir=\"ltr\"><span>In how many ways can the alphabets of the word \u2018DERAIL\u2019 be arranged so that the vowels come at the odd positions only? </span></p>",
      "options": [
        "<p><span>12</span></p>",
        "<p><span>18</span></p>",
        "<p><span>24</span></p>",
        "<p><span>36</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>There are 3 consonants (D,R,L) and 3 vowels (E,A,I).  </span><br><span>There are 3 odd (O) positions and 3 even (E) positions: </span><u><span class=\"GFGEditorTheme__textUnderline\">O</span></u><span> </span><u><span class=\"GFGEditorTheme__textUnderline\">E</span></u><span> </span><u><span class=\"GFGEditorTheme__textUnderline\">O</span></u><span> </span><u><span class=\"GFGEditorTheme__textUnderline\">E</span></u><span> </span><u><span class=\"GFGEditorTheme__textUnderline\">O</span></u><span> </span><u><span class=\"GFGEditorTheme__textUnderline\">E</span></u><span>. </span><br><span>Therefore, required number of arrangements = </span><sup><span>3</span></sup><span>P</span><sub><span>3</span></sub><span> \u00d7 </span><sup><span>3</span></sup><span>P</span><sub><span>3</span></sub><span> = 6 \u00d7 6 = 36. </span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60331,
      "question": "<p dir=\"ltr\"><span>In how many different ways can the alphabets of the word \u2018SCORING\u2019 be arranged so that the vowels always come together?</span></p>",
      "options": [
        "<p><span>120</span></p>",
        "<p><span>720</span></p>",
        "<p><span>240</span></p>",
        "<p><span>1440</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have 5 consonants and 2 vowels</span><br><span>Since, the vowels must always come together, we can treat them as a single alphabet</span><br><span>Then, we have to arrange 6 alphabets</span><br><span>Number of ways to arrange 6 alphabets = 6! = 720</span><br><span>The two vowels can be arranged in 2! Ways</span><br><span>So, the required number of ways = 6! \u00d7 2! = 1440 </span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60332,
      "question": "<p dir=\"ltr\"><span>The value of </span><sup><span>75</span></sup><span>C</span><sub><span>2</span></sub><span> is: </span></p>",
      "options": [
        "<p><span>1215 </span></p>",
        "<p><span>2315 </span></p>",
        "<p><span>2775 </span></p>",
        "<p><span>1675 </span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><sup><span>75</span></sup><span>C</span><sub><span>2</span></sub><span> = 75! / (73! \u00d7 2!) = 75 \u00d7 74/2 = 2775.</span></p>",
      "tag": "Permutation and Combination || MCQ"
    },
    {
      "id": 60333,
      "question": "<p dir=\"ltr\"><span>How many distinguishable permutations of the letters in the word BANANA are there ?</span></p>",
      "options": [
        "<p><span>720</span></p>",
        "<p><span>120</span></p>",
        "<p><span>60</span></p>",
        "<p><span>360</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In BANANA we have six letters in total but here we have some duplicate letters too</span><br><span>so, we have to deal with it and have to remove those duplicate case. </span><br><span>B \u2192 1, A \u2192 3, N \u2192 2,  So total no of words possible is factorial(6) i.e. 6! </span><br><span>but we must remove duplicate words: i.e.- (6!/(2! \u00d7 3!))  which gives 60  </span><br><span>So 60 distinguishable permutation of the letters in BANANA. So, option (C) is correct</span></p>",
      "tag": "Permutation and Combination || MCQ"
    }
  ],
  "Probability": [
    {
      "id": 60334,
      "question": "<p dir=\"ltr\"><span>What is the probability of rolling a number greater than 4 when rolling a fair six-sided die?</span></p>",
      "options": [
        "<p><span>1/6</span></p>",
        "<p><span>1/3</span></p>",
        "<p><span>1/2</span></p>",
        "<p><span> 2/3</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A six-sided die has the numbers 1 through 6. The numbers greater than 4 are 5 and 6, which are two possible outcomes. The probability of rolling a number greater than 4 is the number of favorable outcomes (2) divided by the total number of outcomes (6), resulting in 2/6, which simplifies to 1/3.</span></p>",
      "tag": "Probability || MCQ"
    },
    {
      "id": 60335,
      "question": "A card is drawn from a pack of 52 cards. Determine the probability of not getting an ace.",
      "options": [
        "12/13",
        "3/4",
        "1/13",
        "1/4"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "The number of aces of each suit is, \r\n       n(E) = 1 \u00d7 4 = 4\r\nProbability of getting an ace is,\r\nP = n(E)/n(S)\r\n=>4/52\r\n=>1/13\r\nThen, the probability of not getting an ace is,\r\nP' = 1 - P\r\n=> 1 - 1/13\r\n=> 12/13 \r\n",
      "tag": "Probability || MCQ"
    },
    {
      "id": 60336,
      "question": "\n<p><span style=\"background-color:transparent;color:#000000;\"><strong>Sagar is given a question by his teacher to solve and the topic is Probability but since he is weak in it, he wants us to help him. So the question is- </strong></span><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>On a toss of two dice, A throws a total of 5. Then the probability that he will throw another 5 before he throws 7 is?</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
      "options": [
        "\n<p>0.50</p>\n",
        "\n<p>0.45</p>\n",
        "\n<p>0.40</p>\n",
        "\n<p>0.60</p>\n"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>total probabilities for getting 5 = 4/36</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>total probabilities for getting 7 = 6/36</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>Total Probability = 10/36\u200b</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>We need only 5, hence probability of getting only 5 is =(4/36)/(10/36)= 0.4</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
      "tag": "Probability || MCQ"
    },
    {
      "id": 60337,
      "question": "\n<p><span style=\"background-color:transparent;color:#000000;\"><strong>Himanshu is giving a test and he is stuck on a question which he wants us to solve and the question is -</strong></span><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>3 dice are rolled. What is the probability that you will get the sum of the no\u2019s as 10?</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
      "options": [
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>27/216</strong></span></p>\n",
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>25/216</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>10/216</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>1/11</strong></span></p>\n\n<p><br>&nbsp;</p>\n"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>total events = 6 x 6 x 6=216</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>possible cases for sum equal to 10 are</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>(1,3,6)-6 combinations (3!)</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>(1,4,5)-6 combinations</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>(2,3,5)-6 combinations</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>(2,4,4)-3 combinations (3!/2! as repetition)</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>(3,3,4)-3 combinations</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>(2,2,6)-3 combinations</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>so total combinations are 27</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>so probability will be&nbsp; 27/216</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
      "tag": "Probability || MCQ"
    },
    {
      "id": 60338,
      "question": "\n<p><span style=\"background-color:transparent;color:#000000;\"><strong>Priyanka is solving questions on Probability and the next question she is going to solve is- </strong></span><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>A bag contains 1100 tickets numbered 1, 2, 3, ... 1100. If a ticket is drawn out of it at random, what is the probability that the ticket drawn has the digit 2 appearing on it?</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
      "options": [
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>290/1100</strong></span></p>\n",
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>291/1100</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>292/1100</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
        "\n<p><span style=\"background-color:#f4f4f6;color:#000000;\"><strong>301/1100</strong></span></p>\n\n<p><br>&nbsp;</p>\n"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>no. of numbers between 1 to 999 in which at-least one 2 is present =</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>[ fix 2 at 100th position and the unit and 10th places can be filled in 10 x 10 ways (as each place can be filled with 0 to 9 ) ]</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>+ [ fix 2 at 10th position and then 100th place can be filled with 9 values (0 to 9 excluding 2, as we have already been counted 2 at the 100th place) x 10 ( as unit place can still use values 0 to 9 ) ]</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>+ [ fix 2 at unit place and then 100th place can be filled with 9 values (0 to 9 excluding 2, as we have already been counted 2 at 100th place) x 10th place can be filled with 9 values (0 to 9 excluding 2, as we have already been counted 2 at 10th place) ]</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>=10 x 10+9 x 10+9 x 9</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>=100 + 90 + 81</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>=271</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>Now, no. of numbers between 1000 to 1099 in which at-least one 2 is present = 2 is fixed at 10th place and 10 ways of filling unit place</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>+ 9 ways of filling 10th place (0 to 9 excluding 2 ) and 2 is fixed at unit place</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>=10 + 9</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>=19</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>So, total no. of tickets on which digit 2 is appearing = 271 + 19 = 290</strong></span></p>\n\n<p><span style=\"background-color:#ffffff;color:#343434;\"><strong>Therefore, required probability = 290/1100</strong></span></p>\n\n<p><br>&nbsp;</p>\n",
      "tag": "Probability || MCQ"
    },
    {
      "id": 60339,
      "question": "<p>Three fair dice are rolled simultaneously, and the probability of getting a sum of 5 is _______.</p>\n",
      "options": [
        "<p>1/108</p>",
        "<p>1/72</p>",
        "<p>1/54</p>",
        "<p>1/36</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Solution:</p><p>n(s) = 6<sup>3</sup> = 216</p><p>sum s = { a + b + c }</p><p>(1,1,3), (1,3,1), (3,1,1), (2,2,1), (1,2,2), (2,1,1)</p><p>n(A) = 6</p><p>P(A) = n(A)/n(s) = 6/216 = 1/36</p>\n<p>SO, the correct option is (D)</p>",
      "tag": "Probability || MCQ"
    },
    {
      "id": 60340,
      "question": "<p dir=\"ltr\"><span>If the probability of event A is 0.4 and the probability of event B is 0.5, what is the maximum possible value of P(A \u2229 B)?</span></p>",
      "options": [
        "<p><span>0.4</span></p>",
        "<p><span>0.5</span></p>",
        "<p><span>0.9</span></p>",
        "<p><span>0.2</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The maximum possible value of P(A\u2229B) is the smaller of P(A) and P(B). Therefore:</span>[Tex]P(A \\cap B) \\leq \\min(0.4, 0.5) = 0.4[/Tex]</p>",
      "tag": "Probability || MCQ"
    },
    {
      "id": 60341,
      "question": "<p dir=\"ltr\"><span>A book has 50 pages. If a page is selected at random, what is the probability that the sum of the digits on the selected page is equal to 6 ?</span></p>",
      "options": [
        "<p><span>0.1</span></p>",
        "<p><span>0.2</span></p>",
        "<p><span>0.3</span></p>",
        "<p dir=\"ltr\"><span>None of these</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The pages whose sum of the digits equal to 6 are 6, 15, 24, 33, 42. Thus, there are five favorable outcomes out of a possible 50 outcomes. So</span></p><p dir=\"ltr\"><span>Probability= 5/50 = 0.1</span></p><p><br></p>",
      "tag": "Probability || MCQ"
    }
  ],
  "Clocks": [
    {
      "id": 60342,
      "question": "<p dir=\"ltr\"><span>A clock shows 10:00 AM. What time it will be showing, if hrs hand rotates for 180 degrees?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>1:00 PM</span></p>",
        "<p dir=\"ltr\"><span>6:00 PM</span></p>",
        "<p dir=\"ltr\"><span>4:00 PM</span></p>",
        "<p dir=\"ltr\"><span>10:00 PM</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>When hrs hand rotates for 360 degree it covers 12 hrs</span><br><span>So, When hrs hand rotates for 180 degree it covers 6 hrs</span><br><span>So the time will be: 10:00 AM + 6 hrs = 4:00 PM</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60343,
      "question": "<p dir=\"ltr\"><span>If the time is now 4 O\u2019clock, what will be the time after 101 hours from now ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>9 O\u2019clock</span></p>",
        "<p dir=\"ltr\"><span>8 O\u2019clock</span></p>",
        "<p dir=\"ltr\"><span>5 O\u2019clock</span></p>",
        "<p dir=\"ltr\"><span>4 O\u2019clock</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We know that there are 24 hours in a day, so we will take mod for 101 hours&nbsp;</span></p><p dir=\"ltr\"><span>ie&nbsp;(101 mod 24) = 5. So residue is 5.&nbsp;</span></p><p dir=\"ltr\"><span>On adding these remaining 5 hours to the present time will give 9 O'CLOCK time.</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60344,
      "question": "<p dir=\"ltr\"><span>At what time between 6 am and 7 am will the minute hand and the hour hand of a clock make an angle closest to 60\u00b0?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>6:22 am</span></p>",
        "<p dir=\"ltr\"><span>6:27 am</span></p>",
        "<p dir=\"ltr\"><span>6:38 am</span></p>",
        "<p dir=\"ltr\"><span>6:45 am</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Angular speed of hour hand = 360/12 = 30\u00b0 per hour = 30/60 =  0.5\u00b0 per minute. </span><br><span>Angular speed of minute hand = 360/60 = 6\u00b0 per minute. </span><br><span>Relative speed of hour hand and minute hand = 6 \u2013 0.5 = 5.5\u00b0 per minute. </span><br><span>Angle between hour and minute hand at 6 AM = 180\u00b0. </span><br><span>To make an angle of 60\u00b0, total angular distance will be = 180\u00b0 - 60\u00b0 = 120\u00b0. </span><br><span>Time needed to cover angular distance of 120\u00b0 by relative angular speed = 120\u00b0/5.5 = 21.81 minute. </span><br><span>Hence closest time to make an angle of 60\u00b0 = 6:22 AM.</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60345,
      "question": "<p dir=\"ltr\"><span>At what time will the hrs hand and minute hand will be pointing just opposite to each other between 7:00 AM and 8:00 AM?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>60/12 minutes past 7:00 AM</span></p>",
        "<p dir=\"ltr\"><span>40/11 minutes past 7:00 AM</span></p>",
        "<p dir=\"ltr\"><span>60/11 minutes past 8:00 AM</span></p>",
        "<p dir=\"ltr\"><span>60/11 minutes past 7:00 AM</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The hrs hand and minute hand will be pointing just opposite to each other when both hands will be 30 min. space apart  </span><br><span>At 7:00 AM, they are 25 min space apart </span></p><ul><li value=\"1\"><span>Minute hand will have to gain only 5 min spaces</span></li></ul><p dir=\"ltr\"><span> 55 min spaces are gained in 60 min </span></p><ul><li value=\"1\"><span>5 min spaces will be gained in 60/11 minutes</span></li><li value=\"2\"><span>Required time = 60/11 minutes past 7:00 AM</span></li></ul>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60346,
      "question": "<p dir=\"ltr\"><span>A faulty clock gains 5 seconds in every 3 minutes. Ram set it right at 8:00 AM. What is the true time when the clock indicates quarter past 5 o\u2019clock of afternoon?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4:30 PM</span></p>",
        "<p dir=\"ltr\"><span>7:00 PM</span></p>",
        "<p dir=\"ltr\"><span>5 :00 PM</span></p>",
        "<p dir=\"ltr\"><span>3:00 PM</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Quarter past 5 o\u2019clock of afternoon is 5:15 PM  </span><br><span>Time duration from 8:00 AM to 5:15 PM = 37/4 hrs  </span><br><span>3 min 5 sec of this clock means = 3 min of correct time  </span><br><span>3 min 5 sec. = 37/720 hrs  </span><br><span>3 min = 1/20 hrs </span></p><ul><li value=\"1\"><span>37/720 hrs of this clock = 1/20 hrs of correct time</span></li><li value=\"2\"><span>37/4 hrs of this clock = (1/20) \u00d7 (37/4)/(37/720) = 9 hrs of correct time</span></li><li value=\"3\"><span>So the correct time = 8:00AM + 9 hrs = 5 PM</span></li></ul>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60347,
      "question": "<p dir=\"ltr\"><span>The hrs hand rotates by x degrees by 600 seconds past 5. Find the value of x, if the clock is started at the start of day i.e. at time 00:00.&nbsp;</span></p>",
      "options": [
        "<p><span>240</span></p>",
        "<p><span>175</span></p>",
        "<p><span>155</span></p>",
        "<p><span>180</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Angle traced by hrs hand in 12 hrs = 360 degrees </span><br><span>Angle traced by hour hand in 5 hrs 10 min. (5 + 10/60 hrs = 31/6 hrs)&nbsp; =&nbsp; (360/12) \u00d7 (31/6) = 155 degrees</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60348,
      "question": "<p dir=\"ltr\"><span>The reflex angle between the hands of a clock at 21.25 is:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>200 degrees</span></p>",
        "<p dir=\"ltr\"><span>220.7 degrees</span></p>",
        "<p dir=\"ltr\"><span>182 degrees</span></p>",
        "<p dir=\"ltr\"><span>227.5 degrees</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><b><strong>Reflex angle:</strong></b><span> The angle which has a measure between 180 and 360 degrees are called a Reflex Angle. </span><br><span>Angle traced by hrs hand in 9 25/60&nbsp; = 113/12 hrs =&nbsp; (360/12) \u00d7 (113/12) = 282.5 degrees </span><br><span>Angel traced by minutes hand in 25 minutes = (360/60) \u00d7 25 = 150 degrees</span></p><ul><li value=\"1\"><span>Reflex angle = 360 \u2013 (282.5 \u2013 150) = 227.5 degrees</span></li></ul>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60349,
      "question": "<p dir=\"ltr\"><span>A clock shows 08:00 AM. What time it will be showing, if hrs hand rotates for 540 degrees?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2:00 AM of next day</span></p>",
        "<p dir=\"ltr\"><span>4:00 PM</span></p>",
        "<p dir=\"ltr\"><span>4:35 PM</span></p>",
        "<p dir=\"ltr\"><span>01:00 AM of next day</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>When hrs hand rotates for 360 degree it covers 12 hrs  </span><br><span>After 360 degrees rotation clock will be showing 08:00 PM  Remaining = 540-360 = 180 degrees  </span><br><span>So in 180 degrees it will cover 6 hrs  </span><br><span>So the time will be: 08:00 PM + 6 hrs = 02:00 AM of next day</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60350,
      "question": "<p dir=\"ltr\"><span>A clock shows 06:00 AM. What time it will be showing, if hrs hand rotates for 360 degrees?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4:00 AM of next day</span></p>",
        "<p dir=\"ltr\"><span>06:00 PM</span></p>",
        "<p dir=\"ltr\"><span>04:00 PM</span></p>",
        "<p dir=\"ltr\"><span>10:00 PM</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>When hrs hand rotates for 360 degree it covers 12 hrs  </span><br><span>So the time will be: 06:00 AM + 12 hrs = 06:00 PM</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60351,
      "question": "<p dir=\"ltr\"><span>In a clock, the time is 3.25.What is the angle between the hour hand and the minute hand of the clock:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>95/2 degrees</span></p>",
        "<p dir=\"ltr\"><span>90/3 degrees</span></p>",
        "<p dir=\"ltr\"><span>94/3 degrees</span></p>",
        "<p dir=\"ltr\"><span>95/3 degrees</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>As, the hour hand covers 360 degrees in 12 hrs. </span><br><span>In the clock the time is 3.25 = 3 hrs 25 min = 41/12 hrs. </span><br><span>So, the angle traced by hour hand = (360/12 \u00d7 41/12) degrees = 205 degrees. </span><br><span>The minute hand covers 360 degrees in 60 minutes. </span><br><span>So, the angle is traced by minute hand in 25 min = (360/60 \u00d7 25) degrees = 150 degrees. </span><br><span>Hence, the required angle of the clock = (150- 205/2) degrees = 95/2 degrees.</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60352,
      "question": "<p dir=\"ltr\"><span>A clock shows 10:00. When time is 22:00, by what degree the hour hand rotates?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>180</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>175</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>240</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>360</span><sup><span>o</span></sup></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> When hrs hand covers 12 hrs it rotates for 360 degree as it's cover a complete circle</span><br></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60353,
      "question": "<p dir=\"ltr\"><span>A clock shows 10:00. When time is 18:00, by what degree the hour hand rotates?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>180</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>192</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>360</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>240</span><sup><span>o</span></sup></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>For 8 hrs duration hrs hand covered 8 hrs out of 12 hrs </span><br><span>When hrs hand covers 12 hrs it rotates for 360 degree</span><br><span>When hrs hand covers 8 hrs it rotates for 240 degree = 360/12) \u00d7 8 = 240 degrees</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60354,
      "question": "<p dir=\"ltr\"><span>A clock shows 08:00. When it is 14:00, by what degree the hour hand rotates?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>145</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>160</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>180</span><sup><span>o</span></sup></p>",
        "<p dir=\"ltr\"><span>175</span><sup><span>o</span></sup></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>For 6 hrs duration hrs hand covered 6 hrs out of 12 hrs</span><br><span>When hrs hand covers 12 hrs it rotates for 360 degree</span><br><span>When hrs hand covers 6 hrs it rotates for 180 degree = (360/12) \u00d7 6 = 180 degrees</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60355,
      "question": "<p dir=\"ltr\"><span>At the time of 15:40 in clock, what is the angle between hour hand and minute hand.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>120 degrees</span></p>",
        "<p dir=\"ltr\"><span>135 degrees</span></p>",
        "<p dir=\"ltr\"><span>140 degrees</span></p>",
        "<p dir=\"ltr\"><span>130 degrees</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The time is same as 03:40</span><br><span>The hour hand covers the angle 360 degrees in 12 hrs. </span><br><span>So, the angle is covered by it in 11/3 hrs = (360/2 x 11/3) degrees&nbsp;= 110 degrees&nbsp;. </span><br><span>The minute hand covers the angle in 360 degrees in 60 min. </span><br><span>So, the angle is covered by it in 40 min = (360/60 x 40) degrees&nbsp;= 240 degrees&nbsp;. </span><br><span>Hence, the required angle made by both hands = (240 - 110) degrees&nbsp;= 130 degrees&nbsp;.</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60356,
      "question": "<p dir=\"ltr\"><span>Find the original time of clock if:</span></p><ul><li value=\"1\"><span>The time of a clock is 08:00,</span></li><li value=\"2\"><span>The clock gains 600 seconds, in one day.</span></li><li value=\"3\"><span>The time of the clock is 1pm on the following day.</span></li></ul>",
      "options": [
        "<p dir=\"ltr\"><span>48 minutes past 12</span></p>",
        "<p dir=\"ltr\"><span>47 minutes past 10</span></p>",
        "<p dir=\"ltr\"><span>48 minutes past 11</span></p>",
        "<p dir=\"ltr\"><span>49 minutes past 11</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>From 8 am on a day to 1 pm on the following day will be 29 hrs. </span><br/><span>So, the clock gains 10 min in 24 hours = 24 hrs of the correct time. </span><br/><span>Hence, 145/6 hrs of the clock = 24 hrs of the correct clock. </span><br/><span>29 hrs of the clock = (24 x 6/145 x 24)hrs of the correct clock = 28 hrs 48 min of the correct clock. </span><br/><span>The correct time = 28 hrs 48 min after 8 am. </span><br/><span>Hence, the original time is 48 minutes past 12.</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60357,
      "question": "<p dir=\"ltr\"><span>On the birthday of Sam, Param gave him an alarm clock, now Sam sets alarm at 5 am, and &nbsp;Sam notices that:</span></p><ul><li value=\"1\"><span>The clock loses 960 seconds in last one day.</span></li><li value=\"2\"><span>&nbsp;Effectively, the clock indicates 10:00 pm on the 4th day.</span></li></ul><p dir=\"ltr\"><span>&nbsp;Find out the original time of the clock:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>9 pm</span></p>",
        "<p dir=\"ltr\"><span>10 pm</span></p>",
        "<p dir=\"ltr\"><span>11 pm</span></p>",
        "<p dir=\"ltr\"><span>08 pm</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>From the given information the time from 5 am on a day to 10 pm on the 4th day is 89 hrs. </span><br><span>So, 23 hrs 44 min of this clock = 24 hrs of correct clock. </span><br><span>Hence, 356/15 hrs of this clock = 24 hrs of correct clock. </span><br><span>89 hrs of the clock = (24 x 15/356 x 89)hrs of correct clock = 90 hrs of correct clock. </span><br><span>Hence, the original time will be 11 pm.</span></p>",
      "tag": "Clocks || MCQ"
    },
    {
      "id": 60358,
      "question": "<p dir=\"ltr\"><span>What is correct time and day of Ram's magical watch, which gains uniformly 300 seconds slow at time 08:00 on Sunday and 348 fast at 20;00 on following Sunday.&nbsp;</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>21 min past 7 pm and Wednesday</span></p>",
        "<p dir=\"ltr\"><span>20 min past 7 pm and Thursday</span></p>",
        "<p dir=\"ltr\"><span>21 min past 7 pm and Thursday</span></p>",
        "<p dir=\"ltr\"><span>20 min past 7 pm and Wednesday</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The given time from 8:00 am on Sunday to 8 pm on following Sunday = 7 days 12 hrs = 180 hrs. </span><br><span>So, the clock gains = (5 + 29/5)min = 54/5 min in 180 hrs. </span><br><span>Hence, 5 min are gained in (180 x 5/54 x 5)hrs = 83 hrs 20 min = 3 days 11 hrs 20 min. </span><br><span>The clock is correct 3 days 11 hrs 20 min after 8 am of Sunday. </span><br><span>So, the correct time and day will be 20 min past 7 pm on Wednesday.</span></p>",
      "tag": "Clocks || MCQ"
    }
  ],
  "Calendars": [
    {
      "id": 60359,
      "question": "<p dir=\"ltr\"><span>Today is Monday. After 68 days, it will be:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Saturday</span></p>",
        "<p dir=\"ltr\"><span>Sunday</span></p>",
        "<p dir=\"ltr\"><span>Tuesday</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After 70 days it will be Monday so after 68 days it will be Saturday</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60360,
      "question": "<p dir=\"ltr\"><span>If 10th October 2023 was Tuesday, what day will 10th October 2024 be?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Wednesday</span></p>",
        "<p dir=\"ltr\"><span>Thursday</span></p>",
        "<p dir=\"ltr\"><span>Friday</span></p>",
        "<p dir=\"ltr\"><span>Saturday</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>From a date in one year to the same date next year you normally move forward 1 day of the week (because 365 \u2261 1 mod 7).</span></p><p dir=\"ltr\"><span>If the period includes a leap day (29 Feb) you move forward 2 days.</span></p><p dir=\"ltr\"><span>The interval 10 Oct 2023 \u2192 10 Oct 2024 does include 29 Feb 2024 (2024 is a leap year), so add 2 days:</span><br><span>Tuesday + 2 days = Thursday.</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60361,
      "question": "<p dir=\"ltr\"><span>A month has 5 Sundays, 5 Mondays, and 5 Tuesdays. Which month can it be?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>February</span></p>",
        "<p dir=\"ltr\"><span>March</span></p>",
        "<p dir=\"ltr\"><span>April</span></p>",
        "<p dir=\"ltr\"><span>July</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A month will have 5 Sundays, 5 Mondays, and 5 Tuesdays only when:</span></p><p dir=\"ltr\"><span>The month has 31 days \u2192 (because 31 = 4 full weeks + 3 extra days)</span></p><p dir=\"ltr\"><span>Those 3 extra days must be Sunday, Monday, Tuesday \u2192</span><br/><span> which means the month must start on a Sunday.</span></p><p dir=\"ltr\"><span>February \u2192 not 31 days \u2192 no</span></p><p dir=\"ltr\"><span>March \u2192 31 days \u2192 can start on Sunday \u2192 possible</span></p><p dir=\"ltr\"><span>April \u2192 30 days \u2192 no</span></p><p dir=\"ltr\"><span>July \u2192 30 days \u2192 impossible</span></p><p dir=\"ltr\"><span>So only March fits.</span></p><p dir=\"ltr\"><span>So March and May both can have 5 Sundays, 5 Mondays, and 5 Tuesdays.</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60362,
      "question": "<p dir=\"ltr\"><span>The last day of a century cannot be:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Thursday</span></p>",
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Wednesday</span></p>",
        "<p dir=\"ltr\"><span>Sunday</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\" style=\"text-align: start;\"><span>100 years contains 5 odd days.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>The last day of the 1st&nbsp;century is Friday.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>200 years contain (5&nbsp;\u00d7&nbsp;2)&nbsp;\u2261&nbsp;3 odd days</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Last day of 2nd&nbsp;century is Wednesday.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>300 years contain (5&nbsp;\u00d7&nbsp;3) = 15&nbsp;\u2261&nbsp;1 odd day</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Last day of 3rd&nbsp;century is Monday.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>400 years contain 0 odd days.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Last day of 4th&nbsp;century is Sunday.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>This cycle is repeated.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Last day of a century cannot be Tuesday, Thursday or Saturday.</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60363,
      "question": "<p dir=\"ltr\"><span>What was the day on 23rd of April,1990 ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Tuesday</span></p>",
        "<p dir=\"ltr\"><span>Wednesday</span></p>",
        "<p dir=\"ltr\"><span>Friday</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Step 1: 23+90 = 113 </span><br/><span>Step2: 90/4 Quotient = 22 </span><br/><span>Step3: add quotient to (step 1) 113+22+6 (month code) + 0 (year code) </span><br/><span>Step4: Divide result of step 3 by 7 = 141/7 </span><br/><span>Step5: remainder of step 4 is the day code 1------- Monday</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60364,
      "question": "<p dir=\"ltr\"><span>What day of week was it on 1989/11/05, if it was Monday on 1988/04/04, given the dates are in format : yyyy/mm/dd ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Sunday</span></p>",
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Tuesday</span></p>",
        "<p dir=\"ltr\"><span>Wednesday</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>For Non-Leap year, When we proceed forward by one year, then 1 day is gained and vice-versa.</span><br><span>If 4th April, 1988 = Monday, then 4th April, 1989 = Tuesday (Because 1989 is a non-leap year)</span><br><span>Remaining days until 5th Nov.89</span><br><span>= Tuesday + 215</span><br><span>= Tuesday + 5 [ we get remainder 5 when 215 divided by 7 ]</span><br><span>= Sunday</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60365,
      "question": "<p dir=\"ltr\"><span>If 01/04/2013 is Monday, then what is the day on 30/11/2013?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Saturday</span></p>",
        "<p dir=\"ltr\"><span>Sunday</span></p>",
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Wednesday</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>we can compare it with 29/04/2013, as it also had monday on that day</span></p><p dir=\"ltr\"><span>find the remainder with number of days%7 </span><br><span>number of days in april =30-29 =1 </span><br><span>number of days in may =31 %7 =3 </span><br><span>number of days in june =30 %7 =2 </span><br><span>number of days in july =31 %7 =3 </span><br><span>number of days in august =31 %7 =3 </span><br><span>number of days in september =30 %7 =2 </span><br><span>number of days in october =31 %7 =3 </span><br><span>number of days in november =30 %7 =2 </span><br><span>total count=1+3+2+3+3+2+3+2 = 19 %7 =5 </span><br><span>Now we add 5 days in monday then it will be saturday.&nbsp;</span><br><span>&nbsp;</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60366,
      "question": "<p dir=\"ltr\"><span>If January 1, 2016 was a Friday, what day of the week will be on January 1, 2017?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Sunday</span></p>",
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Tuesday</span></p>",
        "<p dir=\"ltr\"><span>Wednesday</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The year 2016 is the leap year which has 366 days i.e. 52 weeks and 2 more days. </span><br><span>After each week, the day starts repetition. </span><br><span>So the day on January 1, 2017 will be 2 days beyond Friday. </span><br><span>That is Sunday.</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60367,
      "question": "<p dir=\"ltr\"><span>What was the day of the week on January 30, 1948?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Sunday</span></p>",
        "<p dir=\"ltr\"><span>Tuesday</span></p>",
        "<p dir=\"ltr\"><span>Thursday</span></p>",
        "<p dir=\"ltr\"><span>Friday</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The number of days left after dividing the period by 7 is known as odd days. </span><br><span>Every ordinary year has 365 days i.e. 52 weeks and 1 odd day and every leap year has 366 days i.e. 52 weeks and 2 odd days. </span><br><span>Every 4th year and every 4th century is the leap year.  </span><br><span>100 years have 76 ordinary years and 24 leap years i.e. 76 + 2 \u00d7 24 = 124 odd days. = 7 \u00d7 17 + 5 = 5 odd days. </span><br><span>200 years have = 10 odd days = 7 \u00d7 1 + 3 = 3 odd days. 300 years have = 15 odd days = 1 odd days. </span><br><span>Since every 400th year is the leap year, 400 years have = 20 + 1 = 21 odd days = 0 odd days. </span><br><span>1947 years = 1600 years + 300 years + 47 years = 0 odd days + 1 odd day + (11 \u00d7 2 + 36) odd days = 59 odd days = 3 odd days. </span><br><span>30 days have 2 odd days.  </span><br><span>The total number of odd days up to 30th January 1948 = 5 odd days. </span><br><span>Hence, it was a Friday.</span></p>",
      "tag": "Calendars || MCQ"
    },
    {
      "id": 60368,
      "question": "<p dir=\"ltr\"><span>What was the day of the week on January 1, 2001?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Sunday</span></p>",
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Tuesday</span></p>",
        "<p dir=\"ltr\"><span>Wednesday</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The number of days left after dividing the period by 7 is known as odd days. </span><br><span>Every ordinary year has 365 days i.e. 52 weeks and 1 odd day and every leap year has 366 days i.e. 52 weeks and 2 odd days. </span><br><span>Every 4th year and every 4th century is the leap year. </span><br><span>100 years have 76 ordinary years and 24 leap years i.e. 76 + 2*24 = 124 odd days. = 7 \u00d7 17 + 5 = 5 odd days. </span><br><span>200 years have = 10 odd days = 7 \u00d7 1 + 3 = 3 odd days. </span><br><span>300 years have = 15 odd days = 1 odd days. </span><br><span>Since every 400th year is the leap year, </span><br><span>400 years have = 20 + 1 = 21 odd days = 0 odd days. </span><br><span>There are 0 odd days in 2000 years. </span><br><span>Hence, there is 1 odd day up to the date January 1, 2001. </span><br><span>Hence, it was a Monday. </span></p>",
      "tag": "Calendars || MCQ"
    }
  ],
  "Simplification and Approximation": [
    {
      "id": 60369,
      "question": "<p><span>(1015)</span><sup><span>2</span></sup><span> =  ?  </span></p>",
      "options": [
        "<p><span>1040125 </span></p>",
        "<p><span>1030225</span></p>",
        "<p><span>1050125</span></p>",
        "<p><span>1025125</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><p dir=\"ltr\"><span>1015</span><sup><span>2</span></sup><span> = (1000+15)</span><sup><span>2</span></sup><br><span>1015</span><sup><span>2</span></sup><span> = 1000</span><sup><span>2</span></sup><span> + 15</span><sup><span>2</span></sup><span> +2 x 1000 x 15</span><br><span>1015</span><sup><span>2</span></sup><span> =1000000 + 225 + 30000</span><br><span>1015</span><sup><span>2</span></sup><span> =1030225</span></p></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60370,
      "question": "<p dir=\"ltr\"><span>9848 x 125 = ?</span></p>",
      "options": [
        "<p><span>1232000</span></p>",
        "<p><span>1242000</span></p>",
        "<p><span>1231000</span></p>",
        "<p><span>1233000</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>9848 x 125 = 9848 x (250 / 2)</span><br><span>9848 x 125 = 4924 x (500 / 2)</span><br><span>9848 x 125 = 2462 x (1000 / 2)</span><br><span>9848 x 125 = 1231 x (1000)</span><br><span>9848 x 125 = 1231000</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60371,
      "question": "<p dir=\"ltr\"><span>103 x 103 + 97 x 97 = ?</span></p>",
      "options": [
        "<p><span>21348</span></p>",
        "<p><span>20018</span></p>",
        "<p><span>19648</span></p>",
        "<p><span>21428</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>103 x 103 + 97 x 97</span><br><span>= (100+3)</span><sup><span>2</span></sup><span> + (100-3)</span><sup><span>2</span></sup><br><span>= 2 (100</span><sup><span>2</span></sup><span> + 3</span><sup><span>2</span></sup><span> )  </span><br><span>[ (X +Y)</span><sup><span>2</span></sup><span> + ( X \u2013 Y)</span><sup><span>2</span></sup><span> = 2 ( X</span><sup><span>2</span></sup><span> + Y</span><sup><span>2</span></sup><span> ) ]</span><br><span>= 2 (10000 + 9 )</span><br><span>= 2 x 10009</span><br><span>= 20018</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60372,
      "question": "<p dir=\"ltr\"><span>What should be the value of x in equation (x / \u221a216) = (\u221a96 / x)</span></p>",
      "options": [
        "<p><span>12</span></p>",
        "<p><span>13</span></p>",
        "<p><span>9</span></p>",
        "<p><span>11</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Let (x / \u221a216) = (\u221a96 / x)</span><br><br><span>Then x</span><sup><span>2</span></sup><span> = \u221a(216 x 96)</span><br><span>x</span><sup><span>2</span></sup><span> = \u221a(36 x 2 x 3 x 16 x 2 x 3)</span><br><span>x</span><sup><span>2</span></sup><span> = \u221a(6</span><sup><span>2</span></sup><span> x 4</span><sup><span>2</span></sup><span> x 2</span><sup><span>2</span></sup><span> x 3</span><sup><span>2</span></sup><span>)</span><br><span>x</span><sup><span>2</span></sup><span> = 6 x 4 x 2 x 3</span><br><span>x</span><sup><span>2</span></sup><span> = 144</span><br><span>Or x = 12</span><br></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60373,
      "question": "<p dir=\"ltr\"><span>512 x 512 + 488 x 488 = ?</span></p>",
      "options": [
        "<p><span>512438</span></p>",
        "<p><span>502568</span></p>",
        "<p><span>500288</span></p>",
        "<p><span>514318</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>512 x 512 + 488 x 488 = (512 + 12)</span><sup><span>2 </span></sup><span>+ (500 - 12)</span><sup><span>2</span></sup><br><span>Let X=500 &amp; Y=12</span><br><span>Now, (X + Y)</span><sup><span>2</span></sup><span> + (X \u2013 Y)</span><sup><span>2</span></sup><span> = 2 ( X</span><sup><span>2</span></sup><span> + Y</span><sup><span>2 </span></sup><span>)</span><br><span>512 x 512 + 488 x 488 = 2 ( 500</span><sup><span>2 </span></sup><span>+ 12</span><sup><span>2</span></sup><span> )</span><br><span>512 x 512 + 488 x 488\t= 2 ( 250000 + 144 )</span><br><span>512 x 512 + 488 x 488\t= 2 * 250144</span><br><span>512 x 512 + 488 x 488\t= 500288</span><br></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60374,
      "question": "<p><span>7 + 7</span><sup><span>2</span></sup><span> + 7</span><sup><span>3</span></sup><span>...........7</span><sup><span>6</span></sup><span> =?     </span></p>",
      "options": [
        "<p><span>140136</span></p>",
        "<p><span>142156</span></p>",
        "<p><span>133256</span></p>",
        "<p><span>137256</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Given series is a G. P. with a = 7, r = 7 and n = 6</span><br><br><span>\u2234 Sn = a(r</span><sup><span>n</span></sup><span>-1) / (r-1)</span><br><br><span>\u2234 Sn = 7(7</span><sup><span>6</span></sup><span>-1) / 6</span><br><br><span>  Sn = = 137256</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60375,
      "question": "<p dir=\"ltr\"><span>What is the unit's digit in the product (267)</span><sup><span>153  </span></sup><span>x (66666)</span><sup><span>72</span></sup><span> ?</span></p>",
      "options": [
        "<p><span>7</span></p>",
        "<p><span>6</span></p>",
        "<p><span>1</span></p>",
        "<p><span>2</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We have to find the unit digit only. </span></p><p dir=\"ltr\"><span>In 267 unit digit is 7 and cyclicity of 7 is 4.</span><br><span>So, (267)</span><sup><span>153</span></sup><span> can be written as (267)</span><sup><span>Rem(153)/4</span></sup><span> = (267)</span><sup><span>1</span></sup><span> </span><br><span>Unit digit of (267)</span><sup><span>1</span></sup><span> = 7.</span><br><span>similarly for 66666 unit digit is 6 and cyclicity for 6 is 1.</span><br><span>Unit digit for (66666)</span><sup><span>72</span></sup><span> = 6.</span></p><p dir=\"ltr\"><span>Resultant is 7 \u00d7 6 = 42</span><br><br><span>Therefore , Unit digit is 2.</span><br></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60376,
      "question": "<p dir=\"ltr\"><span>What could be the maximum value of Y in the following equation given that neither of X, Y, Z is zero? 5X8 + 3Y4 + 2Z1 = 1103</span></p>",
      "options": [
        "<p><span>0</span></p>",
        "<p><span>7</span></p>",
        "<p><span>8</span></p>",
        "<p><span>9</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<pre><span>  1 1    &lt;- CARRY</span><br><br><span>  5 X 8</span><br><span>+ 3 Y 4</span><br><span>+ 2 Z 1</span><br><span>--------</span><br><span> 11 0 3</span><br><span>--------</span><br></pre><p dir=\"ltr\"><span> Clearly, X + Y + Z + 1 = 10 </span><br><span>X + Y + Z = 9 </span><br><span>Now, since neither of X, Y, Z can be zero, </span><br><span>the value of Y will be maximum when X = Z = 1.  </span><br><span>Max Y = 7 </span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60377,
      "question": "<p><span>25 / 5 \u00d7 5 = ?</span></p>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>25</span></p>",
        "<p><span>5</span></p>",
        "<p><span>125</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p><span>25 / 5 \u00d7 5 = 5 \u00d7 5 = 25</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60378,
      "question": "<p dir=\"ltr\"><span>If p - q = 6 and p</span><sup><span>2</span></sup><span>&nbsp;+ q</span><sup><span>2</span></sup><span>&nbsp;= 116, what is the value of pq?</span></p>",
      "options": [
        "<p><span>20</span></p>",
        "<p><span>60</span></p>",
        "<p><span>40</span></p>",
        "<p><span>10</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>(p - q)</span><sup><span>2</span></sup><span> = p</span><sup><span>2</span></sup><span> + q</span><sup><span>2 </span></sup><span>-2pq</span><br><span>given, p - q = 6 and p</span><sup><span>2</span></sup><span>&nbsp;+ q</span><sup><span>2</span></sup><span>&nbsp;= 116</span><br><span>(6)</span><sup><span>2</span></sup><span> = 116 - 2pq</span><br><span>2pq = 116 - 36  </span><br><span>pq = 40</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60379,
      "question": "<p><span>[(723 + 1992)</span><sup><span>2 </span></sup><span>\u2212 (723 \u2212 1992)</span><sup><span>2</span></sup><span>]/(723 \u00d7 1992)&nbsp;= ?</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>723</span></p>",
        "<p><span>1992</span></p>",
        "<p><span>2715</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>[(a + b)</span><sup><span>2 </span></sup><span>\u2212 (a \u2212 b)</span><sup><span>2</span></sup><span>] = 4ab</span><br><span>so, [(723 + 1992)</span><sup><span>2 </span></sup><span>\u2212 (723 \u2212 1992)</span><sup><span>2</span></sup><span>] = 4 \u00d7 723 \u00d7 1992</span><br><span>4 \u00d7 723 \u00d7 1992/(723 \u00d7 1992) = 4</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60380,
      "question": "<p><span>8 / 4 / 2 = ?</span></p>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>4</span></p>",
        "<p><span>8</span></p>",
        "<p><span>2</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>(8/4)/2 = 2/2 =1 ( To solve 8/4/2, we follow the order of operations, moving from left to right since there are only division operations here ) </span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60381,
      "question": "<p dir=\"ltr\"><span>Solve : \u221a7321 x 35.999.</span></p>",
      "options": [
        "<p><span>3060</span></p>",
        "<p><span>3204</span></p>",
        "<p><span>3410</span></p>",
        "<p><span>2930</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>85 \u00d7 9 \u00d7 100/25 = 765 \u00d7 4 = 3060 (Because \u221a7321 = 85 approx and 35.999 = 900/25 approx)</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60382,
      "question": "<p><span>5 +&nbsp;5 / 5 = ?</span></p>",
      "options": [
        "<p><span>6</span></p>",
        "<p><span>2</span></p>",
        "<p><span>1</span></p>",
        "<p><span>10</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p><span>5 +&nbsp;5 / 5 = 5 + 1 = 6</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60383,
      "question": "<p dir=\"ltr\"><span>b - [b -(a+b) - {b - (b - a+b)} + 2a] = ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>2a</span></p>",
        "<p dir=\"ltr\"><span>a+b</span></p>",
        "<p dir=\"ltr\"><span>b-2a</span></p>",
        "<p><span>0</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>By using BODMAS rule  </span><br><span>we get , </span><br><span>b - [b -(a+b) - {b - (2b - a)} + 2a]  </span><br><span>b-[b-a-b-{-b+a}+2a]  </span><br><span>b-[b-a-b-a+b+2a]  </span><br><span>b-b=0</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60384,
      "question": "<p dir=\"ltr\"><span>If a \u00d7 b = 2a - 4b + 2ab, then 3 \u00d7 4 + 4 \u00d7 3 = ?</span></p>",
      "options": [
        "<p><span>26</span></p>",
        "<p><span>34</span></p>",
        "<p><span>24</span></p>",
        "<p><span>28</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>If a \u00d7 b = 2a - 4b + 2ab</span><br><span>then, 3 \u00d7 4 = 6 - 16 + 24 = 14  </span><br><span>4 \u00d7 3 = 8 - 12 + 24 = 20</span><br><span>so, 3 \u00d7 4 + 4 \u00d7 3 = 14 + 20 = 34</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60385,
      "question": "<figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241108133449114257/Question-8.webp\" alt=\"Question-8\" width=\"650\" height=\"250\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241108133449114257/Question-8.webp 650w,https://media.geeksforgeeks.org/wp-content/uploads/20241108133449114257/Question-8-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241108133449114257/Question-8-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241108133449114257/Question-8-300.webp 300w\"><figcaption> </figcaption></figure>",
      "options": [
        "<p><span>141/12</span></p>",
        "<p><span>131/12</span></p>",
        "<p><span>121/12</span></p>",
        "<p><span>111/12</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<img src=\"http://www.geeksforgeeks.org/wp-content/uploads/gq/2016/05/2_sol.png\" alt=\"2_sol\" width=\"168\" height=\"277\" loading=\"auto\">",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60386,
      "question": "<figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241108133031085736/Question-7.webp\" alt=\"Question-7\" width=\"600\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241108133031085736/Question-7.webp 600w,https://media.geeksforgeeks.org/wp-content/uploads/20241108133031085736/Question-7-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241108133031085736/Question-7-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241108133031085736/Question-7-300.webp 300w\" loading=\"auto\"><figcaption> </figcaption></figure>",
      "options": [
        "<p><span>84/305</span></p>",
        "<p><span>62/205</span></p>",
        "<p><span>84/254</span></p>",
        "<p><span>72/305</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<img src=\"http://www.geeksforgeeks.org/wp-content/uploads/gq/2016/05/1_sol-300x56.png\" alt=\"1_sol\" width=\"300\" height=\"56\" loading=\"auto\">",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60387,
      "question": "<p><span>(14.2)\u00b2+ (16.4)\u00b2 \u2212 (17.9)\u00b2 = ? + 32.99</span></p>",
      "options": [
        "<p><span>100</span></p>",
        "<p><span>125</span></p>",
        "<p><span>130</span></p>",
        "<p><span>117</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>(14.2)\u00b2 = 201.6 (approx.)</span><br><span>(16.4)\u00b2 = 269 (approx.) </span><br><span>(17.9)\u00b2 = 320.4 (approx.)</span><br><span>so, (14.2)\u00b2+ (16.4)\u00b2 \u2212 (17.9)\u00b2 = x + 32.99 = 201.6 +269 \u2013 320.4 = x + 33 (by approximation) </span><br><span>470.6 - 353.4 = x  </span><br><span>x = 117.2 (approx.)</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60388,
      "question": "<p dir=\"ltr\"><span>(38/85) x (255/114) \u00f7 (19/5) + (14/19) = ?</span></p>",
      "options": [
        "<p><span>2.3</span></p>",
        "<p><span>1</span></p>",
        "<p><span>4.7</span></p>",
        "<p><span>3.8</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>(38/85) = 0.45 (by approximation)</span><br><span>(255/114) = (2.23) (by approximation)</span><br><span>(19/5) = (3.8) (by approximation)</span><br><span>(14/19) = (0.73) (by approximation)</span><br><span>So, (38/85) x (255/114) \u00f7 (19/5) + (14/19) = 0.45 \u00d7 (2.23)/(3.8) + (0.73) = 1/(3.8) + (0.73) = (0.26)+(0.73) = (0.99) </span><br><span>Approx. 1 so, option B is the correct answer</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60389,
      "question": "<p><span>(5\u221a7 + 2\u221a7) (6\u221a7 + 3\u221a7)= ?</span></p>",
      "options": [
        "<p><span>521</span></p>",
        "<p><span>381</span></p>",
        "<p><span>441</span></p>",
        "<p><span>481</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p><span>(5\u221a7 + 2\u221a7) (6\u221a7 + 3\u221a7) = (7\u221a7) (9\u221a7) = 7 \u00d7 7 \u00d7 9 = 441</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60390,
      "question": "<p dir=\"ltr\"><span>25.675% of 1321 + 64.328% of 4001=?</span></p>",
      "options": [
        "<p><span>3121</span></p>",
        "<p><span>3038</span></p>",
        "<p><span>2912</span></p>",
        "<p><span>2821</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>25.675% of 1321 = [1321/(3.9)] (by approximation)</span><br><span>64.328% of 4001 = 0.643 \u00d7 4001 (by approximation)</span><br><span>[1321/(3.9)] + 0.643 \u00d7 4001  = 338.7 + 2572.6 = 2911.3</span><br><span>Approx. to 2912  so, option C is the correct answer</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    },
    {
      "id": 60391,
      "question": "<p><span>5432.91 \u00f7 2324.65 \u00d7 210.05 =?</span></p>",
      "options": [
        "<p><span>471</span></p>",
        "<p><span>431</span></p>",
        "<p><span>491</span></p>",
        "<p><span>501</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>5432.91 \u00f7 2324.65 \u00d7 210.05</span><br><span>Approx:  2.337 \u00d7 210 = 490.77 = 491 (approx)</span></p>",
      "tag": "Simplification and Approximation || MCQ"
    }
  ],
  "Data Interpretation": [
    {
      "id": 60392,
      "question": "<p dir=\"ltr\"><span>Study the following table chart and answer the questions based on it. Expenditures of a Company (in Lakh Rupees) per Annum Over the given Years. </span></p><p dir=\"ltr\"><br></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/quizz1.png\" width=\"inherit\" height=\"inherit\" loading=\"auto\"><figcaption> </figcaption></figure><p dir=\"ltr\"><br></p><p dir=\"ltr\"><b><strong>Based on the table answer following 1-5 questions:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span> What is the average amount of interest per year which the company had to pay during this period ? </span></p>",
      "options": [
        "<p><span>35.65</span></p>",
        "<p><span>38.76</span></p>",
        "<p><span>30.23</span></p>",
        "<p><span>40.00</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p><br><span>24.8+36.2+43.9+38.6+50.3/5=38.76</span></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60393,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 1 and answer the following:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span> The total amount of bonus paid by the company during the given period is approximately what percent of the total amount of salary paid during this period ?  </span></p>",
      "options": [
        "<p><span>3.46%</span></p>",
        "<p><span>2.65%</span></p>",
        "<p><span>0.98%</span></p>",
        "<p><span>1.56%</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Total bonus= 3.20+2.68+3.72+3.36+4= 16.96</span></p><p dir=\"ltr\"><span>Total salary=1727</span></p><p dir=\"ltr\"><span>1727 x /100=16.96</span></p><p dir=\"ltr\"><span>x = 0.98%</span></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60394,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 1 and answer the following:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span> Total expenditure on all these items in 1998 was approximately what percent of the total expenditure in 2002 ?  </span></p>",
      "options": [
        "<p><span>60%</span></p>",
        "<p><span>80%</span></p>",
        "<p><span>65%</span></p>",
        "<p><span>69.5%</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>1998, total expenditure =470</span><br><span>2002, total expenditure =662</span></p><p dir=\"ltr\"><span>662 * x/100=470</span></p><p dir=\"ltr\"><span>x=69.5% approx.</span></p><p dir=\"ltr\"><br></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60395,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 1 and answer the following:</strong></b></p><p dir=\"ltr\"><br/></p><p dir=\"ltr\"><span>  Calculate the total expenditure of the company over these items during the year 2000 from the table chart given. </span></p>",
      "options": [
        "<p><span>504.72</span></p>",
        "<p><span>548.62</span></p>",
        "<p><span>550.53</span></p>",
        "<p><span>574.32</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><br/><span>Total expenditure =  325 + 104 + 3.72 + 43.9 + 72 = 548.62</span></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60396,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 1 and answer the following:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span> The ratio between the total expenditure on Taxes for all the years and the total expenditure on Fuel and Transport for all the years respectively is approximately?  </span></p>",
      "options": [
        "<p><span>480/689</span></p>",
        "<p><span>439/605</span></p>",
        "<p><span>439/689</span></p>",
        "<p><span>425/605</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>total tax=439</span></p><p dir=\"ltr\"><span>total fuel and transport=605</span></p><p dir=\"ltr\"><span>ratio=&gt; 439:605</span></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60397,
      "question": "<p dir=\"ltr\"><b><strong>Study the following table carefully and answer the questions given below it:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span> Number of Different categories of vehicles sold in the country over the years (in thousands)  </span></p><img src=\"https://cdncontribute.geeksforgeeks.org/wp-content/uploads/quizzzz2-0.png\" alt=\"2_q\" width=\"300\" height=\"205\" loading=\"auto\"><p dir=\"ltr\"><br></p><p dir=\"ltr\"><b><strong>Answer question 6-10 based on data from above table</strong></b></p><p dir=\"ltr\"><span> In which of the following years was the number of light commercial vehicles sold approximately 25% of the number of 2-wheelers sold?</span></p>",
      "options": [
        "<p><span>1994</span></p>",
        "<p><span>1998</span></p>",
        "<p><span>1996</span></p>",
        "<p><span>1997</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Calculate 25% of 2-wheeler sales for each year.</span><br><br><b><strong>1994:</strong></b><span>&nbsp;25% of 349 = 0.25 * 349 = 87.25</span><br><br><b><strong>1995:</strong></b><span>&nbsp;25% of 323 = 0.25 * 323 = 80.75</span><br><br><b><strong>1996:</strong></b><span>&nbsp;25% of 402 = 0.25 * 402 = 100.5</span><br><br><b><strong>1997:</strong></b><span>&nbsp;25% of 418 = 0.25 * 418 = 104.5</span><br><br><b><strong>1998:</strong></b><span>&nbsp;25% of 449 = 0.25 * 449 = 112.25</span><br><br><span>Compare the calculated values with the Light Commercial Vehicles sold in each respective year.</span><br><br><b><strong>1994:</strong></b><br><br><span>Light Commercial Vehicles sold = 32. Calculated 25% of 2-wheelers = 87.25.&nbsp;(Not close)</span><br><br><b><strong>1995:</strong></b><br><br><span>Light Commercial Vehicles sold = 66. Calculated 25% of 2-wheelers = 80.75.&nbsp;(Not close)</span><br><br><b><strong>1996:</strong></b><br><br><span>Light Commercial Vehicles sold = 75. Calculated 25% of 2-wheelers = 100.5.&nbsp;(Not close)</span><br><br><b><strong>1997:</strong></b><br><br><span>Light Commercial Vehicles sold = 94. Calculated 25% of 2-wheelers = 104.5.&nbsp;(Approximately 25%)</span><br><br><b><strong>1998:</strong></b><br><br><span>Light Commercial Vehicles sold = 119. Calculated 25% of 2-wheelers = 112.25.&nbsp;(Approximately 25%)</span><br><br><span>Identify the year(s) where the approximation holds true.</span><br><br><span>Both 1997 (94 is close to 104.5) and 1998 (119 is close to 112.25) show approximate values.&nbsp;However, 1998 offers a closer approximation (119 vs 112.25) compared to 1997 (94 vs 104.5).&nbsp;The question asks for the year, implying a single best fit.&nbsp;Given the options usually provided in such questions (which are not available here), 1998 provides a slightly better approximation where the Light Commercial Vehicles are 119 and 25% of 2-wheelers is 112.25.</span><br><br><span>Answer: The number of light commercial vehicles sold was approximately 25% of the number of 2-wheelers sold in 1998.</span></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60398,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 6 and answer the following:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span>  If the same percentage increase in the number of Heavy Vehicle as in 1998 over 1997 is expected in 1999, approximately how many heavy vehicles will be sold in 1999?</span></p>",
      "options": [
        "<p><span>138</span></p>",
        "<p><span>128</span></p>",
        "<p><span>123</span></p>",
        "<p><span>166</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Step 1: Identify values for 1997 and 1998 </span><br><span>From the table: </span></p><ul><li value=\"1\"><span>1997: 86 Heavy Vehicles  </span></li><li value=\"2\"><span>1998: 103 Heavy Vehicles </span></li></ul><p dir=\"ltr\"><br><span>Step 2: Calculate the percentage increase from 1997 to 1998 </span><br><span>Percentage&nbsp;Increase = ( 103 \u2212 86 86 ) \u00d7 100 = ( 17 /86 ) \u00d7 100 \u2248 19.77 % </span><br><br><span>Step 3: Apply the same percentage increase to 1998's value </span><br><span>1999&nbsp;Estimate = 103 \u00d7 ( 1 + 19.77 100 ) = 103 \u00d7 1.1977 \u2248 123.77 </span><br><br><span>Approximately 123 Heavy Vehicles </span></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60399,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 6 and answer the following:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span> The number of heavy vehicles sold in 1997 was approximate what percentage of the total number sold in 1996.</span></p>",
      "options": [
        "<p><span>12%</span></p>",
        "<p><span>7.63%</span></p>",
        "<p><span>8.5%</span></p>",
        "<p><span>9%</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> The number of heavy vehicles sold in 1997= 86</span></p><p dir=\"ltr\"><span>the total number of vehicle sold in 1996 = 1011</span></p><p dir=\"ltr\"><span>x=8600/1011=8.5%</span></p><p dir=\"ltr\"><br></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60400,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 6 and answer the following:</strong></b></p><p dir=\"ltr\"><br></p><p dir=\"ltr\"><span> In which year was the number of two-wheelers sold as a percentage of the total number of vehicle sold during that year the highest.</span></p>",
      "options": [
        "<p><span>1997</span></p>",
        "<p><span>1996</span></p>",
        "<p><span>1995</span></p>",
        "<p><span>1994</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p><span>1994:</span></p><p dir=\"ltr\"><span>Two-Wheelers = 349 </span><br><span>Total Vehicles = 21 + 32 + 202 + 146 + 349 = 750 </span><br><span>349/ 750 \u00d7 100 \u2248 46.53 % </span></p><p><span>1995: </span></p><p dir=\"ltr\"><span>Two-Wheelers = 323 </span><br><span>Total = 43 + 66 + 236 + 178 + 323 = 846 </span><br><span>323/ 846 \u00d7 100 \u2248 38.19 % </span></p><p><span>1996: </span></p><p dir=\"ltr\"><span>Two-Wheelers = 402 </span><br><span>Total = 74 + 75 + 243 + 217 + 402 = 1011 </span><br><span>402/ 1011 \u00d7 100 \u2248 39.75 %</span><br></p><p><span>1997: </span></p><p dir=\"ltr\"><span>Two-Wheelers = 418 </span><br><span>Total = 86 + 94 + 289 + 256 + 418 = 1143 </span><br><span>418/ 1143 \u00d7 100 \u2248 36.57 % </span></p><p><span>1998: </span></p><p dir=\"ltr\"><span>Two-Wheelers = 449</span><br><span>Total = 103 + 119 + 261 + 235 + 449 = 1167 </span><br><span>449/ 1167 \u00d7 100 \u2248 38.47 % </span></p><p dir=\"ltr\"><span>Final Answer: 1994 had the highest percentage of two-wheelers sold: approximately 46.53%.</span></p>",
      "tag": "Data Interpretation || MCQ"
    },
    {
      "id": 60401,
      "question": "<p dir=\"ltr\"><b><strong>Refer Table from Question number 6 and answer the following: </strong></b></p><p dir=\"ltr\"><br/></p><p dir=\"ltr\"><span> The percentage increase in the sale in 1996 over the previous year was maximum for which of the following category of vehicle.    </span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Cars</span></p>",
        "<p dir=\"ltr\"><span>2 - Wheelers</span></p>",
        "<p dir=\"ltr\"><span>Light commercial vehicles</span></p>",
        "<p dir=\"ltr\"><span>Jeeps</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>1. Light Commercial Vehicles </span></p><p><span>1995: 66 </span><br/><span>1996: 75 </span></p><p><span>75 \u2212 66/66 \u00d7 100 = 9 /66 \u00d7 100 \u2248 13.64 % </span></p><p dir=\"ltr\"><span>2. Cars </span></p><p><span>1995: 236 </span><br/><span>1996: 243 </span></p><p><span>243 \u2212 236/ 236 \u00d7 100 = 7/236 \u00d7 100 \u2248 2.97 % </span></p><p dir=\"ltr\"><span>3. Jeeps </span></p><p><span>1995: 178 </span><br/><span>1996: 217 </span></p><p><span>217 \u2212 178/ 178 \u00d7 100 = 39/ 178 \u00d7 100 \u2248 21.91 % </span></p><p dir=\"ltr\"><span>4. Two-Wheelers </span></p><p><span>1995: 323 </span><br/><span>1996: 402 </span></p><p><span>402 \u2212 323/ 323 \u00d7 100 = 79/ 323 \u00d7 100 \u2248 24.46 % </span></p><p dir=\"ltr\"><span>The maximum percentage increase in 1996 over 1995 was for 2 - Wheelers.</span></p>",
      "tag": "Data Interpretation || MCQ"
    }
  ],
  "Number Series": [
    {
      "id": 60402,
      "question": "<p dir=\"ltr\"><span>What is the missing number in the following sequence? 2, 12, 60, 240, 720, 1440, .... 0 </span></p>",
      "options": [
        "<p><span>2880</span></p>",
        "<p><span>1440</span></p>",
        "<p><span>720</span></p>",
        "<p><span>0</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The series starts with 2.  We multiply first term with 6 to get second term 12  Then we multiply second term with 5 to get third term 60  Then we multiply third term with 4 to get fourth term 240  Then we multiply fourth term with 3 to get fifth term 720  Then we multiply fifth term with 2 to get fifth term 1440.  Then we need to multiply with 1 and we get 1440 again.  </span></p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60403,
      "question": "<p>What will be the next number? 3, 5, 7, 11, 13, 17\u2026\u2026.</p>",
      "options": [
        "<p>21</p>",
        "<p>19</p>",
        "<p>25</p>",
        "<p>20</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>This is a sequence of prime numbers.</p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60404,
      "question": "<p>Find wrong number in series:<br>8, 24, 12, 36, 18, 54, 28</p>",
      "options": [
        "<p>12</p>",
        "<p>24</p>",
        "<p>18</p>",
        "<p>28</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>mixture of two alternate series:<br>8*3=24<br>24/2=12<br>12*3=36<br>36/2=18<br>18*3=54<br>54/2=27</p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60405,
      "question": "<p dir=\"ltr\"><span>The Fibonacci sequence is the sequence of integers</span></p>",
      "options": [
        "<p><span>1, 3, 5, 7, 9, 11, 13</span></p>",
        "<p><span>0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55</span></p>",
        "<p><span>0, 1, 3, 4, 7, 11, 18, 29, 47</span></p>",
        "<p><span>0, 1, 3, 7, 15</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In mathematical terms, the sequence F</span></p><p dir=\"ltr\"><sub><span>n</span></sub></p><p dir=\"ltr\"><span> of Fibonacci numbers is defined by the recurrence relation  </span></p><pre><span>    F</span><sub><span>n</span></sub><span> = F</span><sub><span>n-1</span></sub><span> + F</span><sub><span>n-2</span></sub></pre><p dir=\"ltr\"><span> with seed values </span></p><pre><span>   F</span><sub><span>0</span></sub><span> = 0 and F</span><sub><span>1</span></sub><span> = 1.</span></pre><p dir=\"ltr\"><span>The Fibonacci numbers are the numbers in the following integer sequence. 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144..  Option (B) is correct. </span></p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60406,
      "question": "<p>Find wrong number in series:<br>15, 25, 30, 46, 85, 90, 115</p>",
      "options": [
        "<p>30</p>",
        "<p>46</p>",
        "<p>85</p>",
        "<p>115</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>All except 46 are multiple of 5</p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60407,
      "question": "<p>Find wrong number in series:<br>\r\n8, 12, 16, 27, 40.5, 60.75</p>",
      "options": [
        "12",
        "16",
        "40.5",
        "60.75"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>(8\u00d73)\u00f7 2 = 12<br>\r\n(12\u00d73)\u00f7 2 = 18<br>\r\n(18\u00d73)\u00f7 2 = 27<br>\r\n(27\u00d73)\u00f7 2 = 40.5<br>\r\n(40.5\u00d73)\u00f7 2 = 60.75</p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60408,
      "question": "<p>Find wrong number in series:<br>\r\n\r\n2, 8, 12, 20, 30, 42, 56, 72</p>",
      "options": [
        "8",
        "20",
        "42",
        "72"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "2+4=6, 6+6=12, 12+8=20, 20+10=30, 30+12=42, 42+14=56, 56+16=72",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60409,
      "question": "<p>Find wrong number in series:<br>\r\n1, -6, 18, -54, 162,\u00a0-486</p>",
      "options": [
        "1",
        "-6",
        "162",
        "-486"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>2*(-3)=-6<br>\r\n\r\n-6*(-3)=18<br>\r\n\r\n18*(-3)=-54<br>\r\n\r\n-54*(-3)=162<br>\r\n\r\n162*(-3)=-486</p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60410,
      "question": "<p>Find wrong number in series:<br>\r\n7, 26, 63, 124, 215, 342,496</p>",
      "options": [
        "7",
        "63",
        "215",
        "496"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>(2<sup>3</sup>\u00a0- 1), (3<sup>3</sup>\u00a0- 1), (4<sup>3</sup>\u00a0- 1), (5<sup>3</sup>\u00a0- 1), (6<sup>3</sup>\u00a0- 1), (7<sup>3</sup>\u00a0- 1), (8<sup>3</sup>\u00a0- 1) = 511</p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60411,
      "question": "<p dir=\"ltr\"><span>Find wrong number in series:</span><br/><span>12, 25, 49, 99, 187, 395, 789</span></p>",
      "options": [
        "<p><span>789</span></p>",
        "<p><span>187</span></p>",
        "<p><span>99</span></p>",
        "<p><span>49</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p><span>12 * 2 + 1 = 25</span><br/><span>25 * 2 - 1 = 49</span><br/><span>49 * 2 + 1 = 99</span></p><p dir=\"ltr\"><span>99 * 2 - 1 = 197 ( Not 187)</span></p><p><span>197 * 2 + 1 = 395</span><br/><span>395 * 2 - 1 = 789</span></p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60412,
      "question": "<p>Find wrong number in series:<br>\r\n\r\n23, 29, 31, 33, 41, 43, 47</p>",
      "options": [
        "29",
        "33",
        "41",
        "47"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "prime numbers from 23",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60413,
      "question": "<p>Find wrong number in series:<br>4, 5, 7, 12, 19, 35</p>",
      "options": [
        "<p>12</p>",
        "<p>19</p>",
        "<p>35</p>",
        "<p>7</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>4+2<sup>0</sup>=5<br>5+2<sup>1</sup>=7<br>7+2<sup>2</sup>=11<br>11+2<sup>3</sup>=19<br>19+2<sup>4</sup>=35</p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60414,
      "question": "<p dir=\"ltr\"><span>Find wrong number in series</span><br/><span>1, 8, 27, 64, 81, 216, 343</span></p>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>27</span></p>",
        "<p><span>81</span></p>",
        "<p><span>343</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The series follows cubes of natural numbers  (\ud835\udc5b</span><sup><span>3</span></sup><span>). </span></p><p><span>125 = 5*3. </span></p><p dir=\"ltr\"><span>The correct sequence should be: </span></p><p><span>1, 8, 27, 64, 125, 216, 343.</span></p><p dir=\"ltr\"><span>Since 81 replaces 125, it does not follow the pattern and is incorrect.</span></p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60415,
      "question": "<p dir=\"ltr\"><span>Find wrong number in series:</span><br/><br/><span>2, 3, 6, 0, 8, -3, 14, -6</span></p>",
      "options": [
        "<p><span>3</span></p>",
        "<p><span>0</span></p>",
        "<p><span>8</span></p>",
        "<p><span>3</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>two alternate series:</span></p><ul><li value=\"1\"><span>2 + 4 = 6</span></li><li value=\"2\"><span>3 - 3 = 0</span></li><li value=\"3\"><span>6 + 4 = 10</span></li><li value=\"4\"><span>0 - 3 = -3</span></li><li value=\"5\"><span>10 + 4 = 14</span></li><li value=\"6\"><span>-3 - 3 = -6</span></li></ul>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60416,
      "question": "<p dir=\"ltr\"><span>Find wrong number in series:</span><br/><br/><span>4, 12, 48, 240, 1240, 10080</span><br/></p>",
      "options": [
        "<p><span>12</span></p>",
        "<p><span>240</span></p>",
        "<p><span>1240</span></p>",
        "<p><span>10080</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>4*3 = 12</span><br/><br/><span>12*4 = 48</span><br/><br/><span>48*5 = 240</span><br/><br/><span>240*6 = 1440 (Not 1240)</span></p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60417,
      "question": "<p dir=\"ltr\"><span>Find wrong number in series:</span><br/><br/><span>2, 7, 10, 22, 18, 37, 26, 46</span></p>",
      "options": [
        "<p><span>10</span></p>",
        "<p><span>18</span></p>",
        "<p><span>26</span></p>",
        "<p><span>46</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>two alternate series: </span></p><ul><li value=\"1\"><span>2 + 8 = 10</span></li><li value=\"2\"><span>7 + 15 = 22</span></li><li value=\"3\"><span>10 + 8 = 18</span></li><li value=\"4\"><span>22 + 15 = 37</span></li><li value=\"5\"><span>37 + 15 = 52</span><br/><span>so, +8, +15, +8, +15, ......</span></li></ul>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60418,
      "question": "<p dir=\"ltr\"><span>Find wrong number in series:</span><br/><br/><span>1, 4, 9, 16, 25, 32, 49, 64</span></p>",
      "options": [
        "<p><span>9</span></p>",
        "<p><span>25</span></p>",
        "<p><span>32</span></p>",
        "<p><span>64</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Square of natural numbers: 1</span><sup><span>2 </span></sup><span>= 1, 2</span><sup><span>2 </span></sup><span>= 4, 3</span><sup><span>2 </span></sup><span>= 9 ... 8</span><sup><span>2 </span></sup><span>= 64</span></p><p dir=\"ltr\"><span>6</span><sup><span>2</span></sup><span> = 36 not 32</span></p>",
      "tag": "Number Series || MCQ"
    },
    {
      "id": 60419,
      "question": "<p>Find wrong number in series:<br>\r\n34, 7, 37, 14, 36, 28, 43, 56</p>",
      "options": [
        "14",
        "36",
        "28",
        "56"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>mixture of series (alternate numbers)<br>\r\n\r\n34+3=37,<br>\r\n\r\n37+3 =40...<br>\r\n7*2= 14<br>\r\n\r\n14*2= 28<br>\r\n\r\n28*2 =56</p>",
      "tag": "Number Series || MCQ"
    }
  ],
  "Letter and Symbol Series": [
    {
      "id": 60420,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>M 3 A @ 5 B # 7 W 2 Z * 8 P ! F $ 9 L</strong></b></p><p dir=\"ltr\"><span>If all the symbols are dropped, which of the following is second to the left of the seventh from the left end?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>P</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>F</span></p>",
        "<p dir=\"ltr\"><span>W</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After removing symbols, the sequence is </span><b><strong>M 3 A  5 B  7 W 2 Z  8 P F 9 L</strong></b><span>, and the second element to the left of the seventh element (</span><b><strong>W</strong></b><span>) is </span><b><strong>B</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60421,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>J 1 F * G 3 K ^ 4 D E 6 Q P ! 2 L #</strong></b></p><p dir=\"ltr\"><span>If all the letters are dropped, which of the following is the fourth to the right of the sixth from the right end?</span></p>",
      "options": [
        "<p><span>4</span></p>",
        "<p><span>2</span></p>",
        "<p><span>1</span></p>",
        "<p><span>3</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><br><span>After removing letters, the sequence becomes </span><b><strong>1 * 3 ^ 4 6 2 #</strong></b><span>, and the fourth element to the right of the sixth from the right is </span><b><strong>2</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60422,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>Q 5 L ! M 9 A * 7 K 8 O # P 6 Z V</strong></b></p><p dir=\"ltr\"><span>If all the digits and symbols are dropped, which of the following is the third to the left of the eighth from the left end?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>M</span></p>",
        "<p dir=\"ltr\"><span>O</span></p>",
        "<p dir=\"ltr\"><span>K</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><br><span>After removing digits and symbols, the sequence is </span><b><strong>Q L M A K O P Z V</strong></b><span>, and the third element to the left of the eighth (</span><b><strong>Z</strong></b><span>) is </span><b><strong>K</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60423,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>E 7 Z @ 4 P # 2 M L $ 9 D T * 3 U</strong></b></p><p dir=\"ltr\"><span>If all the letters are dropped, which of the following is the fifth to the right of the second from the left end?</span></p>",
      "options": [
        "<p><span>2</span></p>",
        "<p><span>4</span></p>",
        "<p><span>9</span></p>",
        "<p><span>3</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After removing letters, the sequence is </span><b><strong>7 @ 4 # 2 $ 9 * 3</strong></b><span>, and the fifth element to the right of the second (</span><b><strong>@</strong></b><span>) is </span><b><strong>9</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60424,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>H 8 Y $ 5 F * 2 L T 4 R # 9 P D 3</strong></b></p><p dir=\"ltr\"><span>If all the letters and symbols are dropped, which of the following is fourth from the right end?</span></p>",
      "options": [
        "<p><span>2</span></p>",
        "<p><span>4</span></p>",
        "<p><span>8</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After removing letters and symbols, the sequence is</span><b><strong> 8 5 2 4 9 3</strong></b><span>, and the fourth element from the right is </span><b><strong>2</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60425,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>T 7 A $ 3 P ! Z 5 Q # F 9 M U 2</strong></b></p><p dir=\"ltr\"><span>If all the digits and symbols are dropped, which of the following is the second to the right of the sixth from the left end?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Z</span></p>",
        "<p dir=\"ltr\"><span>U</span></p>",
        "<p dir=\"ltr\"><span>P</span></p>",
        "<p dir=\"ltr\"><span>A</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><br/><span>After removing digits and symbols, the sequence is </span><b><strong>T A P Z Q F M U</strong></b><span>, U is the second to the right of the sixth from the left end (</span><b><strong>F</strong></b><span>).</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60426,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>C 9 B * F 7 Z 5 P @ Q 3 H D 8 K L</strong></b></p><p dir=\"ltr\"><span>If all the letters are dropped, which of the following is third to the right of the sixth from the right end?</span></p>",
      "options": [
        "<p><span>3</span></p>",
        "<p><span>9</span></p>",
        "<p><span>@</span></p>",
        "<p><span>8</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After removing letters, the sequence is </span><b><strong>9 * 7 5 @ 3 8</strong></b><span>, and the third element to the right of the sixth from the right (</span><b><strong>*</strong></b><span>) is </span><b><strong>@</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60427,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>D 4 L # E 3 G ! Z 9 T M 5 U * K P</strong></b></p><p dir=\"ltr\"><span>If all the digits are dropped, which of the following is the first to the left of the seventh from the right end?</span></p>",
      "options": [
        "<p><span>#</span></p>",
        "<p dir=\"ltr\"><span>Z</span></p>",
        "<p><span>!</span></p>",
        "<p dir=\"ltr\"><span>E</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After removing digits, the sequence is </span><b><strong>D L # E G ! Z T M U * K P</strong></b><span>, and the first element to the left of the seventh from the right (</span><b><strong>Z</strong></b><span>) is </span><b><strong>!.</strong></b></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60428,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>N 6 C @ 2 F P * L 5 Q Z 8 R D T</strong></b></p><p dir=\"ltr\"><span>If all the symbols are dropped, which of the following is fourth to the right of the tenth from the left end?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Q</span></p>",
        "<p dir=\"ltr\"><span>L</span></p>",
        "<p dir=\"ltr\"><span>Z</span></p>",
        "<p dir=\"ltr\"><span>T</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After removing symbols, the sequence is </span><b><strong>N 6 C 2 F P L 5 Q Z 8 R D T</strong></b><span>, and the fourth element to the right of the tenth (</span><b><strong>Z</strong></b><span>) is </span><b><strong>T</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    },
    {
      "id": 60429,
      "question": "<p dir=\"ltr\"><span>Study the following digit-letter-symbol sequence carefully and answer the questions given below.</span></p><p dir=\"ltr\"><b><strong>K 3 W * R 5 T 7 Z @ 8 A L 2 B Q D</strong></b></p><p dir=\"ltr\"><span>If all the digits and symbols are dropped, which of the following is third to the left of the fourth from the right end?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>T</span></p>",
        "<p dir=\"ltr\"><span>R</span></p>",
        "<p dir=\"ltr\"><span>W</span></p>",
        "<p dir=\"ltr\"><span>Z</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After removing digits and symbols, the sequence is </span><b><strong>K W R T Z A L B Q D</strong></b><span>, and the third element to the left of the fourth from the right (</span><b><strong>L</strong></b><span>) is </span><b><strong>T</strong></b><span>.</span></p>",
      "tag": "Letter and Symbol Series || MCQ"
    }
  ],
  "Verbal Classification": [
    {
      "id": 60430,
      "question": "<p dir=\"ltr\"><span>Choose the odd word from the given list.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Apple</span></p>",
        "<p dir=\"ltr\"><span>Mango</span></p>",
        "<p dir=\"ltr\"><span>Carrot</span></p>",
        "<p dir=\"ltr\"><span>Banana</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Apple, Mango, and Banana are fruits, while Carrot is a vegetable.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60431,
      "question": "<p dir=\"ltr\"><span>Pick the odd number from the given list</span></p>",
      "options": [
        "<p><span>24</span></p>",
        "<p><span>36</span></p>",
        "<p><span>48</span></p>",
        "<p><span>37</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>24, 36, and 48 are even numbers, whereas 37 is an odd number.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60432,
      "question": "<p dir=\"ltr\"><span>Choose the odd pair of words.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Cat: Meow</span></p>",
        "<p dir=\"ltr\"><span>Dog: Bark</span></p>",
        "<p dir=\"ltr\"><span>Cow: Roar</span></p>",
        "<p dir=\"ltr\"><span>Horse: Neigh</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sounds given in pairs A, B, and D are correct for the respective animals, while a cow doesn\u2019t roar; it moos.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60433,
      "question": "<p dir=\"ltr\"><span>Find the odd word in the following list.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Copper</span></p>",
        "<p dir=\"ltr\"><span>Iron</span></p>",
        "<p dir=\"ltr\"><span>Silver</span></p>",
        "<p dir=\"ltr\"><span>Cement</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Copper, Iron, and Silver are metals, while Cement is a non-metallic construction material.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60434,
      "question": "<p dir=\"ltr\"><span>Pick the odd letters from the given options.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>JKL</span></p>",
        "<p dir=\"ltr\"><span>PQR</span></p>",
        "<p dir=\"ltr\"><span>MNO</span></p>",
        "<p dir=\"ltr\"><span>LMT</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Options A, B, and C represent consecutive letters in the alphabet, while LMT does not.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60435,
      "question": "<p dir=\"ltr\"><span>Identify the odd word from the list below.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Bus</span></p>",
        "<p dir=\"ltr\"><span>Train</span></p>",
        "<p dir=\"ltr\"><span>Car</span></p>",
        "<p dir=\"ltr\"><span>Rocket</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Bus, Train, and Car are common means of ground transportation, whereas a Rocket is used for space travel.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60436,
      "question": "<p dir=\"ltr\"><span>Choose the unusual option from the list.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Himalayas</span></p>",
        "<p dir=\"ltr\"><span>Andes</span></p>",
        "<p dir=\"ltr\"><span>Sahara</span></p>",
        "<p dir=\"ltr\"><span>Alps</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The Himalayas, Andes, and Alps are mountain ranges, while the Sahara is a desert.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60437,
      "question": "<p dir=\"ltr\"><span>Pick the odd number from the following list.</span></p>",
      "options": [
        "<p><span>145</span></p>",
        "<p><span>169</span></p>",
        "<p><span>225</span></p>",
        "<p><span>256</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>169, 225, and 256 are perfect squares, while 145 is not.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60438,
      "question": "<p dir=\"ltr\"><span>Find the odd word from the list below.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Monday</span></p>",
        "<p dir=\"ltr\"><span>Tuesday</span></p>",
        "<p dir=\"ltr\"><span>January</span></p>",
        "<p dir=\"ltr\"><span>Friday</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> Monday, Tuesday, and Friday are days of the week, while January is a month.</span></p>",
      "tag": "Verbal Classification || MCQ"
    },
    {
      "id": 60439,
      "question": "<p dir=\"ltr\"><span>Choose the odd pair of words from the following options.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Paris: France</span></p>",
        "<p dir=\"ltr\"><span>Tokyo: Japan</span></p>",
        "<p dir=\"ltr\"><span>Rome: Italy</span></p>",
        "<p dir=\"ltr\"><span>Sydney: New Zealand</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Paris, Tokyo, and Rome are correctly matched with their countries, while Sydney is in Australia, not New Zealand.</span></p>",
      "tag": "Verbal Classification || MCQ"
    }
  ],
  "Analogies": [
    {
      "id": 60440,
      "question": "<p dir=\"ltr\"><span> Dog : Barking :: Cat : ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Meowing</span></p>",
        "<p dir=\"ltr\"><span>Flying</span></p>",
        "<p dir=\"ltr\"><span> Swimming</span></p>",
        "<p dir=\"ltr\"><span>Running</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A dog barks, while a cat meows. The relationship is based on the sound each animal makes.</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60441,
      "question": "<p dir=\"ltr\"><span>FIND : LOSE :: BUILD :</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>CREATE</span></p>",
        "<p dir=\"ltr\"><span> DEMOLISH</span></p>",
        "<p dir=\"ltr\"><span>CONSTRUCT</span></p>",
        "<p dir=\"ltr\"><span>DESTROY</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"FIND\" is the opposite of \"LOSE,\" and \"BUILD\" is the opposite of \"DEMOLISH.\"</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60442,
      "question": "<p><span>4 : 16 :: 6 :</span></p>",
      "options": [
        "<p><span>36</span></p>",
        "<p><span>20</span></p>",
        "<p><span>26</span></p>",
        "<p><span>33</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The second number is the square of the first number (4</span><sup><span>2</span></sup><span> = 16). Therefore, 6</span><sup><span>2</span></sup><span> = 36.</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60443,
      "question": "<p dir=\"ltr\"><span>If \"CYCLE\" is written as \"DZDMF,\" how is \"PLANE\" written in the same code?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>QMBNG</span></p>",
        "<p dir=\"ltr\"><span>QMBNF</span></p>",
        "<p dir=\"ltr\"><span>QMBOF</span></p>",
        "<p dir=\"ltr\"><span>QMDNF</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In the given code, each letter is shifted by one position forward in the alphabet (C \u2192 D, Y \u2192 Z, C \u2192 D, L \u2192 M, E \u2192 F). Applying the same shift to \"PLANE\":</span><br><span>P \u2192 Q</span><br><span>L \u2192 M</span><br><span>A \u2192 B</span><br><span>N \u2192 O</span><br><span>E \u2192 F</span><br><span>Hence, \"PLANE\" is written as \"QMBOF.\"</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60444,
      "question": "<p dir=\"ltr\"><span>In a certain code, \"PAPER\" is written as \"QBQFS\". How is \"PENCIL\" written in the same code?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>QOFJMN</span></p>",
        "<p dir=\"ltr\"><span>QOFIKM</span></p>",
        "<p dir=\"ltr\"><span>QOFJKM</span></p>",
        "<p dir=\"ltr\"><span>QFODJM</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In the given code, each letter is shifted one position forward in the alphabet. Applying this to \"PENCIL\":</span><br><span>P \u2192 Q</span><br><span>E \u2192 F</span><br><span>N \u2192 O</span><br><span>C \u2192 D</span><br><span>I \u2192 J</span><br><span>L \u2192 M</span><br><span>Hence, \"PENCIL\" is written as \"QFODJM\".</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60445,
      "question": "<p dir=\"ltr\"><span>MONDAY : WEEK :: JANUARY : ?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> YEAR</span></p>",
        "<p dir=\"ltr\"><span>MONTH</span></p>",
        "<p dir=\"ltr\"><span>DAY</span></p>",
        "<p dir=\"ltr\"><span> SEASON</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"MONDAY\" is a part of a \"WEEK,\" and \"JANUARY\" is a part of a \"YEAR.\"</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60446,
      "question": "<p dir=\"ltr\"><span>Find an appropriate word for the question mark</span></p><p dir=\"ltr\"><br/></p><p dir=\"ltr\"><span> HUMANS: LIP :: BIRDS: ??</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Beak</span></p>",
        "<p dir=\"ltr\"><span>Wings</span></p>",
        "<p dir=\"ltr\"><span>Grass</span></p>",
        "<p dir=\"ltr\"><span>Forest</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Humans use lips to drink, hence, applying the same to birds, we can say that Birds drink using their beak.</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60447,
      "question": "<p dir=\"ltr\"><span>Find an appropriate word for the question mark</span></p><p dir=\"ltr\"><br/></p><p dir=\"ltr\"><span> River: Flow :: Pool : ??</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Swim</span></p>",
        "<p dir=\"ltr\"><span>Stagnant</span></p>",
        "<p dir=\"ltr\"><span>Waves</span></p>",
        "<p dir=\"ltr\"><span>Turbulent</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A River has a constant &amp; moving motion similar to flow, whereas the water in a pool is stagnant.</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60448,
      "question": "<p dir=\"ltr\"><span>CABBAGE : VEGETABLE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rose : Fruit</span></p>",
        "<p dir=\"ltr\"><span>Apple : Tree</span></p>",
        "<p dir=\"ltr\"><span>Carrot : Vegetable</span></p>",
        "<p dir=\"ltr\"><span>Dog : Reptile</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A tomato is classified as a vegetable, just as a carrot is classified as a vegetable.</span></p>",
      "tag": "Analogies || MCQ"
    },
    {
      "id": 60449,
      "question": "<p dir=\"ltr\"><span>Find an appropriate word for the question mark</span></p><p dir=\"ltr\"><br/></p><p dir=\"ltr\"><span> Safe: Secure :: Protect : ??</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Lock</span></p>",
        "<p dir=\"ltr\"><span>Sure</span></p>",
        "<p dir=\"ltr\"><span>Guard</span></p>",
        "<p dir=\"ltr\"><span>Conserve</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A Safe is a secure option, Protect reflects a similar relationship with Guard.</span></p>",
      "tag": "Analogies || MCQ"
    }
  ],
  "Logical Problems": [
    {
      "id": 60450,
      "question": "<p dir=\"ltr\"><span>All roses are flowers.</span></p><p dir=\"ltr\"><span>Some flowers are red.</span></p><p dir=\"ltr\"><span>Therefore, some roses are red.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span> false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Although all roses are flowers and some flowers are red, there is no information stating that roses are specifically among the red flowers. Therefore, we cannot conclude that some roses are red.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60451,
      "question": "<p dir=\"ltr\"><span>All dogs bark.</span></p><p dir=\"ltr\"><span>Max is a dog.</span></p><p dir=\"ltr\"><span>Therefore, Max barks.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span> uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since all dogs bark and Max is a dog, it logically follows that Max barks. Therefore, the third statement is true.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60452,
      "question": "<p dir=\"ltr\"><span>All teachers have degrees.</span></p><p dir=\"ltr\"><span>Some people with degrees are doctors.</span></p><p dir=\"ltr\"><span>Therefore, some teachers are doctors.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Although all teachers have degrees, and some people with degrees are doctors, no information connects teachers directly to doctors. Therefore, the third statement is uncertain.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60453,
      "question": "<p dir=\"ltr\"><span>All plants need sunlight.</span></p><p dir=\"ltr\"><span>This object needs sunlight.</span></p><p dir=\"ltr\"><span>Therefore, this object is a plant.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>While all plants need sunlight, other things may also need sunlight. There\u2019s no information given that only plants require sunlight, so the third statement is uncertain.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60454,
      "question": "<p dir=\"ltr\"><span>Some books are novels.</span></p><p dir=\"ltr\"><span>All novels are fictional.</span></p><p dir=\"ltr\"><span>Therefore, some books are fictional.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since some books are novels, and all novels are fictional, it logically follows that some books are fictional. Therefore, the third statement is true.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60455,
      "question": "<p dir=\"ltr\"><span>All circles are shapes.</span></p><p dir=\"ltr\"><span>This object is a shape.</span></p><p dir=\"ltr\"><span>Therefore, this object is a circle.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Although all circles are shapes, there is no information provided that all shapes are circles. Therefore, we cannot conclude that this shape is necessarily a circle.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60456,
      "question": "<p dir=\"ltr\"><span>All cats are animals.</span></p><p dir=\"ltr\"><span>Some animals are pets.</span></p><p dir=\"ltr\"><span>Therefore, some cats are pets.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>While all cats are animals and some animals are pets, there is no information specifically connecting cats to pets. Therefore, the third statement is uncertain.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60457,
      "question": "<p dir=\"ltr\"><span>Some people are artists.</span></p><p dir=\"ltr\"><span>All artists are creative.</span></p><p dir=\"ltr\"><span>Therefore, some people are creative.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since some people are artists, and all artists are creative, it logically follows that some people are creative. Therefore, the third statement is true</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60458,
      "question": "<p dir=\"ltr\"><span>All fish live in water.</span></p><p dir=\"ltr\"><span>Some fish are goldfish.</span></p><p dir=\"ltr\"><span>Therefore, some goldfish live in water.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since all fish live in water, and some fish are goldfish, it logically follows that some goldfish live in water. Therefore, the third statement is true.</span></p>",
      "tag": "Logical Problems || MCQ"
    },
    {
      "id": 60459,
      "question": "<p dir=\"ltr\"><span>All triangles have three angles.</span></p><p dir=\"ltr\"><span>This shape has three angles.</span></p><p dir=\"ltr\"><span>Therefore, this shape is a triangle.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>true</span></p>",
        "<p dir=\"ltr\"><span>false</span></p>",
        "<p dir=\"ltr\"><span>uncertain</span></p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Although all triangles have three angles, there is no information given that only triangles have three angles. Therefore, the third statement is uncertain.</span></p>",
      "tag": "Logical Problems || MCQ"
    }
  ],
  "Course of Action": [
    {
      "id": 60460,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A new highway is being built to connect two major cities, but environmentalists are concerned about its impact on local wildlife.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The highway construction should proceed with added measures to protect wildlife habitats.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The construction should be postponed until a detailed environmental impact assessment is conducted.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Course of Action 1 (Protective measures)\u00a0ensures wildlife safety during construction.</span></li><li value=\"2\"><span>Course of Action 2 (Environmental assessment)\u00a0identifies risks before building.</span></li><li value=\"3\"><span>Both are needed: First assess (2), then implement safeguards (1) for sustainable development.</span></li></ul>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60461,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A new sports stadium is being constructed in a congested urban area, and local residents are concerned about the potential for increased traffic and parking issues.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The stadium's design should include sufficient parking spaces and improved transportation options.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The construction should be paused to assess the long-term impact on local traffic and infrastructure.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Course of Action 2: Pausing to study traffic impacts ensures informed planning.</span></li><li value=\"2\"><span>Course of Action 1: Adding parking/transport options addresses identified issues.</span></li><li value=\"3\"><span>Together: Creates a stadium that serves fans\u00a0</span><i><em class=\"GFGEditorTheme__textItalic\">and</em></i><span>\u00a0the community sustainably.</span></li></ul>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60462,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> The city plans to build a new public park, but some residents are concerned about the loss of green space while others are excited about the recreational facilities.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The park should be designed to include both green spaces and recreational facilities.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The park should be entirely dedicated to green spaces with no recreational facilities.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span> Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Course of Action 1\u00a0(balanced design) satisfies both groups by combining green space with recreational facilities.</span></li><li value=\"2\"><span>Course of Action 2\u00a0(green-only) ignores community needs for recreation and is impractical.</span></li><li value=\"3\"><span>Best solution: A park that serves both environmental and social purposes (Course of Action 1).</span></li></ul>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60463,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A new power plant is being built in an area with limited water resources, and there are concerns about its water consumption.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The power plant should use water-efficient cooling technologies to minimize water usage.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The construction should be delayed until a new water supply system is put in place.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Course of Action 1\u00a0(water-efficient tech) directly reduces the plant's water demand, addressing the core issue.</span></li><li value=\"2\"><span>Course of Action 2\u00a0(delay for water supply) ensures long-term sustainability by securing adequate water infrastructure.</span></li><li value=\"3\"><span>Together, they provide immediate mitigation (1) and systemic solutions (2).</span></li></ul>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60464,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A popular streaming service is considering a price hike, but subscribers are concerned about affordability.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The service should implement a tiered pricing structure to allow users to choose the level of service they can afford.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The price increase should be postponed until more feedback from subscribers is gathered.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Course of Action 1\u00a0(tiered pricing) offers flexible options, making the service accessible to different budgets.</span></li><li value=\"2\"><span>Course of Action 2\u00a0(delay for feedback) ensures the price hike aligns with subscriber needs and market conditions.</span></li><li value=\"3\"><span>Together, they balance business goals with customer satisfaction.</span></li></ul>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60465,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A new hotel is being built near a beach, and environmentalists are concerned about potential damage to the ecosystem, while the tourism industry is excited about the economic benefits.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The hotel should implement eco-friendly building practices and minimize its impact on the environment.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The hotel should be halted until a complete environmental impact study is conducted.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The hotel can proceed with eco-friendly practices to address environmental concerns while also conducting an impact study to ensure sustainability.</span></p>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60466,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A new bridge is being built over a river, but local fishermen are concerned that it will block fishing routes.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The construction should proceed without any modifications to the bridge design.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The bridge should be moved to a different location to accommodate the fishing routes.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Course of Action 1: is not appropriate because simply continuing construction without addressing the issue does not solve the problem of disruption to fishing routes.</span></p><p dir=\"ltr\"><span>Course of Action 2, although in extreme condition, is a problem-solving step as shifting the bridge location can help avoid interference with fishing activities and protect the livelihood of fishermen. The original explanation suggests modifying the design, but that option is not provided in the choices, making it logically inconsistent.</span></p><p dir=\"ltr\"><span>Therefore, only Course of Action 2 is justified</span></p>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60467,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A self-driving car company is testing its vehicles in an urban area, but pedestrians and cyclists are worried about safety.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The company should implement a strict monitoring system and introduce safety features like emergency stop functions.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The testing should be suspended until a thorough review of pedestrian and cyclist safety is conducted.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Course of Action 1\u00a0(safety features) proactively addresses risks during testing.</span></li><li value=\"2\"><span>Course of Action 2\u00a0(safety review) ensures all potential hazards are identified before wider deployment.</span></li><li value=\"3\"><span>Together, they prioritize safety while allowing controlled progress.</span></li></ul>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60468,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A popular food delivery app is facing criticism for its environmental impact, especially with single-use packaging.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The app should offer an option for customers to choose reusable packaging.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The app should be removed from the market until the environmental concerns are fully addressed.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Offering an option for reusable packaging allows the company to address environmental concerns without completely halting operations.</span></p>",
      "tag": "Course of Action || MCQ"
    },
    {
      "id": 60469,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> A major retailer is considering shifting to a completely automated warehouse system, but workers are worried about job losses.</span></p><p dir=\"ltr\"><b><strong>Course of Action 1:</strong></b><span> The company should retrain workers for higher-level roles to ensure job security.</span></p><p dir=\"ltr\"><b><strong>Course of Action 2:</strong></b><span> The automation should be halted until further discussions with labor unions are held.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only 1</span></p>",
        "<p dir=\"ltr\"><span>Only 2</span></p>",
        "<p dir=\"ltr\"><span>Both 1 and 2</span></p>",
        "<p dir=\"ltr\"><span>Neither 1 nor 2</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Both actions are valuable: retraining offers workers new opportunities, while discussions ensure that the transition is fair and smooth for everyone.</span></p>",
      "tag": "Course of Action || MCQ"
    }
  ],
  "Statement and Conclusion": [
    {
      "id": 60470,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><span> </span><br/><span>All mangoes are bananas. </span><br/><span>Some bananas are globe.</span><br/><span>All globe are square.</span><br/><br/><b><strong>Conclusions:</strong></b><br/><span>I. Some mangoes are square.</span><br/><span>II. No mango is square.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>Neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>There is no definite link between mangoes and squares. So we cannot say that \u201cSome mangoes are square\u201d is definitely true, and we also cannot say that \u201cNo mango is square\u201d is definitely true.</span></p><p dir=\"ltr\"><span>However, these two conclusions are contradictory. If one is false, the other must be true. Therefore, both cannot be false together.</span></p><p dir=\"ltr\"><span>So, Either conclusion I or conclusion II is true.\u00a0</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60471,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>All C are J. </span><br/><span>All J are B.  </span><br/><span>No B is R. </span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span>I. All B are C. </span><br/><span>II. Some J are C </span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I is False because not all B are C, while Conclusion II is True since C is a subset of J, so some J are C.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60472,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>Some C are T </span><br/><span>Some T are R</span><br/><span>All R are M </span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span>I. Some M are T </span><br/><span>II. Some C are M </span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I is True because since some T are R and all R are M, some M must be T.</span><br/><span>Conclusion II is False because there's no direct relationship between C and M established in the statements.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60473,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>Some A are B.</span><br/><span>Some B are C.</span><br/><span>All C are D.</span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span> I. Some D are B.</span><br/><span> II. Some A are D.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If neither conclusion I nor conclusion II is true.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I is True because some B are C and all C are D, so some D must be B.</span><br/><span>Conclusion II is False because there is no direct relationship between A and D established by the statements.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60474,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>All L are W.</span><br/><span>Some P are W.</span><br/><span>All P are B.</span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span>I. Some B  are W   </span><br/><span>II. Some W are L</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I is True because since some P are W and all P are B, some B must be W.</span><br/><span>Conclusion II is True because all L are W, so W includes all L.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60475,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><span> </span><br/><span>Some S are L</span><br/><span>Some C are P</span><br/><span>Some P are R</span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><span> </span><br/><span>I. Some P are L</span><br/><span>II. Some C are R  </span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I is False because there's no direct relationship between P and L established by the statements.</span><br/><span>Conclusion II is False because there\u2019s no direct connection between C and R based on the given statements.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60476,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>Some students are athletes.</span><br/><span>All athletes are disciplined.</span><br/><span>Some disciplined people are teachers.</span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span> I. Some students are teachers.</span><br/><span> II. Some students are disciplined.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I is False because there's no direct connection between students and teachers established by the statements.</span><br/><span>Conclusion II is True because some students are athletes, and all athletes are disciplined, so some students must be disciplined.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60477,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>All chairs are furniture.</span><br/><span>Some furniture is wooden.</span><br/><span>All wooden things are durable.</span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span> I. Some chairs are durable.</span><br/><span> II. Some furniture is chairs.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I: Some chairs are durable.\u00a0\u2192 Does not follow.</span><br/><span>Conclusion II: Some furniture is chairs.\u00a0\u2192 Follows.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60478,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>All squares are rectangles.</span><br/><span>Some rectangles are colored.</span><br/><span>Some colored rectangles are blue.</span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span> I. Some squares are blue.</span><br/><span> II. Some rectangles are blue.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I is False because there's no direct relationship between squares and the color blue established in the statements.</span><br/><span>Conclusion II is True because some rectangles are colored, and some of those colored rectangles are blue, so some rectangles must be blue.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    },
    {
      "id": 60479,
      "question": "<p dir=\"ltr\"><b><strong>Statements:</strong></b><br/><span>All politicians are leaders.</span><br/><span>Some leaders are honest.</span><br/><span>Some honest people are teachers.</span></p><p dir=\"ltr\"><b><strong>Conclusions:</strong></b><br/><span> I. Some teachers are politicians.</span><br/><span> II. Some politicians are honest.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>If only conclusion I is true.</span></p>",
        "<p dir=\"ltr\"><span>If only conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If either conclusion I or conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span>If neither conclusion I nor conclusion II is true.</span></p>",
        "<p dir=\"ltr\"><span> If both conclusions I and II are true.</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Conclusion I: Some teachers are politicians.\u00a0\u2192 Does not follow.</span><br/><span>Conclusion II: Some politicians are honest.\u00a0\u2192 Does not follow.</span></p>",
      "tag": "Statement and Conclusion || MCQ"
    }
  ],
  "Theme Detection": [
    {
      "id": 60480,
      "question": "<p dir=\"ltr\"><span>The primary function of government is to maintain order and to provide basic services to the people. A government must ensure security, law, and justice for the smooth functioning of society. Without these, society cannot function effectively. The passage best supports the statement that:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The government\u2019s main role is to control the people.</span></p>",
        "<p dir=\"ltr\"><span>Security and order are essential for a well-functioning society.</span></p>",
        "<p dir=\"ltr\"><span>Justice is only the responsibility of the government.</span></p>",
        "<p dir=\"ltr\"><span>People need basic services to survive.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage emphasizes the need for security, law, and justice for society to function effectively, suggesting that these elements are essential for a well-functioning society.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60481,
      "question": "<p dir=\"ltr\"><span>The use of the internet and social media in education has opened up a new world of possibilities for both students and teachers. It allows access to vast information resources and enables new methods of teaching and learning that were previously unavailable. The passage best supports the statement that:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Social media is a distraction in education.</span></p>",
        "<p dir=\"ltr\"><span>The internet has made education easier.</span></p>",
        "<p dir=\"ltr\"><span>Technology can enhance the educational experience.</span></p>",
        "<p dir=\"ltr\"><span>Teachers have lost their importance in the classroom.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage highlights how the internet and social media provide new resources and teaching methods, implying that technology enhances education.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60482,
      "question": "<p dir=\"ltr\"><span>Economic development leads to improved infrastructure and a better quality of life for citizens. It brings about employment opportunities and helps reduce poverty in society. The passage best supports the statement that</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Economic development benefits everyone equally.</span></p>",
        "<p dir=\"ltr\"><span>Employment opportunities are a by-product of poverty.</span></p>",
        "<p dir=\"ltr\"><span>Economic growth improves societal well-being.</span></p>",
        "<p dir=\"ltr\"><span>Infrastructure has no effect on quality of life.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage suggests that economic development enhances infrastructure, employment, and quality of life, implying an overall positive impact on societal well-being.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60483,
      "question": "<p dir=\"ltr\"><span>Regular exercise has several benefits, including improved physical health, mental clarity, and increased energy. It can also reduce stress and improve mood.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Exercise is only beneficial for physical health.</span></p>",
        "<p dir=\"ltr\"><span>Regular exercise enhances both physical and mental well-being.</span></p>",
        "<p dir=\"ltr\"><span>Exercise can cause stress and anxiety.</span></p>",
        "<p dir=\"ltr\"><span>Mental health is unrelated to physical exercise.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage lists the benefits of regular exercise, indicating that it positively impacts both physical and mental health.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60484,
      "question": "<p dir=\"ltr\"><span>Conservation of natural resources is essential for sustainable development. Depletion of resources without considering future generations will lead to a crisis where basic needs cannot be met. The passage best supports the statement that:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Natural resources are infinite.</span></p>",
        "<p dir=\"ltr\"><span>Sustainable development requires resource conservation.</span></p>",
        "<p dir=\"ltr\"><span>Future generations will have access to abundant resources.</span></p>",
        "<p dir=\"ltr\"><span>Resource depletion has no impact on sustainability.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage emphasizes that conservation is crucial to sustain resources for future generations, aligning with the concept of sustainable development.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60485,
      "question": "<p dir=\"ltr\"><span>Honesty in business leads to trust and long-term success. Deceptive practices may bring quick gains but ultimately damage a company\u2019s reputation and relationships with clients. The passage best supports the statement that:</span></p><p dir=\"ltr\"><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>Deception is necessary in business.</span></p>",
        "<p dir=\"ltr\"><span>Long-term success depends on honesty.</span></p>",
        "<p dir=\"ltr\"><span>Quick gains are the ultimate goal in business.</span></p>",
        "<p dir=\"ltr\"><span>Clients do not value trust in business.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage suggests that honesty builds trust and leads to long-term success, contrasting it with the negative effects of deception.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60486,
      "question": "<p dir=\"ltr\"><span>Books have always been a source of knowledge, insight, and inspiration. They allow readers to explore new ideas, experience different cultures, and learn about history and science. The passage best supports the statement that:</span></p><p dir=\"ltr\"><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>Books are only useful for entertainment.</span></p>",
        "<p dir=\"ltr\"><span>Reading books helps expand knowledge and perspective.</span></p>",
        "<p dir=\"ltr\"><span> Books are outdated sources of information.</span></p>",
        "<p dir=\"ltr\"><span>History and science cannot be learned from books.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage highlights that books provide knowledge, cultural insights, and ideas, showing that reading broadens one\u2019s understanding.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60487,
      "question": "<p dir=\"ltr\"><span>Urbanization brings various challenges, such as pollution, overcrowding, and strain on resources. However, it also creates economic opportunities and modern infrastructure that benefit society. The passage best supports the statement that:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Urbanization only causes problems.</span></p>",
        "<p dir=\"ltr\"><span>Urbanization has both challenges and benefits.</span></p>",
        "<p dir=\"ltr\"><span>Modern infrastructure is unnecessary for society.</span></p>",
        "<p dir=\"ltr\"><span>Economic opportunities do not exist in urban areas.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage discusses both the positive and negative impacts of urbanization, indicating a balanced view of its effects on society.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60488,
      "question": "<p dir=\"ltr\"><span>Education empowers individuals by providing them with knowledge and skills to improve their lives. It opens doors to better job opportunities and enables informed decision-making. The passage best supports the statement that:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Education is only necessary for finding jobs.</span></p>",
        "<p dir=\"ltr\"><span>Empowerment is unrelated to education.</span></p>",
        "<p dir=\"ltr\"><span>Education provides knowledge and opportunities.</span></p>",
        "<p dir=\"ltr\"><span>Informed decision-making is not affected by education.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage emphasizes that education equips individuals with knowledge and skills, empowering them to improve their lives and make better decisions.</span></p>",
      "tag": "Theme Detection || MCQ"
    },
    {
      "id": 60489,
      "question": "<p dir=\"ltr\"><span>Global warming poses a serious threat to the environment, affecting weather patterns, sea levels, and ecosystems. Urgent action is required to reduce greenhouse gas emissions and prevent further damage. The passage best supports the statement that:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Global warming has no impact on the environment.</span></p>",
        "<p dir=\"ltr\"><span>Reducing emissions can help mitigate global warming.</span></p>",
        "<p dir=\"ltr\"><span>Ecosystems are unaffected by climate change.</span></p>",
        "<p dir=\"ltr\"><span>Weather patterns are unrelated to environmental changes.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage suggests that reducing greenhouse gases is necessary to prevent further environmental damage, indicating the need for action on emissions.</span></p>",
      "tag": "Theme Detection || MCQ"
    }
  ],
  "Blood Relations": [
    {
      "id": 60490,
      "question": "<p dir=\"ltr\"><span>If A is the father of B, but B is not his son, how is B related to A?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Daughter</span></p>",
        "<p dir=\"ltr\"><span>Cousin</span></p>",
        "<p dir=\"ltr\"><span>Wife</span></p>",
        "<p dir=\"ltr\"><span>Niece</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since B is not A's son but A is father of B, B must be A's daughter.</span></p>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60491,
      "question": "<p dir=\"ltr\"><span>If John is the brother of Mary, and Mary is the mother of Peter, how is John related to Peter?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Father</span></p>",
        "<p dir=\"ltr\"><span> Grandfather</span></p>",
        "<p dir=\"ltr\"><span>Uncle</span></p>",
        "<p dir=\"ltr\"><span>Brother</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>John is Mary's brother.</span></li><li value=\"2\"><span>Mary is Peter's mother.</span></li><li value=\"3\"><span>Therefore, John is Peter's maternal uncle.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60492,
      "question": "<p dir=\"ltr\"><span>Pointing to a woman, Tom says, \"She is the daughter of the only child of my grandmother.\" How is the woman related to Tom?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Sister</span></p>",
        "<p dir=\"ltr\"><span>Aunt</span></p>",
        "<p dir=\"ltr\"><span>Mother</span></p>",
        "<p dir=\"ltr\"><span>Cousin</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>The only child of Tom's grandmother is Tom's parent.</span></li><li value=\"2\"><span>The daughter of Tom's parent is Tom's sister.</span></li><li value=\"3\"><span>Therefore, the woman is Tom's sister.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60493,
      "question": "<p dir=\"ltr\"><span>Pointing to a photograph, Sarah said, \"He is the son of the only son of my grandfather.\" How is the man in the photograph related to Sarah?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Brother</span></p>",
        "<p dir=\"ltr\"><span>Cousin</span></p>",
        "<p dir=\"ltr\"><span>Nephew</span></p>",
        "<p dir=\"ltr\"><span>Uncle</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>The only son of Sarah's grandfather is Sarah's father.</span></li><li value=\"2\"><span>The son of Sarah's father is Sarah's brother.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60494,
      "question": "<p dir=\"ltr\"><span>If X is the brother of Y, Y is the sister of Z, and Z is the father of W, how is Y related to W?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Grandmother</span></p>",
        "<p dir=\"ltr\"><span>Sister</span></p>",
        "<p dir=\"ltr\"><span>Aunt</span></p>",
        "<p dir=\"ltr\"><span>Mother</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Y is Z's sister.</span></li><li value=\"2\"><span>Z is W's father.</span></li><li value=\"3\"><span>Therefore, Y is W's aunt.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60495,
      "question": "<p dir=\"ltr\"><span>If M's father's only daughter is N, and N is the mother of O, how is M related to O?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Grandfather</span></p>",
        "<p dir=\"ltr\"><span>Brother</span></p>",
        "<p dir=\"ltr\"><span> Father</span></p>",
        "<p dir=\"ltr\"><span> Uncle</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>M's father's only daughter is N, so N is M's sister.</span></li><li value=\"2\"><span>N is the mother of O.</span></li><li value=\"3\"><span>Therefore, M is O's maternal uncle.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60496,
      "question": "<p dir=\"ltr\"><span>If P is the mother of Q, and R is the sister of P, how is Q related to R?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Niece/Nephew</span></p>",
        "<p dir=\"ltr\"><span>Mother</span></p>",
        "<p dir=\"ltr\"><span>Son</span></p>",
        "<p dir=\"ltr\"><span>Sister</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>R is P's sister.</span></li><li value=\"2\"><span>P is Q's mother.</span></li><li value=\"3\"><span>Therefore, Q is R's niece or nephew.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60497,
      "question": "<p dir=\"ltr\"><span>Introducing a woman, a man says, \"She is the wife of my mother's only son.\" How is the woman related to the man's father?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Daughter</span></p>",
        "<p dir=\"ltr\"><span>Wife</span></p>",
        "<p dir=\"ltr\"><span>Daughter-in-law</span></p>",
        "<p dir=\"ltr\"><span>Niece</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>\"My mother's only son\" is the man himself.</span></li><li value=\"2\"><span>Therefore, the woman is the man's wife.</span></li><li value=\"3\"><span>To the man's father, she is the daughter-in-law.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60498,
      "question": "<p dir=\"ltr\"><span>Pointing to a lady, Ravi said, \"She is the daughter-in-law of the grandmother of my father's only son.\" How is the lady related to Ravi?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Wife</span></p>",
        "<p dir=\"ltr\"><span>Sister</span></p>",
        "<p dir=\"ltr\"><span>Sister-in-law</span></p>",
        "<p dir=\"ltr\"><span>Aunt</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>\"My father's only son\" is Ravi himself (assuming he is the only son).</span></li><li value=\"2\"><span>\"Grandmother of Ravi\" is Ravi's grandmother.</span></li><li value=\"3\"><span>\"Daughter-in-law of Ravi's grandmother\" is Ravi's mother or aunt.</span></li><li value=\"4\"><span>Since options include \"Wife\" and considering typical reasoning patterns, the lady is Ravi's wife.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    },
    {
      "id": 60499,
      "question": "<p dir=\"ltr\"><span>If P is the son of Q, and R is Q's sister, S is R's mother, and T is S's husband, how is T related to P?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Father</span></p>",
        "<p dir=\"ltr\"><span>Grandfather</span></p>",
        "<p dir=\"ltr\"><span>Brother</span></p>",
        "<p dir=\"ltr\"><span>Uncle</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>R is Q's sister; therefore, S is Q and R's mother.</span></li><li value=\"2\"><span>T is S's husband, so T is Q's father.</span></li><li value=\"3\"><span>P is Q's son.</span></li><li value=\"4\"><span>Therefore, T is P's grandfather.</span></li></ul>",
      "tag": "Blood Relations || MCQ"
    }
  ],
  "Directions": [
    {
      "id": 60500,
      "question": "<p dir=\"ltr\"><span>A person starts walking from point A towards the north and walks 5 km. He then turns right and walks 3 km, then turns right again and walks 5 km. Finally, he turns left and walks 2 km. What is the final direction he is facing?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>North</span></p>",
        "<p dir=\"ltr\"><span>South</span></p>",
        "<p dir=\"ltr\"><span>East</span></p>",
        "<p dir=\"ltr\"><span>West</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>The person starts by walking 5 km north.</span></li><li value=\"2\"><span>After turning right, he moves east for 3 km.</span></li><li value=\"3\"><span>Another right turn makes him walk south for 5 km.</span></li><li value=\"4\"><span>Finally, he turns left, which makes him face east, and he walks 2 km.</span><br/><span>Thus, he ends up facing east.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60501,
      "question": "<p dir=\"ltr\"><span>A man is facing south. He turns 135\u00b0 clockwise and then 45\u00b0 counterclockwise. Which direction is he facing now?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>East</span></p>",
        "<p dir=\"ltr\"><span>West</span></p>",
        "<p dir=\"ltr\"><span>North-East</span></p>",
        "<p dir=\"ltr\"><span>South-East</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Facing south, a 135\u00b0 clockwise turn makes him face north-west.</span></li><li value=\"2\"><span>Turning 45\u00b0 counterclockwise from south-west brings him to wesr.</span><br/><span>Thus, he is now facing west.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60502,
      "question": "<p dir=\"ltr\"><span>Sita walks 6 km north, then turns left and walks 8 km, then turns left again and walks 6 km. How far is she from her starting point?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>6 km</span></p>",
        "<p dir=\"ltr\"><span>8 km</span></p>",
        "<p dir=\"ltr\"><span>10 km</span></p>",
        "<p dir=\"ltr\"><span>14 km</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Sita walks 6 km north, then turns left and walks 8 km west, and then turns left again to walk 6 km south, which brings her in line with her starting point horizontally.</span></li><li value=\"2\"><span>The distance from her starting point is the horizontal distance traveled, which is 8 km.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60503,
      "question": "<p dir=\"ltr\"><span>A person starts from point A and walks 10 km south. He then turns right and walks 10 km. He turns right again and walks 10 km. In which direction is he from point A now?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>North</span></p>",
        "<p dir=\"ltr\"><span>South</span></p>",
        "<p dir=\"ltr\"><span>East</span></p>",
        "<p dir=\"ltr\"><span>West</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>The person moves 10 km south, then turns right (west) for another 10 km, and then turns right again (north) for 10 km.</span></li><li value=\"2\"><span>Now, he is directly to the west of point A.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60504,
      "question": "<p dir=\"ltr\"><span>A man facing west turns 45\u00b0 clockwise, then 180\u00b0 counterclockwise, and finally 90\u00b0 clockwise. Which direction is he facing now?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>North East</span></p>",
        "<p dir=\"ltr\"><span>South West</span></p>",
        "<p dir=\"ltr\"><span>Nort West</span></p>",
        "<p dir=\"ltr\"><span>South East</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Starting west, a 45\u00b0 clockwise turn makes him face north-west.</span></li><li value=\"2\"><span>A 180\u00b0 counterclockwise turn takes him to south-east.</span></li><li value=\"3\"><span>Finally, a 90\u00b0 clockwise turn takes him to south-west.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60505,
      "question": "<p dir=\"ltr\"><span>Ravi travels 10 km north, then 6 km east, then 10 km south. How far is he from his starting point?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>4 km</span></p>",
        "<p dir=\"ltr\"><span>6 km</span></p>",
        "<p dir=\"ltr\"><span>10 km</span></p>",
        "<p dir=\"ltr\"><span>16 km</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Ravi moves 10 km north, then 6 km east, and then 10 km south, bringing him back to the same horizontal line as his starting point.</span></li><li value=\"2\"><span>The distance between his starting and ending points is the 6 km he moved east.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60506,
      "question": "<p dir=\"ltr\"><span>A man facing north turns 90\u00b0 right, then 180\u00b0 left, and finally 90\u00b0 right. Which direction is he facing now?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>North</span></p>",
        "<p dir=\"ltr\"><span>South</span></p>",
        "<p dir=\"ltr\"><span>East</span></p>",
        "<p dir=\"ltr\"><span>West</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Facing north, a 90\u00b0 right turn brings him east.</span></li><li value=\"2\"><span>A 180\u00b0 left turn takes him west.</span></li><li value=\"3\"><span>Finally, a 90\u00b0 right turn brings him to North.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60507,
      "question": "<p dir=\"ltr\"><span>A person moves 4 km north, then turns right and moves 5 km, then turns right again and moves 4 km. How far is he from his starting point?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>3 km</span></p>",
        "<p dir=\"ltr\"><span>4 km</span></p>",
        "<p dir=\"ltr\"><span>5 km</span></p>",
        "<p dir=\"ltr\"><span>9 km</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>The person moves 4 km north, then 5 km east, and finally 4 km south, which aligns him horizontally with his starting point.</span></li><li value=\"2\"><span>The distance from the starting point is 5 km east.</span></li></ul>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60508,
      "question": "<p dir=\"ltr\"><span>A woman facing east turns 270\u00b0 counterclockwise. Which direction is she facing now?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>North</span></p>",
        "<p dir=\"ltr\"><span>South</span></p>",
        "<p dir=\"ltr\"><span>West</span></p>",
        "<p dir=\"ltr\"><span>East</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A 270\u00b0 counterclockwise turn from east moves her through north, west, and finally to south.</span></p>",
      "tag": "Directions || MCQ"
    },
    {
      "id": 60509,
      "question": "<p dir=\"ltr\"><span>A person facing south turns left, walks 10 meters, then turns left again, and walks 15 meters. Then he turns right and walks 10 meters. In which direction is he now?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>North</span></p>",
        "<p dir=\"ltr\"><span>South</span></p>",
        "<p dir=\"ltr\"><span>East</span></p>",
        "<p dir=\"ltr\"><span>West</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Facing south, turning left takes him east for 10 meters.</span></li><li value=\"2\"><span>Turning left again takes him north for 15 meters.</span></li><li value=\"3\"><span>A final right turn takes him east.</span><br/><span>Thus, he is now facing </span><b><strong>east</strong></b><span>.</span></li></ul>",
      "tag": "Directions || MCQ"
    }
  ],
  "Statement and Argument": [
    {
      "id": 60510,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should women be given reservation in Parliament?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. It will ensure equal representation of women in policymaking.</span></li><li value=\"2\"><span>No. It will lead to an imbalance in gender representation in the long term.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Equal representation in policymaking is a valid reason to support the reservation of women. Argument II is weak as it assumes an imbalance without providing concrete reasoning.</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60511,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should voting be made compulsory in India?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. It will ensure that every citizen exercises their right to vote and participate in democracy.</span></li><li value=\"2\"><span>No. Forcing people to vote will violate their personal freedom.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I supports the democratic principle of participation, while Argument II raises a valid concern about individual freedom, making both arguments strong.</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60512,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should mobile phones be banned in schools?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. Mobile phones distract students from studies and promote indiscipline.</span></li><li value=\"2\"><span>No. Mobile phones are a necessity in emergencies and for staying connected with parents.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I highlights the adverse impact of phones on discipline and studies, while Argument II provides a practical justification for their presence.</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60513,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should junk food advertisements be banned during children\u2019s TV programs?</span><br/><b><strong>Arguments:</strong></b></p><ul><li value=\"1\"><b><strong>Yes.</strong></b><span> Such ads influence children to make unhealthy food choices.</span></li><li value=\"2\"><b><strong>No.</strong></b><span> Advertising is essential for business growth.</span></li></ul>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Children are highly impressionable and can develop unhealthy eating habits due to such ads (strong). Business promotion is valid but doesn\u2019t outweigh the health risks to children (weak).</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60514,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should advertisements targeting children be banned?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. Children are impressionable and may be influenced negatively by advertisements.</span></li><li value=\"2\"><span>No. Advertisements are a form of free speech and an essential part of the economy.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I addresses the impact on children\u2019s behavior, while Argument II highlights the importance of advertisements in the economy and freedom of speech.</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60515,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should capital punishment be abolished?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. It is inhumane and violates human rights.</span></li><li value=\"2\"><span>No. It acts as a deterrent to serious crimes.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I is strong as it focuses on ethical concerns, while Argument II is valid as it highlights the role of deterrence in crime prevention.</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60516,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should plastic bags be completely banned?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. They cause significant harm to the environment and marine life.</span></li><li value=\"2\"><span>No. They are convenient for carrying goods and cheaper than alternatives.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I is strong as it focuses on environmental harm, while Argument II is weak because convenience does not justify environmental degradation.</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60517,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should the age of retirement be increased?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. People are living longer and can contribute productively for more years.</span></li><li value=\"2\"><span>No. It will reduce job opportunities for younger people.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I highlights the benefits of an extended productive period, while Argument II raises a valid concern about employment opportunities for youth.</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60518,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should examinations be abolished in schools?</span><br/><b><strong>Arguments:</strong></b></p><ul><li value=\"1\"><b><strong>Yes.</strong></b><span> They cause stress and anxiety among students.</span></li><li value=\"2\"><b><strong>No.</strong></b><span> They are necessary to evaluate students\u2019 learning and progress.</span></li></ul>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Evaluation is essential for tracking academic performance (strong). While stress is real, it can be managed without abolishing exams entirely (weak)</span></p>",
      "tag": "Statement and Argument || MCQ"
    },
    {
      "id": 60519,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should education be made free for all?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. Education is a fundamental right, and everyone deserves access to it.</span></li><li value=\"2\"><span>No. Free education puts a financial burden on the government.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I is strong as it emphasizes equal opportunity, while Argument II highlights a valid concern about government resources.</span></p>",
      "tag": "Statement and Argument || MCQ"
    }
  ],
  "Logical Deduction": [
    {
      "id": 60520,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: All birds are animals. Some animals are reptiles.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some birds are reptiles.</span><br><span>II. Some reptiles are animals.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Only conclusion II follow</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>From the statements, we know that some animals are reptiles. However, we do not know if any birds are reptiles, so only conclusion II follows</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60521,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: All fruits are foods. Some foods are vegetables.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. All fruits are vegetables.</span><br><span>II. Some foods are fruits.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>From the statements, we know that all fruits are foods, so some foods are indeed fruits. However, we do not have information to conclude that all fruits are vegetables.</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60522,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: Some flowers are roses. All roses are red.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some flowers are red.</span><br><span>II. All flowers are red.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since some flowers are roses and all roses are red, it follows that some flowers are red. However, we cannot conclude that all flowers are red.</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60523,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: All pencils are pens. Some pens are erasers.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some pencils are erasers.</span><br><span>II. Some pens are pencils.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since all pencils are pens, some pens are indeed pencils. However, there is no indication that any pencils are erasers</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60524,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: Some plants are trees. All trees are green.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some plants are green.</span><br><span>II. All plants are green.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span> Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since some plants are trees and all trees are green, it follows that some plants are green. There is no information to conclude that all plants are green</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60525,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: All dancers are artists. Some artists are musicians.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some dancers are musicians.</span><br><span>II. Some musicians are artists.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>We only know that some artists are musicians, and all dancers are artists. This does not imply any dancers are musicians, but it does imply that some musicians are artists.</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60526,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: All dogs are pets. No pets are wild animals.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. No dogs are wild animals.</span><br><span>II. Some dogs are wild animals</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since all dogs are pets and no pets are wild animals, it follows that no dogs are wild animals.</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60527,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: Some books are novels. All novels are fiction.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some books are fiction.</span><br><span>II. Some fiction is novels.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span> Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span> Both I and II follow</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since some books are novels and all novels are fiction, it follows that some books are fiction and some fiction is novels.</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60528,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: No vehicles are airplanes. All airplanes are fast.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some vehicles are fast.</span><br><span>II. No vehicles are fast.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span> Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follows</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>There is no information about whether vehicles are fast or not, so neither conclusion follows.</span></p>",
      "tag": "Logical Deduction || MCQ"
    },
    {
      "id": 60529,
      "question": "<p dir=\"ltr\"><b><strong>Statements</strong></b><span>: Some teachers are professors. All professors are educated.</span></p><p dir=\"ltr\"><b><strong>Conclusions</strong></b><span>:</span><br><span>I. Some teachers are educated.</span><br><span>II. All teachers are educated.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Only conclusion I follows</span></p>",
        "<p dir=\"ltr\"><span>Only conclusion II follows</span></p>",
        "<p dir=\"ltr\"><span> Neither I nor II follows</span></p>",
        "<p dir=\"ltr\"><span>Both I and II follow</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Since some teachers are professors and all professors are educated, it follows that some teachers are educated. However, we cannot conclude that all teachers are educated.</span></p>",
      "tag": "Logical Deduction || MCQ"
    }
  ],
  "Letter Series": [
    {
      "id": 60530,
      "question": "<p dir=\"ltr\"><span>CDE, EFG, GHI, ___, KLM</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>HIJ</span></p>",
        "<p dir=\"ltr\"><span>IJK</span></p>",
        "<p dir=\"ltr\"><span>JKL</span></p>",
        "<p dir=\"ltr\"><span>LNO</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Each group of letters progresses by moving forward two positions in the alphabet for the first letter. For example:</span><br/><span>C \u2192 E \u2192 G \u2192 I \u2192 K.</span><br/><span>D \u2192 F \u2192 H \u2192 J \u2192 L.</span><br/><span>E \u2192 G \u2192 I \u2192 K \u2192 M.</span><br/><span>Thus, the missing term is IJK.</span></p>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60531,
      "question": "<p dir=\"ltr\"><span>BDF, CGH, DJJ, ___, FPN</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>EMN</span></p>",
        "<p dir=\"ltr\"><span>ENP</span></p>",
        "<p dir=\"ltr\"><span>EML</span></p>",
        "<p dir=\"ltr\"><span>ENR</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The pattern progresses with each letter moving forward incrementally in the alphabet:</span><br/><span>B \u2192 C \u2192 D \u2192 E \u2192 F</span><br/><span>D \u2192 G \u2192 J \u2192 M \u2192 P</span><br/><span>F \u2192 H \u2192 J \u2192 L \u2192 N</span><br/><span>The missing term is EML.</span></p>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60532,
      "question": "<p dir=\"ltr\"><span>ACE, BDF, CEG, ___, EGI</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>DFH</span></p>",
        "<p dir=\"ltr\"><span>HLN</span></p>",
        "<p dir=\"ltr\"><span>ILP</span></p>",
        "<p dir=\"ltr\"><span>INP</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Each letter series progresses by skipping letters in the alphabet. For example:</span></p><ul><li value=\"1\"><span>A,C,E (skipping 1 letter each: B, D),</span></li><li value=\"2\"><span>B,D,F(skipping 1 letter each: C, E),</span></li><li value=\"3\"><span>C,E,G (skipping 1 letter each: D, F).</span></li></ul>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60533,
      "question": "<p dir=\"ltr\"><span>AZ, BY, CX, ___</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>DW</span></p>",
        "<p dir=\"ltr\"><span>EW</span></p>",
        "<p dir=\"ltr\"><span>DY</span></p>",
        "<p dir=\"ltr\"><span>EX</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The first letters move forward alphabetically: A \u2192 B \u2192 C \u2192 D, while the second letters move backward: Z \u2192 Y \u2192 X \u2192 W. The next pair is DW.</span></p>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60534,
      "question": "<p dir=\"ltr\"><span>ACEG, BDFH, CEGI, ___ </span></p>",
      "options": [
        "<p dir=\"ltr\"><span>DFHJ</span></p>",
        "<p dir=\"ltr\"><span>DFHK</span></p>",
        "<p dir=\"ltr\"><span>DEHK</span></p>",
        "<p dir=\"ltr\"><span>DFKL</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The pattern involves each letter moving forward by one places in the alphabet:</span></p><p dir=\"ltr\"><span>A,C,E,G \u2192 B,D,F,H \u2192 C,E,G,I \u2192 D,F,H,J.</span></p><p dir=\"ltr\"><span>Thus, the missing group is DFHJ.</span></p>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60535,
      "question": "<p dir=\"ltr\"><span>DFH, GIK, JLN, ___</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>MOQ</span></p>",
        "<p dir=\"ltr\"><span>MNP</span></p>",
        "<p dir=\"ltr\"><span>LNO</span></p>",
        "<p dir=\"ltr\"><span>PRS</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Each letter moves forward three positions in the alphabet:</span></p><ul><li value=\"1\"><span>D \u2192 G \u2192 J \u2192 M</span></li><li value=\"2\"><span>F \u2192 I \u2192 L \u2192 O</span></li><li value=\"3\"><span>H \u2192 K \u2192 N \u2192 Q</span><br/><span>Thus, the missing group is MOQ.</span></li></ul>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60536,
      "question": "<p dir=\"ltr\"><span>KLM, NOP, QRS, ___</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>TVU</span></p>",
        "<p dir=\"ltr\"><span>TUV</span></p>",
        "<p dir=\"ltr\"><span>STU</span></p>",
        "<p dir=\"ltr\"><span>WXY</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Each letter progresses forward by three positions in the alphabet:</span></p><ul><li value=\"1\"><span>K \u2192 N \u2192 Q \u2192 T</span></li><li value=\"2\"><span>L \u2192 O \u2192 R \u2192 U</span></li><li value=\"3\"><span>M \u2192 P \u2192 S \u2192 V</span><br/><span>Thus, the missing term is TUV.</span></li></ul>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60537,
      "question": "<p dir=\"ltr\"><span>OPQ, STU, WXY, ___</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ABC</span></p>",
        "<p dir=\"ltr\"><span>ZAC</span></p>",
        "<p dir=\"ltr\"><span>YZA</span></p>",
        "<p dir=\"ltr\"><span>CDE</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Each letter group progresses by skipping three letters:</span></p><ul><li value=\"1\"><span>O \u2192 S \u2192 W \u2192 A</span></li><li value=\"2\"><span>P \u2192 T \u2192 X \u2192 B</span></li><li value=\"3\"><span>Q \u2192 U \u2192 Y \u2192 C</span></li></ul><p dir=\"ltr\"><span>The next group is </span><b><strong>ABC.</strong></b></p>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60538,
      "question": "<p dir=\"ltr\"><span>ABF, CDE, EFD, ___</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>JKL</span></p>",
        "<p dir=\"ltr\"><span>GHE</span></p>",
        "<p dir=\"ltr\"><span>HJK</span></p>",
        "<p dir=\"ltr\"><span>GHC</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The first two letters move two positions, AB -&gt; CD -&gt; EF -&gt; GH</span></p><p dir=\"ltr\"><span>The third letter moves 1 position backward, F -&gt; E -&gt; D -&gt; C</span></p>",
      "tag": "Letter Series || MCQ"
    },
    {
      "id": 60539,
      "question": "<p dir=\"ltr\"><span>ACEG, BDFH, CEGI, ___</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>D,E,F,G</span></p>",
        "<p dir=\"ltr\"><span>D,F,H,I</span></p>",
        "<p dir=\"ltr\"><span>D,F,H,J </span></p>",
        "<p dir=\"ltr\"><span>E,F,G,H</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The pattern involves shifting each letter forward incrementally:</span></p><p dir=\"ltr\"><span>A -&gt; B -&gt; C -&gt; D</span><br><span>C -&gt; D -&gt; E -&gt; F</span><br><span>E -&gt; F -&gt; G -&gt; H</span><br><span>G -&gt; H -&gt; I -&gt; J</span></p>",
      "tag": "Letter Series || MCQ"
    }
  ],
  "Coding Decoding": [
    {
      "id": 60540,
      "question": "<p dir=\"ltr\"><span>In a certain code language, the word \"MATH\" is written as 131208. How will \"SCIENCE\" be written in that code?</span></p>",
      "options": [
        "<p><span>193951435</span></p>",
        "<p><span>193951635</span></p>",
        "<p><span>193951436</span></p>",
        "<p><span>193951445</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In this code, each letter is replaced by its position in the alphabet. For example, M (13th letter) , A (1st letter) etc. </span><br/><span>Using the same approach, the word \"SCIENCE\" will be encoded as:</span></p><ul><li value=\"1\"><span>S (19th letter) </span></li><li value=\"2\"><span>C (3rd letter)</span></li><li value=\"3\"><span>I (9th letter) </span></li><li value=\"4\"><span>E (5th letter) </span></li><li value=\"5\"><span>N (14th letter)</span></li><li value=\"6\"><span>C (3rd letter)</span></li><li value=\"7\"><span>E (5th letter)</span></li></ul><p dir=\"ltr\"><span>The code for \"SCIENCE\" is 193951435</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60541,
      "question": "<p dir=\"ltr\"><span> If in a code, the word \"COMPUTER\" is written as \"DPNQVUFS,\" how is the word \"KEYBOARD\" written in that code?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>LFZCPBES</span></p>",
        "<p dir=\"ltr\"><span>LFZPCBSE</span></p>",
        "<p dir=\"ltr\"><span>LFZCPBSE</span></p>",
        "<p dir=\"ltr\"><span>LFZCNBSE</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Each letter in \"COMPUTER\" is shifted one position forward in the alphabet:</span></p><ul><li value=\"1\"><span>C \u2192 D, O \u2192 P, M \u2192 N, P \u2192 Q, U \u2192 V, T \u2192 U, E \u2192 F, R \u2192 S</span></li></ul><p dir=\"ltr\"><span>Applying the same shift to \"KEYBOARD\":</span></p><ul><li value=\"1\"><span>K \u2192 L, E \u2192 F, Y \u2192 Z, B \u2192 C, O \u2192 P, A \u2192 B, R \u2192 S, D \u2192 E</span></li></ul><p dir=\"ltr\"><span>Answer: The code for \"KEYBOARD\" is LFZCPBSE</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60542,
      "question": "<p dir=\"ltr\"><span>If 4 * 5 = 42, 6 * 3 = 38, and 7 * 8 = 114, find the value of 9 * 6</span></p>",
      "options": [
        "<p><span>116</span></p>",
        "<p><span>118</span></p>",
        "<p><span>110</span></p>",
        "<p><span>115</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>4 * 5 = 42 { 2[ (4 \u00d7 5) + 1] = 42}</span><br><span>6 * 3 = 38 { 2[ (6 \u00d7 3) + 1] = 38}</span><br><span>7 * 8 = 114 { 2[ (7 \u00d7 8) + 1] = 114}</span><br><span>So, 9 * 6 = { 2[ (9 \u00d7 6) + 1] = 110} = 110</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60543,
      "question": "<p dir=\"ltr\"><span>In a code language, 2345 means \"DEAR,\" 9876 means \"LOVE,\" and 5342 means \"READ.\" What does 6798 mean in that code?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>EOLV</span></p>",
        "<p dir=\"ltr\"><span>VELO</span></p>",
        "<p dir=\"ltr\"><span>OLEV</span></p>",
        "<p dir=\"ltr\"><span>EVLO</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Mapping Digits to Letters: By observing each code, we can map the digits to letters as follows:</span></p><ul><li value=\"1\"><span>2 appears in \"2345\" (which is \"DEAR\") and \"5423\" (which is \"READ\"). This suggests 2 = D.</span></li><li value=\"2\"><span>3 appears in \"2345\" (which is \"DEAR\") and \"5423\" (which is \"READ\"). This suggests 3 = E.</span></li><li value=\"3\"><span>4 appears in \"2345\" (which is \"DEAR\") and \"5423\" (which is \"READ\"). This suggests 4 = A.</span></li><li value=\"4\"><span>5 appears in \"2345\" (which is \"DEAR\") and \"5423\" (which is \"READ\"). This suggests 5 = R.</span></li><li value=\"5\"><span>9 appears in \"9876\" (which is \"LOVE\"). This suggests 9 = L.</span></li><li value=\"6\"><span>8 appears in \"9876\" (which is \"LOVE\"). This suggests 8 = O.</span></li><li value=\"7\"><span>7 appears in \"9876\" (which is \"LOVE\"). This suggests 7 = V.</span></li><li value=\"8\"><span>6 appears in \"9876\" (which is \"LOVE\"). This suggests 6 = E</span></li></ul><p dir=\"ltr\"><span>Summarizing the Mappings: Now we have these digit-to-letter mappings:</span></p><ul><li value=\"1\"><span>2 = D</span></li><li value=\"2\"><span>3 = E</span></li><li value=\"3\"><span>4 = A</span></li><li value=\"4\"><span>5 = R</span></li><li value=\"5\"><span>9 = L</span></li><li value=\"6\"><span>8 = O</span></li><li value=\"7\"><span>7 = V</span></li><li value=\"8\"><span>6 = E</span></li></ul><p dir=\"ltr\"><span>Decoding \"6798\": Using these mappings:</span></p><ul><li value=\"1\"><span>6 corresponds to E</span></li><li value=\"2\"><span>7 corresponds to V</span></li><li value=\"3\"><span>9 corresponds to L</span></li><li value=\"4\"><span>8 corresponds to O</span></li></ul><p dir=\"ltr\"><span>So, 6798 translates to \"EVLO\"</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60544,
      "question": "<p dir=\"ltr\"><span>In a certain code, \"A # B\" means \"A is 2 more than B,\" \"A @ B\" means \"A is half of B,\" and \"A $ B\" means \"A is the square of B.\" </span></p><p dir=\"ltr\"><span>If 5 # 3 and 4 $ 2 are true, what is the result of 16 @ 8?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>TRUE</span></p>",
        "<p dir=\"ltr\"><span>FALSE</span></p>",
        "<p dir=\"ltr\"><span>insufficient data</span></p>",
        "<p dir=\"ltr\"><span>none of these</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"A @ B\" means \"A is half of B</span><br><span>Therefore, 16 @ 8 isn't true </span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60545,
      "question": "<p dir=\"ltr\"><span>If the word \"SMART\" is coded as 191311820, find the code for the word \"BRAIN\"</span></p>",
      "options": [
        "<p><span>2191814</span></p>",
        "<p><span>2182914</span></p>",
        "<p><span>2181419</span></p>",
        "<p><span>2181914</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Positions of Letters in the Alphabet:</span></p><ul><li value=\"1\"><span>S is the 19th letter.</span></li><li value=\"2\"><span>M is the 13th letter.</span></li><li value=\"3\"><span>A is the 1st letter.</span></li><li value=\"4\"><span>R is the 18th letter.</span></li><li value=\"5\"><span>T is the 20th letter.</span></li></ul><p dir=\"ltr\"><span>Constructing the Code: S (19), M (13), A (1), R (18), and T (20)</span><br/><span>Concatenating the numbers 19, 13, 1, 18, and 20 gives us 191311820.</span></p><p dir=\"ltr\"><span>Positions of Letters in \"BRAIN\":</span></p><ul><li value=\"1\"><span>B is the 2nd letter.</span></li><li value=\"2\"><span>R is the 18th letter.</span></li><li value=\"3\"><span>A is the 1st letter.</span></li><li value=\"4\"><span>I is the 9th letter.</span></li><li value=\"5\"><span>N is the 14th letter.</span></li></ul><p dir=\"ltr\"><span>Concatenating these values gives 2181914</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60546,
      "question": "<p dir=\"ltr\"><span>If \"57\" is coded as \"18\" and \"96\" as \"27,\" then what is the code for \"82\"?</span></p>",
      "options": [
        "<p><span>54</span></p>",
        "<p><span>36</span></p>",
        "<p><span>40</span></p>",
        "<p><span>35</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>According to the given code, a new number is created by interchanging the digits of the original number and then subtracting the result from the original number. Apply this same rule to find the code for 82.</span></p><p dir=\"ltr\"><span>57 \u21d2 |57 - 75| = 18</span><br><span>96 \u21d2 |96 - 69| = 27</span><br><span>so, 82 \u21d2 |82 - 28| =54</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60547,
      "question": "<p dir=\"ltr\"><span>If \"CAT\" is coded as 3120 and \"DOG\" as 4157, find the code for \"FOX\".</span></p>",
      "options": [
        "<p><span>6154</span></p>",
        "<p><span>6524</span></p>",
        "<p><span>61525</span></p>",
        "<p><span>61524</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> Observe the pattern that converts letters to numbers by their alphabetical positions and apply it to \"FOX\"</span></p><ul><li value=\"1\"><span>C = 3 (position)</span></li><li value=\"2\"><span>A = 1 (position)</span></li><li value=\"3\"><span>T = 20 (position)</span></li></ul><p dir=\"ltr\"><span>so, CAT is 3120</span><br><span>similarly, DOG is 4157</span><br><span>and FOX is 61524</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60548,
      "question": "<p dir=\"ltr\"><span>In a certain code, If \"HELLO\" is coded as \"JGNNQ\" how would \"WORLD\" be coded?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>YQTFN</span></p>",
        "<p dir=\"ltr\"><span>YQNFT</span></p>",
        "<p dir=\"ltr\"><span>YTQNF</span></p>",
        "<p dir=\"ltr\"><span>YQTNF</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Each letter in \"HELLO\" is shifted forward by 2 positions Shift each letter in \"WORLD\" forward by 2 positions in the alphabet </span><br><span>we get, \"YQTNF\"</span></p>",
      "tag": "Coding Decoding || MCQ"
    },
    {
      "id": 60549,
      "question": "<p dir=\"ltr\"><span>If 3 &amp; 4 = 10, 5 &amp; 6 = 16, and 2 &amp; 8 = 12, what is the value of 7 &amp; 5?</span></p>",
      "options": [
        "<p><span>14</span></p>",
        "<p><span>17</span></p>",
        "<p><span>19</span></p>",
        "<p><span>15</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>3 &amp; 4 = 10 [ 2(3) + 4 ]</span><br><span>5 &amp; 6 = 16 [ 2(5) + 6 ]</span><br><span>2 &amp; 8 = 12 [ 2(2) + 8 ]</span><br><span>So, 7 &amp; 5 = 2(7) + 5 = 19 </span></p>",
      "tag": "Coding Decoding || MCQ"
    }
  ],
  "Statement and Assumptions": [
    {
      "id": 60550,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should women be given reservation in Parliament?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. It will ensure equal representation of women in policymaking.</span></li><li value=\"2\"><span>No. It will lead to an imbalance in gender representation in the long term.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Equal representation in policymaking is a valid reason to support the reservation of women. Argument II is weak as it assumes an imbalance without providing concrete reasoning.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60551,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should voting be made compulsory in India?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. It will ensure that every citizen exercises their right to vote and participate in democracy.</span></li><li value=\"2\"><span>No. Forcing people to vote will violate their personal freedom.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I supports the democratic principle of participation, while Argument II raises a valid concern about individual freedom, making both arguments strong.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60552,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should mobile phones be banned in schools?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. Mobile phones distract students from studies and promote indiscipline.</span></li><li value=\"2\"><span>No. Mobile phones are a necessity in emergencies and for staying connected with parents.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I highlights the adverse impact of phones on discipline and studies, while Argument II provides a practical justification for their presence.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60553,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should junk food advertisements be banned during children\u2019s TV programs?</span><br/><b><strong>Arguments:</strong></b></p><ul><li value=\"1\"><b><strong>Yes.</strong></b><span> Such ads influence children to make unhealthy food choices.</span></li><li value=\"2\"><b><strong>No.</strong></b><span> Advertising is essential for business growth.</span></li></ul>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Children are highly impressionable and can develop unhealthy eating habits due to such ads (strong). Business promotion is valid but doesn\u2019t outweigh the health risks to children (weak).</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60554,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should advertisements targeting children be banned?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. Children are impressionable and may be influenced negatively by advertisements.</span></li><li value=\"2\"><span>No. Advertisements are a form of free speech and an essential part of the economy.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I addresses the impact on children\u2019s behavior, while Argument II highlights the importance of advertisements in the economy and freedom of speech.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60555,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should capital punishment be abolished?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. It is inhumane and violates human rights.</span></li><li value=\"2\"><span>No. It acts as a deterrent to serious crimes.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I is strong as it focuses on ethical concerns, while Argument II is valid as it highlights the role of deterrence in crime prevention.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60556,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should plastic bags be completely banned?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. They cause significant harm to the environment and marine life.</span></li><li value=\"2\"><span>No. They are convenient for carrying goods and cheaper than alternatives.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I is strong as it focuses on environmental harm, while Argument II is weak because convenience does not justify environmental degradation.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60557,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should the age of retirement be increased?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. People are living longer and can contribute productively for more years.</span></li><li value=\"2\"><span>No. It will reduce job opportunities for younger people.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I highlights the benefits of an extended productive period, while Argument II raises a valid concern about employment opportunities for youth.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60558,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should examinations be abolished in schools?</span><br/><b><strong>Arguments:</strong></b></p><ul><li value=\"1\"><b><strong>Yes.</strong></b><span> They cause stress and anxiety among students.</span></li><li value=\"2\"><b><strong>No.</strong></b><span> They are necessary to evaluate students\u2019 learning and progress.</span></li></ul>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Evaluation is essential for tracking academic performance (strong). While stress is real, it can be managed without abolishing exams entirely (weak)</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    },
    {
      "id": 60559,
      "question": "<p dir=\"ltr\"><b><strong>Statement:</strong></b><span> Should education be made free for all?</span></p><p dir=\"ltr\"><b><strong>Arguments:</strong></b></p><ol><li value=\"1\"><span>Yes. Education is a fundamental right, and everyone deserves access to it.</span></li><li value=\"2\"><span>No. Free education puts a financial burden on the government.</span></li></ol>",
      "options": [
        "<p dir=\"ltr\"><span>Only argument I is strong</span></p>",
        "<p dir=\"ltr\"><span>Only argument II is strong</span></p>",
        "<p dir=\"ltr\"><span>Either I or II is strong</span></p>",
        "<p dir=\"ltr\"><span>Neither I nor II is strong</span></p>",
        "<p dir=\"ltr\"><span>Both I and II are strong</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Argument I is strong as it emphasizes equal opportunity, while Argument II highlights a valid concern about government resources.</span></p>",
      "tag": "Statement and Assumptions || MCQ"
    }
  ],
  "Logical Venn Diagram": [
    {
      "id": 60560,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relationship between Teachers, Men, and Women?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121111917038240/venn---------diagrams---------1.webp\" alt=\"venn---------diagrams---------1\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121111917038240/venn---------diagrams---------1.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121111917038240/venn---------diagrams---------1-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121111917038240/venn---------diagrams---------1-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121111917038240/venn---------diagrams---------1-300.webp 300w\"><figcaption> </figcaption></figure>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Men and Women are different from each other but some men may be teachers and some women may be teachers.</span></p>",
      "tag": "Logical Venn Diagram || MCQ"
    },
    {
      "id": 60561,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relation between Mammals, Cows, and bats?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112050044448/venn---------diagrams---------2.webp\" alt=\"venn---------diagrams---------2\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112050044448/venn---------diagrams---------2.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112050044448/venn---------diagrams---------2-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112050044448/venn---------diagrams---------2-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112050044448/venn---------diagrams---------2-300.webp 300w\"><figcaption> </figcaption></figure><p><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Cows and Bats are different from each other but both are mammals.</span></p>",
      "tag": "Logical Venn Diagram || MCQ"
    },
    {
      "id": 60562,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relation between the Author, Lawyer, and Singer?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112454525169/venn---------diagrams---------3.webp\" alt=\"venn---------diagrams---------3\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112454525169/venn---------diagrams---------3.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112454525169/venn---------diagrams---------3-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112454525169/venn---------diagrams---------3-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112454525169/venn---------diagrams---------3-300.webp 300w\"><figcaption> </figcaption></figure><p><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>All three are different professions.</span></p>",
      "tag": "Logical Venn Diagram || MCQ"
    },
    {
      "id": 60563,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relationship between Professors, Doctors, and Men?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112553890272/venn---------diagrams---------4.webp\" alt=\"venn---------diagrams---------4\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112553890272/venn---------diagrams---------4.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112553890272/venn---------diagrams---------4-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112553890272/venn---------diagrams---------4-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112553890272/venn---------diagrams---------4-300.webp 300w\"><figcaption> </figcaption></figure>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>Some doctors may be professors and vice-versa.</span></li><li value=\"2\"><span>Some professors may be men and vice-versa.</span></li><li value=\"3\"><span>Some doctors may be men and vice-versa.</span></li><li value=\"4\"><span>Some doctors may be men and professors as well.</span></li></ul>",
      "tag": "Logical Venn Diagram || MCQ"
    },
    {
      "id": 60564,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relation between Parents, Mother, and Father?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112641842734/venn---------diagrams---------5.webp\" alt=\"venn---------diagrams---------5\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112641842734/venn---------diagrams---------5.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112641842734/venn---------diagrams---------5-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112641842734/venn---------diagrams---------5-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112641842734/venn---------diagrams---------5-300.webp 300w\"><figcaption> </figcaption></figure><p><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Father and mother are parents but father and mother are two opposite sexes.</span></p>",
      "tag": "Logical Venn Diagram || MCQ"
    },
    {
      "id": 60565,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relation between the Moon, Sun, and Earth?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112808520902/venn---------diagrams---------6.webp\" alt=\"venn---------diagrams---------6\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112808520902/venn---------diagrams---------6.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112808520902/venn---------diagrams---------6-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112808520902/venn---------diagrams---------6-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112808520902/venn---------diagrams---------6-300.webp 300w\"><figcaption> </figcaption></figure>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>All three are different from each other</span></p>",
      "tag": "Logical Venn Diagram || MCQ"
    },
    {
      "id": 60566,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relation between Asia, India, and the World?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112849984212/venn---------diagrams---------7.webp\" alt=\"venn---------diagrams---------7\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112849984212/venn---------diagrams---------7.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112849984212/venn---------diagrams---------7-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112849984212/venn---------diagrams---------7-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112849984212/venn---------diagrams---------7-300.webp 300w\"><figcaption> </figcaption></figure>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>India is in Asia and Asia is in the World.</span></p>",
      "tag": "Logical Venn Diagram || MCQ"
    },
    {
      "id": 60567,
      "question": "<p dir=\"ltr\"><span>Which of the following diagrams indicates the best relation between Furniture, Sofas, and Chairs?</span></p><figure class=\"image\"><img src=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112929145687/venn---------diagrams---------8.webp\" alt=\"venn---------diagrams---------8\" width=\"400\" height=\"400\" srcset=\"https://media.geeksforgeeks.org/wp-content/uploads/20241121112929145687/venn---------diagrams---------8.webp 400w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112929145687/venn---------diagrams---------8-100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112929145687/venn---------diagrams---------8-200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20241121112929145687/venn---------diagrams---------8-300.webp 300w\"><figcaption> </figcaption></figure>",
      "options": [
        "<p dir=\"ltr\"><span>A</span></p>",
        "<p dir=\"ltr\"><span>B</span></p>",
        "<p dir=\"ltr\"><span>C</span></p>",
        "<p dir=\"ltr\"><span>D</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Sofas and Chairs are both furniture but no sofa is a chair.</span></p>",
      "tag": "Logical Venn Diagram || MCQ"
    }
  ],
  "Spotting Errors": [
    {
      "id": 60568,
      "question": "<p dir=\"ltr\"><span>If there is an error, it will be found in one specific part of the sentence. Choose the letter corresponding to the part that contains the error.</span></p><p dir=\"ltr\"><span>If there is no error, select option 'D'.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>According to ancient wisdom</span></p>",
        "<p dir=\"ltr\"><span>it is kind and generous</span></p>",
        "<p dir=\"ltr\"><span>who shall win universal respect.</span></p>",
        "<p dir=\"ltr\"><span>No error</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sentence should read:</span></p><p dir=\"ltr\"><span>it is the kind and the generous</span></p><p dir=\"ltr\"><span>Articles (\"the\") are needed before \"kind\" and \"generous\" to make the sentence grammatically correct.</span></p>",
      "tag": "Spotting Errors || MCQ"
    },
    {
      "id": 60569,
      "question": "<p dir=\"ltr\"><span>Read each sentence carefully to identify if there is any grammatical error.</span></p><p dir=\"ltr\"><span>If there is an error, it will be found in one specific part of the sentence. Choose the letter corresponding to the part that contains the error.</span></p><p dir=\"ltr\"><span>If there is no error, select option 'D'.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The information you</span></p>",
        "<p dir=\"ltr\"><span>requested are not</span></p>",
        "<p dir=\"ltr\"><span>readily available.</span></p>",
        "<p dir=\"ltr\"><span>No error</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sentence should read:</span></p><p dir=\"ltr\"><span>\"The information you requested is not readily available.\"</span></p><p dir=\"ltr\"><span>Since \"information\" is an uncountable noun and treated as singular, the verb should be \"is\" instead of \"are\".</span></p>",
      "tag": "Spotting Errors || MCQ"
    }
  ],
  "Synonyms": [
    {
      "id": 60578,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span><br><span>PORTLY</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Skinny</span></p>",
        "<p dir=\"ltr\"><span>Stout</span></p>",
        "<p dir=\"ltr\"><span>Emaciated</span></p>",
        "<p dir=\"ltr\"><span>Slender</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Portly\" means somewhat fat or heavy in a dignified way.</span></p><p dir=\"ltr\"><span>Stout is the closest synonym, as it also refers to someone who is solidly or heavily built.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60579,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>CONCISE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Brief</span></p>",
        "<p dir=\"ltr\"><span>Extended</span></p>",
        "<p dir=\"ltr\"><span>Verbatim</span></p>",
        "<p dir=\"ltr\"><span>Lengthy</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Concise\" means giving information clearly and in a few words.</span></p><p dir=\"ltr\"><span>Brief also refers to something short and to the point.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60580,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>DEFRAUD</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Compensate</span></p>",
        "<p dir=\"ltr\"><span>Swindle</span></p>",
        "<p dir=\"ltr\"><span>Return</span></p>",
        "<p dir=\"ltr\"><span>Allocate</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Defraud\" means to cheat someone to gain an advantage or money.</span></p><p dir=\"ltr\"><span>Swindle is a synonym of \"defraud,\" as it also means to cheat or deceive someone.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60581,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>ORIFICE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Opening</span></p>",
        "<p dir=\"ltr\"><span>Closure</span></p>",
        "<p dir=\"ltr\"><span>Plug</span></p>",
        "<p dir=\"ltr\"><span>Blockage</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Orifice\" means an opening or hole, especially one in the body.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60582,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>STATELY</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Dignified</span></p>",
        "<p dir=\"ltr\"><span>Ridiculous</span></p>",
        "<p dir=\"ltr\"><span>Common</span></p>",
        "<p dir=\"ltr\"><span>Undignified</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Stately\" means having a dignified, majestic, and impressive manner.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60583,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>EUPHORIC</span></p><p dir=\"ltr\"><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>Sullen</span></p>",
        "<p dir=\"ltr\"><span>Depressed</span></p>",
        "<p dir=\"ltr\"><span>Elated</span></p>",
        "<p dir=\"ltr\"><span>Melancholic</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Euphoric\" means feeling intense excitement and happiness.</span></p><p dir=\"ltr\"><span>Elated is the closest synonym, as it also describes a state of great happiness or exhilaration.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60584,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>FREQUENT</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rare</span></p>",
        "<p dir=\"ltr\"><span>Often</span></p>",
        "<p dir=\"ltr\"><span>Seldom</span></p>",
        "<p dir=\"ltr\"><span>Infrequent</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Frequent\" means often or done many times at short intervals.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60585,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>DIVERGENT</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Parallel</span></p>",
        "<p dir=\"ltr\"><span>Convergent</span></p>",
        "<p dir=\"ltr\"><span>Different</span></p>",
        "<p dir=\"ltr\"><span>Similar</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Divergent\" means tending to be different or develop in different directions.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60586,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>FORTIFY</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Strengthen</span></p>",
        "<p dir=\"ltr\"><span>Weaken</span></p>",
        "<p dir=\"ltr\"><span>Undermine</span></p>",
        "<p dir=\"ltr\"><span>Debilitate</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Fortify\" means to strengthen a place or thing, physically or mentally.</span></p>",
      "tag": "Synonyms || MCQ"
    },
    {
      "id": 60587,
      "question": "<p dir=\"ltr\"><span>Choose the option that best expresses the meaning of the given word.</span></p><p dir=\"ltr\"><span>VIBRANT</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Drab</span></p>",
        "<p dir=\"ltr\"><span>Bright</span></p>",
        "<p dir=\"ltr\"><span>Unenergetic</span></p>",
        "<p dir=\"ltr\"><span>Dull</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Vibrant\" means full of energy and enthusiasm, or bright and striking in color.</span></p>",
      "tag": "Synonyms || MCQ"
    }
  ],
  "Antonyms": [
    {
      "id": 60588,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>ABATE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Weaken </span></p>",
        "<p dir=\"ltr\"><span>Subside</span></p>",
        "<p dir=\"ltr\"><span>Diminish</span></p>",
        "<p dir=\"ltr\"><span>Intensify</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Abate means to lessen, reduce, or decrease.</span></p><p dir=\"ltr\"><span>The exact opposite (antonym) is intensify, meaning to increase or strengthen.</span></p><p dir=\"ltr\"><span>Other options like weaken, subside, diminish are synonyms of abate, not antonyms.</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60589,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>FICKLE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Steady</span></p>",
        "<p dir=\"ltr\"><span>Changeable</span></p>",
        "<p dir=\"ltr\"><span>Unpredictable</span></p>",
        "<p dir=\"ltr\"><span>Random</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Fickle means changing frequently or being inconsistent.</span></p><p dir=\"ltr\"><span>The exact opposite (antonym) is steady, meaning constant or unchanging.</span></p><p dir=\"ltr\"><span>Other options like changeable, unpredictable, and random are similar in meaning to fickle, not opposite.</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60590,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>OBSCURE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Conceal</span></p>",
        "<p dir=\"ltr\"><span>Reveal</span></p>",
        "<p dir=\"ltr\"><span>Mask</span></p>",
        "<p dir=\"ltr\"><span>Cloud</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Obscure means to hide or make less visible. The opposite is reveal, which means to make visible or show clearly.</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60591,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>PERPETUAL</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Temporary</span></p>",
        "<p dir=\"ltr\"><span>Everlasting</span></p>",
        "<p dir=\"ltr\"><span>Endless</span></p>",
        "<p dir=\"ltr\"><span>Constant</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Perpetual means continuing forever or everlasting.</span></p><p dir=\"ltr\"><span>The exact antonym is temporary, meaning lasting for a limited time.</span></p><p dir=\"ltr\"><span>Other options like everlasting and constant are synonyms of perpetual, not antonyms.</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60592,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>SCRUPULOUS</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Meticulous </span></p>",
        "<p dir=\"ltr\"><span>Honest</span></p>",
        "<p dir=\"ltr\"><span>Careless</span></p>",
        "<p dir=\"ltr\"><span>Ethical</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Scrupulous means being very careful or ethical. The opposite is careless, meaning lacking attention or thoroughness.</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60593,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>PRUDENT</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Reckless</span></p>",
        "<p dir=\"ltr\"><span>Cautious</span></p>",
        "<p dir=\"ltr\"><span>Wise</span></p>",
        "<p dir=\"ltr\"><span>Thoughtful</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Prudent means showing care or caution, often in decision-making. The opposite is reckless, meaning lacking caution or care</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60594,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>AUDACIOUS</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Timid</span></p>",
        "<p dir=\"ltr\"><span>Bold</span></p>",
        "<p dir=\"ltr\"><span>Brave</span></p>",
        "<p dir=\"ltr\"><span>Daring</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Audacious means showing a willingness to take risks or be bold. The opposite is timid, meaning showing a lack of courage or confidence.</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60595,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>DOCILE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Submissive </span></p>",
        "<p dir=\"ltr\"><span>Compliant</span></p>",
        "<p dir=\"ltr\"><span>Obedient</span></p>",
        "<p dir=\"ltr\"><span>Defiant</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Docile means easily managed or obedient. The opposite is defiant, meaning resistant or challenging to authority</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60596,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>CONSOLIDATE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Disperse</span></p>",
        "<p dir=\"ltr\"><span>Strengthen</span></p>",
        "<p dir=\"ltr\"><span>Combine</span></p>",
        "<p dir=\"ltr\"><span>Merge</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Consolidate means to unite or bring together. The opposite is disperse, meaning to scatter or spread out.</span></p>",
      "tag": "Antonyms || MCQ"
    },
    {
      "id": 60597,
      "question": "<p dir=\"ltr\"><span>Select the word that has the exact OPPOSITE meaning of the given word.</span></p><p dir=\"ltr\"><span>INSOLENT</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Arrogant</span></p>",
        "<p dir=\"ltr\"><span> Respectful</span></p>",
        "<p dir=\"ltr\"><span>Rude</span></p>",
        "<p dir=\"ltr\"><span>Bold</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Insolent means showing a lack of respect or being rude. The opposite is respectful, meaning showing admiration or regard for others.</span></p>",
      "tag": "Antonyms || MCQ"
    }
  ],
  "Selecting Words": [
    {
      "id": 60598,
      "question": "<p dir=\"ltr\"><span>She has a strong passion ...... classical music.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>for</span></p>",
        "<p dir=\"ltr\"><span>with</span></p>",
        "<p dir=\"ltr\"><span>in</span></p>",
        "<p dir=\"ltr\"><span>by</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The correct phrase is \"passion for\" when expressing interest or enthusiasm toward something.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60599,
      "question": "<p dir=\"ltr\"><span>The child was so tired that he ...... asleep immediately.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>fell</span></p>",
        "<p dir=\"ltr\"><span>fall</span></p>",
        "<p dir=\"ltr\"><span>falls</span></p>",
        "<p dir=\"ltr\"><span>fallen</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Fell asleep\" is the correct past tense form of \"fall asleep,\" matching the sentence context.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60600,
      "question": "<p dir=\"ltr\"><span>He acted in a very ...... manner when dealing with the unexpected situation.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>polite</span></p>",
        "<p dir=\"ltr\"><span>sensible</span></p>",
        "<p dir=\"ltr\"><span>sensitive</span></p>",
        "<p dir=\"ltr\"><span>politely</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Sensible manner\" refers to acting with sound judgment, which best fits the context.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60601,
      "question": "<p dir=\"ltr\"><span> The company has introduced new measures to enhance ...... among its employees.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>productivity</span></p>",
        "<p dir=\"ltr\"><span>efficiency</span></p>",
        "<p dir=\"ltr\"><span>profitability</span></p>",
        "<p dir=\"ltr\"><span>punctuality</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Productivity refers to improving employee efficiency, which aligns with the company's goal.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60602,
      "question": "<p dir=\"ltr\"><span>The newly constructed bridge will ...... access to the remote areas.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>provide</span></p>",
        "<p dir=\"ltr\"><span>give</span></p>",
        "<p dir=\"ltr\"><span>offer</span></p>",
        "<p dir=\"ltr\"><span>allow</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Allow\"\u00a0is the best answer because a bridge\u00a0</span><i><em class=\"GFGEditorTheme__textItalic\">permits</em></i><span>\u00a0or\u00a0</span><i><em class=\"GFGEditorTheme__textItalic\">enables</em></i><span>\u00a0access that was previously blocked (e.g., by a river). \"Provide\" is also very common and correct, but \"allow\" more precisely captures the idea of removing a barrier.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60603,
      "question": "<p dir=\"ltr\"><span>The manager decided to ...... the meeting due to unforeseen circumstances.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>cancel</span></p>",
        "<p dir=\"ltr\"><span>postpone</span></p>",
        "<p dir=\"ltr\"><span>advance</span></p>",
        "<p dir=\"ltr\"><span>conduct</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Postpone means to delay or reschedule the meeting to a later time, which fits the context of adjusting plans due to unforeseen circumstances.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60604,
      "question": "<p dir=\"ltr\"><span>She carefully ...... the document before signing it.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>examined</span></p>",
        "<p dir=\"ltr\"><span>looked</span></p>",
        "<p dir=\"ltr\"><span>saw</span></p>",
        "<p dir=\"ltr\"><span>gazed</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Examined\" means to look at something carefully, which suits the action of reviewing a document.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60605,
      "question": "<p dir=\"ltr\"><span>The audience ...... wildly when the singer took the stage.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>clapped</span></p>",
        "<p dir=\"ltr\"><span>cheered</span></p>",
        "<p dir=\"ltr\"><span>shouted</span></p>",
        "<p dir=\"ltr\"><span>spoke</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Cheered wildly\" is appropriate when describing an enthusiastic reaction to a performer.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60606,
      "question": "<p dir=\"ltr\"><span>As the team leader, she must ...... the work of all team members.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>overlook</span></p>",
        "<p dir=\"ltr\"><span>supervise</span></p>",
        "<p dir=\"ltr\"><span>control</span></p>",
        "<p dir=\"ltr\"><span>command</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Supervise\" is the correct term meaning to oversee or manage work done by others.</span></p>",
      "tag": "Selecting Words || MCQ"
    },
    {
      "id": 60607,
      "question": "<p dir=\"ltr\"><span>Despite his busy schedule, he managed to ...... time for his family every evening.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>save</span></p>",
        "<p dir=\"ltr\"><span>allocate</span></p>",
        "<p dir=\"ltr\"><span>create</span></p>",
        "<p dir=\"ltr\"><span>manage</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Allocate time is the correct phrase, meaning to set aside or designate time specifically for a purpose, which fits the context of making time for family.</span></p>",
      "tag": "Selecting Words || MCQ"
    }
  ],
  "Spellings": [
    {
      "id": 60608,
      "question": "<p dir=\"ltr\"><span> Select the correctly spelled word:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Accomodate</span></p>",
        "<p dir=\"ltr\"><span>Acommodate</span></p>",
        "<p dir=\"ltr\"><span>Accommodate</span></p>",
        "<p dir=\"ltr\"><span>Acomodate</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Accommodate\" is the correctly spelled word from all of the above.</span></p>",
      "tag": "Spellings || MCQ"
    },
    {
      "id": 60609,
      "question": "<p dir=\"ltr\"><span>Select the correctly spelled word:</span></p><p dir=\"ltr\"><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>Embarras</span></p>",
        "<p dir=\"ltr\"><span>Embarrass</span></p>",
        "<p dir=\"ltr\"><span>Embarass</span></p>",
        "<p dir=\"ltr\"><span>Embaras</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Embarrass</span></p>",
      "tag": "Spellings || MCQ"
    },
    {
      "id": 60611,
      "question": "<p dir=\"ltr\"><span>Select the correctly spelled word:</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Definitely</span></p>",
        "<p dir=\"ltr\"><span>Definately</span></p>",
        "<p dir=\"ltr\"><span>Definitley</span></p>",
        "<p dir=\"ltr\"><span>Definetly</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Definitely\" is spelled correctly, rest are incorrect.</span></p>",
      "tag": "Spellings || MCQ"
    },
    {
      "id": 60613,
      "question": "<p dir=\"ltr\"><span>Identify the word with the incorrect spelling.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Achievement</span></p>",
        "<p dir=\"ltr\"><span>Acquaintance</span></p>",
        "<p dir=\"ltr\"><span>Descent</span></p>",
        "<p dir=\"ltr\"><span>Decieve</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\u201cDecieve\u201d is incorrectly spelled; the correct spelling is \u201cdeceive.\u201d </span></p>",
      "tag": "Spellings || MCQ"
    },
    {
      "id": 60614,
      "question": "<p dir=\"ltr\"><span>Identify the word with the incorrect spelling. The letter of that word is the answer. If all the words are spelled correctly, choose \"All Correct.\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Familiar</span></p>",
        "<p dir=\"ltr\"><span>Remembrance</span></p>",
        "<p dir=\"ltr\"><span>Privilege</span></p>",
        "<p dir=\"ltr\"><span>Recieve</span></p>",
        "<p dir=\"ltr\"><span>All correct</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Recieve\" is incorrect, it is spelled as \"Receive\".</span></p>",
      "tag": "Spellings || MCQ"
    }
  ],
  "Sentence Formation": [
    {
      "id": 60618,
      "question": "<p dir=\"ltr\"><span>1. of </span><br/><span>2. we</span><br/><span>3. heard</span><br/><span>4. him </span><br/><span>5. had</span></p>",
      "options": [
        "<p><span>42351</span></p>",
        "<p><span>52341</span></p>",
        "<p><span>25314</span></p>",
        "<p><span>25431</span></p>",
        "<p><span>25341</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"We had heard of him.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60619,
      "question": "<p dir=\"ltr\"><span>1. the </span><br><span>2. attended </span><br><span>3. she </span><br><span>4. conference </span><br><span>5. yesterday</span></p>",
      "options": [
        "<p><span>31524</span></p>",
        "<p><span>32145</span></p>",
        "<p><span>35124</span></p>",
        "<p><span>35214</span></p>",
        "<p><span>31452</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"She attended the conference yesterday.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60620,
      "question": "<p dir=\"ltr\"><span>1. the </span><br/><span>2. enjoyed </span><br/><span>3. children </span><br/><span>4. thoroughly </span><br/><span>5. game</span></p>",
      "options": [
        "<p><span>32154</span></p>",
        "<p><span>23145</span></p>",
        "<p><span>32415</span></p>",
        "<p><span>31245</span></p>",
        "<p><span>12345</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Children enjoyed the game thoroughly.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60621,
      "question": "<p dir=\"ltr\"><span>1. late </span><br/><span>2. sorry </span><br/><span>3. for </span><br/><span>4. being </span><br/><span>5. I am</span></p>",
      "options": [
        "<p><span>52134 </span></p>",
        "<p><span>53124</span></p>",
        "<p><span>52341</span></p>",
        "<p><span>52413</span></p>",
        "<p><span>51234</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"I am sorry for being late.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60622,
      "question": "<p dir=\"ltr\"><span>1. a </span><br/><span>2. he </span><br/><span>3. successful </span><br/><span>4. career </span><br/><span>5. built</span></p>",
      "options": [
        "<p><span> 25134</span></p>",
        "<p><span>23145</span></p>",
        "<p><span>24315</span></p>",
        "<p><span>24135</span></p>",
        "<p><span>21543</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"He built a successful career.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60623,
      "question": "<p dir=\"ltr\"><span>1. is </span><br><span>2. book </span><br><span>3. this </span><br><span>4. my </span><br><span>5. favorite</span></p>",
      "options": [
        "<p><span>31452</span></p>",
        "<p><span>43521</span></p>",
        "<p><span>34125</span></p>",
        "<p><span>51342</span></p>",
        "<p><span>35241</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"This is my favorite book.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60624,
      "question": "<p dir=\"ltr\"><span>1. the </span><br><span>2. the garden </span><br><span>3. flowers </span><br><span>4. are beautiful </span><br><span>5. in</span></p>",
      "options": [
        "<p><span> 24351</span></p>",
        "<p><span>34251</span></p>",
        "<p><span>51423</span></p>",
        "<p><span>13524</span></p>",
        "<p><span>25413</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The flowers in the garden are beautiful.</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60625,
      "question": "<p dir=\"ltr\"><span>1. read </span><br><span>2. wants </span><br><span>3. she </span><br><span>4. to </span><br><span>5. book</span><br><span>6. the</span></p>",
      "options": [
        "<p><span>123456</span></p>",
        "<p><span>324165</span></p>",
        "<p><span>324561</span></p>",
        "<p><span>325461</span></p>",
        "<p><span>321456</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"She wants to read the book.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60626,
      "question": "<p dir=\"ltr\"><span>1. enjoys </span><br/><span>2. he </span><br/><span>3. playing </span><br/><span>4. in </span><br/><span>5. park</span><br/><span>6. the</span></p>",
      "options": [
        "<p><span>213465</span></p>",
        "<p><span>123456</span></p>",
        "<p><span>213654</span></p>",
        "<p><span>213456</span></p>",
        "<p><span>321456</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"He enjoys playing in the park.\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    },
    {
      "id": 60627,
      "question": "<p dir=\"ltr\"><span>1. early </span><br/><span>2. wakes </span><br/><span>3. morning </span><br/><span>4. in </span><br/><span>5. the</span><br/><span>6. he</span></p>",
      "options": [
        "<p><span>621453</span></p>",
        "<p><span>624531</span></p>",
        "<p><span>621345</span></p>",
        "<p><span>123456</span></p>",
        "<p><span>145362</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"He wakes early in the morning\"</span></p>",
      "tag": "Sentence Formation || MCQ"
    }
  ],
  "Ordering of Words": [
    {
      "id": 60628,
      "question": "<p dir=\"ltr\"><span>The students</span><br><br><span>A: gathered around the teacher</span><br><span>B: with excitement</span><br><span>C: to hear the stories</span><br><span>D : he shared every week</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ACBD</span></p>",
        "<p dir=\"ltr\"><span>CABD</span></p>",
        "<p dir=\"ltr\"><span>ABCD</span></p>",
        "<p dir=\"ltr\"><span>DCAB</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"The students gathered around the teacher with excitement to hear the stories he shared every week.\"</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60629,
      "question": "<p dir=\"ltr\"><span>The tourists</span><br><br><span>A: admired the ancient architecture</span><br><span>B: who visited the historic city</span><br><span>C: with great enthusiasm</span><br><span>D : during their guided tour</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>BADC</span></p>",
        "<p dir=\"ltr\"><span>ACDB</span></p>",
        "<p dir=\"ltr\"><span>BDAC</span></p>",
        "<p dir=\"ltr\"><span>DCBA</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The tourists who visited the historic city during their guided tour admired the ancient architecture with great enthusiasm.</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60630,
      "question": "<p dir=\"ltr\"><span>The teacher</span><br><br><span>A: encouraged her students</span><br><span>B: during the class</span><br><span>C: to ask questions</span><br><span>D: and engage in discussions</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ACDB</span></p>",
        "<p dir=\"ltr\"><span>ACBD</span></p>",
        "<p dir=\"ltr\"><span>CABD</span></p>",
        "<p dir=\"ltr\"><span>ABDC</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The teacher encouraged her students to ask questions and engage in discussions during the class.</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60631,
      "question": "<p dir=\"ltr\"><span>The author</span><br><br><span>A: based on her experiences</span><br><span>B: wrote a compelling story</span><br><span>C: while traveling through Europe</span><br><span>D: about resilience and hope</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>BACD</span></p>",
        "<p dir=\"ltr\"><span>CBDA</span></p>",
        "<p dir=\"ltr\"><span>ACBD</span></p>",
        "<p dir=\"ltr\"><span>ABDC</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The author based on her experiences while traveling through Europe wrote a compelling story about resilience and hope.</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60632,
      "question": "<p dir=\"ltr\"><span> After years of hard work</span><br><br><span>A: he finally achieved</span><br><span>B: the success</span><br><span>C: he had dreamed of</span><br><span>D: since childhood</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>BACD</span></p>",
        "<p dir=\"ltr\"><span>ABCD</span></p>",
        "<p dir=\"ltr\"><span>ADBC</span></p>",
        "<p dir=\"ltr\"><span>CADB</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>After years of hard work, he finally achieved the success he had dreamed of since childhood.</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60633,
      "question": "<p dir=\"ltr\"><span>The artist</span><br><br><span>A: displayed his work</span><br><span>B: with pride and confidence</span><br><span>C: that he had carefully crafted</span><br><span>D: over several years</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ACDB</span></p>",
        "<p dir=\"ltr\"><span>ABDC</span></p>",
        "<p dir=\"ltr\"><span>DABC</span></p>",
        "<p dir=\"ltr\"><span>BADC</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The artist displayed his work that he had carefully crafted over several years with pride and confidence.</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60634,
      "question": "<p dir=\"ltr\"><span> The scientist</span><br><br><span>A: and documented his findings</span><br><span>B: conducted experiments</span><br><span>C: on environmental changes</span><br><span>D: for several years</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>BCAD</span></p>",
        "<p dir=\"ltr\"><span>DABC</span></p>",
        "<p dir=\"ltr\"><span>BCDA</span></p>",
        "<p dir=\"ltr\"><span>CADB</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The scientist conducted experiments on environmental changes for several years and documented his findings.</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60635,
      "question": "<p dir=\"ltr\"><span>The musician</span><br><br><span>A: captivated the audience</span><br><span>B: with his soulful performance</span><br><span>C: that touched their hearts</span><br><span>D:  and left a lasting impression</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ACBD</span></p>",
        "<p dir=\"ltr\"><span>ABCD</span></p>",
        "<p dir=\"ltr\"><span>BDCA</span></p>",
        "<p dir=\"ltr\"><span>BACD</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"The musician captivated the audience with his soulful performance that touched their hearts and left a lasting impression.\"</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60636,
      "question": "<p dir=\"ltr\"><span>He said</span><br><br><span>A: here is the cat</span><br><span>B: throughout the night</span><br><span>C: which had been playing havoc with things</span><br><span>D: that ate the rat</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ADCB</span></p>",
        "<p dir=\"ltr\"><span>ABCD</span></p>",
        "<p dir=\"ltr\"><span>BCAD</span></p>",
        "<p dir=\"ltr\"><span>CABD</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"He said here is the cat that ate the rat which had been playing havoc with things throughout the night.\"</span></p>",
      "tag": "Ordering of Words || MCQ"
    },
    {
      "id": 60637,
      "question": "<p dir=\"ltr\"><span>The old man</span><br><br><span>A: who had lost his way</span><br><span>B: finally found shelter</span><br><span>C: from the harsh storm</span><br><span>D: after hours of wandering</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ABCD</span></p>",
        "<p dir=\"ltr\"><span>ADBC</span></p>",
        "<p dir=\"ltr\"><span>BDCA</span></p>",
        "<p dir=\"ltr\"><span>BACD</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"The old man who had lost his way finally found shelter after hours of wandering from the harsh storm.\"</span></p>",
      "tag": "Ordering of Words || MCQ"
    }
  ],
  "Sentence Correction": [
    {
      "id": 60638,
      "question": "<p dir=\"ltr\"><span> She </span><b><strong>was surprised at</strong></b><span> his behavior during the meeting.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>was surprised at all</span><br></p>",
        "<p dir=\"ltr\"><span> had surprised at</span></p>",
        "<p dir=\"ltr\"><span>was all surprised by</span></p>",
        "<p dir=\"ltr\"><span>had been surprised by</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><i><em class=\"GFGEditorTheme__textItalic\">\"Had been surprised by\"</em></i><span> fits the context better</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60639,
      "question": "<p dir=\"ltr\"><span>They </span><b><strong>were delighted with</strong></b><span> the results of their hard work.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>were delighted from</span></p>",
        "<p dir=\"ltr\"><span>were delighted on</span></p>",
        "<p dir=\"ltr\"><span>had delighted by</span></p>",
        "<p dir=\"ltr\"><span>No correction required</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"delighted with\" is correct and natural, but the original sentence says \"They were delighted with the results of their hard work,\" which is already correct.</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60640,
      "question": "<p dir=\"ltr\"><span>The team </span><b><strong>was disappointed by</strong></b><span> the sudden cancellation of the event.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>had disappointed by</span></p>",
        "<p dir=\"ltr\"><span>was all disappointed with</span></p>",
        "<p dir=\"ltr\"><span>had been disappointed on</span></p>",
        "<p dir=\"ltr\"><span>was disappointed at</span></p>",
        "<p dir=\"ltr\"><span> No correction required</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><i><em class=\"GFGEditorTheme__textItalic\">\"Was disappointed at\"</em></i><span> is the correct phrase here.</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60641,
      "question": "<p dir=\"ltr\"><span>The committee </span><b><strong>agreed to meet</strong></b><span> once a month to discuss the ongoing projects.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> agrees meeting</span></p>",
        "<p dir=\"ltr\"><span>had agreed meeting</span></p>",
        "<p dir=\"ltr\"><span>was agreed to meet</span></p>",
        "<p dir=\"ltr\"><span>agreed meeting</span></p>",
        "<p dir=\"ltr\"><span>No correction required</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sentence is grammatically correct and requires no further correction.</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60642,
      "question": "<p dir=\"ltr\"><span>He </span><b><strong>decided to pursue</strong></b><span> a career in medicine after completing his studies.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>decides pursuing</span></p>",
        "<p dir=\"ltr\"><span>was deciding to pursue</span></p>",
        "<p dir=\"ltr\"><span>had decided pursuing</span></p>",
        "<p dir=\"ltr\"><span>decided pursuing</span></p>",
        "<p dir=\"ltr\"><span>No correction required</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"Decided to pursue\" is the correct phrase here and needs no further correction.</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60643,
      "question": "<p dir=\"ltr\"><span> Most of the students are </span><b><strong>as interested in sports as</strong></b><span>, if not more than, academic subjects.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>interested as much in sports as</span><br></p>",
        "<p dir=\"ltr\"><span>as interested in sports, if not more</span></p>",
        "<p dir=\"ltr\"><span>interested in sports as much as</span></p>",
        "<p dir=\"ltr\"><span>more interested in sports</span></p>",
        "<p dir=\"ltr\"><span>No correction required</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"Most of the students are interested in sports as much as if not more than, academic subjects\" is the correct phrasing that conveys the intended meaning</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60644,
      "question": "<p dir=\"ltr\"><b><strong>If I knew </strong></b><span>how difficult the project would be, I would have prepared better.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Had I known</span></p>",
        "<p dir=\"ltr\"><span>Knowing</span><br></p>",
        "<p dir=\"ltr\"><span>If I would know</span></p>",
        "<p dir=\"ltr\"><span>I knew</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><i><em class=\"GFGEditorTheme__textItalic\">\"Had I known\"</em></i><span> correctly reflects the past conditional structure.</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60645,
      "question": "<p dir=\"ltr\"><span>The report provides </span><b><strong>few useful insights</strong></b><span> into the market trends.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>little useful insights</span></p>",
        "<p dir=\"ltr\"><span>a few useful insights</span></p>",
        "<p dir=\"ltr\"><span>some useful insight</span></p>",
        "<p dir=\"ltr\"><span>much useful insight</span></p>",
        "<p dir=\"ltr\"><span>No correction required</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><i><em class=\"GFGEditorTheme__textItalic\">A few useful insights\"</em></i><span> is correct as it refers to countable insights.</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60646,
      "question": "<p dir=\"ltr\"><span>She </span><b><strong>broke into tears</strong></b><span> when she heard the sad news.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>broke in tears</span></p>",
        "<p dir=\"ltr\"><span>broke to tears</span></p>",
        "<p dir=\"ltr\"><span>burst into tears</span></p>",
        "<p dir=\"ltr\"><span>break in tears</span></p>",
        "<p dir=\"ltr\"><span>No correction required</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><i><em class=\"GFGEditorTheme__textItalic\">\"Burst into tears\"</em></i><span> is the correct idiomatic expression.</span></p>",
      "tag": "Sentence Correction || MCQ"
    },
    {
      "id": 60647,
      "question": "<p dir=\"ltr\"><span>The manager </span><b><strong>emphasized on the importance</strong></b><span> of meeting the deadlines.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>emphasized upon the importance</span></p>",
        "<p dir=\"ltr\"><span>emphasized the importance</span></p>",
        "<p dir=\"ltr\"><span>emphasized of the importance</span></p>",
        "<p dir=\"ltr\"><span>emphasized for the importance</span></p>",
        "<p dir=\"ltr\"><span>No correction required</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><i><em class=\"GFGEditorTheme__textItalic\">\"Emphasized the importance\"</em></i><span> is correct, as \"emphasize\" does not require \"on.\"</span></p>",
      "tag": "Sentence Correction || MCQ"
    }
  ],
  "Sentence Improvement": [
    {
      "id": 60648,
      "question": "<p dir=\"ltr\"><span>When it was rumored that the soldiers might revolt against their commanders, the government officials supported the army </span><u><i><em class=\"GFGEditorTheme__textItalic GFGEditorTheme__textUnderline\">at quelling</em></i></u><span> the rebellion.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> into quelling</span></p>",
        "<p dir=\"ltr\"><span>in quelling</span></p>",
        "<p dir=\"ltr\"><span>without quelling</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"In quelling\" is correct as it shows active participation in suppressing the rebellion.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60649,
      "question": "<p dir=\"ltr\"><span>The teacher </span><u><i><em class=\"GFGEditorTheme__textItalic GFGEditorTheme__textUnderline\">gave to us a lecture</em></i></u><span> on climate change.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> gave a lecture to us</span></p>",
        "<p dir=\"ltr\"><span>gave us a lecture</span></p>",
        "<p dir=\"ltr\"><span>delivered us a lecture</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Gave us a lecture\" is correct as the verb \"gave\" directly applies to \"us\" in this structure.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60650,
      "question": "<p dir=\"ltr\"><span>He didn\u2019t succeed because he wasn\u2019t working hard.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> didn\u2019t work hard</span></p>",
        "<p dir=\"ltr\"><span>didn\u2019t worked hard</span></p>",
        "<p dir=\"ltr\"><span>was working hard</span></p>",
        "<p dir=\"ltr\"><span> No improvement</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\u201cdidn\u2019t work hard\u201d is simple past; correct but less precise, it suggests a general or one-time lack of effort, while the original implies ongoing effort.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60651,
      "question": "<p dir=\"ltr\"><span> The company plans to expand its operations as soon as </span><u><span class=\"GFGEditorTheme__textUnderline\">it will secure</span></u><span> the funding.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>it secures</span></p>",
        "<p dir=\"ltr\"><span>it had secured</span><br></p>",
        "<p dir=\"ltr\"><span>it is securing</span></p>",
        "<p dir=\"ltr\"><span> No improvement</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"it secures\" is correct because the future tense (\"will secure\") is unnecessary after \"as soon as.\"</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60652,
      "question": "<p dir=\"ltr\"><span> He was confident of </span><u><span class=\"GFGEditorTheme__textUnderline\">winning the match easily</span></u><span>.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> win the match easily</span></p>",
        "<p dir=\"ltr\"><span>easily winning the match</span></p>",
        "<p dir=\"ltr\"><span> win easily the match</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>No improvement is needed as \"winning the match easily\" is grammatically correct and clear.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60653,
      "question": "<p dir=\"ltr\"><span>He </span><u><span class=\"GFGEditorTheme__textUnderline\">don\u2019t know</span></u><span> the answer to the question.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>doesn\u2019t know</span></p>",
        "<p dir=\"ltr\"><span>don\u2019t knew</span></p>",
        "<p dir=\"ltr\"><span>didn\u2019t know</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Doesn\u2019t know\" is correct as the subject \"he\" requires singular agreement with the verb.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60654,
      "question": "<p dir=\"ltr\"><span>The scientist claimed to have found </span><u><span class=\"GFGEditorTheme__textUnderline\">a new method for reducing pollution</span></u><span>.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>the newly method for reducing pollution</span></p>",
        "<p dir=\"ltr\"><span>a newer method for reduction of pollution</span></p>",
        "<p dir=\"ltr\"><span>a new method to reduce pollution</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A new method to reduce pollution\" is more concise and natural in phrasing.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60655,
      "question": "<p dir=\"ltr\"><span> The team leader distributed the tasks </span><u><span class=\"GFGEditorTheme__textUnderline\">between the three members</span></u><span>.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>among the three members</span></p>",
        "<p dir=\"ltr\"><span>with the three members</span></p>",
        "<p dir=\"ltr\"><span>in the three members</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Among\" is used for more than two entities, so \"among the three members\" is correct.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60656,
      "question": "<p dir=\"ltr\"><span>The students were instructed to </span><u><span class=\"GFGEditorTheme__textUnderline\">write the essay by their handwriting</span></u><span>.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>write the essay with their handwriting.</span></p>",
        "<p dir=\"ltr\"><span> write the essay in their handwriting.</span></p>",
        "<p dir=\"ltr\"><span>write the essay through their handwriting.</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"In their handwriting\" is the correct idiomatic expression to indicate using one's handwriting for writing.</span></p>",
      "tag": "Sentence Improvement || MCQ"
    },
    {
      "id": 60657,
      "question": "<p dir=\"ltr\"><span>The committee recommended that the proposal </span><u><span class=\"GFGEditorTheme__textUnderline\">is reconsidered in light of the new evidence</span></u><span>.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> be reconsidered in light of the new evidence</span></p>",
        "<p dir=\"ltr\"><span>was reconsidered due to the new evidence</span></p>",
        "<p dir=\"ltr\"><span>should reconsider in light of new evidence</span></p>",
        "<p dir=\"ltr\"><span>No improvement</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Be reconsidered\" is correct because the subjunctive form is used after \"recommended.\"</span></p>",
      "tag": "Sentence Improvement || MCQ"
    }
  ],
  "Completing Statements": [
    {
      "id": 60658,
      "question": "<p dir=\"ltr\"><span> Because of her regular exercise and balanced diet,...</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>she fell sick frequently.</span></p>",
        "<p dir=\"ltr\"><span>she remained unhealthy and stressed.</span></p>",
        "<p dir=\"ltr\"><span>she maintained good health and fitness.</span></p>",
        "<p dir=\"ltr\"><span>she lost interest in staying fit</span></p>",
        "<p dir=\"ltr\"><span> she gave up her healthy habits.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Regular exercise and a balanced diet typically lead to maintaining good health and fitness.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60659,
      "question": "<p dir=\"ltr\"><span>He was not only a great orator ....</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>but also a dedicated social worker. </span></p>",
        "<p dir=\"ltr\"><span> and an exceptional dancer.</span></p>",
        "<p dir=\"ltr\"><span>but also had a fear of public speaking.</span><br></p>",
        "<p dir=\"ltr\"><span>and he never gave any speeches.</span></p>",
        "<p dir=\"ltr\"><span>but he also disliked speaking in public.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The phrase \"not only ... but also ...\" indicates listing positive traits.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60660,
      "question": "<p dir=\"ltr\"><span> In spite of having a headache,...</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> he decided to skip the meeting.</span></p>",
        "<p dir=\"ltr\"><span>he attended the meeting and contributed actively.</span></p>",
        "<p dir=\"ltr\"><span>he took a nap and missed work.</span></p>",
        "<p dir=\"ltr\"><span>he complained all day long.</span></p>",
        "<p dir=\"ltr\"><span>he called in sick.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"In spite of\" suggests overcoming difficulties, so he still participated fully.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60661,
      "question": "<p dir=\"ltr\"><span>Because she was running late,...</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>she walked slowly to the office.</span></p>",
        "<p dir=\"ltr\"><span>she decided to stop and have coffee.</span><br></p>",
        "<p dir=\"ltr\"><span>she hurried to reach on time.</span></p>",
        "<p dir=\"ltr\"><span>she missed the meeting on purpose.</span><br></p>",
        "<p dir=\"ltr\"><span>she took a long break.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> Being late typically prompts someone to hurry to arrive promptly.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60662,
      "question": "<p dir=\"ltr\"><span>He loves to travel ....</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>and hates exploring new places.</span></p>",
        "<p dir=\"ltr\"><span>but rarely leaves his home.</span></p>",
        "<p dir=\"ltr\"><span>and has visited over 30 countries.</span></p>",
        "<p dir=\"ltr\"><span>but he never steps out of his city. </span></p>",
        "<p dir=\"ltr\"><span>because he prefers staying indoors.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Option C (\"and has visited over 30 countries\")\u00a0is correct because it provides direct evidence that supports the initial claim. Visiting many countries is a logical result of loving to travel.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60663,
      "question": "<p dir=\"ltr\"><span>Even though the weather was bad, ....</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>they canceled the event.</span></p>",
        "<p dir=\"ltr\"><span>nobody left their houses.</span></p>",
        "<p dir=\"ltr\"><span>the match was postponed to next week.</span></p>",
        "<p dir=\"ltr\"><span>the event took place as scheduled.</span></p>",
        "<p dir=\"ltr\"><span>they decided to stay indoors.</span><br></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Even though\" indicates something happened despite adverse conditions.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60664,
      "question": "<p dir=\"ltr\"><span>She didn't like the movie,...</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> yet she watched it until the end.</span><br></p>",
        "<p dir=\"ltr\"><span>so she watched it twice.</span></p>",
        "<p dir=\"ltr\"><span>but recommended it to everyone.</span></p>",
        "<p dir=\"ltr\"><span>because it was her favorite genre.</span></p>",
        "<p dir=\"ltr\"><span>and decided to watch it again.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Using \"didn't like\" suggests a contrasting outcome that she still watched it fully.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60665,
      "question": "<p dir=\"ltr\"><span>Thanks to his hard work and perseverance,...</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>he failed to achieve his goal. </span></p>",
        "<p dir=\"ltr\"><span>he easily gave up when faced with challenges.</span></p>",
        "<p dir=\"ltr\"><span>he achieved success in his business.</span></p>",
        "<p dir=\"ltr\"><span>he became lazy and unmotivated.</span><br></p>",
        "<p dir=\"ltr\"><span>nothing worked in his favor.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Hard work and perseverance typically lead to success.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60666,
      "question": "<p dir=\"ltr\"><span>Despite being extremely busy,....</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>he didn't have time for anything.</span></p>",
        "<p dir=\"ltr\"><span>he managed to help his friend move.</span></p>",
        "<p dir=\"ltr\"><span>he neglected all his responsibilities.</span></p>",
        "<p dir=\"ltr\"><span>he turned down all new tasks.</span></p>",
        "<p dir=\"ltr\"><span>he took a vacation for a month.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"Despite being busy\" implies he still found time to help.</span></p>",
      "tag": "Completing Statements || MCQ"
    },
    {
      "id": 60667,
      "question": "<p dir=\"ltr\"><span> Due to heavy traffic,....</span><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>she reached the office earlier than usual.</span></p>",
        "<p dir=\"ltr\"><span>they decided to take a longer route.</span></p>",
        "<p dir=\"ltr\"><span>she arrived late for the meeting.</span></p>",
        "<p dir=\"ltr\"><span>they had a smooth and fast journey.</span></p>",
        "<p dir=\"ltr\"><span> they finished the trip much ahead of schedule.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Heavy traffic typically causes delays, leading to being late.</span></p>",
      "tag": "Completing Statements || MCQ"
    }
  ],
  "Para Jumbles": [
    {
      "id": 60668,
      "question": "<p dir=\"ltr\"><span>The following 5 sentences are jumbled. Arrange them in the correct order to form a meaningful paragraph.</span><br><span>A) The sun was setting, painting the sky in shades of orange and pink.</span><br><span> B) People gathered at the park to enjoy the beautiful evening.</span><br><span> C) Children played happily, chasing each other around the trees.</span><br><span> D) The gentle breeze added a refreshing touch to the warm day.</span><br><span> E) It was the perfect end to a summer day.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>A B C D E</span></p>",
        "<p dir=\"ltr\"><span>B C D A E</span></p>",
        "<p dir=\"ltr\"><span>B D C A E</span></p>",
        "<p dir=\"ltr\"><span>E D A B C</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>A sets the scene (sunset and sky).</span></li><li value=\"2\"><span>B introduces people gathering.</span></li><li value=\"3\"><span>C describes children playing.</span></li><li value=\"4\"><span>D adds detail about the breeze.</span></li><li value=\"5\"><span>E concludes the paragraph beautifully.</span></li></ul>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60669,
      "question": "<p dir=\"ltr\"><span>The following 5 sentences are jumbled. Arrange them in the correct order to form a meaningful paragraph.</span><br/><span>A) Water is essential for all living beings.</span><br/><span>B) It helps regulate body temperature and maintain bodily functions.</span><br/><span>C) Drinking sufficient water keeps us hydrated and healthy.</span><br/><span>D) Without water, life on Earth would not exist.</span><br/><span>E) Therefore, it is important to drink plenty of water every day.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>D A B C E</span></p>",
        "<p dir=\"ltr\"><span>A D B C E</span></p>",
        "<p dir=\"ltr\"><span>D A C B E</span></p>",
        "<p dir=\"ltr\"><span>A B D C E</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>A introduces water\u2019s importance.</span></li><li value=\"2\"><span>D emphasizes that life depends on water.</span></li><li value=\"3\"><span>B explains what water does in the body.</span></li><li value=\"4\"><span>C shows the benefit of drinking water.</span></li><li value=\"5\"><span>E concludes with the advice to drink enough water daily.</span></li></ul><p dir=\"ltr\"><span>This order creates a clear, logical flow.</span></p>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60670,
      "question": "<p dir=\"ltr\"><span>The following 5 sentences are jumbled. Arrange them in the correct order to form a meaningful paragraph.</span><br><span>A) Technology has advanced rapidly in recent years.</span><br><span> B) It has transformed the way we communicate and access information.</span><br><span> C) Smartphones and the internet are now integral parts of daily life.</span><br><span> D) These changes have made the world more connected than ever before.</span><br><span> E) However, they have also raised concerns about privacy and security.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>A B C D E</span></p>",
        "<p dir=\"ltr\"><span>B A C D E</span></p>",
        "<p dir=\"ltr\"><span>A C B D E</span></p>",
        "<p dir=\"ltr\"><span>A B D C E</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><br><span>A introduces the topic by stating that technology has advanced rapidly in recent years.</span><br><span> B explains the impact of this advancement on communication and information access.</span><br><span> C provides specific examples such as smartphones and the internet becoming part of daily life.</span><br><span> D summarizes the positive outcome of these technological changes by highlighting increased global connectivity.</span><br><span> E concludes with a contrasting point, mentioning concerns about privacy and security.</span></p><p dir=\"ltr\"><span>This order creates a clear and logical progression from introduction \u2192 explanation \u2192 examples \u2192 result \u2192 contrast.</span></p>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60671,
      "question": "<p dir=\"ltr\"><span>The following 5 sentences are jumbled. Arrange them in the correct order to form a meaningful paragraph.</span><br/><span>A) Healthy eating involves consuming a variety of foods.</span><br/><span> B) Fruits and vegetables provide essential vitamins and minerals.</span><br/><span> C) Avoiding processed foods can reduce the risk of many diseases.</span><br/><span> D) Drinking water regularly also supports good health.</span><br/><span> E) A balanced diet is key to maintaining overall well-being.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>E A B C D</span></p>",
        "<p dir=\"ltr\"><span>A B C D E</span></p>",
        "<p dir=\"ltr\"><span>A B D C E</span></p>",
        "<p dir=\"ltr\"><span>E D B C A</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>E introduces the main idea (balanced diet and well-being).</span></li><li value=\"2\"><span>A explains what healthy eating involves.</span></li><li value=\"3\"><span>B gives examples (fruits and vegetables).</span></li><li value=\"4\"><span>C adds another important habit (avoiding processed food).</span></li><li value=\"5\"><span>D concludes with an additional health tip (drinking water).</span></li></ul>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60672,
      "question": "<p dir=\"ltr\"><span>The following 5 sentences are jumbled. Arrange them in the correct order to form a meaningful paragraph.</span><br/><span>A) Reading books helps improve vocabulary and comprehension skills.</span><br/><span> B) It also encourages imagination and creativity.</span><br/><span> C) People who read regularly tend to perform better academically.</span><br/><span> D) Choosing books that interest you makes reading enjoyable.</span><br/><span> E) Spending time reading every day is a good habit to develop.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>A B C D E</span></p>",
        "<p dir=\"ltr\"><span>E D A B C</span></p>",
        "<p dir=\"ltr\"><span>E A B C D</span></p>",
        "<p dir=\"ltr\"><span>A E B C D</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>E introduces the main idea (reading as a good habit).</span></li><li value=\"2\"><span>A explains one benefit (improves vocabulary and comprehension).</span></li><li value=\"3\"><span>B adds another benefit (encourages imagination and creativity).</span></li><li value=\"4\"><span>C shows the result (better academic performance).</span></li><li value=\"5\"><span>D concludes with a practical suggestion (choose interesting books).</span></li></ul>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60673,
      "question": "<p dir=\"ltr\"><span>In the questions below, each passage consists of 6 sentences. The first and sixth sentences are given in the beginning. The middle five sentences in each have been removed and jumbled up. These are labelled as P, Q, R, and S. Find out the proper order for the four sentences.</span><br/><span>S1: Good communication is essential in building strong relationships.</span><br/><span> P: It helps avoid misunderstandings and resolves conflicts.</span><br/><span> Q: Listening actively shows respect and understanding.</span><br/><span> R: Clear expression of thoughts strengthens trust.</span><br/><span> S: Non-verbal cues also play a significant role in communication.</span><br/><span> S6: Together, these elements foster meaningful connections.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>P Q R S</span></p>",
        "<p dir=\"ltr\"><span>Q P R S</span></p>",
        "<p dir=\"ltr\"><span>Q R P S</span></p>",
        "<p dir=\"ltr\"><span>P R Q S</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>S1\u00a0introduces the main idea: good communication is essential for strong relationships.</span></li><li value=\"2\"><span>P\u00a0directly follows S1 by explaining a key benefit of good communication (it helps avoid misunderstandings and resolve conflicts), using \"It\" to refer back to \"Good communication.\"</span></li><li value=\"3\"><span>Q\u00a0introduces the first specific element of good communication: active listening.</span></li><li value=\"4\"><span>R\u00a0introduces a second specific element: clear expression of thoughts.</span></li><li value=\"5\"><span>S\u00a0adds a third element, noting that non-verbal cues are also important, with the word \"also\" signaling it as an additional point.</span></li><li value=\"6\"><span>S6\u00a0concludes by stating that all these elements (listening, expression, non-verbal cues) together foster meaningful connections.</span></li></ul>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60674,
      "question": "<p dir=\"ltr\"><span>In the questions below, each passage consists of 6 sentences. The first and sixth sentences are given in the beginning. The middle five sentences in each have been removed and jumbled up. These are labelled as P, Q, R, and S. Find out the proper order for the four sentences.</span><br/><span>S1: Traveling broadens one\u2019s perspective and understanding of different cultures.</span><br/><span> P: It exposes us to new traditions, languages, and cuisines.</span><br/><span> Q: People learn to appreciate diversity and develop empathy.</span><br/><span> R: Traveling also encourages adaptability and problem-solving skills.</span><br/><span> S: These experiences enrich personal growth and open-mindedness.</span><br/><span> S6: Overall, traveling is an educational and transformative experience.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>P Q R S</span></p>",
        "<p dir=\"ltr\"><span>Q P R S</span></p>",
        "<p dir=\"ltr\"><span>P R Q S</span><br/></p>",
        "<p dir=\"ltr\"><span>R P Q S</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>S1 introduces the idea that traveling broadens perspective.</span></li><li value=\"2\"><span>P explains how (exposure to traditions, languages, cuisines).</span></li><li value=\"3\"><span>Q adds the result (appreciation of diversity and empathy).</span></li><li value=\"4\"><span>R mentions additional benefits (adaptability and problem-solving).</span></li><li value=\"5\"><span>S sums up these experiences as enriching personal growth.</span></li><li value=\"6\"><span>S6 concludes that traveling is educational and transformative.</span></li></ul>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60675,
      "question": "<p dir=\"ltr\"><span>In the questions below, each passage consists of 6 sentences. The first and sixth sentences are given in the beginning. The middle five sentences in each have been removed and jumbled up. These are labelled as P, Q, R, and S. Find out the proper order for the four sentences.</span><br/><span>S1: Time management is crucial for achieving personal and professional goals.</span><br/><span> P: Prioritizing tasks helps focus on what matters most.</span><br/><span> Q: Avoiding procrastination increases productivity.</span><br/><span> R: Setting realistic deadlines prevents unnecessary stress.</span><br/><span> S: Regular breaks maintain mental freshness and motivation.</span><br/><span> S6: Mastering time management leads to better success and satisfaction.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>P Q R S</span></p>",
        "<p dir=\"ltr\"><span>P R Q S</span></p>",
        "<p dir=\"ltr\"><span>Q P R S</span></p>",
        "<p dir=\"ltr\"><span>P Q S R</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ul><li value=\"1\"><span>S1 introduces the importance of time management.</span></li><li value=\"2\"><span>P begins with prioritizing tasks.</span></li><li value=\"3\"><span>Q follows with avoiding procrastination to boost productivity.</span></li><li value=\"4\"><span>R adds setting realistic deadlines to reduce stress.</span></li><li value=\"5\"><span>S concludes the methods with taking regular breaks.</span></li><li value=\"6\"><span>S6 sums up the overall benefit (success and satisfaction).</span></li></ul>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60676,
      "question": "<p dir=\"ltr\"><span>In the questions below, each passage consists of 6 sentences. The first and sixth sentences are given in the beginning. The middle five sentences in each have been removed and jumbled up. These are labelled as P, Q, R, and S. Find out the proper order for the four sentences.</span><br/><span>S1: Learning from failures is essential for personal growth. </span><br/><span>P: Failures provide valuable lessons that success cannot teach.</span><br/><span>Q: Reflecting on mistakes helps avoid repeating them in the future.</span><br/><span>R: Persistence after failure builds resilience and confidence.</span><br/><span>S: Applying lessons learned from failure strengthens character.</span><br/><span>S6: Embracing failure leads to continuous improvement.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>S Q R P</span></p>",
        "<p dir=\"ltr\"><span>P  Q S R</span></p>",
        "<p dir=\"ltr\"><span>Q P R S</span></p>",
        "<p dir=\"ltr\"><span>R P Q S</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Starts by stating the importance (S1)</span></p><p dir=\"ltr\"><span>Explains the value of failures (P)</span></p><p dir=\"ltr\"><span>Encourages reflection to learn (Q)</span></p><p dir=\"ltr\"><span>Stresses applying those lessons (S)</span></p><p dir=\"ltr\"><span>Shows how persistence helps build strength (R)</span></p><p dir=\"ltr\"><span>Ends with the positive outcome (S6)</span></p>",
      "tag": "Para Jumbles || MCQ"
    },
    {
      "id": 60677,
      "question": "<p dir=\"ltr\"><span>In the questions below, each passage consists of 6 sentences. The first and sixth sentences are given in the beginning. The middle five sentences in each have been removed and jumbled up. These are labelled as P, Q, R, and S. Find out the proper order for the four sentences.</span><br/><span>S1: Digital literacy is essential in today\u2019s technology-driven world.</span><br/><span> P: It involves the ability to find, evaluate, and communicate information online.</span><br/><span> Q: Being digitally literate opens up educational and career opportunities.</span><br/><span> R: It also helps protect against online scams and misinformation.</span><br/><span> S: Teaching digital skills from a young age prepares individuals for the future.</span><br/><span> S6: Developing digital literacy empowers people to navigate the modern world confidently.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>P Q R S</span></p>",
        "<p dir=\"ltr\"><span>P R Q S</span></p>",
        "<p dir=\"ltr\"><span>Q P R S</span></p>",
        "<p dir=\"ltr\"><span>P S Q R</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>S1 introduces the importance of digital literacy.</span></p><p dir=\"ltr\"><span>P defines what digital literacy involves.</span></p><p dir=\"ltr\"><span>R explains one benefit (protection from scams and misinformation).</span></p><p dir=\"ltr\"><span>Q adds another benefit (education and career opportunities).</span></p><p dir=\"ltr\"><span>S concludes with the importance of teaching it early.</span></p><p dir=\"ltr\"><span>S6 summarizes that digital literacy empowers people.</span></p>",
      "tag": "Para Jumbles || MCQ"
    }
  ],
  "Paragraph Formation": [
    {
      "id": 60678,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 - Q5) Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>Sentences:</span><br/><span>1. He finally made it to the top and felt an overwhelming sense of accomplishment.</span><br/><span>2. He had always dreamed of climbing the highest mountain in the region.</span><br/><span>3. As he neared the summit, the icy wind cut through him like a knife, testing his resolve.</span><br/><span>4. The journey was grueling, filled with moments of doubt and exhaustion.</span><br/><span>5. But his determination kept him moving forward, one step at a time.</span></p><pre><span>Which sentence should come third in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>He had always dreamed of climbing the highest mountain in the region. The journey was grueling, filled with moments of doubt and exhaustion. But his determination kept him moving forward, one step at a time. As he neared the summit, the icy wind cut through him like a knife, testing his resolve. He finally made it to the top and felt an overwhelming sense of accomplishment.</span></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60679,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 - Q5) Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>Sentences:</span><br/><span>1. He finally made it to the top and felt an overwhelming sense of accomplishment.</span><br/><span>2. He had always dreamed of climbing the highest mountain in the region.</span><br/><span>3. As he neared the summit, the icy wind cut through him like a knife, testing his resolve.</span><br/><span>4. The journey was grueling, filled with moments of doubt and exhaustion.</span><br/><span>5. But his determination kept him moving forward, one step at a time.</span></p><pre><span>Which sentence should come last in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>He had always dreamed of climbing the highest mountain in the region. The journey was grueling, filled with moments of doubt and exhaustion. But his determination kept him moving forward, one step at a time. As he neared the summit, the icy wind cut through him like a knife, testing his resolve. He finally made it to the top and felt an overwhelming sense of accomplishment.</span><br/></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60680,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 - Q5) Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>Sentences:</span><br/><span>1. He finally made it to the top and felt an overwhelming sense of accomplishment.</span><br/><span>2. He had always dreamed of climbing the highest mountain in the region.</span><br/><span>3. As he neared the summit, the icy wind cut through him like a knife, testing his resolve.</span><br/><span>4. The journey was grueling, filled with moments of doubt and exhaustion.</span><br/><span>5. But his determination kept him moving forward, one step at a time.</span></p><pre><span>Which sentence should come fourth in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>He had always dreamed of climbing the highest mountain in the region. The journey was grueling, filled with moments of doubt and exhaustion. But his determination kept him moving forward, one step at a time. As he neared the summit, the icy wind cut through him like a knife, testing his resolve. He finally made it to the top and felt an overwhelming sense of accomplishment.</span></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60681,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 - Q5) Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>Sentences:</span><br/><span>1. He finally made it to the top and felt an overwhelming sense of accomplishment.</span><br/><span>2. He had always dreamed of climbing the highest mountain in the region.</span><br/><span>3. As he neared the summit, the icy wind cut through him like a knife, testing his resolve.</span><br/><span>4. The journey was grueling, filled with moments of doubt and exhaustion.</span><br/><span>5. But his determination kept him moving forward, one step at a time.</span></p><pre><span>Which sentence should come second in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>He had always dreamed of climbing the highest mountain in the region. The journey was grueling, filled with moments of doubt and exhaustion. But his determination kept him moving forward, one step at a time. As he neared the summit, the icy wind cut through him like a knife, testing his resolve. He finally made it to the top and felt an overwhelming sense of accomplishment. </span></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60682,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 - Q5) Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>Sentences:</span><br/><span>1. He finally made it to the top and felt an overwhelming sense of accomplishment.</span><br/><span>2. He had always dreamed of climbing the highest mountain in the region.</span><br/><span>3. As he neared the summit, the icy wind cut through him like a knife, testing his resolve.</span><br/><span>4. The journey was grueling, filled with moments of doubt and exhaustion.</span><br/><span>5. But his determination kept him moving forward, one step at a time.</span></p><pre><span>Which sentence should come first in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>He had always dreamed of climbing the highest mountain in the region. The journey was grueling, filled with moments of doubt and exhaustion. But his determination kept him moving forward, one step at a time. As he neared the summit, the icy wind cut through him like a knife, testing his resolve. He finally made it to the top and felt an overwhelming sense of accomplishment.</span></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60683,
      "question": "<p dir=\"ltr\"><span>(Direction for Q6 - Q10)Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>1. After weeks of preparation, she finally submitted her painting to the competition.</span><br/><span>2. She had always dreamed of being recognized for her talent.</span><br/><span>3. Her painting was displayed in the exhibition, and people admired it.</span><br/><span>4. She spent hours perfecting her art, carefully choosing the colors and shapes.</span><br/><span>5. The moment the judges announced her name, she felt a surge of excitement.</span></p><pre><span>Which sentence should come third in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>She had always dreamed of being recognized for her talent. She spent hours perfecting her art, carefully choosing the colors and shapes. After weeks of preparation, she finally submitted her painting to the competition. Her painting was displayed in the exhibition, and people admired it. The moment the judges announced her name, she felt a surge of excitement.</span></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60684,
      "question": "<p dir=\"ltr\"><span>(Direction for Q6 - Q10)Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>1. After weeks of preparation, she finally submitted her painting to the competition.</span><br/><span>2. She had always dreamed of being recognized for her talent.</span><br/><span>3. Her painting was displayed in the exhibition, and people admired it.</span><br/><span>4. She spent hours perfecting her art, carefully choosing the colors and shapes.</span><br/><span>5. The moment the judges announced her name, she felt a surge of excitement.</span></p><pre><span>Which sentence should come last in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 4,
      "correctAnswers": [
        4
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>She had always dreamed of being recognized for her talent. She spent hours perfecting her art, carefully choosing the colors and shapes. After weeks of preparation, she finally submitted her painting to the competition. Her painting was displayed in the exhibition, and people admired it. The moment the judges announced her name, she felt a surge of excitement.</span></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60685,
      "question": "<p dir=\"ltr\"><span>(Direction for Q6 - Q10)Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>1. After weeks of preparation, she finally submitted her painting to the competition.</span><br/><span>2. She had always dreamed of being recognized for her talent.</span><br/><span>3. Her painting was displayed in the exhibition, and people admired it.</span><br/><span>4. She spent hours perfecting her art, carefully choosing the colors and shapes.</span><br/><span>5. The moment the judges announced her name, she felt a surge of excitement.</span></p><pre><span>Which sentence should come fourth in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>She had always dreamed of being recognized for her talent. She spent hours perfecting her art, carefully choosing the colors and shapes. After weeks of preparation, she finally submitted her painting to the competition. Her painting was displayed in the exhibition, and people admired it. The moment the judges announced her name, she felt a surge of excitement.</span></p>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60686,
      "question": "<p dir=\"ltr\"><span>(Direction for Q6 - Q10)Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>1. After weeks of preparation, she finally submitted her painting to the competition.</span><br/><span>2. She had always dreamed of being recognized for her talent.</span><br/><span>3. Her painting was displayed in the exhibition, and people admired it.</span><br/><span>4. She spent hours perfecting her art, carefully choosing the colors and shapes.</span><br/><span>5. The moment the judges announced her name, she felt a surge of excitement.</span></p><pre><span>Which sentence should come second in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<ol><li value=\"1\"><span>She had always dreamed of being recognized for her talent. </span></li><li value=\"2\"><span>She spent hours perfecting her art, carefully choosing the colors and shapes. </span></li><li value=\"3\"><span>After weeks of preparation, she finally submitted her painting to the competition. </span></li><li value=\"4\"><span>Her painting was displayed in the exhibition, and people admired it. </span></li><li value=\"5\"><span>The moment the judges announced her name, she felt a surge of excitement.</span></li></ol>",
      "tag": "Paragraph Formation || MCQ"
    },
    {
      "id": 60687,
      "question": "<p dir=\"ltr\"><span>(Direction for Q6 - Q10)Rearrange the following five sentences to form a coherent and meaningful paragraph and then answer the following questions.</span><br/><span>1. After weeks of preparation, she finally submitted her painting to the competition.</span><br/><span>2. She had always dreamed of being recognized for her talent.</span><br/><span>3. Her painting was displayed in the exhibition, and people admired it.</span><br/><span>4. She spent hours perfecting her art, carefully choosing the colors and shapes.</span><br/><span>5. The moment the judges announced her name, she felt a surge of excitement.</span></p><pre><span>Which sentence should come first in the paragraph?</span></pre>",
      "options": [
        "<p><span>1</span></p>",
        "<p><span>2</span></p>",
        "<p><span>3</span></p>",
        "<p><span>4</span></p>",
        "<p><span>5</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>She had always dreamed of being recognized for her talent. She spent hours perfecting her art, carefully choosing the colors and shapes. After weeks of preparation, she finally submitted her painting to the competition. Her painting was displayed in the exhibition, and people admired it. The moment the judges announced her name, she felt a surge of excitement.</span></p>",
      "tag": "Paragraph Formation || MCQ"
    }
  ],
  "Cloze Test": [
    {
      "id": 60688,
      "question": "<p dir=\"ltr\"><span>Directions to solve (Q1 to Q5): In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span></p><p dir=\"ltr\"><span>Corruption is the misuse of (1)_______ power for personal gain. It weakens (2)_______ and harms economic growth. Common types include bribery and (3)_______. To fight corruption, strong laws and public (4)_______ are necessary. Transparency helps hold officials (5)_______ for their actions.</span></p><p dir=\"ltr\"><span>Which word should fill in the blank (1)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>private</span></p>",
        "<p dir=\"ltr\"><span>public</span></p>",
        "<p dir=\"ltr\"><span>personal</span></p>",
        "<p dir=\"ltr\"><span>foreign</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Public -Corruption usually involves the misuse of power given by the government or public institutions. It affects society at large.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60689,
      "question": "<p dir=\"ltr\" style=\"text-align: start;\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Corruption is the misuse of (1)_______ power for personal gain. It weakens (2)_______ and harms economic growth. Common types include bribery and (3)_______. To fight corruption, strong laws and public (4)_______ are necessary. Transparency helps hold officials (5)_______ for their actions.</span></p><p dir=\"ltr\"><span>Which word should fill in the blank (2)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>money</span></p>",
        "<p dir=\"ltr\"><span>trust</span></p>",
        "<p dir=\"ltr\"><span>education</span></p>",
        "<p dir=\"ltr\"><span>technology</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Trust \u2013 Corruption damages the confidence people have in their government and institutions, making them less effective</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60690,
      "question": "<p dir=\"ltr\" style=\"text-align: start;\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Corruption is the misuse of (1)_______ power for personal gain. It weakens (2)_______ and harms economic growth. Common types include bribery and (3)_______. To fight corruption, strong laws and public (4)_______ are necessary. Transparency helps hold officials (5)_______ for their actions.</span></p><p dir=\"ltr\"><span>Which word should fill in the blank (3)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>kindness</span></p>",
        "<p dir=\"ltr\"><span>honesty</span></p>",
        "<p dir=\"ltr\"><span>fraud</span></p>",
        "<p dir=\"ltr\"><span>charity</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Fraud \u2013 Fraud is a common form of corruption where people deceive others for personal benefit.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60691,
      "question": "<p dir=\"ltr\" style=\"text-align: start;\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Corruption is the misuse of (1)_______ power for personal gain. It weakens (2)_______ and harms economic growth. Common types include bribery and (3)_______. To fight corruption, strong laws and public (4)_______ are necessary. Transparency helps hold officials (5)_______ for their actions.</span></p><p dir=\"ltr\"><span>Which word should fill in the blank (4)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>ignorance</span></p>",
        "<p dir=\"ltr\"><span>silence</span></p>",
        "<p dir=\"ltr\"><span>confusion</span></p>",
        "<p dir=\"ltr\"><span>awareness</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Awareness \u2013 Public knowledge and understanding about corruption help society recognize and resist it.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60692,
      "question": "<p dir=\"ltr\" style=\"text-align: start;\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span></p><p dir=\"ltr\" style=\"text-align: start;\"><span>Corruption is the misuse of (1)_______ power for personal gain. It weakens (2)_______ and harms economic growth. Common types include bribery and (3)_______. To fight corruption, strong laws and public (4)_______ are necessary. Transparency helps hold officials (5)_______ for their actions.</span></p><p dir=\"ltr\"><span>Which word should fill in the blank (5)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>accountable</span></p>",
        "<p dir=\"ltr\"><span>invisible</span></p>",
        "<p dir=\"ltr\"><span>excused</span></p>",
        "<p dir=\"ltr\"><span>powerful</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Accountable \u2013 Officials must be responsible for their actions so corruption can be controlled or punished.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60693,
      "question": "<p dir=\"ltr\"><span>Directions to solve (Q6 to Q10): In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span></p><p dir=\"ltr\"><span>A football tournament is a competition where teams compete to win a (6)_______. It usually involves several (7)_______ where teams play against each other. The team with the most (8)_______ advances to the next round. Tournaments can be played in a (9)_______ or knockout format. Fans from all over the world come to watch the matches and cheer for their (10)_______.</span></p><p dir=\"ltr\"><span> Which word should fill in the blank (6)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>medal</span></p>",
        "<p dir=\"ltr\"><span>trophy</span></p>",
        "<p dir=\"ltr\"><span>certificate</span></p>",
        "<p dir=\"ltr\"><span>ribbon</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Trophy \u2013 The trophy is the prize awarded to the winning team of the tournament.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60694,
      "question": "<p dir=\"ltr\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span><br/><span>A football tournament is a competition where teams compete to win a (6)_______. It usually involves several (7)_______ where teams play against each other. The team with the most (8)_______ advances to the next round. Tournaments can be played in a (9)_______ or knockout format. Fans from all over the world come to watch the matches and cheer for their (10)_______.</span></p><p dir=\"ltr\"><span> Which word should fill in the blank (7)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>matches</span></p>",
        "<p dir=\"ltr\"><span>training sessions</span></p>",
        "<p dir=\"ltr\"><span>celebrations</span></p>",
        "<p dir=\"ltr\"><span>breaks</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><b><strong>Matches</strong></b><span> \u2013 Teams compete by playing matches against each other throughout the tournament.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60695,
      "question": "<p dir=\"ltr\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span><br/><span>A football tournament is a competition where teams compete to win a (6)_______. It usually involves several (7)_______ where teams play against each other. The team with the most (8)_______ advances to the next round. Tournaments can be played in a (9)_______ or knockout format. Fans from all over the world come to watch the matches and cheer for their (10)_______.</span></p><p dir=\"ltr\"><span> Which word should fill in the blank (8)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>goals</span></p>",
        "<p dir=\"ltr\"><span>points</span></p>",
        "<p dir=\"ltr\"><span>fans</span></p>",
        "<p dir=\"ltr\"><span>players</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Points \u2013 Teams earn points by winning or drawing matches; the highest points help teams move forward.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60696,
      "question": "<p dir=\"ltr\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span><br/><span>A football tournament is a competition where teams compete to win a (6)_______. It usually involves several (7)_______ where teams play against each other. The team with the most (8)_______ advances to the next round. Tournaments can be played in a (9)_______ or knockout format. Fans from all over the world come to watch the matches and cheer for their (10)_______.</span></p><p dir=\"ltr\"><span> Which word should fill in the blank (9)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>league</span></p>",
        "<p dir=\"ltr\"><span>friendly</span></p>",
        "<p dir=\"ltr\"><span>group</span></p>",
        "<p dir=\"ltr\"><span>single</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Group \u2013 Some tournaments use a group stage before knockout rounds, where teams are divided into groups.</span></p>",
      "tag": "Cloze Test || MCQ"
    },
    {
      "id": 60697,
      "question": "<p dir=\"ltr\"><span>In the following passage, there are blanks, each of which is numbered. The options are provided below the passage, and one of the options fits each blank. Read the passage carefully and choose the most appropriate word for each blank.</span><br/><span>A football tournament is a competition where teams compete to win a (6)_______. It usually involves several (7)_______ where teams play against each other. The team with the most (8)_______ advances to the next round. Tournaments can be played in a (9)_______ or knockout format. Fans from all over the world come to watch the matches and cheer for their (10)_______.</span></p><p dir=\"ltr\"><span> Which word should fill in the blank (10)?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>referees</span></p>",
        "<p dir=\"ltr\"><span>teams</span></p>",
        "<p dir=\"ltr\"><span>coaches</span></p>",
        "<p dir=\"ltr\"><span>stadiums</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><b><strong>Teams</strong></b><span> \u2013 Fans support their favorite teams throughout the tournament.</span></p>",
      "tag": "Cloze Test || MCQ"
    }
  ],
  "Comprehension": [
    {
      "id": 60698,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 -Q5)</span><br><span>In the modern world, education has become more about obtaining degrees than acquiring knowledge. We have forgotten that the true purpose of education is to empower individuals to think critically and solve problems effectively. Many students and even educators focus solely on grades and certifications, often ignoring the real learning process. This obsession with academic achievements is evident in the popularity of coaching centers, test-preparation guides, and ranking systems in schools and universities. The emphasis on marks creates a competitive atmosphere where students memorize information without truly understanding it. True education lies in applying knowledge to real-life situations, not just in scoring high marks. A well-educated person uses their learning to contribute meaningfully to society and solve problems rather than boasting about their academic qualifications.</span></p><p dir=\"ltr\"><span>The passage suggests that education today is focused on?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>real-life applications</span></p>",
        "<p dir=\"ltr\"><span>critical thinking</span></p>",
        "<p dir=\"ltr\"><span> acquiring degrees</span></p>",
        "<p dir=\"ltr\"><span>problem-solving skills</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage highlights that modern education places more importance on obtaining degrees rather than true learning or critical thinking.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60699,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 -Q5)</span><br><span>In the modern world, education has become more about obtaining degrees than acquiring knowledge. We have forgotten that the true purpose of education is to empower individuals to think critically and solve problems effectively. Many students and even educators focus solely on grades and certifications, often ignoring the real learning process. This obsession with academic achievements is evident in the popularity of coaching centers, test-preparation guides, and ranking systems in schools and universities. The emphasis on marks creates a competitive atmosphere where students memorize information without truly understanding it. True education lies in applying knowledge to real-life situations, not just in scoring high marks. A well-educated person uses their learning to contribute meaningfully to society and solve problems rather than boasting about their academic qualifications.</span></p><pre><span>The true purpose of education, according to the passage, is?</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span>to memorize information</span></p>",
        "<p dir=\"ltr\"><span>to think critically and solve problems</span></p>",
        "<p dir=\"ltr\"><span>to compete with others</span></p>",
        "<p dir=\"ltr\"><span> to get high grades</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage emphasizes that education should empower individuals  to think critically and solve real-world problems.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60700,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 -Q5)</span><br><span>In the modern world, education has become more about obtaining degrees than acquiring knowledge. We have forgotten that the true purpose of education is to empower individuals to think critically and solve problems effectively. Many students and even educators focus solely on grades and certifications, often ignoring the real learning process. This obsession with academic achievements is evident in the popularity of coaching centers, test-preparation guides, and ranking systems in schools and universities. The emphasis on marks creates a competitive atmosphere where students memorize information without truly understanding it. True education lies in applying knowledge to real-life situations, not just in scoring high marks. A well-educated person uses their learning to contribute meaningfully to society and solve problems rather than boasting about their academic qualifications.</span></p><pre><span>According to the passage, focusing too much on marks leads to?</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span> true education</span></p>",
        "<p dir=\"ltr\"><span> memorization without understanding</span></p>",
        "<p dir=\"ltr\"><span>competition and understanding</span></p>",
        "<p dir=\"ltr\"><span>effective learning</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage states that an obsession with marks creates a culture where students memorize information instead of truly understanding it.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60701,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 -Q5)</span><br/><span>In the modern world, education has become more about obtaining degrees than acquiring knowledge. We have forgotten that the true purpose of education is to empower individuals to think critically and solve problems effectively. Many students and even educators focus solely on grades and certifications, often ignoring the real learning process. This obsession with academic achievements is evident in the popularity of coaching centers, test-preparation guides, and ranking systems in schools and universities. The emphasis on marks creates a competitive atmosphere where students memorize information without truly understanding it. True education lies in applying knowledge to real-life situations, not just in scoring high marks. A well-educated person uses their learning to contribute meaningfully to society and solve problems rather than boasting about their academic qualifications.</span></p><pre><span>The passage tells us that a well-educated person should?</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span>prioritize ranking systems</span></p>",
        "<p dir=\"ltr\"><span> boast about their qualifications</span></p>",
        "<p dir=\"ltr\"><span>contribute meaningfully to society</span></p>",
        "<p dir=\"ltr\"><span> focus on scoring high marks</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<pre><span> The passage mentions that true education helps individuals apply knowledge to solve problems and contribute to society.</span></pre>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60702,
      "question": "<p dir=\"ltr\"><span>(Direction for Q1 -Q5)</span><br><span>In the modern world, education has become more about obtaining degrees than acquiring knowledge. We have forgotten that the true purpose of education is to empower individuals to think critically and solve problems effectively. Many students and even educators focus solely on grades and certifications, often ignoring the real learning process. This obsession with academic achievements is evident in the popularity of coaching centers, test-preparation guides, and ranking systems in schools and universities. The emphasis on marks creates a competitive atmosphere where students memorize information without truly understanding it. True education lies in applying knowledge to real-life situations, not just in scoring high marks. A well-educated person uses their learning to contribute meaningfully to society and solve problems rather than boasting about their academic qualifications.</span></p><p dir=\"ltr\"><span> The main issue discussed in the passage is?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>the lack of qualified teachers</span></p>",
        "<p dir=\"ltr\"><span> the popularity of test-preparation guides</span></p>",
        "<p dir=\"ltr\"><span> the focus on degrees over real learning</span></p>",
        "<p dir=\"ltr\"><span>the competitive atmosphere in education</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The central theme of the passage is the misplaced emphasis on degrees and grades, overshadowing the true purpose of education.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60703,
      "question": "<p dir=\"ltr\"><span>(Direction for Question Q6 - Q10) </span><br><span>The Industrial Revolution, which began in the late 18th century in Britain, marked a turning point in human history. It was a period of significant technological advancements that transformed agriculture, manufacturing, and transportation. Inventions such as the steam engine, spinning jenny, and power loom revolutionized industries, making production faster and more efficient. However, this era also brought challenges, including poor working conditions, child labor, and environmental pollution. While the Industrial Revolution improved the standard of living for many, it also widened the gap between the rich and the poor. The rapid urbanization it caused led to overcrowded cities, unsanitary living conditions, and health problems. Despite these drawbacks, the Industrial Revolution laid the foundation for modern economies and technological progress.</span></p><pre><span>The Industrial Revolution began in?</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span>Germany</span></p>",
        "<p dir=\"ltr\"><span>Britain</span></p>",
        "<p dir=\"ltr\"><span>United States</span></p>",
        "<p dir=\"ltr\"><span>France</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage clearly states that the Industrial Revolution began in Britain in the late 18th century.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60704,
      "question": "<p dir=\"ltr\"><span>(Direction for Question Q6 - Q10) </span><br><span>The Industrial Revolution, which began in the late 18th century in Britain, marked a turning point in human history. It was a period of significant technological advancements that transformed agriculture, manufacturing, and transportation. Inventions such as the steam engine, spinning jenny, and power loom revolutionized industries, making production faster and more efficient. However, this era also brought challenges, including poor working conditions, child labor, and environmental pollution. While the Industrial Revolution improved the standard of living for many, it also widened the gap between the rich and the poor. The rapid urbanization it caused led to overcrowded cities, unsanitary living conditions, and health problems. Despite these drawbacks, the Industrial Revolution laid the foundation for modern economies and technological progress.</span></p><pre><span>One of the significant outcomes of the Industrial Revolution was</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span>technological advancements in manufacturing</span></p>",
        "<p dir=\"ltr\"><span>slower production processes</span></p>",
        "<p dir=\"ltr\"><span>reduced urbanization</span></p>",
        "<p dir=\"ltr\"><span>The passage highlights that inventions like the steam engine and spinning jenny revolutionized manufacturing, making it faster and more efficient.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage highlights that inventions like the steam engine and spinning jenny revolutionized manufacturing, making it faster and more efficient.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60705,
      "question": "<p dir=\"ltr\"><span>(Direction for Question Q6 - Q10) </span><br><span>The Industrial Revolution, which began in the late 18th century in Britain, marked a turning point in human history. It was a period of significant technological advancements that transformed agriculture, manufacturing, and transportation. Inventions such as the steam engine, spinning jenny, and power loom revolutionized industries, making production faster and more efficient. However, this era also brought challenges, including poor working conditions, child labor, and environmental pollution. While the Industrial Revolution improved the standard of living for many, it also widened the gap between the rich and the poor. The rapid urbanization it caused led to overcrowded cities, unsanitary living conditions, and health problems. Despite these drawbacks, the Industrial Revolution laid the foundation for modern economies and technological progress.</span></p><pre><span>A major challenge brought by the Industrial Revolution was?</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span> growth of rural areas</span></p>",
        "<p dir=\"ltr\"><span>increased agricultural output</span></p>",
        "<p dir=\"ltr\"><span>environmental pollution</span></p>",
        "<p dir=\"ltr\"><span> improvement in living standards</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage discusses several challenges, including environmental pollution caused by industrial activities.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60706,
      "question": "<p dir=\"ltr\"><span>(Direction for Question Q6 - Q10) </span><br><span>The Industrial Revolution, which began in the late 18th century in Britain, marked a turning point in human history. It was a period of significant technological advancements that transformed agriculture, manufacturing, and transportation. Inventions such as the steam engine, spinning jenny, and power loom revolutionized industries, making production faster and more efficient. However, this era also brought challenges, including poor working conditions, child labor, and environmental pollution. While the Industrial Revolution improved the standard of living for many, it also widened the gap between the rich and the poor. The rapid urbanization it caused led to overcrowded cities, unsanitary living conditions, and health problems. Despite these drawbacks, the Industrial Revolution laid the foundation for modern economies and technological progress.</span></p><pre><span> According to the passage, the Industrial Revolution contributed to?</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span> the decline of cities</span></p>",
        "<p dir=\"ltr\"><span> reduced economic growth</span></p>",
        "<p dir=\"ltr\"><span> the growth of rural areas</span></p>",
        "<p dir=\"ltr\"><span>rapid urbanization and overcrowded cities</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage mentions that rapid urbanization during the Industrial Revolution led to overcrowded cities and related issues.</span></p>",
      "tag": "Comprehension || MCQ"
    },
    {
      "id": 60707,
      "question": "<p dir=\"ltr\"><span>Direction for Question Q6 - Q10) </span><br><span>The Industrial Revolution, which began in the late 18th century in Britain, marked a turning point in human history. It was a period of significant technological advancements that transformed agriculture, manufacturing, and transportation. Inventions such as the steam engine, spinning jenny, and power loom revolutionized industries, making production faster and more efficient. However, this era also brought challenges, including poor working conditions, child labor, and environmental pollution. While the Industrial Revolution improved the standard of living for many, it also widened the gap between the rich and the poor. The rapid urbanization it caused led to overcrowded cities, unsanitary living conditions, and health problems. Despite these drawbacks, the Industrial Revolution laid the foundation for modern economies and technological progress.</span></p><pre><span>The overall impact of the Industrial Revolution was?</span></pre>",
      "options": [
        "<p dir=\"ltr\"><span>a decline in technological progress</span></p>",
        "<p dir=\"ltr\"><span> a mix of benefits and challenges</span></p>",
        "<p dir=\"ltr\"><span> entirely negative</span></p>",
        "<p dir=\"ltr\"><span> entirely positive</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The passage outlines both the benefits (technological advancements and improved living standards) and challenges (pollution, poor working conditions) of the Industrial Revolution.</span></p>",
      "tag": "Comprehension || MCQ"
    }
  ],
  "One Word Substitutes": [
    {
      "id": 60708,
      "question": "<p dir=\"ltr\"><span>A person who writes with both hands.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Ambivert</span></p>",
        "<p dir=\"ltr\"><span>Ambidextrous</span></p>",
        "<p dir=\"ltr\"><span>Amateur</span></p>",
        "<p dir=\"ltr\"><span>Dexterous</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> Ambidextrous people can use both hands equally well.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60709,
      "question": "<p dir=\"ltr\"><span>A person who does something for pleasure, not money.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Professional</span></p>",
        "<p dir=\"ltr\"><span>Volunteer</span></p>",
        "<p dir=\"ltr\"><span>Amateur</span></p>",
        "<p dir=\"ltr\"><span>Artist</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>An amateur engages in an activity for enjoyment, not profit.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60710,
      "question": "<p dir=\"ltr\"><span>A disease that spreads over a large area.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Endemic</span></p>",
        "<p dir=\"ltr\"><span>Epidemic</span></p>",
        "<p dir=\"ltr\"><span>Pandemic</span></p>",
        "<p dir=\"ltr\"><span>Chronic</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A pandemic affects a large geographical area globally.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60711,
      "question": "<p dir=\"ltr\"><span>A government by the people.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Democracy</span></p>",
        "<p dir=\"ltr\"><span>Bureaucracy</span></p>",
        "<p dir=\"ltr\"><span>Autocracy</span></p>",
        "<p dir=\"ltr\"><span>Theocracy</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In a democracy, the people have the power to govern.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60712,
      "question": "<p dir=\"ltr\"><span>A person who studies the stars and planets.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Physicist</span></p>",
        "<p dir=\"ltr\"><span>Meteorologist</span></p>",
        "<p dir=\"ltr\"><span>Astrologer</span></p>",
        "<p dir=\"ltr\"><span>Astronomer</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>An astronomer studies celestial objects.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60713,
      "question": "<p dir=\"ltr\"><span> One who cannot be corrected or reformed.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Irredeemable</span></p>",
        "<p dir=\"ltr\"><span>Impossible</span></p>",
        "<p dir=\"ltr\"><span>Incurable</span></p>",
        "<p dir=\"ltr\"><span>Incorrigible</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Incorrigible means incapable of being corrected or improved.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60714,
      "question": "<p dir=\"ltr\"><span>One who believes in the equality of all men.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Feminist</span></p>",
        "<p dir=\"ltr\"><span>Egalitarian</span></p>",
        "<p dir=\"ltr\"><span>Socialist</span></p>",
        "<p dir=\"ltr\"><span>Capitalist</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>An egalitarian believes in equal rights for all.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60715,
      "question": "<p dir=\"ltr\"><span>A person who believes in fate or destiny.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Fatalist</span></p>",
        "<p dir=\"ltr\"><span>Optimist</span></p>",
        "<p dir=\"ltr\"><span>Realist</span></p>",
        "<p dir=\"ltr\"><span>Pessimist</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A fatalist believes events are predetermined.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60716,
      "question": "<p dir=\"ltr\"><span>A person who travels to unknown places.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Tourist</span></p>",
        "<p dir=\"ltr\"><span>Explorer</span></p>",
        "<p dir=\"ltr\"><span>Scientist</span></p>",
        "<p dir=\"ltr\"><span>Nomad</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>An explorer travels to discover new places.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    },
    {
      "id": 60717,
      "question": "<p dir=\"ltr\"><span>A person who has no permanent home.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Nomad</span></p>",
        "<p dir=\"ltr\"><span>Citizen</span></p>",
        "<p dir=\"ltr\"><span>Immigrant</span></p>",
        "<p dir=\"ltr\"><span>Refugee</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A nomad moves from place to place without a fixed home.</span></p>",
      "tag": "One Word Substitutes || MCQ"
    }
  ],
  "Idioms and Phrases": [
    {
      "id": 60718,
      "question": "<p dir=\"ltr\"><span>To call a spade a spade</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>To speak indirectly </span></p>",
        "<p dir=\"ltr\"><span>To be polite and diplomatic</span></p>",
        "<p dir=\"ltr\"><span>To speak plainly and directly</span></p>",
        "<p dir=\"ltr\"><span>To praise someone excessively</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"To call a spade a spade\" means to speak directly and plainly, without avoiding or sugar coating the truth.</span></p>",
      "tag": "Idioms and Phrases || MCQ"
    },
    {
      "id": 60719,
      "question": "<p dir=\"ltr\"><span>To put all one's eggs in one basket</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>To risk everything on a single venture</span></p>",
        "<p dir=\"ltr\"><span>To act in a very cautious manner</span></p>",
        "<p dir=\"ltr\"><span>To gather all opportunities in one place</span></p>",
        "<p dir=\"ltr\"><span>To take everything with you</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"To put all one's eggs in one basket\" means to risk everything on a single opportunity or course of action, which could lead to disaster if it fails.</span></p>",
      "tag": "Idioms and Phrases || MCQ"
    },
    {
      "id": 60720,
      "question": "<p dir=\"ltr\"><span>To let the cat out of the bag</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>To reveal a secret </span></p>",
        "<p dir=\"ltr\"><span>To pet an animal</span></p>",
        "<p dir=\"ltr\"><span>To cause a commotion</span></p>",
        "<p dir=\"ltr\"><span>To plan something secretly</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"To let the cat out of the bag\" means to accidentally or unintentionally reveal a secret or a surprise.</span></p>",
      "tag": "Idioms and Phrases || MCQ"
    },
    {
      "id": 60721,
      "question": "<p dir=\"ltr\"><span>To have a finger in the pie</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>To have a lot of food </span></p>",
        "<p dir=\"ltr\"><span>To be involved in something, especially in a way that gives you an advantage</span></p>",
        "<p dir=\"ltr\"><span>To cause problems in a situation </span></p>",
        "<p dir=\"ltr\"><span>To make a mess</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"To have a finger in the pie\" means to be involved in a situation or activity, often with an interest or benefit to gain.</span></p>",
      "tag": "Idioms and Phrases || MCQ"
    },
    {
      "id": 60722,
      "question": "<p dir=\"ltr\"><span>To go the extra mile</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>To walk a long distance </span></p>",
        "<p dir=\"ltr\"><span>To do more than what is expected</span></p>",
        "<p dir=\"ltr\"><span>To travel for vacation </span></p>",
        "<p dir=\"ltr\"><span>To waste time</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"To go the extra mile\" means to put in additional effort beyond what is required or expected, often to achieve better results or help others.</span></p>",
      "tag": "Idioms and Phrases || MCQ"
    },
    {
      "id": 60723,
      "question": "<p dir=\"ltr\"><span>Her </span><u><i><em class=\"GFGEditorTheme__textItalic GFGEditorTheme__textUnderline\">alacrity</em></i></u><span> in accepting the challenge impressed everyone.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Reluctance</span></p>",
        "<p dir=\"ltr\"><span>Enthusiasm</span></p>",
        "<p dir=\"ltr\"><span>Hesitation</span></p>",
        "<p dir=\"ltr\"><span> Indifference</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Enthusiasm\" accurately substitutes \"alacrity,\" which denotes brisk and cheerful readiness.</span></p>",
      "tag": "Idioms and Phrases || MCQ"
    },
    {
      "id": 60724,
      "question": "<p dir=\"ltr\"><span>The novel's </span><u><i><em class=\"GFGEditorTheme__textItalic GFGEditorTheme__textUnderline\">didactic</em></i></u><span> nature made it both educational and engaging.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Entertaining </span></p>",
        "<p dir=\"ltr\"><span> Instructive</span></p>",
        "<p dir=\"ltr\"><span>Mysterious</span></p>",
        "<p dir=\"ltr\"><span>Romantic</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Instructive\" effectively substitutes \"didactic,\" which means intended to teach, particularly in having moral instruction.</span></p>",
      "tag": "Idioms and Phrases || MCQ"
    }
  ],
  "Change of Voice": [
    {
      "id": 60725,
      "question": "<p dir=\"ltr\"><span>The teacher explained the lesson to the students.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The students were explained the lesson by the teacher.</span></p>",
        "<p dir=\"ltr\"><span>The lesson was explained to the students by the teacher.</span></p>",
        "<p dir=\"ltr\"><span>The lesson had been explained to the students.</span></p>",
        "<p dir=\"ltr\"><span>The lesson was explaining to the students by the teacher.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In the passive voice, the subject \"the lesson\" becomes the focus, and the sentence changes to \"The lesson was explained to the students by the teacher.\"</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60726,
      "question": "<p dir=\"ltr\"><span>He had cleaned the car before I arrived.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The car had been cleaned before I arrived.</span><br><span> </span></p>",
        "<p dir=\"ltr\"><span>The car has been cleaned before I arrived.</span></p>",
        "<p dir=\"ltr\"><span>The car was cleaned before I arrived.</span></p>",
        "<p dir=\"ltr\"><span>The car will be cleaned before I arrived.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The past perfect passive voice is used to show that the action was completed before another action in the past.</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60727,
      "question": "<p dir=\"ltr\"><span>They will announce the results tomorrow.</span><br></p>",
      "options": [
        "<p dir=\"ltr\"><span>The results are announced tomorrow</span><br></p>",
        "<p dir=\"ltr\"><span>The results will have been announced tomorrow.</span></p>",
        "<p dir=\"ltr\"><span>The results will be announced tomorrow.</span></p>",
        "<p dir=\"ltr\"><span>The results have been announced tomorrow.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The future passive voice is formed by \"will be announced\" to express an action that will happen in the future.</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60728,
      "question": "<p dir=\"ltr\"><span>I saw him repairing the car.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> I saw the car being repaired by him.\n</span></p>",
        "<p dir=\"ltr\"><span>I saw the car repaired by him.</span></p>",
        "<p dir=\"ltr\"><span>I saw the car repair by him</span></p>",
        "<p dir=\"ltr\"><span>I saw the car was repaired by him.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The past continuous passive voice is used to show an ongoing action when another action took place.</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60729,
      "question": "<p dir=\"ltr\"><span>Does he play football on weekends?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Has football been played by him on weekends? </span></p>",
        "<p dir=\"ltr\"><span> Is football being played by him on weekends?</span></p>",
        "<p dir=\"ltr\"><span>Football is played by him on weekends?</span></p>",
        "<p dir=\"ltr\"><span>Is football played by him on weekends?</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The sentence is in the present simple tense, and the passive form is correctly formed by using \"is played\" for the subject (football).</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60730,
      "question": "<p dir=\"ltr\"><span>They have completed the project successfully.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The project has been completed successfully by them.\n</span></p>",
        "<p dir=\"ltr\"><span> The project has been successfully completed by them.</span></p>",
        "<p dir=\"ltr\"><span>The project had been completed successfully by them.</span></p>",
        "<p dir=\"ltr\"><span> The project successfully completed by them</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>This is the correct passive form in the present perfect tense, matching the original sentence's structure.</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60731,
      "question": "<p dir=\"ltr\"><span>The teacher praised the students for their hard work.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The students were praised by the teacher for their hard work.\n</span></p>",
        "<p dir=\"ltr\"><span>The students had been praised by the teacher for their hard work.</span></p>",
        "<p dir=\"ltr\"><span> The teacher had praised the students for their hard work.</span></p>",
        "<p dir=\"ltr\"><span>The teacher was praised by the students for their hard work.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>This is the correct passive construction in the past simple tense.</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60732,
      "question": "<p dir=\"ltr\"><span>She is believed to be an excellent cook.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>She believed to be an excellent cook.\n</span></p>",
        "<p dir=\"ltr\"><span> People believe she is an excellent cook.</span></p>",
        "<p dir=\"ltr\"><span>It is believed that she is an excellent cook.</span></p>",
        "<p dir=\"ltr\"><span>She believes to be an excellent cook.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> This is the passive voice construction used to indicate a belief or opinion about someone.</span></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60733,
      "question": "<p dir=\"ltr\"><span>You must submit the report by the end of the day.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The report must be submitted by you by the end of the day.</span></p>",
        "<p dir=\"ltr\"><span>The report must be submitted by the end of the day. </span></p>",
        "<p dir=\"ltr\"><span>The report must be submitting by the end of the day.</span></p>",
        "<p dir=\"ltr\"><span>The report must be submitted by the end of the day by you.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>This option correctly expresses the sentence in passive voice without unnecessary details.</span><br></p>",
      "tag": "Change of Voice || MCQ"
    },
    {
      "id": 60734,
      "question": "<p dir=\"ltr\"><span>They have been offering new discounts on the products.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>New discounts have been offered by them on the products.\n</span></p>",
        "<p dir=\"ltr\"><span>New discounts on the products are being offered by them.</span></p>",
        "<p dir=\"ltr\"><span>New discounts have been offered to the products by them.</span></p>",
        "<p dir=\"ltr\"><span>New discounts on the products have been offered by them.</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>This option correctly converts the active sentence into the passive voice, maintaining the past perfect tense to describe an ongoing offer that has already been made.</span></p>",
      "tag": "Change of Voice || MCQ"
    }
  ],
  "Change of Speech": [
    {
      "id": 60735,
      "question": "<p dir=\"ltr\"><span>He said to me, \"I will help you with your homework.\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>He told me that he will help me with my homework.</span><br></p>",
        "<p dir=\"ltr\"><span>He told me that he would help me with my homework.</span></p>",
        "<p dir=\"ltr\"><span>He said that he helps me with my homework.</span></p>",
        "<p dir=\"ltr\"><span> He said that he will help me with my homework.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In indirect speech, \"will\" changes to \"would\" when reporting a future action.</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60736,
      "question": "<p dir=\"ltr\"><span>She said, \"I have already completed my assignment.\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>She told that she has already completed her assignment.</span><br></p>",
        "<p dir=\"ltr\"><span>She said that she had already completed her assignment.</span></p>",
        "<p dir=\"ltr\"><span>She said that she completed her assignment.</span></p>",
        "<p dir=\"ltr\"><span>She said that she has completed her assignment.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The present perfect tense \"have completed\" changes to the past perfect \"had completed\" in indirect speech.</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60737,
      "question": "<p dir=\"ltr\"><span>John asked, \"Will you join us for dinner tonight?\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>John asked would I join them for dinner tonight.</span><br></p>",
        "<p dir=\"ltr\"><span>John asked if I would join them for dinner tonight.</span></p>",
        "<p dir=\"ltr\"><span>John asked me would I join them for dinner tonight. </span></p>",
        "<p dir=\"ltr\"><span> John asked me if I will join them for dinner tonight.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In indirect speech, \"will\" changes to \"would,\" and we use \"if\" for yes/no questions.</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60738,
      "question": "<p dir=\"ltr\"><span>\"Please open the door,\" she said.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>She told me to open the door. </span></p>",
        "<p dir=\"ltr\"><span>She asked me to open the door.</span></p>",
        "<p dir=\"ltr\"><span>She said to open the door.</span></p>",
        "<p dir=\"ltr\"><span>She asked me if I would open the door.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> In indirect speech, requests are reported using \"asked\" followed by \"to\" + verb.</span><br></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60739,
      "question": "<p dir=\"ltr\"><span>He said, \"I am going to the store.\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>He said that he was going to the store.</span><br></p>",
        "<p dir=\"ltr\"><span>He said that he is going to the store.</span></p>",
        "<p dir=\"ltr\"><span>He told that he was going to the store.</span></p>",
        "<p dir=\"ltr\"><span>He said that he is going to the store.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The present continuous \"am going\" changes to past continuous \"was going\" in indirect speech.</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60740,
      "question": "<p dir=\"ltr\"><span>The teacher asked, \"Did you complete your homework?\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>The teacher asked if I have completed my homework.</span><br></p>",
        "<p dir=\"ltr\"><span>The teacher asked if I had completed my homework.</span></p>",
        "<p dir=\"ltr\"><span>The teacher asked if I complete my homework.</span></p>",
        "<p dir=\"ltr\"><span>The teacher asked if I will complete my homework.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In indirect speech, \"did\" changes to \"had\" and the verb tense changes accordingly.</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60741,
      "question": "<p dir=\"ltr\"><span>\"Don't touch that button!\" he shouted.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>He shouted to not touch that button.</span><br></p>",
        "<p dir=\"ltr\"><span>He shouted not to touch that button.</span></p>",
        "<p dir=\"ltr\"><span>He said not to touch that button.</span></p>",
        "<p dir=\"ltr\"><span>He shouted that I shouldn\u2019t touch that button.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>In indirect speech, a command like \"don't\" is reported using \"not to\" + verb.</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60742,
      "question": "<p dir=\"ltr\"><span>\"Can you lend me your pen?\" she asked.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>She asked if I could lend her my pen. </span></p>",
        "<p dir=\"ltr\"><span>She asked if I will lend her my pen.</span></p>",
        "<p dir=\"ltr\"><span>She asked if I would lend her my pen.</span></p>",
        "<p dir=\"ltr\"><span>She asked if I can lend her my pen.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> In indirect speech, questions that start with \"can\" change to \"could.\"</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60743,
      "question": "<p dir=\"ltr\"><span>He asked, \"Where did you go yesterday?\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>He asked where I went yesterday.</span><br></p>",
        "<p dir=\"ltr\"><span>He asked where I had gone yesterday.</span></p>",
        "<p dir=\"ltr\"><span>He asked where I had went yesterday.</span></p>",
        "<p dir=\"ltr\"><span> He asked where did I go yesterday.</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> In indirect speech, the past simple tense \"did go\" changes to the past perfect \"had gone.\"</span></p>",
      "tag": "Change of Speech || MCQ"
    },
    {
      "id": 60744,
      "question": "<p dir=\"ltr\"><span>They said, \"We are planning a surprise party for her.\"</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>They said that they were planning a surprise party for her. </span></p>",
        "<p dir=\"ltr\"><span>They said that they are planning a surprise party for her.</span></p>",
        "<p dir=\"ltr\"><span>They said they were planning a surprise party for her.</span></p>",
        "<p dir=\"ltr\"><span>They said that they planned a surprise party for her.</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The present continuous \"are planning\" changes to past continuous \"were planning\" in indirect speech.</span></p>",
      "tag": "Change of Speech || MCQ"
    }
  ],
  "Verbal Analogies": [
    {
      "id": 60745,
      "question": "<p dir=\"ltr\"><span> CANDLE : FLAME</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Brush : Painting</span></p>",
        "<p dir=\"ltr\"><span>Pen : Paper</span></p>",
        "<p dir=\"ltr\"><span> Match : Fire</span></p>",
        "<p dir=\"ltr\"><span>Book : Library</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A candle produces a flame, just as a match produces fire.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60746,
      "question": "<p dir=\"ltr\"><span>CABBAGE : VEGETABLE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Rose : Fruit</span></p>",
        "<p dir=\"ltr\"><span>Apple : Tree</span></p>",
        "<p dir=\"ltr\"><span>Carrot : Vegetable</span></p>",
        "<p dir=\"ltr\"><span>Dog : Reptile</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A tomato is classified as a vegetable, just as a carrot is classified as a vegetable.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60747,
      "question": "<p dir=\"ltr\"><span>SINGER : SONG</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Athlete : Game</span></p>",
        "<p dir=\"ltr\"><span>Chef : Recipe</span></p>",
        "<p dir=\"ltr\"><span>Dancer : Movement</span></p>",
        "<p dir=\"ltr\"><span>Painter : Artwork</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A singer performs a song, just as a painter creates an artwork.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60748,
      "question": "<p dir=\"ltr\"><span>SUN : DAY</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Moon : Night</span><br></p>",
        "<p dir=\"ltr\"><span>Cloud : Sky</span></p>",
        "<p dir=\"ltr\"><span>Star : Evening</span></p>",
        "<p dir=\"ltr\"><span>Earth : Year</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> The sun is associated with the day, while the moon is associated with the night. This reflects a time-of-day relationship.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60749,
      "question": "<p dir=\"ltr\"><span> DOCTOR : MEDICINE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Lawyer : Law</span></p>",
        "<p dir=\"ltr\"><span>Chef : Ingredients</span></p>",
        "<p dir=\"ltr\"><span>Teacher : Lesson</span></p>",
        "<p dir=\"ltr\"><span>Engineer : Design</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The analogy </span><b><strong>Doctor : Medicine</strong></b><span> implies a </span><b><strong>professional and their field/tool of expertise</strong></b><span>.</span></p><ul><li value=\"1\"><span>A </span><b><strong>doctor</strong></b><span> practices </span><b><strong>medicine</strong></b><span>.</span></li><li value=\"2\"><span>A </span><b><strong>lawyer</strong></b><span> practices </span><b><strong>law</strong></b><span>.</span></li></ul><p dir=\"ltr\"><span>This is the most </span><b><strong>direct and conceptually aligned</strong></b><span> pair among the options.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60750,
      "question": "<p dir=\"ltr\"><span> BEE : HONEY</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Bird : Nest</span><br></p>",
        "<p dir=\"ltr\"><span>Cow : Milk</span></p>",
        "<p dir=\"ltr\"><span>Tree : Leaf</span></p>",
        "<p dir=\"ltr\"><span>Fish : Water</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> A bee produces honey, just as a cow produces milk.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60751,
      "question": "<p dir=\"ltr\"><span>STUDENT : CLASSROOM</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Teacher : School</span></p>",
        "<p dir=\"ltr\"><span> Writer : Office</span></p>",
        "<p dir=\"ltr\"><span>Driver : hospital</span></p>",
        "<p dir=\"ltr\"><span>Doctor : College</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A student is found in a classroom, just as a teacher is found in a school.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60752,
      "question": "<p dir=\"ltr\"><span>SWORD : FIGHT</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Pen : Write</span><br></p>",
        "<p dir=\"ltr\"><span>Hammer : Nail</span></p>",
        "<p dir=\"ltr\"><span>Rifle : Shoot</span></p>",
        "<p dir=\"ltr\"><span>Axe : Chopping</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A sword is used in a fight, just as a rifle is used for shooting.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60753,
      "question": "<p dir=\"ltr\"><span>TEACHER : KNOWLEDGE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>Farmer : Crop</span><br></p>",
        "<p dir=\"ltr\"><span>Author : Book</span></p>",
        "<p dir=\"ltr\"><span>Doctor : Medicine</span></p>",
        "<p dir=\"ltr\"><span>Artist : Creativity</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>A teacher imparts knowledge, just as an artist expresses creativity.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    },
    {
      "id": 60754,
      "question": "<p dir=\"ltr\"><span> ROOT : TREE</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> Engine : Car</span><br></p>",
        "<p dir=\"ltr\"><span> Foundation : Building</span></p>",
        "<p dir=\"ltr\"><span>Branch : Plant</span></p>",
        "<p dir=\"ltr\"><span>Fuel : Fire</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Roots support and nourish a tree, just as a foundation supports and strengthens a building.</span></p>",
      "tag": "Verbal Analogies || MCQ"
    }
  ],
  "Articles": [
    {
      "id": 60755,
      "question": "<p dir=\"ltr\"><span>I saw \u2026 owl sitting on the tree.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>no article</span></p>",
        "<p dir=\"ltr\"><span>the</span></p>",
        "<p dir=\"ltr\"><span>an</span></p>",
        "<p dir=\"ltr\"><span>a</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"Owl\" starts with a vowel sound, so \"an\" is the correct article.</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60756,
      "question": "<p dir=\"ltr\"><span>He bought \u2026 European car last week.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>no article</span></p>",
        "<p dir=\"ltr\"><span>the</span></p>",
        "<p dir=\"ltr\"><span>an</span></p>",
        "<p dir=\"ltr\"><span>a</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Though \"European\" starts with a vowel letter, it has a consonant sound (\"yoo\"), so \"a\" is used.</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60757,
      "question": "<p dir=\"ltr\"><span>She is \u2026 honest woman.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>no article</span></p>",
        "<p dir=\"ltr\"><span>the</span></p>",
        "<p dir=\"ltr\"><span>an</span></p>",
        "<p dir=\"ltr\"><span>a</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"Honest\" starts with a silent \"h,\" and the first sound is a vowel, so \"an\" is correct.</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60758,
      "question": "<p dir=\"ltr\"><span>He found \u2026 rare coin in his grandfather\u2019s collection.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> a</span></p>",
        "<p dir=\"ltr\"><span>the</span></p>",
        "<p dir=\"ltr\"><span>an</span></p>",
        "<p dir=\"ltr\"><span>no article</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Rare\" begins with a consonant sound, so \"a\" is appropriate.</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60759,
      "question": "<p dir=\"ltr\"><span>\u2026 sun rises in the east.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> a</span></p>",
        "<p dir=\"ltr\"><span>the</span></p>",
        "<p dir=\"ltr\"><span>an</span></p>",
        "<p dir=\"ltr\"><span>no article</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"The sun\" is a unique object, so \"the\" is used to denote specificity.</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60760,
      "question": "<p dir=\"ltr\"><span>There was \u2026 apple and \u2026 orange in the basket.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>a/a</span></p>",
        "<p dir=\"ltr\"><span> an/a</span></p>",
        "<p dir=\"ltr\"><span>the/the</span></p>",
        "<p dir=\"ltr\"><span> an/an</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> Both \"apple\" and \"orange\" begin with vowel sounds, so \"an\" is used before each.</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60761,
      "question": "<p dir=\"ltr\"><span>She lives in \u2026 house near the river.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>a</span></p>",
        "<p dir=\"ltr\"><span>an</span></p>",
        "<p dir=\"ltr\"><span>the</span></p>",
        "<p dir=\"ltr\"><span>no article</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"House\" begins with a consonant sound, so \"a\" is correct.</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60762,
      "question": "<p dir=\"ltr\"><span>\u2026 Mount Everest is the highest mountain in the world.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> a</span></p>",
        "<p dir=\"ltr\"><span> an</span></p>",
        "<p dir=\"ltr\"><span> the </span></p>",
        "<p dir=\"ltr\"><span> no article</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>Proper names of unique entities like \"Mount Everest\" are preceded by \"the.\"</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60763,
      "question": "<p dir=\"ltr\"><span>This is \u2026 best option for our situation.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>a</span></p>",
        "<p dir=\"ltr\"><span>an</span></p>",
        "<p dir=\"ltr\"><span>the</span></p>",
        "<p dir=\"ltr\"><span>no article</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> Superlative adjectives like \"best\" always take \"the.\"</span></p>",
      "tag": "Articles || MCQ"
    },
    {
      "id": 60764,
      "question": "<p dir=\"ltr\"><span> He left the room without saying \u2026 word.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> a</span></p>",
        "<p dir=\"ltr\"><span> an</span></p>",
        "<p dir=\"ltr\"><span> the</span></p>",
        "<p dir=\"ltr\"><span> no article</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>The correct article is </span><b><strong>\"a\"</strong></b><span> because \"word\" starts with a consonant sound, and \"a\" is used before singular countable nouns with consonant sounds.</span></p>",
      "tag": "Articles || MCQ"
    }
  ],
  "Preposition": [
    {
      "id": 60765,
      "question": "<p dir=\"ltr\"><span>The teacher divided the students ____ four groups for the project.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>into</span></p>",
        "<p dir=\"ltr\"><span>among</span></p>",
        "<p dir=\"ltr\"><span> over</span></p>",
        "<p dir=\"ltr\"><span>between</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Divided into\" is used when something is split into parts.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60766,
      "question": "<p dir=\"ltr\"><span> The boy hid ____ the table during the game of hide-and-seek.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>behind</span></p>",
        "<p dir=\"ltr\"><span>over</span></p>",
        "<p dir=\"ltr\"><span>below</span></p>",
        "<p dir=\"ltr\"><span> under</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Under the table\" is correct when something is directly beneath.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60767,
      "question": "<p dir=\"ltr\"><span>The package was sent ____ express delivery to ensure it arrived on time.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>in</span></p>",
        "<p dir=\"ltr\"><span>via</span></p>",
        "<p dir=\"ltr\"><span> through</span></p>",
        "<p dir=\"ltr\"><span>by</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Via\" is used to indicate the method or route used to send something.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60768,
      "question": "<p dir=\"ltr\"><span>  He arrived just ____ time to catch the last train.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> by</span></p>",
        "<p dir=\"ltr\"><span>at</span></p>",
        "<p dir=\"ltr\"><span>in</span></p>",
        "<p dir=\"ltr\"><span>on</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"In time\" means arriving with just enough time to spare.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60769,
      "question": "<p dir=\"ltr\"><span>There\u2019s been an increase ____ the price of fuel this month.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> in</span></p>",
        "<p dir=\"ltr\"><span> on</span></p>",
        "<p dir=\"ltr\"><span> of</span></p>",
        "<p dir=\"ltr\"><span> for</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Increase in\" is the correct expression to indicate a rise in quantity or amount.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60770,
      "question": "<p dir=\"ltr\"><span>She borrowed a novel ____ the library to read over the weekend.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> from</span></p>",
        "<p dir=\"ltr\"><span>by</span></p>",
        "<p dir=\"ltr\"><span>on</span></p>",
        "<p dir=\"ltr\"><span>at</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Borrow from\" is used to indicate the source from which something is taken temporarily.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60771,
      "question": "<p dir=\"ltr\"><span>She walked ____ the park and enjoyed the fresh air.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> over</span></p>",
        "<p dir=\"ltr\"><span> into</span></p>",
        "<p dir=\"ltr\"><span> through</span></p>",
        "<p dir=\"ltr\"><span>in</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Walk through\" indicates moving across or within an area.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60772,
      "question": "<p dir=\"ltr\"><span> He has been living in this town ____ childhood.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> in</span></p>",
        "<p dir=\"ltr\"><span> for</span></p>",
        "<p dir=\"ltr\"><span> from</span></p>",
        "<p dir=\"ltr\"><span>since</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span> \"Since\" is used to refer to a specific point in time.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60773,
      "question": "<p dir=\"ltr\"><span>I usually start my day ____ a cup of coffee and some quiet time.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>on</span></p>",
        "<p dir=\"ltr\"><span>in</span></p>",
        "<p dir=\"ltr\"><span> by</span></p>",
        "<p dir=\"ltr\"><span> with</span></p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Start with\" refers to beginning an activity using or including something.</span></p>",
      "tag": "Preposition || MCQ"
    },
    {
      "id": 60774,
      "question": "<p dir=\"ltr\"><span> The villagers were warned ____ the approaching storm.</span></p>",
      "options": [
        "<p dir=\"ltr\"><span> of</span></p>",
        "<p dir=\"ltr\"><span>about</span></p>",
        "<p dir=\"ltr\"><span>against</span></p>",
        "<p dir=\"ltr\"><span>with</span></p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\"Warned of\" is used to inform someone about a danger or risk</span></p>",
      "tag": "Preposition || MCQ"
    }
  ],
  "Adjectives": [
    {
      "id": 60775,
      "question": "<p dir=\"ltr\"><span>What is an Adjective?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>A word that names a person, place, thing, or idea</span></p>",
        "<p dir=\"ltr\"><span>A word that describes a noun or pronoun</span></p>",
        "<p dir=\"ltr\"><span>A word that shows an action</span></p>",
        "<p dir=\"ltr\"><span>A word that connects clauses</span></p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>An adjective modifies or gives more information about a noun or pronoun, describing qualities, quantities, or states of being.</span></p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60776,
      "question": "<p>Which of the following is an example of an adjective?</p>",
      "options": [
        "<p>Quickly</p>",
        "<p>&nbsp;Jump</p>",
        "<p>Blue</p>",
        "<p>&nbsp;Above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>\"Blue\" is an adjective because it describes the color of a noun, indicating what kind or which one.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60777,
      "question": "<p>What type of adjective shows ownership?</p>",
      "options": [
        "<p>Demonstrative adjective</p>",
        "<p>Possessive adjective</p>",
        "<p>&nbsp;Interrogative adjective</p>",
        "<p>Comparative adjective</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Possessive adjectives (my, your, his, her, its, our, their) indicate ownership or possession in relation to a noun.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60778,
      "question": "<p>Which sentence correctly uses a comparative adjective?<br>&nbsp;</p>",
      "options": [
        "<p>This cake is the sweetest of all.</p>",
        "<p>He runs fast in the team.</p>",
        "<p>She is taller than her brother.</p>",
        "<p>They have many books.</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>\"Taller\" is a comparative adjective used to compare the height of two individuals, indicating that she has more height than her brother.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60779,
      "question": "<p>\"Several\" is an example of what type of adjective?</p>",
      "options": [
        "<p>Quantitative adjective</p>",
        "<p>Qualitative adjective</p>",
        "<p>Demonstrative adjective</p>",
        "<p>Proper adjective</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>\"Several\" is a quantitative adjective because it gives information about the quantity of the noun it describes.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60780,
      "question": "<p>Choose the sentence that features a demonstrative adjective.</p>",
      "options": [
        "<p>Those cookies taste amazing.</p>",
        "<p>She can run fast.</p>",
        "<p>&nbsp;The old house looks creepy.</p>",
        "<p>My cat is very playful.</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Those\" is a demonstrative adjective because it points out specific cookies among others.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60781,
      "question": "<p>Which of the following adjectives is used to ask questions about nouns?</p>",
      "options": [
        "<p>&nbsp;Interrogative adjective</p>",
        "<p>Possessive adjective</p>",
        "<p>Compound adjective</p>",
        "<p>Indefinite adjective</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Interrogative adjectives (which, what, whose) are used to ask questions about nouns, specifying information sought.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60782,
      "question": "<p>&nbsp;\"Ice-cold\" is an example of which kind of adjective?</p>",
      "options": [
        "<p>Predicate adjective</p>",
        "<p>Compound adjective</p>",
        "<p>Proper adjective</p>",
        "<p>&nbsp;Absolute adjective</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>\"Ice-cold\" is a compound adjective formed by combining two words to describe a noun with a unique characteristic, indicating a very low temperature.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60783,
      "question": "<p>In the sentence \"The ancient ruins were fascinating,\" what type of adjective is \"ancient\"?</p>",
      "options": [
        "<p>Age adjective</p>",
        "<p>&nbsp;Color adjective</p>",
        "<p>Shape adjective</p>",
        "<p>Material adjective</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>&nbsp;\"Ancient\" is an age adjective because it describes the age of the ruins, indicating they are very old.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60784,
      "question": "<p>What does a superlative adjective express?<br>&nbsp;</p>",
      "options": [
        "<p>A comparison between two things</p>",
        "<p>The highest degree of quality among three or more things</p>",
        "<p>&nbsp;Ownership or possession</p>",
        "<p>A general quality</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Superlative adjectives (e.g., highest, smartest, most beautiful) express the extreme or highest degree of a quality in comparison to two or more things.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60785,
      "question": "<p>&nbsp;\"Eco-friendly\" describes what aspect of a noun?</p>",
      "options": [
        "<p>Color</p>",
        "<p>Origin</p>",
        "<p>Material</p>",
        "<p>Opinion</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>&nbsp;\"Eco-friendly\" is an opinion adjective because it provides a judgment or evaluation, suggesting that something is good for the environment.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60786,
      "question": "<p>&nbsp;In \"She offered a warm smile,\" what is the role of the adjective \"warm\"?</p>",
      "options": [
        "<p>It indicates the temperature of the smile.</p>",
        "<p>&nbsp;It describes the smile in terms of affection or kindness.</p>",
        "<p>&nbsp;It specifies the number of smiles.</p>",
        "<p>It points out which smile.</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>\"Warm\" in this context is a qualitative adjective that describes the nature or quality of the smile, suggesting it is affectionate or kind, rather than its temperature.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60787,
      "question": "<p>\"The leather jacket is mine.\" What type of adjective is \"leather\"?<br>&nbsp;</p>",
      "options": [
        "<p>&nbsp;Material adjective</p>",
        "<p>Possessive adjective</p>",
        "<p>Demonstrative adjective</p>",
        "<p>Quantitative adjective</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>\"Leather\" is a material adjective because it describes what the jacket is made of.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60788,
      "question": "<p>&nbsp;Which sentence uses an absolute adjective?</p>",
      "options": [
        "<p>The water is extremely cold.</p>",
        "<p>This is the ultimate solution.</p>",
        "<p>She is more intelligent than her sister.</p>",
        "<p>They have few resources.</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>\"Ultimate\" is an absolute adjective, expressing a quality that cannot be further quantified, intensified, or compared.</p>",
      "tag": "Adjectives || MCQ"
    },
    {
      "id": 60789,
      "question": "<p dir=\"ltr\"><span>How does the adjective \"fuzzy\" function in \"The fuzzy blanket was soft\"?</span></p>",
      "options": [
        "<p dir=\"ltr\"><span>It specifies which blanket is being discussed.</span></p>",
        "<p dir=\"ltr\"><span>It compares the blanket to another.</span></p>",
        "<p dir=\"ltr\"><span>It describes a quality of the blanket.</span></p>",
        "<p dir=\"ltr\"><span>It indicates the blanket's quantity.</span></p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p dir=\"ltr\"><span>\u201cFuzzy\u201d is a qualitative adjective that describes the texture or quality of the blanket.</span><br><span> It provides additional information about what the blanket is like, rather than indicating quantity or making a comparison.</span></p><p dir=\"ltr\"><span>Therefore, the correct answer is C: It describes a quality of the blanket.</span></p>",
      "tag": "Adjectives || MCQ"
    }
  ],
  "Artificial Language": [
    {
      "question": "<p>Artificial Language Translation: gorblflur means fan belt pixngorbl means ceiling fan arthtusl means tile roof Which word could mean \"ceiling tile\"?</p>",
      "options": [
        "<p>gorbltusl</p>",
        "<p>flurgorbl</p>",
        "<p>arthflur</p>",
        "<p>pixnarth</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, \"pixngorbl\" means \"ceiling fan,\" and \"arthtusl\" means \"tile roof.\" To represent \"ceiling tile,\" we can combine the words for \"ceiling\" and \"tile,\" which would be \"pixn\" and \"arth\" respectively. Therefore, \"pixnarth is the correct choice.</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60790
    },
    {
      "question": "<p>Artificial Language Translation: zotlsh means rainwater lshmerk means waterfall qeomerk means snowfall What could \"merkqeozotlsh\" mean?</p>",
      "options": [
        "<p>snowfall waterfall</p>",
        "<p>rainwater snowfall</p>",
        "<p>waterfall rainwater</p>",
        "<p>waterfall snowfall</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, zotlsh = rainwater qeo = snow merk = fall Combined: fall + snow + rainwater = rainwater snowfall</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60791
    },
    {
      "question": "<p>Artificial Language Translation: bluftok means blue sky okbluft means sky blue okbluftme means blue sky morning What could \"mebluftok\" mean?</p>",
      "options": [
        "<p>blue sky</p>",
        "<p>sky blue</p>",
        "<p>morning sky</p>",
        "<p>morning blue sky</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, bluft appears in all words and seems to relate to blue ok = sky (from bluftok and okbluft ) me = morning (from okbluftme ) Order in this language matters. Since \"me\" (morning) comes first , and then \"bluftok\" (blue sky), it likely emphasizes \"morning blue sky\"</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60792
    },
    {
      "question": "<p>Artificial Language Translation: zopixngor means bright ceiling gorblzopixn means fan bright arthzopixn means bright tile What could \"arthgorbl\" mean?</p>",
      "options": [
        "<p>bright fan</p>",
        "<p>tile fan</p>",
        "<p>ceiling bright</p>",
        "<p>bright tile</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, arth = tile (from arthzopixn ) gorbl = fan (from gorblpixn ) So, arthgorbl means tile fan .</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60793
    },
    {
      "question": "<p>Artificial Language Translation: trazip means blue sky zipbof means sky high What could \"boftrazip\" mean?</p>",
      "options": [
        "<p>blue high</p>",
        "<p>sky high</p>",
        "<p>high bluesky</p>",
        "<p>blue sky</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, bof = high tra = blue zip = sky \u2192 Combined: high bluesky (C) is the most accurate meaning.</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60794
    },
    {
      "question": "<p>Artificial Language Translation: zopluj means bright sun tulpluj means sunflower tugap means rain dance What could \"zotugap\" mean?</p>",
      "options": [
        "<p>bright rain dance</p>",
        "<p>sunflower dance</p>",
        "<p>rain sun</p>",
        "<p>dance flower</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, zo = bright tugap = rain dance \u2192 Together: bright rain dance .</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60795
    },
    {
      "question": "<p>Artificial Language Translation: granzotl means heavy rain maggranz means heavy forest What could \"magzotl\" mean?</p>",
      "options": [
        "<p>heavy forest</p>",
        "<p>forest rain</p>",
        "<p>heavy rainforest</p>",
        "<p>rainforest heavy</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, mag = forest zotl = rain \u2192 Together: forest rain (B) is the correct meaning.</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60796
    },
    {
      "question": "<p>Artificial Language Translation: glimwop means red apple wopzit means apple pie zitglim means red pie What could \"wopzitglim\" mean?</p>",
      "options": [
        "<p>red pie</p>",
        "<p>apple red</p>",
        "<p>apple pie red</p>",
        "<p>pie apple</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, \"The word combines apple (wop) + pie (zit) + red (glim) \u2192 so it most accurately means apple pie red .</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60797
    },
    {
      "question": "<p>Artificial Language Translation: spoflur means green grass flurblip means grasshopper blipspof means greenhopper What could \"blipflur\" mean?</p>",
      "options": [
        "<p>grass green</p>",
        "<p>grasshopper</p>",
        "<p>green grasshopper</p>",
        "<p>grasshopper green</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, blip = hopper flur = grass Together, they still form grasshopper , just with reversed order from flurblip .</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60798
    },
    {
      "question": "<p>Artificial Language Translation: plufur means white snow furbot means snowflake botplu means whiteflake What could \"botfur\" mean?</p>",
      "options": [
        "<p>white snow</p>",
        "<p>flake white</p>",
        "<p>snow white</p>",
        "<p>snowflake</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In the given artificial language, \"botplu\" means \"whiteflake,\" and \"plufur\" means \"white snow.\" To represent \"snowflake,\" we can combine the words for \"snow\" and \"flake,\" which would be \"plufur\" and \"botplu\" respectively. Therefore, \"botfur\" means \"snowflake.\"</p>",
      "tag": "Artificial Language || MCQ",
      "id": 60799
    }
  ],
  "Matching Definitions": [
    {
      "question": "<p>Applying for Seasonal Employment: Requesting a job dependent on a particular season or time of year. Which situation below is the best example of Applying for Seasonal Employment?</p>",
      "options": [
        "<p>The ski instructors at Top of the Peak Ski School work from December through March.</p>",
        "<p>Matthew prefers jobs that allow him to work outdoors.</p>",
        "<p>Lucinda makes an appointment with the beach resort restaurant manager to interview for the summer waitressing position that was advertised in the newspaper.</p>",
        "<p>Doug's ice cream shop stays open until 11 p.m. during the summer months.</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Applying for Seasonal Employment involves seeking a job that is tied to a specific season or time of year. Lucinda's interview for a summer waitressing position corresponds to this definition.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60800
    },
    {
      "question": "<p>Amphibian: A cold-blooded vertebrate animal, such as a frog or salamander, that lives both in water and on land. Which of the following animals is an example of an amphibian?</p>",
      "options": [
        "<p>Lion</p>",
        "<p>Penguin</p>",
        "<p>Frog</p>",
        "<p>Which of the following animals is an example of an amphibian? A) Lion B) Penguin C) Frog D) Snake</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: An amphibian is a vertebrate animal that can live both in water and on land. A frog is a classic example of an amphibian.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60801
    },
    {
      "question": "<p>Ecosystem: A biological community of interacting organisms and their physical environment. What term describes a biological community of interacting organisms and their physical environment?</p>",
      "options": [
        "<p>Microorganism</p>",
        "<p>Organism</p>",
        "<p>Ecosystem</p>",
        "<p>Environment</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: An ecosystem is precisely defined as a biological community of interacting organisms and their physical environment.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60802
    },
    {
      "question": "<p>Meteorology: The scientific study of the Earth's atmosphere, especially in relation to weather forecasting. What field of study focuses on the scientific examination of the Earth's atmosphere, particularly in connection with weather forecasting?</p>",
      "options": [
        "<p>Geology</p>",
        "<p>Anthropology</p>",
        "<p>Meteorology</p>",
        "<p>Zoology</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Meteorology is the scientific study of the Earth's atmosphere, specifically with regard to weather forecasting.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60803
    },
    {
      "question": "<p>Volcano: A mountain or hill with a crater or vent through which lava, rock fragments, hot vapor, and gas are or have been erupted from the Earth's crust. Which geological feature has a crater or vent from which lava and gases erupt?</p>",
      "options": [
        "<p>Desert</p>",
        "<p>Volcano</p>",
        "<p>River</p>",
        "<p>Canyon</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: A volcano is defined as a mountain or hill with a crater or vent through which lava, rock fragments, hot vapor, and gas have erupted from the Earth's crust.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60804
    },
    {
      "question": "<p>Photosynthesis: The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. What is the process by which plants use sunlight to create food with the aid of chlorophyll?</p>",
      "options": [
        "<p>Respiration</p>",
        "<p>Photosynthesis</p>",
        "<p>Digestion</p>",
        "<p>Fermentation</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Photosynthesis is the precise process by which green plants and certain other organisms utilize sunlight, along with chlorophyll, to synthesize food.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60805
    },
    {
      "question": "<p>Democracy: A system of government in which the people exercise authority through elected representatives. Which form of government allows people to wield authority through their chosen representatives?</p>",
      "options": [
        "<p>Monarchy</p>",
        "<p>Autocracy</p>",
        "<p>Democracy</p>",
        "<p>Dictatorship</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Democracy is a system of government in which the people exercise authority by electing representatives to represent their interests.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60806
    },
    {
      "question": "<p>Tsunami: A series of ocean waves with extremely long wavelengths caused by large-scale disturbances, typically earthquakes or volcanic eruptions. What is the term for a series of ocean waves with exceptionally long wavelengths, often triggered by significant events like earthquakes or volcanic eruptions?</p>",
      "options": [
        "<p>Tornado</p>",
        "<p>Tsunami</p>",
        "<p>Hurricane</p>",
        "<p>Typhoon</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: A tsunami is defined as a series of ocean waves with very long wavelengths, typically resulting from significant disturbances like earthquakes or volcanic eruptions.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60807
    },
    {
      "question": "<p>Gravity: The force that attracts two bodies toward each other, proportional to their masses and inversely proportional to the square of the distance separating them. What is the name of the force that draws two objects toward each other, influenced by their masses and the distance between them?</p>",
      "options": [
        "<p>Magnetism</p>",
        "<p>Electricity</p>",
        "<p>Friction</p>",
        "<p>Gravity</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Gravity is the force responsible for pulling two objects toward each other, with its strength determined by their masses and the distance separating them.</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60808
    },
    {
      "question": "<p>Constitution: A fundamental set of laws and principles that establishes the framework of a government. What is the term for a foundational set of laws and principles that outlines the structure of a government?</p>",
      "options": [
        "<p>Declaration</p>",
        "<p>Charter</p>",
        "<p>Constitution</p>",
        "<p>Covenant</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>A constitution is precisely defined as a fundamental set of laws and principles that lays out the structure and framework of a government. Related Resource : Essential Part - Logical Reasoning Artificial Language - Logical Reasoning Statement and Argument - Logical Reasoning Comment Article Tags: Article Tags: Aptitude SSC Quantitative Aptitude Banking Quantitative Aptitude Logical Reasoning Corporate & Communications Address: A-143, 6th Floor, Sovereign Corporate Tower, Sector- 136, Noida, Uttar Pradesh (201305) Registered Address: K 061, Tower K, Gulshan Vivante Apartment, Sector 137, Noida, Gautam Buddh Nagar, Uttar Pradesh, 201305 Company About Us Legal Privacy Policy Careers Contact Us Corporate Solution Campus Training Program Explore POTD Practice Problems Blogs Upskill Courses Connect Tutorials Programming Languages DSA Web Technology AI, ML & Data Science DevOps CS Core Subjects GATE School Subjects Software and Tools Courses ML and Data Science DSA and Placements Web Development Data Science Programming Languages DevOps & Cloud GATE MongoDB Certifications Preparation Corner Interview Corner Aptitude Puzzles GfG 160 System Design @GeeksforGeeks, Sanchhaya Education Private Limited , All rights reserved (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-KDVRCT5'); window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-DWCCJLKX3X'); gtag('config', 'AW-796001856'); {\"props\":{\"pageProps\":{\"postDataFromWriteApi\":{\"id\":5405561,\"post_content\":\" Matching Definitions Questions: Matching Definitions is a key aspect of logical reasoning . It tests your ability to correctly pair terms with their meanings. This skill is used in academic and professional contexts to gauge critical thinking and understanding. In matching definition in reasoning , you're given a list of words and their meanings. The challenge is to match each word with its correct definition. It involves a good grasp of vocabulary, careful reading, and attention to language nuances. Matching Definitions - Solved Examples</p>",
      "tag": "Matching Definitions || MCQ",
      "id": 60809
    }
  ],
  "Making Judgments": [
    {
      "question": "<p>Sachin is planning a birthday party on 26/07/2022. He wants to celebrate this memorable evening, but his friend is a very shy man who would rather spend the evening at home doing some chores and playing indoor games and he is also a food and drink lover. Sachin has chosen a restaurant that serves the best dishes in the city then which restaurant should Sachin choose so that his friend comes to the party with him? (1) Babian restaurant as it serves the best cuisine in the city. (2) Chandrakala as it serves his friend's favorite dosa which is the best and cheap as compared to others. (3) Bikanervala as it serves the best chaat and coffee as compared to others. (4) Royal sky as it also serves non-veg and alcohol along with a pool corner for entertainment. Clearly, he should choose the fourth restaurant as his friend will enjoy the food and drinks along with the pool corner game since his friend likes to play indoor games so his mind will be refreshed.</p>",
      "options": [
        "<p>Inconsistent case of Verified</p>",
        "<p>Verified</p>",
        "<p>Alternative Verified</p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Sachin is planning a birthday party on 26/07/2022. He wants to celebrate this memorable evening, but his friend is a very shy man who would rather spend the evening at home doing some chores and playing indoor games and he is also a food and drink lover. Sachin has chosen a restaurant that serves the best dishes in the city then which restaurant should Sachin choose so that his friend comes to the party with him? (1) Babian restaurant as it serves the best cuisine in the city. (2) Chandrakala as it serves his friend's favorite dosa which is the best and cheap as compared to others. (3) Bikanervala as it serves the best chaat and coffee as compared to others. (4) Royal sky as it also serves non-veg and alcohol along with a pool corner for entertainment. Clearly, he should choose the fourth restaurant as his friend will enjoy the food and drinks along with the pool corner game since his friend likes to play indoor games so his mind will be refreshed.</p>",
      "tag": "Making Judgments || MCQ",
      "id": 60810
    },
    {
      "question": "<p>All the intermediate students scoring above 70% are eligible for university admissions, and those below 70% have to give entrance and interview also. Here, the filter technique of judgement will take place and the cutoff will be decided. Tips and Tricks to Solve Judgement based Questions While doing the judgement-based questions a proper analysis of the statements must be done so that there must be no ambiguity to answer the questions. Analysis of the statements must be done so one can decide whether a decision is worth to be made must be taken into consideration. It helps one to eliminate the options. The actions must be taken based on the instructions given. The theme of the statement must be understood and the clauses must be visualized. Also Check: \u27a3 Making Judgements Solved Question- Refer Here ! \u27a3 Test your knowledge- Quiz ! Comment Article Tags: Article Tags: Aptitude Verbal Reasoning <img class=\"footer-container_branding-logo\" src=\"https://medi</p>",
      "options": [
        "<p>Inconsistent case of Verified</p>",
        "<p>None of the above</p>",
        "<p>Alternative Verified</p>",
        "<p>Verified</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>All the intermediate students scoring above 70% are eligible for university admissions, and those below 70% have to give entrance and interview also. Here, the filter technique of judgement will take place and the cutoff will be decided.</p>",
      "tag": "Making Judgments || MCQ",
      "id": 60811
    }
  ],
  "Logical Games": [
    {
      "question": "<p>If Sarah has a red pen, a blue pen, and a green pen, how many different ways can she arrange them in a row on her desk?</p>",
      "options": [
        "<p>3 ways</p>",
        "<p>6 ways</p>",
        "<p>9 ways</p>",
        "<p>12 ways e. 24 ways</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Sarah can arrange the pens in 3! (3 factorial) ways because there are three pens. 3! = 3 x 2 x 1 = 6 ways So, the correct answer is (b): 6 ways.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60812
    },
    {
      "question": "<p>In a game of chess, which piece only move diagonally and capture opponents?</p>",
      "options": [
        "<p>Bishop</p>",
        "<p>Knight</p>",
        "<p>Rook</p>",
        "<p>Queen e. King</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>The bishop moves any number of squares diagonally and captures pieces on those diagonal paths. Unlike the queen, it cannot move horizontally or vertically.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60813
    },
    {
      "question": "<p>If a rectangle has a length of 8 units and a width of 4 units, what is its perimeter?</p>",
      "options": [
        "<p>12 units</p>",
        "<p>16 units</p>",
        "<p>24 units</p>",
        "<p>32 units e. 64 units</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>The perimeter of a rectangle is calculated as 2 times the sum of its length and width. Perimeter = 2 x (8 units + 4 units) = 2 x 12 units = 24 units So, the correct answer is (c): 24 units.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60814
    },
    {
      "question": "<p>If you flip a fair coin twice, what is the probability of getting heads on both flips?</p>",
      "options": [
        "<p>1/4</p>",
        "<p>1/2</p>",
        "<p>3/4</p>",
        "<p>1/3 e. 2/3</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>When flipping a fair coin twice, the probability of getting heads on each flip is 1/2. To find the probability of both events happening, you multiply their individual probabilities. Probability of heads on the first flip: 1/2 Probability of heads on the second flip: 1/2 Probability of both flips being heads: (1/2) x (1/2) = 1/4 So, the correct answer is (a): 1/4.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60815
    },
    {
      "question": "<p>If a train travels from Station A to Station B at a speed of 60 mph and returns from Station B to Station A at a speed of 40 mph, what is the average speed for the entire round trip?</p>",
      "options": [
        "<p>50 mph</p>",
        "<p>48 mph</p>",
        "<p>45 mph</p>",
        "<p>52 mph e. 55 mph</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>To find the average speed for the entire round trip, you can use the formula: Average Speed = (2 * Speed1 * Speed2) / (Speed1 + Speed2). We can get this formula from the simple formula of total-distance / total-time Average Speed = (2 * 60 mph * 40 mph) / (60 mph + 40 mph) = (4800 mph^2) / (100 mph) = 48 mph So, the correct answer is (a): 48 mph.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60816
    },
    {
      "question": "<p>In a deck of playing cards, what is the total number of cards with hearts as their suit?</p>",
      "options": [
        "<p>13 cards</p>",
        "<p>26 cards</p>",
        "<p>39 cards</p>",
        "<p>52 cards e. 4 cards</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>In a standard deck of playing cards, there are 13 cards in each suit (hearts, diamonds, clubs, and spades). So, the total number of cards with hearts as their suit is 13 cards. So, the correct answer is (a): 13 cards.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60817
    },
    {
      "question": "<p>If a car travels 120 miles in 2 hours, what is its average speed in miles per hour (mph)?</p>",
      "options": [
        "<p>40 mph</p>",
        "<p>60 mph</p>",
        "<p>80 mph</p>",
        "<p>100 mph e. 120 mph</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Average Speed = Total Distance / Total Time Average Speed = 120 miles / 2 hours = 60 mph So, the correct answer is (b): 60 mph.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60818
    },
    {
      "question": "<p>If you have a pizza divided into 8 equal slices, and you eat 3 slices, how many slices are left?</p>",
      "options": [
        "<p>1 slice</p>",
        "<p>2 slices</p>",
        "<p>3 slices</p>",
        "<p>4 slices e. 5 slices (Answer)</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>If you eat 3 slices out of 8, the number of slices left is 8 - 3 = 5 slices. So, the correct answer is (e): 5 slices.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60819
    },
    {
      "question": "<p>Which planet in our solar system is known as the \"Red Planet\"?</p>",
      "options": [
        "<p>Earth</p>",
        "<p>Venus</p>",
        "<p>Mars</p>",
        "<p>Jupiter e. Saturn</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Mars is often referred to as the \"Red Planet\" due to its reddish appearance caused by iron oxide (rust) on its surface. So, the correct answer is (c): Mars.</p>",
      "tag": "Logical Games || MCQ",
      "id": 60820
    },
    {
      "question": "<p>If a rectangle has a length of 12 units and a width of 6 units, what is its area in square units?</p>",
      "options": [
        "<p>18 square units</p>",
        "<p>24 square units</p>",
        "<p>36 square units</p>",
        "<p>48 square units e. 72 square units</p>"
      ],
      "correctAnswer": 3,
      "correctAnswers": [
        3
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>The area of a rectangle is calculated as the product of its length and width. Area = Length x Width = 12 units x 6 units = 72 square units. So, the correct answer is (d): 72 square units..</p>",
      "tag": "Logical Games || MCQ",
      "id": 60821
    }
  ],
  "Verification of the Truth of the Statement": [
    {
      "question": "<p>Which of the following is always necessary for a statement to be considered true?</p>",
      "options": [
        "<p>Evidence</p>",
        "<p>Belief</p>",
        "<p>Opinion</p>",
        "<p>Emotion</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: In order to verify the truth of a statement, we typically rely on evidence or facts that support it. Belief, opinion, and emotion alone do not guarantee the truth of a statement.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60822
    },
    {
      "question": "<p>When assessing the truth of a scientific claim, what should be the primary basis?</p>",
      "options": [
        "<p>Personal preference</p>",
        "<p>Experimental data</p>",
        "<p>Social media trends</p>",
        "<p>Fashion trends</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Scientific claims should be primarily based on experimental data and empirical evidence rather than personal preference or popular trends.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60823
    },
    {
      "question": "<p>Which of the following is an essential step in fact-checking a statement?</p>",
      "options": [
        "<p>Trusting the source blindly</p>",
        "<p>Relying on rumors and gossip</p>",
        "<p>Cross-referencing with reliable sources</p>",
        "<p>Ignoring any contradictory information</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Fact-checking involves verifying information from multiple reliable sources to ensure its accuracy.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60824
    },
    {
      "question": "<p>True or False: A statement can be considered true if it aligns with our personal beliefs.</p>",
      "options": [
        "<p>Inconsistent case of b. False</p>",
        "<p>Alternative b. False</p>",
        "<p>b. False</p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: The truth of a statement should not be determined solely by personal beliefs; it should be based on objective evidence.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60825
    },
    {
      "question": "<p>Which of the following is an example of a statement that can be objectively verified?</p>",
      "options": [
        "<p>\"Chocolate ice cream is the best flavor.\"</p>",
        "<p>\"Water boils at 100 degrees Celsius at sea level.\"</p>",
        "<p>\"Pizza is my favorite foo</p>",
        "<p>\" d. \"Sunsets are beautiful.\"</p>"
      ],
      "correctAnswer": 1,
      "correctAnswers": [
        1
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: The boiling point of water is an objective fact that can be scientifically verified.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60826
    },
    {
      "question": "<p>In logical reasoning, what is the process of checking the truth of a statement based on available evidence and logical principles called?</p>",
      "options": [
        "<p>Hypothesis testing</p>",
        "<p>Truth evaluation</p>",
        "<p>Verification</p>",
        "<p>Opinion assessment</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Verification involves assessing the truth of a statement using evidence and logic.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60827
    },
    {
      "question": "<p>When evaluating the truth of a historical claim, what is a reliable source of information?</p>",
      "options": [
        "<p>A personal diary from the 18th century</p>",
        "<p>A peer-reviewed historical research paper</p>",
        "<p>An unverified internet meme</p>",
        "<p>A fictional novel</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Peer-reviewed research papers are considered reliable sources in historical research.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60828
    },
    {
      "question": "<p>What is the first step in verifying the truth of a statement?</p>",
      "options": [
        "<p>Making assumptions</p>",
        "<p>Seeking confirmation bias</p>",
        "<p>Gathering evidence</p>",
        "<p>Accepting the statement as true</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: The initial step in verifying a statement is to gather evidence that supports or refutes it.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60829
    },
    {
      "question": "<p>Which of the following is a common logical fallacy that can hinder the verification of a statement?</p>",
      "options": [
        "<p>Confirmation bias</p>",
        "<p>Critical thinking</p>",
        "<p>Objective analysis</p>",
        "<p>Fact-checking</p>"
      ],
      "correctAnswer": 0,
      "correctAnswers": [
        0
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Confirmation bias involves favoring information that confirms our preexisting beliefs, which can hinder objective verification.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60830
    },
    {
      "question": "<p>True or False: Verifying the truth of a statement is always a straightforward and easy process.</p>",
      "options": [
        "<p>None of the above</p>",
        "<p>Alternative b. False</p>",
        "<p>b. False</p>",
        "<p>Inconsistent case of b. False</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Verifying the truth of a statement can be a complex process that requires critical thinking and thorough investigation.</p>",
      "tag": "Verification of the Truth of the Statement || MCQ",
      "id": 60831
    }
  ],
  "Assertion and Reason": [
    {
      "question": "<p>A: Metal objects expand when heated. R: Heating increases the kinetic energy of metal atoms causing them to vibrate more and occupy more space. Option B: Both the Assertion and Reason are true, but the Reason is not the correct explanation of the Assertion; the two statements are independent of each other.</p>",
      "options": [
        "<p>Inconsistent case of Verified</p>",
        "<p>None of the above</p>",
        "<p>Verified</p>",
        "<p>Alternative Verified</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>The correct answer is Verified.</p>",
      "tag": "Assertion and Reason || MCQ",
      "id": 60832
    },
    {
      "question": "<p>A: Plants conduct photosynthesis. R: Photosynthesis is essential for plant growth. Option C: The Assertion is true, but the Reason is false or incorrect.</p>",
      "options": [
        "<p>Inconsistent case of Verified</p>",
        "<p>Alternative Verified</p>",
        "<p>Verified</p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>The correct answer is Verified.</p>",
      "tag": "Assertion and Reason || MCQ",
      "id": 60833
    },
    {
      "question": "<p>A: Sound cannot travel through vacuum. R: Sound travels through vacuum at a very slow speed. Option D: The Assertion is false, but the Reason is true.</p>",
      "options": [
        "<p>Inconsistent case of Verified</p>",
        "<p>Alternative Verified</p>",
        "<p>Verified</p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>The correct answer is Verified.</p>",
      "tag": "Assertion and Reason || MCQ",
      "id": 60834
    },
    {
      "question": "<p>A: The Moon revolves around the Sun directly. R: The Moon is a natural satellite that orbits the Earth. Option E: Both the Assertion and the Reason are completely false.</p>",
      "options": [
        "<p>Inconsistent case of Verified</p>",
        "<p>None of the above</p>",
        "<p>Verified</p>",
        "<p>Alternative Verified</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>The correct answer is Verified.</p>",
      "tag": "Assertion and Reason || MCQ",
      "id": 60835
    },
    {
      "question": "<p>Assertion (</p>",
      "options": [
        "<p>Inconsistent case of A - Both A and R are true, and R is the correct explanation of A</p>",
        "<p>Alternative A - Both A and R are true, and R is the correct explanation of A</p>",
        "<p>A - Both A and R are true, and R is the correct explanation of A</p>",
        "<p>None of the above</p>"
      ],
      "correctAnswer": 2,
      "correctAnswers": [
        2
      ],
      "questionType": "MCQ",
      "natRange": null,
      "explanation": "<p>Explanation: Both the assertion and reason are true. Feathers indeed help birds fly, as they provide lift and control during flight.</p>",
      "tag": "Assertion and Reason || MCQ",
      "id": 60836
    }
  ]
};
