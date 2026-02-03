// ========================================
// INTERVIEW DATA STRUCTURES
// Multi-stage interview simulation data
// ========================================

export type QuestionType = 'text' | 'voice' | 'multiple-choice' | 'code';
export type InterviewStage = 'behavioral' | 'technical' | 'coding' | 'final';
export type ProgrammingLanguage = 'javascript' | 'typescript' | 'java' | 'golang';

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  stage: InterviewStage;
  timeLimit?: number; // in seconds
  options?: MultipleChoiceOption[]; // for multiple choice
  keywords?: string[]; // for evaluation
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
  starterCode: {
    javascript: string;
    typescript: string;
    java: string;
    golang: string;
  };
  testCases: {
    input: string;
    expectedOutput: string;
    description: string;
  }[];
  hints?: string[];
}

// ========================================
// STAGE 1: BEHAVIORAL INTERVIEW QUESTIONS
// ========================================

export const behavioralQuestions: Question[] = [
  {
    id: 'beh-1',
    text: 'How do you stay updated with industry trends?',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 120,
    keywords: ['learning', 'research', 'community', 'reading', 'courses'],
    difficulty: 'easy',
    category: 'Professional Development'
  },
  {
    id: 'beh-2',
    text: 'Tell me about yourself and your professional background.',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 180,
    keywords: ['experience', 'skills', 'achievements', 'education'],
    difficulty: 'easy',
    category: 'Introduction'
  },
  {
    id: 'beh-3',
    text: 'Describe a challenging work situation and how you overcame it.',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 180,
    keywords: ['problem-solving', 'resilience', 'solution', 'outcome'],
    difficulty: 'medium',
    category: 'Problem Solving'
  },
  {
    id: 'beh-4',
    text: 'How do you handle stress and pressure in the workplace?',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 120,
    keywords: ['stress management', 'prioritization', 'balance', 'coping'],
    difficulty: 'medium',
    category: 'Stress Management'
  },
  {
    id: 'beh-5',
    text: 'Give an example of a time when you showed leadership.',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 180,
    keywords: ['leadership', 'team', 'initiative', 'guidance', 'results'],
    difficulty: 'medium',
    category: 'Leadership'
  },
  {
    id: 'beh-6',
    text: 'How do you approach working in a team environment?',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 120,
    keywords: ['collaboration', 'communication', 'teamwork', 'support'],
    difficulty: 'easy',
    category: 'Teamwork'
  },
  {
    id: 'beh-7',
    text: 'Describe a situation where you had to adapt quickly to change.',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 150,
    keywords: ['adaptability', 'flexibility', 'change', 'learning'],
    difficulty: 'medium',
    category: 'Adaptability'
  },
  {
    id: 'beh-8',
    text: 'Tell me about a time you failed and what you learned from it.',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 180,
    keywords: ['failure', 'learning', 'growth', 'improvement', 'reflection'],
    difficulty: 'hard',
    category: 'Self-Awareness'
  },
  {
    id: 'beh-9',
    text: 'How do you prioritize your work when you have multiple projects?',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 120,
    keywords: ['prioritization', 'time management', 'organization', 'planning'],
    difficulty: 'medium',
    category: 'Time Management'
  },
  {
    id: 'beh-10',
    text: 'Why do you want to work for our company?',
    type: 'voice',
    stage: 'behavioral',
    timeLimit: 150,
    keywords: ['motivation', 'research', 'values', 'goals', 'fit'],
    difficulty: 'medium',
    category: 'Motivation'
  }
];

// ========================================
// STAGE 2: TECHNICAL INTERVIEW QUESTIONS
// ========================================

