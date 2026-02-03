// ========================================
// VOICE INTERACTION UTILITIES
// Text-to-Speech and Speech-to-Text
// ========================================

export class VoiceService {
  private synthesis: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      
      // Initialize Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  // Text-to-Speech
  speak(text: string, options?: { rate?: number; pitch?: number; volume?: number }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate || 1.0;
      utterance.pitch = options?.pitch || 1.0;
      utterance.volume = options?.volume || 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);

      this.synthesis.speak(utterance);
    });
  }

  // Stop speaking
  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  // Speech-to-Text
  listen(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        resolve(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  // Stop listening
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Check if currently listening
  getIsListening(): boolean {
    return this.isListening;
  }

  // Get available voices
  getVoices(): SpeechSynthesisVoice[] {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  // Check if voice features are supported
  isSupported(): { tts: boolean; stt: boolean } {
    return {
      tts: !!this.synthesis,
      stt: !!this.recognition
    };
  }
}

// ========================================
// VOICE ANALYSIS UTILITIES
// ========================================

export interface VoiceAnalysis {
  clarity: number; // 0-100
  confidence: number; // 0-100
  pace: number; // words per minute
  tone: 'professional' | 'casual' | 'nervous' | 'confident';
  wordCount: number;
  duration: number; // in seconds
}

export function analyzeVoiceResponse(
  transcript: string,
  duration: number
): VoiceAnalysis {
  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;
  const pace = duration > 0 ? (wordCount / duration) * 60 : 0;

  // Simple heuristics for analysis
  const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually'];
  const fillerCount = words.filter(word => 
    fillerWords.includes(word.toLowerCase())
  ).length;

  const clarity = Math.max(0, 100 - (fillerCount / wordCount) * 100);

  // Confidence based on pace and clarity
  const idealPace = 150; // words per minute
  const paceScore = 100 - Math.abs(pace - idealPace) / idealPace * 100;
  const confidence = (clarity * 0.6 + paceScore * 0.4);

  // Determine tone
  let tone: VoiceAnalysis['tone'] = 'professional';
  if (pace < 100) tone = 'nervous';
  else if (pace > 180) tone = 'nervous';
  else if (clarity > 80 && pace >= 130 && pace <= 170) tone = 'confident';
  else if (fillerCount > wordCount * 0.1) tone = 'casual';

  return {
    clarity: Math.round(clarity),
    confidence: Math.round(confidence),
    pace: Math.round(pace),
    tone,
    wordCount,
    duration
  };
}

// ========================================
// ANSWER EVALUATION UTILITIES
// ========================================

export interface AnswerEvaluation {
  score: number; // 0-100
  keywordMatch: number; // percentage of keywords found
  depth: number; // 0-100 based on length and detail
  relevance: number; // 0-100
  feedback: string;
  matchedKeywords: string[];
  missedKeywords: string[];
}

export function evaluateAnswer(
  answer: string,
  keywords: string[] = [],
  minWordCount: number = 20
): AnswerEvaluation {
  const answerLower = answer.toLowerCase();
  const words = answer.trim().split(/\s+/);
  const wordCount = words.length;

  // Keyword matching
  const matchedKeywords = keywords.filter(keyword =>
    answerLower.includes(keyword.toLowerCase())
  );
  const missedKeywords = keywords.filter(keyword =>
    !answerLower.includes(keyword.toLowerCase())
  );
  const keywordMatch = keywords.length > 0
    ? (matchedKeywords.length / keywords.length) * 100
    : 50;

  // Depth analysis (based on length and structure)
  const depthScore = Math.min(100, (wordCount / minWordCount) * 50 + 
    (answer.split('.').length - 1) * 10);

  // Relevance (combination of keyword match and depth)
  const relevance = (keywordMatch * 0.7 + depthScore * 0.3);

  // Overall score
  const score = (keywordMatch * 0.5 + depthScore * 0.3 + relevance * 0.2);

  // Generate feedback
  let feedback = '';
  if (score >= 80) {
    feedback = 'Excellent answer! You covered the key points comprehensively.';
  } else if (score >= 60) {
    feedback = 'Good answer, but could be more detailed in some areas.';
  } else if (score >= 40) {
    feedback = 'Fair answer. Consider adding more specific examples and details.';
  } else {
    feedback = 'Your answer needs more depth and relevance to the question.';
  }

  if (missedKeywords.length > 0) {
    feedback += ` Consider mentioning: ${missedKeywords.slice(0, 3).join(', ')}.`;
  }

  return {
    score: Math.round(score),
    keywordMatch: Math.round(keywordMatch),
    depth: Math.round(depthScore),
    relevance: Math.round(relevance),
    feedback,
    matchedKeywords,
    missedKeywords
  };
}

// ========================================
// CODE EVALUATION UTILITIES
// ========================================

export interface CodeEvaluation {
  score: number; // 0-100
  correctness: number; // 0-100
  efficiency: number; // 0-100
  readability: number; // 0-100
  bestPractices: number; // 0-100
  feedback: string;
  testsPassed: number;
  totalTests: number;
}

export function evaluateCode(
  code: string,
  testsPassed: number,
  totalTests: number
): CodeEvaluation {
  // Correctness based on tests
  const correctness = totalTests > 0 ? (testsPassed / totalTests) * 100 : 0;

  // Readability heuristics
  const lines = code.split('\n');
  const hasComments = lines.some(line => line.trim().startsWith('//') || line.trim().startsWith('/*'));
  const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
  const readability = Math.min(100,
    (hasComments ? 30 : 0) +
    (avgLineLength < 80 ? 40 : 20) +
    (code.includes('function') || code.includes('=>') ? 30 : 20)
  );

  // Efficiency (simple heuristics)
  const hasNestedLoops = /for.*for|while.*while/.test(code);
  const usesBuiltInMethods = /map|filter|reduce|find|some|every/.test(code);
  const efficiency = Math.min(100,
    (usesBuiltInMethods ? 50 : 30) +
    (hasNestedLoops ? 20 : 50)
  );

  // Best practices
  const usesConst = code.includes('const');
  const usesLet = code.includes('let');
  const avoidsVar = !code.includes('var');
  const hasProperNaming = /[a-z][a-zA-Z0-9]*/.test(code);
  const bestPractices = 
    (usesConst ? 25 : 0) +
    (usesLet ? 15 : 0) +
    (avoidsVar ? 30 : 0) +
    (hasProperNaming ? 30 : 0);

  // Overall score
  const score = (
    correctness * 0.5 +
    efficiency * 0.2 +
    readability * 0.15 +
    bestPractices * 0.15
  );

  // Generate feedback
  let feedback = '';
  if (testsPassed === totalTests) {
    feedback = '✓ All tests passed! ';
  } else {
    feedback = `${testsPassed}/${totalTests} tests passed. `;
  }

  if (score >= 80) {
    feedback += 'Excellent code quality!';
  } else if (score >= 60) {
    feedback += 'Good solution, but there\'s room for improvement.';
  } else {
    feedback += 'Consider improving code efficiency and readability.';
  }

  if (!hasComments && code.split('\n').length > 10) {
    feedback += ' Add comments for better clarity.';
  }
  if (hasNestedLoops) {
    feedback += ' Consider optimizing nested loops.';
  }

  return {
    score: Math.round(score),
    correctness: Math.round(correctness),
    efficiency: Math.round(efficiency),
    readability: Math.round(readability),
    bestPractices: Math.round(bestPractices),
    feedback,
    testsPassed,
    totalTests
  };
}

// ========================================
// TIMER UTILITIES
// ========================================

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getTimeColor(remainingSeconds: number, totalSeconds: number): string {
  const percentage = (remainingSeconds / totalSeconds) * 100;
  if (percentage > 50) return 'text-green-600';
  if (percentage > 25) return 'text-yellow-600';
  return 'text-red-600';
}
