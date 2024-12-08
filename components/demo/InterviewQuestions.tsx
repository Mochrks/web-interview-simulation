'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Send, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InterviewQuestionsProps {
    questions: string[];
}

export default function InterviewQuestions({ questions }: InterviewQuestionsProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
    const [submitted, setSubmitted] = useState(false);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    // Fungsi untuk generate PDF
    const generatePDF = async () => {
        const input = document.getElementById('interview-results');
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Interview_Results_${new Date().toISOString().split('T')[0]}.pdf`);
    };


    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    if (submitted) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-indigo-800 dark:text-indigo-400 ">Interview Completed</CardTitle>
                    <CardDescription className="text-center">Thank you for completing the interview simulation!</CardDescription>
                </CardHeader>
                <CardContent id="interview-results">
                    <div className="space-y-6">
                        {questions.map((question, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-600 ">Question {index + 1}: {question}</h3>
                                <p className="mt-2 text-gray-600">{answers[index]}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                    <Button onClick={() => window.location.reload()}>Start New Interview</Button>
                    <Button onClick={generatePDF} variant="outline">
                        <FileDown className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-indigo-800 dark:text-indigo-400 ">Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                <CardDescription className="text-lg font-medium">{questions[currentQuestionIndex]}</CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="mb-4" />
                <Textarea
                    placeholder="Type your answer here..."
                    value={answers[currentQuestionIndex]}
                    onChange={handleAnswerChange}
                    className="min-h-[150px]"
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {currentQuestionIndex === questions.length - 1 ? (
                    <Button onClick={handleSubmit}>
                        Submit <Send className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={handleNextQuestion}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