export const technicalQuestions: Question[] = [
  {
    id: 'tech-1',
    text: 'What is the difference between == and === in JavaScript?',
    type: 'multiple-choice',
    stage: 'technical',
    timeLimit: 60,
    difficulty: 'easy',
    category: 'JavaScript Fundamentals',
    options: [
      { id: 'a', text: '== checks value only, === checks value and type', isCorrect: true },
      { id: 'b', text: 'They are exactly the same', isCorrect: false },
      { id: 'c', text: '=== is faster than ==', isCorrect: false },
      { id: 'd', text: '== is deprecated', isCorrect: false }
    ]
  },
  {
    id: 'tech-2',
    text: 'Explain the concept of closure in JavaScript.',
    type: 'voice',
    stage: 'technical',
    timeLimit: 180,
    keywords: ['function', 'scope', 'lexical', 'encapsulation', 'private'],
    difficulty: 'medium',
    category: 'JavaScript Advanced'
  },
  {
    id: 'tech-3',
    text: 'Which HTTP method is idempotent?',
    type: 'multiple-choice',
    stage: 'technical',
    timeLimit: 60,
    difficulty: 'medium',
    category: 'Web Protocols',
    options: [
      { id: 'a', text: 'POST', isCorrect: false },
      { id: 'b', text: 'GET', isCorrect: true },
      { id: 'c', text: 'PATCH', isCorrect: false },
      { id: 'd', text: 'All of the above', isCorrect: false }
    ]
  },
  {
    id: 'tech-4',
    text: 'What is the time complexity of binary search?',
    type: 'multiple-choice',
    stage: 'technical',
    timeLimit: 60,
    difficulty: 'easy',
    category: 'Algorithms',
    options: [
      { id: 'a', text: 'O(n)', isCorrect: false },
      { id: 'b', text: 'O(log n)', isCorrect: true },
      { id: 'c', text: 'O(n²)', isCorrect: false },
      { id: 'd', text: 'O(1)', isCorrect: false }
    ]
  },
  {
    id: 'tech-5',
    text: 'Explain the difference between SQL and NoSQL databases.',
    type: 'voice',
    stage: 'technical',
    timeLimit: 180,
    keywords: ['relational', 'schema', 'scalability', 'flexibility', 'structure'],
    difficulty: 'medium',
    category: 'Databases'
  },
  {
    id: 'tech-6',
    text: 'What is the purpose of Docker?',
    type: 'multiple-choice',
    stage: 'technical',
    timeLimit: 60,
    difficulty: 'easy',
    category: 'DevOps',
    options: [
      { id: 'a', text: 'Version control', isCorrect: false },
      { id: 'b', text: 'Containerization', isCorrect: true },
      { id: 'c', text: 'Database management', isCorrect: false },
      { id: 'd', text: 'Code compilation', isCorrect: false }
    ]
  },
  {
    id: 'tech-7',
    text: 'Explain the concept of RESTful API design.',
    type: 'voice',
    stage: 'technical',
    timeLimit: 180,
    keywords: ['stateless', 'resources', 'HTTP', 'endpoints', 'CRUD'],
    difficulty: 'medium',
    category: 'API Design'
  },
  {
    id: 'tech-8',
    text: 'What is the difference between async/await and Promises?',
    type: 'voice',
    stage: 'technical',
    timeLimit: 150,
    keywords: ['asynchronous', 'syntax', 'error handling', 'readability'],
    difficulty: 'medium',
    category: 'JavaScript Advanced'
  },
  {
    id: 'tech-9',
    text: 'Which design pattern is used for creating objects?',
    type: 'multiple-choice',
    stage: 'technical',
    timeLimit: 60,
    difficulty: 'medium',
    category: 'Design Patterns',
    options: [
      { id: 'a', text: 'Observer Pattern', isCorrect: false },
      { id: 'b', text: 'Factory Pattern', isCorrect: true },
      { id: 'c', text: 'Strategy Pattern', isCorrect: false },
      { id: 'd', text: 'Decorator Pattern', isCorrect: false }
    ]
  },
  {
    id: 'tech-10',
    text: 'Explain the concept of microservices architecture.',
    type: 'voice',
    stage: 'technical',
    timeLimit: 180,
    keywords: ['distributed', 'independent', 'scalability', 'services', 'communication'],
    difficulty: 'hard',
    category: 'Architecture'
  }
];

// ========================================
// STAGE 3: CODING CHALLENGES
// ========================================

export const codingChallenges: CodeChallenge[] = [
  {
    id: 'code-1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'easy',
    timeLimit: 900, // 15 minutes
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
  
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,
      java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] result = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result)); // Expected: [0, 1]
    }
}`,
      golang: `package main

import "fmt"

func twoSum(nums []int, target int) []int {
    // Your code here
    
}

func main() {
    result := twoSum([]int{2, 7, 11, 15}, 9)
    fmt.Println(result) // Expected: [0, 1]
}`
    },
    testCases: [
      {
        input: '[2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        description: 'Basic case'
      },
      {
        input: '[3, 2, 4], target = 6',
        expectedOutput: '[1, 2]',
        description: 'Different indices'
      }
    ],
    hints: ['Use a hash map to store seen numbers', 'Check if complement exists in the map']
  },
  {
    id: 'code-2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    difficulty: 'easy',
    timeLimit: 600, // 10 minutes
    starterCode: {
      javascript: `function reverseString(s) {
  // Your code here
  
}

// Test
console.log(reverseString(['h','e','l','l','o'])); // Expected: ['o','l','l','e','h']`,
      typescript: `function reverseString(s: string[]): void {
  // Your code here
  
}

// Test
const test = ['h','e','l','l','o'];
reverseString(test);
console.log(test); // Expected: ['o','l','l','e','h']`,
      java: `public class Solution {
    public void reverseString(char[] s) {
        // Your code here
        
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        char[] test = {'h','e','l','l','o'};
        sol.reverseString(test);
        System.out.println(Arrays.toString(test)); // Expected: ['o','l','l','e','h']
    }
}`,
      golang: `package main

import "fmt"

func reverseString(s []byte) {
    // Your code here
    
}

func main() {
    test := []byte{'h','e','l','l','o'}
    reverseString(test)
    fmt.Println(string(test)) // Expected: "olleh"
}`
    },
    testCases: [
      {
        input: "['h','e','l','l','o']",
        expectedOutput: "['o','l','l','e','h']",
        description: 'Basic string reversal'
      }
    ]
  },
  {
    id: 'code-3',
    title: 'Valid Palindrome',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    difficulty: 'medium',
    timeLimit: 1200, // 20 minutes
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Your code here
  
}

