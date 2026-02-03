'use client';

import { useState } from 'react';
import InterviewSimulator, { Answer } from '@/components/interview/InterviewSimulator';
import InterviewResults from '@/components/interview/InterviewResults';

export default function InterviewPage() {
    const [isComplete, setIsComplete] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [overallScore, setOverallScore] = useState(0);

    const handleComplete = (finalAnswers: Answer[], score: number) => {
        setAnswers(finalAnswers);
        setOverallScore(score);
        setIsComplete(true);
    };

    const handleRestart = () => {
        setIsComplete(false);
        setAnswers([]);
        setOverallScore(0);
    };

    return (
        <div className="max-w-7xl mx-auto">
            {isComplete ? (
                <InterviewResults
                    answers={answers}
                    overallScore={overallScore}
                    onRestart={handleRestart}
                />
            ) : (
                <InterviewSimulator onComplete={handleComplete} />
            )}
        </div>
    );
}