// Test
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true`,
      typescript: `function isPalindrome(s: string): boolean {
  // Your code here
  
}

// Test
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true`,
      java: `public class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
    }
}`,
      golang: `package main

import "fmt"

func isPalindrome(s string) bool {
    // Your code here
    
}

func main() {
    fmt.Println(isPalindrome("A man, a plan, a canal: Panama")) // Expected: true
}`
    },
    testCases: [
      {
        input: '"A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
        description: 'Classic palindrome'
      },
      {
        input: '"race a car"',
        expectedOutput: 'false',
        description: 'Not a palindrome'
      }
    ],
    hints: ['Convert to lowercase first', 'Remove non-alphanumeric characters', 'Use two pointers']
  }
];

// ========================================
// STAGE 4: FINAL INTERVIEW (HR/MANAGERIAL)
// ========================================

export const finalQuestions: Question[] = [
  {
    id: 'final-1',
    text: 'Where do you see yourself in five years?',
    type: 'voice',
    stage: 'final',
    timeLimit: 150,
    keywords: ['growth', 'goals', 'development', 'career', 'vision'],
    difficulty: 'medium',
    category: 'Career Goals'
  },
  {
    id: 'final-2',
    text: 'What are your salary expectations?',
    type: 'voice',
    stage: 'final',
    timeLimit: 120,
    keywords: ['research', 'market', 'value', 'negotiation'],
    difficulty: 'hard',
    category: 'Compensation'
  },
  {
    id: 'final-3',
    text: 'How do you handle work-life balance?',
    type: 'voice',
    stage: 'final',
    timeLimit: 120,
    keywords: ['balance', 'boundaries', 'health', 'productivity'],
    difficulty: 'medium',
    category: 'Work-Life Balance'
  },
  {
    id: 'final-4',
    text: 'Describe your ideal work environment.',
    type: 'voice',
    stage: 'final',
    timeLimit: 120,
    keywords: ['culture', 'collaboration', 'environment', 'preferences'],
    difficulty: 'easy',
    category: 'Work Environment'
  },
  {
    id: 'final-5',
    text: 'Why should we hire you over other candidates?',
    type: 'voice',
    stage: 'final',
    timeLimit: 150,
    keywords: ['unique', 'value', 'skills', 'contribution', 'fit'],
    difficulty: 'hard',
    category: 'Value Proposition'
  },
  {
    id: 'final-6',
    text: 'What questions do you have for us?',
    type: 'voice',
    stage: 'final',
    timeLimit: 180,
    keywords: ['curiosity', 'research', 'engagement', 'interest'],
    difficulty: 'medium',
    category: 'Engagement'
  },
  {
    id: 'final-7',
    text: 'How do you handle feedback and criticism?',
    type: 'voice',
    stage: 'final',
    timeLimit: 120,
    keywords: ['growth mindset', 'learning', 'improvement', 'receptive'],
    difficulty: 'medium',
    category: 'Feedback'
  },
  {
    id: 'final-8',
    text: 'What motivates you in your professional life?',
    type: 'voice',
    stage: 'final',
    timeLimit: 120,
    keywords: ['passion', 'drive', 'purpose', 'achievement'],
    difficulty: 'easy',
    category: 'Motivation'
  },
  {
    id: 'final-9',
    text: 'Tell me about a professional achievement you\'re most proud of.',
    type: 'voice',
    stage: 'final',
    timeLimit: 180,
    keywords: ['achievement', 'impact', 'success', 'contribution'],
    difficulty: 'medium',
    category: 'Achievements'
  },
  {
    id: 'final-10',
    text: 'How do you approach continuous learning and professional development?',
    type: 'voice',
    stage: 'final',
    timeLimit: 150,
    keywords: ['learning', 'development', 'skills', 'growth', 'improvement'],
    difficulty: 'medium',
    category: 'Professional Development'
  }
];

// ========================================
// EVALUATION CRITERIA
// ========================================

export interface EvaluationCriteria {
  clarity: number; // 0-100
  confidence: number; // 0-100
  relevance: number; // 0-100
  depth: number; // 0-100
  communication: number; // 0-100
}

export interface StageScore {
  stage: InterviewStage;
  score: number; // 0-100
  feedback: string;
  strengths: string[];
  weaknesses: string[];
}
